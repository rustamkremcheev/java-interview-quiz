import { Mission, MissionStage, TheoryStage, PracticeStage, InterviewStage, BaseMissionStage } from '../../../../../types/domain';

const stage1: BaseMissionStage = {
  id: "stg_api_intro", missionId: "mis_api_contract_design", type: "MISSION_INTRODUCTION", order: 1,
  title: { en: "1. Mission Introduction", ru: "1. Введение в Миссию" },
  instructions: { en: "PaymentAuthorizationService changed declineReasons from null (none) to empty list, and started throwing PaymentAuthorizationException where clients expected AuthorizationResult.dec...", ru: "PaymentAuthorizationService сменил declineReasons с null (нет причин) на empty list и начал бросать PaymentAuthorizationException там, где клиенты ждали AuthorizationResult.decline..." }
};
const stage2: BaseMissionStage = {
  id: "stg_api_problem", missionId: "mis_api_contract_design", type: "REAL_ENGINEERING_PROBLEM", order: 2,
  title: { en: "2. Real Engineering Problem", ru: "2. Реальная Инженерная Проблема" },
  instructions: { en: "API contract includes signatures and behavioral promises: null vs empty lists, exception vs result objects, AuthorizationPolicy meaning. Evolve with versioning, adapters, or documented compatibility r", ru: "API-контракт включает сигнатуры и поведенческие обещания: null vs empty, exception vs result, смысл AuthorizationPolicy. Эволюционируйте версионированием, адаптерами или документированными правилами с" }
};
const stage3: BaseMissionStage = {
  id: "stg_api_think", missionId: "mis_api_contract_design", type: "THINK_YOURSELF", order: 3,
  title: { en: "3. Think Yourself Diagnostic", ru: "3. Диагностика: Подумайте Сам" },
  instructions: { en: "Formulate your hypothesis about the root cause and the OOP mechanism that fixes it.", ru: "Сформулируйте гипотезу о корневой причине и механизме ООП, который это исправляет." }
};
const stage4: BaseMissionStage = {
  id: "stg_api_help", missionId: "mis_api_contract_design", type: "NEED_HELP", order: 4,
  title: { en: "4. Need Knowledge Bridge", ru: "4. Мост к Знаниям" },
  instructions: { en: "No-penalty bridge into the theory for this mission's core concepts.", ru: "Бесштрафной переход к теории ключевых концепций этой миссии." }
};
const stage5: TheoryStage = {
  id: "stg_api_theory", missionId: "mis_api_contract_design", type: "THEORY", order: 5,
  title: { en: "5. Core Theory & Checkpoints", ru: "5. Фундаментальная Теория и Проверки" },
  instructions: { en: "Study the 4 theory sections and complete the checkpoints.", ru: "Изучите 4 раздела теории и пройдите проверки." },
  theoryArticleId: "art_theory_api_contract_design"
};
const stage6: BaseMissionStage = {
  id: "stg_api_visual", missionId: "mis_api_contract_design", type: "VISUALIZATION", order: 6,
  title: { en: "6. Interactive Visualization", ru: "6. Интерактивная Визуализация" },
  instructions: { en: "Compare the broken structure with the corrected object collaboration / pattern structure.", ru: "Сравните сломанную структуру с исправленным сотрудничеством объектов / структурой паттерна." }
};
const stage7: PracticeStage = {
  id: "stg_api_practice", missionId: "mis_api_contract_design", type: "INTERACTIVE_PRACTICE", order: 7,
  title: { en: "7. Guided Practice: Fix Builder", ru: "7. Практика: Конструктор Исправления" },
  instructions: { en: "Assemble the structural building blocks of the production-safe fix.", ru: "Соберите структурные элементы продакшн-безопасного исправления." },
  challengeId: "chl_api_fix_builder"
};
const stage8: InterviewStage = {
  id: "stg_api_interview_q", missionId: "mis_api_contract_design", type: "INTERVIEW_QUESTION", order: 8,
  title: { en: "8. Senior Interview Scenario", ru: "8. Сценарий Senior-Интервью" },
  instructions: { en: "Review the senior interview question for this scenario.", ru: "Ознакомьтесь с вопросом Senior-собеседования для этого сценария." },
  interviewQuestionId: "q_api_auth_01", challengeId: "chl_api_interview_answer"
};
const stage9: InterviewStage = {
  id: "stg_api_interview_a", missionId: "mis_api_contract_design", type: "INTERVIEW_ANSWER", order: 9,
  title: { en: "9. Interview Verbal Answer", ru: "9. Устный Ответ и Модель" },
  instructions: { en: "Formulate your structured verbal response and submit for evaluation.", ru: "Сформулируйте структурированный устный ответ и отправьте на проверку." },
  interviewQuestionId: "q_api_auth_01", challengeId: "chl_api_interview_answer"
};
const stage10: PracticeStage = {
  id: "stg_api_debug", missionId: "mis_api_contract_design", type: "DEBUG_COUNTER_EXAMPLE", order: 10,
  title: { en: "10. Applied Bug Hunt", ru: "10. Поиск Бага" },
  instructions: { en: "Identify the defective line(s) in the counter-example.", ru: "Найдите дефектную строку(и) в контрпримере." },
  challengeId: "chl_api_bughunt"
};
const stage11: BaseMissionStage = {
  id: "stg_api_related", missionId: "mis_api_contract_design", type: "RELATED_TOPICS", order: 11,
  title: { en: "11. Related Knowledge Nodes", ru: "11. Связанные Узлы Знаний" },
  instructions: { en: "Explore related topics without collapsing this mission into a different one.", ru: "Исследуйте связанные темы, не смешивая эту миссию с другой." }
};
const stage12: BaseMissionStage = {
  id: "stg_api_results", missionId: "mis_api_contract_design", type: "MISSION_RESULTS", order: 12,
  title: { en: "12. Mission Performance Summary", ru: "12. Итоги Прохождения Миссии" },
  instructions: { en: "Review your performance metrics, concepts strengthened, and XP awarded.", ru: "Просмотрите метрики прохождения, укрепившиеся концепции и заработанный XP." }
};
const stage13: BaseMissionStage = {
  id: "stg_api_reflection", missionId: "mis_api_contract_design", type: "REFLECTION", order: 13,
  title: { en: "13. Engineering Reflection", ru: "13. Инженерная Рефлексия" },
  instructions: { en: "Write a 1-sentence reflection on when you will reject a PR that reintroduces this failure mode.", ru: "Напишите 1 предложение о том, когда отклоните PR, возвращающий этот режим отказа." }
};

