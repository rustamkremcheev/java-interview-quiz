# PRODUCT REQUIREMENTS SPECIFICATION: USER EXPERIENCE, UI FLOWS, & FUNCTIONAL ACCEPTANCE CRITERIA

---

| Metadata | Details |
| :--- | :--- |
| **Document Status** | Approved / Authoritative Specification |
| **Document Version** | 1.0.0 |
| **Target Audience** | Principal Product Managers, Senior UX/UI Designers, Staff Frontend Engineers, Accessibility Specialists, QA Leads |
| **Authors** | Principal Product Manager, Senior Product Designer, Staff Frontend Engineer, Learning Experience Architect |
| **Primary Domain** | User Experience, Information Architecture, Screen Behaviors, Responsive Layouts, Accessibility, Acceptance Criteria |
| **Effective Date** | July 2026 |

---

## EXECUTIVE SUMMARY & SPECIFICATION AUTHORITY

This document establishes the binding product requirements governing all user interfaces, screen layouts, navigation structures, user interactions, responsive behaviors, accessibility standards, and functional acceptance criteria for the Senior Java Technical Interview Preparation Platform.

### Rule of Precedence
This document is the single source of truth for the application's user experience and frontend feature behaviors. Any UI implementation, screen component, user interaction flow, or design choice that conflicts with this document **is invalid** unless explicitly overridden by an official document amendment. This specification strictly conforms to `PROJECT_VISION.md`, `LEARNING_ENGINE.md`, `DATA_MODEL.md`, `CONTENT_PIPELINE.md`, and `QUESTION_SOURCES.md`.

---

## SECTION 1 — PRODUCT GOALS & SUCCESS METRICS

The platform satisfies ten core product goals, evaluated against explicit, measurable success criteria:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                              PRODUCT GOALS & MEASURABLE CRITERIA                       │
├───────────────────────────────────────────────┬────────────────────────────────────────┤
│ Product Goal                                  │ Measurable Success Criteria            │
├───────────────────────────────────────────────┼────────────────────────────────────────┤
│ 1. Active Mental Modeling over Memorization   │ ≥ 75% first-attempt success on delayed │
│                                               │ review challenges without hints        │
│ 2. Strict 7-Tier Hierarchical Structure       │ 100% of learning paths navigate via    │
│                                               │ Module -> Topic -> Mission -> Challenge│
│ 3. Problem-First Pedagogical Flow             │ 100% of Missions begin with a concrete  │
│                                               │ production failure scenario            │
│ 4. Contextual Theory via Knowledge Sidebar    │ Sidebar opens contextually without     │
│                                               │ resetting active challenge state       │
│ 5. Graph & Tag Connected Navigation           │ Zero disconnected questions; 100% of   │
│                                               │ items link to Concepts and #tags       │
│ 6. Spaced Repetition & Mistake Remediation    │ Automatic scheduling of reviews for    │
│                                               │ confident mistakes within 24 hours     │
│ 7. Authenticated Interview Provenance Display │ 100% of questions show verified source │
│                                               │ provenance and company badges          │
│ 8. Offline Local-First Functionality          │ 100% feature availability without      │
│                                               │ network connection or backend calls    │
│ 9. Universal Desktop & Mobile Ergonomics      │ 0% horizontal page overflow; touch-    │
│                                               │ native alternatives for all drag/drop  │
│ 10. Modular Domain Architecture Expansion     │ Modular registry supporting new topics │
│                                               │ without UI application rebuilds        │
└───────────────────────────────────────────────┴────────────────────────────────────────┘
```

---

## SECTION 2 — NON-GOALS (OUT OF INITIAL MVP SCOPE)

To maintain absolute focus on core learning value, the following features are explicitly **OUT OF SCOPE for the initial MVP release**:

* ❌ Remote backend server, user authentication, or cloud account registration.
* ❌ Multi-device cloud synchronization or remote state syncing.
* ❌ Social networks, public user profiles, friend lists, or public leaderboards.
* ❌ Monetization, paywalls, active subscriptions, or in-app payment processing.
* ❌ Live human tutoring, real-time audio AI interviewers, or third-party paid AI API dependencies.
* ❌ In-browser Java JVM compiler execution service or full IDE runtime.
* ❌ Native mobile app builds (iOS App Store / Android APK) - PWA is the sole mobile delivery target.
* ❌ Complete curriculum coverage for all 14 modules in release 1.0 (OOP is the primary launch module).

---

## SECTION 3 — PRIMARY USER PERSONAS

The platform interface and interaction models are engineered to serve four core user personas:

### 3.1 Experienced Senior Java Engineer (Primary Persona)
* **Needs:** Authentic Tier-1 enterprise interview questions, senior follow-up trade-offs, rapid revision of weak topics, bytecode/JVM memory model explanations.
* **UI Focus:** Keyboard shortcuts, high content density, instant access to annotated code trade-offs, collapsible sidebar drawer.

### 3.2 Mid-Level Java Backend Developer
* **Needs:** Clear mental models, structured theory, guided puzzle breakdowns, step-by-step transition to senior interview verbal delivery.
* **UI Focus:** Progressive hint system, 11-step mission flow, visual state diagrams, bilingual explanations.

### 3.3 Returning Learner (Revision Focus)
* **Needs:** One-click "Continue Learning", clear visibility of due reviews, weak concept highlights, mistake remediation queues.
* **UI Focus:** Dashboard control center, spaced-repetition review queue, mistake pattern analytics.

### 3.4 Mobile Reviewer (On-the-Go Study)
* **Needs:** Single-column layout, touch-friendly tap interactions, no horizontal overflow, zero hover dependencies, full offline PWA capabilities.
* **UI Focus:** Tap-based drag-and-drop alternatives, 44px touch targets, bottom sheets, clean high-contrast dark mode.

---

## SECTION 4 — INFORMATION ARCHITECTURE & NAVIGATION

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                              INFORMATION ARCHITECTURE MAP                              │
└────────────────────────────────────────────────────────────────────────────────────────┘

  [ DASHBOARD ] (Control Center: `/`)
       │
       ├─► [ MODULES GRID ] (`/modules`)
       │        │
       │        └─► [ MODULE PAGE ] (`/modules/:moduleSlug`)
       │                 │
       │                 └─► [ TOPIC PAGE ] (`/modules/:moduleSlug/topics/:topicSlug`)
       │                          │
       │                          └─► [ MISSION WORKSPACE ] (`/missions/:missionSlug`)
       │
       ├─► [ SPACED REVIEW ] (`/review`)
       ├─► [ PROGRESS & READINESS ] (`/progress`)
       └─► [ SYSTEM SETTINGS ] (`/settings`)
```

