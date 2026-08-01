# UI & INTERACTION GUIDELINES: AUTHORITATIVE FRONTEND SPECIFICATION

---

| Metadata | Details |
| :--- | :--- |
| **Document Status** | Approved / Authoritative Specification |
| **Document Version** | 1.0.0 |
| **Target Audience** | Principal Product Designers, Senior UX Designers, Design Systems Architects, Staff Frontend Engineers, Accessibility Specialists |
| **Authors** | Principal Product Designer, Design Systems Architect, Staff Frontend Engineer, Learning Experience Designer |
| **Primary Domain** | Visual Language, Design Tokens, Component System, Responsive Layouts, Accessibility, Interaction Behaviors |
| **Effective Date** | August 2026 |

---

## EXECUTIVE SUMMARY & DOCUMENT AUTHORITY

This document establishes the binding visual language, design token system, layout architecture, component specification, responsive behavior model, accessibility standards, and interaction rules for the Senior Java Technical Interview Preparation Platform.

### Rule of Precedence
`UI_GUIDELINES.md` is the authoritative specification for all visual language, component ergonomics, design tokens, layout grids, spacing rules, color palettes, typography levels, interactive component states, code presentation views, responsive breakpoint behaviors, motion specifications, and visual accessibility rules. 

Future UI implementation MUST conform strictly to this document unless explicitly amended by an approved document revision. This specification preserves and implements all product behaviors, learning modes, data contracts, and source display rules established in:
- `/docs/PROJECT_VISION.md`
- `/docs/LEARNING_ENGINE.md`
- `/docs/DATA_MODEL.md`
- `/docs/CONTENT_PIPELINE.md`
- `/docs/QUESTION_SOURCES.md`
- `/docs/PRODUCT_REQUIREMENTS.md`

---

## PRODUCT CHARACTER & DESIGN IDENTITY

The interface balances the calm, serious ergonomics of modern developer tools with the precision and legibility of mission-control financial dashboards:

- **Feels like**: A seamless fusion of **Linear** (calm focus, keyboard efficiency, subtle micro-interactions), **GitHub** (clean code legibility, explicit state badges), **JetBrains IDEs** (high-density technical context, line-level code annotations), **Modern Banking Dashboards** (dark slate tones, high-yield metrics, restrained accents), and **Mission Control Systems** (uninterrupted workflow, state visibility).
- **Tone & Mood**: Serious, technical, calm, precise, professional, focused, high quality.
- **Strict Anti-Patterns**: The interface MUST NOT feel childish, cartoonish, noisy, juvenile-gamified, overly futuristic, excessively glassmorphic, overloaded with gradients, or visually similar to a mobile casino or casual mobile game. Gamification elements (XP, Streaks, Levels) serve as subtle motivation signals and MUST NOT dominate or clutter the workspace.

---

# SECTION 1 — DESIGN PRINCIPLES

### 1. Content First
The core value of the platform resides in code, JVM mechanics, trade-off analysis, and structured interview answers. Decorative chrome, margins, and heavy gradients are minimized so that technical prose, diagrams, and code remain the primary visual focus.

### 2. Calm Technical Density
Senior engineers operate comfortably with high information density when it is structured with clear visual hierarchy. Layouts present thorough contextual data—such as line-by-line annotations, JDK version tags, and provenance badges—without creating visual clutter or cognitive fatigue.

### 3. Clear Visual Hierarchy
Information priority is established through contrast, typography levels, and spatial grouping rather than loud colors. Primary actions (e.g., "Start Mission", "Submit Attempt") are visually unambiguous, while secondary metadata remains available without competing for attention.

### 4. Consistent Interaction Patterns
Controls with identical functions behave identically across all pages. Button variants, dialog openers, drawer triggers, tag chips, and confidence selectors share uniform hover, focus, pressed, and disabled behaviors across every module.

### 5. Progressive Disclosure
Complex background context, deep JVM memory specifications, and historical JDK edge cases are revealed as needed. The main workspace focuses on the active challenge stage, while deep theory and related tags are accessible on demand via the Knowledge Sidebar.

### 6. Mobile Completeness
The mobile interface is a full functional implementation, not a degraded fallback. Touch targets satisfy 44px minimums, sidebars transition into accessible bottom sheets, and drag-and-drop puzzles offer explicit tap-and-move alternatives.

### 7. Accessibility by Default
Accessibility is built into the design tokens and layout foundations. High-contrast text, 2px cyan focus indicators, screen-reader aria labels, color-independent status indicators, and reduced-motion fallbacks are active across all components.

### 8. State Must Always Be Visible
Candidates never wonder where they are or whether their input was saved. Mission stages, execution progress, confidence levels, answer locking, offline status, and auto-save indicators are explicitly rendered in the interface.

### 9. No Decorative Complexity
Every visual element serves a functional purpose. Gimmicky 3D charts, ambient background blurs that reduce contrast, spinning badges, and celebratory confetti are excluded in favor of clean slate surfaces and sharp typography.

### 10. Learning Flow Must Remain Uninterrupted
UI interactions preserve the candidate's focus during problem solving. Opening the Knowledge Sidebar, inspecting tag metadata, switching language modes, or toggling code comment views MUST NEVER reset active editor state or unsubmitted answers.

---

# SECTION 2 — DESIGN TOKEN SYSTEM

The visual system is governed by standard CSS custom properties defined on the root element.

