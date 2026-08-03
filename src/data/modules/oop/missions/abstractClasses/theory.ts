import { TheoryArticle, TheoryCheckpoint } from '../../../../../types/domain';

export const THEORY_ARTICLE_ABSTRACT_CLASSES: TheoryArticle = {
  id: "art_theory_abstract_classes",
  topicIds: ["top_oop_08"],
  conceptIds: ["cpt_abstract_class", "cpt_template_hooks"],
  title: {
    en: "Abstract Classes, Protected Hooks & Settlement Lifecycle Contracts",
    ru: "Абстрактные Классы, Protected-Хуки и Контракты Lifecycle Settlement"
  },
  summary: {
    en: "Abstract classes hold shared state, constructors, and a controlled protected API. For AbstractSettlementProcessor, settle() must be final so validate → authorize → capture → audit always runs; subclasses customize only documented authorize/capture hooks. This mission emphasizes abstract class vs interface and protected-state discipline — not a full GoF Template Method catalog.",
    ru: "Абстрактные классы держат общее состояние, конструкторы и контролируемый protected API. Для AbstractSettlementProcessor settle() должен быть final, чтобы всегда шли validate → authorize → capture → audit; подклассы кастомизируют только документированные хуки authorize/capture. Миссия акцентирует abstract class vs interface и дисциплину protected-состояния — не полный каталог GoF Template Method."
  },
  sections: [
    {
      id: "sec_ac_definition",
      category: "DEFINITION",
      title: {
        en: "1. Abstract Class: Shared State + Incomplete Implementation",
        ru: "1. Абстрактный Класс: Общее Состояние + Неполная Реализация"
      },
      blocks: [
        {
          id: "blk_ac_def_1",
          type: "PARAGRAPH",
          content: {
            en: "An abstract class (JLS 8.1.1.1) is incomplete: it cannot be instantiated, may declare abstract methods, and can still define constructors, instance fields, and concrete methods. AbstractSettlementProcessor owns SettlementContext wiring, shared validate/audit helpers, and forces CardSettlementProcessor / WireSettlementProcessor to supply rail-specific authorize and capture. That combination — state + constructor + partial behavior — is why an abstract class fits better than a pure interface here.",
            ru: "Абстрактный класс (JLS 8.1.1.1) неполон: его нельзя инстанцировать, он может объявлять abstract-методы и при этом определять конструкторы, instance fields и concrete-методы. AbstractSettlementProcessor владеет wiring SettlementContext, общими helpers validate/audit и заставляет CardSettlementProcessor / WireSettlementProcessor предоставить rail-specific authorize и capture. Эта комбинация — state + конструктор + частичное поведение — почему здесь лучше абстрактный класс, а не чистый интерфейс."
          }
        },
        {
          id: "blk_ac_def_2",
          type: "CALLOUT",
          title: {
            en: "💡 Abstract Class vs Interface (Oracle Tutorial / Item 20)",
            ru: "💡 Abstract Class vs Interface (Oracle Tutorial / Item 20)"
          },
          content: {
            en: "Interfaces excel at capability contracts without forced hierarchy (Item 20). Abstract classes win when subclasses must share non-static fields, constructor initialization, and protected helper APIs. Prefer interface for 'can settle'; prefer abstract class for 'settlement lifecycle with shared audit state'. Misapplying Item 20 as 'never use abstract classes' recreates duplicated audit wiring across Card/Wire.",
            ru: "Интерфейсы сильны для capability-контрактов без принудительной иерархии (Item 20). Абстрактные классы побеждают, когда подклассам нужны non-static fields, инициализация в конструкторе и protected helper API. Интерфейс — для «can settle»; абстрактный класс — для «lifecycle settlement с общим audit-состоянием». Неверное чтение Item 20 как «никогда не используйте abstract class» дублирует audit-wiring в Card/Wire."
          }
        }
      ]
    },
    {
      id: "sec_ac_hooks_mechanics",
      category: "MECHANICS",
      title: {
        en: "2. Final Skeleton & Protected Template Hooks",
        ru: "2. Final-Скелет и Protected Template Hooks"
      },
      blocks: [
        {
          id: "blk_ac_mech_1",
          type: "PARAGRAPH",
          content: {
            en: "The production bug class is lifecycle bypass: WireSettlementProcessor overrode settle() and returned after capture — audit never executed. Fix: `public final SettlementResult settle(SettlementContext ctx)` orchestrates validate → authorize → capture → audit. Variation points are `protected abstract` (or protected overridable) authorize/capture hooks only. Audit and validate stay private so subclasses cannot skip or re-order them.",
            ru: "Продакшн-класс бага — обход lifecycle: WireSettlementProcessor переопределил settle() и вернулся после capture — audit не выполнился. Фикс: `public final SettlementResult settle(SettlementContext ctx)` оркестрирует validate → authorize → capture → audit. Точки вариации — только `protected abstract` (или protected overridable) хуки authorize/capture. Audit и validate остаются private, чтобы подклассы не могли их пропустить или переставить."
          }
        },
        {
          id: "blk_ac_mech_2",
          type: "WARNING",
          title: {
            en: "⚙️ Protected State Is Part of the Extension Contract",
            ru: "⚙️ Protected-Состояние — Часть Контракта Расширения"
          },
          content: {
            en: "CardSettlementProcessor mutated a protected `audited` flag to short-circuit. Effective Java Item 19: design and document for inheritance or prohibit it. Every protected field/method is an API. Prefer private state with protected hooks that receive parameters; if protected fields exist, document invariants and call order. Undocumented protected mutability is a fragile base class waiting for a compliance incident.",
            ru: "CardSettlementProcessor мутировал protected-флаг `audited` для short-circuit. Effective Java Item 19: проектируйте и документируйте для наследования или запрещайте его. Каждое protected поле/метод — это API. Предпочитайте private-состояние и protected-хуки с параметрами; если protected-поля есть — документируйте инварианты и порядок вызовов. Недокументированная protected-мутабельность — fragile base class в ожидании compliance-инцидента."
          }
        },
        {
          id: "blk_ac_mech_3",
          type: "CALLOUT",
          title: {
            en: "📜 Not the Full Template Method Mission",
            ru: "📜 Это Не Полная Миссия Template Method"
          },
          content: {
            en: "Hooks inside a final skeleton resemble Template Method, but this mission's interview focus is abstract-class mechanics: vs interface, constructors, protected state, documenting inheritance. A dedicated Template Method topic (top_oop_29) covers GoF catalog depth; here you must explain why AbstractSettlementProcessor exists and how final settle() prevents audit gaps.",
            ru: "Хуки внутри final-скелета похожи на Template Method, но фокус интервью этой миссии — механика abstract class: vs interface, конструкторы, protected-состояние, документирование наследования. Отдельный топик Template Method (top_oop_29) покрывает глубину каталога GoF; здесь нужно объяснить, зачем существует AbstractSettlementProcessor и как final settle() предотвращает дыры в audit."
          }
        }
      ]
    },
    {
      id: "sec_ac_tradeoffs",
      category: "TRADE_OFFS",
      title: {
        en: "3. Trade-offs: Abstract Class vs Interface vs Composition",
        ru: "3. Компромиссы: Abstract Class vs Interface vs Composition"
      },
      blocks: [
        {
          id: "blk_ac_trade_1",
          type: "PARAGRAPH",
          content: {
            en: "AbstractSettlementProcessor couples Card/Wire into one hierarchy — fragile if rails diverge wildly. Alternative: composition — SettlementPipeline with injected AuthorizeStep/CaptureStep strategies and a final orchestrator that always audits. Prefer abstract class when rails share substantial state and a stable step order; prefer composition when authorize/capture vary independently or teams own separate modules (Item 18 / composition over inheritance).",
            ru: "AbstractSettlementProcessor связывает Card/Wire в одну иерархию — хрупко, если rails сильно расходятся. Альтернатива: композиция — SettlementPipeline с инжектированными AuthorizeStep/CaptureStep strategies и final-оркестратором, который всегда аудитит. Абстрактный класс — когда rails делят существенное состояние и стабильный порядок шагов; композиция — когда authorize/capture варьируются независимо или командами владеют разные модули (Item 18 / composition over inheritance)."
          }
        },
        {
          id: "blk_ac_trade_2",
          type: "CALLOUT",
          title: {
            en: "🔧 Constructor Rules for Abstract Processors",
            ru: "🔧 Правила Конструкторов для Abstract Processors"
          },
          content: {
            en: "Abstract class constructors run when Card/Wire are instantiated. Avoid calling overridable hooks from the abstract constructor (Item 19 hazard — subclass fields not yet initialized). Pass collaborators (AuditLedger, AuthorizationGateway) via constructor into final fields; subclasses call `super(ledger, gateway)` then configure rail-specific config only.",
            ru: "Конструкторы абстрактного класса выполняются при инстанцировании Card/Wire. Не вызывайте overridable-хуки из абстрактного конструктора (hazard Item 19 — поля подкласса ещё не инициализированы). Передавайте коллабораторов (AuditLedger, AuthorizationGateway) через конструктор в final-поля; подклассы вызывают `super(ledger, gateway)` и настраивают только rail-specific config."
          }
        }
      ]
    },
    {
      id: "sec_ac_interview_followups",
      category: "INTERVIEW_GUIDANCE",
      title: {
        en: "4. Senior Interview Follow-Up Questions: Abstract Classes",
        ru: "4. Дополнительные Вопросы Senior-Интервью: Абстрактные Классы"
      },
      blocks: [
        {
          id: "blk_ac_fup_01",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q1: 'When do you choose an abstract class over an interface?' — Model Answer: When subclasses need shared instance state, constructors, and protected helpers under a single inheritance contract. Interfaces for pure capabilities; abstract class for AbstractSettlementProcessor's lifecycle + audit state.",
            ru: "Доп. Вопрос 1: 'Когда выбрать абстрактный класс вместо интерфейса?' — Модельный Ответ: Когда подклассам нужны общее instance-состояние, конструкторы и protected-helpers в одном контракте наследования. Интерфейсы — для чистых capabilities; абстрактный класс — для lifecycle + audit-состояния AbstractSettlementProcessor."
          }
        },
        {
          id: "blk_ac_fup_02",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q2: 'How did Wire skip audit?' — Model Answer: settle() was overridable; Wire replaced it with authorize+capture and returned SettlementResult without calling audit. Making settle() final closes that hole.",
            ru: "Доп. Вопрос 2: 'Как Wire пропустил audit?' — Модельный Ответ: settle() был переопределяемым; Wire заменил его на authorize+capture и вернул SettlementResult без audit. final settle() закрывает эту дыру."
          }
        },
        {
          id: "blk_ac_fup_03",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q3: 'Is this just Template Method?' — Model Answer: Mechanically similar. Interview emphasis here is abstract-class design: state, constructors, protected API documentation — not reciting GoF names.",
            ru: "Доп. Вопрос 3: 'Это просто Template Method?' — Модельный Ответ: Механически похоже. Акцент интервью — дизайн abstract class: state, конструкторы, документация protected API — не пересказ имён GoF."
          }
        },
        {
          id: "blk_ac_fup_04",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q4: 'Why not make audit protected so subclasses can customize logging?' — Model Answer: If audit is mandatory for compliance, keep it private/final inside the skeleton. Offer a protected afterCapture() hook for extra rail-specific logging that cannot skip the mandatory audit write.",
            ru: "Доп. Вопрос 4: 'Почему не сделать audit protected для кастомизации логирования?' — Модельный Ответ: Если audit обязателен для compliance — держите его private/final внутри скелета. Дайте protected afterCapture() для доп. rail-логирования, которое не может пропустить обязательную запись audit."
          }
        },
        {
          id: "blk_ac_fup_05",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q5: 'What does Item 19 require you to document?' — Model Answer: Which methods are hooks, call order, invariants of protected state, and which self-use patterns subclasses may rely on. Or seal/finalize inheritance if you cannot commit to that contract.",
            ru: "Доп. Вопрос 5: 'Что Item 19 требует документировать?' — Модельный Ответ: Какие методы — hooks, порядок вызовов, инварианты protected-состояния и на какие self-use паттерны могут опираться подклассы. Или запретите наследование, если не готовы к этому контракту."
          }
        },
        {
          id: "blk_ac_fup_06",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q6: 'Can abstract classes have constructors?' — Model Answer: Yes — they run when a concrete subclass is constructed (JLS). Use them to initialize final collaborators; never call overridable methods from them.",
            ru: "Доп. Вопрос 6: 'Могут ли абстрактные классы иметь конструкторы?' — Модельный Ответ: Да — они выполняются при создании конкретного подкласса (JLS). Используйте для инициализации final-коллабораторов; никогда не вызывайте overridable-методы из них."
          }
        },
        {
          id: "blk_ac_fup_07",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q7: 'How do you unit-test CardSettlementProcessor?' — Model Answer: Test hooks in isolation where possible; also integration-test settle() on the concrete class and assert audit ledger interactions — final skeleton guarantees audit is invoked.",
            ru: "Доп. Вопрос 7: 'Как юнит-тестировать CardSettlementProcessor?' — Модельный Ответ: Тестируйте hooks изолированно где возможно; также интеграционно settle() на конкретном классе и assert взаимодействий audit ledger — final-скелет гарантирует вызов audit."
          }
        },
        {
          id: "blk_ac_fup_08",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q8: 'What if a new CRYPTO rail needs a different step order?' — Model Answer: Different order means the abstract skeleton no longer fits — use composition/pipeline, not another override of settle(). Inheritance assumes stable step sequence.",
            ru: "Доп. Вопрос 8: 'Что если новый CRYPTO rail требует другой порядок шагов?' — Модельный Ответ: Другой порядок значит, что абстрактный скелет больше не подходит — используйте composition/pipeline, а не ещё один override settle(). Наследование предполагает стабильную последовательность шагов."
          }
        },
        {
          id: "blk_ac_fup_09",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q9: 'Should authorize be abstract or a protected empty hook?' — Model Answer: Abstract when every subclass must provide behavior (Card/Wire always authorize). Protected empty/default hooks for optional steps. Mandatory compliance steps stay non-overridable.",
            ru: "Доп. Вопрос 9: 'authorize — abstract или protected пустой hook?' — Модельный Ответ: Abstract, когда каждый подкласс обязан дать поведение (Card/Wire всегда authorize). Protected empty/default — для опциональных шагов. Обязательные compliance-шаги остаются непереопределяемыми."
          }
        },
        {
          id: "blk_ac_fup_10",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q10: 'How does this relate to LSP?' — Model Answer: Subclasses must honor the settle() postconditions (including audit side effects). Overriding settle() to skip audit violates behavioral subtyping for clients that rely on AbstractSettlementProcessor.",
            ru: "Доп. Вопрос 10: 'Как это связано с LSP?' — Модельный Ответ: Подклассы должны соблюдать постусловия settle() (включая side effects audit). Override settle() с пропуском audit нарушает behavioral subtyping для клиентов AbstractSettlementProcessor."
          }
        },
        {
          id: "blk_ac_fup_11",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q11: 'Sealed class hierarchy instead?' — Model Answer: `sealed abstract class AbstractSettlementProcessor permits Card…, Wire…` limits who extends, but still make settle() final. Sealing controls the set of subtypes; final controls the skeleton.",
            ru: "Доп. Вопрос 11: 'Вместо этого sealed-иерархия?' — Модельный Ответ: `sealed abstract class AbstractSettlementProcessor permits Card…, Wire…` ограничивает, кто extends, но settle() всё равно final. Sealing контролирует набор подтипов; final — скелет."
          }
        },
        {
          id: "blk_ac_fup_12",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q12: 'What ArchUnit rule after this incident?' — Model Answer: Forbid overrides of settle in `..settlement..` packages; require concrete processors to declare only authorize/capture overrides. Fail CI if a subclass declares settle().",
            ru: "Доп. Вопрос 12: 'Какое ArchUnit-правило после инцидента?' — Модельный Ответ: Запретить overrides settle в пакетах `..settlement..`; требовать у конкретных процессоров только overrides authorize/capture. Падать в CI, если подкласс объявляет settle()."
          }
        }
      ]
    }
  ],
  prerequisiteConceptIds: ["cpt_access_modifiers"],
  sourceIds: [
    "src_jls_8111_abstract_classes",
    "src_effective_java_item19",
    "src_effective_java_item20_ac",
    "src_oracle_tutorial_abstract"
  ],
  verificationStatus: "TECHNICALLY_VERIFIED",
  tags: ["#abstract-class", "#template-hooks", "#settlement", "#inheritance"],
  estimatedMinutes: 16,
  version: "1.0.0"
};

