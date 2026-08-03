import { TheoryArticle, TheoryCheckpoint } from '../../../../../types/domain';

export const THEORY_ARTICLE_DEFAULT_METHODS: TheoryArticle = {
  id: "art_theory_default_methods",
  topicIds: ["top_oop_09"],
  conceptIds: ["cpt_default_methods", "cpt_interface_contracts"],
  title: {
    en: "Interface Default Methods & JLS 9.4.1.2 Conflict Resolution",
    ru: "Default-Методы Интерфейсов и Разрешение Конфликтов по JLS 9.4.1.2"
  },
  summary: {
    en: "Java 8 default methods enable backward-compatible interface evolution and multiple inheritance of behavior, but create diamond conflicts when unrelated interfaces supply identically-signed defaults. JLS 9.4.1.2 defines the three-tier resolution hierarchy and super-qualified disambiguation syntax.",
    ru: "Default-методы Java 8 обеспечивают обратно совместимую эволюцию интерфейсов и множественное наследование поведения, но создают конфликты ромба, когда несвязанные интерфейсы предоставляют defaults с одинаковой сигнатурой. JLS 9.4.1.2 определяет трехуровневую иерархию разрешения и super-qualified синтаксис."
  },
  sections: [
    {
      id: "sec_idm_definition",
      category: "DEFINITION",
      title: {
        en: "1. Default Methods and the Diamond Problem",
        ru: "1. Default-Методы и Проблема Ромба"
      },
      blocks: [
        {
          id: "blk_idm_def_1",
          type: "PARAGRAPH",
          content: {
            en: "Before Java 8, interfaces could declare abstract methods only. Adding a new method to a widely-implemented interface (e.g., `Collection`) would break every existing implementor at compile time. Default methods (`default void auditLog() { ... }`) provide a body inside the interface, allowing library maintainers to evolve APIs without forcing immediate overrides across all consumers.",
            ru: "До Java 8 интерфейсы могли объявлять только абстрактные методы. Добавление нового метода в широко реализуемый интерфейс (например, `Collection`) ломало бы все существующие реализации на этапе компиляции. Default-методы (`default void auditLog() { ... }`) предоставляют тело внутри интерфейса, позволяя разработчикам библиотек эволюционировать API без принудительного переопределения у всех потребителей."
          }
        },
        {
          id: "blk_idm_def_2",
          type: "CALLOUT",
          title: {
            en: "💡 Core Mental Model: Multiple Inheritance of Behavior",
            ru: "💡 Главная Ментальная Модель: Множественное Наследование Поведения"
          },
          content: {
            en: "When PaymentReconciliationService implements both Auditable and Traceable, it inherits default method implementations from BOTH interfaces — analogous to the C++ diamond problem. If both defaults share the same signature (`void auditLog()`) but provide unrelated implementations (compliance DB write vs distributed trace span), the compiler cannot choose automatically and reports a conflict per JLS 9.4.1.2.",
            ru: "Когда PaymentReconciliationService реализует Auditable и Traceable, он наследует default-реализации из ОБОИХ интерфейсов — аналог проблемы ромба в C++. Если оба defaults имеют одинаковую сигнатуру (`void auditLog()`), но несвязанные реализации (запись в compliance DB vs distributed trace span), компилятор не может выбрать автоматически и сообщает о конфликте согласно JLS 9.4.1.2."
          }
        }
      ]
    },
    {
      id: "sec_idm_jls_mechanics",
      category: "MECHANICS",
      title: {
        en: "2. JLS 9.4.1.2: Default Method Inheritance and Conflict Rules",
        ru: "2. JLS 9.4.1.2: Наследование Default-Методов и Правила Конфликтов"
      },
      blocks: [
        {
          id: "blk_idm_jls_1",
          type: "PARAGRAPH",
          content: {
            en: "JLS Section 9.4.1.2 ('Inheritance and Overriding') defines how a class or interface inherits default methods. The resolution hierarchy has three tiers: (1) A method declared in the class (or inherited from a superclass) always wins over any default method. (2) If no class method exists, the most specific superinterface's default wins when one interface extends another. (3) If two or more superinterfaces provide defaults with the same signature that are NOT related by subtyping, the class MUST override the method explicitly — otherwise it is a compile-time error.",
            ru: "JLS Раздел 9.4.1.2 ('Наследование и Переопределение') определяет, как класс или интерфейс наследует default-методы. Иерархия разрешения имеет три уровня: (1) Метод, объявленный в классе (или унаследованный от суперкласса), всегда побеждает любой default-метод. (2) Если метода класса нет, default наиболее специфичного супер-интерфейса побеждает, когда один интерфейс расширяет другой. (3) Если два или более супер-интерфейса предоставляют defaults с одинаковой сигнатурой, НЕ связанные через subtyping, класс ОБЯЗАН явно переопределить метод — иначе ошибка компиляции."
          }
        },
        {
          id: "blk_idm_jls_2",
          type: "WARNING",
          title: {
            en: "⚙️ JLS 9.4.1.2: Super-Qualified Default Method Invocation",
            ru: "⚙️ JLS 9.4.1.2: Super-Qualified Вызов Default-Метода"
          },
          content: {
            en: "When overriding a conflicting default, the implementing class can invoke a specific superinterface's default using qualified syntax: `Auditable.super.auditLog()` or `Traceable.super.auditLog()`. This is the ONLY way to call a particular default implementation when multiple unrelated defaults collide. A naive `@Override public void auditLog() { }` empty override silently drops BOTH audit trails — a production compliance violation.",
            ru: "При переопределении конфликтующего default класс-реализатор может вызвать default конкретного супер-интерфейса через qualified синтаксис: `Auditable.super.auditLog()` или `Traceable.super.auditLog()`. Это ЕДИНСТВЕННЫЙ способ вызвать конкретную default-реализацию при столкновении несвязанных defaults. Наивное `@Override public void auditLog() { }` без тела молча отбрасывает ОБА аудит-трейла — нарушение compliance на продакшене."
          }
        },
        {
          id: "blk_idm_jls_3",
          type: "CALLOUT",
          title: {
            en: "📜 JLS 9.4.1.2 Compile Error Message Decoded",
            ru: "📜 Расшифровка Сообщения об Ошибке JLS 9.4.1.2"
          },
          content: {
            en: "Error: `class PaymentReconciliationService inherits unrelated defaults for auditLog() from types Auditable and Traceable`\n\nTranslation: Auditable and Traceable are siblings (neither extends the other). Both provide `default void auditLog()`. The compiler found no class-level override and no subtyping relationship to pick a winner. Fix: override auditLog() and delegate to each default explicitly, or refactor to composition.",
            ru: "Ошибка: `class PaymentReconciliationService inherits unrelated defaults for auditLog() from types Auditable and Traceable`\n\nРасшифровка: Auditable и Traceable — «братья» (ни один не расширяет другой). Оба предоставляют `default void auditLog()`. Компилятор не нашел переопределения на уровне класса и subtyping-связи для выбора победителя. Фикс: переопределить auditLog() и делегировать каждому default явно, либо рефакторить на композицию."
          }
        }
      ]
    },
    {
      id: "sec_idm_resolution_tradeoffs",
      category: "TRADE_OFFS",
      title: {
        en: "3. Resolution Strategies: Super-Qualified Calls vs Composition Facade",
        ru: "3. Стратегии Разрешения: Super-Qualified Вызовы vs Composition Facade"
      },
      blocks: [
        {
          id: "blk_idm_res_1",
          type: "PARAGRAPH",
          content: {
            en: "The production fix for PaymentReconciliationService typically overrides auditLog() and chains both defaults:\n```java\n@Override\npublic void auditLog() {\n    Auditable.super.auditLog();  // compliance DB\n    Traceable.super.auditLog();  // distributed trace\n}\n```\nThis preserves both cross-cutting concerns but couples the service to both library default implementations. If either library changes its default semantics in a future minor release, behavior changes silently without compile errors.",
            ru: "Типичный продакшн-фикс для PaymentReconciliationService переопределяет auditLog() и вызывает оба defaults:\n```java\n@Override\npublic void auditLog() {\n    Auditable.super.auditLog();  // compliance DB\n    Traceable.super.auditLog();  // distributed trace\n}\n```\nЭто сохраняет обе cross-cutting concerns, но связывает сервис с default-реализациями обеих библиотек. Если любая библиотека изменит семантику default в будущем минорном релизе, поведение изменится молча без ошибок компиляции."
          }
        },
        {
          id: "blk_idm_res_2",
          type: "CALLOUT",
          title: {
            en: "🔧 Alternative: AuditFacade Composition Pattern",
            ru: "🔧 Альтернатива: Паттерн AuditFacade через Композицию"
          },
          content: {
            en: "Senior architects often refactor to explicit composition: inject ComplianceAuditor and TraceEmitter beans, remove marker interfaces with conflicting defaults, and call facade.auditCompliance(event) + facade.emitTrace(event) explicitly. This eliminates diamond conflicts entirely, makes audit ordering explicit, and decouples from library default method evolution — at the cost of more boilerplate wiring.",
            ru: "Senior-архитекторы часто рефакторят на явную композицию: инжектят ComplianceAuditor и TraceEmitter beans, удаляют marker-интерфейсы с конфликтующими defaults и явно вызывают facade.auditCompliance(event) + facade.emitTrace(event). Это полностью устраняет конфликты ромба, делает порядок аудита явным и развязывает от эволюции default-методов библиотек — ценой большего шаблонного wiring."
          }
        }
      ]
    },
    {
      id: "sec_idm_interview_followups",
      category: "INTERVIEW_GUIDANCE",
      title: {
        en: "4. Senior Interview Follow-Up Questions: Default Methods & Diamond Conflicts",
        ru: "4. Дополнительные Вопросы Senior-Интервью: Default-Методы и Конфликты Ромба"
      },
      blocks: [
        {
          id: "blk_idm_fup_01",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q1: 'Why were default methods added to Java 8 interfaces?' — Model Answer: To evolve widely-implemented interfaces (Collection, Iterable, Comparator) without breaking existing implementors. Library maintainers could add `default stream()` to Collection instead of forcing every custom collection class to implement it immediately. Default methods enable backward-compatible API extension.",
            ru: "Доп. Вопрос 1: 'Зачем default-методы добавили в интерфейсы Java 8?' — Модельный Ответ: Для эволюции широко реализуемых интерфейсов (Collection, Iterable, Comparator) без поломки существующих реализаций. Разработчики библиотек могли добавить `default stream()` в Collection вместо принуждения каждого custom collection класса реализовать его немедленно. Default-методы обеспечивают обратно совместимое расширение API."
          }
        },
        {
          id: "blk_idm_fup_02",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q2: 'Can a class implement two interfaces with the same default method if one extends the other?' — Model Answer: Yes. JLS 9.4.1.2 rule 2 applies: the most specific interface's default wins. If Traceable extends Auditable and both define auditLog(), Traceable's default is inherited automatically — no explicit override required unless the class wants Auditable's version instead.",
            ru: "Доп. Вопрос 2: 'Может ли класс реализовать два интерфейса с одинаковым default-методом, если один расширяет другой?' — Модельный Ответ: Да. Применяется правило 2 JLS 9.4.1.2: default наиболее специфичного интерфейса побеждает. Если Traceable расширяет Auditable и оба определяют auditLog(), default Traceable наследуется автоматически — явное переопределение не требуется, если класс не хочет версию Auditable."
          }
        },
        {
          id: "blk_idm_fup_03",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q3: 'What happens if PaymentReconciliationService extends SettlementProcessor which already overrides auditLog()?' — Model Answer: JLS 9.4.1.2 rule 1: the class method wins. If SettlementProcessor declares `public void auditLog()`, PaymentReconciliationService inherits that implementation and the interface defaults are shadowed. The conflict disappears unless PaymentReconciliationService itself also implements Auditable and Traceable directly without inheriting the override.",
            ru: "Доп. Вопрос 3: 'Что если PaymentReconciliationService расширяет SettlementProcessor, который уже переопределяет auditLog()?' — Модельный Ответ: Правило 1 JLS 9.4.1.2: метод класса побеждает. Если SettlementProcessor объявляет `public void auditLog()`, PaymentReconciliationService наследует эту реализацию, а defaults интерфейсов затеняются. Конфликт исчезает, если PaymentReconciliationService сам не реализует Auditable и Traceable напрямую без наследования override."
          }
        },
        {
          id: "blk_idm_fup_04",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q4: 'Can you call Object.super.toString() like Interface.super.method()?' — Model Answer: No. Super-qualified syntax `TypeName.super.method()` is valid ONLY for invoking a superinterface's default method from a class or subinterface. Classes inherit from Object implicitly, but `Object.super.toString()` is illegal syntax. For class superclass calls, use `super.toString()` without the type qualifier.",
            ru: "Доп. Вопрос 4: 'Можно ли вызвать Object.super.toString() как Interface.super.method()?' — Модельный Ответ: Нет. Super-qualified синтаксис `TypeName.super.method()` допустим ТОЛЬКО для вызова default-метода супер-интерфейса из класса или под-интерфейса. Классы неявно наследуют Object, но `Object.super.toString()` — нелегальный синтаксис. Для вызова суперкласса используйте `super.toString()` без квалификатора типа."
          }
        },
        {
          id: "blk_idm_fup_05",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q5: 'Are default methods virtual? Can they be overridden?' — Model Answer: Yes. Default methods are instance methods with virtual dispatch. A class can override any inherited default with `@Override public void auditLog() { ... }`. Once overridden, the default is not invoked unless explicitly called via `Auditable.super.auditLog()`. Static methods in interfaces are NOT inherited and cannot be overridden.",
            ru: "Доп. Вопрос 5: 'Default-методы виртуальные? Их можно переопределить?' — Модельный Ответ: Да. Default-методы — instance-методы с виртуальной диспетчеризацией. Класс может переопределить любой унаследованный default через `@Override public void auditLog() { ... }`. После переопределения default не вызывается, пока явно не вызван через `Auditable.super.auditLog()`. Статические методы интерфейсов НЕ наследуются и не переопределяются."
          }
        },
        {
          id: "blk_idm_fup_06",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q6: 'What is the difference between default methods and abstract methods in interfaces?' — Model Answer: Abstract methods declare a contract without implementation — implementors MUST provide a body. Default methods provide a concrete implementation that implementors inherit automatically but MAY override. Both are public instance methods. Default methods cannot access instance fields (interfaces have none), only other interface methods and static members.",
            ru: "Доп. Вопрос 6: 'В чем разница между default-методами и абстрактными методами интерфейса?' — Модельный Ответ: Абстрактные методы объявляют контракт без реализации — реализаторы ОБЯЗАНЫ предоставить тело. Default-методы предоставляют конкретную реализацию, которую реализаторы наследуют автоматически, но МОГУТ переопределить. Оба — public instance-методы. Default-методы не могут обращаться к полям экземпляра (у интерфейсов их нет), только к другим методам интерфейса и static-членам."
          }
        },
        {
          id: "blk_idm_fup_07",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q7: 'Can an interface extend two interfaces that both define the same default method?' — Model Answer: Only if the defaults are override-equivalent (same bytecode behavior) or one interface subtypes the other. If two sibling superinterfaces provide unrelated defaults with the same signature, the subinterface itself gets a compile error unless it explicitly overrides and disambiguates — mirroring the class-level diamond problem.",
            ru: "Доп. Вопрос 7: 'Может ли интерфейс расширять два интерфейса с одинаковым default-методом?' — Модельный Ответ: Только если defaults override-equivalent (одинаковое поведение байткода) или один интерфейс является subtyping другого. Если два «братских» супер-интерфейса предоставляют несвязанные defaults с одинаковой сигнатурой, под-интерфейс получает ошибку компиляции, пока явно не переопределит и не разрешит — зеркало проблемы ромба на уровне класса."
          }
        },
        {
          id: "blk_idm_fup_08",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q8: 'In our incident, why did the code compile before the framework upgrade?' — Model Answer: The older compliance-sdk and observability-sdk versions did NOT yet contain default auditLog() methods — Auditable and Traceable only declared abstract auditLog() or had no auditLog at all. PaymentReconciliationService compiled because there was no inherited behavior to collide. The upgrade added defaults to both libraries simultaneously, triggering JLS 9.4.1.2 conflict detection.",
            ru: "Доп. Вопрос 8: 'Почему код компилировался до обновления фреймворка?' — Модельный Ответ: Старые версии compliance-sdk и observability-sdk еще НЕ содержали default auditLog() — Auditable и Traceable объявляли только abstract auditLog() или не имели auditLog вовсе. PaymentReconciliationService компилировался, потому что не было унаследованного поведения для столкновения. Обновление добавило defaults в обе библиотеки одновременно, активировав детекцию конфликта JLS 9.4.1.2."
          }
        },
        {
          id: "blk_idm_fup_09",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q9: 'Does the order of Auditable.super.auditLog() vs Traceable.super.auditLog() matter?' — Model Answer: Yes, in production payment systems. Compliance audit records may need to be persisted BEFORE trace spans are emitted (regulatory ordering requirements). Reversing the order could cause trace IDs to appear in audit logs before the audit record exists. Document and test the invocation order explicitly in the override.",
            ru: "Доп. Вопрос 9: 'Важен ли порядок Auditable.super.auditLog() vs Traceable.super.auditLog()?' — Модельный Ответ: Да, в продакшн платежных системах. Compliance audit records могут требовать сохранения ДО эмиссии trace spans (регуляторные требования к порядку). Обратный порядок может привести к появлению trace ID в audit logs до создания audit record. Документируйте и тестируйте порядок вызовов явно в override."
          }
        },
        {
          id: "blk_idm_fup_10",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q10: 'How do default methods interact with Java reflection and MethodHandles?' — Model Answer: Reflected Method objects for default methods show the declaring interface as the class. MethodHandles.lookup().findVirtual(instance, \"auditLog\", ...) resolves to the runtime-selected override in the concrete class, not the interface default — unless no override exists, in which case the default from the most specific interface is invoked.",
            ru: "Доп. Вопрос 10: 'Как default-методы взаимодействуют с Java reflection и MethodHandles?' — Модельный Ответ: Reflected Method для default-методов показывает объявляющий интерфейс как class. MethodHandles.lookup().findVirtual(instance, \"auditLog\", ...) разрешается в runtime-selected override в конкретном классе, а не default интерфейса — если override не существует, вызывается default наиболее специфичного интерфейса."
          }
        },
        {
          id: "blk_idm_fup_11",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q11: 'Should internal SDK teams add default methods to marker interfaces like Auditable?' — Model Answer: Controversial. Defaults enable zero-boilerplate adoption but create silent behavior coupling and diamond conflicts when multiple SDKs evolve independently. Best practice for cross-cutting audit concerns: provide default methods ONLY on a single canonical Auditable interface, or prefer composition-based AuditWriter beans over marker interfaces with inherited behavior.",
            ru: "Доп. Вопрос 11: 'Следует ли internal SDK командам добавлять default-методы в marker-интерфейсы вроде Auditable?' — Модельный Ответ: Спорно. Defaults обеспечивают zero-boilerplate adoption, но создают тихую связность поведения и конфликты ромба при независимой эволюции SDK. Best practice для cross-cutting audit: defaults ТОЛЬКО на одном каноническом Auditable, либо composition-based AuditWriter beans вместо marker-интерфейсов с унаследованным поведением."
          }
        },
        {
          id: "blk_idm_fup_12",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q12: 'How would you write an ArchUnit test to prevent future default method diamond conflicts?' — Model Answer: ArchUnit cannot statically detect all diamond conflicts (requires full classpath interface analysis), but you CAN rule: classes implementing more than one interface should not have compile-time conflicts (javac catches this). For prevention, enforce: 'No two dependency JARs may define identically-signed default methods on interfaces implemented by the same service class' via dependency alignment checks in CI and interface segregation reviews.",
            ru: "Доп. Вопрос 12: 'Как написать ArchUnit тест для предотвращения будущих конфликтов default-методов ромба?' — Модельный Ответ: ArchUnit не может статически обнаружить все конфликты ромба (нужен полный classpath analysis интерфейсов), но МОЖНО правило: классы, реализующие более одного интерфейса, не должны иметь compile-time конфликтов (javac ловит это). Для профилактики: 'Два dependency JAR не должны определять defaults с одинаковой сигнатурой на интерфейсах одного сервиса' через dependency alignment в CI и interface segregation review."
          }
        }
      ]
    }
  ],
  prerequisiteConceptIds: ["cpt_interface_contracts"],
  sourceIds: ["src_jls_9412_default_methods", "src_effective_java_item20", "src_baeldung_default_methods"],
  verificationStatus: "TECHNICALLY_VERIFIED",
  tags: ["#default-methods", "#diamond-problem", "#jls-9412", "#interfaces"],
  estimatedMinutes: 18,
  version: "1.0.0"
};

