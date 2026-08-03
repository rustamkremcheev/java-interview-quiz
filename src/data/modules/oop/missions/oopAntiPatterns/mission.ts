import { Mission, MissionStage, TheoryStage, PracticeStage, InterviewStage, BaseMissionStage } from '../../../../../types/domain';

const stage1: BaseMissionStage = {
  id: "stg_ap_intro",
  missionId: "mis_oop_anti_patterns",
  type: "MISSION_INTRODUCTION",
  order: 1,
  title: { en: "1. Mission Introduction", ru: "1. Введение в Миссию" },
  instructions: {
    en: "Inspect the production incident below where OrderFulfillmentService — a 4000-line God Class — duplicated order validation and shipped unpaid inventory.",
    ru: "Изучите инцидент на продакшене, где OrderFulfillmentService — God Class на 4000 строк — продублировал валидацию заказа и отгрузил неоплаченный инвентарь."
  }
};

const stage2: BaseMissionStage = {
  id: "stg_ap_problem",
  missionId: "mis_oop_anti_patterns",
  type: "REAL_ENGINEERING_PROBLEM",
  order: 2,
  title: { en: "2. Real Engineering Problem", ru: "2. Реальная Инженерная Проблема" },
  instructions: {
    en: "Examine the anemic Order DTO (getters/setters only) and OrderFulfillmentService that validates, reserves inventory, charges cards, emails, ships, and audits — all via Feature Envy getters.",
    ru: "Изучите анемичный Order DTO (только getters/setters) и OrderFulfillmentService, который валидирует, резервирует инвентарь, списывает карту, шлёт email, отгружает и пишет audit — всё через Feature Envy getters."
  }
};

const stage3: BaseMissionStage = {
  id: "stg_ap_think",
  missionId: "mis_oop_anti_patterns",
  type: "THINK_YOURSELF",
  order: 3,
  title: { en: "3. Think Yourself Diagnostic", ru: "3. Диагностика: Подумайте Сам" },
  instructions: {
    en: "Formulate your initial hypothesis: Why does pushing all order rules into OrderFulfillmentService while Order holds only getters/setters create duplicated validation and untestable fulfillment?",
    ru: "Сформулируйте гипотезу: почему вынос всех правил заказа в OrderFulfillmentService при Order только с getters/setters создаёт дублированную валидацию и нетестируемый fulfillment?"
  }
};

const stage4: BaseMissionStage = {
  id: "stg_ap_help",
  missionId: "mis_oop_anti_patterns",
  type: "NEED_HELP",
  order: 4,
  title: { en: "4. Need Knowledge Bridge", ru: "4. Мост к Знаниям" },
  instructions: {
    en: "No-penalty bridge to deep theory on Anemic Domain Model (Fowler), God Class, Feature Envy, and Tell Don't Ask.",
    ru: "Бесштрафной переход к теории Anemic Domain Model (Fowler), God Class, Feature Envy и Tell Don't Ask."
  }
};

const stage5: TheoryStage = {
  id: "stg_ap_theory",
  missionId: "mis_oop_anti_patterns",
  type: "THEORY",
  order: 5,
  title: { en: "5. Core Theory & Checkpoints", ru: "5. Фундаментальная Теория и Проверки" },
  instructions: {
    en: "Study the 4 theory sections covering Anemic Domain Model, God Class, Feature Envy / Tell Don't Ask, and senior interview follow-ups.",
    ru: "Изучите 4 раздела теории об Anemic Domain Model, God Class, Feature Envy / Tell Don't Ask и доп. вопросах Senior-интервью."
  },
  theoryArticleId: "art_theory_anti_patterns"
};

const stage6: BaseMissionStage = {
  id: "stg_ap_visual",
  missionId: "mis_oop_anti_patterns",
  type: "VISUALIZATION",
  order: 6,
  title: { en: "6. Interactive Anemic vs Rich Order Visualization", ru: "6. Визуализация Anemic vs Rich Order" },
  instructions: {
    en: "Compare the anemic Order + God Class service graph against a rich Order aggregate with InventoryService and PaymentCapturePort collaborators.",
    ru: "Сравните граф анемичного Order + God Class сервиса с богатым агрегатом Order и коллабораторами InventoryService и PaymentCapturePort."
  }
};

