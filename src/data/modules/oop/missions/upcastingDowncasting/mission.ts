import { Mission, MissionStage, TheoryStage, PracticeStage, InterviewStage, BaseMissionStage } from '../../../../../types/domain';

const stage1: BaseMissionStage = {
  id: "stg_cast_intro",
  missionId: "mis_upcasting_downcasting",
  type: "MISSION_INTRODUCTION",
  order: 1,
  title: { en: "1. Mission Introduction", ru: "1. Введение в Миссию" },
  instructions: {
    en: "Inspect the 02:00 production incident where FraudInvestigationService threw ClassCastException after ACH fraud events entered the pipeline that only downcast to CardFraudEvent / WireFraudEvent.",
    ru: "Изучите инцидент в 02:00 на продакшене, где FraudInvestigationService бросил ClassCastException после того, как ACH fraud-события попали в pipeline, который downcast'ит только к CardFraudEvent / WireFraudEvent."
  }
};

const stage2: BaseMissionStage = {
  id: "stg_cast_problem",
  missionId: "mis_upcasting_downcasting",
  type: "REAL_ENGINEERING_PROBLEM",
  order: 2,
  title: { en: "2. Real Engineering Problem", ru: "2. Реальная Инженерная Проблема" },
  instructions: {
    en: "Examine FraudInvestigationService.investigate(FraudEvent) — unsafe (CardFraudEvent) / (WireFraudEvent) casts without runtime checks crash when AchFraudEvent arrives.",
    ru: "Изучите FraudInvestigationService.investigate(FraudEvent) — небезопасные cast'ы (CardFraudEvent) / (WireFraudEvent) без runtime-проверок падают, когда приходит AchFraudEvent."
  }
};

const stage3: BaseMissionStage = {
  id: "stg_cast_think",
  missionId: "mis_upcasting_downcasting",
  type: "THINK_YOURSELF",
  order: 3,
  title: { en: "3. Think Yourself Diagnostic", ru: "3. Диагностика: Подумайте Сам" },
  instructions: {
    en: "Formulate your hypothesis: Why does upcasting FraudEvent compile for AchFraudEvent, yet a blind downcast to CardFraudEvent throws ClassCastException at 02:00?",
    ru: "Сформулируйте гипотезу: почему upcast к FraudEvent компилируется для AchFraudEvent, но слепой downcast к CardFraudEvent бросает ClassCastException в 02:00?"
  }
};

const stage4: BaseMissionStage = {
  id: "stg_cast_help",
  missionId: "mis_upcasting_downcasting",
  type: "NEED_HELP",
  order: 4,
  title: { en: "4. Need Knowledge Bridge", ru: "4. Мост к Знаниям" },
  instructions: {
    en: "No-penalty bridge to upcasting vs downcasting, ClassCastException, Java 17 pattern matching instanceof, and polymorphic extractEvidence().",
    ru: "Бесштрафной переход к upcasting vs downcasting, ClassCastException, pattern matching instanceof в Java 17 и полиморфному extractEvidence()."
  }
};

const stage5: TheoryStage = {
  id: "stg_cast_theory",
  missionId: "mis_upcasting_downcasting",
  type: "THEORY",
  order: 5,
  title: { en: "5. Core Theory & Checkpoints", ru: "5. Фундаментальная Теория и Проверки" },
  instructions: {
    en: "Study the 4 theory sections covering upcasting, unsafe downcasts, pattern matching instanceof, and polymorphic alternatives that eliminate casts.",
    ru: "Изучите 4 раздела теории об upcasting, небезопасных downcast, pattern matching instanceof и полиморфных альтернативах без cast'ов."
  },
  theoryArticleId: "art_theory_upcasting_downcasting"
};

const stage6: BaseMissionStage = {
  id: "stg_cast_visual",
  missionId: "mis_upcasting_downcasting",
  type: "VISUALIZATION",
  order: 6,
  title: { en: "6. Interactive Cast Safety Visualization", ru: "6. Визуализация Безопасности Cast'ов" },
  instructions: {
    en: "Compare blind (CardFraudEvent) event downcasts against pattern matching instanceof and FraudEvent.extractEvidence() polymorphic dispatch.",
    ru: "Сравните слепые downcast'ы (CardFraudEvent) event с pattern matching instanceof и полиморфной диспетчеризацией FraudEvent.extractEvidence()."
  }
};

const stage7: PracticeStage = {
  id: "stg_cast_practice",
  missionId: "mis_upcasting_downcasting",
  type: "INTERACTIVE_PRACTICE",
  order: 7,
  title: { en: "7. Guided Practice: Fix Builder", ru: "7. Практика: Конструктор Исправления" },
  instructions: {
    en: "Assemble the structural code elements required to make FraudInvestigationService safe for Card, Wire, and ACH fraud events.",
    ru: "Соберите элементы кода, чтобы FraudInvestigationService безопасно обрабатывал Card, Wire и ACH fraud-события."
  },
  challengeId: "chl_cast_fix_builder"
};

