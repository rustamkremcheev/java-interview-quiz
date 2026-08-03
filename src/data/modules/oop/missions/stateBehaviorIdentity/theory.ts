import { TheoryArticle, TheoryCheckpoint } from '../../../../../types/domain';

export const THEORY_ARTICLE_STATE_BEHAVIOR_IDENTITY: TheoryArticle = {
  id: "art_theory_state_behavior_identity",
  topicIds: ["top_oop_03"],
  conceptIds: ["cpt_object_state", "cpt_object_behavior", "cpt_object_identity"],
  title: {
    en: "State, Behavior, and Identity in TransferRequest",
    ru: "State, Behavior и Identity в TransferRequest"
  },
  summary: {
    en: "Every object has state (current fields), behavior (methods that change state under rules), and identity (what distinguishes this instance as an entity). TransferRequest must key on TransferId — matching amount/state must not collapse two transfers, and public setters must give way to transition methods.",
    ru: "У каждого объекта есть state (текущие поля), behavior (методы смены state по правилам) и identity (что отличает этот экземпляр как сущность). TransferRequest должен опираться на TransferId — совпадение amount/state не должно сливать два перевода, а публичные setter'ы должны уступить transition-методам."
  },
  sections: [
    {
      id: "sec_sbi_definition",
      category: "DEFINITION",
      title: { en: "1. State vs Behavior vs Identity", ru: "1. State vs Behavior vs Identity" },
      blocks: [
        {
          id: "blk_sbi_def_1",
          type: "PARAGRAPH",
          content: {
            en: "State is the data an object currently holds — for TransferRequest: amountCents, beneficiary, TransferState. Behavior is how the object may change that data — submit, settle, cancel with guards. Identity is TransferId: the stable handle that says 'this transfer' even when state moves from DRAFT to SUBMITTED. Confusing similar state with the same identity is how TransferService skipped a legitimate second wire.",
            ru: "State — данные, которые объект сейчас держит: у TransferRequest — amountCents, beneficiary, TransferState. Behavior — как объект может менять эти данные: submit, settle, cancel с проверками. Identity — TransferId: стабильный handle «этот перевод», даже когда state идёт из DRAFT в SUBMITTED. Путаница похожего state с той же identity — как TransferService пропустил легитимный второй wire."
          }
        },
        {
          id: "blk_sbi_def_2",
          type: "CALLOUT",
          title: { en: "💡 Mental Model: Same Fields ≠ Same Entity", ru: "💡 Ментальная Модель: Одинаковые Поля ≠ Та Же Сущность" },
          content: {
            en: "Two TransferRequest objects can print identical amount and beneficiary and still be different entities. Ask 'what is the TransferId?' before asking 'do the fields match?'.",
            ru: "Два TransferRequest могут печатать одинаковые amount и beneficiary и всё равно быть разными сущностями. Спросите «какой TransferId?» до «совпадают ли поля?»."
          }
        }
      ]
    },
    {
      id: "sec_sbi_mechanics",
      category: "MECHANICS",
      title: { en: "2. Entity Identity, Transitions, and Audit", ru: "2. Identity Сущности, Переходы и Аудит" },
      blocks: [
        {
          id: "blk_sbi_mech_1",
          type: "PARAGRAPH",
          content: {
            en: "Evans Classification: entities are tracked by identity; values by attributes. TransferRequest is an entity. Fowler's Identity Map stores one instance per id so you do not confuse two loads of the same entity — here the inverse bug appeared: two different ids were treated as one because attributes matched. JLS `==` compares reference identity of objects, not business TransferId; your domain still needs an explicit id. Public setters rewrite state without behavior: no guard, no TransferAuditEntry ownership, illegal DRAFT→SETTLED leaps.",
            ru: "Evans Classification: сущности отслеживаются по identity; values — по атрибутам. TransferRequest — entity. Identity Map Фаулера хранит один экземпляр на id, чтобы не путать две загрузки одной сущности — здесь обратный баг: два разных id сочли одним из‑за совпадения атрибутов. JLS `==` сравнивает reference identity объектов, не бизнес-TransferId; домену всё равно нужен явный id. Публичные setter'ы переписывают state без behavior: нет guard, нет владения TransferAuditEntry, возможны скачки DRAFT→SETTLED."
          }
        },
        {
          id: "blk_sbi_mech_2",
          type: "WARNING",
          title: { en: "⚙️ This Is Not an equals/hashCode HashMap Mission", ru: "⚙️ Это Не Миссия equals/hashCode HashMap" },
          content: {
            en: "Overriding equals by amount to 'dedupe' transfers hides the identity bug and breaks entity semantics. Fix lifecycle decisions and transitions first.",
            ru: "Переопределение equals по amount для «дедупа» переводов маскирует баг identity и ломает семантику entity. Сначала чините решения жизненного цикла и переходы."
          }
        }
      ]
    },
    {
      id: "sec_sbi_tradeoffs",
      category: "TRADE_OFFS",
      title: { en: "3. Trade-offs: Soft Duplicate Signals vs Hard Skip", ru: "3. Компромиссы: Мягкий Сигнал Дубликата vs Жёсткий Skip" },
      blocks: [
        {
          id: "blk_sbi_trade_1",
          type: "PARAGRAPH",
          content: {
            en: "Matching amount + beneficiary within a time window is a useful fraud/ops signal — raise a warning, require dual control — but must not auto-drop a distinct TransferId. Transition methods cost more API surface than setters; they buy enforceable TransferState machines and auditable behavior. Keep TransferId immutable for the object's lifetime; correlate retries with the same id for idempotency.",
            ru: "Совпадение amount + бенефициара в окне времени — полезный сигнал fraud/ops: warning, dual control — но нельзя автоматически отбрасывать другой TransferId. Transition-методы дороже setter'ов по API surface; они дают enforceable машину TransferState и аудируемое behavior. Держите TransferId неизменным на жизнь объекта; коррелируйте retry тем же id для идемпотентности."
          }
        }
      ]
    },
    {
      id: "sec_sbi_interview_followups",
      category: "INTERVIEW_GUIDANCE",
      title: { en: "4. Senior Interview Follow-ups", ru: "4. Доп. Вопросы Senior-Интервью" },
      blocks: [
        {
          id: "blk_sbi_fup_01",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q1: 'What is object state?' — Model Answer: The current field values — amount, TransferState, beneficiary — at a moment in time.",
            ru: "Доп. Вопрос 1: 'Что такое object state?' — Модельный Ответ: Текущие значения полей — amount, TransferState, beneficiary — в момент времени."
          }
        },
        {
          id: "blk_sbi_fup_02",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q2: 'What is object behavior?' — Model Answer: Methods that change state under rules — submit/settle/cancel — not raw field writes.",
            ru: "Доп. Вопрос 2: 'Что такое object behavior?' — Модельный Ответ: Методы смены state по правилам — submit/settle/cancel — не сырая запись полей."
          }
        },
        {
          id: "blk_sbi_fup_03",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q3: 'What is object identity?' — Model Answer: TransferId (entity key) that distinguishes this transfer while state evolves.",
            ru: "Доп. Вопрос 3: 'Что такое object identity?' — Модельный Ответ: TransferId (ключ entity), отличающий этот перевод, пока state эволюционирует."
          }
        },
        {
          id: "blk_sbi_fup_04",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q4: 'Can two entities share identical state?' — Model Answer: Yes — two wires, same amount, different TransferIds.",
            ru: "Доп. Вопрос 4: 'Могут ли две сущности иметь одинаковый state?' — Модельный Ответ: Да — два wire, одна сумма, разные TransferId."
          }
        },
        {
          id: "blk_sbi_fup_05",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q5: 'Why are public setters dangerous here?' — Model Answer: They mutate state without transition guards or owned audit side-effects.",
            ru: "Доп. Вопрос 5: 'Почему здесь опасны публичные setter'ы?' — Модельный Ответ: Они мутируют state без guard'ов перехода и без владения audit side-effect."
          }
        },
        {
          id: "blk_sbi_fup_06",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q6: 'How does Identity Map relate?' — Model Answer: Track one instance per id; do not merge different ids because attributes match.",
            ru: "Доп. Вопрос 6: 'Как связан Identity Map?' — Модельный Ответ: Один экземпляр на id; не сливайте разные id из‑за совпадения атрибутов."
          }
        },
        {
          id: "blk_sbi_fup_07",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q7: 'Entity vs value for TransferId?' — Model Answer: TransferId identifies an entity; Money/amount is typically a value.",
            ru: "Доп. Вопрос 7: 'Entity vs value для TransferId?' — Модельный Ответ: TransferId идентифицирует entity; Money/amount обычно value."
          }
        },
        {
          id: "blk_sbi_fup_08",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q8: 'Does Java == solve business identity?' — Model Answer: No — == is reference identity; domain uses TransferId equality.",
            ru: "Доп. Вопрос 8: 'Решает ли Java == бизнес-identity?' — Модельный Ответ: Нет — == это reference identity; домен использует равенство TransferId."
          }
        },
        {
          id: "blk_sbi_fup_09",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q9: 'Soft duplicate warning vs hard skip?' — Model Answer: Warn on matching fields; never auto-drop a distinct TransferId.",
            ru: "Доп. Вопрос 9: 'Мягкий warning дубликата vs жёсткий skip?' — Модельный Ответ: Warning при совпадении полей; никогда не отбрасывать другой TransferId автоматически."
          }
        },
        {
          id: "blk_sbi_fup_10",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q10: 'Where should audit attach?' — Model Answer: Inside or immediately after transition methods, keyed by TransferId.",
            ru: "Доп. Вопрос 10: 'Куда крепить audit?' — Модельный Ответ: Внутри или сразу после transition-методов, с ключом TransferId."
          }
        },
        {
          id: "blk_sbi_fup_11",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q11: 'Would equals by amount fix duplicates?' — Model Answer: No — that conflates state with identity and is the wrong tool here.",
            ru: "Доп. Вопрос 11: 'Починит ли equals по amount дубликаты?' — Модельный Ответ: Нет — это смешивает state с identity и здесь неверный инструмент."
          }
        },
        {
          id: "blk_sbi_fup_12",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q12: 'How do you review for this bug?' — Model Answer: Look for field-sameness gates that skip work and public state setters on entities.",
            ru: "Доп. Вопрос 12: 'Как ловить на ревью?' — Модельный Ответ: Ищите гейты по совпадению полей, пропускающие работу, и публичные setter'ы state у entity."
          }
        }
      ]
    }
  ],
  prerequisiteConceptIds: ["cpt_class_vs_object"],
  sourceIds: ["src_sbi_fowler_identity_map", "src_sbi_evans_classification", "src_sbi_jls_identity", "src_sbi_hf_ooad"],
  verificationStatus: "TECHNICALLY_VERIFIED",
  tags: ["#state", "#behavior", "#identity", "#transfer-request"],
  estimatedMinutes: 14,
  version: "1.0.0"
};