const stage7: PracticeStage = {
  id: "stg_ap_practice",
  missionId: "mis_oop_anti_patterns",
  type: "INTERACTIVE_PRACTICE",
  order: 7,
  title: { en: "7. Guided Practice: Fix Builder", ru: "7. Практика: Конструктор Исправления" },
  instructions: {
    en: "Assemble the structural code elements required to replace the anemic Order + God Class with a rich Order aggregate and segregated ports.",
    ru: "Соберите элементы кода для замены анемичного Order + God Class на богатый агрегат Order и выделенные порты."
  },
  challengeId: "chl_ap_fix_builder"
};

const stage8: InterviewStage = {
  id: "stg_ap_interview_q",
  missionId: "mis_oop_anti_patterns",
  type: "INTERVIEW_QUESTION",
  order: 8,
  title: { en: "8. Senior Interview Scenario", ru: "8. Сценарий Senior-Интервью" },
  instructions: {
    en: "Review the authentic senior interview question about Anemic Domain Model and God Class in order fulfillment pipelines.",
    ru: "Ознакомьтесь с реальным вопросом Senior-собеседования об Anemic Domain Model и God Class в пайплайне fulfillment заказов."
  },
  interviewQuestionId: "q_ap_order_01",
  challengeId: "chl_ap_interview_answer"
};

const stage9: InterviewStage = {
  id: "stg_ap_interview_a",
  missionId: "mis_oop_anti_patterns",
  type: "INTERVIEW_ANSWER",
  order: 9,
  title: { en: "9. Interview Verbal Answer", ru: "9. Устный Ответ и Модель" },
  instructions: {
    en: "Formulate your structured verbal response (Elevator Pitch + Domain Mechanics + Trade-offs) and submit for evaluation.",
    ru: "Сформулируйте структурированный ответ (Elevator Pitch + Механика Домена + Компромиссы) и отправьте на проверку."
  },
  interviewQuestionId: "q_ap_order_01",
  challengeId: "chl_ap_interview_answer"
};

const stage10: PracticeStage = {
  id: "stg_ap_debug",
  missionId: "mis_oop_anti_patterns",
  type: "DEBUG_COUNTER_EXAMPLE",
  order: 10,
  title: { en: "10. Applied Bug Hunt: OrderFulfillmentService", ru: "10. Поиск Бага: OrderFulfillmentService" },
  instructions: {
    en: "Identify the line(s) in OrderFulfillmentService where Feature Envy getters bypass Order invariants and ship unpaid inventory.",
    ru: "Найдите строку(и) в OrderFulfillmentService, где Feature Envy getters обходят инварианты Order и отгружают неоплаченный инвентарь."
  },
  challengeId: "chl_ap_bughunt"
};

const stage11: BaseMissionStage = {
  id: "stg_ap_related",
  missionId: "mis_oop_anti_patterns",
  type: "RELATED_TOPICS",
  order: 11,
  title: { en: "11. Related Knowledge Nodes", ru: "11. Связанные Узлы Знаний" },
  instructions: {
    en: "Explore lateral graph connections to coupling/cohesion, domain modeling aggregates, and SOLID SRP/ISP boundaries.",
    ru: "Исследуйте связи Графа Знаний для перехода к coupling/cohesion, доменным агрегатам и границам SOLID SRP/ISP."
  }
};

const stage12: BaseMissionStage = {
  id: "stg_ap_results",
  missionId: "mis_oop_anti_patterns",
  type: "MISSION_RESULTS",
  order: 12,
  title: { en: "12. Mission Performance Summary", ru: "12. Итоги Прохождения Миссии" },
  instructions: {
    en: "Review your performance metrics, concepts strengthened, and XP awarded.",
    ru: "Просмотрите метрики прохождения, укрепившиеся концепции и заработанный XP."
  }
};

const stage13: BaseMissionStage = {
  id: "stg_ap_reflection",
  missionId: "mis_oop_anti_patterns",
  type: "REFLECTION",
  order: 13,
  title: { en: "13. Engineering Reflection", ru: "13. Инженерная Рефлексия" },
  instructions: {
    en: "Write a 1-sentence reflection on which anti-pattern smell you will flag first in order-service code reviews.",
    ru: "Напишите 1 предложение о том, какой запах антипаттерна вы первым отметите на код-ревью order-сервисов."
  }
};

export const OOP_ANTI_PATTERNS_MISSION_STAGES: readonly MissionStage[] = [
  stage1, stage2, stage3, stage4, stage5, stage6, stage7, stage8, stage9, stage10, stage11, stage12, stage13
];

