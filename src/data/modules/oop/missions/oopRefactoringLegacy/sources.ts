import { Source, SourceReference } from '../../../../../types/domain';

export const SOURCES_OOP_REFACTORING_LEGACY: readonly Source[] = [
  {
    id: "src_leg_feathers_welc",
    platform: "Book",
    title: "Working Effectively with Legacy Code (Michael Feathers) — seams & characterization tests",
    
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  },
  {
    id: "src_leg_fowler_refactoring",
    platform: "Book",
    title: "Refactoring (Martin Fowler) — incremental improvement of design",
    
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  },
  {
    id: "src_leg_fowler_strangler",
    platform: "Book",
    title: "Martin Fowler — Strangler Fig Application",
    url: "https://martinfowler.com/bliki/StranglerFigApplication.html",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  },
  {
    id: "src_leg_baeldung_legacy",
    platform: "Baeldung",
    title: "Baeldung — Introduction to Hexagonal Architecture (ports/adapters as seams)",
    url: "https://www.baeldung.com/hexagonal-architecture-ddd-spring",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  }
];

export const SOURCE_REFERENCES_OOP_REFACTORING_LEGACY: readonly SourceReference[] = [
  {
    sourceId: "src_leg_feathers_welc",
    relationshipType: "BOOK_THEORY_SUPPORT",
    directQuotationUsed: false,
    notes: "Supports untestable-credit-decision-seams via Working Effectively with Legacy Code (Michael Feathers) — seams & characterization tests"
  },
  {
    sourceId: "src_leg_fowler_refactoring",
    relationshipType: "BOOK_THEORY_SUPPORT",
    directQuotationUsed: false,
    notes: "Supports untestable-credit-decision-seams via Refactoring (Martin Fowler) — incremental improvement of design"
  },
  {
    sourceId: "src_leg_fowler_strangler",
    relationshipType: "BOOK_THEORY_SUPPORT",
    directQuotationUsed: false,
    notes: "Supports untestable-credit-decision-seams via Martin Fowler — Strangler Fig Application"
  },
  {
    sourceId: "src_leg_baeldung_legacy",
    relationshipType: "ADAPTED_PATTERN",
    directQuotationUsed: false,
    notes: "Supports untestable-credit-decision-seams via Baeldung — Introduction to Hexagonal Architecture (ports/adapters as seams)"
  }
];
