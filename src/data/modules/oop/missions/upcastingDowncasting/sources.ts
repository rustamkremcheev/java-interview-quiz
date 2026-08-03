import { Source, SourceReference } from '../../../../../types/domain';

export const SOURCES_UPCASTING_DOWNCASTING: readonly Source[] = [
  {
    id: "src_jls_casting",
    platform: "JLS",
    title: "Java Language Specification — Section 5.5: Casting Contexts (Reference Type Casting)",
    url: "https://docs.oracle.com/javase/specs/jls/se17/html/jls-5.html#jls-5.5",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  },
  {
    id: "src_oracle_pattern_matching_instanceof",
    platform: "Oracle_Java_Docs",
    title: "Oracle Java SE 17 — Pattern Matching for instanceof",
    url: "https://docs.oracle.com/en/java/javase/17/language/pattern-matching-instanceof.html",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  },
  {
    id: "src_baeldung_pattern_matching_instanceof",
    platform: "Baeldung",
    title: "Baeldung — Pattern Matching for instanceof in Java",
    url: "https://www.baeldung.com/java-pattern-matching-instanceof",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  },
  {
    id: "src_baeldung_classcastexception",
    platform: "Baeldung",
    title: "Baeldung — Explanation of ClassCastException in Java",
    url: "https://www.baeldung.com/java-classcastexception",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  }
];

export const SOURCE_REFERENCES_UPCASTING_DOWNCASTING: readonly SourceReference[] = [
  {
    sourceId: "src_jls_casting",
    relationshipType: "SPECIFICATION_AUTHORITY",
    directQuotationUsed: false,
    notes: "JLS authority for casting contexts and runtime-checked narrowing reference conversions that throw ClassCastException — mapped to FraudEvent → CardFraudEvent blind downcasts."
  },
  {
    sourceId: "src_oracle_pattern_matching_instanceof",
    relationshipType: "SPECIFICATION_AUTHORITY",
    directQuotationUsed: false,
    notes: "Oracle Java 17 docs for pattern matching instanceof (JEP 394) — applied as the interim safe binding fix in FraudInvestigationService."
  },
  {
    sourceId: "src_baeldung_pattern_matching_instanceof",
    relationshipType: "ADAPTED_PATTERN",
    directQuotationUsed: false,
    notes: "Baeldung pattern matching examples adapted to CardFraudEvent / WireFraudEvent / AchFraudEvent investigation branches."
  },
  {
    sourceId: "src_baeldung_classcastexception",
    relationshipType: "ADAPTED_PATTERN",
    directQuotationUsed: false,
    notes: "ClassCastException scenarios and safe-cast guidance mapped to the 02:00 ACH fraud incident and why catch-as-control-flow is wrong."
  }
];
