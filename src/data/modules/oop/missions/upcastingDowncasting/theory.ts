import { TheoryArticle, TheoryCheckpoint } from '../../../../../types/domain';

export const THEORY_ARTICLE_UPCASTING_DOWNCASTING: TheoryArticle = {
  id: "art_theory_upcasting_downcasting",
  topicIds: ["top_oop_13"],
  conceptIds: ["cpt_upcasting", "cpt_downcasting"],
  title: {
    en: "Upcasting, Downcasting & Safe Fraud Event Handling",
    ru: "Upcasting, Downcasting и Безопасная Обработка Fraud-Событий"
  },
  summary: {
    en: "Upcasting widens a reference to a supertype (CardFraudEvent → FraudEvent) and is always safe at compile time. Downcasting narrows back to a subtype and is checked at runtime — a wrong cast throws ClassCastException. Pattern matching instanceof (Java 16+) binds safely; polymorphic extractEvidence() removes the need to cast at all.",
    ru: "Upcasting расширяет ссылку до супертипа (CardFraudEvent → FraudEvent) и всегда безопасен на этапе компиляции. Downcasting сужает обратно к подтипу и проверяется в runtime — неверный cast бросает ClassCastException. Pattern matching instanceof (Java 16+) привязывает безопасно; полиморфный extractEvidence() убирает необходимость кастить вовсе."
  },
  sections: [
    {
      id: "sec_cast_definition",
      category: "DEFINITION",
      title: {
        en: "1. Upcasting vs Downcasting on FraudEvent",
        ru: "1. Upcasting vs Downcasting на FraudEvent"
      },
      blocks: [
        {
          id: "blk_cast_def_1",
          type: "PARAGRAPH",
          content: {
            en: "Upcasting assigns a subtype reference to a supertype variable: `FraudEvent event = new CardFraudEvent(...)`. The compiler accepts it because every CardFraudEvent IS-A FraudEvent. No runtime check is needed. Downcasting goes the other way: `CardFraudEvent card = (CardFraudEvent) event`. The cast compiles if the types are related in the hierarchy, but the JVM verifies the actual object type at runtime.",
            ru: "Upcasting присваивает ссылку подтипа переменной супертипа: `FraudEvent event = new CardFraudEvent(...)`. Компилятор принимает это, потому что каждый CardFraudEvent IS-A FraudEvent. Runtime-проверка не нужна. Downcasting идёт в обратную сторону: `CardFraudEvent card = (CardFraudEvent) event`. Cast компилируется, если типы связаны в иерархии, но JVM проверяет фактический тип объекта в runtime."
          }
        },
        {
          id: "blk_cast_def_2",
          type: "CALLOUT",
          title: {
            en: "💡 Core Mental Model: Compile-Time Plausible ≠ Runtime Compatible",
            ru: "💡 Главная Ментальная Модель: Правдоподобно для Компилятора ≠ Совместимо в Runtime"
          },
          content: {
            en: "When `event` is typed as FraudEvent, `(CardFraudEvent) event` looks plausible to the compiler — AchFraudEvent, WireFraudEvent, and CardFraudEvent all share FraudEvent. At 02:00 an AchFraudEvent arrives; the JVM throws ClassCastException because AchFraudEvent is not a CardFraudEvent. Blind trust in 'we only ever send CARD/WIRE' is a production hazard.",
            ru: "Когда `event` имеет тип FraudEvent, `(CardFraudEvent) event` выглядит правдоподобно для компилятора — AchFraudEvent, WireFraudEvent и CardFraudEvent все разделяют FraudEvent. В 02:00 приходит AchFraudEvent; JVM бросает ClassCastException, потому что AchFraudEvent не является CardFraudEvent. Слепая вера в «мы всегда шлём только CARD/WIRE» — продакшн-риск."
          }
        }
      ]
    },
    {
      id: "sec_cast_mechanics",
      category: "MECHANICS",
      title: {
        en: "2. ClassCastException Mechanics & Pattern Matching instanceof",
        ru: "2. Механика ClassCastException и Pattern Matching instanceof"
      },
      blocks: [
        {
          id: "blk_cast_mech_1",
          type: "PARAGRAPH",
          content: {
            en: "JLS casting contexts (§5.5) allow narrowing reference conversions that are checked at run time. If the object's runtime class is not assignment-compatible with the target type, the JVM throws ClassCastException. Classic mitigation: `if (event instanceof CardFraudEvent) { CardFraudEvent card = (CardFraudEvent) event; ... }` — test then cast. Java 16+ finalizes pattern matching for instanceof (JEP 394): `if (event instanceof CardFraudEvent card) { ... }` combines the test, cast, and binding in one expression, eliminating mismatched cast bugs.",
            ru: "Контексты casting в JLS (§5.5) допускают сужающие преобразования ссылок с проверкой в runtime. Если runtime-класс объекта не assignment-compatible с целевым типом, JVM бросает ClassCastException. Классическая защита: `if (event instanceof CardFraudEvent) { CardFraudEvent card = (CardFraudEvent) event; ... }` — сначала проверка, потом cast. Java 16+ финализирует pattern matching для instanceof (JEP 394): `if (event instanceof CardFraudEvent card) { ... }` объединяет проверку, cast и привязку в одном выражении, устраняя баги рассинхрона типов."
          }
        },
        {
          id: "blk_cast_mech_2",
          type: "WARNING",
          title: {
            en: "⚙️ Channel String + Blind Cast = 02:00 Outage Class",
            ru: "⚙️ Строка Канала + Слепой Cast = Класс Аварии в 02:00"
          },
          content: {
            en: "FraudInvestigationService often branched on `event.channel()` string then cast: if \"CARD\" → (CardFraudEvent), if \"WIRE\" → (WireFraudEvent). When ACH launched, channel=\"ACH\" either fell into a wrong branch or still hit a default Card cast. String discriminators and runtime types can diverge — prefer type-driven control flow or polymorphism, not parallel string enums that drift.",
            ru: "FraudInvestigationService часто ветвился по строке `event.channel()`, затем кастил: если \"CARD\" → (CardFraudEvent), если \"WIRE\" → (WireFraudEvent). При запуске ACH channel=\"ACH\" либо попадал в неверную ветку, либо всё равно шёл в default Card cast. Строковые дискриминаторы и runtime-типы могут расходиться — предпочитайте type-driven control flow или полиморфизм, а не параллельные строковые enum'ы, которые дрейфуют."
          }
        },
        {
          id: "blk_cast_mech_3",
          type: "CALLOUT",
          title: {
            en: "📜 Pattern Variable Scope Is the Safety Net",
            ru: "📜 Scope Pattern-Переменной — Страховочная Сеть"
          },
          content: {
            en: "In `if (event instanceof CardFraudEvent card)`, `card` is in scope only where the match is guaranteed true. You cannot accidentally use `card` in the else branch. That scoping rule removes an entire class of 'checked one type, cast another' mistakes that plagued pre-Java-16 instanceof + separate cast pairs.",
            ru: "В `if (event instanceof CardFraudEvent card)` переменная `card` в scope только там, где match гарантированно true. Нельзя случайно использовать `card` в else. Это правило scoping убирает целый класс ошибок «проверили один тип, кастнули другой», преследовавших пары instanceof + отдельный cast до Java 16."
          }
        }
      ]
    },
    {
      id: "sec_cast_tradeoffs",
      category: "TRADE_OFFS",
      title: {
        en: "3. Trade-offs: Pattern Matching vs Polymorphic extractEvidence()",
        ru: "3. Компромиссы: Pattern Matching vs Полиморфный extractEvidence()"
      },
      blocks: [
        {
          id: "blk_cast_trade_1",
          type: "PARAGRAPH",
          content: {
            en: "Pattern matching instanceof is the correct local fix when you must branch on concrete types at a boundary you do not own. It is still a type-switch smell if every new fraud rail (ACH, Instant, Crypto) forces editing FraudInvestigationService. The stronger design: declare `abstract FraudEvidence extractEvidence()` on FraudEvent; CardFraudEvent, WireFraudEvent, AchFraudEvent override it. The service calls `event.extractEvidence()` — zero casts, OCP-friendly extension, and subtype-specific fields stay encapsulated.",
            ru: "Pattern matching instanceof — правильный локальный фикс, когда нужно ветвиться по конкретным типам на границе, которой вы не владеете. Это всё ещё smell type-switch, если каждый новый fraud-рейл (ACH, Instant, Crypto) вынуждает править FraudInvestigationService. Более сильный дизайн: объявить `abstract FraudEvidence extractEvidence()` на FraudEvent; CardFraudEvent, WireFraudEvent, AchFraudEvent переопределяют его. Сервис вызывает `event.extractEvidence()` — ноль cast'ов, OCP-дружественное расширение, subtype-specific поля остаются инкапсулированными."
          }
        },
        {
          id: "blk_cast_trade_2",
          type: "CALLOUT",
          title: {
            en: "🔧 When instanceof Chains Still Make Sense",
            ru: "🔧 Когда Цепочки instanceof Всё Ещё Имеют Смысл"
          },
          content: {
            en: "Use pattern matching when (1) FraudEvent hierarchy is sealed/closed and exhaustiveness matters, (2) evidence extraction is a cross-cutting adapter outside the domain types, or (3) you are migrating legacy cast code incrementally. Prefer polymorphism when evidence logic naturally belongs with each event subtype and new rails ship as new classes owned by feature teams.",
            ru: "Используйте pattern matching, когда (1) иерархия FraudEvent sealed/закрыта и важна exhaustiveness, (2) извлечение evidence — cross-cutting adapter вне доменных типов, или (3) вы мигрируете legacy cast-код инкрементально. Предпочитайте полиморфизм, когда логика evidence естественно принадлежит каждому подтипу события, а новые рейлы выкатываются как новые классы feature-команд."
          }
        }
      ]
    },
    {
      id: "sec_cast_interview_followups",
      category: "INTERVIEW_GUIDANCE",
      title: {
        en: "4. Senior Interview Follow-Up Questions: Casting & Polymorphism",
        ru: "4. Дополнительные Вопросы Senior-Интервью: Casting и Полиморфизм"
      },
      blocks: [
        {
          id: "blk_cast_fup_01",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q1: 'Is upcasting ever dangerous?' — Model Answer: Upcasting itself is type-safe. Danger appears later when code assumes a specific subtype and downcasts. Losing subtype API surface is the trade-off, not a crash.",
            ru: "Доп. Вопрос 1: 'Опасен ли когда-либо upcasting?' — Модельный Ответ: Сам upcasting типобезопасен. Опасность появляется позже, когда код предполагает конкретный подтип и делает downcast. Потеря subtype API — компромисс, не краш."
          }
        },
        {
          id: "blk_cast_fup_02",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q2: 'Why did AchFraudEvent compile into investigate(FraudEvent)?' — Model Answer: AchFraudEvent extends FraudEvent, so upcast at the call site is legal. Compilation does not prove every downcast inside the method is valid for all possible runtime subtypes.",
            ru: "Доп. Вопрос 2: 'Почему AchFraudEvent скомпилировался в investigate(FraudEvent)?' — Модельный Ответ: AchFraudEvent extends FraudEvent, поэтому upcast на call site законен. Компиляция не доказывает, что каждый downcast внутри метода валиден для всех возможных runtime-подтипов."
          }
        },
        {
          id: "blk_cast_fup_03",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q3: 'instanceof then cast vs pattern matching — difference?' — Model Answer: Classic form can drift (check A, cast B). Pattern matching binds one type in one expression with scoped pattern variables — safer and shorter.",
            ru: "Доп. Вопрос 3: 'instanceof затем cast vs pattern matching — в чём разница?' — Модельный Ответ: Классическая форма может разъехаться (проверили A, кастнули B). Pattern matching привязывает один тип в одном выражении со scoped pattern-переменными — безопаснее и короче."
          }
        },
        {
          id: "blk_cast_fup_04",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q4: 'Is catching ClassCastException a good strategy?' — Model Answer: No. Treat it as a programming error. Fix with instanceof/polymorphism; catching hides the design smell and can swallow unrelated cast bugs.",
            ru: "Доп. Вопрос 4: 'Хорошая ли стратегия ловить ClassCastException?' — Модельный Ответ: Нет. Считайте это ошибкой программирования. Фиксите instanceof/полиморфизмом; catch скрывает design smell и может проглотить несвязанные cast-баги."
          }
        },
        {
          id: "blk_cast_fup_05",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q5: 'How does this relate to Liskov Substitution?' — Model Answer: Clients of FraudEvent must not require knowledge of Card vs Wire vs ACH internals. Blind downcasts violate the spirit of LSP by forcing callers to know concrete subtypes.",
            ru: "Доп. Вопрос 5: 'Как это связано с Liskov Substitution?' — Модельный Ответ: Клиенты FraudEvent не должны требовать знания внутренностей Card vs Wire vs ACH. Слепые downcast нарушают дух LSP, заставляя вызывающий код знать конкретные подтипы."
          }
        },
        {
          id: "blk_cast_fup_06",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q6: 'Visitor vs extractEvidence() here?' — Model Answer: extractEvidence() is simple polymorphism when one operation varies by type. Visitor fits when many external operations need double dispatch over a closed hierarchy without polluting FraudEvent.",
            ru: "Доп. Вопрос 6: 'Visitor vs extractEvidence() здесь?' — Модельный Ответ: extractEvidence() — простой полиморфизм, когда одна операция варьируется по типу. Visitor подходит, когда много внешних операций нуждаются в double dispatch по закрытой иерархии без загрязнения FraudEvent."
          }
        },
        {
          id: "blk_cast_fup_07",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q7: 'Can sealed FraudEvent + switch patterns replace polymorphism?' — Model Answer: Sealed + switch pattern matching gives exhaustiveness at the service. Still centralizes knowledge of all subtypes. Prefer polymorphism when subtypes own evidence rules; use sealed switch at anti-corruption boundaries.",
            ru: "Доп. Вопрос 7: 'Могут ли sealed FraudEvent + switch patterns заменить полиморфизм?' — Модельный Ответ: Sealed + switch pattern matching даёт exhaustiveness в сервисе. Всё равно централизует знание всех подтипов. Предпочитайте полиморфизм, когда подтипы владеют правилами evidence; sealed switch — на anti-corruption границах."
          }
        },
        {
          id: "blk_cast_fup_08",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q8: 'What about generics and ClassCastException?' — Model Answer: Raw types / unchecked casts can insert heap pollution that surfaces later as ClassCastException. Keep generics reified at boundaries; avoid `(List<CardFraudEvent>) (List)` style casts.",
            ru: "Доп. Вопрос 8: 'А generics и ClassCastException?' — Модельный Ответ: Raw types / unchecked casts могут внести heap pollution, всплывающий позже как ClassCastException. Держите generics явными на границах; избегайте cast'ов в стиле `(List<CardFraudEvent>) (List)`."
          }
        },
        {
          id: "blk_cast_fup_09",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q9: 'Why not cast to Object then back?' — Model Answer: Casting via Object does not add safety. Runtime type must still be compatible. It only obscures intent and can silence compile-time warnings you needed.",
            ru: "Доп. Вопрос 9: 'Почему не кастить через Object и обратно?' — Модельный Ответ: Cast через Object не добавляет безопасности. Runtime-тип всё равно должен быть совместим. Это только затемняет intent и может заглушить нужные compile-time warnings."
          }
        },
        {
          id: "blk_cast_fup_10",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q10: 'How would you prevent regression after ACH?' — Model Answer: Unit-test investigate() with Card, Wire, and Ach fixtures asserting no ClassCastException. ArchUnit rule forbidding casts to CardFraudEvent/WireFraudEvent inside the service package once polymorphism lands.",
            ru: "Доп. Вопрос 10: 'Как предотвратить регрессию после ACH?' — Модельный Ответ: Юнит-тест investigate() с фикстурами Card, Wire и Ach без ClassCastException. ArchUnit-правило, запрещающее cast к CardFraudEvent/WireFraudEvent в пакете сервиса после внедрения полиморфизма."
          }
        },
        {
          id: "blk_cast_fup_11",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q11: 'Does getClass() equality help before cast?' — Model Answer: Prefer instanceof (or pattern matching) which respects subtypes. `getClass() == CardFraudEvent.class` rejects legitimate subclasses and is usually the wrong check for open hierarchies.",
            ru: "Доп. Вопрос 11: 'Помогает ли getClass() equality перед cast?' — Модельный Ответ: Предпочитайте instanceof (или pattern matching), учитывающий подтипы. `getClass() == CardFraudEvent.class` отвергает легитимные subclasses и обычно неверен для открытых иерархий."
          }
        },
        {
          id: "blk_cast_fup_12",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q12: 'One-line production lesson?' — Model Answer: Upcast freely at API boundaries; never downcast without a type test or, better, push behavior into the subtype so the cast disappears.",
            ru: "Доп. Вопрос 12: 'Урок продакшена в одну строку?' — Модельный Ответ: Upcast свободно на API-границах; никогда не downcast без проверки типа или, лучше, перенесите поведение в подтип, чтобы cast исчез."
          }
        }
      ]
    }
  ],
  prerequisiteConceptIds: ["cpt_inheritance", "cpt_polymorphism"],
  sourceIds: ["src_jls_casting", "src_oracle_pattern_matching_instanceof", "src_baeldung_pattern_matching_instanceof", "src_baeldung_classcastexception"],
  verificationStatus: "TECHNICALLY_VERIFIED",
  tags: ["#upcasting", "#downcasting", "#instanceof", "#classcastexception"],
  estimatedMinutes: 16,
  version: "1.0.0"
};

