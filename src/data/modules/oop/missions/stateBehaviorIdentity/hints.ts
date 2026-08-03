import { Hint } from '../../../../../types/domain';

export const HINTS_STATE_BEHAVIOR_IDENTITY: readonly Hint[] = [
  {
    id: "hnt_sbi_1",
    challengeId: "chl_sbi_fix_builder",
    level: 1,
    text: {
      en: "Directional Clue: Ask which TransferId is being processed — matching amount/beneficiary does not answer that question.",
      ru: "Направляющая Подсказка: Спросите, какой TransferId обрабатывается — совпадение amount/бенефициара на этот вопрос не отвечает."
    },
    xpPenalty: 10,
    order: 1
  },
  {
    id: "hnt_sbi_2",
    challengeId: "chl_sbi_fix_builder",
    level: 2,
    text: {
      en: "Concept Reminder: State is fields; behavior is rule-bound transitions; identity is TransferId that persists while state changes.",
      ru: "Напоминание Концепции: State — поля; behavior — переходы по правилам; identity — TransferId, сохраняющийся при смене state."
    },
    xpPenalty: 25,
    order: 2
  },
  {
    id: "hnt_sbi_3",
    challengeId: "chl_sbi_fix_builder",
    level: 3,
    text: {
      en: "Mechanism Clue: Idempotency set keyed by TransferId + submit()/settle()/cancel() instead of setTransferState(...).",
      ru: "Механика: Множество идемпотентности по TransferId + submit()/settle()/cancel() вместо setTransferState(...)."
    },
    xpPenalty: 50,
    order: 3
  },
  {
    id: "hnt_sbi_4",
    challengeId: "chl_sbi_fix_builder",
    level: 4,
    text: {
      en: "Near-Solution: Identity-keyed processing + transition methods + immutable TransferId with audit entries; reject field-sameness skip and equals/hashCode HashMap 'fix'.",
      ru: "Структура Решения: Обработка по identity + transition-методы + неизменный TransferId с audit; отклоните skip по совпадению полей и «фикс» equals/hashCode HashMap."
    },
    xpPenalty: 75,
    order: 4
  },
  {
    id: "hnt_sbi_bug_1",
    challengeId: "chl_sbi_bughunt",
    level: 1,
    text: {
      en: "Directional Clue: Look for a comparison that ignores TransferId and a direct setTransferState call.",
      ru: "Направляющая Подсказка: Ищите сравнение, игнорирующее TransferId, и прямой вызов setTransferState."
    },
    xpPenalty: 10,
    order: 1
  },
  {
    id: "hnt_sbi_bug_2",
    challengeId: "chl_sbi_bughunt",
    level: 2,
    text: {
      en: "Concept Reminder: sameStateAs is about mutable fields; identity collapse and setter bypass are the defects.",
      ru: "Напоминание Концепции: sameStateAs — про мутабельные поля; дефекты — слияние identity и обход через setter."
    },
    xpPenalty: 25,
    order: 2
  },
  {
    id: "hnt_sbi_bug_3",
    challengeId: "chl_sbi_bughunt",
    level: 3,
    text: {
      en: "Near-Solution: Flag the sameStateAs gate and the public setTransferState line.",
      ru: "Структура Решения: Отметьте гейт sameStateAs и строку публичного setTransferState."
    },
    xpPenalty: 50,
    order: 3
  }
];
