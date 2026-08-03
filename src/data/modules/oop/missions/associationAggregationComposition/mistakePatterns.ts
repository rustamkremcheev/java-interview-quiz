import { MistakePattern } from '../../../../../types/domain';

export const MISTAKE_PATTERNS_ASSOCIATION_AGGREGATION_COMPOSITION: readonly MistakePattern[] = [
  {
    id: "err_aac_cascade_shared_instrument",
    code: "ERR_AAC_CASCADE_SHARED_INSTRUMENT",
    title: {
      en: "Cascading Delete onto Shared MarketInstrument",
      ru: "Cascade Delete на Shared MarketInstrument"
    },
    description: {
      en: "Treating MarketInstrument as a composed part of Portfolio and destroying it when the portfolio is deleted.",
      ru: "Считать MarketInstrument composed-частью Portfolio и уничтожать его при удалении portfolio."
    },
    conceptIds: ["cpt_association", "cpt_composition_ownership"],
    exampleIncorrectReasoning: {
      en: "The portfolio held AAPL — deleting the portfolio should delete AAPL from the system.",
      ru: "В portfolio был AAPL — удаляя portfolio, нужно удалить AAPL из системы."
    },
    correctedReasoning: {
      en: "MarketInstrument is a shared catalog association/aggregation — other portfolios still need it. Delete only owned Holdings.",
      ru: "MarketInstrument — shared catalog association/aggregation — другим portfolio он всё ещё нужен. Удаляйте только owned Holdings."
    },
    remediationMissionIds: ["mis_association_aggregation_composition"]
  },
  {
    id: "err_aac_destroy_pricing_feed",
    code: "ERR_AAC_DESTROY_PRICING_FEED",
    title: {
      en: "Destroying Shared PricingFeed with Portfolio",
      ru: "Уничтожение Shared PricingFeed вместе с Portfolio"
    },
    description: {
      en: "Unregistering or deleting a PricingFeed used by many portfolios when one Portfolio is closed.",
      ru: "Снимать регистрацию или удалять PricingFeed, используемый многими portfolio, при закрытии одного Portfolio."
    },
    conceptIds: ["cpt_aggregation", "cpt_association"],
    exampleIncorrectReasoning: {
      en: "This portfolio subscribed to the feed, so closing it means tearing the feed down.",
      ru: "Этот portfolio подписался на feed, значит закрытие = уничтожение feed."
    },
    correctedReasoning: {
      en: "PricingFeed is shared infrastructure/association — drop the portfolio's subscription reference, not the feed itself.",
      ru: "PricingFeed — shared infrastructure/association — уберите ссылку подписки portfolio, не сам feed."
    },
    remediationMissionIds: ["mis_association_aggregation_composition"]
  },
  {
    id: "err_aac_return_live_holdings",
    code: "ERR_AAC_RETURN_LIVE_HOLDINGS",
    title: {
      en: "Returning the Live Mutable Holdings List",
      ru: "Возврат Живого Мутабельного Списка Holdings"
    },
    description: {
      en: "getHoldings() returns the internal ArrayList, letting callers mutate or clear composed state.",
      ru: "getHoldings() возвращает внутренний ArrayList, позволяя вызывающим мутировать или очищать composed-состояние."
    },
    conceptIds: ["cpt_composition_ownership"],
    exampleIncorrectReasoning: {
      en: "Returning the list is fine — callers are trusted.",
      ru: "Вернуть список нормально — вызывающим можно доверять."
    },
    correctedReasoning: {
      en: "Composition ownership requires controlling mutation — return List.copyOf / unmodifiable view or a defensive copy.",
      ru: "Composition ownership требует контроля мутаций — возвращайте List.copyOf / unmodifiable view или defensive copy."
    },
    remediationMissionIds: ["mis_association_aggregation_composition"]
  },
  {
    id: "err_aac_confuse_aggregation_composition",
    code: "ERR_AAC_CONFUSE_AGGREGATION_COMPOSITION",
    title: {
      en: "Confusing Aggregation with Composition",
      ru: "Путаница Aggregation с Composition"
    },
    description: {
      en: "Using the words interchangeably and cascading lifecycle onto parts that must outlive the whole.",
      ru: "Использовать слова взаимозаменяемо и cascade'ить lifecycle на части, которые должны переживать целое."
    },
    conceptIds: ["cpt_aggregation", "cpt_composition_ownership"],
    exampleIncorrectReasoning: {
      en: "Aggregation and composition are the same has-a — always delete parts with the whole.",
      ru: "Aggregation и composition — одно и то же has-a — всегда удаляйте части вместе с целым."
    },
    correctedReasoning: {
      en: "Composition implies owned lifecycle; aggregation/association allows shared parts to outlive the whole.",
      ru: "Composition подразумевает owned lifecycle; aggregation/association позволяет shared-частям переживать целое."
    },
    remediationMissionIds: ["mis_association_aggregation_composition"]
  },
  {
    id: "err_aac_inherit_for_hasa",
    code: "ERR_AAC_INHERIT_FOR_HASA",
    title: {
      en: "Modeling Has-a Ownership with Inheritance",
      ru: "Моделировать Has-a Ownership Через Inheritance"
    },
    description: {
      en: "Making Portfolio extend MarketInstrument or PricingFeed instead of associating/aggregating them.",
      ru: "Делать Portfolio наследником MarketInstrument или PricingFeed вместо association/aggregation."
    },
    conceptIds: ["cpt_association", "cpt_composition_ownership"],
    exampleIncorrectReasoning: {
      en: "A portfolio 'is a' collection of instruments — use extends.",
      ru: "Portfolio «является» набором инструментов — используем extends."
    },
    correctedReasoning: {
      en: "This mission is has-a ownership: Portfolio has Holdings (composition) and knows instruments/feeds (association). Inheritance is the wrong relationship.",
      ru: "Эта миссия про has-a ownership: Portfolio имеет Holdings (composition) и знает instruments/feeds (association). Inheritance — неверная связь."
    },
    remediationMissionIds: ["mis_association_aggregation_composition"]
  }
];
