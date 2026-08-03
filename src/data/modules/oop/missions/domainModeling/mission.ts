import { Mission, MissionStage, TheoryStage, PracticeStage, InterviewStage, BaseMissionStage } from '../../../../../types/domain';

const stage1: BaseMissionStage = {
  id: "stg_dm_intro",
  missionId: "mis_domain_modeling",
  type: "MISSION_INTRODUCTION",
  order: 1,
  title: { en: "1. Mission Introduction", ru: "1. Введение в Миссию" },
  instructions: {
    en: "Inspect the compliance incident below where LoanApplication allowed approved=true with status=REJECTED and a negative double amount after a hurried underwriting hotfix.",
    ru: "Изучите инцидент compliance ниже, где LoanApplication допускал approved=true при status=REJECTED и отрицательный double amount после срочного хотфикса андеррайтинга."
  }
};

const stage2: BaseMissionStage = {
  id: "stg_dm_problem",
  missionId: "mis_domain_modeling",
  type: "REAL_ENGINEERING_PROBLEM",
  order: 2,
  title: { en: "2. Real Engineering Problem", ru: "2. Реальная Инженерная Проблема" },
  instructions: {
    en: "Examine LoanApplication's String applicantId, String status, boolean approved, double amount, and Map extras — primitives that make illegal lending combinations representable and silently exportable to decision engines.",
    ru: "Изучите String applicantId, String status, boolean approved, double amount и Map extras в LoanApplication — примитивы, из-за которых нелегальные комбинации в lending представимы и тихо уходят в decision engines."
  }
};

const stage3: BaseMissionStage = {
  id: "stg_dm_think",
  missionId: "mis_domain_modeling",
  type: "THINK_YOURSELF",
  order: 3,
  title: { en: "3. Think Yourself Diagnostic", ru: "3. Диагностика: Подумайте Сам" },
  instructions: {
    en: "Formulate your hypothesis: Why can a REJECTED loan still carry approved=true and a negative amount, and what type-level redesign would make those states unrepresentable?",
    ru: "Сформулируйте гипотезу: почему REJECTED-заявка всё ещё может нести approved=true и отрицательную сумму, и какой редизайн на уровне типов сделает эти состояния непредставимыми?"
  }
};

const stage4: BaseMissionStage = {
  id: "stg_dm_help",
  missionId: "mis_domain_modeling",
  type: "NEED_HELP",
  order: 4,
  title: { en: "4. Need Knowledge Bridge", ru: "4. Мост к Знаниям" },
  instructions: {
    en: "No-penalty bridge to domain modeling, value objects vs Primitive Obsession, and aggregate-boundary transitions for LoanApplication.",
    ru: "Бесштрафной переход к domain modeling, value objects vs Primitive Obsession и переходам на границе агрегата для LoanApplication."
  }
};

const stage5: TheoryStage = {
  id: "stg_dm_theory",
  missionId: "mis_domain_modeling",
  type: "THEORY",
  order: 5,
  title: { en: "5. Core Theory & Checkpoints", ru: "5. Фундаментальная Теория и Проверки" },
  instructions: {
    en: "Study the 4 theory sections covering illegal states, ApplicantId/LoanMoney value objects, LoanStatus + CreditDecision transitions, and senior interview follow-ups.",
    ru: "Изучите 4 раздела теории о нелегальных состояниях, value objects ApplicantId/LoanMoney, переходах LoanStatus + CreditDecision и доп. вопросах Senior-интервью."
  },
  theoryArticleId: "art_theory_domain_modeling"
};

const stage6: BaseMissionStage = {
  id: "stg_dm_visual",
  missionId: "mis_domain_modeling",
  type: "VISUALIZATION",
  order: 6,
  title: { en: "6. Interactive Illegal-State Visualization", ru: "6. Визуализация Нелегальных Состояний" },
  instructions: {
    en: "Compare the primitive bag (String status + boolean approved + double amount) against typed LoanStatus, CreditDecision, and LoanMoney that cannot encode REJECTED+approved or negative cents.",
    ru: "Сравните мешок примитивов (String status + boolean approved + double amount) с типизированными LoanStatus, CreditDecision и LoanMoney, которые не кодируют REJECTED+approved или отрицательные центы."
  }
};

const stage7: PracticeStage = {
  id: "stg_dm_practice",
  missionId: "mis_domain_modeling",
  type: "INTERACTIVE_PRACTICE",
  order: 7,
  title: { en: "7. Guided Practice: Fix Builder", ru: "7. Практика: Конструктор Исправления" },
  instructions: {
    en: "Assemble the structural code elements required to replace LoanApplication primitives with ApplicantId, LoanMoney, LoanStatus, CreditDecision, and ApprovalPolicy.",
    ru: "Соберите элементы кода для замены примитивов LoanApplication на ApplicantId, LoanMoney, LoanStatus, CreditDecision и ApprovalPolicy."
  },
  challengeId: "chl_dm_fix_builder"
};

