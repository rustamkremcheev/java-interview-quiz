import { TheoryArticle, TheoryCheckpoint, LocalizedText } from '../../../../../types/domain';

interface TheoryInterviewFollowUp {
  readonly id: string;
  readonly theoryArticleId: string;
  readonly question: LocalizedText;
  readonly modelAnswer: LocalizedText;
  readonly relatedConceptIds: readonly string[];
  readonly order: number;
}

export const THEORY_ARTICLE_COMPOSITION: TheoryArticle = {
  id: "art_theory_composition",
  topicIds: ["top_oop_16"],
  conceptIds: ["cpt_composition_over_inheritance", "cpt_fragile_base_class"],
  title: {
    en: "Composition over Inheritance & the Fragile Base Class Problem",
    ru: "Композиция вместо Наследования и Проблема Хрупкого Базового Класса"
  },
  summary: {
    en: "Subclassing concrete NotificationService to add delivery metrics creates double-counting bugs and silent breakage on platform upgrades. Composition via EmailSender/SmsSender strategies and counting wrappers eliminates fragile base class coupling.",
    ru: "Наследование конкретного NotificationService для метрик доставки создает баги двойного подсчета и тихие поломки при обновлении платформы. Композиция через стратегии EmailSender/SmsSender и counting-обертки устраняет связность с хрупким базовым классом."
  },
  sections: [
    {
      id: "sec_comp_definition",
      category: "DEFINITION",
      title: {
        en: "1. Why Subclassing Concrete NotificationService Is Dangerous",
        ru: "1. Почему Наследование Конкретного NotificationService Опасно"
      },
      blocks: [
        {
          id: "blk_comp_def_1",
          type: "PARAGRAPH",
          content: {
            en: "Effective Java Item 18 states: 'Inheritance violates encapsulation.' When EmailNotificationService extends NotificationService, it depends on NotificationService's internal implementation details — which methods call which other methods, batching optimizations, and delivery routing. These details are NOT part of NotificationService's public API contract and can change in any platform release.",
            ru: "Effective Java Item 18 утверждает: 'Наследование нарушает инкапсуляцию.' Когда EmailNotificationService расширяет NotificationService, он зависит от внутренних деталей реализации NotificationService — какие методы вызывают другие, пакетные оптимизации и маршрутизация доставки. Эти детали НЕ входят в публичный API-контракт NotificationService и могут измениться в любом релизе платформы."
          }
        },
        {
          id: "blk_comp_def_2",
          type: "CALLOUT",
          title: {
            en: "💡 Core Mental Model: White-Box vs Black-Box Reuse",
            ru: "💡 Главная Ментальная Модель: White-Box vs Black-Box Reuse"
          },
          content: {
            en: "Inheritance is white-box reuse: the subclass sees and depends on superclass internals. Composition is black-box reuse: NotificationDispatcher knows only the EmailSender and SmsSender public contracts and delegates without depending on NotificationService's internal sendBatch→send call chain.",
            ru: "Наследование — это white-box reuse: подкласс видит и зависит от внутренностей суперкласса. Композиция — black-box reuse: NotificationDispatcher знает только публичные контракты EmailSender и SmsSender и делегирует без зависимости от внутренней цепочки sendBatch→send."
          }
        }
      ]
    },
    {
      id: "sec_double_count_mechanics",
      category: "MECHANICS",
      title: {
        en: "2. The Double-Counting Call Chain: sendBatch() → send()",
        ru: "2. Цепочка Двойного Подсчета: sendBatch() → send()"
      },
      blocks: [
        {
          id: "blk_comp_mech_1",
          type: "PARAGRAPH",
          content: {
            en: "The broken EmailNotificationService overrides both send() (incrementing deliveryCount per notification) and sendBatch() (adding batch.size() before calling super.sendBatch()). NotificationService.sendBatch() internally calls send(n) for each recipient. Result: each Notification is added to deliveryCount TWICE — once in sendBatch()'s pre-count and again when send() fires for each delegated delivery.",
            ru: "Сломанный EmailNotificationService переопределяет send() (увеличивает deliveryCount за уведомление) и sendBatch() (добавляет batch.size() перед super.sendBatch()). NotificationService.sendBatch() внутренне вызывает send(n) для каждого получателя. Итог: каждое Notification добавляется к deliveryCount ДВАЖДЫ — в предварительном подсчете sendBatch() и снова при вызове send() для каждой делегированной доставки."
          }
        },
        {
          id: "blk_comp_mech_2",
          type: "WARNING",
          title: {
            en: "⚙️ Platform Upgrade Silent Breakage",
            ru: "⚙️ Тихая Поломка при Обновлении Платформы"
          },
          content: {
            en: "Platform maintainers may refactor NotificationService.sendBatch() to use internal bulk delivery paths that bypass send() in some cases — or change WHEN send() is invoked. Your subclass assumptions about call chains are not guaranteed. The compiler emits zero warnings when base class internals change. Email and SMS metrics then silently diverge.",
            ru: "Разработчики платформы могут рефакторить NotificationService.sendBatch() для использования внутренних пакетных путей, обходящих send() в некоторых случаях — или менять КОГДА вызывается send(). Предположения подкласса о цепочках вызовов не гарантированы. Компилятор не выдает предупреждений при изменении внутренностей базового класса. Метрики email и SMS затем тихо расходятся."
          }
        }
      ]
    },
    {
      id: "sec_forwarding_wrapper",
      category: "TRADE_OFFS",
      title: {
        en: "3. The Composition Solution (Strategy + Counting Wrapper)",
        ru: "3. Решение через Композицию (Strategy + Counting-Обертка)"
      },
      blocks: [
        {
          id: "blk_comp_fwd_1",
          type: "PARAGRAPH",
          content: {
            en: "The production fix replaces `extends NotificationService` with NotificationDispatcher holding private final EmailSender and SmsSender delegates. CountingNotificationService wraps a NotificationSender and increments deliveryCount only in send(). sendBatch() routes through send() explicitly — each delivery counted exactly once, with no dependency on concrete NotificationService internals.",
            ru: "Продакшн-фикс заменяет `extends NotificationService` на NotificationDispatcher с private final делегатами EmailSender и SmsSender. CountingNotificationService оборачивает NotificationSender и увеличивает deliveryCount только в send(). sendBatch() явно маршрутизирует через send() — каждая доставка считается ровно один раз, без зависимости от внутренностей конкретного NotificationService."
          }
        },
        {
          id: "blk_comp_fwd_2",
          type: "CALLOUT",
          title: {
            en: "🔧 Effective Java Item 18 Applied to Notifications",
            ru: "🔧 Effective Java Item 18 для Уведомлений"
          },
          content: {
            en: "Joshua Bloch's guidance (Item 18) favors composition for extending behavior of concrete classes not designed for inheritance. EmailNotificationService should compose EmailSender/SmsSender strategies and optionally wrap with a counting decorator — never subclass concrete NotificationService to instrument both send() and sendBatch().",
            ru: "Руководство Joshua Bloch (Item 18) предпочитает композицию для расширения поведения конкретных классов, не спроектированных для наследования. EmailNotificationService должен компоновать стратегии EmailSender/SmsSender и опционально оборачивать counting-декоратором — никогда не наследовать конкретный NotificationService для инструментирования одновременно send() и sendBatch()."
          }
        }
      ]
    }
  ],
  prerequisiteConceptIds: [],
  sourceIds: ["src_effective_java_item18", "src_gof_decorator_pattern", "src_fowler_composition"],
  verificationStatus: "TECHNICALLY_VERIFIED",
  tags: ["#composition", "#fragile-base-class", "#strategy", "#notification-service"],
  estimatedMinutes: 15,
  version: "1.0.0"
};

