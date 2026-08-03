import {
  FixBuilderChallenge,
  BugHuntChallenge,
  InterviewAnswerChallenge,
  Challenge
} from '../../../../../types/domain';

export const GUIDED_FIX_BUILDER_CHALLENGE_CI: FixBuilderChallenge = {
  id: "chl_ci_fix_builder",
  type: "FIX_BUILDER",
  missionId: "mis_constructors_initialization",
  stageId: "stg_ci_practice",
  title: {
    en: "Fix Builder: Safe TradeRegistration Construction",
    ru: "Конструктор Исправления: Безопасное Конструирование TradeRegistration"
  },
  prompt: {
    en: "TradeRegistration registers this mid-constructor and calls an overridable validate(). Select ALL structural building blocks for safe construction.",
    ru: "TradeRegistration регистрирует this mid-constructor и вызывает переопределяемый validate(). Выберите ВСЕ элементы для безопасного конструирования."
  },
  difficulty: "APPLIED",
  assistanceLevel: "GUIDED",
  conceptIds: ["cpt_constructor_init_order", "cpt_this_escape", "cpt_safe_construction"],
  topicIds: ["top_oop_04"],
  tags: ["#constructor", "#this-escape", "#initialization"],
  hintIds: ["hnt_ci_1", "hnt_ci_2", "hnt_ci_3", "hnt_ci_4"],
  xpReward: 100,
  order: 7,
  payload: {
    baseCodeArtifactId: "art_ci_registration_broken",
    solutionCodeArtifactId: "art_ci_registration_solution",
    options: [
      {
        id: "opt_ci_fix_1",
        text: {
          en: "Complete all field assignment (Counterparty, TradeSettlementTerms) inside the constructor — never register this until construction returns.",
          ru: "Завершить все присвоения полей (Counterparty, TradeSettlementTerms) внутри конструктора — никогда не регистрировать this, пока construction не вернётся."
        },
        isCorrect: true,
        explanation: {
          en: "Correct. The object must be fully initialized before publication.",
          ru: "Верно. Объект должен быть полностью инициализирован до публикации."
        }
      },
      {
        id: "opt_ci_fix_2",
        text: {
          en: "Publish via a static factory: create the instance, then TradeRegistry.register(built) only after new returns.",
          ru: "Публиковать через static factory: создать экземпляр, затем TradeRegistry.register(built) только после возврата new."
        },
        isCorrect: true,
        explanation: {
          en: "Correct. Factory registration prevents this-escape from the constructor body.",
          ru: "Верно. Factory registration предотвращает this-escape из тела конструктора."
        }
      },
      {
        id: "opt_ci_fix_3",
        text: {
          en: "Keep registry.register(this) as the first constructor statement so listeners can watch initialization live.",
          ru: "Оставить registry.register(this) первым оператором конструктора, чтобы listeners наблюдали инициализацию вживую."
        },
        isCorrect: false,
        explanation: {
          en: "Incorrect. That is the this-escape failure mode — listeners see half-built state.",
          ru: "Неверно. Это failure mode this-escape — listeners видят полусобранное состояние."
        }
      },
      {
        id: "opt_ci_fix_4",
        text: {
          en: "Make construction-time validation final or private — never call overridable validate() from a constructor.",
          ru: "Сделать validation времени construction final или private — никогда не вызывать переопределяемый validate() из конструктора."
        },
        isCorrect: true,
        explanation: {
          en: "Correct. Overridable calls from constructors run before subclass fields initialize (EJ Item 19).",
          ru: "Верно. Переопределяемые вызовы из конструкторов выполняются до инициализации полей subclass (EJ Item 19)."
        }
      },
      {
        id: "opt_ci_fix_distractor_1",
        text: {
          en: "Synchronize on this inside the constructor and keep early register(this) — locks make half-init safe.",
          ru: "Синхронизироваться на this внутри конструктора и оставить ранний register(this) — locks сделают half-init безопасным."
        },
        isCorrect: false,
        explanation: {
          en: "Incorrect. Synchronizing on this during construction is itself hazardous and does not fix unsafe publication of uninitialized fields.",
          ru: "Неверно. Синхронизация на this во время construction сама опасна и не чинит небезопасную публикацию неинициализированных полей."
        }
      }
    ]
  }
};

