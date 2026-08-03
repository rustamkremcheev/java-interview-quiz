import { CodeArtifact } from '../../../../../types/domain';

export const CODE_ARTIFACTS_LISKOV: readonly CodeArtifact[] = [
  {
    id: "art_payment_processor_broken",
    type: "QUESTION_CODE",
    language: "java",
    javaVersion: "17",
    title: {
      en: "Broken Baseline: PaymentProcessor, CardPayment & BankTransfer",
      ru: "Исходный Нарушенный Код: PaymentProcessor, CardPayment и BankTransfer"
    },
    sourceCode: `package com.finance.payments.orchestration;

public record PaymentRequest(String paymentId, long amountCents, String currency) {}
public record PaymentResult(String paymentId, boolean success, String message) {}

/**
 * Base contract: every PaymentProcessor supports process AND refund.
 */
public interface PaymentProcessor {
    PaymentResult process(PaymentRequest request);
    PaymentResult refund(PaymentRequest request); // contract: refunds supported
}

public class CardPayment implements PaymentProcessor {
    @Override
    public PaymentResult process(PaymentRequest request) {
        return new PaymentResult(request.paymentId(), true, "Card charged");
    }

    @Override
    public PaymentResult refund(PaymentRequest request) {
        return new PaymentResult(request.paymentId(), true, "Card refunded");
    }
}

/**
 * PRODUCTION BUG: Implements PaymentProcessor but violates refund() contract.
 * Wire transfers are irreversible — subtype throws unexpected exception.
 */
public class BankTransfer implements PaymentProcessor {
    @Override
    public PaymentResult process(PaymentRequest request) {
        return new PaymentResult(request.paymentId(), true, "Wire sent");
    }

    @Override
    public PaymentResult refund(PaymentRequest request) {
        throw new UnsupportedOperationException("Bank transfers cannot be refunded");
    }
}

public class PaymentOrchestrator {
    /**
     * Assumes any PaymentProcessor supports refund().
     * LSP VIOLATION: BankTransfer IS-A PaymentProcessor but cannot substitute safely.
     */
    public void reversePayment(PaymentProcessor processor, PaymentRequest req) {
        processor.refund(req); // UnsupportedOperationException for BankTransfer
    }
}`,
    annotations: [
      {
        id: "ann_lsp_broken_1",
        startLine: 35,
        endLine: 43,
        category: "PROBLEM_IN_ORIGINAL_CODE",
        title: { en: "BankTransfer Throws on refund()", ru: "BankTransfer Бросает Исключение в refund()" },
        explanation: {
          en: "BankTransfer implements PaymentProcessor but overrides refund() to throw. Any client accepting PaymentProcessor assumes refund() succeeds — a classic LSP violation (strengthened precondition / unexpected exception).",
          ru: "BankTransfer реализует PaymentProcessor, но переопределяет refund() с исключением. Любой клиент с PaymentProcessor ожидает успешный refund() — классическое нарушение LSP (усиленное предусловие / неожиданное исключение)."
        },
        problemSolved: {
          en: "Structural IS-A relationship without behavioral substitutability.",
          ru: "Структурное IS-A без поведенческой взаимозаменяемости."
        },
        conceptDemonstrated: "cpt_liskov_substitution"
      },
      {
        id: "ann_lsp_broken_2",
        startLine: 50,
        endLine: 53,
        category: "PRODUCTION_RISK",
        title: { en: "Unconditional refund() on PaymentProcessor", ru: "Безусловный refund() на PaymentProcessor" },
        explanation: {
          en: "PaymentOrchestrator calls processor.refund() without checking refund capability. The PaymentProcessor contract implies refunds are supported for every implementation.",
          ru: "PaymentOrchestrator вызывает processor.refund() без проверки поддержки refund. Контракт PaymentProcessor подразумевает, что refund поддерживается каждой реализацией."
        },
        conceptDemonstrated: "cpt_behavioral_subtyping"
      }
    ],
    relatedQuestionIds: ["q_lsp_payment_01"],
    conceptIds: ["cpt_liskov_substitution", "cpt_behavioral_subtyping"],
    tags: ["#lsp", "#payments", "#interface-segregation"]
  },
  {
    id: "art_payment_processor_solution",
    type: "CORRECT_SOLUTION",
    language: "java",
    javaVersion: "17",
    title: {
      en: "Production Refactored: Segregated Payment Processor APIs",
      ru: "Продакшн Рефакторинг: Сегрегированные PaymentProcessor API"
    },
    sourceCode: `package com.finance.payments.orchestration;

public record PaymentRequest(String paymentId, long amountCents, String currency) {}
public record PaymentResult(String paymentId, boolean success, String message) {}

/** Process-only capability — all payment methods implement this. */
public interface PaymentProcessor {
    PaymentResult process(PaymentRequest request);
}

/** Refund capability — only reversible payment methods implement this. */
public interface RefundablePaymentProcessor extends PaymentProcessor {
    PaymentResult refund(PaymentRequest request);
}

public class CardPayment implements RefundablePaymentProcessor {
    @Override
    public PaymentResult process(PaymentRequest request) {
        return new PaymentResult(request.paymentId(), true, "Card charged");
    }

    @Override
    public PaymentResult refund(PaymentRequest request) {
        return new PaymentResult(request.paymentId(), true, "Card refunded");
    }
}

/** Wire transfers: process only — never pretends to support refund. */
public class BankTransfer implements PaymentProcessor {
    @Override
    public PaymentResult process(PaymentRequest request) {
        return new PaymentResult(request.paymentId(), true, "Wire sent");
    }
}

public class PaymentOrchestrator {
    /** Compile-time safe: only refundable processors accepted. */
    public void reversePayment(RefundablePaymentProcessor processor, PaymentRequest req) {
        processor.refund(req);
    }

    /** Charge path accepts any processor, including irreversible wires. */
    public void charge(PaymentProcessor processor, PaymentRequest req) {
        processor.process(req);
    }
}`,
    annotations: [
      {
        id: "ann_lsp_sol_1",
        startLine: 8,
        endLine: 16,
        category: "HOW_IT_FIXES_THE_PROBLEM",
        title: { en: "Interface Segregation: Process vs Refund", ru: "Сегрегация Интерфейсов: Process vs Refund" },
        explanation: {
          en: "PaymentProcessor is process-only. RefundablePaymentProcessor extends it with refund(). BankTransfer never pretends to support refunds.",
          ru: "PaymentProcessor содержит только process. RefundablePaymentProcessor расширяет его методом refund(). BankTransfer больше не притворяется поддерживающим refund."
        },
        conceptDemonstrated: "cpt_interface_contracts"
      },
      {
        id: "ann_lsp_sol_2",
        startLine: 30,
        endLine: 36,
        category: "WHY_IT_EXISTS",
        title: { en: "BankTransfer Implements Process-Only Contract", ru: "BankTransfer Реализует Только Process-Контракт" },
        explanation: {
          en: "BankTransfer implements PaymentProcessor only. It cannot be passed to reversePayment — the compiler enforces refund capability.",
          ru: "BankTransfer реализует только PaymentProcessor. Его нельзя передать в reversePayment — компилятор проверяет поддержку refund."
        },
        conceptDemonstrated: "cpt_behavioral_subtyping"
      },
      {
        id: "ann_lsp_sol_3",
        startLine: 39,
        endLine: 47,
        category: "INTERVIEW_CONCEPT",
        title: { en: "Capability-Typed Method Signatures", ru: "Сигнатуры Методов с Capability-Типами" },
        explanation: {
          en: "reversePayment accepts RefundablePaymentProcessor; charge accepts PaymentProcessor. LSP holds because every subtype honors the contract of the type it actually implements.",
          ru: "reversePayment принимает RefundablePaymentProcessor; charge — PaymentProcessor. LSP соблюдается, потому что каждый подтип соблюдает контракт реально реализуемого типа."
        },
        conceptDemonstrated: "cpt_liskov_substitution"
      }
    ],
    relatedQuestionIds: ["q_lsp_payment_01"],
    conceptIds: ["cpt_liskov_substitution", "cpt_behavioral_subtyping"],
    tags: ["#lsp", "#interface-segregation", "#payments"]
  },
  {
    id: "art_payment_processor_bughunt",
    type: "COUNTER_EXAMPLE",
    language: "java",
    javaVersion: "17",
    title: {
      en: "Bug Hunt Code: BankTransfer Refund LSP Violation",
      ru: "Код для Поиска Бага: Нарушение LSP в BankTransfer.refund()"
    },
    sourceCode: `package com.finance.payments.orchestration;

public interface PaymentProcessor {
    PaymentResult process(PaymentRequest request);
    PaymentResult refund(PaymentRequest request);
}

public class BankTransfer implements PaymentProcessor {
    public PaymentResult process(PaymentRequest request) {
        return new PaymentResult(request.paymentId(), true, "Wire sent");
    }

    public PaymentResult refund(PaymentRequest request) {
        // Line 12: LSP violation — subtype strengthens precondition by forbidding refund
        throw new UnsupportedOperationException("Bank transfers cannot be refunded");
    }
}

public class PaymentOrchestrator {
    public void reversePayment(PaymentProcessor processor, PaymentRequest req) {
        // Line 19: Runtime failure when processor is BankTransfer
        processor.refund(req);
    }
}`,
    annotations: [
      {
        id: "ann_lsp_bug_1",
        startLine: 12,
        endLine: 14,
        category: "PROBLEM_IN_ORIGINAL_CODE",
        title: { en: "refund() Throws Unexpected Exception", ru: "refund() Бросает Неожиданное Исключение" },
        explanation: {
          en: "Subtypes must not throw exceptions that base type clients do not expect. PaymentProcessor.refund() implies a successful or domain-result refund — not a blanket UnsupportedOperationException.",
          ru: "Подтипы не должны бросать исключения, которых клиент базового типа не ожидает. PaymentProcessor.refund() подразумевает успешный refund или доменный результат — не безусловный UnsupportedOperationException."
        },
        conceptDemonstrated: "cpt_behavioral_subtyping"
      },
      {
        id: "ann_lsp_bug_2",
        startLine: 18,
        endLine: 20,
        category: "PRODUCTION_RISK",
        title: { en: "Runtime Failure Site", ru: "Место Сбоя в Рантайме" },
        explanation: {
          en: "Line 19 is where the nightly chargeback batch crashed. Compile-time type PaymentProcessor offered no protection because BankTransfer passed structural typing checks.",
          ru: "Строка 19 — место падения ночного chargeback-батча. Тип PaymentProcessor на этапе компиляции не защитил, потому что BankTransfer прошел проверку структурной типизации."
        },
        conceptDemonstrated: "cpt_liskov_substitution"
      }
    ],
    relatedQuestionIds: ["q_lsp_payment_01"],
    conceptIds: ["cpt_liskov_substitution", "cpt_behavioral_subtyping"],
    tags: ["#lsp", "#bug-hunt", "#payments"]
  }
];
