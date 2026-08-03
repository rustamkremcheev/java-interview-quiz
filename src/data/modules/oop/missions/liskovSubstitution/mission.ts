import { Mission, MissionStage, TheoryStage, PracticeStage, InterviewStage, BaseMissionStage } from '../../../../../types/domain';

const stage1: BaseMissionStage = {
  id: "stg_lsp_intro",
  missionId: "mis_liskov_substitution_principle",
  type: "MISSION_INTRODUCTION",
  order: 1,
  title: { en: "1. Nightly Chargeback Batch Failure", ru: "1. Сбой Ночного Chargeback-Батча" },
  instructions: {
    en: "Inspect the production incident below where a payment orchestration chargeback batch crashed when BankTransfer was substituted for PaymentProcessor.",
    ru: "Изучите инцидент на продакшене, где chargeback-батч оркестрации платежей упал при подстановке BankTransfer вместо PaymentProcessor."
  }
};

const stage2: BaseMissionStage = {
  id: "stg_lsp_problem",
  missionId: "mis_liskov_substitution_principle",
  type: "REAL_ENGINEERING_PROBLEM",
  order: 2,
  title: { en: "2. Real Engineering Problem", ru: "2. Реальная Инженерная Проблема" },
  instructions: {
    en: "Examine reversePayment(PaymentProcessor, PaymentRequest) calling processor.refund(req), while BankTransfer implements PaymentProcessor but throws UnsupportedOperationException from refund().",
    ru: "Изучите reversePayment(PaymentProcessor, PaymentRequest), вызывающий processor.refund(req), в то время как BankTransfer реализует PaymentProcessor, но бросает UnsupportedOperationException из refund()."
  }
};

const stage3: BaseMissionStage = {
  id: "stg_lsp_think",
  missionId: "mis_liskov_substitution_principle",
  type: "THINK_YOURSELF",
  order: 3,
  title: { en: "3. Think Yourself Diagnostic", ru: "3. Диагностика: Подумайте Сам" },
  instructions: {
    en: "Formulate your initial hypothesis: Why did UnsupportedOperationException surface at runtime if BankTransfer IS-A PaymentProcessor and CardPayment refunds work fine?",
    ru: "Сформулируйте гипотезу: почему UnsupportedOperationException возник в рантайме, если BankTransfer IS-A PaymentProcessor, а refund у CardPayment работает корректно?"
  }
};

const stage4: BaseMissionStage = {
  id: "stg_lsp_help",
  missionId: "mis_liskov_substitution_principle",
  type: "NEED_HELP",
  order: 4,
  title: { en: "4. Knowledge Bridge", ru: "4. Мост к Знаниям" },
  instructions: {
    en: "No-penalty transition to behavioral subtyping contracts and payment API interface segregation.",
    ru: "Бесштрафной переход к контрактам поведенческого подтипирования и сегрегации интерфейсов платежных API."
  }
};

const stage5: TheoryStage = {
  id: "stg_lsp_theory",
  missionId: "mis_liskov_substitution_principle",
  type: "THEORY",
  order: 5,
  title: { en: "5. Core Theory & Checkpoints", ru: "5. Фундаментальная Теория и Проверки" },
  instructions: {
    en: "Study the 4 theory sections covering LSP, behavioral contracts, payment processor API design, and 12 senior interview follow-up questions.",
    ru: "Изучите 4 раздела теории о LSP, поведенческих контрактах, проектировании PaymentProcessor API и 12 вопросах Senior-интервью."
  },
  theoryArticleId: "art_theory_liskov"
};

const stage6: BaseMissionStage = {
  id: "stg_lsp_visual",
  missionId: "mis_liskov_substitution_principle",
  type: "VISUALIZATION",
  order: 6,
  title: { en: "6. Interactive Substitution Visualization", ru: "6. Визуализация Подстановки Подтипов" },
  instructions: {
    en: "Compare expected PaymentProcessor.refund() behavior against BankTransfer throwing UnsupportedOperationException at runtime.",
    ru: "Сравните ожидаемое поведение PaymentProcessor.refund() с BankTransfer, бросающим UnsupportedOperationException в рантайме."
  }
};

