import { CodeArtifact } from '../../../../../types/domain';

export const CODE_ARTIFACTS_TOSTRING_SAFE_LOGGING: readonly CodeArtifact[] = [
  {
    id: "art_ts_domain_types",
    type: "QUESTION_CODE",
    language: "java",
    javaVersion: "17",
    title: {
      en: "Domain Types: CustomerId, AccountReference, VerificationToken",
      ru: "Доменные Типы: CustomerId, AccountReference, VerificationToken"
    },
    sourceCode: `package com.bank.kyc.verification;

public record CustomerId(String value) {
    public CustomerId {
        if (value == null || value.isBlank()) {
            throw new IllegalArgumentException("customerId required");
        }
    }

    public static CustomerId of(String value) {
        return new CustomerId(value);
    }
}

public record AccountReference(String iban) {
    public AccountReference {
        if (iban == null || iban.isBlank()) {
            throw new IllegalArgumentException("iban required");
        }
    }
}

/** One-time KYC verification secret — never log raw value. */
public record VerificationToken(String raw) {
    public VerificationToken {
        if (raw == null || raw.isBlank()) {
            throw new IllegalArgumentException("token required");
        }
    }
}`,
    annotations: [
      {
        id: "ann_ts_domain_1",
        startLine: 28,
        endLine: 35,
        category: "WHY_IT_EXISTS",
        title: { en: "Token Is a Secret", ru: "Токен — Секрет" },
        explanation: {
          en: "VerificationToken must never appear in toString or everyday logs — treat like a credential.",
          ru: "VerificationToken никогда не должен появляться в toString или повседневных логах — как credential."
        },
        conceptDemonstrated: "cpt_pii_redaction"
      }
    ],
    relatedQuestionIds: ["q_ts_pii_tostring_01"],
    conceptIds: ["cpt_pii_redaction"],
    tags: ["#customer-id", "#verification-token"]
  },
  {
    id: "art_ts_request_broken",
    type: "COUNTER_EXAMPLE",
    language: "java",
    javaVersion: "17",
    title: {
      en: "Broken Baseline: PII Dumping toString + Concat Logging",
      ru: "Исходный Нарушенный Код: Dump PII в toString + Concat Logging"
    },
    sourceCode: `package com.bank.kyc.verification;

public class CustomerVerificationRequest {
    private final CustomerId customerId;
    private final String fullName;
    private final String nationalId;
    private final AccountReference accountReference;
    private final VerificationToken verificationToken;

    public CustomerVerificationRequest(
            CustomerId customerId,
            String fullName,
            String nationalId,
            AccountReference accountReference,
            VerificationToken verificationToken) {
        this.customerId = customerId;
        this.fullName = fullName;
        this.nationalId = nationalId;
        this.accountReference = accountReference;
        this.verificationToken = verificationToken;
    }

    public CustomerId getCustomerId() { return customerId; }
    public VerificationToken getVerificationToken() { return verificationToken; }

    @Override
    public String toString() {
        return "CustomerVerificationRequest{" +
            "customerId=" + customerId +
            ", fullName=" + fullName +
            ", nationalId=" + nationalId +
            ", account=" + accountReference +
            ", token=" + verificationToken +
            '}';
    }
}

public class KycAuditLogger {
    private final org.slf4j.Logger logger =
        org.slf4j.LoggerFactory.getLogger(KycAuditLogger.class);

    public void logReceived(CustomerVerificationRequest request) {
        logger.info("verify " + request);
    }
}`,
    annotations: [
      {
        id: "ann_broken_ts_1",
        startLine: 30,
        endLine: 37,
        category: "PROBLEM_IN_ORIGINAL_CODE",
        title: { en: "PII & Secret in toString", ru: "PII и Секрет в toString" },
        explanation: {
          en: "fullName, nationalId, account, and token turn every log/debug of this object into a data exposure.",
          ru: "fullName, nationalId, account и token превращают каждый log/debug этого объекта в data exposure."
        },
        conceptDemonstrated: "cpt_tostring_diagnostics"
      },
      {
        id: "ann_broken_ts_2",
        startLine: 46,
        endLine: 48,
        category: "PROBLEM_IN_ORIGINAL_CODE",
        title: { en: "Eager Concatenation", ru: "Eager Concatenation" },
        explanation: {
          en: "String concatenation always calls toString and embeds the dump in centralized INFO logs.",
          ru: "String concatenation всегда вызывает toString и встраивает dump в централизованные INFO-логи."
        },
        conceptDemonstrated: "cpt_logging_parameterization"
      }
    ],
    relatedQuestionIds: ["q_ts_pii_tostring_01"],
    conceptIds: ["cpt_tostring_diagnostics", "cpt_pii_redaction", "cpt_logging_parameterization"],
    tags: ["#counter-example", "#pii-logging"]
  },
  {
    id: "art_ts_redaction_policy",
    type: "CORRECT_SOLUTION",
    language: "java",
    javaVersion: "17",
    title: {
      en: "RedactionPolicy: Mask Identifiers, Hide Secrets",
      ru: "RedactionPolicy: Маскировать Идентификаторы, Скрывать Секреты"
    },
    sourceCode: `package com.bank.kyc.verification;

public final class RedactionPolicy {
    private RedactionPolicy() {}

    public static String customerId(CustomerId id) {
        String v = id.value();
        if (v.length() <= 4) {
            return "****";
        }
        return "****" + v.substring(v.length() - 4);
    }

    public static String account(AccountReference account) {
        String iban = account.iban();
        if (iban.length() <= 4) {
            return "IBAN:****";
        }
        return "IBAN:****" + iban.substring(iban.length() - 4);
    }

    public static String token(VerificationToken token) {
        return "[REDACTED_TOKEN]";
    }
}`,
    annotations: [
      {
        id: "ann_ts_redact_1",
        startLine: 5,
        endLine: 22,
        category: "HOW_IT_FIXES_THE_PROBLEM",
        title: { en: "Central Redaction", ru: "Центральная Redaction" },
        explanation: {
          en: "One policy for masking CustomerId/AccountReference and scrubbing VerificationToken keeps call sites consistent.",
          ru: "Одна политика маскирования CustomerId/AccountReference и scrub VerificationToken держит call sites согласованными."
        },
        conceptDemonstrated: "cpt_pii_redaction"
      }
    ],
    relatedQuestionIds: ["q_ts_pii_tostring_01"],
    conceptIds: ["cpt_pii_redaction"],
    tags: ["#redaction", "#pii"]
  },
  {
    id: "art_ts_request_solution",
    type: "CORRECT_SOLUTION",
    language: "java",
    javaVersion: "17",
    title: {
      en: "Fixed: Redacted toString + Parameterized KycAuditLogger",
      ru: "Исправлено: Redacted toString + Parameterized KycAuditLogger"
    },
    sourceCode: `package com.bank.kyc.verification;

public class CustomerVerificationRequest {
    private final CustomerId customerId;
    private final String fullName;
    private final String nationalId;
    private final AccountReference accountReference;
    private final VerificationToken verificationToken;

    public CustomerVerificationRequest(
            CustomerId customerId,
            String fullName,
            String nationalId,
            AccountReference accountReference,
            VerificationToken verificationToken) {
        this.customerId = customerId;
        this.fullName = fullName;
        this.nationalId = nationalId;
        this.accountReference = accountReference;
        this.verificationToken = verificationToken;
    }

    public CustomerId getCustomerId() { return customerId; }

    @Override
    public String toString() {
        return "CustomerVerificationRequest{" +
            "customerId=" + RedactionPolicy.customerId(customerId) +
            ", account=" + RedactionPolicy.account(accountReference) +
            ", token=" + RedactionPolicy.token(verificationToken) +
            '}';
    }
}

public class KycAuditLogger {
    private final org.slf4j.Logger logger =
        org.slf4j.LoggerFactory.getLogger(KycAuditLogger.class);

    public void logReceived(CustomerVerificationRequest request) {
        logger.info("verify customerId={}",
            RedactionPolicy.customerId(request.getCustomerId()));
    }
}`,
    annotations: [
      {
        id: "ann_sol_ts_1",
        startLine: 28,
        endLine: 34,
        category: "HOW_IT_FIXES_THE_PROBLEM",
        title: { en: "Redacted Diagnostics", ru: "Redacted Диагностика" },
        explanation: {
          en: "toString omits fullName/nationalId and redacts identifiers/token — safe if accidentally logged.",
          ru: "toString опускает fullName/nationalId и редактирует идентификаторы/токен — безопасно при случайном логировании."
        },
        conceptDemonstrated: "cpt_tostring_diagnostics"
      },
      {
        id: "ann_sol_ts_2",
        startLine: 42,
        endLine: 45,
        category: "HOW_IT_FIXES_THE_PROBLEM",
        title: { en: "Parameterized Safe Args", ru: "Parameterized Safe Args" },
        explanation: {
          en: "Logger receives an explicit redacted field — no object concatenation, structured-friendly.",
          ru: "Logger получает явное redacted поле — без concatenation объекта, удобно для structured logs."
        },
        conceptDemonstrated: "cpt_logging_parameterization"
      }
    ],
    relatedQuestionIds: ["q_ts_pii_tostring_01"],
    conceptIds: ["cpt_tostring_diagnostics", "cpt_pii_redaction", "cpt_logging_parameterization"],
    tags: ["#solution", "#kyc-logger"]
  },
  {
    id: "art_ts_logger_bughunt",
    type: "COUNTER_EXAMPLE",
    language: "java",
    javaVersion: "17",
    title: {
      en: "Bug Hunt Snippet: toString Dump + Concat Log",
      ru: "Сниппет Bug Hunt: Dump toString + Concat Log"
    },
    sourceCode: `public String toString() {
    return "CustomerVerificationRequest{" +
        "customerId=" + customerId +
        ", fullName=" + fullName +
        ", nationalId=" + nationalId +
        ", account=" + accountReference +
        ", token=" + verificationToken +
        '}';
}
public void logReceived(CustomerVerificationRequest request) {
    logger.info("verify " + request);
}`,
    annotations: [
      {
        id: "ann_bug_ts_1",
        startLine: 4,
        endLine: 7,
        category: "PROBLEM_IN_ORIGINAL_CODE",
        title: { en: "PII and Token Fields", ru: "Поля PII и Token" },
        explanation: {
          en: "These fields make toString unsafe for any logging path.",
          ru: "Эти поля делают toString небезопасным для любого пути логирования."
        },
        conceptDemonstrated: "cpt_pii_redaction"
      },
      {
        id: "ann_bug_ts_2",
        startLine: 11,
        endLine: 11,
        category: "PROBLEM_IN_ORIGINAL_CODE",
        title: { en: "Concatenation Call Site", ru: "Call Site Concatenation" },
        explanation: {
          en: "Eager concatenation ships the unsafe toString into centralized logs.",
          ru: "Eager concatenation отправляет небезопасный toString в централизованные логи."
        },
        conceptDemonstrated: "cpt_logging_parameterization"
      }
    ],
    relatedQuestionIds: ["q_ts_pii_tostring_01"],
    conceptIds: ["cpt_tostring_diagnostics", "cpt_logging_parameterization"],
    tags: ["#bug-hunt"]
  }
];
