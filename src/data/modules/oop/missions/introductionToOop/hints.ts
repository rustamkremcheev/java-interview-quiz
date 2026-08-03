import { Hint } from '../../../../../types/domain';

export const HINTS_INTRODUCTION_TO_OOP: readonly Hint[] = [
  {
    id: "hnt_intro_1",
    challengeId: "chl_intro_fix_builder",
    level: 1,
    text: {
      en: "Directional Clue: Replace Map + string statuses with ClearingPayment, ClearingPaymentId, and ClearingPaymentStatus.",
      ru: "Направляющая Подсказка: Замените Map + строковые статусы на ClearingPayment, ClearingPaymentId и ClearingPaymentStatus."
    },
    xpPenalty: 10,
    order: 1
  },
  {
    id: "hnt_intro_2",
    challengeId: "chl_intro_fix_builder",
    level: 2,
    text: {
      en: "Concept Reminder: OOP means state+behavior on collaborating objects — not static helpers mutating shared maps.",
      ru: "Напоминание Концепции: ООП значит state+behavior на сотрудничающих объектах — не static-хелперы, мутирующие общие maps."
    },
    xpPenalty: 25,
    order: 2
  },
  {
    id: "hnt_intro_3",
    challengeId: "chl_intro_fix_builder",
    level: 3,
    text: {
      en: "Mechanism Clue: ClearingPaymentWorkflow + ClearingValidationPolicy + ClearingPaymentStore should collaborate; avoid a StaticClearingUtils dump.",
      ru: "Механика: ClearingPaymentWorkflow + ClearingValidationPolicy + ClearingPaymentStore должны сотрудничать; избегайте свалки StaticClearingUtils."
    },
    xpPenalty: 50,
    order: 3
  },
  {
    id: "hnt_intro_4",
    challengeId: "chl_intro_fix_builder",
    level: 4,
    text: {
      en: "Near-Solution Structure: Typed ClearingPayment + workflow transitions + policy rules + store persistence; reject duplicated string if/else helpers.",
      ru: "Структура Решения: Типизированный ClearingPayment + переходы workflow + правила policy + persistence store; отвергните дублированные string if/else хелперы."
    },
    xpPenalty: 75,
    order: 4
  },
  {
    id: "hnt_intro_bug_1",
    challengeId: "chl_intro_bughunt",
    level: 1,
    text: {
      en: "Directional Clue: Look for blind payment.put(\"status\", ...) and a second global helper that also writes status.",
      ru: "Направляющая Подсказка: Ищите слепой payment.put(\"status\", ...) и второй глобальный хелпер, который тоже пишет статус."
    },
    xpPenalty: 10,
    order: 1
  },
  {
    id: "hnt_intro_bug_2",
    challengeId: "chl_intro_bughunt",
    level: 2,
    text: {
      en: "Concept Reminder: Dual writers on a shared map are the procedural smell behind inconsistent NEW_RAIL behavior.",
      ru: "Напоминание Концепции: Dual writers на общей map — процедурный smell за несогласованным поведением NEW_RAIL."
    },
    xpPenalty: 25,
    order: 2
  },
  {
    id: "hnt_intro_bug_3",
    challengeId: "chl_intro_bughunt",
    level: 3,
    text: {
      en: "Near-Solution: Mark the put(\"status\",\"OK\") line and the markOkGlobal(payment) call — those are the defect lines.",
      ru: "Структура Решения: Отметьте строку put(\"status\",\"OK\") и вызов markOkGlobal(payment) — это строки дефекта."
    },
    xpPenalty: 50,
    order: 3
  }
];
