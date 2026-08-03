import { TheoryArticle, TheoryCheckpoint } from '../../../../../types/domain';

export const THEORY_ARTICLE_ACCESS_MODIFIERS: TheoryArticle = {
  id: "art_theory_access_modifiers",
  topicIds: ["top_oop_06"],
  conceptIds: ["cpt_access_modifiers", "cpt_package_private", "cpt_protected_coupling"],
  title: {
    en: "Access Modifiers and Package Boundaries in General Ledger",
    ru: "Модификаторы Доступа и Границы Пакета в General Ledger"
  },
  summary: {
    en: "Java access levels control who may call members. public and protected widen GeneralLedger internals across packages; package-private keeps postRaw with InternalPostingPolicy and JournalPostingFacade so policy cannot be skipped.",
    ru: "Уровни доступа Java определяют, кто может вызывать члены. public и protected расширяют internals GeneralLedger через пакеты; package-private держит postRaw рядом с InternalPostingPolicy и JournalPostingFacade, чтобы policy нельзя было обойти."
  },
  sections: [
    {
      id: "sec_am_definition",
      category: "DEFINITION",
      title: { en: "1. Four Access Levels in Ledger APIs", ru: "1. Четыре Уровня Доступа в Ledger API" },
      blocks: [
        {
          id: "blk_am_def_1",
          type: "PARAGRAPH",
          content: {
            en: "private: only the declaring class. package-private (default, no modifier): any class in the same package. protected: package-private plus subclasses, including those in other packages. public: everywhere. For GeneralLedger, choosing protected or public on postRaw is not a style preference — it decides whether reporting services can write LedgerEntry rows without InternalPostingPolicy.",
            ru: "private: только объявляющий класс. package-private (default, без модификатора): любой класс того же пакета. protected: package-private плюс subclasses, включая другие пакеты. public: везде. Для GeneralLedger выбор protected или public у postRaw — не стиль, а решение, смогут ли reporting-сервисы писать LedgerEntry без InternalPostingPolicy."
          }
        },
        {
          id: "blk_am_def_2",
          type: "CALLOUT",
          title: { en: "💡 Mental Model: Compiler Is the Boundary", ru: "💡 Ментальная Модель: Компилятор — Граница" },
          content: {
            en: "Wiki rules ('always use JournalPostingFacade') fail when the compiler still allows postRaw. Accessibility is the enforceable package boundary.",
            ru: "Правила wiki («всегда используйте JournalPostingFacade») не работают, пока компилятор разрешает postRaw. Accessibility — enforceable граница пакета."
          }
        }
      ]
    },
    {
      id: "sec_am_mechanics",
      category: "MECHANICS",
      title: { en: "2. Protected Coupling & Package-Private Facades", ru: "2. Protected Coupling и Package-Private Facades" },
      blocks: [
        {
          id: "blk_am_mech_1",
          type: "PARAGRAPH",
          content: {
            en: "Protected coupling appears when another package subclasses GeneralLedger and calls protected postRaw. That subclass is a second public API: ReconciliationHook.forceAdjust. The fix is mechanical: make GeneralLedger (or postRaw) package-private, prefer final/sealed when inheritance is not a product feature, and route all posts through JournalPostingFacade which runs InternalPostingPolicy then postRaw. Extensions become collaborator interfaces (ReconciliationHook.afterPost) injected into the facade — composition, not cross-package inheritance into the ledger.",
            ru: "Protected coupling возникает, когда другой пакет наследует GeneralLedger и вызывает protected postRaw. Этот subclass — второй public API: ReconciliationHook.forceAdjust. Фикс механический: сделать GeneralLedger (или postRaw) package-private, предпочесть final/sealed если inheritance не фича продукта, и проводить все посты через JournalPostingFacade, который гоняет InternalPostingPolicy, затем postRaw. Расширения — collaborator interfaces (ReconciliationHook.afterPost), внедряемые в facade — composition, не cross-package inheritance в ledger."
          }
        },
        {
          id: "blk_am_mech_2",
          type: "WARNING",
          title: { en: "⚙️ Month-End Integrity Depends on Access", ru: "⚙️ Целостность Закрытия Месяца Зависит от Access" },
          content: {
            en: "Unvalidated raw posts imbalance books and poison reconciliation. Access leaks are financial controls failures, not only 'clean code' issues.",
            ru: "Невалидированные raw posts разбалансируют книги и отравляют reconciliation. Утечки access — сбои финансовых контролей, не только «чистого кода»."
          }
        }
      ]
    },
    {
      id: "sec_am_tradeoffs",
      category: "TRADE_OFFS",
      title: { en: "3. Trade-offs: Testability vs Narrow APIs", ru: "3. Компромиссы: Тестируемость vs Узкие API" },
      blocks: [
        {
          id: "blk_am_trade_1",
          type: "PARAGRAPH",
          content: {
            en: "Narrowing access complicates foreign-package white-box tests. Prefer same-package tests, package-visible fixtures, or testing through JournalPostingFacade. Permanently widening postRaw for tests ships the leak. JPMS modules add another boundary; they complement — not replace — package-private design. Effective Java Item 15: minimize accessibility of classes and members.",
            ru: "Сужение access усложняет white-box тесты из чужого пакета. Предпочитайте same-package тесты, package-visible fixtures или тесты через JournalPostingFacade. Постоянное расширение postRaw ради тестов отгружает утечку. JPMS добавляет границу; он дополняет — не заменяет — package-private дизайн. Effective Java Item 15: минимизируйте accessibility классов и членов."
          }
        }
      ]
    },
    {
      id: "sec_am_interview_followups",
      category: "INTERVIEW_GUIDANCE",
      title: { en: "4. Senior Interview Follow-ups", ru: "4. Доп. Вопросы Senior-Интервью" },
      blocks: [
        {
          id: "blk_am_fup_01",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q1: 'List Java access levels from narrowest to widest.' — Model Answer: private, package-private, protected, public.",
            ru: "Доп. Вопрос 1: 'Перечислите уровни доступа Java от узкого к широкому.' — Модельный Ответ: private, package-private, protected, public."
          }
        },
        {
          id: "blk_am_fup_02",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q2: 'What does the default (no modifier) mean?' — Model Answer: Package-private — visible only inside the same package.",
            ru: "Доп. Вопрос 2: 'Что значит default (без модификатора)?' — Модельный Ответ: Package-private — видно только внутри того же пакета."
          }
        },
        {
          id: "blk_am_fup_03",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q3: 'How does protected differ from package-private?' — Model Answer: Protected also allows subclasses in other packages.",
            ru: "Доп. Вопрос 3: 'Чем protected отличается от package-private?' — Модельный Ответ: Protected также разрешает subclasses в других пакетах."
          }
        },
        {
          id: "blk_am_fup_04",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q4: 'Why is protected dangerous for ledger mutators?' — Model Answer: Foreign subclasses become alternate entry points that skip policy.",
            ru: "Доп. Вопрос 4: 'Почему protected опасен для mutators ledger?' — Модельный Ответ: Чужие subclasses становятся альтернативными entry points без policy."
          }
        },
        {
          id: "blk_am_fup_05",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q5: 'Where should InternalPostingPolicy live?' — Model Answer: Same package as GeneralLedger/facade so it can share package-private helpers.",
            ru: "Доп. Вопрос 5: 'Где должна жить InternalPostingPolicy?' — Модельный Ответ: В том же пакете, что GeneralLedger/facade, чтобы делить package-private helpers."
          }
        },
        {
          id: "blk_am_fup_06",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q6: 'Is a public facade enough if postRaw stays public?' — Model Answer: No — callers can still skip the facade.",
            ru: "Доп. Вопрос 6: 'Достаточно ли public facade, если postRaw остаётся public?' — Модельный Ответ: Нет — вызывающие всё равно могут обойти facade."
          }
        },
        {
          id: "blk_am_fup_07",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q7: 'How do you extend posting without protected inheritance?' — Model Answer: Collaborator interfaces registered with JournalPostingFacade.",
            ru: "Доп. Вопрос 7: 'Как расширять постинг без protected inheritance?' — Модельный Ответ: Collaborator interfaces, регистрируемые в JournalPostingFacade."
          }
        },
        {
          id: "blk_am_fup_08",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q8: 'When is protected appropriate?' — Model Answer: Inside a designed, preferably sealed hierarchy you own — not as an accidental API.",
            ru: "Доп. Вопрос 8: 'Когда protected уместен?' — Модельный Ответ: Внутри спроектированной, лучше sealed иерархии, которой вы владеете — не как случайный API."
          }
        },
        {
          id: "blk_am_fup_09",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q9: 'How would you catch this in review?' — Model Answer: Flag public/protected mutators on core ledger types and extends across package boundaries.",
            ru: "Доп. Вопрос 9: 'Как поймать на ревью?' — Модельный Ответ: Флажить public/protected mutators у core ledger-типов и extends через границы пакетов."
          }
        },
        {
          id: "blk_am_fup_10",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q10: 'Relation to Effective Java Item 15?' — Model Answer: Minimize accessibility so illegal operations are unrepresentable outside the package.",
            ru: "Доп. Вопрос 10: 'Связь с Effective Java Item 15?' — Модельный Ответ: Минимизируйте accessibility, чтобы незаконные операции были невыразимы снаружи пакета."
          }
        },
        {
          id: "blk_am_fup_11",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q11: 'Do modules replace packages?' — Model Answer: JPMS adds another boundary; package-private design still matters inside a module.",
            ru: "Доп. Вопрос 11: 'Заменяют ли modules пакеты?' — Модельный Ответ: JPMS добавляет границу; package-private дизайн всё ещё важен внутри модуля."
          }
        },
        {
          id: "blk_am_fup_12",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q12: 'Should GeneralLedger be a public class?' — Model Answer: Often no — package-private final class behind a public facade is safer for financial controls.",
            ru: "Доп. Вопрос 12: 'Должен ли GeneralLedger быть public class?' — Модельный Ответ: Часто нет — package-private final class за public facade безопаснее для финансовых контролей."
          }
        }
      ]
    }
  ],
  prerequisiteConceptIds: [],
  sourceIds: ["src_am_jls_access", "src_am_oracle_access", "src_am_ej_item15"],
  verificationStatus: "TECHNICALLY_VERIFIED",
  tags: ["#access-modifiers", "#package-private", "#general-ledger"],
  estimatedMinutes: 14,
  version: "1.0.0"
};

