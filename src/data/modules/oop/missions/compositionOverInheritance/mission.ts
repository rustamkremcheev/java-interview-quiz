import { Mission, MissionStage, TheoryStage, PracticeStage, InterviewStage, BaseMissionStage } from '../../../../../types/domain';

const stage1: BaseMissionStage = {
  id: "stg_comp_intro",
  missionId: "mis_composition_over_inheritance",
  type: "MISSION_INTRODUCTION",
  order: 1,
  title: { en: "1. Production Incident Story", ru: "1. Инцидент на Продакшене" },
  instructions: {
    en: "Inspect the notifications delivery alert below where reported email/SMS delivery metrics doubled after a platform library upgrade.",
    ru: "Изучите алерт доставки уведомлений, где метрики email/SMS удвоились после обновления платформенной библиотеки."
  }
};

const stage2: BaseMissionStage = {
  id: "stg_comp_problem",
  missionId: "mis_composition_over_inheritance",
  type: "REAL_ENGINEERING_PROBLEM",
  order: 2,
  title: { en: "2. Real Engineering Problem", ru: "2. Реальная Инженерная Проблема" },
  instructions: {
    en: "Examine EmailNotificationService — a NotificationService subclass that tracks deliveryCount by overriding send() and sendBatch().",
    ru: "Изучите EmailNotificationService — подкласс NotificationService, отслеживающий deliveryCount через переопределение send() и sendBatch()."
  }
};

const stage3: BaseMissionStage = {
  id: "stg_comp_think",
  missionId: "mis_composition_over_inheritance",
  type: "THINK_YOURSELF",
  order: 3,
  title: { en: "3. Think Yourself Diagnostic", ru: "3. Диагностика: Подумайте Сам" },
  instructions: {
    en: "Formulate your initial hypothesis: Why does bulk delivery via sendBatch() report exactly 2× the expected deliveryCount?",
    ru: "Сформулируйте гипотезу: почему массовая доставка через sendBatch() показывает ровно в 2 раза больший deliveryCount?"
  }
};

const stage4: BaseMissionStage = {
  id: "stg_comp_help",
  missionId: "mis_composition_over_inheritance",
  type: "NEED_HELP",
  order: 4,
  title: { en: "4. Knowledge Bridge", ru: "4. Мост к Знаниям" },
  instructions: {
    en: "No-penalty transition to composition theory, fragile base class mechanics, and strategy/delegate forwarding patterns.",
    ru: "Бесштрафной переход к теории композиции, проблеме хрупкого базового класса и паттерну стратегий/делегатов."
  }
};

const stage5: TheoryStage = {
  id: "stg_comp_theory",
  missionId: "mis_composition_over_inheritance",
  type: "THEORY",
  order: 5,
  title: { en: "5. Core Theory & Checkpoints", ru: "5. Фундаментальная Теория и Проверки" },
  instructions: {
    en: "Study the 3 theory sections explaining composition over inheritance, fragile base class traps, and composing EmailSender/SmsSender strategies.",
    ru: "Изучите 3 раздела теории о композиции вместо наследования, ловушках хрупкого базового класса и композиции стратегий EmailSender/SmsSender."
  },
  theoryArticleId: "art_theory_composition"
};

const stage6: BaseMissionStage = {
  id: "stg_comp_visual",
  missionId: "mis_composition_over_inheritance",
  type: "VISUALIZATION",
  order: 6,
  title: { en: "6. Interactive Call-Chain Visualization", ru: "6. Визуализация Цепочки Вызовов" },
  instructions: {
    en: "Trace how NotificationService.sendBatch() internally invokes send() for each recipient, causing subclass counters to increment twice.",
    ru: "Проследите, как NotificationService.sendBatch() внутренне вызывает send() для каждого получателя, из-за чего счетчик в подклассе увеличивается дважды."
  }
};

const stage7: PracticeStage = {
  id: "stg_comp_practice",
  missionId: "mis_composition_over_inheritance",
  type: "INTERACTIVE_PRACTICE",
  order: 7,
  title: { en: "7. Guided Practice: Fix Builder", ru: "7. Практика: Конструктор Исправления" },
  instructions: {
    en: "Select production-safe structural elements to replace NotificationService inheritance with composition of EmailSender and SmsSender strategies.",
    ru: "Выберите безопасные элементы для замены наследования NotificationService композицией стратегий EmailSender и SmsSender."
  },
  challengeId: "chl_comp_fix_builder"
};

