import { Source, SourceReference } from '../../../../../types/domain';

export const SOURCES_COUPLING_COHESION: readonly Source[] = [
  {
    id: "src_hf_ooad_coupling_cohesion",
    platform: "Book",
    title: "Head First Object-Oriented Analysis & Design — Cohesion, Coupling, and Ease of Change",
    url: "https://www.oreilly.com/library/view/head-first-object-oriented/0596008678/",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  },
  {
    id: "src_clean_architecture_cc",
    platform: "Book",
    title: "Clean Architecture (Robert C. Martin) — The Clean Architecture",
    url: "https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  },
  {
    id: "src_fowler_coupling",
    platform: "Book",
    title: "Martin Fowler — Reducing Coupling (IEEE Software)",
    url: "https://www.martinfowler.com/ieeeSoftware/coupling.pdf",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  },
  {
    id: "src_fowler_separated_interface",
    platform: "Book",
    title: "Martin Fowler — Separated Interface (PoEAA Catalog)",
    url: "https://martinfowler.com/eaaCatalog/separatedInterface.html",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  }
];

export const SOURCE_REFERENCES_COUPLING_COHESION: readonly SourceReference[] = [
  {
    sourceId: "src_hf_ooad_coupling_cohesion",
    relationshipType: "BOOK_THEORY_SUPPORT",
    directQuotationUsed: false,
    notes: "Head First OOA&D framing: cohesive class does one thing well; higher cohesion loosens coupling and improves ease of change — mapped to ReconciliationService decomposition seams."
  },
  {
    sourceId: "src_clean_architecture_cc",
    relationshipType: "BOOK_THEORY_SUPPORT",
    directQuotationUsed: false,
    notes: "Clean Architecture dependency rule: policy/coordinator depends on ports (LedgerRepository, AlertPublisher); JDBC/Slack adapters are outer details — applied to shrinking alert-channel blast radius."
  },
  {
    sourceId: "src_fowler_coupling",
    relationshipType: "SPECIFICATION_AUTHORITY",
    directQuotationUsed: false,
    notes: "Fowler's coupling definition: if changing one module requires changing another, coupling exists — used as the change-amplification metric for alert → DB/PDF retests."
  },
  {
    sourceId: "src_fowler_separated_interface",
    relationshipType: "ADAPTED_PATTERN",
    directQuotationUsed: false,
    notes: "Separated Interface pattern adapted to AlertPublisher / LedgerRepository ports so ReconciliationCoordinator remains unaware of Slack/JDBC implementations."
  }
];
