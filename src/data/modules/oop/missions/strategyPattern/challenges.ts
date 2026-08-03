import {
  FixBuilderChallenge,
  BugHuntChallenge,
  InterviewAnswerChallenge,
  Challenge
} from '../../../../../types/domain';

export const GUIDED_FIX_BUILDER_CHALLENGE_ST: FixBuilderChallenge = {
  id: "chl_st_fix_builder",
  type: "FIX_BUILDER",
  missionId: "mis_strategy_pattern",
  stageId: "stg_st_practice",
  title: {
    en: "Fix Builder: Replace Fee Switch with Strategy Registry",
    ru: "Конструктор Исправления: Замена Switch Комиссий на Strategy Registry"
  },
  prompt: {
    en: "PaymentFeeCalculator's PaymentChannel switch caused 0/double feeCents after the CRYPTO hotfix and violates OCP on every new channel. Select ALL structural building blocks required for a production-safe Strategy + FeeStrategyRegistry refactor.",
    ru: "Switch по PaymentChannel в PaymentFeeCalculator вызвал 0/двойные feeCents после хотфикса CRYPTO и нарушает OCP на каждом новом канале. Выберите ВСЕ элементы для продакшн-безопасного рефакторинга Strategy + FeeStrategyRegistry."
  },
  difficulty: "SENIOR",
  assistanceLevel: "GUIDED",
  conceptIds: ["cpt_strategy_pattern", "cpt_open_closed"],
  topicIds: ["top_oop_26"],
  tags: ["#strategy-pattern", "#ocp", "#fee-calculator"],
  hintIds: ["hnt_st_1", "hnt_st_2", "hnt_st_3", "hnt_st_4"],
  xpReward: 100,
  order: 7,
  payload: {
    baseCodeArtifactId: "art_st_fee_calculator_broken",
    solutionCodeArtifactId: "art_st_fee_calculator_solution",
    options: [
      {
        id: "opt_st_fix_1",
        text: {
          en: "Introduce FeeStrategy with long computeFeeCents(PaymentFeeRequest) and per-channel classes (CardFeeStrategy, WireFeeStrategy, AchFeeStrategy, …).",
          ru: "Ввести FeeStrategy с long computeFeeCents(PaymentFeeRequest) и классами по каналам (CardFeeStrategy, WireFeeStrategy, AchFeeStrategy, …)."
        },
        isCorrect: true,
        explanation: {
          en: "Correct. Encapsulating each fee algorithm behind FeeStrategy is the core of Strategy Pattern.",
          ru: "Верно. Инкапсуляция каждого алгоритма комиссии за FeeStrategy — ядро паттерна Strategy."
        }
      },
      {
        id: "opt_st_fix_2",
        text: {
          en: "Add FeeStrategyRegistry (Map/EnumMap) that resolves PaymentChannel → FeeStrategy and fail-fasts on unknown channels.",
          ru: "Добавить FeeStrategyRegistry (Map/EnumMap), резолвящий PaymentChannel → FeeStrategy, с fail-fast на неизвестных каналах."
        },
        isCorrect: true,
        explanation: {
          en: "Correct. Registry-based selection replaces the growing switch and prevents silent null → 0 fee billing.",
          ru: "Верно. Выбор через registry заменяет растущий switch и предотвращает тихий null → 0 fee биллинг."
        }
      },
      {
        id: "opt_st_fix_3",
        text: {
          en: "Keep the giant switch but wrap each case body in synchronized for thread safety.",
          ru: "Оставить гигантский switch, но обернуть тело каждого case в synchronized для потокобезопасности."
        },
        isCorrect: false,
        explanation: {
          en: "Incorrect. Synchronization does not fix OCP violations or switch fall-through fee corruption.",
          ru: "Неверно. Synchronized не исправляет нарушения OCP и порчу комиссий из-за fall-through."
        }
      },
      {
        id: "opt_st_fix_4",
        text: {
          en: "Inject FeeStrategyRegistry into PaymentFeeCalculator and delegate calculateFeeCents to strategy.computeFeeCents(request).",
          ru: "Инжектить FeeStrategyRegistry в PaymentFeeCalculator и делегировать calculateFeeCents в strategy.computeFeeCents(request)."
        },
        isCorrect: true,
        explanation: {
          en: "Correct. Calculator becomes a thin context — open for extension via new registry entries, closed for modification.",
          ru: "Верно. Калькулятор становится тонким контекстом — открыт для расширения через новые записи registry, закрыт для модификации."
        }
      },
      {
        id: "opt_st_fix_distractor_1",
        text: {
          en: "Extract strategies but still select them with switch(channel) { case CARD: return new CardFeeStrategy(); ... } inside the calculator.",
          ru: "Вынести strategies, но по-прежнему выбирать их через switch(channel) { case CARD: return new CardFeeStrategy(); ... } внутри калькулятора."
        },
        isCorrect: false,
        explanation: {
          en: "Incorrect. Fake Strategy — the OCP violation and fall-through risk remain in the selector switch.",
          ru: "Неверно. Фальшивый Strategy — нарушение OCP и риск fall-through остаются в switch-селекторе."
        }
      }
    ]
  }
};

