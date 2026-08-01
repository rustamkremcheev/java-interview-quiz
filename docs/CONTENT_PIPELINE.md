# CONTENT PIPELINE SPECIFICATION: RESEARCH, PROVENANCE, VERIFICATION, & PUBLISHING WORKFLOW

---

| Metadata | Details |
| :--- | :--- |
| **Document Status** | Approved / Authoritative Specification |
| **Document Version** | 1.0.0 |
| **Target Audience** | Principal Content Architects, Technical Research Leads, Senior Java Interviewers, Source Verification Editors, AI Content Governance Specialists |
| **Authors** | Principal Content Architect, Technical Research Lead, Senior Java Interviewer, Staff Java Engineer |
| **Primary Domain** | Question Acquisition, Provenance Tracking, Technical Verification, Pedagogy Transformation, Bilingual Publishing |
| **Effective Date** | July 2026 |

---

## EXECUTIVE SUMMARY & SPECIFICATION AUTHORITY

This document establishes the authoritative operational specification for discovering, verifying, transforming, and publishing all educational content, interview questions, code artifacts, and learning challenges for the Senior Java Technical Interview Preparation Platform.

### Rule of Precedence
This document is the binding single source of truth for the content engineering pipeline. No content may be published to the platform without satisfying the quality gates, provenance checks, and verification procedures defined herein. This specification strictly conforms to and extends the principles codified in `PROJECT_VISION.md`, `LEARNING_ENGINE.md`, and `DATA_MODEL.md`.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                              THE CONTENT ENGINEERING PIPELINE                          │
└────────────────────────────────────────────────────────────────────────────────────────┘

  [ 1. Source Discovery ] ──► [ 2. Raw Inbox Staging ] ──► [ 3. Provenance Classification ]
                                                                     │
  ┌──────────────────────────────────────────────────────────────────┘
  │
  ▼
  [ 4. Normalization & Deduplication ] ──► [ 5. Technical Verification (JLS/JVMS) ]
                                                        │
  ┌─────────────────────────────────────────────────────┘
  │
  ▼
  [ 6. Theory & Mission Integration ]  ──► [ 7. Challenge & Code Annotation Engine ]
                                                        │
  ┌─────────────────────────────────────────────────────┘
  │
  ▼
  [ 8. Bilingual Translation (EN/RU) ] ──► [ 9. Six Quality Gates ] ──► [ 10. Publishing ]
