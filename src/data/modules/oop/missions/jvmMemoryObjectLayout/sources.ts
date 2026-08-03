import { Source, SourceReference } from '../../../../../types/domain';

export const SOURCES_JVM_MEMORY_OBJECT_LAYOUT: readonly Source[] = [
  {
    id: "src_jol_github",
    platform: "OpenJDK",
    title: "openjdk/jol — Java Object Layout toolbox (source & README)",
    url: "https://github.com/openjdk/jol",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  },
  {
    id: "src_jol_openjdk_project",
    platform: "OpenJDK",
    title: "OpenJDK Code Tools: jol project page",
    url: "https://openjdk.org/projects/code-tools/jol/",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  },
  {
    id: "src_jol_compressed_oops",
    platform: "OpenJDK",
    title: "OpenJDK Wiki (HotSpot) — CompressedOops",
    url: "https://wiki.openjdk.org/spaces/HotSpot/pages/11829259/CompressedOops",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  },
  {
    id: "src_jol_jls_objects",
    platform: "JLS",
    title: "Java Language Specification — Section 4.3.1: Objects",
    url: "https://docs.oracle.com/javase/specs/jls/se17/html/jls-4.html#jls-4.3.1",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  },
  {
    id: "src_jol_jvms",
    platform: "JVMS",
    title: "Java Virtual Machine Specification — Java SE 17 Edition (runtime data areas / objects framing)",
    url: "https://docs.oracle.com/javase/specs/jvms/se17/html/index.html",
    reliability: "HIGH",
    accessedDate: "2026-08-03T00:00:00.000Z"
  }
];

export const SOURCE_REFERENCES_JVM_MEMORY_OBJECT_LAYOUT: readonly SourceReference[] = [
  {
    sourceId: "src_jol_github",
    relationshipType: "SPECIFICATION_AUTHORITY",
    directQuotationUsed: false,
    notes: "Primary toolbox authority for measuring HotSpot object internals and footprints used in PositionCache capacity guidance."
  },
  {
    sourceId: "src_jol_openjdk_project",
    relationshipType: "SPECIFICATION_AUTHORITY",
    directQuotationUsed: false,
    notes: "Official OpenJDK project page confirming JOL purpose: decode actual layout/footprint rather than specification assumptions."
  },
  {
    sourceId: "src_jol_compressed_oops",
    relationshipType: "SPECIFICATION_AUTHORITY",
    directQuotationUsed: false,
    notes: "HotSpot compressed oops documentation — reference density depends on configuration; supports 'no universal header/reference size' teaching."
  },
  {
    sourceId: "src_jol_jls_objects",
    relationshipType: "SPECIFICATION_AUTHORITY",
    directQuotationUsed: false,
    notes: "JLS object identity/semantics contrasted with HotSpot concrete layout — records still language objects, not free structs."
  },
  {
    sourceId: "src_jol_jvms",
    relationshipType: "SPECIFICATION_AUTHORITY",
    directQuotationUsed: false,
    notes: "JVMS framing for JVM runtime structures; used to separate language/VM spec from HotSpot implementation layout details."
  }
];
