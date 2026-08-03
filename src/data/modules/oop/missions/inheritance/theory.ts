import { TheoryArticle, TheoryCheckpoint } from '../../../../../types/domain';

export const THEORY_ARTICLE_INHERITANCE: TheoryArticle = {
  id: "art_theory_inheritance",
  topicIds: ["top_oop_10"],
  conceptIds: ["cpt_inheritance", "cpt_inherited_state"],
  title: {
    en: "Inheritance Mechanics: IS-A, Constructors & Protected Coupling",
    ru: "Механика Наследования: IS-A, Конструкторы и Protected-Связность"
  },
  summary: {
    en: "Inheritance creates an IS-A subtype that reuses superclass state and behavior. Constructor chaining initializes the base before the subclass body runs. Undocumented protected members are not a stable API — BaseRegulatoryReport subclasses that relied on them silently filed wrong headers and double-serialized sections after a platform change.",
    ru: "Наследование создаёт подтип IS-A, переиспользующий состояние и поведение суперкласса. Цепочка конструкторов инициализирует базу до тела подкласса. Недокументированные protected-члены — не стабильный API: подклассы BaseRegulatoryReport, опиравшиеся на них, молча сдали неверные заголовки и дважды сериализованные секции после изменения платформы."
  },
  sections: [
    {
      id: "sec_inh_definition",
      category: "DEFINITION",
      title: {
        en: "1. Inheritance & IS-A: What Subclasses Actually Get",
        ru: "1. Наследование и IS-A: Что Реально Получают Подклассы"
      },
      blocks: [
        {
          id: "blk_inh_def_1",
          type: "PARAGRAPH",
          content: {
            en: "In Java, `class LiquidityReport extends BaseRegulatoryReport` declares an IS-A relationship: every LiquidityReport is a BaseRegulatoryReport. The subclass inherits instance fields and methods (subject to access rules). JLS 8.1.4 defines superclass/subclass relationships; inherited members become part of the subclass type for overriding, casting, and polymorphic use.",
            ru: "В Java `class LiquidityReport extends BaseRegulatoryReport` объявляет отношение IS-A: каждый LiquidityReport является BaseRegulatoryReport. Подкласс наследует поля и методы экземпляра (с учётом доступа). JLS 8.1.4 определяет отношения superclass/subclass; унаследованные члены входят в тип подкласса для overriding, приведения и полиморфного использования."
          }
        },
        {
          id: "blk_inh_def_2",
          type: "CALLOUT",
          title: {
            en: "💡 Core Mental Model: Inheritance Couples Lifecycle + Internals",
            ru: "💡 Главная Ментальная Модель: Наследование Связывает Lifecycle + Внутренности"
          },
          content: {
            en: "Unlike calling a helper, inheritance couples construction order, protected state, and self-use call patterns. LiquidityReport, RiskExposureReport, and CapitalAdequacyReport did not merely 'reuse formatting' — they became dependents of BaseRegulatoryReport's protected headerVersion and appendSection semantics. When those semantics changed, filings broke without a red squiggle in the IDE.",
            ru: "В отличие от вызова хелпера, наследование связывает порядок конструкции, protected-состояние и паттерны self-use. LiquidityReport, RiskExposureReport и CapitalAdequacyReport не просто 'переиспользовали форматирование' — они стали зависимы от семантики protected headerVersion и appendSection в BaseRegulatoryReport. Когда семантика изменилась, filings сломались без красной волны в IDE."
          }
        }
      ]
    },
    {
      id: "sec_inh_mechanics",
      category: "MECHANICS",
      title: {
        en: "2. Constructor Chaining & Inherited Protected State",
        ru: "2. Цепочка Конструкторов и Унаследованное Protected-Состояние"
      },
      blocks: [
        {
          id: "blk_inh_mech_1",
          type: "PARAGRAPH",
          content: {
            en: "Subclass construction always starts with an explicit or implicit `super(...)` call. The superclass constructor runs to completion first — including any writes into shared buffers using current field values. Only then do subclass field initializers and the subclass constructor body run. Mutating `this.headerVersion = \"LIQ-EXT-1\"` after `super(\"LIQUIDITY\")` cannot rewrite a header the base already appended with `REG-HDR-2`.",
            ru: "Конструирование подкласса всегда начинается с явного или неявного `super(...)`. Конструктор суперкласса выполняется до конца первым — включая записи в общие буферы с текущими значениями полей. Лишь затем выполняются инициализаторы полей подкласса и тело его конструктора. Мутация `this.headerVersion = \"LIQ-EXT-1\"` после `super(\"LIQUIDITY\")` не перепишет заголовок, который база уже добавила с `REG-HDR-2`."
          }
        },
        {
          id: "blk_inh_mech_2",
          type: "WARNING",
          title: {
            en: "⚙️ Production Hazard: Protected Semantics Are a Silent Contract",
            ru: "⚙️ Продакшн-Риск: Protected-Семантика — Тихий Контракт"
          },
          content: {
            en: "Platform upgraded BaseRegulatoryReport: default `headerVersion` became `REG-HDR-2`, and `appendSection` began Base64-wrapping payloads. Subclasses that already encoded LCR/RWA/CAR payloads produced double-serialized sections. Compilers do not version-check protected method meaning — only signatures. That is inherited-state coupling: the subclass depended on an undocumented behavioral contract.",
            ru: "Платформа обновила BaseRegulatoryReport: default `headerVersion` стал `REG-HDR-2`, а `appendSection` начал Base64-оборачивать payload. Подклассы, уже кодировавшие LCR/RWA/CAR payload, получили дважды сериализованные секции. Компиляторы не проверяют версию смысла protected-метода — только сигнатуры. Это связность унаследованного состояния: подкласс зависел от недокументированного поведенческого контракта."
          }
        },
        {
          id: "blk_inh_mech_3",
          type: "CALLOUT",
          title: {
            en: "📜 Item 19: Design and Document for Inheritance or Prohibit It",
            ru: "📜 Item 19: Проектируйте и Документируйте для Наследования или Запретите"
          },
          content: {
            en: "Effective Java Item 19: if a class is open to subclassing, document self-use and protected contracts (`@implSpec`), keep overridable hooks intentional, and avoid calling overridable methods from constructors. Otherwise mark the class `final` / sealed and expose composition-friendly collaborators. BaseRegulatoryReport was treated as a reuse dump, not a designed extension surface.",
            ru: "Effective Java Item 19: если класс открыт для subclassing, документируйте self-use и protected-контракты (`@implSpec`), делайте overridable-хуки намеренными и не вызывайте overridable-методы из конструкторов. Иначе пометьте класс `final` / sealed и дайте composition-friendly коллабораторы. BaseRegulatoryReport использовали как свалку переиспользования, а не спроектированную поверхность расширения."
          }
        }
      ]
    },
    {
      id: "sec_inh_tradeoffs",
      category: "TRADE_OFFS",
      title: {
        en: "3. Trade-offs: Sealed Inheritance Hooks vs Composition for Assembly",
        ru: "3. Компромиссы: Sealed Inheritance Hooks vs Композиция Сборки"
      },
      blocks: [
        {
          id: "blk_inh_trade_1",
          type: "PARAGRAPH",
          content: {
            en: "When report types truly share an IS-A lifecycle (one filing envelope, mandatory header/footer, typed section hooks), a designed abstract base can work: `final` skeleton methods, documented protected hooks, constructor parameters for header metadata, and integration tests that freeze filing fixtures across platform releases.",
            ru: "Когда типы отчётов действительно разделяют lifecycle IS-A (один конверт filing, обязательные header/footer, типизированные хуки секций), спроектированный abstract base может работать: `final`-скелет, документированные protected-хуки, параметры конструктора для метаданных заголовка и интеграционные тесты, фиксирующие fixtures filings между релизами платформы."
          }
        },
        {
          id: "blk_inh_trade_2",
          type: "CALLOUT",
          title: {
            en: "🔧 Trade-off Only: Composition for Report Assembly",
            ru: "🔧 Только Компромисс: Композиция для Сборки Отчёта"
          },
          content: {
            en: "If the goal is merely shared formatting helpers — not behavioral substitutability — prefer a RegulatoryFilingAssembler / HeaderFormatter collaborator (composition). That is a trade-off mentioned here, not the mission's primary fix narrative (see the dedicated composition-over-inheritance mission). This mission's primary lesson remains inheritance mechanics and Item 19 discipline.",
            ru: "Если цель — лишь общие хелперы форматирования, а не поведенческая подстановка — предпочитайте коллаборатор RegulatoryFilingAssembler / HeaderFormatter (композиция). Это компромисс, упомянутый здесь, а не основной сюжет фикса миссии (см. отдельную миссию composition-over-inheritance). Главный урок этой миссии — механика наследования и дисциплина Item 19."
          }
        }
      ]
    },
    {
      id: "sec_inh_interview_followups",
      category: "INTERVIEW_GUIDANCE",
      title: {
        en: "4. Senior Interview Follow-Up Questions: Inheritance Risks",
        ru: "4. Дополнительные Вопросы Senior-Интервью: Риски Наследования"
      },
      blocks: [
        {
          id: "blk_inh_fup_01",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q1: 'What does IS-A mean for LiquidityReport extends BaseRegulatoryReport?' — Model Answer: LiquidityReport is a BaseRegulatoryReport subtype: it inherits state/behavior and must honor the base's behavioral contract wherever the base type is expected.",
            ru: "Доп. Вопрос 1: 'Что значит IS-A для LiquidityReport extends BaseRegulatoryReport?' — Модельный Ответ: LiquidityReport — подтип BaseRegulatoryReport: наследует состояние/поведение и должен соблюдать поведенческий контракт базы везде, где ожидается базовый тип."
          }
        },
        {
          id: "blk_inh_fup_02",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q2: 'Why can protected changes break subclasses without compile errors?' — Model Answer: The compiler checks signatures/access, not semantic versioning of protected behavior. Encoding changes inside appendSection preserve the method signature while altering meaning.",
            ru: "Доп. Вопрос 2: 'Почему protected-изменения ломают подклассы без ошибок компиляции?' — Модельный Ответ: Компилятор проверяет сигнатуры/доступ, не semantic versioning protected-поведения. Смена кодирования внутри appendSection сохраняет сигнатуру, меняя смысл."
          }
        },
        {
          id: "blk_inh_fup_03",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q3: 'Describe constructor chaining for LiquidityReport.' — Model Answer: `new LiquidityReport(...)` enters the subclass constructor, calls `super(...)`, runs BaseRegulatoryReport construction (header write), then returns to subclass body (section appends). Field mutations after super cannot rewind earlier writes.",
            ru: "Доп. Вопрос 3: 'Опишите цепочку конструкторов для LiquidityReport.' — Модельный Ответ: `new LiquidityReport(...)` входит в конструктор подкласса, вызывает `super(...)`, выполняет конструирование BaseRegulatoryReport (запись заголовка), затем возвращается в тело подкласса (добавление секций). Мутации полей после super не откатывают ранние записи."
          }
        },
        {
          id: "blk_inh_fup_04",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q4: 'What is the fragile base class problem here?' — Model Answer: Subclasses depend on base internals; seemingly safe base edits (default version, section encoding) invalidate subclass assumptions. Inheritance amplifies blast radius across Liquidity/Risk/Capital reports.",
            ru: "Доп. Вопрос 4: 'В чём здесь fragile base class?' — Модельный Ответ: Подклассы зависят от внутренностей базы; кажущиеся безопасными правки базы (default version, кодирование секций) ломают допущения подклассов. Наследование увеличивает blast radius на Liquidity/Risk/Capital."
          }
        },
        {
          id: "blk_inh_fup_05",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q5: 'How do you design BaseRegulatoryReport for inheritance safely?' — Model Answer: Document protected hooks with @implSpec; make the public/render skeleton final; pass header metadata via constructor args; never call overridable methods from constructors; freeze golden filing fixtures in CI.",
            ru: "Доп. Вопрос 5: 'Как безопасно спроектировать BaseRegulatoryReport для наследования?' — Модельный Ответ: Документируйте protected-хуки через @implSpec; сделайте public/render-скелет final; передавайте метаданные заголовка аргументами конструктора; не вызывайте overridable-методы из конструкторов; фиксируйте golden filing fixtures в CI."
          }
        },
        {
          id: "blk_inh_fup_06",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q6: 'When would you prohibit inheritance instead?' — Model Answer: When the class was never designed with documented hooks, or when teams only need shared formatting — seal/final the class and offer a collaborator API.",
            ru: "Доп. Вопрос 6: 'Когда запретить наследование?' — Модельный Ответ: Когда класс никогда не проектировали с документированными хуками, или командам нужно лишь общее форматирование — seal/final и collaborator API."
          }
        },
        {
          id: "blk_inh_fup_07",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q7: 'Is composition the mandatory fix?' — Model Answer: No — it is a trade-off when IS-A/extension was not designed. This incident can also be fixed by sealing/documenting the inheritance contract. Do not conflate with the composition-over-inheritance mission.",
            ru: "Доп. Вопрос 7: 'Композиция — обязательный фикс?' — Модельный Ответ: Нет — это компромисс, когда IS-A/расширение не проектировали. Инцидент также чинится seal/документацией контракта наследования. Не смешивать с миссией composition-over-inheritance."
          }
        },
        {
          id: "blk_inh_fup_08",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q8: 'Why did RiskExposureReport and CapitalAdequacyReport break too?' — Model Answer: Same brittle coupling pattern: each subclass trusted the same undocumented protected semantics of one shared base.",
            ru: "Доп. Вопрос 8: 'Почему сломались и RiskExposureReport с CapitalAdequacyReport?' — Модельный Ответ: Тот же паттерн хрупкой связности: каждый подкласс доверял одной недокументированной protected-семантике общей базы."
          }
        },
        {
          id: "blk_inh_fup_09",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q9: 'How does Head First OOA&D frame this?' — Model Answer: Favor clear responsibilities and beware inheritance for mere reuse; encapsulate what varies behind intentional contracts rather than leaking base guts to subclasses.",
            ru: "Доп. Вопрос 9: 'Как это формулирует Head First OOA&D?' — Модельный Ответ: Чёткие обязанности и осторожность с наследованием ради reuse; инкапсулировать изменяемое за намеренными контрактами, а не отдавать внутренности базы подклассам."
          }
        },
        {
          id: "blk_inh_fup_10",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q10: 'What test would have caught double serialization?' — Model Answer: Golden-file / snapshot tests of renderFiling() for each report type against known-good regulator bytes — fail CI when encoding or header version drifts.",
            ru: "Доп. Вопрос 10: 'Какой тест поймал бы двойную сериализацию?' — Модельный Ответ: Golden-file / snapshot тесты renderFiling() для каждого типа отчёта против эталонных байт регулятора — падение CI при дрейфе encoding или версии заголовка."
          }
        },
        {
          id: "blk_inh_fup_11",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q11: 'Protected vs package-private for hooks?' — Model Answer: Prefer the narrowest access that supports the designed hierarchy. Documented package-private/protected hooks beat a wide protected surface of accidental fields.",
            ru: "Доп. Вопрос 11: 'Protected vs package-private для хуков?' — Модельный Ответ: Предпочитайте самый узкий доступ, поддерживающий спроектированную иерархию. Документированные package-private/protected хуки лучше широкой protected-поверхности случайных полей."
          }
        },
        {
          id: "blk_inh_fup_12",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q12: 'What review rule would you add?' — Model Answer: Ban new subclasses of platform bases lacking Item-19 documentation; require constructor-arg header metadata; forbid mutating inherited fields after super for filing-critical state.",
            ru: "Доп. Вопрос 12: 'Какое review-правило добавить?' — Модельный Ответ: Запретить новые подклассы платформенных base без документации Item 19; требовать header metadata через аргументы конструктора; запретить мутацию унаследованных полей после super для filing-критичного состояния."
          }
        }
      ]
    }
  ],
  prerequisiteConceptIds: ["cpt_access_modifiers"],
  sourceIds: ["src_jls_inheritance", "src_effective_java_item19_inheritance", "src_head_first_ooad_inheritance"],
  verificationStatus: "TECHNICALLY_VERIFIED",
  tags: ["#inheritance", "#inherited-state", "#fragile-base-class", "#regulatory-report"],
  estimatedMinutes: 16,
  version: "1.0.0"
};