export const THEORY_CHECKPOINTS_DEFAULT_METHODS: readonly TheoryCheckpoint[] = [
  {
    id: "chk_idm_1",
    theoryArticleId: "art_theory_default_methods",
    question: {
      en: "When does JLS 9.4.1.2 require an explicit override of a default method?",
      ru: "Когда JLS 9.4.1.2 требует явного переопределения default-метода?"
    },
    explanation: {
      en: "When two or more unrelated superinterfaces provide defaults with the same signature and neither subtypes the other.",
      ru: "Когда два или более несвязанных супер-интерфейса предоставляют defaults с одинаковой сигнатурой и ни один не является subtyping другого."
    },
    options: [
      {
        id: "opt_idm1_a",
        text: {
          en: "When two unrelated superinterfaces both provide a default method with the same signature.",
          ru: "Когда два несвязанных супер-интерфейса предоставляют default-метод с одинаковой сигнатурой."
        },
        isCorrect: true,
        feedback: {
          en: "Correct! This is the diamond conflict scenario in PaymentReconciliationService with Auditable and Traceable.",
          ru: "Верно! Это сценарий конфликта ромба в PaymentReconciliationService с Auditable и Traceable."
        }
      },
      {
        id: "opt_idm1_b",
        text: {
          en: "Whenever a class implements more than one interface, regardless of method signatures.",
          ru: "Всякий раз, когда класс реализует более одного интерфейса, независимо от сигнатур методов."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Multiple interface implementation is fine unless identically-signed unrelated defaults collide.",
          ru: "Неверно. Реализация нескольких интерфейсов допустима, пока не столкнулись несвязанные defaults с одинаковой сигнатурой."
        }
      },
      {
        id: "opt_idm1_c",
        text: {
          en: "Only when the class also extends an abstract class with the same method.",
          ru: "Только когда класс также расширяет абстрактный класс с тем же методом."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. A class method always wins over defaults (rule 1), but unrelated interface defaults conflict independently of abstract classes.",
          ru: "Неверно. Метод класса всегда побеждает defaults (правило 1), но несвязанные defaults интерфейсов конфликтуют независимо от абстрактных классов."
        },
        misconceptionId: "err_class_always_wins_diamond"
      }
    ],
    order: 1
  },
  {
    id: "chk_idm_2",
    theoryArticleId: "art_theory_default_methods",
    question: {
      en: "How do you invoke Auditable's default auditLog() from PaymentReconciliationService after overriding?",
      ru: "Как вызвать default auditLog() из Auditable в PaymentReconciliationService после переопределения?"
    },
    explanation: {
      en: "Use super-qualified syntax: Auditable.super.auditLog() inside the overriding method body.",
      ru: "Используйте super-qualified синтаксис: Auditable.super.auditLog() внутри тела переопределяющего метода."
    },
    options: [
      {
        id: "opt_idm2_a",
        text: {
          en: "Auditable.super.auditLog();",
          ru: "Auditable.super.auditLog();"
        },
        isCorrect: true,
        feedback: {
          en: "Correct! This is the JLS 9.4.1.2 super-qualified default method invocation syntax.",
          ru: "Верно! Это super-qualified синтаксис вызова default-метода по JLS 9.4.1.2."
        }
      },
      {
        id: "opt_idm2_b",
        text: {
          en: "super.auditLog();",
          ru: "super.auditLog();"
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. super.auditLog() refers to the superclass, not a specific superinterface default.",
          ru: "Неверно. super.auditLog() относится к суперклассу, а не к default конкретного супер-интерфейса."
        },
        misconceptionId: "err_super_vs_interface_super"
      },
      {
        id: "opt_idm2_c",
        text: {
          en: "Auditable.auditLog(this);",
          ru: "Auditable.auditLog(this);"
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Static-style interface invocation is not valid for default method delegation.",
          ru: "Неверно. Статический стиль вызова интерфейса не применим для делегирования default-метода."
        }
      }
    ],
    order: 2
  },
  {
    id: "chk_idm_3",
    theoryArticleId: "art_theory_default_methods",
    question: {
      en: "If Traceable extends Auditable and both define default void auditLog(), which default does a implementing class inherit?",
      ru: "Если Traceable расширяет Auditable и оба определяют default void auditLog(), какой default наследует класс?"
    },
    explanation: {
      en: "JLS 9.4.1.2 rule 2: the most specific superinterface's default (Traceable) wins automatically.",
      ru: "Правило 2 JLS 9.4.1.2: default наиболее специфичного супер-интерфейса (Traceable) побеждает автоматически."
    },
    options: [
      {
        id: "opt_idm3_a",
        text: {
          en: "Traceable's default, because it is the most specific superinterface.",
          ru: "Default Traceable, так как он наиболее специфичный супер-интерфейс."
        },
        isCorrect: true,
        feedback: {
          en: "Correct! Subtyping hierarchy resolves the conflict — no explicit override needed.",
          ru: "Верно! Иерархия subtyping разрешает конфликт — явное переопределение не нужно."
        }
      },
      {
        id: "opt_idm3_b",
        text: {
          en: "Both defaults are invoked automatically in declaration order.",
          ru: "Оба defaults вызываются автоматически в порядке объявления."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. The compiler picks one winner via subtyping — it never auto-invokes both.",
          ru: "Неверно. Компилятор выбирает одного победителя через subtyping — он никогда не вызывает оба автоматически."
        },
        misconceptionId: "err_both_defaults_auto_invoke"
      },
      {
        id: "opt_idm3_c",
        text: {
          en: "Compile error — same as unrelated sibling interfaces.",
          ru: "Ошибка компиляции — как у несвязанных «братских» интерфейсов."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Subtyping relationship between interfaces resolves the conflict per JLS 9.4.1.2.",
          ru: "Неверно. Subtyping-связь между интерфейсами разрешает конфликт согласно JLS 9.4.1.2."
        }
      }
    ],
    order: 3
  }
];