const stage7: PracticeStage = {
  id: "stg_lsp_practice",
  missionId: "mis_liskov_substitution_principle",
  type: "INTERACTIVE_PRACTICE",
  order: 7,
  title: { en: "7. Guided Practice: Fix Builder", ru: "7. Практика: Конструктор Исправления" },
  instructions: {
    en: "Select production-safe API redesigns that restore substitutability without forcing irreversible wire transfers to pretend they support refunds.",
    ru: "Выберите безопасные решения для восстановления подстановки без принуждения необратимых wire-переводов притворяться поддерживающими refund."
  },
  challengeId: "chl_lsp_fix_builder"
};

const stage8: InterviewStage = {
  id: "stg_lsp_interview_q",
  missionId: "mis_liskov_substitution_principle",
  type: "INTERVIEW_QUESTION",
  order: 8,
  title: { en: "8. Senior Interview Scenario", ru: "8. Сценарий Senior-Интервью" },
  instructions: {
    en: "Review the authentic senior interview question about LSP violations in PaymentProcessor APIs.",
    ru: "Ознакомьтесь с реальным вопросом Senior-собеседования о нарушениях LSP в PaymentProcessor API."
  },
  interviewQuestionId: "q_lsp_payment_01",
  challengeId: "chl_lsp_interview_answer"
};

const stage9: InterviewStage = {
  id: "stg_lsp_interview_a",
  missionId: "mis_liskov_substitution_principle",
  type: "INTERVIEW_ANSWER",
  order: 9,
  title: { en: "9. Interview Verbal Answer", ru: "9. Устный Ответ и Модель" },
  instructions: {
    en: "Formulate your 90-second structured verbal response (Elevator Pitch + Mechanics + Trade-offs) and submit for evaluation.",
    ru: "Сформулируйте структурированный 90-секундный ответ (Elevator Pitch + Механика + Компромиссы) и отправьте на проверку."
  },
  interviewQuestionId: "q_lsp_payment_01",
  challengeId: "chl_lsp_interview_answer"
};

const stage10: PracticeStage = {
  id: "stg_lsp_debug",
  missionId: "mis_liskov_substitution_principle",
  type: "DEBUG_COUNTER_EXAMPLE",
  order: 10,
  title: { en: "10. Applied Bug Hunt: BankTransfer Refund", ru: "10. Поиск Бага: Refund в BankTransfer" },
  instructions: {
    en: "Identify the lines in the code viewer where the LSP violation is introduced and where the runtime failure occurs.",
    ru: "Найдите строки в редакторе кода, где вводится нарушение LSP и где происходит сбой в рантайме."
  },
  challengeId: "chl_lsp_bughunt"
};

const stage11: BaseMissionStage = {
  id: "stg_lsp_related",
  missionId: "mis_liskov_substitution_principle",
  type: "RELATED_TOPICS",
  order: 11,
  title: { en: "11. Related Knowledge & Follow-ups", ru: "11. Связанные Знания и Вопросы" },
  instructions: {
    en: "Review 12 senior interview follow-up questions and explore connections across Inheritance, Interface Segregation, and SOLID.",
    ru: "Изучите 12 вопросов Senior-уровня и исследуйте связи с Наследованием, Interface Segregation и SOLID."
  }
};

const stage12: BaseMissionStage = {
  id: "stg_lsp_results",
  missionId: "mis_liskov_substitution_principle",
  type: "MISSION_RESULTS",
  order: 12,
  title: { en: "12. Performance & Mistakes Summary", ru: "12. Итоги и Разбор Ошибок" },
  instructions: {
    en: "Review performance metrics and common candidate interview mistakes around behavioral subtyping.",
    ru: "Просмотрите метрики прохождения и распространенные ошибки кандидатов при обсуждении поведенческого подтипирования."
  }
};

const stage13: BaseMissionStage = {
  id: "stg_lsp_reflection",
  missionId: "mis_liskov_substitution_principle",
  type: "REFLECTION",
  order: 13,
  title: { en: "13. Production Engineering Reflection", ru: "13. Инженерная Рефлексия" },
  instructions: {
    en: "Write a 1-sentence reflection on which LSP rule you will enforce during payment API and inheritance code reviews.",
    ru: "Напишите 1 предложение о том, какое правило LSP вы будете проверять на код-ревью платежных API и наследования."
  }
};

export const LISKOV_SUBSTITUTION_MISSION_STAGES: readonly MissionStage[] = [
  stage1, stage2, stage3, stage4, stage5, stage6, stage7, stage8, stage9, stage10, stage11, stage12, stage13
];

