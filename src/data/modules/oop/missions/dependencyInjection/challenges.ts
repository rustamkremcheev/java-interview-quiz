import {
  FixBuilderChallenge,
  BugHuntChallenge,
  InterviewAnswerChallenge,
  Challenge
} from '../../../../../types/domain';

export const GUIDED_FIX_BUILDER_CHALLENGE_DI: FixBuilderChallenge = {
  id: "chl_di_fix_builder",
  type: "FIX_BUILDER",
  missionId: "mis_dependency_injection",
  stageId: "stg_di_practice",
  title: {
    en: "Fix Field Injection Disaster in SettlementOrchestrator",
    ru: "Исправление Катастрофы Field Injection в SettlementOrchestrator"
  },
  prompt: {
    en: "Refactor SettlementOrchestrator so unit tests can inject mocks without Spring. Select the structural building blocks that replace field @Autowired with constructor injection, final fields, and DIP-compliant FxRateGateway/LedgerGateway wiring (no in-method new).",
    ru: "Отрефакторьте SettlementOrchestrator так, чтобы юнит-тесты могли внедрять моки без Spring. Выберите структурные блоки, заменяющие field @Autowired на constructor injection, final-поля и проводку FxRateGateway/LedgerGateway по DIP (без new внутри метода)."
  },
  difficulty: "SENIOR",
  assistanceLevel: "GUIDED",
  conceptIds: ["cpt_dependency_injection", "cpt_dependency_inversion"],
  topicIds: ["top_oop_24"],
  tags: ["#dependency-injection", "#ioc", "#dip", "#settlement"],
  hintIds: ["hnt_di_1", "hnt_di_2", "hnt_di_3", "hnt_di_4"],
  xpReward: 250,
  order: 7,
  payload: {
    baseCodeArtifactId: "art_settlement_orchestrator_broken",
    solutionCodeArtifactId: "art_settlement_orchestrator_solution",
    options: [
      {
        id: "opt_di_fix_1",
        text: {
          en: "Add a public constructor SettlementOrchestrator(FxRateGateway fxRates, LedgerGateway ledger) and assign private final fields.",
          ru: "Добавить публичный конструктор SettlementOrchestrator(FxRateGateway fxRates, LedgerGateway ledger) и назначить private final поля."
        },
        isCorrect: true,
        explanation: {
          en: "Correct. Constructor injection makes mandatory collaborators explicit, final, and injectable in pure unit tests.",
          ru: "Верно. Constructor injection делает обязательных коллабораторов явными, final и внедряемыми в чистых юнит-тестах."
        }
      },
      {
        id: "opt_di_fix_2",
        text: {
          en: "Remove @Autowired field injection and delete `new LiveFxRateGateway()` from settle() — always use the injected FxRateGateway abstraction.",
          ru: "Убрать @Autowired field injection и удалить `new LiveFxRateGateway()` из settle() — всегда использовать внедрённую абстракцию FxRateGateway."
        },
        isCorrect: true,
        explanation: {
          en: "Correct. Removes null field wiring and restores DIP by depending only on the port, not the concrete adapter.",
          ru: "Верно. Убирает null field-проводку и восстанавливает DIP: зависимость только от порта, не от конкретного адаптера."
        }
      },
      {
        id: "opt_di_fix_3",
        text: {
          en: "Depend on FxRateGateway and LedgerGateway interfaces (ports); let the composition root supply LiveFxRateGateway / ledger adapters.",
          ru: "Зависеть от интерфейсов FxRateGateway и LedgerGateway (порты); composition root поставляет адаптеры LiveFxRateGateway / ledger."
        },
        isCorrect: true,
        explanation: {
          en: "Correct. DIP: high-level settlement policy depends on abstractions wired at the edge.",
          ru: "Верно. DIP: высокоуровневая политика settlement зависит от абстракций, проводка — на краю."
        }
      },
      {
        id: "opt_di_fix_distractor_1",
        text: {
          en: "Keep field @Autowired and add @SpringBootTest to every SettlementOrchestratorTest method.",
          ru: "Оставить field @Autowired и добавить @SpringBootTest на каждый метод SettlementOrchestratorTest."
        },
        isCorrect: false,
        explanation: {
          en: "Incorrect. Integration tests hide the design smell and do not make collaborators explicit or DIP-safe.",
          ru: "Неверно. Интеграционные тесты маскируют запах дизайна и не делают коллабораторов явными или DIP-безопасными."
        }
      },
      {
        id: "opt_di_fix_distractor_2",
        text: {
          en: "Replace FxRateGateway with ApplicationContext.getBean(LiveFxRateGateway.class) inside settle() for lazy lookup.",
          ru: "Заменить FxRateGateway на ApplicationContext.getBean(LiveFxRateGateway.class) внутри settle() для lazy lookup."
        },
        isCorrect: false,
        explanation: {
          en: "Incorrect. Service Locator hides deps like field injection and couples orchestration to the container.",
          ru: "Неверно. Service Locator скрывает зависимости как field injection и привязывает оркестрацию к контейнеру."
        }
      }
    ]
  }
};

