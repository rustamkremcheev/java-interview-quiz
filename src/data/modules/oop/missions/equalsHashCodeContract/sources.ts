import { Source, SourceReference } from '../../../../../types/domain';

export const SOURCES_EQUALS_HASHCODE: readonly Source[] = [
  {
    id: "src_jls_equals_hashcode",
    platform: "JLS",
    title: "Java Language Specification — Section 8.4.8 & java.lang.Object Contract",
    url: "https://docs.oracle.com/javase/specs/jls/se17/html/jls-8.html",
    reliability: "HIGH",
    accessedDate: "2026-08-01T00:00:00.000Z"
  },
  {
    id: "src_effective_java_item10_11",
    platform: "Book",
    title: "Effective Java (3rd Edition) — Items 10 & 11: equals and hashCode Contracts",
    reliability: "HIGH",
    accessedDate: "2026-08-01T00:00:00.000Z"
  },
  {
    id: "src_interviewing_io_hashmap",
    platform: "interviewing.io",
    title: "interviewing.io Technical Report: Senior Java Backend Interview Dynamics",
    url: "https://interviewing.io/blog",
    reliability: "HIGH",
    accessedDate: "2026-08-01T00:00:00.000Z"
  },
  {
    id: "src_glassdoor_senior_java_citi",
    platform: "Glassdoor",
    title: "Glassdoor Reported Interview Log — Senior Java Backend Developer (Financial Services)",
    url: "https://www.glassdoor.com",
    company: "Citi",
    reliability: "HIGH",
    accessedDate: "2026-08-01T00:00:00.000Z"
  },
  {
    id: "src_baeldung_hashmap_guide",
    platform: "Baeldung",
    title: "Baeldung — Guide to equals() and hashCode() in Java",
    url: "https://www.baeldung.com/java-equals-hashcode-contracts",
    reliability: "HIGH",
    accessedDate: "2026-08-01T00:00:00.000Z"
  }
];

export const SOURCE_REFERENCES_EQUALS_HASHCODE: readonly SourceReference[] = [
  {
    sourceId: "src_jls_equals_hashcode",
    relationshipType: "SPECIFICATION_AUTHORITY",
    directQuotationUsed: false,
    notes: "Establishes technical authority for reflexive, symmetric, transitive, consistent, and non-null contracts of Object.equals() and hashCode()."
  },
  {
    sourceId: "src_effective_java_item10_11",
    relationshipType: "BOOK_THEORY_SUPPORT",
    directQuotationUsed: false,
    notes: "Provides canonical rules for writing safe equals/hashCode and details why mutable keys cause memory leaks and lookup failures in HashMap."
  },
  {
    sourceId: "src_glassdoor_senior_java_citi",
    relationshipType: "DIRECT_REPORT",
    directQuotationUsed: false,
    notes: "Corroborates real-world interview scenario where candidates must diagnose a disappearing payment record inside a HashMap reconciliation cache."
  }
];
