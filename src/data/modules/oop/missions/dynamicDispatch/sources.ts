import { Source, SourceReference } from '../../../../../types/domain';

export const SOURCES_DYNAMIC_DISPATCH: readonly Source[] = [
  {
    id: "src_jvms_65_invoke",
    platform: "JVMS",
    title: "Java Virtual Machine Specification — Section 6.5: invokevirtual, invokestatic, invokeinterface, invokespecial",
    url: "https://docs.oracle.com/javase/specs/jvms/se17/html/jvms-6.html#jvms-6.5",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  },
  {
    id: "src_java_specialists_dispatch",
    platform: "OpenJDK",
    title: "Java Specialists Newsletter (Dr. Heinz Kabutz) — Vtable/Itable Performance & Call-Site Polymorphism (HotSpot)",
    url: "https://www.javaspecialists.eu/",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  },
  {
    id: "src_baeldung_jvm_bytecode",
    platform: "Baeldung",
    title: "Baeldung — Understanding JVM Bytecode (Method Dispatch Instructions)",
    url: "https://www.baeldung.com/java-class-file",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  },
  {
    id: "src_glassdoor_hft_dispatch",
    platform: "Glassdoor",
    title: "Glassdoor / Interview Reports — HFT & Low-Latency JVM Dispatch Rounds (Pattern)",
    reliability: "MEDIUM",
    accessedDate: "2026-08-03T00:00:00.000Z"
  }
];

export const SOURCE_REFERENCES_DYNAMIC_DISPATCH: readonly SourceReference[] = [
  {
    sourceId: "src_jvms_65_invoke",
    relationshipType: "SPECIFICATION_AUTHORITY",
    directQuotationUsed: false,
    notes: "Primary authority for invokevirtual, invokestatic, invokeinterface, and invokespecial semantics used throughout the RiskEventProcessor mission."
  },
  {
    sourceId: "src_java_specialists_dispatch",
    relationshipType: "ADAPTED_PATTERN",
    directQuotationUsed: false,
    notes: "Educational adaptation of HotSpot monomorphic/bimorphic/megamorphic call-site and vtable/itable performance guidance to the risk pricing 1M events/sec hot loop."
  },
  {
    sourceId: "src_baeldung_jvm_bytecode",
    relationshipType: "ADAPTED_PATTERN",
    directQuotationUsed: false,
    notes: "Bytecode instruction explanations adapted to RiskHandler.evaluate vs RiskHandlers.evaluateStatic examples for interview pedagogy."
  },
  {
    sourceId: "src_glassdoor_hft_dispatch",
    relationshipType: "ADAPTED_PATTERN",
    directQuotationUsed: false,
    notes: "Interview scenario shape adapted from publicly reported HFT/low-latency JVM rounds (dispatch + megamorphism themes). No fabricated employer quotes; domain rewritten as RiskEventProcessor."
  }
];
