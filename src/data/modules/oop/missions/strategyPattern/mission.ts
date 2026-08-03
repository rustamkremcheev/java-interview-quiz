import { Mission, MissionStage, TheoryStage, PracticeStage, InterviewStage, BaseMissionStage } from '../../../../../types/domain';

const stage1: BaseMissionStage = {
  id: "stg_st_intro",
  missionId: "mis_strategy_pattern",
  type: "MISSION_INTRODUCTION",
  order: 1,
  title: { en: "1. Mission Introduction", ru: "1. Введение в Миссию" },
  instructions: {
    en: "Inspect the production incident below where PaymentFeeCalculator posted 0 feeCents on INSTANT transfers after a hurried CRYPTO channel hotfix.",
    ru: "Изучите инцидент на продакшене, где PaymentFeeCalculator выставил 0 feeCents на INSTANT-переводах после срочного хотфикса канала CRYPTO."
  }
};

const stage2: BaseMissionStage = {
  id: "stg_st_problem",
  missionId: "mis_strategy_pattern",
  type: "REAL_ENGINEERING_PROBLEM",
  order: 2,
  title: { en: "2. Real Engineering Problem", ru: "2. Реальная Инженерная Проблема" },
  instructions: {
    en: "Examine PaymentFeeCalculator's giant switch on PaymentChannel (CARD, WIRE, ACH, INSTANT, CRYPTO) — missing break / fall-through corrupted feeCents, and every new channel requires editing the calculator.",
    ru: "Изучите гигантский switch в PaymentFeeCalculator по PaymentChannel (CARD, WIRE, ACH, INSTANT, CRYPTO) — пропущенный break / fall-through испортил feeCents, и каждый новый канал требует правки калькулятора."
  }
};

const stage3: BaseMissionStage = {
  id: "stg_st_think",
  missionId: "mis_strategy_pattern",
  type: "THINK_YOURSELF",
  order: 3,
  title: { en: "3. Think Yourself Diagnostic", ru: "3. Диагностика: Подумайте Сам" },
  instructions: {
    en: "Formulate your hypothesis: Why did adding CRYPTO cause INSTANT fees to become 0, and why does every new PaymentChannel force a modification of PaymentFeeCalculator?",
    ru: "Сформулируйте гипотезу: почему добавление CRYPTO обнулило комиссии INSTANT, и почему каждый новый PaymentChannel вынуждает менять PaymentFeeCalculator?"
  }
};

const stage4: BaseMissionStage = {
  id: "stg_st_help",
  missionId: "mis_strategy_pattern",
  type: "NEED_HELP",
  order: 4,
  title: { en: "4. Need Knowledge Bridge", ru: "4. Мост к Знаниям" },
  instructions: {
    en: "No-penalty bridge to Strategy Pattern theory, Open-Closed Principle, and registry-based algorithm selection.",
    ru: "Бесштрафной переход к теории паттерна Strategy, принципу Open-Closed и registry-выбору алгоритмов."
  }
};

const stage5: TheoryStage = {
  id: "stg_st_theory",
  missionId: "mis_strategy_pattern",
  type: "THEORY",
  order: 5,
  title: { en: "5. Core Theory & Checkpoints", ru: "5. Фундаментальная Теория и Проверки" },
  instructions: {
    en: "Study the 4 theory sections covering Strategy, OCP, FeeStrategyRegistry mechanics, and senior interview follow-ups.",
    ru: "Изучите 4 раздела теории о Strategy, OCP, механике FeeStrategyRegistry и доп. вопросах Senior-интервью."
  },
  theoryArticleId: "art_theory_strategy"
};

const stage6: BaseMissionStage = {
  id: "stg_st_visual",
  missionId: "mis_strategy_pattern",
  type: "VISUALIZATION",
  order: 6,
  title: { en: "6. Interactive Strategy Registry Visualization", ru: "6. Визуализация Strategy Registry" },
  instructions: {
    en: "Compare the brittle PaymentChannel switch explosion against a FeeStrategyRegistry Map that dispatches CardFeeStrategy, WireFeeStrategy, and AchFeeStrategy by channel key.",
    ru: "Сравните хрупкий взрыв switch по PaymentChannel с FeeStrategyRegistry Map, диспетчеризующей CardFeeStrategy, WireFeeStrategy и AchFeeStrategy по ключу канала."
  }
};

const stage7: PracticeStage = {
  id: "stg_st_practice",
  missionId: "mis_strategy_pattern",
  type: "INTERACTIVE_PRACTICE",
  order: 7,
  title: { en: "7. Guided Practice: Fix Builder", ru: "7. Практика: Конструктор Исправления" },
  instructions: {
    en: "Assemble the structural code elements required to replace PaymentFeeCalculator's switch with FeeStrategy + FeeStrategyRegistry.",
    ru: "Соберите элементы кода для замены switch в PaymentFeeCalculator на FeeStrategy + FeeStrategyRegistry."
  },
  challengeId: "chl_st_fix_builder"
};

