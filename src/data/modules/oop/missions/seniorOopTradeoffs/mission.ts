import { Mission, MissionStage, TheoryStage, PracticeStage, InterviewStage, BaseMissionStage } from '../../../../../types/domain';

const stage1: BaseMissionStage = {
  id: "stg_trade_intro",
  missionId: "mis_senior_oop_tradeoffs",
  type: "MISSION_INTRODUCTION",
  order: 1,
  title: { en: "1. Mission Introduction", ru: "1. Введение в Миссию" },
  instructions: {
    en: "Join an architecture review where three proposals collide on PlatformPaymentHandler: deep inheritance, interface-per-class, and Strategy/Decorator everywhere.",
    ru: "Подключитесь к architecture review, где сталкиваются три предложения по PlatformPaymentHandler: глубокое наследование, interface-per-class и Strategy/Decorator везде."
  }
};

const stage2: BaseMissionStage = {
  id: "stg_trade_problem",
  missionId: "mis_senior_oop_tradeoffs",
  type: "REAL_ENGINEERING_PROBLEM",
  order: 2,
  title: { en: "2. Real Engineering Problem", ru: "2. Реальная Инженерная Проблема" },
  instructions: {
    en: "Map constraints: high PaymentMethod volatility, fraud/audit hooks, retryable PaymentWorkflow — then judge each proposal against those constraints.",
    ru: "Зафиксируйте ограничения: высокая volatility PaymentMethod, fraud/audit hooks, retryable PaymentWorkflow — и оцените каждое предложение относительно этих ограничений."
  }
};

const stage3: BaseMissionStage = {
  id: "stg_trade_think",
  missionId: "mis_senior_oop_tradeoffs",
  type: "THINK_YOURSELF",
  order: 3,
  title: { en: "3. Think Yourself Diagnostic", ru: "3. Диагностика: Подумайте Сам" },
  instructions: {
    en: "Formulate which axes matter most here: variant volatility, audit seam points, retry semantics, and when deep inheritance becomes the wrong default.",
    ru: "Сформулируйте, какие оси важнее всего: volatility вариантов, точки audit, семантика retry и когда глубокое наследование — неверный default."
  }
};

const stage4: BaseMissionStage = {
  id: "stg_trade_help",
  missionId: "mis_senior_oop_tradeoffs",
  type: "NEED_HELP",
  order: 4,
  title: { en: "4. Need Knowledge Bridge", ru: "4. Мост к Знаниям" },
  instructions: {
    en: "No-penalty bridge to constraint-driven design, composition vs inheritance, Strategy/Decorator placement, and overengineering smells.",
    ru: "Бесштрафной переход к constraint-driven design, composition vs inheritance, размещению Strategy/Decorator и запахам overengineering."
  }
};

const stage5: TheoryStage = {
  id: "stg_trade_theory",
  missionId: "mis_senior_oop_tradeoffs",
  type: "THEORY",
  order: 5,
  title: { en: "5. Core Theory & Checkpoints", ru: "5. Фундаментальная Теория и Проверки" },
  instructions: {
    en: "Study four sections: trade-off framing, constraint mechanics, production balance (no universal winner), and senior follow-ups.",
    ru: "Изучите четыре раздела: framing компромиссов, механика ограничений, продакшн-баланс (без универсального победителя) и senior follow-ups."
  },
  theoryArticleId: "art_theory_senior_oop_tradeoffs"
};

const stage6: BaseMissionStage = {
  id: "stg_trade_visual",
  missionId: "mis_senior_oop_tradeoffs",
  type: "VISUALIZATION",
  order: 6,
  title: { en: "6. Trade-off Matrix Visualization", ru: "6. Визуализация Матрицы Компромиссов" },
  instructions: {
    en: "Compare three sketches side by side: (A) AbstractPaymentBase → Card/Wire/Wallet subclasses five levels deep; (B) PaymentPolicy + PaymentRiskPolicy strategies with PaymentExtensionRegistry for audit/retry decorators; (C) interface-per-tiny-class graph with no clear seam. Note which sketch aligns with high method volatility + fraud/retry without slogans.",
    ru: "Сравните три эскиза рядом: (A) AbstractPaymentBase → Card/Wire/Wallet на пять уровней; (B) стратегии PaymentPolicy + PaymentRiskPolicy и PaymentExtensionRegistry для audit/retry decorators; (C) graph interface-per-tiny-class без явного seam. Отметьте, какой эскиз лучше стыкуется с высокой volatility методов + fraud/retry — без слоганов."
  }
};