export const THEORY_CHECKPOINTS_ACCESS_MODIFIERS: readonly TheoryCheckpoint[] = [
  {
    id: "chk_am_1",
    theoryArticleId: "art_theory_access_modifiers",
    order: 1,
    question: {
      en: "Why could ReconciliationHook in another package call GeneralLedger.postRaw?",
      ru: "Почему ReconciliationHook в другом пакете мог вызвать GeneralLedger.postRaw?"
    },
    explanation: {
      en: "postRaw was protected (or public), so foreign-package subclasses could invoke it.",
      ru: "postRaw был protected (или public), поэтому subclasses из чужого пакета могли его вызвать."
    },
    options: [
      {
        id: "opt_am1_a",
        text: {
          en: "protected (or public) widened access across the package boundary for subclasses/callers.",
          ru: "protected (или public) расширил доступ через границу пакета для subclasses/вызывающих."
        },
        isCorrect: true,
        feedback: { en: "Correct — access leak.", ru: "Верно — утечка access." }
      },
      {
        id: "opt_am1_b",
        text: {
          en: "package-private always allows all packages to call members.",
          ru: "package-private всегда разрешает всем пакетам вызывать члены."
        },
        isCorrect: false,
        feedback: { en: "Incorrect — package-private is same-package only.", ru: "Неверно — package-private только same-package." }
      },
      {
        id: "opt_am1_c",
        text: {
          en: "Java ignores access modifiers at runtime for financial code.",
          ru: "Java игнорирует модификаторы доступа в runtime для финансового кода."
        },
        isCorrect: false,
        feedback: { en: "Incorrect — modifiers are enforced by the compiler/JVM.", ru: "Неверно — модификаторы enforcing компилятором/JVM." }
      }
    ]
  },
  {
    id: "chk_am_2",
    theoryArticleId: "art_theory_access_modifiers",
    order: 2,
    question: {
      en: "What is the primary role of JournalPostingFacade in the fix?",
      ru: "Какова главная роль JournalPostingFacade в фиксе?"
    },
    explanation: {
      en: "It is the sole public entry point that runs InternalPostingPolicy before package-private postRaw.",
      ru: "Это единственная public точка входа, которая гоняет InternalPostingPolicy до package-private postRaw."
    },
    options: [
      {
        id: "opt_am2_a",
        text: {
          en: "Sole public posting API that enforces InternalPostingPolicy before raw writes.",
          ru: "Единственный public API постинга, применяющий InternalPostingPolicy до raw-записей."
        },
        isCorrect: true,
        feedback: { en: "Correct.", ru: "Верно." }
      },
      {
        id: "opt_am2_b",
        text: {
          en: "A documentation-only wrapper while postRaw stays public.",
          ru: "Только документационная обёртка, пока postRaw остаётся public."
        },
        isCorrect: false,
        feedback: { en: "Incorrect — facade must be backed by narrowed access.", ru: "Неверно — facade должен опираться на суженный access." }
      },
      {
        id: "opt_am2_c",
        text: {
          en: "A subclass of ReconciliationHook in the reporting package.",
          ru: "Subclass ReconciliationHook в reporting-пакете."
        },
        isCorrect: false,
        feedback: { en: "Incorrect.", ru: "Неверно." }
      }
    ]
  },
  {
    id: "chk_am_3",
    theoryArticleId: "art_theory_access_modifiers",
    order: 3,
    question: {
      en: "Which access level best keeps postRaw shared only with same-package policy/facade?",
      ru: "Какой уровень доступа лучше держит postRaw общим только с same-package policy/facade?"
    },
    explanation: {
      en: "Package-private (default) visibility is the design tool for co-located collaborators.",
      ru: "Package-private (default) — инструмент дизайна для соседних collaborator'ов."
    },
    options: [
      {
        id: "opt_am3_a",
        text: { en: "Package-private (no modifier).", ru: "Package-private (без модификатора)." },
        isCorrect: true,
        feedback: { en: "Correct.", ru: "Верно." }
      },
      {
        id: "opt_am3_b",
        text: { en: "Protected, so subclasses everywhere can help.", ru: "Protected, чтобы subclasses везде могли помочь." },
        isCorrect: false,
        feedback: { en: "Incorrect — that recreates the leak.", ru: "Неверно — это воспроизводит утечку." }
      },
      {
        id: "opt_am3_c",
        text: { en: "Public with a @Deprecated annotation.", ru: "Public с аннотацией @Deprecated." },
        isCorrect: false,
        feedback: { en: "Incorrect — deprecation is not an access boundary.", ru: "Неверно — deprecation не граница доступа." }
      }
    ]
  },
  {
    id: "chk_am_4",
    theoryArticleId: "art_theory_access_modifiers",
    order: 4,
    question: {
      en: "What is protected coupling in this mission's terms?",
      ru: "Что такое protected coupling в терминах этой миссии?"
    },
    explanation: {
      en: "Foreign-package subclasses depending on protected internals, creating alternate control-bypass paths.",
      ru: "Зависимость subclasses из чужого пакета от protected internals, создающая обход контролей."
    },
    options: [
      {
        id: "opt_am4_a",
        text: {
          en: "Other-package subclasses calling protected ledger mutators and skipping the facade/policy.",
          ru: "Subclasses из другого пакета вызывают protected mutators ledger и обходят facade/policy."
        },
        isCorrect: true,
        feedback: { en: "Correct.", ru: "Верно." }
      },
      {
        id: "opt_am4_b",
        text: {
          en: "Using private fields inside a single class.",
          ru: "Использование private-полей внутри одного класса."
        },
        isCorrect: false,
        feedback: { en: "Incorrect — that is normal encapsulation.", ru: "Неверно — это обычный encapsulation." }
      },
      {
        id: "opt_am4_c",
        text: {
          en: "JPMS requiring module-info for every JAR.",
          ru: "JPMS, требующий module-info для каждого JAR."
        },
        isCorrect: false,
        feedback: { en: "Incorrect — unrelated to protected subclass coupling.", ru: "Неверно — не про protected subclass coupling." }
      }
    ]
  }
];
