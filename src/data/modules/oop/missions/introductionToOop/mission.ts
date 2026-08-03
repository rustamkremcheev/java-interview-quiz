import { Mission, MissionStage, TheoryStage, PracticeStage, InterviewStage, BaseMissionStage } from '../../../../../types/domain';

const stage1: BaseMissionStage = {
  id: "stg_intro_intro",
  missionId: "mis_introduction_to_oop",
  type: "MISSION_INTRODUCTION",
  order: 1,
  title: { en: "1. Mission Introduction", ru: "1. Введение в Миссию" },
  instructions: {
    en: "Inspect the production incident where a procedural clearing-payment script used maps, string statuses, and global helpers — a new rail broke inconsistently across branches.",
    ru: "Изучите инцидент, где процедурный скрипт clearing-payment использовал maps, строковые статусы и глобальные хелперы — новый rail ломался несогласованно в разных ветках."
  }
};

const stage2: BaseMissionStage = {
  id: "stg_intro_problem",
  missionId: "mis_introduction_to_oop",
  type: "REAL_ENGINEERING_PROBLEM",
  order: 2,
  title: { en: "2. Real Engineering Problem", ru: "2. Реальная Инженерная Проблема" },
  instructions: {
    en: "Examine the procedural clearing flow: HashMap payloads, string statuses like \"PEND\"/\"OK\", and static helpers that mutate shared maps without a ClearingPayment object model.",
    ru: "Изучите процедурный clearing-поток: HashMap payload, строковые статусы вроде \"PEND\"/\"OK\" и static-хелперы, мутирующие общие maps без объектной модели ClearingPayment."
  }
};

const stage3: BaseMissionStage = {
  id: "stg_intro_think",
  missionId: "mis_introduction_to_oop",
  type: "THINK_YOURSELF",
  order: 3,
  title: { en: "3. Think Yourself Diagnostic", ru: "3. Диагностика: Подумайте Сам" },
  instructions: {
    en: "Formulate your hypothesis: Why does adding a new clearing rail break some call sites but not others when status rules live in scattered if/else helpers?",
    ru: "Сформулируйте гипотезу: почему добавление нового clearing rail ломает одни call site, но не другие, когда правила статусов размазаны по if/else-хелперам?"
  }
};

const stage4: BaseMissionStage = {
  id: "stg_intro_help",
  missionId: "mis_introduction_to_oop",
  type: "NEED_HELP",
  order: 4,
  title: { en: "4. Need Knowledge Bridge", ru: "4. Мост к Знаниям" },
  instructions: {
    en: "No-penalty bridge to OOP paradigm basics: objects collaborating with state+behavior, versus procedural maps and global helpers.",
    ru: "Бесштрафной переход к основам парадигмы ООП: объекты, сотрудничающие через state+behavior, против процедурных maps и глобальных хелперов."
  }
};

const stage5: TheoryStage = {
  id: "stg_intro_theory",
  missionId: "mis_introduction_to_oop",
  type: "THEORY",
  order: 5,
  title: { en: "5. Core Theory & Checkpoints", ru: "5. Фундаментальная Теория и Проверки" },
  instructions: {
    en: "Study the 4 theory sections covering OOP paradigm, procedural vs OOP, object collaboration for clearing payments, and senior interview follow-ups.",
    ru: "Изучите 4 раздела теории о парадигме ООП, procedural vs OOP, сотрудничестве объектов для clearing payments и доп. вопросах Senior-интервью."
  },
  theoryArticleId: "art_theory_introduction_to_oop"
};

const stage6: BaseMissionStage = {
  id: "stg_intro_visual",
  missionId: "mis_introduction_to_oop",
  type: "VISUALIZATION",
  order: 6,
  title: { en: "6. Interactive Procedural-to-Objects Visualization", ru: "6. Визуализация: От Процедур к Объектам" },
  instructions: {
    en: "Compare a map/string-status clearing script with ClearingPayment + ClearingPaymentWorkflow + ClearingValidationPolicy collaborating as objects.",
    ru: "Сравните clearing-скрипт на maps/string-статусах с ClearingPayment + ClearingPaymentWorkflow + ClearingValidationPolicy, сотрудничающими как объекты."
  }
};

