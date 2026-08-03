import { TheoryArticle, TheoryCheckpoint } from '../../../../../types/domain';

export const THEORY_ARTICLE_DEPENDENCY_INJECTION: TheoryArticle = {
  id: "art_theory_dependency_injection",
  topicIds: ["top_oop_24"],
  conceptIds: ["cpt_dependency_injection", "cpt_dependency_inversion"],
  title: {
    en: "Dependency Injection, Constructor Wiring & Dependency Inversion",
    ru: "Внедрение Зависимостей, Constructor Wiring и Dependency Inversion"
  },
  summary: {
    en: "Dependency Injection (DI) externalizes collaborator creation so SettlementOrchestrator receives FxRateGateway and LedgerGateway instead of looking them up or constructing them. Constructor injection with final fields makes mandatory deps explicit and unit-testable; field @Autowired hides wiring and NPEs outside the Spring container. DIP requires depending on abstractions — never `new LiveFxRateGateway()` inside settle().",
    ru: "Dependency Injection (DI) выносит создание коллабораторов наружу: SettlementOrchestrator получает FxRateGateway и LedgerGateway вместо lookup или new. Constructor injection с final-полями делает обязательные зависимости явными и тестируемыми; field @Autowired скрывает проводку и даёт NPE вне Spring. DIP требует зависеть от абстракций — никогда не вызывать `new LiveFxRateGateway()` внутри settle()."
  },
  sections: [
    {
      id: "sec_di_definition",
      category: "DEFINITION",
      title: {
        en: "1. What Dependency Injection Actually Means",
        ru: "1. Что На Самом Деле Означает Dependency Injection"
      },
      blocks: [
        {
          id: "blk_di_def_1",
          type: "PARAGRAPH",
          content: {
            en: "In senior interviews, DI is often reduced to '@Autowired magic.' In settlement orchestration, DI means the object does not create or locate its collaborators — the composition root (Spring ApplicationContext, a test harness, or a manual factory) supplies FxRateGateway and LedgerGateway. Inversion of Control (IoC) is the broader idea that the framework calls your code; DI is the primary technique for wiring dependencies under IoC.",
            ru: "На Senior-интервью DI часто сводят к «магии @Autowired». В оркестрации settlement DI значит: объект не создаёт и не ищет коллабораторов — composition root (Spring ApplicationContext, тестовый harness или ручная фабрика) передаёт FxRateGateway и LedgerGateway. Inversion of Control (IoC) — более широкая идея, что фреймворк вызывает ваш код; DI — главный приём проводки зависимостей в IoC."
          }
        },
        {
          id: "blk_di_def_2",
          type: "CALLOUT",
          title: {
            en: "💡 Core Mental Model: Push Dependencies In, Don't Pull Them",
            ru: "💡 Главная Ментальная Модель: Зависимости Вталкивают, а Не Вытягивают"
          },
          content: {
            en: "Field injection + ServiceLocator / ApplicationContext.getBean pulls deps at runtime and hides them from the type system. Constructor injection pushes deps at creation time — the compiler and the unit-test author both see that SettlementOrchestrator cannot exist without FxRateGateway and LedgerGateway.",
            ru: "Field injection + ServiceLocator / ApplicationContext.getBean вытягивает зависимости в рантайме и скрывает их от системы типов. Constructor injection вталкивает зависимости при создании — и компилятор, и автор юнит-теста видят: SettlementOrchestrator не существует без FxRateGateway и LedgerGateway."
          }
        }
      ]
    },
    {
      id: "sec_di_mechanics",
      category: "MECHANICS",
      title: {
        en: "2. Constructor vs Field Injection Mechanics",
        ru: "2. Механика Constructor vs Field Injection"
      },
      blocks: [
        {
          id: "blk_di_mech_1",
          type: "PARAGRAPH",
          content: {
            en: "Spring's guidance prefers constructor injection for required dependencies. With `private final FxRateGateway fxRates` assigned in the constructor, fields are immutable after construction, nullability is fail-fast (you cannot build a half-wired orchestrator), and pure unit tests pass mocks without ReflectionTestUtils or @SpringBootTest. Field `@Autowired` on private members leaves them null when you `new SettlementOrchestrator()` — exactly the CI NPE on fxRates.getMidRate().",
            ru: "Spring рекомендует constructor injection для обязательных зависимостей. С `private final FxRateGateway fxRates`, присваиваемым в конструкторе, поля неизменяемы после создания, nullability fail-fast (полусвязанный оркестратор не собрать), а чистые юнит-тесты передают моки без ReflectionTestUtils и @SpringBootTest. Field `@Autowired` на private-полях остаётся null при `new SettlementOrchestrator()` — ровно CI NPE на fxRates.getMidRate()."
          }
        },
        {
          id: "blk_di_mech_2",
          type: "WARNING",
          title: {
            en: "⚠️ Production Risk: Hidden Deps, Hard Mocks, Circular Wiring",
            ru: "⚠️ Продакшн Риск: Скрытые Зависимости, Сложные Моки, Циклическая Проводка"
          },
          content: {
            en: "Field injection conceals collaborators from the public API, encourages optional/@Autowired(required=false) cycles that fail late, and couples tests to the Spring container. Constructor injection makes cycles louder (Spring fails at startup when two constructors require each other) and keeps SettlementOrchestrator testable with Mockito mocks of FxRateGateway and LedgerGateway.",
            ru: "Field injection скрывает коллабораторов из публичного API, провоцирует optional/@Autowired(required=false) циклы с поздним падением и привязывает тесты к Spring-контейнеру. Constructor injection делает циклы громче (Spring падает на старте, если два конструктора требуют друг друга) и оставляет SettlementOrchestrator тестируемым через Mockito-моки FxRateGateway и LedgerGateway."
          }
        }
      ]
    },
    {
      id: "sec_di_dip",
      category: "TRADE_OFFS",
      title: {
        en: "3. Dependency Inversion: Abstractions over new LiveFxRateGateway()",
        ru: "3. Dependency Inversion: Абстракции вместо new LiveFxRateGateway()"
      },
      blocks: [
        {
          id: "blk_di_dip_1",
          type: "PARAGRAPH",
          content: {
            en: "Dependency Inversion Principle (DIP): high-level modules must not depend on low-level modules — both depend on abstractions. SettlementOrchestrator (high-level settlement policy) must depend on FxRateGateway and LedgerGateway interfaces, not on LiveFxRateGateway. Calling `new LiveFxRateGateway()` inside settle() hard-wires infrastructure, blocks stubs, and couples FX adapter lifecycle to orchestration logic — a Clean Architecture / Fowler DI violation even if field injection were fixed.",
            ru: "Dependency Inversion Principle (DIP): высокоуровневые модули не должны зависеть от низкоуровневых — оба зависят от абстракций. SettlementOrchestrator (высокоуровневая политика settlement) должен зависеть от интерфейсов FxRateGateway и LedgerGateway, а не от LiveFxRateGateway. Вызов `new LiveFxRateGateway()` внутри settle() жёстко связывает инфраструктуру, блокирует стабы и смешивает lifecycle FX-адаптера с оркестрацией — нарушение Clean Architecture / Fowler DI даже при исправленном field injection."
          }
        },
        {
          id: "blk_di_dip_2",
          type: "CALLOUT",
          title: {
            en: "⚖️ Trade-off: Explicit Constructors vs Framework Convenience",
            ru: "⚖️ Компромисс: Явные Конструкторы vs Удобство Фреймворка"
          },
          content: {
            en: "Constructor injection adds a few constructor parameters and requires `@Autowired` only when multiple constructors exist (Spring 4.3+ single constructor is auto-wired). The trade-off buys fail-fast wiring, immutable final fields, and container-free unit tests — preferred for SENIOR settlement services over field-injection brevity.",
            ru: "Constructor injection добавляет параметры конструктора и требует `@Autowired` только при нескольких конструкторах (с Spring 4.3+ единственный конструктор авто-wire). Компромисс даёт fail-fast проводку, immutable final-поля и юнит-тесты без контейнера — предпочтительнее краткости field injection для SENIOR settlement-сервисов."
          }
        }
      ]
    },
    {
      id: "sec_di_interview_followups",
      category: "INTERVIEW_GUIDANCE",
      title: {
        en: "4. Senior Interview Follow-Up Questions: DI & DIP",
        ru: "4. Дополнительные Вопросы Senior-Интервью: DI и DIP"
      },
      blocks: [
        {
          id: "blk_di_fup_01",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q1: 'Why does SettlementOrchestrator NPE in unit tests but pass @SpringBootTest?' — Model Answer: Field @Autowired is populated only by the Spring container. `new SettlementOrchestrator()` never sets fxRates/ledger, so fxRates.getMidRate() NPEs. Integration tests hide the design smell.",
            ru: "Доп. Вопрос 1: 'Почему SettlementOrchestrator NPE в юнит-тестах, но проходит @SpringBootTest?' — Модельный Ответ: Field @Autowired заполняет только Spring-контейнер. `new SettlementOrchestrator()` не выставляет fxRates/ledger, поэтому fxRates.getMidRate() даёт NPE. Интеграционные тесты маскируют запах дизайна."
          }
        },
        {
          id: "blk_di_fup_02",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q2: 'Why prefer constructor injection over field injection?' — Model Answer: Mandatory deps become explicit and final; null collaborators fail at construction; unit tests inject mocks without reflection; Spring detects constructor cycles at startup.",
            ru: "Доп. Вопрос 2: 'Почему constructor injection лучше field injection?' — Модельный Ответ: Обязательные зависимости явны и final; null-коллабораторы падают при создании; юнит-тесты передают моки без reflection; Spring детектит циклы конструкторов на старте."
          }
        },
        {
          id: "blk_di_fup_03",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q3: 'What is the difference between DI and DIP?' — Model Answer: DI is a technique for supplying collaborators. DIP is a design principle: depend on abstractions (FxRateGateway), not concretions (LiveFxRateGateway). You can DI a concrete class and still violate DIP.",
            ru: "Доп. Вопрос 3: 'В чём разница между DI и DIP?' — Модельный Ответ: DI — техника передачи коллабораторов. DIP — принцип дизайна: зависеть от абстракций (FxRateGateway), не от конкреций (LiveFxRateGateway). Можно внедрять конкретный класс через DI и всё равно нарушать DIP."
          }
        },
        {
          id: "blk_di_fup_04",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q4: 'Why is `new LiveFxRateGateway()` inside settle() bad even with constructor DI for ledger?' — Model Answer: It hard-wires a low-level adapter, prevents mocking FX rates, couples network/IO lifecycle to orchestration, and violates DIP for that collaborator.",
            ru: "Доп. Вопрос 4: 'Почему `new LiveFxRateGateway()` внутри settle() плох даже при constructor DI для ledger?' — Модельный Ответ: Жёстко связывает низкоуровневый адаптер, мешает мокать FX-курсы, смешивает network/IO lifecycle с оркестрацией и нарушает DIP для этого коллаборатора."
          }
        },
        {
          id: "blk_di_fup_05",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q5: 'When is setter or field injection acceptable?' — Model Answer: Rare optional collaborators, legacy frameworks, or framework extension points. Prefer constructor for required FxRateGateway/LedgerGateway; use ObjectProvider/Optional for truly optional deps.",
            ru: "Доп. Вопрос 5: 'Когда допустимы setter или field injection?' — Модельный Ответ: Редкие опциональные коллабораторы, legacy-фреймворки или точки расширения. Для обязательных FxRateGateway/LedgerGateway — constructor; для genuinely optional — ObjectProvider/Optional."
          }
        },
        {
          id: "blk_di_fup_06",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q6: 'How do circular dependencies relate to injection style?' — Model Answer: Field/setter injection can mask cycles until runtime. Constructor injection forces an acyclic graph or explicit redesign (extract mediator, event, or break interface). Settlement ↔ LiveFx often signals wrong ownership.",
            ru: "Доп. Вопрос 6: 'Как циклические зависимости связаны со стилем injection?' — Модельный Ответ: Field/setter injection маскирует циклы до рантайма. Constructor injection требует ациклического графа или явного редизайна (mediator, event, разрыв интерфейса). Цикл Settlement ↔ LiveFx часто сигнал неверного ownership."
          }
        },
        {
          id: "blk_di_fup_07",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q7: 'How would you unit-test a constructor-injected SettlementOrchestrator?' — Model Answer: `new SettlementOrchestrator(mockFx, mockLedger)`, stub getMidRate/postEntry, assert SettlementReceipt — no Spring context required.",
            ru: "Доп. Вопрос 7: 'Как юнит-тестировать constructor-injected SettlementOrchestrator?' — Модельный Ответ: `new SettlementOrchestrator(mockFx, mockLedger)`, stub getMidRate/postEntry, assert SettlementReceipt — Spring-контекст не нужен."
          }
        },
        {
          id: "blk_di_fup_08",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q8: 'Does @RequiredArgsConstructor from Lombok equal good DI?' — Model Answer: It generates constructor injection for final fields — good if fields are abstractions. It does not fix `new LiveFxRateGateway()` inside methods or depending on concrete classes.",
            ru: "Доп. Вопрос 8: 'Равен ли @RequiredArgsConstructor из Lombok хорошему DI?' — Модельный Ответ: Генерирует constructor injection для final-полей — хорошо, если поля-абстракции. Не чинит `new LiveFxRateGateway()` внутри методов и зависимость от конкретных классов."
          }
        },
        {
          id: "blk_di_fup_09",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q9: 'Relate DI to Clean Architecture boundaries.' — Model Answer: Use cases (SettlementOrchestrator) depend inward on ports (FxRateGateway, LedgerGateway). Adapters (LiveFxRateGateway) implement ports at the edge. Composition root wires adapters into the use case.",
            ru: "Доп. Вопрос 9: 'Свяжите DI с границами Clean Architecture.' — Модельный Ответ: Use case (SettlementOrchestrator) зависит внутрь от портов (FxRateGateway, LedgerGateway). Адаптеры (LiveFxRateGateway) реализуют порты на краю. Composition root вставляет адаптеры в use case."
          }
        },
        {
          id: "blk_di_fup_10",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q10: 'Is Service Locator an acceptable alternative?' — Model Answer: Service Locator hides dependencies like field injection and complicates testing. Prefer explicit constructor DI; avoid ApplicationContext.getBean inside settle().",
            ru: "Доп. Вопрос 10: 'Допустим ли Service Locator как альтернатива?' — Модельный Ответ: Service Locator скрывает зависимости как field injection и усложняет тесты. Предпочитайте явный constructor DI; избегайте ApplicationContext.getBean внутри settle()."
          }
        },
        {
          id: "blk_di_fup_11",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q11: 'What about @Inject vs @Autowired vs no annotation?' — Model Answer: With a single constructor, Spring needs no annotation. @Autowired/@Inject document intent when multiple constructors exist. The style that matters is constructor + final + abstractions.",
            ru: "Доп. Вопрос 11: 'Что насчёт @Inject vs @Autowired vs без аннотации?' — Модельный Ответ: При одном конструкторе Spring не требует аннотации. @Autowired/@Inject документируют intent при нескольких конструкторах. Важен стиль: constructor + final + абстракции."
          }
        },
        {
          id: "blk_di_fup_12",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q12: 'How would ArchUnit / code review catch this incident?' — Model Answer: Ban field @Autowired in application services; ban `new *Gateway` / `new *Adapter` inside domain/application packages; require final collaborator fields. Review checklist: 'Can I unit-test SettlementOrchestrator with two mocks and no Spring?'",
            ru: "Доп. Вопрос 12: 'Как ArchUnit / код-ревью поймали бы этот инцидент?' — Модельный Ответ: Запрет field @Autowired в application services; запрет `new *Gateway` / `new *Adapter` в domain/application пакетах; требование final-полей коллабораторов. Чеклист: «Могу ли я юнит-тестировать SettlementOrchestrator двумя моками без Spring?»"
          }
        }
      ]
    }
  ],
  prerequisiteConceptIds: ["cpt_liskov_substitution"],
  sourceIds: [
    "src_spring_constructor_vs_field",
    "src_clean_architecture_dip",
    "src_martin_fowler_di",
    "src_baeldung_di"
  ],
  verificationStatus: "TECHNICALLY_VERIFIED",
  tags: ["#dependency-injection", "#ioc", "#dip", "#settlement"],
  estimatedMinutes: 15,
  version: "1.0.0"
};

