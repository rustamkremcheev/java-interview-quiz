# QUESTION SOURCES SPECIFICATION: DISCOVERY, CITATION, PROVENANCE, & TRUST POLICY

---

| Metadata | Details |
| :--- | :--- |
| **Document Status** | Approved / Authoritative Specification |
| **Document Version** | 1.0.0 |
| **Target Audience** | Principal Technical Researchers, Senior Java Interviewers, Source Verification Editors, Staff Java Engineers, Technical Content Librarians |
| **Authors** | Principal Technical Researcher, Source Verification Editor, Staff Java Architect |
| **Primary Domain** | Source Policy, Provenance Trust Modeling, Company Attribution Rules, Copyright Compliance, Technical Authority Verification |
| **Effective Date** | July 2026 |

---

## EXECUTIVE SUMMARY & SPECIFICATION AUTHORITY

This document establishes the binding operational policy for discovering, evaluating, citing, ranking, and using public interview questions, company reports, technical specifications, and educational book sources for the Senior Java Technical Interview Preparation Platform.

### Rule of Precedence
This document is the single source of truth for all source acquisition, reliability scoring, company attribution, and copyright-safe paraphrasing rules. No content research lead, content engineer, or AI subagent may ingest or cite a source in a manner that conflicts with this document. This specification strictly extends `PROJECT_VISION.md`, `LEARNING_ENGINE.md`, `DATA_MODEL.md`, and `CONTENT_PIPELINE.md`.

---

## SECTION 1 — PURPOSE & EVIDENTIARY SEPARATION

To eliminate ambiguity and prevent false claims, content research MUST distinguish between five separate evidentiary claims requiring separate evidence:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                              THE FIVE EVIDENTIARY CLAIMS                               │
├───────────────────────────────┬────────────────────────────────────────────────────────┤
│ Evidentiary Claim             │ Required Evidence Authority                            │
├───────────────────────────────┼────────────────────────────────────────────────────────┤
│ 1. Public Report Proof        │ Tier-1 Firsthand Report (Glassdoor, LeetCode, Reddit)  │
│ 2. Technical Answer Correctness│ Tier-3 Authority (JLS, JVMS, Oracle JDK Docs, OpenJDK) │
│ 3. Specific Company Linkage   │ Explicit public report naming the company & context    │
│ 4. Exact Wording Verification │ Direct compliant quotation in public firsthand source  │
│ 5. Common Senior Topic Proof  │ Multi-source repetition across Tier-1 and Tier-2 banks │
└───────────────────────────────┴────────────────────────────────────────────────────────┘
```

> **Core Principle:** A source that proves a question is a *Common Senior Java Topic* (e.g., Baeldung) DOES NOT prove it was asked at Citi. A candidate report that claims a question was asked at Citi DOES NOT prove the candidate's answer was technically correct according to the JLS. These dimensions are evaluated and recorded separately.

---

## SECTION 2 — SOURCE CATEGORIES

Content research classifies all ingested materials into six explicit source categories:

| Source Category | Primary Role in Platform | Supported Entities in DATA_MODEL |
| :--- | :--- | :--- |
| **Interview Provenance Sources** | Discovering authentic interview reports and questions | `Source`, `SourceReference`, `InterviewQuestion` |
| **Curated Preparation Sources** | Discovering standard formulations and missing coverage | `Source`, `SourceReference`, `TheoryArticle` |
| **Technical Authority Sources** | Verifying Java runtime behavior, spec rules, and APIs | `Source`, `SourceReference`, `TheoryArticle` |
| **Book & Long-Form Theory** | Building deep explanations, mental models, & patterns | `Source`, `SourceReference`, `TheorySection` |
| **Community Discussion** | Mining candidate misconceptions and interviewer traps | `Source`, `MistakePattern`, `Hint` |
| **Generated Practice Material**| Reinforcing concepts via AI practice variations | `InterviewQuestion` (`GENERATED_PRACTICE_VARIATION`) |

---

## SECTION 3 — SOURCE PRIORITY HIERARCHY

Content acquisition MUST adhere to the following strict 6-tier priority order:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                              SOURCE PRIORITY HIERARCHY                                 │
└────────────────────────────────────────────────────────────────────────────────────────┘

  [ Priority 1: Publicly Reported Citi / Citibank Interview Reports ]
         │
         ▼
  [ Priority 2: Publicly Reported Financial-Services Interviews (GS, JPM, MS, Bloomberg) ]
         │
         ▼
  [ Priority 3: Public Senior Java Experiences (Amazon, Google, Microsoft, Meta) ]
         │
         ▼
  [ Priority 4: Reputable Curated Java Banks (Baeldung, GeeksforGeeks, GitHub Banks) ]
         │
         ▼
  [ Priority 5: Official Java Spec-Derived & Design-Derived Questions (JLS / JVMS / Books) ]
         │
         ▼
  [ Priority 6: Generated Practice Variations (For Learning Reinforcement Only) ]
```

