import React from 'react';
import { useApp } from '../context/AppContext';
import { ThiruvalluvarAvatar } from '../components/common/ThiruvalluvarAvatar';
import { ScenarioFemaleIllustration } from '../components/common/ScenarioFemaleIllustration';
import {
  Scale,
  Sparkles,
  BookOpen,
  Bot,
  Network,
  Trophy,
  ArrowRight,
  Shield,
  CheckCircle2,
  Users,
  Flame,
  Award,
  Layers,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setActiveTab, setSelectedScenarioNumber, openKuralModalByNumber } = useApp();

  return (
    <div className="space-y-16 py-4 animate-in fade-in duration-300">
      {/* 1. Hero Section */}
      <section className="relative p-8 sm:p-12 lg:p-16 rounded-3xl bg-gradient-to-br from-[#0E1330] via-indigo-950 to-slate-950 text-white shadow-2xl overflow-hidden border border-indigo-900/60">
        {/* Ambient Glowing Orbs */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-10 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            {/* Pill Header */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-extrabold bg-gradient-to-r from-amber-400/20 to-yellow-400/10 text-amber-300 border border-amber-400/30 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Indian Law + Thirukkural Ethics + AI Simulation
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-heading tracking-tight leading-tight text-white">
                JUSTICE AI
              </h1>
              <p className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-amber-200 via-yellow-100 to-white bg-clip-text text-transparent">
                "Learn Law. Live Ethics. Think Responsibly."
              </p>
            </div>

            <p className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed">
              The premier interactive legal-ethics platform bridging 2,000+ years of classical Indian moral philosophy (Thirukkural) with modern constitutional law, statutory frameworks, and professional responsibilities.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => {
                  setSelectedScenarioNumber(3);
                  setActiveTab('scenario-challenge');
                }}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 text-sm font-black text-slate-950 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 rounded-2xl shadow-lg shadow-amber-400/20 transition-all hover:scale-102 active:scale-98"
              >
                <Scale className="w-4 h-4" />
                Launch Scenario Challenge
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setActiveTab('kural-quest')}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl backdrop-blur-md transition-all hover:scale-102"
              >
                <BookOpen className="w-4 h-4 text-amber-300" />
                Explore Kural Quest
              </button>
            </div>

            {/* Micro proof points */}
            <div className="flex items-center gap-6 pt-4 text-xs font-semibold text-slate-300 border-t border-indigo-900/60">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                10 Interactive Scenarios
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                1,330 Ethical Verses
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                AI-Assisted Tutor
              </div>
            </div>
          </div>

          {/* Right Hero Illustration Preview */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative p-6 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-md shadow-2xl max-w-sm w-full space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-300 uppercase">Live Preview</span>
                <span className="px-2 py-0.5 text-[10px] font-extrabold bg-indigo-600 rounded-md">Scenario 3</span>
              </div>
              <ScenarioFemaleIllustration className="w-full" />
              <div className="p-3 bg-white/10 rounded-xl space-y-1">
                <h4 className="text-xs font-bold text-white">Scenario: Conflict of Interest</h4>
                <p className="text-[11px] text-slate-300 line-clamp-2">
                  "Senior advocate discovers rival firm is owned by a close family member..."
                </p>
              </div>
              <button
                onClick={() => {
                  setSelectedScenarioNumber(3);
                  setActiveTab('scenario-challenge');
                }}
                className="w-full py-2 text-xs font-bold text-slate-950 bg-amber-400 rounded-xl hover:bg-amber-300 text-center block"
              >
                Solve Scenario Now →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Three Pillars of Justice AI */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-black uppercase tracking-widest text-indigo-600">
            Educational Architecture
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-slate-900">
            How Justice AI Transforms Legal-Ethics Learning
          </h2>
          <p className="text-sm text-slate-500">
            Moving beyond dry rote memorization to immersive scenario reflection and timeless philosophical reasoning.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Pillar 1 */}
          <div className="p-8 bg-white rounded-3xl border border-slate-200/80 shadow-2xs hover:border-indigo-300 hover:shadow-md transition-all space-y-4">
            <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600">
              <Scale className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 font-heading">
              1. Scenario-Based Dilemmas
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Evaluate real-world Indian legal dilemmas involving fiduciary duties, client confidentiality, whistleblowing, judicial impartiality, and digital privacy.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="p-8 bg-white rounded-3xl border border-slate-200/80 shadow-2xs hover:border-indigo-300 hover:shadow-md transition-all space-y-4">
            <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-50 text-amber-600">
              <Sparkles className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 font-heading">
              2. Thirukkural Moral Framework
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Root legal jurisprudence in the classical wisdom of Saint Thiruvalluvar. Connect 133 chapters on Aram (Virtue) and Porul (Statecraft) with modern law.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="p-8 bg-white rounded-3xl border border-slate-200/80 shadow-2xs hover:border-indigo-300 hover:shadow-md transition-all space-y-4">
            <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600">
              <Bot className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 font-heading">
              3. AI-Assisted Multi-Perspective Tutor
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Explore dynamic multi-angle explanations that contrast pure statutory legality against higher ethical duties and prosocial outcomes.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Core Modules Grid */}
      <section className="p-8 sm:p-12 bg-slate-900 rounded-3xl text-white space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              Comprehensive Platform Features
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-white mt-1">
              Explore the Learning Suite
            </h2>
          </div>
          <button
            onClick={() => setActiveTab('dashboard')}
            className="text-xs font-bold text-indigo-300 hover:text-white flex items-center gap-1.5"
          >
            Enter Dashboard <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div
            onClick={() => setActiveTab('kural-quest')}
            className="p-5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl cursor-pointer transition-all space-y-3"
          >
            <Sparkles className="w-6 h-6 text-amber-400" />
            <h4 className="text-sm font-bold">Kural Quest</h4>
            <p className="text-xs text-slate-400">Searchable couplets categorized by moral concept & Paal.</p>
          </div>

          <div
            onClick={() => setActiveTab('knowledge-graph')}
            className="p-5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl cursor-pointer transition-all space-y-3"
          >
            <Network className="w-6 h-6 text-indigo-400" />
            <h4 className="text-sm font-bold">Knowledge Graph</h4>
            <p className="text-xs text-slate-400">Interactive visual network linking ethics, Kurals, and statutes.</p>
          </div>

          <div
            onClick={() => setActiveTab('leaderboard')}
            className="p-5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl cursor-pointer transition-all space-y-3"
          >
            <Trophy className="w-6 h-6 text-yellow-400" />
            <h4 className="text-sm font-bold">Leaderboard</h4>
            <p className="text-xs text-slate-400">Track streaks, XP scores, and national ethical accuracy.</p>
          </div>

          <div
            onClick={() => setActiveTab('rewards')}
            className="p-5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl cursor-pointer transition-all space-y-3"
          >
            <Award className="w-6 h-6 text-emerald-400" />
            <h4 className="text-sm font-bold">Badges & Rewards</h4>
            <p className="text-xs text-slate-400">Unlock certifications and celebrate moral milestones.</p>
          </div>
        </div>
      </section>

      {/* 4. Footer */}
      <footer className="pt-8 border-t border-slate-200 text-center space-y-3 text-xs text-slate-500">
        <div className="flex items-center justify-center gap-2 text-slate-900 font-bold font-heading text-sm">
          <Scale className="w-4 h-4 text-indigo-600" />
          JUSTICE AI • Learn Law. Live Ethics. Think Responsibly.
        </div>
        <p className="max-w-xl mx-auto text-[11px] text-slate-400 leading-relaxed">
          Educational simulation platform. Justice AI is designed for academic, philosophical, and pedagogical inquiry. It does not furnish formal legal counsel.
        </p>
        <p className="text-[10px] text-slate-400">
          Phase 1 Interactive Prototype • Clean Modular Architecture for Phase 2/3 Backend & RAG Integration
        </p>
      </footer>
    </div>
  );
};
