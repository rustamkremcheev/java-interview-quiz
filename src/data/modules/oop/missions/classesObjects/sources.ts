import { Source, SourceReference } from '../../../../../types/domain';

export const SOURCES_CLASSES_OBJECTS: readonly Source[] = [
  {
    id: "src_co_jls_objects",
    platform: "JLS",
    title: "Java Language Specification — Section 4.3.1: Objects",
    url: "https://docs.oracle.com/javase/specs/jls/se17/html/jls-4.html#jls-4.3.1",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  },
  {
    id: "src_co_oracle_objects",
    platform: "Oracle_Java_Docs",
    title: "The Java™ Tutorials — What Is an Object?",
    url: "https://docs.oracle.com/javase/tutorial/java/concepts/object.html",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  },
  {
    id: "src_co_ej_item17",
    platform: "Book",
    title: "Effective Java (3rd Edition) — Item 17: Minimize mutability",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  },
  {
    id: "src_co_hf_ooad_objects",
    platform: "Book",
    title: "Head First Object-Oriented Analysis & Design — Objects, attributes, and behavior in real designs",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  }
];

export const SOURCE_REFERENCES_CLASSES_OBJECTS: readonly SourceReference[] = [
  {
    sourceId: "src_co_jls_objects",
    relationshipType: "SPECIFICATION_AUTHORITY",
    directQuotationUsed: false,
    notes: "JLS defines objects as class instances with identity — authority for PaymentInstruction heap instances vs class declarations."
  },
  {
    sourceId: "src_co_oracle_objects",
    relationshipType: "ADAPTED_PATTERN",
    directQuotationUsed: false,
    notes: "Oracle object tutorial adapted to payment-import shared-draft failure and independent instance creation."
  },
  {
    sourceId: "src_co_ej_item17",
    relationshipType: "BOOK_THEORY_SUPPORT",
    directQuotationUsed: false,
    notes: "Minimize mutability reduces accidental rewrite of batch history when references are stored."
  },
  {
    sourceId: "src_co_hf_ooad_objects",
    relationshipType: "BOOK_THEORY_SUPPORT",
    directQuotationUsed: false,
    notes: "OOA&D framing of objects as independent runtime entities with state — applied to PaymentBatch rows."
  }
];