const stage7: PracticeStage = {
  id: "stg_trade_practice",
  missionId: "mis_senior_oop_tradeoffs",
  type: "INTERACTIVE_PRACTICE",
  order: 7,
  title: { en: "7. Guided Practice: Fix Builder", ru: "7. Практика: Конструктор Исправления" },
  instructions: {
    en: "Assemble the trade-off matrix: select design elements that fit high variant volatility plus audit/fraud/retry; reject deep inheritance as default and 'always Strategy'.",
    ru: "Соберите матрицу компромиссов: выберите элементы под высокую volatility вариантов плюс audit/fraud/retry; отклоните глубокое наследование как default и «always Strategy»."
  },
  challengeId: "chl_trade_fix_builder"
};

const stage8: InterviewStage = {
  id: "stg_trade_interview_q",
  missionId: "mis_senior_oop_tradeoffs",
  type: "INTERVIEW_QUESTION",
  order: 8,
  title: { en: "8. Senior Interview Scenario", ru: "8. Сценарий Senior-Интервью" },
  instructions: {
    en: "Review the staff-level prompt: defend an OOP shape for PlatformPaymentHandler under explicit constraints — no pattern-name dump.",
    ru: "Ознакомьтесь со staff-промптом: защитите OOP-форму PlatformPaymentHandler при явных ограничениях — без дампа имён паттернов."
  },
  interviewQuestionId: "q_trade_payment_01",
  challengeId: "chl_trade_interview_answer"
};

const stage9: InterviewStage = {
  id: "stg_trade_interview_a",
  missionId: "mis_senior_oop_tradeoffs",
  type: "INTERVIEW_ANSWER",
  order: 9,
  title: { en: "9. Interview Verbal Answer", ru: "9. Устный Ответ и Модель" },
  instructions: {
    en: "Deliver a ~90s answer: constraints → recommendation → when you would change it. Submit for evaluation.",
    ru: "Дайте ответ ~90 сек: ограничения → рекомендация → когда вы бы изменили решение. Отправьте на проверку."
  },
  interviewQuestionId: "q_trade_payment_01",
  challengeId: "chl_trade_interview_answer"
};

const stage10: PracticeStage = {
  id: "stg_trade_debug",
  missionId: "mis_senior_oop_tradeoffs",
  type: "DEBUG_COUNTER_EXAMPLE",
  order: 10,
  title: { en: "10. Applied Bug Hunt: Architecture Smells", ru: "10. Поиск Бага: Architecture Smells" },
  instructions: {
    en: "Mark the smell lines: deep hierarchy, god abstract payment base, and unnecessary marker interfaces that do not buy a seam.",
    ru: "Отметьте строки-smells: глубокая иерархия, god abstract payment base и лишние marker interfaces без реального seam."
  },
  challengeId: "chl_trade_bughunt"
};

const stage11: BaseMissionStage = {
  id: "stg_trade_related",
  missionId: "mis_senior_oop_tradeoffs",
  type: "RELATED_TOPICS",
  order: 11,
  title: { en: "11. Related Knowledge Nodes", ru: "11. Связанные Узлы Знаний" },
  instructions: {
    en: "Connect to composition-over-inheritance, Strategy, Decorator, and anti-patterns — without claiming one always wins.",
    ru: "Свяжите с composition-over-inheritance, Strategy, Decorator и anti-patterns — без утверждения, что один всегда побеждает."
  }
};

const stage12: BaseMissionStage = {
  id: "stg_trade_results",
  missionId: "mis_senior_oop_tradeoffs",
  type: "MISSION_RESULTS",
  order: 12,
  title: { en: "12. Mission Performance Summary", ru: "12. Итоги Прохождения Миссии" },
  instructions: {
    en: "Review metrics, concepts strengthened, and XP awarded.",
    ru: "Просмотрите метрики, укрепившиеся концепции и XP."
  }
};

const stage13: BaseMissionStage = {
  id: "stg_trade_reflection",
  missionId: "mis_senior_oop_tradeoffs",
  type: "REFLECTION",
  order: 13,
  title: { en: "13. Engineering Reflection", ru: "13. Инженерная Рефлексия" },
  instructions: {
    en: "Write one sentence: which constraint would make you reverse today's PlatformPaymentHandler recommendation.",
    ru: "Одно предложение: какое ограничение заставило бы вас пересмотреть сегодняшнюю рекомендацию по PlatformPaymentHandler."
  }
};

export const SENIOR_OOP_TRADEOFFS_MISSION_STAGES: readonly MissionStage[] = [
  stage1, stage2, stage3, stage4, stage5, stage6, stage7, stage8, stage9, stage10, stage11, stage12, stage13
];

