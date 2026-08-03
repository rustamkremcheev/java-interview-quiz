import { CodeArtifact } from '../../../../../types/domain';

export const CODE_ARTIFACTS_IMMUTABILITY: readonly CodeArtifact[] = [
  {
    id: "art_customer_snapshot_broken",
    type: "QUESTION_CODE",
    language: "java",
    javaVersion: "17",
    title: {
      en: "Broken Baseline: Pseudo-Immutable CustomerSnapshot",
      ru: "Исходный Нарушенный Код: Псевдо-Неизменяемый CustomerSnapshot"
    },
    sourceCode: `package com.enterprise.payment.reconciliation;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;

/**
 * PRODUCTION BUG: Money leaks mutable BigDecimal; Transaction stores mutable Date;
 * CustomerSnapshot returns internal ArrayList — corrupting settlement totals.
 */
public class Money {
    private final BigDecimal amount;
    private final String currency;

    public Money(BigDecimal amount, String currency) {
        this.amount = Objects.requireNonNull(amount, "amount required");
        this.currency = Objects.requireNonNull(currency, "currency required");
    }

    // ⚠️ VULNERABILITY: Returns mutable BigDecimal — callers can mutate via reflection
    // or share the same instance and call subtract/add side-effects on shared refs
    public BigDecimal getAmount() {
        return amount;
    }

    public String getCurrency() {
        return currency;
    }
}

public final class Transaction {
    private final String id;
    private final Money amount;
    private final Date bookedAt;

    public Transaction(String id, Money amount, Date bookedAt) {
        this.id = Objects.requireNonNull(id, "id required");
        this.amount = Objects.requireNonNull(amount, "amount required");
        // ⚠️ VULNERABILITY: Stores external mutable Date reference directly
        this.bookedAt = bookedAt;
    }

    public String getId() { return id; }
    public Money getAmount() { return amount; }

    // ⚠️ VULNERABILITY: Returns internal mutable Date reference
    public Date getBookedAt() {
        return bookedAt;
    }
}

public final class CustomerSnapshot {
    private final String customerId;
    private final List<Transaction> transactions;
    private final Money totalExposure;

    public CustomerSnapshot(String customerId, List<Transaction> transactions, Money totalExposure) {
        this.customerId = Objects.requireNonNull(customerId, "customerId required");
        // ⚠️ VULNERABILITY: Stores mutable ArrayList copy that is still mutable
        this.transactions = new ArrayList<>(transactions);
        this.totalExposure = Objects.requireNonNull(totalExposure, "totalExposure required");
    }

    public String getCustomerId() { return customerId; }

    // ⚠️ VULNERABILITY: Returns internal mutable ArrayList reference
    public List<Transaction> getTransactions() {
        return transactions;
    }

    public Money getTotalExposure() {
        return totalExposure;
    }
}`,
    annotations: [
      {
        id: "ann_broken_snap_1",
        startLine: 20,
        endLine: 22,
        category: "PROBLEM_IN_ORIGINAL_CODE",
        title: { en: "Mutable BigDecimal Money Leak", ru: "Утечка Мутабельного BigDecimal в Money" },
        explanation: {
          en: "Money stores and returns BigDecimal by reference. Shared BigDecimal instances and mutable temporal types let fraud/ops code corrupt monetary values that participate in settlement totals.",
          ru: "Money хранит и возвращает BigDecimal по ссылке. Общие экземпляры BigDecimal и мутабельные temporal types позволяют fraud/ops коду портить денежные значения, участвующие в settlement-итогах."
        },
        problemSolved: {
          en: "Exposes monetary state to aliasing and mutation outside CustomerSnapshot.",
          ru: "Открывает денежное состояние для aliasing и мутации вне CustomerSnapshot."
        },
        conceptDemonstrated: "cpt_defensive_copying"
      },
      {
        id: "ann_broken_snap_2",
        startLine: 38,
        endLine: 40,
        category: "PRODUCTION_RISK",
        title: { en: "Constructor Date Reference Leak", ru: "Утечка Ссылки Date в Конструкторе" },
        explanation: {
          en: "Transaction stores external Date without defensive copy. Callers retain bookedAt and can invoke setTime() after construction, rewriting transaction timelines used in reconciliation.",
          ru: "Transaction сохраняет внешний Date без защитного копирования. Вызывающий сохраняет bookedAt и может вызвать setTime() после создания, переписывая таймлайн транзакций для сверки."
        },
        conceptDemonstrated: "cpt_defensive_copying"
      },
      {
        id: "ann_broken_snap_3",
        startLine: 62,
        endLine: 64,
        category: "PRODUCTION_RISK",
        title: { en: "Getter List Reference Leak", ru: "Утечка Ссылки List в Геттере" },
        explanation: {
          en: "Returning internal ArrayList allows fraud/ops code to invoke snapshot.getTransactions().add(fakeTxn), injecting fake transactions into the cached snapshot and corrupting settlement totals.",
          ru: "Возврат внутреннего ArrayList позволяет fraud/ops коду вызвать snapshot.getTransactions().add(fakeTxn), внедряя фейковые транзакции в кэшированный снимок и портя settlement-итоги."
        },
        conceptDemonstrated: "cpt_immutability"
      }
    ],
    relatedQuestionIds: ["q_imm_snapshot_01"],
    conceptIds: ["cpt_immutability", "cpt_defensive_copying"],
    tags: ["#immutability", "#defensive-copying", "#payment-reconciliation"]
  },
  {
    id: "art_customer_snapshot_solution",
    type: "CORRECT_SOLUTION",
    language: "java",
    javaVersion: "17",
    title: {
      en: "Production Refactored: Truly Immutable CustomerSnapshot",
      ru: "Продакшн Рефакторинг: Подлинно Неизменяемый CustomerSnapshot"
    },
    sourceCode: `package com.enterprise.payment.reconciliation;

import java.time.Instant;
import java.util.List;
import java.util.Objects;

/**
 * Production-safe immutable Money — long cents, no mutable BigDecimal.
 */
public record Money(long amountCents, String currency) {
    public Money {
        Objects.requireNonNull(currency, "currency required");
        if (currency.isBlank()) {
            throw new IllegalArgumentException("currency must not be blank");
        }
    }
}

/**
 * Immutable Transaction with Instant bookedAt.
 */
public final class Transaction {
    private final String id;
    private final Money amount;
    private final Instant bookedAt;

    public Transaction(String id, Money amount, Instant bookedAt) {
        this.id = Objects.requireNonNull(id, "id required");
        this.amount = Objects.requireNonNull(amount, "amount required");
        this.bookedAt = Objects.requireNonNull(bookedAt, "bookedAt required");
    }

    public String getId() { return id; }
    public Money getAmount() { return amount; }

    // Instant is inherently immutable — safe to return directly
    public Instant getBookedAt() {
        return bookedAt;
    }
}

/**
 * Production-safe immutable CustomerSnapshot for multithreaded reconciliation.
 * Uses List.copyOf() and immutable Money for deep immutability.
 */
public final class CustomerSnapshot {
    private final String customerId;
    private final List<Transaction> transactions;
    private final Money totalExposure;

    public CustomerSnapshot(String customerId, List<Transaction> transactions, Money totalExposure) {
        this.customerId = Objects.requireNonNull(customerId, "customerId required");
        this.totalExposure = Objects.requireNonNull(totalExposure, "totalExposure required");
        // Defensive copy on constructor input — independent immutable snapshot
        this.transactions = List.copyOf(transactions);
    }

    public String getCustomerId() {
        return customerId;
    }

    // Returns unmodifiable view — callers cannot mutate internal transaction list
    public List<Transaction> getTransactions() {
        return transactions;
    }

    public Money getTotalExposure() {
        return totalExposure;
    }
}`,
    annotations: [
      {
        id: "ann_sol_snap_1",
        startLine: 8,
        endLine: 15,
        category: "HOW_IT_FIXES_THE_PROBLEM",
        title: { en: "Immutable Money Record with Long Cents", ru: "Неизменяемый Money Record с Long Cents" },
        explanation: {
          en: "Money as a record with long amountCents eliminates mutable BigDecimal reference leaks. Primitive long and String components cannot be mutated through getters.",
          ru: "Money как record с long amountCents устраняет утечки мутабельного BigDecimal. Примитив long и String нельзя мутировать через геттеры."
        },
        problemSolved: {
          en: "Removes monetary mutation vectors from the CustomerSnapshot object graph.",
          ru: "Устраняет векторы мутации денег из объектного графа CustomerSnapshot."
        },
        conceptDemonstrated: "cpt_immutability"
      },
      {
        id: "ann_sol_snap_2",
        startLine: 28,
        endLine: 28,
        category: "WHY_IT_EXISTS",
        title: { en: "java.time.Instant Instead of Date", ru: "java.time.Instant Вместо Date" },
        explanation: {
          en: "Instant is a value type with no mutators like setTime(). Eliminates timestamp reference leak vulnerabilities without defensive copy boilerplate.",
          ru: "Instant — value type без мутаторов вроде setTime(). Устраняет уязвимости утечки timestamp без шаблона защитного копирования."
        },
        conceptDemonstrated: "cpt_immutability"
      },
      {
        id: "ann_sol_snap_3",
        startLine: 52,
        endLine: 55,
        category: "INTERVIEW_CONCEPT",
        title: { en: "List.copyOf() Defensive Copy on Input", ru: "List.copyOf() — Защитная Копия на Входе" },
        explanation: {
          en: "List.copyOf(transactions) creates an independent immutable snapshot. snapshot.getTransactions().add(fakeTxn) throws UnsupportedOperationException — settlement totals stay intact.",
          ru: "List.copyOf(transactions) создает независимый неизменяемый снимок. snapshot.getTransactions().add(fakeTxn) выбросит UnsupportedOperationException — settlement-итоги остаются целыми."
        },
        conceptDemonstrated: "cpt_defensive_copying"
      }
    ],
    relatedQuestionIds: ["q_imm_snapshot_01"],
    conceptIds: ["cpt_immutability", "cpt_defensive_copying", "cpt_invariants"],
    tags: ["#immutability", "#defensive-copying", "#instant", "#list-copyof", "#money"]
  },
  {
    id: "art_customer_snapshot_bughunt",
    type: "COUNTER_EXAMPLE",
    language: "java",
    javaVersion: "17",
    title: {
      en: "Bug Hunt Code: CustomerSnapshot Reference Leak",
      ru: "Код для Поиска Бага: Утечка Ссылки в CustomerSnapshot"
    },
    sourceCode: `package com.enterprise.payment.reconciliation;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;

public class Money {
    private final BigDecimal amount;
    private final String currency;

    public Money(BigDecimal amount, String currency) {
        this.amount = amount;
        this.currency = currency;
    }

    public BigDecimal getAmount() {
        return amount; // Mutable BigDecimal leaked!
    }

    public String getCurrency() { return currency; }
}

public final class Transaction {
    private final String id;
    private final Money amount;
    private final Date bookedAt;

    public Transaction(String id, Money amount, Date bookedAt) {
        this.id = id;
        this.amount = amount;
        this.bookedAt = bookedAt; // Mutable Date stored directly!
    }

    public Date getBookedAt() {
        return bookedAt; // Mutable Date leaked!
    }
}

public final class CustomerSnapshot {
    private final String customerId;
    private final List<Transaction> transactions;
    private final Money totalExposure;

    public CustomerSnapshot(String customerId, List<Transaction> transactions, Money totalExposure) {
        this.customerId = Objects.requireNonNull(customerId);
        this.transactions = new ArrayList<>(transactions);
        this.totalExposure = totalExposure;
    }

    public List<Transaction> getTransactions() {
        return transactions; // Internal mutable list leaked!
    }

    public Money getTotalExposure() {
        return totalExposure;
    }
}`,
    annotations: [
      {
        id: "ann_bug_snap_1",
        startLine: 18,
        endLine: 18,
        category: "PROBLEM_IN_ORIGINAL_CODE",
        title: { en: "Getter BigDecimal Reference Leak", ru: "Утечка Ссылки BigDecimal в Геттере" },
        explanation: {
          en: "Money.getAmount() returns the internal BigDecimal. Shared mutable monetary values let fraud/ops code corrupt totalExposure used in settlement.",
          ru: "Money.getAmount() возвращает внутренний BigDecimal. Общие мутабельные денежные значения позволяют fraud/ops коду портить totalExposure в settlement."
        },
        conceptDemonstrated: "cpt_defensive_copying"
      },
      {
        id: "ann_bug_snap_2",
        startLine: 32,
        endLine: 32,
        category: "PROBLEM_IN_ORIGINAL_CODE",
        title: { en: "Constructor Date Reference Leak", ru: "Утечка Ссылки Date в Конструкторе" },
        explanation: {
          en: "Transaction stores external mutable Date directly. Caller can invoke bookedAt.setTime(0) after construction, rewriting reconciliation timelines.",
          ru: "Transaction сохраняет внешний мутабельный Date напрямую. Вызывающий может вызвать bookedAt.setTime(0) после создания, переписывая таймлайн сверки."
        },
        conceptDemonstrated: "cpt_defensive_copying"
      },
      {
        id: "ann_bug_snap_3",
        startLine: 52,
        endLine: 52,
        category: "PROBLEM_IN_ORIGINAL_CODE",
        title: { en: "Getter List Reference Leak", ru: "Утечка Ссылки List в Геттере" },
        explanation: {
          en: "CustomerSnapshot.getTransactions() returns internal ArrayList. Fraud/ops invoked snapshot.getTransactions().add(fakeTxn), corrupting cached settlement totals.",
          ru: "CustomerSnapshot.getTransactions() возвращает внутренний ArrayList. Fraud/ops вызвал snapshot.getTransactions().add(fakeTxn), портя кэшированные settlement-итоги."
        },
        conceptDemonstrated: "cpt_immutability"
      }
    ],
    relatedQuestionIds: ["q_imm_snapshot_01"],
    conceptIds: ["cpt_immutability", "cpt_defensive_copying"],
    tags: ["#defensive-copying", "#payment-reconciliation", "#bughunt"]
  }
];
