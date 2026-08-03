import { Mission, MissionStage, TheoryStage, PracticeStage, InterviewStage, BaseMissionStage } from '../../../../../types/domain';

const stage1: BaseMissionStage = {
  id: "stg_eh_intro",
  missionId: "mis_equals_hashcode_contract",
  type: "MISSION_INTRODUCTION",
  order: 1,
  title: { en: "1. Production Incident Story", ru: "1. Инцидент на Продакшене" },
  instructions: {
    en: "Inspect the payment reconciliation alert below where a VIP payment record disappeared from the in-memory cache after status updates.",
    ru: "Изучите алерт системы сверки платежей, где запись VIP-клиента исчезла из кэша памяти после обновления статуса."
  }
};

const stage2: BaseMissionStage = {
  id: "stg_eh_problem",
  missionId: "mis_equals_hashcode_contract",
  type: "REAL_ENGINEERING_PROBLEM",
  order: 2,
  title: { en: "2. Real Engineering Problem", ru: "2. Реальная Инженерная Проблема" },
  instructions: {
    en: "Examine the broken PaymentKey implementation containing a mutable status field that participates in equals() and hashCode().",
    ru: "Изучите уязвимую реализацию PaymentKey с изменяемым полем status, входящим в equals() и hashCode()."
  }
};

const stage3: BaseMissionStage = {
  id: "stg_eh_think",
  missionId: "mis_equals_hashcode_contract",
  type: "THINK_YOURSELF",
  order: 3,
  title: { en: "3. Think Yourself Diagnostic", ru: "3. Диагностика: Подумайте Сам" },
  instructions: {
    en: "Formulate your initial hypothesis: Why does cache.get(key) return null after status updates while heap dumps confirm the entry is still in memory?",
    ru: "Сформулируйте гипотезу: почему cache.get(key) возвращает null после обновления статуса, хотя дамп памяти подтверждает наличие объекта?"
  }
};

const stage4: BaseMissionStage = {
  id: "stg_eh_help",
  missionId: "mis_equals_hashcode_contract",
  type: "NEED_HELP",
  order: 4,
  title: { en: "4. Knowledge Bridge", ru: "4. Мост к Знаниям" },
  instructions: {
    en: "No-penalty transition to deep mathematical contracts and bucket routing mechanics.",
    ru: "Бесштрафной переход к изучению математических контрактов и механики маршрутизации бакетов."
  }
};

const stage5: TheoryStage = {
  id: "stg_eh_theory",
  missionId: "mis_equals_hashcode_contract",
  type: "THEORY",
  order: 5,
  title: { en: "5. Core Theory & Checkpoints", ru: "5. Фундаментальная Теория и Проверки" },
  instructions: {
    en: "Study the 3 theory sections explaining equals/hashCode contracts, bucket formulas, and key immutability rules.",
    ru: "Изучите 3 раздела теории о контрактах equals/hashCode, формулах бакетов и правилах неизменяемости ключей."
  },
  theoryArticleId: "art_theory_equals_hashcode"
};

const stage6: BaseMissionStage = {
  id: "stg_eh_visual",
  missionId: "mis_equals_hashcode_contract",
  type: "VISUALIZATION",
  order: 6,
  title: { en: "6. Interactive State Visualization", ru: "6. Визуализация Состояний Памяти" },
  instructions: {
    en: "Compare original bucket placement in Bucket #4 against key hash recalculation pointing to empty Bucket #11.",
    ru: "Сравните исходное размещение в Бакете #4 с перерасчетом хэша, указующим на пустой Бакет #11."
  }
};

const stage7: PracticeStage = {
  id: "stg_eh_practice",
  missionId: "mis_equals_hashcode_contract",
  type: "INTERACTIVE_PRACTICE",
  order: 7,
  title: { en: "7. Guided Practice: Fix Builder", ru: "7. Практика: Конструктор Исправления" },
  instructions: {
    en: "Select production-safe solutions using Java 17 records and separate transaction identity from mutable payload.",
    ru: "Выберите безопасные решения с использованием Java 17 record и отделите идентичность от данных."
  },
  challengeId: "chl_payment_key_fix_builder"
};

const stage8: InterviewStage = {
  id: "stg_eh_interview_q",
  missionId: "mis_equals_hashcode_contract",
  type: "INTERVIEW_QUESTION",
  order: 8,
  title: { en: "8. Senior Interview Scenario", ru: "8. Сценарий Senior-Интервью" },
  instructions: {
    en: "Review the authentic senior interview question tested in top-tier technical rounds.",
    ru: "Ознакомьтесь с реальным вопросом Senior-собеседования в Tier-1 компаниях."
  },
  interviewQuestionId: "q_payment_key_equals_01",
  challengeId: "chl_payment_key_interview_answer"
};

const stage9: InterviewStage = {
  id: "stg_eh_interview_a",
  missionId: "mis_equals_hashcode_contract",
  type: "INTERVIEW_ANSWER",
  order: 9,
  title: { en: "9. Interview Verbal Answer", ru: "9. Устный Ответ и Модель" },
  instructions: {
    en: "Formulate your 90-second structured verbal response (Elevator Pitch + Mechanics + Trade-offs) and submit for evaluation.",
    ru: "Сформулируйте структурированный 90-секундный ответ (Elevator Pitch + Механика + Компромиссы) и отправьте на проверку."
  },
  interviewQuestionId: "q_payment_key_equals_01",
  challengeId: "chl_payment_key_interview_answer"
};

const stage10: PracticeStage = {
  id: "stg_eh_debug",
  missionId: "mis_equals_hashcode_contract",
  type: "DEBUG_COUNTER_EXAMPLE",
  order: 10,
  title: { en: "10. Applied Bug Hunt: PaymentKey", ru: "10. Поиск Бага: Поле Ключа" },
  instructions: {
    en: "Identify the lines in the code viewer responsible for the key field mutation bug.",
    ru: "Найдите строки в редакторе кода, ответственные за баг мутации поля ключа."
  },
  challengeId: "chl_payment_key_bughunt"
};

