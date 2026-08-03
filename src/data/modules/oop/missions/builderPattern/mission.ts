import { Mission, MissionStage, TheoryStage, PracticeStage, InterviewStage, BaseMissionStage } from '../../../../../types/domain';

const stage1: BaseMissionStage = {
  id: "stg_bld_intro",
  missionId: "mis_builder_pattern",
  type: "MISSION_INTRODUCTION",
  order: 1,
  title: { en: "1. Mission Introduction", ru: "1. Введение в Миссию" },
  instructions: {
    en: "Inspect the incident where RiskAssessmentRequest was built via telescoping constructors without build-time validation — incomplete EvaluationWindows reached RiskAssessmentService.",
    ru: "Изучите инцидент, где RiskAssessmentRequest собирали телескопическими конструкторами без build-time валидации — неполные EvaluationWindow доходили до RiskAssessmentService."
  }
};

const stage2: BaseMissionStage = {
  id: "stg_bld_problem",
  missionId: "mis_builder_pattern",
  type: "REAL_ENGINEERING_PROBLEM",
  order: 2,
  title: { en: "2. Real Engineering Problem", ru: "2. Реальная Инженерная Проблема" },
  instructions: {
    en: "Examine telescoping RiskAssessmentRequest overloads and callers that omit RiskProfile or EvaluationWindow before invoking RiskAssessmentService.",
    ru: "Изучите телескопические overload RiskAssessmentRequest и вызывающих, пропускающих RiskProfile или EvaluationWindow перед RiskAssessmentService."
  }
};

const stage3: BaseMissionStage = {
  id: "stg_bld_think",
  missionId: "mis_builder_pattern",
  type: "THINK_YOURSELF",
  order: 3,
  title: { en: "3. Think Yourself Diagnostic", ru: "3. Диагностика: Подумайте Сам" },
  instructions: {
    en: "Formulate your hypothesis: Why can an incomplete RiskAssessmentRequest reach evaluation, and what must Builder.build() enforce?",
    ru: "Сформулируйте гипотезу: почему неполный RiskAssessmentRequest доходит до оценки, и что обязан обеспечить Builder.build()?"
  }
};

const stage4: BaseMissionStage = {
  id: "stg_bld_help",
  missionId: "mis_builder_pattern",
  type: "NEED_HELP",
  order: 4,
  title: { en: "4. Need Knowledge Bridge", ru: "4. Мост к Знаниям" },
  instructions: {
    en: "No-penalty bridge to Builder pattern, telescoping constructors, and build-time validation — distinct from SettlementInstruction flag-swapping.",
    ru: "Бесштрафной переход к Builder, телескопическим конструкторам и build-time валидации — отлично от swapped flags SettlementInstruction."
  }
};

const stage5: TheoryStage = {
  id: "stg_bld_theory",
  missionId: "mis_builder_pattern",
  type: "THEORY",
  order: 5,
  title: { en: "5. Core Theory & Checkpoints", ru: "5. Фундаментальная Теория и Проверки" },
  instructions: {
    en: "Study the 4 theory sections on Builder, telescoping constructors, build-time validation for RiskAssessmentRequest, and senior follow-ups.",
    ru: "Изучите 4 раздела теории о Builder, телескопических конструкторах, build-time валидации RiskAssessmentRequest и доп. вопросах Senior."
  },
  theoryArticleId: "art_theory_builder_pattern"
};

const stage6: BaseMissionStage = {
  id: "stg_bld_visual",
  missionId: "mis_builder_pattern",
  type: "VISUALIZATION",
  order: 6,
  title: { en: "6. Interactive Builder Validation Visualization", ru: "6. Визуализация Валидации Builder" },
  instructions: {
    en: "Compare telescoping construction with fluent RiskAssessmentRequest.Builder that fails fast when PortfolioId, RiskProfile, or EvaluationWindow is missing.",
    ru: "Сравните телескопическую сборку с fluent RiskAssessmentRequest.Builder, который fail-fast при отсутствии PortfolioId, RiskProfile или EvaluationWindow."
  }
};