export const THEORY_CHECKPOINTS_UPCASTING_DOWNCASTING: readonly TheoryCheckpoint[] = [
  {
    id: "chk_cast_1",
    theoryArticleId: "art_theory_upcasting_downcasting",
    question: {
      en: "Why can FraudInvestigationService.accept(FraudEvent) compile for AchFraudEvent yet still throw ClassCastException inside investigate()?",
      ru: "Почему FraudInvestigationService.accept(FraudEvent) компилируется для AchFraudEvent, но всё равно бросает ClassCastException внутри investigate()?"
    },
    explanation: {
      en: "Upcast to FraudEvent is always safe; a subsequent blind downcast to CardFraudEvent fails when the runtime type is AchFraudEvent.",
      ru: "Upcast к FraudEvent всегда безопасен; последующий слепой downcast к CardFraudEvent падает, когда runtime-тип — AchFraudEvent."
    },
    options: [
      {
        id: "opt_cast1_a",
        text: {
          en: "Upcasting AchFraudEvent to FraudEvent is legal; a later (CardFraudEvent) cast is checked at runtime and fails for ACH.",
          ru: "Upcast AchFraudEvent к FraudEvent законен; поздний cast (CardFraudEvent) проверяется в runtime и падает для ACH."
        },
        isCorrect: true,
        feedback: {
          en: "Correct! Compile-time upcast safety does not validate every downcast path.",
          ru: "Верно! Безопасность upcast на этапе компиляции не валидирует каждый путь downcast."
        }
      },
      {
        id: "opt_cast1_b",
        text: {
          en: "AchFraudEvent cannot be passed as FraudEvent — the compiler should have rejected it.",
          ru: "AchFraudEvent нельзя передать как FraudEvent — компилятор должен был отклонить."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. AchFraudEvent IS-A FraudEvent, so the upcast compiles.",
          ru: "Неверно. AchFraudEvent IS-A FraudEvent, поэтому upcast компилируется."
        },
        misconceptionId: "err_upcast_unsafe"
      },
      {
        id: "opt_cast1_c",
        text: {
          en: "ClassCastException means the JVM ran out of metaspace for ACH types.",
          ru: "ClassCastException значит, что у JVM закончился metaspace для типов ACH."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. ClassCastException is a type incompatibility at cast time, not a metaspace issue.",
          ru: "Неверно. ClassCastException — несовместимость типов при cast, не проблема metaspace."
        }
      }
    ],
    order: 1
  },
  {
    id: "chk_cast_2",
    theoryArticleId: "art_theory_upcasting_downcasting",
    question: {
      en: "What is the primary safety win of `if (event instanceof CardFraudEvent card)` over separate instanceof + cast?",
      ru: "В чём главный выигрыш безопасности `if (event instanceof CardFraudEvent card)` перед отдельными instanceof + cast?"
    },
    explanation: {
      en: "Pattern matching binds the checked type in one expression with scoped pattern variables — no mismatched cast.",
      ru: "Pattern matching привязывает проверенный тип в одном выражении со scoped pattern-переменными — без рассинхрона cast."
    },
    options: [
      {
        id: "opt_cast2_a",
        text: {
          en: "The pattern variable is bound only when the type matches, combining test and cast so they cannot drift apart.",
          ru: "Pattern-переменная привязывается только при совпадении типа, объединяя проверку и cast так, что они не разъедутся."
        },
        isCorrect: true,
        feedback: {
          en: "Correct! That is the JEP 394 / pattern matching instanceof safety model.",
          ru: "Верно! Это модель безопасности JEP 394 / pattern matching instanceof."
        }
      },
      {
        id: "opt_cast2_b",
        text: {
          en: "Pattern matching disables ClassCastException for all casts in the JVM.",
          ru: "Pattern matching отключает ClassCastException для всех cast'ов в JVM."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Blind casts elsewhere still throw; pattern matching only scopes the safe binding.",
          ru: "Неверно. Слепые cast'ы в другом месте всё ещё бросают; pattern matching только ограничивает безопасную привязку."
        },
        misconceptionId: "err_blind_downcast"
      },
      {
        id: "opt_cast2_c",
        text: {
          en: "It converts AchFraudEvent into CardFraudEvent automatically.",
          ru: "Он автоматически превращает AchFraudEvent в CardFraudEvent."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Pattern matching never converts unrelated subtypes — the branch simply does not match.",
          ru: "Неверно. Pattern matching никогда не конвертирует несвязанные подтипы — ветка просто не совпадает."
        }
      }
    ],
    order: 2
  },
  {
    id: "chk_cast_3",
    theoryArticleId: "art_theory_upcasting_downcasting",
    question: {
      en: "Why is polymorphic FraudEvent.extractEvidence() often better than growing instanceof chains in FraudInvestigationService?",
      ru: "Почему полиморфный FraudEvent.extractEvidence() часто лучше растущих цепочек instanceof в FraudInvestigationService?"
    },
    explanation: {
      en: "New fraud rails add overrides without editing the service; casts and type-switches disappear from the hot path.",
      ru: "Новые fraud-рейлы добавляют overrides без правки сервиса; cast'ы и type-switch исчезают из горячего пути."
    },
    options: [
      {
        id: "opt_cast3_a",
        text: {
          en: "Each subtype owns evidence extraction — the service delegates without casting, and new rails extend without editing the service.",
          ru: "Каждый подтип владеет извлечением evidence — сервис делегирует без cast'ов, новые рейлы расширяются без правки сервиса."
        },
        isCorrect: true,
        feedback: {
          en: "Correct! Polymorphism eliminates the cast-heavy type switch smell.",
          ru: "Верно! Полиморфизм устраняет smell type-switch с обилием cast'ов."
        }
      },
      {
        id: "opt_cast3_b",
        text: {
          en: "Polymorphism makes ClassCastException throw earlier at class-load time.",
          ru: "Полиморфизм заставляет ClassCastException бросаться раньше — при загрузке класса."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Polymorphism removes the cast; ClassCastException should not occur on this path.",
          ru: "Неверно. Полиморфизм убирает cast; ClassCastException на этом пути не должен возникать."
        },
        misconceptionId: "err_cast_instead_of_polymorphism"
      },
      {
        id: "opt_cast3_c",
        text: {
          en: "extractEvidence() must still downcast to CardFraudEvent inside FraudEvent itself.",
          ru: "extractEvidence() всё равно должен downcast'ить к CardFraudEvent внутри самого FraudEvent."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Overrides in concrete subtypes access their own fields — no cast required.",
          ru: "Неверно. Overrides в конкретных подтипах обращаются к своим полям — cast не нужен."
        }
      }
    ],
    order: 3
  }
];
