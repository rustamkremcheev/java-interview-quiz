import { CodeArtifact } from '../../../../../types/domain';

export const CODE_ARTIFACTS_ANTI_PATTERNS: readonly CodeArtifact[] = [
  {
    id: "art_ap_anemic_order",
    type: "QUESTION_CODE",
    language: "java",
    javaVersion: "17",
    title: {
      en: "Anemic Order DTO — Getters and Setters Only",
      ru: "Анемичный Order DTO — Только Getters и Setters"
    },
    sourceCode: `package com.shop.order;

import java.util.ArrayList;
import java.util.List;

/**
 * Anemic Domain Model (Fowler): data bag with no business behavior.
 * All invariants live in OrderFulfillmentService — duplicated and skippable.
 */
public class Order {

    private String id;
    private String email;
    private String cardToken;
    private String status;
    private boolean reserved;
    private String shipmentStatus;
    private List<OrderLine> lines = new ArrayList<>();

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getCardToken() { return cardToken; }
    public void setCardToken(String cardToken) { this.cardToken = cardToken; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public boolean isReserved() { return reserved; }
    public void setReserved(boolean reserved) { this.reserved = reserved; }

    public String getShipmentStatus() { return shipmentStatus; }
    public void setShipmentStatus(String shipmentStatus) { this.shipmentStatus = shipmentStatus; }

    public List<OrderLine> getLines() { return lines; }
    public void setLines(List<OrderLine> lines) { this.lines = lines; }

    public int total() {
        return lines.stream().mapToInt(OrderLine::getPriceCents).sum();
    }
}`,
    annotations: [
      {
        id: "ann_anemic_1",
        startLine: 20,
        endLine: 40,
        category: "PROBLEM_IN_ORIGINAL_CODE",
        title: { en: "Public Setters Bypass Invariants", ru: "Public Setters Обходят Инварианты" },
        explanation: {
          en: "Any service can call setReserved(true) / setShipmentStatus(\"READY\") without payment success — classic anemia + Feature Envy target.",
          ru: "Любой сервис может вызвать setReserved(true) / setShipmentStatus(\"READY\") без успеха оплаты — классическая анемия + цель Feature Envy."
        },
        problemSolved: {
          en: "Exposes why behavior must move onto Order (place/reserveInventory).",
          ru: "Показывает, почему поведение должно переехать на Order (place/reserveInventory)."
        },
        conceptDemonstrated: "cpt_anemic_domain_model"
      }
    ],
    relatedQuestionIds: ["q_ap_order_01"],
    conceptIds: ["cpt_anemic_domain_model"],
    tags: ["#anemic-model", "#order", "#dto"]
  },
  {
    id: "art_ap_order_line",
    type: "QUESTION_CODE",
    language: "java",
    javaVersion: "17",
    title: {
      en: "OrderLine Value — SKU and Price",
      ru: "OrderLine Value — SKU и Цена"
    },
    sourceCode: `package com.shop.order;

public class OrderLine {

    private final String sku;
    private final int quantity;
    private final int priceCents;

    public OrderLine(String sku, int quantity, int priceCents) {
        this.sku = sku;
        this.quantity = quantity;
        this.priceCents = priceCents;
    }

    public String getSku() { return sku; }
    public int getQuantity() { return quantity; }
    public int getPriceCents() { return priceCents; }
}`,
    annotations: [
      {
        id: "ann_line_1",
        startLine: 3,
        endLine: 16,
        category: "WHY_IT_EXISTS",
        title: { en: "Line Item Carrier", ru: "Носитель Позиции Заказа" },
        explanation: {
          en: "OrderLine holds SKU/qty/price used by Feature Envy streams in the God Class and later by rich Order.reserveInventory().",
          ru: "OrderLine держит SKU/qty/price, используемые Feature Envy streams в God Class и затем богатым Order.reserveInventory()."
        },
        conceptDemonstrated: "cpt_anemic_domain_model"
      }
    ],
    relatedQuestionIds: ["q_ap_order_01"],
    conceptIds: ["cpt_anemic_domain_model"],
    tags: ["#order-line", "#domain"]
  },
  {
    id: "art_ap_fulfillment_broken",
    type: "COUNTER_EXAMPLE",
    language: "java",
    javaVersion: "17",
    title: {
      en: "Broken Baseline: OrderFulfillmentService God Class",
      ru: "Исходный Нарушенный Код: God Class OrderFulfillmentService"
    },
    sourceCode: `package com.shop.fulfillment;

import com.shop.order.Order;
import com.shop.order.OrderLine;

/**
 * GOD CLASS (~4000 lines in production; excerpt below).
 * Validates, reserves inventory, charges card, emails, ships, audits —
 * all via Feature Envy getters/setters on anemic Order.
 */
public class OrderFulfillmentService {

    private final WarehouseClient warehouse;
    private final CardProcessor cards;
    private final SmtpClient smtp;
    private final AuditDb audit;
    private final ShipmentApi shipments;

    public OrderFulfillmentService(WarehouseClient warehouse, CardProcessor cards,
                                   SmtpClient smtp, AuditDb audit, ShipmentApi shipments) {
        this.warehouse = warehouse;
        this.cards = cards;
        this.smtp = smtp;
        this.audit = audit;
        this.shipments = shipments;
    }

    public void fulfill(Order order) {
        // duplicated validation (also copy-pasted in retryFulfill / adminForceShip)
        if (order.getLines() == null || order.getLines().isEmpty()) {
            throw new IllegalStateException("Order has no lines");
        }

        // Feature Envy: ask Order for guts, mutate externally
        for (OrderLine line : order.getLines()) {
            warehouse.reserve(line.getSku(), line.getQuantity());
        }
        order.setReserved(true);
        order.setShipmentStatus("READY"); // BUG: before payment!

        cards.charge(order.getCardToken(), order.total());
        order.setStatus("PAID");

        smtp.send(order.getEmail(), "Order confirmed");
        shipments.update(order.getId(), order.getShipmentStatus());
        audit.write("FULFILLED", order.getId());
    }

    public void retryFulfill(Order order) {
        // DUPLICATE validation — easy to drift from fulfill()
        if (order.getLines() == null || order.getLines().isEmpty()) {
            throw new IllegalStateException("Order has no lines");
        }
        // ... more God Class methods ...
    }
}`,
    annotations: [
      {
        id: "ann_broken_ap_1",
        startLine: 28,
        endLine: 42,
        category: "PROBLEM_IN_ORIGINAL_CODE",
        title: { en: "God Class Feature Envy Pipeline", ru: "Пайплайн Feature Envy God Class" },
        explanation: {
          en: "Lines 28-42: validate → reserve → set READY → charge → email → ship → audit. Side effects ordered wrong; setters bypass invariants.",
          ru: "Строки 28-42: validate → reserve → set READY → charge → email → ship → audit. Side effects в неверном порядке; setters обходят инварианты."
        },
        problemSolved: {
          en: "Demonstrates Anemic Domain Model + God Class + Tell Don't Ask violation.",
          ru: "Демонстрирует Anemic Domain Model + God Class + нарушение Tell Don't Ask."
        },
        conceptDemonstrated: "cpt_god_class"
      },
      {
        id: "ann_broken_ap_2",
        startLine: 35,
        endLine: 36,
        category: "PRODUCTION_RISK",
        title: { en: "Unpaid Inventory Marked READY", ru: "Неоплаченный Инвентарь Помечен READY" },
        explanation: {
          en: "setReserved/setShipmentStatus run before cards.charge — Black Friday shipped unpaid stock.",
          ru: "setReserved/setShipmentStatus выполняются до cards.charge — на Black Friday отгрузили неоплаченный остаток."
        },
        conceptDemonstrated: "cpt_feature_envy"
      }
    ],
    relatedQuestionIds: ["q_ap_order_01"],
    conceptIds: ["cpt_god_class", "cpt_anemic_domain_model", "cpt_feature_envy"],
    tags: ["#god-class", "#feature-envy", "#counter-example"]
  },
  {
    id: "art_ap_fulfillment_solution",
    type: "CORRECT_SOLUTION",
    language: "java",
    javaVersion: "17",
    title: {
      en: "Production Fix: Rich Order Aggregate + Segregated Ports",
      ru: "Продакшн Фикс: Богатый Агрегат Order + Выделенные Порты"
    },
    sourceCode: `package com.shop.order;

import java.util.ArrayList;
import java.util.List;

public class Order {

    private final String id;
    private final String email;
    private final String cardToken;
    private final List<OrderLine> lines;
    private String status = "NEW";
    private boolean reserved;
    private String shipmentStatus = "PENDING";

    public Order(String id, String email, String cardToken, List<OrderLine> lines) {
        if (lines == null || lines.isEmpty()) {
            throw new IllegalArgumentException("Order requires lines");
        }
        this.id = id;
        this.email = email;
        this.cardToken = cardToken;
        this.lines = List.copyOf(lines);
    }

    /** Tell Don't Ask: capture payment and mark PAID, or fail closed. */
    public void place(PaymentCapturePort payments) {
        requirePlaceable();
        payments.capture(cardToken, total());
        this.status = "PAID";
    }

    /** Inventory reservation only after PAID. */
    public void reserveInventory(InventoryService inventory) {
        if (!"PAID".equals(status)) {
            throw new IllegalStateException("Cannot reserve unpaid order");
        }
        inventory.reserveAll(lines);
        this.reserved = true;
        this.shipmentStatus = "READY";
    }

    private void requirePlaceable() {
        if (lines.isEmpty()) {
            throw new IllegalStateException("Order has no lines");
        }
        if ("PAID".equals(status)) {
            throw new IllegalStateException("Already paid");
        }
    }

    public int total() {
        return lines.stream().mapToInt(OrderLine::getPriceCents).sum();
    }

    public String getId() { return id; }
    public String getEmail() { return email; }
    public String getStatus() { return status; }
    public boolean isReserved() { return reserved; }
    public String getShipmentStatus() { return shipmentStatus; }
}

public interface PaymentCapturePort {
    void capture(String cardToken, int amountCents);
}

public interface InventoryService {
    void reserveAll(List<OrderLine> lines);
}

/** Thin orchestrator — NOT a God Class. */
public class OrderFulfillmentService {

    private final PaymentCapturePort payments;
    private final InventoryService inventory;
    private final OrderNotifier notifier;
    private final AuditPort audit;

    public OrderFulfillmentService(PaymentCapturePort payments, InventoryService inventory,
                                   OrderNotifier notifier, AuditPort audit) {
        this.payments = payments;
        this.inventory = inventory;
        this.notifier = notifier;
        this.audit = audit;
    }

    public void fulfill(Order order) {
        order.place(payments);                 // validate + charge
        order.reserveInventory(inventory);     // only if PAID
        notifier.sendConfirmation(order);
        audit.write("FULFILLED", order.getId());
    }
}`,
    annotations: [
      {
        id: "ann_sol_ap_1",
        startLine: 24,
        endLine: 36,
        category: "HOW_IT_FIXES_THE_PROBLEM",
        title: { en: "Rich Order place() / reserveInventory()", ru: "Богатый Order place() / reserveInventory()" },
        explanation: {
          en: "Domain methods encapsulate invariants: charge before READY; unpaid orders cannot reserve. No public setters.",
          ru: "Доменные методы инкапсулируют инварианты: charge до READY; неоплаченные заказы не резервируют. Нет public setters."
        },
        problemSolved: {
          en: "Eliminates anemia, Feature Envy setters, and unpaid-ship sequencing bug.",
          ru: "Устраняет анемию, Feature Envy setters и баг порядка неоплаченной отгрузки."
        },
        conceptDemonstrated: "cpt_anemic_domain_model"
      },
      {
        id: "ann_sol_ap_2",
        startLine: 55,
        endLine: 75,
        category: "INTERVIEW_CONCEPT",
        title: { en: "Thin Orchestrator + ISP Ports", ru: "Тонкий Оркестратор + Порты ISP" },
        explanation: {
          en: "OrderFulfillmentService only sequences place → reserve → notify → audit. PaymentCapturePort and InventoryService are independently testable.",
          ru: "OrderFulfillmentService только выстраивает place → reserve → notify → audit. PaymentCapturePort и InventoryService тестируются независимо."
        },
        conceptDemonstrated: "cpt_god_class"
      }
    ],
    relatedQuestionIds: ["q_ap_order_01"],
    conceptIds: ["cpt_anemic_domain_model", "cpt_god_class", "cpt_feature_envy"],
    tags: ["#rich-domain", "#tell-dont-ask", "#ports"]
  },
  {
    id: "art_ap_fulfillment_bughunt",
    type: "COUNTER_EXAMPLE",
    language: "java",
    javaVersion: "17",
    title: {
      en: "Bug Hunt Code: Premature Reserve and READY Setters",
      ru: "Код для Поиска Бага: Преждевременный Reserve и Setters READY"
    },
    sourceCode: `package com.shop.fulfillment;

import com.shop.order.Order;

public class OrderFulfillmentService {

    private final InventoryClient inventory;
    private final PaymentClient payment;
    private final Mailer mailer;

    public void fulfill(Order order) {
        if (order.getLines() == null || order.getLines().isEmpty()) {
            throw new IllegalStateException("empty");
        }
        // BUG: Feature Envy side effects before payment capture
        inventory.reserve(order.getLines());
        order.setReserved(true);
        order.setShipmentStatus("READY");
        payment.charge(order.getCardToken(), order.total());
        order.setStatus("PAID");
        mailer.sendConfirmation(order.getEmail());
    }
}`,
    annotations: [
      {
        id: "ann_bug_ap_1",
        startLine: 15,
        endLine: 17,
        category: "PROBLEM_IN_ORIGINAL_CODE",
        title: { en: "Setters Before Charge", ru: "Setters До Charge" },
        explanation: {
          en: "Lines 15-17 reserve and mark READY before payment.charge — anemic Order cannot enforce paid-before-ship.",
          ru: "Строки 15-17 резервируют и ставят READY до payment.charge — анемичный Order не может обеспечить paid-before-ship."
        },
        problemSolved: {
          en: "Shows why Tell Don't Ask place()/reserveInventory() sequencing is mandatory.",
          ru: "Показывает, почему обязателен порядок Tell Don't Ask place()/reserveInventory()."
        },
        conceptDemonstrated: "cpt_feature_envy"
      }
    ],
    relatedQuestionIds: ["q_ap_order_01"],
    conceptIds: ["cpt_feature_envy", "cpt_anemic_domain_model", "cpt_god_class"],
    tags: ["#bug-hunt", "#feature-envy", "#fulfillment"]
  }
];