```

---

## SECTION 1 — PIPELINE GOALS

The content pipeline satisfies ten fundamental operational goals:

1. **Authentic Interview Alignment:** Ensure questions accurately reflect real enterprise technical interview rounds at target companies (Citi, JPMorgan, Goldman Sachs, Bloomberg, Amazon, Google).
2. **Zero Synthetic Trivia:** Reject generic, unverified "Top 50 Java Questions" and artificial syntax tricks lacking real-world backend engineering context.
3. **Immutable Provenance Tracking:** Audit the exact origin, platform, candidate context, and reliability of every interview question before ingest.
4. **Authoritative Specification Verification:** Verify all technical claims directly against official OpenJDK source code, the Java Language Specification (JLS), JVM Specification (JVMS), and official JEPs.
5. **Deep Conceptual Graph Connectivity:** Link every question to core theory, annotated code artifacts, visual state diagrams, and Knowledge Graph concepts—no isolated questions.
6. **Active-Learning Transformation:** Transform static question-answer pairs into interactive, multi-level challenges (`GUIDED`, `APPLIED`, `INTERVIEW`) following the Learning Engine's 11-step flow.
7. **Bilingual Semantic Precision:** Maintain strict technical and structural alignment between English (primary interview language) and Russian (comprehension support) versions.
8. **Repeatable Domain Ingest:** Provide a standardized, modular pipeline template suitable for scaling across Java Core, Concurrency, JVM, Spring, Kafka, SQL, Docker, and System Design.
9. **Strict Provenance Isolation:** Explicitly separate authenticated, verified interview questions from synthetic practice variations generated for learning reinforcement.
10. **Deterministic Versioning & Auditability:** Enable granular content versioning and non-destructive corrections preserving historical user attempt records.

---

## SECTION 2 — CONTENT CLASSES

The pipeline processes sixteen distinct content entity classes defined in `DATA_MODEL.md`:

| Content Class | Primary Origin | AI Generation Permitted? | Required Verification | Target DATA_MODEL Entity |
| :--- | :--- | :--- | :--- | :--- |
| **Interview Question** | Firsthand / Public Reports | 🔴 NO (Curate/Edit Only) | Provenance + JLS/JVMS | `InterviewQuestion` |
| **Theory Article** | Books / Official Specs | 🟡 YES (Synthesize/Paraphrase)| Technical Gate (Tier 3) | `TheoryArticle` |
| **Theory Checkpoint** | Approved Theory | 🟢 YES (Learning Checks) | Internal Consistency | `TheoryStage` |
| **Engineering Scenario**| Verified Production Bugs| 🟢 YES (Contextual Framing) | Architectural Realism | `Mission` (`engineeringProblem`)|
| **Mission** | Curriculum Architecture | 🟢 YES (Pedagogical Flow) | 11-Step Flow Audit | `Mission` |
| **Challenge** | Verified Questions | 🟢 YES (Puzzle Framing) | Solution Compilation | `Challenge` |
| **Hint** | Verified Solutions | 🟢 YES (Progressive Hints) | Non-Contradiction | `Hint` |
| **Code Artifact** | Reconstructed JDK Code | 🟢 YES (Refactoring) | OpenJDK Compilation | `CodeArtifact` |
| **Code Annotation** | Technical Analysis | 🟢 YES (Mechanical Insight) | JVMS / Memory Model | `CodeAnnotation` |
| **Visualization** | State Diagrams | 🟢 YES (Config Schemas) | State Machine Logic | `Visualization` |
| **Interview-Ready Ans**| Expert Synthesis | 🟢 YES (Verbal Structuring) | 3-Tier Speech Rubric | `InterviewQuestion` |
| **Follow-Up Question**| Interview Reports / Edge| 🟢 YES (Variation Engine) | Technical Plausibility | `InterviewQuestion` |
| **Mistake Pattern** | Candidate Error Analysis| 🟢 YES (Misconception Mining)| Misconception Accuracy| `MistakePattern` |
| **Reflection Prompt** | Pedagogical Design | 🟢 YES (Self-Evaluation) | Non-Graded Guidance | `ReflectionNote` |
| **Source** | Public Web / Docs | 🔴 NO (Extraction Only) | URL / Platform Verification| `Source` |
| **SourceReference** | Provenance Mapping | 🔴 NO (Relationship Audit)| Direct Link Integrity | `SourceReference` |

---

## SECTION 3 — SOURCE TIERS & RESTRICTIONS

Content acquisition relies on a strict four-tier source hierarchy:

```
  ┌────────────────────────────────────────────────────────────────────────────────────────┐
  │ TIER 1: FIRSTHAND INTERVIEW REPORTS (Glassdoor, interviewing.io, LeetCode Discuss)     │
  └────────────────────────────────────────────────────────────────────────────────────────┘
                                              │
                                              ▼
  ┌────────────────────────────────────────────────────────────────────────────────────────┐
  │ TIER 2: CURATED JAVA RESOURCES (Baeldung, GeeksforGeeks, Reputable Study Banks)        │
  └────────────────────────────────────────────────────────────────────────────────────────┘
                                              │
                                              ▼
  ┌────────────────────────────────────────────────────────────────────────────────────────┐
  │ TIER 3: TECHNICAL AUTHORITIES (JLS, JVMS, Oracle JDK Docs, OpenJDK, JEPs)             │
  └────────────────────────────────────────────────────────────────────────────────────────┘
                                              │
                                              ▼
  ┌────────────────────────────────────────────────────────────────────────────────────────┐
  │ TIER 4: APPROVED BOOKS (Effective Java, Design Patterns GoF, Clean Architecture)       │
  └────────────────────────────────────────────────────────────────────────────────────────┘
```

### 3.1 Tier Definitions
* **Tier 1 — Firsthand / Interview-Derived Reports:** Candidate interview posts, publicly discussed technical rounds, interviewing.io recordings/writeups, Glassdoor company interview logs. *Used exclusively for discovering authentic question formulations.*
* **Tier 2 — Curated Java Resources:** Baeldung, GeeksforGeeks, InterviewBit, open-source GitHub study repositories. *Used for identifying question patterns, variations, and missing technical coverage.*
* **Tier 3 — Technical Authorities:** Java Language Specification (JLS), JVM Specification (JVMS), Official Oracle JDK API Javadocs, OpenJDK source code, JDK Enhancement Proposals (JEPs). *Used as the absolute authority for technical verification.*
* **Tier 4 — Approved Books:** *Effective Java* (Bloch), *Design Patterns* (Gamma et al.), *Clean Code / Clean Architecture* (Martin), *Head First OOA&D*. *Used for architectural theory, design trade-offs, and clean code principles.*

### 3.2 Excluded & Restricted Sources
The following source types are **STRICTLY PROHIBITED**:
* ❌ Leaked proprietary assessment packets or NDA-protected active test keys (e.g., active HackerRank/Coderbyte test keys).
* ❌ Paywalled content requiring illicit access.
* ❌ Unverified SEO-farm blogs containing copy-pasted, outdated Java 6/8 code snippets.
* ❌ AI-generated web pages or unverified LLM output treated as a technical authority.
* ❌ Anonymous forums lacking sufficient technical or contextual detail.

---

## SECTION 4 — SOURCE DISCOVERY PROCESS

For every curriculum Topic, research leads execute a systematic 9-step discovery plan:

```
 1. Topic Keyword Expansion   ──► Generate primary and variant technical terms
 2. Seniority Filtering       ──► Target "Senior Java", "Lead", "Staff", "Low-Latency"
 3. Enterprise Context Search ──► Target Tier-1 Banks (Citi, GS, JPM) and Big Tech
 4. Incident & Code Search    ──► Query code-reading, memory leak, and bug scenarios
 5. Follow-Up Mining          ──► Identify interviewer probe questions
 6. Specification Mapping     ──► Cross-reference terms with JLS/JVMS sections
 7. Book Pattern Matching     ──► Locate corresponding Effective Java / GoF items
 8. Raw Inbox Capture         ──► Stage findings into Raw Content Inbox
 9. Evidence Audit            ──► Verify retrieved source vs search query claim
