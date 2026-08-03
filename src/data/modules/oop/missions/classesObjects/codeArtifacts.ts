import { CodeArtifact } from '../../../../../types/domain';

export const CODE_ARTIFACTS_CLASSES_OBJECTS: readonly CodeArtifact[] = [
  {
    id: "art_co_payment_instruction",
    type: "QUESTION_CODE",
    language: "java",
    javaVersion: "17",
    title: {
      en: "Domain Types: PaymentId & PaymentInstruction",
      ru: "Доменные Типы: PaymentId и PaymentInstruction"
    },
    sourceCode: `package com.bank.payments.importing;

public record PaymentId(String value) {
    public PaymentId {
        if (value == null || value.isBlank()) {
            throw new IllegalArgumentException("paymentId required");
        }
    }

    public static PaymentId of(String value) {
        return new PaymentId(value);
    }
}

/** Mutable draft used only during row build — prefer factory + immutable result. */
public class PaymentInstruction {
    private PaymentId paymentId;
    private long amountCents;
    private String beneficiary;

    public void setPaymentId(PaymentId paymentId) { this.paymentId = paymentId; }
    public void setAmountCents(long amountCents) { this.amountCents = amountCents; }
    public void setBeneficiary(String beneficiary) { this.beneficiary = beneficiary; }

    public PaymentId getPaymentId() { return paymentId; }
    public long getAmountCents() { return amountCents; }
    public String getBeneficiary() { return beneficiary; }
}`,
    annotations: [
      {
        id: "ann_co_domain_1",
        startLine: 16,
        endLine: 28,
        category: "WHY_IT_EXISTS",
        title: { en: "Class Blueprint vs Instances", ru: "Чертёж Класса vs Экземпляры" },
        explanation: {
          en: "PaymentInstruction is the class. Each import row must become a distinct object — the class alone does not give you N independent payments.",
          ru: "PaymentInstruction — класс. Каждая строка импорта должна стать отдельным объектом — один класс сам по себе не даёт N независимых платежей."
        },
        conceptDemonstrated: "cpt_class_vs_object"
      }
    ],
    relatedQuestionIds: ["q_co_shared_draft_01"],
    conceptIds: ["cpt_class_vs_object"],
    tags: ["#payment-instruction", "#class"]
  },
  {
    id: "art_co_importer_broken",
    type: "COUNTER_EXAMPLE",
    language: "java",
    javaVersion: "17",
    title: {
      en: "Broken Baseline: Shared Draft PaymentImporter",
      ru: "Исходный Нарушенный Код: Shared Draft PaymentImporter"
    },
    sourceCode: `package com.bank.payments.importing;

import java.util.ArrayList;
import java.util.List;

public class PaymentBatch {
    private final List<PaymentInstruction> items = new ArrayList<>();
    public void add(PaymentInstruction instruction) { items.add(instruction); }
    public List<PaymentInstruction> items() { return List.copyOf(items); }
}

/**
 * BUG: one PaymentInstruction object aliased into the batch N times.
 */
public class PaymentImporter {
    public PaymentBatch importRows(List<String[]> rows) {
        PaymentBatch batch = new PaymentBatch();
        PaymentInstruction draft = new PaymentInstruction();
        for (String[] row : rows) {
            draft.setPaymentId(PaymentId.of(row[0]));
            draft.setAmountCents(Long.parseLong(row[1]));
            draft.setBeneficiary(row[2]);
            batch.add(draft);
        }
        return batch;
    }
}`,
    annotations: [
      {
        id: "ann_broken_co_1",
        startLine: 18,
        endLine: 18,
        category: "PROBLEM_IN_ORIGINAL_CODE",
        title: { en: "Draft Outside Loop", ru: "Draft Вне Цикла" },
        explanation: {
          en: "Single allocation — every row mutates the same heap object that the batch already references.",
          ru: "Одна аллокация — каждая строка мутирует тот же объект в куче, на который батч уже ссылается."
        },
        conceptDemonstrated: "cpt_object_reference"
      },
      {
        id: "ann_broken_co_2",
        startLine: 23,
        endLine: 23,
        category: "PROBLEM_IN_ORIGINAL_CODE",
        title: { en: "Same Reference Added", ru: "Добавлена Та Же Ссылка" },
        explanation: {
          en: "batch.add(draft) stores the pointer repeatedly — N slots, one object identity.",
          ru: "batch.add(draft) многократно сохраняет указатель — N слотов, одна идентичность объекта."
        },
        conceptDemonstrated: "cpt_independent_instances"
      }
    ],
    relatedQuestionIds: ["q_co_shared_draft_01"],
    conceptIds: ["cpt_object_reference", "cpt_independent_instances"],
    tags: ["#counter-example", "#shared-draft"]
  },
  {
    id: "art_co_factory",
    type: "CORRECT_SOLUTION",
    language: "java",
    javaVersion: "17",
    title: {
      en: "PaymentInstructionFactory: Independent Instances",
      ru: "PaymentInstructionFactory: Независимые Экземпляры"
    },
    sourceCode: `package com.bank.payments.importing;

public final class PaymentInstructionFactory {
    private PaymentInstructionFactory() {}

    public static PaymentInstruction fromCsvRow(String[] row) {
        PaymentInstruction instruction = new PaymentInstruction();
        instruction.setPaymentId(PaymentId.of(row[0]));
        instruction.setAmountCents(Long.parseLong(row[1]));
        instruction.setBeneficiary(row[2]);
        return instruction;
    }
}`,
    annotations: [
      {
        id: "ann_co_factory_1",
        startLine: 6,
        endLine: 11,
        category: "WHY_IT_EXISTS",
        title: { en: "Factory Allocates Per Call", ru: "Factory Аллоцирует на Вызов" },
        explanation: {
          en: "Each fromCsvRow call returns a new object — the importer can no longer accidentally share one draft field.",
          ru: "Каждый вызов fromCsvRow возвращает новый объект — importer больше не может случайно делить одно draft-поле."
        },
        conceptDemonstrated: "cpt_independent_instances"
      }
    ],
    relatedQuestionIds: ["q_co_shared_draft_01"],
    conceptIds: ["cpt_independent_instances"],
    tags: ["#factory", "#independent-instances"]
  },
  {
    id: "art_co_importer_solution",
    type: "CORRECT_SOLUTION",
    language: "java",
    javaVersion: "17",
    title: {
      en: "Fixed PaymentImporter: New Object per Row",
      ru: "Исправленный PaymentImporter: Новый Объект на Строку"
    },
    sourceCode: `package com.bank.payments.importing;

import java.util.List;

public class PaymentImporter {
    public PaymentBatch importRows(List<String[]> rows) {
        PaymentBatch batch = new PaymentBatch();
        for (String[] row : rows) {
            PaymentInstruction instruction = PaymentInstructionFactory.fromCsvRow(row);
            batch.add(instruction);
        }
        return batch;
    }
}`,
    annotations: [
      {
        id: "ann_sol_co_1",
        startLine: 7,
        endLine: 9,
        category: "HOW_IT_FIXES_THE_PROBLEM",
        title: { en: "Independent Reference per Add", ru: "Независимая Ссылка на Add" },
        explanation: {
          en: "Each iteration binds a new reference. Mutations to a later instruction cannot rewrite earlier batch entries.",
          ru: "Каждая итерация привязывает новую ссылку. Мутации поздней instruction не перепишут ранние записи батча."
        },
        conceptDemonstrated: "cpt_independent_instances"
      }
    ],
    relatedQuestionIds: ["q_co_shared_draft_01"],
    conceptIds: ["cpt_class_vs_object", "cpt_independent_instances"],
    tags: ["#solution", "#payment-importer"]
  },
  {
    id: "art_co_importer_bughunt",
    type: "COUNTER_EXAMPLE",
    language: "java",
    javaVersion: "17",
    title: {
      en: "Bug Hunt Snippet: Shared Draft Loop",
      ru: "Сниппет Bug Hunt: Цикл Shared Draft"
    },
    sourceCode: `public PaymentBatch importRows(List<String[]> rows) {
    PaymentBatch batch = new PaymentBatch();
    PaymentInstruction draft = new PaymentInstruction();
    for (String[] row : rows) {
        draft.setPaymentId(PaymentId.of(row[0]));
        draft.setAmountCents(Long.parseLong(row[1]));
        draft.setBeneficiary(row[2]);
        batch.add(draft);
    }
    return batch;
}`,
    annotations: [
      {
        id: "ann_bug_co_1",
        startLine: 8,
        endLine: 8,
        category: "PROBLEM_IN_ORIGINAL_CODE",
        title: { en: "Aliased Add", ru: "Aliased Add" },
        explanation: {
          en: "This is the line that stores the shared reference into the batch repeatedly.",
          ru: "Это строка, которая многократно сохраняет shared-ссылку в батч."
        },
        conceptDemonstrated: "cpt_object_reference"
      }
    ],
    relatedQuestionIds: ["q_co_shared_draft_01"],
    conceptIds: ["cpt_object_reference"],
    tags: ["#bug-hunt"]
  }
];