export const LISKOV_SUBSTITUTION_MISSION: Mission = {
  id: "mis_liskov_substitution_principle",
  primaryTopicId: "top_oop_23",
  secondaryTopicIds: ["top_oop_11", "top_oop_09", "top_oop_16"],
  slug: "bank-transfer-refund-lsp-violation",
  title: {
    en: "Irreversible Wire: Liskov Substitution in PaymentProcessor APIs",
    ru: "Необратимый Wire: Принцип Подстановки Лисков в PaymentProcessor API"
  },
  description: {
    en: "Diagnose why a nightly chargeback batch crashed when BankTransfer was substituted for PaymentProcessor, exposing a behavioral subtyping violation — refund() throws UnsupportedOperationException while the base contract assumes refunds are supported.",
    ru: "Диагностируйте, почему ночной chargeback-батч упал при подстановке BankTransfer вместо PaymentProcessor — нарушение поведенческого подтипирования: refund() бросает UnsupportedOperationException, хотя базовый контракт предполагает поддержку refund."
  },
  scenarioIntroduction: {
    en: "At 02:17 UTC, the nightly chargeback batch failed with UnsupportedOperationException. The payment orchestration service types all processors as PaymentProcessor and calls process(PaymentRequest) then refund(PaymentRequest). CardPayment implements both correctly. BankTransfer implements PaymentProcessor but refund() throws — wire transfers are irreversible. Unit tests passed because mocks always returned CardPayment instances.",
    ru: "В 02:17 UTC ночной chargeback-батч упал с UnsupportedOperationException. Сервис оркестрации платежей типизирует все процессоры как PaymentProcessor и вызывает process(PaymentRequest), затем refund(PaymentRequest). CardPayment реализует оба метода корректно. BankTransfer реализует PaymentProcessor, но refund() бросает исключение — wire-переводы необратимы. Юнит-тесты проходили, потому что моки всегда возвращали CardPayment."
  },
  engineeringProblem: {
    en: "BankTransfer implements PaymentProcessor but strengthens the refund() contract by throwing UnsupportedOperationException (\"Bank transfers cannot be refunded\"). Clients typed as PaymentProcessor reasonably expect refund() to succeed. Structural subtyping (IS-A PaymentProcessor) held at compile time, but behavioral subtyping failed at runtime — a classic LSP violation where a subtype throws unexpected exceptions / strengthens preconditions.",
    ru: "BankTransfer реализует PaymentProcessor, но усиливает контракт refund(), бросая UnsupportedOperationException (\"Bank transfers cannot be refunded\"). Клиенты с типом PaymentProcessor обоснованно ожидают успешного refund(). Структурное подтипирование (IS-A PaymentProcessor) работало на этапе компиляции, но поведенческое подтипирование сломалось в рантайме — классическое нарушение LSP, где подтип бросает неожиданные исключения / усиливает предусловия."
  },
  learningObjectives: [
    {
      en: "Understand LSP as behavioral substitutability, not merely structural inheritance (IS-A)",
      ru: "Понять LSP как поведенческую взаимозаменяемость, а не только структурное наследование (IS-A)"
    },
    {
      en: "Identify when a subtype strengthens preconditions by throwing exceptions the base contract does not anticipate",
      ru: "Определять, когда подтип усиливает предусловия, бросая исключения, которых базовый контракт не предполагает"
    },
    {
      en: "Redesign APIs with interface segregation: PaymentProcessor (process-only) vs RefundablePaymentProcessor",
      ru: "Перепроектировать API через сегрегацию интерфейсов: PaymentProcessor (только process) vs RefundablePaymentProcessor"
    },
    {
      en: "Apply production-safe patterns: capability interfaces and separate RefundService for reversible payments",
      ru: "Применять безопасные паттерны: capability-интерфейсы и отдельный RefundService для обратимых платежей"
    }
  ],
  requiredConceptIds: ["cpt_liskov_substitution", "cpt_behavioral_subtyping"],
  recommendedConceptIds: ["cpt_composition_over_inheritance", "cpt_interface_contracts"],
  stageIds: LISKOV_SUBSTITUTION_MISSION_STAGES.map((s) => s.id),
  challengeIds: ["chl_lsp_fix_builder", "chl_lsp_bughunt", "chl_lsp_interview_answer"],
  estimatedMinutes: 25,
  difficulty: "SENIOR",
  xpReward: 250,
  version: "1.0.0"
};