### 4.1 Global Navigation Framework
* **Desktop Layout:** Fixed left sidebar navigation rail showing product branding, active language indicator, primary navigation links (Dashboard, Modules, Review, Progress, Settings), streak counter, and total XP.
* **Mobile Layout:** Fixed bottom navigation bar displaying primary icons (Home, Modules, Review, Progress, Settings) with 44px minimum touch target height.
* **Route Compatibility:** All client-side routes MUST render deterministically under static hosting without relying on server-side URL rewrites.

---

## SECTION 5 — DASHBOARD SPECIFICATION (`/`)

The Dashboard serves as the candidate's operational command center.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ DASHBOARD                                                 [ EN | RU | 🌐 BILINGUAL ]   │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 🔥 14 Day Streak  │  ⚡ 2,450 XP  │  🏆 Level 8 Senior Architect                       │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 🚀 CONTINUE LEARNING                                                                   │
│ Active: Object-Oriented Programming ──► Encapsulation ──► BankAccount Invariants      │
│ Progress: [████████████████████░░░░░░░░░░] 65% (Stage 7: Interactive Practice)          │
│                                                              [ CONTINUE MISSION ──► ]  │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ ⏰ REVIEWS DUE NOW (3 Items Due Today)                       [ START REVIEW SESSION ]  │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 🎯 INTERVIEW READINESS SCORE: 78% (SENIOR BENCHMARK)                                   │
│ Knowledge: 85%  │  Application: 80%  │  Debugging: 70%  │  Verbal Trade-offs: 75%     │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ ⚠️ WEAK CONCEPTS NEEDING REVISION                                                      │
│ • #equals-hashcode-contract (Mastery: 45%)  ──► [ Remedy via Mission ]                │
│ • #volatile-memory-visibility (Mastery: 52%) ──► [ Remedy via Mission ]                │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

### 5.1 Dashboard Acceptance Requirements:
1. Display active mission progress card with single-click "Continue Mission" CTA restoring exact workspace state.
2. Render "Reviews Due" count prominently; if zero items due, display a positive catch-up state message.
3. Render Interview Readiness radar metrics (Knowledge, Application, Debugging, Verbal Trade-offs).
4. List top 3 weak concepts ranked by lowest mastery score and highest mistake occurrence count.

---

## SECTION 6 — MODULES GRID PAGE SPECIFICATION (`/modules`)

