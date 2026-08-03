import { Mission, MissionStage } from '../../../../../types/domain';

export const DEPENDENCY_INJECTION_MISSION_STAGES: readonly MissionStage[] = [
  {
    id: "stg_di_intro",
    missionId: "mis_dependency_injection",
    type: "MISSION_INTRODUCTION",
    order: 1,
    title: { en: "1. Mission Introduction", ru: "1. Введение в Миссию" },
    instructions: {
      en: "Inspect the CI failure below where SettlementOrchestrator unit tests explode with NullPointerException on fxRates.getMidRate() despite a green Spring Boot integration suite.",
      ru: "Изучите CI-падение ниже, где юнит-тесты SettlementOrchestrator взрываются NullPointerException на fxRates.getMidRate(), хотя Spring Boot интеграционный suite зелёный."
    }
  },
  {
    id: "stg_di_problem",
    missionId: "mis_dependency_injection",
    type: "REAL_ENGINEERING_PROBLEM",
    order: 2,
    title: { en: "2. Real Engineering Problem", ru: "2. Реальная Инженерная Проблема" },
    instructions: {
      en: "Examine SettlementOrchestrator — field-injected FxRateGateway and LedgerGateway via @Autowired, no constructor, plus hard-wired new LiveFxRateGateway() inside settle().",
      ru: "Изучите SettlementOrchestrator — field injection FxRateGateway и LedgerGateway через @Autowired, без конструктора, плюс жёсткий new LiveFxRateGateway() внутри settle()."
    }
  },
  {
    id: "stg_di_think",
    missionId: "mis_dependency_injection",
    type: "THINK_YOURSELF",
    order: 3,
    title: { en: "3. Think Yourself Diagnostic", ru: "3. Диагностика: Подумайте Сам" },
    instructions: {
      en: "Formulate your hypothesis: Why do plain `new SettlementOrchestrator()` unit tests NPE while the Spring context suite passes, and what does `new LiveFxRateGateway()` inside settle() break?",
      ru: "Сформулируйте гипотезу: почему юнит-тесты с `new SettlementOrchestrator()` дают NPE, а Spring-suite проходит, и что ломает `new LiveFxRateGateway()` внутри settle()?"
    }
  },
  {
    id: "stg_di_help",
    missionId: "mis_dependency_injection",
    type: "NEED_HELP",
    order: 4,
    title: { en: "4. Need Knowledge Bridge", ru: "4. Мост к Знаниям" },
    instructions: {
      en: "No-penalty bridge into dependency injection, constructor vs field injection, and Dependency Inversion (DIP) theory.",
      ru: "Бесштрафной переход к теории внедрения зависимостей, constructor vs field injection и Dependency Inversion (DIP)."
    }
  },
  {
    id: "stg_di_theory",
    missionId: "mis_dependency_injection",
    type: "THEORY",
    order: 5,
    title: { en: "5. Core Theory & Checkpoints", ru: "5. Фундаментальная Теория и Проверки" },
    instructions: {
      en: "Study the theory sections on DI/IoC, constructor injection vs field injection, DIP, and complete checkpoints plus 10+ senior follow-ups.",
      ru: "Изучите разделы теории о DI/IoC, constructor vs field injection, DIP, пройдите проверки и 10+ Senior follow-up вопросов."
    },
    theoryArticleId: "art_theory_dependency_injection"
  },
  {
    id: "stg_di_visual",
    missionId: "mis_dependency_injection",
    type: "VISUALIZATION",
    order: 6,
    title: { en: "6. Interactive Wiring Visualization", ru: "6. Визуализация Проводок Зависимостей" },
    instructions: {
      en: "Compare Spring-populated field injection (hidden deps) against explicit constructor injection with final FxRateGateway and LedgerGateway collaborator wires.",
      ru: "Сравните скрытые зависимости field injection от Spring с явным constructor injection через final FxRateGateway и LedgerGateway."
    }
  },
  {
    id: "stg_di_practice",
    missionId: "mis_dependency_injection",
    type: "INTERACTIVE_PRACTICE",
    order: 7,
    title: { en: "7. Guided Practice: Fix Builder", ru: "7. Практика: Конструктор Исправления" },
    instructions: {
      en: "Select production-safe structural elements to refactor SettlementOrchestrator to constructor injection, final fields, and DIP-compliant abstractions.",
      ru: "Выберите безопасные элементы для рефакторинга SettlementOrchestrator к constructor injection, final-полям и абстракциям по DIP."
    },
    challengeId: "chl_di_fix_builder"
  },
  {
    id: "stg_di_interview_q",
    missionId: "mis_dependency_injection",
    type: "INTERVIEW_QUESTION",
    order: 8,
    title: { en: "8. Senior Interview Scenario", ru: "8. Сценарий Senior-Интервью" },
    instructions: {
      en: "Review the senior interview question about field-injection NPEs in SettlementOrchestrator unit tests and hard-wired collaborators.",
      ru: "Ознакомьтесь с Senior-вопросом о NPE от field injection в юнит-тестах SettlementOrchestrator и жёстко связанных коллабораторах."
    },
    interviewQuestionId: "q_di_settlement_01",
    challengeId: "chl_di_interview_answer"
  },
  {
    id: "stg_di_interview_a",
    missionId: "mis_dependency_injection",
    type: "INTERVIEW_ANSWER",
    order: 9,
    title: { en: "9. Interview Verbal Answer", ru: "9. Устный Ответ и Модель" },
    instructions: {
      en: "Formulate your structured 90-second verbal response (Elevator Pitch + Mechanics + Trade-offs) and submit for evaluation.",
      ru: "Сформулируйте структурированный 90-секундный ответ (Elevator Pitch + Механика + Компромиссы) и отправьте на проверку."
    },
    interviewQuestionId: "q_di_settlement_01",
    challengeId: "chl_di_interview_answer"
  },
  {
    id: "stg_di_debug",
    missionId: "mis_dependency_injection",
    type: "DEBUG_COUNTER_EXAMPLE",
    order: 10,
    title: { en: "10. Applied Bug Hunt: SettlementOrchestrator", ru: "10. Поиск Бага: SettlementOrchestrator" },
    instructions: {
      en: "Identify the line(s) where field @Autowired dependencies stay null in unit tests and where new LiveFxRateGateway() hard-wires a concrete collaborator.",
      ru: "Найдите строку(и), где @Autowired field-зависимости остаются null в юнит-тестах и где new LiveFxRateGateway() жёстко связывает конкретный коллаборатор."
    },
    challengeId: "chl_di_bughunt"
  },
  {
    id: "stg_di_related",
    missionId: "mis_dependency_injection",
    type: "RELATED_TOPICS",
    order: 11,
    title: { en: "11. Related Knowledge Nodes", ru: "11. Связанные Узлы Знаний" },
    instructions: {
      en: "Explore graph links to interfaces, SOLID/DIP, composition, and object-creation patterns that reinforce testable wiring.",
      ru: "Исследуйте связи Графа к интерфейсам, SOLID/DIP, композиции и паттернам создания объектов для тестируемой проводки."
    }
  },
  {
    id: "stg_di_results",
    missionId: "mis_dependency_injection",
    type: "MISSION_RESULTS",
    order: 12,
    title: { en: "12. Mission Performance Summary", ru: "12. Итоги Прохождения Миссии" },
    instructions: {
      en: "Review your performance metrics, concepts strengthened, and XP awarded.",
      ru: "Просмотрите метрики прохождения, укрепившиеся концепции и заработанный XP."
    }
  },
  {
    id: "stg_di_reflection",
    missionId: "mis_dependency_injection",
    type: "REFLECTION",
    order: 13,
    title: { en: "13. Engineering Reflection", ru: "13. Инженерная Рефлексия" },
    instructions: {
      en: "Write a 1-sentence reflection on which DI rule you will enforce on the next settlement-service code review.",
      ru: "Напишите 1 предложение о том, какое правило DI вы введёте на следующем код-ревью settlement-сервиса."
    }
  }
];

