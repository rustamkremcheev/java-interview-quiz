import { Source, SourceReference } from '../../../../../types/domain';

export const SOURCES_DEPENDENCY_INJECTION: readonly Source[] = [
  {
    id: "src_spring_constructor_vs_field",
    platform: "Book",
    title: "Spring Framework Reference — Collaborators / Constructor Injection vs Field Injection",
    url: "https://docs.spring.io/spring-framework/reference/core/beans/dependencies/factory-collaborators.html",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  },
  {
    id: "src_clean_architecture_dip",
    platform: "Book",
    title: "Clean Architecture (Robert C. Martin) — Dependency Inversion & Dependency Rule",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  },
  {
    id: "src_martin_fowler_di",
    platform: "Book",
    title: "Martin Fowler — Inversion of Control Containers and the Dependency Injection pattern",
    url: "https://martinfowler.com/articles/injection.html",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  },
  {
    id: "src_baeldung_di",
    platform: "Baeldung",
    title: "Baeldung — Why Field Injection Is Not Recommended / Constructor Dependency Injection",
    url: "https://www.baeldung.com/spring-injection-lombok",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  },
  {
    id: "src_interviewing_io_di",
    platform: "interviewing.io",
    title: "interviewing.io Technical Report: Senior Java Backend — DI, IoC, and Testability",
    url: "https://interviewing.io/blog",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  },
  {
    id: "src_glassdoor_senior_java_settlement",
    platform: "Glassdoor",
    title: "Glassdoor Reported Interview Log — Senior Java Backend Developer (Payments Settlement Domain)",
    url: "https://www.glassdoor.com",
    company: "Enterprise Financial Services",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  }
];

export const SOURCE_REFERENCES_DEPENDENCY_INJECTION: readonly SourceReference[] = [
  {
    sourceId: "src_spring_constructor_vs_field",
    relationshipType: "SPECIFICATION_AUTHORITY",
    directQuotationUsed: false,
    notes: "Establishes Spring's preferred constructor injection for required collaborators, auto-wiring of single constructors, and drawbacks of field injection for testability."
  },
  {
    sourceId: "src_clean_architecture_dip",
    relationshipType: "BOOK_THEORY_SUPPORT",
    directQuotationUsed: false,
    notes: "Derived from Clean Architecture dependency rule: high-level settlement policy depends on ports (FxRateGateway, LedgerGateway), adapters implement ports at the edge."
  },
  {
    sourceId: "src_martin_fowler_di",
    relationshipType: "BOOK_THEORY_SUPPORT",
    directQuotationUsed: false,
    notes: "Foundational DI vs Service Locator framing — push dependencies via constructors rather than pull from a container inside settle()."
  },
  {
    sourceId: "src_baeldung_di",
    relationshipType: "ADAPTED_PATTERN",
    directQuotationUsed: false,
    notes: "Educational settlement-domain scenario demonstrating field-injection NPEs in unit tests and constructor-injection remediation."
  },
  {
    sourceId: "src_interviewing_io_di",
    relationshipType: "ADAPTED_PATTERN",
    directQuotationUsed: false,
    notes: "Adapted senior interview pattern where candidates diagnose why @SpringBootTest passes while plain unit tests NPE on field-injected gateways."
  },
  {
    sourceId: "src_glassdoor_senior_java_settlement",
    relationshipType: "ADAPTED_PATTERN",
    directQuotationUsed: false,
    notes: "Adapted payments settlement interview scenario involving SettlementOrchestrator, FX/ledger gateways, and constructor vs field injection trade-offs."
  }
];
