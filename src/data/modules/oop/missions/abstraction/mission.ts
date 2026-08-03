import { Mission, MissionStage, TheoryStage, PracticeStage, InterviewStage, BaseMissionStage } from '../../../../../types/domain';

const stage1: BaseMissionStage = {
  id: "stg_ab_intro",
  missionId: "mis_abstraction",
  type: "MISSION_INTRODUCTION",
  order: 1,
  title: { en: "1. Mission Introduction", ru: "1. Введение в Миссию" },
  instructions: {
    en: "Inspect the production incident below where switching PaymentOrchestrator from Stripe to BankTransferGateway forced a rewrite because StripeChargeRequest and StripeException leaked through the gateway boundary.",
    ru: "Изучите инцидент на продакшене, где перевод PaymentOrchestrator со Stripe на BankTransferGateway потребовал переписывания, потому что StripeChargeRequest и StripeException протекли через границу gateway."
  }
};

const stage2: BaseMissionStage = {
  id: "stg_ab_problem",
  missionId: "mis_abstraction",
  type: "REAL_ENGINEERING_PROBLEM",
  order: 2,
  title: { en: "2. Real Engineering Problem", ru: "2. Реальная Инженерная Проблема" },
  instructions: {
    en: "Examine PaymentOrchestrator importing Stripe SDK types (StripeChargeRequest, StripeException) and casting gateway results — the PaymentGateway 'abstraction' is leaky.",
    ru: "Изучите PaymentOrchestrator, импортирующий типы Stripe SDK (StripeChargeRequest, StripeException) и кастящий результаты gateway — «абстракция» PaymentGateway дырявая."
  }
};

const stage3: BaseMissionStage = {
  id: "stg_ab_think",
  missionId: "mis_abstraction",
  type: "THINK_YOURSELF",
  order: 3,
  title: { en: "3. Think Yourself Diagnostic", ru: "3. Диагностика: Подумайте Сам" },
  instructions: {
    en: "Formulate your hypothesis: Why did introducing BankTransferGateway require rewriting PaymentOrchestrator if a PaymentGateway interface already existed?",
    ru: "Сформулируйте гипотезу: почему введение BankTransferGateway потребовало переписать PaymentOrchestrator, если интерфейс PaymentGateway уже существовал?"
  }
};

const stage4: BaseMissionStage = {
  id: "stg_ab_help",
  missionId: "mis_abstraction",
  type: "NEED_HELP",
  order: 4,
  title: { en: "4. Need Knowledge Bridge", ru: "4. Мост к Знаниям" },
  instructions: {
    en: "No-penalty bridge to abstraction boundaries, leaky abstractions, and adapter encapsulation of vendor SDKs.",
    ru: "Бесштрафной переход к границам абстракции, дырявым абстракциям и инкапсуляции vendor SDK за адаптерами."
  }
};

const stage5: TheoryStage = {
  id: "stg_ab_theory",
  missionId: "mis_abstraction",
  type: "THEORY",
  order: 5,
  title: { en: "5. Core Theory & Checkpoints", ru: "5. Фундаментальная Теория и Проверки" },
  instructions: {
    en: "Study the 4 theory sections covering abstraction contracts, leaky SDK boundaries, adapter mechanics, and senior interview follow-ups.",
    ru: "Изучите 4 раздела теории о контрактах абстракции, дырявых границах SDK, механике адаптеров и доп. вопросах Senior-интервью."
  },
  theoryArticleId: "art_theory_abstraction"
};

const stage6: BaseMissionStage = {
  id: "stg_ab_visual",
  missionId: "mis_abstraction",
  type: "VISUALIZATION",
  order: 6,
  title: { en: "6. Interactive Abstraction Boundary Visualization", ru: "6. Визуализация Границы Абстракции" },
  instructions: {
    en: "Compare PaymentOrchestrator depending on StripeChargeRequest/StripeException versus depending only on PaymentGateway with StripeGatewayAdapter and BankTransferGateway behind the boundary.",
    ru: "Сравните PaymentOrchestrator, зависящий от StripeChargeRequest/StripeException, с зависимостью только от PaymentGateway, за которым StripeGatewayAdapter и BankTransferGateway."
  }
};