export const APPLIED_BUG_HUNT_CHALLENGE_DI: BugHuntChallenge = {
  id: "chl_di_bughunt",
  type: "BUG_HUNT",
  missionId: "mis_dependency_injection",
  stageId: "stg_di_debug",
  title: {
    en: "Bug Hunt: Field Injection & Hard-Wired FX Gateway",
    ru: "Поиск Бага: Field Injection и Жёсткий FX Gateway"
  },
  prompt: {
    en: "Inspect SettlementOrchestrator below. Click the exact line(s) that leave collaborators null under `new` and/or hard-wire LiveFxRateGateway inside settle().",
    ru: "Изучите SettlementOrchestrator ниже. Нажмите на строку(и), где коллабораторы остаются null при `new` и/или где LiveFxRateGateway жёстко создаётся внутри settle()."
  },
  difficulty: "SENIOR",
  assistanceLevel: "APPLIED",
  conceptIds: ["cpt_dependency_injection", "cpt_dependency_inversion"],
  topicIds: ["top_oop_24"],
  tags: ["#dependency-injection", "#bughunt", "#settlement"],
  hintIds: ["hnt_di_bug_1", "hnt_di_bug_2", "hnt_di_bug_3", "hnt_di_bug_4"],
  xpReward: 250,
  order: 10,
  payload: {
    baseCodeArtifactId: "art_settlement_orchestrator_bughunt",
    solutionCodeArtifactId: "art_settlement_orchestrator_solution",
    codeSnippet: `import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SettlementOrchestrator {

    @Autowired
    private FxRateGateway fxRates; // Line 7

    @Autowired
    private LedgerGateway ledger; // Line 10

    public SettlementReceipt settle(SettlementRequest request) {
        FxRateGateway rates = fxRates;
        if (rates == null) {
            rates = new LiveFxRateGateway(); // Line 15
        }
        Money converted = rates.convert(request.amount(), request.targetCurrency());
        ledger.post(request.accountId(), converted);
        return new SettlementReceipt(request.id(), converted);
    }
}`,
    lines: [
      { lineNumber: 1, code: "import org.springframework.beans.factory.annotation.Autowired;", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 2, code: "import org.springframework.stereotype.Service;", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 3, code: "", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 4, code: "@Service", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 5, code: "public class SettlementOrchestrator {", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 6, code: "", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 7, code: "    @Autowired", isBug: false, explanation: { en: "", ru: "" } },
      {
        lineNumber: 8,
        code: "    private FxRateGateway fxRates;",
        isBug: true,
        explanation: {
          en: "Field-injected fxRates stays null when unit tests use `new SettlementOrchestrator()` — NPE on convert/getMidRate.",
          ru: "Field-injected fxRates остаётся null, когда юнит-тесты делают `new SettlementOrchestrator()` — NPE на convert/getMidRate."
        }
      },
      { lineNumber: 9, code: "", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 10, code: "    @Autowired", isBug: false, explanation: { en: "", ru: "" } },
      {
        lineNumber: 11,
        code: "    private LedgerGateway ledger;",
        isBug: true,
        explanation: {
          en: "Field-injected ledger is a hidden mandatory dependency — null outside the Spring container, hard to mock without reflection.",
          ru: "Field-injected ledger — скрытая обязательная зависимость: null вне Spring-контейнера, сложно мокать без reflection."
        }
      },
      { lineNumber: 12, code: "", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 13, code: "    public SettlementReceipt settle(SettlementRequest request) {", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 14, code: "        FxRateGateway rates = fxRates;", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 15, code: "        if (rates == null) {", isBug: false, explanation: { en: "", ru: "" } },
      {
        lineNumber: 16,
        code: "            rates = new LiveFxRateGateway();",
        isBug: true,
        explanation: {
          en: "Hard-wires concrete LiveFxRateGateway — violates DIP, blocks FX mocking, and can mask the field-injection null with a live HTTP client in tests.",
          ru: "Жёстко связывает конкретный LiveFxRateGateway — нарушает DIP, блокирует моки FX и может маскировать null field injection живым HTTP-клиентом в тестах."
        }
      },
      { lineNumber: 17, code: "        }", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 18, code: "        Money converted = rates.convert(request.amount(), request.targetCurrency());", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 19, code: "        ledger.post(request.accountId(), converted);", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 20, code: "        return new SettlementReceipt(request.id(), converted);", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 21, code: "    }", isBug: false, explanation: { en: "", ru: "" } },
      { lineNumber: 22, code: "}", isBug: false, explanation: { en: "", ru: "" } }
    ]
  }
};

