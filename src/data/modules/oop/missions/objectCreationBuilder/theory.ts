import { TheoryArticle, TheoryCheckpoint, LocalizedText } from '../../../../../types/domain';

interface TheoryInterviewFollowUp {
  readonly id: string;
  readonly theoryArticleId: string;
  readonly question: LocalizedText;
  readonly modelAnswer: LocalizedText;
  readonly relatedConceptIds: readonly string[];
  readonly order: number;
}

export const THEORY_ARTICLE_OBJECT_CREATION: TheoryArticle = {
  id: "art_theory_object_creation",
  topicIds: ["top_oop_25"],
  conceptIds: ["cpt_builder_pattern", "cpt_static_factory_methods", "cpt_immutability", "cpt_invariants"],
  title: {
    en: "Static Factory Methods & Builder Pattern for Complex Domain Objects",
    ru: "Статические Фабричные Методы и Паттерн Builder для Сложных Доменных Объектов"
  },
  summary: {
    en: "Effective Java Items 1 & 2 and GoF Builder pattern applied to financial settlement domain: eliminate telescoping constructor boolean traps, enforce invariants at build time, and produce readable immutable object creation APIs.",
    ru: "Effective Java Items 1 & 2 и паттерн Builder из GoF, примененные к домену финансовых расчетов: устранение ловушек boolean в телескопических конструкторах, проверка инвариантов при build() и читаемые API создания неизменяемых объектов."
  },
  sections: [
    {
      id: "sec_static_factories",
      category: "DEFINITION",
      title: {
        en: "1. Static Factory Methods vs Public Constructors (Effective Java Item 1)",
        ru: "1. Статические Фабричные Методы vs Публичные Конструкторы (Effective Java Item 1)"
      },
      blocks: [
        {
          id: "blk_sf_1",
          type: "PARAGRAPH",
          content: {
            en: "Joshua Bloch's Effective Java Item 1 recommends considering static factory methods instead of public constructors. Unlike constructors, static factories have names that clearly express intent: `SettlementInstruction.of(id, payer, payee, amount)` reads better than `new SettlementInstruction(id, payer, payee, amount)`. They can return cached instances, return subtypes, and hide complex construction logic.",
            ru: "Effective Java Item 1 рекомендует рассматривать статические фабричные методы вместо публичных конструкторов. В отличие от конструкторов, фабрики имеют имена, ясно выражающие намерение: `SettlementInstruction.of(id, payer, payee, amount)` читается лучше, чем `new SettlementInstruction(...)`. Они могут возвращать кэшированные экземпляры, подтипы и скрывать сложную логику построения."
          }
        },
        {
          id: "blk_sf_2",
          type: "CALLOUT",
          title: {
            en: "💡 Core Mental Model: Named Creation Intent",
            ru: "💡 Главная Ментальная Модель: Именованное Намерение Создания"
          },
          content: {
            en: "Static factories like `of()`, `valueOf()`, `getInstance()`, and domain-specific names like `taxExemptWire()` make call sites self-documenting. When a reviewer sees `SettlementInstruction.taxExemptWire(...)`, they immediately understand the tax classification without reading constructor parameter order.",
            ru: "Статические фабрики вроде `of()`, `valueOf()`, `getInstance()` и доменные имена вроде `taxExemptWire()` делают вызовы самодокументирующимися. Когда ревьюер видит `SettlementInstruction.taxExemptWire(...)`, он сразу понимает налоговую классификацию без чтения порядка параметров конструктора."
          }
        }
      ]
    },
    {
      id: "sec_builder_pattern",
      category: "MECHANICS",
      title: {
        en: "2. Builder Pattern for Multi-Parameter Immutable Objects (Effective Java Item 2 & GoF)",
        ru: "2. Паттерн Builder для Много параметровых Неизменяемых Объектов (Effective Java Item 2 и GoF)"
      },
      blocks: [
        {
          id: "blk_bld_1",
          type: "PARAGRAPH",
          content: {
            en: "When a class has more than 4-5 parameters (especially with many optional fields), telescoping constructors explode combinatorially. The Builder pattern provides a fluent step-by-step API: `SettlementInstruction.builder().instructionId(id).payerAccountId(payer).isTaxExempt(true).isAudited(false).build()`. Each setter method is named after the field it configures — eliminating boolean positional ambiguity entirely.",
            ru: "Когда у класса более 4-5 параметров (особенно с множеством опциональных полей), телескопические конструкторы растут комбинаторно. Паттерн Builder предоставляет fluent API: `SettlementInstruction.builder().instructionId(id).payerAccountId(payer).isTaxExempt(true).isAudited(false).build()`. Каждый метод именован по полю — полностью устраняя позиционную неоднозначность boolean."
          }
        },
        {
          id: "blk_bld_2",
          type: "WARNING",
          title: {
            en: "⚠️ Production Risk: Adjacent Boolean Parameter Trap",
            ru: "⚠️ Продакшн Риск: Ловушка Смежных Boolean-Параметров"
          },
          content: {
            en: "Java provides NO compile-time protection against swapping adjacent boolean literals. `new SettlementInstruction(..., true, false, ...)` and `new SettlementInstruction(..., false, true, ...)` compile identically. This is the exact root cause of the SettlementInstruction tax reporting incident — 847 objects were created with inverted flags over six months.",
            ru: "Java НЕ обеспечивает защиты на этапе компиляции от перепутывания смежных boolean-литералов. `new SettlementInstruction(..., true, false, ...)` и `new SettlementInstruction(..., false, true, ...)` компилируются одинаково. Это точная причина инцидента SettlementInstruction — 847 объектов были созданы с инвертированными флагами за шесть месяцев."
          }
        }
      ]
    },
    {
      id: "sec_invariants_build",
      category: "TRADE_OFFS",
      title: {
        en: "3. Enforcing Invariants at build() Time & Immutability Trade-offs",
        ru: "3. Проверка Инвариантов в build() и Компромиссы Неизменяемости"
      },
      blocks: [
        {
          id: "blk_inv_1",
          type: "PARAGRAPH",
          content: {
            en: "The Builder's `build()` method is the single choke point for invariant validation: mandatory fields must be non-null, amountInCents must be positive, and domain rules like 'tax-exempt instructions require audit trail' can be enforced before the immutable SettlementInstruction is constructed. Once built, the object exposes only getters — no setters — guaranteeing flag immutability for the object's lifetime.",
            ru: "Метод `build()` Builder — единая точка проверки инвариантов: обязательные поля не null, amountInCents положителен, доменные правила вроде 'налого-льготные инструкции требуют аудита' проверяются до создания неизменяемого SettlementInstruction. После build() объект предоставляет только геттеры — без сеттеров — гарантируя неизменяемость флагов на всё время жизни."
          }
        },
        {
          id: "blk_inv_2",
          type: "CALLOUT",
          title: {
            en: "🔍 Why This Bug Survives Unit Testing",
            ru: "🔍 Почему Этот Баг Проходит Юнит-Тесты"
          },
          content: {
            en: "Unit tests typically construct SettlementInstruction with hardcoded literals matching the test author's mental model. Integration tests verify object creation succeeds (no exception thrown) but rarely assert tax classification flags against regulatory report aggregations. The bug surfaces only during quarterly reconciliation when millions of instructions are aggregated by isTaxExempt flag.",
            ru: "Юнит-тесты обычно создают SettlementInstruction с литералами, соответствующими ментальной модели автора теста. Интеграционные тесты проверяют успешное создание (без исключения), но редко сверяют флаги налоговой классификации с агрегациями регуляторных отчетов. Баг проявляется только при квартальной сверке, когда миллионы инструкций агрегируются по флагу isTaxExempt."
          }
        }
      ]
    }
  ],
  prerequisiteConceptIds: [],
  sourceIds: ["src_effective_java_item1_2", "src_gof_builder_pattern"],
  verificationStatus: "TECHNICALLY_VERIFIED",
  tags: ["#builder-pattern", "#static-factories", "#immutability", "#invariants", "#settlement"],
  estimatedMinutes: 12,
  version: "1.0.0"
};

