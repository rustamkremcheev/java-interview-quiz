import { MistakePattern } from '../../../../../types/domain';

export const MISTAKE_PATTERNS_SENIOR_OOP_TRADEOFFS: readonly MistakePattern[] = [
  {
    id: "err_trade_pattern_slogan",
    code: "ERR_TRADE_PATTERN_SLOGAN",
    title: {
      en: "Answering with Pattern Slogans",
      ru: "Ответ Слоганами Паттернов"
    },
    description: {
      en: "Listing GoF names instead of constraints → recommendation → reversal conditions.",
      ru: "Перечисление имён GoF вместо ограничения → рекомендация → условия пересмотра."
    },
    conceptIds: ["cpt_constraint_driven_design"],
    exampleIncorrectReasoning: {
      en: "We should use Strategy, Decorator, Factory, and Template Method — that is senior OOP.",
      ru: "Нужно Strategy, Decorator, Factory и Template Method — это и есть senior OOP."
    },
    correctedReasoning: {
      en: "Name volatility/audit/retry constraints first, then place only the seams that buy changeability.",
      ru: "Сначала назовите ограничения volatility/audit/retry, затем ставьте только seams, покупающие изменяемость."
    },
    remediationMissionIds: ["mis_senior_oop_tradeoffs"]
  },
  {
    id: "err_trade_deep_inheritance_default",
    code: "ERR_TRADE_DEEP_INHERITANCE_DEFAULT",
    title: {
      en: "Defaulting to Deep Inheritance Trees",
      ru: "Default на Глубокие Деревья Наследования"
    },
    description: {
      en: "Proposing AbstractPaymentBase + multi-level rails as the default for every new PaymentMethod.",
      ru: "Предлагать AbstractPaymentBase + многоуровневые rails как default для каждого нового PaymentMethod."
    },
    conceptIds: ["cpt_overengineering_smell", "cpt_design_tradeoffs"],
    exampleIncorrectReasoning: {
      en: "Inheritance is the OOP way — five levels keep shared audit hooks DRY.",
      ru: "Inheritance — это OOP; пять уровней держат общие audit hooks DRY."
    },
    correctedReasoning: {
      en: "Under high method volatility, composition and registries localize change better than deep trees.",
      ru: "При высокой volatility методов композиция и registries локализуют изменения лучше глубоких деревьев."
    },
    remediationMissionIds: ["mis_senior_oop_tradeoffs"]
  },
  {
    id: "err_trade_always_strategy",
    code: "ERR_TRADE_ALWAYS_STRATEGY",
    title: {
      en: "Always-Strategy Dogma",
      ru: "Догма Always-Strategy"
    },
    description: {
      en: "Wrapping every stable helper in Strategy 'because flexibility'.",
      ru: "Оборачивать каждый стабильный helper в Strategy «ради гибкости»."
    },
    conceptIds: ["cpt_overengineering_smell"],
    exampleIncorrectReasoning: {
      en: "If everything is a Strategy, we are future-proof.",
      ru: "Если всё — Strategy, мы future-proof."
    },
    correctedReasoning: {
      en: "Invent strategies only for independently varying algorithms; otherwise indirection is cost.",
      ru: "Изобретайте strategies только для независимо меняющихся алгоритмов; иначе indirection — цена."
    },
    remediationMissionIds: ["mis_senior_oop_tradeoffs"]
  },
  {
    id: "err_trade_interface_per_class",
    code: "ERR_TRADE_INTERFACE_PER_CLASS",
    title: {
      en: "Interface-per-Class Ceremony",
      ru: "Ceremony Interface-per-Class"
    },
    description: {
      en: "Adding empty marker interfaces without substitution or test seams.",
      ru: "Добавление пустых marker interfaces без подстановки или test seams."
    },
    conceptIds: ["cpt_overengineering_smell"],
    exampleIncorrectReasoning: {
      en: "More interfaces mean Clean Architecture.",
      ru: "Больше интерфейсов — значит Clean Architecture."
    },
    correctedReasoning: {
      en: "Ports need real reasons to substitute; delete markers that buy nothing.",
      ru: "Портам нужны реальные причины подстановки; удаляйте markers, которые ничего не покупают."
    },
    remediationMissionIds: ["mis_senior_oop_tradeoffs"]
  },
  {
    id: "err_trade_no_reversal",
    code: "ERR_TRADE_NO_REVERSAL",
    title: {
      en: "Recommendation Without Reversal Conditions",
      ru: "Рекомендация Без Условий Пересмотра"
    },
    description: {
      en: "Defending one shape as forever correct instead of stating when constraints would flip the choice.",
      ru: "Защита одной формы как навсегда верной вместо условий, когда ограничения перевернут выбор."
    },
    conceptIds: ["cpt_design_tradeoffs", "cpt_constraint_driven_design"],
    exampleIncorrectReasoning: {
      en: "Composition always wins — end of discussion.",
      ru: "Композиция всегда побеждает — конец обсуждения."
    },
    correctedReasoning: {
      en: "State when a shallow Template Method or fewer decorators would be better — no universal winner.",
      ru: "Скажите, когда неглубокий Template Method или меньше decorators будет лучше — нет универсального победителя."
    },
    remediationMissionIds: ["mis_senior_oop_tradeoffs"]
  }
];
