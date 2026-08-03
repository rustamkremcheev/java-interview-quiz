import { Mission, MissionStage, TheoryStage, PracticeStage, InterviewStage, BaseMissionStage } from '../../../../../types/domain';

const stage1: BaseMissionStage = {
  id: "stg_idm_intro",
  missionId: "mis_interface_default_methods",
  type: "MISSION_INTRODUCTION",
  order: 1,
  title: { en: "1. Mission Introduction", ru: "1. Введение в Миссию" },
  instructions: {
    en: "Inspect the production build failure below where PaymentReconciliationService stopped compiling after a Spring Boot framework upgrade.",
    ru: "Изучите сбой сборки на продакшене, где PaymentReconciliationService перестал компилироваться после обновления Spring Boot."
  }
};

const stage2: BaseMissionStage = {
  id: "stg_idm_problem",
  missionId: "mis_interface_default_methods",
  type: "REAL_ENGINEERING_PROBLEM",
  order: 2,
  title: { en: "2. Real Engineering Problem", ru: "2. Реальная Инженерная Проблема" },
  instructions: {
    en: "Examine PaymentReconciliationService implementing both Auditable and Traceable — each library added a default void auditLog() method with incompatible semantics.",
    ru: "Изучите PaymentReconciliationService, реализующий Auditable и Traceable — каждая библиотека добавила default void auditLog() с несовместимой семантикой."
  }
};

const stage3: BaseMissionStage = {
  id: "stg_idm_think",
  missionId: "mis_interface_default_methods",
  type: "THINK_YOURSELF",
  order: 3,
  title: { en: "3. Think Yourself Diagnostic", ru: "3. Диагностика: Подумайте Сам" },
  instructions: {
    en: "Formulate your initial hypothesis: Why does the compiler report 'PaymentReconciliationService inherits unrelated defaults for auditLog() from types Auditable and Traceable'?",
    ru: "Сформулируйте гипотезу: почему компилятор сообщает 'PaymentReconciliationService inherits unrelated defaults for auditLog() from types Auditable and Traceable'?"
  }
};

const stage4: BaseMissionStage = {
  id: "stg_idm_help",
  missionId: "mis_interface_default_methods",
  type: "NEED_HELP",
  order: 4,
  title: { en: "4. Need Knowledge Bridge", ru: "4. Мост к Знаниям" },
  instructions: {
    en: "No-penalty bridge to deep theory on JLS 9.4.1.2 default method conflict resolution and the diamond inheritance problem.",
    ru: "Бесштрафной переход к теории JLS 9.4.1.2 о разрешении конфликтов default-методов и проблеме ромба."
  }
};

const stage5: TheoryStage = {
  id: "stg_idm_theory",
  missionId: "mis_interface_default_methods",
  type: "THEORY",
  order: 5,
  title: { en: "5. Core Theory & Checkpoints", ru: "5. Фундаментальная Теория и Проверки" },
  instructions: {
    en: "Study the 4 theory sections covering default methods, JLS 9.4.1.2 conflict rules, super-qualified resolution, and senior interview follow-ups.",
    ru: "Изучите 4 раздела теории о default-методах, правилах JLS 9.4.1.2, super-qualified разрешении и доп. вопросах Senior-интервью."
  },
  theoryArticleId: "art_theory_default_methods"
};

const stage6: BaseMissionStage = {
  id: "stg_idm_visual",
  missionId: "mis_interface_default_methods",
  type: "VISUALIZATION",
  order: 6,
  title: { en: "6. Interactive Diamond Conflict Visualization", ru: "6. Визуализация Конфликта Ромба" },
  instructions: {
    en: "Compare the diamond inheritance graph where two super-interfaces supply unrelated default auditLog() implementations.",
    ru: "Сравните граф наследования-ромба, где два супер-интерфейса предоставляют несвязанные default-реализации auditLog()."
  }
};

