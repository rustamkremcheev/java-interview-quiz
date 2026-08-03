import { Hint } from '../../../../../types/domain';

export const HINTS_OVERLOADING: readonly Hint[] = [
  {
    id: "hnt_ol_1",
    challengeId: "chl_ol_fix_builder",
    level: 1,
    text: {
      en: "Directional Clue: Overloading is chosen by the compiler from static types. Can one name safely mean both cents and dollars?",
      ru: "Направляющая Подсказка: Перегрузку выбирает компилятор по статическим типам. Может ли одно имя безопасно означать и центы, и доллары?"
    },
    xpPenalty: 10,
    order: 1
  },
  {
    id: "hnt_ol_2",
    challengeId: "chl_ol_fix_builder",
    level: 2,
    text: {
      en: "Concept Reminder: Effective Java Item 41 — use overloading sparingly. Prefer distinct names when parameter types are easily confused.",
      ru: "Напоминание Концепции: Effective Java Item 41 — используйте перегрузку умеренно. Предпочитайте разные имена, когда типы параметров легко спутать."
    },
    xpPenalty: 25,
    order: 2
  },
  {
    id: "hnt_ol_3",
    challengeId: "chl_ol_fix_builder",
    level: 3,
    text: {
      en: "Mechanism Clue: settle(null) is ambiguous across Long/BigDecimal/String. Integer unboxes to settle(long), not settle(Long).",
      ru: "Механика Работы: settle(null) неоднозначен между Long/BigDecimal/String. Integer unboxится в settle(long), не в settle(Long)."
    },
    xpPenalty: 50,
    order: 3
  },
  {
    id: "hnt_ol_4",
    challengeId: "chl_ol_fix_builder",
    level: 4,
    text: {
      en: "Near-Solution Structure: settleCents(long) + settleDecimal(BigDecimal) + remove null-ambiguous settle(Long)/settle triple.",
      ru: "Структура Решения: settleCents(long) + settleDecimal(BigDecimal) + убрать null-неоднозначные settle(Long)/тройку settle."
    },
    xpPenalty: 75,
    order: 4
  },
  {
    id: "hnt_ol_bug_1",
    challengeId: "chl_ol_bughunt",
    level: 1,
    text: {
      en: "Directional Clue: Find where conflicting settle overloads are declared, and where the Integer DTO call invokes settle.",
      ru: "Направляющая Подсказка: Найдите, где объявлены конфликтующие перегрузки settle, и где DTO с Integer вызывает settle."
    },
    xpPenalty: 10,
    order: 1
  },
  {
    id: "hnt_ol_bug_2",
    challengeId: "chl_ol_bughunt",
    level: 2,
    text: {
      en: "Concept Reminder: The API bug is the overload set (cents vs decimal under one name). The production call site is svc.settle(amountCents).",
      ru: "Напоминание Концепции: Баг API — набор перегрузок (центы vs decimal под одним именем). Продакшн call site — svc.settle(amountCents)."
    },
    xpPenalty: 25,
    order: 2
  },
  {
    id: "hnt_ol_bug_3",
    challengeId: "chl_ol_bughunt",
    level: 3,
    text: {
      en: "Mechanism Clue: Lines declaring settle(long) and settle(BigDecimal) define the scale conflict. Line svc.settle(amountCents) is the Integer unboxing trap.",
      ru: "Механика Работы: Строки с settle(long) и settle(BigDecimal) задают конфликт масштаба. Строка svc.settle(amountCents) — ловушка unboxing Integer."
    },
    xpPenalty: 50,
    order: 3
  },
  {
    id: "hnt_ol_bug_4",
    challengeId: "chl_ol_bughunt",
    level: 4,
    text: {
      en: "Near-Solution Structure: Select settle(long) declaration, settle(BigDecimal) declaration, AND the svc.settle(amountCents) call site.",
      ru: "Структура Решения: Выберите объявление settle(long), объявление settle(BigDecimal) И call site svc.settle(amountCents)."
    },
    xpPenalty: 75,
    order: 4
  }
];