const stage8: InterviewStage = {
  id: "stg_st_interview_q",
  missionId: "mis_strategy_pattern",
  type: "INTERVIEW_QUESTION",
  order: 8,
  title: { en: "8. Senior Interview Scenario", ru: "8. Сценарий Senior-Интервью" },
  instructions: {
    en: "Review the authentic senior interview question about Strategy Pattern refactoring of a payment fee switch explosion.",
    ru: "Ознакомьтесь с реальным вопросом Senior-собеседования о рефакторинге взрыва switch комиссий через паттерн Strategy."
  },
  interviewQuestionId: "q_st_fee_01",
  challengeId: "chl_st_interview_answer"
};

const stage9: InterviewStage = {
  id: "stg_st_interview_a",
  missionId: "mis_strategy_pattern",
  type: "INTERVIEW_ANSWER",
  order: 9,
  title: { en: "9. Interview Verbal Answer", ru: "9. Устный Ответ и Модель" },
  instructions: {
    en: "Formulate your structured verbal response (Elevator Pitch + Strategy Mechanics + OCP Trade-offs) and submit for evaluation.",
    ru: "Сформулируйте структурированный ответ (Elevator Pitch + Механика Strategy + Компромиссы OCP) и отправьте на проверку."
  },
  interviewQuestionId: "q_st_fee_01",
  challengeId: "chl_st_interview_answer"
};

const stage10: PracticeStage = {
  id: "stg_st_debug",
  missionId: "mis_strategy_pattern",
  type: "DEBUG_COUNTER_EXAMPLE",
  order: 10,
  title: { en: "10. Applied Bug Hunt: Switch Fall-Through", ru: "10. Поиск Бага: Fall-Through в Switch" },
  instructions: {
    en: "Identify the line(s) in PaymentFeeCalculator where a missing break / wrong case fall-through posts 0 fee or double fee.",
    ru: "Найдите строку(и) в PaymentFeeCalculator, где пропущенный break / неверный fall-through выставляет 0 или двойную комиссию."
  },
  challengeId: "chl_st_bughunt"
};

const stage11: BaseMissionStage = {
  id: "stg_st_related",
  missionId: "mis_strategy_pattern",
  type: "RELATED_TOPICS",
  order: 11,
  title: { en: "11. Related Knowledge Nodes", ru: "11. Связанные Узлы Знаний" },
  instructions: {
    en: "Explore lateral graph connections to polymorphism, Open-Closed Principle, and interface-based design.",
    ru: "Исследуйте связи Графа Знаний к полиморфизму, принципу Open-Closed и проектированию через интерфейсы."
  }
};

const stage12: BaseMissionStage = {
  id: "stg_st_results",
  missionId: "mis_strategy_pattern",
  type: "MISSION_RESULTS",
  order: 12,
  title: { en: "12. Mission Performance Summary", ru: "12. Итоги Прохождения Миссии" },
  instructions: {
    en: "Review your performance metrics, concepts strengthened, and XP awarded.",
    ru: "Просмотрите метрики прохождения, укрепившиеся концепции и заработанный XP."
  }
};

const stage13: BaseMissionStage = {
  id: "stg_st_reflection",
  missionId: "mis_strategy_pattern",
  type: "REFLECTION",
  order: 13,
  title: { en: "13. Engineering Reflection", ru: "13. Инженерная Рефлексия" },
  instructions: {
    en: "Write a 1-sentence reflection on when you will reject a growing PaymentChannel switch in code review in favor of Strategy + registry.",
    ru: "Напишите 1 предложение о том, когда на код-ревью вы отклоните растущий switch по PaymentChannel в пользу Strategy + registry."
  }
};

export const STRATEGY_PATTERN_MISSION_STAGES: readonly MissionStage[] = [
  stage1, stage2, stage3, stage4, stage5, stage6, stage7, stage8, stage9, stage10, stage11, stage12, stage13
];

