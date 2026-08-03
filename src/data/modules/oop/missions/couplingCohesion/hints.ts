import { Hint } from '../../../../../types/domain';

export const HINTS_COUPLING_COHESION: readonly Hint[] = [
  {
    id: "hnt_cc_1",
    challengeId: "chl_cc_fix_builder",
    level: 1,
    text: {
      en: "Directional Clue: Count reasons to change in ReconciliationService — validate, ledger IO, PDF, alerts, retry. Each divergent reason wants its own cohesive module.",
      ru: "Направляющая Подсказка: Посчитайте причины меняться в ReconciliationService — validate, ledger IO, PDF, алерты, retry. Каждая расходящаяся причина хочет свой cohesive-модуль."
    },
    xpPenalty: 10,
    order: 1
  },
  {
    id: "hnt_cc_2",
    challengeId: "chl_cc_fix_builder",
    level: 2,
    text: {
      en: "Concept Reminder: Low coupling means an alert-channel swap must not recompile or retest LedgerRepository / ReconciliationReporter — depend on interfaces, not SmtpClient/DataSource.",
      ru: "Напоминание Концепции: Низкий coupling значит, что смена канала алертов не должна перекомпилировать или ретестить LedgerRepository / ReconciliationReporter — зависьте от интерфейсов, не от SmtpClient/DataSource."
    },
    xpPenalty: 25,
    order: 2
  },
  {
    id: "hnt_cc_3",
    challengeId: "chl_cc_fix_builder",
    level: 3,
    text: {
      en: "Mechanism Clue: ReconciliationCoordinator orchestrates validate → load → report → alert; Retry stays on the coordinator; adapters implement AlertPublisher and LedgerRepository at the composition root.",
      ru: "Механика Работы: ReconciliationCoordinator оркестрирует validate → load → report → alert; Retry остаётся на coordinator; адаптеры реализуют AlertPublisher и LedgerRepository в composition root."
    },
    xpPenalty: 50,
    order: 3
  },
  {
    id: "hnt_cc_4",
    challengeId: "chl_cc_fix_builder",
    level: 4,
    text: {
      en: "Near-Solution Structure: ReconciliationValidator + LedgerRepository + ReconciliationReporter + AlertPublisher interfaces/impls + thin ReconciliationCoordinator; reject shared mutable ReportContext across concerns.",
      ru: "Структура Решения: ReconciliationValidator + LedgerRepository + ReconciliationReporter + интерфейсы/impls AlertPublisher + тонкий ReconciliationCoordinator; отвергните shared mutable ReportContext между concerns."
    },
    xpPenalty: 75,
    order: 4
  },
  {
    id: "hnt_cc_bug_1",
    challengeId: "chl_cc_bughunt",
    level: 1,
    text: {
      en: "Directional Clue: PDF went empty after the Slack alert change. Look for alert code that mutates the same structure PDF renders from.",
      ru: "Направляющая Подсказка: PDF стал пустым после смены Slack-алертов. Ищите код алертов, мутирующий ту же структуру, из которой рендерит PDF."
    },
    xpPenalty: 10,
    order: 1
  },
  {
    id: "hnt_cc_bug_2",
    challengeId: "chl_cc_bughunt",
    level: 2,
    text: {
      en: "Concept Reminder: Content coupling via shared mutable ReportContext — one concern writes fields another concern still needs.",
      ru: "Напоминание Концепции: Content coupling через shared mutable ReportContext — один concern пишет поля, которые ещё нужны другому."
    },
    xpPenalty: 25,
    order: 2
  },
  {
    id: "hnt_cc_bug_3",
    challengeId: "chl_cc_bughunt",
    level: 3,
    text: {
      en: "Near-Solution: channelTag assignment and rows.clear() on the alert path corrupt the shared ctx before pdfRenderer.render — those lines are the coupling bug.",
      ru: "Структура Решения: присваивание channelTag и rows.clear() на пути алертов портят общий ctx до pdfRenderer.render — эти строки и есть баг coupling."
    },
    xpPenalty: 50,
    order: 3
  }
];
