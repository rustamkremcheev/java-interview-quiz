import { Mission, MissionStage } from '../../../../../types/domain';

export const BANK_ACCOUNT_MISSION_STAGES: readonly MissionStage[] = [
  {
    id: "stg_intro",
    missionId: "mis_bank_account_invariants",
    type: "MISSION_INTRODUCTION",
    order: 1,
    title: { en: "1. Mission Introduction", ru: "1. Введение в Миссию" },
    instructions: {
      en: "Inspect the production failure scenario below where a payment processing service exposed mutable account state.",
      ru: "Изучите сценарий сбоя на продакшене, где платежный сервис открыл доступ к мутабельному состоянию."
    }
  },
  {
    id: "stg_problem",
    missionId: "mis_bank_account_invariants",
    type: "REAL_ENGINEERING_PROBLEM",
    order: 2,
    title: { en: "2. Real Engineering Problem", ru: "2. Реальная Инженерная Проблема" },
    instructions: {
      en: "Examine the broken BankAccount class that allows direct public field mutation and negative balance creation.",
      ru: "Изучите код класса BankAccount, допускающий прямую мутацию полей и отрицательный баланс."
    }
  },
  {
    id: "stg_think",
    missionId: "mis_bank_account_invariants",
    type: "THINK_YOURSELF",
    order: 3,
    title: { en: "3. Think Yourself Diagnostic", ru: "3. Диагностика: Подумайте Сам" },
    instructions: {
      en: "Formulate your initial hypothesis: Why is public balance mutation dangerous, and which class invariant is unprotected?",
      ru: "Сформулируйте гипотезу: почему мутация баланса опасна и какой инвариант класса не защищен?"
    }
  },
  {
    id: "stg_help",
    missionId: "mis_bank_account_invariants",
    type: "NEED_HELP",
    order: 4,
    title: { en: "4. Need Knowledge Bridge", ru: "4. Мост к Знаниям" },
    instructions: {
      en: "No penalty bridge to transition into deep core theory and visual state mechanics.",
      ru: "Бесштрафной переход к изучению фундаментальной теории и визуализации состояний."
    }
  },
  {
    id: "stg_theory",
    missionId: "mis_bank_account_invariants",
    type: "THEORY",
    order: 5,
    title: { en: "5. Core Theory & Checkpoints", ru: "5. Фундаментальная Теория и Проверки" },
    instructions: {
      en: "Study the 3 theory sections and complete the interactive learning checkpoints below.",
      ru: "Изучите 3 раздела теории и пройдите интерактивные проверки знаний ниже."
    },
    theoryArticleId: "art_theory_encapsulation"
  },
  {
    id: "stg_visual",
    missionId: "mis_bank_account_invariants",
    type: "VISUALIZATION",
    order: 6,
    title: { en: "6. Interactive State Visualization", ru: "6. Визуализация Состояний Памяти" },
    instructions: {
      en: "Compare external unvalidated field mutation against encapsulated behavior method execution.",
      ru: "Сравните внешнюю мутацию без валидации с вызовом инкапсулированных доменных методов."
    }
  },
  {
    id: "stg_practice",
    missionId: "mis_bank_account_invariants",
    type: "INTERACTIVE_PRACTICE",
    order: 7,
    title: { en: "7. Guided Practice: Fix Builder", ru: "7. Практика: Конструктор Исправления" },
    instructions: {
      en: "Assemble the structural code elements required to protect BankAccount invariants.",
      ru: "Соберите элементы кода для защиты инвариантов класса BankAccount."
    },
    challengeId: "chl_bank_fix_builder"
  },
  {
    id: "stg_interview_q",
    missionId: "mis_bank_account_invariants",
    type: "INTERVIEW_QUESTION",
    order: 8,
    title: { en: "8. Senior Interview Scenario", ru: "8. Сценарий Senior-Интервью" },
    instructions: {
      en: "Review the authentic interview question statement tested in senior technical rounds.",
      ru: "Ознакомьтесь с реальным вопросом, задаваемым на собеседованиях Senior-уровня."
    },
    interviewQuestionId: "q_bank_encap_01",
    challengeId: "chl_bank_interview_answer"
  },
  {
    id: "stg_interview_a",
    missionId: "mis_bank_account_invariants",
    type: "INTERVIEW_ANSWER",
    order: 9,
    title: { en: "9. Interview Verbal Answer", ru: "9. Устный Ответ и Модель" },
    instructions: {
      en: "Formulate your structured verbal response (Elevator Pitch + Mechanics + Trade-offs) and submit for evaluation.",
      ru: "Сформулируйте структурированный ответ (Elevator Pitch + Механика + Компромиссы) и отправьте на проверку."
    },
    interviewQuestionId: "q_bank_encap_01",
    challengeId: "chl_bank_interview_answer"
  },
  {
    id: "stg_debug",
    missionId: "mis_bank_account_invariants",
    type: "DEBUG_COUNTER_EXAMPLE",
    order: 10,
    title: { en: "10. Applied Bug Hunt: AccountPeriod", ru: "10. Поиск Бага: Утечка Ссылки" },
    instructions: {
      en: "Identify the line in the code viewer below where an internal mutable Date reference is leaked.",
      ru: "Найдите строку в редакторе кода, в которой происходит утечка мутабельной ссылки Date."
    },
    challengeId: "chl_bank_bughunt"
  },
  {
    id: "stg_related",
    missionId: "mis_bank_account_invariants",
    type: "RELATED_TOPICS",
    order: 11,
    title: { en: "11. Related Knowledge Nodes", ru: "11. Связанные Узлы Знаний" },
    instructions: {
      en: "Explore lateral graph connections to access immutability, access modifiers, and SOLID principles.",
      ru: "Исследуйте связи Графа Знаний для перехода к неизменяемости, модификаторам доступа и SOLID."
    }
  },
  {
    id: "stg_results",
    missionId: "mis_bank_account_invariants",
    type: "MISSION_RESULTS",
    order: 12,
    title: { en: "12. Mission Performance Summary", ru: "12. Итоги Прохождения Миссии" },
    instructions: {
      en: "Review your performance metrics, concepts strengthened, and XP awarded.",
      ru: "Просмотрите метрики прохождения, укрепившиеся концепции и заработанный XP."
    }
  },
  {
    id: "stg_reflection",
    missionId: "mis_bank_account_invariants",
    type: "REFLECTION",
    order: 13,
    title: { en: "13. Engineering Reflection", ru: "13. Инженерная Рефлексия" },
    instructions: {
      en: "Write a 1-sentence reflection on which production engineering rule you will apply in your daily code.",
      ru: "Напишите 1 предложение о том, какое правило вы примените в своей ежедневной работе."
    }
  }
];

