import {
  FixBuilderChallenge,
  BugHuntChallenge,
  InterviewAnswerChallenge,
  Challenge
} from '../../../../../types/domain';

export const GUIDED_FIX_BUILDER_CHALLENGE_POLY: FixBuilderChallenge = {
  id: "chl_poly_fix_builder",
  type: "FIX_BUILDER",
  missionId: "mis_polymorphism",
  stageId: "stg_poly_practice",
  title: {
    en: "Fix Builder: Replace instanceof Chain with Polymorphism",
    ru: "Конструктор Исправления: Замена Цепочки instanceof на Полиморфизм"
  },
  prompt: {
    en: "TransactionPipeline's instanceof chain rejected InstantTransaction after Instant rail launch and grows with every subtype. Select ALL structural building blocks required for a production-safe polymorphic refactor (process() / accept(handler) / handler registry).",
    ru: "Цепочка instanceof в TransactionPipeline отклонила InstantTransaction после запуска Instant-рейла и растёт с каждым подтипом. Выберите ВСЕ элементы для продакшн-безопасного полиморфного рефакторинга (process() / accept(handler) / handler registry)."
  },
  difficulty: "SENIOR",
  assistanceLevel: "GUIDED",
  conceptIds: ["cpt_polymorphism", "cpt_type_switch_smell"],
  topicIds: ["top_oop_11"],
  tags: ["#polymorphism", "#type-switch-smell", "#transaction-pipeline"],
  hintIds: ["hnt_poly_1", "hnt_poly_2", "hnt_poly_3", "hnt_poly_4"],
  xpReward: 100,
  order: 7,
  payload: {
    baseCodeArtifactId: "art_poly_pipeline_broken",
    solutionCodeArtifactId: "art_poly_pipeline_solution",
    options: [
      {
        id: "opt_poly_fix_1",
        text: {
          en: "Introduce Transaction with process(PipelineContext) (or accept(TransactionHandler)) implemented by CardTransaction, WireTransaction, AchTransaction, InstantTransaction.",
          ru: "Ввести Transaction с process(PipelineContext) (или accept(TransactionHandler)), реализуемый CardTransaction, WireTransaction, AchTransaction, InstantTransaction."
        },
        isCorrect: true,
        explanation: {
          en: "Correct. Substitutable type behavior is the core of design-level polymorphism.",
          ru: "Верно. Подставляемое поведение типа — ядро design-level полиморфизма."
        }
      },
      {
        id: "opt_poly_fix_2",
        text: {
          en: "Make TransactionPipeline a thin delegator: validate → txn.process(ctx) / resolve handler → record result — no growing instanceof bodies.",
          ru: "Сделать TransactionPipeline тонким делегатором: validate → txn.process(ctx) / resolve handler → record result — без растущих тел instanceof."
        },
        isCorrect: true,
        explanation: {
          en: "Correct. The pipeline stops enumerating concrete types on the hot path.",
          ru: "Верно. Pipeline перестаёт перечислять конкретные типы на горячем пути."
        }
      },
      {
        id: "opt_poly_fix_3",
        text: {
          en: "Keep the instanceof chain but wrap each branch in synchronized for thread safety.",
          ru: "Оставить цепочку instanceof, но обернуть каждую ветку в synchronized для потокобезопасности."
        },
        isCorrect: false,
        explanation: {
          en: "Incorrect. Synchronization does not fix type-switch smell or missing Instant branches.",
          ru: "Неверно. Synchronized не исправляет smell type-switch и пропущенные ветки Instant."
        }
      },
      {
        id: "opt_poly_fix_4",
        text: {
          en: "Optionally register TransactionHandler by Class at composition root with fail-fast on unknown types — never silent else→ACH.",
          ru: "Опционально регистрировать TransactionHandler по Class в composition root с fail-fast на неизвестных типах — никогда тихий else→ACH."
        },
        isCorrect: true,
        explanation: {
          en: "Correct. Handler registry is a valid alternative when processing must stay outside the entity.",
          ru: "Верно. Handler registry — валидная альтернатива, когда обработка должна остаться вне сущности."
        }
      },
      {
        id: "opt_poly_fix_distractor_1",
        text: {
          en: "Extract handlers but still select them with if (txn instanceof CardTransaction) return new CardHandler(); ... inside the pipeline.",
          ru: "Вынести handlers, но по-прежнему выбирать их через if (txn instanceof CardTransaction) return new CardHandler(); ... внутри pipeline."
        },
        isCorrect: false,
        explanation: {
          en: "Incorrect. Fake polymorphism — the type-switch smell remains in the selector.",
          ru: "Неверно. Фальшивый полиморфизм — smell type-switch остаётся в селекторе."
        }
      }
    ]
  }
};