export const STRATEGY_PATTERN_MISSION: Mission = {
  id: "mis_strategy_pattern",
  primaryTopicId: "top_oop_26",
  secondaryTopicIds: ["top_oop_11", "top_oop_23", "top_oop_09"],
  slug: "fee-calculator-strategy-explosion",
  title: {
    en: "The Fee Switch Explosion: Strategy Pattern for PaymentFeeCalculator",
    ru: "Взрыв Switch по Комиссиям: Паттерн Strategy для PaymentFeeCalculator"
  },
  description: {
    en: "Refactor PaymentFeeCalculator's giant PaymentChannel switch that calculates feeCents — a missing break / fall-through posted 0 or double fees, and every new channel (CRYPTO, INSTANT) violates Open-Closed by forcing calculator edits.",
    ru: "Отрефакторьте гигантский switch по PaymentChannel в PaymentFeeCalculator, считающий feeCents — пропущенный break / fall-through выставил 0 или двойные комиссии, а каждый новый канал (CRYPTO, INSTANT) нарушает Open-Closed, вынуждая править калькулятор."
  },
  scenarioIntroduction: {
    en: "Friday night hotfix: product demanded CRYPTO as a new PaymentChannel. An engineer pasted a case into PaymentFeeCalculator's fee switch, forgot a break, and shipped. Monday morning, treasury reports INSTANT transfers clearing with feeCents = 0 while some CARD charges show double fees. Finance cannot explain the variance; compliance flags revenue leakage. The root cause is not 'bad CRYPTO math' — it is a switch that grows with every channel and cannot be extended safely.",
    ru: "Пятничный хотфикс: продукт потребовал CRYPTO как новый PaymentChannel. Инженер вставил case в switch комиссий PaymentFeeCalculator, забыл break и выкатил. В понедельник казначейство видит INSTANT-переводы с feeCents = 0, а часть CARD — с двойной комиссией. Финансы не сходятся; compliance фиксирует утечку выручки. Корневая причина не в «плохой математике CRYPTO» — в switch, который растёт с каждым каналом и не расширяется безопасно."
  },
  engineeringProblem: {
    en: "PaymentFeeCalculator.calculateFeeCents(PaymentFeeRequest) switches on PaymentChannel (CARD, WIRE, ACH, INSTANT, CRYPTO). Fee formulas differ by channel (bps, flat minimums, overnight wire cutoffs). Adding CRYPTO required editing the calculator — classic OCP violation. A missing break after CRYPTO fell through into INSTANT (or assigned 0), posting wrong feeCents. Solution: FeeStrategy interface, per-channel strategies (CardFeeStrategy, WireFeeStrategy, AchFeeStrategy, …), and FeeStrategyRegistry Map<PaymentChannel, FeeStrategy> so new channels register without modifying existing strategies or the calculator core.",
    ru: "PaymentFeeCalculator.calculateFeeCents(PaymentFeeRequest) делает switch по PaymentChannel (CARD, WIRE, ACH, INSTANT, CRYPTO). Формулы комиссий различаются по каналу (bps, flat minimums, overnight wire cutoffs). Добавление CRYPTO потребовало правки калькулятора — классическое нарушение OCP. Пропущенный break после CRYPTO упал в INSTANT (или присвоил 0), выставив неверный feeCents. Решение: интерфейс FeeStrategy, стратегии по каналам (CardFeeStrategy, WireFeeStrategy, AchFeeStrategy, …) и FeeStrategyRegistry Map<PaymentChannel, FeeStrategy>, чтобы новые каналы регистрировались без изменения существующих стратегий и ядра калькулятора."
  },
  learningObjectives: [
    {
      en: "Recognize switch/if explosions on enums as a Strategy Pattern smell that violates Open-Closed",
      ru: "Распознавать взрывы switch/if по enum как smell паттерна Strategy, нарушающий Open-Closed"
    },
    {
      en: "Extract interchangeable fee algorithms behind FeeStrategy and select them via FeeStrategyRegistry",
      ru: "Вынести взаимозаменяемые алгоритмы комиссий за FeeStrategy и выбирать их через FeeStrategyRegistry"
    },
    {
      en: "Explain how Strategy makes PaymentFeeCalculator open for extension (new channel) and closed for modification",
      ru: "Объяснить, как Strategy делает PaymentFeeCalculator открытым для расширения (новый канал) и закрытым для модификации"
    },
    {
      en: "Diagnose switch fall-through / missing break bugs that silently corrupt feeCents in production",
      ru: "Диагностировать баги fall-through / пропущенного break, молча портящие feeCents на продакшене"
    }
  ],
  requiredConceptIds: ["cpt_strategy_pattern", "cpt_open_closed"],
  recommendedConceptIds: ["cpt_composition_over_inheritance", "cpt_interface_contracts"],
  stageIds: STRATEGY_PATTERN_MISSION_STAGES.map((s) => s.id),
  challengeIds: ["chl_st_fix_builder", "chl_st_bughunt", "chl_st_interview_answer"],
  estimatedMinutes: 25,
  difficulty: "SENIOR",
  xpReward: 250,
  version: "1.0.0"
};