export const THEORY_CHECKPOINTS_DEPENDENCY_INJECTION: readonly TheoryCheckpoint[] = [
  {
    id: "chk_di_1",
    theoryArticleId: "art_theory_dependency_injection",
    question: {
      en: "Why does `new SettlementOrchestrator()` leave `fxRates` null when the field is annotated `@Autowired`?",
      ru: "Почему `new SettlementOrchestrator()` оставляет `fxRates` null, если поле помечено `@Autowired`?"
    },
    explanation: {
      en: "@Autowired is processed by the Spring container (or similar DI runtime). Plain `new` bypasses that wiring, so private field-injected collaborators remain null until something sets them.",
      ru: "@Autowired обрабатывает Spring-контейнер (или аналогичный DI runtime). Обычный `new` обходит эту проводку, поэтому private field-injected коллабораторы остаются null, пока их кто-то не выставит."
    },
    options: [
      {
        id: "opt_di1_a",
        text: {
          en: "Because @Autowired only runs inside a Spring-managed bean lifecycle — `new` never populates field-injected collaborators.",
          ru: "Потому что @Autowired срабатывает только в lifecycle Spring-bean — `new` никогда не заполняет field-injected коллабораторов."
        },
        isCorrect: true,
        feedback: {
          en: "Correct! That is why unit tests NPE on fxRates.getMidRate() while @SpringBootTest stays green.",
          ru: "Верно! Поэтому юнит-тесты падают NPE на fxRates.getMidRate(), а @SpringBootTest остаётся зелёным."
        }
      },
      {
        id: "opt_di1_b",
        text: {
          en: "Because FxRateGateway is an interface and interfaces cannot be instantiated, so the field is always null.",
          ru: "Потому что FxRateGateway — интерфейс и интерфейсы нельзя инстанцировать, поэтому поле всегда null."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Interfaces are injectable when a concrete bean (e.g. LiveFxRateGateway) is registered — the issue is missing container wiring, not the interface type.",
          ru: "Неверно. Интерфейсы внедряемы при зарегистрированном конкретном bean (например LiveFxRateGateway) — проблема в отсутствии проводки контейнера, не в типе интерфейса."
        },
        misconceptionId: "err_interface_always_null"
      },
      {
        id: "opt_di1_c",
        text: {
          en: "Because @Autowired requires the field to be public; private fields are ignored by Spring.",
          ru: "Потому что @Autowired требует public поле; private поля Spring игнорирует."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Spring can inject private fields via reflection — but only when it manages the bean.",
          ru: "Неверно. Spring может инжектить private поля через reflection — но только когда управляет bean."
        }
      }
    ],
    order: 1
  },
  {
    id: "chk_di_2",
    theoryArticleId: "art_theory_dependency_injection",
    question: {
      en: "Which refactor best fixes SettlementOrchestrator's testability and mandatory wiring?",
      ru: "Какой рефакторинг лучше всего чинит тестируемость и обязательную проводку SettlementOrchestrator?"
    },
    explanation: {
      en: "Constructor injection with private final FxRateGateway and LedgerGateway makes deps explicit, fail-fast, and mockable without Spring.",
      ru: "Constructor injection с private final FxRateGateway и LedgerGateway делает зависимости явными, fail-fast и мокаемыми без Spring."
    },
    options: [
      {
        id: "opt_di2_a",
        text: {
          en: "Keep field @Autowired but call ReflectionTestUtils.setField in every unit test.",
          ru: "Оставить field @Autowired, но в каждом юнит-тесте вызывать ReflectionTestUtils.setField."
        },
        isCorrect: false,
        feedback: {
          en: "Incomplete workaround. Tests become brittle and dependencies remain hidden from the type signature.",
          ru: "Неполный workaround. Тесты хрупкие, зависимости остаются скрытыми из сигнатуры типа."
        },
        misconceptionId: "err_reflection_utils_ok"
      },
      {
        id: "opt_di2_b",
        text: {
          en: "Introduce a constructor taking FxRateGateway and LedgerGateway, assign private final fields, remove field @Autowired and in-method `new LiveFxRateGateway()`.",
          ru: "Ввести конструктор с FxRateGateway и LedgerGateway, назначить private final поля, убрать field @Autowired и `new LiveFxRateGateway()` внутри метода."
        },
        isCorrect: true,
        feedback: {
          en: "Correct! Explicit constructor DI + DIP-compliant abstractions is the production-safe fix.",
          ru: "Верно! Явный constructor DI + абстракции по DIP — продакшн-безопасный фикс."
        }
      },
      {
        id: "opt_di2_c",
        text: {
          en: "Replace all unit tests with @SpringBootTest so field injection always works.",
          ru: "Заменить все юнит-тесты на @SpringBootTest, чтобы field injection всегда работал."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Slow integration tests mask the design smell and do not restore DIP or explicit wiring.",
          ru: "Неверно. Медленные интеграционные тесты маскируют запах дизайна и не восстанавливают DIP или явную проводку."
        }
      }
    ],
    order: 2
  },
  {
    id: "chk_di_3",
    theoryArticleId: "art_theory_dependency_injection",
    question: {
      en: "Why does `new LiveFxRateGateway()` inside settle() violate Dependency Inversion?",
      ru: "Почему `new LiveFxRateGateway()` внутри settle() нарушает Dependency Inversion?"
    },
    explanation: {
      en: "High-level SettlementOrchestrator depends on a low-level concrete adapter instead of the FxRateGateway abstraction, blocking substitution and mocking.",
      ru: "Высокоуровневый SettlementOrchestrator зависит от низкоуровневого конкретного адаптера вместо абстракции FxRateGateway, блокируя подстановку и моки."
    },
    options: [
      {
        id: "opt_di3_a",
        text: {
          en: "Because `new` is slower than Spring bean pooling for FX HTTP clients.",
          ru: "Потому что `new` медленнее Spring bean pooling для FX HTTP-клиентов."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. The primary issue is architectural coupling and testability, not micro-performance of allocation.",
          ru: "Неверно. Главная проблема — архитектурная связность и тестируемость, не микро-производительность аллокации."
        }
      },
      {
        id: "opt_di3_b",
        text: {
          en: "Because the high-level settlement policy depends on a concrete low-level FX adapter instead of the FxRateGateway port.",
          ru: "Потому что высокоуровневая политика settlement зависит от конкретного низкоуровневого FX-адаптера вместо порта FxRateGateway."
        },
        isCorrect: true,
        feedback: {
          en: "Correct! DIP requires both modules to depend on abstractions supplied by the composition root.",
          ru: "Верно! DIP требует, чтобы оба модуля зависели от абстракций, поставляемых composition root."
        }
      },
      {
        id: "opt_di3_c",
        text: {
          en: "Because LiveFxRateGateway cannot implement FxRateGateway if constructed with new.",
          ru: "Потому что LiveFxRateGateway не может реализовать FxRateGateway, если создан через new."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. It can implement the interface; the violation is depending on the concretion at the call site.",
          ru: "Неверно. Он может реализовать интерфейс; нарушение — зависимость от конкреции в месте вызова."
        },
        misconceptionId: "err_new_breaks_implements"
      }
    ],
    order: 3
  }
];
