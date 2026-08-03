import { Hint } from '../../../../../types/domain';

export const HINTS_LISKOV: readonly Hint[] = [
  {
    id: "hnt_lsp_1",
    challengeId: "chl_lsp_fix_builder",
    level: 1,
    text: {
      en: "Directional Clue: LSP is about behavior, not inheritance diagrams. Can every PaymentProcessor safely receive refund()?",
      ru: "Направляющая Подсказка: LSP — о поведении, а не о диаграммах наследования. Может ли каждый PaymentProcessor безопасно принять refund()?"
    },
    xpPenalty: 10,
    order: 1
  },
  {
    id: "hnt_lsp_2",
    challengeId: "chl_lsp_fix_builder",
    level: 2,
    text: {
      en: "Concept Reminder: Claiming a fat interface and throwing UnsupportedOperationException for unsupported methods is an anti-pattern. Prefer capability segregation.",
      ru: "Напоминание Концепции: Заявлять жирный интерфейс и бросать UnsupportedOperationException для неподдерживаемых методов — антипаттерн. Предпочитайте сегрегацию capabilities."
    },
    xpPenalty: 25,
    order: 2
  },
  {
    id: "hnt_lsp_3",
    challengeId: "chl_lsp_fix_builder",
    level: 3,
    text: {
      en: "Mechanism Clue: Split process-only charge paths from refund/chargeback paths. What explicit type signals refund capability better than PaymentProcessor?",
      ru: "Механика Работы: Разделите process-only charge-пути и refund/chargeback-пути. Какой явный тип лучше PaymentProcessor сигнализирует поддержку refund?"
    },
    xpPenalty: 50,
    order: 3
  },
  {
    id: "hnt_lsp_4",
    challengeId: "chl_lsp_fix_builder",
    level: 4,
    text: {
      en: "Near-Solution Structure: PaymentProcessor (process) + RefundablePaymentProcessor (refund) + CardPayment implements both; BankTransfer implements process-only.",
      ru: "Структура Решения: PaymentProcessor (process) + RefundablePaymentProcessor (refund) + CardPayment реализует оба; BankTransfer — только process."
    },
    xpPenalty: 75,
    order: 4
  },
  {
    id: "hnt_lsp_bug_1",
    challengeId: "chl_lsp_bughunt",
    level: 1,
    text: {
      en: "Directional Clue: Find where refund() is overridden to throw, and where the orchestrator calls refund() assuming success.",
      ru: "Направляющая Подсказка: Найдите, где refund() переопределен с throw, и где оркестратор вызывает refund(), ожидая успех."
    },
    xpPenalty: 10,
    order: 1
  },
  {
    id: "hnt_lsp_bug_2",
    challengeId: "chl_lsp_bughunt",
    level: 2,
    text: {
      en: "Concept Reminder: The LSP violation is DEFINED in the subtype (BankTransfer.refund throws). The CRASH happens at the call site (processor.refund).",
      ru: "Напоминание Концепции: Нарушение LSP ОПРЕДЕЛЕНО в подтипе (BankTransfer.refund бросает). СБОЙ происходит в месте вызова (processor.refund)."
    },
    xpPenalty: 25,
    order: 2
  },
  {
    id: "hnt_lsp_bug_3",
    challengeId: "chl_lsp_bughunt",
    level: 3,
    text: {
      en: "Mechanism Clue: Line 7 defines the contract break. Line 13 is where UnsupportedOperationException surfaces during nightly chargeback.",
      ru: "Механика Работы: Строка 7 определяет нарушение контракта. Строка 13 — место UnsupportedOperationException при ночном chargeback."
    },
    xpPenalty: 50,
    order: 3
  },
  {
    id: "hnt_lsp_bug_4",
    challengeId: "chl_lsp_bughunt",
    level: 4,
    text: {
      en: "Near-Solution Structure: Select BOTH Line 7 (violation definition) AND Line 13 (runtime failure site).",
      ru: "Структура Решения: Выберите ОБЕ строки — Line 7 (определение нарушения) И Line 13 (место падения)."
    },
    xpPenalty: 75,
    order: 4
  }
];