```css
:root {
  /* ==========================================
     COLOR TOKENS (Dark Technical Banking Theme)
     ========================================== */
  --color-bg-primary: #0b0f19;       /* Deep near-black navy page background */
  --color-bg-secondary: #111827;     /* Elevated navy container background */
  --color-surface: #1e293b;          /* Dark slate card surface */
  --color-surface-hover: #334155;    /* Hover surface state */
  --color-surface-active: #475569;   /* Selected/pressed surface state */
  --color-border: #334155;           /* Subtle cool gray border */
  --color-border-subtle: #1e293b;    /* Subdued divider line */
  --color-border-focus: #06b6d4;     /* High-contrast cyan focus ring */

  --color-text-primary: #f8fafc;     /* Near-white high-contrast body text */
  --color-text-secondary: #94a3b8;   /* Cool gray secondary metadata text */
  --color-text-muted: #64748b;       /* Muted tertiary label text */
  --color-text-disabled: #475569;    /* Disabled text state */

  --color-accent: #06b6d4;           /* Cyan primary interactive accent */
  --color-accent-hover: #0891b2;     /* Darker cyan hover state */
  --color-accent-light: rgba(6, 182, 212, 0.12); /* Subtle cyan tint */

  --color-financial: #f43f5e;        /* Restrained red financial dashboard accent */
  --color-success: #10b981;          /* Emerald green for correct/mastered states */
  --color-success-bg: rgba(16, 185, 129, 0.12);
  --color-warning: #f59e0b;          /* Amber yellow for warnings/in-progress */
  --color-warning-bg: rgba(245, 158, 11, 0.12);
  --color-danger: #ef4444;           /* Red for errors and destructive actions */
  --color-danger-bg: rgba(239, 68, 68, 0.12);
  --color-followup: #8b5cf6;         /* Purple for senior follow-up scenarios */
  --color-followup-bg: rgba(139, 92, 246, 0.12);

  /* ==========================================
     SPACING TOKENS (8px Base Grid)
     ========================================== */
  --space-0-5: 4px;                  /* 0.5x micro increment */
  --space-1: 8px;                    /* 1x base unit */
  --space-1-5: 12px;
  --space-2: 16px;                   /* 2x standard padding */
  --space-3: 24px;                   /* 3x container padding */
  --space-4: 32px;                   /* 4x section spacing */
  --space-6: 48px;                   /* 6x page section gap */
  --space-8: 64px;                   /* 8x major layout gap */

  /* ==========================================
     BORDER RADIUS TOKENS
     ========================================== */
  --radius-sm: 4px;                  /* Small chips, badges, code tags */
  --radius-md: 6px;                  /* Buttons, input fields, code blocks */
  --radius-lg: 8px;                  /* Cards, dialog windows, sidebar panels */
  --radius-xl: 12px;                 /* Container shells, modal overlays */
  --radius-pill: 9999px;             /* Rounded pill badges */

  /* ==========================================
     TYPOGRAPHY TOKENS
     ========================================== */
  --font-family-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Inter", sans-serif;
  --font-family-mono: "JetBrains Mono", "Fira Code", "Cascadia Code", ui-monospace, monospace;

  /* ==========================================
     ELEVATION & SHADOW TOKENS
     ========================================== */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.35);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.45), 0 2px 4px -1px rgba(0, 0, 0, 0.3);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.55), 0 4px 6px -2px rgba(0, 0, 0, 0.4);
  --shadow-focus: 0 0 0 2px #06b6d4;

  /* ==========================================
     TRANSITION TOKENS
     ========================================== */
  --transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-normal: 250ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-slow: 350ms cubic-bezier(0.4, 0, 0.2, 1);

  /* ==========================================
     LAYOUT & Z-INDEX TOKENS
     ========================================== */
  --content-max-width: 1280px;
  --prose-max-width: 760px;
  --sidebar-width-desktop: 380px;
  --nav-width-desktop: 240px;

  --z-base: 1;
  --z-sticky: 100;
  --z-header: 200;
  --z-drawer: 300;
  --z-overlay: 400;
  --z-modal: 500;
  --z-tooltip: 600;
}
```

---

# SECTION 3 — COLOR SYSTEM

The color system uses a dark technical banking theme designed for long study sessions under low ambient light without eye fatigue.

```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
['#0B0F19' BG Primary] ──► ['#111827' BG Secondary] ──► ['#1E293B' Card Surface]           │
│                          Border: '#334155' (Cool Gray)                                 │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ Text Primary: '#F8FAFC' (Near White, Contrast 14.2:1)                                  │
│ Text Secondary: '#94A3B8' (Cool Gray, Contrast 7.1:1)                                  │
│ Primary Interactive Accent: '#06B6D4' (Cyan)                                           │
│ Restrained Financial Accent: '#F43F5E' (Rose Red)                                      │
│ Semantic Statuses: Success '#10B981' | Warning '#F59E0B' | Danger '#EF4444' | Purple '#8B5CF6'│
└────────────────────────────────────────────────────────────────────────────────────────┘
```

### 1. Contrast Ratios & Accessibility Compliance
- **Body Text (`--color-text-primary` on `--color-bg-primary`)**: 14.2:1 contrast ratio (exceeds WCAG AAA standard of 7:1).
- **Secondary Text (`--color-text-secondary` on `--color-bg-primary`)**: 7.1:1 contrast ratio (exceeds WCAG AA standard of 4.5:1).
- **Interactive Accent (`--color-accent` on `--color-surface`)**: 4.8:1 contrast ratio.

### 2. Status Communication Rules
- **Color Independence**: Status MUST NEVER be communicated solely by color. Every status indicator combines:
  1. A semantic color accent
  2. An explicit text label
  3. A distinct vector icon symbol (e.g., Checkmark for Mastered, Padlock for Locked, Amber Gear for In Progress).
- **Restrained Glowing**: Glowing effects are prohibited except for subtle 2px focus rings (`--shadow-focus`) and active execution indicators.

---

# SECTION 4 — TYPOGRAPHY

The platform uses system font stacks for zero external font load latency:
- **UI Sans-Serif Stack**: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Inter", sans-serif`
- **Code Monospace Stack**: `"JetBrains Mono", "Fira Code", "Cascadia Code", ui-monospace, monospace`

```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ TYPOGRAPHY HIERARCHY MAP                                                               │
├──────────────────┬────────────┬──────────────┬───────────────┬─────────────────────────┤
│ Level            │ Desktop    │ Mobile       │ Weight / Line │ Purpose                 │
├──────────────────┼────────────┼──────────────┼───────────────┼─────────────────────────┤
│ Display          │ 32px       │ 24px         │ 700 / 1.25    │ Dashboard metrics, Intro│
│ Page Title       │ 24px       │ 20px         │ 600 / 1.30    │ Module / Topic titles   │
│ Section Heading  │ 20px       │ 18px         │ 600 / 1.35    │ Card & Workspace headers│
│ Card Title       │ 16px       │ 16px         │ 600 / 1.40    │ Grid cards & Stage titles│
│ Body             │ 16px       │ 16px         │ 400 / 1.60    │ Primary reading prose   │
│ Small Body       │ 14px       │ 14px         │ 400 / 1.50    │ Helper & secondary text │
│ Label            │ 13px       │ 13px         │ 600 / 1.40    │ Input labels, buttons   │
│ Metadata         │ 12px       │ 12px         │ 500 / 1.40    │ Tags, dates, chip text  │
│ Code             │ 14px       │ 14px         │ 400 / 1.60    │ Source code blocks      │
│ Caption          │ 11px       │ 11px         │ 400 / 1.30    │ Footnotes, sub-badges   │
└──────────────────┴────────────┴──────────────┴───────────────┴─────────────────────────┘
```

### Mobile & Dark Mode Typography Rules
- **Minimum Mobile Body Text**: 16px to prevent iOS Safari auto-zoom on input focus.
- **Minimum Code Text**: 14px across both desktop and mobile viewports.
- **Weight Restraint**: Font weights below 400 (e.g., 100/200/300 light weights) are PROHIBITED on dark backgrounds due to subpixel rendering degradation.

---

# SECTION 5 — SPACING AND DENSITY

Layouts adhere to an 8px base grid system (`4px`, `8px`, `12px`, `16px`, `24px`, `32px`, `48px`, `64px`).

