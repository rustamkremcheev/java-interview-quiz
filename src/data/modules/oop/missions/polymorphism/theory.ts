import { TheoryArticle, TheoryCheckpoint } from '../../../../../types/domain';

export const THEORY_ARTICLE_POLYMORPHISM: TheoryArticle = {
  id: "art_theory_polymorphism",
  topicIds: ["top_oop_11"],
  conceptIds: ["cpt_polymorphism", "cpt_type_switch_smell"],
  title: {
    en: "Design-Level Polymorphism vs Type-Switch Smell",
    ru: "Design-Level Полиморфизм vs Smell Type-Switch"
  },
  summary: {
    en: "Subtype polymorphism lets TransactionPipeline depend on a Transaction (or TransactionHandler) contract while Card, Wire, Ach, and Instant supply their own process behavior. Growing instanceof chains are a design smell: every new subtype edits the pipeline. This is about substitutable design — not HotSpot megamorphic call-site tuning.",
    ru: "Полиморфизм подтипов позволяет TransactionPipeline зависеть от контракта Transaction (или TransactionHandler), пока Card, Wire, Ach и Instant дают своё process-поведение. Растущие цепочки instanceof — design smell: каждый новый подтип правит pipeline. Речь о подставляемом дизайне — не о тюнинге megamorphic call sites HotSpot."
  },
  sections: [
    {
      id: "sec_poly_definition",
      category: "DEFINITION",
      title: {
        en: "1. Subtype Polymorphism: Substitutable Transaction Behavior",
        ru: "1. Полиморфизм Подтипов: Подставляемое Поведение Transaction"
      },
      blocks: [
        {
          id: "blk_poly_def_1",
          type: "PARAGRAPH",
          content: {
            en: "Subtype polymorphism: a client holds a reference typed as Transaction (or calls through a handler contract) and gets correct Card / Wire / Ach / Instant behavior without knowing the concrete class. Head First OOA&D frames this as encapsulating what varies and telling the object what to do — not asking for its type and branching. In TransactionPipeline, the varying thing is rail-specific clearing and settlement.",
            ru: "Полиморфизм подтипов: клиент держит ссылку типа Transaction (или вызывает через контракт handler) и получает корректное поведение Card / Wire / Ach / Instant, не зная конкретный класс. Head First OOA&D формулирует это как инкапсуляцию того, что меняется, и команду объекту — не запрос типа и ветвление. В TransactionPipeline варьируется clearing и settlement конкретного рейла."
          }
        },
        {
          id: "blk_poly_def_2",
          type: "CALLOUT",
          title: {
            en: "💡 Core Mental Model: Tell Don't Ask (No Type Inspection)",
            ru: "💡 Главная Ментальная Модель: Tell Don't Ask (Без Инспекции Типа)"
          },
          content: {
            en: "A giant `if (txn instanceof CardTransaction)` chain is procedural discrimination. Polymorphism moves each rail's logic onto CardTransaction.process(...), WireTransaction.process(...), etc. — or onto dedicated handlers reached via accept(handler) / registry. The pipeline becomes: validate → delegate → record result.",
            ru: "Гигантская цепочка `if (txn instanceof CardTransaction)` — процедурная дискриминация. Полиморфизм переносит логику каждого рейла на CardTransaction.process(...), WireTransaction.process(...) и т.д. — или на dedicated handlers через accept(handler) / registry. Pipeline становится: validate → delegate → record result."
          }
        }
      ]
    },
    {
      id: "sec_poly_type_switch",
      category: "MECHANICS",
      title: {
        en: "2. Type-Switch Smell & InstantTransaction Mechanics",
        ru: "2. Smell Type-Switch и Механика InstantTransaction"
      },
      blocks: [
        {
          id: "blk_poly_ts_1",
          type: "PARAGRAPH",
          content: {
            en: "Type-switch smell: TransactionPipeline.process grows with every concrete subtype. Adding InstantTransaction means reopening the pipeline, inserting another instanceof, casting, and pasting Instant clearing rules next to Card/Wire/Ach. That couples one orchestration class to the entire payment type hierarchy — and a missed branch ships Instant as FAILED or wrong ACH settlement.",
            ru: "Smell type-switch: TransactionPipeline.process растёт с каждым конкретным подтипом. Добавление InstantTransaction значит открыть pipeline, вставить ещё один instanceof, cast и вставить правила Instant clearing рядом с Card/Wire/Ach. Это связывает один orchestration-класс со всей иерархией типов платежей — а пропущенная ветка выкатывает Instant как FAILED или неверный ACH settlement."
          }
        },
        {
          id: "blk_poly_ts_2",
          type: "WARNING",
          title: {
            en: "⚙️ Missing Branch: Instant Exists but Pipeline Does Not Know It",
            ru: "⚙️ Пропущенная Ветка: Instant Есть, но Pipeline Его Не Знает"
          },
          content: {
            en: "Having `class InstantTransaction implements Transaction` is not enough. instanceof chains are closed sets at the call site. Without a branch (or without polymorphic process()), Instant hits else. Polymorphism fixes the class of bug: new subtypes bring behavior; the pipeline does not enumerate them.",
            ru: "Наличия `class InstantTransaction implements Transaction` недостаточно. Цепочки instanceof — закрытые множества на call site. Без ветки (или без полиморфного process()) Instant попадает в else. Полиморфизм устраняет этот класс багов: новые подтипы несут поведение; pipeline их не перечисляет."
          }
        },
        {
          id: "blk_poly_ts_3",
          type: "CALLOUT",
          title: {
            en: "📜 Three Design Alternatives (Same Principle)",
            ru: "📜 Три Design-Альтернативы (Один Принцип)"
          },
          content: {
            en: "(1) Polymorphic method: `txn.process(PipelineContext)`. (2) Visitor-style: `txn.accept(handler)` with TransactionHandler overloads / double dispatch. (3) Handler registry: Map from Class (or type key) → TransactionHandler populated at composition root — resolve once, no sprawling instanceof in the hot path. Prefer (1) when behavior naturally belongs on the transaction; prefer (2)/(3) when processing must stay outside the domain model.",
            ru: "(1) Полиморфный метод: `txn.process(PipelineContext)`. (2) Visitor-style: `txn.accept(handler)` с TransactionHandler overloads / double dispatch. (3) Handler registry: Map от Class (или type key) → TransactionHandler в composition root — resolve один раз, без sprawl instanceof в горячем пути. Предпочитайте (1), когда поведение естественно на transaction; (2)/(3) — когда обработка должна остаться вне доменной модели."
          }
        }
      ]
    },
    {
      id: "sec_poly_tradeoffs",
      category: "TRADE_OFFS",
      title: {
        en: "3. Trade-offs: Polymorphism vs Strategy vs Dynamic Dispatch Topic",
        ru: "3. Компромиссы: Полиморфизм vs Strategy vs Тема Dynamic Dispatch"
      },
      blocks: [
        {
          id: "blk_poly_trade_1",
          type: "PARAGRAPH",
          content: {
            en: "Strategy selects interchangeable algorithms by a context key (often with a registry). This mission's type switch discriminates object identity in a hierarchy (CardTransaction vs WireTransaction). Both remove conditionals; the modeling intent differs. The dynamic-dispatch mission explains JVM call-site mechanics — useful background, not the interview focus here. Senior answer: design-level substitutable handlers.",
            ru: "Strategy выбирает взаимозаменяемые алгоритмы по ключу контекста (часто через registry). Type switch этой миссии дискриминирует identity объектов в иерархии (CardTransaction vs WireTransaction). Оба убирают условия; modeling intent разный. Миссия dynamic-dispatch объясняет механику call site JVM — полезный фон, не фокус интервью здесь. Senior-ответ: design-level подставляемые handlers."
          }
        },
        {
          id: "blk_poly_trade_2",
          type: "CALLOUT",
          title: {
            en: "🔧 When a Small instanceof Remains Acceptable",
            ru: "🔧 Когда Небольшой instanceof Всё Ещё Приемлем"
          },
          content: {
            en: "Boundary adapters (deserializing external payloads into a sealed hierarchy) may need type tests once. Chronic growth of instanceof inside a core pipeline that must change for every product rail is the smell. Prefer sealed + exhaustive switch at the anti-corruption boundary if you need compile-time exhaustiveness — still push rail logic out of TransactionPipeline's god-method.",
            ru: "Boundary adapters (десериализация внешних payload в sealed-иерархию) могут один раз нуждаться в type tests. Хронический рост instanceof внутри core pipeline, который меняют на каждый product-рейл — smell. Sealed + exhaustive switch на anti-corruption boundary даёт compile-time exhaustiveness — но логику рейла всё равно выносите из god-method TransactionPipeline."
          }
        }
      ]
    },
    {
      id: "sec_poly_interview_followups",
      category: "INTERVIEW_GUIDANCE",
      title: {
        en: "4. Senior Interview Follow-Up Questions: Polymorphism",
        ru: "4. Дополнительные Вопросы Senior-Интервью: Полиморфизм"
      },
      blocks: [
        {
          id: "blk_poly_fup_01",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q1: 'What problem does polymorphism solve that instanceof does not?' — Model Answer: Polymorphism localizes type-specific behavior on the subtype (or handler), so new InstantTransaction does not force editing TransactionPipeline. instanceof centralizes discrimination and grows forever.",
            ru: "Доп. Вопрос 1: 'Какую проблему решает полиморфизм, которую instanceof не решает?' — Модельный Ответ: Полиморфизм локализует type-specific поведение на подтипе (или handler), поэтому новый InstantTransaction не вынуждает править TransactionPipeline. instanceof централизует дискриминацию и растёт бесконечно."
          }
        },
        {
          id: "blk_poly_fup_02",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q2: 'Is this the same as Strategy Pattern?' — Model Answer: Related but not identical. Strategy encapsulates interchangeable algorithms selected by context (often enum/registry). Here the hierarchy of Transaction subtypes is the varying thing — design polymorphism / tell-don't-ask. Strategy may still appear inside a rail's fee math.",
            ru: "Доп. Вопрос 2: 'Это то же самое, что Strategy?' — Модельный Ответ: Связано, но не тождественно. Strategy инкапсулирует взаимозаменяемые алгоритмы, выбираемые контекстом (часто enum/registry). Здесь варьируется иерархия подтипов Transaction — design polymorphism / tell-don't-ask. Strategy может жить внутри fee-математики рейла."
          }
        },
        {
          id: "blk_poly_fup_03",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q3: 'How does this relate to Open-Closed?' — Model Answer: OCP is the principle; polymorphism is a primary OOP mechanism to achieve it for type variation. New InstantTransaction + process()/handler registration extends behavior without modifying Card/Wire/Ach or the pipeline body.",
            ru: "Доп. Вопрос 3: 'Как это связано с Open-Closed?' — Модельный Ответ: OCP — принцип; полиморфизм — основной OOP-механизм достичь его для вариации типов. Новый InstantTransaction + process()/регистрация handler расширяет поведение без правки Card/Wire/Ach или тела pipeline."
          }
        },
        {
          id: "blk_poly_fup_04",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q4: 'process() on the entity vs visitor/handler registry?' — Model Answer: process() on Transaction keeps rail logic with the type — simple, but can fatten the domain model. Visitor/handlers keep orchestration/infrastructure out of the entity. Choose based on whether clearing is domain behavior or infrastructure integration.",
            ru: "Доп. Вопрос 4: 'process() на сущности vs visitor/handler registry?' — Модельный Ответ: process() на Transaction держит логику рейла с типом — просто, но может раздуть доменную модель. Visitor/handlers держат оркестрацию/инфраструктуру вне сущности. Выбор зависит от того, clearing — доменное поведение или infrastructure integration."
          }
        },
        {
          id: "blk_poly_fup_05",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q5: 'What about sealed interfaces + switch expressions?' — Model Answer: Exhaustiveness helps at compile time when Instant is added to a sealed set. Still, putting all clearing inside the switch keeps a god pipeline. Prefer exhaustiveness at a boundary mapper; keep polymorphic handlers for processing.",
            ru: "Доп. Вопрос 5: 'А sealed interfaces + switch expressions?' — Модельный Ответ: Exhaustiveness помогает compile-time, когда Instant добавлен в sealed-набор. Но весь clearing внутри switch оставляет god pipeline. Exhaustiveness — на boundary mapper; обработка — через полиморфные handlers."
          }
        },
        {
          id: "blk_poly_fup_06",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q6: 'Isn't polymorphism just invokevirtual / megamorphic sites?' — Model Answer: That is the JVM mechanism (separate deep topic). Interviewers for this scenario want design: remove type switches, substitute subtypes. Mentoring megamorphism without fixing instanceof is the wrong altitude.",
            ru: "Доп. Вопрос 6: 'Полиморфизм — это просто invokevirtual / megamorphic sites?' — Модельный Ответ: Это механизм JVM (отдельная глубокая тема). Интервьюеры в этом сценарии хотят дизайн: убрать type switches, подставлять подтипы. Mentoring megamorphism без фикса instanceof — неверная высота ответа."
          }
        },
        {
          id: "blk_poly_fup_07",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q7: 'How do you unit-test the refactor?' — Model Answer: Test each Transaction subtype (or handler) in isolation with PipelineContext fixtures. Pipeline tests become thin: assert delegation / result recording — no combinatorial instanceof matrix in one class.",
            ru: "Доп. Вопрос 7: 'Как юнит-тестировать рефакторинг?' — Модельный Ответ: Тестируйте каждый подтип Transaction (или handler) изолированно с фикстурами PipelineContext. Тесты pipeline тонкие: assert делегирования / записи результата — без комбинаторной матрицы instanceof в одном классе."
          }
        },
        {
          id: "blk_poly_fup_08",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q8: 'In our incident, why did Instant fail after the type already existed?' — Model Answer: The hierarchy had InstantTransaction, but the pipeline's closed instanceof set did not. Type existence ≠ call-site knowledge. Polymorphism binds behavior to the object so the call site need not enumerate.",
            ru: "Доп. Вопрос 8: 'Почему Instant упал, хотя тип уже существовал?' — Модельный Ответ: В иерархии был InstantTransaction, но закрытый набор instanceof pipeline — нет. Существование типа ≠ знание call site. Полиморфизм привязывает поведение к объекту, чтобы call site не перечислял типы."
          }
        },
        {
          id: "blk_poly_fup_09",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q9: 'Where is instanceof still justified?' — Model Answer: One-shot anti-corruption / deserialization boundaries, or interoperability with types you cannot change. Not as the permanent growth point of a core TransactionPipeline.",
            ru: "Доп. Вопрос 9: 'Где instanceof всё ещё оправдан?' — Модельный Ответ: One-shot anti-corruption / deserialization boundaries или интероп с типами, которые нельзя менять. Не как постоянная точка роста core TransactionPipeline."
          }
        },
        {
          id: "blk_poly_fup_10",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q10: 'How does LSP interact here?' — Model Answer: Polymorphic process() must preserve Transaction's contract for all subtypes — Instant must not strengthen preconditions or surprise with incompatible settlement semantics under the same PipelineContext expectations.",
            ru: "Доп. Вопрос 10: 'Как здесь связан LSP?' — Модельный Ответ: Полиморфный process() должен сохранять контракт Transaction для всех подтипов — Instant не должен усиливать предусловия или удивлять несовместимой семантикой settlement при тех же ожиданиях PipelineContext."
          }
        },
        {
          id: "blk_poly_fup_11",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q11: 'Handler map by Class — isn't that still a type switch?' — Model Answer: Registration is O(types) at composition root, ideally once. The hot path is resolve + delegate without nested instanceof bodies. Fail-fast if Instant is not registered — never silent else→ACH.",
            ru: "Доп. Вопрос 11: 'Handler map по Class — это всё ещё type switch?' — Модельный Ответ: Регистрация O(types) в composition root, идеально один раз. Горячий путь — resolve + delegate без вложенных тел instanceof. Fail-fast, если Instant не зарегистрирован — никогда тихий else→ACH."
          }
        },
        {
          id: "blk_poly_fup_12",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q12: 'What review rule would you add after this incident?' — Model Answer: Forbid instanceof chains on Transaction inside `..pipeline..` packages except a single composition-root registry bootstrap. Require an integration test that every known Transaction subtype processes successfully through the pipeline.",
            ru: "Доп. Вопрос 12: 'Какое review-правило добавить после инцидента?' — Модельный Ответ: Запретить цепочки instanceof по Transaction в пакетах `..pipeline..`, кроме bootstrap registry в composition root. Требовать интеграционный тест, что каждый известный подтип Transaction успешно проходит pipeline."
          }
        }
      ]
    }
  ],
  prerequisiteConceptIds: ["cpt_interface_contracts"],
  sourceIds: ["src_head_first_ooad_poly", "src_effective_java_poly", "src_baeldung_polymorphism", "src_baeldung_instanceof"],
  verificationStatus: "TECHNICALLY_VERIFIED",
  tags: ["#polymorphism", "#type-switch-smell", "#transaction-pipeline", "#instanceof"],
  estimatedMinutes: 16,
  version: "1.0.0"
};