export const DEPENDENCY_INJECTION_MISSION: Mission = {
  id: "mis_dependency_injection",
  primaryTopicId: "top_oop_24",
  secondaryTopicIds: ["top_oop_09", "top_oop_23", "top_oop_18"],
  slug: "field-injection-settlement-orchestrator",
  title: {
    en: "Null in Unit Tests: Field Injection Disaster in SettlementOrchestrator",
    ru: "Null в Юнит-Тестах: Катастрофа Field Injection в SettlementOrchestrator"
  },
  description: {
    en: "Diagnose why SettlementOrchestrator unit tests NPE on field-injected FxRateGateway/LedgerGateway while Spring integration tests pass — and why hard-wired new LiveFxRateGateway() violates DIP and blocks mocking.",
    ru: "Диагностируйте, почему юнит-тесты SettlementOrchestrator падают NPE на field-injected FxRateGateway/LedgerGateway при зелёных Spring-тестах — и почему жёсткий new LiveFxRateGateway() нарушает DIP и мешает мокам."
  },
  scenarioIntroduction: {
    en: "At 09:42 UTC the payments CI gate went red: SettlementOrchestratorTest.settle_convertsAndPosts failed with NullPointerException at fxRates.getMidRate(...). Overnight Spring Boot @SpringBootTest suites still passed because the container populated @Autowired private fields. A second smell appeared in code review — settle() also did `new LiveFxRateGateway()` for a fallback path, making FX rates impossible to stub in pure unit tests and risking optional circular wiring with LiveFxRateGateway → SettlementOrchestrator.",
    ru: "В 09:42 UTC CI payments стал красным: SettlementOrchestratorTest.settle_convertsAndPosts упал с NullPointerException на fxRates.getMidRate(...). Ночные @SpringBootTest suite оставались зелёными — контейнер заполнял @Autowired private поля. На ревью всплыл второй запах — settle() делал `new LiveFxRateGateway()` на fallback-пути, из-за чего FX-курсы нельзя застабить в чистых юнит-тестах и появился риск опциональной циклической проводки LiveFxRateGateway → SettlementOrchestrator."
  },
  engineeringProblem: {
    en: "SettlementOrchestrator uses field injection (`@Autowired private FxRateGateway fxRates; @Autowired private LedgerGateway ledger;`) with no constructor. Instantiating with `new` leaves collaborators null → NPE. Dependencies are hidden from the type signature, hard to mock without Spring/ReflectionTestUtils, and optional circular dependency risk rises. Additionally, `new LiveFxRateGateway()` inside settle() hard-wires a concrete class, violating Dependency Inversion — high-level settlement policy depends on a low-level FX adapter.",
    ru: "SettlementOrchestrator использует field injection (`@Autowired private FxRateGateway fxRates; @Autowired private LedgerGateway ledger;`) без конструктора. Создание через `new` оставляет коллабораторы null → NPE. Зависимости скрыты из сигнатуры типа, их сложно мокать без Spring/ReflectionTestUtils, растёт риск опциональных циклических зависимостей. Кроме того, `new LiveFxRateGateway()` внутри settle() жёстко связывает конкретный класс, нарушая Dependency Inversion — политика settlement зависит от низкоуровневого FX-адаптера."
  },
  learningObjectives: [
    {
      en: "Explain why field @Autowired injection fails in plain unit tests and hides required collaborators",
      ru: "Объяснять, почему field @Autowired injection ломает чистые юнит-тесты и скрывает обязательные коллабораторы"
    },
    {
      en: "Refactor to constructor injection with private final FxRateGateway and LedgerGateway fields",
      ru: "Рефакторить к constructor injection с private final полями FxRateGateway и LedgerGateway"
    },
    {
      en: "Apply Dependency Inversion: depend on FxRateGateway/LedgerGateway abstractions, never new concrete adapters inside methods",
      ru: "Применять Dependency Inversion: зависеть от абстракций FxRateGateway/LedgerGateway, никогда не создавать конкретные адаптеры через new внутри методов"
    },
    {
      en: "Argue Spring-recommended constructor injection for mandatory deps, testability, and circular-dependency detection",
      ru: "Аргументировать рекомендуемый Spring constructor injection для обязательных зависимостей, тестируемости и детекции циклических зависимостей"
    }
  ],
  requiredConceptIds: ["cpt_dependency_injection", "cpt_dependency_inversion"],
  recommendedConceptIds: ["cpt_default_methods", "cpt_liskov_substitution"],
  stageIds: DEPENDENCY_INJECTION_MISSION_STAGES.map((s) => s.id),
  challengeIds: ["chl_di_fix_builder", "chl_di_bughunt", "chl_di_interview_answer"],
  estimatedMinutes: 25,
  difficulty: "SENIOR",
  xpReward: 250,
  version: "1.0.0"
};