export const THEORY_CHECKPOINTS_COMPOSITION: readonly TheoryCheckpoint[] = [
  {
    id: "chk_comp_1",
    theoryArticleId: "art_theory_composition",
    question: {
      en: "Why does EmailNotificationService double-count deliveries when sendBatch() is called?",
      ru: "Почему EmailNotificationService дважды считает доставки при вызове sendBatch()?"
    },
    explanation: {
      en: "sendBatch() pre-increments deliveryCount by batch.size(), then super.sendBatch() internally calls send() for each recipient, incrementing again.",
      ru: "sendBatch() предварительно увеличивает deliveryCount на batch.size(), затем super.sendBatch() внутренне вызывает send() для каждого получателя, увеличивая счетчик снова."
    },
    options: [
      {
        id: "opt_comp1_a",
        text: {
          en: "Because NotificationService.sendBatch() internally calls send() for each recipient, and both methods increment deliveryCount.",
          ru: "Потому что NotificationService.sendBatch() внутренне вызывает send() для каждого получателя, и оба метода увеличивают deliveryCount."
        },
        isCorrect: true,
        feedback: {
          en: "Correct! This is the classic fragile base class double-counting bug (Effective Java Item 18 pattern).",
          ru: "Верно! Это классический баг двойного подсчета хрупкого базового класса (паттерн Effective Java Item 18)."
        }
      },
      {
        id: "opt_comp1_b",
        text: {
          en: "Because NotificationService uses multiple threads during sendBatch() causing race conditions on the counter.",
          ru: "Потому что NotificationService использует несколько потоков при sendBatch(), вызывая состояние гонки на счетчике."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. The double-count is deterministic single-threaded behavior from method call delegation, not concurrency.",
          ru: "Неверно. Двойной подсчет — детерминированное однопоточное поведение от делегирования вызовов, а не конкурентность."
        }
      },
      {
        id: "opt_comp1_c",
        text: {
          en: "Because Notification.equals() changes between sendBatch() pre-count and send() invocation.",
          ru: "Потому что Notification.equals() меняется между предварительным подсчетом sendBatch() и вызовом send()."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. The bug is about counter increment logic, not equality instability.",
          ru: "Неверно. Баг связан с логикой инкремента счетчика, а не с нестабильностью equals."
        },
        misconceptionId: "err_inheritance_double_count"
      }
    ],
    order: 1
  },
  {
    id: "chk_comp_2",
    theoryArticleId: "art_theory_composition",
    question: {
      en: "What is the Fragile Base Class Problem in the context of extending NotificationService?",
      ru: "Что такое проблема хрупкого базового класса в контексте расширения NotificationService?"
    },
    explanation: {
      en: "Subclasses depend on superclass internal implementation details that are not part of the public API and can change without compiler warnings.",
      ru: "Подклассы зависят от внутренних деталей реализации суперкласса, не входящих в публичный API и способных измениться без предупреждений компилятора."
    },
    options: [
      {
        id: "opt_comp2_a",
        text: {
          en: "The subclass depends on undocumented internal call chains of the base class that can change in platform updates.",
          ru: "Подкласс зависит от недокументированных внутренних цепочек вызовов базового класса, которые могут измениться при обновлении платформы."
        },
        isCorrect: true,
        feedback: {
          en: "Correct! This is why Effective Java recommends composition over inheritance for concrete classes not designed for extension.",
          ru: "Верно! Поэтому Effective Java рекомендует композицию вместо наследования для конкретных классов, не спроектированных для расширения."
        }
      },
      {
        id: "opt_comp2_b",
        text: {
          en: "The base class has too many public methods making the API confusing.",
          ru: "Базовый класс имеет слишком много публичных методов, делая API запутанным."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Fragile base class refers to implementation dependency, not API surface area.",
          ru: "Неверно. Хрупкий базовый класс относится к зависимости от реализации, а не к размеру API."
        }
      },
      {
        id: "opt_comp2_c",
        text: {
          en: "The base class is marked final preventing extension.",
          ru: "Базовый класс помечен final, запрещая расширение."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. NotificationService is not final — the problem is that it SHOULD NOT be extended despite being extendable.",
          ru: "Неверно. NotificationService не final — проблема в том, что его НЕ следует расширять, несмотря на возможность."
        },
        misconceptionId: "err_fragile_base_class_subclass"
      }
    ],
    order: 2
  },
  {
    id: "chk_comp_3",
    theoryArticleId: "art_theory_composition",
    question: {
      en: "What is the production-safe fix for EmailNotificationService?",
      ru: "Какое безопасное продакшн-решение для EmailNotificationService?"
    },
    explanation: {
      en: "Replace inheritance with composition: NotificationDispatcher holding EmailSender/SmsSender strategies, plus a counting wrapper that instruments only send().",
      ru: "Заменить наследование композицией: NotificationDispatcher со стратегиями EmailSender/SmsSender плюс counting-обертка, инструментирующая только send()."
    },
    options: [
      {
        id: "opt_comp3_a",
        text: {
          en: "Replace `extends NotificationService` with a dispatcher composing EmailSender and SmsSender strategies (optionally wrap NotificationSender for counting).",
          ru: "Заменить `extends NotificationService` диспетчером, компонующим стратегии EmailSender и SmsSender (опционально обернуть NotificationSender для подсчета)."
        },
        isCorrect: true,
        feedback: {
          en: "Correct! This is Strategy/Decorator composition from Effective Java Item 18 and GoF.",
          ru: "Верно! Это композиция Strategy/Decorator из Effective Java Item 18 и GoF."
        }
      },
      {
        id: "opt_comp3_b",
        text: {
          en: "Add synchronized keyword to send() and sendBatch() to prevent double-counting.",
          ru: "Добавить synchronized к send() и sendBatch() для предотвращения двойного подсчета."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Synchronization does not fix deterministic double-increment in single-threaded call chains.",
          ru: "Неверно. Синхронизация не исправляет детерминированный двойной инкремент в однопоточных цепочках вызовов."
        }
      },
      {
        id: "opt_comp3_c",
        text: {
          en: "Remove the send() override and only count in sendBatch() since bulk delivery is the primary use case.",
          ru: "Удалить переопределение send() и считать только в sendBatch(), так как массовая доставка — основной сценарий."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Individual send() calls would then not be instrumented, and the fragile base class dependency remains.",
          ru: "Неверно. Одиночные вызовы send() не будут инструментированы, а зависимость от хрупкого базового класса сохранится."
        },
        misconceptionId: "err_subclass_concrete_collection"
      }
    ],
    order: 3
  }
];