const stage8: InterviewStage = {
  id: "stg_comp_interview_q",
  missionId: "mis_composition_over_inheritance",
  type: "INTERVIEW_QUESTION",
  order: 8,
  title: { en: "8. Senior Interview Scenario", ru: "8. Сценарий Senior-Интервью" },
  instructions: {
    en: "Review the authentic senior interview question about EmailNotificationService double-counted deliveries and fragile base class inheritance.",
    ru: "Ознакомьтесь с реальным Senior-вопросом о двойном подсчете доставок EmailNotificationService и хрупком наследовании базового класса."
  },
  interviewQuestionId: "q_comp_notification_01",
  challengeId: "chl_comp_interview_answer"
};

const stage9: InterviewStage = {
  id: "stg_comp_interview_a",
  missionId: "mis_composition_over_inheritance",
  type: "INTERVIEW_ANSWER",
  order: 9,
  title: { en: "9. Interview Verbal Answer", ru: "9. Устный Ответ и Модель" },
  instructions: {
    en: "Formulate your 90-second structured verbal response (Elevator Pitch + Mechanics + Trade-offs) and submit for evaluation.",
    ru: "Сформулируйте структурированный 90-секундный ответ (Elevator Pitch + Механика + Компромиссы) и отправьте на проверку."
  },
  interviewQuestionId: "q_comp_notification_01",
  challengeId: "chl_comp_interview_answer"
};

const stage10: PracticeStage = {
  id: "stg_comp_debug",
  missionId: "mis_composition_over_inheritance",
  type: "DEBUG_COUNTER_EXAMPLE",
  order: 10,
  title: { en: "10. Applied Bug Hunt: EmailNotificationService", ru: "10. Поиск Бага: EmailNotificationService" },
  instructions: {
    en: "Identify the line(s) in the code viewer where send() and sendBatch() both increment deliveryCount.",
    ru: "Найдите строку(и) в редакторе кода, где send() и sendBatch() оба увеличивают deliveryCount."
  },
  challengeId: "chl_comp_bughunt"
};

const stage11: BaseMissionStage = {
  id: "stg_comp_related",
  missionId: "mis_composition_over_inheritance",
  type: "RELATED_TOPICS",
  order: 11,
  title: { en: "11. Related Knowledge & Follow-ups", ru: "11. Связанные Знания и Вопросы" },
  instructions: {
    en: "Review 10+ senior interview follow-up questions and explore connections across Composition, Strategy, Decorator, and SOLID principles.",
    ru: "Изучите 10+ вопросов Senior-уровня и исследуйте связи с Композицией, Strategy, Decorator и SOLID."
  }
};

const stage12: BaseMissionStage = {
  id: "stg_comp_results",
  missionId: "mis_composition_over_inheritance",
  type: "MISSION_RESULTS",
  order: 12,
  title: { en: "12. Performance & Mistakes Summary", ru: "12. Итоги и Разбор Ошибок" },
  instructions: {
    en: "Review performance metrics and common candidate mistakes around inheriting from concrete platform base classes.",
    ru: "Просмотрите метрики прохождения и распространенные ошибки кандидатов при наследовании конкретных платформенных базовых классов."
  }
};

const stage13: BaseMissionStage = {
  id: "stg_comp_reflection",
  missionId: "mis_composition_over_inheritance",
  type: "REFLECTION",
  order: 13,
  title: { en: "13. Production Engineering Reflection", ru: "13. Инженерная Рефлексия" },
  instructions: {
    en: "Write a 1-sentence reflection on which composition-over-inheritance rule you will enforce in code reviews.",
    ru: "Напишите 1 предложение о том, какое правило композиции вместо наследования вы введете на код-ревью."
  }
};

export const COMPOSITION_MISSION_STAGES: readonly MissionStage[] = [
  stage1, stage2, stage3, stage4, stage5, stage6, stage7, stage8, stage9, stage10, stage11, stage12, stage13
];