const stage7: PracticeStage = {
  id: "stg_ab_practice",
  missionId: "mis_abstraction",
  type: "INTERACTIVE_PRACTICE",
  order: 7,
  title: { en: "7. Guided Practice: Fix Builder", ru: "7. Практика: Конструктор Исправления" },
  instructions: {
    en: "Assemble the structural code elements required to seal the PaymentGateway boundary so PaymentOrchestrator never imports Stripe SDK types.",
    ru: "Соберите элементы кода для герметичной границы PaymentGateway, чтобы PaymentOrchestrator никогда не импортировал типы Stripe SDK."
  },
  challengeId: "chl_ab_fix_builder"
};

const stage8: InterviewStage = {
  id: "stg_ab_interview_q",
  missionId: "mis_abstraction",
  type: "INTERVIEW_QUESTION",
  order: 8,
  title: { en: "8. Senior Interview Scenario", ru: "8. Сценарий Senior-Интервью" },
  instructions: {
    en: "Review the authentic senior interview question about leaky payment-gateway abstractions and vendor SDK coupling.",
    ru: "Ознакомьтесь с реальным вопросом Senior-собеседования о дырявых абстракциях payment-gateway и сцеплении с vendor SDK."
  },
  interviewQuestionId: "q_ab_gateway_01",
  challengeId: "chl_ab_interview_answer"
};

const stage9: InterviewStage = {
  id: "stg_ab_interview_a",
  missionId: "mis_abstraction",
  type: "INTERVIEW_ANSWER",
  order: 9,
  title: { en: "9. Interview Verbal Answer", ru: "9. Устный Ответ и Модель" },
  instructions: {
    en: "Formulate your structured verbal response (Elevator Pitch + Abstraction Mechanics + Production Trade-offs) and submit for evaluation.",
    ru: "Сформулируйте структурированный ответ (Elevator Pitch + Механика Абстракции + Продакшн-компромиссы) и отправьте на проверку."
  },
  interviewQuestionId: "q_ab_gateway_01",
  challengeId: "chl_ab_interview_answer"
};

const stage10: PracticeStage = {
  id: "stg_ab_debug",
  missionId: "mis_abstraction",
  type: "DEBUG_COUNTER_EXAMPLE",
  order: 10,
  title: { en: "10. Applied Bug Hunt: Stripe Types Leak", ru: "10. Поиск Бага: Утечка Типов Stripe" },
  instructions: {
    en: "Identify the line(s) in PaymentOrchestrator where Stripe SDK types or casts pierce the PaymentGateway abstraction.",
    ru: "Найдите строку(и) в PaymentOrchestrator, где типы или касты Stripe SDK пробивают абстракцию PaymentGateway."
  },
  challengeId: "chl_ab_bughunt"
};

const stage11: BaseMissionStage = {
  id: "stg_ab_related",
  missionId: "mis_abstraction",
  type: "RELATED_TOPICS",
  order: 11,
  title: { en: "11. Related Knowledge Nodes", ru: "11. Связанные Узлы Знаний" },
  instructions: {
    en: "Explore lateral graph connections to interfaces, abstract classes, and dependency inversion.",
    ru: "Исследуйте связи Графа Знаний к интерфейсам, абстрактным классам и инверсии зависимостей."
  }
};

const stage12: BaseMissionStage = {
  id: "stg_ab_results",
  missionId: "mis_abstraction",
  type: "MISSION_RESULTS",
  order: 12,
  title: { en: "12. Mission Performance Summary", ru: "12. Итоги Прохождения Миссии" },
  instructions: {
    en: "Review your performance metrics, concepts strengthened, and XP awarded.",
    ru: "Просмотрите метрики прохождения, укрепившиеся концепции и заработанный XP."
  }
};

const stage13: BaseMissionStage = {
  id: "stg_ab_reflection",
  missionId: "mis_abstraction",
  type: "REFLECTION",
  order: 13,
  title: { en: "13. Engineering Reflection", ru: "13. Инженерная Рефлексия" },
  instructions: {
    en: "Write a 1-sentence reflection on when you will reject a PR that imports vendor SDK types into an orchestrator that should depend only on a gateway interface.",
    ru: "Напишите 1 предложение о том, когда на код-ревью вы отклоните PR, импортирующий типы vendor SDK в оркестратор, который должен зависеть только от интерфейса gateway."
  }
};

export const ABSTRACTION_MISSION_STAGES: readonly MissionStage[] = [
  stage1, stage2, stage3, stage4, stage5, stage6, stage7, stage8, stage9, stage10, stage11, stage12, stage13
];