export const APPLIED_BUG_HUNT_CHALLENGE_ST: BugHuntChallenge = {
  id: "chl_st_bughunt",
  type: "BUG_HUNT",
  missionId: "mis_strategy_pattern",
  stageId: "stg_st_debug",
  title: {
    en: "Bug Hunt: CRYPTO Case Fall-Through Zeroes INSTANT Fees",
    ru: "Поиск Бага: Fall-Through Case CRYPTO Обнуляет Комиссии INSTANT"
  },
  prompt: {
    en: "PaymentFeeCalculator still uses a switch. After CRYPTO was added, INSTANT transfers post feeCents = 0 and some paths double-charge. Click the line(s) responsible for the fall-through / missing break.",
    ru: "PaymentFeeCalculator всё ещё использует switch. После добавления CRYPTO INSTANT-переводы получают feeCents = 0, а часть путей — двойную комиссию. Нажмите строку(и), ответственные за fall-through / пропущенный break."
  },
  difficulty: "SENIOR",
  assistanceLevel: "APPLIED",
  conceptIds: ["cpt_strategy_pattern", "cpt_open_closed"],
  topicIds: ["top_oop_26"],
  tags: ["#strategy-pattern", "#bug-hunt", "#switch-fallthrough"],
  hintIds: ["hnt_st_bug_1", "hnt_st_bug_2", "hnt_st_bug_3"],
  xpReward: 100,
  order: 10,
  payload: {
    baseCodeArtifactId: "art_st_fee_calculator_bughunt",
    solutionCodeArtifactId: "art_st_fee_calculator_solution",
    codeSnippet: `public long calculateFeeCents(PaymentFeeRequest request) {
    long feeCents = 0;
    switch (request.channel()) {
        case CARD:
            feeCents = cardFee(request); // Line 4
            break;
        case WIRE:
            feeCents = wireFee(request); // Line 7
            break;
        case ACH:
            feeCents = achFee(request); // Line 10
            break;
        case CRYPTO:
            feeCents = cryptoFee(request); // Line 13
            // BUG: missing break — falls through!
        case INSTANT:
            feeCents = 0; // Line 16 — overwrites CRYPTO / zeroes INSTANT path misuse
            break;
        default:
            throw new IllegalArgumentException("Unknown channel");
    }
    return feeCents;
}`,
    lines: [
      { lineNumber: 1, code: "public long calculateFeeCents(PaymentFeeRequest request) {", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 2, code: "    long feeCents = 0;", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 3, code: "    switch (request.channel()) {", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 4, code: "        case CARD:", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 5, code: "            feeCents = cardFee(request);", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 6, code: "            break;", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 7, code: "        case WIRE:", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 8, code: "            feeCents = wireFee(request);", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 9, code: "            break;", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 10, code: "        case ACH:", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 11, code: "            feeCents = achFee(request);", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 12, code: "            break;", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 13, code: "        case CRYPTO:", isBug: false, explanation: { en: "", ru: "" } },
      {
        lineNumber: 14,
        code: "            feeCents = cryptoFee(request);",
        isBug: false,
        explanation: { en: "", ru: "" }
      },
      {
        lineNumber: 15,
        code: "            // missing break",
        isBug: true,
        explanation: {
          en: "Line 15: CRYPTO has no break — execution falls into INSTANT. CRYPTO fee is overwritten; control-flow couples unrelated channels.",
          ru: "Строка 15: у CRYPTO нет break — выполнение падает в INSTANT. Комиссия CRYPTO перезаписывается; control-flow связывает несвязанные каналы."
        }
      },
      {
        lineNumber: 16,
        code: "        case INSTANT:",
        isBug: true,
        explanation: {
          en: "Line 16-17: INSTANT assigns feeCents = 0. Reached via fall-through from CRYPTO (wrong fee) and also as the real INSTANT path (0 fee bug).",
          ru: "Строки 16-17: INSTANT присваивает feeCents = 0. Достигается через fall-through из CRYPTO (неверная комиссия) и как реальный путь INSTANT (баг нулевой комиссии)."
        }
      },
      {
        lineNumber: 17,
        code: "            feeCents = 0;",
        isBug: true,
        explanation: {
          en: "Line 17: Hard-coded 0 destroys CRYPTO results after fall-through and posts free INSTANT transfers in production.",
          ru: "Строка 17: Жёсткий 0 уничтожает результат CRYPTO после fall-through и выставляет бесплатный INSTANT на продакшене."
        }
      },
      { lineNumber: 18, code: "            break;", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 19, code: "        default:", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 20, code: "            throw new IllegalArgumentException(\"Unknown channel\");", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 21, code: "    }", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 22, code: "    return feeCents;", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 23, code: "}", isBug: false, explanation: { en: "", ru: "" } }
    ]
  }
};