export const OOP_ANTI_PATTERNS_MISSION: Mission = {
  id: "mis_oop_anti_patterns",
  primaryTopicId: "top_oop_32",
  secondaryTopicIds: ["top_oop_18", "top_oop_33", "top_oop_23"],
  slug: "god-class-order-fulfillment",
  title: {
    en: "The 4000-Line God Class: Anemic Order and OrderFulfillmentService",
    ru: "God Class на 4000 Строк: Anemic Order и OrderFulfillmentService"
  },
  description: {
    en: "Refactor an anemic Order DTO and a 4000-line OrderFulfillmentService God Class that validates, reserves inventory, charges cards, emails, ships, and audits via getters/setters — into a rich Order aggregate with InventoryService and PaymentCapturePort.",
    ru: "Отрефакторьте анемичный Order DTO и God Class OrderFulfillmentService на 4000 строк, который валидирует, резервирует инвентарь, списывает карту, шлёт email, отгружает и пишет audit через getters/setters — в богатый агрегат Order с InventoryService и PaymentCapturePort."
  },
  scenarioIntroduction: {
    en: "Black Friday traffic exposed a silent fulfillment bug: OrderFulfillmentService reserved warehouse stock and marked shipment READY before the payment capture succeeded. Post-mortem found a 4000-line God Class operating on an anemic Order with getters and setters only. Validation rules were copy-pasted in three methods; Feature Envy getters pulled line items, totals, and card tokens out of Order and mutated them externally. Unit tests could not isolate inventory reservation from email sending.",
    ru: "Трафик Black Friday вскрыл тихий баг fulfillment: OrderFulfillmentService зарезервировал складской остаток и пометил отгрузку READY до успешного списания карты. Post-mortem нашёл God Class на 4000 строк, работающий с анемичным Order только через getters и setters. Правила валидации были скопированы в трёх методах; Feature Envy getters вытаскивали позиции, итоги и токены карт из Order и мутировали их снаружи. Unit-тесты не могли изолировать резерв инвентаря от отправки email."
  },
  engineeringProblem: {
    en: "Order is a pure DTO (getters/setters only) — Fowler's Anemic Domain Model. OrderFulfillmentService is a God Class: validates order, reserves inventory, charges card, sends email, updates shipment, writes audit — all via getters/setters (Feature Envy / Tell Don't Ask violation). Production symptoms: duplicated validation, untestable monolith, unpaid inventory shipped. Fix: move place()/reserveInventory() behavior onto a rich Order aggregate; segregate InventoryService and PaymentCapturePort; keep orchestration thin.",
    ru: "Order — чистый DTO (только getters/setters) — Anemic Domain Model по Fowler. OrderFulfillmentService — God Class: валидирует заказ, резервирует инвентарь, списывает карту, шлёт email, обновляет отгрузку, пишет audit — всё через getters/setters (нарушение Feature Envy / Tell Don't Ask). Симптомы: дублированная валидация, нетестируемый монолит, отгрузка неоплаченного инвентаря. Фикс: перенести place()/reserveInventory() на богатый агрегат Order; выделить InventoryService и PaymentCapturePort; оставить оркестрацию тонкой."
  },
  learningObjectives: [
    {
      en: "Recognize Anemic Domain Model: domain objects with getters/setters only and logic trapped in procedural services",
      ru: "Распознавать Anemic Domain Model: доменные объекты только с getters/setters и логикой, запертой в процедурных сервисах"
    },
    {
      en: "Detect God Class symptoms: low cohesion, high coupling, and untestable multi-concern orchestration",
      ru: "Обнаруживать симптомы God Class: низкая cohesion, высокая coupling и нетестируемая оркестрация многих concerns"
    },
    {
      en: "Apply Tell Don't Ask: move reserveInventory/place behavior onto Order instead of Feature Envy getters in the service",
      ru: "Применять Tell Don't Ask: переносить reserveInventory/place на Order вместо Feature Envy getters в сервисе"
    },
    {
      en: "Segregate InventoryService and PaymentCapturePort so fulfillment orchestration stays thin and testable",
      ru: "Выделять InventoryService и PaymentCapturePort, чтобы оркестрация fulfillment оставалась тонкой и тестируемой"
    }
  ],
  requiredConceptIds: ["cpt_anemic_domain_model", "cpt_god_class"],
  recommendedConceptIds: ["cpt_feature_envy", "cpt_encapsulation"],
  stageIds: OOP_ANTI_PATTERNS_MISSION_STAGES.map((s) => s.id),
  challengeIds: ["chl_ap_fix_builder", "chl_ap_bughunt", "chl_ap_interview_answer"],
  estimatedMinutes: 30,
  difficulty: "SENIOR",
  xpReward: 250,
  version: "1.0.0"
};