const stage8: InterviewStage = {
  id: "stg_dm_interview_q",
  missionId: "mis_domain_modeling",
  type: "INTERVIEW_QUESTION",
  order: 8,
  title: { en: "8. Senior Interview Scenario", ru: "8. Сценарий Senior-Интервью" },
  instructions: {
    en: "Review the authentic senior interview question about making illegal LoanApplication states unrepresentable with value objects and entity transitions.",
    ru: "Ознакомьтесь с реальным вопросом Senior-собеседования о том, как сделать нелегальные состояния LoanApplication непредставимыми через value objects и переходы сущности."
  },
  interviewQuestionId: "q_dm_loan_01",
  challengeId: "chl_dm_interview_answer"
};

const stage9: InterviewStage = {
  id: "stg_dm_interview_a",
  missionId: "mis_domain_modeling",
  type: "INTERVIEW_ANSWER",
  order: 9,
  title: { en: "9. Interview Verbal Answer", ru: "9. Устный Ответ и Модель" },
  instructions: {
    en: "Formulate your structured verbal response (Elevator Pitch + Domain Mechanics + Aggregate Trade-offs) and submit for evaluation.",
    ru: "Сформулируйте структурированный ответ (Elevator Pitch + Механика Домена + Компромиссы Агрегата) и отправьте на проверку."
  },
  interviewQuestionId: "q_dm_loan_01",
  challengeId: "chl_dm_interview_answer"
};

const stage10: PracticeStage = {
  id: "stg_dm_debug",
  missionId: "mis_domain_modeling",
  type: "DEBUG_COUNTER_EXAMPLE",
  order: 10,
  title: { en: "10. Applied Bug Hunt: Illegal State Writers", ru: "10. Поиск Бага: Запись Нелегальных Состояний" },
  instructions: {
    en: "Identify the line(s) in LoanApplication where public fields/setters allow approved=true with REJECTED status or a negative amount.",
    ru: "Найдите строку(и) в LoanApplication, где public fields/setters допускают approved=true при status=REJECTED или отрицательную сумму."
  },
  challengeId: "chl_dm_bughunt"
};

const stage11: BaseMissionStage = {
  id: "stg_dm_related",
  missionId: "mis_domain_modeling",
  type: "RELATED_TOPICS",
  order: 11,
  title: { en: "11. Related Knowledge Nodes", ru: "11. Связанные Узлы Знаний" },
  instructions: {
    en: "Explore lateral graph connections to encapsulation/invariants, immutability, and OOP anti-patterns (anemic model / Primitive Obsession).",
    ru: "Исследуйте связи Графа Знаний к инкапсуляции/инвариантам, неизменяемости и антипаттернам ООП (анемичная модель / Primitive Obsession)."
  }
};

const stage12: BaseMissionStage = {
  id: "stg_dm_results",
  missionId: "mis_domain_modeling",
  type: "MISSION_RESULTS",
  order: 12,
  title: { en: "12. Mission Performance Summary", ru: "12. Итоги Прохождения Миссии" },
  instructions: {
    en: "Review your performance metrics, concepts strengthened, and XP awarded.",
    ru: "Просмотрите метрики прохождения, укрепившиеся концепции и заработанный XP."
  }
};

const stage13: BaseMissionStage = {
  id: "stg_dm_reflection",
  missionId: "mis_domain_modeling",
  type: "REFLECTION",
  order: 13,
  title: { en: "13. Engineering Reflection", ru: "13. Инженерная Рефлексия" },
  instructions: {
    en: "Write a 1-sentence reflection on when you will reject a String/boolean/double LoanApplication bag in code review in favor of typed value objects and transition methods.",
    ru: "Напишите 1 предложение о том, когда на код-ревью вы отклоните мешок String/boolean/double в LoanApplication в пользу типизированных value objects и методов перехода."
  }
};

export const DOMAIN_MODELING_MISSION_STAGES: readonly MissionStage[] = [
  stage1, stage2, stage3, stage4, stage5, stage6, stage7, stage8, stage9, stage10, stage11, stage12, stage13
];

