import { MistakePattern } from '../../../../../types/domain';

export const MISTAKE_PATTERNS_ABSTRACTION: readonly MistakePattern[] = [
  {
    id: "err_orchestrator_builds_vendor_dto",
    code: "ERR_ORCHESTRATOR_BUILDS_VENDOR_DTO",
    title: {
      en: "Orchestrator Constructs Vendor SDK DTOs",
      ru: "Оркестратор Собирает Vendor SDK DTO"
    },
    description: {
      en: "Building StripeChargeRequest (or similar vendor DTOs) inside PaymentOrchestrator instead of inside StripeGatewayAdapter, coupling orchestration to one rail.",
      ru: "Сборка StripeChargeRequest (или похожих vendor DTO) внутри PaymentOrchestrator вместо StripeGatewayAdapter, связывая оркестрацию с одним rail."
    },
    conceptIds: ["cpt_abstraction", "cpt_leaky_abstraction"],
    exampleIncorrectReasoning: {
      en: "The orchestrator knows the amounts — it might as well build the Stripe request and pass it through.",
      ru: "Оркестратор знает суммы — можно сразу собрать Stripe-запрос и передать его дальше."
    },
    correctedReasoning: {
      en: "Pass domain PaymentIntent only. StripeGatewayAdapter maps to StripeChargeRequest; BankTransferGateway never sees Stripe types.",
      ru: "Передавайте только доменный PaymentIntent. StripeGatewayAdapter маппит в StripeChargeRequest; BankTransferGateway никогда не видит типы Stripe."
    },
    remediationMissionIds: ["mis_abstraction"]
  },
  {
    id: "err_catch_vendor_exception",
    code: "ERR_CATCH_VENDOR_EXCEPTION",
    title: {
      en: "Catching Vendor Exceptions in Orchestrator",
      ru: "Catch Vendor-Исключений в Оркестраторе"
    },
    description: {
      en: "Handling StripeException (or other vendor exceptions) in PaymentOrchestrator so substituting BankTransferGateway breaks error handling.",
      ru: "Обработка StripeException (или других vendor-исключений) в PaymentOrchestrator, из-за чего подстановка BankTransferGateway ломает обработку ошибок."
    },
    conceptIds: ["cpt_leaky_abstraction"],
    exampleIncorrectReasoning: {
      en: "StripeException has useful codes — catch it in the orchestrator and map to GatewayResult there.",
      ru: "У StripeException полезные коды — поймаем в оркестраторе и замаппим в GatewayResult там."
    },
    correctedReasoning: {
      en: "Map vendor failures inside the adapter to GatewayResult (or a domain exception). Orchestrator handles one error model.",
      ru: "Маппируйте сбои вендора внутри адаптера в GatewayResult (или доменное исключение). Оркестратор работает с одной моделью ошибок."
    },
    remediationMissionIds: ["mis_abstraction"]
  },
  {
    id: "err_cast_to_vendor_payload",
    code: "ERR_CAST_TO_VENDOR_PAYLOAD",
    title: {
      en: "Casting GatewayResult to Vendor Payload Types",
      ru: "Каст GatewayResult к Vendor Payload Типам"
    },
    description: {
      en: "Casting a 'raw' payload on GatewayResult to StripeChargeResponse (or similar), forcing every rail to fake Stripe types.",
      ru: "Каст «сырого» payload на GatewayResult к StripeChargeResponse (или подобному), вынуждая каждый rail подделывать типы Stripe."
    },
    conceptIds: ["cpt_leaky_abstraction", "cpt_abstraction"],
    exampleIncorrectReasoning: {
      en: "GatewayResult can carry Object rawPayload — callers cast to whatever the current vendor returns.",
      ru: "GatewayResult может нести Object rawPayload — вызывающие кастят к тому, что возвращает текущий вендор."
    },
    correctedReasoning: {
      en: "Expose domain fields on GatewayResult (success, providerReference, errorCode). Keep raw vendor payloads inside adapters or diagnostics sinks.",
      ru: "Открывайте доменные поля на GatewayResult (success, providerReference, errorCode). Сырые vendor payload оставляйте в адаптерах или diagnostics sink."
    },
    remediationMissionIds: ["mis_abstraction"]
  },
  {
    id: "err_depend_on_concrete_adapter",
    code: "ERR_DEPEND_ON_CONCRETE_ADAPTER",
    title: {
      en: "Orchestrator Depends on Concrete Adapter Type",
      ru: "Оркестратор Зависит от Конкретного Типа Адаптера"
    },
    description: {
      en: "Typing the field as StripeGatewayAdapter instead of PaymentGateway, preventing BankTransferGateway injection.",
      ru: "Типизация поля как StripeGatewayAdapter вместо PaymentGateway, мешающая инжекции BankTransferGateway."
    },
    conceptIds: ["cpt_abstraction"],
    exampleIncorrectReasoning: {
      en: "We only have Stripe today — declare StripeGatewayAdapter so we can call Stripe-specific helpers.",
      ru: "Сегодня только Stripe — объявим StripeGatewayAdapter, чтобы вызывать Stripe-specific helpers."
    },
    correctedReasoning: {
      en: "Depend on PaymentGateway. Stripe-specific helpers stay private to StripeGatewayAdapter; composition root chooses the implementation.",
      ru: "Зависьте от PaymentGateway. Stripe-specific helpers остаются private в StripeGatewayAdapter; composition root выбирает реализацию."
    },
    remediationMissionIds: ["mis_abstraction"]
  },
  {
    id: "err_abstraction_means_one_impl",
    code: "ERR_ABSTRACTION_MEANS_ONE_IMPL",
    title: {
      en: "Treating Multiple Implementations as an Abstraction Failure",
      ru: "Считать Несколько Реализаций Провалом Абстракции"
    },
    description: {
      en: "Believing PaymentGateway is wrong because both StripeGatewayAdapter and BankTransferGateway implement it — confusing polymorphism with leakage.",
      ru: "Считать PaymentGateway неправильным, потому что его реализуют и StripeGatewayAdapter, и BankTransferGateway — путая полиморфизм с утечкой."
    },
    conceptIds: ["cpt_abstraction"],
    exampleIncorrectReasoning: {
      en: "If two classes implement PaymentGateway, the abstraction is incomplete — pick one concrete class instead.",
      ru: "Если два класса реализуют PaymentGateway, абстракция неполная — лучше один конкретный класс."
    },
    correctedReasoning: {
      en: "Multiple implementations behind one interface is the point of abstraction. Leakage is when clients still depend on vendor types.",
      ru: "Несколько реализаций за одним интерфейсом — суть абстракции. Утечка — когда клиенты всё ещё зависят от vendor-типов."
    },
    remediationMissionIds: ["mis_abstraction"]
  },
  {
    id: "err_vendor_in_interface_throws",
    code: "ERR_VENDOR_IN_INTERFACE_THROWS",
    title: {
      en: "Vendor Exception Types in PaymentGateway throws Clause",
      ru: "Vendor-Типы Исключений в throws у PaymentGateway"
    },
    description: {
      en: "Declaring `throws StripeException` on PaymentGateway.charge, baking Stripe into the abstraction signature for every implementor and caller.",
      ru: "Объявление `throws StripeException` у PaymentGateway.charge, вшивающее Stripe в сигнатуру абстракции для всех реализаций и вызывающих."
    },
    conceptIds: ["cpt_leaky_abstraction", "cpt_abstraction"],
    exampleIncorrectReasoning: {
      en: "The interface should declare throws StripeException so callers know about payment failures.",
      ru: "Интерфейс должен объявлять throws StripeException, чтобы вызывающие знали о сбоях платежей."
    },
    correctedReasoning: {
      en: "Use GatewayResult failure states or a domain exception owned by your package — never a vendor checked exception on the port.",
      ru: "Используйте failure-состояния GatewayResult или доменное исключение вашего пакета — никогда vendor checked exception на порте."
    },
    remediationMissionIds: ["mis_abstraction"]
  }
];