export const THEORY_FOLLOW_UPS_COMPOSITION: readonly TheoryInterviewFollowUp[] = [
  {
    id: "fu_comp_01",
    theoryArticleId: "art_theory_composition",
    question: {
      en: "When is inheritance appropriate vs when should you always use composition?",
      ru: "Когда наследование уместно, а когда всегда следует использовать композицию?"
    },
    modelAnswer: {
      en: "Inheritance is appropriate when there is a genuine is-a relationship AND the base class was designed for extension (documented hooks, stable call chains). Composition is mandatory when extending concrete platform classes (NotificationService and similar) or adding instrumentation/cross-cutting behavior.",
      ru: "Наследование уместно при genuine is-a отношении И когда базовый класс спроектирован для расширения. Композиция обязательна при расширении конкретных платформенных классов (NotificationService и аналоги) или добавлении инструментирования."
    },
    relatedConceptIds: ["cpt_composition_over_inheritance"],
    order: 1
  },
  {
    id: "fu_comp_02",
    theoryArticleId: "art_theory_composition",
    question: {
      en: "How does the Strategy/Decorator Pattern relate to NotificationDispatcher?",
      ru: "Как паттерн Strategy/Decorator связан с NotificationDispatcher?"
    },
    modelAnswer: {
      en: "NotificationDispatcher composes EmailSender and SmsSender strategies for channel routing. CountingNotificationService is a Decorator: it wraps a NotificationSender, adds instrumentation (deliveryCount), and forwards delivery operations. Unlike inheritance, neither depends on NotificationService internals.",
      ru: "NotificationDispatcher компонует стратегии EmailSender и SmsSender для маршрутизации каналов. CountingNotificationService — Decorator: оборачивает NotificationSender, добавляет инструментирование (deliveryCount) и перенаправляет операции доставки. В отличие от наследования, ни один не зависит от внутренностей NotificationService."
    },
    relatedConceptIds: ["cpt_composition_over_inheritance"],
    order: 2
  },
  {
    id: "fu_comp_03",
    theoryArticleId: "art_theory_composition",
    question: {
      en: "Why did the platform upgrade change when the double-count bug manifests?",
      ru: "Почему обновление платформы изменило момент проявления бага двойного подсчета?"
    },
    modelAnswer: {
      en: "Platform maintainers refactored NotificationService.sendBatch() internal bulk delivery logic. Subclasses assumed sendBatch() always calls send() per recipient, but optimized paths may bypass send() in some versions — making email/SMS metric breakage intermittent and version-dependent.",
      ru: "Разработчики платформы рефакторили внутреннюю логику пакетной доставки NotificationService.sendBatch(). Подклассы предполагали, что sendBatch() всегда вызывает send(), но оптимизированные пути могут обходить send() — делая поломку метрик email/SMS прерывистой и зависимой от версии."
    },
    relatedConceptIds: ["cpt_fragile_base_class"],
    order: 3
  },
  {
    id: "fu_comp_04",
    theoryArticleId: "art_theory_composition",
    question: {
      en: "Should sendBatch() in the counting wrapper also independently increment deliveryCount?",
      ru: "Должен ли sendBatch() в counting-обертке также независимо увеличивать deliveryCount?"
    },
    modelAnswer: {
      en: "No. If send() already instruments single deliveries, sendBatch() should route through send() without a separate pre-count — never pre-count AND delegate to a path that also counts.",
      ru: "Нет. Если send() уже инструментирует одиночные доставки, sendBatch() должен маршрутизировать через send() без отдельного предварительного подсчета — никогда не считайте заранее И не делегируйте по пути, который тоже считает."
    },
    relatedConceptIds: ["cpt_composition_over_inheritance", "cpt_fragile_base_class"],
    order: 4
  },
  {
    id: "fu_comp_05",
    theoryArticleId: "art_theory_composition",
    question: {
      en: "What is the difference between the Adapter and Decorator patterns here?",
      ru: "В чем разница между паттернами Adapter и Decorator в этом контексте?"
    },
    modelAnswer: {
      en: "Decorator adds behavior to an existing interface (NotificationSender → counted NotificationSender). Adapter converts one interface to another (LegacyMailClient → EmailSender). CountingNotificationService is a Decorator because it enhances NotificationSender without changing its interface.",
      ru: "Decorator добавляет поведение к существующему интерфейсу (NotificationSender → counted NotificationSender). Adapter конвертирует один интерфейс в другой. CountingNotificationService — Decorator, так как улучшает NotificationSender без изменения интерфейса."
    },
    relatedConceptIds: ["cpt_composition_over_inheritance"],
    order: 5
  },
  {
    id: "fu_comp_06",
    theoryArticleId: "art_theory_composition",
    question: {
      en: "How would you unit test CountingNotificationService to catch double-counting?",
      ru: "Как протестировать CountingNotificationService для обнаружения двойного подсчета?"
    },
    modelAnswer: {
      en: "Create a test with N known Notification records, call sendBatch() with that batch, assert deliveryCount == N (not 2N). Also test individual send() calls and mixed send()/sendBatch() sequences for both email and SMS channels.",
      ru: "Создайте тест с N известными Notification, вызовите sendBatch() с этим батчем, проверьте deliveryCount == N (не 2N). Также протестируйте одиночные send() и смешанные последовательности для каналов email и SMS."
    },
    relatedConceptIds: ["cpt_fragile_base_class"],
    order: 6
  },
  {
    id: "fu_comp_07",
    theoryArticleId: "art_theory_composition",
    question: {
      en: "Does LSP apply to EmailNotificationService extending NotificationService?",
      ru: "Применяется ли LSP к EmailNotificationService, расширяющему NotificationService?"
    },
    modelAnswer: {
      en: "The subclass may violate behavioral expectations if deliveryCount becomes inconsistent with actual deliveries — clients expecting NotificationService behavior get corrupted instrumentation side effects. Composition avoids substitutability concerns by implementing NotificationSender explicitly.",
      ru: "Подкласс может нарушить поведенческие ожидания, если deliveryCount становится несогласованным с реальными доставками. Композиция избегает проблем подстановки через явную реализацию NotificationSender."
    },
    relatedConceptIds: ["cpt_fragile_base_class", "cpt_composition_over_inheritance"],
    order: 7
  },
  {
    id: "fu_comp_08",
    theoryArticleId: "art_theory_composition",
    question: {
      en: "Why compose separate EmailSender and SmsSender instead of one mega NotificationService subclass hierarchy?",
      ru: "Почему компоновать отдельные EmailSender и SmsSender вместо иерархии подклассов NotificationService?"
    },
    modelAnswer: {
      en: "Separate strategies keep channel concerns independent, allow stacking counting/audit decorators per channel, and avoid a fragile inheritance tree where every channel subclass must re-solve sendBatch→send instrumentation correctly.",
      ru: "Отдельные стратегии держат каналы независимыми, позволяют наслаивать counting/audit-декораторы по каналам и избегают хрупкого дерева наследования, где каждый подкласс канала снова решает инструментирование sendBatch→send."
    },
    relatedConceptIds: ["cpt_composition_over_inheritance"],
    order: 8
  },
  {
    id: "fu_comp_09",
    theoryArticleId: "art_theory_composition",
    question: {
      en: "Can you stack multiple decorators on NotificationSender?",
      ru: "Можно ли наслоить несколько декораторов на NotificationSender?"
    },
    modelAnswer: {
      en: "Yes. Wrap an EmailSender adapter with CountingNotificationService, then wrap that with AuditedNotificationService. Each decorator implements NotificationSender and delegates inward. Order matters: outermost decorator intercepts calls first.",
      ru: "Да. Оберните адаптер EmailSender в CountingNotificationService, затем в AuditedNotificationService. Каждый декоратор реализует NotificationSender и делегирует внутрь. Порядок важен: внешний декоратор перехватывает вызовы первым."
    },
    relatedConceptIds: ["cpt_composition_over_inheritance"],
    order: 9
  },
  {
    id: "fu_comp_10",
    theoryArticleId: "art_theory_composition",
    question: {
      en: "Why is extending other concrete platform bases (e.g. HttpClient wrappers, MessageBroker clients) equally dangerous?",
      ru: "Почему расширение других конкретных платформенных баз (обертки HttpClient, клиенты MessageBroker) столь же опасно?"
    },
    modelAnswer: {
      en: "Same fragile base class problem: bulk methods may call single-element methods, retries may re-enter hooks, and internal refactors break subclass assumptions. Effective Java Item 18's lesson applies beyond collections — never inherit implementation you do not control.",
      ru: "Та же проблема хрупкого базового класса: массовые методы могут вызывать одиночные, ретраи могут повторно входить в хуки, а внутренние рефакторинги ломают предположения подкласса. Урок Effective Java Item 18 применим шире коллекций — никогда не наследуйте реализацию, которую не контролируете."
    },
    relatedConceptIds: ["cpt_fragile_base_class"],
    order: 10
  },
  {
    id: "fu_comp_11",
    theoryArticleId: "art_theory_composition",
    question: {
      en: "How does Martin Fowler's 'favor composition' advice apply to microservices?",
      ru: "Как совет Martin Fowler 'favor composition' применяется к микросервисам?"
    },
    modelAnswer: {
      en: "In microservices, favor composing capabilities via injectable collaborators (EmailSender, SmsSender) over inheriting from shared base service classes. Composition reduces coupling — changing the base class doesn't silently break all extending services across deployment boundaries.",
      ru: "В микросервисах предпочитайте композицию через внедряемые коллабораторы (EmailSender, SmsSender) вместо наследования от общих базовых классов. Композиция снижает связность — изменение базового класса не ломает все расширяющие сервисы через границы деплоя."
    },
    relatedConceptIds: ["cpt_composition_over_inheritance"],
    order: 11
  },
  {
    id: "fu_comp_12",
    theoryArticleId: "art_theory_composition",
    question: {
      en: "What is Effective Java Item 19's guidance on designing for inheritance?",
      ru: "Какое руководство дает Effective Java Item 19 по проектированию для наследования?"
    },
    modelAnswer: {
      en: "Item 19: 'Design and document for inheritance or else prohibit it.' If a class wasn't designed for extension (with @implSpec documenting self-use patterns), mark it final or use composition. NotificationService was NOT designed for inheritance.",
      ru: "Item 19: 'Проектируйте и документируйте для наследования или запретите его.' Если класс не спроектирован для расширения, пометьте final или используйте композицию. NotificationService НЕ был спроектирован для наследования."
    },
    relatedConceptIds: ["cpt_fragile_base_class", "cpt_composition_over_inheritance"],
    order: 12
  }
];
