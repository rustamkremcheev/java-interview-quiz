import { Hint } from '../../../../../types/domain';

export const HINTS_CONSTRUCTORS_INITIALIZATION: readonly Hint[] = [
  {
    id: "hnt_ci_1",
    challengeId: "chl_ci_fix_builder",
    level: 1,
    text: {
      en: "Directional Clue: Ask when Counterparty becomes non-null relative to TradeRegistry.register(...).",
      ru: "Направляющая Подсказка: Спросите, когда Counterparty становится non-null относительно TradeRegistry.register(...)."
    },
    xpPenalty: 10,
    order: 1
  },
  {
    id: "hnt_ci_2",
    challengeId: "chl_ci_fix_builder",
    level: 2,
    text: {
      en: "Concept Reminder: this-escape means publishing a reference before construction finishes; listeners may read defaults.",
      ru: "Напоминание Концепции: this-escape — публикация ссылки до конца construction; listeners могут читать defaults."
    },
    xpPenalty: 25,
    order: 2
  },
  {
    id: "hnt_ci_3",
    challengeId: "chl_ci_fix_builder",
    level: 3,
    text: {
      en: "Mechanism Clue: Static factory builds TradeRegistration, then registry.register(built); validation should be final/private in the ctor path.",
      ru: "Механика: Static factory собирает TradeRegistration, затем registry.register(built); validation в пути ctor — final/private."
    },
    xpPenalty: 50,
    order: 3
  },
  {
    id: "hnt_ci_4",
    challengeId: "chl_ci_fix_builder",
    level: 4,
    text: {
      en: "Near-Solution: Full field init + factory-after-new register + no overridable ctor calls; reject early register(this) and synchronized(this) 'fixes'.",
      ru: "Структура Решения: Полный init полей + register после new в factory + без overridable вызовов из ctor; отклоните ранний register(this) и «фиксы» synchronized(this)."
    },
    xpPenalty: 75,
    order: 4
  },
  {
    id: "hnt_ci_bug_1",
    challengeId: "chl_ci_bughunt",
    level: 1,
    text: {
      en: "Directional Clue: Look for register(this) before field assignments and a validate() call in the constructor.",
      ru: "Направляющая Подсказка: Ищите register(this) до присвоений полей и вызов validate() в конструкторе."
    },
    xpPenalty: 10,
    order: 1
  },
  {
    id: "hnt_ci_bug_2",
    challengeId: "chl_ci_bughunt",
    level: 2,
    text: {
      en: "Concept Reminder: Overridable methods from constructors are a separate but related initialization hazard.",
      ru: "Напоминание Концепции: Переопределяемые методы из конструкторов — отдельная, но связанная опасность инициализации."
    },
    xpPenalty: 25,
    order: 2
  },
  {
    id: "hnt_ci_bug_3",
    challengeId: "chl_ci_bughunt",
    level: 3,
    text: {
      en: "Near-Solution: Flag registry.register(this) and the overridable validate() line.",
      ru: "Структура Решения: Отметьте registry.register(this) и строку переопределяемого validate()."
    },
    xpPenalty: 50,
    order: 3
  }
];
