import { MistakePattern } from '../../../../../types/domain';

export const MISTAKE_PATTERNS_DEPENDENCY_INJECTION: readonly MistakePattern[] = [
  {
    id: "err_field_injection_ok_in_tests",
    code: "ERR_FIELD_INJECTION_OK_IN_TESTS",
    title: {
      en: "Assuming Field @Autowired Works Outside the Spring Container",
      ru: "Предположение, что Field @Autowired Работает Вне Spring-Контейнера"
    },
    description: {
      en: "Believing that annotating private FxRateGateway/LedgerGateway fields with @Autowired makes them available in any unit test. Field injection runs only when Spring (or similar) manages the bean — `new SettlementOrchestrator()` leaves collaborators null.",
      ru: "Убеждение, что аннотация @Autowired на private полях FxRateGateway/LedgerGateway делает их доступными в любом юнит-тесте. Field injection срабатывает только когда Spring (или аналог) управляет bean — `new SettlementOrchestrator()` оставляет коллабораторов null."
    },
    conceptIds: ["cpt_dependency_injection"],
    exampleIncorrectReasoning: {
      en: "The fields are @Autowired, so unit tests can just new SettlementOrchestrator() and call settle().",
      ru: "Поля помечены @Autowired, значит юнит-тесты могут просто сделать new SettlementOrchestrator() и вызвать settle()."
    },
    correctedReasoning: {
      en: "Use constructor injection with private final fields so tests pass mocks explicitly: new SettlementOrchestrator(mockFx, mockLedger). Do not rely on the container for pure unit tests.",
      ru: "Используйте constructor injection с private final полями, чтобы тесты явно передавали моки: new SettlementOrchestrator(mockFx, mockLedger). Не полагайтесь на контейнер для чистых юнит-тестов."
    },
    remediationMissionIds: ["mis_dependency_injection"]
  },
  {
    id: "err_springboottest_hides_di_smell",
    code: "ERR_SPRINGBOOTTEST_HIDES_DI_SMELL",
    title: {
      en: "Replacing Unit Tests with @SpringBootTest to Hide Field Injection",
      ru: "Замена Юнит-Тестов на @SpringBootTest, чтобы Скрыть Field Injection"
    },
    description: {
      en: "Treating green @SpringBootTest suites as proof that field injection is fine. Integration tests populate @Autowired fields and mask missing constructors, hidden deps, and unmockable hard-wires.",
      ru: "Считать зелёный @SpringBootTest доказательством, что field injection в порядке. Интеграционные тесты заполняют @Autowired поля и маскируют отсутствие конструктора, скрытые зависимости и немокаемые hard-wire."
    },
    conceptIds: ["cpt_dependency_injection"],
    exampleIncorrectReasoning: {
      en: "If @SpringBootTest is green, we do not need constructor injection or fast unit tests for SettlementOrchestrator.",
      ru: "Если @SpringBootTest зелёный, constructor injection и быстрые юнит-тесты для SettlementOrchestrator не нужны."
    },
    correctedReasoning: {
      en: "Keep integration tests for wiring, but design application services so pure unit tests can inject FxRateGateway/LedgerGateway mocks without Spring.",
      ru: "Оставляйте интеграционные тесты для проводки, но проектируйте application services так, чтобы чистые юнит-тесты внедряли моки FxRateGateway/LedgerGateway без Spring."
    },
    remediationMissionIds: ["mis_dependency_injection"]
  },
  {
    id: "err_new_concrete_in_method",
    code: "ERR_NEW_CONCRETE_IN_METHOD",
    title: {
      en: "Hard-Wiring Concrete Adapters with new Inside settle()",
      ru: "Жёсткая Связка Конкретных Адаптеров через new Внутри settle()"
    },
    description: {
      en: "Calling `new LiveFxRateGateway()` (or similar) inside high-level settlement methods. This violates Dependency Inversion: the orchestrator depends on a low-level concretion, blocks mocking, and may hit live FX HTTP in tests.",
      ru: "Вызов `new LiveFxRateGateway()` (или аналога) внутри высокоуровневых settlement-методов. Нарушает Dependency Inversion: оркестратор зависит от низкоуровневой конкреции, блокирует моки и может бить в live FX HTTP в тестах."
    },
    conceptIds: ["cpt_dependency_inversion"],
    exampleIncorrectReasoning: {
      en: "If fxRates is null, just new LiveFxRateGateway() as a fallback — tests and prod both work.",
      ru: "Если fxRates null, просто сделаем new LiveFxRateGateway() как fallback — и тесты, и прод работают."
    },
    correctedReasoning: {
      en: "Always depend on the FxRateGateway port supplied by the composition root. Never construct infrastructure adapters inside settle().",
      ru: "Всегда зависеть от порта FxRateGateway, который поставляет composition root. Никогда не создавать инфраструктурные адаптеры внутри settle()."
    },
    remediationMissionIds: ["mis_dependency_injection"]
  },
  {
    id: "err_di_equals_dip",
    code: "ERR_DI_EQUALS_DIP",
    title: {
      en: "Conflating Dependency Injection with Dependency Inversion",
      ru: "Смешение Dependency Injection и Dependency Inversion"
    },
    description: {
      en: "Treating DI and DIP as the same concept. DI is a wiring technique; DIP is the principle of depending on abstractions. You can inject LiveFxRateGateway by concrete type and still violate DIP.",
      ru: "Считать DI и DIP одним понятием. DI — техника проводки; DIP — принцип зависимости от абстракций. Можно внедрять LiveFxRateGateway по конкретному типу и всё равно нарушать DIP."
    },
    conceptIds: ["cpt_dependency_injection", "cpt_dependency_inversion"],
    exampleIncorrectReasoning: {
      en: "We use Spring DI, so we automatically follow Dependency Inversion.",
      ru: "Мы используем Spring DI, значит автоматически следуем Dependency Inversion."
    },
    correctedReasoning: {
      en: "Inject abstractions (FxRateGateway, LedgerGateway). Keep LiveFxRateGateway behind the port at the composition root.",
      ru: "Внедряйте абстракции (FxRateGateway, LedgerGateway). Держите LiveFxRateGateway за портом на composition root."
    },
    remediationMissionIds: ["mis_dependency_injection"]
  },
  {
    id: "err_service_locator_instead_of_di",
    code: "ERR_SERVICE_LOCATOR_INSTEAD_OF_DI",
    title: {
      en: "Replacing Field Injection with Service Locator Lookups",
      ru: "Замена Field Injection на Lookup через Service Locator"
    },
    description: {
      en: "Calling ApplicationContext.getBean(LiveFxRateGateway.class) (or similar) inside settle() to 'fix' null fields. This still hides dependencies, couples orchestration to the container, and harms unit testing.",
      ru: "Вызов ApplicationContext.getBean(LiveFxRateGateway.class) (или аналога) внутри settle(), чтобы 'починить' null-поля. Зависимости по-прежнему скрыты, оркестрация привязана к контейнеру, юнит-тесты страдают."
    },
    conceptIds: ["cpt_dependency_injection"],
    exampleIncorrectReasoning: {
      en: "Looking up LiveFxRateGateway from the ApplicationContext inside settle() is cleaner than constructor parameters.",
      ru: "Lookup LiveFxRateGateway из ApplicationContext внутри settle() чище, чем параметры конструктора."
    },
    correctedReasoning: {
      en: "Prefer explicit constructor DI. Avoid Service Locator pulls inside application services; push collaborators in at construction time.",
      ru: "Предпочитайте явный constructor DI. Избегайте Service Locator pull внутри application services; вталкивайте коллабораторов при создании."
    },
    remediationMissionIds: ["mis_dependency_injection"]
  },
  {
    id: "err_interface_always_null",
    code: "ERR_INTERFACE_ALWAYS_NULL",
    title: {
      en: "Blaming Interface Types for Null Field-Injected Collaborators",
      ru: "Обвинение Типов-Интерфейсов в Null Field-Injected Коллабораторах"
    },
    description: {
      en: "Claiming FxRateGateway is null because it is an interface. Interfaces are injectable when a concrete bean is registered; null comes from missing container wiring under plain `new`.",
      ru: "Утверждение, что FxRateGateway null, потому что это интерфейс. Интерфейсы внедряемы при зарегистрированном конкретном bean; null возникает из-за отсутствия проводки контейнера при обычном `new`."
    },
    conceptIds: ["cpt_dependency_injection"],
    exampleIncorrectReasoning: {
      en: "FxRateGateway is an interface so the field must always be null until we new LiveFxRateGateway ourselves.",
      ru: "FxRateGateway — интерфейс, поэтому поле всегда null, пока мы сами не сделаем new LiveFxRateGateway."
    },
    correctedReasoning: {
      en: "Inject the FxRateGateway port via constructor; the composition root provides LiveFxRateGateway. Null is a wiring problem, not an interface limitation.",
      ru: "Внедряйте порт FxRateGateway через конструктор; composition root предоставляет LiveFxRateGateway. Null — проблема проводки, не ограничение интерфейса."
    },
    remediationMissionIds: ["mis_dependency_injection"]
  },
  {
    id: "err_reflection_utils_ok",
    code: "ERR_REFLECTION_UTILS_OK",
    title: {
      en: "Using ReflectionTestUtils as a Permanent Field-Injection Fix",
      ru: "Использование ReflectionTestUtils как Постоянного Фикса Field Injection"
    },
    description: {
      en: "Setting private @Autowired fields via ReflectionTestUtils in every test instead of refactoring to constructor injection. Tests become brittle and production API still hides mandatory collaborators.",
      ru: "Выставление private @Autowired полей через ReflectionTestUtils в каждом тесте вместо рефакторинга к constructor injection. Тесты хрупкие, продакшн API по-прежнему скрывает обязательных коллабораторов."
    },
    conceptIds: ["cpt_dependency_injection"],
    exampleIncorrectReasoning: {
      en: "ReflectionTestUtils.setField(orchestrator, \"fxRates\", mockFx) is fine — no need to change production constructors.",
      ru: "ReflectionTestUtils.setField(orchestrator, \"fxRates\", mockFx) нормально — менять продакшн-конструкторы не нужно."
    },
    correctedReasoning: {
      en: "Refactor to constructor injection. Tests should compile against the real mandatory API: SettlementOrchestrator(FxRateGateway, LedgerGateway).",
      ru: "Рефакторинг к constructor injection. Тесты должны компилироваться против реального обязательного API: SettlementOrchestrator(FxRateGateway, LedgerGateway)."
    },
    remediationMissionIds: ["mis_dependency_injection"]
  }
];