```

> **Operational Directive:** Search queries are planning tools, NOT evidence. A search query for "Citi Java Overriding Question" does NOT prove company attribution; only the retrieved source document constitutes evidence.

---

## SECTION 5 — RAW CONTENT INBOX

All unverified findings are ingested into a temporary staging inbox before review:

```ts
export type RawContentStatus =
  | "DISCOVERED"
  | "CAPTURED"
  | "NEEDS_REVIEW"
  | "ACCEPTED_FOR_PROCESSING"
  | "REJECTED";

export interface RawContentItem {
  readonly temporaryId: string; // e.g., "raw_20260731_001"
  readonly originalSourceUrl?: string;
  readonly sourcePlatform: string;
  readonly pageTitle: string;
  readonly rawWording: string;
  readonly contextSnippet?: string;
  readonly reportedCompany?: string;
  readonly reportedRole?: string;
  readonly reportedDate?: string;
  readonly isFirsthandReport: boolean;
  readonly candidateTopicIds: readonly string[];
  readonly initialConfidence: number; // 0.0 to 1.0
  readonly status: RawContentStatus;
  readonly rejectionReason?: string;
  readonly contentFingerprint: string; // SHA-256 hash of rawWording
}
```

### Standard Rejection Reasons:
* `DUPLICATE_QUESTION` (Semantically identical to existing canonical question).
* `UNVERIFIABLE_CLAIM` (Vague, incomplete, or fabricated-looking report).
* `TECHNICALLY_INCORRECT` (Based on invalid Java runtime assumptions).
* `TRIVIA_ONLY` (Syntax trick with zero enterprise engineering value).
* `PROPRIETARY_LEAK` (Contains active NDA/assessment test key material).

---

## SECTION 6 — PROVENANCE CLASSIFICATION

Every accepted question is assigned one of six immutable provenance classifications defined in `DATA_MODEL.md`:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                              PROVENANCE CLASSIFICATIONS                                │
├─────────────────────────────┬──────────────────────────────────────────────────────────┤
│ Classification              │ Qualification Requirements                               │
├─────────────────────────────┼──────────────────────────────────────────────────────────┤
│ REAL_INTERVIEW_REPORT       │ Authenticated candidate report from a Tier-1 public source│
│ REPEATED_INTERVIEW_PATTERN  │ Corroborated across 3+ independent Tier-1/Tier-2 sources │
│ CURATED_INTERVIEW_BANK      │ Curated from Baeldung, GeeksforGeeks, or GitHub banks    │
│ OFFICIAL_LANGUAGE_EDGE_CASE │ Derived directly from JLS/JVMS specification edge cases │
│ BOOK_DERIVED_EXERCISE       │ Derived from Effective Java or GoF design principles     │
│ GENERATED_PRACTICE_VARIATION│ AI-transformed practice exercise for learning reinforcement│
└─────────────────────────────┴──────────────────────────────────────────────────────────┘
```

> **Mandatory Constraint:** Items classified as `GENERATED_PRACTICE_VARIATION` must be explicitly badged in the UI as practice variations and MUST NEVER display verified company badges or `SOURCE_CONFIRMED` status.

---

## SECTION 7 — COMPANY ATTRIBUTION RULES

To prevent misleading claims, company badges (e.g., *Citi*, *Goldman Sachs*, *Amazon*) are strictly governed:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                             COMPANY ATTRIBUTION MATRIX                                 │
├────────────────────────────────────────────────┬───────────────────────────────────────┤
│ PERMITTED UI LABELS                            │ STRICTLY FORBIDDEN LABELS             │
├────────────────────────────────────────────────┼───────────────────────────────────────┤
│ "Publicly reported in a Citi interview log"    │ ❌ "Official Citi Interview Question" │
│ "Commonly reported in Financial Services"      │ ❌ "Guaranteed Citi Exam Question"    │
│ "Verified Senior Java Interview Pattern"       │ ❌ "Exact Current Citi Assessment"    │
│ "Practice Variation based on Bank Interviews"  │ ❌ "Asked at Citi" (Without Tier 1 ref)│
└────────────────────────────────────────────────┴───────────────────────────────────────┘
```

### Criteria for Displaying Company Badges:
1. Sourced from an explicit Tier-1 candidate interview report naming the company.
2. The source document is publicly accessible and audited.
3. The attribution is stored as metadata (`companyContext`), NOT hardcoded into the question text.
4. If evidence is weak or uncorroborated, the company badge MUST BE OMITTED.

---

## SECTION 8 — SOURCE RELIABILITY SCORING

Source reliability is evaluated across two independent axes: **Provenance Confidence** and **Technical Plausibility**.

```
                         PROVENANCE CONFIDENCE (Tier 1 vs Tier 2)
                                      ▲
                                      │  High Provenance / Weak Tech Answer
                                      │  (Requires Technical Refactoring)
                                      │
  ────────────────────────────────────┼────────────────────────────────────►
                                      │  Low Provenance / High Tech Value
                                      │  (Classify as CURATED or EDGE_CASE)
                                      │
                               TECHNICAL ACCURACY (JLS / JVMS Verification)