> **Mandatory Rule:** Priority 6 Generated Practice Variations MUST NEVER replace or overwrite canonical Priority 1–5 source questions.

---

## SECTION 4 — APPROVED PRIMARY SOURCES (TIER 1)

### 4.1 Glassdoor
* **Purpose:** Discovering candidate interview experiences, company-specific rounds, and role-specific question reports.
* **Strengths:** Direct company attribution, candidate role context, interview stage information.
* **Weaknesses:** Incomplete question wording, anonymous posts, potential date ambiguity.
* **Permitted Uses:** Extracting reported questions, company contexts, and candidate experience summaries.
* **Forbidden Uses:** Copying long passages verbatim; treating a single anonymous post as a universal company policy.
* **Default Reliability:** `MEDIUM` (Elevated to `HIGH` upon corroboration).
* **Supported Classifications:** `REAL_INTERVIEW_REPORT`.
* **Company Attribution:** Allowed ONLY when the Glassdoor report explicitly names the company and role.

### 4.2 interviewing.io
* **Purpose:** Analyzing real interview dynamics, interviewer evaluation criteria, and follow-up expectations.
* **Strengths:** High technical rigor, realistic interviewer trade-off expectations, strong follow-up insights.
* **Weaknesses:** Content includes mock interviews which differ slightly from hiring rounds.
* **Permitted Uses:** Extracting interview answer rubrics, verbal speech delivery structures, and follow-up paths.
* **Forbidden Uses:** Labeling mock interview observations as official company hiring questions.
* **Default Reliability:** `HIGH` for interview methodology; `MEDIUM` for specific company question provenance.
* **Supported Classifications:** `REAL_INTERVIEW_REPORT`, `REPEATED_INTERVIEW_PATTERN`.

### 4.3 LeetCode Discuss (Interview Experience Posts)
* **Purpose:** Mining detailed, multi-round technical interview posts and machine coding tasks.
* **Strengths:** Detailed technical descriptions, code reading context, explicit round sequences.
* **Weaknesses:** User-generated variance, occasional reposting of generic question lists.
* **Permitted Uses:** Extracting code-reading questions, senior design trade-offs, and follow-up scenarios.
* **Forbidden Uses:** Treating generic "Top 100" LeetCode study lists as firsthand interview reports.
* **Default Reliability:** `MEDIUM` (Elevated to `HIGH` with detailed code/context and corroboration).
* **Supported Classifications:** `REAL_INTERVIEW_REPORT`, `REPEATED_INTERVIEW_PATTERN`.

### 4.4 Reddit (r/java, r/ExperiencedDevs, r/cscareerquestions, r/leetcode)
* **Purpose:** Mining candidate experiences, interviewer perspectives, and real-world misconceptions.
* **Strengths:** Candid interviewer feedback, senior-level trade-off discussions, practical production traps.
* **Weaknesses:** Anonymity, sarcasm, unverifiable user credentials, deleted posts.
* **Permitted Uses:** Identifying common candidate mistakes (`MistakePattern`), interviewer probe style, and production trade-offs.
* **Forbidden Uses:** Using Reddit comments as a Tier-3 technical authority for Java behavior.
* **Default Reliability:** `LOW` to `MEDIUM` (Requires independent Tier-3 technical audit).
* **Supported Classifications:** `REAL_INTERVIEW_REPORT`, `REPEATED_INTERVIEW_PATTERN`.

