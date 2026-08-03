import { Mission, MissionStage, TheoryStage, PracticeStage, InterviewStage, BaseMissionStage } from '../../../../../types/domain';

const stage1: BaseMissionStage = {
  id: "stg_ci_intro",
  missionId: "mis_constructors_initialization",
  type: "MISSION_INTRODUCTION",
  order: 1,
  title: { en: "1. Mission Introduction", ru: "1. Введение в Миссию" },
  instructions: {
    en: "Inspect the production incident where TradeRegistration published a half-initialized this to TradeRegistry before fields and validation finished.",
    ru: "Изучите инцидент, где TradeRegistration опубликовал полуинициализированный this в TradeRegistry до завершения полей и валидации."
  }
};

const stage2: BaseMissionStage = {
  id: "stg_ci_problem",
  missionId: "mis_constructors_initialization",
  type: "REAL_ENGINEERING_PROBLEM",
  order: 2,
  title: { en: "2. Real Engineering Problem", ru: "2. Реальная Инженерная Проблема" },
  instructions: {
    en: "Examine TradeRegistration's constructor calling registry.register(this) and an overridable validate() before Counterparty and TradeSettlementTerms are fully set.",
    ru: "Изучите конструктор TradeRegistration, вызывающий registry.register(this) и переопределяемый validate() до полной установки Counterparty и TradeSettlementTerms."
  }
};

const stage3: BaseMissionStage = {
  id: "stg_ci_think",
  missionId: "mis_constructors_initialization",
  type: "THINK_YOURSELF",
  order: 3,
  title: { en: "3. Think Yourself Diagnostic", ru: "3. Диагностика: Подумайте Сам" },
  instructions: {
    en: "Formulate your hypothesis: Why can another thread or listener observe null Counterparty / default settlement terms during construction?",
    ru: "Сформулируйте гипотезу: почему другой поток или listener может увидеть null Counterparty / дефолтные settlement terms во время конструирования?"
  }
};

const stage4: BaseMissionStage = {
  id: "stg_ci_help",
  missionId: "mis_constructors_initialization",
  type: "NEED_HELP",
  order: 4,
  title: { en: "4. Need Knowledge Bridge", ru: "4. Мост к Знаниям" },
  instructions: {
    en: "No-penalty bridge to constructor initialization order, this-escape, and safe construction / factory registration patterns.",
    ru: "Бесштрафной переход к порядку инициализации конструктора, this-escape и безопасным паттернам construction / factory registration."
  }
};

const stage5: TheoryStage = {
  id: "stg_ci_theory",
  missionId: "mis_constructors_initialization",
  type: "THEORY",
  order: 5,
  title: { en: "5. Core Theory & Checkpoints", ru: "5. Фундаментальная Теория и Проверки" },
  instructions: {
    en: "Study theory covering JLS construction order, this-escape hazards, overridable methods from constructors, and senior follow-ups.",
    ru: "Изучите теорию о порядке конструирования по JLS, опасностях this-escape, переопределяемых методах из конструкторов и доп. вопросах Senior."
  },
  theoryArticleId: "art_theory_constructors_initialization"
};

const stage6: BaseMissionStage = {
  id: "stg_ci_visual",
  missionId: "mis_constructors_initialization",
  type: "VISUALIZATION",
  order: 6,
  title: { en: "6. Interactive This-Escape Visualization", ru: "6. Визуализация This-Escape" },
  instructions: {
    en: "Compare registering TradeRegistration only after a fully built instance versus publishing this mid-constructor to TradeRegistry listeners.",
    ru: "Сравните регистрацию TradeRegistration только после полностью собранного экземпляра с публикацией this mid-constructor слушателям TradeRegistry."
  }
};

const stage7: PracticeStage = {
  id: "stg_ci_practice",
  missionId: "mis_constructors_initialization",
  type: "INTERACTIVE_PRACTICE",
  order: 7,
  title: { en: "7. Guided Practice: Fix Builder", ru: "7. Практика: Конструктор Исправления" },
  instructions: {
    en: "Assemble structural fixes so TradeRegistration finishes initialization before any registry publication and avoids overridable calls from the constructor.",
    ru: "Соберите исправления, чтобы TradeRegistration завершал инициализацию до любой публикации в registry и избегал переопределяемых вызовов из конструктора."
  },
  challengeId: "chl_ci_fix_builder"
};