```

### Reliability Level Scoring Rubric:
* **`HIGH`:** Firsthand Tier-1 candidate report with clear context AND verified against JLS/JVMS specs.
* **`MEDIUM`:** Curated Tier-2 source corroborated across multiple independent repositories.
* **`LOW`:** Single uncorroborated Tier-2 post with ambiguous context.
* **`UNVERIFIED`:** Ingested finding pending technical review.

---

## SECTION 9 — NORMALIZATION & SANITIZATION

Raw interview reports are normalized to remove noise while preserving technical intent:

```
  RAW REPORT: "So I was interviewing at Citi for Senior Java Dev and the guy asked me why 
               override method can't throw bigger exception than parent class..."
                                      │
                                      ▼ [ NORMALIZATION PIPELINE ]
                                      │
  NORMALIZED QUESTION: "In Java, what are the exact language rules governing checked 
                        exception declarations when overriding a method, and how does 
                        the Java Virtual Machine enforce subtype polymorphism contracts?"
```

### Normalization Constraints:
* Remove personal names, interviewer chatter, and conversational filler.
* Correct grammatical errors while preserving technical phrasing.
* Do NOT strengthen weak company claims during normalization.
* Preserve original ambiguous phrasing if the ambiguity was an intentional part of the interview question.
* Record `wordingAdapted: true` in the `SourceReference` entity.

---

## SECTION 10 — SEMANTIC DEDUPLICATION

To prevent bloated question banks, new findings are checked against existing canonical questions:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                DEDUPLICATION FLOW                                      │
└────────────────────────────────────────────────────────────────────────────────────────┘

  New Finding ──► Semantic Matching Engine ──► Compare Concept + Code + Answer
                                                     │
       ┌─────────────────────────────────────────────┴─────────────────────────────────────┐
       ▼                                                                                   ▼
 [ MATCH FOUND: Merge as Source Reference ]                             [ NO MATCH: Create Canonical Question ]
  - Add source ID to canonical question                                 - Assign new Question ID
  - Retain distinct follow-up variations                                - Link to Knowledge Graph
```

### Relationship Classifications during Merge:
* `EXACT_DUPLICATE`: Identical core wording and scenario.
* `SEMANTIC_DUPLICATE`: Different wording, identical underlying concept and answer.
* `SENIOR_FOLLOW_UP`: Deeper variation of an existing concept (linked as `likelyFollowUpQuestionId`).
* `CODE_VARIATION`: Same concept, different code implementation.

---

## SECTION 11 — TOPIC & CONCEPT CLASSIFICATION

Every normalized question must be classified using the canonical OOP taxonomy defined in `DATA_MODEL.md`:

```ts
export interface ClassificationResult {
  readonly primaryTopicId: string; // e.g., "top_oop_15" (Method Overriding)
  readonly secondaryTopicIds: readonly string[]; // e.g., ["top_oop_11", "top_oop_12"]
  readonly conceptIds: readonly string[]; // e.g., ["cpt_covariant_returns", "cpt_exception_subtyping"]
  readonly canonicalTags: readonly string[]; // e.g., ["#overriding", "#exceptions", "#polymorphism"]
  readonly difficulty: DifficultyTier; // "SENIOR"
  readonly targetQuestionFormat: "CONCEPTUAL_EXPLANATION" | "CODE_READING" | "DEBUGGING" | "TRADE_OFF";
}
```

> **Classification Rule:** Questions are classified based on the **underlying technical mechanism tested**, NOT superficial keyword matches.

---

## SECTION 12 — TECHNICAL VERIFICATION PROTOCOL

Every answer is audited against Tier 3 Technical Authorities before approval:

```
  INTERVIEW REPORT CLAIM: "Abstract classes are faster than interfaces in Java."
                                      │
                                      ▼ [ TIER 3 AUDIT ]
                                      │
  JLS / JVMS VERIFICATION: "Legacy claim based on pre-Java 8 invokeinterface vs invokevirtual 
                            vtable lookup overhead. In modern JDK 17/21 JIT compilation (C2), 
                            monomorphic interface calls are inlined identically via Class Hierarchy 
                            Analysis (CHA). Claim is a HISTORICAL MYTH."
                                      │
                                      ▼
  FINAL VERIFIED ANSWER: Corrects the historical myth, explains `invokeinterface` vs `invokevirtual` 
                         bytecode instructions, and details modern JIT CHA inlining mechanics.
```

