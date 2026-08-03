import { Source, SourceReference } from '../../../../../types/domain';

export const SOURCES_IMMUTABILITY: readonly Source[] = [
  {
    id: "src_effective_java_item17_50",
    platform: "Book",
    title: "Effective Java (3rd Edition) — Item 17: Minimize mutability & Item 50: Make defensive copies when needed",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  },
  {
    id: "src_jep_395_records",
    platform: "Oracle_Java_Docs",
    title: "JEP 395: Records — Immutable Data Carriers in Java",
    url: "https://openjdk.org/jeps/395",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  },
  {
    id: "src_baeldung_immutability",
    platform: "Baeldung",
    title: "Baeldung — Guide to Immutable Classes in Java",
    url: "https://www.baeldung.com/java-immutable-class",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  },
  {
    id: "src_interviewing_io_immutability",
    platform: "interviewing.io",
    title: "interviewing.io Technical Report: Senior Java Backend Interview Dynamics — Immutability & Defensive Copying",
    url: "https://interviewing.io/blog",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  },
  {
    id: "src_glassdoor_senior_java_payment",
    platform: "Glassdoor",
    title: "Glassdoor Reported Interview Log — Senior Java Backend Developer (Payment Reconciliation Domain)",
    url: "https://www.glassdoor.com",
    company: "Enterprise Financial Services",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  }
];

export const SOURCE_REFERENCES_IMMUTABILITY: readonly SourceReference[] = [
  {
    sourceId: "src_effective_java_item17_50",
    relationshipType: "BOOK_THEORY_SUPPORT",
    directQuotationUsed: false,
    notes: "Derived from Joshua Bloch's guidelines on immutable class construction, defensive copying in constructors and accessors, and the distinction between final references and immutable objects."
  },
  {
    sourceId: "src_jep_395_records",
    relationshipType: "SPECIFICATION_AUTHORITY",
    directQuotationUsed: false,
    notes: "Establishes technical authority for Java 17 record semantics as compact immutable data carriers with shallow immutability caveats for mutable component types such as List and legacy Date."
  },
  {
    sourceId: "src_baeldung_immutability",
    relationshipType: "ADAPTED_PATTERN",
    directQuotationUsed: false,
    notes: "Educational payment reconciliation domain scenario demonstrating CustomerSnapshot transaction list, Money, and timestamp reference leak patterns."
  },
  {
    sourceId: "src_interviewing_io_immutability",
    relationshipType: "ADAPTED_PATTERN",
    directQuotationUsed: false,
    notes: "Adapted senior interview pattern where candidates must diagnose why a supposedly immutable CustomerSnapshot allows external mutation of Transaction lists and Money amounts."
  },
  {
    sourceId: "src_glassdoor_senior_java_payment",
    relationshipType: "ADAPTED_PATTERN",
    directQuotationUsed: false,
    notes: "Adapted financial services interview scenario involving snapshot immutability, defensive copying, and settlement corruption via mutable collection and monetary references."
  }
];