---

## SECTION 5 — APPROVED CURATED SOURCES (TIER 2)

### 5.1 Baeldung
* **Purpose:** Identifying standard technical formulations, Java version comparisons, and topic coverage gaps.
* **Rules:** Does NOT prove company provenance. Must be paraphrased cleanly. Technical claims must be audited against JLS/JVMS.
* **Default Reliability:** `MEDIUM` to `HIGH` for curated technical explanations; `UNVERIFIED` for company provenance.
* **Supported Classifications:** `CURATED_INTERVIEW_BANK`.

### 5.2 GeeksforGeeks & InterviewBit
* **Purpose:** Filling initial topic coverage gaps and identifying basic/applied question variants.
* **Rules:** NEVER use as a sole technical authority for Senior/Staff answers. Must remove shallow duplicates.
* **Default Reliability:** `MEDIUM` or `LOW` (Requires mandatory Tier-3 technical verification).
* **Supported Classifications:** `CURATED_INTERVIEW_BANK`.

### 5.3 GitHub Repositories (Curated Study Collections)
* **Purpose:** Sourcing open-source study patterns, design pattern implementations, and community code examples.
* **Rules:** Capture repository owner, URL, and license in metadata. Inspect commit activity; reject abandoned repos with outdated Java 6/8 code. Respect open-source licenses.
* **Default Reliability:** Varies by repository; evaluated individually.

---

## SECTION 6 — OFFICIAL TECHNICAL AUTHORITIES (TIER 3)

The following authorities serve as the **ABSOLUTE SINGLE SOURCE OF TRUTH** for technical verification:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                              TIER 3 TECHNICAL AUTHORITIES                              │
├───────────────────────────────┬────────────────────────────────────────────────────────┤
│ Specification Authority       │ Technical Domain Responsibility                        │
├───────────────────────────────┼────────────────────────────────────────────────────────┤
│ Java Language Spec (JLS)      │ Language syntax, overloading/overriding rules, JMM     │
│ JVM Specification (JVMS)      │ Bytecode instructions, class loading, stack frames     │
│ Oracle Java API Javadocs      │ Standard library contracts (`java.util`, `java.concurrent`)│
│ OpenJDK Source Code           │ HotSpot C2 compiler, GC algorithms, collection internals│
│ JDK Enhancement Proposals(JEP)│ JDK 17/21 features (Records, Virtual Threads, Pattern) │
└───────────────────────────────┴────────────────────────────────────────────────────────┘
```

> **Verification Rule:** When a candidate report or blog article contradicts the JLS or JVMS, the Tier 3 specification ALWAYS takes precedence. The platform corrects the error and explains the spec rule.

---

## SECTION 7 — BOOK SOURCES (TIER 4)

Approved books are used exclusively for building theory, design trade-offs, and mental models:

* ***Effective Java* (Joshua Bloch):** API contract design, immutability, generics, defensive copying, `equals`/`hashCode`.
* ***Design Patterns: Elements of Reusable Object-Oriented Software* (Gamma et al. - GoF):** Creational, structural, and behavioral patterns.
* ***Clean Architecture & Clean Code* (Robert C. Martin):** SOLID principles, coupling, cohesion, boundary design.
* ***Head First Object-Oriented Analysis & Design* (McLaughlin et al.):** Domain modeling, encapsulation boundaries.

### Book Usage Rules:
1. Do NOT copy long passages or full chapters. Paraphrase concepts concisely into structured `TheorySection` blocks.
2. Modernize legacy Java 5/8 book examples to modern Java 17/21 idiom (e.g., replacing anonymous classes with Lambdas/Records).
3. Exercises derived from books must use `provenanceClassification === "BOOK_DERIVED_EXERCISE"`.

---

## SECTION 8 — RESTRICTED SOURCES

| Source Platform | Usage Conditions & Restrictions | Default Reliability |
| :--- | :--- | :--- |
| **Medium** | Permitted ONLY manually when author is a verified engineer and public. Prohibited from automated ingest. | `LOW` to `MEDIUM` |
| **Blind** | Permitted ONLY when publicly accessible without login. Company claims require corroboration. | `LOW` |
| **YouTube** | Permitted ONLY when public, author is identified, and timestamps are recorded. Video titles are NOT evidence. | `LOW` to `MEDIUM` |
| **Stack Overflow**| Permitted ONLY for mining technical misconceptions and historical implementation edge cases. | `MEDIUM` |

---

## SECTION 9 — PROHIBITED SOURCES & MANDATORY REJECTION

Content from the following sources is **STRICTLY PROHIBITED AND REJECTED ON INGEST**:

1. ❌ Leaked proprietary assessment packets or NDA-protected active test keys (e.g., active HackerRank, Coderbyte, or Codility test banks).
2. ❌ Stolen recruiter interview packets or internal private company documents.
3. ❌ Private Slack, Discord, or Telegram chat logs.
4. ❌ Paywalled materials requiring illicit access or pirated book PDFs.
5. ❌ AI-generated web pages or content farm blogs lacking identifiable human technical authorship.
6. ❌ Invented URLs or fabricated citation sources.

---

## SECTION 10 — SEARCH QUERY STRATEGY

Research leads execute standardized search templates to locate authentic material:

```
  COMPANY-SPECIFIC TEMPLATES:
  - "[company] Senior Java interview experience"
  - "[company] Java backend interview questions Glassdoor"
  - "[company] OOP Java low latency interview LeetCode"

  TOPIC-SPECIFIC TEMPLATES:
  - "Java encapsulation senior interview question"
  - "equals hashCode inheritance interview question"
  - "composition vs inheritance Java production interview"

  FINANCIAL-SERVICES TEMPLATES:
  - "Senior Java interview investment bank"
  - "Java low latency memory model interview Citi"
  - "Goldman Sachs Java multithreading interview experience"
