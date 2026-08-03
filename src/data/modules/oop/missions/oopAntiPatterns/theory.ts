import { TheoryArticle, TheoryCheckpoint } from '../../../../../types/domain';

export const THEORY_ARTICLE_ANTI_PATTERNS: TheoryArticle = {
  id: "art_theory_anti_patterns",
  topicIds: ["top_oop_32"],
  conceptIds: ["cpt_anemic_domain_model", "cpt_god_class", "cpt_feature_envy"],
  title: {
    en: "OOP Anti-Patterns: Anemic Domain Model, God Class & Tell Don't Ask",
    ru: "Антипаттерны ООП: Anemic Domain Model, God Class и Tell Don't Ask"
  },
  summary: {
    en: "Anemic Domain Model (Fowler) strips domain objects to getters/setters and pushes rules into procedural services. God Class concentrates unrelated responsibilities into one untestable monolith. Feature Envy / Tell Don't Ask violations appear when OrderFulfillmentService reaches into Order's guts instead of telling Order to place() or reserveInventory().",
    ru: "Anemic Domain Model (Fowler) сводит доменные объекты к getters/setters и выносит правила в процедурные сервисы. God Class концентрирует несвязанные обязанности в одном нетестируемом монолите. Нарушения Feature Envy / Tell Don't Ask возникают, когда OrderFulfillmentService лезет во внутренности Order вместо команды place() или reserveInventory()."
  },
  sections: [
    {
      id: "sec_ap_anemic",
      category: "DEFINITION",
      title: {
        en: "1. Anemic Domain Model (Martin Fowler)",
        ru: "1. Анемичная Доменная Модель (Martin Fowler)"
      },
      blocks: [
        {
          id: "blk_ap_def_1",
          type: "PARAGRAPH",
          content: {
            en: "Martin Fowler coined Anemic Domain Model for designs where domain objects hold data but almost no behavior — typically public getters and setters with validation and workflows living in separate service classes. In order fulfillment, `Order` becomes a bag of fields (`getLines()`, `setStatus()`, `getCardToken()`) while `OrderFulfillmentService` owns every business rule. The object model looks OO on the surface but is procedural underneath.",
            ru: "Martin Fowler назвал Anemic Domain Model дизайном, где доменные объекты держат данные почти без поведения — обычно public getters и setters, а валидация и workflow живут в отдельных сервисных классах. В fulfillment заказов `Order` становится мешком полей (`getLines()`, `setStatus()`, `getCardToken()`), а `OrderFulfillmentService` владеет каждым бизнес-правилом. Объектная модель выглядит ООП снаружи, но процедурная внутри."
          }
        },
        {
          id: "blk_ap_def_2",
          type: "CALLOUT",
          title: {
            en: "💡 Core Mental Model: Behavior Belongs With the Data",
            ru: "💡 Главная Ментальная Модель: Поведение Живёт с Данными"
          },
          content: {
            en: "A rich Order aggregate encapsulates invariants: `place()` refuses empty lines and unpaid totals; `reserveInventory(InventoryService)` coordinates stock without exposing mutable setters. When rules live on Order, they cannot be silently skipped by a second service method that forgot to copy-paste the same `if (order.getLines().isEmpty())` check.",
            ru: "Богатый агрегат Order инкапсулирует инварианты: `place()` отвергает пустые позиции и неоплаченные итоги; `reserveInventory(InventoryService)` координирует остатки без mutable setters. Когда правила живут на Order, их нельзя тихо пропустить вторым методом сервиса, который забыл скопировать тот же `if (order.getLines().isEmpty())`."
          }
        }
      ]
    },
    {
      id: "sec_ap_god_class",
      category: "MECHANICS",
      title: {
        en: "2. God Class, Feature Envy & Tell Don't Ask",
        ru: "2. God Class, Feature Envy и Tell Don't Ask"
      },
      blocks: [
        {
          id: "blk_ap_god_1",
          type: "PARAGRAPH",
          content: {
            en: "A God Class knows too much and does too much. `OrderFulfillmentService` validates order, reserves inventory, charges the card, sends email, updates shipment, and writes audit — often across thousands of lines. Cohesion collapses: changing email templates requires touching the same class that mutates payment state. Unit tests cannot stub inventory without also wiring SMTP and card processors.",
            ru: "God Class знает слишком много и делает слишком много. `OrderFulfillmentService` валидирует заказ, резервирует инвентарь, списывает карту, шлёт email, обновляет отгрузку и пишет audit — часто на тысячи строк. Cohesion падает: смена email-шаблонов требует правки того же класса, что мутирует платёжное состояние. Unit-тесты не могут застабить инвентарь без SMTP и карточных процессоров."
          }
        },
        {
          id: "blk_ap_god_2",
          type: "WARNING",
          title: {
            en: "⚙️ Feature Envy: Asking Instead of Telling",
            ru: "⚙️ Feature Envy: Спрашивать Вместо Приказывать"
          },
          content: {
            en: "Feature Envy appears when a method uses another object's data more than its own. Classic smell in fulfillment:\n```java\nif (order.getLines().isEmpty()) throw ...;\nint total = order.getLines().stream().mapToInt(OrderLine::getPrice).sum();\npayment.charge(order.getCardToken(), total);\norder.setStatus(\"PAID\");\n```\nTell Don't Ask fixes this: `order.place(paymentCapturePort)` — Order computes total, validates, and captures payment without exporting its guts.",
            ru: "Feature Envy возникает, когда метод использует данные другого объекта больше своих. Классический запах в fulfillment:\n```java\nif (order.getLines().isEmpty()) throw ...;\nint total = order.getLines().stream().mapToInt(OrderLine::getPrice).sum();\npayment.charge(order.getCardToken(), total);\norder.setStatus(\"PAID\");\n```\nTell Don't Ask исправляет это: `order.place(paymentCapturePort)` — Order считает итог, валидирует и списывает оплату, не экспортируя внутренности."
          }
        },
        {
          id: "blk_ap_god_3",
          type: "CALLOUT",
          title: {
            en: "📜 Production Failure Pattern Decoded",
            ru: "📜 Расшифровка Паттерна Прод-Сбоя"
          },
          content: {
            en: "Symptom: warehouse reserved stock and shipment marked READY while payment capture failed. Root cause: God Class sequenced side effects via setters (`order.setReserved(true); order.setShipmentStatus(\"READY\");`) before `chargeCard()` returned success, with duplicated validation that one path skipped. Rich aggregate + ports: `order.place(payment)` then `order.reserveInventory(inventory)` — each step fails closed on invariants.",
            ru: "Симптом: склад зарезервировал остаток и отгрузка помечена READY, пока списание карты упало. Причина: God Class выстроил side effects через setters (`order.setReserved(true); order.setShipmentStatus(\"READY\");`) до успеха `chargeCard()`, с дублированной валидацией, которую один путь пропустил. Богатый агрегат + порты: `order.place(payment)` затем `order.reserveInventory(inventory)` — каждый шаг fail-closed по инвариантам."
          }
        }
      ]
    },
    {
      id: "sec_ap_refactor_tradeoffs",
      category: "TRADE_OFFS",
      title: {
        en: "3. Refactoring Strategies: Rich Aggregate + Segregated Ports",
        ru: "3. Стратегии Рефакторинга: Богатый Агрегат + Выделенные Порты"
      },
      blocks: [
        {
          id: "blk_ap_res_1",
          type: "PARAGRAPH",
          content: {
            en: "Production refactor for OrderFulfillmentService typically:\n1. Promote Order to a rich aggregate with `place(PaymentCapturePort)` and `reserveInventory(InventoryService)`.\n2. Remove public setters that bypass invariants.\n3. Keep a thin application service that orchestrates ports — email and audit as separate collaborators, not methods on Order.\n4. Segregate `PaymentCapturePort` (ISP) so inventory tests never depend on card SDKs.",
            ru: "Типичный продакшн-рефакторинг OrderFulfillmentService:\n1. Поднять Order до богатого агрегата с `place(PaymentCapturePort)` и `reserveInventory(InventoryService)`.\n2. Убрать public setters, обходящие инварианты.\n3. Оставить тонкий application service, оркестрирующий порты — email и audit как отдельные коллабораторы, не методы Order.\n4. Выделить `PaymentCapturePort` (ISP), чтобы тесты инвентаря не зависели от карточных SDK."
          }
        },
        {
          id: "blk_ap_res_2",
          type: "CALLOUT",
          title: {
            en: "🔧 Trade-off: Not Every DTO Must Become Rich",
            ru: "🔧 Компромисс: Не Каждый DTO Должен Стать Богатым"
          },
          content: {
            en: "Transport DTOs at API boundaries may remain anemic by design. The anti-pattern is using the *same* anemic Order as the core domain model that holds invariants. Senior guidance: keep boundary mappers anemic; keep the Order aggregate rich where business rules live. Avoid inventing a second God Class named OrderDomainService that re-creates the same Feature Envy.",
            ru: "Transport DTO на границах API могут оставаться анемичными по дизайну. Антипаттерн — использовать *тот же* анемичный Order как ядро домена с инвариантами. Senior-подход: boundary mappers анемичны; агрегат Order богат там, где живут бизнес-правила. Не изобретайте второй God Class OrderDomainService, воссоздающий тот же Feature Envy."
          }
        }
      ]
    },
    {
      id: "sec_ap_interview_followups",
      category: "INTERVIEW_GUIDANCE",
      title: {
        en: "4. Senior Interview Follow-Up Questions: Anti-Patterns",
        ru: "4. Дополнительные Вопросы Senior-Интервью: Антипаттерны"
      },
      blocks: [
        {
          id: "blk_ap_fup_01",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q1: 'What is an Anemic Domain Model according to Martin Fowler?' — Model Answer: Domain objects that are little more than bags of getters and setters, with all business logic living in separate service classes. It looks object-oriented but is effectively procedural, losing encapsulation of invariants.",
            ru: "Доп. Вопрос 1: 'Что такое Anemic Domain Model по Martin Fowler?' — Модельный Ответ: Доменные объекты — почти только мешки getters и setters, вся бизнес-логика в отдельных сервисных классах. Выглядит объектно-ориентированно, но по сути процедурно, теряя инкапсуляцию инвариантов."
          }
        },
        {
          id: "blk_ap_fup_02",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q2: 'How do you recognize a God Class in order fulfillment?' — Model Answer: One class owns validation, inventory, payment, email, shipment, and audit; changes in any concern require editing the same file; tests cannot isolate collaborators; method count and line count explode (e.g., 4000-line OrderFulfillmentService).",
            ru: "Доп. Вопрос 2: 'Как распознать God Class в fulfillment заказов?' — Модельный Ответ: Один класс владеет валидацией, инвентарём, оплатой, email, отгрузкой и audit; любое изменение требует правки того же файла; тесты не изолируют коллабораторов; число методов и строк взрывается (например, OrderFulfillmentService на 4000 строк)."
          }
        },
        {
          id: "blk_ap_fup_03",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q3: 'What is Feature Envy and how does it relate to Tell Don't Ask?' — Model Answer: Feature Envy is when a method uses another object's data more than its own. Tell Don't Ask says command the object to perform behavior (`order.place(...)`) instead of asking for fields and deciding outside (`order.getLines()`, `order.setStatus(...)`).",
            ru: "Доп. Вопрос 3: 'Что такое Feature Envy и как он связан с Tell Don't Ask?' — Модельный Ответ: Feature Envy — когда метод использует данные другого объекта больше своих. Tell Don't Ask говорит командовать объекту выполнить поведение (`order.place(...)`) вместо запроса полей и решений снаружи (`order.getLines()`, `order.setStatus(...)`)."
          }
        },
        {
          id: "blk_ap_fup_04",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q4: 'Why does anemic Order cause duplicated validation?' — Model Answer: Rules live in the service, not the object. Every new entry point (admin cancel, retry fulfill, bulk import) re-implements `if (lines empty)` / total checks. Miss one path — production ships invalid or unpaid orders.",
            ru: "Доп. Вопрос 4: 'Почему анемичный Order вызывает дублированную валидацию?' — Модельный Ответ: Правила живут в сервисе, не в объекте. Каждая новая точка входа (admin cancel, retry fulfill, bulk import) заново реализует `if (lines empty)` / проверки итога. Пропустите один путь — на проде уйдут невалидные или неоплаченные заказы."
          }
        },
        {
          id: "blk_ap_fup_05",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q5: 'Should email sending live on the Order aggregate?' — Model Answer: Usually no. Domain rules (can this order be placed? can inventory be reserved?) belong on Order. Infrastructure side effects (SMTP, audit log writers) belong on application services or ports. Mixing them recreates a God Aggregate.",
            ru: "Доп. Вопрос 5: 'Должна ли отправка email жить на агрегате Order?' — Модельный Ответ: Обычно нет. Доменные правила (можно ли place? можно ли reserve?) — на Order. Инфраструктурные side effects (SMTP, audit writers) — на application services или портах. Смешение воссоздаёт God Aggregate."
          }
        },
        {
          id: "blk_ap_fup_06",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q6: 'How does ISP help refactor OrderFulfillmentService?' — Model Answer: Segregate narrow ports like PaymentCapturePort and InventoryService. Clients depend only on what they need. Tests stub payment without inventory, and inventory without email — impossible when one God Class constructor takes eight concrete SDKs.",
            ru: "Доп. Вопрос 6: 'Как ISP помогает рефакторить OrderFulfillmentService?' — Модельный Ответ: Выделяйте узкие порты вроде PaymentCapturePort и InventoryService. Клиенты зависят только от нужного. Тесты стабят оплату без инвентаря и инвентарь без email — невозможно, когда конструктор God Class принимает восемь конкретных SDK."
          }
        },
        {
          id: "blk_ap_fup_07",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q7: 'Is every service class an anti-pattern?' — Model Answer: No. Thin application services that orchestrate rich aggregates and ports are healthy. The anti-pattern is a procedural service owning all domain logic while entities stay anemic — especially when it also becomes a God Class spanning many concerns.",
            ru: "Доп. Вопрос 7: 'Каждый ли сервисный класс — антипаттерн?' — Модельный Ответ: Нет. Тонкие application services, оркестрирующие богатые агрегаты и порты, здоровы. Антипаттерн — процедурный сервис, владеющий всей доменной логикой при анемичных сущностях — особенно когда он ещё и God Class на многие concerns."
          }
        },
        {
          id: "blk_ap_fup_08",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q8: 'How would you migrate a 4000-line God Class safely?' — Model Answer: Strangle by extracting one concern at a time (payment capture port first), move invariants onto Order, delete setters, add characterization tests around fulfill(), then shrink the service to orchestration. Avoid a big-bang rewrite that freezes Black Friday hotfixes.",
            ru: "Доп. Вопрос 8: 'Как безопасно мигрировать God Class на 4000 строк?' — Модельный Ответ: Strangle — извлекать по одному concern (сначала payment capture port), переносить инварианты на Order, удалять setters, добавлять characterization-тесты вокруг fulfill(), затем сжимать сервис до оркестрации. Избегать big-bang rewrite, блокирующего хотфиксы Black Friday."
          }
        },
        {
          id: "blk_ap_fup_09",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q9: 'What is the difference between rich domain model and Active Record?' — Model Answer: Rich domain model puts behavior with data and may call ports for side effects. Active Record often couples persistence CRUD onto the entity itself. Prefer Order with domain methods + repository/ports over Order.save() that hides SQL and payment capture together.",
            ru: "Доп. Вопрос 9: 'Чем rich domain model отличается от Active Record?' — Модельный Ответ: Богатая модель кладёт поведение с данными и может вызывать порты для side effects. Active Record часто связывает CRUD персистентности с самой сущностью. Предпочитайте Order с доменными методами + repository/ports вместо Order.save(), прячущего SQL и списание карты вместе."
          }
        },
        {
          id: "blk_ap_fup_10",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q10: 'How do Clean Code / Head First OOA&D frame God Class?' — Model Answer: Clean Code treats it as a cohesion smell — classes should have one reason to change (SRP). Head First OOA&D emphasizes encapsulating what varies and assigning responsibilities so objects do their own work instead of a 'smart' controller class micromanaging dumb data holders.",
            ru: "Доп. Вопрос 10: 'Как Clean Code / Head First OOA&D описывают God Class?' — Модельный Ответ: Clean Code — запах cohesion: у класса одна причина меняться (SRP). Head First OOA&D — инкапсулировать изменяемое и назначать обязанности так, чтобы объекты делали свою работу, а не 'умный' контроллер микроменеджил тупые data holders."
          }
        },
        {
          id: "blk_ap_fup_11",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q11: 'Can anemic models be acceptable with CQRS read models?' — Model Answer: Yes for read-side projections and API DTOs that never enforce write invariants. Write-side Order commands must still protect invariants. Do not justify a God Class fulfill() by pointing at anemic read DTOs.",
            ru: "Доп. Вопрос 11: 'Допустимы ли анемичные модели с CQRS read models?' — Модельный Ответ: Да для read-side проекций и API DTO, не охраняющих write-инварианты. Write-side команды Order всё равно должны защищать инварианты. Не оправдывайте God Class fulfill() анемичными read DTO."
          }
        },
        {
          id: "blk_ap_fup_12",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q12: 'What ArchUnit / review rules catch these smells?' — Model Answer: Ban public setters on Order aggregate; forbid domain package depending on SMTP/card SDK concretions; limit lines/methods per class; flag service methods that call more than N getters on the same entity. Pair with review checklist: Tell Don't Ask on Order mutations.",
            ru: "Доп. Вопрос 12: 'Какие ArchUnit / review правила ловят эти запахи?' — Модельный Ответ: Запрет public setters на агрегате Order; запрет зависимости domain-пакета от SMTP/карточных SDK; лимит строк/методов на класс; флаг методов сервиса с >N getters одного entity. Плюс чеклист ревью: Tell Don't Ask на мутациях Order."
          }
        }
      ]
    }
  ],
  prerequisiteConceptIds: ["cpt_encapsulation"],
  sourceIds: [
    "src_fowler_anemic_domain_model",
    "src_clean_code_god_class",
    "src_head_first_ooad",
    "src_baeldung_rich_vs_anemic"
  ],
  verificationStatus: "TECHNICALLY_VERIFIED",
  tags: ["#anti-patterns", "#god-class", "#anemic-model", "#feature-envy", "#tell-dont-ask"],
  estimatedMinutes: 18,
  version: "1.0.0"
};

