import { Concept, Tag } from '../../../types/domain';

export const OOP_CONCEPTS: readonly Concept[] = [
  {
    id: "cpt_encapsulation",
    slug: "encapsulation",
    title: {
      en: "State Invariant Encapsulation",
      ru: "Инкапсуляция Инвариантов Состояния"
    },
    summary: {
      en: "Encapsulation is the protection of class state invariants through controlled access boundaries and validation.",
      ru: "Инкапсуляция — это защита инвариантов состояния класса через контролируемые границы доступа и валидацию."
    },
    topicIds: ["top_oop_05"],
    canonicalTag: "#encapsulation",
    prerequisiteConceptIds: []
  },
  {
    id: "cpt_invariants",
    slug: "domain-invariants",
    title: {
      en: "Domain Invariants & Guard Contracts",
      ru: "Доменные Инварианты и Контракты Валидации"
    },
    summary: {
      en: "Rules that must evaluate to true throughout the lifetime of a valid object instance.",
      ru: "Правила, которые должны оставаться истинными на протяжении всего жизненного цикла легитимного объекта."
    },
    topicIds: ["top_oop_05", "top_oop_34"],
    canonicalTag: "#invariants",
    prerequisiteConceptIds: ["cpt_encapsulation"]
  },
  {
    id: "cpt_access_modifiers",
    slug: "access-modifiers",
    title: {
      en: "Access Modifier Visibility Boundaries",
      ru: "Границы Видимости Модификаторов Доступа"
    },
    summary: {
      en: "Restricting member access to private, package-private, protected, or public levels.",
      ru: "Ограничение доступа к членам класса уровнями private, package-private, protected или public."
    },
    topicIds: ["top_oop_05", "top_oop_06"],
    canonicalTag: "#access-modifiers",
    prerequisiteConceptIds: []
  },
  {
    id: "cpt_defensive_copying",
    slug: "defensive-copying",
    title: {
      en: "Defensive Copying of References",
      ru: "Защитное Копирование Ссылок"
    },
    summary: {
      en: "Creating copies of mutable objects passed in or returned from constructors and getters.",
      ru: "Создание копий мутабельных объектов, передаваемых в конструктор или возвращаемых из геттеров."
    },
    topicIds: ["top_oop_05", "top_oop_22"],
    canonicalTag: "#defensive-copying",
    prerequisiteConceptIds: ["cpt_encapsulation"]
  },
  {
    id: "cpt_monetary_representation",
    slug: "monetary-representation",
    title: {
      en: "Monetary Value Representation in Banking",
      ru: "Представление Денежных Величин в Банковских Системах"
    },
    summary: {
      en: "Avoiding floating-point rounding errors by using longs (cents) or BigDecimal for financial transactions.",
      ru: "Избежание ошибок округления с плавающей точкой путем использования long (в центах) или BigDecimal."
    },
    topicIds: ["top_oop_05", "top_oop_33"],
    canonicalTag: "#money",
    prerequisiteConceptIds: ["cpt_invariants"]
  },
  {
    id: "cpt_equals_contract",
    slug: "equals-contract",
    title: {
      en: "Object.equals() Equivalence Contract",
      ru: "Контракт Эквивалентности Object.equals()"
    },
    summary: {
      en: "Reflexive, symmetric, transitive, consistent, and non-null mathematical equivalence rules.",
      ru: "Рефлексивное, симметричное, транзитивное, согласованное и ненулевое правила математической эквивалентности."
    },
    topicIds: ["top_oop_20", "top_oop_19"],
    canonicalTag: "#equals",
    prerequisiteConceptIds: []
  },
  {
    id: "cpt_hashcode_contract",
    slug: "hashcode-contract",
    title: {
      en: "Object.hashCode() Bucket Distribution Contract",
      ru: "Контракт Распределения Бакетов Object.hashCode()"
    },
    summary: {
      en: "Guaranteeing identical integer hash codes for equal objects and determining HashMap bucket array indices.",
      ru: "Гарантирование одинаковых хэш-кодов для равных объектов и определение индексов бакетов HashMap."
    },
    topicIds: ["top_oop_20", "top_oop_19"],
    canonicalTag: "#hashcode",
    prerequisiteConceptIds: ["cpt_equals_contract"]
  },
  {
    id: "cpt_mutable_key_disaster",
    slug: "mutable-key-disaster",
    title: {
      en: "Mutable HashMap Key Hash Code Decay",
      ru: "Изменение Хэш-Кода Мутабельного Ключа HashMap"
    },
    summary: {
      en: "Mutating key fields after insertion causes get(key) bucket index mismatch and silent heap memory leaks.",
      ru: "Изменение полей ключа после вставки ведет к несовпадению бакетов при get(key) и тихим утечкам памяти."
    },
    topicIds: ["top_oop_20", "top_oop_22"],
    canonicalTag: "#mutable-key",
    prerequisiteConceptIds: ["cpt_hashcode_contract"]
  },
  {
    id: "cpt_immutability",
    slug: "immutability",
    title: {
      en: "Thread-Safe Immutability Design",
      ru: "Проектирование Потокобезопасной Неизменяемости"
    },
    summary: {
      en: "Designing classes whose state cannot change after construction, enabling lock-free concurrent access.",
      ru: "Проектирование классов, состояние которых не может измениться после создания, обеспечивая lock-free доступ."
    },
    topicIds: ["top_oop_22"],
    canonicalTag: "#immutability",
    prerequisiteConceptIds: ["cpt_defensive_copying"]
  },
  {
    id: "cpt_composition_over_inheritance",
    slug: "composition-over-inheritance",
    title: {
      en: "Composition over Inheritance & Forwarding",
      ru: "Композиция вместо Наследования и Перенаправление"
    },
    summary: {
      en: "Extending behavior via wrapper/forwarding classes instead of subclassing concrete implementations.",
      ru: "Расширение поведения через классы-обертки вместо наследования конкретных реализаций."
    },
    topicIds: ["top_oop_16"],
    canonicalTag: "#composition",
    prerequisiteConceptIds: []
  },
  {
    id: "cpt_fragile_base_class",
    slug: "fragile-base-class",
    title: {
      en: "Fragile Base Class Problem",
      ru: "Проблема Хрупкого Базового Класса"
    },
    summary: {
      en: "Subclass breakage when base class internal implementation changes without compiler warnings.",
      ru: "Поломка подклассов при изменении внутренней реализации базового класса без предупреждений компилятора."
    },
    topicIds: ["top_oop_16", "top_oop_10"],
    canonicalTag: "#fragile-base-class",
    prerequisiteConceptIds: ["cpt_composition_over_inheritance"]
  },
  {
    id: "cpt_liskov_substitution",
    slug: "liskov-substitution",
    title: {
      en: "Liskov Substitution Principle (LSP)",
      ru: "Принцип Подстановки Лисков (LSP)"
    },
    summary: {
      en: "Subtypes must be substitutable for their base types without altering program correctness.",
      ru: "Подтипы должны быть взаимозаменяемы с базовыми типами без нарушения корректности программы."
    },
    topicIds: ["top_oop_23", "top_oop_11"],
    canonicalTag: "#lsp",
    prerequisiteConceptIds: []
  },
  {
    id: "cpt_behavioral_subtyping",
    slug: "behavioral-subtyping",
    title: {
      en: "Behavioral Subtyping & Contract Rules",
      ru: "Поведенческое Подтипирование и Правила Контрактов"
    },
    summary: {
      en: "Subtype methods must not strengthen preconditions, weaken postconditions, or throw unexpected exceptions.",
      ru: "Методы подтипа не должны усиливать предусловия, ослаблять постусловия или бросать неожиданные исключения."
    },
    topicIds: ["top_oop_23"],
    canonicalTag: "#behavioral-subtyping",
    prerequisiteConceptIds: ["cpt_liskov_substitution"]
  },
  {
    id: "cpt_static_factory_methods",
    slug: "static-factory-methods",
    title: {
      en: "Static Factory Methods vs Constructors",
      ru: "Статические Фабричные Методы vs Конструкторы"
    },
    summary: {
      en: "Named factory methods (of, valueOf, getInstance) providing readable APIs, caching, and subtype flexibility.",
      ru: "Именованные фабричные методы (of, valueOf, getInstance) для читаемых API, кэширования и гибкости подтипов."
    },
    topicIds: ["top_oop_25"],
    canonicalTag: "#static-factories",
    prerequisiteConceptIds: []
  },
  {
    id: "cpt_builder_pattern",
    slug: "builder-pattern",
    title: {
      en: "Builder Pattern for Complex Domain Objects",
      ru: "Паттерн Builder для Сложных Доменных Объектов"
    },
    summary: {
      en: "Fluent step-by-step construction of immutable entities with mandatory parameter enforcement.",
      ru: "Пошаговое fluent-построение неизменяемых сущностей с обязательными параметрами."
    },
    topicIds: ["top_oop_25", "top_oop_28"],
    canonicalTag: "#builder-pattern",
    prerequisiteConceptIds: ["cpt_immutability"]
  },
  {
    id: "cpt_factory_pattern",
    slug: "factory-pattern",
    title: {
      en: "Factory Method & Simple Factory",
      ru: "Factory Method и Simple Factory"
    },
    summary: {
      en: "Centralizing object creation behind a factory so clients receive product interfaces (e.g., ComplianceReport) instead of constructing concrete classes with scattered new.",
      ru: "Централизация создания объектов за factory, чтобы клиенты получали product-интерфейсы (например, ComplianceReport) вместо разбросанных new конкретных классов."
    },
    topicIds: ["top_oop_27", "top_oop_25"],
    canonicalTag: "#factory-pattern",
    prerequisiteConceptIds: ["cpt_static_factory_methods"]
  },
  {
    id: "cpt_creational_decoupling",
    slug: "creational-decoupling",
    title: {
      en: "Creational Decoupling from Concrete Classes",
      ru: "Creational Decoupling от Конкретных Классов"
    },
    summary: {
      en: "Separating the decision of which concrete class to instantiate from client usage logic, so exporters depend on abstractions and format evolution stays localized.",
      ru: "Отделение решения о том, какой конкретный класс инстанцировать, от логики использования клиентом — экспортёры зависят от абстракций, эволюция форматов локализована."
    },
    topicIds: ["top_oop_27", "top_oop_24"],
    canonicalTag: "#creational-decoupling",
    prerequisiteConceptIds: ["cpt_factory_pattern"]
  },
  {
    id: "cpt_default_methods",
    slug: "default-methods",
    title: {
      en: "Interface Default Method Resolution",
      ru: "Разрешение Default-Методов Интерфейсов"
    },
    summary: {
      en: "Java 8+ default method inheritance rules, diamond conflicts, and explicit override resolution.",
      ru: "Правила наследования default-методов Java 8+, конфликты ромба и явное разрешение."
    },
    topicIds: ["top_oop_09"],
    canonicalTag: "#default-methods",
    prerequisiteConceptIds: []
  },
  {
    id: "cpt_interface_contracts",
    slug: "interface-contracts",
    title: {
      en: "Interface Contract Design & API Evolution",
      ru: "Проектирование Контрактов Интерфейсов и Эволюция API"
    },
    summary: {
      en: "Designing stable interface contracts that evolve via default methods without breaking implementors.",
      ru: "Проектирование стабильных контрактов интерфейсов с эволюцией через default-методы без поломки реализаций."
    },
    topicIds: ["top_oop_09"],
    canonicalTag: "#interfaces",
    prerequisiteConceptIds: ["cpt_default_methods"]
  },
  {
    id: "cpt_method_overriding",
    slug: "method-overriding",
    title: {
      en: "Method Overriding & @Override Validation",
      ru: "Переопределение Методов и Валидация @Override"
    },
    summary: {
      en: "JLS 8.4.8 override-equivalent signatures, @Override compile-time checks, visibility rules, and checked-exception narrowing versus silent overloads.",
      ru: "Override-equivalent сигнатуры JLS 8.4.8, compile-time проверки @Override, правила видимости и сужение checked-исключений против тихих перегрузок."
    },
    topicIds: ["top_oop_15", "top_oop_10", "top_oop_14"],
    canonicalTag: "#overriding",
    prerequisiteConceptIds: []
  },
  {
    id: "cpt_covariant_returns",
    slug: "covariant-returns",
    title: {
      en: "Covariant Return Types",
      ru: "Ковариантные Возвращаемые Типы"
    },
    summary: {
      en: "Allowing an override to return a subtype of the overridden method's return type while preserving polymorphic substitutability.",
      ru: "Разрешение override возвращать подтип возвращаемого типа переопределяемого метода с сохранением полиморфной подставляемости."
    },
    topicIds: ["top_oop_15", "top_oop_11"],
    canonicalTag: "#covariant-returns",
    prerequisiteConceptIds: ["cpt_method_overriding"]
  },
  {
    id: "cpt_method_overloading",
    slug: "method-overloading",
    title: {
      en: "Method Overloading & Ambiguous APIs",
      ru: "Перегрузка Методов и Неоднозначные API"
    },
    summary: {
      en: "Multiple methods sharing a name with different parameter lists — dangerous when overloads mix related types or conflicting domain semantics.",
      ru: "Несколько методов с одним именем и разными списками параметров — опасно, когда перегрузки смешивают связанные типы или конфликтующую доменную семантику."
    },
    topicIds: ["top_oop_14"],
    canonicalTag: "#overloading",
    prerequisiteConceptIds: []
  },
  {
    id: "cpt_compile_time_resolution",
    slug: "compile-time-resolution",
    title: {
      en: "Compile-Time Overload Resolution",
      ru: "Compile-Time Разрешение Перегрузок"
    },
    summary: {
      en: "JLS selects overloads using static argument types, applicability phases, boxing/unboxing, and the most-specific rule — distinct from runtime overriding.",
      ru: "JLS выбирает перегрузки по статическим типам аргументов, фазам применимости, boxing/unboxing и правилу most-specific — в отличие от runtime-переопределения."
    },
    topicIds: ["top_oop_14", "top_oop_15"],
    canonicalTag: "#compile-time",
    prerequisiteConceptIds: ["cpt_method_overloading"]
  },
  {
    id: "cpt_dynamic_dispatch",
    slug: "dynamic-dispatch",
    title: {
      en: "Dynamic Dispatch & Call-Site Polymorphism",
      ru: "Динамическая Диспетчеризация и Полиморфизм Call Site"
    },
    summary: {
      en: "Runtime selection of instance method overrides via receiver type, including monomorphic/bimorphic/megamorphic HotSpot call sites.",
      ru: "Runtime-выбор instance overrides по типу получателя, включая monomorphic/bimorphic/megamorphic call sites HotSpot."
    },
    topicIds: ["top_oop_12", "top_oop_11"],
    canonicalTag: "#dynamic-dispatch",
    prerequisiteConceptIds: []
  },
  {
    id: "cpt_invokevirtual",
    slug: "invokevirtual-bytecode",
    title: {
      en: "JVMS Invoke Instructions (invokevirtual / invokeinterface / invokestatic)",
      ru: "Invoke-Инструкции JVMS (invokevirtual / invokeinterface / invokestatic)"
    },
    summary: {
      en: "Bytecode-level method invocation: virtual/interface dispatch vs static binding and special non-virtual calls.",
      ru: "Вызов методов на уровне байткода: virtual/interface dispatch vs static binding и специальные невиртуальные вызовы."
    },
    topicIds: ["top_oop_12"],
    canonicalTag: "#invokevirtual",
    prerequisiteConceptIds: ["cpt_dynamic_dispatch"]
  },
  {
    id: "cpt_dependency_injection",
    slug: "dependency-injection",
    title: {
      en: "Dependency Injection & Constructor Wiring",
      ru: "Внедрение Зависимостей и Constructor Wiring"
    },
    summary: {
      en: "Pushing collaborators via constructors (preferred) vs field @Autowired — explicit mandatory deps, testability, fail-fast wiring.",
      ru: "Вталкивание коллабораторов через конструкторы (предпочтительно) vs field @Autowired — явные обязательные зависимости, тестируемость, fail-fast проводка."
    },
    topicIds: ["top_oop_24"],
    canonicalTag: "#dependency-injection",
    prerequisiteConceptIds: []
  },
  {
    id: "cpt_dependency_inversion",
    slug: "dependency-inversion",
    title: {
      en: "Dependency Inversion Principle (DIP)",
      ru: "Принцип Инверсии Зависимостей (DIP)"
    },
    summary: {
      en: "High-level modules depend on abstractions (ports), not low-level concretions — composition root wires adapters.",
      ru: "Высокоуровневые модули зависят от абстракций (портов), не от низкоуровневых конкреций — composition root вставляет адаптеры."
    },
    topicIds: ["top_oop_24", "top_oop_23"],
    canonicalTag: "#dip",
    prerequisiteConceptIds: ["cpt_dependency_injection"]
  },
  {
    id: "cpt_strategy_pattern",
    slug: "strategy-pattern",
    title: {
      en: "Strategy Pattern — Encapsulated Algorithms",
      ru: "Паттерн Strategy — Инкапсулированные Алгоритмы"
    },
    summary: {
      en: "Encapsulating interchangeable algorithms behind a common interface so clients select behavior at runtime without switch/if explosions.",
      ru: "Инкапсуляция взаимозаменяемых алгоритмов за общим интерфейсом, чтобы клиенты выбирали поведение во время выполнения без взрыва switch/if."
    },
    topicIds: ["top_oop_26", "top_oop_11"],
    canonicalTag: "#strategy-pattern",
    prerequisiteConceptIds: []
  },
  {
    id: "cpt_open_closed",
    slug: "open-closed-principle",
    title: {
      en: "Open-Closed Principle (OCP)",
      ru: "Принцип Открытости/Закрытости (OCP)"
    },
    summary: {
      en: "Software entities should be open for extension but closed for modification — add new behavior without editing existing calculator/switch code.",
      ru: "Программные сущности должны быть открыты для расширения и закрыты для модификации — добавлять поведение без правки существующего switch/калькулятора."
    },
    topicIds: ["top_oop_23", "top_oop_26"],
    canonicalTag: "#ocp",
    prerequisiteConceptIds: ["cpt_strategy_pattern"]
  },
  {
    id: "cpt_abstraction",
    slug: "abstraction",
    title: {
      en: "Interface Abstraction Boundaries",
      ru: "Границы Абстракции через Интерфейсы"
    },
    summary: {
      en: "Hiding implementation complexity behind a stable interface contract so clients depend on behavior, not on vendor SDK types or concrete adapters.",
      ru: "Сокрытие сложности реализации за стабильным контрактом интерфейса, чтобы клиенты зависели от поведения, а не от типов SDK вендора или конкретных адаптеров."
    },
    topicIds: ["top_oop_07", "top_oop_09"],
    canonicalTag: "#abstraction",
    prerequisiteConceptIds: ["cpt_interface_contracts"]
  },
  {
    id: "cpt_leaky_abstraction",
    slug: "leaky-abstraction",
    title: {
      en: "Leaky Abstraction",
      ru: "Дырявая Абстракция"
    },
    summary: {
      en: "When an abstraction claims to hide details but vendor-specific types, exceptions, or APIs still leak into clients — forcing rewrites when implementations change.",
      ru: "Когда абстракция обещает скрыть детали, но vendor-specific типы, исключения или API всё равно протекают в клиенты — вынуждая переписывать код при смене реализации."
    },
    topicIds: ["top_oop_07", "top_oop_09", "top_oop_24"],
    canonicalTag: "#leaky-abstraction",
    prerequisiteConceptIds: ["cpt_abstraction"]
  },
  {
    id: "cpt_anemic_domain_model",
    slug: "anemic-domain-model",
    title: {
      en: "Anemic Domain Model Anti-Pattern",
      ru: "Антипаттерн Анемичной Доменной Модели"
    },
    summary: {
      en: "Domain objects reduced to getters/setters with all business logic pushed into procedural services — Fowler's anti-pattern that destroys encapsulation and duplicates validation.",
      ru: "Доменные объекты сведены к getters/setters, вся бизнес-логика вынесена в процедурные сервисы — антипаттерн Fowler, разрушающий инкапсуляцию и дублирующий валидацию."
    },
    topicIds: ["top_oop_32", "top_oop_33"],
    canonicalTag: "#anemic-model",
    prerequisiteConceptIds: ["cpt_encapsulation"]
  },
  {
    id: "cpt_god_class",
    slug: "god-class",
    title: {
      en: "God Class Anti-Pattern",
      ru: "Антипаттерн God Class (Божественный Класс)"
    },
    summary: {
      en: "A single class that knows and does too much — low cohesion, high coupling, untestable orchestration of unrelated responsibilities.",
      ru: "Один класс, который знает и делает слишком много — низкая cohesion, высокая coupling, нетестируемая оркестрация несвязанных обязанностей."
    },
    topicIds: ["top_oop_32", "top_oop_18"],
    canonicalTag: "#god-class",
    prerequisiteConceptIds: []
  },
  {
    id: "cpt_feature_envy",
    slug: "feature-envy",
    title: {
      en: "Feature Envy / Tell Don't Ask",
      ru: "Feature Envy / Tell Don't Ask"
    },
    summary: {
      en: "A method that uses another object's data more than its own — fix by telling the object to perform the behavior instead of asking for its guts.",
      ru: "Метод, использующий данные другого объекта больше своих — исправляется командой объекту выполнить поведение вместо запроса его внутренностей."
    },
    topicIds: ["top_oop_32", "top_oop_18"],
    canonicalTag: "#feature-envy",
    prerequisiteConceptIds: ["cpt_anemic_domain_model"]
  },
  {
    id: "cpt_abstract_class",
    slug: "abstract-class",
    title: {
      en: "Abstract Classes & Partial Implementation",
      ru: "Абстрактные Классы и Частичная Реализация"
    },
    summary: {
      en: "Incomplete classes that hold shared state, constructors, and concrete/protected methods while forcing subclasses to implement abstract hooks — preferred over interfaces when inheritance of state and a controlled extension contract are required.",
      ru: "Неполные классы с общим состоянием, конструкторами и concrete/protected методами, заставляющие подклассы реализовать abstract hooks — предпочтительнее интерфейсов, когда нужны наследуемое состояние и контролируемый контракт расширения."
    },
    topicIds: ["top_oop_08", "top_oop_07", "top_oop_10"],
    canonicalTag: "#abstract-class",
    prerequisiteConceptIds: ["cpt_access_modifiers"]
  },
  {
    id: "cpt_template_hooks",
    slug: "template-hooks",
    title: {
      en: "Protected Template Hooks & Final Skeleton",
      ru: "Protected Template Hooks и Final-Скелет"
    },
    summary: {
      en: "Making the algorithm skeleton final so subclasses customize only documented protected/abstract step hooks — never by overriding the public entry point and skipping mandatory steps.",
      ru: "Скелет алгоритма делают final, а подклассы кастомизируют только документированные protected/abstract хуки шагов — никогда не переопределяя публичную точку входа и не пропуская обязательные шаги."
    },
    topicIds: ["top_oop_08", "top_oop_29"],
    canonicalTag: "#template-hooks",
    prerequisiteConceptIds: ["cpt_abstract_class"]
  },
  {
    id: "cpt_inheritance",
    slug: "inheritance",
    title: {
      en: "Class Inheritance & IS-A Hierarchies",
      ru: "Наследование Классов и Иерархии IS-A"
    },
    summary: {
      en: "Creating subtypes via extends so subclasses inherit state and behavior, forming an IS-A relationship with constructor chaining and protected coupling risks.",
      ru: "Создание подтипов через extends, когда подклассы наследуют состояние и поведение, образуя отношение IS-A с цепочкой конструкторов и рисками protected-связности."
    },
    topicIds: ["top_oop_10", "top_oop_08"],
    canonicalTag: "#inheritance",
    prerequisiteConceptIds: []
  },
  {
    id: "cpt_inherited_state",
    slug: "inherited-state",
    title: {
      en: "Inherited State & Protected Member Coupling",
      ru: "Унаследованное Состояние и Связность Protected-Членов"
    },
    summary: {
      en: "Subclass dependence on superclass fields and protected methods whose initialization order and semantics can change silently across releases.",
      ru: "Зависимость подкласса от полей суперкласса и protected-методов, чей порядок инициализации и семантика могут тихо меняться между релизами."
    },
    topicIds: ["top_oop_10", "top_oop_06"],
    canonicalTag: "#inherited-state",
    prerequisiteConceptIds: ["cpt_inheritance"]
  },
  {
    id: "cpt_polymorphism",
    slug: "polymorphism",
    title: {
      en: "Subtype Polymorphism & Substitutable Behavior",
      ru: "Полиморфизм Подтипов и Подставляемое Поведение"
    },
    summary: {
      en: "Clients depend on a common Transaction (or handler) contract; concrete subtypes supply type-specific process() behavior via substitutable overrides — without the caller inspecting runtime type.",
      ru: "Клиенты зависят от общего контракта Transaction (или handler); конкретные подтипы дают type-specific process() через подставляемые overrides — без проверки runtime-типа вызывающим кодом."
    },
    topicIds: ["top_oop_11", "top_oop_10"],
    canonicalTag: "#polymorphism",
    prerequisiteConceptIds: []
  },
  {
    id: "cpt_type_switch_smell",
    slug: "type-switch-smell",
    title: {
      en: "Type Switch / instanceof Chain Smell",
      ru: "Smell: Type Switch / Цепочка instanceof"
    },
    summary: {
      en: "Growing instanceof / switch-on-type chains in a pipeline that must be edited for every new subtype — a design smell replaced by polymorphic process(), visitor accept(handler), or a closed handler registry.",
      ru: "Растущие цепочки instanceof / switch-по-типу в pipeline, которые правят при каждом новом подтипе — design smell, заменяемый полиморфным process(), visitor accept(handler) или закрытым handler registry."
    },
    topicIds: ["top_oop_11", "top_oop_26"],
    canonicalTag: "#type-switch-smell",
    prerequisiteConceptIds: ["cpt_polymorphism"]
  },
  {
    id: "cpt_coupling",
    slug: "coupling",
    title: {
      en: "Coupling & Change Amplification",
      ru: "Coupling и Усиление Изменений"
    },
    summary: {
      en: "Degree of interdependence between modules — measured by how a change in one forces edits, recompilation, and retests of others. Prefer low coupling via narrow interfaces so alert-channel swaps do not drag DB or PDF paths into the blast radius.",
      ru: "Степень взаимозависимости модулей — измеряется тем, насколько изменение одного вынуждает правки, перекомпиляцию и ретест других. Предпочитайте низкий coupling через узкие интерфейсы, чтобы смена канала алертов не тащила в blast radius пути DB и PDF."
    },
    topicIds: ["top_oop_18", "top_oop_23"],
    canonicalTag: "#coupling",
    prerequisiteConceptIds: ["cpt_interface_contracts"]
  },
  {
    id: "cpt_cohesion",
    slug: "cohesion",
    title: {
      en: "Cohesion & Single Reason to Change",
      ru: "Cohesion и Единая Причина для Изменения"
    },
    summary: {
      en: "How closely a module's responsibilities belong together. High functional cohesion means one focused job (validate, persist, report, alert); low cohesion packs unrelated concerns into one class and amplifies every local change.",
      ru: "Насколько обязанности модуля принадлежат друг другу. Высокая функциональная cohesion — одна сфокусированная задача (validate, persist, report, alert); низкая cohesion смешивает несвязанные concerns в одном классе и усиливает каждое локальное изменение."
    },
    topicIds: ["top_oop_18", "top_oop_05"],
    canonicalTag: "#cohesion",
    prerequisiteConceptIds: []
  },
  {
    id: "cpt_domain_modeling",
    slug: "domain-modeling",
    title: {
      en: "Make Illegal States Unrepresentable",
      ru: "Делать Нелегальные Состояния Непредставимыми"
    },
    summary: {
      en: "Model domain entities so type system and behavior methods reject impossible combinations (e.g. approved=true with REJECTED) — value objects, enums/sealed status, and aggregate-boundary transitions instead of free-form primitives.",
      ru: "Моделировать доменные сущности так, чтобы система типов и методы поведения отвергали невозможные комбинации (например approved=true при REJECTED) — value objects, enums/sealed status и переходы на границе агрегата вместо свободных примитивов."
    },
    topicIds: ["top_oop_33", "top_oop_05", "top_oop_32"],
    canonicalTag: "#domain-modeling",
    prerequisiteConceptIds: ["cpt_invariants", "cpt_encapsulation"]
  },
  {
    id: "cpt_value_objects",
    slug: "value-objects",
    title: {
      en: "Value Objects & Primitive Obsession",
      ru: "Value Objects и Primitive Obsession"
    },
    summary: {
      en: "Replace String/double/boolean bags with immutable, self-validating value objects (ApplicantId, LoanMoney) defined by attributes and equality — curing Primitive Obsession that lets illegal domain states compile.",
      ru: "Заменять мешки String/double/boolean неизменяемыми самовалидирующими value objects (ApplicantId, LoanMoney), определяемыми атрибутами и равенством — лечение Primitive Obsession, при котором нелегальные доменные состояния компилируются."
    },
    topicIds: ["top_oop_33", "top_oop_22", "top_oop_05"],
    canonicalTag: "#value-objects",
    prerequisiteConceptIds: ["cpt_domain_modeling", "cpt_immutability"]
  },
  {
    id: "cpt_upcasting",
    slug: "upcasting",
    title: {
      en: "Upcasting to Supertype References",
      ru: "Upcasting к Ссылкам Супертипа"
    },
    summary: {
      en: "Widening a subtype reference to a supertype (CardFraudEvent → FraudEvent) — always compile-time safe because every subtype IS-A the supertype, with no runtime cast check required.",
      ru: "Расширение ссылки подтипа до супертипа (CardFraudEvent → FraudEvent) — всегда безопасно на этапе компиляции, потому что каждый подтип IS-A супертип, без runtime-проверки cast."
    },
    topicIds: ["top_oop_13", "top_oop_11"],
    canonicalTag: "#upcasting",
    prerequisiteConceptIds: ["cpt_inheritance"]
  },
  {
    id: "cpt_downcasting",
    slug: "downcasting",
    title: {
      en: "Downcasting & ClassCastException Safety",
      ru: "Downcasting и Безопасность ClassCastException"
    },
    summary: {
      en: "Narrowing a supertype reference back to a subtype (FraudEvent → CardFraudEvent) with a runtime check — blind casts throw ClassCastException; prefer pattern matching instanceof or polymorphic methods that eliminate casts.",
      ru: "Сужение ссылки супертипа обратно к подтипу (FraudEvent → CardFraudEvent) с runtime-проверкой — слепые cast'ы бросают ClassCastException; предпочитайте pattern matching instanceof или полиморфные методы без cast'ов."
    },
    topicIds: ["top_oop_13", "top_oop_11"],
    canonicalTag: "#downcasting",
    prerequisiteConceptIds: ["cpt_upcasting"]
  },
  {
    id: "cpt_class_vs_object",
    slug: "class-vs-object",
    title: {
      en: "Class vs Object",
      ru: "Class vs Object"
    },
    summary: {
      en: "A class is the blueprint; an object is a distinct runtime heap instance created from that blueprint.",
      ru: "Класс — чертёж; объект — отдельный runtime-экземпляр в куче, созданный по этому чертежу."
    },
    topicIds: ["top_oop_02"],
    canonicalTag: "#class-vs-object",
    prerequisiteConceptIds: []
  },
  {
    id: "cpt_object_reference",
    slug: "object-reference",
    title: {
      en: "Object References & Aliasing",
      ru: "Ссылки на Объекты и Aliasing"
    },
    summary: {
      en: "Java variables hold references; multiple variables can alias one mutable object so mutations are visible everywhere.",
      ru: "Переменные Java хранят ссылки; несколько переменных могут алиасить один мутабельный объект, поэтому мутации видны везде."
    },
    topicIds: ["top_oop_02"],
    canonicalTag: "#object-reference",
    prerequisiteConceptIds: ["cpt_class_vs_object"]
  },
  {
    id: "cpt_independent_instances",
    slug: "independent-instances",
    title: {
      en: "Independent Instances per Business Record",
      ru: "Независимые Экземпляры на Бизнес-Запись"
    },
    summary: {
      en: "Each business record needs its own heap instance (or immutable value) — reusing one draft across a collection corrupts history.",
      ru: "Каждой бизнес-записи нужен свой экземпляр в куче (или immutable value) — переиспользование одного draft в коллекции портит историю."
    },
    topicIds: ["top_oop_02"],
    canonicalTag: "#independent-instances",
    prerequisiteConceptIds: ["cpt_object_reference"]
  },
  {
    id: "cpt_object_state",
    slug: "object-state",
    title: {
      en: "Object State",
      ru: "Состояние Объекта"
    },
    summary: {
      en: "State is the data an object currently holds (fields) — it can change over time without changing identity.",
      ru: "State — данные, которые объект сейчас хранит (поля); они могут меняться со временем без смены identity."
    },
    topicIds: ["top_oop_03"],
    canonicalTag: "#object-state",
    prerequisiteConceptIds: ["cpt_class_vs_object"]
  },
  {
    id: "cpt_object_behavior",
    slug: "object-behavior",
    title: {
      en: "Object Behavior",
      ru: "Поведение Объекта"
    },
    summary: {
      en: "Behavior is how an object changes or exposes state through methods — prefer transition methods over public setters for domain entities.",
      ru: "Behavior — как объект меняет или отдаёт state через методы; для доменных сущностей предпочитайте transition-методы публичным setter'ам."
    },
    topicIds: ["top_oop_03"],
    canonicalTag: "#object-behavior",
    prerequisiteConceptIds: ["cpt_object_state"]
  },
  {
    id: "cpt_object_identity",
    slug: "object-identity",
    title: {
      en: "Object Identity",
      ru: "Идентичность Объекта"
    },
    summary: {
      en: "Identity distinguishes one entity from another across state changes — e.g. TransferId — and is not the same as equal field values.",
      ru: "Identity отличает одну сущность от другой при смене state — например TransferId — и не равна совпадению значений полей."
    },
    topicIds: ["top_oop_03"],
    canonicalTag: "#object-identity",
    prerequisiteConceptIds: ["cpt_object_state"]
  },
  {
    id: "cpt_constructor_init_order",
    slug: "constructor-init-order",
    title: {
      en: "Constructor Initialization Order",
      ru: "Порядок Инициализации Конструктора"
    },
    summary: {
      en: "JLS construction order: superclass constructors, then field initializers, then constructor body — observers must not see half-built instances.",
      ru: "Порядок конструирования по JLS: конструкторы суперкласса, затем инициализаторы полей, затем тело конструктора — наблюдатели не должны видеть полусобранные экземпляры."
    },
    topicIds: ["top_oop_04"],
    canonicalTag: "#constructor-init-order",
    prerequisiteConceptIds: ["cpt_class_vs_object"]
  },
  {
    id: "cpt_this_escape",
    slug: "this-escape",
    title: {
      en: "This-Escape During Construction",
      ru: "This-Escape во Время Конструирования"
    },
    summary: {
      en: "Publishing this from a constructor (registry, listener, overridable call) lets other code observe an incompletely initialized object.",
      ru: "Публикация this из конструктора (registry, listener, переопределяемый вызов) позволяет другому коду увидеть не до конца инициализированный объект."
    },
    topicIds: ["top_oop_04"],
    canonicalTag: "#this-escape",
    prerequisiteConceptIds: ["cpt_constructor_init_order"]
  },
  {
    id: "cpt_safe_construction",
    slug: "safe-construction",
    title: {
      en: "Safe Construction Patterns",
      ru: "Паттерны Безопасного Конструирования"
    },
    summary: {
      en: "Finish field assignment and validation before publishing; use factories; avoid overridable methods from constructors.",
      ru: "Завершайте присвоение полей и валидацию до публикации; используйте factory; избегайте переопределяемых методов из конструкторов."
    },
    topicIds: ["top_oop_04"],
    canonicalTag: "#safe-construction",
    prerequisiteConceptIds: ["cpt_this_escape"]
  },
  {
    id: "cpt_package_private",
    slug: "package-private",
    title: {
      en: "Package-Private Accessibility",
      ru: "Package-Private Доступность"
    },
    summary: {
      en: "Default (no modifier) access limits members to the same package — the enforceable boundary for co-located internals.",
      ru: "Доступ по умолчанию (без модификатора) ограничивает члены тем же пакетом — enforceable граница для соседних internals."
    },
    topicIds: ["top_oop_06"],
    canonicalTag: "#package-private",
    prerequisiteConceptIds: ["cpt_access_modifiers"]
  },
  {
    id: "cpt_protected_coupling",
    slug: "protected-coupling",
    title: {
      en: "Protected Coupling Across Packages",
      ru: "Protected Coupling Между Пакетами"
    },
    summary: {
      en: "protected lets foreign-package subclasses call internals — a second public API that often bypasses package policy facades.",
      ru: "protected позволяет subclasses из чужих пакетов вызывать internals — второй public API, часто обходящий package policy facades."
    },
    topicIds: ["top_oop_06"],
    canonicalTag: "#protected-coupling",
    prerequisiteConceptIds: ["cpt_access_modifiers"]
  },
  {
    id: "cpt_association",
    slug: "association",
    title: {
      en: "Association Relationships",
      ru: "Связи Association"
    },
    summary: {
      en: "Association is a navigable relationship without ownership — deleting one end does not destroy the other.",
      ru: "Association — навигируемая связь без ownership: удаление одного конца не уничтожает другой."
    },
    topicIds: ["top_oop_17"],
    canonicalTag: "#association",
    prerequisiteConceptIds: []
  },
  {
    id: "cpt_aggregation",
    slug: "aggregation",
    title: {
      en: "Aggregation Relationships",
      ru: "Связи Aggregation"
    },
    summary: {
      en: "Aggregation is a whole-part relationship where parts can outlive the whole and may be shared.",
      ru: "Aggregation — связь целое-часть, где части могут переживать целое и могут быть shared."
    },
    topicIds: ["top_oop_17"],
    canonicalTag: "#aggregation",
    prerequisiteConceptIds: ["cpt_association"]
  },
  {
    id: "cpt_composition_ownership",
    slug: "composition-ownership",
    title: {
      en: "Composition Ownership",
      ru: "Ownership в Composition"
    },
    summary: {
      en: "Composition means exclusive ownership: when the whole is deleted, owned parts are deleted; do not compose shared catalogs or feeds.",
      ru: "Composition означает исключительное владение: при удалении целого удаляются owned-части; не компонуйте shared-каталоги или feeds."
    },
    topicIds: ["top_oop_17"],
    canonicalTag: "#composition-ownership",
    prerequisiteConceptIds: ["cpt_aggregation"]
  },
  {
    id: "cpt_java_lang_object",
    slug: "java-lang-object",
    title: {
      en: "java.lang.Object Contracts Overview",
      ru: "Обзор Контрактов java.lang.Object"
    },
    summary: {
      en: "Object defines equals, hashCode, toString, clone, and related contracts every domain type inherits — misuse shows up in audits and collections.",
      ru: "Object определяет equals, hashCode, toString, clone и связанные контракты, которые наследует каждый доменный тип — misuse проявляется в аудите и коллекциях."
    },
    topicIds: ["top_oop_19"],
    canonicalTag: "#java-lang-object",
    prerequisiteConceptIds: ["cpt_class_vs_object"]
  },
  {
    id: "cpt_getclass_vs_instanceof",
    slug: "getclass-vs-instanceof",
    title: {
      en: "getClass() vs instanceof",
      ru: "getClass() vs instanceof"
    },
    summary: {
      en: "getClass() equality rejects subclasses; instanceof allows them — choose deliberately for type checks and equals designs.",
      ru: "Равенство getClass() отвергает subclasses; instanceof их допускает — выбирайте осознанно для type checks и equals."
    },
    topicIds: ["top_oop_19"],
    canonicalTag: "#getclass-vs-instanceof",
    prerequisiteConceptIds: ["cpt_java_lang_object"]
  },
  {
    id: "cpt_clone_pitfalls",
    slug: "clone-pitfalls",
    title: {
      en: "Object.clone() Pitfalls",
      ru: "Ловушки Object.clone()"
    },
    summary: {
      en: "Clone is fragile (Cloneable, shallow copies, checked exceptions); prefer copy constructors or factories for domain types.",
      ru: "Clone хрупок (Cloneable, shallow copies, checked exceptions); для доменных типов предпочитайте copy constructors или factory."
    },
    topicIds: ["top_oop_19"],
    canonicalTag: "#clone-pitfalls",
    prerequisiteConceptIds: ["cpt_java_lang_object"]
  },
  {
    id: "cpt_tostring_diagnostics",
    slug: "tostring-diagnostics",
    title: {
      en: "toString() for Diagnostics",
      ru: "toString() для Диагностики"
    },
    summary: {
      en: "toString should aid debugging with safe identifiers — never dump secrets or full PII into logs via default stringification.",
      ru: "toString должен помогать отладке безопасными идентификаторами — никогда не сбрасывайте секреты или полный PII в логи через stringification."
    },
    topicIds: ["top_oop_21"],
    canonicalTag: "#tostring-diagnostics",
    prerequisiteConceptIds: ["cpt_java_lang_object"]
  },
  {
    id: "cpt_pii_redaction",
    slug: "pii-redaction",
    title: {
      en: "PII Redaction in Object Representations",
      ru: "Редактирование PII в Представлениях Объекта"
    },
    summary: {
      en: "Redact or omit personally identifiable and secret fields from toString and log payloads using an explicit redaction policy.",
      ru: "Редактируйте или опускайте персональные и секретные поля в toString и log payloads по явной redaction policy."
    },
    topicIds: ["top_oop_21"],
    canonicalTag: "#pii-redaction",
    prerequisiteConceptIds: ["cpt_tostring_diagnostics"]
  },
  {
    id: "cpt_logging_parameterization",
    slug: "logging-parameterization",
    title: {
      en: "Parameterized Logging",
      ru: "Параметризованное Логирование"
    },
    summary: {
      en: "Prefer logger.info(\"msg {}\", id) over string concatenation of whole objects so sensitive toString is not eagerly built into centralized logs.",
      ru: "Предпочитайте logger.info(\"msg {}\", id) конкатенации целых объектов, чтобы чувствительный toString не попадал жадно в централизованные логи."
    },
    topicIds: ["top_oop_21"],
    canonicalTag: "#logging-parameterization",
    prerequisiteConceptIds: ["cpt_pii_redaction"]
  }
];

