import { CodeArtifact } from '../../../../../types/domain';

export const CODE_ARTIFACTS_STATE_BEHAVIOR_IDENTITY: readonly CodeArtifact[] = [
  {
    id: "art_sbi_transfer_domain",
    type: "QUESTION_CODE",
    language: "java",
    javaVersion: "17",
    title: {
      en: "Domain Types: TransferId, TransferState, TransferRequest",
      ru: "Доменные Типы: TransferId, TransferState, TransferRequest"
    },
    sourceCode: `package com.bank.transfers.core;

public record TransferId(String value) {
    public TransferId {
        if (value == null || value.isBlank()) {
            throw new IllegalArgumentException("transferId required");
        }
    }

    public static TransferId of(String value) {
        return new TransferId(value);
    }
}

public enum TransferState {
    DRAFT, SUBMITTED, SETTLED, CANCELLED
}

/**
 * Entity: identity is TransferId; state evolves via behavior, not public setters.
 */
public class TransferRequest {
    private final TransferId transferId;
    private long amountCents;
    private String beneficiary;
    private TransferState state;

    public TransferRequest(TransferId transferId, long amountCents, String beneficiary) {
        this.transferId = transferId;
        this.amountCents = amountCents;
        this.beneficiary = beneficiary;
        this.state = TransferState.DRAFT;
    }

    public TransferId getTransferId() { return transferId; }
    public long getAmountCents() { return amountCents; }
    public String getBeneficiary() { return beneficiary; }
    public TransferState getState() { return state; }

    /** BUG pattern: public setters expose state without transition rules. */
    public void setTransferState(TransferState state) { this.state = state; }
    public void setAmountCents(long amountCents) { this.amountCents = amountCents; }

    public boolean sameStateAs(TransferRequest other) {
        return this.amountCents == other.amountCents
            && this.beneficiary.equals(other.beneficiary)
            && this.state == other.state;
    }
}`,
    annotations: [
      {
        id: "ann_sbi_domain_1",
        startLine: 22,
        endLine: 28,
        category: "WHY_IT_EXISTS",
        title: { en: "Identity vs Mutable State", ru: "Identity vs Мутабельный State" },
        explanation: {
          en: "TransferId is final identity. amount/state are mutable state — they can match across distinct entities.",
          ru: "TransferId — финальная identity. amount/state — мутабельный state; они могут совпадать у разных сущностей."
        },
        conceptDemonstrated: "cpt_object_identity"
      }
    ],
    relatedQuestionIds: ["q_sbi_duplicate_transfer_01"],
    conceptIds: ["cpt_object_state", "cpt_object_identity"],
    tags: ["#transfer-request", "#identity"]
  },
  {
    id: "art_sbi_service_broken",
    type: "COUNTER_EXAMPLE",
    language: "java",
    javaVersion: "17",
    title: {
      en: "Broken Baseline: State-Sameness Skip in TransferService",
      ru: "Исходный Нарушенный Код: Skip по Совпадению State в TransferService"
    },
    sourceCode: `package com.bank.transfers.core;

public class TransferAuditEntry {
    private final TransferId transferId;
    private final TransferState state;

    public TransferAuditEntry(TransferId transferId, TransferState state) {
        this.transferId = transferId;
        this.state = state;
    }

    public TransferId getTransferId() { return transferId; }
    public TransferState getState() { return state; }
}

/**
 * BUG: collapses distinct TransferIds when mutable state fields match;
 * mutates TransferState via public setter instead of transition behavior.
 */
public class TransferService {
    private final TransferAuditLog audit;
    private final TransferGateway gateway;

    public TransferService(TransferAuditLog audit, TransferGateway gateway) {
        this.audit = audit;
        this.gateway = gateway;
    }

    public void process(TransferRequest incoming, TransferRequest recent) {
        if (incoming.sameStateAs(recent)) {
            return;
        }
        incoming.setTransferState(TransferState.SUBMITTED);
        audit.log(new TransferAuditEntry(incoming.getTransferId(), TransferState.SUBMITTED));
        gateway.submit(incoming);
    }
}`,
    annotations: [
      {
        id: "ann_broken_sbi_1",
        startLine: 28,
        endLine: 30,
        category: "PROBLEM_IN_ORIGINAL_CODE",
        title: { en: "State Confused with Identity", ru: "State Спутан с Identity" },
        explanation: {
          en: "sameStateAs ignores TransferId — two distinct wires can look identical in fields.",
          ru: "sameStateAs игнорирует TransferId — два разных wire могут выглядеть одинаково по полям."
        },
        conceptDemonstrated: "cpt_object_identity"
      },
      {
        id: "ann_broken_sbi_2",
        startLine: 31,
        endLine: 31,
        category: "PROBLEM_IN_ORIGINAL_CODE",
        title: { en: "Setter Bypasses Behavior", ru: "Setter Обходит Behavior" },
        explanation: {
          en: "Public setter writes TransferState without validating the transition or owning the audit side-effect.",
          ru: "Публичный setter пишет TransferState без валидации перехода и без владения audit side-effect."
        },
        conceptDemonstrated: "cpt_object_behavior"
      }
    ],
    relatedQuestionIds: ["q_sbi_duplicate_transfer_01"],
    conceptIds: ["cpt_object_state", "cpt_object_behavior", "cpt_object_identity"],
    tags: ["#counter-example", "#transfer-service"]
  },
  {
    id: "art_sbi_transitions",
    type: "CORRECT_SOLUTION",
    language: "java",
    javaVersion: "17",
    title: {
      en: "TransferRequest Transitions: Behavior Owns State",
      ru: "Переходы TransferRequest: Behavior Владеет State"
    },
    sourceCode: `package com.bank.transfers.core;

public class TransferRequest {
    private final TransferId transferId;
    private final long amountCents;
    private final String beneficiary;
    private TransferState state;

    public TransferRequest(TransferId transferId, long amountCents, String beneficiary) {
        this.transferId = transferId;
        this.amountCents = amountCents;
        this.beneficiary = beneficiary;
        this.state = TransferState.DRAFT;
    }

    public TransferId getTransferId() { return transferId; }
    public long getAmountCents() { return amountCents; }
    public String getBeneficiary() { return beneficiary; }
    public TransferState getState() { return state; }

    public void submit() {
        if (state != TransferState.DRAFT) {
            throw new IllegalStateException("only DRAFT can submit");
        }
        this.state = TransferState.SUBMITTED;
    }

    public void settle() {
        if (state != TransferState.SUBMITTED) {
            throw new IllegalStateException("only SUBMITTED can settle");
        }
        this.state = TransferState.SETTLED;
    }

    public void cancel() {
        if (state == TransferState.SETTLED) {
            throw new IllegalStateException("SETTLED cannot cancel");
        }
        this.state = TransferState.CANCELLED;
    }
}`,
    annotations: [
      {
        id: "ann_sbi_transitions_1",
        startLine: 20,
        endLine: 36,
        category: "HOW_IT_FIXES_THE_PROBLEM",
        title: { en: "Transition Methods Protect Invariants", ru: "Transition-Методы Защищают Инварианты" },
        explanation: {
          en: "Behavior validates allowed TransferState changes — state is no longer a public writable field.",
          ru: "Behavior валидирует допустимые смены TransferState — state больше не публично записываемое поле."
        },
        conceptDemonstrated: "cpt_object_behavior"
      }
    ],
    relatedQuestionIds: ["q_sbi_duplicate_transfer_01"],
    conceptIds: ["cpt_object_behavior", "cpt_object_state"],
    tags: ["#transitions", "#behavior"]
  },
  {
    id: "art_sbi_service_solution",
    type: "CORRECT_SOLUTION",
    language: "java",
    javaVersion: "17",
    title: {
      en: "Fixed TransferService: Identity-Keyed Processing",
      ru: "Исправленный TransferService: Обработка по Identity"
    },
    sourceCode: `package com.bank.transfers.core;

import java.util.Set;

public class TransferService {
    private final TransferAuditLog audit;
    private final TransferGateway gateway;
    private final Set<TransferId> submittedIds;

    public TransferService(TransferAuditLog audit, TransferGateway gateway, Set<TransferId> submittedIds) {
        this.audit = audit;
        this.gateway = gateway;
        this.submittedIds = submittedIds;
    }

    public void process(TransferRequest incoming) {
        TransferId id = incoming.getTransferId();
        if (submittedIds.contains(id)) {
            return; // idempotent on identity, not on state fields
        }
        incoming.submit();
        submittedIds.add(id);
        audit.log(new TransferAuditEntry(id, incoming.getState()));
        gateway.submit(incoming);
    }
}`,
    annotations: [
      {
        id: "ann_sol_sbi_1",
        startLine: 16,
        endLine: 22,
        category: "HOW_IT_FIXES_THE_PROBLEM",
        title: { en: "Idempotency by TransferId", ru: "Идемпотентность по TransferId" },
        explanation: {
          en: "Skip only when the same TransferId was already submitted — matching amount never collapses a different entity.",
          ru: "Skip только если тот же TransferId уже был submitted — совпадение amount никогда не сливает другую сущность."
        },
        conceptDemonstrated: "cpt_object_identity"
      }
    ],
    relatedQuestionIds: ["q_sbi_duplicate_transfer_01"],
    conceptIds: ["cpt_object_identity", "cpt_object_behavior"],
    tags: ["#solution", "#transfer-service"]
  },
  {
    id: "art_sbi_service_bughunt",
    type: "COUNTER_EXAMPLE",
    language: "java",
    javaVersion: "17",
    title: {
      en: "Bug Hunt Snippet: State Sameness & Setter",
      ru: "Сниппет Bug Hunt: Совпадение State и Setter"
    },
    sourceCode: `public void process(TransferRequest incoming, TransferRequest recent) {
    if (incoming.sameStateAs(recent)) {
        return;
    }
    incoming.setTransferState(TransferState.SUBMITTED);
    audit.log(new TransferAuditEntry(incoming.getTransferId(), TransferState.SUBMITTED));
    gateway.submit(incoming);
}`,
    annotations: [
      {
        id: "ann_bug_sbi_1",
        startLine: 2,
        endLine: 2,
        category: "PROBLEM_IN_ORIGINAL_CODE",
        title: { en: "Field Sameness Gate", ru: "Гейт по Совпадению Полей" },
        explanation: {
          en: "This line treats matching state as sufficient reason to drop a distinct TransferId.",
          ru: "Эта строка считает совпадение state достаточным основанием отбросить другой TransferId."
        },
        conceptDemonstrated: "cpt_object_identity"
      }
    ],
    relatedQuestionIds: ["q_sbi_duplicate_transfer_01"],
    conceptIds: ["cpt_object_identity", "cpt_object_behavior"],
    tags: ["#bug-hunt"]
  }
];
