import {
  FixBuilderChallenge,
  BugHuntChallenge,
  InterviewAnswerChallenge,
  Challenge
} from '../../../../../types/domain';

export const LSP_FIX_BUILDER_CHALLENGE: FixBuilderChallenge = {
  id: "chl_lsp_fix_builder",
  type: "FIX_BUILDER",
  missionId: "mis_liskov_substitution_principle",
  stageId: "stg_lsp_practice",
  title: {
    en: "Fix Builder: Restoring LSP in PaymentProcessor APIs",
    ru: "Конструктор Исправления: Восстановление LSP в PaymentProcessor API"
  },
  prompt: {
    en: "Select ALL production-safe redesigns that fix the BankTransfer refund LSP violation and REJECT dangerous quick fixes that preserve the broken PaymentProcessor hierarchy.",
    ru: "Выберите ВСЕ безопасные решения для устранения нарушения LSP в BankTransfer.refund() и ОТКЛОНИТЕ опасные костыли, сохраняющие сломанную иерархию PaymentProcessor."
  },
  difficulty: "SENIOR",
  assistanceLevel: "GUIDED",
  conceptIds: ["cpt_liskov_substitution", "cpt_behavioral_subtyping"],
  topicIds: ["top_oop_23"],
  tags: ["#lsp", "#payments", "#interface-segregation"],
  hintIds: ["hnt_lsp_1", "hnt_lsp_2", "hnt_lsp_3", "hnt_lsp_4"],
  xpReward: 100,
  order: 7,
  payload: {
    baseCodeArtifactId: "art_payment_processor_broken",
    solutionCodeArtifactId: "art_payment_processor_solution",
    options: [
      {
        id: "opt_lsp_fix_1",
        text: {
          en: "Split interfaces: PaymentProcessor (process-only) and RefundablePaymentProcessor (extends with refund()).",
          ru: "Разделить интерфейсы: PaymentProcessor (только process) и RefundablePaymentProcessor (расширяет refund())."
        },
        isCorrect: true,
        explanation: {
          en: "Correct. Interface segregation lets BankTransfer implement process-only without pretending refunds are supported.",
          ru: "Верно. Сегрегация интерфейсов позволяет BankTransfer реализовать только process, не притворяясь поддерживающим refund."
        }
      },
      {
        id: "opt_lsp_fix_2",
        text: {
          en: "Change reversePayment to accept RefundablePaymentProcessor so BankTransfer cannot be passed at compile time.",
          ru: "Изменить reversePayment для приема RefundablePaymentProcessor, чтобы BankTransfer нельзя было передать на этапе компиляции."
        },
        isCorrect: true,
        explanation: {
          en: "Correct. Capability-typed parameters prevent irreversible processors from reaching refund call sites.",
          ru: "Верно. Capability-типы в параметрах не дают необратимым процессорам попасть в места вызова refund."
        }
      },
      {
        id: "opt_lsp_fix_3",
        text: {
          en: "Have CardPayment implement both PaymentProcessor and RefundablePaymentProcessor; BankTransfer implements PaymentProcessor only.",
          ru: "CardPayment реализует и PaymentProcessor, и RefundablePaymentProcessor; BankTransfer — только PaymentProcessor."
        },
        isCorrect: true,
        explanation: {
          en: "Correct. Each subtype honors exactly the contracts it claims — CardPayment is refundable; BankTransfer is not.",
          ru: "Верно. Каждый подтип соблюдает ровно те контракты, которые заявляет — CardPayment поддерживает refund; BankTransfer — нет."
        }
      },
      {
        id: "opt_lsp_fix_distractor_1",
        text: {
          en: "Wrap processor.refund() in try/catch inside reversePayment and silently skip chargebacks for BankTransfer.",
          ru: "Обернуть processor.refund() в try/catch внутри reversePayment и молча пропускать chargeback для BankTransfer."
        },
        isCorrect: false,
        explanation: {
          en: "Incorrect. Swallowing exceptions hides failed chargebacks — the root LSP violation remains unfixed.",
          ru: "Неверно. Поглощение исключений скрывает сбои chargeback — корневое нарушение LSP остается неисправленным."
        }
      },
      {
        id: "opt_lsp_fix_distractor_2",
        text: {
          en: "Keep BankTransfer implementing PaymentProcessor but document in Javadoc that refund() throws UnsupportedOperationException.",
          ru: "Оставить BankTransfer реализующим PaymentProcessor, но задокументировать в Javadoc, что refund() бросает UnsupportedOperationException."
        },
        isCorrect: false,
        explanation: {
          en: "Incorrect. Documentation does not restore behavioral substitutability. Clients typed as PaymentProcessor cannot know about hidden restrictions.",
          ru: "Неверно. Документация не восстанавливает поведенческую взаимозаменяемость. Клиенты с типом PaymentProcessor не знают о скрытых ограничениях."
        }
      },
      {
        id: "opt_lsp_fix_distractor_3",
        text: {
          en: "Cast processor to CardPayment before calling refund() to force a refundable implementation at runtime.",
          ru: "Привести processor к CardPayment перед вызовом refund() для принудительной refundable-реализации в рантайме."
        },
        isCorrect: false,
        explanation: {
          en: "Incorrect. ClassCastException replaces UnsupportedOperationException — the design is still broken and BankTransfer remains non-substitutable.",
          ru: "Неверно. ClassCastException заменит UnsupportedOperationException — дизайн по-прежнему сломан, BankTransfer остается невзаимозаменяемым."
        }
      }
    ]
  }
};

