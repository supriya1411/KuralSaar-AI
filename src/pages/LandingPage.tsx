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
    <div className="space-y-16 py-4 animate-in fade-in duration-300 pb-12">
      {/* 1. Hero Section */}
      <section className="relative p-8 sm:p-12 lg:p-16 rounded-2xl bg-white text-slate-900 shadow-2xs border border-slate-200">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            {/* Pill Header */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black bg-amber-100 text-amber-900 border border-amber-300">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              Indian Law + Thirukkural Ethics + AI Simulation
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-heading tracking-tight leading-tight text-[#071B3A]">
                JUSTICE AI
              </h1>
              <p className="text-xl sm:text-2xl font-extrabold text-blue-700">
                "Learn Law. Live Ethics. Think Responsibly."
              </p>
            </div>

            <p className="text-sm sm:text-base text-slate-600 max-w-xl leading-relaxed font-medium">
              The premier interactive legal-ethics platform bridging 2,000+ years of classical Indian moral philosophy (Thirukkural) with modern constitutional law, statutory frameworks, and professional responsibilities.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => {
                  setSelectedScenarioNumber(3);
                  setActiveTab('scenario-challenge');
                }}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 text-sm font-extrabold text-white bg-[#071B3A] hover:bg-[#0A2540] rounded-xl shadow-2xs transition-all cursor-pointer"
              >
                <Scale className="w-4 h-4 text-amber-400" />
                Launch Scenario Challenge
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setActiveTab('kural-quest')}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl transition-all cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-blue-600" />
                Explore Kural Quest
              </button>
            </div>

            {/* Micro proof points */}
            <div className="flex items-center gap-6 pt-4 text-xs font-bold text-slate-600 border-t border-slate-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                10 Interactive Scenarios
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-600" />
                1,330 Ethical Verses
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                AI-Assisted Tutor
              </div>
            </div>
          </div>

          {/* Right Hero Illustration Preview */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative p-5 bg-slate-50 border border-slate-200 rounded-2xl shadow-2xs max-w-sm w-full space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-slate-400 uppercase tracking-wider">Live Preview</span>
                <span className="px-2.5 py-0.5 text-[10px] font-black bg-blue-600 text-white rounded-md">Scenario 3</span>
              </div>

              <div className="relative h-44 rounded-xl overflow-hidden border border-slate-200">
                <img
                  src="/assets/images/thiruvalluvar_statue.jpg"
                  alt="Thiruvalluvar Legal Statue"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                <div className="absolute bottom-2 left-3 right-3 text-white">
                  <h4 className="text-xs font-bold">Thirukkural Ethics & Jurisprudence</h4>
                </div>
              </div>

              <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
                <h4 className="text-xs font-extrabold text-[#071B3A]">Scenario: Conflict of Interest</h4>
                <p className="text-[11px] text-slate-600 line-clamp-2 font-medium">
                  "Senior advocate discovers rival firm is owned by a close family member..."
                </p>
              </div>

              <button
                onClick={() => {
                  setSelectedScenarioNumber(3);
                  setActiveTab('scenario-challenge');
                }}
                className="w-full py-2.5 text-xs font-extrabold text-white bg-[#071B3A] hover:bg-[#0A2540] rounded-xl text-center block cursor-pointer transition-colors"
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
          <span className="text-xs font-black uppercase tracking-widest text-blue-700">
            Educational Architecture
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-[#071B3A]">
            How Justice AI Transforms Legal-Ethics Learning
          </h2>
          <p className="text-sm text-slate-600 font-medium">
            Moving beyond dry rote memorization to immersive scenario reflection and timeless philosophical reasoning.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Pillar 1 */}
          <div className="p-8 bg-white rounded-2xl border border-slate-200 shadow-2xs hover:border-blue-400 transition-all space-y-4">
            <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-blue-50 text-blue-900 font-bold border border-blue-100">
              <Scale className="w-7 h-7 text-blue-600" />
            </div>
            <h3 className="text-lg font-extrabold text-[#071B3A] font-heading">
              1. Scenario-Based Dilemmas
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Evaluate real-world Indian legal dilemmas involving fiduciary duties, client confidentiality, whistleblowing, judicial impartiality, and digital privacy.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="p-8 bg-white rounded-2xl border border-slate-200 shadow-2xs hover:border-blue-400 transition-all space-y-4">
            <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-amber-50 text-amber-950 font-bold border border-amber-200">
              <Sparkles className="w-7 h-7 text-amber-600" />
            </div>
            <h3 className="text-lg font-extrabold text-[#071B3A] font-heading">
              2. Thirukkural Moral Framework
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Root legal jurisprudence in the classical wisdom of Saint Thiruvalluvar. Connect 133 chapters on Aram (Virtue) and Porul (Statecraft) with modern law.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="p-8 bg-white rounded-2xl border border-slate-200 shadow-2xs hover:border-blue-400 transition-all space-y-4">
            <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-emerald-50 text-emerald-950 font-bold border border-emerald-200">
              <Bot className="w-7 h-7 text-emerald-600" />
            </div>
            <h3 className="text-lg font-extrabold text-[#071B3A] font-heading">
              3. AI-Assisted Multi-Perspective Tutor
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Explore dynamic multi-angle explanations that contrast pure statutory legality against higher ethical duties and prosocial outcomes.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Core Modules Grid */}
      <section className="p-8 sm:p-12 bg-[#071B3A] rounded-2xl text-white space-y-8 shadow-xs border border-slate-800">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-black text-amber-400 uppercase tracking-wider">
              Comprehensive Platform Features
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-white mt-1">
              Explore the Learning Suite
            </h2>
          </div>
          <button
            onClick={() => setActiveTab('dashboard')}
            className="text-xs font-bold text-amber-300 hover:text-white flex items-center gap-1.5 cursor-pointer"
          >
            Enter Dashboard <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div
            onClick={() => setActiveTab('kural-quest')}
            className="p-5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl cursor-pointer transition-all space-y-3"
          >
            <Sparkles className="w-6 h-6 text-amber-400" />
            <h4 className="text-sm font-extrabold">Kural Quest</h4>
            <p className="text-xs text-slate-300 font-medium">Searchable couplets categorized by moral concept & Paal.</p>
          </div>

          <div
            onClick={() => setActiveTab('knowledge-graph')}
            className="p-5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl cursor-pointer transition-all space-y-3"
          >
            <Network className="w-6 h-6 text-blue-400" />
            <h4 className="text-sm font-extrabold">Knowledge Graph</h4>
            <p className="text-xs text-slate-300 font-medium">Interactive visual network linking ethics, Kurals, and statutes.</p>
          </div>

          <div
            onClick={() => setActiveTab('leaderboard')}
            className="p-5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl cursor-pointer transition-all space-y-3"
          >
            <Trophy className="w-6 h-6 text-amber-400" />
            <h4 className="text-sm font-extrabold">Leaderboard</h4>
            <p className="text-xs text-slate-300 font-medium">Track streaks, XP scores, and national ethical accuracy.</p>
          </div>

          <div
            onClick={() => setActiveTab('rewards')}
            className="p-5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl cursor-pointer transition-all space-y-3"
          >
            <Award className="w-6 h-6 text-emerald-400" />
            <h4 className="text-sm font-extrabold">Badges & Rewards</h4>
            <p className="text-xs text-slate-300 font-medium">Unlock certifications and celebrate moral milestones.</p>
          </div>
        </div>
      </section>

      {/* 4. Footer */}
      <footer className="pt-8 border-t border-slate-200 text-center space-y-3 text-xs text-slate-500">
        <div className="flex items-center justify-center gap-2 text-[#071B3A] font-extrabold font-heading text-sm">
          <Scale className="w-4 h-4 text-blue-600" />
          JUSTICE AI • Learn Law. Live Ethics. Think Responsibly.
        </div>
        <p className="max-w-xl mx-auto text-[11px] text-slate-500 leading-relaxed font-medium">
          Educational simulation platform. Justice AI is designed for academic, philosophical, and pedagogical inquiry. It does not furnish formal legal counsel.
        </p>
        <p className="text-[10px] text-slate-400 font-bold">
          Justice AI Educational Platform • Connecting Indian Law with Thirukkural Ethics
        </p>
      </footer>
    </div>
  );
};