```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ SPACING CONTAINER & PROSE CONSTRAINTS                                                  │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ Max Application Width : 1280px (Centered with margin: 0 auto)                          │
│ Max Prose Text Width  : 760px  (Optimal line length: 65–75 characters per line)      │
│ Workspace Code Area   : Flexible (Expands up to 100% of available split-pane width)   │
│ Mobile Page Padding   : 16px left/right gutter                                          │
│ Desktop Page Padding  : 32px left/right gutter                                          │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

# SECTION 6 — PAGE SHELL

The global application shell adapts across desktop, tablet, and mobile breakpoints.

```text
DESKTOP SHELL (>= 1024px):
┌──────────────────┬─────────────────────────────────────────────────┬──────────────────┐
│ LEFT NAV RAIL    │ TOP APP HEADER (Breadcrumbs + Actions + Search) │ KNOWLEDGE SIDEBAR│
│ (240px Fixed)    ├─────────────────────────────────────────────────┤ (380px Split)    │
│ Logo / Brand     │ MAIN CONTENT AREA                               │ Collapsible      │
│ Dashboard        │ (Scrolls independently or page scroll)          │ Tabbed Drawer    │
│ Modules          │                                                 │ Theory / Traps   │
│ Review           │                                                 │                  │
│ Progress         │                                                 │                  │
│ Settings         │                                                 │                  │
└──────────────────┴─────────────────────────────────────────────────┴──────────────────┘

MOBILE SHELL (< 768px):
┌──────────────────────────────────────────────────────────────────────────────────────┐
│ TOP APP HEADER (Title / Exit + Language Selector + Sidebar Toggle)                   │
├──────────────────────────────────────────────────────────────────────────────────────┤
│ MAIN CONTENT AREA (Single Column, 16px Padding, Bottom Safe-Area Padding)            │
├──────────────────────────────────────────────────────────────────────────────────────┤
│ BOTTOM NAVIGATION BAR (Fixed, 56px Height + env(safe-area-inset-bottom))             │
│ [ Dashboard ]   [ Modules ]   [ Review ]   [ Progress ]   [ Settings ]               │
└──────────────────────────────────────────────────────────────────────────────────────┘
```

---

# SECTION 7 — GLOBAL NAVIGATION

### Desktop Navigation Rail
- **Width**: 240px fixed width.
- **Items**: Dashboard (`/`), Modules (`/modules`), Review (`/review`), Progress (`/progress`), Settings (`/settings`).
- **States**:
  - `default`: Text `--color-text-secondary`, icon muted.
  - `hover`: Text `--color-text-primary`, background `--color-surface-hover`.
  - `focus`: 2px cyan focus ring (`--shadow-focus`).
  - `active`: Text `--color-text-primary`, background `--color-surface-active`, 3px cyan left indicator bar.
  - `badge`: Displayed on Review item when items are due (e.g., `[ 3 Due ]` amber pill).

### Mobile Bottom Navigation Bar
- **Height**: 56px + iOS safe-area inset (`padding-bottom: env(safe-area-inset-bottom)`).
- **Touch Target**: 44px minimum height per icon/label item.
- **Behavior**: Sticky to bottom viewport; non-collapsing to preserve direct access.

---

# SECTION 8 — MODULES GRID

The Modules page (`/modules`) MUST render as a responsive card grid, NEVER as a flat list.

```text
MODULE CARD ANATOMY:
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ 1. Icon Area: [ 🧱 ]                                   2. Status Badge: [ IN PROGRESS ]│
│ 3. Module Title: Object-Oriented Programming                                           │
│ 4. Description: Master encapsulation, SOLID principles, polymorphism, and invariants.  │
│ 5. Difficulty Range: APPLIED ──► SENIOR                                               │
│ 6. Statistics Row: ⏱️ 14.5 Hours  │  📚 37 Topics  │  ❓ 85 Questions  │  💻 24 Code Ex   │
│ 7. Progress Section: [████████████████████░░░░░░░░░░] 65%                              │
│ 8. Primary Action: [ CONTINUE MISSION ──► ]                                            │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

### Responsive Column Layouts
- **Large Desktop ($\ge 1280\text{px}$)**: 4 columns.
- **Desktop / Laptop ($\ge 1024\text{px}$)**: 3 columns.
- **Tablet ($\ge 768\text{px}$)**: 2 columns.
- **Mobile ($< 768\text{px}$)**: 1 column.

### Card Clickability & Nested Controls
- The entire card is clickable as a primary container action.
- Internal links (e.g., "Preview Topics", "Direct Mission CTA") execute independently without triggering duplicate click events (`event.stopPropagation()`).

---

# SECTION 9 — TOPIC GRID AND TOPIC CARDS

Topic cards represent canonical subject nodes within a module.

```text
TOPIC CARD SCHEMATIC:
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ 05. ENCAPSULATION & INFORMATION HIDING                          [ Tag: SENIOR ]        │
│ Master state invariant protection, access boundaries, and defensive copying.           │
│                                                                                        │
│ ⏱️ 45 Min  │  📚 1 Mission  │  ❓ 4 Interview Questions  │  💻 2 Coding Challenges        │
│ Prerequisites: 03. State, Behavior, and Identity (COMPLETED)                          │
│ Status: IN PROGRESS  │  Mastery: 65% [DEVELOPING]                                      │
│                                                                                        │
│                                                          [ START MISSION ──► ]         │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

### Topic Card States
1. `Recommended`: Primary blue border highlight, "Recommended Next Step" top badge.
2. `Available`: Standard slate card, cyan "Start Topic" or "Continue" action button.
3. `Locked`: Muted border, padlock icon, list of prerequisite topics, override button ("Proceed Anyway"). Content remains readable (min 0.6 opacity).
4. `In Progress`: Amber progress bar indicator with percentage.
5. `Interview Ready`: Green checkmark icon, "Interview Ready" badge.
6. `Mastered`: Gold trophy badge, 100% completion bar.

---

# SECTION 10 — MISSION CARDS

Mission cards represent active learning expeditions.

```text
MISSION CARD SCHEMATIC:
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ MISSION: Protecting BankAccount Invariants                      [ SENIOR ]             │
│ Scenario: High-Frequency Payment Gateway dropping balances under concurrent requests.  │
│                                                                                        │
│ Primary Topic : 05. Encapsulation & Information Hiding                                 │
│ Assistance    : GUIDED ──► APPLIED ──► INTERVIEW                                       │
│ Total Stages  : 11 Stages  │  ⏱️ 25 Min Est  │  ❓ 3 Verified Qs  │  ⚡ +250 XP            │
│ Status        : PRACTICING (Stage 7 of 11)                                             │
│                                                                                        │
│                                                          [ CONTINUE MISSION ──► ]      │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

# SECTION 11 — MISSION WORKSPACE LAYOUT

The Mission Workspace presents the active learning stage while supporting instant access to reference knowledge.