export const THEORY_CHECKPOINTS_INHERITANCE: readonly TheoryCheckpoint[] = [
  {
    id: "chk_inh_1",
    theoryArticleId: "art_theory_inheritance",
    question: {
      en: "Why did mutating headerVersion in the LiquidityReport constructor body fail to fix the filing header after the platform upgrade?",
      ru: "Почему мутация headerVersion в теле конструктора LiquidityReport не исправила заголовок filing после апгрейда платформы?"
    },
    explanation: {
      en: "super() runs first and BaseRegulatoryReport already wrote the header using the then-current headerVersion.",
      ru: "super() выполняется первым, и BaseRegulatoryReport уже записал заголовок с тогдашним headerVersion."
    },
    options: [
      {
        id: "opt_inh1_a",
        text: {
          en: "Because super() completed first and writeRegulatoryHeader already appended the header using the base default version.",
          ru: "Потому что super() завершился первым и writeRegulatoryHeader уже добавил заголовок с default-версией базы."
        },
        isCorrect: true,
        feedback: {
          en: "Correct! Constructor chaining freezes base-side writes before the subclass body runs.",
          ru: "Верно! Цепочка конструкторов фиксирует записи на стороне базы до тела подкласса."
        }
      },
      {
        id: "opt_inh1_b",
        text: {
          en: "Because Java forbids subclasses from assigning protected fields.",
          ru: "Потому что Java запрещает подклассам присваивать protected-поля."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Assignment is allowed — it is simply too late for the already-written header.",
          ru: "Неверно. Присваивание разрешено — просто слишком поздно для уже записанного заголовка."
        },
        misconceptionId: "err_inh_late_header_mutation"
      },
      {
        id: "opt_inh1_c",
        text: {
          en: "Because headerVersion is static and shared across the JVM permanently.",
          ru: "Потому что headerVersion статический и навсегда общий для JVM."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. The bug is instance construction order, not static sharing.",
          ru: "Неверно. Баг в порядке конструирования экземпляра, не в static-разделении."
        }
      }
    ],
    order: 1
  },
  {
    id: "chk_inh_2",
    theoryArticleId: "art_theory_inheritance",
    question: {
      en: "What Effective Java Item 19 guidance applies to BaseRegulatoryReport?",
      ru: "Какое руководство Effective Java Item 19 применимо к BaseRegulatoryReport?"
    },
    explanation: {
      en: "Design and document for inheritance or else prohibit it — undocumented protected surfaces are unsafe.",
      ru: "Проектируйте и документируйте для наследования или запретите — недокументированные protected-поверхности небезопасны."
    },
    options: [
      {
        id: "opt_inh2_a",
        text: {
          en: "Design and document extension contracts (or seal/final the class) — protected visibility alone is not enough.",
          ru: "Проектируйте и документируйте контракты расширения (или seal/final класс) — одной видимости protected недостаточно."
        },
        isCorrect: true,
        feedback: {
          en: "Correct! Item 19 is exactly about intentional inheritance design vs accidental subclass coupling.",
          ru: "Верно! Item 19 как раз про намеренный дизайн наследования vs случайную связность подклассов."
        }
      },
      {
        id: "opt_inh2_b",
        text: {
          en: "Always prefer deep inheritance trees over interfaces for banking domains.",
          ru: "Всегда предпочитать глубокие деревья наследования интерфейсам в банковских доменах."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Item 19 warns against casual inheritance, not mandates deep hierarchies.",
          ru: "Неверно. Item 19 предостерегает от случайного наследования, а не требует глубоких иерархий."
        },
        misconceptionId: "err_inh_ignore_item19"
      },
      {
        id: "opt_inh2_c",
        text: {
          en: "Protected methods are binary-compatible forever, so platform teams may change semantics freely.",
          ru: "Protected-методы бинарно совместимы навсегда, поэтому платформа может свободно менять семантику."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Binary/signature compatibility ≠ behavioral compatibility for subclasses.",
          ru: "Неверно. Бинарная/сигнатурная совместимость ≠ поведенческая совместимость для подклассов."
        },
        misconceptionId: "err_inh_protected_undocumented"
      }
    ],
    order: 2
  },
  {
    id: "chk_inh_3",
    theoryArticleId: "art_theory_inheritance",
    question: {
      en: "How did double-serialized sections appear after the BaseRegulatoryReport upgrade?",
      ru: "Как появились дважды сериализованные секции после апгрейда BaseRegulatoryReport?"
    },
    explanation: {
      en: "Subclasses already Base64-encoded payloads; appendSection started encoding too — semantics changed, signature did not.",
      ru: "Подклассы уже Base64-кодировали payload; appendSection тоже начал кодировать — семантика изменилась, сигнатура нет."
    },
    options: [
      {
        id: "opt_inh3_a",
        text: {
          en: "Subclasses pre-encoded payloads while the new appendSection also wrapped/encoded — undocumented encoding ownership flipped.",
          ru: "Подклассы заранее кодировали payload, а новый appendSection тоже оборачивал/кодировал — недокументированное владение encoding перевернулось."
        },
        isCorrect: true,
        feedback: {
          en: "Correct! Inherited protected method semantics changed under subclasses' feet.",
          ru: "Верно! Семантика унаследованного protected-метода изменилась у подклассов из-под ног."
        }
      },
      {
        id: "opt_inh3_b",
        text: {
          en: "The JVM automatically Base64-encodes every String passed across package boundaries.",
          ru: "JVM автоматически Base64-кодирует каждый String, передаваемый через границы пакетов."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Encoding was an application-level base change, not a JVM rule.",
          ru: "Неверно. Кодирование — изменение base на уровне приложения, не правило JVM."
        }
      },
      {
        id: "opt_inh3_c",
        text: {
          en: "RiskExposureReport used multiple inheritance from two encoding mixins.",
          ru: "RiskExposureReport использовал множественное наследование от двух encoding mixin'ов."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Java has single class inheritance here — one brittle base was enough.",
          ru: "Неверно. Здесь одиночное наследование классов Java — одного хрупкого base хватило."
        },
        misconceptionId: "err_inh_double_serialize"
      }
    ],
    order: 3
  }
];
