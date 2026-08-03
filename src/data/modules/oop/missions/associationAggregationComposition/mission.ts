import { Mission, MissionStage, TheoryStage, PracticeStage, InterviewStage, BaseMissionStage } from '../../../../../types/domain';

const stage1: BaseMissionStage = {
  id: "stg_aac_intro",
  missionId: "mis_association_aggregation_composition",
  type: "MISSION_INTRODUCTION",
  order: 1,
  title: { en: "1. Mission Introduction", ru: "1. Введение в Миссию" },
  instructions: {
    en: "Inspect the production incident where deleting a Portfolio destroyed shared MarketInstrument/PricingFeed data — or leaked a live mutable holdings list.",
    ru: "Изучите инцидент, где удаление Portfolio уничтожило shared MarketInstrument/PricingFeed — или утекла живая мутабельная коллекция holdings."
  }
};

const stage2: BaseMissionStage = {
  id: "stg_aac_problem",
  missionId: "mis_association_aggregation_composition",
  type: "REAL_ENGINEERING_PROBLEM",
  order: 2,
  title: { en: "2. Real Engineering Problem", ru: "2. Реальная Инженерная Проблема" },
  instructions: {
    en: "Examine Portfolio owning Holdings vs associating MarketInstrument and PricingFeed, and BrokerageAccount relationships that must survive portfolio deletion.",
    ru: "Изучите владение Portfolio над Holdings vs association с MarketInstrument и PricingFeed, и связи BrokerageAccount, которые должны пережить удаление portfolio."
  }
};

const stage3: BaseMissionStage = {
  id: "stg_aac_think",
  missionId: "mis_association_aggregation_composition",
  type: "THINK_YOURSELF",
  order: 3,
  title: { en: "3. Think Yourself Diagnostic", ru: "3. Диагностика: Подумайте Сам" },
  instructions: {
    en: "Formulate your hypothesis: Which relationships are composition (owned lifecycle), aggregation/association (shared), and how does returning the live holdings list break ownership?",
    ru: "Сформулируйте гипотезу: какие связи — composition (owned lifecycle), aggregation/association (shared), и как возврат живого списка holdings ломает ownership?"
  }
};

const stage4: BaseMissionStage = {
  id: "stg_aac_help",
  missionId: "mis_association_aggregation_composition",
  type: "NEED_HELP",
  order: 4,
  title: { en: "4. Need Knowledge Bridge", ru: "4. Мост к Знаниям" },
  instructions: {
    en: "No-penalty bridge to association vs aggregation vs composition ownership semantics in portfolio modeling.",
    ru: "Бесштрафной переход к семантике association vs aggregation vs composition ownership в моделировании portfolio."
  }
};

const stage5: TheoryStage = {
  id: "stg_aac_theory",
  missionId: "mis_association_aggregation_composition",
  type: "THEORY",
  order: 5,
  title: { en: "5. Core Theory & Checkpoints", ru: "5. Фундаментальная Теория и Проверки" },
  instructions: {
    en: "Study ownership semantics, shared catalog instruments/feeds, defensive exposure of holdings, and senior interview follow-ups.",
    ru: "Изучите семантику ownership, shared catalog instruments/feeds, defensive exposure holdings и доп. вопросы Senior-интервью."
  },
  theoryArticleId: "art_theory_association_aggregation_composition"
};

const stage6: BaseMissionStage = {
  id: "stg_aac_visual",
  missionId: "mis_association_aggregation_composition",
  type: "VISUALIZATION",
  order: 6,
  title: { en: "6. Interactive Ownership Visualization", ru: "6. Визуализация Ownership" },
  instructions: {
    en: "Compare deleting a Portfolio that cascades only owned Holdings versus wrongly destroying shared MarketInstrument and PricingFeed graph nodes.",
    ru: "Сравните удаление Portfolio с cascade только owned Holdings с ошибочным уничтожением shared узлов MarketInstrument и PricingFeed."
  }
};

const stage7: PracticeStage = {
  id: "stg_aac_practice",
  missionId: "mis_association_aggregation_composition",
  type: "INTERACTIVE_PRACTICE",
  order: 7,
  title: { en: "7. Guided Practice: Fix Builder", ru: "7. Практика: Конструктор Исправления" },
  instructions: {
    en: "Assemble the structural fixes so Portfolio composes Holdings, associates shared instruments/feeds, and never returns a live mutable holdings list.",
    ru: "Соберите структурные исправления: Portfolio compose'ит Holdings, ассоциирует shared instruments/feeds и никогда не возвращает живой мутабельный список holdings."
  },
  challengeId: "chl_aac_fix_builder"
};