export const INTERVIEW_ANSWER_CHALLENGE_ST: InterviewAnswerChallenge = {
  id: "chl_st_interview_answer",
  type: "INTERVIEW_ANSWER",
  missionId: "mis_strategy_pattern",
  stageId: "stg_st_interview_a",
  title: {
    en: "Senior Interview Verbal Explanation: Fee Switch → Strategy",
    ru: "Устный Ответ на Senior-Интервью: Switch Комиссий → Strategy"
  },
  prompt: {
    en: "Your PaymentFeeCalculator posts wrong feeCents after a CRYPTO channel hotfix, and every new PaymentChannel requires editing the calculator. Explain Strategy Pattern, Open-Closed, and your production refactor (FeeStrategy + FeeStrategyRegistry) to the interviewer.",
    ru: "PaymentFeeCalculator выставляет неверные feeCents после хотфикса канала CRYPTO, и каждый новый PaymentChannel требует правки калькулятора. Объясните интервьюеру паттерн Strategy, Open-Closed и ваш продакшн-рефакторинг (FeeStrategy + FeeStrategyRegistry)."
  },
  difficulty: "SENIOR",
  assistanceLevel: "INTERVIEW",
  conceptIds: ["cpt_strategy_pattern", "cpt_open_closed"],
  topicIds: ["top_oop_26"],
  tags: ["#strategy-pattern", "#ocp", "#interview"],
  hintIds: [],
  xpReward: 150,
  order: 9,
  payload: {
    targetQuestionId: "q_st_fee_01",
    rubricDimensions: ["ELEVATOR_PITCH", "STRATEGY_MECHANICS", "PRODUCTION_TRADEOFFS"],
    expectedConcepts: [
      {
        id: "cpt_strategy_pattern",
        label: { en: "Strategy Pattern", ru: "Паттерн Strategy" },
        keywords: ["strategy", "FeeStrategy", "interchangeable", "algorithm", "strategy pattern", "стратегия", "паттерн strategy"]
      },
      {
        id: "cpt_open_closed",
        label: { en: "Open-Closed Principle", ru: "Принцип Open-Closed" },
        keywords: ["open-closed", "ocp", "open for extension", "closed for modification", "открыт для расширения", "закрыт для модификации"]
      },
      {
        id: "cpt_fee_registry",
        label: { en: "FeeStrategyRegistry Map Dispatch", ru: "Диспетчеризация FeeStrategyRegistry Map" },
        keywords: ["registry", "map", "EnumMap", "resolve", "FeeStrategyRegistry", "реестр"]
      },
      {
        id: "cpt_fallthrough",
        label: { en: "Switch Fall-Through Hazard", ru: "Опасность Fall-Through в Switch" },
        keywords: ["fall-through", "fallthrough", "missing break", "break", "пропущенный break", "fall-through"]
      }
    ],
    modelAnswer30s: {
      en: "Elevator Pitch (30 sec): PaymentFeeCalculator grew a PaymentChannel switch for feeCents. Adding CRYPTO without break fell through and zeroed INSTANT fees — and every channel forces editing one class (OCP violation). Refactor each formula into FeeStrategy implementations and select via FeeStrategyRegistry Map so new channels register without touching existing strategies.",
      ru: "Elevator Pitch (30 сек): PaymentFeeCalculator оброс switch по PaymentChannel для feeCents. CRYPTO без break провалился и обнулил INSTANT — и каждый канал требует правки одного класса (нарушение OCP). Выносим формулы в FeeStrategy и выбираем через FeeStrategyRegistry Map, чтобы новые каналы регистрировались без касания существующих strategies."
    },
    modelAnswerDetailed: {
      en: "Deep Mechanics (60 sec): Strategy encapsulates interchangeable algorithms behind FeeStrategy.computeFeeCents(PaymentFeeRequest). CardFeeStrategy, WireFeeStrategy, AchFeeStrategy own their formulas. FeeStrategyRegistry.resolve(channel) returns the strategy or fail-fasts — never null→0. PaymentFeeCalculator is a thin context: resolve + delegate. No shared mutable feeCents accumulator, no break to forget. OCP: open for extension (new strategy class + registry entry), closed for modification (calculator body stable).",
      ru: "Глубокая Механика (60 сек): Strategy инкапсулирует взаимозаменяемые алгоритмы за FeeStrategy.computeFeeCents(PaymentFeeRequest). CardFeeStrategy, WireFeeStrategy, AchFeeStrategy владеют своими формулами. FeeStrategyRegistry.resolve(channel) возвращает strategy или fail-fast — никогда null→0. PaymentFeeCalculator — тонкий контекст: resolve + delegate. Нет общего мутабельного аккумулятора feeCents, нет break, который можно забыть. OCP: открыт для расширения (новый класс + запись registry), закрыт для модификации (тело калькулятора стабильно)."
    },
    modelAnswerTradeOffs: {
      en: "Production Trade-offs (30 sec): More types and composition-root wiring versus a switch. Worth it past ~4 divergent fee formulas and multi-team ownership. Prefer stateless strategies; populate EnumMap at startup; integration-test that every PaymentChannel constant has a registration. Sealed switch expressions help exhaustiveness but still modify the calculator — weaker OCP than external strategy modules.",
      ru: "Продакшн Компромиссы (30 сек): Больше типов и wiring в composition root против switch. Окупается после ~4 расходящихся формул и multi-team ownership. Предпочитайте stateless strategies; наполняйте EnumMap при старте; интеграционный тест, что каждая константа PaymentChannel зарегистрирована. Sealed switch expressions помогают с exhaustiveness, но всё равно меняют калькулятор — слабее OCP, чем внешние strategy-модули."
    },
    followUpQuestionText: {
      en: "Interviewer Follow-Up: 'If we used a switch expression with exhaustiveness on a sealed PaymentChannel, do we still need Strategy?'",
      ru: "Доп. Вопрос Интервьюера: 'Если использовать switch expression с exhaustiveness на sealed PaymentChannel — Strategy всё ещё нужен?'"
    },
    followUpModelAnswerText: {
      en: "Follow-up Model Answer: Exhaustive switch expressions prevent 'forgot a case' compile errors, which is better than classic switch. But adding CRYPTO still edits PaymentFeeCalculator — feature teams cannot ship fee logic in isolation. Strategy + registry keeps the calculator closed and lets channel modules own CardFeeStrategy/CryptoFeeStrategy. Use exhaustiveness at the registry bootstrap if you want both safety and OCP.",
      ru: "Ответ на Доп. Вопрос: Exhaustive switch expressions предотвращают ошибки компиляции «забыли case» — лучше классического switch. Но добавление CRYPTO всё равно правит PaymentFeeCalculator — feature-команды не могут выкатить логику комиссий изолированно. Strategy + registry держит калькулятор закрытым, а модули каналов владеют CardFeeStrategy/CryptoFeeStrategy. Exhaustiveness на bootstrap registry даёт и безопасность, и OCP."
    }
  }
};

export const ALL_STRATEGY_CHALLENGES: readonly Challenge[] = [
  GUIDED_FIX_BUILDER_CHALLENGE_ST,
  APPLIED_BUG_HUNT_CHALLENGE_ST,
  INTERVIEW_ANSWER_CHALLENGE_ST
];
