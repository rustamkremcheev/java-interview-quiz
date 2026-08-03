import { Hint } from '../../../../../types/domain';

export const HINTS_IMMUTABILITY: readonly Hint[] = [
  {
    id: "hnt_imm_1",
    challengeId: "chl_imm_fix_builder",
    level: 1,
    text: {
      en: "Directional Clue: Fraud/ops mutated snapshot state without calling any setter. Which methods exposed internal mutable List, Money, or Date objects?",
      ru: "Направляющая Подсказка: Fraud/ops изменил состояние снимка без вызова сеттеров. Какие методы открыли доступ к внутренним мутабельным объектам List, Money или Date?"
    },
    xpPenalty: 10,
    order: 1
  },
  {
    id: "hnt_imm_2",
    challengeId: "chl_imm_fix_builder",
    level: 2,
    text: {
      en: "Concept Reminder: `private final` prevents reassigning the reference variable, but does NOT prevent mutating the object the reference points to (ArrayList.add, Date.setTime, shared BigDecimal).",
      ru: "Напоминание Концепции: `private final` запрещает переприсвоение ссылки, но НЕ запрещает мутацию объекта по этой ссылке (ArrayList.add, Date.setTime, общий BigDecimal)."
    },
    xpPenalty: 25,
    order: 2
  },
  {
    id: "hnt_imm_3",
    challengeId: "chl_imm_fix_builder",
    level: 3,
    text: {
      en: "Mechanism Clue: Use List.copyOf(transactions) in the CustomerSnapshot constructor. Model Money as a record with long amountCents. Replace Date with java.time.Instant for bookedAt.",
      ru: "Механика Работы: Используйте List.copyOf(transactions) в конструкторе CustomerSnapshot. Моделируйте Money как record с long amountCents. Замените Date на java.time.Instant для bookedAt."
    },
    xpPenalty: 50,
    order: 3
  },
  {
    id: "hnt_imm_4",
    challengeId: "chl_imm_fix_builder",
    level: 4,
    text: {
      en: "Near-Solution Structure: Constructor applies List.copyOf on transactions. Money uses immutable long cents. bookedAt becomes Instant. Internal list is already unmodifiable, so getTransactions() is safe.",
      ru: "Структура Решения: Конструктор применяет List.copyOf к transactions. Money использует неизменяемые long cents. bookedAt становится Instant. Внутренний список уже неизменяем, поэтому getTransactions() безопасен."
    },
    xpPenalty: 75,
    order: 4
  },
  {
    id: "hnt_imm_bug_1",
    challengeId: "chl_imm_bughunt",
    level: 1,
    text: {
      en: "Directional Clue: Look at how List, BigDecimal, and Date objects are assigned in constructors and returned by getters across Money, Transaction, and CustomerSnapshot.",
      ru: "Направляющая Подсказка: Посмотрите, как объекты List, BigDecimal и Date присваиваются в конструкторах и возвращаются из геттеров в Money, Transaction и CustomerSnapshot."
    },
    xpPenalty: 10,
    order: 1
  },
  {
    id: "hnt_imm_bug_2",
    challengeId: "chl_imm_bughunt",
    level: 2,
    text: {
      en: "Concept Reminder: ArrayList, BigDecimal (when shared), and java.util.Date are mutable. Returning them directly from getters leaks internal state to external callers.",
      ru: "Напоминание Концепции: ArrayList, BigDecimal (при шаринге) и java.util.Date мутабельны. Возврат их напрямую из геттеров утекает внутреннее состояние к внешним вызывающим."
    },
    xpPenalty: 25,
    order: 2
  },
  {
    id: "hnt_imm_bug_3",
    challengeId: "chl_imm_bughunt",
    level: 3,
    text: {
      en: "Mechanism Clue: Key leak lines — Money.getAmount() return, Transaction constructor Date assignment, getBookedAt() return, and CustomerSnapshot.getTransactions() return. All enable settlement corruption.",
      ru: "Механика Работы: Ключевые строки утечек — return в Money.getAmount(), присвоение Date в конструкторе Transaction, return в getBookedAt() и return в CustomerSnapshot.getTransactions(). Все позволяют портить settlement."
    },
    xpPenalty: 50,
    order: 3
  },
  {
    id: "hnt_imm_bug_4",
    challengeId: "chl_imm_bughunt",
    level: 4,
    text: {
      en: "Near-Solution Structure: Select the Money.getAmount() return line, the Transaction Date assignment / getBookedAt() return, and/or the getTransactions() return line in the Bug Hunt editor.",
      ru: "Структура Решения: Выберите строку return в Money.getAmount(), присвоение Date / return getBookedAt() в Transaction и/или строку return в getTransactions() в редакторе Bug Hunt."
    },
    xpPenalty: 75,
    order: 4
  }
];