const stage8: InterviewStage = {
  id: "stg_aac_interview_q",
  missionId: "mis_association_aggregation_composition",
  type: "INTERVIEW_QUESTION",
  order: 8,
  title: { en: "8. Senior Interview Scenario", ru: "8. Сценарий Senior-Интервью" },
  instructions: {
    en: "Review the senior interview question about portfolio ownership, shared market catalogs, and aggregation vs composition.",
    ru: "Ознакомьтесь с вопросом Senior-собеседования о ownership portfolio, shared market catalogs и aggregation vs composition."
  },
  interviewQuestionId: "q_aac_portfolio_ownership_01",
  challengeId: "chl_aac_interview_answer"
};

const stage9: InterviewStage = {
  id: "stg_aac_interview_a",
  missionId: "mis_association_aggregation_composition",
  type: "INTERVIEW_ANSWER",
  order: 9,
  title: { en: "9. Interview Verbal Answer", ru: "9. Устный Ответ и Модель" },
  instructions: {
    en: "Formulate your structured verbal response (Elevator Pitch + Ownership Mechanics + Production Trade-offs) and submit for evaluation.",
    ru: "Сформулируйте структурированный ответ (Elevator Pitch + Механика Ownership + Продакшн-компромиссы) и отправьте на проверку."
  },
  interviewQuestionId: "q_aac_portfolio_ownership_01",
  challengeId: "chl_aac_interview_answer"
};

const stage10: PracticeStage = {
  id: "stg_aac_debug",
  missionId: "mis_association_aggregation_composition",
  type: "DEBUG_COUNTER_EXAMPLE",
  order: 10,
  title: { en: "10. Applied Bug Hunt: Ownership Cascade", ru: "10. Поиск Бага: Ownership Cascade" },
  instructions: {
    en: "Identify the line(s) where Portfolio deletion destroys shared MarketInstrument/PricingFeed or returns the live mutable holdings list.",
    ru: "Найдите строку(и), где удаление Portfolio уничтожает shared MarketInstrument/PricingFeed или возвращается живой мутабельный список holdings."
  },
  challengeId: "chl_aac_bughunt"
};

const stage11: BaseMissionStage = {
  id: "stg_aac_related",
  missionId: "mis_association_aggregation_composition",
  type: "RELATED_TOPICS",
  order: 11,
  title: { en: "11. Related Knowledge Nodes", ru: "11. Связанные Узлы Знаний" },
  instructions: {
    en: "Explore connections to aggregates/entities, defensive copying, and immutability — this is ownership semantics, not composition-over-inheritance.",
    ru: "Исследуйте связи к aggregates/entities, defensive copying и immutability — это семантика ownership, не composition-over-inheritance."
  }
};

const stage12: BaseMissionStage = {
  id: "stg_aac_results",
  missionId: "mis_association_aggregation_composition",
  type: "MISSION_RESULTS",
  order: 12,
  title: { en: "12. Mission Performance Summary", ru: "12. Итоги Прохождения Миссии" },
  instructions: {
    en: "Review your performance metrics, concepts strengthened, and XP awarded.",
    ru: "Просмотрите метрики прохождения, укрепившиеся концепции и заработанный XP."
  }
};

const stage13: BaseMissionStage = {
  id: "stg_aac_reflection",
  missionId: "mis_association_aggregation_composition",
  type: "REFLECTION",
  order: 13,
  title: { en: "13. Engineering Reflection", ru: "13. Инженерная Рефлексия" },
  instructions: {
    en: "Write a 1-sentence reflection on when you will reject a PR that cascades delete onto shared catalog objects or returns live mutable owned collections.",
    ru: "Напишите 1 предложение о том, когда на код-ревью вы отклоните PR с cascade delete на shared catalog-объекты или возвратом живых мутабельных owned-коллекций."
  }
};

export const ASSOCIATION_AGGREGATION_COMPOSITION_MISSION_STAGES: readonly MissionStage[] = [
  stage1, stage2, stage3, stage4, stage5, stage6, stage7, stage8, stage9, stage10, stage11, stage12, stage13
];

