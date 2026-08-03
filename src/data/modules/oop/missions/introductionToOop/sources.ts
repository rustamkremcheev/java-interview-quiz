import { Source, SourceReference } from '../../../../../types/domain';

export const SOURCES_INTRODUCTION_TO_OOP: readonly Source[] = [
  {
    id: "src_intro_oracle_oop",
    platform: "Oracle_Java_Docs",
    title: "Oracle Java Tutorials — Object-Oriented Programming Concepts",
    url: "https://docs.oracle.com/javase/tutorial/java/concepts/index.html",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  },
  {
    id: "src_intro_oracle_objects",
    platform: "Oracle_Java_Docs",
    title: "Oracle Java Tutorials — What Is an Object?",
    url: "https://docs.oracle.com/javase/tutorial/java/concepts/object.html",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  },
  {
    id: "src_intro_hf_ooad",
    platform: "Book",
    title: "Head First Object-Oriented Analysis and Design (Brett McLaughlin, Gary Pollice, David West)",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  },
  {
    id: "src_intro_fowler_oo",
    platform: "Book",
    title: "Martin Fowler — Bliki / essays on object-oriented style and domain modeling (martinfowler.com)",
    url: "https://martinfowler.com/eaaCatalog/",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  }
];

export const SOURCE_REFERENCES_INTRODUCTION_TO_OOP: readonly SourceReference[] = [
  {
    sourceId: "src_intro_oracle_oop",
    relationshipType: "SPECIFICATION_AUTHORITY",
    directQuotationUsed: false,
    notes: "Oracle OOP concepts tutorial used as authority for objects combining state and behavior — mapped to ClearingPayment versus procedural maps."
  },
  {
    sourceId: "src_intro_oracle_objects",
    relationshipType: "SPECIFICATION_AUTHORITY",
    directQuotationUsed: false,
    notes: "Oracle 'What Is an Object?' framing applied to ClearingPayment identity, status, and operations."
  },
  {
    sourceId: "src_intro_hf_ooad",
    relationshipType: "BOOK_THEORY_SUPPORT",
    directQuotationUsed: false,
    notes: "Head First OOA&D emphasis on modeling problems as collaborating objects — applied to workflow/policy/store collaboration."
  },
  {
    sourceId: "src_intro_fowler_oo",
    relationshipType: "BOOK_THEORY_SUPPORT",
    directQuotationUsed: false,
    notes: "Fowler catalog / OO style framing for focusing on domain objects and responsibilities rather than scattered procedures."
  }
];
