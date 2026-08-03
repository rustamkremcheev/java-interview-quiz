import { Hint } from '../../../../../types/domain';

export const HINTS_ASSOCIATION_AGGREGATION_COMPOSITION: readonly Hint[] = [
  {
    id: "hnt_aac_1",
    challengeId: "chl_aac_fix_builder",
    level: 1,
    text: {
      en: "Directional Clue: Ask what must die with the Portfolio — Holdings yes; MarketInstrument and PricingFeed usually no.",
      ru: "Направляющая Подсказка: Спросите, что должно умереть с Portfolio — Holdings да; MarketInstrument и PricingFeed обычно нет."
    },
    xpPenalty: 10,
    order: 1
  },
  {
    id: "hnt_aac_2",
    challengeId: "chl_aac_fix_builder",
    level: 2,
    text: {
      en: "Concept Reminder: Composition owns lifecycle; association/aggregation references shared parts that outlive the whole.",
      ru: "Напоминание Концепции: Composition владеет lifecycle; association/aggregation ссылается на shared-части, переживающие целое."
    },
    xpPenalty: 25,
    order: 2
  },
  {
    id: "hnt_aac_3",
    challengeId: "chl_aac_fix_builder",
    level: 3,
    text: {
      en: "Mechanism Clue: On delete, clear/remove owned Holdings only; keep instrument/feed references as associations; return copyOf holdings.",
      ru: "Механика: При delete очищайте/удаляйте только owned Holdings; instrument/feed — associations; возвращайте copyOf holdings."
    },
    xpPenalty: 50,
    order: 3
  },
  {
    id: "hnt_aac_4",
    challengeId: "chl_aac_fix_builder",
    level: 4,
    text: {
      en: "Near-Solution: Compose Holdings + associate MarketInstrument/PricingFeed + defensive holdings exposure; reject cascade-delete shared catalog and live-list return.",
      ru: "Структура Решения: Compose Holdings + associate MarketInstrument/PricingFeed + defensive exposure holdings; отклоните cascade-delete shared catalog и возврат живого списка."
    },
    xpPenalty: 75,
    order: 4
  },
  {
    id: "hnt_aac_bug_1",
    challengeId: "chl_aac_bughunt",
    level: 1,
    text: {
      en: "Directional Clue: Look for delete/close methods that null or destroy MarketInstrument/PricingFeed, or getters returning the raw list field.",
      ru: "Направляющая Подсказка: Ищите delete/close, которые null'ят или уничтожают MarketInstrument/PricingFeed, или getters, возвращающие сырое поле списка."
    },
    xpPenalty: 10,
    order: 1
  },
  {
    id: "hnt_aac_bug_2",
    challengeId: "chl_aac_bughunt",
    level: 2,
    text: {
      en: "Concept Reminder: Returning holdings directly lets callers break composition ownership without going through Portfolio methods.",
      ru: "Напоминание Концепции: Прямой возврат holdings позволяет вызывающим ломать composition ownership в обход методов Portfolio."
    },
    xpPenalty: 25,
    order: 2
  },
  {
    id: "hnt_aac_bug_3",
    challengeId: "chl_aac_bughunt",
    level: 3,
    text: {
      en: "Near-Solution: Flag cascade destruction of shared instrument/feed and the getter that returns the live mutable holdings list.",
      ru: "Структура Решения: Отметьте cascade-уничтожение shared instrument/feed и getter, возвращающий живой мутабельный список holdings."
    },
    xpPenalty: 50,
    order: 3
  }
];