export const DOMAIN_MODELING_MISSION: Mission = {
  id: "mis_domain_modeling",
  primaryTopicId: "top_oop_33",
  secondaryTopicIds: ["top_oop_05", "top_oop_22", "top_oop_32"],
  slug: "primitive-obsession-loan-application",
  title: {
    en: "Illegal States Representable: Domain Modeling for LoanApplication",
    ru: "Представимые Нелегальные Состояния: Domain Modeling для LoanApplication"
  },
  description: {
    en: "Refactor LoanApplication's String applicantId, String status, boolean approved, double amount, and Map extras — primitives that allow approved=true with REJECTED and negative amounts — into ApplicantId, LoanMoney (long cents), LoanStatus, CreditDecision, and ApprovalPolicy that enforce lending invariants.",
    ru: "Отрефакторьте String applicantId, String status, boolean approved, double amount и Map extras в LoanApplication — примитивы, допускающие approved=true при REJECTED и отрицательные суммы — в ApplicantId, LoanMoney (long cents), LoanStatus, CreditDecision и ApprovalPolicy, которые защищают lending-инварианты."
  },
  scenarioIntroduction: {
    en: "Monday audit: risk ops exported LoanApplication rows where status='REJECTED' yet approved=true, and several amounts were negative doubles after a Friday underwriting hotfix that set flags via public fields. Downstream CreditScoreService treated approved as truth and booked phantom capacity. Compliance asks why the type system allowed illegal lending combinations. The root cause is not a missing if-check in one service — it is Primitive Obsession: free-form String/boolean/double bags that make illegal states representable.",
    ru: "Понедельник, аудит: risk ops выгрузил строки LoanApplication, где status='REJECTED', но approved=true, а часть amount — отрицательные double после пятничного хотфикса андеррайтинга, выставлявшего флаги через public fields. Downstream CreditScoreService принял approved за истину и зарезервировал фантомную ёмкость. Compliance спрашивает, почему система типов допустила нелегальные lending-комбинации. Корневая причина не в одном пропущенном if в сервисе — в Primitive Obsession: свободные мешки String/boolean/double, делающие нелегальные состояния представимыми."
  },
  engineeringProblem: {
    en: "LoanApplication exposes String applicantId, String status, boolean approved, double amount, and Map<String,Object> extras. Callers can set status=REJECTED and approved=true, amount=-5000.0, or typo statuses like 'aproved'. Validation is scattered (or absent). Solution (focused, not a full DDD course): ApplicantId and LoanMoney (long cents) value objects; LoanStatus enum/sealed; CreditDecision capturing approve/reject outcomes; ApprovalPolicy + LoanApplication behavior methods (submit, decide) that enforce transition invariants at the aggregate boundary lite.",
    ru: "LoanApplication открывает String applicantId, String status, boolean approved, double amount и Map<String,Object> extras. Вызывающие могут выставить status=REJECTED и approved=true, amount=-5000.0 или опечатки вроде 'aproved'. Валидация размазана (или отсутствует). Решение (сфокусированное, не полный курс DDD): value objects ApplicantId и LoanMoney (long cents); enum/sealed LoanStatus; CreditDecision для исходов approve/reject; ApprovalPolicy + методы поведения LoanApplication (submit, decide), защищающие инварианты переходов на lite-границе агрегата."
  },
  learningObjectives: [
    {
      en: "Recognize Primitive Obsession when String/boolean/double bags make illegal domain combinations representable",
      ru: "Распознавать Primitive Obsession, когда мешки String/boolean/double делают нелегальные доменные комбинации представимыми"
    },
    {
      en: "Introduce ApplicantId and LoanMoney value objects that self-validate at construction",
      ru: "Вводить value objects ApplicantId и LoanMoney, самовалидирующиеся при создании"
    },
    {
      en: "Model LoanStatus and CreditDecision so REJECTED+approved cannot coexist as independent flags",
      ru: "Моделировать LoanStatus и CreditDecision так, чтобы REJECTED+approved не сосуществовали как независимые флаги"
    },
    {
      en: "Enforce lending transitions via ApprovalPolicy and entity methods instead of public field writes",
      ru: "Защищать lending-переходы через ApprovalPolicy и методы сущности вместо записи в public fields"
    }
  ],
  requiredConceptIds: ["cpt_domain_modeling", "cpt_value_objects"],
  recommendedConceptIds: ["cpt_invariants", "cpt_anemic_domain_model", "cpt_encapsulation"],
  stageIds: DOMAIN_MODELING_MISSION_STAGES.map((s) => s.id),
  challengeIds: ["chl_dm_fix_builder", "chl_dm_bughunt", "chl_dm_interview_answer"],
  estimatedMinutes: 30,
  difficulty: "SENIOR",
  xpReward: 250,
  version: "1.0.0"
};
