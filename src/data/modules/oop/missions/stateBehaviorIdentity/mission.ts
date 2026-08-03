import { Mission, MissionStage, TheoryStage, PracticeStage, InterviewStage, BaseMissionStage } from '../../../../../types/domain';

const stage1: BaseMissionStage = {
  id: "stg_sbi_intro",
  missionId: "mis_state_behavior_identity",
  type: "MISSION_INTRODUCTION",
  order: 1,
  title: { en: "1. Mission Introduction", ru: "1. Введение в Миссию" },
  instructions: {
    en: "Inspect the production incident where TransferService treated two TransferRequest instances as interchangeable because amount and counterparties matched — distinct TransferIds were ignored.",
    ru: "Изучите инцидент, где TransferService считал два TransferRequest взаимозаменяемыми из‑за совпадения суммы и контрагентов — разные TransferId игнорировались."
  }
};

const stage2: BaseMissionStage = {
  id: "stg_sbi_problem",
  missionId: "mis_state_behavior_identity",
  type: "REAL_ENGINEERING_PROBLEM",
  order: 2,
  title: { en: "2. Real Engineering Problem", ru: "2. Реальная Инженерная Проблема" },
  instructions: {
    en: "Examine TransferRequest with public setters, field-based sameness checks, and TransferService skipping a second transfer when state fields look identical.",
    ru: "Изучите TransferRequest с публичными setter'ами, проверкой «одинаковости» по полям и TransferService, пропускающий второй перевод, когда поля состояния совпадают."
  }
};

const stage3: BaseMissionStage = {
  id: "stg_sbi_think",
  missionId: "mis_state_behavior_identity",
  type: "THINK_YOURSELF",
  order: 3,
  title: { en: "3. Think Yourself Diagnostic", ru: "3. Диагностика: Подумайте Сам" },
  instructions: {
    en: "Formulate your hypothesis: How do state, behavior, and identity differ for TransferRequest, and why matching fields must not collapse two TransferIds?",
    ru: "Сформулируйте гипотезу: чем отличаются state, behavior и identity у TransferRequest, и почему совпадение полей не должно сливать два TransferId?"
  }
};

const stage4: BaseMissionStage = {
  id: "stg_sbi_help",
  missionId: "mis_state_behavior_identity",
  type: "NEED_HELP",
  order: 4,
  title: { en: "4. Need Knowledge Bridge", ru: "4. Мост к Знаниям" },
  instructions: {
    en: "No-penalty bridge to object state vs behavior vs identity, entity identity via TransferId, and transition methods over public setters.",
    ru: "Бесштрафной переход к state vs behavior vs identity, идентичности сущности через TransferId и transition-методам вместо публичных setter'ов."
  }
};

const stage5: TheoryStage = {
  id: "stg_sbi_theory",
  missionId: "mis_state_behavior_identity",
  type: "THEORY",
  order: 5,
  title: { en: "5. Core Theory & Checkpoints", ru: "5. Фундаментальная Теория и Проверки" },
  instructions: {
    en: "Study theory covering state, behavior, identity, TransferId as entity identity, and senior interview follow-ups.",
    ru: "Изучите теорию о state, behavior, identity, TransferId как идентичности сущности и доп. вопросах Senior-интервью."
  },
  theoryArticleId: "art_theory_state_behavior_identity"
};

const stage6: BaseMissionStage = {
  id: "stg_sbi_visual",
  missionId: "mis_state_behavior_identity",
  type: "VISUALIZATION",
  order: 6,
  title: { en: "6. Interactive Identity vs State Visualization", ru: "6. Визуализация Identity vs State" },
  instructions: {
    en: "Compare two TransferRequest objects with identical amount/state fields but distinct TransferIds versus collapsing them as 'the same transfer'.",
    ru: "Сравните два TransferRequest с одинаковыми полями amount/state, но разными TransferId, против слияния их как «один и тот же перевод»."
  }
};

const stage7: PracticeStage = {
  id: "stg_sbi_practice",
  missionId: "mis_state_behavior_identity",
  type: "INTERACTIVE_PRACTICE",
  order: 7,
  title: { en: "7. Guided Practice: Fix Builder", ru: "7. Практика: Конструктор Исправления" },
  instructions: {
    en: "Assemble structural fixes so TransferService keys on TransferId identity and TransferRequest uses transition methods instead of public setters.",
    ru: "Соберите исправления, чтобы TransferService опирался на identity TransferId, а TransferRequest использовал transition-методы вместо публичных setter'ов."
  },
  challengeId: "chl_sbi_fix_builder"
};

