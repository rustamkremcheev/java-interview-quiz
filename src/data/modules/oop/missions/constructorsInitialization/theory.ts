import { TheoryArticle, TheoryCheckpoint } from '../../../../../types/domain';

export const THEORY_ARTICLE_CONSTRUCTORS_INITIALIZATION: TheoryArticle = {
  id: "art_theory_constructors_initialization",
  topicIds: ["top_oop_04"],
  conceptIds: ["cpt_constructor_init_order", "cpt_this_escape", "cpt_safe_construction"],
  title: {
    en: "Constructors, Initialization Order, and This-Escape in TradeRegistration",
    ru: "Конструкторы, Порядок Инициализации и This-Escape в TradeRegistration"
  },
  summary: {
    en: "Java construction allocates an object and runs initializers before the constructor finishes. Publishing this to TradeRegistry mid-constructor lets listeners observe half-initialized Counterparty / TradeSettlementTerms. Overridable methods from constructors run too early. Safe construction finishes fields first and registers only after new returns.",
    ru: "Конструирование в Java выделяет объект и выполняет initializers до завершения конструктора. Публикация this в TradeRegistry mid-constructor даёт listeners увидеть полуинициализированные Counterparty / TradeSettlementTerms. Переопределяемые методы из конструкторов выполняются слишком рано. Безопасное construction сначала завершает поля и регистрирует только после возврата new."
  },
  sections: [
    {
      id: "sec_ci_definition",
      category: "DEFINITION",
      title: { en: "1. Construction Order & Safe Publication", ru: "1. Порядок Construction и Безопасная Публикация" },
      blocks: [
        {
          id: "blk_ci_def_1",
          type: "PARAGRAPH",
          content: {
            en: "JLS §12.5 describes creation of new class instances: memory is allocated, fields get default values, then instance initializers and constructors run from superclass to subclass. Until that process completes, the object is not a finished TradeRegistration. A constructor is not merely 'a place to set fields' — it is the boundary before which other threads must not observe the instance.",
            ru: "JLS §12.5 описывает создание новых экземпляров класса: память выделяется, поля получают default values, затем выполняются instance initializers и конструкторы от superclass к subclass. Пока процесс не завершён, объект — не готовый TradeRegistration. Конструктор — не просто «место выставить поля»; это граница, до которой другие потоки не должны наблюдать экземпляр."
          }
        },
        {
          id: "blk_ci_def_2",
          type: "CALLOUT",
          title: { en: "💡 Mental Model: new Returns ⇒ Then Publish", ru: "💡 Ментальная Модель: new Вернулся ⇒ Потом Publish" },
          content: {
            en: "Treat the reference as private to the constructing thread until the constructor (and subclass constructors) complete. Then a factory may call TradeRegistry.register(built).",
            ru: "Считайте ссылку приватной для конструирующего потока, пока не завершатся конструктор (и конструкторы subclass). Затем factory может вызвать TradeRegistry.register(built)."
          }
        }
      ]
    },
    {
      id: "sec_ci_mechanics",
      category: "MECHANICS",
      title: { en: "2. This-Escape & Overridable Methods", ru: "2. This-Escape и Переопределяемые Методы" },
      blocks: [
        {
          id: "blk_ci_mech_1",
          type: "PARAGRAPH",
          content: {
            en: "This-escape: storing this in TradeRegistry, starting a thread with this, or registering a listener that captures this — all before fields like Counterparty are assigned. Listeners then price settlement with nulls and create ghost trades. Separately, calling an overridable validate() from a constructor lets a subclass override run before subclass fields initialize (Effective Java Item 19). Construction-time checks should be private or final, or run after the object is fully built via TradeValidator in the factory.",
            ru: "This-escape: сохранение this в TradeRegistry, старт потока с this или регистрация listener, захватывающего this — до присвоения полей вроде Counterparty. Listeners затем считают settlement с null и создают ghost trades. Отдельно: вызов переопределяемого validate() из конструктора позволяет override subclass выполниться до инициализации его полей (Effective Java Item 19). Проверки времени construction должны быть private или final, либо после полной сборки через TradeValidator в factory."
          }
        },
        {
          id: "blk_ci_mech_2",
          type: "WARNING",
          title: { en: "⚙️ Last-Line register(this) Still Risky with Subclasses", ru: "⚙️ register(this) Последней Строкой Всё Ещё Рискован с Subclass" },
          content: {
            en: "Even as the last superclass constructor statement, subclass construction may not have finished. Prefer static factory registration after the full new expression returns.",
            ru: "Даже как последний оператор конструктора superclass, construction subclass может быть не завершён. Предпочтительна регистрация в static factory после возврата полного выражения new."
          }
        }
      ]
    },
    {
      id: "sec_ci_tradeoffs",
      category: "TRADE_OFFS",
      title: { en: "3. Trade-offs: Convenience vs Safe Construction", ru: "3. Компромиссы: Удобство vs Безопасное Construction" },
      blocks: [
        {
          id: "blk_ci_trade_1",
          type: "PARAGRAPH",
          content: {
            en: "Registering inside the constructor feels convenient for 'always-tracked' trades, but couples allocation to shared mutable registries and invites races. Factories add an explicit createAndRegister step — clearer lifecycle, testable without a live TradeRegistry, and compatible with final fields. Synchronized(this) in constructors does not redeem early publication and introduces lock-ordering hazards. Prefer immutable TradeRegistration after build so post-register mutation cannot widen the window.",
            ru: "Регистрация внутри конструктора кажется удобной для «всегда отслеживаемых» сделок, но связывает аллокацию с общим мутабельным registry и провоцирует гонки. Factories добавляют явный шаг createAndRegister — яснее lifecycle, тестируемо без живого TradeRegistry и совместимо с final fields. Synchronized(this) в конструкторах не спасает раннюю публикацию и вводит опасности порядка блокировок. Предпочтительна immutable TradeRegistration после сборки, чтобы мутация после register не расширяла окно."
          }
        }
      ]
    },
    {
      id: "sec_ci_interview_followups",
      category: "INTERVIEW_GUIDANCE",
      title: { en: "4. Senior Interview Follow-ups", ru: "4. Доп. Вопросы Senior-Интервью" },
      blocks: [
        {
          id: "blk_ci_fup_01",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q1: 'What happens before a constructor body runs?' — Model Answer: Allocation and default field values, then superclass init — per JLS 12.5.",
            ru: "Доп. Вопрос 1: 'Что происходит до тела конструктора?' — Модельный Ответ: Аллокация и default values полей, затем init superclass — по JLS 12.5."
          }
        },
        {
          id: "blk_ci_fup_02",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q2: 'What is this-escape?' — Model Answer: Publishing this to another thread/registry before construction completes.",
            ru: "Доп. Вопрос 2: 'Что такое this-escape?' — Модельный Ответ: Публикация this другому потоку/registry до завершения construction."
          }
        },
        {
          id: "blk_ci_fup_03",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q3: 'Why did ghost trades appear?' — Model Answer: Listeners read TradeRegistration with null Counterparty after early register(this).",
            ru: "Доп. Вопрос 3: 'Почему появились ghost trades?' — Модельный Ответ: Listeners читали TradeRegistration с null Counterparty после раннего register(this)."
          }
        },
        {
          id: "blk_ci_fup_04",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q4: 'Why ban overridable methods in constructors?' — Model Answer: Subclass overrides run before subclass fields initialize (EJ Item 19).",
            ru: "Доп. Вопрос 4: 'Почему запрещать overridable методы в конструкторах?' — Модельный Ответ: Override subclass выполняются до инициализации полей subclass (EJ Item 19)."
          }
        },
        {
          id: "blk_ci_fup_05",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q5: 'Is last-line register(this) safe?' — Model Answer: Safer than mid-body, still unsafe with subclasses — prefer factory-after-new.",
            ru: "Доп. Вопрос 5: 'Безопасен ли register(this) последней строкой?' — Модельный Ответ: Безопаснее mid-body, всё ещё небезопасно с subclass — предпочтительна factory после new."
          }
        },
        {
          id: "blk_ci_fup_06",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q6: 'Where should TradeValidator run?' — Model Answer: On inputs before/at end of private construction, or in the factory before register.",
            ru: "Доп. Вопрос 6: 'Где запускать TradeValidator?' — Модельный Ответ: На входах до/в конце private construction или в factory до register."
          }
        },
        {
          id: "blk_ci_fup_07",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q7: 'Can final fields help?' — Model Answer: Yes — freeze Counterparty/TradeSettlementTerms; still must not publish this early.",
            ru: "Доп. Вопрос 7: 'Помогут ли final fields?' — Модельный Ответ: Да — зафиксировать Counterparty/TradeSettlementTerms; всё равно нельзя рано публиковать this."
          }
        },
        {
          id: "blk_ci_fup_08",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q8: 'Inner class started in ctor?' — Model Answer: Another this-escape vector — the inner class captures this immediately.",
            ru: "Доп. Вопрос 8: 'Inner class, стартующий в ctor?' — Модельный Ответ: Ещё один вектор this-escape — inner class сразу захватывает this."
          }
        },
        {
          id: "blk_ci_fup_09",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q9: 'Does synchronized(this) fix it?' — Model Answer: No — discouraged in constructors and does not make half-init semantically valid.",
            ru: "Доп. Вопрос 9: 'Починит ли synchronized(this)?' — Модельный Ответ: Нет — нежелательно в конструкторах и не делает half-init семантически валидным."
          }
        },
        {
          id: "blk_ci_fup_10",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q10: 'How to test without a live registry?' — Model Answer: Construct via factory overload that skips register; assert fields, then register in integration tests.",
            ru: "Доп. Вопрос 10: 'Как тестировать без живого registry?' — Модельный Ответ: Собирать через overload factory без register; ассертить поля, register — в integration-тестах."
          }
        },
        {
          id: "blk_ci_fup_11",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q11: 'Relation to immutability?' — Model Answer: Immutable post-build trades shrink mutation races after safe publication.",
            ru: "Доп. Вопрос 11: 'Связь с immutability?' — Модельный Ответ: Immutable сделки после сборки сужают гонки мутаций после безопасной публикации."
          }
        },
        {
          id: "blk_ci_fup_12",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q12: 'Review checklist?' — Model Answer: Grep constructors for this passed to registries, threads, or overridable calls.",
            ru: "Доп. Вопрос 12: 'Чеклист ревью?' — Модельный Ответ: Grep конструкторов на передачу this в registry, потоки или overridable вызовы."
          }
        }
      ]
    }
  ],
  prerequisiteConceptIds: ["cpt_class_vs_object"],
  sourceIds: ["src_ci_jls_12_5", "src_ci_oracle_constructors", "src_ci_ej_item19", "src_ci_safe_construction"],
  verificationStatus: "TECHNICALLY_VERIFIED",
  tags: ["#constructor", "#this-escape", "#initialization", "#trade-registration"],
  estimatedMinutes: 14,
  version: "1.0.0"
};

