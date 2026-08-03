import {
  FixBuilderChallenge,
  BugHuntChallenge,
  InterviewAnswerChallenge,
  Challenge
} from '../../../../../types/domain';

export const GUIDED_FIX_BUILDER_CHALLENGE_SBI: FixBuilderChallenge = {
  id: "chl_sbi_fix_builder",
  type: "FIX_BUILDER",
  missionId: "mis_state_behavior_identity",
  stageId: "stg_sbi_practice",
  title: {
    en: "Fix Builder: TransferId Identity & Transition Methods",
    ru: "Конструктор Исправления: Identity TransferId и Transition-Методы"
  },
  prompt: {
    en: "TransferService skips a second TransferRequest when state fields match, and TransferRequest exposes public setters. Select ALL structural building blocks for a production-safe fix.",
    ru: "TransferService пропускает второй TransferRequest при совпадении полей состояния, а TransferRequest открывает публичные setter'ы. Выберите ВСЕ элементы для продакшн-безопасного фикса."
  },
  difficulty: "APPLIED",
  assistanceLevel: "GUIDED",
  conceptIds: ["cpt_object_state", "cpt_object_behavior", "cpt_object_identity"],
  topicIds: ["top_oop_03"],
  tags: ["#state", "#behavior", "#identity"],
  hintIds: ["hnt_sbi_1", "hnt_sbi_2", "hnt_sbi_3", "hnt_sbi_4"],
  xpReward: 100,
  order: 7,
  payload: {
    baseCodeArtifactId: "art_sbi_service_broken",
    solutionCodeArtifactId: "art_sbi_service_solution",
    options: [
      {
        id: "opt_sbi_fix_1",
        text: {
          en: "Key TransferService decisions on TransferId identity — never skip a transfer solely because amount/counterparty state fields match.",
          ru: "Ключевать решения TransferService по identity TransferId — никогда не пропускать перевод только из‑за совпадения полей amount/контрагента."
        },
        isCorrect: true,
        explanation: {
          en: "Correct. Entities with distinct TransferIds remain distinct even with identical state.",
          ru: "Верно. Сущности с разными TransferId остаются разными даже при одинаковом state."
        }
      },
      {
        id: "opt_sbi_fix_2",
        text: {
          en: "Replace public TransferState/amount setters with transition methods (submit, settle, cancel) that enforce allowed state changes.",
          ru: "Заменить публичные setter'ы TransferState/amount transition-методами (submit, settle, cancel), проверяющими допустимые переходы."
        },
        isCorrect: true,
        explanation: {
          en: "Correct. Behavior owns state transitions; raw setters bypass rules.",
          ru: "Верно. Behavior владеет переходами state; сырые setter'ы обходят правила."
        }
      },
      {
        id: "opt_sbi_fix_3",
        text: {
          en: "Treat identical amount + beneficiary as automatic proof of the same transfer and drop the second TransferId.",
          ru: "Считать одинаковые amount + beneficiary автоматическим доказательством того же перевода и отбрасывать второй TransferId."
        },
        isCorrect: false,
        explanation: {
          en: "Incorrect. Matching state is not identity — duplicate wires with distinct IDs are valid business events.",
          ru: "Неверно. Совпадение state — не identity; дублирующие wires с разными ID — валидные бизнес-события."
        }
      },
      {
        id: "opt_sbi_fix_4",
        text: {
          en: "Keep TransferId immutable for the object's lifetime and emit TransferAuditEntry keyed by that identity on each transition.",
          ru: "Держать TransferId неизменным на время жизни объекта и писать TransferAuditEntry с ключом этой identity на каждый переход."
        },
        isCorrect: true,
        explanation: {
          en: "Correct. Stable identity + audited behavior makes retries and compliance meaningful.",
          ru: "Верно. Стабильная identity + аудируемое behavior делают retry и compliance осмысленными."
        }
      },
      {
        id: "opt_sbi_fix_distractor_1",
        text: {
          en: "Override equals/hashCode on TransferRequest by amount fields so HashMap deduplication hides the second transfer.",
          ru: "Переопределить equals/hashCode у TransferRequest по полям amount, чтобы дедупликация HashMap скрыла второй перевод."
        },
        isCorrect: false,
        explanation: {
          en: "Incorrect. This mission is about identity vs state vs behavior — not HashMap equality contracts.",
          ru: "Неверно. Эта миссия про identity vs state vs behavior — не про контракты равенства HashMap."
        }
      }
    ]
  }
};

