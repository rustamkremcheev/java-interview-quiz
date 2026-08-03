import {
  FixBuilderChallenge,
  BugHuntChallenge,
  InterviewAnswerChallenge,
  Challenge
} from '../../../../../types/domain';

export const GUIDED_FIX_BUILDER_CHALLENGE_AB: FixBuilderChallenge = {
  id: "chl_ab_fix_builder",
  type: "FIX_BUILDER",
  missionId: "mis_abstraction",
  stageId: "stg_ab_practice",
  title: {
    en: "Fix Builder: Seal PaymentGateway Against Stripe Leakage",
    ru: "Конструктор Исправления: Герметизация PaymentGateway от Утечек Stripe"
  },
  prompt: {
    en: "PaymentOrchestrator imports StripeChargeRequest / StripeException and cannot switch to BankTransferGateway without a rewrite. Select ALL structural building blocks required for a production-safe PaymentGateway abstraction with adapters.",
    ru: "PaymentOrchestrator импортирует StripeChargeRequest / StripeException и не может переключиться на BankTransferGateway без переписывания. Выберите ВСЕ элементы для продакшн-безопасной абстракции PaymentGateway с адаптерами."
  },
  difficulty: "APPLIED",
  assistanceLevel: "GUIDED",
  conceptIds: ["cpt_abstraction", "cpt_leaky_abstraction"],
  topicIds: ["top_oop_07"],
  tags: ["#abstraction", "#leaky-abstraction", "#payment-gateway"],
  hintIds: ["hnt_ab_1", "hnt_ab_2", "hnt_ab_3", "hnt_ab_4"],
  xpReward: 100,
  order: 7,
  payload: {
    baseCodeArtifactId: "art_ab_orchestrator_broken",
    solutionCodeArtifactId: "art_ab_orchestrator_solution",
    options: [
      {
        id: "opt_ab_fix_1",
        text: {
          en: "Define PaymentGateway with GatewayResult charge(PaymentIntent) using only domain types — no Stripe SDK in the interface.",
          ru: "Определить PaymentGateway с GatewayResult charge(PaymentIntent) только на доменных типах — без Stripe SDK в интерфейсе."
        },
        isCorrect: true,
        explanation: {
          en: "Correct. The interface contract is the abstraction boundary.",
          ru: "Верно. Контракт интерфейса — граница абстракции."
        }
      },
      {
        id: "opt_ab_fix_2",
        text: {
          en: "Implement StripeGatewayAdapter and BankTransferGateway that map domain intents to vendor SDKs internally.",
          ru: "Реализовать StripeGatewayAdapter и BankTransferGateway, маппящие доменные intent во vendor SDK внутри себя."
        },
        isCorrect: true,
        explanation: {
          en: "Correct. Adapters encapsulate vendor details behind PaymentGateway.",
          ru: "Верно. Адаптеры инкапсулируют детали вендора за PaymentGateway."
        }
      },
      {
        id: "opt_ab_fix_3",
        text: {
          en: "Keep catching StripeException in PaymentOrchestrator but wrap it in a RuntimeException for BankTransfer later.",
          ru: "Оставить catch StripeException в PaymentOrchestrator, но обернуть в RuntimeException «на потом» для BankTransfer."
        },
        isCorrect: false,
        explanation: {
          en: "Incorrect. Catching StripeException still couples the orchestrator to Stripe's error model.",
          ru: "Неверно. Catch StripeException всё равно связывает оркестратор с моделью ошибок Stripe."
        }
      },
      {
        id: "opt_ab_fix_4",
        text: {
          en: "Inject PaymentGateway into PaymentOrchestrator and interpret only GatewayResult — remove all Stripe imports from the orchestrator.",
          ru: "Инжектить PaymentGateway в PaymentOrchestrator и интерпретировать только GatewayResult — убрать все Stripe-импорты из оркестратора."
        },
        isCorrect: true,
        explanation: {
          en: "Correct. The orchestrator must depend solely on the abstraction.",
          ru: "Верно. Оркестратор должен зависеть только от абстракции."
        }
      },
      {
        id: "opt_ab_fix_distractor_1",
        text: {
          en: "Pass StripeChargeRequest through PaymentGateway as Object so BankTransfer can cast when needed.",
          ru: "Передавать StripeChargeRequest через PaymentGateway как Object, чтобы BankTransfer кастил при необходимости."
        },
        isCorrect: false,
        explanation: {
          en: "Incorrect. Object-smuggling vendor DTOs is still a leaky abstraction.",
          ru: "Неверно. Контрабанда vendor DTO через Object — всё ещё дырявая абстракция."
        }
      }
    ]
  }
};