export const APPLIED_BUG_HUNT_CHALLENGE_CI: BugHuntChallenge = {
  id: "chl_ci_bughunt",
  type: "BUG_HUNT",
  missionId: "mis_constructors_initialization",
  stageId: "stg_ci_debug",
  title: {
    en: "Bug Hunt: This-Escape in TradeRegistration",
    ru: "Поиск Бага: This-Escape в TradeRegistration"
  },
  prompt: {
    en: "Click the line(s) where the constructor publishes this early and where an overridable method runs during construction.",
    ru: "Нажмите строку(и), где конструктор рано публикует this и где переопределяемый метод выполняется во время construction."
  },
  difficulty: "APPLIED",
  assistanceLevel: "APPLIED",
  conceptIds: ["cpt_this_escape", "cpt_constructor_init_order", "cpt_safe_construction"],
  topicIds: ["top_oop_04"],
  tags: ["#bug-hunt", "#this-escape"],
  hintIds: ["hnt_ci_bug_1", "hnt_ci_bug_2", "hnt_ci_bug_3"],
  xpReward: 100,
  order: 10,
  payload: {
    baseCodeArtifactId: "art_ci_registration_bughunt",
    solutionCodeArtifactId: "art_ci_registration_solution",
    codeSnippet: `public TradeRegistration(TradeRegistry registry, Counterparty cpty, TradeSettlementTerms terms) {
    registry.register(this); // Line 2 — BUG: this-escape
    this.counterparty = cpty; // Line 3 — assigned after publish
    this.settlementTerms = terms;
    validate(); // Line 5 — BUG: overridable from ctor
}`,
    lines: [
      { lineNumber: 1, code: "public TradeRegistration(TradeRegistry registry, Counterparty cpty, TradeSettlementTerms terms) {", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      {
        lineNumber: 2,
        code: "    registry.register(this);",
        isBug: true,
        explanation: {
          en: "Line 2: Publishes this before fields are assigned — TradeRegistry listeners can observe null Counterparty / default terms (this-escape).",
          ru: "Строка 2: Публикует this до присвоения полей — listeners TradeRegistry могут увидеть null Counterparty / дефолтные terms (this-escape)."
        }
      },
      { lineNumber: 3, code: "    this.counterparty = cpty;", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      { lineNumber: 4, code: "    this.settlementTerms = terms;", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      {
        lineNumber: 5,
        code: "    validate();",
        isBug: true,
        explanation: {
          en: "Line 5: Overridable validate() from a constructor can run subclass code before subclass fields are initialized.",
          ru: "Строка 5: Переопределяемый validate() из конструктора может выполнить код subclass до инициализации его полей."
        }
      },
      { lineNumber: 6, code: "}", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } }
    ]
  }
};

export const INTERVIEW_ANSWER_CHALLENGE_CI: InterviewAnswerChallenge = {
  id: "chl_ci_interview_answer",
  type: "INTERVIEW_ANSWER",
  missionId: "mis_constructors_initialization",
  stageId: "stg_ci_interview_a",
  title: {
    en: "Senior Interview Verbal Explanation: Constructor This-Escape",
    ru: "Устный Ответ на Senior-Интервью: Constructor This-Escape"
  },
  prompt: {
    en: "TradeRegistration called TradeRegistry.register(this) before assigning Counterparty and TradeSettlementTerms, and invoked overridable validate() from the constructor. Explain the failure and your production fix.",
    ru: "TradeRegistration вызвал TradeRegistry.register(this) до присвоения Counterparty и TradeSettlementTerms и вызвал переопределяемый validate() из конструктора. Объясните сбой и ваш продакшн-фикс."
  },
  difficulty: "APPLIED",
  assistanceLevel: "INTERVIEW",
  conceptIds: ["cpt_constructor_init_order", "cpt_this_escape", "cpt_safe_construction"],
  topicIds: ["top_oop_04"],
  tags: ["#interview", "#constructor"],
  hintIds: [],
  xpReward: 150,
  order: 9,
  payload: {
    targetQuestionId: "q_ci_this_escape_01",
    rubricDimensions: ["ELEVATOR_PITCH", "OBJECT_REFERENCE_MECHANICS", "PRODUCTION_TRADEOFFS"],
    expectedConcepts: [
      {
        id: "cpt_constructor_init_order",
        label: { en: "Constructor Init Order", ru: "Порядок Инициализации Конструктора" },
        keywords: ["constructor", "initialization", "JLS", "fields", "конструктор", "инициализация"]
      },
      {
        id: "cpt_this_escape",
        label: { en: "This Escape", ru: "This Escape" },
        keywords: ["this-escape", "publish", "register", "half-initialized", "публикация", "полуинициализ"]
      },
      {
        id: "cpt_safe_construction",
        label: { en: "Safe Construction", ru: "Безопасное Конструирование" },
        keywords: ["factory", "final", "overridable", "safe construction", "factory", "переопределяем"]
      }
    ],
    modelAnswer30s: {
      en: "Elevator Pitch (30 sec): During construction the object is not safely publishable. register(this) mid-constructor is this-escape — listeners saw null Counterparty. Overridable validate() from a ctor runs subclass code too early. Fix: assign all fields, use final/private validation, register only from a static factory after new returns.",
      ru: "Elevator Pitch (30 сек): Во время construction объект нельзя безопасно публиковать. register(this) mid-constructor — this-escape; listeners видели null Counterparty. Переопределяемый validate() из ctor выполняет код subclass слишком рано. Фикс: присвоить все поля, final/private validation, register только из static factory после возврата new."
    },
    modelAnswerDetailed: {
      en: "Deep Mechanics (60 sec): JLS 12.5: memory is allocated, default values apply, then initializers and constructor body run. Until the constructor completes, other threads must not see the reference. TradeRegistry.register(this) stores the pointer in a shared structure — classic unsafe publication. Calling an overridable method from a constructor is called out in Effective Java Item 19: the override runs before subclass fields initialize, reading zeros/nulls. TradeValidator checks should be private/final during build, or run after the object is fully constructed. Prefer immutable TradeRegistration with final Counterparty and TradeSettlementTerms once built.",
      ru: "Глубокая Механика (60 сек): JLS 12.5: память выделяется, действуют default values, затем initializers и тело конструктора. Пока конструктор не завершён, другие потоки не должны видеть ссылку. TradeRegistry.register(this) кладёт указатель в общую структуру — классическая unsafe publication. Вызов переопределяемого метода из конструктора — Effective Java Item 19: override выполняется до инициализации полей subclass, читая нули/null. Проверки TradeValidator должны быть private/final во время build или после полной сборки. Предпочтительна immutable TradeRegistration с final Counterparty и TradeSettlementTerms после сборки."
    },
    modelAnswerTradeOffs: {
      en: "Production Trade-offs (30 sec): Static factory + late register adds a step versus 'convenient' ctor registration, but eliminates ghost trades. Eager registry hooks for metrics can use a separate fully-built event. Do not 'fix' with synchronized(this) in constructors — that pattern is also discouraged.",
      ru: "Продакшн Компромиссы (30 сек): Static factory + поздний register — лишний шаг против «удобной» регистрации в ctor, но убирает ghost trades. Eager hooks метрик — через отдельное событие fully-built. Не «чините» synchronized(this) в конструкторах — этот паттерн тоже нежелателен."
    },
    followUpQuestionText: {
      en: "Interviewer Follow-Up: 'What if we register(this) as the last line of the constructor after all fields are set?'",
      ru: "Доп. Вопрос Интервьюера: 'Что если register(this) — последняя строка конструктора после всех полей?'"
    },
    followUpModelAnswerText: {
      en: "Follow-up Model Answer: Better than mid-constructor, but still risky: subclass constructors have not finished if a subclass called super(...), and you may still publish before subclass fields initialize. Prefer factory: subclass construction completes, then register the returned reference. Also avoid leaking this to threads via inner classes started in the constructor.",
      ru: "Ответ на Доп. Вопрос: Лучше, чем mid-constructor, но всё ещё рискованно: конструкторы subclass ещё не завершены, если subclass вызвал super(...), и вы можете опубликовать до инициализации полей subclass. Предпочтительна factory: construction subclass завершается, затем register возвращённой ссылки. Также не утекайте this в потоки через inner classes, стартующие в конструкторе."
    }
  }
};

export const ALL_CONSTRUCTORS_INITIALIZATION_CHALLENGES: readonly Challenge[] = [
  GUIDED_FIX_BUILDER_CHALLENGE_CI,
  APPLIED_BUG_HUNT_CHALLENGE_CI,
  INTERVIEW_ANSWER_CHALLENGE_CI
];