const stage7: PracticeStage = {
  id: "stg_bld_practice",
  missionId: "mis_builder_pattern",
  type: "INTERACTIVE_PRACTICE",
  order: 7,
  title: { en: "7. Guided Practice: Fix Builder", ru: "7. Практика: Конструктор Исправления" },
  instructions: {
    en: "Assemble the structural fixes for RiskAssessmentRequest.Builder with mandatory checks in build().",
    ru: "Соберите структурные исправления для RiskAssessmentRequest.Builder с обязательными проверками в build()."
  },
  challengeId: "chl_bld_fix_builder"
};

const stage8: InterviewStage = {
  id: "stg_bld_interview_q",
  missionId: "mis_builder_pattern",
  type: "INTERVIEW_QUESTION",
  order: 8,
  title: { en: "8. Senior Interview Scenario", ru: "8. Сценарий Senior-Интервью" },
  instructions: {
    en: "Review the senior interview question about misconfigured risk requests and Builder validation.",
    ru: "Ознакомьтесь с вопросом Senior-собеседования о misconfigured risk requests и валидации Builder."
  },
  interviewQuestionId: "q_bld_risk_01",
  challengeId: "chl_bld_interview_answer"
};

const stage9: InterviewStage = {
  id: "stg_bld_interview_a",
  missionId: "mis_builder_pattern",
  type: "INTERVIEW_ANSWER",
  order: 9,
  title: { en: "9. Interview Verbal Answer", ru: "9. Устный Ответ и Модель" },
  instructions: {
    en: "Formulate your structured verbal response (Elevator Pitch + Builder Mechanics + Production Trade-offs) and submit for evaluation.",
    ru: "Сформулируйте структурированный ответ (Elevator Pitch + Механика Builder + Продакшн-компромиссы) и отправьте на проверку."
  },
  interviewQuestionId: "q_bld_risk_01",
  challengeId: "chl_bld_interview_answer"
};

const stage10: PracticeStage = {
  id: "stg_bld_debug",
  missionId: "mis_builder_pattern",
  type: "DEBUG_COUNTER_EXAMPLE",
  order: 10,
  title: { en: "10. Applied Bug Hunt: Incomplete Risk Builder", ru: "10. Поиск Бага: Неполный Risk Builder" },
  instructions: {
    en: "Identify the line(s) where RiskAssessmentRequest is built or constructed without validating mandatory EvaluationWindow / RiskProfile.",
    ru: "Найдите строку(и), где RiskAssessmentRequest собирается без валидации обязательных EvaluationWindow / RiskProfile."
  },
  challengeId: "chl_bld_bughunt"
};

const stage11: BaseMissionStage = {
  id: "stg_bld_related",
  missionId: "mis_builder_pattern",
  type: "RELATED_TOPICS",
  order: 11,
  title: { en: "11. Related Knowledge Nodes", ru: "11. Связанные Узлы Знаний" },
  instructions: {
    en: "Explore immutability and factories — distinct from mis_object_creation_builder (SettlementInstruction boolean flags).",
    ru: "Исследуйте immutability и factories — отлично от mis_object_creation_builder (boolean-флаги SettlementInstruction)."
  }
};

const stage12: BaseMissionStage = {
  id: "stg_bld_results",
  missionId: "mis_builder_pattern",
  type: "MISSION_RESULTS",
  order: 12,
  title: { en: "12. Mission Performance Summary", ru: "12. Итоги Прохождения Миссии" },
  instructions: {
    en: "Review your performance metrics, concepts strengthened, and XP awarded.",
    ru: "Просмотрите метрики прохождения, укрепившиеся концепции и заработанный XP."
  }
};

const stage13: BaseMissionStage = {
  id: "stg_bld_reflection",
  missionId: "mis_builder_pattern",
  type: "REFLECTION",
  order: 13,
  title: { en: "13. Engineering Reflection", ru: "13. Инженерная Рефлексия" },
  instructions: {
    en: "Write a 1-sentence reflection on when you will reject a PR that constructs RiskAssessmentRequest without build-time mandatory checks.",
    ru: "Напишите 1 предложение о том, когда на код-ревью вы отклоните PR, собирающий RiskAssessmentRequest без обязательных проверок на этапе build."
  }
};