const stage8: InterviewStage = {
  id: "stg_ci_interview_q",
  missionId: "mis_constructors_initialization",
  type: "INTERVIEW_QUESTION",
  order: 8,
  title: { en: "8. Senior Interview Scenario", ru: "8. Сценарий Senior-Интервью" },
  instructions: {
    en: "Review the senior interview question about this-escape from TradeRegistration's constructor into TradeRegistry.",
    ru: "Ознакомьтесь с вопросом Senior-собеседования о this-escape из конструктора TradeRegistration в TradeRegistry."
  },
  interviewQuestionId: "q_ci_this_escape_01",
  challengeId: "chl_ci_interview_answer"
};

const stage9: InterviewStage = {
  id: "stg_ci_interview_a",
  missionId: "mis_constructors_initialization",
  type: "INTERVIEW_ANSWER",
  order: 9,
  title: { en: "9. Interview Verbal Answer", ru: "9. Устный Ответ и Модель" },
  instructions: {
    en: "Formulate your structured verbal response (Elevator Pitch + Construction Mechanics + Production Trade-offs) and submit for evaluation.",
    ru: "Сформулируйте структурированный ответ (Elevator Pitch + Механика Конструирования + Продакшн-компромиссы) и отправьте на проверку."
  },
  interviewQuestionId: "q_ci_this_escape_01",
  challengeId: "chl_ci_interview_answer"
};

const stage10: PracticeStage = {
  id: "stg_ci_debug",
  missionId: "mis_constructors_initialization",
  type: "DEBUG_COUNTER_EXAMPLE",
  order: 10,
  title: { en: "10. Applied Bug Hunt: Half-Initialized Escape", ru: "10. Поиск Бага: Escape Полуинициализации" },
  instructions: {
    en: "Identify the line(s) where the constructor publishes this early and where an overridable method runs before subclass fields initialize.",
    ru: "Найдите строку(и), где конструктор рано публикует this и где переопределяемый метод выполняется до инициализации полей subclass."
  },
  challengeId: "chl_ci_bughunt"
};

const stage11: BaseMissionStage = {
  id: "stg_ci_related",
  missionId: "mis_constructors_initialization",
  type: "RELATED_TOPICS",
  order: 11,
  title: { en: "11. Related Knowledge Nodes", ru: "11. Связанные Узлы Знаний" },
  instructions: {
    en: "Explore connections to factory methods, final fields, and immutability — without turning this into a Builder-pattern mission.",
    ru: "Исследуйте связи к factory methods, final fields и immutability — не превращая это в миссию Builder-паттерна."
  }
};

const stage12: BaseMissionStage = {
  id: "stg_ci_results",
  missionId: "mis_constructors_initialization",
  type: "MISSION_RESULTS",
  order: 12,
  title: { en: "12. Mission Performance Summary", ru: "12. Итоги Прохождения Миссии" },
  instructions: {
    en: "Review your performance metrics, concepts strengthened, and XP awarded.",
    ru: "Просмотрите метрики прохождения, укрепившиеся концепции и заработанный XP."
  }
};

const stage13: BaseMissionStage = {
  id: "stg_ci_reflection",
  missionId: "mis_constructors_initialization",
  type: "REFLECTION",
  order: 13,
  title: { en: "13. Engineering Reflection", ru: "13. Инженерная Рефлексия" },
  instructions: {
    en: "Write a 1-sentence reflection on when you will reject a PR that registers this from a constructor into a shared TradeRegistry.",
    ru: "Напишите 1 предложение о том, когда на код-ревью вы отклоните PR, регистрирующий this из конструктора в общий TradeRegistry."
  }
};

export const CONSTRUCTORS_INITIALIZATION_MISSION_STAGES: readonly MissionStage[] = [
  stage1, stage2, stage3, stage4, stage5, stage6, stage7, stage8, stage9, stage10, stage11, stage12, stage13
];

