import { Source, SourceReference } from '../../../../../types/domain';

export const SOURCES_FACTORY: readonly Source[] = [
  {
    id: "src_gof_factory_method",
    platform: "Book",
    title: "Design Patterns (GoF) — Factory Method",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  },
  {
    id: "src_effective_java_item1",
    platform: "Book",
    title: "Effective Java (3rd Edition) — Item 1: Consider static factory methods instead of constructors",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  },
  {
    id: "src_baeldung_factory",
    platform: "Baeldung",
    title: "Baeldung — Factory Method Pattern in Java",
    url: "https://www.baeldung.com/java-factory-pattern",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  },
  {
    id: "src_gof_abstract_factory",
    platform: "Book",
    title: "Design Patterns (GoF) — Abstract Factory (contrast with Factory Method)",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  }
];

export const SOURCE_REFERENCES_FACTORY: readonly SourceReference[] = [
  {
    sourceId: "src_gof_factory_method",
    relationshipType: "BOOK_THEORY_SUPPORT",
    directQuotationUsed: false,
    notes: "Primary authority for Factory Method intent: define an interface for creating an object, defer instantiation to subclasses / centralized creator — adapted to ComplianceReportFactory."
  },
  {
    sourceId: "src_effective_java_item1",
    relationshipType: "BOOK_THEORY_SUPPORT",
    directQuotationUsed: false,
    notes: "Related guidance on static factory methods (named construction, subtype returns) contrasted with GoF Factory Method / simple factory for format-code selection."
  },
  {
    sourceId: "src_baeldung_factory",
    relationshipType: "ADAPTED_PATTERN",
    directQuotationUsed: false,
    notes: "Educational compliance-report domain scenario demonstrating simple factory / Factory Method with fail-fast format validation."
  },
  {
    sourceId: "src_gof_abstract_factory",
    relationshipType: "BOOK_THEORY_SUPPORT",
    directQuotationUsed: false,
    notes: "Contrast material: Abstract Factory for product families vs Factory Method for single ComplianceReport product selection by format code."
  }
];
