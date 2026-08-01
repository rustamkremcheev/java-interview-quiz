import { Source, SourceReference } from '../../../../../types/domain';

export const SOURCES_BANK_ACCOUNT: readonly Source[] = [
  {
    id: "src_book_effective_java",
    platform: "Book",
    title: "Effective Java (3rd Edition) - Item 17: Minimize mutability & Item 50: Make defensive copies when needed",
    company: undefined,
    reliability: "HIGH",
    accessedDate: "2026-07-31T00:00:00.000Z"
  },
  {
    id: "src_curated_oop_invariants",
    platform: "Baeldung",
    title: "Domain Invariant Protection & Encapsulation in Modern Java",
    company: undefined,
    reliability: "HIGH",
    accessedDate: "2026-07-31T00:00:00.000Z"
  }
];

export const SOURCE_REFERENCES_BANK_ACCOUNT: readonly SourceReference[] = [
  {
    sourceId: "src_book_effective_java",
    relationshipType: "BOOK_THEORY_SUPPORT",
    directQuotationUsed: false,
    notes: "Derived from Joshua Bloch's Effective Java guidelines on immutable class construction and defensive copying."
  },
  {
    sourceId: "src_curated_oop_invariants",
    relationshipType: "ADAPTED_PATTERN",
    directQuotationUsed: false,
    notes: "Educational financial domain scenario demonstrating BankAccount balance invariants."
  }
];