```text
MISSION WORKSPACE DESKTOP SCHEMATIC:
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ [ Exit ]  MISSION: Protecting BankAccount Invariants                   [ 🌐 Bilingual ]│
├────────────────────────────────────────────────────────────────────────────────────────┤
│ STAGE STEPPER:                                                                         │
│ [1. Intro ✓] ──► [2. Bug ✓] ──► [3. Think ✓] ──► [4. Help ✓] ──► [5. Theory]          │
│ ──► [6. Visual] ──► [7. Practice] ──► [8. Interview Q] ──► [9. Answer] ──► [10. Debug]  │
├───────────────────────────────────────────────────┬────────────────────────────────────┤
│ MAIN STAGE WORKSPACE                              │ KNOWLEDGE SIDEBAR (Drawer)   [ X ] │
│ (Presents active stage component:                 ├────────────────────────────────────┤
│  Problem / Theory / Code Editor / Question)       │ 📖 THEORY QUICK-REF                │
│                                                   │ Invariant protection rules         │
│                                                   ├────────────────────────────────────┤
│                                                   │ ⚠️ COMMON INTERVIEW TRAPS          │
│                                                   │ Setter Invariant Bypass            │
│                                                   ├────────────────────────────────────┤
│                                                   │ 🔗 CANONICAL TAGS                  │
│                                                   │ [#encapsulation] [#invariants]     │
├───────────────────────────────────────────────────┴────────────────────────────────────┤
│ BOTTOM STAGE ACTIONS: [ ◄ Previous Stage ]                 [ Next Stage / Submit ──► ] │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

# SECTION 12 — STAGE PROGRESS NAVIGATION

Stage Stepper Formats:
- **Desktop ($\ge 1024\text{px}$)**: Horizontal stepper bar showing step numbers and short titles.
- **Tablet ($768\text{px} - 1023\text{px}$)**: Horizontally scrollable compact stepper.
- **Mobile ($< 768\text{px}$)**: Compact header dropdown indicator (e.g., `Stage 5 of 11: Theory ▾`).

```text
STAGE STEPPER ITEM STATES:
[✓ 1. Intro]   : Completed stage (Green text, checkmark icon).
[● 5. Theory]  : Current active stage (Cyan border highlight, bold text).
[○ 7. Practice]: Available unlocked stage (Slate border, standard text).
[🔒 8. Question]: Locked stage (Muted text, padlock icon).
```

---

# SECTION 13 — KNOWLEDGE SIDEBAR

The Knowledge Sidebar provides non-disruptive reference material during problem solving.

```text
KNOWLEDGE SIDEBAR DRAWER SCHEMATIC:
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ KNOWLEDGE SIDEBAR                                                        [ Close ✕ ]   │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ TAB BAR: [ 📖 Theory ] [ 💡 Concepts ] [ ⚠️ Traps ] [ 🔗 Tags ] [ ❓ Qs ] [ 📚 Ref ]    │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ CONTENT AREA (Scrollable):                                                             │
│                                                                                        │
│ 📌 CONCEPT: Encapsulation & Domain Invariants                                          │
│ Encapsulation is NOT merely wrapping fields in private visibility and generating       │
│ public getters and setters. True encapsulation protects class invariants from          │
│ invalid state transitions.                                                             │
│                                                                                        │
│ ⚠️ COMMON INTERVIEW TRAP: Setter Invariant Bypass                                      │
│ Providing `setBalance(double balance)` without validating negative amounts bypasses   │
│ state protection.                                                                      │
│                                                                                        │
│ 🔗 RELATED CANONICAL TAGS:                                                             │
│ [#encapsulation]  [#immutability]  [#defensive-copying]  [#domain-modeling]            │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

### Responsive Sidebar Behavior
- **Desktop ($\ge 1024\text{px}$)**: Right split pane (380px fixed width); reduces main workspace container width gracefully.
- **Tablet / Mobile ($< 1024\text{px}$)**: Full-height overlay sheet with semi-transparent backdrop; includes a top drag handle on mobile bottom sheets.
- **State Preservation**: Opening, toggling tabs, or closing the Sidebar MUST NEVER reset unsubmitted code editor text or active challenge inputs.

---

# SECTION 14 — TAG COMPONENT

Tags are interactive chips for dynamic Knowledge Graph navigation.

```css
/* Tag Component Token Representation */
.tag-chip {
  display: inline-flex;
  align-items: center;
  gap: var(--space-0-5);
  padding: 2px 8px;
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  font-family: var(--font-family-mono);
  font-size: 12px;
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: var(--transition-fast);
}

.tag-chip:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
  background-color: var(--color-accent-light);
}

.tag-chip:focus-visible {
  outline: none;
  box-shadow: var(--shadow-focus);
}
```

Example tags: `#encapsulation`, `#immutability`, `#dynamic-dispatch`, `#equals-hashcode`.

---

# SECTION 15 — THEORY READING UI

Theory articles use structured section callouts to break up prose:

```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ 📖 THEORY: Encapsulation & State Invariants                                            │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 💡 MENTAL MODEL: The Protected Core                                                    │
│ Think of a class as a black box with a guarded door. The state inside cannot be mutated│
│ directly; all changes must pass through validated entry methods.                      │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ ⚠️ PRODUCTION RISK: Setter Invariant Bypass                                             │
│ Exposing unrestricted setters in microservices allows bad external data to corrupt     │
│ domain entities, leading to silent database inconsistencies under load.                │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 🎯 INTERVIEW TIP: Verbalizing the Real Goal                                            │
│ When asked about encapsulation, state immediately: "Encapsulation protects domain      │
│ invariants; getters and setters are merely access mechanisms, not encapsulation."      │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

# SECTION 16 — THEORY CHECKPOINTS

Theory Checkpoints are light learning checks embedded directly after theory sections.

```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ ❓ THEORY CHECKPOINT 1 of 3 (Learning Check)                                            │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ What is the primary engineering objective of class encapsulation?                      │
│                                                                                        │
│ ( ) A. To ensure all fields have corresponding public getter and setter methods.       │
│ (•) B. To protect state invariants and prevent unauthorized invalid state transitions. │
│ ( ) C. To reduce the memory footprint of objects stored on the JVM Heap.               │
│                                                                                        │
│                                                          [ CHECK ANSWER ]              │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

# SECTION 17 — CHALLENGE CARD FRAMEWORK

All interactive challenges share a uniform outer frame:

```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ CHALLENGE HEADER: Fix Invariant Bypass Vulnerability      [ Assistance: GUIDED ]       │
│ Topic: Encapsulation  │  Difficulty: SENIOR  │  Source: Verified Bank Pattern  │ +250 XP  │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ CHALLENGE BODY: Interactive Problem Workspace                                           │
│ (Presents Bug Hunt lines, Puzzle items, or Refactoring Editor)                         │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ PROGRESSIVE HINTS & CONFIDENCE:                                                        │
│ 💡 [ Hint 1: Directional Clue (-10 XP) ]                                               │
│ Confidence: [•] Confident   [ ] Unsure   [ ] Guessing            [ SUBMIT ATTEMPT ──► ] │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ POST-ATTEMPT EVALUATION AREA (Locked until submission):                                │
│ • Evaluation Status: CORRECT (Score: 100%)                                             │
│ • Annotated Solution Code View                                                         │
│ • Structured 3-Tier Speech Script                                                      │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

# SECTION 18 — GUIDED PUZZLE UI

Guided puzzles support both desktop mouse drag-and-drop and touch-native tap interactions.

```text
MOBILE / TOUCH REORDERING ERGONOMICS:
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ PUZZLE PIECE 1: Enforce private field visibility          [ Selected ] [ Move Down ]  │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ PUZZLE PIECE 2: Validate constructor inputs               [ Select ]   [ Move Up/Down]│
├────────────────────────────────────────────────────────────────────────────────────────┤
│ PUZZLE PIECE 3: Perform defensive copy of Date object     [ Select ]   [ Move Up ]    │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

# SECTION 19 — BUG HUNT UI

Code-based Bug Hunt challenges allow candidates to select vulnerable lines directly:

```text
BUG HUNT CODE VIEWER:
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ 1  public final class AccountPeriod {                                                  │
│ 2    private final Date startDate;                                                     │
│ 3    public AccountPeriod(Date startDate) {                                            │
│ 4 🎯   this.startDate = startDate; // ◄ Click line to select vulnerability             │
│ 5    }                                                                                 │
│ 6  }                                                                                   │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ SELECTED VULNERABILITY: Line 4 (Direct mutable reference assignment)                   │
│                                                          [ SUBMIT DIAGNOSIS ]          │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

# SECTION 20 — INTERVIEW ANSWER UI

Interview challenges train structured verbal communication:

```text
INTERVIEW ANSWER INPUT & EVALUATION:
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ QUESTION: How do you explain encapsulation vs data hiding during a senior interview?   │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ VERBAL / TEXTUAL RESPONSE AREA:                                                        │
│ [ Type your structured answer (Elevator Pitch + Mechanics + Trade-offs)...          ] │
│ Word Count: 142 words  │  Timer: 02:15                                                 │
│                                                                                        │
│ CONFIDENCE: (•) Confident   ( ) Unsure   ( ) Guessing           [ SUBMIT ANSWER ──► ]  │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ POST-SUBMISSION RUBRIC EVALUATION (Revealed after submission):                         │
│ • Elevator Pitch   : MATCHED (State invariants concept identified)                     │
│ • Deep Mechanics   : MATCHED (Access boundaries & constructor validation identified)   │
│ • Trade-offs       : MISSING (Defensive copy memory impact omitted)                    │
│                                                                                        │
│ 🎯 MODEL SPEECH SCRIPT:                                                                │
│ "Encapsulation is the protection of domain invariants..."                              │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

# SECTION 21 — CONFIDENCE SELECTOR

The Confidence Selector is a mandatory pre-submission segmented control.

```text
CONFIDENCE SELECTOR SEGMENTED CONTROL:
┌───────────────────────────┬───────────────────────────┬───────────────────────────┐
│ (•) CONFIDENT             │ ( ) UNSURE                │ ( ) GUESSING              │
│ I can explain this rule   │ I have a partial hypothesis│ I am making a random guess│
└───────────────────────────┴───────────────────────────┴───────────────────────────┘
```

---

# SECTION 22 — HINT UI

Hints are delivered in a progressive stack with transparent XP penalties.

```text
HINT STACK CONTAINER:
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ 💡 PROGRESSIVE HINTS AVAILABLE (4 Levels)                                              │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ [ Unlock Hint 1: Directional Clue (-10% XP) ]                                          │
│ [ Unlock Hint 2: Concept Reminder (-25% XP) ]                                          │
│ [ Unlock Hint 3: Runtime Mechanism Clue (-50% XP) ]                                    │
│ [ Unlock Hint 4: Near-Solution Code Structure (-75% XP) ]                              │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

# SECTION 23 — FEEDBACK UI

Feedback panels communicate results clearly using multi-sensory signals.

```text
FEEDBACK PANEL VARIANTS:
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ 🟢 SUCCESS: Correct Attempt! (+250 XP Awarded)                                         │
│ You successfully identified the encapsulation vulnerability and protected the invariant. │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ ⚠️ CONFIDENT MISTAKE: Misconception Detected                                           │
│ You submitted a confident attempt, but mutable references allow external state bypass.  │
│ Scheduled for remediation review within 24 hours.                                      │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

# SECTION 24 — CODE VIEWER

The Code Viewer provides an IDE-grade reading experience without Monaco overhead:

```text
CODE VIEWER FRAME:
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ 📄 BankAccount.java    [ CodeType: CORRECT_SOLUTION ]    [ JDK 17 ]    [ Copy Code ]   │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 1  public final class BankAccount {                                                    │
│ 2    private final Currency currency;                                                  │
│ 3    private long balanceInCents;                                                      │
│ 4                                                                                      │
│ 5    public BankAccount(Currency currency, long initialBalanceInCents) {               │
│ 6      if (initialBalanceInCents < 0) {                                                │
│ 7        throw new IllegalArgumentException("Initial balance cannot be negative");     │
│ 8      }                                                                               │
│ 9      this.currency = Objects.requireNonNull(currency);                               │
│ 10     this.balanceInCents = initialBalanceInCents;                                    │
│ 11   }                                                                                 │
│ 12 }                                                                                   │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

# SECTION 25 — CODE ANNOTATIONS

Annotations link directly to specific line ranges:

```java
// [LEARNING COMMENTS MODE] Line Annotations
public final class BankAccount {
    // 💡 ANNOTATION [WHY THIS EXISTS]:
    // Currency is immutable in Java, making direct reference storage thread-safe.
    private final Currency currency;

    // 💡 ANNOTATION [INTERVIEW TRAP & MECHANICS]:
    // Long cents eliminates floating-point representation errors inherent in double/float.
    private long balanceInCents;
}
```

---

# SECTION 26 — SOURCE CONTEXT

The provenance component displays question authenticity:

```text
PROVENANCE DRAWER (Collapsed & Expanded States):
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ ℹ️ PROVENANCE: Verified Senior Interview Pattern                 [ Expand Context 🔽 ] │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ • Platform Origin    : Glassdoor Candidate Log (Senior Financial Developer)             │
│ • Enterprise Badge   : Publicly Reported Citi Technical Round                          │
│ • Tech Authority     : Java Language Specification (JLS 8.3 - Field Declarations)      │
│ • Official Spec Link : [ View Oracle Javadoc Contract 🔗 ]                             │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

# SECTION 27 — PROGRESS COMPONENTS

Consistent progress visualization components:

```text
PROGRESS COMPONENTS MATRIX:
1. Linear Progress Bar    : [████████████████████░░░░░░░░░░] 65%
2. Mastery Meter Badge    : [ 🏆 MASTERED (95%) ]  (Gold Accent)
3. Interview Readiness    : [ 🎯 78% Senior Benchmark ] (Cyan Accent)
4. Streak Counter         : [ 🔥 14 Day Streak ] (Rose Financial Accent)
5. Review Due Badge       : [ ⏰ 3 Reviews Due ] (Amber Warning Accent)
```

---

# SECTION 28 — DASHBOARD CARDS

Dashboard layout highlights key priorities:
1. **Continue Learning Card** (Highest visual priority with large CTA button).
2. **Reviews Due Card** (Amber accent when items are due).
3. **Interview Readiness Radar Card** (Breakdown across Knowledge, Application, Debugging, Verbal).
4. **Weak Concepts Card** (Direct links to remedial missions).

---

# SECTION 29 — REVIEW PAGE UI

The Review Page (`/review`) manages spaced-repetition revision sessions:

```text
REVIEW PAGE QUEUE SCHEMATIC:
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ SPACED REPETITION REVIEW QUEUE                                                         │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ ⏰ 3 ITEMS DUE NOW  │  📅 5 Items Due Today  │  ⚠️ 2 Confident Mistakes Needing Review│
├────────────────────────────────────────────────────────────────────────────────────────┤
│ RECOMMENDED REVIEW SESSION: ~12 Minutes (Mixed Topics)        [ START REVIEW SESSION ] │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ QUEUED REVIEW ITEMS:                                                                   │
│ 1. #equals-hashcode-contract (Reason: Confident Mistake)         [ Review Concept ]    │
│ 2. #volatile-memory-visibility (Reason: Scheduled Retention)     [ Review Concept ]    │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

# SECTION 30 — PROGRESS PAGE UI

The Progress Page (`/progress`) details learning metrics:
- **Readiness Score Breakdown**: 5 radar dimensions (Knowledge, Application, Debugging, Verbal, Trade-offs).
- **Concept Mastery Grid**: Matrix of concepts color-coded from `UNSEEN` to `MASTERED`.
- **Confidence Calibration Matrix**: Plot of candidate confidence vs. actual correctness accuracy.

---

# SECTION 31 — SETTINGS UI

Settings (`/settings`) governs system configurations and data management:

```text
SETTINGS PANEL SCHEMATIC:
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

### Reset Progress Confirmation Dialog
Resetting progress MUST trigger an in-app glassmorphic confirmation modal requiring the candidate to type `"RESET"` into a text field. Browser-native `window.confirm()` dialogs are strictly prohibited.

---

# SECTION 32 — DIALOGS AND OVERLAYS

Custom dialogs enforce accessible modal rules:
- **Focus Trap**: Keyboard focus is trapped within the active dialog window.
- **Escape Key**: Pressing `Escape` closes the overlay.
- **Backdrop**: Semi-transparent dark slate backdrop (`rgba(11, 15, 25, 0.8)`).
- **Focus Restoration**: Focus returns to the trigger element upon closing.

---

# SECTION 33 — BUTTON SYSTEM

Button variants and sizes:

```text
BUTTON VARIANT MATRIX:
┌──────────────┬───────────────────────────────┬─────────────────────────────────────────┐
│ Variant      │ Background & Border           │ Text & Icon Color                       │
├──────────────┼───────────────────────────────┼─────────────────────────────────────────┤
│ Primary      │ `--color-accent` (Cyan)       │ `#0B0F19` (Dark Navy, Bold)             │
│ Secondary    │ `--color-surface` + Border    │ `--color-text-primary` (Near White)     │
│ Tertiary     │ Transparent + Border          │ `--color-text-secondary` (Cool Gray)    │
│ Ghost        │ Transparent                   │ `--color-accent` (Cyan)                 │
│ Danger       │ `--color-danger` (Red)        │ `#FFFFFF` (White, Bold)                 │
└──────────────┴───────────────────────────────┴─────────────────────────────────────────┘

SIZES:
• Large  : Height 48px, Padding 0 24px (Primary CTAs)
• Medium : Height 40px, Padding 0 16px (Standard controls)
• Small  : Height 32px, Padding 0 12px (Card actions, chips)
```

---

# SECTION 34 — FORM CONTROLS

Form inputs feature visible labels, helper text, error states, and high-contrast focus rings:

```css
/* Input Control Focus State Token */
.input-control:focus-visible {
  outline: none;
  border-color: var(--color-accent);
  box-shadow: var(--shadow-focus);
}
```

---

# SECTION 35 — EMPTY STATES

Empty state containers use local CSS illustrations and clear actionable CTAs:

```text
EMPTY STATE SCHEMATIC:
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                   [ 🏆 ICON ]                                           │
│                              NO REVIEWS DUE TODAY!                                     │
│ You are completely caught up on your spaced repetition queue. Outstanding work!       │
│                                                                                        │
│                                                    [ EXPLORE NEW MODULES ──► ]         │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

# SECTION 36 — ERROR STATES

Error notifications explain what happened, what data is preserved, and provide clear recovery options:

```text
ERROR RECOVERY SCHEMATIC:
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ ⚠️ INDEXEDDB STORAGE WARNING                                                           │
│ Browser storage is restricted in private browsing mode. Progress will remain in memory│
│ during this session but will not persist after closing the tab.                        │
│                                                                                        │
│                                                    [ EXPORT BACKUP JSON ]              │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

# SECTION 37 — MOTION AND ANIMATION

Animations are functional, subtle, and respect `prefers-reduced-motion`:
- **Allowed Animations**: Card hover elevation (150ms), sidebar drawer slide (250ms), modal scale (200ms), progress bar transition (300ms), XP count updates.
- **Forbidden Animations**: Spinning backgrounds, continuous ambient glowing, celebratory confetti, bouncing buttons, long page transitions.
- **Reduced Motion Fallback**: When `prefers-reduced-motion: reduce` is detected, animations revert to instant state changes (`0ms transition`).

---

# SECTION 38 — RESPONSIVE BREAKPOINTS

Practical breakpoint ranges for media queries:

```css
/* Responsive Breakpoint Queries */
@media (max-width: 639px) { /* Mobile Portrait */ }
@media (min-width: 640px) and (max-width: 767px) { /* Large Mobile / Small Tablet */ }
@media (min-width: 768px) and (max-width: 1023px) { /* Tablet */ }
@media (min-width: 1024px) and (max-width: 1279px) { /* Desktop / Laptop */ }
@media (min-width: 1280px) { /* Large Desktop */ }
```

---

# SECTION 39 — IPHONE REQUIREMENTS

Specific adjustments for iPhone Safari:
- **Viewport Height**: Use `100dvh` (dynamic viewport height) instead of `100vh` to accommodate Safari navigation bars.
- **Input Zoom**: Form inputs use `font-size: 16px` minimum to prevent Safari auto-zoom on focus.
- **Safe Area Padding**: Bottom navigation uses `padding-bottom: env(safe-area-inset-bottom)`.
- **Code Scrolling**: Code blocks use `-webkit-overflow-scrolling: touch` with independent horizontal scrolling containers.

---

# SECTION 40 — ACCESSIBILITY VISUAL RULES

Meeting WCAG 2.1 AA standards:
- **Focus Rings**: All focused elements display a high-contrast 2px cyan focus ring (`outline: 2px solid #06B6D4; outline-offset: 2px;`). Outlines MUST NOT be removed without replacement.
- **Text Scaling**: Layouts accommodate text scaling up to 200% without horizontal text clipping or broken containers.
- **Screen Reader Support**: Non-text interactive controls include explicit `aria-label` attributes.

---

# SECTION 41 — ICONOGRAPHY

Vector icons use standard **Lucide React** icons:
- **Stroke Width**: Uniform 2px stroke width across all icons.
- **Text Support**: Icons support adjacent text labels rather than replacing them.
- **Destructive Actions**: Destructive icon buttons (e.g., Reset, Delete) MUST include explicit text labels.

---

# SECTION 42 — RESPONSIVE PAGE EXAMPLES

### 1. Desktop Dashboard Layout
```text
┌──────────────────┬─────────────────────────────────────────────────┬──────────────────┐
│ NAV RAIL (240px) │ MAIN DASHBOARD CONTENT AREA                     │ KNOWLEDGE SIDEBAR│
│ • Dashboard      │ [ Continue Learning Card: BankAccount ]         │ [ 📖 Theory ]    │
│ • Modules        │ [ Reviews Due: 3 Items ] [ Readiness: 78% ]     │ [ ⚠️ Traps ]     │
│ • Review         │ [ Weak Concepts: #equals-hashcode ]             │ [ 🔗 Tags ]      │
└──────────────────┴─────────────────────────────────────────────────┴──────────────────┘
```

### 2. Desktop Modules Grid Layout
```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ 4-COLUMN MODULE CARD GRID                                                              │
│ ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐                 │
│ │ OOP Module   │  │ Concurrency  │  │ JVM Memory   │  │ Spring Core  │                 │
│ └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘                 │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

### 3. Desktop Mission Workspace Layout
```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ HEADER: Mission Title + Exit + Language Selector                                       │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ STEPPER: [1. Intro ✓] ──► [2. Problem ✓] ──► [3. Think ✓] ──► [4. Theory]             │
├───────────────────────────────────────────────────┬────────────────────────────────────┤
│ MAIN STAGE AREA (Code Editor / Problem Statement) │ RIGHT SIDEBAR DRAWER (380px)       │
└───────────────────────────────────────────────────┴────────────────────────────────────┘
```

### 4. Mobile Modules Grid Layout
```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ SINGLE-COLUMN STACKED MODULE CARDS                                                     │
│ ┌────────────────────────────────────────────────────────────────────────────────────┐ │
│ │ Object-Oriented Programming (14.5 Hours | 37 Topics)                               │
│ └────────────────────────────────────────────────────────────────────────────────────┘ │
│ ┌────────────────────────────────────────────────────────────────────────────────────┐ │
│ │ Java Concurrency & JMM (18.0 Hours | 42 Topics)                                     │
│ └────────────────────────────────────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

### 5. Mobile Mission Challenge Layout
```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ TOP HEADER (Exit | Stage 5 of 11: Practice | Sidebar Toggle 📖)                        │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ CHALLENGE PROBLEM STATEMENT                                                            │
│ Code Editor View (Independent Horizontal Scroll)                                      │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ CONFIDENCE: [•] Confident   [ ] Unsure   [ ] Guessing                                  │
│ [ SUBMIT ATTEMPT ──► ]                                                                 │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ BOTTOM NAV (Fixed 56px + Safe Area)                                                    │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

### 6. Mobile Knowledge Sheet Layout
```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ FULL-HEIGHT BOTTOM SHEET (Backdrop Dimmed)                         [ Close ✕ ]         │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 📖 THEORY: Encapsulation Invariants                                                    │
│ Explanations, Callouts, and Tag Chips...                                               │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

### 7. Tablet Topic Grid Layout
```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ 2-COLUMN TABLET CARD GRID                                                              │
│ ┌──────────────────────────────────────┐  ┌──────────────────────────────────────┐ │
│ │ 05. Encapsulation (APPLIED)          │  │ 10. Inheritance (APPLIED)            │ │
│ └──────────────────────────────────────┘  └──────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

# SECTION 43 — COMPONENT INVENTORY

| Component | Purpose | Core Variants | Key States | Responsive Behavior | Accessibility Consideration |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `AppShell` | Global app layout frame | Desktop rail, Mobile bottom nav | Default, Loading | Switches navigation rail at 768px | Landmarks (`<main>`, `<nav>`) |
| `DesktopSidebar` | Desktop navigation rail | Standard | Default, Active, Hover | Hidden below 768px | `aria-current="page"` |
| `MobileBottomNav` | Mobile bottom navigation | Standard | Default, Active | Visible below 768px, safe area padding | 44px min touch target |
| `PageHeader` | Top contextual page header | Standard, Workspace header | Default | Adapts title size on mobile | `<h1>` semantic header |
| `Breadcrumbs` | Hierarchy path navigation | Standard | Default, Hover | Truncates on mobile | `<nav aria-label="Breadcrumb">` |
| `ModuleCard` | Domain card in grid | Available, Beta, Coming Soon | Hover, Focus, Pressed | 4/3/2/1 column layout | Single logical card focus |
| `TopicCard` | Topic node card | Available, Locked, Mastered | Hover, Focus, Disabled | 2 col tablet, 1 col mobile | Locked status label |
| `MissionCard` | Mission scenario card | Available, In Progress | Hover, Focus, Active | Stacked mobile view | Clear primary CTA button |
| `ProgressBar` | Progress indicator | Linear, Compact | Active, Completed | 100% container width | `role="progressbar"` + text value |
| `MasteryBadge` | Concept mastery display | Exposed, Developing, Mastered | Default | Compact mobile view | Text label + icon symbol |
| `ReadinessCard` | Interview readiness radar | Summary, Detailed | Default | Stacked dimensions mobile | Text value fallback |
| `StageStepper` | Mission stage navigation | Desktop horizontal, Mobile dropdown| Completed, Active, Locked | Dropdown below 768px | `aria-current="step"` |
| `ChallengeShell` | Outer frame for challenges | Guided, Applied, Interview | Locked, Unlocked | Full width workspace | Focus trap post-submission |
| `ConfidenceSelector`| Pre-submission confidence | Segmented control | Confident, Unsure, Guessing | Wrap buttons on mobile | `role="radiogroup"` |
| `HintPanel` | Progressive hint stack | Level 1, 2, 3, 4 | Locked, Revealed | Non-shifting accordion | `aria-expanded` attributes |
| `TagChip` | Canonical concept chip | Standard, Selected, Prerequisite| Default, Hover, Active | Wraps inline | Button role + `aria-pressed` |
| `TheorySection` | Prose section container | Mental Model, Risk, Tip | Default | Max 760px prose width | Semantic heading hierarchy |
| `TheoryCheckpoint` | Embedded learning check | Single choice, Multi-select | Default, Checked, Verified | Touch-friendly options | Radio/checkbox roles |
| `CodeViewer` | Code block viewer | Clean, Learning Comments | Default, Selected Line | Independent code scroll | Monospace font legibility |
| `CodeAnnotationPanel`| Line-level commentary | Inline callout, Drawer | Default, Expanded | Collapses to sheet mobile | Keyboard focusable marker |
| `KnowledgeSidebar` | Contextual reference drawer | Split pane, Bottom sheet | Open, Closed | Sheet overlay below 1024px | Focus trap when open |
| `SourceContext` | Provenance display drawer | Collapsed, Expanded | Default, Expanded | Full width container | Collapsible button label |
| `FeedbackPanel` | Result evaluation banner | Correct, Incorrect, Confident Mistake| Default | Sticky bottom mobile | `aria-live="polite"` |
| `MissionResults` | Post-mission summary screen| Standard | Default | Single column stack | Focus title on load |
| `ReviewSessionCard` | Review queue card | Due Now, Caught Up | Default | Responsive card frame | Primary action CTA |
| `EmptyState` | Empty view placeholder | Review Catch-up, No Mistakes | Default | Centered container | Action CTA button focus |
| `ErrorState` | Recovery alert box | Storage warning, Import error | Default | Full width alert | `role="alert"` |
| `ConfirmDialog` | Glassmorphic modal | Danger confirmation (Typed RESET) | Open, Closed | Centered modal overlay | Focus trap + Escape key |
| `LanguageSwitcher` | Language mode selector | English, Russian, Bilingual | Selected state | Segmented control | Accessible radio group |

---

# SECTION 44 — VISUAL ACCEPTANCE CRITERIA

### Scenario 1: Modules Grid Responsive Layout
- **GIVEN** a candidate views the Modules page (`/modules`) on a 1440px desktop screen,
- **WHEN** the page loads,
- **THEN** the Module cards render in a 4-column grid with 24px spacing gaps.

### Scenario 2: Mobile Card Stacking
- **GIVEN** a candidate views the Modules page on a 375px mobile device,
- **WHEN** the page loads,
- **THEN** the cards stack in a single 1-column layout with 16px page gutters and zero horizontal page overflow.

### Scenario 3: Knowledge Sidebar State Preservation
- **GIVEN** a candidate has entered unsubmitted text into a challenge input,
- **WHEN** they click a `#tag` chip or open the Knowledge Sidebar,
- **THEN** the Sidebar slides open contextually without resetting or clearing the entered input.

### Scenario 4: Touch Alternative for Drag and Drop
- **GIVEN** a candidate attempts a Guided Sequence Puzzle on a mobile touch device,
- **WHEN** they tap a puzzle piece,
- **THEN** explicit "Move Up" and "Move Down" buttons allow reordering without requiring HTML5 drag events.

### Scenario 5: Answer Locking Verification
- **GIVEN** a candidate opens a new Interview Challenge,
- **WHEN** they have not submitted an attempt,
- **THEN** the annotated solution code and model speech script remain strictly hidden.

### Scenario 6: Focus Ring Accessibility
- **GIVEN** a keyboard user navigates using the `Tab` key,
- **WHEN** an interactive control (button, card, tag, input) receives focus,
- **THEN** a high-contrast 2px cyan focus ring (`--shadow-focus`) appears around the element.

### Scenario 7: Reduced Motion Compliance
- **GIVEN** a user has enabled `prefers-reduced-motion: reduce` in their system settings,
- **WHEN** drawer panels, modals, or progress bars animate,
- **THEN** transitions execute instantly (`0ms transition`).

---

# SECTION 45 — DESIGN QA CHECKLIST

- [ ] All colors derive strictly from CSS custom property tokens (`--color-*`). Zero hardcoded hex colors in components.
- [ ] Spacing uses 8px grid tokens (`--space-*`). No arbitrary pixel margins.
- [ ] Container elements enforce `max-width: 100vw; overflow-x: hidden;`. Zero horizontal scrolling on page containers.
- [ ] No hover-only functionality. Every interactive action is accessible via click, tap, and keyboard navigation.
- [ ] All interactive elements feature 2px cyan focus rings (`--shadow-focus`) on `:focus-visible`.
- [ ] Touch targets satisfy 44px minimum height/width on mobile viewports.
- [ ] Locked cards remain legible with minimum 0.6 opacity and visible override CTAs.
- [ ] Language switching preserves Java identifiers untranslated across English, Russian, and Bilingual modes.
- [ ] Opening the Knowledge Sidebar preserves active challenge state and unsubmitted form inputs.
- [ ] Progressive hints display transparent XP penalties (-10%, -25%, -50%, -75%).
- [ ] Reset Progress triggers an in-app glassmorphic dialog requiring typed `"RESET"` confirmation.
- [ ] Iconography uses Lucide React with uniform 2px stroke width. Emojis are excluded as primary UI icons.

---

# SECTION 46 — PROPOSED PRODUCT REQUIREMENT AMENDMENTS

Reviewing `PRODUCT_REQUIREMENTS.md` against overall project specifications yields the following recommended amendments:

1. **Enterprise Company Badges Display Rule**:
   - *Current Statement in `PRODUCT_REQUIREMENTS.md` Section 1*: "100% of questions show verified source provenance and company badges."
   - *Correction*: Reconcile with `QUESTION_SOURCES.md` and `DATA_MODEL.md`. Company badges are displayed ONLY when Tier-1 candidate reports provide explicit evidence (`CONFIRMED_PUBLIC_REPORT`). Curated questions or generated practice variations MUST NOT display fake company badges.

2. **XP Reward Structure**:
   - *Current Statement in `PRODUCT_REQUIREMENTS.md`*: Fixed hardcoded XP values in acceptance examples (e.g., "+250 XP").
   - *Correction*: Clarify that XP rewards scale based on challenge difficulty (`FOUNDATION` to `STAFF`) and progressive hint penalties (-10% to -75%).

3. **Iconography and Emojis**:
   - *Current Requirement*: Remove informal emojis as primary UI navigation icons.
   - *Correction*: Enforce Lucide React vector icons across system controls, reserve emojis sparingly for educational callouts.

4. **Glassmorphism Constraint**:
   - *Current Statement*: "rich glassmorphic cards".
   - *Correction*: Clarify that card surfaces use dark slate tones (`#1E293B`) with subtle border lines (`#334155`). Heavy CSS `backdrop-filter: blur()` is restricted to elevated modal backdrops to prevent mobile performance drops.

5. **External Link Offline Handling**:
   - *Current Requirement*: Clarify that when offline, external web source links display a visual "Offline - Link Disabled" badge rather than triggering broken navigation.

---

# SECTION 47 — OPEN DESIGN DECISIONS

| Open Design Decision | Recommended Safe MVP Default |
| :--- | :--- |
| **Navigation Rail Width** | Fixed 240px width on desktop viewports. |
| **Module Card Visuals** | Use Lucide React domain vector icons; exclude heavy custom illustrations. |
| **Sidebar Resizability** | Fixed 380px split pane on desktop for simple implementation; resizable handles deferred to Phase 2. |
| **Code Annotation Format** | Inline expandable callout blocks within the code viewer; side-panel view optional. |
| **Mobile Sidebar Presentation**| Full-height bottom sheet with backdrop dimming and top drag handle. |
| **Progress Charts Technology**| Pure CSS progress bars and HTML/SVG matrix grids; omit heavy 3rd-party charting libraries. |
| **Theme Selection** | Dark Technical Banking Theme (`#0B0F19`) is the standard default theme. |

---

```text
[ END OF UI & INTERACTION GUIDELINES SPECIFICATION DOCUMENT ]
```
