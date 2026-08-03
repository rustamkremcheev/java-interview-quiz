import { Mission, MissionStage, TheoryStage, PracticeStage, InterviewStage, BaseMissionStage } from '../../../../../types/domain';

const stage1: BaseMissionStage = {
  id: "stg_ov_intro",
  missionId: "mis_method_overriding_covariant",
  type: "MISSION_INTRODUCTION",
  order: 1,
  title: { en: "1. Mission Introduction", ru: "1. Введение в Миссию" },
  instructions: {
    en: "Inspect the billing incident below where CorporateInvoice enrichment never runs when InvoiceRepository references are used in production.",
    ru: "Изучите инцидент биллинга ниже, где обогащение CorporateInvoice никогда не выполняется при вызовах через ссылки InvoiceRepository на продакшене."
  }
};

const stage2: BaseMissionStage = {
  id: "stg_ov_problem",
  missionId: "mis_method_overriding_covariant",
  type: "REAL_ENGINEERING_PROBLEM",
  order: 2,
  title: { en: "2. Real Engineering Problem", ru: "2. Реальная Инженерная Проблема" },
  instructions: {
    en: "Examine CorporateInvoiceRepository — the developer intended a covariant findById override returning CorporateInvoice, but the method was accidentally overloaded instead of overridden.",
    ru: "Изучите CorporateInvoiceRepository — разработчик намеревался ковариантно переопределить findById с возвратом CorporateInvoice, но метод случайно оказался перегружен, а не переопределён."
  }
};

const stage3: BaseMissionStage = {
  id: "stg_ov_think",
  missionId: "mis_method_overriding_covariant",
  type: "THINK_YOURSELF",
  order: 3,
  title: { en: "3. Think Yourself Diagnostic", ru: "3. Диагностика: Подумайте Сам" },
  instructions: {
    en: "Formulate your initial hypothesis: Why does InvoiceRepository ref.findById(id) return a plain Invoice without tax residency enrichment even when the runtime type is CorporateInvoiceRepository?",
    ru: "Сформулируйте гипотезу: почему InvoiceRepository ref.findById(id) возвращает обычный Invoice без обогащения tax residency, даже когда runtime-тип — CorporateInvoiceRepository?"
  }
};

const stage4: BaseMissionStage = {
  id: "stg_ov_help",
  missionId: "mis_method_overriding_covariant",
  type: "NEED_HELP",
  order: 4,
  title: { en: "4. Need Knowledge Bridge", ru: "4. Мост к Знаниям" },
  instructions: {
    en: "No-penalty bridge to deep theory on JLS 8.4.8 overriding rules, @Override validation, covariant returns, and checked exception narrowing.",
    ru: "Бесштрафной переход к теории JLS 8.4.8 о правилах переопределения, валидации @Override, ковариантных возвратах и сужении checked-исключений."
  }
};

const stage5: TheoryStage = {
  id: "stg_ov_theory",
  missionId: "mis_method_overriding_covariant",
  type: "THEORY",
  order: 5,
  title: { en: "5. Core Theory & Checkpoints", ru: "5. Фундаментальная Теория и Проверки" },
  instructions: {
    en: "Study the 4 theory sections covering overriding vs overloading, @Override, covariant returns, exception rules, and senior interview follow-ups.",
    ru: "Изучите 4 раздела теории о переопределении vs перегрузке, @Override, ковариантных возвратах, правилах исключений и доп. вопросах Senior-интервью."
  },
  theoryArticleId: "art_theory_overriding_covariant"
};

const stage6: BaseMissionStage = {
  id: "stg_ov_visual",
  missionId: "mis_method_overriding_covariant",
  type: "VISUALIZATION",
  order: 6,
  title: { en: "6. Interactive Dispatch Visualization", ru: "6. Визуализация Диспетчеризации" },
  instructions: {
    en: "Compare vtable dispatch for a true override against compile-time overload resolution when signatures diverge without @Override.",
    ru: "Сравните vtable-диспетчеризацию истинного override с compile-time разрешением перегрузки при расхождении сигнатур без @Override."
  }
};

const stage7: PracticeStage = {
  id: "stg_ov_practice",
  missionId: "mis_method_overriding_covariant",
  type: "INTERACTIVE_PRACTICE",
  order: 7,
  title: { en: "7. Guided Practice: Fix Builder", ru: "7. Практика: Конструктор Исправления" },
  instructions: {
    en: "Assemble the structural code elements required to correctly override InvoiceRepository.findById with a covariant CorporateInvoice return.",
    ru: "Соберите элементы кода для корректного переопределения InvoiceRepository.findById с ковариантным возвратом CorporateInvoice."
  },
  challengeId: "chl_ov_fix_builder"
};

