import { Source, SourceReference } from '../../../../../types/domain';

export const SOURCES_BUILDER_PATTERN: readonly Source[] = [
  {
    id: "src_bld_ej_item2",
    platform: "Book",
    title: "Effective Java (Joshua Bloch) — Item 2: Consider a builder when faced with many constructor parameters",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  },
  {
    id: "src_bld_baeldung_builder",
    platform: "Baeldung",
    title: "Baeldung — Builder Pattern in Java",
    url: "https://www.baeldung.com/java-builder-pattern",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  },
  {
    id: "src_bld_oracle_classes",
    platform: "Oracle_Java_Docs",
    title: "Oracle Java Tutorials — Classes and Objects",
    url: "https://docs.oracle.com/javase/tutorial/java/javaOO/classes.html",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  },
  {
    id: "src_bld_hfdp_builder",
    platform: "Book",
    title: "Head First Design Patterns — Builder discussions / creational patterns catalog (Freeman & Robson)",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  }
];

export const SOURCE_REFERENCES_BUILDER_PATTERN: readonly SourceReference[] = [
  {
    sourceId: "src_bld_ej_item2",
    relationshipType: "BOOK_THEORY_SUPPORT",
    directQuotationUsed: false,
    notes: "Item 2 applied to RiskAssessmentRequest: Builder with build-time validation of mandatory portfolio/profile/window."
  },
  {
    sourceId: "src_bld_baeldung_builder",
    relationshipType: "ADAPTED_PATTERN",
    directQuotationUsed: false,
    notes: "Java Builder examples adapted to risk domain types PortfolioId, RiskProfile, EvaluationWindow."
  },
  {
    sourceId: "src_bld_oracle_classes",
    relationshipType: "SPECIFICATION_AUTHORITY",
    directQuotationUsed: false,
    notes: "Oracle classes/objects tutorial as language authority for constructors vs nested Builder types."
  },
  {
    sourceId: "src_bld_hfdp_builder",
    relationshipType: "BOOK_THEORY_SUPPORT",
    directQuotationUsed: false,
    notes: "HFDP creational/builder framing supporting fluent construction of complex domain objects."
  }
];