export const COMPOSITION_MISSION: Mission = {
  id: "mis_composition_over_inheritance",
  primaryTopicId: "top_oop_16",
  secondaryTopicIds: ["top_oop_10", "top_oop_18", "top_oop_31"],
  slug: "notification-service-fragile-base-class",
  title: {
    en: "Double-Counted Deliveries: Composition over Inheritance in NotificationService",
    ru: "Двойной Подсчет Доставок: Композиция вместо Наследования в NotificationService"
  },
  description: {
    en: "Diagnose why a notifications microservice reports 2× delivery metrics after sendBatch(), then refactor from fragile NotificationService inheritance to composition with EmailSender and SmsSender strategies.",
    ru: "Диагностируйте, почему микросервис уведомлений показывает метрики в 2 раза больше после sendBatch(), и выполните рефакторинг с хрупкого наследования NotificationService на композицию стратегий EmailSender и SmsSender."
  },
  scenarioIntroduction: {
    en: "At 09:15 UTC the notifications ops dashboard flagged a critical delivery metrics mismatch. EmailNotificationService — extended from the concrete NotificationService base to track deliveryCount — reported exactly double the expected deliveries after a batch of 50,000 Notification records was sent via sendBatch(). The incident began immediately after a platform upgrade changed NotificationService.sendBatch() internals. SMS channel metrics broke the same way.",
    ru: "В 09:15 UTC дашборд ops уведомлений зафиксировал критическое расхождение метрик доставки. EmailNotificationService — подкласс конкретного NotificationService для отслеживания deliveryCount — показал ровно вдвое больше ожидаемых доставок после отправки 50 000 Notification через sendBatch(). Инцидент начался сразу после обновления платформы, изменившего внутренности NotificationService.sendBatch(). Метрики SMS сломались так же."
  },
  engineeringProblem: {
    en: "The team extended the concrete NotificationService to create EmailNotificationService. It overrode send() to increment deliveryCount and also overrode sendBatch() to add batch.size() before calling super.sendBatch(). Because NotificationService.sendBatch() internally invokes send() for every recipient, each delivery was counted twice — once in sendBatch() and again in send(). A platform upgrade changed NotificationService.sendBatch() internals, silently breaking email and SMS metrics. The fix is composition: NotificationDispatcher (or CountingNotificationService) wraps EmailSender and SmsSender strategies — do NOT extend concrete NotificationService.",
    ru: "Команда расширила конкретный NotificationService, создав EmailNotificationService. Переопределили send() для увеличения deliveryCount и sendBatch() для добавления batch.size() перед super.sendBatch(). Поскольку NotificationService.sendBatch() внутренне вызывает send() для каждого получателя, каждая доставка считалась дважды — в sendBatch() и снова в send(). Обновление платформы изменило внутренности sendBatch(), тихо сломав метрики email и SMS. Фикс — композиция: NotificationDispatcher (или CountingNotificationService) оборачивает стратегии EmailSender и SmsSender — НЕ расширяйте конкретный NotificationService."
  },
  learningObjectives: [
    {
      en: "Explain why subclassing concrete base classes not designed for inheritance breaks encapsulation and creates fragile base class dependencies",
      ru: "Объяснить, почему наследование конкретных базовых классов, не спроектированных для расширения, нарушает инкапсуляцию и создает зависимость от хрупкого базового класса"
    },
    {
      en: "Diagnose double-counting bugs caused by overriding both single-element and bulk methods when the base class delegates bulk to single (sendBatch → send)",
      ru: "Диагностировать баги двойного подсчета при переопределении одиночных и массовых методов, когда базовый класс делегирует массовый вызов одиночному (sendBatch → send)"
    },
    {
      en: "Refactor EmailNotificationService into a composing dispatcher that delegates to EmailSender and SmsSender strategies without inheriting NotificationService implementation",
      ru: "Рефакторить EmailNotificationService в композирующий диспетчер, делегирующий стратегиям EmailSender и SmsSender без наследования реализации NotificationService"
    },
    {
      en: "Apply Effective Java Item 18: favor composition over inheritance for extending behavior of concrete classes not designed for extension",
      ru: "Применить Effective Java Item 18: предпочитать композицию наследованию при расширении поведения конкретных классов, не спроектированных для расширения"
    }
  ],
  requiredConceptIds: ["cpt_composition_over_inheritance", "cpt_fragile_base_class"],
  recommendedConceptIds: ["cpt_encapsulation", "cpt_liskov_substitution"],
  stageIds: COMPOSITION_MISSION_STAGES.map((s) => s.id),
  challengeIds: ["chl_comp_fix_builder", "chl_comp_bughunt", "chl_comp_interview_answer"],
  estimatedMinutes: 25,
  difficulty: "SENIOR",
  xpReward: 250,
  version: "1.0.0"
};
