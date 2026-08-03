import { Source, SourceReference } from '../../../../../types/domain';

export const SOURCES_SENIOR_OOP_TRADEOFFS: readonly Source[] = [
  {
    id: "src_trade_ej_item18",
    platform: "Book",
    title: "Effective Java (3rd Edition) — Item 18: Favor composition over inheritance",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  },
  {
    id: "src_trade_gof_strategy",
    platform: "Book",
    title: "Design Patterns (GoF) — Strategy and Decorator: intents, applicability, and consequences",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  },
  {
    id: "src_trade_fowler_poeaa",
    platform: "Book",
    title: "Martin Fowler — Patterns of Enterprise Application Architecture (domain logic patterns overview)",
    url: "https://martinfowler.com/books/eaa.html",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  },
  {
    id: "src_trade_clean_arch",
    platform: "Book",
    title: "Clean Architecture (Robert C. Martin) — boundaries, dependency rule, and plugin-style variation",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  },
  {
    id: "src_trade_fowler_anemic",
    platform: "Book",
    title: "Martin Fowler — AnemicDomainModel",
    url: "https://martinfowler.com/bliki/AnemicDomainModel.html",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  }
];

export const SOURCE_REFERENCES_SENIOR_OOP_TRADEOFFS: readonly SourceReference[] = [
  {
    sourceId: "src_trade_ej_item18",
    relationshipType: "BOOK_THEORY_SUPPORT",
    directQuotationUsed: false,
    notes: "Composition-over-inheritance guidance applied to rejecting deep AbstractPaymentBase trees under high PaymentMethod volatility."
  },
  {
    sourceId: "src_trade_gof_strategy",
    relationshipType: "BOOK_THEORY_SUPPORT",
    directQuotationUsed: false,
    notes: "Strategy/Decorator applicability and consequences — used to place policies and ordered extensions only where constraints justify seams."
  },
  {
    sourceId: "src_trade_fowler_poeaa",
    relationshipType: "BOOK_THEORY_SUPPORT",
    directQuotationUsed: false,
    notes: "Enterprise domain-logic pattern framing for thin orchestration vs transaction-script sprawl in PlatformPaymentHandler."
  },
  {
    sourceId: "src_trade_clean_arch",
    relationshipType: "BOOK_THEORY_SUPPORT",
    directQuotationUsed: false,
    notes: "Boundary/plugin themes caution against interface-per-class ceremony without real substitution ports."
  },
  {
    sourceId: "src_trade_fowler_anemic",
    relationshipType: "ADAPTED_PATTERN",
    directQuotationUsed: false,
    notes: "Rich vs anemic balance for PaymentCommand vs PaymentPolicy/PaymentWorkflow — lean edge DTOs, behavior where invariants live."
  }
];
