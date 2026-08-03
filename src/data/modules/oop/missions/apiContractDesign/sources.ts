import { Source, SourceReference } from '../../../../../types/domain';

export const SOURCES_API_CONTRACT_DESIGN: readonly Source[] = [
  {
    id: "src_api_ej_contracts",
    platform: "Book",
    title: "Effective Java — API design items (e.g., Item 50/52/54 family: defensive copies, overloading, return empties)",
    
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  },
  {
    id: "src_api_fowler_published",
    platform: "Book",
    title: "Martin Fowler — PublishedInterface",
    url: "https://martinfowler.com/bliki/PublishedInterface.html",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  },
  {
    id: "src_api_baeldung_optional",
    platform: "Baeldung",
    title: "Baeldung — Returning Optional / null vs empty guidance",
    url: "https://www.baeldung.com/java-optional",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  },
  {
    id: "src_api_oracle_list",
    platform: "Oracle_Java_Docs",
    title: "Oracle — List interface (empty list semantics)",
    url: "https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/List.html",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  }
];

export const SOURCE_REFERENCES_API_CONTRACT_DESIGN: readonly SourceReference[] = [
  {
    sourceId: "src_api_ej_contracts",
    relationshipType: "BOOK_THEORY_SUPPORT",
    directQuotationUsed: false,
    notes: "Supports breaking-payment-authorization-api via Effective Java — API design items (e.g., Item 50/52/54 family: defensive copies, overloading, return empties)"
  },
  {
    sourceId: "src_api_fowler_published",
    relationshipType: "BOOK_THEORY_SUPPORT",
    directQuotationUsed: false,
    notes: "Supports breaking-payment-authorization-api via Martin Fowler — PublishedInterface"
  },
  {
    sourceId: "src_api_baeldung_optional",
    relationshipType: "ADAPTED_PATTERN",
    directQuotationUsed: false,
    notes: "Supports breaking-payment-authorization-api via Baeldung — Returning Optional / null vs empty guidance"
  },
  {
    sourceId: "src_api_oracle_list",
    relationshipType: "SPECIFICATION_AUTHORITY",
    directQuotationUsed: false,
    notes: "Supports breaking-payment-authorization-api via Oracle — List interface (empty list semantics)"
  }
];
