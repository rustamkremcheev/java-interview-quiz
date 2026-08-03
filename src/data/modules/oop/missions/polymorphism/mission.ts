import { Mission, MissionStage, TheoryStage, PracticeStage, InterviewStage, BaseMissionStage } from '../../../../../types/domain';

const stage1: BaseMissionStage = {
  id: "stg_poly_intro",
  missionId: "mis_polymorphism",
  type: "MISSION_INTRODUCTION",
  order: 1,
  title: { en: "1. Mission Introduction", ru: "1. Введение в Миссию" },
  instructions: {
    en: "Inspect the production incident below where TransactionPipeline rejected InstantTransaction payments after a hurried Instant rail launch — the giant instanceof chain was never updated.",
    ru: "Изучите инцидент на продакшене, где TransactionPipeline отклонил платежи InstantTransaction после срочного запуска Instant-рейла — гигантская цепочка instanceof так и не была обновлена."
  }
};

const stage2: BaseMissionStage = {
  id: "stg_poly_problem",
  missionId: "mis_polymorphism",
  type: "REAL_ENGINEERING_PROBLEM",
  order: 2,
  title: { en: "2. Real Engineering Problem", ru: "2. Реальная Инженерная Проблема" },
  instructions: {
    en: "Examine TransactionPipeline.process — a growing instanceof / type-switch over CardTransaction, WireTransaction, AchTransaction. Adding InstantTransaction forces editing the pipeline itself.",
    ru: "Изучите TransactionPipeline.process — растущий instanceof / type-switch по CardTransaction, WireTransaction, AchTransaction. Добавление InstantTransaction вынуждает править сам pipeline."
  }
};

const stage3: BaseMissionStage = {
  id: "stg_poly_think",
  missionId: "mis_polymorphism",
  type: "THINK_YOURSELF",
  order: 3,
  title: { en: "3. Think Yourself Diagnostic", ru: "3. Диагностика: Подумайте Сам" },
  instructions: {
    en: "Formulate your hypothesis: Why did InstantTransaction fail at runtime even though the type hierarchy already exists, and why does every new Transaction subtype force a modification of TransactionPipeline?",
    ru: "Сформулируйте гипотезу: почему InstantTransaction падает в runtime, хотя иерархия типов уже есть, и почему каждый новый подтип Transaction вынуждает менять TransactionPipeline?"
  }
};

const stage4: BaseMissionStage = {
  id: "stg_poly_help",
  missionId: "mis_polymorphism",
  type: "NEED_HELP",
  order: 4,
  title: { en: "4. Need Knowledge Bridge", ru: "4. Мост к Знаниям" },
  instructions: {
    en: "No-penalty bridge to subtype polymorphism, the type-switch smell, and substitutable TransactionHandler / process() design.",
    ru: "Бесштрафной переход к полиморфизму подтипов, smell type-switch и дизайну подставляемых TransactionHandler / process()."
  }
};

const stage5: TheoryStage = {
  id: "stg_poly_theory",
  missionId: "mis_polymorphism",
  type: "THEORY",
  order: 5,
  title: { en: "5. Core Theory & Checkpoints", ru: "5. Фундаментальная Теория и Проверки" },
  instructions: {
    en: "Study the 4 theory sections covering design-level polymorphism, type-switch smell, process()/visitor/registry alternatives, and senior interview follow-ups.",
    ru: "Изучите 4 раздела теории о design-level полиморфизме, smell type-switch, альтернативах process()/visitor/registry и доп. вопросах Senior-интервью."
  },
  theoryArticleId: "art_theory_polymorphism"
};

const stage6: BaseMissionStage = {
  id: "stg_poly_visual",
  missionId: "mis_polymorphism",
  type: "VISUALIZATION",
  order: 6,
  title: { en: "6. Interactive Polymorphism Visualization", ru: "6. Визуализация Полиморфизма" },
  instructions: {
    en: "Compare the brittle instanceof explosion in TransactionPipeline against polymorphic Transaction.process() (or accept(handler)) where Card/Wire/Ach/Instant supply their own behavior.",
    ru: "Сравните хрупкий взрыв instanceof в TransactionPipeline с полиморфным Transaction.process() (или accept(handler)), где Card/Wire/Ach/Instant дают своё поведение."
  }
};

const stage7: PracticeStage = {
  id: "stg_poly_practice",
  missionId: "mis_polymorphism",
  type: "INTERACTIVE_PRACTICE",
  order: 7,
  title: { en: "7. Guided Practice: Fix Builder", ru: "7. Практика: Конструктор Исправления" },
  instructions: {
    en: "Assemble the structural code elements required to replace TransactionPipeline's instanceof chain with polymorphic process() / handler registry.",
    ru: "Соберите элементы кода для замены цепочки instanceof в TransactionPipeline на полиморфный process() / handler registry."
  },
  challengeId: "chl_poly_fix_builder"
};

