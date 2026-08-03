import { Source, SourceReference } from '../../../../../types/domain';

export const SOURCES_ACCESS_MODIFIERS: readonly Source[] = [
  {
    id: "src_am_jls_access",
    platform: "JLS",
    title: "Java Language Specification — Section 6.6: Access Control",
    url: "https://docs.oracle.com/javase/specs/jls/se17/html/jls-6.html#jls-6.6",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  },
  {
    id: "src_am_oracle_access",
    platform: "Oracle_Java_Docs",
    title: "The Java™ Tutorials — Controlling Access to Members of a Class",
    url: "https://docs.oracle.com/javase/tutorial/java/javaOO/accesscontrol.html",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  },
  {
    id: "src_am_ej_item15",
    platform: "Book",
    title: "Effective Java (3rd Edition) — Item 15: Minimize the accessibility of classes and members",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  }
];

export const SOURCE_REFERENCES_ACCESS_MODIFIERS: readonly SourceReference[] = [
  {
    sourceId: "src_am_jls_access",
    relationshipType: "SPECIFICATION_AUTHORITY",
    directQuotationUsed: false,
    notes: "JLS 6.6 defines public, protected, package, and private accessibility — authority for GeneralLedger.postRaw visibility and foreign-package subclass rules."
  },
  {
    sourceId: "src_am_oracle_access",
    relationshipType: "ADAPTED_PATTERN",
    directQuotationUsed: false,
    notes: "Oracle access-control tutorial adapted to ledger package boundaries, JournalPostingFacade entry points, and protected coupling via ReconciliationHook."
  },
  {
    sourceId: "src_am_ej_item15",
    relationshipType: "BOOK_THEORY_SUPPORT",
    directQuotationUsed: false,
    notes: "Minimize accessibility supports package-private internals and a narrow public facade for posting."
  }
];
