import { Source, SourceReference } from '../../../../../types/domain';

export const SOURCES_INTERFACE_DEFAULT_METHODS: readonly Source[] = [
  {
    id: "src_jls_9412_default_methods",
    platform: "JLS",
    title: "Java Language Specification — Section 9.4.1.2: Inheritance and Overriding of Default Methods",
    url: "https://docs.oracle.com/javase/specs/jls/se17/html/jls-9.html#jls-9.4.1.2",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  },
  {
    id: "src_effective_java_item20",
    platform: "Book",
    title: "Effective Java (3rd Edition) — Item 20: Prefer interfaces to abstract classes (Default Methods)",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  },
  {
    id: "src_baeldung_default_methods",
    platform: "Baeldung",
    title: "Baeldung — Guide to Default Methods in Interfaces",
    url: "https://www.baeldung.com/java-interface-default-methods",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  },
  {
    id: "src_jep_126_lambda",
    platform: "OpenJDK",
    title: "JEP 126: Lambda Expressions and Default Methods (Java 8)",
    url: "https://openjdk.org/jeps/126",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  }
];

export const SOURCE_REFERENCES_INTERFACE_DEFAULT_METHODS: readonly SourceReference[] = [
  {
    sourceId: "src_jls_9412_default_methods",
    relationshipType: "SPECIFICATION_AUTHORITY",
    directQuotationUsed: false,
    notes: "Primary authority for default method inheritance hierarchy, unrelated defaults compile error, and super-qualified invocation syntax InterfaceName.super.method()."
  },
  {
    sourceId: "src_effective_java_item20",
    relationshipType: "BOOK_THEORY_SUPPORT",
    directQuotationUsed: false,
    notes: "Joshua Bloch guidance on interface evolution via default methods and when to prefer composition over stacking cross-cutting default method interfaces."
  },
  {
    sourceId: "src_baeldung_default_methods",
    relationshipType: "ADAPTED_PATTERN",
    directQuotationUsed: false,
    notes: "Educational payment audit domain scenario demonstrating diamond conflict between Auditable and Traceable internal SDK interfaces."
  },
  {
    sourceId: "src_jep_126_lambda",
    relationshipType: "SPECIFICATION_AUTHORITY",
    directQuotationUsed: false,
    notes: "Historical context for why default methods were introduced in Java 8 to enable backward-compatible Collection API evolution."
  }
];