export const LSP_BUG_HUNT_CHALLENGE: BugHuntChallenge = {
  id: "chl_lsp_bughunt",
  type: "BUG_HUNT",
  missionId: "mis_liskov_substitution_principle",
  stageId: "stg_lsp_debug",
  title: {
    en: "Bug Hunt: BankTransfer Refund LSP Violation Lines",
    ru: "Поиск Бага: Строки Нарушения LSP в BankTransfer.refund()"
  },
  prompt: {
    en: "Identify the line(s) where the LSP violation is defined and where the nightly chargeback batch crashes at runtime.",
    ru: "Найдите строку(и), где определено нарушение LSP и где ночной chargeback-батч падает в рантайме."
  },
  difficulty: "SENIOR",
  assistanceLevel: "APPLIED",
  conceptIds: ["cpt_liskov_substitution", "cpt_behavioral_subtyping"],
  topicIds: ["top_oop_23"],
  tags: ["#lsp", "#bug-hunt", "#payments"],
  hintIds: ["hnt_lsp_bug_1", "hnt_lsp_bug_2", "hnt_lsp_bug_3", "hnt_lsp_bug_4"],
  xpReward: 100,
  order: 10,
  payload: {
    baseCodeArtifactId: "art_payment_processor_bughunt",
    solutionCodeArtifactId: "art_payment_processor_solution",
    codeSnippet: `public class BankTransfer implements PaymentProcessor {
    public PaymentResult process(PaymentRequest request) {
        return new PaymentResult(request.paymentId(), true, "Wire sent");
    }

    public PaymentResult refund(PaymentRequest request) {
        throw new UnsupportedOperationException("Bank transfers cannot be refunded");
    }
}

public class PaymentOrchestrator {
    public void reversePayment(PaymentProcessor processor, PaymentRequest req) {
        processor.refund(req);
    }
}`,
    lines: [
      { lineNumber: 1, code: "public class BankTransfer implements PaymentProcessor {", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 2, code: "    public PaymentResult process(PaymentRequest request) {", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 3, code: "        return new PaymentResult(request.paymentId(), true, \"Wire sent\");", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 4, code: "    }", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 5, code: "", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 6, code: "    public PaymentResult refund(PaymentRequest request) {", isBug: false, explanation: { en: "", ru: "" } },
      {
        lineNumber: 7,
        code: "        throw new UnsupportedOperationException(\"Bank transfers cannot be refunded\");",
        isBug: true,
        explanation: {
          en: "Line 7: LSP violation root cause — subtype overrides refund() to throw an exception clients of PaymentProcessor do not expect.",
          ru: "Строка 7: Корневая причина нарушения LSP — подтип переопределяет refund() с исключением, которого клиенты PaymentProcessor не ожидают."
        }
      },
      { lineNumber: 8, code: "    }", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 9, code: "}", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 10, code: "", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 11, code: "public class PaymentOrchestrator {", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 12, code: "    public void reversePayment(PaymentProcessor processor, PaymentRequest req) {", isBug: false, explanation: { en: "", ru: "" } },
      {
        lineNumber: 13,
        code: "        processor.refund(req);",
        isBug: true,
        explanation: {
          en: "Line 13: Runtime crash site — reversePayment assumes any PaymentProcessor supports refund(), triggering UnsupportedOperationException for BankTransfer.",
          ru: "Строка 13: Место падения — reversePayment предполагает, что любой PaymentProcessor поддерживает refund(), вызывая UnsupportedOperationException для BankTransfer."
        }
      },
      { lineNumber: 14, code: "    }", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 15, code: "}", isBug: false, explanation: { en: "", ru: "" } }
    ]
  }
};

