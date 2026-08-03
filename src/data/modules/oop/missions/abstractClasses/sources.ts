import { Source, SourceReference } from '../../../../../types/domain';

export const SOURCES_ABSTRACT_CLASSES: readonly Source[] = [
  {
    id: "src_jls_8111_abstract_classes",
    platform: "JLS",
    title: "Java Language Specification — Section 8.1.1.1: abstract Classes",
    url: "https://docs.oracle.com/javase/specs/jls/se17/html/jls-8.html#jls-8.1.1.1",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  },
  {
    id: "src_effective_java_item19",
    platform: "Book",
    title: "Effective Java (3rd Edition) — Item 19: Design and document for inheritance or else prohibit it",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  },
  {
    id: "src_effective_java_item20_ac",
    platform: "Book",
    title: "Effective Java (3rd Edition) — Item 20: Prefer interfaces to abstract classes",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  },
  {
    id: "src_oracle_tutorial_abstract",
    platform: "Oracle_Java_Docs",
    title: "The Java™ Tutorials — Abstract Methods and Classes",
    url: "https://docs.oracle.com/javase/tutorial/java/IandI/abstract.html",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  }
];

export const SOURCE_REFERENCES_ABSTRACT_CLASSES: readonly SourceReference[] = [
  {
    sourceId: "src_jls_8111_abstract_classes",
    relationshipType: "SPECIFICATION_AUTHORITY",
    directQuotationUsed: false,
    notes: "JLS authority for abstract class instantiation rules, abstract methods requiring abstract classes, and constructor execution when concrete subclasses are instantiated — applied to AbstractSettlementProcessor."
  },
  {
    sourceId: "src_effective_java_item19",
    relationshipType: "BOOK_THEORY_SUPPORT",
    directQuotationUsed: false,
    notes: "Design and document for inheritance or prohibit it: final settle() skeleton, documented protected hooks, no undocumented self-use — mapped to settlement lifecycle extension contract."
  },
  {
    sourceId: "src_effective_java_item20_ac",
    relationshipType: "BOOK_THEORY_SUPPORT",
    directQuotationUsed: false,
    notes: "Prefer interfaces unless shared state/constructors/protected API justify an abstract class — AbstractSettlementProcessor needs fields and a controlled hook surface, not a pure capability interface."
  },
  {
    sourceId: "src_oracle_tutorial_abstract",
    relationshipType: "ADAPTED_PATTERN",
    directQuotationUsed: false,
    notes: "Oracle tutorial comparison of abstract classes vs interfaces (instance fields, constructors, protected methods) adapted to CardSettlementProcessor / WireSettlementProcessor hierarchy."
  }
];
