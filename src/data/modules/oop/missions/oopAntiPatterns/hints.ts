import { Hint } from '../../../../../types/domain';

export const HINTS_ANTI_PATTERNS: readonly Hint[] = [
  {
    id: "hnt_ap_1",
    challengeId: "chl_ap_fix_builder",
    level: 1,
    text: {
      en: "Directional Clue: Order currently exposes only getters/setters — that is Fowler's Anemic Domain Model. Business rules should not live exclusively in OrderFulfillmentService.",
      ru: "Направляющая Подсказка: Order сейчас открывает только getters/setters — это Anemic Domain Model по Fowler. Бизнес-правила не должны жить исключительно в OrderFulfillmentService."
    },
    xpPenalty: 10,
    order: 1
  },
  {
    id: "hnt_ap_2",
    challengeId: "chl_ap_fix_builder",
    level: 2,
    text: {
      en: "Concept Reminder: Tell Don't Ask — command Order to place() and reserveInventory(...) instead of pulling getLines()/getCardToken() and calling setters from the God Class.",
      ru: "Напоминание Концепции: Tell Don't Ask — командуйте Order.place() и reserveInventory(...) вместо getLines()/getCardToken() и setters из God Class."
    },
    xpPenalty: 25,
    order: 2
  },
  {
    id: "hnt_ap_3",
    challengeId: "chl_ap_fix_builder",
    level: 3,
    text: {
      en: "Mechanism Clue: Segregate InventoryService and PaymentCapturePort so fulfillment orchestration stays thin and each collaborator is independently testable.",
      ru: "Механика Работы: Выделите InventoryService и PaymentCapturePort, чтобы оркестрация fulfillment оставалась тонкой, а каждый коллаборатор тестировался независимо."
    },
    xpPenalty: 50,
    order: 3
  },
  {
    id: "hnt_ap_4",
    challengeId: "chl_ap_fix_builder",
    level: 4,
    text: {
      en: "Near-Solution Structure: rich Order.place(PaymentCapturePort) + Order.reserveInventory(InventoryService); remove public setters; shrink OrderFulfillmentService to orchestration + email/audit ports.",
      ru: "Структура Решения: богатый Order.place(PaymentCapturePort) + Order.reserveInventory(InventoryService); убрать public setters; сжать OrderFulfillmentService до оркестрации + портов email/audit."
    },
    xpPenalty: 75,
    order: 4
  },
  {
    id: "hnt_ap_bug_1",
    challengeId: "chl_ap_bughunt",
    level: 1,
    text: {
      en: "Directional Clue: Production reserved inventory and marked shipment READY before payment capture succeeded. Which lines mutate Order via setters before charge returns?",
      ru: "Направляющая Подсказка: На проде инвентарь зарезервировали и отгрузку пометили READY до успеха списания. Какие строки мутируют Order через setters до возврата charge?"
    },
    xpPenalty: 10,
    order: 1
  },
  {
    id: "hnt_ap_bug_2",
    challengeId: "chl_ap_bughunt",
    level: 2,
    text: {
      en: "Concept Reminder: Feature Envy setters on an anemic Order bypass invariants — there is no place() gate ensuring PAID before READY.",
      ru: "Напоминание Концепции: Feature Envy setters на анемичном Order обходят инварианты — нет place()-гейта, гарантирующего PAID перед READY."
    },
    xpPenalty: 25,
    order: 2
  },
  {
    id: "hnt_ap_bug_3",
    challengeId: "chl_ap_bughunt",
    level: 3,
    text: {
      en: "Near-Solution: Lines that call order.setReserved(true) and order.setShipmentStatus(\"READY\") before payment.charge(...) are the bug — unpaid inventory ships.",
      ru: "Структура Решения: Строки с order.setReserved(true) и order.setShipmentStatus(\"READY\") до payment.charge(...) — баг: отгружается неоплаченный инвентарь."
    },
    xpPenalty: 50,
    order: 3
  }
];