```

---

## SECTION 11 — SOURCE METADATA REQUIREMENTS

Every ingested `Source` entity MUST populate the following metadata fields:

```ts
export interface SourceMetadata {
  readonly sourceId: string; // e.g., "src_glassdoor_citi_2026_01"
  readonly platform: string; // "Glassdoor"
  readonly sourceType: "FIRSTHAND_REPORT" | "CURATED_BANK" | "TECHNICAL_SPEC" | "BOOK";
  readonly pageTitle: string;
  readonly url?: string;
  readonly authorOrReporter?: string;
  readonly company?: string;
  readonly role?: string;
  readonly interviewStage?: string;
  readonly reportedDate?: string;
  readonly accessedDate: string; // ISO 8601
  readonly isPubliclyAccessible: boolean;
  readonly reliability: ReliabilityLevel;
  readonly contentFingerprint: string; // SHA-256
}
```

---

## SECTION 12 — SOURCE REFERENCE RELATIONSHIPS

Relationships between content entities and sources use nine explicit relationship types:

```ts
export type SourceRelationshipType =
  | "DIRECT_REPORT"             // Question directly reported in firsthand source
  | "SUPPORTING_REPORT"         // Secondary source corroborating question
  | "REPEATED_PATTERN_SUPPORT"  // Multi-source corroboration for pattern
  | "TECHNICAL_VERIFICATION"    // JLS/JVMS section verifying answer
  | "BOOK_THEORY_SUPPORT"       // Effective Java item supporting theory
  | "IMPLEMENTATION_REFERENCE"  // OpenJDK source line reference
  | "FOLLOW_UP_DERIVATION"      // Source for interviewer follow-up question
  | "CONTRADICTING_SOURCE"      // Source recording conflicting candidate report
  | "HISTORICAL_CONTEXT";       // Historical JDK behavior reference