export const LSP_INTERVIEW_ANSWER_CHALLENGE: InterviewAnswerChallenge = {
  id: "chl_lsp_interview_answer",
  type: "INTERVIEW_ANSWER",
  missionId: "mis_liskov_substitution_principle",
  stageId: "stg_lsp_interview_a",
  title: {
    en: "Senior Interview: Explaining BankTransfer Refund LSP Violation",
    ru: "Senior-Интервью: Объяснение Нарушения LSP в BankTransfer.refund()"
  },
  prompt: {
    en: "Explain why BankTransfer implementing PaymentProcessor violates the Liskov Substitution Principle when reversePayment calls refund(), and how you would redesign the API.",
    ru: "Объясните, почему BankTransfer, реализующий PaymentProcessor, нарушает принцип подстановки Лисков при вызове refund() из reversePayment, и как вы перепроектируете API."
  },
  difficulty: "SENIOR",
  assistanceLevel: "INTERVIEW",
  conceptIds: ["cpt_liskov_substitution", "cpt_behavioral_subtyping"],
  topicIds: ["top_oop_23"],
  tags: ["#lsp", "#interview", "#payments", "#solid"],
  hintIds: [],
  xpReward: 100,
  order: 9,
  payload: {
    targetQuestionId: "q_lsp_payment_01",
    rubricDimensions: ["ELEVATOR_PITCH", "DEEP_MECHANICS", "PRODUCTION_TRADEOFFS"],
    expectedConcepts: [
      {
        id: "cpt_liskov_substitution",
        label: { en: "Behavioral Substitutability", ru: "Поведенческая Взаимозаменяемость" },
        keywords: ["liskov", "lsp", "substitut", "substitution", "substitutability", "лисков", "подстанов"]
      },
      {
        id: "cpt_behavioral_subtyping",
        label: { en: "Unexpected Exception / Contract Violation", ru: "Неожиданное Исключение / Нарушение Контракта" },
        keywords: ["unsupportedoperation", "refund", "contract", "precondition", "exception", "контракт", "исключение"]
      },
      {
        id: "cpt_interface_contracts",
        label: { en: "Segregate Refund Capability", ru: "Сегрегация Capability Refund" },
        keywords: ["segregation", "refundable", "interface", "capability", "сегрегация", "интерфейс"]
      },
      {
        id: "cpt_composition_over_inheritance",
        label: { en: "Separate RefundService Alternative", ru: "Альтернатива: Отдельный RefundService" },
        keywords: ["refundservice", "separate", "composition", "сервис", "отдельн"]
      }
    ],
    modelAnswer30s: {
      en: "BankTransfer violates LSP because it IS-A PaymentProcessor structurally but not behaviorally — callers reasonably expect refund() to succeed. Throwing UnsupportedOperationException strengthens preconditions and breaks substitutability. The fix is to segregate interfaces: PaymentProcessor for process-only, RefundablePaymentProcessor for refunds. CardPayment implements both; BankTransfer implements only PaymentProcessor.",
      ru: "BankTransfer нарушает LSP, потому что IS-A PaymentProcessor структурно, но не поведенчески — вызывающий код ожидает успешный refund(). UnsupportedOperationException усиливает предусловия и ломает взаимозаменяемость. Решение — сегрегация: PaymentProcessor только для process, RefundablePaymentProcessor для refund. CardPayment реализует оба; BankTransfer — только PaymentProcessor."
    },
    modelAnswerDetailed: {
      en: "LSP requires that any subtype S of T must be usable wherever T is expected without altering program correctness. reversePayment accepts PaymentProcessor and calls refund(). BankTransfer passes compile-time checks but refund() always throws — a strengthened precondition that base-type clients cannot anticipate. This is the same class of bug as optional operations hidden behind a fat interface: clients infer capability from the type, then crash when a subtype silently rejects the operation.",
      ru: "LSP требует, чтобы подтип S типа T был пригоден везде, где ожидается T, без нарушения корректности. reversePayment принимает PaymentProcessor и вызывает refund(). BankTransfer проходит компиляцию, но refund() всегда бросает исключение — усиленное предусловие, которое клиенты базового типа не предвидят. Это тот же класс бага, что и опциональные операции за жирным интерфейсом: клиенты выводят capability из типа и падают, когда подтип тайно отвергает операцию."
    },
    modelAnswerTradeOffs: {
      en: "Segregated interfaces add API surface area but eliminate entire classes of runtime failures. Alternatively, a separate RefundService that only accepts refundable payment IDs keeps PaymentProcessor process-only. Either approach makes irreversibility explicit in the type system instead of as a surprise exception.",
      ru: "Сегрегированные интерфейсы расширяют API, но устраняют целые классы runtime-сбоев. Альтернатива — отдельный RefundService, принимающий только refundable payment ID, оставляя PaymentProcessor только для process. Оба подхода делают необратимость явной в системе типов, а не сюрпризом в виде исключения."
    },
    followUpQuestionText: {
      en: "Interviewer Follow-Up: 'Is the classic Square extends Rectangle example the same kind of LSP violation as BankTransfer.refund()? When would you bring up Square/Rectangle in a senior interview?'",
      ru: "Вопрос интервьюера: 'Является ли классический пример Square extends Rectangle тем же нарушением LSP, что и BankTransfer.refund()? Когда уместно упомянуть Square/Rectangle на Senior-интервью?'"
    },
    followUpModelAnswerText: {
      en: "Yes, both violate LSP by breaking base-type behavioral expectations — Square.setWidth() silently changes height, BankTransfer.refund() throws. Square/Rectangle is the canonical textbook example for explaining the principle abstractly, but in senior payments/backend interviews, lead with the PaymentProcessor scenario because it demonstrates you recognize LSP failures in real APIs, not just geometry homework.",
      ru: "Да, оба нарушают LSP, ломая поведенческие ожидания базового типа — Square.setWidth() меняет высоту, BankTransfer.refund() бросает исключение. Square/Rectangle — канонический учебный пример для абстрактного объяснения, но на Senior payments/backend-интервью начинайте с PaymentProcessor-сценария, потому что он показывает распознавание LSP в реальных API."
    }
  }
};

export const ALL_LISKOV_CHALLENGES: readonly Challenge[] = [
  LSP_FIX_BUILDER_CHALLENGE,
  LSP_BUG_HUNT_CHALLENGE,
  LSP_INTERVIEW_ANSWER_CHALLENGE
];
