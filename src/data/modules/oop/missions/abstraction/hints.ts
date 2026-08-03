import { Hint } from '../../../../../types/domain';

export const HINTS_ABSTRACTION: readonly Hint[] = [
  {
    id: "hnt_ab_1",
    challengeId: "chl_ab_fix_builder",
    level: 1,
    text: {
      en: "Directional Clue: PaymentOrchestrator should stop importing com.stripe.*. Vendor DTOs and exceptions belong behind PaymentGateway adapters.",
      ru: "Направляющая Подсказка: PaymentOrchestrator должен перестать импортировать com.stripe.*. Vendor DTO и исключения принадлежат адаптерам за PaymentGateway."
    },
    xpPenalty: 10,
    order: 1
  },
  {
    id: "hnt_ab_2",
    challengeId: "chl_ab_fix_builder",
    level: 2,
    text: {
      en: "Concept Reminder: A leaky abstraction exists when the interface is present but clients still depend on implementation details (StripeChargeRequest, StripeException).",
      ru: "Напоминание Концепции: Дырявая абстракция — когда интерфейс есть, но клиенты всё равно зависят от деталей реализации (StripeChargeRequest, StripeException)."
    },
    xpPenalty: 25,
    order: 2
  },
  {
    id: "hnt_ab_3",
    challengeId: "chl_ab_fix_builder",
    level: 3,
    text: {
      en: "Mechanism Clue: StripeGatewayAdapter maps PaymentIntent → Stripe SDK → GatewayResult; BankTransferGateway does the same for bank rails; orchestrator only calls gateway.charge(intent).",
      ru: "Механика Работы: StripeGatewayAdapter маппит PaymentIntent → Stripe SDK → GatewayResult; BankTransferGateway — то же для bank rails; оркестратор только вызывает gateway.charge(intent)."
    },
    xpPenalty: 50,
    order: 3
  },
  {
    id: "hnt_ab_4",
    challengeId: "chl_ab_fix_builder",
    level: 4,
    text: {
      en: "Near-Solution Structure: PaymentGateway interface + domain PaymentIntent/GatewayResult + StripeGatewayAdapter + BankTransferGateway + inject PaymentGateway into PaymentOrchestrator with zero Stripe imports.",
      ru: "Структура Решения: интерфейс PaymentGateway + доменные PaymentIntent/GatewayResult + StripeGatewayAdapter + BankTransferGateway + inject PaymentGateway в PaymentOrchestrator без Stripe-импортов."
    },
    xpPenalty: 75,
    order: 4
  },
  {
    id: "hnt_ab_bug_1",
    challengeId: "chl_ab_bughunt",
    level: 1,
    text: {
      en: "Directional Clue: BankTransferGateway fails to substitute cleanly. Look for Stripe type names, casts to Stripe responses, or catch StripeException in the orchestrator.",
      ru: "Направляющая Подсказка: BankTransferGateway не подставляется чисто. Ищите имена типов Stripe, касты к Stripe-ответам или catch StripeException в оркестраторе."
    },
    xpPenalty: 10,
    order: 1
  },
  {
    id: "hnt_ab_bug_2",
    challengeId: "chl_ab_bughunt",
    level: 2,
    text: {
      en: "Concept Reminder: Building StripeChargeRequest or casting GatewayResult to StripeChargeResponse means the abstraction boundary is pierced even if gateway.charge() is called.",
      ru: "Напоминание Концепции: Сборка StripeChargeRequest или каст GatewayResult к StripeChargeResponse значит, что граница абстракции пробита, даже если вызывается gateway.charge()."
    },
    xpPenalty: 25,
    order: 2
  },
  {
    id: "hnt_ab_bug_3",
    challengeId: "chl_ab_bughunt",
    level: 3,
    text: {
      en: "Near-Solution: Mark the StripeChargeRequest construction, the StripeChargeResponse cast, and the catch (StripeException) lines — those are the leaks.",
      ru: "Структура Решения: Отметьте сборку StripeChargeRequest, каст StripeChargeResponse и строки catch (StripeException) — это утечки."
    },
    xpPenalty: 50,
    order: 3
  }
];
