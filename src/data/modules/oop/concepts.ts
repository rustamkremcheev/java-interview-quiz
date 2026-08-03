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
  }
];