export const SENIOR_OOP_TRADEOFFS_MISSION: Mission = {
  id: "mis_senior_oop_tradeoffs",
  primaryTopicId: "top_oop_36",
  secondaryTopicIds: ["top_oop_16", "top_oop_26", "top_oop_31", "top_oop_32"],
  slug: "architecture-review-payment-tradeoffs",
  title: {
    en: "The Architecture Review: Defending OOP Trade-offs in a Payment Platform",
    ru: "Architecture Review: Защита OOP-Компромиссов в Платёжной Платформе"
  },
  description: {
    en: "Defend PlatformPaymentHandler design choices under conflicting proposals — deep inheritance, interface sprawl, Strategy/Decorator defaults — using constraints, not slogans.",
    ru: "Защитите дизайн PlatformPaymentHandler при конфликтующих предложениях — глубокое наследование, разрастание интерфейсов, Strategy/Decorator по умолчанию — через ограничения, не слоганы."
  },
  scenarioIntroduction: {
    en: "Architecture review for the payment platform. Proposal A wants AbstractPaymentBase with five subclass levels for Card, Wire, Wallet, and regional rails. Proposal B sprays an interface per tiny collaborator. Proposal C wraps every hop in Strategy and Decorator 'because GoF'. Product needs new PaymentMethod variants monthly, fraud/audit hooks on PaymentCommand, and retryable PaymentWorkflow with clear PaymentResult. Leadership asks you to recommend a shape — and to say when you would change it. There is no single universal winner.",
    ru: "Architecture review платёжной платформы. Предложение A — AbstractPaymentBase с пятью уровнями подклассов для Card, Wire, Wallet и региональных rails. Предложение B — interface на каждый мелкий collaborator. Предложение C — Strategy и Decorator на каждый hop «потому что GoF». Продукту нужны новые PaymentMethod ежемесячно, fraud/audit hooks на PaymentCommand и retryable PaymentWorkflow с ясным PaymentResult. Leadership просит рекомендовать форму — и сказать, когда вы её смените. Универсального победителя нет."
  },
  engineeringProblem: {
    en: "The team treats patterns as winners instead of tools. Deep inheritance couples PaymentPolicy changes to the whole tree. Interface-per-class adds ceremony without seams. Blind Strategy everywhere obscures the happy path. Needed: constraint-driven design — PaymentPolicy/PaymentRiskPolicy where variants actually change; PaymentExtensionRegistry for audit/retry decorators at known seams; PlatformPaymentHandler as a thin orchestrator of PaymentCommand → PaymentWorkflow → PaymentResult; reject deep hierarchy as the default.",
    ru: "Команда считает паттерны победителями, а не инструментами. Глубокое наследование связывает изменения PaymentPolicy со всем деревом. Interface-per-class добавляет ceremony без seams. Слепой Strategy везде затемняет happy path. Нужно: constraint-driven design — PaymentPolicy/PaymentRiskPolicy там, где варианты реально меняются; PaymentExtensionRegistry для audit/retry decorators на известных seams; PlatformPaymentHandler как тонкий оркестратор PaymentCommand → PaymentWorkflow → PaymentResult; отклонить глубокую иерархию как default."
  },
  learningObjectives: [
    {
      en: "Frame OOP recommendations as constraints → choice → reversal conditions",
      ru: "Формулировать OOP-рекомендации как ограничения → выбор → условия пересмотра"
    },
    {
      en: "Reject deep inheritance and 'always Strategy' as default answers under high variant volatility",
      ru: "Отклонять глубокое наследование и «always Strategy» как default при высокой volatility вариантов"
    },
    {
      en: "Place Strategy/Decorator only where PaymentMethod/risk/audit volatility justifies them",
      ru: "Ставить Strategy/Decorator только там, где volatility PaymentMethod/risk/audit это оправдывает"
    },
    {
      en: "Spot overengineering: god abstract bases and unnecessary marker interfaces",
      ru: "Замечать overengineering: god abstract bases и лишние marker interfaces"
    }
  ],
  requiredConceptIds: ["cpt_design_tradeoffs", "cpt_constraint_driven_design", "cpt_overengineering_smell"],
  recommendedConceptIds: ["cpt_composition_over_inheritance", "cpt_strategy_pattern"],
  stageIds: SENIOR_OOP_TRADEOFFS_MISSION_STAGES.map((s) => s.id),
  challengeIds: ["chl_trade_fix_builder", "chl_trade_bughunt", "chl_trade_interview_answer"],
  estimatedMinutes: 35,
  difficulty: "STAFF",
  xpReward: 350,
  version: "1.0.0"
};