```

---

## SECTION 13 — MULTI-SOURCE CORROBORATION MODEL

A question elevates from `CURATED_INTERVIEW_BANK` to `REPEATED_INTERVIEW_PATTERN` ONLY when:
1. Sourced from at least **two independent Tier-1 or Tier-2 sources**.
2. Independent analysis confirms the sources did NOT copy from each other (checking for distinct wording, separate dates, and different code structures).
3. The underlying technical core and expected answer overlap completely.

---

## SECTION 14 — COPYRIGHT-SAFE PARAPHRASING & FAIR USE

To maintain 100% legal compliance and respect intellectual property:
* **Factual Technical Ideas:** Java runtime mechanics, memory specifications, and API rules are uncopyrightable facts and may be explained freely.
* **Expressive Wording:** Original phrasing from blogs or candidate posts MUST BE PARAPHRASED into clean, professional technical English.
* **Code Reconstruction:** Code examples must be reconstructed as clean, original JDK 17/21 code snippets demonstrating the underlying concept.
* **Quotations:** Brief quotations are permitted ONLY when analyzing a specific candidate wording choice, accompanied by clear attribution.

---

## SECTION 15 — COMPANY-SPECIFIC EVIDENCE STAGES

UI company badges are governed by a 5-stage badge status:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                              COMPANY BADGE STATUS STAGES                               │
├───────────────────────────────┬────────────────────────────────────────────────────────┤
│ Badge Status                  │ Permitted UI Rendering                                 │
├───────────────────────────────┼────────────────────────────────────────────────────────┤
│ CONFIRMED_PUBLIC_REPORT       │ 🟢 Prominent Company Badge (e.g., "Citi Interview Log")│
│ MULTIPLE_PUBLIC_REPORTS       │ 🟢 Verified Enterprise Badge + Company Name           │
│ FINANCIAL_SERVICES_PATTERN    │ 🟡 Generic Category Badge ("Financial Services Pattern")│
│ UNVERIFIED_COMPANY_CONTEXT    │ ⚪ No Company Badge (Generic Senior Question Label)   │
│ NO_COMPANY_ATTRIBUTION        │ ⚪ No Company Badge                                    │
└───────────────────────────────┴────────────────────────────────────────────────────────┘
```

---

## SECTION 16 — SOURCE CONFLICT RESOLUTION PROTOCOL

When sources conflict, authors must execute the **Conflict Resolution Protocol**:

```
  CONFLICT SCENARIO: Candidate Glassdoor report claims `final` methods increase memory footprint.
                    JLS 8.4.3.3 and OpenJDK HotSpot specs state `final` prevents overriding 
                    and enables aggressive C2 inlining, reducing runtime call stack overhead.
                                      │
                                      ▼ [ RESOLUTION PROTOCOL ]
                                      │
  ACTION: 1. Prefer Tier-3 JLS/OpenJDK Authority for the technical answer.
          2. Document the candidate's misconception in a `MistakePattern` entity.
          3. Include a "Common Interview Misconception" callout box in the Theory Article.
```

---

## SECTION 17 — LEARNER-FACING SOURCE DISPLAY

In the candidate UI, source provenance is presented gracefully without cluttering the active challenge interface:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ CHALLENGE WORKSPACE                                                                    │
│ [ Mission: Protecting BankAccount Invariants ]                                         │
│                                                                                        │
│ ℹ️ PROVENANCE INFO (Click to Expand)                                                    │
│ ├─ Classification : Verified Senior Interview Pattern                                  │
│ ├─ Enterprise Context: Reported in Public Financial-Services Technical Rounds          │
│ ├─ Tech Authority    : Java Language Specification (JLS 8.3.1 - Field Access Control) │
│ └─ Reliable Source   : [ View Oracle Javadoc Contract 🔗 ]                             │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## SECTION 18 — SOURCE RESEARCH CHECKLIST

Before approving any source for ingestion, research leads complete a 16-point checklist:

- [ ] 1. Is the source document publicly accessible?
- [ ] 2. Is the source URL valid and stable?
- [ ] 3. Is the report firsthand or clearly cited?
- [ ] 4. Is the full question statement visible (not just a snippet)?
- [ ] 5. Is the company explicit (if company badge requested)?
- [ ] 6. Is the developer role or seniority specified?
- [ ] 7. Is the publication or report date recorded?
- [ ] 8. Is the material free from copied duplicate text?
- [ ] 9. Is the source free from NDA / test leak materials?
- [ ] 10. Does the item add distinct value to the Knowledge Graph?
- [ ] 11. Has the technical claim been verified against JLS/JVMS?
- [ ] 12. Is the Java version context identified (JDK 17/21)?
- [ ] 13. Has the text been paraphrased to ensure copyright safety?
- [ ] 14. Is the correct `ProvenanceClassification` assigned?
- [ ] 15. Are all mandatory metadata fields populated?
- [ ] 16. Has the item passed the Source Quality Gate?