const stage7: PracticeStage = {
  id: "stg_idm_practice",
  missionId: "mis_interface_default_methods",
  type: "INTERACTIVE_PRACTICE",
  order: 7,
  title: { en: "7. Guided Practice: Fix Builder", ru: "7. Практика: Конструктор Исправления" },
  instructions: {
    en: "Assemble the structural code elements required to resolve the default method collision in PaymentReconciliationService.",
    ru: "Соберите элементы кода для разрешения столкновения default-методов в PaymentReconciliationService."
  },
  challengeId: "chl_idm_fix_builder"
};

const stage8: InterviewStage = {
  id: "stg_idm_interview_q",
  missionId: "mis_interface_default_methods",
  type: "INTERVIEW_QUESTION",
  order: 8,
  title: { en: "8. Senior Interview Scenario", ru: "8. Сценарий Senior-Интервью" },
  instructions: {
    en: "Review the authentic senior interview question about interface default method conflicts in payment audit pipelines.",
    ru: "Ознакомьтесь с реальным вопросом Senior-собеседования о конфликтах default-методов в платежном аудите."
  },
  interviewQuestionId: "q_idm_payment_01",
  challengeId: "chl_idm_interview_answer"
};

const stage9: InterviewStage = {
  id: "stg_idm_interview_a",
  missionId: "mis_interface_default_methods",
  type: "INTERVIEW_ANSWER",
  order: 9,
  title: { en: "9. Interview Verbal Answer", ru: "9. Устный Ответ и Модель" },
  instructions: {
    en: "Formulate your structured verbal response (Elevator Pitch + JLS Mechanics + Trade-offs) and submit for evaluation.",
    ru: "Сформулируйте структурированный ответ (Elevator Pitch + Механика JLS + Компромиссы) и отправьте на проверку."
  },
  interviewQuestionId: "q_idm_payment_01",
  challengeId: "chl_idm_interview_answer"
};

const stage10: PracticeStage = {
  id: "stg_idm_debug",
  missionId: "mis_interface_default_methods",
  type: "DEBUG_COUNTER_EXAMPLE",
  order: 10,
  title: { en: "10. Applied Bug Hunt: SettlementProcessor", ru: "10. Поиск Бага: SettlementProcessor" },
  instructions: {
    en: "Identify the line in SettlementProcessor where an incorrect default method override causes silent audit trail loss.",
    ru: "Найдите строку в SettlementProcessor, где неверное переопределение default-метода приводит к потере аудит-трейла."
  },
  challengeId: "chl_idm_bughunt"
};

const stage11: BaseMissionStage = {
  id: "stg_idm_related",
  missionId: "mis_interface_default_methods",
  type: "RELATED_TOPICS",
  order: 11,
  title: { en: "11. Related Knowledge Nodes", ru: "11. Связанные Узлы Знаний" },
  instructions: {
    en: "Explore lateral graph connections to abstract classes, multiple inheritance, and functional interface evolution.",
    ru: "Исследуйте связи Графа Знаний для перехода к абстрактным классам, множественному наследованию и эволюции интерфейсов."
  }
};

const stage12: BaseMissionStage = {
  id: "stg_idm_results",
  missionId: "mis_interface_default_methods",
  type: "MISSION_RESULTS",
  order: 12,
  title: { en: "12. Mission Performance Summary", ru: "12. Итоги Прохождения Миссии" },
  instructions: {
    en: "Review your performance metrics, concepts strengthened, and XP awarded.",
    ru: "Просмотрите метрики прохождения, укрепившиеся концепции и заработанный XP."
  }
};

const stage13: BaseMissionStage = {
  id: "stg_idm_reflection",
  missionId: "mis_interface_default_methods",
  type: "REFLECTION",
  order: 13,
  title: { en: "13. Engineering Reflection", ru: "13. Инженерная Рефлексия" },
  instructions: {
    en: "Write a 1-sentence reflection on which default method conflict rule you will enforce in code reviews.",
    ru: "Напишите 1 предложение о том, какое правило разрешения конфликтов default-методов вы введете на код-ревью."
  }
};

export const INTERFACE_DEFAULT_METHODS_MISSION_STAGES: readonly MissionStage[] = [
  stage1, stage2, stage3, stage4, stage5, stage6, stage7, stage8, stage9, stage10, stage11, stage12, stage13
];

