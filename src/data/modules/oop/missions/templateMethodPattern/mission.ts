import { Mission, MissionStage, TheoryStage, PracticeStage, InterviewStage, BaseMissionStage } from '../../../../../types/domain';

const stage1: BaseMissionStage = {
  id: "stg_tm_intro", missionId: "mis_template_method_pattern", type: "MISSION_INTRODUCTION", order: 1,
  title: { en: "1. Mission Introduction", ru: "1. Введение в Миссию" },
  instructions: { en: "EOD batch cleared Domestic and CrossBorder SettlementBatch items. Compliance found CrossBorderSettlementProcessor overrode processBatch() and skipped ComplianceCheck for speed. Dis...", ru: "EOD-батч провёл Domestic и CrossBorder SettlementBatch. Compliance нашёл, что CrossBorderSettlementProcessor переопределил processBatch() и пропустил ComplianceCheck ради скорости...." }
};
const stage2: BaseMissionStage = {
  id: "stg_tm_problem", missionId: "mis_template_method_pattern", type: "REAL_ENGINEERING_PROBLEM", order: 2,
  title: { en: "2. Real Engineering Problem", ru: "2. Реальная Инженерная Проблема" },
  instructions: { en: "EndOfDaySettlementProcessor.processBatch(SettlementBatch) must run load → ComplianceCheck → settleRail → SettlementAudit. Subclasses vary settleRail only. Broken: overridable processBatch skips checks", ru: "EndOfDaySettlementProcessor.processBatch(SettlementBatch) должен выполнять load → ComplianceCheck → settleRail → SettlementAudit. Подклассы варьируют только settleRail. Сломано: переопределяемый proce" }
};
const stage3: BaseMissionStage = {
  id: "stg_tm_think", missionId: "mis_template_method_pattern", type: "THINK_YOURSELF", order: 3,
  title: { en: "3. Think Yourself Diagnostic", ru: "3. Диагностика: Подумайте Сам" },
  instructions: { en: "Formulate your hypothesis about the root cause and the OOP mechanism that fixes it.", ru: "Сформулируйте гипотезу о корневой причине и механизме ООП, который это исправляет." }
};
const stage4: BaseMissionStage = {
  id: "stg_tm_help", missionId: "mis_template_method_pattern", type: "NEED_HELP", order: 4,
  title: { en: "4. Need Knowledge Bridge", ru: "4. Мост к Знаниям" },
  instructions: { en: "No-penalty bridge into the theory for this mission's core concepts.", ru: "Бесштрафной переход к теории ключевых концепций этой миссии." }
};
const stage5: TheoryStage = {
  id: "stg_tm_theory", missionId: "mis_template_method_pattern", type: "THEORY", order: 5,
  title: { en: "5. Core Theory & Checkpoints", ru: "5. Фундаментальная Теория и Проверки" },
  instructions: { en: "Study the 4 theory sections and complete the checkpoints.", ru: "Изучите 4 раздела теории и пройдите проверки." },
  theoryArticleId: "art_theory_template_method_pattern"
};
const stage6: BaseMissionStage = {
  id: "stg_tm_visual", missionId: "mis_template_method_pattern", type: "VISUALIZATION", order: 6,
  title: { en: "6. Interactive Visualization", ru: "6. Интерактивная Визуализация" },
  instructions: { en: "Compare the broken structure with the corrected object collaboration / pattern structure.", ru: "Сравните сломанную структуру с исправленным сотрудничеством объектов / структурой паттерна." }
};
const stage7: PracticeStage = {
  id: "stg_tm_practice", missionId: "mis_template_method_pattern", type: "INTERACTIVE_PRACTICE", order: 7,
  title: { en: "7. Guided Practice: Fix Builder", ru: "7. Практика: Конструктор Исправления" },
  instructions: { en: "Assemble the structural building blocks of the production-safe fix.", ru: "Соберите структурные элементы продакшн-безопасного исправления." },
  challengeId: "chl_tm_fix_builder"
};
const stage8: InterviewStage = {
  id: "stg_tm_interview_q", missionId: "mis_template_method_pattern", type: "INTERVIEW_QUESTION", order: 8,
  title: { en: "8. Senior Interview Scenario", ru: "8. Сценарий Senior-Интервью" },
  instructions: { en: "Review the senior interview question for this scenario.", ru: "Ознакомьтесь с вопросом Senior-собеседования для этого сценария." },
  interviewQuestionId: "q_tm_eod_01", challengeId: "chl_tm_interview_answer"
};
const stage9: InterviewStage = {
  id: "stg_tm_interview_a", missionId: "mis_template_method_pattern", type: "INTERVIEW_ANSWER", order: 9,
  title: { en: "9. Interview Verbal Answer", ru: "9. Устный Ответ и Модель" },
  instructions: { en: "Formulate your structured verbal response and submit for evaluation.", ru: "Сформулируйте структурированный устный ответ и отправьте на проверку." },
  interviewQuestionId: "q_tm_eod_01", challengeId: "chl_tm_interview_answer"
};
const stage10: PracticeStage = {
  id: "stg_tm_debug", missionId: "mis_template_method_pattern", type: "DEBUG_COUNTER_EXAMPLE", order: 10,
  title: { en: "10. Applied Bug Hunt", ru: "10. Поиск Бага" },
  instructions: { en: "Identify the defective line(s) in the counter-example.", ru: "Найдите дефектную строку(и) в контрпримере." },
  challengeId: "chl_tm_bughunt"
};
const stage11: BaseMissionStage = {
  id: "stg_tm_related", missionId: "mis_template_method_pattern", type: "RELATED_TOPICS", order: 11,
  title: { en: "11. Related Knowledge Nodes", ru: "11. Связанные Узлы Знаний" },
  instructions: { en: "Explore related topics without collapsing this mission into a different one.", ru: "Исследуйте связанные темы, не смешивая эту миссию с другой." }
};
const stage12: BaseMissionStage = {
  id: "stg_tm_results", missionId: "mis_template_method_pattern", type: "MISSION_RESULTS", order: 12,
  title: { en: "12. Mission Performance Summary", ru: "12. Итоги Прохождения Миссии" },
  instructions: { en: "Review your performance metrics, concepts strengthened, and XP awarded.", ru: "Просмотрите метрики прохождения, укрепившиеся концепции и заработанный XP." }
};
const stage13: BaseMissionStage = {
  id: "stg_tm_reflection", missionId: "mis_template_method_pattern", type: "REFLECTION", order: 13,
  title: { en: "13. Engineering Reflection", ru: "13. Инженерная Рефлексия" },
  instructions: { en: "Write a 1-sentence reflection on when you will reject a PR that reintroduces this failure mode.", ru: "Напишите 1 предложение о том, когда отклоните PR, возвращающий этот режим отказа." }
};