export const OOP_TAGS: readonly Tag[] = [
  {
    id: "tag_encapsulation",
    slug: "encapsulation",
    displayName: { en: "#encapsulation", ru: "#инкапсуляция" },
    canonicalConceptId: "cpt_encapsulation",
    category: "OOP"
  },
  {
    id: "tag_invariants",
    slug: "invariants",
    displayName: { en: "#invariants", ru: "#инварианты" },
    canonicalConceptId: "cpt_invariants",
    category: "OOP"
  },
  {
    id: "tag_access_modifiers",
    slug: "access-modifiers",
    displayName: { en: "#access-modifiers", ru: "#модификаторы-доступа" },
    canonicalConceptId: "cpt_access_modifiers",
    category: "OOP"
  },
  {
    id: "tag_defensive_copying",
    slug: "defensive-copying",
    displayName: { en: "#defensive-copying", ru: "#защитное-копирование" },
    canonicalConceptId: "cpt_defensive_copying",
    category: "OOP"
  },
  {
    id: "tag_money",
    slug: "money",
    displayName: { en: "#money", ru: "#деньги" },
    canonicalConceptId: "cpt_monetary_representation",
    category: "ARCHITECTURE"
  },
  {
    id: "tag_equals",
    slug: "equals",
    displayName: { en: "#equals", ru: "#equals" },
    canonicalConceptId: "cpt_equals_contract",
    category: "OOP"
  },
  {
    id: "tag_hashcode",
    slug: "hashcode",
    displayName: { en: "#hashcode", ru: "#hashcode" },
    canonicalConceptId: "cpt_hashcode_contract",
    category: "OOP"
  },
  {
    id: "tag_mutable_key",
    slug: "mutable-key",
    displayName: { en: "#mutable-key", ru: "#мутабельный-ключ" },
    canonicalConceptId: "cpt_mutable_key_disaster",
    category: "OOP"
  },
  {
    id: "tag_immutability",
    slug: "immutability",
    displayName: { en: "#immutability", ru: "#неизменяемость" },
    canonicalConceptId: "cpt_immutability",
    category: "OOP"
  },
  {
    id: "tag_composition",
    slug: "composition",
    displayName: { en: "#composition", ru: "#композиция" },
    canonicalConceptId: "cpt_composition_over_inheritance",
    category: "OOP"
  },
  {
    id: "tag_lsp",
    slug: "lsp",
    displayName: { en: "#lsp", ru: "#lsp" },
    canonicalConceptId: "cpt_liskov_substitution",
    category: "OOP"
  },
  {
    id: "tag_builder",
    slug: "builder-pattern",
    displayName: { en: "#builder-pattern", ru: "#builder" },
    canonicalConceptId: "cpt_builder_pattern",
    category: "OOP"
  },
  {
    id: "tag_factory_pattern",
    slug: "factory-pattern",
    displayName: { en: "#factory-pattern", ru: "#factory" },
    canonicalConceptId: "cpt_factory_pattern",
    category: "OOP"
  },
  {
    id: "tag_creational_decoupling",
    slug: "creational-decoupling",
    displayName: { en: "#creational-decoupling", ru: "#creational-decoupling" },
    canonicalConceptId: "cpt_creational_decoupling",
    category: "OOP"
  },
  {
    id: "tag_default_methods",
    slug: "default-methods",
    displayName: { en: "#default-methods", ru: "#default-методы" },
    canonicalConceptId: "cpt_default_methods",
    category: "OOP"
  },
  {
    id: "tag_overriding",
    slug: "overriding",
    displayName: { en: "#overriding", ru: "#переопределение" },
    canonicalConceptId: "cpt_method_overriding",
    category: "OOP"
  },
  {
    id: "tag_covariant_returns",
    slug: "covariant-returns",
    displayName: { en: "#covariant-returns", ru: "#ковариантные-возвраты" },
    canonicalConceptId: "cpt_covariant_returns",
    category: "OOP"
  },
  {
    id: "tag_overloading",
    slug: "overloading",
    displayName: { en: "#overloading", ru: "#перегрузка" },
    canonicalConceptId: "cpt_method_overloading",
    category: "OOP"
  },
  {
    id: "tag_compile_time",
    slug: "compile-time",
    displayName: { en: "#compile-time", ru: "#compile-time" },
    canonicalConceptId: "cpt_compile_time_resolution",
    category: "OOP"
  },
  {
    id: "tag_dynamic_dispatch",
    slug: "dynamic-dispatch",
    displayName: { en: "#dynamic-dispatch", ru: "#динамическая-диспетчеризация" },
    canonicalConceptId: "cpt_dynamic_dispatch",
    category: "OOP"
  },
  {
    id: "tag_invokevirtual",
    slug: "invokevirtual",
    displayName: { en: "#invokevirtual", ru: "#invokevirtual" },
    canonicalConceptId: "cpt_invokevirtual",
    category: "OOP"
  },
  {
    id: "tag_dependency_injection",
    slug: "dependency-injection",
    displayName: { en: "#dependency-injection", ru: "#внедрение-зависимостей" },
    canonicalConceptId: "cpt_dependency_injection",
    category: "OOP"
  },
  {
    id: "tag_dip",
    slug: "dip",
    displayName: { en: "#dip", ru: "#dip" },
    canonicalConceptId: "cpt_dependency_inversion",
    category: "OOP"
  },
  {
    id: "tag_strategy_pattern",
    slug: "strategy-pattern",
    displayName: { en: "#strategy-pattern", ru: "#strategy" },
    canonicalConceptId: "cpt_strategy_pattern",
    category: "OOP"
  },
  {
    id: "tag_ocp",
    slug: "ocp",
    displayName: { en: "#ocp", ru: "#ocp" },
    canonicalConceptId: "cpt_open_closed",
    category: "OOP"
  },
  {
    id: "tag_abstraction",
    slug: "abstraction",
    displayName: { en: "#abstraction", ru: "#абстракция" },
    canonicalConceptId: "cpt_abstraction",
    category: "OOP"
  },
  {
    id: "tag_leaky_abstraction",
    slug: "leaky-abstraction",
    displayName: { en: "#leaky-abstraction", ru: "#дырявая-абстракция" },
    canonicalConceptId: "cpt_leaky_abstraction",
    category: "OOP"
  },
  {
    id: "tag_anemic_model",
    slug: "anemic-model",
    displayName: { en: "#anemic-model", ru: "#анемичная-модель" },
    canonicalConceptId: "cpt_anemic_domain_model",
    category: "OOP"
  },
  {
    id: "tag_god_class",
    slug: "god-class",
    displayName: { en: "#god-class", ru: "#god-class" },
    canonicalConceptId: "cpt_god_class",
    category: "OOP"
  },
  {
    id: "tag_feature_envy",
    slug: "feature-envy",
    displayName: { en: "#feature-envy", ru: "#feature-envy" },
    canonicalConceptId: "cpt_feature_envy",
    category: "OOP"
  },
  {
    id: "tag_abstract_class",
    slug: "abstract-class",
    displayName: { en: "#abstract-class", ru: "#абстрактный-класс" },
    canonicalConceptId: "cpt_abstract_class",
    category: "OOP"
  },
  {
    id: "tag_template_hooks",
    slug: "template-hooks",
    displayName: { en: "#template-hooks", ru: "#template-hooks" },
    canonicalConceptId: "cpt_template_hooks",
    category: "OOP"
  },
  {
    id: "tag_inheritance",
    slug: "inheritance",
    displayName: { en: "#inheritance", ru: "#наследование" },
    canonicalConceptId: "cpt_inheritance",
    category: "OOP"
  },
  {
    id: "tag_inherited_state",
    slug: "inherited-state",
    displayName: { en: "#inherited-state", ru: "#унаследованное-состояние" },
    canonicalConceptId: "cpt_inherited_state",
    category: "OOP"
  },
  {
    id: "tag_polymorphism",
    slug: "polymorphism",
    displayName: { en: "#polymorphism", ru: "#полиморфизм" },
    canonicalConceptId: "cpt_polymorphism",
    category: "OOP"
  },
  {
    id: "tag_type_switch_smell",
    slug: "type-switch-smell",
    displayName: { en: "#type-switch-smell", ru: "#type-switch-smell" },
    canonicalConceptId: "cpt_type_switch_smell",
    category: "OOP"
  },
  {
    id: "tag_coupling",
    slug: "coupling",
    displayName: { en: "#coupling", ru: "#coupling" },
    canonicalConceptId: "cpt_coupling",
    category: "OOP"
  },
  {
    id: "tag_cohesion",
    slug: "cohesion",
    displayName: { en: "#cohesion", ru: "#cohesion" },
    canonicalConceptId: "cpt_cohesion",
    category: "OOP"
  },
  {
    id: "tag_domain_modeling",
    slug: "domain-modeling",
    displayName: { en: "#domain-modeling", ru: "#доменное-моделирование" },
    canonicalConceptId: "cpt_domain_modeling",
    category: "OOP"
  },
  {
    id: "tag_value_objects",
    slug: "value-objects",
    displayName: { en: "#value-objects", ru: "#value-objects" },
    canonicalConceptId: "cpt_value_objects",
    category: "OOP"
  },
  {
    id: "tag_upcasting",
    slug: "upcasting",
    displayName: { en: "#upcasting", ru: "#upcasting" },
    canonicalConceptId: "cpt_upcasting",
    category: "OOP"
  },
  {
    id: "tag_downcasting",
    slug: "downcasting",
    displayName: { en: "#downcasting", ru: "#downcasting" },
    canonicalConceptId: "cpt_downcasting",
    category: "OOP"
  },
  {
    id: "tag_class_vs_object",
    slug: "class-vs-object",
    displayName: { en: "#class-vs-object", ru: "#class-vs-object" },
    canonicalConceptId: "cpt_class_vs_object",
    category: "OOP"
  },
  {
    id: "tag_object_reference",
    slug: "object-reference",
    displayName: { en: "#object-reference", ru: "#object-reference" },
    canonicalConceptId: "cpt_object_reference",
    category: "OOP"
  },
  {
    id: "tag_independent_instances",
    slug: "independent-instances",
    displayName: { en: "#independent-instances", ru: "#independent-instances" },
    canonicalConceptId: "cpt_independent_instances",
    category: "OOP"
  },
  {
    id: "tag_object_state",
    slug: "object-state",
    displayName: { en: "#object-state", ru: "#object-state" },
    canonicalConceptId: "cpt_object_state",
    category: "OOP"
  },
  {
    id: "tag_object_behavior",
    slug: "object-behavior",
    displayName: { en: "#object-behavior", ru: "#object-behavior" },
    canonicalConceptId: "cpt_object_behavior",
    category: "OOP"
  },
  {
    id: "tag_object_identity",
    slug: "object-identity",
    displayName: { en: "#object-identity", ru: "#object-identity" },
    canonicalConceptId: "cpt_object_identity",
    category: "OOP"
  },
  {
    id: "tag_constructor_init_order",
    slug: "constructor-init-order",
    displayName: { en: "#constructor-init-order", ru: "#constructor-init-order" },
    canonicalConceptId: "cpt_constructor_init_order",
    category: "OOP"
  },
  {
    id: "tag_this_escape",
    slug: "this-escape",
    displayName: { en: "#this-escape", ru: "#this-escape" },
    canonicalConceptId: "cpt_this_escape",
    category: "OOP"
  },
  {
    id: "tag_safe_construction",
    slug: "safe-construction",
    displayName: { en: "#safe-construction", ru: "#safe-construction" },
    canonicalConceptId: "cpt_safe_construction",
    category: "OOP"
  },
  {
    id: "tag_package_private",
    slug: "package-private",
    displayName: { en: "#package-private", ru: "#package-private" },
    canonicalConceptId: "cpt_package_private",
    category: "OOP"
  },
  {
    id: "tag_protected_coupling",
    slug: "protected-coupling",
    displayName: { en: "#protected-coupling", ru: "#protected-coupling" },
    canonicalConceptId: "cpt_protected_coupling",
    category: "OOP"
  },
  {
    id: "tag_association",
    slug: "association",
    displayName: { en: "#association", ru: "#association" },
    canonicalConceptId: "cpt_association",
    category: "OOP"
  },
  {
    id: "tag_aggregation",
    slug: "aggregation",
    displayName: { en: "#aggregation", ru: "#aggregation" },
    canonicalConceptId: "cpt_aggregation",
    category: "OOP"
  },
  {
    id: "tag_composition_ownership",
    slug: "composition-ownership",
    displayName: { en: "#composition-ownership", ru: "#composition-ownership" },
    canonicalConceptId: "cpt_composition_ownership",
    category: "OOP"
  },
  {
    id: "tag_java_lang_object",
    slug: "java-lang-object",
    displayName: { en: "#java-lang-object", ru: "#java-lang-object" },
    canonicalConceptId: "cpt_java_lang_object",
    category: "OOP"
  },
  {
    id: "tag_getclass_vs_instanceof",
    slug: "getclass-vs-instanceof",
    displayName: { en: "#getclass-vs-instanceof", ru: "#getclass-vs-instanceof" },
    canonicalConceptId: "cpt_getclass_vs_instanceof",
    category: "OOP"
  },
  {
    id: "tag_clone_pitfalls",
    slug: "clone-pitfalls",
    displayName: { en: "#clone-pitfalls", ru: "#clone-pitfalls" },
    canonicalConceptId: "cpt_clone_pitfalls",
    category: "OOP"
  },
  {
    id: "tag_tostring_diagnostics",
    slug: "tostring-diagnostics",
    displayName: { en: "#tostring-diagnostics", ru: "#tostring-diagnostics" },
    canonicalConceptId: "cpt_tostring_diagnostics",
    category: "OOP"
  },
  {
    id: "tag_pii_redaction",
    slug: "pii-redaction",
    displayName: { en: "#pii-redaction", ru: "#pii-redaction" },
    canonicalConceptId: "cpt_pii_redaction",
    category: "OOP"
  },
  {
    id: "tag_logging_parameterization",
    slug: "logging-parameterization",
    displayName: { en: "#logging-parameterization", ru: "#logging-parameterization" },
    canonicalConceptId: "cpt_logging_parameterization",
    category: "OOP"
  }
];