### Technical Distinction Requirements:
Every verified answer MUST explicitly distinguish between:
1. **Java Language Guarantees** (JLS spec requirements).
2. **JVM Specification Constraints** (JVMS runtime rules).
3. **OpenJDK Implementation Details** (e.g., HotSpot C2 compiler optimizations, G1 GC internals).
4. **Framework / Library Conventions** (Spring, Hibernate behaviors).
5. **Architectural Trade-offs** (Context-dependent engineering choices).

---

## SECTION 13 — THEORY CREATION WORKFLOW

Theory articles are synthesized from Tier 3 Authorities and Tier 4 Books to support problem-first missions:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                              THEORY ARTICLE STRUCTURE                                  │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 1. DEFINITION        : Rigorous, precise language specification statement             │
│ 2. MOTIVATION        : Hardware, software, or system design problem solved             │
│ 3. MENTAL MODEL      : Clear visual/conceptual model demystifying the abstraction      │
│ 4. MECHANICS         : Low-level runtime execution, bytecode, and memory behavior      │
│ 5. TRADE-OFFS        : Latency, memory footprint, complexity, and coupling analysis    │
│ 6. PRODUCTION USE    : Enterprise Spring/Java backend use-cases                        │
│ 7. COMMON MISTAKES   : High-yield candidate anti-patterns and traps                    │
│ 8. INTERVIEW GUIDANCE: Verbatim verbal delivery tips for senior technical rounds       │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

Following each Theory Article, authors create 3–5 **Theory Checkpoint** learning checks to validate retention before code practice.

---

## SECTION 14 — PROBLEM-FIRST MISSION INTEGRATION

Every curriculum Topic is converted into one or more active **Missions** implementing the Learning Engine's 11-step workflow:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                             MISSION INTEGRATION ENGINE                                 │
└────────────────────────────────────────────────────────────────────────────────────────┘

  [ Real Production Bug ] ──► [ Think Yourself Prompt ] ──► [ Need Knowledge Bridge ]
                                                                     │
  ┌──────────────────────────────────────────────────────────────────┘
  │
  ▼
  [ Theory & Visualization ] ──► [ Guided / Applied Challenge ] ──► [ Interview Verbal Answer ]
                                                                             │
  ┌──────────────────────────────────────────────────────────────────────────┘
  │
  ▼
  [ Debug Counter-Example ]  ──► [ Knowledge Graph Reflection ] ──► [ Follow-Up Routing ]
```

---

## SECTION 15 — CHALLENGE GENERATION ENGINE

Questions are transformed into interactive challenges across three assistance tiers:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                             CHALLENGE TIER MATRIX                                      │
├──────────────────────┬──────────────────────────────────┬──────────────────────────────┤
│ Assistance Tier      │ Target Challenge Types           │ User Interaction Model       │
├──────────────────────┼──────────────────────────────────┼──────────────────────────────┤
│ GUIDED               │ SEQUENCE_PUZZLE, MATCHING_PUZZLE,│ Structured puzzle pieces,    │
│                      │ MULTI_SELECT, FIX_BUILDER        │ ordering, distractor picks   │
├──────────────────────┼──────────────────────────────────┼──────────────────────────────┤
│ APPLIED              │ BUG_HUNT, CODE_READING,          │ Independent code refactoring,│
│                      │ OUTPUT_PREDICTION, TRADE_OFF     │ bug fixing, output prediction│
├──────────────────────┼──────────────────────────────────┼──────────────────────────────┤
│ INTERVIEW            │ SHORT_ANSWER, INTERVIEW_ANSWER,  │ Verbal / textual synthesis,  │
│                      │ REFLECTION_PROMPT                │ trade-off speech delivery    │
└──────────────────────┴──────────────────────────────────┴──────────────────────────────┘
```

---

## SECTION 16 — DISTRACTOR DESIGN RULES

All distractors (incorrect options in puzzles and multi-select challenges) MUST be educationally valuable:

```
  QUESTION: "Why should mutable objects NOT be used as keys in a HashMap?"

  🟢 GOOD DISTRACTORS (Educational Anti-Patterns):
  - Option A: "Changing a mutable key alters its #hashCode(), leaving the entry trapped in 
               the original bucket during lookups." (Correct Answer)
  - Option B: "HashMap automatically throws a ConcurrentModificationException when a key mutates."
               (Plausible misconception about collection integrity)
  - Option C: "Mutable keys force the HashMap to immediately convert its buckets into Red-Black Trees."
               (Confuses treeification thresholds with key mutability)

  🔴 BAD DISTRACTORS (Prohibited Junk Options):
  - Option D: "Because Java HashMap only allows Strings and Integers as keys." (Silly trivia)
  - Option E: "Because mutable keys consume twice as much Metaspace." (Nonsense jargon)
```

---

## SECTION 17 — PROGRESSIVE HINT GENERATION

Every challenge must provide a 4-level progressive hint structure:

1. **Level 1 (Directional Clue):** Points toward the general area of system behavior without naming mechanisms.
2. **Level 2 (Concept Reminder):** Identifies the core concept (e.g., *Invariant protection, volatile memory visibility*).
3. **Level 3 (Mechanism Clue):** Explains the exact runtime mechanism involved (e.g., *Bucket index calculation uses hash & (n-1)*).
4. **Level 4 (Near-Solution Explanation):** Guides the learner to the exact fix without writing the code for them.

---

## SECTION 18 — CODE ARTIFACT CREATION

Code artifacts conform to the 6 code types defined in `DATA_MODEL.md`:

```java
// [QUESTION_CODE] Baseline broken implementation
public class BankAccount {
    public double balance; // ⚠️ Public field allows direct external mutation
}

// [CORRECT_SOLUTION] Production-ready refactored Java 17 implementation
public final class BankAccount {
    private final Currency currency;
    private long balanceInCents; // Prevents floating-point rounding errors

    public BankAccount(Currency currency, long initialBalanceInCents) {
        if (initialBalanceInCents < 0) {
            throw new IllegalArgumentException("Initial balance cannot be negative");
        }
        this.currency = Objects.requireNonNull(currency);
        this.balanceInCents = initialBalanceInCents;
    }
}
```

---

## SECTION 19 — CODE COMMENT STANDARDS

Learning Mode code comments must follow the **Mechanical & Architectural Annotation Standard**:

```java
// ❌ POOR COMMENT (Restates Syntax):
// Set the balance field to balance
this.balance = balance;

// 🟢 STRONG ANNOTATION (Explains WHY, Problem Solved, and Interview Concept):
// 💡 ANNOTATION [WHY THIS EXISTS & INVARIANT PROTECTION]:
// Enforcing encapsulation by validating state inside the constructor prevents 
// the creation of an invalid object instance. Senior interviewers look for this 
// exact distinction: encapsulation is about protecting domain invariants, 
// NOT merely wrapping fields in getters and setters.
```

---

## SECTION 20 — INTERVIEW-READY ANSWERS

Every interview question includes a structured **Verbatim Speech Delivery Template**:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        VERBATIM SPEECH DELIVERY SCRIPT                                 │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 1. ELEVATOR PITCH (30 sec): Concise core executive summary.                            │
│ 2. DEEP MECHANICS (60 sec): Bytecode, memory model, and JVM execution details.          │
│ 3. PRODUCTION TRADE-OFFS (30 sec): Real-world performance, latency, and memory impact.│
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## SECTION 21 — FOLLOW-UP QUESTION GENERATION

Follow-up questions are systematically generated to simulate senior interviewer probing:

```
  PRIMARY QUESTION: "How does HashMap handle bucket collisions in Java 8+?"
                                      │
                                      ▼ [ FOLLOW-UP GENERATION ENGINE ]
                                      │
  FOLLOW-UP 1 (Edge Case): "What happens if a custom class implements #hashCode() to always 
                            return 1, and how does treeification affect execution time?"
  FOLLOW-UP 2 (Security):  "How does Java protect HashMaps against HashDOS denial-of-service 
                            attacks in multi-threaded web applications?"
```

---

## SECTION 22 — COMMON MISTAKE EXTRACTION

Candidate misconceptions mined during research are formalized into `MistakePattern` entities:

```ts
export const MISTAKE_EQUALS_MUTABLE = {
  id: "err_mutable_hashcode_key",
  code: "ERR_MUTABLE_HASHCODE_KEY",
  title: { en: "Using Mutable Fields in hashCode()", ru: "Использование мутабельных полей в hashCode()" },
  description: { 
    en: "Mutating a key field after insertion changes its hash code, trapping the entry in an unreachable bucket.",
    ru: "Изменение поля ключа после вставки меняет хэш-код, делая элемент недостижимым."
  },
  remediationMissionIds: ["mis_hashmap_internals"]
};
```

---

## SECTION 23 — VISUALIZATION CREATION RULES

Visualizations are built using interactive configuration schemas for four explicit execution states:

1. **Memory Map Visualizer:** Heap vs. Stack allocations, Metaspace reference chains.
2. **State Transition Visualizer:** Thread states (`BLOCKED`, `WAITING`, `RUNNABLE`), GC generation evacuation.
3. **Sequence Flow Visualizer:** Spring AOP Proxy invocation wrapping native JDBC transactions.
4. **Object Graph Visualizer:** Composition hierarchies vs. Inheritance coupling trees.

---

## SECTION 24 — BILINGUAL CONTENT PIPELINE

Content translation follows the **English-First Semantic Alignment Protocol**:

```
  1. Author & Verify Technical English Prose ──► Primary authoritative text
  2. Preserve Java Identifiers                ──► Class/method names (e.g., ConcurrentHashMap) remain EN
  3. Translate Explanation to Technical RU   ──► Natural, precise engineering Russian
  4. Perform Semantic Alignment Audit        ──► Ensure non-literal, concept-accurate translation
```

### Technical Glossary Enforcement:
* *Encapsulation* $\rightarrow$ Инкапсуляция
* *Invariant* $\rightarrow$ Инвариант
* *Dynamic Dispatch* $\rightarrow$ Динамическая диспетчеризация
* *Defensive Copy* $\rightarrow$ Защитное копирование (Defensive Copy)
* *Happens-Before Guarantee* $\rightarrow$ Гарантия Happens-Before