const stage8: InterviewStage = {
  id: "stg_ov_interview_q",
  missionId: "mis_method_overriding_covariant",
  type: "INTERVIEW_QUESTION",
  order: 8,
  title: { en: "8. Senior Interview Scenario", ru: "8. Сценарий Senior-Интервью" },
  instructions: {
    en: "Review the authentic senior interview question about silent overload bugs and covariant returns in invoice repositories.",
    ru: "Ознакомьтесь с реальным вопросом Senior-собеседования о тихой перегрузке и ковариантных возвратах в invoice-репозиториях."
  },
  interviewQuestionId: "q_ov_invoice_01",
  challengeId: "chl_ov_interview_answer"
};

const stage9: InterviewStage = {
  id: "stg_ov_interview_a",
  missionId: "mis_method_overriding_covariant",
  type: "INTERVIEW_ANSWER",
  order: 9,
  title: { en: "9. Interview Verbal Answer", ru: "9. Устный Ответ и Модель" },
  instructions: {
    en: "Formulate your structured verbal response (Elevator Pitch + JLS Mechanics + Trade-offs) and submit for evaluation.",
    ru: "Сформулируйте структурированный ответ (Elevator Pitch + Механика JLS + Компромиссы) и отправьте на проверку."
  },
  interviewQuestionId: "q_ov_invoice_01",
  challengeId: "chl_ov_interview_answer"
};

const stage10: PracticeStage = {
  id: "stg_ov_debug",
  missionId: "mis_method_overriding_covariant",
  type: "DEBUG_COUNTER_EXAMPLE",
  order: 10,
  title: { en: "10. Applied Bug Hunt: BillingLookupService", ru: "10. Поиск Бага: BillingLookupService" },
  instructions: {
    en: "Identify the line in CorporateInvoiceRepository where a signature mismatch silently overloads findById instead of overriding it.",
    ru: "Найдите строку в CorporateInvoiceRepository, где расхождение сигнатуры тихо перегружает findById вместо переопределения."
  },
  challengeId: "chl_ov_bughunt"
};

const stage11: BaseMissionStage = {
  id: "stg_ov_related",
  missionId: "mis_method_overriding_covariant",
  type: "RELATED_TOPICS",
  order: 11,
  title: { en: "11. Related Knowledge Nodes", ru: "11. Связанные Узлы Знаний" },
  instructions: {
    en: "Explore lateral graph connections to inheritance, polymorphism, method overloading, and dynamic dispatch.",
    ru: "Исследуйте связи Графа Знаний для перехода к наследованию, полиморфизму, перегрузке методов и динамической диспетчеризации."
  }
};

const stage12: BaseMissionStage = {
  id: "stg_ov_results",
  missionId: "mis_method_overriding_covariant",
  type: "MISSION_RESULTS",
  order: 12,
  title: { en: "12. Mission Performance Summary", ru: "12. Итоги Прохождения Миссии" },
  instructions: {
    en: "Review your performance metrics, concepts strengthened, and XP awarded.",
    ru: "Просмотрите метрики прохождения, укрепившиеся концепции и заработанный XP."
  }
};

const stage13: BaseMissionStage = {
  id: "stg_ov_reflection",
  missionId: "mis_method_overriding_covariant",
  type: "REFLECTION",
  order: 13,
  title: { en: "13. Engineering Reflection", ru: "13. Инженерная Рефлексия" },
  instructions: {
    en: "Write a 1-sentence reflection on which @Override / covariant-return rule you will enforce in code reviews.",
    ru: "Напишите 1 предложение о том, какое правило @Override / ковариантного возврата вы введете на код-ревью."
  }
};

export const METHOD_OVERRIDING_COVARIANT_MISSION_STAGES: readonly MissionStage[] = [
  stage1, stage2, stage3, stage4, stage5, stage6, stage7, stage8, stage9, stage10, stage11, stage12, stage13
];