const stage8: InterviewStage = {
  id: "stg_poly_interview_q",
  missionId: "mis_polymorphism",
  type: "INTERVIEW_QUESTION",
  order: 8,
  title: { en: "8. Senior Interview Scenario", ru: "8. Сценарий Senior-Интервью" },
  instructions: {
    en: "Review the authentic senior interview question about refactoring a growing TransactionPipeline type switch with design-level polymorphism.",
    ru: "Ознакомьтесь с реальным вопросом Senior-собеседования о рефакторинге растущего type switch в TransactionPipeline через design-level полиморфизм."
  },
  interviewQuestionId: "q_poly_txn_01",
  challengeId: "chl_poly_interview_answer"
};

const stage9: InterviewStage = {
  id: "stg_poly_interview_a",
  missionId: "mis_polymorphism",
  type: "INTERVIEW_ANSWER",
  order: 9,
  title: { en: "9. Interview Verbal Answer", ru: "9. Устный Ответ и Модель" },
  instructions: {
    en: "Formulate your structured verbal response (Elevator Pitch + Polymorphism Mechanics + Production Trade-offs) and submit for evaluation.",
    ru: "Сформулируйте структурированный ответ (Elevator Pitch + Механика Полиморфизма + Продакшн Компромиссы) и отправьте на проверку."
  },
  interviewQuestionId: "q_poly_txn_01",
  challengeId: "chl_poly_interview_answer"
};

const stage10: PracticeStage = {
  id: "stg_poly_debug",
  missionId: "mis_polymorphism",
  type: "DEBUG_COUNTER_EXAMPLE",
  order: 10,
  title: { en: "10. Applied Bug Hunt: Missing Instant Branch", ru: "10. Поиск Бага: Пропущенная Ветка Instant" },
  instructions: {
    en: "Identify the line(s) in TransactionPipeline where InstantTransaction is not handled (or wrongly routed) by the instanceof chain.",
    ru: "Найдите строку(и) в TransactionPipeline, где InstantTransaction не обрабатывается (или неверно маршрутизируется) цепочкой instanceof."
  },
  challengeId: "chl_poly_bughunt"
};

const stage11: BaseMissionStage = {
  id: "stg_poly_related",
  missionId: "mis_polymorphism",
  type: "RELATED_TOPICS",
  order: 11,
  title: { en: "11. Related Knowledge Nodes", ru: "11. Связанные Узлы Знаний" },
  instructions: {
    en: "Explore lateral graph connections to inheritance, dynamic dispatch (mechanism), and Strategy (algorithm family) — keep the design-level polymorphism focus.",
    ru: "Исследуйте связи Графа Знаний к наследованию, dynamic dispatch (механизм) и Strategy (семейство алгоритмов) — сохраняя фокус на design-level полиморфизме."
  }
};

const stage12: BaseMissionStage = {
  id: "stg_poly_results",
  missionId: "mis_polymorphism",
  type: "MISSION_RESULTS",
  order: 12,
  title: { en: "12. Mission Performance Summary", ru: "12. Итоги Прохождения Миссии" },
  instructions: {
    en: "Review your performance metrics, concepts strengthened, and XP awarded.",
    ru: "Просмотрите метрики прохождения, укрепившиеся концепции и заработанный XP."
  }
};

const stage13: BaseMissionStage = {
  id: "stg_poly_reflection",
  missionId: "mis_polymorphism",
  type: "REFLECTION",
  order: 13,
  title: { en: "13. Engineering Reflection", ru: "13. Инженерная Рефлексия" },
  instructions: {
    en: "Write a 1-sentence reflection on when you will reject a growing instanceof chain in TransactionPipeline code review in favor of polymorphic process()/handlers.",
    ru: "Напишите 1 предложение о том, когда на код-ревью вы отклоните растущую цепочку instanceof в TransactionPipeline в пользу полиморфного process()/handlers."
  }
};

export const POLYMORPHISM_MISSION_STAGES: readonly MissionStage[] = [
  stage1, stage2, stage3, stage4, stage5, stage6, stage7, stage8, stage9, stage10, stage11, stage12, stage13
];