---

## SECTION 25 — THE SIX QUALITY GATES

No content unit may be published without passing all **Six Mandatory Quality Gates**:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                 THE SIX QUALITY GATES                                  │
├───────────────────┬────────────────────────────────────────────────────────────────────┤
│ Quality Gate      │ Gate Validation Criteria                                           │
├───────────────────┼────────────────────────────────────────────────────────────────────┤
│ 1. SOURCE GATE    │ Provenance verified; company attribution audited; no leaks/NDAs    │
│ 2. TECHNICAL GATE │ Verified vs JLS/JVMS specs; OpenJDK compilation clean              │
│ 3. LEARNING GATE  │ 11-step flow satisfied; progressive hints valid; distractors sound │
│ 4. CODE GATE      │ Java 17/21 compliant; annotations explain WHY and problem solved   │
│ 5. LOCALIZATION   │ EN/RU aligned; Java identifiers untranslated; zero missing strings │
│ 6. DATA GATE      │ Passes DATA_MODEL.md schema validation; stable IDs; graph resolved │
└───────────────────┴────────────────────────────────────────────────────────────────────┘
```

---

## SECTION 26 — HUMAN REVIEW & EDITORIAL GOVERNANCE

Even with AI assistance, published content requires human editorial sign-off across four roles:

1. **Source Reviewer:** Validates public provenance and company attribution claims.
2. **Java Technical Architect:** Verifies code compilation, JLS/JVMS specs, and thread safety.
3. **Learning Experience Designer:** Audits pedagogical flow, challenge difficulty, and hint progression.
4. **Localization Reviewer:** Audits Russian technical terminology and semantic alignment.

---

## SECTION 27 — CONTENT STATUS WORKFLOW

Entities transition through a 10-state lifecycle:

```
  [ DRAFT ] ──► [ SOURCE_REVIEW ] ──► [ TECHNICAL_REVIEW ] ──► [ LEARNING_REVIEW ]
                                                                       │
  ┌────────────────────────────────────────────────────────────────────┘
  │
  ▼
  [ LOCALIZATION_REVIEW ] ──► [ READY_TO_PUBLISH ] ──► [ PUBLISHED ]
                                                            │
                                  ┌─────────────────────────┴─────────────────────────┐
                                  ▼                                                   ▼
                       [ NEEDS_CORRECTION ]                                     [ DEPRECATED ]
```

---

## SECTION 28 — CONTENT VERSIONING & MIGRATION

* **Minor Wording Fixes:** Increment patch version (e.g., `1.0.1`); user completion states remain unaffected.
* **Substantive Answer / Code Fixes:** Increment minor version (e.g., `1.1.0`); triggers automated review scheduling for users who previously completed the item.
* **Historical Audit:** User attempt records remain bound to the `contentVersion` active at attempt time.

---

## SECTION 29 — MANDATORY REJECTION RULES

Content is IMMEDIATELY REJECTED if it violates any of these rules:

1. Provenance is fabricated or source URL is invented.
2. Company attribution is unsupported by Tier-1 evidence.
3. Technical claims contradict the JLS, JVMS, or OpenJDK implementation.
4. Material contains active NDA/proprietary test bank questions.
5. Code fails to compile or demonstrates a different behavior than claimed.
6. Code comments merely restate syntax without explaining mechanics or trade-offs.
7. Distractors are nonsensical jokes rather than educational misconceptions.
8. Russian translation alters the underlying Java technical meaning.

---

## SECTION 30 — PIPELINE AUTOMATION BOUNDARIES

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                              AUTOMATION BOUNDARY RULES                                 │
├──────────────────────────────────────────┬─────────────────────────────────────────────┤
│ 🟢 FULLY AUTOMATED TASKS                 │ 🔴 REQUIRES HUMAN EDITORIAL SIGN-OFF        │
├──────────────────────────────────────────┼─────────────────────────────────────────────┤
│ - Raw URL normalization & SHA-256 hash   │ - Company attribution approval              │
│ - Code formatting & syntax checking      │ - Provenance classification finalization    │
│ - Schema validation against DATA_MODEL   │ - Technical accuracy vs JLS/JVMS specs      │
│ - Initial draft translation (EN -> RU)   │ - Concurrency & performance claim auditing  │
│ - Broken link & reference checks         │ - Final publication to production release   │
└──────────────────────────────────────────┴─────────────────────────────────────────────┘
```

---

## SECTION 31 — OOP MODULE PRODUCTION SEQUENCE

The Object-Oriented Programming module content is built in 36 sequential topic packages:

