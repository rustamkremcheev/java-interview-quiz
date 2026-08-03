import { Source, SourceReference } from '../../../../../types/domain';

export const SOURCES_POLYMORPHISM: readonly Source[] = [
  {
    id: "src_head_first_ooad_poly",
    platform: "Book",
    title: "Head First Object-Oriented Analysis & Design — Polymorphism (encapsulate what varies; tell, don't ask)",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  },
  {
    id: "src_effective_java_poly",
    platform: "Book",
    title: "Effective Java (Joshua Bloch) — favor interfaces / prefer polymorphism over type inspection",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  },
  {
    id: "src_baeldung_polymorphism",
    platform: "Baeldung",
    title: "Baeldung — Polymorphism in Java",
    url: "https://www.baeldung.com/java-polymorphism",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  },
  {
    id: "src_baeldung_instanceof",
    platform: "Baeldung",
    title: "Baeldung — Java instanceof Operator",
    url: "https://www.baeldung.com/java-instanceof",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  }
];

export const SOURCE_REFERENCES_POLYMORPHISM: readonly SourceReference[] = [
  {
    sourceId: "src_head_first_ooad_poly",
    relationshipType: "BOOK_THEORY_SUPPORT",
    directQuotationUsed: false,
    notes: "OOA&D framing: when behavior varies by type, put it on the type (tell the Transaction to process) instead of asking with instanceof chains — mapped to TransactionPipeline."
  },
  {
    sourceId: "src_effective_java_poly",
    relationshipType: "BOOK_THEORY_SUPPORT",
    directQuotationUsed: false,
    notes: "Effective Java guidance to program to interfaces and avoid sprawling type tests — applied to Transaction + process()/handler contracts."
  },
  {
    sourceId: "src_baeldung_polymorphism",
    relationshipType: "ADAPTED_PATTERN",
    directQuotationUsed: false,
    notes: "Java subtype polymorphism examples adapted to banking TransactionPipeline domain (Card/Wire/Ach/Instant)."
  },
  {
    sourceId: "src_baeldung_instanceof",
    relationshipType: "ADAPTED_PATTERN",
    directQuotationUsed: false,
    notes: "instanceof mechanics and design caution (frequent instanceof implies poor design) — used as the broken baseline smell in TransactionPipeline.process."
  }
];