export const THEORY_CHECKPOINTS_OBJECT_CREATION: readonly TheoryCheckpoint[] = [
  {
    id: "chk_oc_1",
    theoryArticleId: "art_theory_object_creation",
    question: {
      en: "What is the primary advantage of static factory methods over public constructors according to Effective Java Item 1?",
      ru: "Каково главное преимущество статических фабричных методов над публичными конструкторами согласно Effective Java Item 1?"
    },
    explanation: {
      en: "Static factory methods have names that clearly express creation intent, making call sites self-documenting and reducing parameter-order confusion.",
      ru: "Статические фабричные методы имеют имена, ясно выражающие намерение создания, делая вызовы самодокументирующимися и снижая путаницу с порядком параметров."
    },
    options: [
      {
        id: "opt_oc1_a",
        text: {
          en: "They execute faster on the JVM because the constructor bytecode is bypassed entirely.",
          ru: "Они выполняются быстрее на JVM, так как байткод конструктора полностью обходится."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Performance is not the primary advantage. Named intent and API flexibility are.",
          ru: "Неверно. Производительность — не главное преимущество. Именованное намерение и гибкость API — да."
        }
      },
      {
        id: "opt_oc1_b",
        text: {
          en: "They have names that clearly express what object is being created, improving readability and reducing boolean parameter confusion.",
          ru: "Они имеют имена, ясно выражающие создаваемый объект, улучшая читаемость и снижая путаницу с boolean-параметрами."
        },
        isCorrect: true,
        feedback: {
          en: "Correct! Names like of(), valueOf(), and domain-specific taxExemptWire() make call sites self-documenting.",
          ru: "Верно! Имена вроде of(), valueOf() и доменного taxExemptWire() делают вызовы самодокументирующимися."
        }
      },
      {
        id: "opt_oc1_c",
        text: {
          en: "They automatically make all returned objects thread-safe without synchronization.",
          ru: "Они автоматически делают все возвращаемые объекты потокобезопасными без синхронизации."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Static factories do not automatically provide thread safety.",
          ru: "Неверно. Статические фабрики не обеспечивают потокобезопасность автоматически."
        },
        misconceptionId: "err_static_factory_thread_safety"
      }
    ],
    order: 1
  },
  {
    id: "chk_oc_2",
    theoryArticleId: "art_theory_object_creation",
    question: {
      en: "Why did the SettlementInstruction telescoping constructor cause silent tax report corruption?",
      ru: "Почему телескопический конструктор SettlementInstruction вызвал тихую порчу налоговых отчетов?"
    },
    explanation: {
      en: "Adjacent boolean parameters (isTaxExempt, isAudited) can be swapped at call sites with no compile-time error, producing objects with inverted tax classification flags.",
      ru: "Смежные boolean-параметры (isTaxExempt, isAudited) могут быть перепутаны в вызовах без ошибки компиляции, создавая объекты с инвертированными флагами налоговой классификации."
    },
    options: [
      {
        id: "opt_oc2_a",
        text: {
          en: "Adjacent boolean literal arguments can be swapped with no compile-time error, silently inverting isAudited and isTaxExempt flags.",
          ru: "Смежные boolean-литералы могут быть перепутаны без ошибки компиляции, тихо инвертируя флаги isAudited и isTaxExempt."
        },
        isCorrect: true,
        feedback: {
          en: "Correct! `new Foo(..., true, false)` and `new Foo(..., false, true)` compile identically — the Builder pattern eliminates this trap.",
          ru: "Верно! `new Foo(..., true, false)` и `new Foo(..., false, true)` компилируются одинаково — Builder устраняет эту ловушку."
        }
      },
      {
        id: "opt_oc2_b",
        text: {
          en: "Java boolean fields default to null when not explicitly set in telescoping constructors.",
          ru: "Boolean-поля Java по умолчанию null, если не заданы явно в телескопических конструкторах."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. boolean is a primitive type defaulting to false, not null.",
          ru: "Неверно. boolean — примитив с default false, а не null."
        }
      },
      {
        id: "opt_oc2_c",
        text: {
          en: "The JVM garbage collector reordered boolean field assignments during object construction.",
          ru: "Сборщик мусора JVM переупорядочил присвоения boolean-полей при создании объекта."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. GC does not reorder field assignments. The developer swapped literal argument order.",
          ru: "Неверно. GC не переупорядочивает присвоения полей. Разработчик перепутал порядок литералов."
        },
        misconceptionId: "err_boolean_parameter_swap"
      }
    ],
    order: 2
  },
  {
    id: "chk_oc_3",
    theoryArticleId: "art_theory_object_creation",
    question: {
      en: "Where should domain invariant validation occur when using the Builder pattern for SettlementInstruction?",
      ru: "Где должна происходить проверка доменных инвариантов при использовании Builder для SettlementInstruction?"
    },
    explanation: {
      en: "The build() method is the single validation choke point before constructing the immutable object, ensuring invalid instances can never exist.",
      ru: "Метод build() — единая точка валидации перед созданием неизменяемого объекта, гарантируя, что нелегитимные экземпляры не могут существовать."
    },
    options: [
      {
        id: "opt_oc3_a",
        text: {
          en: "In each fluent setter method (e.g., amountInCents()) to fail fast on every field assignment.",
          ru: "В каждом fluent-сеттере (например, amountInCents()) для fail-fast на каждом присвоении."
        },
        isCorrect: false,
        feedback: {
          en: "Partially valid for individual field checks, but cross-field invariants (e.g., tax-exempt requires audit) require build()-time validation.",
          ru: "Частично верно для отдельных полей, но кросс-полевые инварианты (например, tax-exempt требует audit) требуют валидации в build()."
        }
      },
      {
        id: "opt_oc3_b",
        text: {
          en: "In the Builder's build() method, validating all mandatory fields and cross-field domain rules before constructing the immutable SettlementInstruction.",
          ru: "В методе build() Builder, проверяя все обязательные поля и кросс-полевые доменные правила перед созданием неизменяемого SettlementInstruction."
        },
        isCorrect: true,
        feedback: {
          en: "Correct! build() is the single choke point ensuring no invalid SettlementInstruction can ever be instantiated.",
          ru: "Верно! build() — единая точка, гарантирующая, что нелегитимный SettlementInstruction никогда не будет создан."
        }
      },
      {
        id: "opt_oc3_c",
        text: {
          en: "In a separate @PostConstruct validation service called after object creation by Spring.",
          ru: "В отдельном сервисе валидации @PostConstruct, вызываемом Spring после создания объекта."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Domain invariants must be enforced at construction time, not deferred to framework lifecycle hooks.",
          ru: "Неверно. Доменные инварианты должны проверяться при создании, а не откладываться на lifecycle-хуки фреймворка."
        }
      }
    ],
    order: 3
  }
];

