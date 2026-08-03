import { TheoryArticle, TheoryCheckpoint } from '../../../../../types/domain';

export const THEORY_ARTICLE_SENIOR_OOP_TRADEOFFS: TheoryArticle = {
  id: "art_theory_senior_oop_tradeoffs",
  topicIds: ["top_oop_36"],
  conceptIds: ["cpt_design_tradeoffs", "cpt_constraint_driven_design", "cpt_overengineering_smell"],
  title: {
    en: "Defending OOP Trade-offs for PlatformPaymentHandler",
    ru: "Защита OOP-Компромиссов для PlatformPaymentHandler"
  },
  summary: {
    en: "Senior answers name constraints first, then recommend inheritance depth, Strategy/Decorator seams, and rich vs anemic balance — with explicit reversal conditions. No universal winner.",
    ru: "Senior-ответ сначала называет ограничения, затем рекомендует глубину inheritance, seams Strategy/Decorator и баланс rich vs anemic — с явными условиями пересмотра. Универсального победителя нет."
  },
  sections: [
    {
      id: "sec_trade_definition",
      category: "DEFINITION",
      title: { en: "1. Trade-off Framing", ru: "1. Framing Компромиссов" },
      blocks: [
        {
          id: "blk_trade_def_1",
          type: "PARAGRAPH",
          content: {
            en: "A design trade-off is a choice among workable shapes — not a hunt for the 'correct' GoF name. For PlatformPaymentHandler, competing shapes include deep AbstractPaymentBase trees, interface-per-class graphs, Strategy-heavy graphs, and Decorator stacks on PaymentWorkflow.",
            ru: "Компромисс — выбор среди рабочих форм, а не охота за «правильным» именем GoF. Для PlatformPaymentHandler конкурируют глубокие деревья AbstractPaymentBase, graph interface-per-class, Strategy-heavy графы и Decorator-стеки на PaymentWorkflow."
          }
        },
        {
          id: "blk_trade_def_2",
          type: "CALLOUT",
          title: { en: "💡 Elevator Model", ru: "💡 Elevator-Модель" },
          content: {
            en: "Constraints first → recommendation → when you'd reverse. Pattern names are labels after the argument, not the argument.",
            ru: "Сначала ограничения → рекомендация → когда пересмотрите. Имена паттернов — ярлыки после аргумента, не сам аргумент."
          }
        }
      ]
    },
    {
      id: "sec_trade_mechanics",
      category: "MECHANICS",
      title: { en: "2. Constraint Mechanics", ru: "2. Механика Ограничений" },
      blocks: [
        {
          id: "blk_trade_mech_1",
          type: "PARAGRAPH",
          content: {
            en: "High PaymentMethod volatility favors composition: PaymentPolicy and PaymentRiskPolicy as replaceable strategies behind PlatformPaymentHandler. Audit/fraud/retry favor known Decorator seams via PaymentExtensionRegistry — not subclass hooks buried five levels deep.",
            ru: "Высокая volatility PaymentMethod благоволит композиции: PaymentPolicy и PaymentRiskPolicy как сменяемые стратегии за PlatformPaymentHandler. Audit/fraud/retry — известные Decorator seams через PaymentExtensionRegistry, а не subclass hooks на пяти уровнях."
          }
        },
        {
          id: "blk_trade_mech_2",
          type: "WARNING",
          title: { en: "⚙️ Overengineering Smell", ru: "⚙️ Запах Overengineering" },
          content: {
            en: "God AbstractPaymentBase + marker interfaces for every collaborator + 'always Strategy' inflate indirection without buying changeability. If a variant never changes independently, do not invent a seam.",
            ru: "God AbstractPaymentBase + marker interfaces на каждый collaborator + «always Strategy» раздувают indirection без выигрыша в изменяемости. Если вариант не меняется независимо — не изобретайте seam."
          }
        },
        {
          id: "blk_trade_mech_3",
          type: "CALLOUT",
          title: { en: "💡 Rich vs Anemic", ru: "💡 Rich vs Anemic" },
          content: {
            en: "PaymentCommand/PaymentResult can stay lean DTOs at the edge. Domain rules that must stay consistent belong in PaymentPolicy / PaymentWorkflow — not in a procedural god service nor in endless inheritance.",
            ru: "PaymentCommand/PaymentResult могут оставаться lean DTO на краю. Доменные правила, которые должны быть согласованы, — в PaymentPolicy / PaymentWorkflow, не в procedural god service и не в бесконечном inheritance."
          }
        }
      ]
    },
    {
      id: "sec_trade_tradeoffs",
      category: "TRADE_OFFS",
      title: { en: "3. Production Balance (No Universal Winner)", ru: "3. Продакшн-Баланс (Без Универсального Победителя)" },
      blocks: [
        {
          id: "blk_trade_trade_1",
          type: "PARAGRAPH",
          content: {
            en: "If rails are few and stable, a shallow Template Method can beat Strategy ceremony. If fraud rules churn weekly, Strategy + registry wins. If ops needs binary audit wrap order, Decorator order matters more than inheritance purity.",
            ru: "Если rails мало и стабильны, неглубокий Template Method может победить ceremony Strategy. Если fraud-правила меняются еженедельно — побеждают Strategy + registry. Если ops нужен фиксированный порядок audit wrap — порядок Decorator важнее «чистоты» inheritance."
          }
        },
        {
          id: "blk_trade_trade_2",
          type: "CALLOUT",
          title: { en: "💡 Reversal Triggers", ru: "💡 Триггеры Пересмотра" },
          content: {
            en: "Change the shape when: variant count explodes, audit becomes cross-cutting, or team cannot navigate the indirection. State those triggers in the interview.",
            ru: "Меняйте форму, когда: взрывается число вариантов, audit становится cross-cutting, или команда не ориентируется в indirection. Назовите эти триггеры на интервью."
          }
        }
      ]
    },
    {
      id: "sec_trade_interview_followups",
      category: "INTERVIEW_GUIDANCE",
      title: { en: "4. Senior Interview Follow-ups", ru: "4. Доп. Вопросы Senior-Интервью" },
      blocks: [
        {
          id: "blk_trade_fup_01",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q1: 'Why not deep inheritance for PaymentMethod?' — Model Answer: New rails force base/subclass churn; composition localizes change.",
            ru: "Доп. Вопрос 1: 'Почему не глубокое наследование для PaymentMethod?' — Модельный Ответ: Новые rails ломают базу/подклассы; композиция локализует изменение."
          }
        },
        {
          id: "blk_trade_fup_02",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q2: 'When is Strategy justified?' — Model Answer: When algorithms vary independently and selection is runtime/config-driven.",
            ru: "Доп. Вопрос 2: 'Когда оправдан Strategy?' — Модельный Ответ: Когда алгоритмы меняются независимо и выбор runtime/config-driven."
          }
        },
        {
          id: "blk_trade_fup_03",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q3: 'Decorator vs subclass hooks for audit?' — Model Answer: Decorators compose ordered cross-cuts without growing the type tree.",
            ru: "Доп. Вопрос 3: 'Decorator vs subclass hooks для audit?' — Модельный Ответ: Decorators компонуют упорядоченные cross-cuts без роста дерева типов."
          }
        },
        {
          id: "blk_trade_fup_04",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q4: 'Is interface-per-class always Clean Architecture?' — Model Answer: No — ports need real substitution reasons.",
            ru: "Доп. Вопрос 4: 'Interface-per-class всегда Clean Architecture?' — Модельный Ответ: Нет — портам нужна реальная причина подстановки."
          }
        },
        {
          id: "blk_trade_fup_05",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q5: 'Rich vs anemic for PaymentCommand?' — Model Answer: Keep edge DTOs lean; put invariants in policy/workflow objects.",
            ru: "Доп. Вопрос 5: 'Rich vs anemic для PaymentCommand?' — Модельный Ответ: Edge DTO — lean; инварианты — в policy/workflow объектах."
          }
        },
        {
          id: "blk_trade_fup_06",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q6: 'Where does PlatformPaymentHandler sit?' — Model Answer: Thin orchestrator: command in, policies/extensions applied, result out.",
            ru: "Доп. Вопрос 6: 'Где живёт PlatformPaymentHandler?' — Модельный Ответ: Тонкий оркестратор: command in, policies/extensions, result out."
          }
        },
        {
          id: "blk_trade_fup_07",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q7: 'Factory role?' — Model Answer: Construct policies/handlers; factories do not replace strategy selection logic by themselves.",
            ru: "Доп. Вопрос 7: 'Роль Factory?' — Модельный Ответ: Собирать policies/handlers; factories сами не заменяют логику выбора strategy."
          }
        },
        {
          id: "blk_trade_fup_08",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q8: 'How do you detect overengineering in review?' — Model Answer: Ask which constraint each layer buys; delete layers with no answer.",
            ru: "Доп. Вопрос 8: 'Как поймать overengineering на ревью?' — Модельный Ответ: Спросите, какое ограничение покупает слой; удалите слои без ответа."
          }
        },
        {
          id: "blk_trade_fup_09",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q9: 'When would you accept a shallow Template Method?' — Model Answer: Stable skeleton, few variants, shared steps truly shared.",
            ru: "Доп. Вопрос 9: 'Когда принять неглубокий Template Method?' — Модельный Ответ: Стабильный скелет, мало вариантов, общие шаги реально общие."
          }
        },
        {
          id: "blk_trade_fup_10",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q10: 'Retry vs fraud decorator order?' — Model Answer: State ordered seams explicitly in PaymentExtensionRegistry.",
            ru: "Доп. Вопрос 10: 'Порядок retry vs fraud decorator?' — Модельный Ответ: Явно зафиксируйте ordered seams в PaymentExtensionRegistry."
          }
        },
        {
          id: "blk_trade_fup_11",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q11: 'What if leadership wants 'more OOP'?' — Model Answer: Translate to measurable change cost and defect risk, not class count.",
            ru: "Доп. Вопрос 11: 'Если leadership хочет «больше OOP»?' — Модельный Ответ: Переведите в измеряемую цену изменений и риск дефектов, не число классов."
          }
        },
        {
          id: "blk_trade_fup_12",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q12: 'How do you end the 90s answer?' — Model Answer: Restate constraints, pick, and name one reversal trigger.",
            ru: "Доп. Вопрос 12: 'Как завершить ответ на 90 сек?' — Модельный Ответ: Повторите ограничения, выбор и один триггер пересмотра."
          }
        }
      ]
    }
  ],
  prerequisiteConceptIds: ["cpt_composition_over_inheritance"],
  sourceIds: ["src_trade_ej_item18", "src_trade_gof_strategy", "src_trade_fowler_poeaa", "src_trade_clean_arch", "src_trade_fowler_anemic"],
  verificationStatus: "TECHNICALLY_VERIFIED",
  tags: ["#design-tradeoffs", "#constraint-driven-design", "#overengineering-smell", "#platform-payment-handler"],
  estimatedMinutes: 16,
  version: "1.0.0"
};

