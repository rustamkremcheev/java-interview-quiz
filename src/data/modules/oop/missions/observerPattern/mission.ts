import { Mission, MissionStage, TheoryStage, PracticeStage, InterviewStage, BaseMissionStage } from '../../../../../types/domain';

const stage1: BaseMissionStage = {
  id: "stg_obs_intro", missionId: "mis_observer_pattern", type: "MISSION_INTRODUCTION", order: 1,
  title: { en: "1. Mission Introduction", ru: "1. Введение в Миссию" },
  instructions: { en: "In-process transaction monitoring (not Kafka) fired duplicate compliance alerts after redeploy: ComplianceAlertObserver subscribed twice because unsubscribe was never called. Separ...", ru: "In-process мониторинг транзакций (не Kafka) слал дубли compliance alerts после redeploy: ComplianceAlertObserver подписался дважды — unsubscribe не вызывался. Отдельно падающий Fra..." }
};
const stage2: BaseMissionStage = {
  id: "stg_obs_problem", missionId: "mis_observer_pattern", type: "REAL_ENGINEERING_PROBLEM", order: 2,
  title: { en: "2. Real Engineering Problem", ru: "2. Реальная Инженерная Проблема" },
  instructions: { en: "TransactionEventPublisher maintains Subscriptions of TransactionObserver. subscribe/unsubscribe must be idempotent or reference-counted; notifyObservers must isolate exceptions per observer. Complianc", ru: "TransactionEventPublisher держит Subscriptions TransactionObserver. subscribe/unsubscribe должны быть идемпотентны или reference-counted; notifyObservers должен изолировать исключения per observer. Co" }
};
const stage3: BaseMissionStage = {
  id: "stg_obs_think", missionId: "mis_observer_pattern", type: "THINK_YOURSELF", order: 3,
  title: { en: "3. Think Yourself Diagnostic", ru: "3. Диагностика: Подумайте Сам" },
  instructions: { en: "Formulate your hypothesis about the root cause and the OOP mechanism that fixes it.", ru: "Сформулируйте гипотезу о корневой причине и механизме ООП, который это исправляет." }
};
const stage4: BaseMissionStage = {
  id: "stg_obs_help", missionId: "mis_observer_pattern", type: "NEED_HELP", order: 4,
  title: { en: "4. Need Knowledge Bridge", ru: "4. Мост к Знаниям" },
  instructions: { en: "No-penalty bridge into the theory for this mission's core concepts.", ru: "Бесштрафной переход к теории ключевых концепций этой миссии." }
};
const stage5: TheoryStage = {
  id: "stg_obs_theory", missionId: "mis_observer_pattern", type: "THEORY", order: 5,
  title: { en: "5. Core Theory & Checkpoints", ru: "5. Фундаментальная Теория и Проверки" },
  instructions: { en: "Study the 4 theory sections and complete the checkpoints.", ru: "Изучите 4 раздела теории и пройдите проверки." },
  theoryArticleId: "art_theory_observer_pattern"
};
const stage6: BaseMissionStage = {
  id: "stg_obs_visual", missionId: "mis_observer_pattern", type: "VISUALIZATION", order: 6,
  title: { en: "6. Interactive Visualization", ru: "6. Интерактивная Визуализация" },
  instructions: { en: "Compare the broken structure with the corrected object collaboration / pattern structure.", ru: "Сравните сломанную структуру с исправленным сотрудничеством объектов / структурой паттерна." }
};
const stage7: PracticeStage = {
  id: "stg_obs_practice", missionId: "mis_observer_pattern", type: "INTERACTIVE_PRACTICE", order: 7,
  title: { en: "7. Guided Practice: Fix Builder", ru: "7. Практика: Конструктор Исправления" },
  instructions: { en: "Assemble the structural building blocks of the production-safe fix.", ru: "Соберите структурные элементы продакшн-безопасного исправления." },
  challengeId: "chl_obs_fix_builder"
};
const stage8: InterviewStage = {
  id: "stg_obs_interview_q", missionId: "mis_observer_pattern", type: "INTERVIEW_QUESTION", order: 8,
  title: { en: "8. Senior Interview Scenario", ru: "8. Сценарий Senior-Интервью" },
  instructions: { en: "Review the senior interview question for this scenario.", ru: "Ознакомьтесь с вопросом Senior-собеседования для этого сценария." },
  interviewQuestionId: "q_obs_dup_01", challengeId: "chl_obs_interview_answer"
};
const stage9: InterviewStage = {
  id: "stg_obs_interview_a", missionId: "mis_observer_pattern", type: "INTERVIEW_ANSWER", order: 9,
  title: { en: "9. Interview Verbal Answer", ru: "9. Устный Ответ и Модель" },
  instructions: { en: "Formulate your structured verbal response and submit for evaluation.", ru: "Сформулируйте структурированный устный ответ и отправьте на проверку." },
  interviewQuestionId: "q_obs_dup_01", challengeId: "chl_obs_interview_answer"
};
const stage10: PracticeStage = {
  id: "stg_obs_debug", missionId: "mis_observer_pattern", type: "DEBUG_COUNTER_EXAMPLE", order: 10,
  title: { en: "10. Applied Bug Hunt", ru: "10. Поиск Бага" },
  instructions: { en: "Identify the defective line(s) in the counter-example.", ru: "Найдите дефектную строку(и) в контрпримере." },
  challengeId: "chl_obs_bughunt"
};
const stage11: BaseMissionStage = {
  id: "stg_obs_related", missionId: "mis_observer_pattern", type: "RELATED_TOPICS", order: 11,
  title: { en: "11. Related Knowledge Nodes", ru: "11. Связанные Узлы Знаний" },
  instructions: { en: "Explore related topics without collapsing this mission into a different one.", ru: "Исследуйте связанные темы, не смешивая эту миссию с другой." }
};
const stage12: BaseMissionStage = {
  id: "stg_obs_results", missionId: "mis_observer_pattern", type: "MISSION_RESULTS", order: 12,
  title: { en: "12. Mission Performance Summary", ru: "12. Итоги Прохождения Миссии" },
  instructions: { en: "Review your performance metrics, concepts strengthened, and XP awarded.", ru: "Просмотрите метрики прохождения, укрепившиеся концепции и заработанный XP." }
};
const stage13: BaseMissionStage = {
  id: "stg_obs_reflection", missionId: "mis_observer_pattern", type: "REFLECTION", order: 13,
  title: { en: "13. Engineering Reflection", ru: "13. Инженерная Рефлексия" },
  instructions: { en: "Write a 1-sentence reflection on when you will reject a PR that reintroduces this failure mode.", ru: "Напишите 1 предложение о том, когда отклоните PR, возвращающий этот режим отказа." }
};

