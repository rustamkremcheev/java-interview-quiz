import { Hint } from '../../../../../types/domain';

export const HINTS_UPCASTING_DOWNCASTING: readonly Hint[] = [
  {
    id: "hnt_cast_1",
    challengeId: "chl_cast_fix_builder",
    level: 1,
    text: {
      en: "Directional Clue: Accepting FraudEvent is fine (upcast). The crash comes from narrowing back to CardFraudEvent without a type test.",
      ru: "Направляющая Подсказка: Приём FraudEvent нормален (upcast). Краш — от сужения обратно к CardFraudEvent без проверки типа."
    },
    xpPenalty: 10,
    order: 1
  },
  {
    id: "hnt_cast_2",
    challengeId: "chl_cast_fix_builder",
    level: 2,
    text: {
      en: "Concept Reminder: Downcasts are runtime-checked. AchFraudEvent is a FraudEvent but not a CardFraudEvent — ClassCastException is expected for a blind cast.",
      ru: "Напоминание Концепции: Downcast проверяются в runtime. AchFraudEvent — FraudEvent, но не CardFraudEvent — ClassCastException ожидаем для слепого cast."
    },
    xpPenalty: 25,
    order: 2
  },
  {
    id: "hnt_cast_3",
    challengeId: "chl_cast_fix_builder",
    level: 3,
    text: {
      en: "Mechanism Clue: Java 17 `instanceof CardFraudEvent card` binds safely; better still, FraudEvent.extractEvidence() overridden per subtype removes casts.",
      ru: "Механика Работы: Java 17 `instanceof CardFraudEvent card` привязывает безопасно; ещё лучше — FraudEvent.extractEvidence() с override по подтипам убирает cast'ы."
    },
    xpPenalty: 50,
    order: 3
  },
  {
    id: "hnt_cast_4",
    challengeId: "chl_cast_fix_builder",
    level: 4,
    text: {
      en: "Near-Solution Structure: Keep FraudEvent API + pattern matching branches and/or abstract extractEvidence() on Card/Wire/Ach; never catch ClassCastException as control flow.",
      ru: "Структура Решения: Сохранить API FraudEvent + ветки pattern matching и/или abstract extractEvidence() на Card/Wire/Ach; никогда не ловить ClassCastException как control flow."
    },
    xpPenalty: 75,
    order: 4
  },
  {
    id: "hnt_cast_bug_1",
    challengeId: "chl_cast_bughunt",
    level: 1,
    text: {
      en: "Directional Clue: ACH is neither CARD nor WIRE in the if-chain — look where execution falls through after those branches.",
      ru: "Направляющая Подсказка: ACH — ни CARD, ни WIRE в if-цепочке — ищите, куда падает выполнение после этих веток."
    },
    xpPenalty: 10,
    order: 1
  },
  {
    id: "hnt_cast_bug_2",
    challengeId: "chl_cast_bughunt",
    level: 2,
    text: {
      en: "Concept Reminder: `(CardFraudEvent) event` compiles against FraudEvent but throws when the runtime object is AchFraudEvent.",
      ru: "Напоминание Концепции: `(CardFraudEvent) event` компилируется для FraudEvent, но бросает, когда runtime-объект — AchFraudEvent."
    },
    xpPenalty: 25,
    order: 2
  },
  {
    id: "hnt_cast_bug_3",
    challengeId: "chl_cast_bughunt",
    level: 3,
    text: {
      en: "Near-Solution: The fallback `(CardFraudEvent) event` after CARD/WIRE checks is the 02:00 crash line for AchFraudEvent; CARD/WIRE casts are the same unsafe pattern.",
      ru: "Структура Решения: Fallback `(CardFraudEvent) event` после проверок CARD/WIRE — строка краша в 02:00 для AchFraudEvent; cast'ы CARD/WIRE — тот же небезопасный паттерн."
    },
    xpPenalty: 50,
    order: 3
  }
];
