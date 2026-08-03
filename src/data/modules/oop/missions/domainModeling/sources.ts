import { Source, SourceReference } from '../../../../../types/domain';

export const SOURCES_DOMAIN_MODELING: readonly Source[] = [
  {
    id: "src_evans_ddd_adapted",
    platform: "Book",
    title: "Domain-Driven Design (Eric Evans) — Entities, Value Objects, Aggregates (concepts adapted, lite)",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  },
  {
    id: "src_fowler_value_object",
    platform: "Book",
    title: "Martin Fowler — ValueObject",
    url: "https://martinfowler.com/bliki/ValueObject.html",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  },
  {
    id: "src_head_first_ooad_dm",
    platform: "Book",
    title: "Head First Object-Oriented Analysis & Design — Domain objects, encapsulation, and responsibilities",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  },
  {
    id: "src_baeldung_value_objects",
    platform: "Baeldung",
    title: "Baeldung — DDD with jMolecules (Value Objects section)",
    url: "https://www.baeldung.com/java-jmolecules-domain-driven-design",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  }
];

export const SOURCE_REFERENCES_DOMAIN_MODELING: readonly SourceReference[] = [
  {
    sourceId: "src_evans_ddd_adapted",
    relationshipType: "BOOK_THEORY_SUPPORT",
    directQuotationUsed: false,
    notes: "Evans tactical building blocks adapted lite to LoanApplication: entity identity, value objects (ApplicantId, LoanMoney), and aggregate-boundary transitions without a full DDD course."
  },
  {
    sourceId: "src_fowler_value_object",
    relationshipType: "SPECIFICATION_AUTHORITY",
    directQuotationUsed: false,
    notes: "Value Object definition — equality by attributes, typically immutable — applied to ApplicantId and LoanMoney in the lending domain."
  },
  {
    sourceId: "src_head_first_ooad_dm",
    relationshipType: "BOOK_THEORY_SUPPORT",
    directQuotationUsed: false,
    notes: "OOA&D framing of encapsulating domain responsibilities — mapped to LoanApplication behavior methods instead of public field bags."
  },
  {
    sourceId: "src_baeldung_value_objects",
    relationshipType: "ADAPTED_PATTERN",
    directQuotationUsed: false,
    notes: "Java value-object examples (records, self-validation) adapted to lending-domain LoanMoney and ApplicantId."
  }
];
