# Java Mission Control

> **Practice. Diagnose. Explain. Master.**

**Java Mission Control** is a polished, local-first web application designed for Senior Java Backend Engineers preparing for top-tier tech and banking interviews (especially Citi, JPMorgan, and major tech firms).

Instead of passive Q&A memorization, Java Mission Control engages engineers through **active recall, interactive code line bug hunting, drag-and-drop causal sequence puzzles, trade-off design decisions, and keyword-matched interview answer practice**.

---

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Local Development Server

```bash
npm run dev
```

Open your browser to `http://localhost:5173`. The application runs 100% locally in your browser without any backend required.

### 3. Open on iPhone / iPad / Tablet (Same Local Wi-Fi Network)

To test the application on your mobile device or iPhone Safari:

```bash
npm run dev -- --host
```

> **Note for Windows Users:** If your phone cannot connect, ensure **Windows Firewall** permits Node.js / Port 5173 traffic on Private Networks.

### 4. Build for Production Deployment

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

The generated `/dist` folder is completely static and can be deployed directly to Vercel, Netlify, Cloudflare Pages, Railway, GitHub Pages, or any static file host.

---

## 🛠️ Technology Stack

- **Core Framework**: React 18 + TypeScript + Vite
- **Routing**: React Router v6
- **State Management**: Zustand
- **Local Persistence**: Dexie.js (IndexedDB wrapper)
- **Drag-and-Drop**: `@dnd-kit/core`, `@dnd-kit/sortable` (with mobile tap-to-select fallback)
- **UI Animations**: Framer Motion & Canvas Confetti
- **Icons**: Lucide React
- **PWA / Offline**: `vite-plugin-pwa` for full zero-network offline execution

---

## 🎯 Architecture & Learning Design

### 1. Active Recall & 10-Stage Mission Loop
Every topic is structured as a vertical slice consisting of 10 stages:
1. **Scenario Introduction**: Real-world production outage story.
2. **Concept Primer**: Essential JVM/HashMap internal mechanics.
3. **Guided Puzzle**: Drag & drop sequence of causal events + distractor card elimination.
4. **Bug Hunt**: Interactive Java code snippet with line selection.
5. **Fix Builder**: Multi-select valid production fixes vs dangerous quick fixes.
6. **Trade-Off Challenge**: Senior architectural choice with nuanced feedback.
7. **Interview Answer**: Free-text response with 90s timer, local concept/keyword matcher, and self-assessment.
8. **Reference Answer**: Interview-ready answer, candidate mistakes, follow-up Q&A, and Java 17 model code.
9. **Reflection**: Save personal production rules to local notes.
10. **Mission Results**: Celebration confetti, XP breakdown, and concept mastery update.

### 2. Transparent Mastery Algorithm
Concept mastery scores (0–100%) update in IndexedDB using a transparent local formula:
- **Correct attempt (Confident, 0 hints)**: +25 points
- **Correct attempt (Unsure, 0 hints)**: +18 points
- **Correct attempt (With hints)**: +10 points
- **Incorrect attempt (Unsure / Guessing)**: -10 points
- **Incorrect attempt (CONFIDENT)**: -25 points *(Penalizes overconfidence on flawed concepts)*

### 3. Spaced Repetition Queue
Calculates review intervals dynamically without background servers:
- **Incorrect attempt**: Review in 10 minutes
- **Correct with hints**: Review in 1-2 days
- **Correct without hints**: Review in 4 days
- **High mastery (>=80)**: Review in 7 days

---

## ⚙️ Features

- **3 Language Modes**: English (EN), Russian (RU), or Bilingual side-by-side mode.
- **Offline & PWA Ready**: Installable on desktop & mobile devices.
- **Export & Import Backup**: Save and restore your entire progress as a JSON file.
- **Zero Third-Party APIs**: Works completely offline without OpenAI, Firebase, or external servers.