export const API_CONTRACT_DESIGN_MISSION_STAGES: readonly MissionStage[] = [
  stage1, stage2, stage3, stage4, stage5, stage6, stage7, stage8, stage9, stage10, stage11, stage12, stage13
];

export const API_CONTRACT_DESIGN_MISSION: Mission = {
  id: "mis_api_contract_design",
  primaryTopicId: "top_oop_34",
  secondaryTopicIds: ["top_oop_09","top_oop_22"],
  slug: "breaking-payment-authorization-api",
  title: {"en":"The Breaking Payment API: Contract Evolution Without Silent Client Failure","ru":"Ломающий Payment API: Эволюция Контракта Без Тихого Провала Клиентов"},
  description: {"en":"Evolve PaymentAuthorizationService so AuthorizationResult, DeclineReason, and null-vs-empty collection semantics stay behaviorally compatible — no silent client failures.","ru":"Эволюционируйте PaymentAuthorizationService так, чтобы AuthorizationResult, DeclineReason и семантика null-vs-empty коллекций оставались поведенчески совместимы — без тихих провалов клиентов."},
  scenarioIntroduction: {"en":"PaymentAuthorizationService changed declineReasons from null (none) to empty list, and started throwing PaymentAuthorizationException where clients expected AuthorizationResult.declined(...). Clients NPEd or missed declines. Published interface evolved without behavioral compatibility.","ru":"PaymentAuthorizationService сменил declineReasons с null (нет причин) на empty list и начал бросать PaymentAuthorizationException там, где клиенты ждали AuthorizationResult.declined(...). Клиенты ловили NPE или пропускали declines. Published interface эволюционировал без behavioral compatibility."},
  engineeringProblem: {"en":"API contract includes signatures and behavioral promises: null vs empty lists, exception vs result objects, AuthorizationPolicy meaning. Evolve with versioning, adapters, or documented compatibility rules. Fowler PublishedInterface: treat the exposed surface as a commitment.","ru":"API-контракт включает сигнатуры и поведенческие обещания: null vs empty, exception vs result, смысл AuthorizationPolicy. Эволюционируйте версионированием, адаптерами или документированными правилами совместимости. Fowler PublishedInterface."},
  learningObjectives: [{"en":"Define API contract beyond method signatures","ru":"Определять API-контракт шире сигнатур методов"},{"en":"Preserve behavioral compatibility for authorization clients","ru":"Сохранять behavioral compatibility для клиентов authorization"},{"en":"Choose null vs empty collections deliberately","ru":"Осознанно выбирать null vs empty коллекции"},{"en":"Evolve PaymentAuthorizationService without silent client failure","ru":"Эволюционировать PaymentAuthorizationService без тихого провала клиентов"}],
  requiredConceptIds: ["cpt_api_contract","cpt_behavioral_compatibility"],
  recommendedConceptIds: ["cpt_null_vs_empty_collection","cpt_interface_contracts"],
  stageIds: API_CONTRACT_DESIGN_MISSION_STAGES.map((s) => s.id),
  challengeIds: ["chl_api_fix_builder", "chl_api_bughunt", "chl_api_interview_answer"],
  estimatedMinutes: 35,
  difficulty: "SENIOR",
  xpReward: 300,
  version: "1.0.0"
};
