import { Source, SourceReference } from '../../../../../types/domain';

export const SOURCES_TOSTRING_SAFE_LOGGING: readonly Source[] = [
  {
    id: "src_ts_owasp_logging",
    platform: "Book",
    title: "OWASP Logging Cheat Sheet",
    url: "https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  },
  {
    id: "src_ts_ej_item12",
    platform: "Book",
    title: "Effective Java (3rd Edition) — Item 12: Always override toString",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  },
  {
    id: "src_ts_object_tostring",
    platform: "Oracle_Java_Docs",
    title: "java.lang.Object.toString() (Java SE 17)",
    url: "https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/Object.html#toString()",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  },
  {
    id: "src_ts_slf4j_parameterized",
    platform: "Baeldung",
    title: "SLF4J — Typical application logging (parameterized messages)",
    url: "https://www.slf4j.org/manual.html#typical_usage",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  }
];

export const SOURCE_REFERENCES_TOSTRING_SAFE_LOGGING: readonly SourceReference[] = [
  {
    sourceId: "src_ts_owasp_logging",
    relationshipType: "ADAPTED_PATTERN",
    directQuotationUsed: false,
    notes: "OWASP logging guidance adapted to KYC PII/secret exclusion from CustomerVerificationRequest logs."
  },
  {
    sourceId: "src_ts_ej_item12",
    relationshipType: "BOOK_THEORY_SUPPORT",
    directQuotationUsed: false,
    notes: "EJ Item 12 supports useful toString while this mission constrains usefulness with redaction for regulated data."
  },
  {
    sourceId: "src_ts_object_tostring",
    relationshipType: "SPECIFICATION_AUTHORITY",
    directQuotationUsed: false,
    notes: "Authority for Object.toString contract — concise readable representation, not a mandated field dump."
  },
  {
    sourceId: "src_ts_slf4j_parameterized",
    relationshipType: "ADAPTED_PATTERN",
    directQuotationUsed: false,
    notes: "SLF4J parameterized logging pattern applied to KycAuditLogger instead of string concatenation."
  }
];
