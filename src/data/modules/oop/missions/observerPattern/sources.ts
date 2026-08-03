import { Source, SourceReference } from '../../../../../types/domain';

export const SOURCES_OBSERVER_PATTERN: readonly Source[] = [
  {
    id: "src_obs_gof_observer",
    platform: "Book",
    title: "Design Patterns (GoF) — Observer",
    
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  },
  {
    id: "src_obs_hfdp",
    platform: "Book",
    title: "Head First Design Patterns — Observer Pattern",
    
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  },
  {
    id: "src_obs_baeldung",
    platform: "Baeldung",
    title: "Baeldung — Observer Pattern in Java",
    url: "https://www.baeldung.com/java-observer-pattern",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  },
  {
    id: "src_obs_oracle_beans",
    platform: "Oracle_Java_Docs",
    title: "Oracle — PropertyChangeListener / observer-style listeners",
    url: "https://docs.oracle.com/en/java/javase/17/docs/api/java.desktop/java/beans/PropertyChangeListener.html",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  }
];

export const SOURCE_REFERENCES_OBSERVER_PATTERN: readonly SourceReference[] = [
  {
    sourceId: "src_obs_gof_observer",
    relationshipType: "BOOK_THEORY_SUPPORT",
    directQuotationUsed: false,
    notes: "Supports duplicate-compliance-alert-observer via Design Patterns (GoF) — Observer"
  },
  {
    sourceId: "src_obs_hfdp",
    relationshipType: "BOOK_THEORY_SUPPORT",
    directQuotationUsed: false,
    notes: "Supports duplicate-compliance-alert-observer via Head First Design Patterns — Observer Pattern"
  },
  {
    sourceId: "src_obs_baeldung",
    relationshipType: "ADAPTED_PATTERN",
    directQuotationUsed: false,
    notes: "Supports duplicate-compliance-alert-observer via Baeldung — Observer Pattern in Java"
  },
  {
    sourceId: "src_obs_oracle_beans",
    relationshipType: "SPECIFICATION_AUTHORITY",
    directQuotationUsed: false,
    notes: "Supports duplicate-compliance-alert-observer via Oracle — PropertyChangeListener / observer-style listeners"
  }
];