export const APPLIED_BUG_HUNT_CHALLENGE_SBI: BugHuntChallenge = {
  id: "chl_sbi_bughunt",
  type: "BUG_HUNT",
  missionId: "mis_state_behavior_identity",
  stageId: "stg_sbi_debug",
  title: {
    en: "Bug Hunt: Duplicate Transfer Identity Collapse",
    ru: "Поиск Бага: Слияние Identity Дубликата Перевода"
  },
  prompt: {
    en: "Click the line(s) where TransferService collapses distinct TransferIds by state-field sameness and where public setters rewrite TransferState without transitions.",
    ru: "Нажмите строку(и), где TransferService сливает разные TransferId по совпадению полей состояния и где публичные setter'ы переписывают TransferState без переходов."
  },
  difficulty: "APPLIED",
  assistanceLevel: "APPLIED",
  conceptIds: ["cpt_object_state", "cpt_object_behavior", "cpt_object_identity"],
  topicIds: ["top_oop_03"],
  tags: ["#bug-hunt", "#identity"],
  hintIds: ["hnt_sbi_bug_1", "hnt_sbi_bug_2", "hnt_sbi_bug_3"],
  xpReward: 100,
  order: 10,
  payload: {
    baseCodeArtifactId: "art_sbi_service_bughunt",
    solutionCodeArtifactId: "art_sbi_service_solution",
    codeSnippet: `public void process(TransferRequest incoming, TransferRequest recent) {
    if (incoming.sameStateAs(recent)) { // Line 2 — BUG: state ≠ identity
        return; // skips distinct TransferId
    }
    incoming.setTransferState(TransferState.SUBMITTED); // Line 5 — BUG: setter bypass
    audit.log(new TransferAuditEntry(incoming.getTransferId(), TransferState.SUBMITTED));
    gateway.submit(incoming);
}`,
    lines: [
      { lineNumber: 1, code: "public void process(TransferRequest incoming, TransferRequest recent) {", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      {
        lineNumber: 2,
        code: "    if (incoming.sameStateAs(recent)) {",
        isBug: true,
        explanation: {
          en: "Line 2: Compares mutable state fields as if they were identity — distinct TransferIds can share amount/counterparty and still be different transfers.",
          ru: "Строка 2: Сравнивает мутабельные поля state как identity — разные TransferId могут иметь одинаковые amount/контрагента и всё равно быть разными переводами."
        }
      },
      { lineNumber: 3, code: "        return; // skips distinct TransferId", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      { lineNumber: 4, code: "    }", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      {
        lineNumber: 5,
        code: "    incoming.setTransferState(TransferState.SUBMITTED);",
        isBug: true,
        explanation: {
          en: "Line 5: Public setter rewrites TransferState without transition rules — behavior (submit) should own the change and audit trail.",
          ru: "Строка 5: Публичный setter переписывает TransferState без правил перехода — behavior (submit) должен владеть сменой и аудитом."
        }
      },
      { lineNumber: 6, code: "    audit.log(new TransferAuditEntry(incoming.getTransferId(), TransferState.SUBMITTED));", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      { lineNumber: 7, code: "    gateway.submit(incoming);", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      { lineNumber: 8, code: "}", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } }
    ]
  }
};

export const INTERVIEW_ANSWER_CHALLENGE_SBI: InterviewAnswerChallenge = {
  id: "chl_sbi_interview_answer",
  type: "INTERVIEW_ANSWER",
  missionId: "mis_state_behavior_identity",
  stageId: "stg_sbi_interview_a",
  title: {
    en: "Senior Interview Verbal Explanation: State, Behavior, Identity",
    ru: "Устный Ответ на Senior-Интервью: State, Behavior, Identity"
  },
  prompt: {
    en: "TransferService skipped a second TransferRequest because amount and counterparties matched, despite a different TransferId. Public setters rewrote TransferState. Explain state vs behavior vs identity and your production fix.",
    ru: "TransferService пропустил второй TransferRequest из‑за совпадения amount и контрагентов при другом TransferId. Публичные setter'ы переписывали TransferState. Объясните state vs behavior vs identity и ваш продакшн-фикс."
  },
  difficulty: "APPLIED",
  assistanceLevel: "INTERVIEW",
  conceptIds: ["cpt_object_state", "cpt_object_behavior", "cpt_object_identity"],
  topicIds: ["top_oop_03"],
  tags: ["#interview", "#identity"],
  hintIds: [],
  xpReward: 150,
  order: 9,
  payload: {
    targetQuestionId: "q_sbi_duplicate_transfer_01",
    rubricDimensions: ["ELEVATOR_PITCH", "OBJECT_REFERENCE_MECHANICS", "PRODUCTION_TRADEOFFS"],
    expectedConcepts: [
      {
        id: "cpt_object_state",
        label: { en: "Object State", ru: "Состояние Объекта" },
        keywords: ["state", "fields", "TransferState", "amount", "состояние", "поля"]
      },
      {
        id: "cpt_object_behavior",
        label: { en: "Object Behavior", ru: "Поведение Объекта" },
        keywords: ["behavior", "transition", "submit", "setter", "поведение", "переход"]
      },
      {
        id: "cpt_object_identity",
        label: { en: "Object Identity", ru: "Идентичность Объекта" },
        keywords: ["identity", "TransferId", "entity", "distinct", "идентичность", "сущность"]
      }
    ],
    modelAnswer30s: {
      en: "Elevator Pitch (30 sec): State is the current fields (amount, TransferState). Behavior is methods that change state under rules. Identity is TransferId — what makes this transfer this transfer. Matching state does not mean same identity. Fix: decide by TransferId, use transition methods instead of public setters, audit by identity.",
      ru: "Elevator Pitch (30 сек): State — текущие поля (amount, TransferState). Behavior — методы смены state по правилам. Identity — TransferId, делающий этот перевод этим переводом. Совпадение state ≠ та же identity. Фикс: решения по TransferId, transition-методы вместо публичных setter'ов, аудит по identity."
    },
    modelAnswerDetailed: {
      en: "Deep Mechanics (60 sec): In Evans terms, TransferRequest is an entity: identity persists while state evolves. Two wires with the same amount to the same beneficiary are still two entities if TransferIds differ — Identity Map thinking tracks instances by id, not by field snapshot. Public setters expose state without behavior, so illegal transitions (DRAFT→SETTLED) become possible. Transition methods like submit() validate, mutate, and emit TransferAuditEntry. Java reference equality (==) is not the business identity; TransferId is. Do not 'fix' this with equals/hashCode HashMap tricks — that is a different problem class.",
      ru: "Глубокая Механика (60 сек): В терминах Evans TransferRequest — entity: identity сохраняется, пока state эволюционирует. Два wire с одной суммой одному бенефициару — всё ещё две сущности при разных TransferId. Identity Map отслеживает экземпляры по id, не по snapshot полей. Публичные setter'ы открывают state без behavior, поэтому возможны нелегальные переходы (DRAFT→SETTLED). Transition-методы вроде submit() валидируют, мутируют и пишут TransferAuditEntry. Java == — не бизнес-identity; TransferId — да. Не «чините» это трюками equals/hashCode HashMap — это другой класс задач."
    },
    modelAnswerTradeOffs: {
      en: "Production Trade-offs (30 sec): Soft duplicate warnings on matching amount/beneficiary are useful for fraud/ops review — hard skip is dangerous. Transition methods add ceremony vs setters but protect invariants and audit. Stable TransferId may come from UUID or ledger sequence; never rewrite it after creation.",
      ru: "Продакшн Компромиссы (30 сек): Мягкие warnings о совпадении amount/бенефициара полезны для fraud/ops review — жёсткий skip опасен. Transition-методы дороже setter'ов по ceremony, но защищают инварианты и аудит. Стабильный TransferId — UUID или ledger sequence; никогда не переписывать после создания."
    },
    followUpQuestionText: {
      en: "Interviewer Follow-Up: 'If two transfers have the same TransferId after a retry, how do you tell state from identity?'",
      ru: "Доп. Вопрос Интервьюера: 'Если после retry у двух переводов один TransferId — как отличить state от identity?'"
    },
    followUpModelAnswerText: {
      en: "Follow-up Model Answer: Same TransferId means the same entity — retries should be idempotent against that identity. State may progress (DRAFT→SUBMITTED). If you minted a new TransferId for a retry of the same business intent, you created a second entity; reconcile by business correlation id separately from entity identity.",
      ru: "Ответ на Доп. Вопрос: Один TransferId — та же сущность; retry должны быть идемпотентны относительно этой identity. State может прогрессировать (DRAFT→SUBMITTED). Если для retry того же бизнес-намерения выдали новый TransferId — создали вторую сущность; коррелируйте отдельно business correlation id и entity identity."
    }
  }
};

export const ALL_STATE_BEHAVIOR_IDENTITY_CHALLENGES: readonly Challenge[] = [
  GUIDED_FIX_BUILDER_CHALLENGE_SBI,
  APPLIED_BUG_HUNT_CHALLENGE_SBI,
  INTERVIEW_ANSWER_CHALLENGE_SBI
];