export const ABSTRACTION_MISSION: Mission = {
  id: "mis_abstraction",
  primaryTopicId: "top_oop_07",
  secondaryTopicIds: ["top_oop_08", "top_oop_09", "top_oop_24"],
  slug: "leaky-payment-gateway-abstraction",
  title: {
    en: "The Leaky Gateway: Abstraction Boundaries in PaymentOrchestrator",
    ru: "Дырявый Gateway: Границы Абстракции в PaymentOrchestrator"
  },
  description: {
    en: "Refactor PaymentOrchestrator so it depends only on PaymentGateway — StripeChargeRequest and StripeException currently leak through the boundary, forcing a rewrite when BankTransferGateway replaces Stripe.",
    ru: "Отрефакторьте PaymentOrchestrator так, чтобы он зависел только от PaymentGateway — StripeChargeRequest и StripeException сейчас протекают через границу, вынуждая переписывать оркестратор при замене Stripe на BankTransferGateway."
  },
  scenarioIntroduction: {
    en: "Treasury green-lit BankTransfer as a second rail. The team expected to plug in BankTransferGateway behind PaymentGateway and ship. Instead, PaymentOrchestrator would not compile: it constructed StripeChargeRequest, caught StripeException, and cast GatewayResult to Stripe-specific payloads. The 'abstraction' was cosmetic — vendor types had leaked into the orchestration layer. Every Stripe SDK upgrade and every new rail now rewrites core payment flow.",
    ru: "Казначейство одобрило BankTransfer как второй rail. Команда ожидала подключить BankTransferGateway за PaymentGateway и выкатить. Вместо этого PaymentOrchestrator не компилировался: он собирал StripeChargeRequest, ловил StripeException и кастил GatewayResult к Stripe-специфичным payload. «Абстракция» была косметической — типы вендора протекли в слой оркестрации. Каждый апгрейд Stripe SDK и каждый новый rail теперь переписывает ядро платёжного потока."
  },
  engineeringProblem: {
    en: "PaymentOrchestrator was meant to depend on PaymentGateway.charge(PaymentIntent) → GatewayResult. In practice it imports Stripe SDK types, builds StripeChargeRequest, and handles StripeException. StripeGatewayAdapter never fully hid the vendor. Solution: domain types PaymentIntent and GatewayResult only; StripeGatewayAdapter and BankTransferGateway implement PaymentGateway and encapsulate vendor SDKs; PaymentOrchestrator depends solely on the PaymentGateway interface.",
    ru: "PaymentOrchestrator должен был зависеть от PaymentGateway.charge(PaymentIntent) → GatewayResult. На практике он импортирует типы Stripe SDK, собирает StripeChargeRequest и обрабатывает StripeException. StripeGatewayAdapter так и не скрыл вендора. Решение: только доменные типы PaymentIntent и GatewayResult; StripeGatewayAdapter и BankTransferGateway реализуют PaymentGateway и инкапсулируют vendor SDK; PaymentOrchestrator зависит исключительно от интерфейса PaymentGateway."
  },
  learningObjectives: [
    {
      en: "Recognize vendor SDK types in orchestrators as a leaky abstraction smell",
      ru: "Распознавать типы vendor SDK в оркестраторах как smell дырявой абстракции"
    },
    {
      en: "Design a PaymentGateway boundary with domain PaymentIntent / GatewayResult contracts",
      ru: "Спроектировать границу PaymentGateway с доменными контрактами PaymentIntent / GatewayResult"
    },
    {
      en: "Encapsulate Stripe and bank-transfer SDKs inside adapter implementations",
      ru: "Инкапсулировать SDK Stripe и bank-transfer внутри реализаций-адаптеров"
    },
    {
      en: "Explain why casting to vendor types or catching vendor exceptions pierces abstraction",
      ru: "Объяснить, почему каст к vendor-типам или catch vendor-исключений пробивает абстракцию"
    }
  ],
  requiredConceptIds: ["cpt_abstraction", "cpt_leaky_abstraction"],
  recommendedConceptIds: ["cpt_interface_contracts", "cpt_dependency_inversion"],
  stageIds: ABSTRACTION_MISSION_STAGES.map((s) => s.id),
  challengeIds: ["chl_ab_fix_builder", "chl_ab_bughunt", "chl_ab_interview_answer"],
  estimatedMinutes: 25,
  difficulty: "APPLIED",
  xpReward: 250,
  version: "1.0.0"
};