---

## SECTION 19 — HYPOTHETICAL AUDIT EVALUATION EXAMPLES

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                              HYPOTHETICAL AUDIT EVALUATIONS                            │
├──────────────────────────────┬───────────────────────────────┬─────────────────────────┤
│ Source Case                  │ Assigned Provenance & Status  │ Permitted UI Rendering  │
├──────────────────────────────┼───────────────────────────────┼─────────────────────────┤
│ Glassdoor Citi Senior Log    │ REAL_INTERVIEW_REPORT         │ "Citi Interview Log"    │
│                              │ (Status: SOURCE_CONFIRMED)    │ (Company Badge Allowed) │
├──────────────────────────────┼───────────────────────────────┼─────────────────────────┤
│ Baeldung HashMap Deep-Dive   │ CURATED_INTERVIEW_BANK        │ "Curated Technical Q"   │
│                              │ (Status: TECHNICALLY_VERIFIED)│ (No Company Badge)      │
├──────────────────────────────┼───────────────────────────────┼─────────────────────────┤
│ Reddit r/java Discussion     │ REPEATED_INTERVIEW_PATTERN    │ "Financial Services Q"  │
│                              │ (Status: MULTI_SOURCE_CONF)   │ (Category Badge Only)   │
├──────────────────────────────┼───────────────────────────────┼─────────────────────────┤
│ Effective Java Item 18       │ BOOK_DERIVED_EXERCISE         │ "Effective Java Pattern"│
│                              │ (Status: TECHNICALLY_VERIFIED)│ (Book Reference Badge)  │
└──────────────────────────────┴───────────────────────────────┴─────────────────────────┘
```

---

## SECTION 20 — INITIAL OOP SOURCE PLAN

Research research plans are established for the core OOP module topics:

1. **Encapsulation (`top_oop_05`):** Target financial domain modeling, BankAccount invariant protection, public mutable field risks, and defensive copying.
2. **Inheritance (`top_oop_10`):** Target fragile base class problems, constructor execution order, and method overriding exception rules.
3. **Polymorphism (`top_oop_13`):** Target dynamic dispatch, `invokevirtual` vs `invokeinterface`, static method hiding, and covariant return types.
4. **Composition vs Inheritance (`top_oop_16`):** Target wrapper classes, forwarding methods, decorator pattern trade-offs, and coupling metrics.
5. **equals() & hashCode() (`top_oop_20`):** Target HashMap key mutability bugs, symmetry/transitivity breaks in inheritance, and Record auto-generated contracts.
6. **Immutability (`top_oop_22`):** Target custom immutable class construction, final fields, defensive copying of collections, and Java 17 Records.
7. **SOLID Principles (`top_oop_23`):** Target Liskov Substitution violations, Interface Segregation in payment gateways, and Dependency Inversion via interfaces.

---

## SECTION 21 — OPEN DECISIONS & PROPOSED DATA_MODEL AMENDMENTS

### 21.1 Safe Defaults for Open Decisions
* **Archived Copies:** Use Wayback Machine / archived URLs when primary links break, recording `archivedUrl` in `SourceMetadata`.
* **Script vs Manual Research:** Use human-in-the-loop manual extraction for initial seed packages; automate URL indexing in Phase 2.
* **Deleted Reddit Posts:** Retain technical question text if verified against JLS, but demote `provenanceClassification` to `CURATED_INTERVIEW_BANK`.

### 21.2 Proposed Future DATA_MODEL Amendments
1. Add `archivedUrl?: string` to `Source` entity.
2. Add `companyBadgeState: CompanyBadgeState` enum to `InterviewQuestion` entity.

---

```
[ END OF QUESTION SOURCES SPECIFICATION DOCUMENT ]
```