export const THEORY_CHECKPOINTS_CONSTRUCTORS_INITIALIZATION: readonly TheoryCheckpoint[] = [
  {
    id: "chk_ci_1",
    theoryArticleId: "art_theory_constructors_initialization",
    order: 1,
    question: {
      en: "Why did TradeRegistry listeners see null Counterparty?",
      ru: "Почему listeners TradeRegistry видели null Counterparty?"
    },
    explanation: {
      en: "register(this) ran before field assignment — classic this-escape during construction.",
      ru: "register(this) выполнился до присвоения полей — классический this-escape во время construction."
    },
    options: [
      {
        id: "opt_ci1_a",
        text: {
          en: "this was published to the registry before Counterparty was assigned in the constructor.",
          ru: "this был опубликован в registry до присвоения Counterparty в конструкторе."
        },
        isCorrect: true,
        feedback: { en: "Correct — this-escape.", ru: "Верно — this-escape." }
      },
      {
        id: "opt_ci1_b",
        text: {
          en: "Java erases Counterparty fields until the first method call.",
          ru: "Java стирает поля Counterparty до первого вызова метода."
        },
        isCorrect: false,
        feedback: { en: "Incorrect.", ru: "Неверно." }
      },
      {
        id: "opt_ci1_c",
        text: {
          en: "TradeSettlementTerms equals/hashCode broke the registry map.",
          ru: "equals/hashCode у TradeSettlementTerms сломал map registry."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect — this mission is about construction escape.",
          ru: "Неверно — миссия про escape при конструировании."
        }
      }
    ]
  },
  {
    id: "chk_ci_2",
    theoryArticleId: "art_theory_constructors_initialization",
    order: 2,
    question: {
      en: "Why is calling overridable validate() from a constructor dangerous?",
      ru: "Почему опасен вызов переопределяемого validate() из конструктора?"
    },
    explanation: {
      en: "Subclass overrides can run before subclass instance fields are initialized.",
      ru: "Override subclass могут выполниться до инициализации полей экземпляра subclass."
    },
    options: [
      {
        id: "opt_ci2_a",
        text: {
          en: "A subclass override may execute before subclass fields are initialized.",
          ru: "Override subclass может выполниться до инициализации полей subclass."
        },
        isCorrect: true,
        feedback: { en: "Correct — EJ Item 19.", ru: "Верно — EJ Item 19." }
      },
      {
        id: "opt_ci2_b",
        text: {
          en: "Overridable methods are illegal bytecode in Java 17.",
          ru: "Переопределяемые методы — нелегальный bytecode в Java 17."
        },
        isCorrect: false,
        feedback: { en: "Incorrect.", ru: "Неверно." }
      },
      {
        id: "opt_ci2_c",
        text: {
          en: "validate() cannot access TradeValidator from a constructor ever.",
          ru: "validate() никогда не может обратиться к TradeValidator из конструктора."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect — private/final validation is fine.",
          ru: "Неверно — private/final validation допустима."
        }
      }
    ]
  },
  {
    id: "chk_ci_3",
    theoryArticleId: "art_theory_constructors_initialization",
    order: 3,
    question: {
      en: "What is the preferred registration pattern?",
      ru: "Какой предпочтительный паттерн регистрации?"
    },
    explanation: {
      en: "Static factory completes construction, then registers the returned instance.",
      ru: "Static factory завершает construction, затем регистрирует возвращённый экземпляр."
    },
    options: [
      {
        id: "opt_ci3_a",
        text: {
          en: "Create via factory/new until construction returns, then TradeRegistry.register(built).",
          ru: "Создать через factory/new до возврата construction, затем TradeRegistry.register(built)."
        },
        isCorrect: true,
        feedback: { en: "Correct.", ru: "Верно." }
      },
      {
        id: "opt_ci3_b",
        text: {
          en: "Always register(this) as the first constructor statement.",
          ru: "Всегда register(this) первым оператором конструктора."
        },
        isCorrect: false,
        feedback: { en: "Incorrect — that is the bug.", ru: "Неверно — это и есть баг." }
      },
      {
        id: "opt_ci3_c",
        text: {
          en: "Pass this to a background thread that registers when convenient.",
          ru: "Передать this фоновому потоку, который зарегистрирует когда удобно."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect — another this-escape vector.",
          ru: "Неверно — ещё один вектор this-escape."
        }
      }
    ]
  },
  {
    id: "chk_ci_4",
    theoryArticleId: "art_theory_constructors_initialization",
    order: 4,
    question: {
      en: "Which statement matches JLS construction intent?",
      ru: "Какое утверждение соответствует смыслу construction в JLS?"
    },
    explanation: {
      en: "The object should not be observed by other threads until construction completes.",
      ru: "Объект не должен наблюдаться другими потоками, пока construction не завершён."
    },
    options: [
      {
        id: "opt_ci4_a",
        text: {
          en: "Do not safely publish the instance to shared structures until constructors finish.",
          ru: "Не публиковать безопасно экземпляр в общие структуры, пока конструкторы не завершатся."
        },
        isCorrect: true,
        feedback: { en: "Correct.", ru: "Верно." }
      },
      {
        id: "opt_ci4_b",
        text: {
          en: "Default field values are already the final business state.",
          ru: "Default values полей уже являются финальным бизнес-состоянием."
        },
        isCorrect: false,
        feedback: { en: "Incorrect.", ru: "Неверно." }
      },
      {
        id: "opt_ci4_c",
        text: {
          en: "Constructors run after the object is visible in every registry by definition.",
          ru: "Конструкторы по определению выполняются после видимости объекта во всех registry."
        },
        isCorrect: false,
        feedback: { en: "Incorrect — inverted.", ru: "Неверно — перевёрнуто." }
      }
    ]
  }
];
