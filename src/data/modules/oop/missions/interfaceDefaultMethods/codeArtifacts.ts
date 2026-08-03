import { CodeArtifact } from '../../../../../types/domain';

export const CODE_ARTIFACTS_INTERFACE_DEFAULT_METHODS: readonly CodeArtifact[] = [
  {
    id: "art_idm_auditable_interface",
    type: "QUESTION_CODE",
    language: "java",
    javaVersion: "17",
    title: {
      en: "compliance-sdk: Auditable Interface with Default auditLog()",
      ru: "compliance-sdk: Интерфейс Auditable с Default auditLog()"
    },
    sourceCode: `package com.bank.compliance;

/**
 * Compliance SDK — added default auditLog() in v3.2.0 (framework upgrade).
 * Writes immutable audit records to compliance database.
 */
public interface Auditable {

    default void auditLog() {
        ComplianceAuditWriter.getInstance()
            .write(new AuditRecord("COMPLIANCE", getAuditEntityId()));
    }

    String getAuditEntityId();
}`,
    annotations: [
      {
        id: "ann_auditable_1",
        startLine: 9,
        endLine: 12,
        category: "WHY_IT_EXISTS",
        title: { en: "Compliance Default Method", ru: "Default-Метод Compliance" },
        explanation: {
          en: "compliance-sdk v3.2.0 added this default to eliminate boilerplate audit writes across 200+ payment services.",
          ru: "compliance-sdk v3.2.0 добавил этот default для устранения шаблонного audit-кода в 200+ платежных сервисах."
        },
        conceptDemonstrated: "cpt_default_methods"
      }
    ],
    relatedQuestionIds: ["q_idm_payment_01"],
    conceptIds: ["cpt_default_methods", "cpt_interface_contracts"],
    tags: ["#default-methods", "#compliance", "#audit"]
  },
  {
    id: "art_idm_traceable_interface",
    type: "QUESTION_CODE",
    language: "java",
    javaVersion: "17",
    title: {
      en: "observability-sdk: Traceable Interface with Default auditLog()",
      ru: "observability-sdk: Интерфейс Traceable с Default auditLog()"
    },
    sourceCode: `package com.bank.observability;

/**
 * Observability SDK — added default auditLog() in v2.8.0 (framework upgrade).
 * Emits distributed trace spans for payment reconciliation events.
 */
public interface Traceable {

    default void auditLog() {
        TraceSpanEmitter.current()
            .startSpan("audit-log", getTraceContextId())
            .end();
    }

    String getTraceContextId();
}`,
    annotations: [
      {
        id: "ann_traceable_1",
        startLine: 9,
        endLine: 13,
        category: "WHY_IT_EXISTS",
        title: { en: "Observability Default Method", ru: "Default-Метод Observability" },
        explanation: {
          en: "observability-sdk v2.8.0 added identically-signed default auditLog() — unrelated to Auditable's compliance DB write.",
          ru: "observability-sdk v2.8.0 добавил default auditLog() с идентичной сигнатурой — несвязанный с compliance DB write из Auditable."
        },
        conceptDemonstrated: "cpt_default_methods"
      }
    ],
    relatedQuestionIds: ["q_idm_payment_01"],
    conceptIds: ["cpt_default_methods", "cpt_interface_contracts"],
    tags: ["#default-methods", "#tracing", "#observability"]
  },
  {
    id: "art_idm_reconciliation_broken",
    type: "COUNTER_EXAMPLE",
    language: "java",
    javaVersion: "17",
    title: {
      en: "Broken Baseline: PaymentReconciliationService Compile Error",
      ru: "Исходный Нарушенный Код: Ошибка Компиляции PaymentReconciliationService"
    },
    sourceCode: `package com.bank.payment.reconciliation;

import com.bank.compliance.Auditable;
import com.bank.observability.Traceable;

/**
 * COMPILE ERROR (JLS 9.4.1.2):
 * class PaymentReconciliationService inherits unrelated defaults
 * for auditLog() from types Auditable and Traceable
 */
public class PaymentReconciliationService implements Auditable, Traceable {

    private final String settlementId;

    public PaymentReconciliationService(String settlementId) {
        this.settlementId = settlementId;
    }

    @Override
    public String getAuditEntityId() {
        return settlementId;
    }

    @Override
    public String getTraceContextId() {
        return settlementId;
    }

    public void reconcile(SettlementBatch batch) {
        // ⚠️ No auditLog() override — compiler cannot choose between defaults!
        processBatch(batch);
    }

    private void processBatch(SettlementBatch batch) {
        // reconciliation logic...
    }
}`,
    annotations: [
      {
        id: "ann_broken_idm_1",
        startLine: 11,
        endLine: 11,
        category: "PROBLEM_IN_ORIGINAL_CODE",
        title: { en: "Dual Interface Diamond Inheritance", ru: "Наследование Ромба от Двух Интерфейсов" },
        explanation: {
          en: "Line 11: implements Auditable, Traceable — both sibling interfaces now supply unrelated default void auditLog().",
          ru: "Строка 11: implements Auditable, Traceable — оба «братских» интерфейса теперь предоставляют несвязанные default void auditLog()."
        },
        problemSolved: {
          en: "Triggers JLS 9.4.1.2 compile error: unrelated defaults for auditLog().",
          ru: "Вызывает ошибку компиляции JLS 9.4.1.2: unrelated defaults for auditLog()."
        },
        conceptDemonstrated: "cpt_default_methods"
      },
      {
        id: "ann_broken_idm_2",
        startLine: 27,
        endLine: 30,
        category: "PRODUCTION_RISK",
        title: { en: "Missing Explicit Override", ru: "Отсутствует Явное Переопределение" },
        explanation: {
          en: "Lines 27-30: reconcile() cannot call auditLog() because the class has no resolved auditLog() implementation.",
          ru: "Строки 27-30: reconcile() не может вызвать auditLog(), так как у класса нет разрешенной реализации auditLog()."
        },
        conceptDemonstrated: "cpt_interface_contracts"
      }
    ],
    relatedQuestionIds: ["q_idm_payment_01"],
    conceptIds: ["cpt_default_methods", "cpt_interface_contracts"],
    tags: ["#diamond-problem", "#compile-error", "#jls-9412"]
  },
  {
    id: "art_idm_reconciliation_solution",
    type: "CORRECT_SOLUTION",
    language: "java",
    javaVersion: "17",
    title: {
      en: "Production Fix: Super-Qualified Dual Audit Resolution",
      ru: "Продакшн Фикс: Super-Qualified Разрешение Двойного Аудита"
    },
    sourceCode: `package com.bank.payment.reconciliation;

import com.bank.compliance.Auditable;
import com.bank.observability.Traceable;

public class PaymentReconciliationService implements Auditable, Traceable {

    private final String settlementId;

    public PaymentReconciliationService(String settlementId) {
        this.settlementId = settlementId;
    }

    @Override
    public String getAuditEntityId() {
        return settlementId;
    }

    @Override
    public String getTraceContextId() {
        return settlementId;
    }

    // JLS 9.4.1.2 fix: explicit override with super-qualified default delegation
    @Override
    public void auditLog() {
        Auditable.super.auditLog();   // compliance DB write (regulatory first)
        Traceable.super.auditLog();   // distributed trace span
    }

    public void reconcile(SettlementBatch batch) {
        auditLog();
        processBatch(batch);
    }

    private void processBatch(SettlementBatch batch) {
        // reconciliation logic...
    }
}`,
    annotations: [
      {
        id: "ann_sol_idm_1",
        startLine: 22,
        endLine: 26,
        category: "HOW_IT_FIXES_THE_PROBLEM",
        title: { en: "Super-Qualified Default Method Chain", ru: "Цепочка Super-Qualified Default-Методов" },
        explanation: {
          en: "Lines 22-26: @Override resolves JLS 9.4.1.2 conflict. Auditable.super.auditLog() and Traceable.super.auditLog() invoke each interface's default explicitly.",
          ru: "Строки 22-26: @Override разрешает конфликт JLS 9.4.1.2. Auditable.super.auditLog() и Traceable.super.auditLog() явно вызывают default каждого интерфейса."
        },
        problemSolved: {
          en: "Eliminates compile error and preserves both compliance audit and distributed tracing.",
          ru: "Устраняет ошибку компиляции и сохраняет compliance audit и distributed tracing."
        },
        conceptDemonstrated: "cpt_default_methods"
      },
      {
        id: "ann_sol_idm_2",
        startLine: 24,
        endLine: 25,
        category: "INTERVIEW_CONCEPT",
        title: { en: "Regulatory Audit Ordering", ru: "Порядок Регуляторного Аудита" },
        explanation: {
          en: "Compliance DB write before trace span emission — regulatory ordering requirement in payment reconciliation pipelines.",
          ru: "Запись в compliance DB перед эмиссией trace span — требование регуляторного порядка в pipeline сверки платежей."
        },
        conceptDemonstrated: "cpt_interface_contracts"
      }
    ],
    relatedQuestionIds: ["q_idm_payment_01"],
    conceptIds: ["cpt_default_methods", "cpt_interface_contracts"],
    tags: ["#default-methods", "#jls-9412", "#audit-facade"]
  },
  {
    id: "art_idm_settlement_processor_bughunt",
    type: "COUNTER_EXAMPLE",
    language: "java",
    javaVersion: "17",
    title: {
      en: "Bug Hunt Code: SettlementProcessor Partial Default Delegation",
      ru: "Код для Поиска Бага: SettlementProcessor с Частичным Default-Делегированием"
    },
    sourceCode: `package com.bank.payment.settlement;

import com.bank.compliance.Auditable;
import com.bank.observability.Traceable;

public class SettlementProcessor implements Auditable, Traceable {

    @Override
    public void auditLog() {
        // BUG: Only Traceable default invoked — compliance records missing!
        Traceable.super.auditLog();
    }

    @Override
    public String getAuditEntityId() {
        return "settlement-processor";
    }

    @Override
    public String getTraceContextId() {
        return "settlement-processor";
    }

    public void processSettlement(Settlement settlement) {
        auditLog();
        // settlement processing...
    }
}`,
    annotations: [
      {
        id: "ann_bug_idm_1",
        startLine: 10,
        endLine: 12,
        category: "PROBLEM_IN_ORIGINAL_CODE",
        title: { en: "Missing Auditable.super.auditLog() Call", ru: "Отсутствует Вызов Auditable.super.auditLog()" },
        explanation: {
          en: "Line 11: Only Traceable.super.auditLog() is called. Auditable compliance DB write is silently dropped — compiles but fails regulatory audit in production.",
          ru: "Строка 11: Вызывается только Traceable.super.auditLog(). Запись compliance DB из Auditable молча отбрасывается — компилируется, но ломает регуляторный аудит на продакшене."
        },
        problemSolved: {
          en: "Demonstrates that partial super-qualified delegation is worse than compile error — silent compliance violation.",
          ru: "Демонстрирует, что частичное super-qualified делегирование хуже ошибки компиляции — тихое нарушение compliance."
        },
        conceptDemonstrated: "cpt_default_methods"
      }
    ],
    relatedQuestionIds: ["q_idm_payment_01"],
    conceptIds: ["cpt_default_methods", "cpt_interface_contracts"],
    tags: ["#bug-hunt", "#audit", "#default-methods"]
  }
];