const stage7: PracticeStage = {
  id: "stg_intro_practice",
  missionId: "mis_introduction_to_oop",
  type: "INTERACTIVE_PRACTICE",
  order: 7,
  title: { en: "7. Guided Practice: Fix Builder", ru: "7. Практика: Конструктор Исправления" },
  instructions: {
    en: "Assemble the structural fixes so clearing uses ClearingPayment objects, typed status, and collaborating workflow/policy/store — not procedural maps.",
    ru: "Соберите структурные исправления, чтобы clearing использовал объекты ClearingPayment, типизированный статус и сотрудничающие workflow/policy/store — не процедурные maps."
  },
  challengeId: "chl_intro_fix_builder"
};

const stage8: InterviewStage = {
  id: "stg_intro_interview_q",
  missionId: "mis_introduction_to_oop",
  type: "INTERVIEW_QUESTION",
  order: 8,
  title: { en: "8. Senior Interview Scenario", ru: "8. Сценарий Senior-Интервью" },
  instructions: {
    en: "Review the senior interview question about migrating a procedural clearing script to a maintainable object model.",
    ru: "Ознакомьтесь с вопросом Senior-собеседования о миграции процедурного clearing-скрипта к поддерживаемой объектной модели."
  },
  interviewQuestionId: "q_intro_procedural_01",
  challengeId: "chl_intro_interview_answer"
};

const stage9: InterviewStage = {
  id: "stg_intro_interview_a",
  missionId: "mis_introduction_to_oop",
  type: "INTERVIEW_ANSWER",
  order: 9,
  title: { en: "9. Interview Verbal Answer", ru: "9. Устный Ответ и Модель" },
  instructions: {
    en: "Formulate your structured verbal response (Elevator Pitch + OOP Mechanics + Production Trade-offs) and submit for evaluation.",
    ru: "Сформулируйте структурированный ответ (Elevator Pitch + Механика ООП + Продакшн-компромиссы) и отправьте на проверку."
  },
  interviewQuestionId: "q_intro_procedural_01",
  challengeId: "chl_intro_interview_answer"
};

const stage10: PracticeStage = {
  id: "stg_intro_debug",
  missionId: "mis_introduction_to_oop",
  type: "DEBUG_COUNTER_EXAMPLE",
  order: 10,
  title: { en: "10. Applied Bug Hunt: Procedural Status Drift", ru: "10. Поиск Бага: Дрейф Процедурных Статусов" },
  instructions: {
    en: "Identify the line(s) where string statuses and shared map mutation cause inconsistent clearing behavior for a new rail.",
    ru: "Найдите строку(и), где строковые статусы и мутация общей map дают несогласованное поведение clearing для нового rail."
  },
  challengeId: "chl_intro_bughunt"
};

const stage11: BaseMissionStage = {
  id: "stg_intro_related",
  missionId: "mis_introduction_to_oop",
  type: "RELATED_TOPICS",
  order: 11,
  title: { en: "11. Related Knowledge Nodes", ru: "11. Связанные Узлы Знаний" },
  instructions: {
    en: "Explore connections to classes/objects, encapsulation, and domain modeling — without diving into design patterns yet.",
    ru: "Исследуйте связи к classes/objects, encapsulation и domain modeling — пока без погружения в design patterns."
  }
};

const stage12: BaseMissionStage = {
  id: "stg_intro_results",
  missionId: "mis_introduction_to_oop",
  type: "MISSION_RESULTS",
  order: 12,
  title: { en: "12. Mission Performance Summary", ru: "12. Итоги Прохождения Миссии" },
  instructions: {
    en: "Review your performance metrics, concepts strengthened, and XP awarded.",
    ru: "Просмотрите метрики прохождения, укрепившиеся концепции и заработанный XP."
  }
};

const stage13: BaseMissionStage = {
  id: "stg_intro_reflection",
  missionId: "mis_introduction_to_oop",
  type: "REFLECTION",
  order: 13,
  title: { en: "13. Engineering Reflection", ru: "13. Инженерная Рефлексия" },
  instructions: {
    en: "Write a 1-sentence reflection on when you will reject a PR that models a clearing payment as a Map with string statuses instead of a typed object collaborator graph.",
    ru: "Напишите 1 предложение о том, когда на код-ревью вы отклоните PR, моделирующий clearing payment как Map со строковыми статусами вместо графа типизированных объектов-сотрудников."
  }
};

export const INTRODUCTION_TO_OOP_MISSION_STAGES: readonly MissionStage[] = [
  stage1, stage2, stage3, stage4, stage5, stage6, stage7, stage8, stage9, stage10, stage11, stage12, stage13
];