const stage11: BaseMissionStage = {
  id: "stg_eh_related",
  missionId: "mis_equals_hashcode_contract",
  type: "RELATED_TOPICS",
  order: 11,
  title: { en: "11. Related Knowledge & Follow-ups", ru: "11. Связанные Знания и Вопросы" },
  instructions: {
    en: "Review 10 senior interview follow-up questions and explore connections across Objects, Collections, and DDD.",
    ru: "Изучите 10 вопросов Senior-уровня и исследуйте связи с Object, Collections и DDD."
  }
};

const stage12: BaseMissionStage = {
  id: "stg_eh_results",
  missionId: "mis_equals_hashcode_contract",
  type: "MISSION_RESULTS",
  order: 12,
  title: { en: "12. Performance & Mistakes Summary", ru: "12. Итоги и Разбор Ошибок" },
  instructions: {
    en: "Review performance metrics and common candidate interview mistakes.",
    ru: "Просмотрите метрики прохождения и разбор распространенных ошибок кандидатов."
  }
};

const stage13: BaseMissionStage = {
  id: "stg_eh_reflection",
  missionId: "mis_equals_hashcode_contract",
  type: "REFLECTION",
  order: 13,
  title: { en: "13. Production Engineering Reflection", ru: "13. Инженерная Рефлексия" },
  instructions: {
    en: "Write a 1-sentence reflection on which production engineering rule you will enforce in code reviews.",
    ru: "Напишите 1 предложение о том, какое правило вы введете на код-ревью."
  }
};

export const EQUALS_HASHCODE_MISSION_STAGES: readonly MissionStage[] = [
  stage1, stage2, stage3, stage4, stage5, stage6, stage7, stage8, stage9, stage10, stage11, stage12, stage13
];

export const EQUALS_HASHCODE_MISSION: Mission = {
  id: "mis_equals_hashcode_contract",
  primaryTopicId: "top_oop_20",
  secondaryTopicIds: ["top_oop_19", "top_oop_22", "top_oop_05"],
  slug: "equals-hashcode-contract-disaster",
  title: {
    en: "The Disappearing Payment: equals() & hashCode() Contract Disaster",
    ru: "Исчезнувший Платеж: Катастрофа Контракта equals() и hashCode()"
  },
  description: {
    en: "Investigate why payment records exist in heap memory dumps but cache.get(key) returns null after status updates, causing severe reconciliation alerts in high-throughput banking pipelines.",
    ru: "Расследуйте, почему записи платежей существуют в дампе памяти кучи, но cache.get(key) возвращает null после обновления статуса в платежном сервисе."
  },
  scenarioIntroduction: {
    en: "At 14:00 UTC during peak volume, a high-throughput payment processing engine began firing critical alerts. A PaymentKey with status PENDING was stored in a HashMap cache. An event listener updated status to COMPLETED. When reconciliation attempted to fetch payment details using cache.get(key), HashMap returned null—yet inspecting the heap dump proved the entry was still physically sitting inside the internal table array!",
    ru: "В 14:00 UTC во время пиковой нагрузки платежная система генерирует критический алерт. PaymentKey со статусом PENDING был сохранен в кэше HashMap. Обработчик сменил статус на COMPLETED. При попытке получить платеж через cache.get(key) HashMap вернул null — хотя дамп памяти показал, что объект физически лежит внутри массива таблицы!"
  },
  engineeringProblem: {
    en: "The PaymentKey class defined `private String status` and included `status` inside `hashCode()`. When `setStatus('COMPLETED')` was invoked, the key's `hashCode()` changed. `cache.get(key)` recalculated a NEW bucket index (Bucket #11) and searched an empty bucket, while the entry remained stranded in Bucket #4, causing silent lookup failures and memory leaks.",
    ru: "Класс PaymentKey содержал `private String status` и включал `status` в `hashCode()`. При вызове `setStatus('COMPLETED')` хэш-код ключа изменился. `cache.get(key)` вычислил НОВЫЙ индекс бакета (Бакет #11) и начал поиск в пустом бакете, в то время как объект остался заперт в Бакете #4."
  },
  learningObjectives: [
    {
      en: "Master the mathematical contract rules governing Object.equals() and Object.hashCode()",
      ru: "Освоить математические правила контрактов Object.equals() и Object.hashCode()"
    },
    {
      en: "Understand HashMap internal bucket routing calculation `(table.length - 1) & hash`",
      ru: "Понять внутреннюю формулу вычисления бакета HashMap `(table.length - 1) & hash`"
    },
    {
      en: "Eliminate silent cache lookup failures and memory leaks caused by key field mutation",
      ru: "Устранить тихие сбои кэша и утечки памяти, вызванные изменением полей ключей"
    },
    {
      en: "Implement 100% immutable key objects using modern Java 17 records and compact constructors",
      ru: "Реализовать 100% неизменяемые ключи с помощью Java 17 record и компактных конструкторов"
    }
  ],
  requiredConceptIds: ["cpt_equals_contract", "cpt_hashcode_contract", "cpt_mutable_key_disaster"],
  recommendedConceptIds: ["cpt_encapsulation", "cpt_defensive_copying"],
  stageIds: EQUALS_HASHCODE_MISSION_STAGES.map((s) => s.id),
  challengeIds: ["chl_payment_key_fix_builder", "chl_payment_key_bughunt", "chl_payment_key_interview_answer"],
  estimatedMinutes: 25,
  difficulty: "SENIOR",
  xpReward: 250,
  version: "1.0.0"
};
