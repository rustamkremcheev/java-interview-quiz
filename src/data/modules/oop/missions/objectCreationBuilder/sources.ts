import { Source, SourceReference } from '../../../../../types/domain';

export const SOURCES_OBJECT_CREATION: readonly Source[] = [
  {
    id: "src_effective_java_item1_2",
    platform: "Book",
    title: "Effective Java (3rd Edition) — Item 1: Consider static factory methods instead of constructors & Item 2: Consider a builder when faced with many constructor parameters",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  },
  {
    id: "src_gof_builder_pattern",
    platform: "Book",
    title: "Design Patterns: Elements of Reusable Object-Oriented Software (GoF) — Builder Pattern",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  },
  {
    id: "src_baeldung_builder_pattern",
    platform: "Baeldung",
    title: "Baeldung — Implementing the Builder Pattern in Java",
    url: "https://www.baeldung.com/creational-design-patterns#builder",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  }
];

export const SOURCE_REFERENCES_OBJECT_CREATION: readonly SourceReference[] = [
  {
    sourceId: "src_effective_java_item1_2",
    relationshipType: "BOOK_THEORY_SUPPORT",
    directQuotationUsed: false,
    notes: "Derived from Joshua Bloch's Effective Java Items 1 & 2 covering static factory method advantages and Builder pattern for multi-parameter immutable objects."
  },
  {
    sourceId: "src_gof_builder_pattern",
    relationshipType: "BOOK_THEORY_SUPPORT",
    directQuotationUsed: false,
    notes: "GoF Builder pattern provides the foundational step-by-step construction model adapted in Effective Java's static inner Builder variant."
  },
  {
    sourceId: "src_baeldung_builder_pattern",
    relationshipType: "ADAPTED_PATTERN",
    directQuotationUsed: false,
    notes: "Educational settlement domain scenario demonstrating Builder and static factory refactoring for financial instruction objects."
  }
];
