import { Source, SourceReference } from '../../../../../types/domain';

export const SOURCES_INHERITANCE: readonly Source[] = [
  {
    id: "src_jls_inheritance",
    platform: "JLS",
    title: "Java Language Specification — Section 8.1.4: Superclasses and Subclasses (Inheritance)",
    url: "https://docs.oracle.com/javase/specs/jls/se17/html/jls-8.html#jls-8.1.4",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  },
  {
    id: "src_effective_java_item19_inheritance",
    platform: "Book",
    title: "Effective Java (3rd Edition) — Item 19: Design and document for inheritance or else prohibit it",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  },
  {
    id: "src_head_first_ooad_inheritance",
    platform: "Book",
    title: "Head First Object-Oriented Analysis & Design — IS-A relationships, inheritance hazards, and encapsulating what varies",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  }
];

export const SOURCE_REFERENCES_INHERITANCE: readonly SourceReference[] = [
  {
    sourceId: "src_jls_inheritance",
    relationshipType: "SPECIFICATION_AUTHORITY",
    directQuotationUsed: false,
    notes: "JLS authority for superclass/subclass relationships, inherited members, and the language model behind BaseRegulatoryReport → LiquidityReport IS-A hierarchies and constructor chaining."
  },
  {
    sourceId: "src_effective_java_item19_inheritance",
    relationshipType: "BOOK_THEORY_SUPPORT",
    directQuotationUsed: false,
    notes: "Joshua Bloch: design and document for inheritance or else prohibit it — applied to sealing/documenting BaseRegulatoryReport extension points vs silent protected coupling."
  },
  {
    sourceId: "src_head_first_ooad_inheritance",
    relationshipType: "BOOK_THEORY_SUPPORT",
    directQuotationUsed: false,
    notes: "Head First OOA&D framing of IS-A misuse and inheritance hazards mapped to regulatory report subclasses depending on brittle base internals."
  }
];