export const BUILDER_PATTERN_MISSION_STAGES: readonly MissionStage[] = [
  stage1, stage2, stage3, stage4, stage5, stage6, stage7, stage8, stage9, stage10, stage11, stage12, stage13
];

export const BUILDER_PATTERN_MISSION: Mission = {
  id: "mis_builder_pattern",
  primaryTopicId: "top_oop_28",
  secondaryTopicIds: ["top_oop_25", "top_oop_22"],
  slug: "misconfigured-risk-assessment-builder",
  title: {
    en: "The Misconfigured Risk Request: Builder Validation in RiskAssessmentRequest",
    ru: "Misconfigured Risk Request: Валидация Builder в RiskAssessmentRequest"
  },
  description: {
    en: "Replace telescoping RiskAssessmentRequest construction with a Builder that validates PortfolioId, RiskProfile, and EvaluationWindow at build time before RiskAssessmentService runs.",
    ru: "Замените телескопическую сборку RiskAssessmentRequest на Builder, валидирующий PortfolioId, RiskProfile и EvaluationWindow на этапе build до запуска RiskAssessmentService."
  },
  scenarioIntroduction: {
    en: "Overnight risk batch evaluated thousands of portfolios. Several assessments used empty windows because callers picked the wrong telescoping overload and left EvaluationWindow unset. RiskAssessmentService assumed every request was complete. Distinct from SettlementInstruction flag-swapping: here the defect is missing mandatory risk configuration at build time.",
    ru: "Ночной risk-батч оценил тысячи портфелей. Часть assessments шла с пустыми окнами: вызывающие выбрали неверный телескопический overload и не задали EvaluationWindow. RiskAssessmentService предполагал полноту запроса. Отличие от swapped flags SettlementInstruction: здесь дефект — пропуск обязательной risk-конфигурации на этапе build."
  },
  engineeringProblem: {
    en: "Telescoping constructors for RiskAssessmentRequest invite omitted mandatory fields. Solution: RiskAssessmentRequest.Builder with fluent setters; build() validates PortfolioId, RiskProfile, EvaluationWindow (including window ordering); returns an immutable request for RiskAssessmentService.",
    ru: "Телескопические конструкторы RiskAssessmentRequest провоцируют пропуск обязательных полей. Решение: RiskAssessmentRequest.Builder с fluent setters; build() валидирует PortfolioId, RiskProfile, EvaluationWindow (включая порядок окна); возвращает immutable request для RiskAssessmentService."
  },
  learningObjectives: [
    { en: "Recognize telescoping constructors as a misconfiguration hazard for risk requests", ru: "Распознавать телескопические конструкторы как риск misconfiguration для risk requests" },
    { en: "Implement Builder with build-time validation of mandatory risk fields", ru: "Реализовать Builder с build-time валидацией обязательных risk-полей" },
    { en: "Explain Effective Java Item 2 applied to RiskAssessmentRequest", ru: "Объяснить Effective Java Item 2 применительно к RiskAssessmentRequest" },
    { en: "Distinguish this mission from SettlementInstruction flag-swapping builder scenarios", ru: "Отличить эту миссию от сценариев SettlementInstruction со swapped flags" }
  ],
  requiredConceptIds: ["cpt_builder_pattern", "cpt_build_time_validation"],
  recommendedConceptIds: ["cpt_telescoping_constructor", "cpt_immutability"],
  stageIds: BUILDER_PATTERN_MISSION_STAGES.map((s) => s.id),
  challengeIds: ["chl_bld_fix_builder", "chl_bld_bughunt", "chl_bld_interview_answer"],
  estimatedMinutes: 30,
  difficulty: "SENIOR",
  xpReward: 300,
  version: "1.0.0"
};
