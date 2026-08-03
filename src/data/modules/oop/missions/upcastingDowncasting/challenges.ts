import {
  FixBuilderChallenge,
  BugHuntChallenge,
  InterviewAnswerChallenge,
  Challenge
} from '../../../../../types/domain';

export const GUIDED_FIX_BUILDER_CHALLENGE_CAST: FixBuilderChallenge = {
  id: "chl_cast_fix_builder",
  type: "FIX_BUILDER",
  missionId: "mis_upcasting_downcasting",
  stageId: "stg_cast_practice",
  title: {
    en: "Fix Builder: Safe FraudEvent Handling Without Blind Casts",
    ru: "Конструктор Исправления: Безопасная Обработка FraudEvent Без Слепых Cast'ов"
  },
  prompt: {
    en: "FraudInvestigationService throws ClassCastException on AchFraudEvent because it blind-casts FraudEvent to CardFraudEvent / WireFraudEvent. Select ALL structural building blocks required for a production-safe fix (pattern matching and/or polymorphic extractEvidence).",
    ru: "FraudInvestigationService бросает ClassCastException на AchFraudEvent, потому что слепо кастит FraudEvent к CardFraudEvent / WireFraudEvent. Выберите ВСЕ элементы для продакшн-безопасного фикса (pattern matching и/или полиморфный extractEvidence)."
  },
  difficulty: "SENIOR",
  assistanceLevel: "GUIDED",
  conceptIds: ["cpt_upcasting", "cpt_downcasting"],
  topicIds: ["top_oop_13"],
  tags: ["#upcasting", "#downcasting", "#instanceof", "#fraud"],
  hintIds: ["hnt_cast_1", "hnt_cast_2", "hnt_cast_3", "hnt_cast_4"],
  xpReward: 100,
  order: 7,
  payload: {
    baseCodeArtifactId: "art_cast_investigation_broken",
    solutionCodeArtifactId: "art_cast_investigation_solution",
    options: [
      {
        id: "opt_cast_fix_1",
        text: {
          en: "Replace blind (CardFraudEvent)/(WireFraudEvent) casts with Java 17 pattern matching instanceof that binds typed pattern variables.",
          ru: "Заменить слепые cast'ы (CardFraudEvent)/(WireFraudEvent) на pattern matching instanceof Java 17 с привязкой typed pattern-переменных."
        },
        isCorrect: true,
        explanation: {
          en: "Correct. Pattern matching combines the type test and safe binding — AchFraudEvent simply fails the Card/Wire matches instead of crashing.",
          ru: "Верно. Pattern matching объединяет проверку типа и безопасную привязку — AchFraudEvent просто не матчится на Card/Wire вместо краша."
        }
      },
      {
        id: "opt_cast_fix_2",
        text: {
          en: "Add abstract FraudEvidence extractEvidence() on FraudEvent; override in CardFraudEvent, WireFraudEvent, AchFraudEvent so the service never casts.",
          ru: "Добавить abstract FraudEvidence extractEvidence() на FraudEvent; переопределить в CardFraudEvent, WireFraudEvent, AchFraudEvent, чтобы сервис не кастил."
        },
        isCorrect: true,
        explanation: {
          en: "Correct. Polymorphic extractEvidence() is the production-grade design that eliminates cast chains as new fraud rails appear.",
          ru: "Верно. Полиморфный extractEvidence() — продакшн-дизайн, устраняющий цепочки cast'ов по мере появления новых fraud-рейлов."
        }
      },
      {
        id: "opt_cast_fix_3",
        text: {
          en: "Wrap every cast in try/catch (ClassCastException) and return empty FraudEvidence on failure.",
          ru: "Обернуть каждый cast в try/catch (ClassCastException) и возвращать пустой FraudEvidence при сбое."
        },
        isCorrect: false,
        explanation: {
          en: "Incorrect. Catching ClassCastException hides the design smell and can silently drop real ACH investigations.",
          ru: "Неверно. Ловля ClassCastException скрывает design smell и может тихо отбрасывать реальные ACH-расследования."
        }
      },
      {
        id: "opt_cast_fix_4",
        text: {
          en: "Keep FraudEvent as the service API boundary (upcast at entry) while moving subtype-specific field access into typed branches or overrides.",
          ru: "Сохранить FraudEvent как API-границу сервиса (upcast на входе), перенеся доступ к subtype-specific полям в typed-ветки или overrides."
        },
        isCorrect: true,
        explanation: {
          en: "Correct. Upcasting at the boundary is fine; the bug is unsafe narrowing inside investigate(), not accepting FraudEvent.",
          ru: "Верно. Upcast на границе нормален; баг — небезопасное сужение внутри investigate(), а не приём FraudEvent."
        }
      },
      {
        id: "opt_cast_fix_distractor_1",
        text: {
          en: "Force all producers to send only CardFraudEvent by casting AchFraudEvent to CardFraudEvent at the message bus.",
          ru: "Заставить всех продюсеров слать только CardFraudEvent, кастя AchFraudEvent к CardFraudEvent на message bus."
        },
        isCorrect: false,
        explanation: {
          en: "Incorrect. That still throws ClassCastException (or corrupts data) — ACH is not a card event.",
          ru: "Неверно. Это всё равно бросит ClassCastException (или испортит данные) — ACH не является card-событием."
        }
      }
    ]
  }
};