The Modules Grid serves as the primary domain entry point and **MUST be rendered as a responsive card grid, NEVER as a flat list**.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ MODULES DIRECTORY                                                                      │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ ┌──────────────────────────────────────┐  ┌──────────────────────────────────────┐ │
│ │ 🧱 OBJECT-ORIENTED PROGRAMMING      │  │ ⚡ JAVA CONCURRENCY & JMM            │ │
│ │ Master encapsulation, SOLID, polymorphism│ │ Master JMM, volatile, locks, Loom   │ │
│ │ ⏱️ 14.5 Hours │ 📚 37 Topics │ ❓ 85 Qs │ │ ⏱️ 18.0 Hours │ 📚 42 Topics │ ❓ 95 Qs │ │
│ │ Progress: [████████████░░░] 75%      │  │ Progress: [████░░░░░░░░░░░] 25%      │ │
│ │ STATUS: IN PROGRESS  [ CONTINUE ──► ]│  │ STATUS: IN PROGRESS  [ CONTINUE ──► ]│ │
│ └──────────────────────────────────────┘  └──────────────────────────────────────┘ │
│ ┌──────────────────────────────────────┐  ┌──────────────────────────────────────┐ │
│ │ ⚙️ JVM INTERNALS & GARBAGE COLLECTION│  │ 🌿 SPRING FRAMEWORK CORE             │ │
│ │ Metaspace, JIT compilation, ZGC      │  │ IoC container, AOP, Bean lifecycles  │ │
│ │ ⏱️ 16.0 Hours │ 📚 28 Topics │ ❓ 70 Qs │ │ ⏱️ 20.0 Hours │ 📚 35 Topics │ ❓ 80 Qs │ │
│ │ STATUS: COMING SOON  [ PREVIEW ]     │  │ STATUS: COMING SOON  [ PREVIEW ]     │ │
│ └──────────────────────────────────────┘  └──────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

### 6.1 Responsive Grid Layout Behavior:
* **Desktop ($\ge 1280\text{px}$):** 4 columns.
* **Laptop ($\ge 1024\text{px}$):** 3 columns.
* **Tablet ($\ge 768\text{px}$):** 2 columns.
* **Mobile ($< 768\text{px}$):** 1 column.

### 6.2 Module Card Data Contract:
Every card MUST display icon, title, description, difficulty range, estimated hours, topic count, interview question count, coding exercise count, progress bar, completion %, status tag (`IN_PROGRESS`, `MASTERED`, `COMING_SOON`), and action button.

---

## SECTION 7 — MODULE PAGE SPECIFICATION (`/modules/:moduleSlug`)

Displays all topic nodes within a selected module organized by prerequisite dependencies:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ BREADCRUMB: Modules ──► Object-Oriented Programming                                    │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ OBJECT-ORIENTED PROGRAMMING & CLEAN ARCHITECTURE                                       │
│ ⏱️ 14.5 Total Hours  │  📚 37 Canonical Topics  │  🏆 75% Module Completion              │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ TOPIC CLUSTERS                                                                         │
│ ┌────────────────────────────────────────────────────────────────────────────────────┐ │
│ │ 05. ENCAPSULATION & INFORMATION HIDING                            [ Tag: APPLIED ] │ │
│ │ Master state invariant protection, access boundaries, and defensive copying.       │ │
│ │ ⏱️ 45 Min  │  📚 1 Mission  │  ❓ 4 Interview Questions  │  Status: IN PROGRESS      │ │
│ │ Prerequisites: 03. State, Behavior, and Identity (COMPLETED)     [ START TOPIC ]   │ │
│ └────────────────────────────────────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## SECTION 8 — TOPIC PAGE SPECIFICATION (`/modules/:moduleSlug/topics/:topicSlug`)

Details the topic knowledge node and presents available learning Missions:

### Topic Page Elements:
1. **Header:** Title, short description, difficulty tier badge, estimated time, current mastery status.
2. **Learning Objectives:** Bulleted list of explicit conceptual goals.
3. **Prerequisite Map:** Visual badges showing required prior topics and their completion statuses.
4. **Verified Source Coverage:** Summary of Tier-1 and Tier-2 sources verifying questions in this topic.
5. **Mission Cards Grid:** Cards displaying available Missions, production scenarios, challenge counts, and "Start Mission" CTAs.

---

## SECTION 9 — MISSION WORKSPACE SPECIFICATION (`/missions/:missionSlug`)

