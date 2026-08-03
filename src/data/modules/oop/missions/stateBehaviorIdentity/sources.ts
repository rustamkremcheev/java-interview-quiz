import { Source, SourceReference } from '../../../../../types/domain';

export const SOURCES_STATE_BEHAVIOR_IDENTITY: readonly Source[] = [
  {
    id: "src_sbi_fowler_identity_map",
    platform: "Book",
    title: "Martin Fowler — Identity Map",
    url: "https://martinfowler.com/eaaCatalog/identityMap.html",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  },
  {
    id: "src_sbi_evans_classification",
    platform: "Book",
    title: "Martin Fowler — Evans Classification (Entity vs Value Object)",
    url: "https://martinfowler.com/bliki/EvansClassification.html",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  },
  {
    id: "src_sbi_jls_identity",
    platform: "JLS",
    title: "Java Language Specification — Section 15.21.3: Reference Equality Operators == and !=",
    url: "https://docs.oracle.com/javase/specs/jls/se17/html/jls-15.html#jls-15.21.3",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  },
  {
    id: "src_sbi_hf_ooad",
    platform: "Book",
    title: "Head First Object-Oriented Analysis & Design — State, behavior, and identity in real designs",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  }
];

export const SOURCE_REFERENCES_STATE_BEHAVIOR_IDENTITY: readonly SourceReference[] = [
  {
    sourceId: "src_sbi_fowler_identity_map",
    relationshipType: "ADAPTED_PATTERN",
    directQuotationUsed: false,
    notes: "Identity Map tracks one instance per id — adapted to warn against merging different TransferIds when state fields match."
  },
  {
    sourceId: "src_sbi_evans_classification",
    relationshipType: "BOOK_THEORY_SUPPORT",
    directQuotationUsed: false,
    notes: "Entity vs value framing: TransferRequest is an entity identified by TransferId; amount fields are not identity."
  },
  {
    sourceId: "src_sbi_jls_identity",
    relationshipType: "SPECIFICATION_AUTHORITY",
    directQuotationUsed: false,
    notes: "JLS defines == as reference identity — contrasted with business TransferId identity in the mission."
  },
  {
    sourceId: "src_sbi_hf_ooad",
    relationshipType: "BOOK_THEORY_SUPPORT",
    directQuotationUsed: false,
    notes: "OOA&D framing of objects as having state, behavior, and identity — applied to TransferRequest transitions."
  }
];
