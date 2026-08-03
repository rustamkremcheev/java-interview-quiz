import { Mission, MissionStage, TheoryStage, PracticeStage, InterviewStage, BaseMissionStage } from '../../../../../types/domain';

const stage1: BaseMissionStage = {
  id: "stg_co_intro",
  missionId: "mis_classes_objects",
  type: "MISSION_INTRODUCTION",
  order: 1,
  title: { en: "1. Mission Introduction", ru: "1. Введение в Миссию" },
  instructions: {
    en: "Inspect the production incident where PaymentImporter reused one mutable PaymentInstruction across a CSV batch — every batch row ended with the last row's values.",
    ru: "Изучите инцидент, где PaymentImporter переиспользовал один мутабельный PaymentInstruction на весь CSV-батч — каждая строка батча получила значения последней строки."
  }
};

const stage2: BaseMissionStage = {
  id: "stg_co_problem",
  missionId: "mis_classes_objects",
  type: "REAL_ENGINEERING_PROBLEM",
  order: 2,
  title: { en: "2. Real Engineering Problem", ru: "2. Реальная Инженерная Проблема" },
  instructions: {
    en: "Examine PaymentImporter holding a single draft PaymentInstruction, mutating fields per CSV row, and adding the same reference into PaymentBatch.",
    ru: "Изучите PaymentImporter с одним draft PaymentInstruction, мутацией полей на каждую CSV-строку и добавлением той же ссылки в PaymentBatch."
  }
};

const stage3: BaseMissionStage = {
  id: "stg_co_think",
  missionId: "mis_classes_objects",
  type: "THINK_YOURSELF",
  order: 3,
  title: { en: "3. Think Yourself Diagnostic", ru: "3. Диагностика: Подумайте Сам" },
  instructions: {
    en: "Formulate your hypothesis: Why do N batch entries show identical final field values when N CSV rows were parsed, and how do class, object, and reference differ here?",
    ru: "Сформулируйте гипотезу: почему N записей батча показывают одинаковые финальные значения при N CSV-строках, и чем здесь отличаются class, object и reference?"
  }
};

const stage4: BaseMissionStage = {
  id: "stg_co_help",
  missionId: "mis_classes_objects",
  type: "NEED_HELP",
  order: 4,
  title: { en: "4. Need Knowledge Bridge", ru: "4. Мост к Знаниям" },
  instructions: {
    en: "No-penalty bridge to class vs object, references vs values, and why independent instances are required per batch row.",
    ru: "Бесштрафной переход к class vs object, references vs values и почему на каждую строку батча нужны независимые экземпляры."
  }
};

const stage5: TheoryStage = {
  id: "stg_co_theory",
  missionId: "mis_classes_objects",
  type: "THEORY",
  order: 5,
  title: { en: "5. Core Theory & Checkpoints", ru: "5. Фундаментальная Теория и Проверки" },
  instructions: {
    en: "Study the theory sections covering class vs object, reference aliasing, independent instance creation, and senior interview follow-ups.",
    ru: "Изучите разделы теории о class vs object, aliasing ссылок, создании независимых экземпляров и доп. вопросах Senior-интервью."
  },
  theoryArticleId: "art_theory_classes_objects"
};

const stage6: BaseMissionStage = {
  id: "stg_co_visual",
  missionId: "mis_classes_objects",
  type: "VISUALIZATION",
  order: 6,
  title: { en: "6. Interactive Shared-Reference Visualization", ru: "6. Визуализация Shared-Reference" },
  instructions: {
    en: "Compare many PaymentBatch slots pointing at one shared PaymentInstruction versus each slot holding an independent heap object.",
    ru: "Сравните много слотов PaymentBatch, указывающих на один общий PaymentInstruction, с каждым слотом, держащим независимый объект в куче."
  }
};

const stage7: PracticeStage = {
  id: "stg_co_practice",
  missionId: "mis_classes_objects",
  type: "INTERACTIVE_PRACTICE",
  order: 7,
  title: { en: "7. Guided Practice: Fix Builder", ru: "7. Практика: Конструктор Исправления" },
  instructions: {
    en: "Assemble the structural fixes so PaymentImporter creates an independent PaymentInstruction per CSV row.",
    ru: "Соберите структурные исправления, чтобы PaymentImporter создавал независимый PaymentInstruction на каждую CSV-строку."
  },
  challengeId: "chl_co_fix_builder"
};

