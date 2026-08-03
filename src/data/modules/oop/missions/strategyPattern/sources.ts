import { Source, SourceReference } from '../../../../../types/domain';

export const SOURCES_STRATEGY: readonly Source[] = [
  {
    id: "src_gof_strategy",
    platform: "Book",
    title: "Design Patterns: Elements of Reusable Object-Oriented Software (GoF) — Strategy",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  },
  {
    id: "src_head_first_strategy",
    platform: "Book",
    title: "Head First Design Patterns — Strategy Pattern (encapsulating interchangeable algorithms)",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  },
  {
    id: "src_baeldung_strategy",
    platform: "Baeldung",
    title: "Baeldung — Strategy Design Pattern in Java",
    url: "https://www.baeldung.com/java-strategy-pattern",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  },
  {
    id: "src_clean_architecture_ocp",
    platform: "Book",
    title: "Clean Architecture (Robert C. Martin) — Open-Closed Principle",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  }
];

export const SOURCE_REFERENCES_STRATEGY: readonly SourceReference[] = [
  {
    sourceId: "src_gof_strategy",
    relationshipType: "BOOK_THEORY_SUPPORT",
    directQuotationUsed: false,
    notes: "Canonical Strategy definition: define a family of algorithms, encapsulate each, make them interchangeable — applied to PaymentChannel fee formulas."
  },
  {
    sourceId: "src_head_first_strategy",
    relationshipType: "BOOK_THEORY_SUPPORT",
    directQuotationUsed: false,
    notes: "Pedagogical framing of favoring composition of strategies over hard-coded conditionals — mapped to FeeStrategyRegistry over PaymentFeeCalculator switch."
  },
  {
    sourceId: "src_baeldung_strategy",
    relationshipType: "ADAPTED_PATTERN",
    directQuotationUsed: false,
    notes: "Java Strategy examples adapted to banking fee domain: CardFeeStrategy, WireFeeStrategy, AchFeeStrategy behind FeeStrategy."
  },
  {
    sourceId: "src_clean_architecture_ocp",
    relationshipType: "BOOK_THEORY_SUPPORT",
    directQuotationUsed: false,
    notes: "OCP guidance: open for extension (new PaymentChannel strategy) closed for modification (do not edit existing calculator switch cases)."
  }
];
