import { CodeArtifact } from '../../../../../types/domain';

export const CODE_ARTIFACTS_EQUALS_HASHCODE: readonly CodeArtifact[] = [
  {
    id: "art_code_broken_payment_key",
    type: "COUNTER_EXAMPLE",
    language: "java",
    javaVersion: "17",
    title: {
      en: "Broken PaymentKey (Mutable Key Invariant Bug)",
      ru: "Уязвимый PaymentKey (Мутабельный Ключ HashMap)"
    },
    sourceCode: `package com.bank.payment.cache;

import java.util.Objects;

/**
 * PRODUCTION BUG: PaymentKey contains mutable field 'status'
 * participating in equals() and hashCode().
 */
public class PaymentKey {
    private final String transactionId;
    private String status; // CRITICAL BUG: Mutable non-final field!

    public PaymentKey(String transactionId, String status) {
        this.transactionId = Objects.requireNonNull(transactionId, "transactionId required");
        this.status = Objects.requireNonNull(status, "status required");
    }

    public String getTransactionId() {
        return transactionId;
    }

    public String getStatus() {
        return status;
    }

    // DANGEROUS SETTER: Mutates key state after HashMap insertion!
    public void setStatus(String status) {
        this.status = Objects.requireNonNull(status, "status required");
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PaymentKey that = (PaymentKey) o;
        return Objects.equals(transactionId, that.transactionId) &&
               Objects.equals(status, that.status);
    }

    @Override
    public int hashCode() {
        // CRITICAL BUG: Hash code changes whenever setStatus() is called!
        return Objects.hash(transactionId, status);
    }
}`,
    annotations: [
      {
        id: "ann_broken_key_1",
        startLine: 11,
        endLine: 11,
        category: "PROBLEM_IN_ORIGINAL_CODE",
        title: { en: "Mutable Non-Final Field", ru: "Изменяемое Non-Final Поле" },
        explanation: {
          en: "Line 11: `private String status` is non-final and participates in hashCode(). Mutating this field mutates the key's hash code.",
          ru: "Строка 11: `private String status` не является final и входит в hashCode(). Изменение поля меняет хэш-код ключа."
        }
      },
      {
        id: "ann_broken_key_2",
        startLine: 24,
        endLine: 26,
        category: "PRODUCTION_RISK",
        title: { en: "Dangerous Setter Method", ru: "Опасный Метод-Сеттер" },
        explanation: {
          en: "Lines 24-26: `setStatus()` allows external callers or event listeners to alter key state after insertion into HashMap.",
          ru: "Строки 24-26: `setStatus()` позволяет внешнему коду менять состояние ключа после вставки в HashMap."
        }
      },
      {
        id: "ann_broken_key_3",
        startLine: 38,
        endLine: 40,
        category: "PROBLEM_IN_ORIGINAL_CODE",
        title: { en: "Unstable Hash Code Generation", ru: "Нестабильная Генерация Хэш-Кода" },
        explanation: {
          en: "Lines 38-40: `hashCode()` uses `status`. When status changes, bucket index formula `index = (n-1) & hash` produces a different index.",
          ru: "Строки 38-40: `hashCode()` использует `status`. При смене статуса формуле `index = (n-1) & hash` выдает другой бакет."
        }
      }
    ],
    relatedQuestionIds: ["q_payment_key_equals_01"],
    conceptIds: ["cpt_equals_contract", "cpt_hashcode_contract", "cpt_mutable_key_disaster"],
    tags: ["#mutable-key", "#hashcode", "#hashmap-bug"]
  },
  {
    id: "art_code_fixed_payment_key_record",
    type: "CORRECT_SOLUTION",
    language: "java",
    javaVersion: "17",
    title: {
      en: "Annotated Production Solution — Java 17 Record & Immutable Key",
      ru: "Эталонное Решение — Java 17 Record и Неизменяемый Ключ"
    },
    sourceCode: `package com.bank.payment.cache;

import java.util.Objects;

/**
 * PRODUCTION SOLUTION (Java 17+ Record):
 * 1. Strictly immutable: all components are private final.
 * 2. Stable equals() and hashCode(): generated from immutable identity field.
 * 3. Compact constructor validates precondition guards fail-fast.
 *
 * PRODUCTION INCIDENT LESSON:
 * Never include mutable business status inside cache lookup keys.
 * Identity (transactionId) must be separated from status payload.
 */
public record PaymentKey(String transactionId) {

    // Compact constructor for fail-fast precondition validation
    public PaymentKey {
        Objects.requireNonNull(transactionId, "transactionId must not be null");
        if (transactionId.isBlank()) {
            throw new IllegalArgumentException("transactionId cannot be blank");
        }
    }
}

// Service Usage Example:
public class PaymentReconciliationCache {
    private final Map<PaymentKey, PaymentRecord> cache = new ConcurrentHashMap<>();

    public void put(String transactionId, PaymentRecord record) {
        cache.put(new PaymentKey(transactionId), record);
    }

    public Optional<PaymentRecord> get(String transactionId) {
        return Optional.ofNullable(cache.get(new PaymentKey(transactionId)));
    }
}`,
    annotations: [
      {
        id: "ann_fixed_key_1",
        startLine: 16,
        endLine: 16,
        category: "HOW_IT_FIXES_THE_PROBLEM",
        title: { en: "Java 17 Record Immutability", ru: "Неизменяемость Java 17 Record" },
        explanation: {
          en: "Line 16: `public record PaymentKey(String transactionId)` automatically generates final fields, canonical constructor, and immutable equals/hashCode.",
          ru: "Строка 16: `public record PaymentKey(String transactionId)` автоматически создает final поля, конструктор и неизменяемые equals/hashCode."
        }
      },
      {
        id: "ann_fixed_key_2",
        startLine: 19,
        endLine: 24,
        category: "WHY_IT_EXISTS",
        title: { en: "Compact Constructor Precondition Guards", ru: "Проверки Предусловий в Компактном Конструкторе" },
        explanation: {
          en: "Lines 19-24: Compact constructor checks non-null and non-blank preconditions fail-fast before object construction.",
          ru: "Строки 19-24: Компактный конструктор выполняет проверки non-null и non-blank до создания объекта."
        }
      }
    ],
    relatedQuestionIds: ["q_payment_key_equals_01"],
    conceptIds: ["cpt_equals_contract", "cpt_hashcode_contract", "cpt_mutable_key_disaster"],
    tags: ["#java17-records", "#immutability", "#equals-hashCode"]
  }
];
