import { Hint } from '../../../../../types/domain';

export const HINTS_BANK_ACCOUNT: readonly Hint[] = [
  {
    id: "hnt_bank_1",
    challengeId: "chl_bank_fix_builder",
    level: 1,
    text: {
      en: "Directional Clue: Focus on how external callers modify balance. What modifier prevents direct field access from outside the class?",
      ru: "Направляющая Подсказка: Обратите внимание, как внешний код меняет баланс. Какой модификатор запрещает прямой доступ к полю снаружи?"
    },
    xpPenalty: 10,
    order: 1
  },
  {
    id: "hnt_bank_2",
    challengeId: "chl_bank_fix_builder",
    level: 2,
    text: {
      en: "Concept Reminder: Encapsulation requires validating preconditions inside the constructor and methods before state mutation occurs.",
      ru: "Напоминание Концепции: Инкапсуляция требует валидации предусловий в конструкторе и методах перед изменением состояния."
    },
    xpPenalty: 25,
    order: 2
  },
  {
    id: "hnt_bank_3",
    challengeId: "chl_bank_fix_builder",
    level: 3,
    text: {
      en: "Runtime Mechanism Clue: Instead of public setBalance(double), provide deposit(long) and withdraw(long) that throw IllegalArgumentException or IllegalStateException when guards fail.",
      ru: "Механика Работы: Вместо публичного setBalance(double) используйте deposit(long) и withdraw(long), выбрасывающие исключения при ошибках."
    },
    xpPenalty: 50,
    order: 3
  },
  {
    id: "hnt_bank_4",
    challengeId: "chl_bank_fix_builder",
    level: 4,
    text: {
      en: "Near-Solution Structure: Make balance private long balanceInCents. Validate initialBalanceInCents >= 0 in the constructor.",
      ru: "Структура Решения: Сделайте баланс private long balanceInCents. Проверяйте initialBalanceInCents >= 0 в конструкторе."
    },
    xpPenalty: 75,
    order: 4
  },
  // Hints for BugHunt Challenge
  {
    id: "hnt_bug_1",
    challengeId: "chl_bank_bughunt",
    level: 1,
    text: {
      en: "Directional Clue: Look at how java.util.Date objects are assigned inside the constructor and returned by the getter.",
      ru: "Направляющая Подсказка: Посмотрите, как объекты java.util.Date присваиваются в конструкторе и возвращаются из геттера."
    },
    xpPenalty: 10,
    order: 1
  },
  {
    id: "hnt_bug_2",
    challengeId: "chl_bank_bughunt",
    level: 2,
    text: {
      en: "Concept Reminder: java.util.Date is a mutable object. Declaring the field `final` prevents re-assigning the reference, but does NOT prevent modifying the Date's internal timestamp!",
      ru: "Напоминание Концепции: java.util.Date — мутабельный объект. Объявление поля final запрещает переприсвоение ссылки, но НЕ запрещает менять дата-штамп внутри объекта!"
    },
    xpPenalty: 25,
    order: 2
  },
  {
    id: "hnt_bug_3",
    challengeId: "chl_bank_bughunt",
    level: 3,
    text: {
      en: "Mechanism Clue: Line 10 (this.startDate = startDate) and Line 16 (return startDate) both leak internal mutable state. Defensive copying fixes this: new Date(startDate.getTime()).",
      ru: "Механика Работы: Строка 10 (this.startDate = startDate) и Строка 16 (return startDate) приводят к утечке состояния. Защитное копирование решает проблему: new Date(startDate.getTime())."
    },
    xpPenalty: 50,
    order: 3
  },
  {
    id: "hnt_bug_4",
    challengeId: "chl_bank_bughunt",
    level: 4,
    text: {
      en: "Near-Solution Structure: Select Line 10 or Line 16 in the Bug Hunt editor. Both represent mutable reference leaks.",
      ru: "Структура Решения: Выберите строку 10 или строку 16 в редакторе Bug Hunt. Обе содержат утечку мутабельной ссылки."
    },
    xpPenalty: 75,
    order: 4
  }
];
