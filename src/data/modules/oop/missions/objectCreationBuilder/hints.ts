import { Hint } from '../../../../../types/domain';

export const HINTS_OBJECT_CREATION: readonly Hint[] = [
  {
    id: "hnt_oc_1",
    challengeId: "chl_oc_fix_builder",
    level: 1,
    text: {
      en: "Directional Clue: How many public constructors does the broken SettlementInstruction have? What pattern replaces telescoping constructors for objects with many optional parameters?",
      ru: "Направляющая Подсказка: Сколько публичных конструкторов у сломанного SettlementInstruction? Какой паттерн заменяет телескопические конструкторы для объектов с множеством опциональных параметров?"
    },
    xpPenalty: 10,
    order: 1
  },
  {
    id: "hnt_oc_2",
    challengeId: "chl_oc_fix_builder",
    level: 2,
    text: {
      en: "Concept Reminder: Effective Java Item 1 recommends static factory methods with names like of() and valueOf(). Item 2 recommends Builder for classes with many optional parameters.",
      ru: "Напоминание Концепции: Effective Java Item 1 рекомендует статические фабрики с именами of() и valueOf(). Item 2 рекомендует Builder для классов с множеством опциональных параметров."
    },
    xpPenalty: 25,
    order: 2
  },
  {
    id: "hnt_oc_3",
    challengeId: "chl_oc_fix_builder",
    level: 3,
    text: {
      en: "Mechanism Clue: Named fluent methods like .isTaxExempt(true) and .isAudited(false) on Builder eliminate adjacent boolean literal confusion. build() validates cross-field invariants.",
      ru: "Механика Работы: Именованные fluent-методы .isTaxExempt(true) и .isAudited(false) в Builder устраняют путаницу смежных boolean-литералов. build() проверяет кросс-полевые инварианты."
    },
    xpPenalty: 50,
    order: 3
  },
  {
    id: "hnt_oc_4",
    challengeId: "chl_oc_fix_builder",
    level: 4,
    text: {
      en: "Near-Solution Structure: Select package-private constructor + Builder.builder() + fluent isTaxExempt()/isAudited() + static of() factory + build() invariant validation.",
      ru: "Структура Решения: Выберите package-private конструктор + Builder.builder() + fluent isTaxExempt()/isAudited() + статическую фабрику of() + валидацию инвариантов в build()."
    },
    xpPenalty: 75,
    order: 4
  },
  {
    id: "hnt_oc_bug_1",
    challengeId: "chl_oc_bughunt",
    level: 1,
    text: {
      en: "Directional Clue: Read the developer comments on lines 16-17. Compare them against the 12-arg constructor parameter order (isTaxExempt at position 8, isAudited at position 9).",
      ru: "Направляющая Подсказка: Прочитайте комментарии разработчика на строках 16-17. Сравните с порядком параметров 12-arg конструктора (isTaxExempt на позиции 8, isAudited на позиции 9)."
    },
    xpPenalty: 10,
    order: 1
  },
  {
    id: "hnt_oc_bug_2",
    challengeId: "chl_oc_bughunt",
    level: 2,
    text: {
      en: "Concept Reminder: Java boolean literals at adjacent positions compile identically whether swapped or not. Only named Builder methods eliminate this trap.",
      ru: "Напоминание Концепции: Смежные boolean-литералы компилируются одинаково при перестановке. Только именованные методы Builder устраняют эту ловушку."
    },
    xpPenalty: 25,
    order: 2
  },
  {
    id: "hnt_oc_bug_3",
    challengeId: "chl_oc_bughunt",
    level: 3,
    text: {
      en: "Mechanism Clue: The developer wrote true for 'intended isAudited' first, then true for 'intended isTaxExempt'. But constructor expects isTaxExempt first, then isAudited.",
      ru: "Механика Работы: Разработчик написал true для 'intended isAudited' первым, затем true для 'intended isTaxExempt'. Но конструктор ожидает isTaxExempt первым, затем isAudited."
    },
    xpPenalty: 50,
    order: 3
  },
  {
    id: "hnt_oc_bug_4",
    challengeId: "chl_oc_bughunt",
    level: 4,
    text: {
      en: "Near-Solution Structure: Select lines 17 and 18 — both boolean literal lines where developer intent mismatches constructor parameter binding order.",
      ru: "Структура Решения: Выберите строки 17 и 18 — обе строки с boolean-литералами, где намерение разработчика не совпадает с порядком привязки параметров конструктора."
    },
    xpPenalty: 75,
    order: 4
  }
];