export const THEORY_FOLLOW_UPS_OBJECT_CREATION: readonly TheoryInterviewFollowUp[] = [
  {
    id: "fu_oc_01",
    theoryArticleId: "art_theory_object_creation",
    question: {
      en: "When should you use a static factory method vs a Builder for SettlementInstruction?",
      ru: "Когда использовать статическую фабрику vs Builder для SettlementInstruction?"
    },
    modelAnswer: {
      en: "Use static factory methods (of, taxExemptWire) for common preset configurations with few parameters. Use Builder when callers need flexible combinations of 8 optional fields. They complement each other: factories can delegate to Builder internally.",
      ru: "Используйте статические фабрики (of, taxExemptWire) для типовых конфигураций с малым числом параметров. Builder — когда нужны гибкие комбинации 8 опциональных полей. Они дополняют друг друга: фабрики могут делегировать Builder внутри."
    },
    relatedConceptIds: ["cpt_static_factory_methods", "cpt_builder_pattern"],
    order: 1
  },
  {
    id: "fu_oc_02",
    theoryArticleId: "art_theory_object_creation",
    question: {
      en: "How does Effective Java Item 2 recommend handling mandatory vs optional parameters in Builder?",
      ru: "Как Effective Java Item 2 рекомендует обрабатывать обязательные vs опциональные параметры в Builder?"
    },
    modelAnswer: {
      en: "Pass mandatory parameters (instructionId, payer, payee, amount) to the Builder constructor. Optional parameters use fluent setter methods with sensible defaults. build() validates all mandatory fields are set and throws IllegalStateException if not.",
      ru: "Передайте обязательные параметры (instructionId, payer, payee, amount) в конструктор Builder. Опциональные — через fluent-сеттеры с разумными default. build() проверяет все обязательные поля и бросает IllegalStateException, если не заданы."
    },
    relatedConceptIds: ["cpt_builder_pattern", "cpt_invariants"],
    order: 2
  },
  {
    id: "fu_oc_03",
    theoryArticleId: "art_theory_object_creation",
    question: {
      en: "Why is `SettlementInstruction.builder().isTaxExempt(true).isAudited(false).build()` safer than `new SettlementInstruction(..., true, false)`?",
      ru: "Почему `SettlementInstruction.builder().isTaxExempt(true).isAudited(false).build()` безопаснее, чем `new SettlementInstruction(..., true, false)`?"
    },
    modelAnswer: {
      en: "Named fluent methods eliminate positional ambiguity. Each boolean is bound to its field name at the call site. Code review instantly reveals intent. Reordering method calls does not change semantics — unlike reordering constructor arguments.",
      ru: "Именованные fluent-методы устраняют позиционную неоднозначность. Каждый boolean привязан к имени поля в вызове. Код-ревью мгновенно показывает намерение. Перестановка методов не меняет семантику — в отличие от перестановки аргuments конструктора."
    },
    relatedConceptIds: ["cpt_builder_pattern"],
    order: 3
  },
  {
    id: "fu_oc_04",
    theoryArticleId: "art_theory_object_creation",
    question: {
      en: "Can Java Records replace Builder for SettlementInstruction with 12 fields?",
      ru: "Могут ли Java Records заменить Builder для SettlementInstruction с 12 полями?"
    },
    modelAnswer: {
      en: "Records work well for simple immutable data carriers but struggle with many optional fields and fluent construction. A Record with 12 components requires all parameters at construction. Builder + immutable class (or Record with static factory delegating to Builder) is the enterprise pattern for complex optional configurations.",
      ru: "Records хороши для простых неизменяемых носителей данных, но плохо справляются с множеством опциональных полей и fluent-построением. Record с 12 компонентами требует все параметры сразу. Builder + неизменяемый класс — enterprise-паттерн для сложных опциональных конфигураций."
    },
    relatedConceptIds: ["cpt_builder_pattern", "cpt_immutability"],
    order: 4
  },
  {
    id: "fu_oc_05",
    theoryArticleId: "art_theory_object_creation",
    question: {
      en: "What is the difference between GoF Builder and Effective Java Builder?",
      ru: "В чем разница между GoF Builder и Effective Java Builder?"
    },
    modelAnswer: {
      en: "GoF Builder assembles complex objects step-by-step with a Director orchestrating build steps (used in UI frameworks). Effective Java Builder is a static inner class with fluent setters for optional parameters, typically without a Director — the client calls builder methods directly.",
      ru: "GoF Builder собирает сложные объекты пошагово с Director, оркестрирующим шаги (UI-фреймворки). Effective Java Builder — static inner class с fluent-сеттерами для опциональных параметров, обычно без Director — клиент вызывает методы builder напрямую."
    },
    relatedConceptIds: ["cpt_builder_pattern"],
    order: 5
  },
  {
    id: "fu_oc_06",
    theoryArticleId: "art_theory_object_creation",
    question: {
      en: "How would you write a domain-specific static factory `SettlementInstruction.taxExemptWire(...)`?",
      ru: "Как написать доменную статическую фабрику `SettlementInstruction.taxExemptWire(...)`?"
    },
    modelAnswer: {
      en: "Accept mandatory wire parameters, then delegate to Builder with isTaxExempt(true) and isAudited(true) pre-set: `return builder().instructionId(id)...isTaxExempt(true).isAudited(true).build()`. Callers get a preset tax classification without touching boolean flags directly.",
      ru: "Принять обязательные wire-параметры, делегировать Builder с предустановленными isTaxExempt(true) и isAudited(true): `return builder().instructionId(id)...isTaxExempt(true).isAudited(true).build()`. Вызывающий получает предустановленную налоговую классификацию без прямой работы с boolean."
    },
    relatedConceptIds: ["cpt_static_factory_methods", "cpt_builder_pattern"],
    order: 6
  },
  {
    id: "fu_oc_07",
    theoryArticleId: "art_theory_object_creation",
    question: {
      en: "Should SettlementInstructionBuilder be a separate top-level class or a static inner class?",
      ru: "Должен ли SettlementInstructionBuilder быть отдельным top-level классом или static inner class?"
    },
    modelAnswer: {
      en: "Effective Java recommends a public static member class (inner Builder). This keeps Builder API co-located with the class it builds, allows package-private constructor on SettlementInstruction (only Builder can call it), and prevents incomplete objects from escaping.",
      ru: "Effective Java рекомендует public static member class (inner Builder). Это держит Builder API рядом с классом, позволяет package-private конструктор SettlementInstruction (только Builder может вызвать) и предотвращает утечку неполных объектов."
    },
    relatedConceptIds: ["cpt_builder_pattern"],
    order: 7
  },
  {
    id: "fu_oc_08",
    theoryArticleId: "art_theory_object_creation",
    question: {
      en: "How do you prevent SettlementInstructionBuilder from being reused after build()?",
      ru: "Как предотвратить повторное использование SettlementInstructionBuilder после build()?"
    },
    modelAnswer: {
      en: "Option 1: Document that Builder is single-use (Effective Java approach). Option 2: Throw IllegalStateException on second build() call. Option 3: Return a new Builder instance from each static factory. For financial domain, Option 2 provides fail-fast safety.",
      ru: "Вариант 1: Документировать single-use (подход Effective Java). Вариант 2: IllegalStateException при втором build(). Вариант 3: Новый Builder из каждой фабрики. Для финансового домена Вариант 2 дает fail-fast безопасность."
    },
    relatedConceptIds: ["cpt_builder_pattern", "cpt_invariants"],
    order: 8
  },
  {
    id: "fu_oc_09",
    theoryArticleId: "art_theory_object_creation",
    question: {
      en: "What cross-field invariant should build() enforce for tax-exempt settlements?",
      ru: "Какой кросс-полевой инвариант должен проверять build() для налогово-льготных расчетов?"
    },
    modelAnswer: {
      en: "If isTaxExempt is true, isAudited must also be true (regulatory requirement: tax-exempt instructions require audit trail). build() should throw IllegalStateException with a clear message: 'Tax-exempt settlement instructions must be audited'.",
      ru: "Если isTaxExempt true, isAudited тоже должен быть true (регуляторное требование: налогово-льготные инструкции требуют аудита). build() должен бросать IllegalStateException: 'Tax-exempt settlement instructions must be audited'."
    },
    relatedConceptIds: ["cpt_invariants", "cpt_builder_pattern"],
    order: 9
  },
  {
    id: "fu_oc_10",
    theoryArticleId: "art_theory_object_creation",
    question: {
      en: "How does Lombok @Builder compare to hand-written Builder for SettlementInstruction?",
      ru: "Как Lombok @Builder сравнивается с ручным Builder для SettlementInstruction?"
    },
    modelAnswer: {
      en: "@Builder generates boilerplate but hides cross-field invariant validation in build(). For financial domain objects with regulatory invariants, hand-written Builder with explicit build() validation is preferred. @Builder is acceptable for simple DTOs without cross-field rules.",
      ru: "@Builder генерирует шаблон, но скрывает кросс-полевую валидацию в build(). Для финансовых объектов с регуляторными инвариантами предпочтителен ручной Builder с явной валидацией в build(). @Builder допустим для простых DTO без кросс-полевых правил."
    },
    relatedConceptIds: ["cpt_builder_pattern", "cpt_invariants"],
    order: 10
  },
  {
    id: "fu_oc_11",
    theoryArticleId: "art_theory_object_creation",
    question: {
      en: "Why did the 847 misclassified instructions pass all automated tests?",
      ru: "Почему 847 неправильно классифицированных инструкций прошли все автоматические тесты?"
    },
    modelAnswer: {
      en: "Tests verified object creation (no exception) and business flow completion, but did not assert isTaxExempt flag values against expected tax classification. Aggregation-level reconciliation tests (comparing report totals) were run quarterly, not in CI. Add property-based tests asserting flag combinations match factory intent.",
      ru: "Тесты проверяли создание объекта (без исключения) и завершение бизнес-потока, но не сверяли значения isTaxExempt с ожидаемой классификацией. Агрегационные тесты сверки (сравнение итогов отчетов) запускались ежеквартально, не в CI. Добавьте property-based тесты, проверяющие комбинации флагов."
    },
    relatedConceptIds: ["cpt_invariants", "cpt_static_factory_methods"],
    order: 11
  },
  {
    id: "fu_oc_12",
    theoryArticleId: "art_theory_object_creation",
    question: {
      en: "What is Effective Java Item 1's guidance on when NOT to use static factory methods?",
      ru: "Какое руководство дает Effective Java Item 1, когда НЕ использовать статические фабрики?"
    },
    modelAnswer: {
      en: "Static factories cannot be used when subclassing requires public/protected constructors. They also obscure class instantiation (harder to find all creation sites via 'new ClassName' grep). For frameworks requiring reflection-based instantiation (JPA entities, Spring beans), public constructors may be necessary.",
      ru: "Статические фабрики нельзя использовать, когда для наследования нужны public/protected конструкторы. Они также скрывают создание экземпляров (сложнее найти все места через grep 'new ClassName'). Для фреймворков с рефлексией (JPA entities, Spring beans) могут быть нужны публичные конструкторы."
    },
    relatedConceptIds: ["cpt_static_factory_methods"],
    order: 12
  }
];