const stage8: InterviewStage = {
  id: "stg_sbi_interview_q",
  missionId: "mis_state_behavior_identity",
  type: "INTERVIEW_QUESTION",
  order: 8,
  title: { en: "8. Senior Interview Scenario", ru: "8. Сценарий Senior-Интервью" },
  instructions: {
    en: "Review the senior interview question about duplicate-looking transfers, identity vs state, and controlled state transitions.",
    ru: "Ознакомьтесь с вопросом Senior-собеседования о «похожих» переводах, identity vs state и контролируемых переходах состояния."
  },
  interviewQuestionId: "q_sbi_duplicate_transfer_01",
  challengeId: "chl_sbi_interview_answer"
};

const stage9: InterviewStage = {
  id: "stg_sbi_interview_a",
  missionId: "mis_state_behavior_identity",
  type: "INTERVIEW_ANSWER",
  order: 9,
  title: { en: "9. Interview Verbal Answer", ru: "9. Устный Ответ и Модель" },
  instructions: {
    en: "Formulate your structured verbal response (Elevator Pitch + State/Behavior/Identity Mechanics + Production Trade-offs) and submit for evaluation.",
    ru: "Сформулируйте структурированный ответ (Elevator Pitch + Механика State/Behavior/Identity + Продакшн-компромиссы) и отправьте на проверку."
  },
  interviewQuestionId: "q_sbi_duplicate_transfer_01",
  challengeId: "chl_sbi_interview_answer"
};

const stage10: PracticeStage = {
  id: "stg_sbi_debug",
  missionId: "mis_state_behavior_identity",
  type: "DEBUG_COUNTER_EXAMPLE",
  order: 10,
  title: { en: "10. Applied Bug Hunt: Duplicate Transfer Collapse", ru: "10. Поиск Бага: Слияние Дубликатов Перевода" },
  instructions: {
    en: "Identify the line(s) where TransferService collapses distinct TransferIds using field-state sameness and where public setters bypass transitions.",
    ru: "Найдите строку(и), где TransferService сливает разные TransferId по совпадению полей состояния и где публичные setter'ы обходят переходы."
  },
  challengeId: "chl_sbi_bughunt"
};

const stage11: BaseMissionStage = {
  id: "stg_sbi_related",
  missionId: "mis_state_behavior_identity",
  type: "RELATED_TOPICS",
  order: 11,
  title: { en: "11. Related Knowledge Nodes", ru: "11. Связанные Узлы Знаний" },
  instructions: {
    en: "Explore connections to encapsulation, entity vs value, and equals/hashCode — without turning this into a HashMap contract mission.",
    ru: "Исследуйте связи к encapsulation, entity vs value и equals/hashCode — не превращая это в миссию контракта HashMap."
  }
};

const stage12: BaseMissionStage = {
  id: "stg_sbi_results",
  missionId: "mis_state_behavior_identity",
  type: "MISSION_RESULTS",
  order: 12,
  title: { en: "12. Mission Performance Summary", ru: "12. Итоги Прохождения Миссии" },
  instructions: {
    en: "Review your performance metrics, concepts strengthened, and XP awarded.",
    ru: "Просмотрите метрики прохождения, укрепившиеся концепции и заработанный XP."
  }
};

const stage13: BaseMissionStage = {
  id: "stg_sbi_reflection",
  missionId: "mis_state_behavior_identity",
  type: "REFLECTION",
  order: 13,
  title: { en: "13. Engineering Reflection", ru: "13. Инженерная Рефлексия" },
  instructions: {
    en: "Write a 1-sentence reflection on when you will reject a PR that treats two financial entities as duplicates solely because mutable state fields match.",
    ru: "Напишите 1 предложение о том, когда на код-ревью вы отклоните PR, считающий две финансовые сущности дубликатами только из‑за совпадения мутабельных полей состояния."
  }
};

export const STATE_BEHAVIOR_IDENTITY_MISSION_STAGES: readonly MissionStage[] = [
  stage1, stage2, stage3, stage4, stage5, stage6, stage7, stage8, stage9, stage10, stage11, stage12, stage13
];