export const THEORY_CHECKPOINTS_STATE_BEHAVIOR_IDENTITY: readonly TheoryCheckpoint[] = [
  {
    id: "chk_sbi_1",
    theoryArticleId: "art_theory_state_behavior_identity",
    order: 1,
    question: {
      en: "Why did TransferService skip a legitimate second wire?",
      ru: "Почему TransferService пропустил легитимный второй wire?"
    },
    explanation: {
      en: "It treated matching state fields as identity and ignored distinct TransferIds.",
      ru: "Он принял совпадение полей state за identity и проигнорировал разные TransferId."
    },
    options: [
      {
        id: "opt_sbi1_a",
        text: {
          en: "It collapsed distinct TransferIds because amount/counterparty state matched.",
          ru: "Он слил разные TransferId из‑за совпадения state amount/контрагента."
        },
        isCorrect: true,
        feedback: { en: "Correct — state ≠ identity.", ru: "Верно — state ≠ identity." }
      },
      {
        id: "opt_sbi1_b",
        text: {
          en: "HashMap lost entries because TransferId hashCode was broken.",
          ru: "HashMap потерял записи из‑за сломанного hashCode у TransferId."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect — this mission is not about HashMap contracts.",
          ru: "Неверно — эта миссия не про контракты HashMap."
        }
      },
      {
        id: "opt_sbi1_c",
        text: {
          en: "The JVM merged objects with equal field layouts automatically.",
          ru: "JVM автоматически слила объекты с одинаковой раскладкой полей."
        },
        isCorrect: false,
        feedback: { en: "Incorrect — the service logic did that.", ru: "Неверно — это сделала логика сервиса." }
      }
    ]
  },
  {
    id: "chk_sbi_2",
    theoryArticleId: "art_theory_state_behavior_identity",
    order: 2,
    question: {
      en: "What should own a TransferState change from DRAFT to SUBMITTED?",
      ru: "Что должно владеть сменой TransferState из DRAFT в SUBMITTED?"
    },
    explanation: {
      en: "A transition method (behavior) with guards — not a public setter.",
      ru: "Transition-метод (behavior) с проверками — не публичный setter."
    },
    options: [
      {
        id: "opt_sbi2_a",
        text: {
          en: "A submit() transition method that validates and then updates state.",
          ru: "Transition-метод submit(), который валидирует и затем обновляет state."
        },
        isCorrect: true,
        feedback: { en: "Correct.", ru: "Верно." }
      },
      {
        id: "opt_sbi2_b",
        text: {
          en: "Any caller writing setTransferState(SUBMITTED) freely.",
          ru: "Любой вызывающий код, свободно пишущий setTransferState(SUBMITTED)."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect — that bypasses behavior rules.",
          ru: "Неверно — это обходит правила behavior."
        }
      },
      {
        id: "opt_sbi2_c",
        text: {
          en: "Changing the TransferId string to include SUBMITTED.",
          ru: "Изменение строки TransferId так, чтобы включать SUBMITTED."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect — identity must stay stable.",
          ru: "Неверно — identity должна оставаться стабильной."
        }
      }
    ]
  },
  {
    id: "chk_sbi_3",
    theoryArticleId: "art_theory_state_behavior_identity",
    order: 3,
    question: {
      en: "Which statement best separates identity from state?",
      ru: "Какое утверждение лучше разделяет identity и state?"
    },
    explanation: {
      en: "TransferId identifies the entity; amount/TransferState are mutable state that may match across entities.",
      ru: "TransferId идентифицирует сущность; amount/TransferState — мутабельный state, который может совпадать у разных сущностей."
    },
    options: [
      {
        id: "opt_sbi3_a",
        text: {
          en: "TransferId is identity; amount and TransferState are state that can match across different transfers.",
          ru: "TransferId — identity; amount и TransferState — state, который может совпадать у разных переводов."
        },
        isCorrect: true,
        feedback: { en: "Correct.", ru: "Верно." }
      },
      {
        id: "opt_sbi3_b",
        text: {
          en: "Identity is whatever equals returns based on amount fields.",
          ru: "Identity — то, что возвращает equals по полям amount."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect — that conflates state with identity.",
          ru: "Неверно — это смешивает state с identity."
        }
      },
      {
        id: "opt_sbi3_c",
        text: {
          en: "State and identity are synonyms in OOP.",
          ru: "State и identity — синонимы в OOP."
        },
        isCorrect: false,
        feedback: { en: "Incorrect.", ru: "Неверно." }
      }
    ]
  },
  {
    id: "chk_sbi_4",
    theoryArticleId: "art_theory_state_behavior_identity",
    order: 4,
    question: {
      en: "What is a safe production response to matching amount + beneficiary?",
      ru: "Какой безопасный продакшн-ответ на совпадение amount + бенефициара?"
    },
    explanation: {
      en: "Raise a soft duplicate signal for review; still process distinct TransferIds.",
      ru: "Поднять мягкий сигнал дубликата для review; всё равно обрабатывать разные TransferId."
    },
    options: [
      {
        id: "opt_sbi4_a",
        text: {
          en: "Warn/ops-review on field match; still process each distinct TransferId (idempotent only on same id).",
          ru: "Warning/ops-review при совпадении полей; всё равно обрабатывать каждый TransferId (идемпотентность только по тому же id)."
        },
        isCorrect: true,
        feedback: { en: "Correct.", ru: "Верно." }
      },
      {
        id: "opt_sbi4_b",
        text: {
          en: "Hard-return and never submit the second TransferId.",
          ru: "Жёсткий return и никогда не submit второй TransferId."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect — that drops a legitimate entity.",
          ru: "Неверно — это отбрасывает легитимную сущность."
        }
      },
      {
        id: "opt_sbi4_c",
        text: {
          en: "Overwrite the first TransferId with the second.",
          ru: "Перезаписать первый TransferId вторым."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect — identity must not be rewritten that way.",
          ru: "Неверно — identity так переписывать нельзя."
        }
      }
    ]
  }
];