const stage8: InterviewStage = {
  id: "stg_cast_interview_q",
  missionId: "mis_upcasting_downcasting",
  type: "INTERVIEW_QUESTION",
  order: 8,
  title: { en: "8. Senior Interview Scenario", ru: "8. Сценарий Senior-Интервью" },
  instructions: {
    en: "Review the authentic senior interview question about ClassCastException from unsafe downcasts in a fraud investigation service.",
    ru: "Ознакомьтесь с реальным вопросом Senior-собеседования о ClassCastException из небезопасных downcast в сервисе расследования мошенничества."
  },
  interviewQuestionId: "q_cast_fraud_01",
  challengeId: "chl_cast_interview_answer"
};

const stage9: InterviewStage = {
  id: "stg_cast_interview_a",
  missionId: "mis_upcasting_downcasting",
  type: "INTERVIEW_ANSWER",
  order: 9,
  title: { en: "9. Interview Verbal Answer", ru: "9. Устный Ответ и Модель" },
  instructions: {
    en: "Formulate your structured verbal response (Elevator Pitch + Cast Mechanics + Production Trade-offs) and submit for evaluation.",
    ru: "Сформулируйте структурированный ответ (Elevator Pitch + Механика Cast'ов + Продакшн-компромиссы) и отправьте на проверку."
  },
  interviewQuestionId: "q_cast_fraud_01",
  challengeId: "chl_cast_interview_answer"
};

const stage10: PracticeStage = {
  id: "stg_cast_debug",
  missionId: "mis_upcasting_downcasting",
  type: "DEBUG_COUNTER_EXAMPLE",
  order: 10,
  title: { en: "10. Applied Bug Hunt: Unsafe Downcast", ru: "10. Поиск Бага: Небезопасный Downcast" },
  instructions: {
    en: "Identify the line(s) in FraudInvestigationService where a blind (CardFraudEvent) cast throws ClassCastException on AchFraudEvent.",
    ru: "Найдите строку(и) в FraudInvestigationService, где слепой cast (CardFraudEvent) бросает ClassCastException на AchFraudEvent."
  },
  challengeId: "chl_cast_bughunt"
};

const stage11: BaseMissionStage = {
  id: "stg_cast_related",
  missionId: "mis_upcasting_downcasting",
  type: "RELATED_TOPICS",
  order: 11,
  title: { en: "11. Related Knowledge Nodes", ru: "11. Связанные Узлы Знаний" },
  instructions: {
    en: "Explore lateral graph connections to polymorphism, method overriding, and abstraction that eliminate cast-heavy designs.",
    ru: "Исследуйте связи Графа Знаний к полиморфизму, переопределению методов и абстракции, устраняющим designs с обилием cast'ов."
  }
};

const stage12: BaseMissionStage = {
  id: "stg_cast_results",
  missionId: "mis_upcasting_downcasting",
  type: "MISSION_RESULTS",
  order: 12,
  title: { en: "12. Mission Performance Summary", ru: "12. Итоги Прохождения Миссии" },
  instructions: {
    en: "Review your performance metrics, concepts strengthened, and XP awarded.",
    ru: "Просмотрите метрики прохождения, укрепившиеся концепции и заработанный XP."
  }
};

const stage13: BaseMissionStage = {
  id: "stg_cast_reflection",
  missionId: "mis_upcasting_downcasting",
  type: "REFLECTION",
  order: 13,
  title: { en: "13. Engineering Reflection", ru: "13. Инженерная Рефлексия" },
  instructions: {
    en: "Write a 1-sentence reflection on when you will reject a blind downcast of FraudEvent (or similar base type) in code review.",
    ru: "Напишите 1 предложение о том, когда на код-ревью вы отклоните слепой downcast FraudEvent (или похожего базового типа)."
  }
};

export const UPCASTING_DOWNCASTING_MISSION_STAGES: readonly MissionStage[] = [
  stage1, stage2, stage3, stage4, stage5, stage6, stage7, stage8, stage9, stage10, stage11, stage12, stage13
];