export const THEORY_CHECKPOINTS_ABSTRACT_CLASSES: readonly TheoryCheckpoint[] = [
  {
    id: "chk_ac_1",
    theoryArticleId: "art_theory_abstract_classes",
    question: {
      en: "Why is an abstract class a better fit than an interface for AbstractSettlementProcessor?",
      ru: "Почему абстрактный класс лучше подходит для AbstractSettlementProcessor, чем интерфейс?"
    },
    explanation: {
      en: "Processors share constructors, instance state, and a protected extension API under one lifecycle skeleton.",
      ru: "Процессоры делят конструкторы, instance-состояние и protected API расширения под одним lifecycle-скелетом."
    },
    options: [
      {
        id: "opt_ac1_a",
        text: {
          en: "It needs shared instance state, constructors, and protected hooks — not only a capability contract.",
          ru: "Нужны общее instance-состояние, конструкторы и protected-хуки — не только capability-контракт."
        },
        isCorrect: true,
        feedback: {
          en: "Correct! That is the classic abstract-class vs interface decision (Oracle tutorial / Item 20 nuance).",
          ru: "Верно! Классическое решение abstract class vs interface (нюанс Oracle tutorial / Item 20)."
        }
      },
      {
        id: "opt_ac1_b",
        text: {
          en: "Abstract classes are always faster than interfaces at runtime.",
          ru: "Абстрактные классы всегда быстрее интерфейсов во runtime."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. The choice is about state and extension contracts, not a blanket performance rule.",
          ru: "Неверно. Выбор про состояние и контракты расширения, не про универсальное правило производительности."
        }
      },
      {
        id: "opt_ac1_c",
        text: {
          en: "Interfaces cannot declare methods in modern Java.",
          ru: "Интерфейсы не могут объявлять методы в современном Java."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Interfaces declare methods (and defaults); they still lack instance fields/constructors like a class.",
          ru: "Неверно. Интерфейсы объявляют методы (и defaults); у них по-прежнему нет instance fields/конструкторов как у класса."
        },
        misconceptionId: "err_interface_instead_of_abstract"
      }
    ],
    order: 1
  },
  {
    id: "chk_ac_2",
    theoryArticleId: "art_theory_abstract_classes",
    question: {
      en: "How does making settle() final prevent the missing-audit production incident?",
      ru: "Как final settle() предотвращает продакшн-инцидент с отсутствующим audit?"
    },
    explanation: {
      en: "Subclasses cannot replace the lifecycle; they only fill authorize/capture hooks while audit always runs.",
      ru: "Подклассы не могут заменить lifecycle; они только заполняют хуки authorize/capture, а audit всегда выполняется."
    },
    options: [
      {
        id: "opt_ac2_a",
        text: {
          en: "Subclasses cannot override settle() to skip audit — the skeleton always runs audit after capture.",
          ru: "Подклассы не могут переопределить settle() и пропустить audit — скелет всегда вызывает audit после capture."
        },
        isCorrect: true,
        feedback: {
          en: "Correct! Final skeleton + private audit closes the Wire fast-path bypass.",
          ru: "Верно! Final-скелет + private audit закрывает bypass fast-path Wire."
        }
      },
      {
        id: "opt_ac2_b",
        text: {
          en: "final makes the JVM encrypt the audit ledger automatically.",
          ru: "final заставляет JVM автоматически шифровать audit ledger."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. final controls overriding, not encryption.",
          ru: "Неверно. final контролирует переопределение, не шифрование."
        }
      },
      {
        id: "opt_ac2_c",
        text: {
          en: "final settle() forces subclasses to override audit instead.",
          ru: "final settle() заставляет подклассы вместо этого переопределять audit."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Audit should stay private/non-overridable; hooks are authorize/capture.",
          ru: "Неверно. Audit должен оставаться private/непереопределяемым; хуки — authorize/capture."
        },
        misconceptionId: "err_override_settle_skip_audit"
      }
    ],
    order: 2
  },
  {
    id: "chk_ac_3",
    theoryArticleId: "art_theory_abstract_classes",
    question: {
      en: "What does Effective Java Item 19 require for AbstractSettlementProcessor's protected API?",
      ru: "Чего требует Effective Java Item 19 для protected API AbstractSettlementProcessor?"
    },
    explanation: {
      en: "Document hooks, call order, and protected-state invariants — or prohibit inheritance.",
      ru: "Документировать хуки, порядок вызовов и инварианты protected-состояния — или запретить наследование."
    },
    options: [
      {
        id: "opt_ac3_a",
        text: {
          en: "Design and document the extension contract (hooks, order, invariants) or prohibit inheritance.",
          ru: "Спроектировать и документировать контракт расширения (хуки, порядок, инварианты) или запретить наследование."
        },
        isCorrect: true,
        feedback: {
          en: "Correct! Undocumented protected mutability caused Card's short-circuit of audit flags.",
          ru: "Верно! Недокументированная protected-мутабельность вызвала short-circuit audit-флагов у Card."
        }
      },
      {
        id: "opt_ac3_b",
        text: {
          en: "Make every method public so documentation is unnecessary.",
          ru: "Сделать каждый метод public, чтобы документация была не нужна."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Wider visibility worsens the fragile base class problem.",
          ru: "Неверно. Более широкая видимость усугубляет проблему fragile base class."
        },
        misconceptionId: "err_undocumented_hooks"
      },
      {
        id: "opt_ac3_c",
        text: {
          en: "Item 19 forbids abstract classes entirely.",
          ru: "Item 19 полностью запрещает абстрактные классы."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Item 19 regulates inheritance contracts; Item 20 discusses interface preference with nuance.",
          ru: "Неверно. Item 19 регулирует контракты наследования; Item 20 обсуждает предпочтение интерфейсов с нюансами."
        }
      }
    ],
    order: 3
  }
];