export const THEORY_CHECKPOINTS_SENIOR_OOP_TRADEOFFS: readonly TheoryCheckpoint[] = [
  {
    id: "chk_trade_1",
    theoryArticleId: "art_theory_senior_oop_tradeoffs",
    question: {
      en: "What should lead a senior OOP recommendation in an architecture review?",
      ru: "Что должно вести senior OOP-рекомендацию на architecture review?"
    },
    explanation: {
      en: "Named constraints and reversal conditions — not a pattern slogan.",
      ru: "Названные ограничения и условия пересмотра — не слоган паттерна."
    },
    options: [
      {
        id: "opt_trade1_a",
        text: { en: "Constraints → recommendation → when you'd change it.", ru: "Ограничения → рекомендация → когда измените." },
        isCorrect: true,
        feedback: { en: "Correct — constraint-driven framing.", ru: "Верно — constraint-driven framing." }
      },
      {
        id: "opt_trade1_b",
        text: { en: "List every GoF pattern you know.", ru: "Перечислить все известные GoF-паттерны." },
        isCorrect: false,
        feedback: { en: "Incorrect — name dumps are weak answers.", ru: "Неверно — дамп имён слаб." }
      },
      {
        id: "opt_trade1_c",
        text: { en: "Always prefer the deepest inheritance tree.", ru: "Всегда предпочитать самое глубокое дерево наследования." },
        isCorrect: false,
        feedback: { en: "Incorrect — deep inheritance is often the smell.", ru: "Неверно — глубокое наследование часто smell." }
      }
    ],
    order: 1
  },
  {
    id: "chk_trade_2",
    theoryArticleId: "art_theory_senior_oop_tradeoffs",
    question: {
      en: "Given high PaymentMethod volatility + audit/retry, which default is weakest?",
      ru: "При высокой volatility PaymentMethod + audit/retry какой default слабее всего?"
    },
    explanation: {
      en: "Deep AbstractPaymentBase hierarchy couples every new rail to the tree.",
      ru: "Глубокая иерархия AbstractPaymentBase связывает каждый новый rail с деревом."
    },
    options: [
      {
        id: "opt_trade2_a",
        text: { en: "Deep AbstractPaymentBase subclass tree as the default shape.", ru: "Глубокое дерево AbstractPaymentBase как default." },
        isCorrect: true,
        feedback: { en: "Correct — reject as default under high volatility.", ru: "Верно — отклоняем как default при высокой volatility." }
      },
      {
        id: "opt_trade2_b",
        text: { en: "PaymentPolicy strategies for varying rails.", ru: "Стратегии PaymentPolicy для разных rails." },
        isCorrect: false,
        feedback: { en: "Incorrect — this can be appropriate.", ru: "Неверно — это может быть уместно." }
      },
      {
        id: "opt_trade2_c",
        text: { en: "PaymentExtensionRegistry for ordered audit/retry wraps.", ru: "PaymentExtensionRegistry для упорядоченных audit/retry wraps." },
        isCorrect: false,
        feedback: { en: "Incorrect — fits the constraints.", ru: "Неверно — это стыкуется с ограничениями." }
      }
    ],
    order: 2
  },
  {
    id: "chk_trade_3",
    theoryArticleId: "art_theory_senior_oop_tradeoffs",
    question: {
      en: "What makes 'always Strategy' an overengineering smell?",
      ru: "Что делает «always Strategy» запахом overengineering?"
    },
    explanation: {
      en: "Seams without independent variation buy indirection, not changeability.",
      ru: "Seams без независимой вариации покупают indirection, не изменяемость."
    },
    options: [
      {
        id: "opt_trade3_a",
        text: { en: "Inventing strategies for behaviors that never vary independently.", ru: "Изобретение strategies для поведения, которое не варьируется независимо." },
        isCorrect: true,
        feedback: { en: "Correct.", ru: "Верно." }
      },
      {
        id: "opt_trade3_b",
        text: { en: "Using Strategy when PaymentRiskPolicy changes weekly.", ru: "Использование Strategy, когда PaymentRiskPolicy меняется еженедельно." },
        isCorrect: false,
        feedback: { en: "Incorrect — that can justify Strategy.", ru: "Неверно — это может оправдать Strategy." }
      },
      {
        id: "opt_trade3_c",
        text: { en: "Naming constraints before recommending a shape.", ru: "Называть ограничения до рекомендации формы." },
        isCorrect: false,
        feedback: { en: "Incorrect — that is good practice.", ru: "Неверно — это хорошая практика." }
      }
    ],
    order: 3
  },
  {
    id: "chk_trade_4",
    theoryArticleId: "art_theory_senior_oop_tradeoffs",
    question: {
      en: "How should a ~90s interview answer end?",
      ru: "Чем должен заканчиваться ответ ~90 сек?"
    },
    explanation: {
      en: "State at least one reversal condition for the recommendation.",
      ru: "Назвать хотя бы одно условие пересмотра рекомендации."
    },
    options: [
      {
        id: "opt_trade4_a",
        text: { en: "Name when you would change the recommendation.", ru: "Назвать, когда вы измените рекомендацию." },
        isCorrect: true,
        feedback: { en: "Correct — shows judgment, not dogma.", ru: "Верно — показывает judgment, не догму." }
      },
      {
        id: "opt_trade4_b",
        text: { en: "Declare your pattern the only correct OOP.", ru: "Объявить свой паттерн единственно верным OOP." },
        isCorrect: false,
        feedback: { en: "Incorrect — no universal winner.", ru: "Неверно — нет универсального победителя." }
      },
      {
        id: "opt_trade4_c",
        text: { en: "Refuse to pick until you write a book.", ru: "Отказаться выбирать, пока не напишете книгу." },
        isCorrect: false,
        feedback: { en: "Incorrect — seniors still recommend under constraints.", ru: "Неверно — seniors всё равно рекомендуют при ограничениях." }
      }
    ],
    order: 4
  },
  {
    id: "chk_trade_5",
    theoryArticleId: "art_theory_senior_oop_tradeoffs",
    question: {
      en: "Where do audit/fraud/retry belong under these constraints?",
      ru: "Куда относятся audit/fraud/retry при этих ограничениях?"
    },
    explanation: {
      en: "Ordered Decorator seams via PaymentExtensionRegistry at known workflow points.",
      ru: "Упорядоченные Decorator seams через PaymentExtensionRegistry в известных точках workflow."
    },
    options: [
      {
        id: "opt_trade5_a",
        text: { en: "Ordered extensions at known PaymentWorkflow seams.", ru: "Упорядоченные extensions на известных seams PaymentWorkflow." },
        isCorrect: true,
        feedback: { en: "Correct.", ru: "Верно." }
      },
      {
        id: "opt_trade5_b",
        text: { en: "Protected hooks buried in AbstractPaymentBase level 4.", ru: "Protected hooks, спрятанные на уровне 4 AbstractPaymentBase." },
        isCorrect: false,
        feedback: { en: "Incorrect — fragile and hard to reorder.", ru: "Неверно — хрупко и сложно переупорядочить." }
      },
      {
        id: "opt_trade5_c",
        text: { en: "A new empty marker interface per extension.", ru: "Новый пустой marker interface на каждое расширение." },
        isCorrect: false,
        feedback: { en: "Incorrect — markers without behavior are ceremony.", ru: "Неверно — markers без поведения — ceremony." }
      }
    ],
    order: 5
  }
];
