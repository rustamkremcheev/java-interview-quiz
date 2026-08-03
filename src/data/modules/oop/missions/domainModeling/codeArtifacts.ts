import { CodeArtifact } from '../../../../../types/domain';

export const CODE_ARTIFACTS_DOMAIN_MODELING: readonly CodeArtifact[] = [
  {
    id: "art_dm_value_objects",
    type: "QUESTION_CODE",
    language: "java",
    javaVersion: "17",
    title: {
      en: "ApplicantId & LoanMoney Value Objects",
      ru: "Value Objects ApplicantId и LoanMoney"
    },
    sourceCode: `package com.bank.lending.domain;

/** Lending-context money VO — named LoanMoney to avoid colliding with other modules' Money. */
public record LoanMoney(long amountCents) {
    public LoanMoney {
        if (amountCents < 0) {
            throw new IllegalArgumentException("amountCents must be >= 0");
        }
    }

    public static LoanMoney ofDollars(long dollars) {
        return new LoanMoney(Math.multiplyExact(dollars, 100));
    }
}

public record ApplicantId(String value) {
    public ApplicantId {
        if (value == null || value.isBlank()) {
            throw new IllegalArgumentException("applicantId must be non-blank");
        }
    }
}`,
    annotations: [
      {
        id: "ann_dm_vo_1",
        startLine: 4,
        endLine: 14,
        category: "WHY_IT_EXISTS",
        title: { en: "Self-Validating Money", ru: "Самовалидирующие Деньги" },
        explanation: {
          en: "LoanMoney forbids negative cents at construction — negative double amounts become unrepresentable.",
          ru: "LoanMoney запрещает отрицательные центы при создании — отрицательные double суммы становятся непредставимыми."
        },
        conceptDemonstrated: "cpt_value_objects"
      },
      {
        id: "ann_dm_vo_2",
        startLine: 16,
        endLine: 22,
        category: "INTERVIEW_CONCEPT",
        title: { en: "Typed Applicant Identity", ru: "Типизированная Идентичность Заявителя" },
        explanation: {
          en: "ApplicantId stops blank/typo String bags from masquerading as valid lending identities.",
          ru: "ApplicantId не даёт пустым/опечатанным String выдавать себя за валидные lending-идентичности."
        },
        conceptDemonstrated: "cpt_value_objects"
      }
    ],
    relatedQuestionIds: ["q_dm_loan_01"],
    conceptIds: ["cpt_value_objects"],
    tags: ["#value-objects", "#loan-money", "#applicant-id"]
  },
  {
    id: "art_dm_loan_application_broken",
    type: "COUNTER_EXAMPLE",
    language: "java",
    javaVersion: "17",
    title: {
      en: "Broken Baseline: Primitive Obsession LoanApplication",
      ru: "Исходный Нарушенный Код: Primitive Obsession в LoanApplication"
    },
    sourceCode: `package com.bank.lending;

import java.util.HashMap;
import java.util.Map;

/**
 * ILLEGAL STATES REPRESENTABLE:
 * status=REJECTED + approved=true, amount < 0, typo statuses, open extras map.
 */
public class LoanApplication {
    public String applicantId;
    public String status;      // "DRAFT" | "SUBMITTED" | "APPROVED" | "REJECTED" (unchecked)
    public boolean approved;   // independent of status — can disagree
    public double amount;      // negatives / NaN possible
    public Map<String, Object> extras = new HashMap<>();

    // Hotfix path that shipped contradictory state to risk engines
    public void applyUnderwriterOverride(boolean keepApprovedOnReject) {
        this.status = "REJECTED";
        if (keepApprovedOnReject) {
            this.approved = true; // ⚠️ compliance incident
        }
    }
}`,
    annotations: [
      {
        id: "ann_broken_dm_1",
        startLine: 11,
        endLine: 16,
        category: "PROBLEM_IN_ORIGINAL_CODE",
        title: { en: "Primitive Bag Fields", ru: "Поля-Мешок Примитивов" },
        explanation: {
          en: "String/boolean/double/Map expose independent knobs that can encode illegal lending combinations.",
          ru: "String/boolean/double/Map открывают независимые ручки, кодирующие нелегальные lending-комбинации."
        },
        problemSolved: {
          en: "Primitive Obsession makes illegal states compile and persist.",
          ru: "Primitive Obsession делает нелегальные состояния компилируемыми и персистируемыми."
        },
        conceptDemonstrated: "cpt_domain_modeling"
      },
      {
        id: "ann_broken_dm_2",
        startLine: 19,
        endLine: 25,
        category: "PRODUCTION_RISK",
        title: { en: "REJECTED + approved Hotfix", ru: "Хотфикс REJECTED + approved" },
        explanation: {
          en: "Direct field writes set REJECTED while keeping approved=true — risk books phantom capacity.",
          ru: "Прямая запись полей выставляет REJECTED, оставляя approved=true — risk резервирует фантомную ёмкость."
        },
        conceptDemonstrated: "cpt_domain_modeling"
      }
    ],
    relatedQuestionIds: ["q_dm_loan_01"],
    conceptIds: ["cpt_domain_modeling", "cpt_value_objects"],
    tags: ["#primitive-obsession", "#illegal-states", "#loan-application"]
  },
  {
    id: "art_dm_status_decision",
    type: "QUESTION_CODE",
    language: "java",
    javaVersion: "17",
    title: {
      en: "LoanStatus, CreditDecision & ApprovalPolicy",
      ru: "LoanStatus, CreditDecision и ApprovalPolicy"
    },
    sourceCode: `package com.bank.lending.domain;

public enum LoanStatus {
    DRAFT,
    SUBMITTED,
    APPROVED,
    REJECTED
}

/** Outcome of underwriting — replaces independent boolean approved. */
public record CreditDecision(boolean approved, String reasonCode) {
    public CreditDecision {
        if (reasonCode == null || reasonCode.isBlank()) {
            throw new IllegalArgumentException("reasonCode required");
        }
    }

    public static CreditDecision approve(String reasonCode) {
        return new CreditDecision(true, reasonCode);
    }

    public static CreditDecision reject(String reasonCode) {
        return new CreditDecision(false, reasonCode);
    }
}

public final class ApprovalPolicy {
    private final LoanMoney minimumAmount;

    public ApprovalPolicy(LoanMoney minimumAmount) {
        this.minimumAmount = minimumAmount;
    }

    public void assertCanSubmit(LoanStatus status, LoanMoney amount) {
        if (status != LoanStatus.DRAFT) {
            throw new IllegalStateException("Only DRAFT may submit");
        }
        if (amount.amountCents() < minimumAmount.amountCents()) {
            throw new IllegalArgumentException("Below minimum loan amount");
        }
    }

    public LoanStatus statusAfter(CreditDecision decision) {
        return decision.approved() ? LoanStatus.APPROVED : LoanStatus.REJECTED;
    }
}`,
    annotations: [
      {
        id: "ann_dm_status_1",
        startLine: 3,
        endLine: 8,
        category: "HOW_IT_FIXES_THE_PROBLEM",
        title: { en: "Closed Status Set", ru: "Закрытый Набор Статусов" },
        explanation: {
          en: "LoanStatus enum eliminates typo strings and pairs with CreditDecision instead of a free boolean.",
          ru: "Enum LoanStatus устраняет строки-опечатки и сочетается с CreditDecision вместо свободного boolean."
        },
        conceptDemonstrated: "cpt_domain_modeling"
      },
      {
        id: "ann_dm_status_2",
        startLine: 28,
        endLine: 48,
        category: "INTERVIEW_CONCEPT",
        title: { en: "Policy Encodes Transition Rules", ru: "Policy Кодирует Правила Переходов" },
        explanation: {
          en: "ApprovalPolicy centralizes submit/decide guards — aggregate methods delegate here.",
          ru: "ApprovalPolicy централизует guards submit/decide — методы агрегата делегируют сюда."
        },
        conceptDemonstrated: "cpt_domain_modeling"
      }
    ],
    relatedQuestionIds: ["q_dm_loan_01"],
    conceptIds: ["cpt_domain_modeling", "cpt_value_objects"],
    tags: ["#loan-status", "#credit-decision", "#approval-policy"]
  },
  {
    id: "art_dm_loan_application_solution",
    type: "CORRECT_SOLUTION",
    language: "java",
    javaVersion: "17",
    title: {
      en: "Production Fix: Typed LoanApplication Aggregate",
      ru: "Продакшн Фикс: Типизированный Агрегат LoanApplication"
    },
    sourceCode: `package com.bank.lending.domain;

import java.util.Objects;

/**
 * Aggregate boundary lite: no public fields; transitions via submit/decide only.
 * Illegal combinations (REJECTED+approved, negative money) are unrepresentable.
 */
public final class LoanApplication {

    private final ApplicantId applicantId;
    private LoanStatus status;
    private LoanMoney amount;
    private CreditDecision decision; // null until decided

    public LoanApplication(ApplicantId applicantId, LoanMoney amount) {
        this.applicantId = Objects.requireNonNull(applicantId);
        this.amount = Objects.requireNonNull(amount);
        this.status = LoanStatus.DRAFT;
    }

    public void submit(ApprovalPolicy policy) {
        policy.assertCanSubmit(status, amount);
        this.status = LoanStatus.SUBMITTED;
    }

    public void decide(ApprovalPolicy policy, CreditDecision decision) {
        if (status != LoanStatus.SUBMITTED) {
            throw new IllegalStateException("Only SUBMITTED applications may be decided");
        }
        this.decision = Objects.requireNonNull(decision);
        this.status = policy.statusAfter(decision);
        // approved outcome is decision.approved() — no independent boolean flag
    }

    public boolean isApproved() {
        return status == LoanStatus.APPROVED;
    }

    public ApplicantId applicantId() { return applicantId; }
    public LoanStatus status() { return status; }
    public LoanMoney amount() { return amount; }
    public CreditDecision decision() { return decision; }
}`,
    annotations: [
      {
        id: "ann_sol_dm_1",
        startLine: 12,
        endLine: 17,
        category: "HOW_IT_FIXES_THE_PROBLEM",
        title: { en: "Typed Private State", ru: "Типизированное Private-Состояние" },
        explanation: {
          en: "ApplicantId, LoanStatus, LoanMoney, CreditDecision replace String/boolean/double bags.",
          ru: "ApplicantId, LoanStatus, LoanMoney, CreditDecision заменяют мешки String/boolean/double."
        },
        problemSolved: {
          en: "Illegal REJECTED+approved and negative amounts cannot be encoded as independent fields.",
          ru: "Нелегальные REJECTED+approved и отрицательные суммы нельзя закодировать независимыми полями."
        },
        conceptDemonstrated: "cpt_value_objects"
      },
      {
        id: "ann_sol_dm_2",
        startLine: 25,
        endLine: 36,
        category: "INTERVIEW_CONCEPT",
        title: { en: "Behavior Methods Enforce Transitions", ru: "Методы Поведения Защищают Переходы" },
        explanation: {
          en: "submit/decide + ApprovalPolicy are the only writers of status/decision — aggregate boundary lite.",
          ru: "submit/decide + ApprovalPolicy — единственные writers status/decision — lite-граница агрегата."
        },
        problemSolved: {
          en: "Hotfix paths cannot set contradictory public fields.",
          ru: "Хотфикс-пути не могут выставить противоречивые public fields."
        },
        conceptDemonstrated: "cpt_domain_modeling"
      }
    ],
    relatedQuestionIds: ["q_dm_loan_01"],
    conceptIds: ["cpt_domain_modeling", "cpt_value_objects"],
    tags: ["#loan-application", "#aggregate", "#domain-modeling"]
  },
  {
    id: "art_dm_loan_application_bughunt",
    type: "COUNTER_EXAMPLE",
    language: "java",
    javaVersion: "17",
    title: {
      en: "Bug Hunt Code: Illegal State Writers",
      ru: "Код для Поиска Бага: Запись Нелегальных Состояний"
    },
    sourceCode: `package com.bank.lending;

import java.util.HashMap;
import java.util.Map;

public class LoanApplication {
    public String applicantId;
    public String status;
    public boolean approved;
    public double amount;
    public Map<String, Object> extras = new HashMap<>();

    public void markRejectedButKeepApprovedFlag() {
        this.status = "REJECTED";
        this.approved = true;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }
}`,
    annotations: [
      {
        id: "ann_bug_dm_1",
        startLine: 7,
        endLine: 10,
        category: "PROBLEM_IN_ORIGINAL_CODE",
        title: { en: "Independent Primitive Fields", ru: "Независимые Примитивные Поля" },
        explanation: {
          en: "status, approved, and amount can be set to any combination — including REJECTED+approved and negatives.",
          ru: "status, approved и amount можно выставить в любую комбинацию — включая REJECTED+approved и negatives."
        },
        problemSolved: {
          en: "Shows why public primitive bags fail make-illegal-states-unrepresentable.",
          ru: "Показывает, почему public-мешки примитивов проваливают make-illegal-states-unrepresentable."
        },
        conceptDemonstrated: "cpt_domain_modeling"
      },
      {
        id: "ann_bug_dm_2",
        startLine: 13,
        endLine: 20,
        category: "PRODUCTION_RISK",
        title: { en: "Writers Without Invariants", ru: "Writers Без Инвариантов" },
        explanation: {
          en: "markRejectedButKeepApprovedFlag and setAmount encode the compliance incident directly.",
          ru: "markRejectedButKeepApprovedFlag и setAmount напрямую кодируют инцидент compliance."
        },
        conceptDemonstrated: "cpt_value_objects"
      }
    ],
    relatedQuestionIds: ["q_dm_loan_01"],
    conceptIds: ["cpt_domain_modeling", "cpt_value_objects"],
    tags: ["#bug-hunt", "#primitive-obsession", "#loan-application"]
  }
];
