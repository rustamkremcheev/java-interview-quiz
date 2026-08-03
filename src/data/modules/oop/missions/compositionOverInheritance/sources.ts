import { Source, SourceReference } from '../../../../../types/domain';

export const SOURCES_COMPOSITION: readonly Source[] = [
  {
    id: "src_effective_java_item18",
    platform: "Book",
    title: "Effective Java (3rd Edition) — Item 18: Favor composition over inheritance",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  },
  {
    id: "src_gof_decorator_pattern",
    platform: "Book",
    title: "Design Patterns (GoF — Gamma, Helm, Johnson, Vlissides) — Decorator Pattern",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  },
  {
    id: "src_fowler_composition",
    platform: "Book",
    title: "Martin Fowler — Refactoring (2nd Edition): Favor Composition Over Inheritance",
    url: "https://martinfowler.com/articles/working-with-xp.html",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  }
];

export const SOURCE_REFERENCES_COMPOSITION: readonly SourceReference[] = [
  {
    sourceId: "src_effective_java_item18",
    relationshipType: "BOOK_THEORY_SUPPORT",
    directQuotationUsed: false,
    notes: "Canonical fragile-base-class / composition-over-inheritance guidance adapted to NotificationService with EmailSender and SmsSender strategy composition."
  },
  {
    sourceId: "src_gof_decorator_pattern",
    relationshipType: "BOOK_THEORY_SUPPORT",
    directQuotationUsed: false,
    notes: "Decorator/Strategy patterns provide the structural basis for CountingNotificationService and NotificationDispatcher composing EmailSender/SmsSender."
  },
  {
    sourceId: "src_fowler_composition",
    relationshipType: "ADAPTED_PATTERN",
    directQuotationUsed: false,
    notes: "Martin Fowler's composition-over-inheritance guidance applied to notifications microservice delivery instrumentation."
  }
];