export const THEORY_CHECKPOINTS_ANTI_PATTERNS: readonly TheoryCheckpoint[] = [
  {
    id: "chk_ap_1",
    theoryArticleId: "art_theory_anti_patterns",
    question: {
      en: "What defines Fowler's Anemic Domain Model in the Order fulfillment design?",
      ru: "Что определяет Anemic Domain Model по Fowler в дизайне fulfillment заказов?"
    },
    explanation: {
      en: "Order holds getters/setters only while OrderFulfillmentService owns all business rules — procedural logic with an OO veneer.",
      ru: "Order держит только getters/setters, а OrderFulfillmentService владеет всеми бизнес-правилами — процедурная логика с ООП-обёрткой."
    },
    options: [
      {
        id: "opt_ap1_a",
        text: {
          en: "Order is a DTO with getters/setters only; all validation and workflows live in OrderFulfillmentService.",
          ru: "Order — DTO только с getters/setters; вся валидация и workflow живут в OrderFulfillmentService."
        },
        isCorrect: true,
        feedback: {
          en: "Correct! That is the classic Anemic Domain Model Fowler warned about.",
          ru: "Верно! Это классическая Anemic Domain Model, о которой предупреждал Fowler."
        }
      },
      {
        id: "opt_ap1_b",
        text: {
          en: "Order has place() and reserveInventory() methods that encapsulate invariants.",
          ru: "У Order есть методы place() и reserveInventory(), инкапсулирующие инварианты."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. That describes a rich domain aggregate — the opposite of anemia.",
          ru: "Неверно. Это описывает богатый доменный агрегат — противоположность анемии."
        }
      },
      {
        id: "opt_ap1_c",
        text: {
          en: "Any class over 500 lines is automatically an Anemic Domain Model.",
          ru: "Любой класс длиннее 500 строк автоматически является Anemic Domain Model."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Line count may indicate a God Class, but anemia specifically means behaviorless domain objects.",
          ru: "Неверно. Число строк может указывать на God Class, но анемия — это именно доменные объекты без поведения."
        },
        misconceptionId: "err_lines_equal_anemic"
      }
    ],
    order: 1
  },
  {
    id: "chk_ap_2",
    theoryArticleId: "art_theory_anti_patterns",
    question: {
      en: "Which smell is shown by order.getLines() / order.setStatus() decisions inside OrderFulfillmentService?",
      ru: "Какой запах показан решениями order.getLines() / order.setStatus() внутри OrderFulfillmentService?"
    },
    explanation: {
      en: "Feature Envy / Tell Don't Ask: the service uses Order's data more than its own instead of telling Order to place().",
      ru: "Feature Envy / Tell Don't Ask: сервис использует данные Order больше своих вместо команды Order.place()."
    },
    options: [
      {
        id: "opt_ap2_a",
        text: {
          en: "Feature Envy / Tell Don't Ask — service reaches into Order's guts instead of telling Order to act.",
          ru: "Feature Envy / Tell Don't Ask — сервис лезет во внутренности Order вместо команды Order действовать."
        },
        isCorrect: true,
        feedback: {
          en: "Correct! Tell Order to place()/reserveInventory() instead of asking for fields.",
          ru: "Верно! Командуйте Order.place()/reserveInventory() вместо запроса полей."
        }
      },
      {
        id: "opt_ap2_b",
        text: {
          en: "Diamond inheritance conflict between Order and OrderLine interfaces.",
          ru: "Конфликт наследования-ромба между интерфейсами Order и OrderLine."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. This mission is about anemic models and God Class, not default-method diamonds.",
          ru: "Неверно. Эта миссия об анемичных моделях и God Class, не о ромбе default-методов."
        }
      },
      {
        id: "opt_ap2_c",
        text: {
          en: "Liskov Substitution violation because OrderLine cannot replace Order.",
          ru: "Нарушение LSP, потому что OrderLine не может заменить Order."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. LSP is about behavioral subtyping, not getter-based service orchestration.",
          ru: "Неверно. LSP — про поведенческий subtyping, не про оркестрацию через getters."
        },
        misconceptionId: "err_lsp_for_feature_envy"
      }
    ],
    order: 2
  },
  {
    id: "chk_ap_3",
    theoryArticleId: "art_theory_anti_patterns",
    question: {
      en: "What is the preferred refactor for a 4000-line OrderFulfillmentService God Class?",
      ru: "Какой предпочтительный рефакторинг для God Class OrderFulfillmentService на 4000 строк?"
    },
    explanation: {
      en: "Rich Order aggregate with place()/reserveInventory(), plus InventoryService and PaymentCapturePort; thin orchestration.",
      ru: "Богатый агрегат Order с place()/reserveInventory(), плюс InventoryService и PaymentCapturePort; тонкая оркестрация."
    },
    options: [
      {
        id: "opt_ap3_a",
        text: {
          en: "Move domain behavior onto rich Order; segregate InventoryService and PaymentCapturePort; keep a thin orchestrator.",
          ru: "Перенести доменное поведение на богатый Order; выделить InventoryService и PaymentCapturePort; оставить тонкий оркестратор."
        },
        isCorrect: true,
        feedback: {
          en: "Correct! Rich aggregate + segregated ports shrinks the God Class into orchestration.",
          ru: "Верно! Богатый агрегат + выделенные порты сжимают God Class до оркестрации."
        }
      },
      {
        id: "opt_ap3_b",
        text: {
          en: "Split into six God Classes of ~700 lines each that still call Order setters.",
          ru: "Разбить на шесть God Class по ~700 строк, всё ещё вызывающих setters Order."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Splitting without moving behavior leaves anemia and Feature Envy intact.",
          ru: "Неверно. Разбиение без переноса поведения оставляет анемию и Feature Envy."
        },
        misconceptionId: "err_split_god_without_behavior"
      },
      {
        id: "opt_ap3_c",
        text: {
          en: "Make Order extend OrderFulfillmentService so all methods inherit automatically.",
          ru: "Сделать Order наследником OrderFulfillmentService, чтобы все методы наследовались автоматически."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Inheritance would worsen coupling and recreate a God hierarchy.",
          ru: "Неверно. Наследование ухудшит coupling и воссоздаст God-иерархию."
        }
      }
    ],
    order: 3
  }
];