export const INTERVIEW_ANSWER_CHALLENGE_DI: InterviewAnswerChallenge = {
  id: "chl_di_interview_answer",
  type: "INTERVIEW_ANSWER",
  missionId: "mis_dependency_injection",
  stageId: "stg_di_interview_a",
  title: {
    en: "Senior Interview Verbal Explanation: Field Injection vs Constructor DI",
    ru: "Устный Ответ на Senior-Интервью: Field Injection vs Constructor DI"
  },
  prompt: {
    en: "SettlementOrchestrator unit tests NPE on fxRates despite green @SpringBootTest. Fields are @Autowired; settle() sometimes does new LiveFxRateGateway(). Explain the root cause and how you would fix DI + DIP.",
    ru: "Юнит-тесты SettlementOrchestrator падают NPE на fxRates при зелёном @SpringBootTest. Поля @Autowired; settle() иногда делает new LiveFxRateGateway(). Объясните первопричину и как исправите DI + DIP."
  },
  difficulty: "SENIOR",
  assistanceLevel: "INTERVIEW",
  conceptIds: ["cpt_dependency_injection", "cpt_dependency_inversion"],
  topicIds: ["top_oop_24"],
  tags: ["#dependency-injection", "#dip", "#interview-tradeoffs"],
  hintIds: [],
  xpReward: 300,
  order: 9,
  payload: {
    targetQuestionId: "q_di_settlement_01",
    rubricDimensions: ["ELEVATOR_PITCH", "DEEP_MECHANICS", "PRODUCTION_TRADEOFFS"],
    expectedConcepts: [
      {
        id: "cpt_dependency_injection",
        label: { en: "Constructor vs Field Injection", ru: "Constructor vs Field Injection" },
        keywords: ["constructor injection", "field injection", "Autowired", "final", "конструктор", "field"]
      },
      {
        id: "cpt_dependency_inversion",
        label: { en: "Depend on Abstractions (DIP)", ru: "Зависимость от Абстракций (DIP)" },
        keywords: ["DIP", "abstraction", "FxRateGateway", "LiveFxRateGateway", "абстракц", "new"]
      },
      {
        id: "cpt_testability",
        label: { en: "Unit-Testable Wiring", ru: "Тестируемая Проводка" },
        keywords: ["unit test", "mock", "NPE", "SpringBootTest", "юнит", "мок"]
      },
      {
        id: "cpt_circular_deps",
        label: { en: "Hidden / Circular Dependencies", ru: "Скрытые / Циклические Зависимости" },
        keywords: ["circular", "hidden", "optional", "цикл", "скрыт"]
      }
    ],
    modelAnswer30s: {
      en: "Elevator Pitch (30 sec): Field @Autowired is filled only by Spring. `new SettlementOrchestrator()` leaves fxRates/ledger null → NPE in pure unit tests while @SpringBootTest stays green. Dependencies are hidden from the type signature. Separately, `new LiveFxRateGateway()` inside settle() hard-wires a concrete adapter and violates DIP.",
      ru: "Elevator Pitch (30 сек): Field @Autowired заполняет только Spring. `new SettlementOrchestrator()` оставляет fxRates/ledger null → NPE в чистых юнит-тестах при зелёном @SpringBootTest. Зависимости скрыты из сигнатуры типа. Отдельно `new LiveFxRateGateway()` внутри settle() жёстко связывает конкретный адаптер и нарушает DIP."
    },
    modelAnswerDetailed: {
      en: "Deep Technical Mechanics (60 sec): Fix with constructor injection: SettlementOrchestrator(FxRateGateway, LedgerGateway) assigning private final fields — fail-fast if a collaborator is missing, mocks via `new SettlementOrchestrator(mockFx, mockLedger)`, no ReflectionTestUtils. Remove in-method `new LiveFxRateGateway()`; depend only on FxRateGateway/LedgerGateway ports. Composition root (Spring config) supplies LiveFxRateGateway. Constructor cycles surface at startup instead of optional field cycles failing late.",
      ru: "Глубокая Механика (60 сек): Фикс — constructor injection: SettlementOrchestrator(FxRateGateway, LedgerGateway) с private final полями — fail-fast при отсутствии коллаборатора, моки через `new SettlementOrchestrator(mockFx, mockLedger)`, без ReflectionTestUtils. Убрать `new LiveFxRateGateway()` из метода; зависеть только от портов FxRateGateway/LedgerGateway. Composition root (Spring config) поставляет LiveFxRateGateway. Циклы конструкторов всплывают на старте, а не как поздние optional field-циклы."
    },
    modelAnswerTradeOffs: {
      en: "Production Trade-offs (30 sec): Constructor parameters grow with collaborators — that is a smell to extract facades, not a reason to hide deps. Single-constructor Spring beans need no @Autowired. Prefer ObjectProvider for truly optional deps. ArchUnit: ban field @Autowired in application services and ban `new *Gateway` in settle paths.",
      ru: "Продакшн Компромиссы (30 сек): Параметры конструктора растут с числом коллабораторов — это запах к фасадам, не повод скрывать зависимости. Single-constructor Spring bean не нужен @Autowired. Для genuinely optional — ObjectProvider. ArchUnit: запрет field @Autowired в application services и запрет `new *Gateway` в settle-путях."
    },
    followUpQuestionText: {
      en: "Follow-up Question: 'Would switching to setter injection fix the unit-test NPE without a constructor?'",
      ru: "Дополнительный Вопрос: 'Исправит ли переход на setter injection NPE в юнит-тестах без конструктора?'"
    },
    followUpModelAnswerText: {
      en: "Follow-up Model Answer: Partially — tests could call setters, but deps stay mutable/non-final, optional, and easy to forget. Constructor injection is still preferred for mandatory FxRateGateway/LedgerGateway: immutability, fail-fast completeness, and clearer cycles. Setters are for rare optional collaborators, not core settlement ports.",
      ru: "Ответ на Доп. Вопрос: Частично — тесты могут вызвать setters, но зависимости остаются мутабельными/non-final, опциональными и легко забываются. Для обязательных FxRateGateway/LedgerGateway предпочтителен constructor injection: immutability, fail-fast полнота и более явные циклы. Setters — для редких optional коллабораторов, не для ядерных settlement-портов."
    }
  }
};

export const ALL_DEPENDENCY_INJECTION_CHALLENGES: readonly Challenge[] = [
  GUIDED_FIX_BUILDER_CHALLENGE_DI,
  APPLIED_BUG_HUNT_CHALLENGE_DI,
  INTERVIEW_ANSWER_CHALLENGE_DI
];
