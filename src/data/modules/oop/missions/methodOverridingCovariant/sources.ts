import { Source, SourceReference } from '../../../../../types/domain';

export const SOURCES_OVERRIDING_COVARIANT: readonly Source[] = [
  {
    id: "src_jls_848_overriding",
    platform: "JLS",
    title: "Java Language Specification — Section 8.4.8: Inheritance, Overriding, and Hiding",
    url: "https://docs.oracle.com/javase/specs/jls/se17/html/jls-8.html#jls-8.4.8",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  },
  {
    id: "src_effective_java_item40",
    platform: "Book",
    title: "Effective Java (3rd Edition) — Item 40: Consistently use the Override annotation",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  },
  {
    id: "src_oracle_overriding_tutorial",
    platform: "Oracle_Java_Docs",
    title: "Oracle Java Tutorials — Overriding and Hiding Methods",
    url: "https://docs.oracle.com/javase/tutorial/java/IandI/override.html",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  },
  {
    id: "src_jls_8485_covariant",
    platform: "JLS",
    title: "Java Language Specification — Section 8.4.8.3 / Return Type Substitutability (Covariant Returns)",
    url: "https://docs.oracle.com/javase/specs/jls/se17/html/jls-8.html#jls-8.4.5",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  }
];

export const SOURCE_REFERENCES_OVERRIDING_COVARIANT: readonly SourceReference[] = [
  {
    sourceId: "src_jls_848_overriding",
    relationshipType: "SPECIFICATION_AUTHORITY",
    directQuotationUsed: false,
    notes: "Primary authority for override-equivalent signatures, inheritance of instance methods, and rules distinguishing overriding from overloading/hiding."
  },
  {
    sourceId: "src_effective_java_item40",
    relationshipType: "BOOK_THEORY_SUPPORT",
    directQuotationUsed: false,
    notes: "Joshua Bloch guidance on consistently using @Override to catch accidental overloads (classic equals(MyType) vs equals(Object) pattern applied to repository findById)."
  },
  {
    sourceId: "src_oracle_overriding_tutorial",
    relationshipType: "ADAPTED_PATTERN",
    directQuotationUsed: false,
    notes: "Educational invoice billing domain scenario demonstrating covariant return types and checked exception narrowing for repository overrides."
  },
  {
    sourceId: "src_jls_8485_covariant",
    relationshipType: "SPECIFICATION_AUTHORITY",
    directQuotationUsed: false,
    notes: "Return type substitutability rules enabling CorporateInvoice as a covariant return for Invoice in overriding findById."
  }
];