export const METHOD_OVERRIDING_COVARIANT_MISSION: Mission = {
  id: "mis_method_overriding_covariant",
  primaryTopicId: "top_oop_15",
  secondaryTopicIds: ["top_oop_10", "top_oop_11", "top_oop_14"],
  slug: "silent-overload-invoice-repository",
  title: {
    en: "The Silent Overload: @Override and Covariant Returns in InvoiceRepository",
    ru: "Тихая Перегрузка: @Override и Ковариантные Возвраты в InvoiceRepository"
  },
  description: {
    en: "Diagnose a silent overload in CorporateInvoiceRepository where a missing @Override and signature mismatch prevented covariant findById override — polymorphic InvoiceRepository calls skipped corporate enrichment.",
    ru: "Диагностируйте тихую перегрузку в CorporateInvoiceRepository, где отсутствие @Override и расхождение сигнатуры помешали ковариантному переопределению findById — полиморфные вызовы через InvoiceRepository пропускали corporate-обогащение."
  },
  scenarioIntroduction: {
    en: "The invoice billing team's nightly corporate settlement job started posting incomplete tax residency data. CorporateInvoiceRepository was supposed to override InvoiceRepository.findById(String) with a covariant CorporateInvoice return that loads enrichment fields. A recent refactor dropped @Override and changed the parameter type to InvoiceKey — the code still compiled. Every polymorphic call through an InvoiceRepository reference invoked the parent method and returned a plain Invoice without corporate fields.",
    ru: "Ночной corporate settlement job команды биллинга начал постить неполные данные tax residency. CorporateInvoiceRepository должен был переопределить InvoiceRepository.findById(String) с ковариантным возвратом CorporateInvoice и полями обогащения. Недавний рефакторинг убрал @Override и сменил тип параметра на InvoiceKey — код всё ещё компилировался. Каждый полиморфный вызов через ссылку InvoiceRepository вызывал метод родителя и возвращал обычный Invoice без corporate-полей."
  },
  engineeringProblem: {
    en: "CorporateInvoiceRepository declared findById(InvoiceKey) without @Override while the base InvoiceRepository exposes findById(String) returning Invoice. Because the signatures are not override-equivalent, the subclass method is an overload — not an override. Polymorphic dispatch via InvoiceRepository never reaches corporate enrichment. The fix requires matching the parameter list, adding @Override, returning the covariant subtype CorporateInvoice, and declaring only narrower (or fewer) checked exceptions than the parent.",
    ru: "CorporateInvoiceRepository объявил findById(InvoiceKey) без @Override, тогда как базовый InvoiceRepository предоставляет findById(String), возвращающий Invoice. Сигнатуры не override-equivalent, поэтому метод подкласса — перегрузка, а не переопределение. Полиморфная диспетчеризация через InvoiceRepository никогда не достигает corporate-обогащения. Фикс: совпадающий список параметров, @Override, ковариантный возврат CorporateInvoice и только более узкие (или меньшее число) checked-исключений, чем у родителя."
  },
  learningObjectives: [
    {
      en: "Distinguish method overriding from accidental overloading and explain why missing @Override allows silent compile-time acceptance of wrong signatures",
      ru: "Различать переопределение методов и случайную перегрузку и объяснить, почему отсутствие @Override позволяет компилятору молча принять неверную сигнатуру"
    },
    {
      en: "Apply JLS 8.4.8 rules for override-equivalent signatures, covariant return types, and access modifier widening",
      ru: "Применить правила JLS 8.4.8 для override-equivalent сигнатур, ковариантных возвращаемых типов и расширения видимости"
    },
    {
      en: "Enforce checked-exception narrowing: overrides may declare fewer or narrower checked exceptions, never broader ones",
      ru: "Соблюдать сужение checked-исключений: override может объявлять меньше или более узкие checked-исключения, но никогда более широкие"
    },
    {
      en: "Use covariant returns so CorporateInvoiceRepository.findById returns CorporateInvoice while remaining substitutable for InvoiceRepository",
      ru: "Использовать ковариантные возвраты, чтобы CorporateInvoiceRepository.findById возвращал CorporateInvoice, оставаясь подставляемым за InvoiceRepository"
    }
  ],
  requiredConceptIds: ["cpt_method_overriding", "cpt_covariant_returns"],
  recommendedConceptIds: ["cpt_liskov_substitution"],
  stageIds: METHOD_OVERRIDING_COVARIANT_MISSION_STAGES.map((s) => s.id),
  challengeIds: ["chl_ov_fix_builder", "chl_ov_bughunt", "chl_ov_interview_answer"],
  estimatedMinutes: 25,
  difficulty: "SENIOR",
  xpReward: 250,
  version: "1.0.0"
};