The Mission Workspace is the primary 11-step learning interface.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ [ Exit ]  MISSION: Protecting BankAccount Invariants (Encapsulation)    [ 🌐 Bilingual ]│
├────────────────────────────────────────────────────────────────────────────────────────┤
│ STAGE STACK:                                                                           │
│ [1. Intro ✓] ──► [2. Problem ✓] ──► [3. Think ✓] ──► [4. Need Help ✓] ──► [5. Theory]  │
│ ──► [6. Visual] ──► [7. Practice] ──► [8. Interview Q] ──► [9. Answer] ──► [10. Debug]  │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ STAGE WORKSPACE AREA                                               │ KNOWLEDGE SIDEBAR │
│ (Presents active stage component: Problem / Theory / Code / Q)    │ (Collapsible)     │
│                                                                    │ [ 📖 Theory ]     │
│                                                                    │ [ ⚠️ Traps ]      │
│                                                                    │ [ 🔗 Tags ]       │
└────────────────────────────────────────────────────────────────────┴───────────────────┘
```

### Stage Execution & Exit Integrity:
* **Progress Auto-Save:** User actions, code edits, and selected options auto-save instantly to IndexedDB.
* **Non-Destructive Exit:** Clicking "Exit" returns the user to the Topic page, preserving their exact active stage and entered data without warning dialogs unless unsubmitted text exists.

---

## SECTION 10 — PROBLEM-FIRST INTRODUCTION STAGE

Every Mission begins with a concrete production failure scenario:

1. **Production Context:** Business domain background (e.g., *High-frequency payment processing engine*).
2. **System Symptoms:** Error stack trace, invalid state dump, or production incident metric.
3. **Think Yourself Diagnostic:** Prompt requiring the candidate to select or type their initial diagnostic hypothesis before viewing theory.
4. **No-Penalty Bridge:** A prominent "I Need Knowledge / Learn Theory" action that transitions to theory without deducting XP or progress score.

---

## SECTION 11 — THEORY & CHECKPOINTS STAGE

Theory is presented in structured `TheorySection` blocks followed by interactive **Theory Checkpoints**:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ THEORY: Encapsulation & State Invariant Protection                                     │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 📖 1. MOTIVATION: Why Encapsulation is NOT Getters and Setters                         │
│ Encapsulation is the enforcement of class invariants. Generating public setters for    │
│ all fields violates encapsulation by allowing external code to force arbitrary state... │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ ❓ THEORY CHECKPOINT 1 of 3 (Learning Check)                                            │
│ What is the primary purpose of class encapsulation?                                    │
│ ( ) A. To make all class fields private and generate public getters and setters.       │
│ (•) B. To protect class state invariants and enforce valid state transitions.          │
│                                                                    [ CHECK ANSWER ]    │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## SECTION 12 — COLLAPSIBLE KNOWLEDGE SIDEBAR SPECIFICATION

The Knowledge Sidebar is a context-aware drawer available across all workspace stages:

```
┌───────────────────────────────────────────────────┬────────────────────────────────────┐
│ MAIN WORKSPACE AREA                               │ KNOWLEDGE SIDEBAR (Drawer)   [ X ] │
│                                                   ├────────────────────────────────────┤
│ [ Active Coding Challenge or Problem ]            │ 📖 THEORY QUICK-REF                │
│                                                   │ Invariant protection requires      │
│                                                   │ validating state in constructors.  │
│                                                   ├────────────────────────────────────┤
│                                                   │ ⚠️ COMMON INTERVIEW TRAPS          │
│                                                   │ Setter Invariant Bypass Anti-Pattern│
│                                                   ├────────────────────────────────────┤
│                                                   │ 🔗 CANONICAL TAGS                  │
│                                                   │ [#encapsulation] [#invariants]     │
└───────────────────────────────────────────────────┴────────────────────────────────────┘
```

### Responsive Sidebar Behavior:
* **Desktop ($\ge 1024\text{px}$):** Sliding right split pane; reduces main workspace width without layout overlap.
* **Tablet / Mobile ($< 1024\text{px}$):** Full-height overlay drawer with backdrop dimming; closes via Swipe Right or [X] button.

---

## SECTION 13 — TAG INTERACTION ENGINE

Tags (e.g., `#encapsulation`, `#volatile`, `#happens-before`) act as ubiquitous navigation controls:

* **Click Action:** Clicking any tag opens the Knowledge Sidebar populated with the tag's canonical `Concept`, prerequisite nodes, related theory, and verified interview questions.
* **State Preservation:** Tag clicks MUST NEVER navigate the candidate away from an active challenge or reset unsubmitted code editor inputs.

---

## SECTION 14 — CHALLENGE EXPERIENCE & ANSWER LOCKING

All challenges enforce strict **Answer Locking**:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ CHALLENGE: Fix Invariant Bypass Vulnerability               [ Difficulty: SENIOR ]      │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 🔒 ANSWER LOCKED: Complete attempt to reveal annotated solution & speech script.        │
│                                                                                        │
│ CONFIDENCE EVALUATION (Required before submission):                                    │
│ [ ] I am Confident      [ ] I am Unsure      [ ] I am Guessing                         │
│                                                                                        │
│ 💡 HINTS: [ Hint 1: Directional Clue (-10 XP) ]              [ SUBMIT ATTEMPT ──► ]   │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

> **Mandatory Rule:** The correct solution, annotated code comments, and verbatim speech script MUST REMAIN HIDDEN until the user submits an explicit attempt.

---

## SECTION 15 — GUIDED CHALLENGES (PUZZLE ENGINE)

Guided challenges provide prepared puzzle pieces (Sequence Puzzles, Matching, Fix Builders).

### Mobile Touch Ergonomics (Drag-and-Drop Alternative):
* **Desktop:** Native HTML5 Drag and Drop.
* **Mobile / Touch Devices:** Single-tap selection model:
  1. Candidate taps a source puzzle piece (highlights item with blue ring).
  2. Candidate taps a target destination slot (moves item into slot).
  3. Reorder/Remove buttons provided for easy touch adjustments.

---

## SECTION 16 — APPLIED CHALLENGES (BUG HUNT ENGINE)

Applied challenges require candidates to inspect baseline code and diagnose production vulnerabilities:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ BUG HUNT: Identify the Encapsulation Failure                                           │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 1  public final class AccountPeriod {                                                  │
│ 2    private final Date startDate;                                                     │
│ 3    public AccountPeriod(Date startDate) {                                            │
│ 4 🎯   this.startDate = startDate; // ◄ Click line to flag vulnerability               │
│ 5    }                                                                                 │
│ 6  }                                                                                   │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ SELECTED LINES: Line 4 (Mutable Reference Storage)                [ SUBMIT DIAGNOSIS ] │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## SECTION 17 — INTERVIEW CHALLENGES (VERBAL DELIVERY ENGINE)

Interview challenges test independent explanation and trade-off articulation:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ INTERVIEW CHALLENGE: Explain Encapsulation to a Staff Architect                        │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ PROMPT: How do you explain the difference between encapsulation and data hiding to a     │
│ junior developer who claims getters/setters equal encapsulation?                        │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ VERBAL / TEXT RESPONSE AREA:                                                           │
│ [ Type your structured response (Elevator Pitch + Mechanics + Trade-offs)...         ] │
│ Word Count: 145 words  │  Timer: 02:15                                                 │
│                                                                                        │
│ CONFIDENCE: (•) Confident   ( ) Unsure   ( ) Guessing           [ SUBMIT ANSWER ──► ]  │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

### Post-Submission Evaluation Feedback:
After submission, the workspace displays:
1. **Concept Matching Breakdown:** Matched concepts (green), partially matched concepts (yellow), missing concepts (red).
2. **Verbatim Model Answer:** 3-tier speech script (*Elevator Pitch*, *Deep Mechanics*, *Trade-offs*).
3. **Senior Follow-Up Question:** Immediate follow-up scenario prompt simulating interviewer probing.

---

## SECTION 18 — PROGRESSIVE HINT SYSTEM

Hints are delivered across four explicit levels with transparent XP penalties:

```
  [ Hint 1: Directional Clue ]    ──► -10% XP Penalty (Points to general area)
  [ Hint 2: Concept Reminder ]    ──► -25% XP Penalty (Names relevant concept)
  [ Hint 3: Mechanism Clue ]      ──► -50% XP Penalty (Explains internal runtime logic)
  [ Hint 4: Near-Solution Clue ]  ──► -75% XP Penalty (Shows near-solution structure)
```

---

## SECTION 19 — EDUCATIONAL FEEDBACK EXPERIENCE

Feedback MUST BE immediate, constructive, and non-punitive:

* **Correct Attempt:** Green glass notification, XP animation, breakdown of matched concepts, prompt to view annotated solution.
* **Incorrect Attempt:** Amber/Red glass notification, identification of specific mistake pattern, links to relevant theory sections, option to retry or inspect hint.

---

## SECTION 20 — CODE PRESENTATION & DUAL DISPLAY MODES

All code viewers support instant toggle between **Clean Mode** and **Learning Comments Mode**:

```java
// [CLEAN MODE] Standard Production Code
public final class BankAccount {
    private final Currency currency;
    private long balanceInCents;
}

// [LEARNING COMMENTS MODE] Enriched Architectural Annotations
public final class BankAccount {
    // 💡 ANNOTATION [WHY THIS EXISTS]:
    // Currency is immutable in Java, making it safe for direct reference storage.
    private final Currency currency;

    // 💡 ANNOTATION [INTERVIEW TRAP & MECHANICS]:
    // Long cents eliminates floating-point representation errors inherent in double/float.
    private long balanceInCents;
}
```

---

## SECTION 21 — SOURCE CONTEXT UI SPECIFICATION

Verified provenance is displayed via a compact, expandable drawer below every challenge:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ ℹ️ PROVENANCE: Verified Senior Interview Pattern                 [ Expand Context 🔽 ] │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ • Platform Origin : Glassdoor Candidate Log (Reported for Senior Financial Developer)   │
│ • Company Badge   : Publicly Reported Citi Technical Round                             │
│ • Technical Authority: Java Language Specification (JLS 8.3 - Field Declarations)      │
│ • Specification   : [ View Oracle Javadoc Contract 🔗 ]                                │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## SECTION 22 — MISSION RESULTS PAGE SPECIFICATION

Upon completing a Mission, the user views their performance summary:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ MISSION COMPLETED: Protecting BankAccount Invariants                                  │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 🏆 Score: 92%  │  ⚡ XP Earned: +250  │  ⏱️ Time Spent: 18m  │  💡 Hints Used: 1        │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ CONCEPTS STRENGTHENED:                    WEAKNESSES IDENTIFIED:                       │
│ • #encapsulation (Mastery +15%)          • #defensive-copying (Scheduled for Review)   │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ NEXT ACTION:                                                                           │
│ [ CONTINUE TO NEXT MISSION: Inheritance vs Composition ──► ]                           │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## SECTION 23 — REFLECTION PROMPT

Before leaving Mission Results, candidates complete a 1-sentence qualitative reflection:
* **Prompt:** *"What production engineering rule will you apply in your daily code after this mission?"*
* **Behavior:** Non-graded input awarding +25 bonus XP upon submission; stored in `ReflectionNote` entity.

---

## SECTION 24 — SPACED REVIEW PAGE SPECIFICATION (`/review`)

Manages candidate revision queues based on spaced-repetition memory curves:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ SPACED REPETITION REVIEW QUEUE                                                         │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ ⏰ 3 ITEMS DUE NOW  │  📅 5 Items Due Today  │  ⚠️ 2 Confident Mistakes Needing Review│
├────────────────────────────────────────────────────────────────────────────────────────┤
│ RECOMMENDED REVIEW SESSION: ~12 Minutes (Mixed Topics)        [ START REVIEW SESSION ] │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## SECTION 25 — PROGRESS PAGE SPECIFICATION (`/progress`)

Comprehensive learning analytics control center displaying:
1. **Interview Readiness Breakdown:** Scores for Knowledge, Application, Debugging, Verbal Explanation, and Trade-offs.
2. **Concept Mastery Matrix:** Visual grid of all concepts color-coded by mastery state (`UNSEEN` to `MASTERED`).
3. **Confidence Calibration Matrix:** Compares user confidence against actual correctness accuracy to highlight over-confidence traps.

---

## SECTION 26 — SETTINGS PAGE & DATA MANAGEMENT (`/settings`)

Settings controls language, accessibility, themes, and data persistence:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ SYSTEM SETTINGS                                                                        │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ LANGUAGE MODE  : ( ) English   ( ) Russian   (•) Bilingual (EN + RU)                   │
│ ACCESSIBILITY  : [X] Reduced Motion   [ ] High Contrast   [X] Sound Effects            │
│ CODE COMMENTS  : ( ) Clean Code Mode   (•) Learning Comments Mode                      │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ DATA PERSISTENCE:                                                                      │
│ [ EXPORT PROGRESS (JSON) ]   [ IMPORT PROGRESS (JSON) ]   [ ⚠️ RESET ALL PROGRESS ]   │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

### Confirmation Modal for Reset Progress:
Resetting progress MUST trigger an in-app glassmorphic confirmation modal requiring the candidate to type `"RESET"` into an input field. Browser native `window.confirm()` dialogs are strictly prohibited.

---

## SECTION 27 — ONBOARDING WORKFLOW

First-time launch presents a streamlined 4-step onboarding flow:
1. **Mission Statement:** Explains "Understanding, Not Memorization."
2. **Problem-First Explanation:** Demonstrates how missions begin with production bugs.
3. **Language Selection:** Allows picking English, Russian, or Bilingual mode.
4. **Immediate Launch:** Single-click CTA starting the first OOP Mission (`mis_bank_account_invariants`).

---

## SECTION 28 — BILINGUAL LOCALIZATION BEHAVIOR

The interface seamlessly supports three language modes:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ BILINGUAL RENDERING (Mode: BILINGUAL)                                                  │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ What is the primary purpose of class encapsulation?                                    │
│ В чем заключаются главная цель инкапсуляции класса?                                    │
│                                                                                        │
│ 1  public final class BankAccount { // Java code remains untranslated                  │
│ 2    private long balanceInCents;                                                      │
│ 3  }                                                                                   │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

> **Localization Invariant:** Java code, bytecode instructions, JDK class names, method names, and package identifiers REMAIN UNTRANSLATED across all language modes.

---

## SECTION 29 — GLOBAL SEARCH SYSTEM

Global Search (activated via `/` or top nav input) indexes across Modules, Topics, Missions, Concepts, Tags, Theory Articles, Questions, and Code Snippets, rendering results grouped by category with keyboard arrow navigation.

---

## SECTION 30 & 31 — EMPTY & ERROR STATES

* **Empty States:** Every empty view (e.g., zero reviews due, zero weak concepts) displays an engaging illustration, clear positive message, and a recommended next action CTA.
* **Error States:** IndexedDB unavailability or corrupted data triggers a recovery screen offering automated database repair, JSON export backup, or safe fallback state without app crashes.

---

## SECTION 32 — OFFLINE & PWA REQUIREMENTS

The application registers a Service Worker caching all static bundled assets, curriculum JSON data, and IndexedDB stores, enabling 100% offline functionality. External web source links display an offline badge when disconnected.

---

## SECTION 33 — RESPONSIVE DESIGN CONSTRAINTS

* **Touch Target Size:** Minimum $44\times 44\text{px}$ for all interactive buttons, cards, and input controls.
* **Typography:** Minimum $16\text{px}$ body text on mobile viewports to prevent iOS auto-zoom behavior.
* **Zero Horizontal Overflow:** Page containers enforce `max-width: 100vw; overflow-x: hidden;`.

---

## SECTION 34 — ACCESSIBILITY (WCAG 2.1 AA)

1. **Keyboard Navigability:** 100% of interactive controls accessible via `Tab`, `Enter`, `Space`, and Arrow keys.
2. **Focus Indicators:** High-contrast $2\text{px}$ cyan focus rings on focused elements.
3. **Screen Reader Labels:** All icons and non-text controls include `aria-label` attributes.
4. **Color Independence:** Status indicators pair color with text labels and distinct icons.

---

## SECTION 35 — KEYBOARD SHORTCUTS

```
  [ / ]  ──► Focus Global Search
  [ K ]  ──► Toggle Knowledge Sidebar Drawer
  [ H ]  ──► Open Next Progressive Hint
  [ S ]  ──► Submit Active Challenge Attempt
  [ Esc] ──► Close Sidebar / Modal Overlay
```

---

## SECTION 36 — VISUAL STATUS SYSTEM

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ VISUAL STATUS INDICATOR MATRIX                                                         │
├─────────────────┬─────────────────┬───────────────────┬────────────────────────────────┤
│ Status          │ Icon Symbol     │ Color Accent      │ Accessible Text Label          │
├─────────────────┼─────────────────┼───────────────────┼────────────────────────────────┤
│ NOT_STARTED     │ ⚪ Circle       │ Slate Gray        │ "Not Started"                  │
│ LEARNING        │ 🔵 Pulsing Dot  │ Electric Blue     │ "In Learning Stage"            │
│ PRACTICING      │ 🟡 Gear         │ Amber Yellow      │ "In Practice Stage"            │
│ INTERVIEW_READY │ 🟢 Checkmark    │ Emerald Green     │ "Interview Ready"              │
│ MASTERED        │ 🏆 Trophy       │ Gold              │ "Mastered"                     │
│ LOCKED          │ 🔒 Padlock      │ Muted Gray        │ "Locked by Prerequisite"       │
└─────────────────┴─────────────────┴───────────────────┴────────────────────────────────┘
```

---

## SECTION 37 — PROFESSIONAL GAMIFICATION

Gamification elements (XP, Levels, Streaks) maintain technical professionalism:
* XP is awarded strictly for active learning milestones (correct attempts, completing missions, reviews).
* **No juvenile animations, no social pressure, no penalty for taking study breaks.**

---

## SECTION 38 — PRIVACY & DATA LOCALITY

All user progress, notes, attempts, and settings remain stored strictly inside the candidate's browser IndexedDB via Dexie.js. Zero telemetry or user analytics are transmitted externally.

---

## SECTION 39 — MVP RELEASE SCOPE

The 1.0 MVP release comprises:
* Complete Dashboard, Modules Grid, OOP Module Page, Topic Pages, and Mission Workspace.
* The first Encapsulation Topic (`top_oop_05`) and `mis_bank_account_invariants` Mission fully populated.
* Knowledge Sidebar, Spaced Review Queue, Progress Page, Settings Page, JSON Import/Export, and 100% Offline PWA functionality.

---

## SECTION 40 — FIRST VERTICAL SLICE ACCEPTANCE CRITERIA

### Topic: `top_oop_05` (Encapsulation) | Mission: `mis_bank_account_invariants`

```
GIVEN a candidate is on the Modules Grid page
WHEN they click the "Object-Oriented Programming" card
THEN they are navigated to the OOP Module page showing all 37 canonical topics.

GIVEN a candidate selects "05. Encapsulation & Information Hiding"
WHEN they click "Start Mission: Protecting BankAccount Invariants"
THEN the Mission Workspace opens to Stage 1 (Real Engineering Problem).

GIVEN the candidate is on Stage 1
WHEN they inspect the broken BankAccount code and click "Learn Theory"
THEN Stage 5 (Theory) opens and the Knowledge Sidebar populates contextually with #encapsulation.

GIVEN the candidate attempts Stage 7 (Interactive Practice FixBuilder)
WHEN they submit their code attempt with confidence set to "Confident"
THEN the answer unlocks, annotated code explanations appear, and +250 XP is awarded.
```

---

## SECTION 41 — FUNCTIONAL ACCEPTANCE CRITERIA (GIVEN / WHEN / THEN)

### Scenario 1: Answer Locking Verification
```
GIVEN a candidate is attempting a new Interview Challenge
WHEN they have not yet submitted an answer attempt
THEN the model answer script, annotated solution, and trade-off details remain strictly hidden.
```

### Scenario 2: Spaced Review Scheduling
```
GIVEN a candidate submits an incorrect answer with confidence set to "Confident"
WHEN the attempt evaluation completes
THEN the concept is flagged as a Confident Mistake and a ReviewItem is scheduled due within 24 hours.
```

### Scenario 3: Touch Drag-and-Drop Fallback
```
GIVEN a candidate is using a mobile touch device
WHEN viewing a Guided Sequence Puzzle challenge
THEN single-tap selection buttons allow moving items into target slots without native HTML5 dragging.
```

---

## SECTION 42 — LOCAL PRODUCT METRICS

The platform computes local analytics to evaluate learning efficiency:
* **Mission Completion Velocity:** Average time spent per mission.
* **Hint Dependency Index:** Ratio of challenges solved with hints vs independent attempts.
* **Over-Confidence Error Rate:** Percentage of attempts submitted as "Confident" that were incorrect.

---

## SECTION 43 — FUTURE EXTENSIBILITY ROADMAP

* **Phase 2:** Cloud synchronization (Supabase / Spring Boot backend), multi-device account sync.
* **Phase 3:** Real-time voice AI mock interviewer with automated speech scoring.
* **Phase 4:** In-browser JVM WebAssembly code execution engine.

---

## SECTION 44 — CROSS-DOCUMENT CONSISTENCY

This document strictly integrates terminology, states, and schemas from:
* `PROJECT_VISION.md` (Target persona, company benchmarks, core vision)
* `LEARNING_ENGINE.md` (6 learning modes, 11-step flow, Knowledge Sidebar)
* `DATA_MODEL.md` (Entity types, IndexedDB Dexie tables, discriminated unions)
* `CONTENT_PIPELINE.md` (6 quality gates, 36 OOP topic sequence)
* `QUESTION_SOURCES.md` (Source tiers, company badge rules, provenance types)

---

## SECTION 45 — OPEN DECISIONS & SAFE DEFAULTS

| Open UI Decision | Recommended Safe Default |
| :--- | :--- |
| **Global Navigation** | Fixed left rail on Desktop; bottom bar on Mobile. |
| **Prerequisite Gating** | Warn user when starting locked topics, but allow explicit override ("Proceed Anyway"). |
| **Timer Default** | Timers are OFF by default; can be enabled in Settings. |
| **Search Scope** | Local client-side search indexed across static JSON manifests. |

---

```
[ END OF PRODUCT REQUIREMENTS SPECIFICATION DOCUMENT ]
```