export const POLYMORPHISM_MISSION: Mission = {
  id: "mis_polymorphism",
  primaryTopicId: "top_oop_11",
  secondaryTopicIds: ["top_oop_10", "top_oop_12", "top_oop_26"],
  slug: "instanceof-transaction-pipeline",
  title: {
    en: "The Growing Type Switch: Polymorphism in TransactionPipeline",
    ru: "Растущий Type Switch: Полиморфизм в TransactionPipeline"
  },
  description: {
    en: "Refactor TransactionPipeline's giant instanceof chain over CardTransaction, WireTransaction, and AchTransaction — adding InstantTransaction forces pipeline edits and silently rejects Instant rail payments when a branch is missing. Focus on design-level substitutable handlers, not JVM megamorphic call sites.",
    ru: "Отрефакторьте гигантскую цепочку instanceof в TransactionPipeline по CardTransaction, WireTransaction и AchTransaction — добавление InstantTransaction вынуждает править pipeline и молча отклоняет Instant-платежи при пропущенной ветке. Фокус на design-level подставляемых handlers, не на JVM megamorphic call sites."
  },
  scenarioIntroduction: {
    en: "Product launched Instant rail overnight. Domain already had InstantTransaction in the hierarchy, but TransactionPipeline still type-switches Card / Wire / Ach. Monday morning, Instant payments hit the else branch — FAILED or wrongly settled as ACH. Ops blames 'bad Instant config'. The root cause is design: a pipeline that inspects concrete types instead of asking each Transaction (or registered handler) to process itself.",
    ru: "Продукт запустил Instant-рейл за ночь. В иерархии уже был InstantTransaction, но TransactionPipeline всё ещё type-switch'ит Card / Wire / Ach. В понедельник Instant-платежи попадают в else — FAILED или неверно settle как ACH. Ops винит «плохой конфиг Instant». Корневая причина в дизайне: pipeline инспектирует конкретные типы вместо того, чтобы просить каждый Transaction (или зарегистрированный handler) обработать себя."
  },
  engineeringProblem: {
    en: "TransactionPipeline.process(Transaction) grows an instanceof chain (CardTransaction, WireTransaction, AchTransaction). Each rail has different clearing, cutoffs, and settlement. Adding InstantTransaction requires editing the pipeline — classic type-switch smell. A missing Instant branch rejects Instant rail volume or mis-routes it. Solution: polymorphic Transaction.process(PipelineContext) / accept(TransactionHandler), or a handler map keyed by type without instanceof sprawl in the hot path — design-level substitutability, not invokevirtual megamorphism tuning.",
    ru: "TransactionPipeline.process(Transaction) растёт цепочкой instanceof (CardTransaction, WireTransaction, AchTransaction). У каждого рейла свои clearing, cutoffs и settlement. Добавление InstantTransaction требует правки pipeline — классический smell type-switch. Пропущенная ветка Instant отклоняет Instant-объём или неверно маршрутизирует. Решение: полиморфный Transaction.process(PipelineContext) / accept(TransactionHandler) или handler map по типу без sprawl instanceof в горячем пути — design-level подставляемость, не тюнинг megamorphism invokevirtual."
  },
  learningObjectives: [
    {
      en: "Recognize growing instanceof / type-switch chains as a polymorphism smell that couples pipelines to concrete subtypes",
      ru: "Распознавать растущие цепочки instanceof / type-switch как smell полиморфизма, связывающий pipeline с конкретными подтипами"
    },
    {
      en: "Replace type inspection with substitutable process() on Transaction or visitor-style TransactionHandler registry",
      ru: "Заменить инспекцию типов на подставляемый process() у Transaction или visitor-style registry TransactionHandler"
    },
    {
      en: "Explain design-level polymorphism vs Strategy (algorithm family) vs dynamic-dispatch bytecode mechanics",
      ru: "Объяснить design-level полиморфизм vs Strategy (семейство алгоритмов) vs механика байткода dynamic-dispatch"
    },
    {
      en: "Diagnose missing-branch bugs when a new InstantTransaction subtype is added without updating the type switch",
      ru: "Диагностировать баги пропущенной ветки, когда новый подтип InstantTransaction добавлен без обновления type switch"
    }
  ],
  requiredConceptIds: ["cpt_polymorphism", "cpt_type_switch_smell"],
  recommendedConceptIds: ["cpt_open_closed", "cpt_interface_contracts", "cpt_liskov_substitution"],
  stageIds: POLYMORPHISM_MISSION_STAGES.map((s) => s.id),
  challengeIds: ["chl_poly_fix_builder", "chl_poly_bughunt", "chl_poly_interview_answer"],
  estimatedMinutes: 25,
  difficulty: "SENIOR",
  xpReward: 250,
  version: "1.0.0"
};
