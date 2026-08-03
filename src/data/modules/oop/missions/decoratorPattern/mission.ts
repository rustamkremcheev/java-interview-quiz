import { Mission, MissionStage, TheoryStage, PracticeStage, InterviewStage, BaseMissionStage } from '../../../../../types/domain';

const stage1: BaseMissionStage = {
  id: "stg_dec_intro", missionId: "mis_decorator_pattern", type: "MISSION_INTRODUCTION", order: 1,
  title: { en: "1. Mission Introduction", ru: "1. Введение в Миссию" },
  instructions: { en: "Funds transfers gained Retrying and Authorized wrappers. Ops discovered transfers succeeded without audit rows — AuditedFundsTransferGateway was left out of the composition, or pla...", ru: "У funds transfers появились обёртки Retrying и Authorized. Ops обнаружил успешные переводы без audit rows — AuditedFundsTransferGateway выпал из композиции или стоял внутри retry т..." }
};
const stage2: BaseMissionStage = {
  id: "stg_dec_problem", missionId: "mis_decorator_pattern", type: "REAL_ENGINEERING_PROBLEM", order: 2,
  title: { en: "2. Real Engineering Problem", ru: "2. Реальная Инженерная Проблема" },
  instructions: { en: "FundsTransferGateway.transfer(TransferRequest)→TransferResult. CoreFundsTransferGateway is the core. Decorators: Audited, Retrying, Authorized — each implements FundsTransferGateway and delegates. Ord", ru: "FundsTransferGateway.transfer(TransferRequest)→TransferResult. CoreFundsTransferGateway — ядро. Декораторы: Audited, Retrying, Authorized — каждый реализует FundsTransferGateway и делегирует. Порядок " }
};
const stage3: BaseMissionStage = {
  id: "stg_dec_think", missionId: "mis_decorator_pattern", type: "THINK_YOURSELF", order: 3,
  title: { en: "3. Think Yourself Diagnostic", ru: "3. Диагностика: Подумайте Сам" },
  instructions: { en: "Formulate your hypothesis about the root cause and the OOP mechanism that fixes it.", ru: "Сформулируйте гипотезу о корневой причине и механизме ООП, который это исправляет." }
};
const stage4: BaseMissionStage = {
  id: "stg_dec_help", missionId: "mis_decorator_pattern", type: "NEED_HELP", order: 4,
  title: { en: "4. Need Knowledge Bridge", ru: "4. Мост к Знаниям" },
  instructions: { en: "No-penalty bridge into the theory for this mission's core concepts.", ru: "Бесштрафной переход к теории ключевых концепций этой миссии." }
};
const stage5: TheoryStage = {
  id: "stg_dec_theory", missionId: "mis_decorator_pattern", type: "THEORY", order: 5,
  title: { en: "5. Core Theory & Checkpoints", ru: "5. Фундаментальная Теория и Проверки" },
  instructions: { en: "Study the 4 theory sections and complete the checkpoints.", ru: "Изучите 4 раздела теории и пройдите проверки." },
  theoryArticleId: "art_theory_decorator_pattern"
};
const stage6: BaseMissionStage = {
  id: "stg_dec_visual", missionId: "mis_decorator_pattern", type: "VISUALIZATION", order: 6,
  title: { en: "6. Interactive Visualization", ru: "6. Интерактивная Визуализация" },
  instructions: { en: "Compare the broken structure with the corrected object collaboration / pattern structure.", ru: "Сравните сломанную структуру с исправленным сотрудничеством объектов / структурой паттерна." }
};
const stage7: PracticeStage = {
  id: "stg_dec_practice", missionId: "mis_decorator_pattern", type: "INTERACTIVE_PRACTICE", order: 7,
  title: { en: "7. Guided Practice: Fix Builder", ru: "7. Практика: Конструктор Исправления" },
  instructions: { en: "Assemble the structural building blocks of the production-safe fix.", ru: "Соберите структурные элементы продакшн-безопасного исправления." },
  challengeId: "chl_dec_fix_builder"
};
const stage8: InterviewStage = {
  id: "stg_dec_interview_q", missionId: "mis_decorator_pattern", type: "INTERVIEW_QUESTION", order: 8,
  title: { en: "8. Senior Interview Scenario", ru: "8. Сценарий Senior-Интервью" },
  instructions: { en: "Review the senior interview question for this scenario.", ru: "Ознакомьтесь с вопросом Senior-собеседования для этого сценария." },
  interviewQuestionId: "q_dec_audit_01", challengeId: "chl_dec_interview_answer"
};
const stage9: InterviewStage = {
  id: "stg_dec_interview_a", missionId: "mis_decorator_pattern", type: "INTERVIEW_ANSWER", order: 9,
  title: { en: "9. Interview Verbal Answer", ru: "9. Устный Ответ и Модель" },
  instructions: { en: "Formulate your structured verbal response and submit for evaluation.", ru: "Сформулируйте структурированный устный ответ и отправьте на проверку." },
  interviewQuestionId: "q_dec_audit_01", challengeId: "chl_dec_interview_answer"
};
const stage10: PracticeStage = {
  id: "stg_dec_debug", missionId: "mis_decorator_pattern", type: "DEBUG_COUNTER_EXAMPLE", order: 10,
  title: { en: "10. Applied Bug Hunt", ru: "10. Поиск Бага" },
  instructions: { en: "Identify the defective line(s) in the counter-example.", ru: "Найдите дефектную строку(и) в контрпримере." },
  challengeId: "chl_dec_bughunt"
};
const stage11: BaseMissionStage = {
  id: "stg_dec_related", missionId: "mis_decorator_pattern", type: "RELATED_TOPICS", order: 11,
  title: { en: "11. Related Knowledge Nodes", ru: "11. Связанные Узлы Знаний" },
  instructions: { en: "Explore related topics without collapsing this mission into a different one.", ru: "Исследуйте связанные темы, не смешивая эту миссию с другой." }
};
const stage12: BaseMissionStage = {
  id: "stg_dec_results", missionId: "mis_decorator_pattern", type: "MISSION_RESULTS", order: 12,
  title: { en: "12. Mission Performance Summary", ru: "12. Итоги Прохождения Миссии" },
  instructions: { en: "Review your performance metrics, concepts strengthened, and XP awarded.", ru: "Просмотрите метрики прохождения, укрепившиеся концепции и заработанный XP." }
};
const stage13: BaseMissionStage = {
  id: "stg_dec_reflection", missionId: "mis_decorator_pattern", type: "REFLECTION", order: 13,
  title: { en: "13. Engineering Reflection", ru: "13. Инженерная Рефлексия" },
  instructions: { en: "Write a 1-sentence reflection on when you will reject a PR that reintroduces this failure mode.", ru: "Напишите 1 предложение о том, когда отклоните PR, возвращающий этот режим отказа." }
};

