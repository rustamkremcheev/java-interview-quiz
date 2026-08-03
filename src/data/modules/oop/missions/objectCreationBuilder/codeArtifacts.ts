import { CodeArtifact } from '../../../../../types/domain';

export const CODE_ARTIFACTS_OBJECT_CREATION: readonly CodeArtifact[] = [
  {
    id: "art_settlement_instruction_broken",
    type: "QUESTION_CODE",
    language: "java",
    javaVersion: "17",
    title: {
      en: "Broken Baseline: Telescoping Constructor SettlementInstruction",
      ru: "Исходный Нарушенный Код: SettlementInstruction с Телескопическими Конструкторами"
    },
    sourceCode: `package com.bank.settlement.domain;

import java.time.LocalDate;
import java.util.Objects;

/**
 * PRODUCTION BUG: 12-parameter telescoping constructors with adjacent
 * boolean flags (isTaxExempt, isAudited) caused silent tax report corruption.
 */
public class SettlementInstruction {
    private final String instructionId;
    private final String payerAccountId;
    private final String payeeAccountId;
    private final long amountInCents;
    private final String currencyCode;
    private final LocalDate settlementDate;
    private final Priority priority;
    private final boolean isTaxExempt;  // Position 8 in 12-arg constructor
    private final boolean isAudited;    // Position 9 — SWAPPED with isTaxExempt at call sites!
    private final String routingCode;
    private final String memo;
    private final String batchReference;

    // 4 mandatory parameters
    public SettlementInstruction(String instructionId, String payerAccountId,
                                  String payeeAccountId, long amountInCents) {
        this(instructionId, payerAccountId, payeeAccountId, amountInCents,
             "USD", LocalDate.now(), Priority.NORMAL, false, false, null, null, null);
    }

    // 12-parameter telescoping constructor — BOOLEAN TRAP!
    public SettlementInstruction(String instructionId, String payerAccountId,
                                  String payeeAccountId, long amountInCents,
                                  String currencyCode, LocalDate settlementDate,
                                  Priority priority,
                                  boolean isTaxExempt,   // ⚠️ Position 8
                                  boolean isAudited,     // ⚠️ Position 9 — adjacent booleans!
                                  String routingCode, String memo, String batchReference) {
        this.instructionId = Objects.requireNonNull(instructionId);
        this.payerAccountId = Objects.requireNonNull(payerAccountId);
        this.payeeAccountId = Objects.requireNonNull(payeeAccountId);
        this.amountInCents = amountInCents;
        this.currencyCode = currencyCode;
        this.settlementDate = settlementDate;
        this.priority = priority;
        this.isTaxExempt = isTaxExempt;
        this.isAudited = isAudited;
        this.routingCode = routingCode;
        this.memo = memo;
        this.batchReference = batchReference;
    }

    public boolean isTaxExempt() { return isTaxExempt; }
    public boolean isAudited() { return isAudited; }
    // ... other getters omitted
}`,
    annotations: [
      {
        id: "ann_broken_oc_1",
        startLine: 28,
        endLine: 29,
        category: "PROBLEM_IN_ORIGINAL_CODE",
        title: { en: "Adjacent Boolean Fields in Constructor", ru: "Смежные Boolean-Поля в Конструкторе" },
        explanation: {
          en: "isTaxExempt and isAudited are adjacent boolean parameters at positions 8 and 9. Java provides no compile-time protection against swapping true/false literals at call sites.",
          ru: "isTaxExempt и isAudited — смежные boolean-параметры на позициях 8 и 9. Java не обеспечивает защиты от перепутывания true/false литералов в вызовах."
        },
        problemSolved: {
          en: "Creates silent flag inversion bugs in tax classification.",
          ru: "Создает тихие баги инверсии флагов налоговой классификации."
        },
        conceptDemonstrated: "cpt_builder_pattern"
      },
      {
        id: "ann_broken_oc_2",
        startLine: 38,
        endLine: 48,
        category: "PRODUCTION_RISK",
        title: { en: "12-Parameter Telescoping Constructor Explosion", ru: "12-Параметровый Телескопический Конструктор" },
        explanation: {
          en: "Telescoping constructors with 4 mandatory + 8 optional parameters become unmaintainable. Each new optional field requires a new constructor overload, exponentially increasing call-site error surface.",
          ru: "Телескопические конструкторы с 4 обязательными + 8 опциональными параметрами становятся неподдерживаемыми. Каждое новое опциональное поле требует новой перегрузки, экспоненциально увеличивая поверхность ошибок."
        },
        conceptDemonstrated: "cpt_static_factory_methods"
      }
    ],
    relatedQuestionIds: ["q_oc_settlement_01"],
    conceptIds: ["cpt_builder_pattern", "cpt_static_factory_methods"],
    tags: ["#telescoping-constructor", "#boolean-trap", "#settlement"]
  },
  {
    id: "art_settlement_instruction_solution",
    type: "CORRECT_SOLUTION",
    language: "java",
    javaVersion: "17",
    title: {
      en: "Production Refactored: Builder & Static Factory SettlementInstruction",
      ru: "Продакшн Рефакторинг: SettlementInstruction с Builder и Статической Фабрикой"
    },
    sourceCode: `package com.bank.settlement.domain;

import java.time.LocalDate;
import java.util.Objects;

public final class SettlementInstruction {
    private final String instructionId;
    private final String payerAccountId;
    private final String payeeAccountId;
    private final long amountInCents;
    private final String currencyCode;
    private final LocalDate settlementDate;
    private final Priority priority;
    private final boolean isTaxExempt;
    private final boolean isAudited;
    private final String routingCode;
    private final String memo;
    private final String batchReference;

    // Package-private: only Builder can construct
    SettlementInstruction(Builder builder) {
        this.instructionId = builder.instructionId;
        this.payerAccountId = builder.payerAccountId;
        this.payeeAccountId = builder.payeeAccountId;
        this.amountInCents = builder.amountInCents;
        this.currencyCode = builder.currencyCode;
        this.settlementDate = builder.settlementDate;
        this.priority = builder.priority;
        this.isTaxExempt = builder.isTaxExempt;
        this.isAudited = builder.isAudited;
        this.routingCode = builder.routingCode;
        this.memo = builder.memo;
        this.batchReference = builder.batchReference;
    }

    // Static factory for common creation path (Effective Java Item 1)
    public static SettlementInstruction of(String instructionId, String payerAccountId,
                                            String payeeAccountId, long amountInCents) {
        return builder(instructionId, payerAccountId, payeeAccountId, amountInCents).build();
    }

    // Domain-specific static factory with pre-set tax flags
    public static SettlementInstruction taxExemptWire(String instructionId, String payerAccountId,
                                                       String payeeAccountId, long amountInCents) {
        return builder(instructionId, payerAccountId, payeeAccountId, amountInCents)
                .isTaxExempt(true)
                .isAudited(true)
                .priority(Priority.HIGH)
                .build();
    }

    public static Builder builder(String instructionId, String payerAccountId,
                                   String payeeAccountId, long amountInCents) {
        return new Builder(instructionId, payerAccountId, payeeAccountId, amountInCents);
    }

    public boolean isTaxExempt() { return isTaxExempt; }
    public boolean isAudited() { return isAudited; }

    public static final class Builder {
        private final String instructionId;
        private final String payerAccountId;
        private final String payeeAccountId;
        private final long amountInCents;
        private String currencyCode = "USD";
        private LocalDate settlementDate = LocalDate.now();
        private Priority priority = Priority.NORMAL;
        private boolean isTaxExempt = false;
        private boolean isAudited = false;
        private String routingCode;
        private String memo;
        private String batchReference;

        public Builder(String instructionId, String payerAccountId,
                       String payeeAccountId, long amountInCents) {
            this.instructionId = Objects.requireNonNull(instructionId);
            this.payerAccountId = Objects.requireNonNull(payerAccountId);
            this.payeeAccountId = Objects.requireNonNull(payeeAccountId);
            this.amountInCents = amountInCents;
        }

        public Builder isTaxExempt(boolean value) { this.isTaxExempt = value; return this; }
        public Builder isAudited(boolean value) { this.isAudited = value; return this; }
        public Builder priority(Priority value) { this.priority = value; return this; }
        public Builder routingCode(String value) { this.routingCode = value; return this; }

        public SettlementInstruction build() {
            if (amountInCents <= 0) {
                throw new IllegalStateException("amountInCents must be positive");
            }
            if (isTaxExempt && !isAudited) {
                throw new IllegalStateException(
                    "Tax-exempt settlement instructions must be audited");
            }
            return new SettlementInstruction(this);
        }
    }
}`,
    annotations: [
      {
        id: "ann_sol_oc_1",
        startLine: 33,
        endLine: 42,
        category: "WHY_IT_EXISTS",
        title: { en: "Static Factory Methods with Named Intent", ru: "Статические Фабрики с Именованным Намерением" },
        explanation: {
          en: "of() provides readable creation for common paths. taxExemptWire() pre-sets tax flags via Builder, eliminating boolean literal confusion entirely.",
          ru: "of() дает читаемое создание для типовых путей. taxExemptWire() предустанавливает налоговые флаги через Builder, полностью устраняя путаницу с boolean-литералами."
        },
        problemSolved: {
          en: "Eliminates positional boolean parameter swapping at call sites.",
          ru: "Устраняет перепутывание позиционных boolean-параметров в вызовах."
        },
        conceptDemonstrated: "cpt_static_factory_methods"
      },
      {
        id: "ann_sol_oc_2",
        startLine: 68,
        endLine: 69,
        category: "HOW_IT_FIXES_THE_PROBLEM",
        title: { en: "Named Fluent Boolean Methods", ru: "Именованные Fluent Boolean-Методы" },
        explanation: {
          en: "isTaxExempt(true) and isAudited(true) bind each boolean to its field name. Code review instantly reveals intent — no positional ambiguity.",
          ru: "isTaxExempt(true) и isAudited(true) привязывают каждый boolean к имени поля. Код-ревью мгновенно показывает намерение — без позиционной неоднозначности."
        },
        conceptDemonstrated: "cpt_builder_pattern"
      },
      {
        id: "ann_sol_oc_3",
        startLine: 74,
        endLine: 81,
        category: "INTERVIEW_CONCEPT",
        title: { en: "Cross-Field Invariant Validation in build()", ru: "Кросс-полевая Валидация Инвариантов в build()" },
        explanation: {
          en: "build() enforces the regulatory rule: tax-exempt instructions must be audited. Invalid combinations fail fast with IllegalStateException before object construction.",
          ru: "build() обеспечивает регуляторное правило: налогово-льготные инструкции должны быть audited. Невалидные комбинации fail-fast с IllegalStateException до создания объекта."
        },
        conceptDemonstrated: "cpt_invariants"
      }
    ],
    relatedQuestionIds: ["q_oc_settlement_01"],
    conceptIds: ["cpt_builder_pattern", "cpt_static_factory_methods", "cpt_immutability", "cpt_invariants"],
    tags: ["#builder-pattern", "#static-factories", "#immutability", "#settlement"]
  },
  {
    id: "art_settlement_factory_bughunt",
    type: "COUNTER_EXAMPLE",
    language: "java",
    javaVersion: "17",
    title: {
      en: "Bug Hunt Code: SettlementInstructionFactory Swapped Flags",
      ru: "Код для Поиска Бага: Перепутанные Флаги в SettlementInstructionFactory"
    },
    sourceCode: `public final class SettlementInstructionFactory {

    public SettlementInstruction createTaxExemptWire(
            String instructionId, String payerAccountId,
            String payeeAccountId, long amountInCents) {
        // Developer intent: isAudited=true, isTaxExempt=true
        return new SettlementInstruction(
                instructionId, payerAccountId, payeeAccountId, amountInCents,
                "USD", LocalDate.now(), Priority.HIGH,
                true,   // BUG: binds to isTaxExempt (position 8), not isAudited!
                true,   // BUG: binds to isAudited (position 9), not isTaxExempt!
                "SWIFT-001", "Q3 tax-exempt wire", "BATCH-Q3-2026");
    }
}`,
    annotations: [
      {
        id: "ann_bug_oc_1",
        startLine: 9,
        endLine: 10,
        category: "PROBLEM_IN_ORIGINAL_CODE",
        title: { en: "Swapped Boolean Literals at Call Site", ru: "Перепутанные Boolean-Литералы в Вызове" },
        explanation: {
          en: "Developer comments say 'intended isAudited' on line 9 and 'intended isTaxExempt' on line 10, but constructor parameter order is (isTaxExempt, isAudited). Both flags are true but assigned to wrong fields.",
          ru: "Комментарии разработчика говорят 'intended isAudited' на строке 9 и 'intended isTaxExempt' на строке 10, но порядок параметров конструктора (isTaxExempt, isAudited). Оба флага true, но присвоены неправильным полям."
        },
        problemSolved: {
          en: "Demonstrates why telescoping constructors with adjacent booleans are production traps.",
          ru: "Демонстрирует, почему телескопические конструкторы со смежными boolean — продакшн-ловушки."
        },
        conceptDemonstrated: "cpt_builder_pattern"
      }
    ],
    relatedQuestionIds: ["q_oc_settlement_01"],
    conceptIds: ["cpt_builder_pattern", "cpt_static_factory_methods"],
    tags: ["#boolean-trap", "#bug-hunt", "#settlement"]
  }
];