export const ASSOCIATION_AGGREGATION_COMPOSITION_MISSION: Mission = {
  id: "mis_association_aggregation_composition",
  primaryTopicId: "top_oop_17",
  secondaryTopicIds: ["top_oop_03", "top_oop_22"],
  slug: "deleted-portfolio-holdings-ownership",
  title: {
    en: "The Deleted Portfolio Holdings: Ownership Semantics in Portfolio Modeling",
    ru: "Удалённые Holdings Portfolio: Семантика Ownership в Моделировании Portfolio"
  },
  description: {
    en: "Model Portfolio so Holdings are composed (owned lifecycle), MarketInstrument and PricingFeed stay shared associations/aggregations, and getHoldings never returns a live mutable list.",
    ru: "Смоделируйте Portfolio так, чтобы Holdings были composition (owned lifecycle), MarketInstrument и PricingFeed оставались shared association/aggregation, а getHoldings никогда не возвращал живой мутабельный список."
  },
  scenarioIntroduction: {
    en: "Wealth desk closed a client Portfolio. The delete job cascaded through object graphs and purged MarketInstrument rows and PricingFeed registrations still used by other portfolios and BrokerageAccount views. Separately, another code path returned the internal holdings ArrayList — callers cleared it 'temporarily' and wiped live positions mid-session. Root cause was confused ownership: treating shared catalog/feed associations as composed parts, and leaking composed collections by reference.",
    ru: "Wealth desk закрыл клиентский Portfolio. Delete-job прошёл по object graph и стёр строки MarketInstrument и регистрации PricingFeed, всё ещё нужные другим portfolio и BrokerageAccount. Отдельно другой путь вернул внутренний ArrayList holdings — вызывающие очистили его «временно» и обнулили позиции mid-session. Причина — путаница ownership: shared catalog/feed association приняли за composed parts, а composed-коллекции утекли по ссылке."
  },
  engineeringProblem: {
    en: "Association: Portfolio knows MarketInstrument / PricingFeed / BrokerageAccount without owning their lifecycle. Aggregation: whole-part where parts can outlive the whole (shared). Composition: strong ownership — Portfolio owns Holdings; deleting the portfolio may delete its holdings only. Do not cascade-delete shared instruments/feeds. Do not return the live mutable holdings list — expose an unmodifiable view or defensive copy. This mission is about has-a ownership semantics, not composition-over-inheritance.",
    ru: "Association: Portfolio знает MarketInstrument / PricingFeed / BrokerageAccount, не владея их lifecycle. Aggregation: whole-part, где части могут переживать целое (shared). Composition: сильное владение — Portfolio владеет Holdings; удаление portfolio может удалить только его holdings. Не cascade-delete shared instruments/feeds. Не возвращайте живой мутабельный список holdings — unmodifiable view или defensive copy. Миссия про has-a ownership, не composition-over-inheritance."
  },
  learningObjectives: [
    {
      en: "Distinguish association, aggregation, and composition ownership for Portfolio modeling",
      ru: "Различать association, aggregation и composition ownership в моделировании Portfolio"
    },
    {
      en: "Keep MarketInstrument and PricingFeed as shared associations that survive portfolio deletion",
      ru: "Держать MarketInstrument и PricingFeed как shared associations, переживающие удаление portfolio"
    },
    {
      en: "Compose Holdings under Portfolio and never expose the live mutable holdings collection",
      ru: "Compose'ить Holdings под Portfolio и никогда не экспонировать живую мутабельную коллекцию holdings"
    },
    {
      en: "Recognize cascade-delete and collection-leak bugs as ownership-semantics failures",
      ru: "Распознавать cascade-delete и collection-leak как сбои семантики ownership"
    }
  ],
  requiredConceptIds: ["cpt_association", "cpt_aggregation", "cpt_composition_ownership"],
  recommendedConceptIds: ["cpt_defensive_copy", "cpt_immutability"],
  stageIds: ASSOCIATION_AGGREGATION_COMPOSITION_MISSION_STAGES.map((s) => s.id),
  challengeIds: ["chl_aac_fix_builder", "chl_aac_bughunt", "chl_aac_interview_answer"],
  estimatedMinutes: 28,
  difficulty: "APPLIED",
  xpReward: 250,
  version: "1.0.0"
};
