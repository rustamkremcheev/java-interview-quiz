import { Hint } from '../../../../../types/domain';

export const HINTS_COMPOSITION: readonly Hint[] = [
  {
    id: "hnt_comp_01",
    challengeId: "chl_comp_fix_builder",
    level: 1,
    text: {
      en: "Directional Clue: Effective Java Item 18 asks — does EmailNotificationService need to BE a NotificationService, or does it need to USE EmailSender and SmsSender?",
      ru: "Направляющая Подсказка: Effective Java Item 18 спрашивает — EmailNotificationService должен БЫТЬ NotificationService или ИСПОЛЬЗОВАТЬ EmailSender и SmsSender?"
    },
    xpPenalty: 10,
    order: 1
  },
  {
    id: "hnt_comp_02",
    challengeId: "chl_comp_fix_builder",
    level: 2,
    text: {
      en: "Concept Reminder: When a subclass overrides both send() and sendBatch(), check whether the base class bulk method internally calls the single-element method.",
      ru: "Напоминание Концепции: Когда подкласс переопределяет send() и sendBatch(), проверьте, вызывает ли массовый метод базового класса одиночный метод."
    },
    xpPenalty: 25,
    order: 2
  },
  {
    id: "hnt_comp_03",
    challengeId: "chl_comp_fix_builder",
    level: 3,
    text: {
      en: "Mechanism Clue: NotificationService.sendBatch() internally invokes send(n) for each recipient. Counting in BOTH methods doubles deliveryCount.",
      ru: "Механика Работы: NotificationService.sendBatch() внутренне вызывает send(n) для каждого получателя. Подсчет в ОБОИХ методах удваивает deliveryCount."
    },
    xpPenalty: 50,
    order: 3
  },
  {
    id: "hnt_comp_04",
    challengeId: "chl_comp_fix_builder",
    level: 4,
    text: {
      en: "Near-Solution Structure: Replace `extends NotificationService` with NotificationDispatcher + EmailSender/SmsSender delegates. Instrument ONLY send() for delivery counting.",
      ru: "Структура Решения: Замените `extends NotificationService` на NotificationDispatcher + делегаты EmailSender/SmsSender. Инструментируйте ТОЛЬКО send() для подсчета доставок."
    },
    xpPenalty: 75,
    order: 4
  },
  {
    id: "hnt_comp_05",
    challengeId: "chl_comp_bughunt",
    level: 1,
    text: {
      en: "Directional Clue: Look at both send() and sendBatch() — do they BOTH modify deliveryCount?",
      ru: "Направляющая Подсказка: Посмотрите на send() и sendBatch() — оба ли они изменяют deliveryCount?"
    },
    xpPenalty: 10,
    order: 1
  },
  {
    id: "hnt_comp_06",
    challengeId: "chl_comp_bughunt",
    level: 2,
    text: {
      en: "Mechanism Clue: The pre-count in sendBatch() (deliveryCount += batch.size()) AND the send() override (deliveryCount++) together cause 2× counting when super.sendBatch() runs.",
      ru: "Механика Работы: Предварительный подсчет в sendBatch() (deliveryCount += batch.size()) И переопределение send() (deliveryCount++) вместе вызывают 2× подсчет при выполнении super.sendBatch()."
    },
    xpPenalty: 25,
    order: 2
  }
];
