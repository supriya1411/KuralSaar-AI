import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { Kural, Scenario, AiLearningInsight } from '../types';
import { kuralService } from '../services/kuralService';
import { scenarioService } from '../services/scenarioService';
import { progressService } from '../services/progressService';
import { ThiruvalluvarAvatar } from '../components/common/ThiruvalluvarAvatar';
import {
  Star,
  Flame,
  Brain,
  Scale,
  Sparkles,
  ArrowRight,
  BookOpen,
  Bot,
  CheckCircle2,
  TrendingUp,
  Shield,
  Layers,
  Cpu,
  Zap,
  HelpCircle
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const {
    userProgress,
    setActiveTab,
    setSelectedScenarioNumber,
    openKuralModalByNumber,
  } = useApp();

  const [recommendedKurals, setRecommendedKurals] = useState<Kural[]>([]);
  const [todayScenario, setTodayScenario] = useState<Scenario | null>(null);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [aiInsights, setAiInsights] = useState<AiLearningInsight | null>(null);

  useEffect(() => {
    const load = async () => {
      const kurals = await kuralService.getRecommendedKurals(3);
      setRecommendedKurals(kurals);
      const scen = await scenarioService.getTodayScenario();
      setTodayScenario(scen);
      if (scen && scen.options.length > 1) {
        setSelectedOptionId(scen.options[1].id);
      }
      const insights = await progressService.getAiLearningInsights();
      setAiInsights(insights);
    };
    load();
  }, []);

  return (
    <div className="space-y-6 animate-in fade-in duration-200 pb-12">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Welcome back, {userProgress.userName} 👋
          </h1>
          <p className="text-slate-500 text-sm">
            AI-powered legal education connecting Indian statutory law with Thirukkural ethics.
          </p>
        </div>
      </div>

      {/* 1. Four Sleek KPI Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: XP Points */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs hover:border-indigo-300 transition-all">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">
            XP Points
          </span>
          <p className="text-2xl font-black text-indigo-600">
            {userProgress.xp.toLocaleString()}
          </p>
          <span className="text-[10px] text-emerald-600 font-semibold">
            Level {userProgress.level} Practitioner
          </span>
        </div>

        {/* Metric 2: Streak Count */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs hover:border-orange-300 transition-all">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">
            Streak Count
          </span>
          <p className="text-2xl font-black text-orange-500">
            {userProgress.streakDays} Days
          </p>
          <span className="text-[10px] text-slate-400">
            Best streak: {userProgress.bestStreak} days
          </span>
        </div>

        {/* Metric 3: Ethical Reasoning */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs hover:border-emerald-300 transition-all">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">
            Ethical Reasoning
          </span>
          <p className="text-2xl font-black text-emerald-600">
            {userProgress.skills.ethicalReasoning}%
          </p>
          <span className="text-[10px] text-emerald-600 font-medium">
            Mastery Profile
          </span>
        </div>

        {/* Metric 4: Legal Awareness */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs hover:border-blue-300 transition-all">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">
            Legal Awareness
          </span>
          <p className="text-2xl font-black text-blue-600">
            {userProgress.skills.legalAwareness}%
          </p>
          <span className="text-[10px] text-indigo-600 font-medium">
            Statutory Grounds
          </span>
        </div>
      </div>

      {/* Dynamic AI Insights Banner */}
      {aiInsights && (
        <div className="p-5 bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-950 text-white rounded-2xl border border-indigo-500/20 shadow-md space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-indigo-500/20 rounded-lg text-indigo-300">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider">
                AI Learning & Competency Insights
              </span>
            </div>
            <button
              onClick={() => setActiveTab('ai-tutor')}
              className="text-xs text-amber-400 hover:underline font-semibold"
            >
              Consult AI Tutor →
            </button>
          </div>

          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            {aiInsights.summary}
          </p>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-slate-800 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-slate-400">Recommended Action:</span>
              <span className="text-amber-300 font-medium">{aiInsights.recommendedAction}</span>
            </div>
            <button
              onClick={() => openKuralModalByNumber(aiInsights.suggestedKuralNumber)}
              className="text-xs font-bold text-indigo-300 hover:text-white underline"
            >
              Review Kural {aiInsights.suggestedKuralNumber}
            </button>
          </div>
        </div>
      )}

      {/* 2. Main Grid: Today's Scenario & Skills Mastery + Recommended Kural */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 8-Columns: Today's Scenario Interactive Card */}
        {todayScenario && (
          <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
            <div className="bg-slate-900 px-6 py-3 flex items-center justify-between">
              <span className="text-white text-xs font-bold uppercase tracking-widest">
                Today's Legal Dilemma
              </span>
              <span className="bg-indigo-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded">
                Scenario {todayScenario.number}/10
              </span>
            </div>

            <div className="p-6 space-y-5">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    {todayScenario.title}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Topic: {todayScenario.category}
                  </p>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">
                    Difficulty
                  </span>
                  <span className="text-amber-500 font-bold text-xs">
                    {todayScenario.difficulty}
                  </span>
                </div>
              </div>

              <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 border-l-4 border-indigo-400 rounded-r-lg">
                "{todayScenario.description}"
              </p>

              {/* Options List */}
              <div className="space-y-3">
                {todayScenario.options.slice(0, 2).map((opt, idx) => {
                  const letter = String.fromCharCode(65 + idx);
                  const isSelected = selectedOptionId === opt.id;

                  return (
                    <div
                      key={opt.id}
                      onClick={() => setSelectedOptionId(opt.id)}
                      className={`flex items-center p-3 border rounded-lg transition-colors cursor-pointer group ${
                        isSelected
                          ? 'border-indigo-500 bg-indigo-50/70'
                          : 'border-slate-200 hover:border-indigo-300 bg-white'
                      }`}
                    >
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mr-3 shrink-0 transition-colors ${
                          isSelected
                            ? 'bg-indigo-500 text-white'
                            : 'border border-slate-300 text-slate-600 group-hover:bg-indigo-50'
                        }`}
                      >
                        {letter}
                      </div>
                      <span
                        className={`text-sm ${
                          isSelected
                            ? 'text-indigo-950 font-medium'
                            : 'text-slate-600'
                        }`}
                      >
                        {opt.text}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => {
                    setSelectedScenarioNumber(todayScenario.number);
                    setActiveTab('scenario-challenge');
                  }}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold shadow-md shadow-indigo-200 hover:bg-indigo-700 transition-colors"
                >
                  Launch Full Simulation
                </button>
                <button
                  onClick={() => {
                    setSelectedScenarioNumber(todayScenario.number);
                    setActiveTab('scenario-challenge');
                  }}
                  className="px-6 py-2 border border-slate-200 text-slate-600 rounded-lg text-sm font-bold hover:bg-slate-50 transition-colors"
                >
                  Review Dilemma
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Right 4-Columns: Skills Mastery + Recommended Kural */}
        <div className="lg:col-span-4 space-y-6">
          {/* Skills Mastery Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                Your Skills Mastery
              </h4>
              <button
                onClick={() => setActiveTab('my-progress')}
                className="text-[11px] font-semibold text-indigo-600 hover:underline"
              >
                Analytics
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="font-bold text-slate-700">Ethical Reasoning</span>
                  <span className="text-indigo-600 font-bold">{userProgress.skills.ethicalReasoning}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-500 rounded-full"
                    style={{ width: `${userProgress.skills.ethicalReasoning}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="font-bold text-slate-700">Legal Awareness</span>
                  <span className="text-blue-600 font-bold">{userProgress.skills.legalAwareness}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full"
                    style={{ width: `${userProgress.skills.legalAwareness}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="font-bold text-slate-700">Critical Thinking</span>
                  <span className="text-amber-600 font-bold">{userProgress.skills.criticalThinking}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-500 rounded-full"
                    style={{ width: `${userProgress.skills.criticalThinking}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="font-bold text-slate-700">Decision Making</span>
                  <span className="text-emerald-600 font-bold">{userProgress.skills.prosocialDecisionMaking}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full"
                    style={{ width: `${userProgress.skills.prosocialDecisionMaking}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Recommended Kural Card */}
          <div className="bg-gradient-to-br from-indigo-600 to-slate-900 border border-slate-200 rounded-2xl p-5 shadow-xs text-white">
            <h4 className="text-xs font-bold text-indigo-200 uppercase tracking-widest mb-3">
              Recommended Kural
            </h4>
            <p className="text-base sm:text-lg font-serif italic mb-2 leading-snug">
              "Manathukan Maasilan Aadhal Anaithuran Aagula Neera Pir."
            </p>
            <p className="text-[11px] text-indigo-100/80 leading-relaxed">
              "To be pure in mind is as much as all righteousness; all else is but empty display." (Kural 34)
            </p>
            <button
              onClick={() => openKuralModalByNumber(34)}
              className="mt-4 w-full py-2 bg-white/10 hover:bg-white/20 transition-colors rounded-lg text-xs font-bold border border-white/20 text-center block"
            >
              Explore Virtue (Aram)
            </button>
          </div>
        </div>
      </div>

      {/* 3. Three Learning Suite Pillar Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        <div
          onClick={() => setActiveTab('kural-quest')}
          className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs hover:border-indigo-300 transition-all cursor-pointer space-y-2 group"
        >
          <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-sm">
            📜
          </div>
          <h4 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
            Kural Quest
          </h4>
          <p className="text-xs text-slate-500">
            Explore 1,330 couplets categorized by moral concept and Paal.
          </p>
        </div>

        <div
          onClick={() => setActiveTab('scenario-challenge')}
          className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs hover:border-indigo-300 transition-all cursor-pointer space-y-2 group"
        >
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm">
            ⚖️
          </div>
          <h4 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
            Scenario Challenge
          </h4>
          <p className="text-xs text-slate-500">
            Apply legal & ethical principles to interactive real-world dilemmas.
          </p>
        </div>

        <div
          onClick={() => setActiveTab('ai-tutor')}
          className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs hover:border-indigo-300 transition-all cursor-pointer space-y-2 group"
        >
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-sm">
            🤖
          </div>
          <h4 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
            AI Legal-Ethics Tutor
          </h4>
          <p className="text-xs text-slate-500">
            Grounded dual-corpus mentoring with full explainability traces.
          </p>
        </div>
      </div>
    </div>
  );
};