export const BANK_ACCOUNT_MISSION: Mission = {
  id: "mis_bank_account_invariants",
  primaryTopicId: "top_oop_05",
  secondaryTopicIds: ["top_oop_03", "top_oop_18", "top_oop_22"],
  slug: "protecting-bank-account-invariants",
  title: {
    en: "Protecting BankAccount Invariants",
    ru: "Защита Инвариантов BankAccount"
  },
  description: {
    en: "Fix state corruption vulnerabilities in a high-throughput banking service by enforcing strict encapsulation, constructor guards, and defensive copying.",
    ru: "Устраните уязвимости повреждения состояния в высоконагруженном банковском сервисе через инкапсуляцию, проверки в конструкторе и защитное копирование."
  },
  scenarioIntroduction: {
    en: "A critical payment microservice processes 10,000 transactions per second. An audit revealed that several account balances became negative due to direct unvalidated field access from external service callers.",
    ru: "Критический платежный микросервис обрабатывает 10 000 транзакций в секунду. Аудит выявил, что баланс некоторых счетов стал отрицательным из-за прямого доступа к полям без валидации."
  },
  engineeringProblem: {
    en: "The BankAccount class exposed `public double balance`. External callers directly mutated `account.balance = -500.0`, bypassing validation logic and corrupting account state invariants.",
    ru: "Класс BankAccount содержал `public double balance`. Внешние сервисы напрямую выполняли `account.balance = -500.0`, обходя валидацию и разрушая инварианты счета."
  },
  learningObjectives: [
    {
      en: "Understand true encapsulation as state invariant protection rather than simple getter/setter generation",
      ru: "Понять истинную инкапсуляцию как защиту инвариантов состояния, а не как генерацию геттеров/сеттеров"
    },
    {
      en: "Enforce precondition guards in constructors to prevent instantiating corrupted objects",
      ru: "Обеспечить валидацию предусловий в конструкторах для предотвращения создания нелегитимных объектов"
    },
    {
      en: "Eliminate floating-point currency representation bugs by storing long sub-units (cents)",
      ru: "Устранить ошибки округления с плавающей точкой, храня баланс в целочисленных минимальных единицах (центах)"
    },
    {
      en: "Prevent reference leaks through defensive copying of mutable Date/Collection objects",
      ru: "Предотвратить утечку ссылок с помощью защитного копирования мутабельных объектов Date и коллекций"
    }
  ],
  requiredConceptIds: ["cpt_encapsulation", "cpt_invariants"],
  recommendedConceptIds: ["cpt_access_modifiers", "cpt_defensive_copying", "cpt_monetary_representation"],
  stageIds: BANK_ACCOUNT_MISSION_STAGES.map((s) => s.id),
  challengeIds: ["chl_bank_fix_builder", "chl_bank_bughunt", "chl_bank_interview_answer"],
  estimatedMinutes: 25,
  difficulty: "APPLIED",
  xpReward: 250,
  version: "1.0.0"
};
