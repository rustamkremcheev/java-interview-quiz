import { Source, SourceReference } from '../../../../../types/domain';

export const SOURCES_OVERLOADING: readonly Source[] = [
  {
    id: "src_jls_15_12_method_invocation",
    platform: "Oracle_Java_Docs",
    title: "Java Language Specification — §15.12 Method Invocation Expressions",
    url: "https://docs.oracle.com/javase/specs/jls/se17/html/jls-15.html#jls-15.12",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  },
  {
    id: "src_effective_java_item41",
    platform: "Book",
    title: "Effective Java (3rd Edition) — Item 41: Use overloading judiciously",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  },
  {
    id: "src_baeldung_overloading",
    platform: "Baeldung",
    title: "Baeldung — Method Overloading and Overriding in Java",
    url: "https://www.baeldung.com/java-method-overload-override",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  }
];

export const SOURCE_REFERENCES_OVERLOADING: readonly SourceReference[] = [
  {
    sourceId: "src_jls_15_12_method_invocation",
    relationshipType: "BOOK_THEORY_SUPPORT",
    directQuotationUsed: false,
    notes: "Defines compile-time overload resolution: applicability phases, boxing/unboxing, varargs, and most-specific method selection."
  },
  {
    sourceId: "src_effective_java_item41",
    relationshipType: "BOOK_THEORY_SUPPORT",
    directQuotationUsed: false,
    notes: "Joshua Bloch warns that confusing overload sets (especially with autoboxing) surprise callers — prefer distinct method names."
  },
  {
    sourceId: "src_baeldung_overloading",
    relationshipType: "ADAPTED_PATTERN",
    directQuotationUsed: false,
    notes: "Educational ledger posting scenario demonstrating settle overload traps with long/Long/BigDecimal/String and Integer autoboxing."
  }
];
