import { Hint } from '../../../../../types/domain';

export const HINTS_ACCESS_MODIFIERS: readonly Hint[] = [
  {
    id: "hnt_am_1",
    challengeId: "chl_am_fix_builder",
    level: 1,
    text: {
      en: "Directional Clue: Ask who can call postRaw today — any package (public) or foreign subclasses (protected) means policy is optional.",
      ru: "Направляющая Подсказка: Спросите, кто может вызвать postRaw сегодня — любой пакет (public) или чужие subclasses (protected) значит policy опциональна."
    },
    xpPenalty: 10,
    order: 1
  },
  {
    id: "hnt_am_2",
    challengeId: "chl_am_fix_builder",
    level: 2,
    text: {
      en: "Concept Reminder: Package-private (no modifier) limits members to the same package — ideal for GeneralLedger + InternalPostingPolicy + JournalPostingFacade.",
      ru: "Напоминание Концепции: Package-private (без модификатора) ограничивает члены тем же пакетом — идеально для GeneralLedger + InternalPostingPolicy + JournalPostingFacade."
    },
    xpPenalty: 25,
    order: 2
  },
  {
    id: "hnt_am_3",
    challengeId: "chl_am_fix_builder",
    level: 3,
    text: {
      en: "Mechanism Clue: Make postRaw package-private (or private), stop foreign-package subclassing of GeneralLedger, and post only via JournalPostingFacade after policy checks.",
      ru: "Механика: Сделайте postRaw package-private (или private), запретите subclassing GeneralLedger из чужого пакета и постите только через JournalPostingFacade после policy."
    },
    xpPenalty: 50,
    order: 3
  },
  {
    id: "hnt_am_4",
    challengeId: "chl_am_fix_builder",
    level: 4,
    text: {
      en: "Near-Solution: Narrow access on ledger mutators + facade-only public API + reject protected-for-foreign-subclass and public postRaw-as-convenience.",
      ru: "Структура Решения: Сузьте access mutators ledger + только facade как public API + отклоните protected-для-чужого-subclass и public postRaw-как-удобство."
    },
    xpPenalty: 75,
    order: 4
  },
  {
    id: "hnt_am_bug_1",
    challengeId: "chl_am_bughunt",
    level: 1,
    text: {
      en: "Directional Clue: Look for protected/public on postRaw and a subclass outside com.bank.ledger.core that calls it.",
      ru: "Направляющая Подсказка: Ищите protected/public у postRaw и subclass вне com.bank.ledger.core, который его вызывает."
    },
    xpPenalty: 10,
    order: 1
  },
  {
    id: "hnt_am_bug_2",
    challengeId: "chl_am_bughunt",
    level: 2,
    text: {
      en: "Concept Reminder: The defect is the widened access that lets ReconciliationHook skip InternalPostingPolicy — not the facade method itself.",
      ru: "Напоминание Концепции: Дефект — расширенный access, позволяющий ReconciliationHook обойти InternalPostingPolicy, а не сам метод facade."
    },
    xpPenalty: 25,
    order: 2
  },
  {
    id: "hnt_am_bug_3",
    challengeId: "chl_am_bughunt",
    level: 3,
    text: {
      en: "Near-Solution: Flag the protected/public postRaw declaration and the foreign-package subclass call that bypasses the facade.",
      ru: "Структура Решения: Отметьте объявление protected/public postRaw и вызов из subclass чужого пакета, обходящий facade."
    },
    xpPenalty: 50,
    order: 3
  }
];