export const INTRODUCTION_TO_OOP_MISSION: Mission = {
  id: "mis_introduction_to_oop",
  primaryTopicId: "top_oop_01",
  secondaryTopicIds: ["top_oop_02", "top_oop_03"],
  slug: "procedural-clearing-payment-to-objects",
  title: {
    en: "From Procedural Payment Script to a Maintainable Object Model",
    ru: "От Процедурного Платёжного Скрипта к Поддерживаемой Объектной Модели"
  },
  description: {
    en: "Refactor the procedural clearing script so ClearingPayment, ClearingPaymentWorkflow, ClearingValidationPolicy, and ClearingPaymentStore collaborate as objects — maps, string statuses, and global helpers currently break new rails inconsistently.",
    ru: "Отрефакторьте процедурный clearing-скрипт так, чтобы ClearingPayment, ClearingPaymentWorkflow, ClearingValidationPolicy и ClearingPaymentStore сотрудничали как объекты — maps, строковые статусы и глобальные хелперы сейчас ломают новые rails несогласованно."
  },
  scenarioIntroduction: {
    en: "Ops enabled a second clearing rail. Half the batch paths accepted the new status codes; the nightly reconcile path still wrote \"PEND\" into a shared HashMap and skipped validation helpers that lived in another static utility. No single ClearingPayment owned status transitions. Each helper assumed a slightly different map schema. The new rail worked in the happy path and silently failed in exception paths — classic procedural drift when behavior is scattered across global functions instead of object collaborators.",
    ru: "Ops включил второй clearing rail. Половина путей батча приняла новые коды статусов; nightly reconcile всё ещё писал \"PEND\" в общую HashMap и пропускал validation-хелперы из другой static utility. Ни один ClearingPayment не владел переходами статуса. Каждый хелпер предполагал чуть другую схему map. Новый rail работал в happy path и тихо падал в exception paths — классический процедурный drift, когда поведение размазано по глобальным функциям вместо объектов-сотрудников."
  },
  engineeringProblem: {
    en: "Procedural clearing used Map<String,Object> payloads, string statuses, and static helpers (validateClearing, markOk, persist). Adding a rail required editing every helper inconsistently. Solution: ClearingPayment with ClearingPaymentId and ClearingPaymentStatus; ClearingPaymentWorkflow orchestrates transitions; ClearingValidationPolicy encapsulates rules; ClearingPaymentStore persists. Objects collaborate — do not name anything StaticClearingUtils (LSP mission collision).",
    ru: "Процедурный clearing использовал Map<String,Object>, строковые статусы и static-хелперы (validateClearing, markOk, persist). Новый rail требовал править каждый хелпер несогласованно. Решение: ClearingPayment с ClearingPaymentId и ClearingPaymentStatus; ClearingPaymentWorkflow оркестрирует переходы; ClearingValidationPolicy инкапсулирует правила; ClearingPaymentStore сохраняет. Объекты сотрудничают — не называйте ничего StaticClearingUtils (коллизия с миссией LSP)."
  },
  learningObjectives: [
    {
      en: "Contrast procedural scripts (maps, string statuses, global helpers) with an OOP object model",
      ru: "Противопоставить процедурные скрипты (maps, строковые статусы, глобальные хелперы) объектной модели ООП"
    },
    {
      en: "Model ClearingPayment with typed identity, status, and collaborating workflow/policy/store",
      ru: "Смоделировать ClearingPayment с типизированными identity, status и сотрудничающими workflow/policy/store"
    },
    {
      en: "Explain how object collaboration localizes rail changes versus scattered if/else helpers",
      ru: "Объяснить, как сотрудничество объектов локализует изменения rail против размазанных if/else-хелперов"
    },
    {
      en: "Recognize inconsistent new-rail breakage as a paradigm smell, not a one-line bug",
      ru: "Распознавать несогласованную поломку нового rail как smell парадигмы, а не однострочный баг"
    }
  ],
  requiredConceptIds: ["cpt_oop_paradigm", "cpt_procedural_vs_oop"],
  recommendedConceptIds: ["cpt_object_collaboration", "cpt_class_vs_object"],
  stageIds: INTRODUCTION_TO_OOP_MISSION_STAGES.map((s) => s.id),
  challengeIds: ["chl_intro_fix_builder", "chl_intro_bughunt", "chl_intro_interview_answer"],
  estimatedMinutes: 25,
  difficulty: "FOUNDATION",
  xpReward: 250,
  version: "1.0.0"
};