export const THEORY_CHECKPOINTS_POLYMORPHISM: readonly TheoryCheckpoint[] = [
  {
    id: "chk_poly_1",
    theoryArticleId: "art_theory_polymorphism",
    question: {
      en: "What is the primary design benefit of polymorphic Transaction.process() over an instanceof chain in TransactionPipeline?",
      ru: "В чём главный design-выигрыш полиморфного Transaction.process() перед цепочкой instanceof в TransactionPipeline?"
    },
    explanation: {
      en: "New subtypes bring their own process behavior without editing the pipeline's type switch.",
      ru: "Новые подтипы несут своё process-поведение без правки type switch pipeline."
    },
    options: [
      {
        id: "opt_poly1_a",
        text: {
          en: "New Transaction subtypes can supply process behavior without editing TransactionPipeline's type switch.",
          ru: "Новые подтипы Transaction могут дать process-поведение без правки type switch TransactionPipeline."
        },
        isCorrect: true,
        feedback: {
          en: "Correct! That is design-level polymorphism: open for new types, closed for pipeline modification.",
          ru: "Верно! Это design-level полиморфизм: открыто для новых типов, закрыто для модификации pipeline."
        }
      },
      {
        id: "opt_poly1_b",
        text: {
          en: "Polymorphic process() makes payments settle on the GPU.",
          ru: "Полиморфный process() заставляет платежи settle на GPU."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Polymorphism is about structure and substitutability, not hardware acceleration.",
          ru: "Неверно. Полиморфизм — про структуру и подставляемость, не про аппаратное ускорение."
        }
      },
      {
        id: "opt_poly1_c",
        text: {
          en: "instanceof is illegal in Java 17, so polymorphism is mandatory.",
          ru: "instanceof запрещён в Java 17, поэтому полиморфизм обязателен."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. instanceof is legal; the issue is maintainability and the type-switch smell.",
          ru: "Неверно. instanceof законен; проблема в поддерживаемости и smell type-switch."
        },
        misconceptionId: "err_type_switch_smell"
      }
    ],
    order: 1
  },
  {
    id: "chk_poly_2",
    theoryArticleId: "art_theory_polymorphism",
    question: {
      en: "Why can InstantTransaction exist in the hierarchy yet still fail inside TransactionPipeline?",
      ru: "Почему InstantTransaction может существовать в иерархии и всё равно падать внутри TransactionPipeline?"
    },
    explanation: {
      en: "instanceof chains are closed sets at the call site — missing Instant branch means else/reject/wrong route.",
      ru: "Цепочки instanceof — закрытые множества на call site; нет ветки Instant значит else/reject/неверный маршрут."
    },
    options: [
      {
        id: "opt_poly2_a",
        text: {
          en: "The pipeline's instanceof set is closed — without an Instant branch, Instant hits else even if the class exists.",
          ru: "Набор instanceof в pipeline закрыт — без ветки Instant, Instant попадает в else, даже если класс существует."
        },
        isCorrect: true,
        feedback: {
          en: "Correct! Type existence ≠ call-site knowledge under type-switch design.",
          ru: "Верно! Существование типа ≠ знание call site при дизайне type-switch."
        }
      },
      {
        id: "opt_poly2_b",
        text: {
          en: "The JVM forbids InstantTransaction until invokevirtual is megamorphic.",
          ru: "JVM запрещает InstantTransaction, пока invokevirtual не станет megamorphic."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. This is a design/call-site enumeration bug, not a HotSpot requirement.",
          ru: "Неверно. Это баг дизайна/перечисления на call site, не требование HotSpot."
        },
        misconceptionId: "err_poly_vs_strategy_confusion"
      },
      {
        id: "opt_poly2_c",
        text: {
          en: "InstantTransaction cannot implement Transaction without a PaymentChannel enum.",
          ru: "InstantTransaction не может реализовать Transaction без enum PaymentChannel."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Instant is a subtype in the Transaction hierarchy; PaymentChannel is a Strategy-domain concept.",
          ru: "Неверно. Instant — подтип в иерархии Transaction; PaymentChannel — концепт домена Strategy."
        }
      }
    ],
    order: 2
  },
  {
    id: "chk_poly_3",
    theoryArticleId: "art_theory_polymorphism",
    question: {
      en: "Which statement best separates this mission's polymorphism from Strategy Pattern?",
      ru: "Какое утверждение лучше отделяет полиморфизм этой миссии от паттерна Strategy?"
    },
    explanation: {
      en: "Strategy selects algorithms by context key; here Transaction subtypes supply substitutable process behavior.",
      ru: "Strategy выбирает алгоритмы по ключу контекста; здесь подтипы Transaction дают подставляемое process-поведение."
    },
    options: [
      {
        id: "opt_poly3_a",
        text: {
          en: "Strategy selects interchangeable algorithms by a context key; here the varying thing is Transaction subtype processing via substitutable behavior.",
          ru: "Strategy выбирает взаимозаменяемые алгоритмы по ключу контекста; здесь варьируется обработка подтипа Transaction через подставляемое поведение."
        },
        isCorrect: true,
        feedback: {
          en: "Correct! Same 'replace conditionals' family, different modeling intent.",
          ru: "Верно! То же семейство «заменить условия», другой modeling intent."
        }
      },
      {
        id: "opt_poly3_b",
        text: {
          en: "They are identical — always rename Transaction to FeeStrategy.",
          ru: "Они тождественны — всегда переименовывайте Transaction в FeeStrategy."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Conflating Strategy with subtype polymorphism confuses interview altitude.",
          ru: "Неверно. Смешение Strategy с полиморфизмом подтипов путает высоту ответа на интервью."
        },
        misconceptionId: "err_poly_vs_strategy_confusion"
      },
      {
        id: "opt_poly3_c",
        text: {
          en: "Polymorphism only means optimizing megamorphic invokevirtual call sites.",
          ru: "Полиморфизм значит только оптимизацию megamorphic call sites invokevirtual."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. That is JVM mechanics; this mission is design-level substitutability.",
          ru: "Неверно. Это механика JVM; эта миссия — design-level подставляемость."
        }
      }
    ],
    order: 3
  }
];