export const APPLIED_BUG_HUNT_CHALLENGE_AB: BugHuntChallenge = {
  id: "chl_ab_bughunt",
  type: "BUG_HUNT",
  missionId: "mis_abstraction",
  stageId: "stg_ab_debug",
  title: {
    en: "Bug Hunt: Stripe Types Pierce PaymentGateway",
    ru: "Поиск Бага: Типы Stripe Пробивают PaymentGateway"
  },
  prompt: {
    en: "PaymentOrchestrator claims to use PaymentGateway but still cannot swap in BankTransferGateway. Click the line(s) where Stripe SDK types, casts, or exception handling leak through the abstraction.",
    ru: "PaymentOrchestrator вроде использует PaymentGateway, но всё ещё не может подставить BankTransferGateway. Нажмите строку(и), где типы, касты или обработка исключений Stripe SDK протекают через абстракцию."
  },
  difficulty: "APPLIED",
  assistanceLevel: "APPLIED",
  conceptIds: ["cpt_abstraction", "cpt_leaky_abstraction"],
  topicIds: ["top_oop_07"],
  tags: ["#abstraction", "#bug-hunt", "#leaky-abstraction"],
  hintIds: ["hnt_ab_bug_1", "hnt_ab_bug_2", "hnt_ab_bug_3"],
  xpReward: 100,
  order: 10,
  payload: {
    baseCodeArtifactId: "art_ab_orchestrator_bughunt",
    solutionCodeArtifactId: "art_ab_orchestrator_solution",
    codeSnippet: `public GatewayResult chargeCustomer(PaymentIntent intent) {
    try {
        StripeChargeRequest stripeReq = toStripe(intent); // Line 3 — LEAK
        GatewayResult result = gateway.charge(intent);
        StripeChargeResponse stripeBody =
            (StripeChargeResponse) result.rawPayload(); // Line 6 — LEAK
        if (!stripeBody.paid()) {
            return GatewayResult.failed("STRIPE_UNPAID");
        }
        return result;
    } catch (StripeException e) { // Line 11 — LEAK
        return GatewayResult.failed(e.getCode());
    }
}`,
    lines: [
      { lineNumber: 1, code: "public GatewayResult chargeCustomer(PaymentIntent intent) {", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      { lineNumber: 2, code: "    try {", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      {
        lineNumber: 3,
        code: "        StripeChargeRequest stripeReq = toStripe(intent);",
        isBug: true,
        explanation: {
          en: "Line 3: Orchestrator builds StripeChargeRequest — vendor DTO construction belongs in StripeGatewayAdapter, not here. Unused variable still couples the class to Stripe.",
          ru: "Строка 3: Оркестратор собирает StripeChargeRequest — сборка vendor DTO принадлежит StripeGatewayAdapter, не здесь. Даже неиспользуемая переменная связывает класс со Stripe."
        }
      },
      { lineNumber: 4, code: "        GatewayResult result = gateway.charge(intent);", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      { lineNumber: 5, code: "        StripeChargeResponse stripeBody =", isBug: true, explanation: {
        en: "Line 5-6: Casting GatewayResult payload to StripeChargeResponse pierces the abstraction — BankTransferGateway cannot return this type.",
        ru: "Строки 5-6: Каст payload GatewayResult к StripeChargeResponse пробивает абстракцию — BankTransferGateway не может вернуть этот тип."
      } },
      {
        lineNumber: 6,
        code: "            (StripeChargeResponse) result.rawPayload();",
        isBug: true,
        explanation: {
          en: "Line 6: Explicit cast to StripeChargeResponse is a leaky abstraction — domain GatewayResult should expose domain fields, not vendor payloads.",
          ru: "Строка 6: Явный каст к StripeChargeResponse — дырявая абстракция; доменный GatewayResult должен отдавать доменные поля, не vendor payload."
        }
      },
      { lineNumber: 7, code: "        if (!stripeBody.paid()) {", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      { lineNumber: 8, code: "            return GatewayResult.failed(\"STRIPE_UNPAID\");", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      { lineNumber: 9, code: "        }", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      { lineNumber: 10, code: "        return result;", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      {
        lineNumber: 11,
        code: "    } catch (StripeException e) {",
        isBug: true,
        explanation: {
          en: "Line 11: catch StripeException couples error handling to Stripe — BankTransferGateway will throw different types.",
          ru: "Строка 11: catch StripeException связывает обработку ошибок со Stripe — BankTransferGateway бросит другие типы."
        }
      },
      { lineNumber: 12, code: "        return GatewayResult.failed(e.getCode());", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      { lineNumber: 13, code: "    }", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } },
      { lineNumber: 14, code: "}", isBug: false, explanation: { en: "Not the defect line.", ru: "Не строка дефекта." } }
    ]
  }
};

export const INTERVIEW_ANSWER_CHALLENGE_AB: InterviewAnswerChallenge = {
  id: "chl_ab_interview_answer",
  type: "INTERVIEW_ANSWER",
  missionId: "mis_abstraction",
  stageId: "stg_ab_interview_a",
  title: {
    en: "Senior Interview Verbal Explanation: Leaky PaymentGateway",
    ru: "Устный Ответ на Senior-Интервью: Дырявый PaymentGateway"
  },
  prompt: {
    en: "Your PaymentOrchestrator cannot switch from Stripe to BankTransferGateway without a rewrite because StripeChargeRequest and StripeException leak through PaymentGateway. Explain abstraction boundaries, leaky abstractions, and your production refactor to the interviewer.",
    ru: "PaymentOrchestrator не может переключиться со Stripe на BankTransferGateway без переписывания, потому что StripeChargeRequest и StripeException протекают через PaymentGateway. Объясните интервьюеру границы абстракции, дырявые абстракции и ваш продакшн-рефакторинг."
  },
  difficulty: "APPLIED",
  assistanceLevel: "INTERVIEW",
  conceptIds: ["cpt_abstraction", "cpt_leaky_abstraction"],
  topicIds: ["top_oop_07"],
  tags: ["#abstraction", "#leaky-abstraction", "#interview"],
  hintIds: [],
  xpReward: 150,
  order: 9,
  payload: {
    targetQuestionId: "q_ab_gateway_01",
    rubricDimensions: ["ELEVATOR_PITCH", "ABSTRACTION_MECHANICS", "PRODUCTION_TRADEOFFS"],
    expectedConcepts: [
      {
        id: "cpt_abstraction",
        label: { en: "Abstraction Boundary", ru: "Граница Абстракции" },
        keywords: ["abstraction", "PaymentGateway", "interface", "boundary", "абстракция", "граница", "интерфейс"]
      },
      {
        id: "cpt_leaky_abstraction",
        label: { en: "Leaky Abstraction", ru: "Дырявая Абстракция" },
        keywords: ["leaky", "leak", "StripeException", "StripeChargeRequest", "vendor", "дыряв", "утечк", "вендор"]
      },
      {
        id: "cpt_adapter",
        label: { en: "Gateway Adapter Encapsulation", ru: "Инкапсуляция в Gateway Adapter" },
        keywords: ["adapter", "StripeGatewayAdapter", "BankTransferGateway", "encapsulat", "адаптер", "инкапсул"]
      },
      {
        id: "cpt_domain_types",
        label: { en: "Domain PaymentIntent / GatewayResult", ru: "Доменные PaymentIntent / GatewayResult" },
        keywords: ["PaymentIntent", "GatewayResult", "domain", "домен"]
      }
    ],
    modelAnswer30s: {
      en: "Elevator Pitch (30 sec): We had a PaymentGateway interface, but PaymentOrchestrator still built StripeChargeRequest, cast payloads, and caught StripeException — a leaky abstraction. Switching to BankTransferGateway forced an orchestrator rewrite. Fix: domain PaymentIntent/GatewayResult only; StripeGatewayAdapter and BankTransferGateway hide vendor SDKs; orchestrator depends solely on PaymentGateway.",
      ru: "Elevator Pitch (30 сек): Был интерфейс PaymentGateway, но PaymentOrchestrator всё равно собирал StripeChargeRequest, кастил payload и ловил StripeException — дырявая абстракция. Переход на BankTransferGateway заставил переписать оркестратор. Фикс: только доменные PaymentIntent/GatewayResult; StripeGatewayAdapter и BankTransferGateway скрывают vendor SDK; оркестратор зависит только от PaymentGateway."
    },
    modelAnswerDetailed: {
      en: "Deep Mechanics (60 sec): Abstraction means clients program to what, not how. PaymentGateway.charge(PaymentIntent) → GatewayResult is the sealed contract. StripeGatewayAdapter maps intent → StripeChargeRequest, calls Stripe, maps success/StripeException → GatewayResult. BankTransferGateway does the same for bank rails. Never put vendor types in orchestrator imports, throws clauses, or casts. Error model is domain-level at the boundary. Composition root wires which PaymentGateway implementation to inject.",
      ru: "Глубокая Механика (60 сек): Абстракция значит, что клиенты программируют к «что», не к «как». PaymentGateway.charge(PaymentIntent) → GatewayResult — герметичный контракт. StripeGatewayAdapter маппит intent → StripeChargeRequest, вызывает Stripe, маппит success/StripeException → GatewayResult. BankTransferGateway — то же для bank rails. Никогда не кладите vendor-типы в импорты оркестратора, throws или касты. Модель ошибок на границе — доменная. Composition root выбирает реализацию PaymentGateway."
    },
    modelAnswerTradeOffs: {
      en: "Production Trade-offs (30 sec): Mapping layers cost code and must stay in sync with vendor APIs — but cheaper than rewriting orchestration per rail. Prefer interface over abstract Stripe-tainted base class. Extend domain carefully for rail-specific flows (e.g., 3DS challenge) instead of returning Stripe redirect types. ArchUnit: forbid orchestrator → com.stripe dependencies.",
      ru: "Продакшн Компромиссы (30 сек): Слои маппинга стоят кода и должны синхронизироваться с vendor API — но дешевле переписывания оркестрации на каждый rail. Предпочитайте интерфейс abstract-базе с запахом Stripe. Аккуратно расширяйте домен для rail-specific потоков (например, 3DS), вместо возврата Stripe redirect-типов. ArchUnit: запретить orchestrator → com.stripe."
    },
    followUpQuestionText: {
      en: "Interviewer Follow-Up: 'If we only ever use Stripe, is a PaymentGateway interface over-engineering?'",
      ru: "Доп. Вопрос Интервьюера: 'Если мы всегда используем только Stripe — не over-engineering ли интерфейс PaymentGateway?'"
    },
    followUpModelAnswerText: {
      en: "Follow-up Model Answer: For a true single-vendor forever spike, a direct client can be pragmatic. But the moment you need test doubles, SDK upgrades isolation, or a second rail (BankTransfer), a thin PaymentGateway pays for itself. The cost of a small adapter is low; the cost of Stripe types in PaymentOrchestrator is high once product asks for another rail under deadline pressure — which is exactly how leaky abstractions become rewrite projects.",
      ru: "Ответ на Доп. Вопрос: Для настоящего single-vendor forever spike прямой клиент может быть прагматичен. Но как только нужны test doubles, изоляция апгрейдов SDK или второй rail (BankTransfer), тонкий PaymentGateway окупается. Цена маленького адаптера низкая; цена типов Stripe в PaymentOrchestrator высока, когда продукт под дедлайном просит другой rail — именно так дырявые абстракции становятся проектами переписывания."
    }
  }
};

export const ALL_ABSTRACTION_CHALLENGES: readonly Challenge[] = [
  GUIDED_FIX_BUILDER_CHALLENGE_AB,
  APPLIED_BUG_HUNT_CHALLENGE_AB,
  INTERVIEW_ANSWER_CHALLENGE_AB
];
