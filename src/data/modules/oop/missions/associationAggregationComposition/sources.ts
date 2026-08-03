import { Source, SourceReference } from '../../../../../types/domain';

export const SOURCES_ASSOCIATION_AGGREGATION_COMPOSITION: readonly Source[] = [
  {
    id: "src_aac_fowler_evans",
    platform: "Book",
    title: "Martin Fowler — Evans Classification",
    url: "https://martinfowler.com/bliki/EvansClassification.html",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  },
  {
    id: "src_aac_oracle_object",
    platform: "Oracle_Java_Docs",
    title: "The Java™ Tutorials — What Is an Object?",
    url: "https://docs.oracle.com/javase/tutorial/java/concepts/object.html",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  },
  {
    id: "src_aac_hf_ooad_hasa",
    platform: "Book",
    title: "Head First Object-Oriented Analysis & Design — Has-a relationships and ownership in designs",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  },
  {
    id: "src_aac_fowler_value_object",
    platform: "Book",
    title: "Martin Fowler — Value Object",
    url: "https://martinfowler.com/bliki/ValueObject.html",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  }
];

export const SOURCE_REFERENCES_ASSOCIATION_AGGREGATION_COMPOSITION: readonly SourceReference[] = [
  {
    sourceId: "src_aac_fowler_evans",
    relationshipType: "ADAPTED_PATTERN",
    directQuotationUsed: false,
    notes: "Evans classification / aggregate framing adapted to Portfolio vs shared MarketInstrument catalog ownership boundaries."
  },
  {
    sourceId: "src_aac_oracle_object",
    relationshipType: "ADAPTED_PATTERN",
    directQuotationUsed: false,
    notes: "Oracle OOP object concepts adapted to has-a relationships among Portfolio, Holding, and shared market types."
  },
  {
    sourceId: "src_aac_hf_ooad_hasa",
    relationshipType: "BOOK_THEORY_SUPPORT",
    directQuotationUsed: false,
    notes: "Head First OOA&D has-a framing supports association vs ownership distinctions in portfolio modeling."
  },
  {
    sourceId: "src_aac_fowler_value_object",
    relationshipType: "BOOK_THEORY_SUPPORT",
    directQuotationUsed: false,
    notes: "Value Object bliki clarifies identity-less values vs entities — useful when holdings quantity snapshots must not mutate shared instrument identity."
  }
];
