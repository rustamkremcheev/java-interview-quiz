import { Mission, MissionStage, TheoryStage, PracticeStage, InterviewStage, BaseMissionStage } from '../../../../../types/domain';

const stage1: BaseMissionStage = {
  id: "stg_leg_intro", missionId: "mis_oop_refactoring_legacy", type: "MISSION_INTRODUCTION", order: 1,
  title: { en: "1. Mission Introduction", ru: "1. Введение в Миссию" },
  instructions: { en: "LegacyCreditDecisionEngine decides CreditFacilityApplication outcomes with hardcoded JDBC and static audit calls — untestable in CI. Product needs CreditPolicy changes weekly. Feat...", ru: "LegacyCreditDecisionEngine решает исходы CreditFacilityApplication с hardcoded JDBC и static audit — нетестируемо в CI. Продукту нужны еженедельные изменения CreditPolicy. Seams и ..." }
};
const stage2: BaseMissionStage = {
  id: "stg_leg_problem", missionId: "mis_oop_refactoring_legacy", type: "REAL_ENGINEERING_PROBLEM", order: 2,
  title: { en: "2. Real Engineering Problem", ru: "2. Реальная Инженерная Проблема" },
  instructions: { en: "Extract ApplicantLookupPort and DecisionAuditPort; wrap LegacyCreditDecisionEngine behind tests that lock current behavior (characterization); refactor CreditPolicy decision path toward CreditFacility", ru: "Извлеките ApplicantLookupPort и DecisionAuditPort; оберните LegacyCreditDecisionEngine тестами, фиксирующими текущее поведение (characterization); инкрементально рефакторьте путь CreditPolicy к Credit" }
};
const stage3: BaseMissionStage = {
  id: "stg_leg_think", missionId: "mis_oop_refactoring_legacy", type: "THINK_YOURSELF", order: 3,
  title: { en: "3. Think Yourself Diagnostic", ru: "3. Диагностика: Подумайте Сам" },
  instructions: { en: "Formulate your hypothesis about the root cause and the OOP mechanism that fixes it.", ru: "Сформулируйте гипотезу о корневой причине и механизме ООП, который это исправляет." }
};
const stage4: BaseMissionStage = {
  id: "stg_leg_help", missionId: "mis_oop_refactoring_legacy", type: "NEED_HELP", order: 4,
  title: { en: "4. Need Knowledge Bridge", ru: "4. Мост к Знаниям" },
  instructions: { en: "No-penalty bridge into the theory for this mission's core concepts.", ru: "Бесштрафной переход к теории ключевых концепций этой миссии." }
};
const stage5: TheoryStage = {
  id: "stg_leg_theory", missionId: "mis_oop_refactoring_legacy", type: "THEORY", order: 5,
  title: { en: "5. Core Theory & Checkpoints", ru: "5. Фундаментальная Теория и Проверки" },
  instructions: { en: "Study the 4 theory sections and complete the checkpoints.", ru: "Изучите 4 раздела теории и пройдите проверки." },
  theoryArticleId: "art_theory_oop_refactoring_legacy"
};
const stage6: BaseMissionStage = {
  id: "stg_leg_visual", missionId: "mis_oop_refactoring_legacy", type: "VISUALIZATION", order: 6,
  title: { en: "6. Interactive Visualization", ru: "6. Интерактивная Визуализация" },
  instructions: { en: "Compare the broken structure with the corrected object collaboration / pattern structure.", ru: "Сравните сломанную структуру с исправленным сотрудничеством объектов / структурой паттерна." }
};
const stage7: PracticeStage = {
  id: "stg_leg_practice", missionId: "mis_oop_refactoring_legacy", type: "INTERACTIVE_PRACTICE", order: 7,
  title: { en: "7. Guided Practice: Fix Builder", ru: "7. Практика: Конструктор Исправления" },
  instructions: { en: "Assemble the structural building blocks of the production-safe fix.", ru: "Соберите структурные элементы продакшн-безопасного исправления." },
  challengeId: "chl_leg_fix_builder"
};
const stage8: InterviewStage = {
  id: "stg_leg_interview_q", missionId: "mis_oop_refactoring_legacy", type: "INTERVIEW_QUESTION", order: 8,
  title: { en: "8. Senior Interview Scenario", ru: "8. Сценарий Senior-Интервью" },
  instructions: { en: "Review the senior interview question for this scenario.", ru: "Ознакомьтесь с вопросом Senior-собеседования для этого сценария." },
  interviewQuestionId: "q_leg_seam_01", challengeId: "chl_leg_interview_answer"
};
const stage9: InterviewStage = {
  id: "stg_leg_interview_a", missionId: "mis_oop_refactoring_legacy", type: "INTERVIEW_ANSWER", order: 9,
  title: { en: "9. Interview Verbal Answer", ru: "9. Устный Ответ и Модель" },
  instructions: { en: "Formulate your structured verbal response and submit for evaluation.", ru: "Сформулируйте структурированный устный ответ и отправьте на проверку." },
  interviewQuestionId: "q_leg_seam_01", challengeId: "chl_leg_interview_answer"
};
const stage10: PracticeStage = {
  id: "stg_leg_debug", missionId: "mis_oop_refactoring_legacy", type: "DEBUG_COUNTER_EXAMPLE", order: 10,
  title: { en: "10. Applied Bug Hunt", ru: "10. Поиск Бага" },
  instructions: { en: "Identify the defective line(s) in the counter-example.", ru: "Найдите дефектную строку(и) в контрпримере." },
  challengeId: "chl_leg_bughunt"
};
const stage11: BaseMissionStage = {
  id: "stg_leg_related", missionId: "mis_oop_refactoring_legacy", type: "RELATED_TOPICS", order: 11,
  title: { en: "11. Related Knowledge Nodes", ru: "11. Связанные Узлы Знаний" },
  instructions: { en: "Explore related topics without collapsing this mission into a different one.", ru: "Исследуйте связанные темы, не смешивая эту миссию с другой." }
};
const stage12: BaseMissionStage = {
  id: "stg_leg_results", missionId: "mis_oop_refactoring_legacy", type: "MISSION_RESULTS", order: 12,
  title: { en: "12. Mission Performance Summary", ru: "12. Итоги Прохождения Миссии" },
  instructions: { en: "Review your performance metrics, concepts strengthened, and XP awarded.", ru: "Просмотрите метрики прохождения, укрепившиеся концепции и заработанный XP." }
};
const stage13: BaseMissionStage = {
  id: "stg_leg_reflection", missionId: "mis_oop_refactoring_legacy", type: "REFLECTION", order: 13,
  title: { en: "13. Engineering Reflection", ru: "13. Инженерная Рефлексия" },
  instructions: { en: "Write a 1-sentence reflection on when you will reject a PR that reintroduces this failure mode.", ru: "Напишите 1 предложение о том, когда отклоните PR, возвращающий этот режим отказа." }
};