export const TEMPLATE_METHOD_PATTERN_MISSION_STAGES: readonly MissionStage[] = [
  stage1, stage2, stage3, stage4, stage5, stage6, stage7, stage8, stage9, stage10, stage11, stage12, stage13
];

export const TEMPLATE_METHOD_PATTERN_MISSION: Mission = {
  id: "mis_template_method_pattern",
  primaryTopicId: "top_oop_29",
  secondaryTopicIds: ["top_oop_08","top_oop_26"],
  slug: "bypassed-eod-settlement-template",
  title: {"en":"The Bypassed Settlement Check: Template Method in End-of-Day Processing","ru":"Обойденная Settlement-Проверка: Template Method в End-of-Day Обработке"},
  description: {"en":"Lock EndOfDaySettlementProcessor so DomesticSettlementProcessor and CrossBorderSettlementProcessor cannot bypass ComplianceCheck and SettlementAudit — final template skeleton with hooks.","ru":"Зафиксируйте EndOfDaySettlementProcessor так, чтобы DomesticSettlementProcessor и CrossBorderSettlementProcessor не обходили ComplianceCheck и SettlementAudit — final skeleton с хуками."},
  scenarioIntroduction: {"en":"EOD batch cleared Domestic and CrossBorder SettlementBatch items. Compliance found CrossBorderSettlementProcessor overrode processBatch() and skipped ComplianceCheck for speed. Distinct from mis_abstract_classes (CARD/WIRE AbstractSettlementProcessor): this mission is GoF Template Method for EOD Domestic vs CrossBorder with SettlementAudit.","ru":"EOD-батч провёл Domestic и CrossBorder SettlementBatch. Compliance нашёл, что CrossBorderSettlementProcessor переопределил processBatch() и пропустил ComplianceCheck ради скорости. Отличие от mis_abstract_classes (CARD/WIRE): здесь GoF Template Method для EOD Domestic vs CrossBorder с SettlementAudit."},
  engineeringProblem: {"en":"EndOfDaySettlementProcessor.processBatch(SettlementBatch) must run load → ComplianceCheck → settleRail → SettlementAudit. Subclasses vary settleRail only. Broken: overridable processBatch skips checks. Fix: final processBatch template; abstract/protected settleRail hook; private compliance/audit. Hooks ≠ Strategy (strategy is injected collaborator; hook is subclass step).","ru":"EndOfDaySettlementProcessor.processBatch(SettlementBatch) должен выполнять load → ComplianceCheck → settleRail → SettlementAudit. Подклассы варьируют только settleRail. Сломано: переопределяемый processBatch пропускает проверки. Фикс: final processBatch; abstract/protected хук settleRail; private compliance/audit. Hooks ≠ Strategy."},
  learningObjectives: [{"en":"Seal EOD settlement algorithm with a final template method","ru":"Закрепить алгоритм EOD settlement final template method"},{"en":"Vary Domestic vs CrossBorder only via settleRail hooks","ru":"Варьировать Domestic vs CrossBorder только через хуки settleRail"},{"en":"Distinguish Template Method hooks from Strategy collaborators","ru":"Отличать хуки Template Method от сотрудников Strategy"},{"en":"Keep this distinct from AbstractSettlementProcessor CARD/WIRE mission","ru":"Отличать от миссии AbstractSettlementProcessor CARD/WIRE"}],
  requiredConceptIds: ["cpt_template_method","cpt_final_template_skeleton"],
  recommendedConceptIds: ["cpt_hook_vs_strategy","cpt_abstract_class"],
  stageIds: TEMPLATE_METHOD_PATTERN_MISSION_STAGES.map((s) => s.id),
  challengeIds: ["chl_tm_fix_builder", "chl_tm_bughunt", "chl_tm_interview_answer"],
  estimatedMinutes: 30,
  difficulty: "SENIOR",
  xpReward: 300,
  version: "1.0.0"
};
