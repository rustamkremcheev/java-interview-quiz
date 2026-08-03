import { Source, SourceReference } from '../../../../../types/domain';

export const SOURCES_OBJECT_CLASS_CONTRACTS: readonly Source[] = [
  {
    id: "src_ojc_object_api",
    platform: "Oracle_Java_Docs",
    title: "java.lang.Object (Java SE 17) — equals, toString, clone, finalize",
    url: "https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/Object.html",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  },
  {
    id: "src_ojc_jep_421",
    platform: "OpenJDK",
    title: "JEP 421: Deprecate Finalization for Removal",
    url: "https://openjdk.org/jeps/421",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  },
  {
    id: "src_ojc_ej_items_10_13",
    platform: "Book",
    title: "Effective Java (3rd Edition) — Items 10–13: equals, hashCode, toString, clone (overview)",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  },
  {
    id: "src_ojc_instanceof_tutorial",
    platform: "Oracle_Java_Docs",
    title: "The Java™ Tutorials — Equality, Relational, and Conditional Operators (instanceof)",
    url: "https://docs.oracle.com/javase/tutorial/java/nutsandbolts/op2.html",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  }
];

export const SOURCE_REFERENCES_OBJECT_CLASS_CONTRACTS: readonly SourceReference[] = [
  {
    sourceId: "src_ojc_object_api",
    relationshipType: "SPECIFICATION_AUTHORITY",
    directQuotationUsed: false,
    notes: "Authority for default Object equals/hashCode/toString/clone/finalize behavior applied to ComplianceEvent."
  },
  {
    sourceId: "src_ojc_jep_421",
    relationshipType: "SPECIFICATION_AUTHORITY",
    directQuotationUsed: false,
    notes: "JEP 421 justifies retiring finalize in EventClassifier resource cleanup."
  },
  {
    sourceId: "src_ojc_ej_items_10_13",
    relationshipType: "BOOK_THEORY_SUPPORT",
    directQuotationUsed: false,
    notes: "EJ Items 10–13 overview framing for Object contracts without duplicating full equals/hashCode mission depth."
  },
  {
    sourceId: "src_ojc_instanceof_tutorial",
    relationshipType: "ADAPTED_PATTERN",
    directQuotationUsed: false,
    notes: "Oracle instanceof tutorial adapted to EventClassifier getClass vs instanceof choice."
  }
];