export const INTERFACE_DEFAULT_METHODS_MISSION: Mission = {
  id: "mis_interface_default_methods",
  primaryTopicId: "top_oop_09",
  secondaryTopicIds: ["top_oop_07", "top_oop_23", "top_oop_24"],
  slug: "dual-audit-log-default-method-conflict",
  title: {
    en: "The Diamond Conflict: Interface Default Method Collision in Payment Services",
    ru: "Конфликт Ромба: Столкновение Default-Методов в Платежных Сервисах"
  },
  description: {
    en: "Resolve a compile-time diamond inheritance conflict where PaymentReconciliationService implements Auditable and Traceable — both internal libraries added incompatible default void auditLog() methods after a framework upgrade.",
    ru: "Разрешите конфликт наследования-ромба, где PaymentReconciliationService реализует Auditable и Traceable — обе внутренние библиотеки добавили несовместимые default void auditLog() после обновления фреймворка."
  },
  scenarioIntroduction: {
    en: "During a routine Spring Boot 3.x upgrade, the payment reconciliation team's CI pipeline failed with a hard compile error. PaymentReconciliationService had peacefully compiled for two years while implementing Auditable from the compliance-sdk and Traceable from the observability-sdk. The upgrade pulled new minor versions of both libraries — each added a default void auditLog() method. The build now fails before a single test runs.",
    ru: "При плановом обновлении Spring Boot 3.x CI-пайплайн команды сверки платежей упал с ошибкой компиляции. PaymentReconciliationService два года спокойно компилировался, реализуя Auditable из compliance-sdk и Traceable из observability-sdk. Обновление подтянуло новые минорные версии обеих библиотек — каждая добавила default void auditLog(). Сборка падает до запуска единственного теста."
  },
  engineeringProblem: {
    en: "PaymentReconciliationService implements both Auditable (default void auditLog() writes to compliance audit DB) and Traceable (default void auditLog() emits distributed trace spans). JLS 9.4.1.2 reports: 'class PaymentReconciliationService inherits unrelated defaults for auditLog() from types Auditable and Traceable'. The class must explicitly override auditLog() and disambiguate via Auditable.super.auditLog() and Traceable.super.auditLog(), or refactor to a composition-based audit facade.",
    ru: "PaymentReconciliationService реализует Auditable (default void auditLog() пишет в compliance audit DB) и Traceable (default void auditLog() эмитит distributed trace spans). JLS 9.4.1.2 сообщает: 'class PaymentReconciliationService inherits unrelated defaults for auditLog() from types Auditable and Traceable'. Класс должен явно переопределить auditLog() и разрешить конфликт через Auditable.super.auditLog() и Traceable.super.auditLog(), либо рефакторить на композиционный audit facade."
  },
  learningObjectives: [
    {
      en: "Understand why Java 8 default methods enable multiple inheritance of behavior and the diamond problem",
      ru: "Понять, почему default-методы Java 8 включают множественное наследование поведения и проблему ромба"
    },
    {
      en: "Apply JLS 9.4.1.2 conflict resolution rules: class wins, most-specific interface wins, explicit override required",
      ru: "Применить правила JLS 9.4.1.2: класс побеждает, наиболее специфичный интерфейс побеждает, требуется явное переопределение"
    },
    {
      en: "Resolve unrelated default method collisions using super-qualified calls: InterfaceName.super.methodName()",
      ru: "Разрешать столкновения несвязанных default-методов через super-qualified вызовы: InterfaceName.super.methodName()"
    },
    {
      en: "Evaluate composition-based audit facades as an alternative to stacking cross-cutting default method interfaces",
      ru: "Оценить композиционные audit facade как альтернативу наслоению cross-cutting интерфейсов с default-методами"
    }
  ],
  requiredConceptIds: ["cpt_default_methods", "cpt_interface_contracts"],
  recommendedConceptIds: ["cpt_composition_over_inheritance"],
  stageIds: INTERFACE_DEFAULT_METHODS_MISSION_STAGES.map((s) => s.id),
  challengeIds: ["chl_idm_fix_builder", "chl_idm_bughunt", "chl_idm_interview_answer"],
  estimatedMinutes: 30,
  difficulty: "SENIOR",
  xpReward: 250,
  version: "1.0.0"
};