export const OBSERVER_PATTERN_MISSION_STAGES: readonly MissionStage[] = [
  stage1, stage2, stage3, stage4, stage5, stage6, stage7, stage8, stage9, stage10, stage11, stage12, stage13
];

export const OBSERVER_PATTERN_MISSION: Mission = {
  id: "mis_observer_pattern",
  primaryTopicId: "top_oop_30",
  secondaryTopicIds: ["top_oop_09","top_oop_18"],
  slug: "duplicate-compliance-alert-observer",
  title: {"en":"The Duplicate Compliance Alert: Observer Lifecycle Failure in Transaction Monitoring","ru":"Дублирующий Compliance Alert: Сбой Lifecycle Observer в Мониторинге Транзакций"},
  description: {"en":"Fix TransactionEventPublisher subscription lifecycle so ComplianceAlertObserver is not registered twice and observer exceptions cannot kill AuditObserver/FraudAnalyticsObserver notifications.","ru":"Исправьте lifecycle подписок TransactionEventPublisher, чтобы ComplianceAlertObserver не регистрировался дважды и исключения observer не убивали уведомления AuditObserver/FraudAnalyticsObserver."},
  scenarioIntroduction: {"en":"In-process transaction monitoring (not Kafka) fired duplicate compliance alerts after redeploy: ComplianceAlertObserver subscribed twice because unsubscribe was never called. Separately, a throwing FraudAnalyticsObserver aborted the notify loop, skipping AuditObserver. Classic Observer lifecycle and exception-isolation failures.","ru":"In-process мониторинг транзакций (не Kafka) слал дубли compliance alerts после redeploy: ComplianceAlertObserver подписался дважды — unsubscribe не вызывался. Отдельно падающий FraudAnalyticsObserver обрывал notify-цикл, пропуская AuditObserver. Классические сбои lifecycle Observer и изоляции исключений."},
  engineeringProblem: {"en":"TransactionEventPublisher maintains Subscriptions of TransactionObserver. subscribe/unsubscribe must be idempotent or reference-counted; notifyObservers must isolate exceptions per observer. ComplianceAlertObserver, AuditObserver, FraudAnalyticsObserver are in-process listeners — not message-broker consumers.","ru":"TransactionEventPublisher держит Subscriptions TransactionObserver. subscribe/unsubscribe должны быть идемпотентны или reference-counted; notifyObservers должен изолировать исключения per observer. ComplianceAlertObserver, AuditObserver, FraudAnalyticsObserver — in-process listeners, не брокеры."},
  learningObjectives: [{"en":"Manage Observer subscription lifecycle without duplicate registrations","ru":"Управлять lifecycle подписок Observer без дублей регистрации"},{"en":"Isolate observer exceptions during notify","ru":"Изолировать исключения observer при notify"},{"en":"Model in-process TransactionObserver collaborators (not Kafka)","ru":"Моделировать in-process сотрудников TransactionObserver (не Kafka)"},{"en":"Use Subscription tokens for clean unsubscribe","ru":"Использовать токены Subscription для чистого unsubscribe"}],
  requiredConceptIds: ["cpt_observer_pattern","cpt_subscription_lifecycle"],
  recommendedConceptIds: ["cpt_observer_exception_isolation"],
  stageIds: OBSERVER_PATTERN_MISSION_STAGES.map((s) => s.id),
  challengeIds: ["chl_obs_fix_builder", "chl_obs_bughunt", "chl_obs_interview_answer"],
  estimatedMinutes: 30,
  difficulty: "SENIOR",
  xpReward: 300,
  version: "1.0.0"
};
