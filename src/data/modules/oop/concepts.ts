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
    id: "tag_default_methods",
    slug: "default-methods",
    displayName: { en: "#default-methods", ru: "#default-методы" },
    canonicalConceptId: "cpt_default_methods",
    category: "OOP"
  }
];