export const STATE_BEHAVIOR_IDENTITY_MISSION: Mission = {
  id: "mis_state_behavior_identity",
  primaryTopicId: "top_oop_03",
  secondaryTopicIds: ["top_oop_02", "top_oop_01"],
  slug: "duplicate-transfer-identity",
  title: {
    en: "The Duplicate Transfer Mystery: State, Behavior, and Identity in TransferRequest",
    ru: "Загадка Дубликата Перевода: State, Behavior и Identity в TransferRequest"
  },
  description: {
    en: "Fix TransferService and TransferRequest so distinct TransferIds stay independent entities — matching amount/state must not skip a second transfer, and state changes must go through transition methods.",
    ru: "Исправьте TransferService и TransferRequest так, чтобы разные TransferId оставались независимыми сущностями — совпадение amount/state не должно пропускать второй перевод, а смена состояния должна идти через transition-методы."
  },
  scenarioIntroduction: {
    en: "Treasury ops submitted two wire transfers for the same amount to the same beneficiary within minutes — different TransferIds, different compliance tickets. TransferService saw matching amount, currency, and counterparty fields and treated the second as a duplicate, skipping submit. Audit showed one TransferAuditEntry; the second instruction never left DRAFT. Root cause was not equals/hashCode in a HashMap — the service confused similar state with identical identity, and public setters let callers rewrite TransferState without transition rules.",
    ru: "Treasury ops отправили два wire-перевода на ту же сумму тому же бенефициару за минуты — разные TransferId, разные compliance-тикеты. TransferService увидел совпадение amount, currency и контрагента и счёл второй дубликатом, пропустив submit. В аудите один TransferAuditEntry; вторая инструкция осталась в DRAFT. Причина не в equals/hashCode HashMap — сервис спутал похожее state с одинаковой identity, а публичные setter'ы позволяли переписывать TransferState без правил перехода."
  },
  engineeringProblem: {
    en: "An object has state (fields like amount, TransferState), behavior (methods that transition state under rules), and identity (TransferId that distinguishes this transfer from every other). Two TransferRequest instances can share identical field values and still be different entities. TransferService compared state fields and skipped the second transfer. Public setters exposed state mutation without behavior. Solution: key lifecycle decisions on TransferId identity; encapsulate state behind transition methods (submit, settle, cancel); treat field-matching as a business signal for review, not automatic identity collapse.",
    ru: "У объекта есть state (поля вроде amount, TransferState), behavior (методы перехода состояния по правилам) и identity (TransferId, отличающий этот перевод от любого другого). Два TransferRequest могут иметь одинаковые значения полей и всё равно быть разными сущностями. TransferService сравнивал поля состояния и пропускал второй перевод. Публичные setter'ы открывали мутацию state без behavior. Решение: ключевые решения жизненного цикла по TransferId; инкапсулировать state за transition-методами (submit, settle, cancel); совпадение полей — сигнал для review, не автоматическое слияние identity."
  },
  learningObjectives: [
    {
      en: "Distinguish object state, behavior, and identity for TransferRequest",
      ru: "Различать object state, behavior и identity у TransferRequest"
    },
    {
      en: "Explain why TransferId identity must not be collapsed by matching state fields",
      ru: "Объяснить, почему identity TransferId нельзя сливать из‑за совпадения полей состояния"
    },
    {
      en: "Replace public setters with transition methods that protect TransferState rules",
      ru: "Заменить публичные setter'ы transition-методами, защищающими правила TransferState"
    },
    {
      en: "Recognize field-sameness duplicate detection as an identity modeling bug",
      ru: "Распознавать детекцию дубликатов по совпадению полей как баг моделирования identity"
    }
  ],
  requiredConceptIds: ["cpt_object_state", "cpt_object_behavior", "cpt_object_identity"],
  recommendedConceptIds: ["cpt_encapsulation", "cpt_class_vs_object"],
  stageIds: STATE_BEHAVIOR_IDENTITY_MISSION_STAGES.map((s) => s.id),
  challengeIds: ["chl_sbi_fix_builder", "chl_sbi_bughunt", "chl_sbi_interview_answer"],
  estimatedMinutes: 25,
  difficulty: "APPLIED",
  xpReward: 250,
  version: "1.0.0"
};