export const APPLIED_BUG_HUNT_CHALLENGE_POLY: BugHuntChallenge = {
  id: "chl_poly_bughunt",
  type: "BUG_HUNT",
  missionId: "mis_polymorphism",
  stageId: "stg_poly_debug",
  title: {
    en: "Bug Hunt: Missing InstantTransaction Branch",
    ru: "Поиск Бага: Пропущенная Ветка InstantTransaction"
  },
  prompt: {
    en: "TransactionPipeline still uses instanceof. InstantTransaction exists, but Instant rail payments FAIL or settle as ACH. Click the line(s) responsible for the missing / wrong Instant path.",
    ru: "TransactionPipeline всё ещё использует instanceof. InstantTransaction существует, но Instant-платежи FAIL или settle как ACH. Нажмите строку(и), ответственные за пропущенный / неверный путь Instant."
  },
  difficulty: "SENIOR",
  assistanceLevel: "APPLIED",
  conceptIds: ["cpt_polymorphism", "cpt_type_switch_smell"],
  topicIds: ["top_oop_11"],
  tags: ["#polymorphism", "#bug-hunt", "#instanceof"],
  hintIds: ["hnt_poly_bug_1", "hnt_poly_bug_2", "hnt_poly_bug_3"],
  xpReward: 100,
  order: 10,
  payload: {
    baseCodeArtifactId: "art_poly_pipeline_bughunt",
    solutionCodeArtifactId: "art_poly_pipeline_solution",
    codeSnippet: `public ProcessResult process(Transaction txn) {
    if (txn instanceof CardTransaction card) {
        return clearCard(card); // Line 3
    }
    if (txn instanceof WireTransaction wire) {
        return clearWire(wire); // Line 6
    }
    if (txn instanceof AchTransaction ach) {
        return clearAch(ach); // Line 9
    }
    // BUG: InstantTransaction never matched — falls to else
    return ProcessResult.failed("UNSUPPORTED_TYPE"); // Line 12
}`,
    lines: [
      { lineNumber: 1, code: "public ProcessResult process(Transaction txn) {", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      { lineNumber: 2, code: "    if (txn instanceof CardTransaction card) {", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      { lineNumber: 3, code: "        return clearCard(card);", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      { lineNumber: 4, code: "    }", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      { lineNumber: 5, code: "    if (txn instanceof WireTransaction wire) {", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      { lineNumber: 6, code: "        return clearWire(wire);", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      { lineNumber: 7, code: "    }", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      { lineNumber: 8, code: "    if (txn instanceof AchTransaction ach) {", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      { lineNumber: 9, code: "        return clearAch(ach);", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      { lineNumber: 10, code: "    }", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      {
        lineNumber: 11,
        code: "    // InstantTransaction never matched",
        isBug: true,
        explanation: {
          en: "Line 11: No InstantTransaction branch — the closed instanceof set ignores a type that already exists in the hierarchy.",
          ru: "Строка 11: Нет ветки InstantTransaction — закрытый набор instanceof игнорирует тип, уже существующий в иерархии."
        }
      },
      {
        lineNumber: 12,
        code: "    return ProcessResult.failed(\"UNSUPPORTED_TYPE\");",
        isBug: true,
        explanation: {
          en: "Line 12: else path rejects Instant rail volume in production. Type-switch smell: every new subtype must edit this method or fail here.",
          ru: "Строка 12: else отклоняет Instant-объём на продакшене. Smell type-switch: каждый новый подтип должен править этот метод или падать здесь."
        }
      },
      { lineNumber: 13, code: "}", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } }
    ]
  }
};

export const INTERVIEW_ANSWER_CHALLENGE_POLY: InterviewAnswerChallenge = {
  id: "chl_poly_interview_answer",
  type: "INTERVIEW_ANSWER",
  missionId: "mis_polymorphism",
  stageId: "stg_poly_interview_a",
  title: {
    en: "Senior Interview Verbal Explanation: Type Switch → Polymorphism",
    ru: "Устный Ответ на Senior-Интервью: Type Switch → Полиморфизм"
  },
  prompt: {
    en: "Your TransactionPipeline rejects InstantTransaction after Instant rail launch, and every new Transaction subtype requires editing the pipeline. Explain design-level polymorphism, the type-switch smell, and your production refactor (process() / handlers) to the interviewer.",
    ru: "TransactionPipeline отклоняет InstantTransaction после запуска Instant-рейла, и каждый новый подтип Transaction требует правки pipeline. Объясните интервьюеру design-level полиморфизм, smell type-switch и ваш продакшн-рефакторинг (process() / handlers)."
  },
  difficulty: "SENIOR",
  assistanceLevel: "INTERVIEW",
  conceptIds: ["cpt_polymorphism", "cpt_type_switch_smell"],
  topicIds: ["top_oop_11"],
  tags: ["#polymorphism", "#type-switch-smell", "#interview"],
  hintIds: [],
  xpReward: 150,
  order: 9,
  payload: {
    targetQuestionId: "q_poly_txn_01",
    rubricDimensions: ["ELEVATOR_PITCH", "POLYMORPHISM_MECHANICS", "PRODUCTION_TRADEOFFS"],
    expectedConcepts: [
      {
        id: "cpt_polymorphism",
        label: { en: "Subtype Polymorphism", ru: "Полиморфизм Подтипов" },
        keywords: ["polymorphism", "subtype", "substitutable", "process", "полиморфизм", "подтип", "подставляем"]
      },
      {
        id: "cpt_type_switch_smell",
        label: { en: "Type Switch / instanceof Smell", ru: "Smell Type Switch / instanceof" },
        keywords: ["instanceof", "type switch", "type-switch", "chain", "цепочка", "type switch"]
      },
      {
        id: "cpt_tell_dont_ask",
        label: { en: "Tell Don't Ask Delegation", ru: "Делегирование Tell Don't Ask" },
        keywords: ["tell don't ask", "delegate", "handler", "accept", "делегир", "handler"]
      },
      {
        id: "cpt_instant_missing_branch",
        label: { en: "Missing Instant Branch Hazard", ru: "Опасность Пропущенной Ветки Instant" },
        keywords: ["InstantTransaction", "Instant", "missing branch", "else", "UNSUPPORTED", "пропущен"]
      }
    ],
    modelAnswer30s: {
      en: "Elevator Pitch (30 sec): TransactionPipeline grew an instanceof chain over Card/Wire/Ach. InstantTransaction existed in the hierarchy but had no branch — Instant rail FAILED. That is the type-switch smell. Refactor to polymorphic Transaction.process(PipelineContext) or handler registry so new subtypes bring behavior without editing the pipeline.",
      ru: "Elevator Pitch (30 сек): TransactionPipeline оброс цепочкой instanceof по Card/Wire/Ach. InstantTransaction был в иерархии, но без ветки — Instant-рейл FAILED. Это smell type-switch. Рефакторинг в полиморфный Transaction.process(PipelineContext) или handler registry, чтобы новые подтипы несли поведение без правки pipeline."
    },
    modelAnswerDetailed: {
      en: "Deep Mechanics (60 sec): Design-level polymorphism: clients depend on Transaction; CardTransaction, WireTransaction, AchTransaction, InstantTransaction override process(ctx) (or accept a TransactionHandler). Pipeline validates, delegates, records — no cast sprawl. Visitor/registry keeps infrastructure out of the entity if needed. This is not Strategy (algorithm-by-channel key) and not megamorphic invokevirtual tuning — it is substitutable type behavior so Instant cannot be 'forgotten' at the call site.",
      ru: "Глубокая Механика (60 сек): Design-level полиморфизм: клиенты зависят от Transaction; CardTransaction, WireTransaction, AchTransaction, InstantTransaction переопределяют process(ctx) (или accept TransactionHandler). Pipeline валидирует, делегирует, записывает — без sprawl cast. Visitor/registry держит инфраструктуру вне сущности при необходимости. Это не Strategy (алгоритм по ключу канала) и не тюнинг megamorphic invokevirtual — это подставляемое поведение типа, чтобы Instant нельзя было «забыть» на call site."
    },
    modelAnswerTradeOffs: {
      en: "Production Trade-offs (30 sec): process() on the entity can fatten the domain model; handlers/visitor add types and wiring. Worth it once rails diverge and multi-team ownership appears. Fail-fast unknown types in any registry. Sealed + exhaustive switch helps at boundaries but still risks a god pipeline if all clearing stays inline.",
      ru: "Продакшн Компромиссы (30 сек): process() на сущности может раздуть доменную модель; handlers/visitor добавляют типы и wiring. Окупается, когда рейлы расходятся и появляется multi-team ownership. Fail-fast неизвестных типов в любом registry. Sealed + exhaustive switch помогает на boundaries, но всё ещё рискует god pipeline, если весь clearing inline."
    },
    followUpQuestionText: {
      en: "Interviewer Follow-Up: 'Isn't this just Strategy Pattern with a Map of handlers?'",
      ru: "Доп. Вопрос Интервьюера: 'Это просто Strategy с Map handlers?'"
    },
    followUpModelAnswerText: {
      en: "Follow-up Model Answer: A handler map can look like Strategy mechanically, but the modeling intent differs. Strategy usually selects interchangeable algorithms by a stable context key (e.g., PaymentChannel). Here the discriminator is the Transaction subtype itself — classic subtype polymorphism / tell-don't-ask. I would not rename this to FeeStrategy; I would say we removed a type switch so InstantTransaction cannot be omitted from a closed instanceof set.",
      ru: "Ответ на Доп. Вопрос: Handler map может механически напоминать Strategy, но modeling intent другой. Strategy обычно выбирает взаимозаменяемые алгоритмы по стабильному ключу контекста (например, PaymentChannel). Здесь дискриминатор — сам подтип Transaction — классический полиморфизм подтипов / tell-don't-ask. Я бы не переименовывал это в FeeStrategy; я бы сказал, что мы убрали type switch, чтобы InstantTransaction нельзя было опустить из закрытого набора instanceof."
    }
  }
};

export const ALL_POLYMORPHISM_CHALLENGES: readonly Challenge[] = [
  GUIDED_FIX_BUILDER_CHALLENGE_POLY,
  APPLIED_BUG_HUNT_CHALLENGE_POLY,
  INTERVIEW_ANSWER_CHALLENGE_POLY
];
