import { Source, SourceReference } from '../../../../../types/domain';

export const SOURCES_DECORATOR_PATTERN: readonly Source[] = [
  {
    id: "src_dec_gof",
    platform: "Book",
    title: "Design Patterns (GoF) — Decorator",
    
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  },
  {
    id: "src_dec_hfdp",
    platform: "Book",
    title: "Head First Design Patterns — Decorator Pattern",
    
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  },
  {
    id: "src_dec_baeldung",
    platform: "Baeldung",
    title: "Baeldung — Decorator Pattern in Java",
    url: "https://www.baeldung.com/java-decorator-pattern",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  },
  {
    id: "src_dec_oracle_io",
    platform: "Oracle_Java_Docs",
    title: "Oracle — Java I/O Streams (decorator-style wrappers)",
    url: "https://docs.oracle.com/javase/tutorial/essential/io/streams.html",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  }
];

export const SOURCE_REFERENCES_DECORATOR_PATTERN: readonly SourceReference[] = [
  {
    sourceId: "src_dec_gof",
    relationshipType: "BOOK_THEORY_SUPPORT",
    directQuotationUsed: false,
    notes: "Supports missing-audit-funds-transfer-decorator via Design Patterns (GoF) — Decorator"
  },
  {
    sourceId: "src_dec_hfdp",
    relationshipType: "BOOK_THEORY_SUPPORT",
    directQuotationUsed: false,
    notes: "Supports missing-audit-funds-transfer-decorator via Head First Design Patterns — Decorator Pattern"
  },
  {
    sourceId: "src_dec_baeldung",
    relationshipType: "ADAPTED_PATTERN",
    directQuotationUsed: false,
    notes: "Supports missing-audit-funds-transfer-decorator via Baeldung — Decorator Pattern in Java"
  },
  {
    sourceId: "src_dec_oracle_io",
    relationshipType: "SPECIFICATION_AUTHORITY",
    directQuotationUsed: false,
    notes: "Supports missing-audit-funds-transfer-decorator via Oracle — Java I/O Streams (decorator-style wrappers)"
  }
];