export const DECORATOR_PATTERN_MISSION_STAGES: readonly MissionStage[] = [
  stage1, stage2, stage3, stage4, stage5, stage6, stage7, stage8, stage9, stage10, stage11, stage12, stage13
];

export const DECORATOR_PATTERN_MISSION: Mission = {
  id: "mis_decorator_pattern",
  primaryTopicId: "top_oop_31",
  secondaryTopicIds: ["top_oop_09","top_oop_16"],
  slug: "missing-audit-funds-transfer-decorator",
  title: {"en":"The Missing Audit Layer: Composable Decorators for FundsTransferGateway","ru":"Пропущенный Audit-Слой: Композируемые Декораторы для FundsTransferGateway"},
  description: {"en":"Compose AuditedFundsTransferGateway, RetryingFundsTransferGateway, and AuthorizedFundsTransferGateway around CoreFundsTransferGateway so audit is never dropped when retry/auth wrappers are applied.","ru":"Скомпонуйте AuditedFundsTransferGateway, RetryingFundsTransferGateway и AuthorizedFundsTransferGateway вокруг CoreFundsTransferGateway так, чтобы audit не терялся при обёртках retry/auth."},
  scenarioIntroduction: {"en":"Funds transfers gained Retrying and Authorized wrappers. Ops discovered transfers succeeded without audit rows — AuditedFundsTransferGateway was left out of the composition, or placed inside retry so failures/retries were not audited correctly. Distinct from composition-over-inheritance mission: here the GoF Decorator stack on FundsTransferGateway is the focus.","ru":"У funds transfers появились обёртки Retrying и Authorized. Ops обнаружил успешные переводы без audit rows — AuditedFundsTransferGateway выпал из композиции или стоял внутри retry так, что failures/retries аудитились неверно. Отличие от composition-over-inheritance: фокус на стеке GoF Decorator для FundsTransferGateway."},
  engineeringProblem: {"en":"FundsTransferGateway.transfer(TransferRequest)→TransferResult. CoreFundsTransferGateway is the core. Decorators: Audited, Retrying, Authorized — each implements FundsTransferGateway and delegates. Order matters: typically Authorize → Audit → Retry → Core (or document chosen order). Decorator ≠ Proxy (proxy controls access/lazy; decorator adds responsibilities).","ru":"FundsTransferGateway.transfer(TransferRequest)→TransferResult. CoreFundsTransferGateway — ядро. Декораторы: Audited, Retrying, Authorized — каждый реализует FundsTransferGateway и делегирует. Порядок важен. Decorator ≠ Proxy."},
  learningObjectives: [{"en":"Compose FundsTransferGateway decorators without dropping audit","ru":"Компоновать декораторы FundsTransferGateway без потери audit"},{"en":"Explain decorator order effects on audit/retry/auth","ru":"Объяснить влияние порядка декораторов на audit/retry/auth"},{"en":"Contrast Decorator with Proxy","ru":"Противопоставить Decorator и Proxy"},{"en":"Keep distinct from composition-over-inheritance mission","ru":"Отличать от миссии composition-over-inheritance"}],
  requiredConceptIds: ["cpt_decorator_pattern","cpt_decorator_order"],
  recommendedConceptIds: ["cpt_decorator_vs_proxy","cpt_composition_over_inheritance"],
  stageIds: DECORATOR_PATTERN_MISSION_STAGES.map((s) => s.id),
  challengeIds: ["chl_dec_fix_builder", "chl_dec_bughunt", "chl_dec_interview_answer"],
  estimatedMinutes: 30,
  difficulty: "SENIOR",
  xpReward: 300,
  version: "1.0.0"
};
