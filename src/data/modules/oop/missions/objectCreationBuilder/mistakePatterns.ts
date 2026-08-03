import { MistakePattern } from '../../../../../types/domain';

export const MISTAKE_PATTERNS_OBJECT_CREATION: readonly MistakePattern[] = [
  {
    id: "err_boolean_parameter_swap",
    code: "ERR_BOOLEAN_PARAMETER_SWAP",
    title: {
      en: "Swapping Adjacent Boolean Constructor Parameters",
      ru: "Перепутывание Смежных Boolean-Параметров Конструктора"
    },
    description: {
      en: "Passing boolean literals to adjacent constructor parameters (e.g., isTaxExempt, isAudited) in wrong order. Java compiles both orderings identically, silently inverting domain flag semantics.",
      ru: "Передача boolean-литералов смежным параметрам конструктора (например, isTaxExempt, isAudited) в неправильном порядке. Java компилирует оба варианта одинаково, тихо инвертируя семантику доменных флагов."
    },
    conceptIds: ["cpt_builder_pattern", "cpt_static_factory_methods"],
    exampleIncorrectReasoning: {
      en: "Adding JavaDoc comments to document boolean parameter order is sufficient to prevent swapping mistakes.",
      ru: "Добавление JavaDoc с документированием порядка boolean-параметров достаточно для предотвращения ошибок перепутывания."
    },
    correctedReasoning: {
      en: "Only named Builder fluent methods (isTaxExempt(true), isAudited(false)) or domain-specific static factories eliminate positional boolean ambiguity at compile time.",
      ru: "Только именованные fluent-методы Builder (isTaxExempt(true), isAudited(false)) или доменные статические фабрики устраняют позиционную неоднозначность boolean."
    },
    remediationMissionIds: ["mis_object_creation_builder"]
  },
  {
    id: "err_telescoping_constructor_explosion",
    code: "ERR_TELESCOPING_CONSTRUCTOR_EXPLOSION",
    title: {
      en: "Telescoping Constructor Anti-Pattern for Many Parameters",
      ru: "Антипаттерн Телескопических Конструкторов для Множества Параметров"
    },
    description: {
      en: "Creating multiple constructor overloads chaining to a master constructor when a class has 5+ parameters (especially with optional fields). Each new field requires a new overload, exponentially increasing error surface.",
      ru: "Создание множества перегрузок конструкторов, цепочкой вызывающих master-конструктор, когда у класса 5+ параметров (особенно с опциональными полями). Каждое новое поле требует новой перегрузки, экспоненциально увеличивая поверхность ошибок."
    },
    conceptIds: ["cpt_builder_pattern"],
    exampleIncorrectReasoning: {
      en: "Telescoping constructors are fine as long as we keep the parameter count under 10.",
      ru: "Телескопические конструкторы допустимы, пока количество параметров меньше 10."
    },
    correctedReasoning: {
      en: "Effective Java Item 2 recommends Builder when most parameters are optional. Builder provides fluent optional configuration without constructor overload explosion.",
      ru: "Effective Java Item 2 рекомендует Builder, когда большинство параметров опциональны. Builder дает fluent-конфигурацию без взрыва перегрузок конструктора."
    },
    remediationMissionIds: ["mis_object_creation_builder"]
  },
  {
    id: "err_static_factory_thread_safety",
    code: "ERR_STATIC_FACTORY_THREAD_SAFETY",
    title: {
      en: "Assuming Static Factory Methods Provide Thread Safety",
      ru: "Заблуждение: Статические Фабрики Обеспечивают Потокобезопасность"
    },
    description: {
      en: "Mistakenly believing that replacing constructors with static factory methods automatically makes created objects thread-safe or eliminates concurrency bugs.",
      ru: "Ошибочное предположение, что замена конструкторов статическими фабриками автоматически делает созданные объекты потокобезопасными или устраняет баги конкурентности."
    },
    conceptIds: ["cpt_static_factory_methods"],
    exampleIncorrectReasoning: {
      en: "Static factory methods are better than constructors because they make objects thread-safe.",
      ru: "Статические фабричные методы лучше конструкторов, потому что делают объекты потокобезопасными."
    },
    correctedReasoning: {
      en: "Static factories provide named intent, caching, and subtype flexibility — not automatic thread safety. Immutability (final fields, no setters) provides thread safety.",
      ru: "Статические фабрики дают именованное намерение, кэширование и гибкость подтипов — не автоматическую потокобезопасность. Неизменяемость (final поля, без сеттеров) обеспечивает потокобезопасность."
    },
    remediationMissionIds: ["mis_object_creation_builder"]
  },
  {
    id: "err_builder_without_invariant_validation",
    code: "ERR_BUILDER_WITHOUT_INVARIANT_VALIDATION",
    title: {
      en: "Builder Without build()-Time Invariant Validation",
      ru: "Builder Без Валидации Инвариантов в build()"
    },
    description: {
      en: "Implementing Builder pattern with fluent setters but omitting cross-field domain invariant checks in build(), allowing invalid object instances to be created silently.",
      ru: "Реализация Builder с fluent-сеттерами, но без проверки кросс-полевых доменных инвариантов в build(), позволяя тихо создавать нелегитимные экземпляры."
    },
    conceptIds: ["cpt_builder_pattern", "cpt_invariants"],
    exampleIncorrectReasoning: {
      en: "Builder setters should validate individual fields; cross-field rules can be checked later in a service layer.",
      ru: "Сеттеры Builder должны проверять отдельные поля; кросс-полевые правила можно проверить позже в сервисном слое."
    },
    correctedReasoning: {
      en: "build() is the single choke point for all invariant validation. Domain rules like 'tax-exempt requires audit' must fail fast with IllegalStateException before object construction.",
      ru: "build() — единая точка для всех инвариантов. Доменные правила вроде 'tax-exempt требует audit' должны fail-fast с IllegalStateException до создания объекта."
    },
    remediationMissionIds: ["mis_object_creation_builder"]
  }
];
