import { Source, SourceReference } from '../../../../../types/domain';

export const SOURCES_ABSTRACTION: readonly Source[] = [
  {
    id: "src_ej_item20_interfaces",
    platform: "Book",
    title: "Effective Java (Joshua Bloch) — Item 20: Prefer interfaces to abstract classes",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  },
  {
    id: "src_fowler_abstraction",
    platform: "Book",
    title: "Martin Fowler — PublishedInterface / abstraction boundary discussions (martinfowler.com bliki)",
    url: "https://martinfowler.com/bliki/PublishedInterface.html",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  },
  {
    id: "src_baeldung_interfaces",
    platform: "Baeldung",
    title: "Baeldung — Interfaces in Java",
    url: "https://www.baeldung.com/java-interfaces",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  },
  {
    id: "src_jls_interfaces",
    platform: "Book",
    title: "Java Language Specification — Chapter 9: Interfaces",
    url: "https://docs.oracle.com/javase/specs/jls/se17/html/jls-9.html",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  }
];

export const SOURCE_REFERENCES_ABSTRACTION: readonly SourceReference[] = [
  {
    sourceId: "src_ej_item20_interfaces",
    relationshipType: "BOOK_THEORY_SUPPORT",
    directQuotationUsed: false,
    notes: "Item 20 guidance: prefer interfaces as types for parameters, return values, and fields — applied to PaymentOrchestrator depending on PaymentGateway rather than concrete Stripe adapters."
  },
  {
    sourceId: "src_fowler_abstraction",
    relationshipType: "BOOK_THEORY_SUPPORT",
    directQuotationUsed: false,
    notes: "Fowler PublishedInterface framing of what a module exposes as its stable contract — mapped to sealing PaymentGateway so vendor SDK types are not part of the published orchestration surface."
  },
  {
    sourceId: "src_baeldung_interfaces",
    relationshipType: "ADAPTED_PATTERN",
    directQuotationUsed: false,
    notes: "Java interface examples adapted to payment domain: PaymentGateway implemented by StripeGatewayAdapter and BankTransferGateway with domain PaymentIntent / GatewayResult."
  },
  {
    sourceId: "src_jls_interfaces",
    relationshipType: "SPECIFICATION_AUTHORITY",
    directQuotationUsed: false,
    notes: "JLS Chapter 9 defines interface contracts and implementation rules — authority for PaymentGateway as a type that adapters implement without leaking implementation types into client signatures."
  }
];
