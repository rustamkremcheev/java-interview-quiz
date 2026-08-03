import { Source, SourceReference } from '../../../../../types/domain';

export const SOURCES_LISKOV: readonly Source[] = [
  {
    id: "src_liskov_1987_data_abstraction",
    platform: "Book",
    title: "Liskov & Wing (1994) — A Behavioral Notion of Subtyping",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  },
  {
    id: "src_baeldung_lsp",
    platform: "Baeldung",
    title: "Baeldung — SOLID Principles: Liskov Substitution Explained",
    url: "https://www.baeldung.com/solid-principles",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  },
  {
    id: "src_oracle_unsupported_operation",
    platform: "Oracle_Java_Docs",
    title: "Java SE 17 API — UnsupportedOperationException",
    url: "https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/UnsupportedOperationException.html",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  }
];

export const SOURCE_REFERENCES_LISKOV: readonly SourceReference[] = [
  {
    sourceId: "src_liskov_1987_data_abstraction",
    relationshipType: "BOOK_THEORY_SUPPORT",
    directQuotationUsed: false,
    notes: "Establishes behavioral subtyping rules: subtypes must not strengthen preconditions or weaken postconditions."
  },
  {
    sourceId: "src_effective_java_item18",
    relationshipType: "BOOK_THEORY_SUPPORT",
    directQuotationUsed: false,
    notes: "Joshua Bloch's guidance against inheritance misuse and fragile subtype contracts — relevant when subtypes claim base capabilities they cannot honor."
  },
  {
    sourceId: "src_baeldung_lsp",
    relationshipType: "ADAPTED_PATTERN",
    directQuotationUsed: false,
    notes: "Educational payment domain scenario demonstrating BankTransfer.refund() LSP violation in PaymentProcessor orchestration APIs."
  }
];