export const OOP_REFACTORING_LEGACY_MISSION_STAGES: readonly MissionStage[] = [
  stage1, stage2, stage3, stage4, stage5, stage6, stage7, stage8, stage9, stage10, stage11, stage12, stage13
];

export const OOP_REFACTORING_LEGACY_MISSION: Mission = {
  id: "mis_oop_refactoring_legacy",
  primaryTopicId: "top_oop_35",
  secondaryTopicIds: ["top_oop_32","top_oop_24"],
  slug: "untestable-credit-decision-seams",
  title: {"en":"The Untestable Loan Decision Engine: Incremental Refactoring Under Production Constraints","ru":"Нетестируемый Loan Decision Engine: Инкрементальный Рефакторинг под Прод-Ограничениями"},
  description: {"en":"Introduce characterization tests and seams (ApplicantLookupPort, DecisionAuditPort) so LegacyCreditDecisionEngine can be incrementally refactored around CreditFacilityApplication and CreditPolicy without a big-bang rewrite.","ru":"Введите characterization-тесты и seams (ApplicantLookupPort, DecisionAuditPort), чтобы инкрементально рефакторить LegacyCreditDecisionEngine вокруг CreditFacilityApplication и CreditPolicy без big-bang rewrite."},
  scenarioIntroduction: {"en":"LegacyCreditDecisionEngine decides CreditFacilityApplication outcomes with hardcoded JDBC and static audit calls — untestable in CI. Product needs CreditPolicy changes weekly. Feathers-style seams and characterization tests enable incremental refactoring. Distinct from anti-patterns catalog mission: focus is WELC seams under production constraints. Domain uses CreditFacilityApplication — not SharedLendingDto.","ru":"LegacyCreditDecisionEngine решает исходы CreditFacilityApplication с hardcoded JDBC и static audit — нетестируемо в CI. Продукту нужны еженедельные изменения CreditPolicy. Seams и characterization-тесты по Feathers включают инкрементальный рефакторинг. Отличие от антипаттернов: фокус на seams WELC. Домен: CreditFacilityApplication — не SharedLendingDto."},
  engineeringProblem: {"en":"Extract ApplicantLookupPort and DecisionAuditPort; wrap LegacyCreditDecisionEngine behind tests that lock current behavior (characterization); refactor CreditPolicy decision path toward CreditFacilityDecision incrementally. Do not big-bang rewrite.","ru":"Извлеките ApplicantLookupPort и DecisionAuditPort; оберните LegacyCreditDecisionEngine тестами, фиксирующими текущее поведение (characterization); инкрементально рефакторьте путь CreditPolicy к CreditFacilityDecision. Без big-bang rewrite."},
  learningObjectives: [{"en":"Write characterization tests before behavior changes","ru":"Писать characterization-тесты до изменения поведения"},{"en":"Extract seams (ports) for lookup and audit","ru":"Извлекать seams (порты) для lookup и audit"},{"en":"Refactor LegacyCreditDecisionEngine incrementally","ru":"Инкрементально рефакторить LegacyCreditDecisionEngine"},{"en":"Keep CreditFacilityApplication naming (not SharedLendingDto)","ru":"Сохранять имя CreditFacilityApplication (не SharedLendingDto)"}],
  requiredConceptIds: ["cpt_characterization_test","cpt_seam_extraction"],
  recommendedConceptIds: ["cpt_incremental_refactoring","cpt_dependency_inversion"],
  stageIds: OOP_REFACTORING_LEGACY_MISSION_STAGES.map((s) => s.id),
  challengeIds: ["chl_leg_fix_builder", "chl_leg_bughunt", "chl_leg_interview_answer"],
  estimatedMinutes: 40,
  difficulty: "STAFF",
  xpReward: 350,
  version: "1.0.0"
};
