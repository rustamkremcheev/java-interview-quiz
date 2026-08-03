import { Source, SourceReference } from '../../../../../types/domain';

export const SOURCES_TEMPLATE_METHOD_PATTERN: readonly Source[] = [
  {
    id: "src_tm_gof_template",
    platform: "Book",
    title: "Design Patterns (GoF) — Template Method",
    
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  },
  {
    id: "src_tm_hfdp_template",
    platform: "Book",
    title: "Head First Design Patterns — Template Method Pattern",
    
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  },
  {
    id: "src_tm_refactoring_guru",
    platform: "Baeldung",
    title: "Baeldung — Template Method Pattern in Java",
    url: "https://www.baeldung.com/java-template-method-pattern",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  },
  {
    id: "src_tm_oracle_abstract",
    platform: "Oracle_Java_Docs",
    title: "Oracle Java Tutorials — Abstract Methods and Classes",
    url: "https://docs.oracle.com/javase/tutorial/java/IandI/abstract.html",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  }
];

export const SOURCE_REFERENCES_TEMPLATE_METHOD_PATTERN: readonly SourceReference[] = [
  {
    sourceId: "src_tm_gof_template",
    relationshipType: "BOOK_THEORY_SUPPORT",
    directQuotationUsed: false,
    notes: "Supports bypassed-eod-settlement-template via Design Patterns (GoF) — Template Method"
  },
  {
    sourceId: "src_tm_hfdp_template",
    relationshipType: "BOOK_THEORY_SUPPORT",
    directQuotationUsed: false,
    notes: "Supports bypassed-eod-settlement-template via Head First Design Patterns — Template Method Pattern"
  },
  {
    sourceId: "src_tm_refactoring_guru",
    relationshipType: "ADAPTED_PATTERN",
    directQuotationUsed: false,
    notes: "Supports bypassed-eod-settlement-template via Baeldung — Template Method Pattern in Java"
  },
  {
    sourceId: "src_tm_oracle_abstract",
    relationshipType: "SPECIFICATION_AUTHORITY",
    directQuotationUsed: false,
    notes: "Supports bypassed-eod-settlement-template via Oracle Java Tutorials — Abstract Methods and Classes"
  }
];
