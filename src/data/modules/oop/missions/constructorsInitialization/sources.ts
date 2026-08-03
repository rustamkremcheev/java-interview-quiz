import { Source, SourceReference } from '../../../../../types/domain';

export const SOURCES_CONSTRUCTORS_INITIALIZATION: readonly Source[] = [
  {
    id: "src_ci_jls_12_5",
    platform: "JLS",
    title: "Java Language Specification — Section 12.5: Creation of New Class Instances",
    url: "https://docs.oracle.com/javase/specs/jls/se17/html/jls-12.html#jls-12.5",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  },
  {
    id: "src_ci_oracle_constructors",
    platform: "Oracle_Java_Docs",
    title: "The Java™ Tutorials — Providing Constructors for Your Classes",
    url: "https://docs.oracle.com/javase/tutorial/java/javaOO/constructors.html",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  },
  {
    id: "src_ci_ej_item19",
    platform: "Book",
    title: "Effective Java (3rd Edition) — Item 19: Design and document for inheritance or else prohibit it",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  },
  {
    id: "src_ci_safe_construction",
    platform: "Oracle_Java_Docs",
    title: "Java Concurrency in Practice themes — Safe Construction Practices (complementary)",
    url: "https://docs.oracle.com/javase/tutorial/essential/concurrency/index.html",
    reliability: "MEDIUM",
    accessedDate: "2026-08-03T00:00:00.000Z"
  }
];

export const SOURCE_REFERENCES_CONSTRUCTORS_INITIALIZATION: readonly SourceReference[] = [
  {
    sourceId: "src_ci_jls_12_5",
    relationshipType: "SPECIFICATION_AUTHORITY",
    directQuotationUsed: false,
    notes: "JLS 12.5 defines instance creation and initialization order — authority for when TradeRegistration becomes fully constructed."
  },
  {
    sourceId: "src_ci_oracle_constructors",
    relationshipType: "ADAPTED_PATTERN",
    directQuotationUsed: false,
    notes: "Oracle constructors tutorial adapted to financial TradeRegistration initialization and factory registration."
  },
  {
    sourceId: "src_ci_ej_item19",
    relationshipType: "BOOK_THEORY_SUPPORT",
    directQuotationUsed: false,
    notes: "Item 19 warns against calling overridable methods from constructors — applied to validate() in TradeRegistration."
  },
  {
    sourceId: "src_ci_safe_construction",
    relationshipType: "ADAPTED_PATTERN",
    directQuotationUsed: false,
    notes: "Concurrency tutorial / safe publication themes adapted to this-escape via TradeRegistry.register(this)."
  }
];