export const APPLIED_BUG_HUNT_CHALLENGE_CAST: BugHuntChallenge = {
  id: "chl_cast_bughunt",
  type: "BUG_HUNT",
  missionId: "mis_upcasting_downcasting",
  stageId: "stg_cast_debug",
  title: {
    en: "Bug Hunt: Blind CardFraudEvent Cast Crashes on ACH",
    ru: "Поиск Бага: Слепой Cast CardFraudEvent Падает на ACH"
  },
  prompt: {
    en: "FraudInvestigationService still blind-casts. At 02:00 AchFraudEvent enters investigate() and throws ClassCastException. Click the line(s) responsible for the unsafe downcast.",
    ru: "FraudInvestigationService всё ещё слепо кастит. В 02:00 AchFraudEvent входит в investigate() и бросает ClassCastException. Нажмите строку(и), ответственные за небезопасный downcast."
  },
  difficulty: "SENIOR",
  assistanceLevel: "APPLIED",
  conceptIds: ["cpt_upcasting", "cpt_downcasting"],
  topicIds: ["top_oop_13"],
  tags: ["#downcasting", "#bug-hunt", "#classcastexception"],
  hintIds: ["hnt_cast_bug_1", "hnt_cast_bug_2", "hnt_cast_bug_3"],
  xpReward: 100,
  order: 10,
  payload: {
    baseCodeArtifactId: "art_cast_investigation_bughunt",
    solutionCodeArtifactId: "art_cast_investigation_solution",
    codeSnippet: `public FraudEvidence investigate(FraudEvent event) {
    String channel = event.channel(); // Line 2
    if ("CARD".equals(channel)) {
        CardFraudEvent card = (CardFraudEvent) event; // Line 4 — BUG
        return FraudEvidence.ofCard(card.panLast4(), card.mcc());
    }
    if ("WIRE".equals(channel)) {
        WireFraudEvent wire = (WireFraudEvent) event; // Line 8
        return FraudEvidence.ofWire(wire.wireReference(), wire.beneficiaryBank());
    }
    // ACH and unknown channels incorrectly fall through to CARD cast assumption
    CardFraudEvent fallback = (CardFraudEvent) event; // Line 12 — BUG for AchFraudEvent
    return FraudEvidence.ofCard(fallback.panLast4(), fallback.mcc());
}`,
    lines: [
      { lineNumber: 1, code: "public FraudEvidence investigate(FraudEvent event) {", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      { lineNumber: 2, code: "    String channel = event.channel();", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      { lineNumber: 3, code: "    if (\"CARD\".equals(channel)) {", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      {
        lineNumber: 4,
        code: "        CardFraudEvent card = (CardFraudEvent) event;",
        isBug: true,
        explanation: {
          en: "Line 4: Blind downcast assumes channel string always matches runtime type. Prefer instanceof pattern matching or polymorphism.",
          ru: "Строка 4: Слепой downcast предполагает, что строка channel всегда совпадает с runtime-типом. Предпочтительнее instanceof pattern matching или полиморфизм."
        }
      },
      { lineNumber: 5, code: "        return FraudEvidence.ofCard(card.panLast4(), card.mcc());", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      { lineNumber: 6, code: "    }", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      { lineNumber: 7, code: "    if (\"WIRE\".equals(channel)) {", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      {
        lineNumber: 8,
        code: "        WireFraudEvent wire = (WireFraudEvent) event;",
        isBug: true,
        explanation: {
          en: "Line 8: Same unsafe downcast pattern for WIRE — fails if channel string and runtime type diverge.",
          ru: "Строка 8: Тот же паттерн небезопасного downcast для WIRE — падает, если строка channel и runtime-тип расходятся."
        }
      },
      { lineNumber: 9, code: "        return FraudEvidence.ofWire(wire.wireReference(), wire.beneficiaryBank());", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      { lineNumber: 10, code: "    }", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      {
        lineNumber: 11,
        code: "    // ACH falls through",
        isBug: false,
        explanation: { en: "Not the defect line.", ru: "Не строка дефекта." }
      },
      {
        lineNumber: 12,
        code: "    CardFraudEvent fallback = (CardFraudEvent) event;",
        isBug: true,
        explanation: {
          en: "Line 12: AchFraudEvent hits this fallback Card cast → ClassCastException at 02:00. This is the production crash line.",
          ru: "Строка 12: AchFraudEvent попадает в этот fallback Card cast → ClassCastException в 02:00. Это строка продакшн-краша."
        }
      },
      { lineNumber: 13, code: "    return FraudEvidence.ofCard(fallback.panLast4(), fallback.mcc());", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      { lineNumber: 14, code: "}", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } }
    ]
  }
};

export const INTERVIEW_ANSWER_CHALLENGE_CAST: InterviewAnswerChallenge = {
  id: "chl_cast_interview_answer",
  type: "INTERVIEW_ANSWER",
  missionId: "mis_upcasting_downcasting",
  stageId: "stg_cast_interview_a",
  title: {
    en: "Senior Interview Verbal Explanation: Unsafe Fraud Downcasts",
    ru: "Устный Ответ на Senior-Интервью: Небезопасные Fraud Downcast"
  },
  prompt: {
    en: "FraudInvestigationService throws ClassCastException at 02:00 when AchFraudEvent arrives because investigate() blind-casts FraudEvent to CardFraudEvent. Explain upcasting vs downcasting, pattern matching instanceof, and why polymorphic extractEvidence() is the better long-term fix.",
    ru: "FraudInvestigationService бросает ClassCastException в 02:00, когда приходит AchFraudEvent, потому что investigate() слепо кастит FraudEvent к CardFraudEvent. Объясните upcasting vs downcasting, pattern matching instanceof и почему полиморфный extractEvidence() — лучший долгосрочный фикс."
  },
  difficulty: "SENIOR",
  assistanceLevel: "INTERVIEW",
  conceptIds: ["cpt_upcasting", "cpt_downcasting"],
  topicIds: ["top_oop_13"],
  tags: ["#upcasting", "#downcasting", "#interview"],
  hintIds: [],
  xpReward: 150,
  order: 9,
  payload: {
    targetQuestionId: "q_cast_fraud_01",
    rubricDimensions: ["ELEVATOR_PITCH", "CAST_MECHANICS", "PRODUCTION_TRADEOFFS"],
    expectedConcepts: [
      {
        id: "cpt_upcasting",
        label: { en: "Upcasting", ru: "Upcasting" },
        keywords: ["upcast", "upcasting", "FraudEvent", "supertype", "widening", "апкаст", "восходящее"]
      },
      {
        id: "cpt_downcasting",
        label: { en: "Downcasting", ru: "Downcasting" },
        keywords: ["downcast", "downcasting", "ClassCastException", "narrowing", "даункаст", "нисходящее"]
      },
      {
        id: "cpt_pattern_matching",
        label: { en: "Pattern Matching instanceof", ru: "Pattern Matching instanceof" },
        keywords: ["instanceof", "pattern matching", "pattern variable", "Java 17", "pattern matching"]
      },
      {
        id: "cpt_polymorphic_evidence",
        label: { en: "Polymorphic extractEvidence()", ru: "Полиморфный extractEvidence()" },
        keywords: ["extractEvidence", "polymorphism", "override", "полиморфизм", "без cast", "no cast"]
      }
    ],
    modelAnswer30s: {
      en: "Elevator Pitch (30 sec): Accepting FraudEvent is a safe upcast. Blind (CardFraudEvent) casts are runtime-checked downcasts — AchFraudEvent is not a CardFraudEvent, so ClassCastException fires at 02:00. Fix with pattern matching instanceof short-term; better: FraudEvent.extractEvidence() overridden per subtype so the service never casts.",
      ru: "Elevator Pitch (30 сек): Приём FraudEvent — безопасный upcast. Слепые cast'ы (CardFraudEvent) — runtime-проверяемые downcast — AchFraudEvent не CardFraudEvent, поэтому ClassCastException в 02:00. Краткосрочно — pattern matching instanceof; лучше: FraudEvent.extractEvidence() с override по подтипам, чтобы сервис не кастил."
    },
    modelAnswerDetailed: {
      en: "Deep Mechanics (60 sec): Upcasting Card/Wire/ACH → FraudEvent widens the reference; compile-time safe. Downcasting narrows and the JVM checks assignment compatibility — mismatch → ClassCastException. Channel-string branches plus blind casts drift from runtime types. Java 17 `if (event instanceof CardFraudEvent card)` binds safely with scoped pattern variables. Polymorphic extractEvidence() pushes subtype field access into CardFraudEvent / WireFraudEvent / AchFraudEvent overrides — investigate() only delegates, OCP-friendly for new rails.",
      ru: "Глубокая Механика (60 сек): Upcast Card/Wire/ACH → FraudEvent расширяет ссылку; безопасен на компиляции. Downcast сужает, JVM проверяет assignment compatibility — mismatch → ClassCastException. Ветки по строке channel плюс слепые cast'ы дрейфуют от runtime-типов. Java 17 `if (event instanceof CardFraudEvent card)` привязывает безопасно со scoped pattern-переменными. Полиморфный extractEvidence() переносит доступ к полям подтипа в overrides CardFraudEvent / WireFraudEvent / AchFraudEvent — investigate() только делегирует, OCP-дружественно для новых рейлов."
    },
    modelAnswerTradeOffs: {
      en: "Production Trade-offs (30 sec): Pattern matching is a low-risk hotfix when hierarchy ownership is shared. Polymorphism needs hierarchy changes but removes type-switch growth. Do not catch ClassCastException as control flow. Add ACH fixture tests and ban blind casts in the service package after the refactor.",
      ru: "Продакшн Компромиссы (30 сек): Pattern matching — низкорисковый хотфикс при общем владении иерархией. Полиморфизм требует правок иерархии, но убирает рост type-switch. Не ловите ClassCastException как control flow. Добавьте ACH-фикстуры и запретите слепые cast'ы в пакете сервиса после рефакторинга."
    },
    followUpQuestionText: {
      en: "Interviewer Follow-Up: 'If FraudEvent is sealed and we use switch pattern matching, do we still need extractEvidence()?'",
      ru: "Доп. Вопрос Интервьюера: 'Если FraudEvent sealed и мы используем switch pattern matching — extractEvidence() всё ещё нужен?'"
    },
    followUpModelAnswerText: {
      en: "Follow-up Model Answer: Sealed + switch patterns give exhaustiveness at the service — safer than classic casts. But every new rail still edits FraudInvestigationService. Prefer extractEvidence() when evidence rules belong with subtypes and feature teams own those classes. Use sealed switch at anti-corruption boundaries where you must adapt external types you cannot modify.",
      ru: "Ответ на Доп. Вопрос: Sealed + switch patterns дают exhaustiveness в сервисе — безопаснее классических cast'ов. Но каждый новый рейл всё равно правит FraudInvestigationService. Предпочитайте extractEvidence(), когда правила evidence принадлежат подтипам и ими владеют feature-команды. Sealed switch — на anti-corruption границах, где нужно адаптировать внешние типы, которые нельзя менять."
    }
  }
};

export const ALL_UPCASTING_DOWNCASTING_CHALLENGES: readonly Challenge[] = [
  GUIDED_FIX_BUILDER_CHALLENGE_CAST,
  APPLIED_BUG_HUNT_CHALLENGE_CAST,
  INTERVIEW_ANSWER_CHALLENGE_CAST
];
