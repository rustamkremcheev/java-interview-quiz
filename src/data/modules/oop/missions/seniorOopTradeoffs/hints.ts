import { Hint } from '../../../../../types/domain';

export const HINTS_SENIOR_OOP_TRADEOFFS: readonly Hint[] = [
  {
    id: "hnt_trade_1",
    challengeId: "chl_trade_fix_builder",
    level: 1,
    text: {
      en: "Directional Clue: Start from constraints — method volatility and audit/retry — not from GoF bingo.",
      ru: "Направляющая Подсказка: Начните с ограничений — volatility методов и audit/retry — не с GoF bingo."
    },
    xpPenalty: 10,
    order: 1
  },
  {
    id: "hnt_trade_2",
    challengeId: "chl_trade_fix_builder",
    level: 2,
    text: {
      en: "Concept Reminder: Thin PlatformPaymentHandler + policies for variance + registry for ordered wraps.",
      ru: "Напоминание Концепции: Тонкий PlatformPaymentHandler + policies для вариации + registry для упорядоченных wraps."
    },
    xpPenalty: 25,
    order: 2
  },
  {
    id: "hnt_trade_3",
    challengeId: "chl_trade_fix_builder",
    level: 3,
    text: {
      en: "Mechanism Clue: Reject five-level AbstractPaymentBase and 'Strategy on every call' as defaults.",
      ru: "Механика: Отклоните пятиуровневый AbstractPaymentBase и «Strategy на каждый вызов» как default."
    },
    xpPenalty: 50,
    order: 3
  },
  {
    id: "hnt_trade_4",
    challengeId: "chl_trade_fix_builder",
    level: 4,
    text: {
      en: "Near-Solution: Select orchestrator + PaymentPolicy/PaymentRiskPolicy + PaymentExtensionRegistry; reject deep inheritance and always-Strategy.",
      ru: "Структура Решения: Выберите оркестратор + PaymentPolicy/PaymentRiskPolicy + PaymentExtensionRegistry; отклоните глубокое inheritance и always-Strategy."
    },
    xpPenalty: 75,
    order: 4
  },
  {
    id: "hnt_trade_bug_1",
    challengeId: "chl_trade_bughunt",
    level: 1,
    text: {
      en: "Directional Clue: Smells are structural — god base, empty marker, deep extends chain.",
      ru: "Направляющая Подсказка: Smells структурные — god base, пустой marker, глубокая цепочка extends."
    },
    xpPenalty: 10,
    order: 1
  },
  {
    id: "hnt_trade_bug_2",
    challengeId: "chl_trade_bughunt",
    level: 2,
    text: {
      en: "Concept Reminder: An empty PaymentThing interface is ceremony without a substitution seam.",
      ru: "Напоминание Концепции: Пустой интерфейс PaymentThing — ceremony без seam подстановки."
    },
    xpPenalty: 25,
    order: 2
  },
  {
    id: "hnt_trade_bug_3",
    challengeId: "chl_trade_bughunt",
    level: 3,
    text: {
      en: "Near-Solution: Flag AbstractPaymentBase (L1), PaymentThing (L14), and CardRailL5 extends (L19).",
      ru: "Структура Решения: Отметьте AbstractPaymentBase (L1), PaymentThing (L14) и CardRailL5 extends (L19)."
    },
    xpPenalty: 50,
    order: 3
  }
];