```
1. Intro to OOP ──► 2. Classes & Objects ──► 3. State, Behavior & Identity ──► 4. Encapsulation
──► 5. Access Modifiers ──► 6. Constructors ──► 7. Abstraction ──► 8. Interfaces
──► 9. Abstract Classes ──► 10. Inheritance ──► 11. Overloading ──► 12. Overriding
──► 13. Polymorphism ──► 14. Dynamic Dispatch ──► 15. Casting ──► 16. Composition vs Inheritance
──► 17. Association ──► 18. Coupling & Cohesion ──► 19. Object Class ──► 20. equals/hashCode
──► 21. toString ──► 22. Immutability ──► 23. SOLID ──► 24. Dependency Injection
──► 25. Object Creation ──► 26. Strategy ──► 27. Factory ──► 28. Builder ──► 29. Template Method
──► 30. Observer ──► 31. Decorator ──► 32. Anti-Patterns ──► 33. Domain Modeling
──► 34. API Contracts ──► 35. Legacy Refactoring ──► 36. Senior OOP Trade-offs
```

---

## SECTION 32 — FIRST VERTICAL SLICE PRODUCTION CHECKLIST

### Target Topic: `top_oop_05` (Encapsulation & Information Hiding)
### Target Mission: `mis_bank_account_invariants` (Protecting BankAccount Invariants)

```
[ ] Step 1 : Raw source collection for Encapsulation interview questions.
[ ] Step 2 : Provenance classification & Tier 3 JLS verification (JLS 8.3, JLS 8.8).
[ ] Step 3 : Author TheoryArticle covering state invariants, access boundaries, & getters/setters trap.
[ ] Step 4 : Construct 3 TheoryCheckpoints for concept retrieval.
[ ] Step 5 : Build Memory Map Visualization schema showing stack reference & heap encapsulation boundary.
[ ] Step 6 : Create Question Code Artifact (broken public field BankAccount).
[ ] Step 7 : Create Corrected Solution Artifact (immutable currency, long cents, invariant validation).
[ ] Step 8 : Build Guided FixBuilder challenge with prepared invariant checks.
[ ] Step 9 : Build Applied BugHunt challenge identifying floating-point & setter vulnerability.
[ ] Step 10: Build InterviewAnswer challenge with 3-tier verbal delivery script.
[ ] Step 11: Author 4-level progressive hints for all challenges.
[ ] Step 12: Extract MistakePattern (ERR_MUTABLE_HASHCODE_KEY / ERR_SETTER_INVARIANT_BYPASS).
[ ] Step 13: Execute English-to-Russian technical translation and glossary audit.
[ ] Step 14: Run all Six Quality Gates and generate internal Audit Report.
```

---

## SECTION 33 — PIPELINE OUTPUT CONTRACT & MANIFEST STRUCTURE

Every completed Topic package generates a standardized directory manifest layout:

```text
src/data/modules/oop/
  module.json
  topics/
    encapsulation/
      topic.json
      concepts.json
      theory.json
      missions.json
      challenges.json
      interview-questions.json
      code-artifacts.json
      sources.json
      mistake-patterns.json
      manifest.json
```

---

## SECTION 34 — INTERNAL AUDIT REPORT SCHEMA

```ts
export interface PipelineAuditReport {
  readonly topicId: string;
  readonly contentVersion: string;
  readonly canonicalQuestionCount: number;
  readonly practiceVariationCount: number;
  readonly sourceTierDistribution: Record<"TIER_1" | "TIER_2" | "TIER_3" | "TIER_4", number>;
  readonly verificationStatusDistribution: Record<VerificationStatus, number>;
  readonly qualityGatesPassed: boolean;
  readonly openJDKCompilationSuccess: boolean;
  readonly missingTranslationsCount: number;
  readonly auditedBy: readonly string[];
  readonly timestamp: string;
}
```

---

## SECTION 35 — CROSS-DOCUMENT CONSISTENCY MATRIX

This pipeline specification explicitly maintains 100% alignment with prior authoritative specs:

* **`PROJECT_VISION.md`:** Enforces real enterprise questions, forbids AI synthetic questions, targets Senior Java Backend Engineers at Tier-1 companies.
* **`LEARNING_ENGINE.md`:** Implements Problem-First learning, 6 learning modes, 11-step mission flow, Knowledge Sidebar integration, and career-calibrated difficulty.
* **`DATA_MODEL.md`:** Maps directly to `InterviewQuestion`, `Source`, `SourceReference`, `CodeArtifact`, `Challenge`, `Mission`, `TheoryArticle`, and `MistakePattern` entities and enum contracts.

---

## SECTION 36 — OPEN DECISIONS & SAFE DEFAULTS

| Open Decision | Recommended Safe Default |
| :--- | :--- |
| **Research Automation** | Use manual human-in-the-loop research for initial MVP; script URL ingest later. |
| **Raw Excerpt Storage** | Store normalized excerpts locally in Git/JSON; omit raw HTML dumps. |
| **Book Citations** | Store book title, author, and edition in `Source`; omit direct long quotes. |
| **Code Compilation** | Run local OpenJDK 17/21 `javac` validation scripts during content build. |
| **Manifest Format** | Store content packages as modular TypeScript/JSON files inside `src/data/`. |

---

```
[ END OF CONTENT PIPELINE SPECIFICATION DOCUMENT ]
```