export const CONSTRUCTORS_INITIALIZATION_MISSION: Mission = {
  id: "mis_constructors_initialization",
  primaryTopicId: "top_oop_04",
  secondaryTopicIds: ["top_oop_02", "top_oop_22"],
  slug: "half-initialized-trade-escape",
  title: {
    en: "The Half-Initialized Trade: Constructor Escape in TradeRegistration",
    ru: "Полуинициализированная Сделка: Constructor Escape в TradeRegistration"
  },
  description: {
    en: "Fix TradeRegistration so construction completes before TradeRegistry publication — no this-escape, no overridable validate() from the constructor.",
    ru: "Исправьте TradeRegistration так, чтобы конструирование завершалось до публикации в TradeRegistry — без this-escape и без переопределяемого validate() из конструктора."
  },
  scenarioIntroduction: {
    en: "A new equity TradeRegistration went live. The constructor called TradeRegistry.register(this) before assigning Counterparty and TradeSettlementTerms, then called an overridable validate() hook. A registry listener on another thread read the object and priced settlement with null counterparty defaults. Ops saw ghost trades and failed SSIs. Retries re-registered partially built instances. Root cause was unsafe construction: this escaped before initialization finished, and subclass overrides ran too early.",
    ru: "В проде появился новый equity TradeRegistration. Конструктор вызвал TradeRegistry.register(this) до присвоения Counterparty и TradeSettlementTerms, затем вызвал переопределяемый хук validate(). Listener registry в другом потоке прочитал объект и посчитал settlement с null-дефолтами контрагента. Ops видел ghost trades и сбои SSI. Retry снова регистрировал частично собранные экземпляры. Причина — небезопасное конструирование: this сбежал до конца инициализации, а override subclass сработал слишком рано."
  },
  engineeringProblem: {
    en: "JLS construction allocates the object, runs instance initializers, then the constructor body. Until the constructor completes, the object is not safely publishable. Calling registry.register(this) mid-constructor lets other threads observe default/null fields. Calling an overridable method from a constructor runs subclass code before subclass fields initialize. Solution: finish all field assignment and final/private validation inside construction; publish to TradeRegistry only from a static factory after `new` returns; keep overridable hooks out of constructors (Effective Java Item 19).",
    ru: "По JLS конструирование выделяет объект, выполняет instance initializers, затем тело конструктора. Пока конструктор не завершён, объект нельзя безопасно публиковать. Вызов registry.register(this) mid-constructor даёт другим потокам увидеть default/null поля. Вызов переопределяемого метода из конструктора выполняет код subclass до инициализации его полей. Решение: завершить присвоение полей и final/private валидацию внутри construction; публиковать в TradeRegistry только из static factory после возврата `new`; не вызывать overridable hooks из конструкторов (Effective Java Item 19)."
  },
  learningObjectives: [
    {
      en: "Explain Java constructor initialization order and when an object becomes safely publishable",
      ru: "Объяснить порядок инициализации конструктора Java и когда объект становится безопасно публикуемым"
    },
    {
      en: "Recognize this-escape via TradeRegistry.register(this) during construction",
      ru: "Распознавать this-escape через TradeRegistry.register(this) во время конструирования"
    },
    {
      en: "Avoid calling overridable methods from constructors",
      ru: "Избегать вызова переопределяемых методов из конструкторов"
    },
    {
      en: "Apply factory/register-after-build patterns for TradeRegistration",
      ru: "Применять паттерны factory/register-after-build для TradeRegistration"
    }
  ],
  requiredConceptIds: ["cpt_constructor_init_order", "cpt_this_escape", "cpt_safe_construction"],
  recommendedConceptIds: ["cpt_immutability", "cpt_static_factory_methods"],
  stageIds: CONSTRUCTORS_INITIALIZATION_MISSION_STAGES.map((s) => s.id),
  challengeIds: ["chl_ci_fix_builder", "chl_ci_bughunt", "chl_ci_interview_answer"],
  estimatedMinutes: 25,
  difficulty: "APPLIED",
  xpReward: 250,
  version: "1.0.0"
};