const stage8: InterviewStage = {
  id: "stg_co_interview_q",
  missionId: "mis_classes_objects",
  type: "INTERVIEW_QUESTION",
  order: 8,
  title: { en: "8. Senior Interview Scenario", ru: "8. Сценарий Senior-Интервью" },
  instructions: {
    en: "Review the senior interview question about shared mutable drafts, object identity, and independent instance creation.",
    ru: "Ознакомьтесь с вопросом Senior-собеседования о shared mutable drafts, идентичности объектов и создании независимых экземпляров."
  },
  interviewQuestionId: "q_co_shared_draft_01",
  challengeId: "chl_co_interview_answer"
};

const stage9: InterviewStage = {
  id: "stg_co_interview_a",
  missionId: "mis_classes_objects",
  type: "INTERVIEW_ANSWER",
  order: 9,
  title: { en: "9. Interview Verbal Answer", ru: "9. Устный Ответ и Модель" },
  instructions: {
    en: "Formulate your structured verbal response (Elevator Pitch + Object/Reference Mechanics + Production Trade-offs) and submit for evaluation.",
    ru: "Сформулируйте структурированный ответ (Elevator Pitch + Механика Object/Reference + Продакшн-компромиссы) и отправьте на проверку."
  },
  interviewQuestionId: "q_co_shared_draft_01",
  challengeId: "chl_co_interview_answer"
};

const stage10: PracticeStage = {
  id: "stg_co_debug",
  missionId: "mis_classes_objects",
  type: "DEBUG_COUNTER_EXAMPLE",
  order: 10,
  title: { en: "10. Applied Bug Hunt: Shared Draft Alias", ru: "10. Поиск Бага: Shared Draft Alias" },
  instructions: {
    en: "Identify the line(s) where PaymentImporter adds the same PaymentInstruction reference into the batch after mutating it.",
    ru: "Найдите строку(и), где PaymentImporter добавляет ту же ссылку PaymentInstruction в батч после мутации."
  },
  challengeId: "chl_co_bughunt"
};

const stage11: BaseMissionStage = {
  id: "stg_co_related",
  missionId: "mis_classes_objects",
  type: "RELATED_TOPICS",
  order: 11,
  title: { en: "11. Related Knowledge Nodes", ru: "11. Связанные Узлы Знаний" },
  instructions: {
    en: "Explore connections to state/behavior/identity, immutability, and defensive copying — without turning this into a domain-modeling mission.",
    ru: "Исследуйте связи к state/behavior/identity, immutability и defensive copying — не превращая это в миссию domain modeling."
  }
};

const stage12: BaseMissionStage = {
  id: "stg_co_results",
  missionId: "mis_classes_objects",
  type: "MISSION_RESULTS",
  order: 12,
  title: { en: "12. Mission Performance Summary", ru: "12. Итоги Прохождения Миссии" },
  instructions: {
    en: "Review your performance metrics, concepts strengthened, and XP awarded.",
    ru: "Просмотрите метрики прохождения, укрепившиеся концепции и заработанный XP."
  }
};

const stage13: BaseMissionStage = {
  id: "stg_co_reflection",
  missionId: "mis_classes_objects",
  type: "REFLECTION",
  order: 13,
  title: { en: "13. Engineering Reflection", ru: "13. Инженерная Рефлексия" },
  instructions: {
    en: "Write a 1-sentence reflection on when you will reject a PR that reuses one mutable draft object across a collection of business records.",
    ru: "Напишите 1 предложение о том, когда на код-ревью вы отклоните PR, переиспользующий один мутабельный draft-объект на коллекцию бизнес-записей."
  }
};

export const CLASSES_OBJECTS_MISSION_STAGES: readonly MissionStage[] = [
  stage1, stage2, stage3, stage4, stage5, stage6, stage7, stage8, stage9, stage10, stage11, stage12, stage13
];