export const UPCASTING_DOWNCASTING_MISSION: Mission = {
  id: "mis_upcasting_downcasting",
  primaryTopicId: "top_oop_13",
  secondaryTopicIds: ["top_oop_11", "top_oop_15", "top_oop_07"],
  slug: "unsafe-fraud-event-cast",
  title: {
    en: "ClassCastException at 02:00: Unsafe Downcasts in FraudInvestigationService",
    ru: "ClassCastException в 02:00: Небезопасные Downcast в FraudInvestigationService"
  },
  description: {
    en: "Fix FraudInvestigationService that accepts FraudEvent but blindly casts to CardFraudEvent / WireFraudEvent — AchFraudEvent triggers ClassCastException at 02:00. Prefer Java 17 pattern matching instanceof or, better, polymorphic extractEvidence() that eliminates casts.",
    ru: "Исправьте FraudInvestigationService, принимающий FraudEvent, но слепо кастящий к CardFraudEvent / WireFraudEvent — AchFraudEvent вызывает ClassCastException в 02:00. Предпочтительнее pattern matching instanceof в Java 17 или, ещё лучше, полиморфный extractEvidence() без cast'ов."
  },
  scenarioIntroduction: {
    en: "02:00 paging: FraudInvestigationService NPE/ClassCastException storm after ACH fraud detection went live. The service API takes FraudEvent (safe upcast from CardFraudEvent, WireFraudEvent, AchFraudEvent), but investigate() still does `(CardFraudEvent) event` and `(WireFraudEvent) event` based on a fragile channel string. When AchFraudEvent arrives, the JVM throws ClassCastException — investigations halt, SAR timers tick, and compliance escalates. The root cause is not 'ACH is weird' — it is an unsafe downcast that assumed only two concrete subtypes forever.",
    ru: "Пейджинг в 02:00: шторм ClassCastException в FraudInvestigationService после запуска ACH fraud detection. API сервиса принимает FraudEvent (безопасный upcast из CardFraudEvent, WireFraudEvent, AchFraudEvent), но investigate() всё ещё делает `(CardFraudEvent) event` и `(WireFraudEvent) event` по хрупкой строке канала. Когда приходит AchFraudEvent, JVM бросает ClassCastException — расследования останавливаются, таймеры SAR тикают, compliance эскалирует. Корневая причина не в «странном ACH» — в небезопасном downcast, предполагавшем только два конкретных подтипа навсегда."
  },
  engineeringProblem: {
    en: "FraudInvestigationService.investigate(FraudEvent event) upcasts concrete events to FraudEvent at the boundary (correct), then downcasts without instanceof to CardFraudEvent / WireFraudEvent to read panLast4 / wireReference. AchFraudEvent shares FraudEvent but is neither Card nor Wire — ClassCastException. Interim fix: Java 17 pattern matching `if (event instanceof CardFraudEvent card)`. Production-grade fix: abstract FraudEvent.extractEvidence() overridden by CardFraudEvent, WireFraudEvent, AchFraudEvent so the service never casts.",
    ru: "FraudInvestigationService.investigate(FraudEvent event) на границе upcast'ит конкретные события к FraudEvent (правильно), затем downcast'ит без instanceof к CardFraudEvent / WireFraudEvent, чтобы читать panLast4 / wireReference. AchFraudEvent разделяет FraudEvent, но не является ни Card, ни Wire — ClassCastException. Временный фикс: pattern matching Java 17 `if (event instanceof CardFraudEvent card)`. Продакшн-фикс: абстрактный FraudEvent.extractEvidence(), переопределённый в CardFraudEvent, WireFraudEvent, AchFraudEvent, чтобы сервис вообще не кастил."
  },
  learningObjectives: [
    {
      en: "Distinguish safe upcasting (subtype → FraudEvent) from runtime-checked downcasting that can throw ClassCastException",
      ru: "Различать безопасный upcasting (подтип → FraudEvent) и runtime-проверяемый downcasting, способный бросить ClassCastException"
    },
    {
      en: "Apply Java 17 pattern matching instanceof to bind CardFraudEvent / WireFraudEvent / AchFraudEvent safely",
      ru: "Применять pattern matching instanceof Java 17 для безопасной привязки CardFraudEvent / WireFraudEvent / AchFraudEvent"
    },
    {
      en: "Prefer polymorphic extractEvidence() on FraudEvent over cast chains that grow with every fraud rail",
      ru: "Предпочитать полиморфный extractEvidence() на FraudEvent цепочкам cast'ов, растущим с каждым fraud-рейлом"
    },
    {
      en: "Diagnose ClassCastException root causes when a new AchFraudEvent subtype enters a cast-heavy investigation pipeline",
      ru: "Диагностировать корневые причины ClassCastException, когда новый подтип AchFraudEvent входит в pipeline с обилием cast'ов"
    }
  ],
  requiredConceptIds: ["cpt_upcasting", "cpt_downcasting"],
  recommendedConceptIds: ["cpt_polymorphism", "cpt_type_switch_smell"],
  stageIds: UPCASTING_DOWNCASTING_MISSION_STAGES.map((s) => s.id),
  challengeIds: ["chl_cast_fix_builder", "chl_cast_bughunt", "chl_cast_interview_answer"],
  estimatedMinutes: 25,
  difficulty: "SENIOR",
  xpReward: 250,
  version: "1.0.0"
};
