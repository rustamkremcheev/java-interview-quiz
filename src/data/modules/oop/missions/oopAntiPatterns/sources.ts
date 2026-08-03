import { Source, SourceReference } from '../../../../../types/domain';

export const SOURCES_ANTI_PATTERNS: readonly Source[] = [
  {
    id: "src_fowler_anemic_domain_model",
    platform: "Book",
    title: "Martin Fowler — AnemicDomainModel",
    url: "https://martinfowler.com/bliki/AnemicDomainModel.html",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  },
  {
    id: "src_clean_code_god_class",
    platform: "Book",
    title: "Clean Code (Robert C. Martin) — Cohesion, SRP, and Class Smells (God Class)",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  },
  {
    id: "src_head_first_ooad",
    platform: "Book",
    title: "Head First Object-Oriented Analysis & Design — Responsibilities, Encapsulation, Tell Don't Ask",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  },
  {
    id: "src_baeldung_rich_vs_anemic",
    platform: "Baeldung",
    title: "Baeldung — Anemic Domain Model vs Rich Domain Model",
    url: "https://www.baeldung.com/java-anemic-vs-rich-domain-models",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  }
];

export const SOURCE_REFERENCES_ANTI_PATTERNS: readonly SourceReference[] = [
  {
    sourceId: "src_fowler_anemic_domain_model",
    relationshipType: "SPECIFICATION_AUTHORITY",
    directQuotationUsed: false,
    notes: "Primary authority defining Anemic Domain Model as anti-pattern: behaviorless domain objects with procedural service logic."
  },
  {
    sourceId: "src_clean_code_god_class",
    relationshipType: "BOOK_THEORY_SUPPORT",
    directQuotationUsed: false,
    notes: "Clean Code cohesion/SRP framing for God Class smells and reasons to extract single-responsibility collaborators."
  },
  {
    sourceId: "src_head_first_ooad",
    relationshipType: "BOOK_THEORY_SUPPORT",
    directQuotationUsed: false,
    notes: "Responsibility assignment and Tell Don't Ask guidance applied to Order aggregate vs OrderFulfillmentService Feature Envy."
  },
  {
    sourceId: "src_baeldung_rich_vs_anemic",
    relationshipType: "ADAPTED_PATTERN",
    directQuotationUsed: false,
    notes: "Educational order-fulfillment domain scenario contrasting anemic Order DTO with rich Order place()/reserveInventory() aggregate."
  }
];
