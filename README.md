# ⚖️ KuralSaar AI — Dual-Corpus Legal & Ethics Platform
> **"Learn Law. Live Ethics. Think Responsibly."**  
> *Connecting 2,000+ years of classical Indian moral philosophy (Thirukkural) with modern constitutional law, statutory frameworks, and professional responsibilities.*

[![React 19](https://img.shields.io/badge/React-19.0.1-blue.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-3178C6.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-v24+-339933.svg)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express-4.21.2-000000.svg)](https://expressjs.com/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38B2AC.svg)](https://tailwindcss.com/)
[![Google GenAI](https://img.shields.io/badge/Google%20GenAI-Gemini%202.5-orange.svg)](https://ai.google.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## 📌 Executive Summary

**KuralSaar AI** is a state-of-the-art educational legal-ethics platform designed to bridge classical Tamil moral philosophy (**Thirukkural**) with **modern Indian statutory law and constitutional jurisprudence**. Moving beyond dry rote memorization, KuralSaar AI engages students, advocates, educators, and citizens through **interactive scenario simulations, dual-corpus AI tutoring, knowledge graphs, and gamified mastery journeys**.

---

## 🛠️ Complete Tech Stack Breakdown

This breakdown is curated for presentations, project reports, and technical architecture decks:

### 1. Frontend Architecture
| Category | Technology | Purpose & Implementation |
|---|---|---|
| **Core Framework** | **React 19** (`v19.0.1`) | Modern component architecture, functional hooks, concurrent rendering, strict DOM state management. |
| **Language** | **TypeScript** (`v5.8.2`) | End-to-end static typing across models, routes, API payloads, and state machines. |
| **Build & Dev Server** | **Vite** (`v6.2.3`) | Blazing fast HMR, optimized tree-shaking, and ES module bundling. |
| **Styling & Design** | **Tailwind CSS v4** + Custom CSS | Glassmorphism, CSS Grid architecture, semantic color variables, dark/light contrast. |
| **Icons & Visuals** | **Lucide React** (`v0.546.0`) | Clean, accessible vector iconography for legal scales, books, badges, and status cues. |
| **Animations & Motion** | **Motion / Framer Motion** (`v12.23.24`) | Smooth page transitions, modal spring physics, collapsible sidebar transitions. |
| **Celebrations** | **Canvas-Confetti** (`v1.9.4`) | High-performance confetti particle system for badge unlocks and scenario milestones. |

### 2. Backend & API Services
| Category | Technology | Purpose & Implementation |
|---|---|---|
| **Server Framework** | **Express.js** (`v4.21.2`) | RESTful API routing, payload parsers, dataset serving, and middleware orchestration. |
| **Runtime & Execution**| **Node.js** + **TSX** (`v4.21.0`) | Native TypeScript execution engine with high memory allocation (`--max-old-space-size=12288`). |
| **Bundling & Production**| **ESBuild** (`v0.25.0`) | Production server compilation into single optimized CommonJS bundle (`dist/server.cjs`). |
| **Environment Config** | **Dotenv** (`v17.2.3`) | Safe API key loading (`GEMINI_API_KEY`, `PORT`, `NODE_ENV`). |

### 3. Artificial Intelligence & NLP Engine
| Category | Technology | Purpose & Implementation |
|---|---|---|
| **AI LLM Engine** | **Google Gemini 2.5 Flash** (`@google/genai v2.4.0`) | Grounded dual-corpus reasoning, statutory mapping, and interactive Socratic tutoring. |
| **Explainability Engine**| **8-Step Reasoning Tracing** | Step-by-step audit trail showing how AI connects ethical maxims with legal penal codes. |
| **Retrieval & Ingestion**| **In-Memory Dataset Preprocessor** | Tokenization, TF-IDF / inverted index matching across 1,330 Kurals and 52 legal statutes. |

### 4. Audio & Community Multimedia
| Category | Technology | Purpose & Implementation |
|---|---|---|
| **Audio Synthesis** | **Web Speech API (TTS)** | Native Tamil and English pronunciation of 1,330 couplets with phonetic accent support. |
| **Voice Recording** | **MediaStream Recording API** | In-browser high-fidelity audio capture with live decibel waveform visualization. |
| **Audio Encoding** | **Base64 WebM/WAV Streamer** | Direct binary serialization of user audio for forum discussions and voice answers. |

### 5. Data Storage & Persistence
| Category | Technology | Purpose & Implementation |
|---|---|---|
| **Persistence Engine** | **File-System JSON Storage** | Server-side `.data/` persistence for user progress, unlocked badges, streaks, and forum threads. |
| **Client Storage** | **Browser LocalStorage** | Instant client caching with background bidirectional server synchronization (`/api/progress/sync`). |

---

## 🏛️ Conceptual Architecture: "Connecting Ancient Wisdom with Modern Society"

KuralSaar AI is built upon an ontological dual-corpus model that translates classical ethical aphorisms into actionable constitutional conduct:

```
                          ┌──────────────────────────┐
                          │         Chapter          │
                          │ (e.g. Good Conduct Ch 14)│
                          └─────────────┬────────────┘
                                        │ belongs to
                                        ▼
┌──────────────────┐  conveys   ┌──────────────────────────┐  promotes   ┌──────────────────┐
│     Concept      │ ◄───────── │   Thirukkural (Kural)    │ ──────────► │  Ethical Value   │
│ (Honesty, Justice)│           │     (1,330 Couplets)     │             │ (Integrity, Duty)│
└──────────────────┘           └─────────────┬────────────┘             └─────────┬────────┘
        ▲                                     │                                    │ develops
        │                                     │                                    ▼
┌───────┴──────────┐                          │                          ┌──────────────────┐
│   AI Reasoning   │ ─── retrieves ───────────┤                          │    Life Skill    │
│  (8-Step Trace)  │                          │                          │ (Decision Making)│
└───────┬──────────┘                          │                          └─────────┬────────┘
        │ suggests                            │                                    │ supports
        ▼                                     │                                    ▼
┌──────────────────┐                          │                          ┌──────────────────┐
│Recommended Action│                          │                          │ Legal Principle  │
│(Report Misconduct)                          │                          │  (Rule of Law)   │
└───────┬──────────┘                          │                          └─────────┬────────┘
        │ requires                            ▼                                    │ reflected in
        ▼                         ┌──────────────────────────┐                     ▼
┌──────────────────┐  involves    │         Scenario         │  applies to   ┌──────────────────┐
│     Conflict     │ ◄─────────── │ (e.g. Case #1: Bribery)  │ ────────────► │   Law / Section  │
│ (Dilemma/Quid Pro)│              └──────────────────────────┘               │ (PCA Sec 7, BNS) │
└──────────────────┘                                                         └──────────────────┘
```

### 🔁 End-to-End Sample Reasoning Pipeline:
1. **Kural (Verse)**: *"ஒழுக்கம் விழுப்பம் தரலான் ஒழுக்கம் உயிரினும் ஓம்பப் படும்."* (Kural 131)
2. ➔ **Ethical Value**: Integrity & Unwavering Professional Dignity
3. ➔ **Life Skill**: Ethical Decision Making & Resisting Illicit Pressure
4. ➔ **Legal Principle**: Anti-Corruption & Fiduciary Loyalty
5. ➔ **Law / Section**: Prevention of Corruption Act Sec 7 & IPC 171B
6. ➔ **Scenario Simulation**: Public official demands kickback for licensing approval.
7. ➔ **Recommended Action**: Refuse inducement and report through official vigilance channels.
*🌿 From Words to Wisdom → From Values to Action → Towards a Just Society 🌿*

---

## 🌟 Core Modules & Platform Features

### 1. 📜 Kural Quest (1,330 Ethical Verses)
- Complete corpus of all **1,330 couplets** across all **133 chapters** and 3 Paals (*Aram, Porul, Inbam*).
- **Phonetic & Tamil Search**: Real-time searching across Tamil script, English translation, transliteration, and moral tags.
- **Audio Recitation**: Integrated native audio synthesis for authentic Tamil couplet pronunciation.
- **Interactive Couplet Dialog**: Deep dive into word-by-word meaning, Parimelazhagar commentary, and modern legal parallels.

### 2. ⚖️ Interactive Scenario Challenge (12 Case Dilemmas)
- Real-world dilemmas spanning:
  - *Conflict of Interest in Law Firms*
  - *Cyber Fraud & Perjury*
  - *Bribery & Fiduciary Corruption*
  - *Arbitrary Executive Power & Environmental Accountability*
  - *Confidentiality, Peer Pressure & Discrimination*
- **Gamified 4-Option Decision Engine**: Users deliberate on ethical and legal trade-offs with immediate feedback.
- **XP & Streak System**: Earn XP points and build daily learning streaks for correct ethical choices.

### 3. 🤖 Dual-Corpus AI Legal-Ethics Tutor
- Powered by **Google Gemini 2.5 Flash** with custom system prompts grounding every answer in dual corpora.
- **Full 8-Step Reasoning Trace**: Transparently discloses *Retrieval ➔ Ethical Virtues ➔ Statutory Mandates ➔ Synthesis ➔ Actionable Advice*.
- **One-Click Query Buttons**: Instant Socratic prompts for any chapter, law, or ethical dilemma.

### 4. 🕸️ Interactive Knowledge Graph & Guided Learning Pathways
- **Interactive Network Flow**: Visualizes nodes (Chapters, Kurals, Ethical Concepts, Legal Concepts) and their semantic links (`BELONGS_TO`, `TEACHES`, `MAPS_TO`).
- **4 Guided Pathways**:
  1. *Impartiality & Natural Justice* (Kural 111 ➔ Art. 21 & Nemo Judex)
  2. *Propriety of Conduct & Integrity* (Kural 131 ➔ PCA Sec 7)
  3. *Veracity, Oaths & Evidence* (Kural 291 ➔ Oaths Act & BSA Sec 3)
  4. *Righteous Governance & Leadership* (Kural 541 ➔ Art. 14, 32 & 226)
- **100% Clickable Working State**: Every node triggers live AI tutoring, modal inspections, or scenario challenges.

### 5. 📚 Classical Ethics Library (12 Canonical Moral Domains)
- Systematic categorization into 12 core moral dimensions:
  *Impartiality & Equity, Veracity & Truthfulness, Propriety of Conduct, Self-Control & Restraint, Compassion & Benevolence, Righteous Governance, Social Duty & Gratitude, Judicial Equanimity, Professional Dignity, Courtroom Decorum, Purity of Action, Universal Moral Duty.*
- Displays mastery percentages, related couplets, and statutory cross-references.

### 6. 🏆 Gamified Progression, Badges & Global Leaderboard
- **10 Unlockable Achievements**: e.g., *Moral Initiate, Constitutional Guardian, Dharma Scholar, Master Jurist*.
- **Live Leaderboard**: Tracks weekly rankings, solved cases, and XP tallies.
- **Milestone Celebrations**: Canvas confetti fireworks upon badge unlocks.

### 7. 🎙️ Community Discussion Forum
- Collaborative space for ethical deliberations.
- **Voice Player & Voice Recorder**: Record voice reflections directly in browser with real-time waveform meters and playback.

### 8. 🌐 100% Trilingual Localization (English, Tamil, Hindi)
- Seamless dynamic switching between **English**, **தமிழ் (Tamil)**, and **हिंदी (Hindi)** across all UI elements, scenarios, options, badges, and tutor dialogues.
- Styled with Google **Noto Sans Tamil** and **Noto Sans Devanagari** typography.

---

## 📁 Repository Structure

```
JUSTICE-AI/
├── .data/                       # Local JSON database stores
│   ├── forum_posts.json         # Discussion threads and audio comments
│   ├── leaderboard.json         # User rankings and scores
│   └── user_progress.json       # User XP, streak, badges, solved cases
├── server/                      # Backend Express TypeScript Engine
│   ├── data/
│   │   ├── kuralDataset.ts      # 1,330 Kurals with authentic verses & meanings
│   │   ├── legalDataset.ts      # 52 Statutory Law QA records
│   │   └── scenarioDataset.ts   # 12 Interactive Scenario Challenge cases
│   ├── preprocessing/
│   │   └── datasetPreprocessor.ts# In-memory ingestion and indexing engine
│   ├── routes/
│   │   ├── kurals.ts            # Kural search and retrieval APIs
│   │   ├── legal.ts             # Statutory law endpoints
│   │   ├── scenarios.ts         # Scenario validation and feedback APIs
│   │   ├── retrieval.ts         # Dual-corpus AI Tutor query endpoints
│   │   ├── knowledgeGraph.ts    # Graph nodes and edges generation
│   │   ├── badges.ts            # Badge definitions and unlock logic
│   │   ├── leaderboard.ts       # Live rankings
│   │   ├── forum.ts             # Forum CRUD and audio upload
│   │   └── health.ts            # Dataset diagnostics and health check
│   └── services/
│       └── knowledgeGraphService.ts# Graph topology service
├── src/                         # Frontend React 19 Application
│   ├── components/
│   │   ├── common/              # Modals (KuralDetail, StepAiTutor, BadgeUnlock)
│   │   ├── dashboard/           # Metrics, progress charts, hero components
│   │   ├── forum/               # VoiceRecorder, VoicePlayer, PostCards
│   │   ├── kural/               # KuralCard, search filter controls
│   │   └── layout/              # Sidebar, Navigation, Header
│   ├── context/
│   │   └── AppContext.tsx       # Global state (Language, XP, Modals, Progress)
│   ├── i18n/                    # Localization dictionaries
│   │   ├── translations.ts      # EN / TA / HI UI translation dictionary
│   │   ├── kuralLocalizations.ts# Localized chapter and concept names
│   │   └── scenarioLocalizations.ts# 12 Localized scenario case studies
│   ├── pages/                   # Main Page Views
│   │   ├── DashboardPage.tsx    # Command center and skill analytics
│   │   ├── KuralQuestPage.tsx   # 1,330 Kurals explorer
│   │   ├── ScenarioChallengePage.tsx # Interactive cases
│   │   ├── AiTutorPage.tsx      # Dual-Corpus AI Mentor
│   │   ├── KnowledgeGraphPage.tsx# Interactive Graph & Architecture Network
│   │   ├── EthicsLibraryPage.tsx# 12 Moral Domains
│   │   ├── LeaderboardPage.tsx  # Rankings
│   │   ├── RewardsPage.tsx      # Badges and achievements
│   │   └── DiscussionForumPage.tsx # Community forum with voice
│   └── index.css                # Tailwind CSS v4 & custom typography
├── server.ts                    # Root Express + Vite development server
├── package.json                 # Project dependencies & scripts
├── tsconfig.json                # TypeScript compiler configuration
└── vite.config.ts               # Vite bundler configuration
```

---

## ⚡ Quick Start & Installation

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm** or **bun** / **yarn**

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/supriya1411/KuralSaar-AI.git
cd KuralSaar-AI
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the root folder (optional for local mock mode, required for live Gemini AI):
```env
PORT=3000
NODE_ENV=development
GEMINI_API_KEY=your_gemini_api_key_here
```

### 3. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your web browser.

### 4. Build for Production
```bash
npm run build
npm start
```

---

## 📽️ Presentation / PPT Slide-by-Slide Guide

Use this outline directly to build a pitch deck or presentation:

| Slide # | Slide Title | Key Bullet Points to Present |
|---|---|---|
| **Slide 1** | **Title & Hook** | • **KuralSaar AI**: Learn Law. Live Ethics. Think Responsibly.<br>• Pairing 2,000+ years of classical Indian moral philosophy with modern constitutional law. |
| **Slide 2** | **The Problem** | • Dry, rote-memorization of legal sections without moral anchoring.<br>• Disconnect between classical ethical heritage and contemporary civic responsibility.<br>• Lack of interactive, scenario-based learning tools for law and ethics. |
| **Slide 3** | **The Solution: Dual-Corpus Learning** | • **Dual Corpora Integration**: 1,330 Thirukkural couplets + 52 Indian Statutory Acts & Articles.<br>• **Explainable AI (XAI)**: 8-step transparent audit trace connecting ethics to legal sections.<br>• **Scenario Simulations**: Real-world dilemmas with measurable learning outcomes. |
| **Slide 4** | **Core Architecture & Tech Stack** | • **Frontend**: React 19, TypeScript, Tailwind CSS v4, Motion, Lucide Icons.<br>• **Backend**: Express.js, Node.js v24, In-Memory NLP Indexing Engine.<br>• **AI & Speech**: Google Gemini 2.5 Flash, Web Speech API (TTS), MediaStream Audio Recorder. |
| **Slide 5** | **Ontology & Guided Pathways** | • **"Connecting Ancient Wisdom with Modern Society"**: Concept ➔ Chapter ➔ Value ➔ AI Reasoning ➔ Action ➔ Conflict ➔ Scenario ➔ Law.<br>• 4 Curated Pathways (Natural Justice, Integrity, Veracity, Governance). |
| **Slide 6** | **Product Walkthrough & Demo Highlights** | • **Kural Quest**: Phonetic search, Tamil audio pronunciation, and chapter filters.<br>• **Scenario Challenge**: 12 interactive Indian legal dilemmas with XP and immediate reflection.<br>• **AI Tutor**: Socratic dialog grounded in constitutional and ethical corpora. |
| **Slide 7** | **Inclusion & Accessibility** | • **100% Trilingual Support**: English, தமிழ், and हिंदी across all modules.<br>• **Voice-Enabled Discussion Forum**: Record and play audio responses. |
| **Slide 8** | **Impact & Future Roadmap** | • **Target Audience**: Law students, competitive exam aspirants (UPSC/Judiciary), schools, corporate compliance teams.<br>• **Future Vision**: Expanding to regional languages, legal mock court VR simulations, and automated compliance benchmarking. |

---

## 👥 Contributors & Acknowledgements
- **Author / Lead Developer**: [Supriya](https://github.com/supriya1411)
- **Repository**: [https://github.com/supriya1411/KuralSaar-AI](https://github.com/supriya1411/KuralSaar-AI)
- **Classical Reference**: *Thiruvalluvar's Thirukkural* (Translations by G.U. Pope & Tamil Virtual Academy).
- **Statutory Corpus**: *Constitution of India, Bharatiya Nyaya Sanhita (BNS), Prevention of Corruption Act, Bharatiya Sakshya Adhiniyam*.

---
*Distributed under the MIT License.*