export const CLASSES_OBJECTS_MISSION: Mission = {
  id: "mis_classes_objects",
  primaryTopicId: "top_oop_02",
  secondaryTopicIds: ["top_oop_03", "top_oop_22"],
  slug: "shared-draft-payment-instruction",
  title: {
    en: "The Shared Draft Disaster: Modeling PaymentInstruction as a Real Object",
    ru: "Катастрофа Shared Draft: PaymentInstruction как Настоящий Объект"
  },
  description: {
    en: "Fix PaymentImporter so each CSV row becomes an independent PaymentInstruction — the current shared mutable draft makes every PaymentBatch entry show the last row's values.",
    ru: "Исправьте PaymentImporter так, чтобы каждая CSV-строка становилась независимым PaymentInstruction — текущий shared mutable draft заставляет каждую запись PaymentBatch показывать значения последней строки."
  },
  scenarioIntroduction: {
    en: "Nightly payment import processed 12,000 CSV rows into PaymentBatch. Ops opened the batch: every instruction showed the same beneficiary, amount, and PaymentId as the final CSV row. Audit logs contradicted the source file. Retries reprocessed the corrupted in-memory batch and posted duplicates of the last row. Root cause was not CSV parsing — PaymentImporter reused one PaymentInstruction instance, mutated it per row, and stored the same reference N times. The class existed; independent objects did not.",
    ru: "Ночной payment import обработал 12 000 CSV-строк в PaymentBatch. Ops открыл батч: каждая инструкция показывала того же бенефициара, сумму и PaymentId, что и последняя CSV-строка. Аудит противоречил файлу. Retry переработал испорченный in-memory батч и провёл дубликаты последней строки. Причина не в CSV — PaymentImporter переиспользовал один PaymentInstruction, мутировал его на строку и сохранил ту же ссылку N раз. Класс был; независимых объектов не было."
  },
  engineeringProblem: {
    en: "PaymentInstruction is a class (blueprint). new PaymentInstruction(...) creates a distinct heap object with its own identity. Variables hold references. PaymentImporter kept one draft, set fields from each CSV row, then batch.add(draft) — aliasing the same object. Mutation after add updates every prior 'entry'. Solution: PaymentInstructionFactory.create(...) / new per row; add distinct references; prefer immutable instructions after build so accidental reuse cannot rewrite history.",
    ru: "PaymentInstruction — класс (чертёж). new PaymentInstruction(...) создаёт отдельный объект в куче со своей идентичностью. Переменные хранят ссылки. PaymentImporter держал один draft, выставлял поля из CSV и делал batch.add(draft) — aliasing одного объекта. Мутация после add обновляет все предыдущие «записи». Решение: PaymentInstructionFactory.create(...) / new на строку; добавлять разные ссылки; предпочтительны immutable instructions после сборки, чтобы случайный reuse не переписывал историю."
  },
  learningObjectives: [
    {
      en: "Distinguish class (blueprint), object (heap instance), and reference (variable binding)",
      ru: "Различать class (чертёж), object (экземпляр в куче) и reference (привязка переменной)"
    },
    {
      en: "Explain how multiple references to one mutable object create shared-state batch corruption",
      ru: "Объяснить, как несколько ссылок на один мутабельный объект портят батч через shared state"
    },
    {
      en: "Create independent PaymentInstruction instances per business record",
      ru: "Создавать независимые экземпляры PaymentInstruction на каждую бизнес-запись"
    },
    {
      en: "Recognize shallow reuse of drafts as a production object-lifecycle bug",
      ru: "Распознавать shallow reuse draft-объектов как продакшн-баг жизненного цикла объекта"
    }
  ],
  requiredConceptIds: ["cpt_class_vs_object", "cpt_object_reference"],
  recommendedConceptIds: ["cpt_independent_instances", "cpt_immutability"],
  stageIds: CLASSES_OBJECTS_MISSION_STAGES.map((s) => s.id),
  challengeIds: ["chl_co_fix_builder", "chl_co_bughunt", "chl_co_interview_answer"],
  estimatedMinutes: 25,
  difficulty: "APPLIED",
  xpReward: 250,
  version: "1.0.0"
};
