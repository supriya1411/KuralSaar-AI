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
    t,
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
    <div className="space-y-8 animate-in fade-in duration-200 pb-12">
      {/* 1. Hero Grid: Main Welcome Card + Live Preview Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Hero Card (8 Cols) */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl shadow-xs p-6 sm:p-8 flex flex-col justify-between">
          <div>
            {/* Top Yellow Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100/90 text-amber-900 border border-amber-300/60 rounded-full text-xs font-bold shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>{t('heroTag')}</span>
            </div>

            {/* Main Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#071B3A] tracking-tight font-heading mt-4 mb-2">
              {t('appName')}
            </h1>

            {/* Subtitle Tagline */}
            <p className="text-lg sm:text-xl font-bold text-slate-800 mb-3 font-heading">
              "{t('slogan')}"
            </p>

            {/* Description */}
            <p className="text-sm text-slate-600 leading-relaxed max-w-2xl mb-6 font-medium">
              {t('heroDesc')}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => {
                  setSelectedScenarioNumber(3);
                  setActiveTab('scenario-challenge');
                }}
                className="px-6 py-3 bg-[#071B3A] hover:bg-[#0A2540] text-white rounded-xl text-sm font-bold shadow-sm transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Scale className="w-4 h-4 text-amber-400" />
                {t('launchScenarioBtn')}
              </button>

              <button
                onClick={() => setActiveTab('kural-quest')}
                className="px-6 py-3 border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-xl text-sm font-bold transition-colors flex items-center gap-2 cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-blue-600" />
                {t('exploreKuralsBtn')}
              </button>
            </div>
          </div>

          {/* Feature Highlights Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 mt-6 border-t border-slate-100 text-xs font-semibold text-slate-600">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
              <span>{t('scenariosCount')}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
              <span>{t('kuralsCount')}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{t('aiTutorFeature')}</span>
            </div>
          </div>
        </div>

        {/* Right Live Preview Card */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl shadow-xs p-5 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-black text-slate-400 uppercase tracking-widest">
                {t('livePreview')}
              </span>
              <span className="bg-slate-100 text-slate-700 font-bold text-xs px-2.5 py-1 rounded-md border border-slate-200">
                Scenario 3
              </span>
            </div>

            {/* Realistic Thiruvalluvar Statue & Law Books Image */}
            <div className="relative rounded-xl overflow-hidden border border-slate-200 shadow-2xs mb-3 group">
              <img
                src="/assets/images/thiruvalluvar_statue.jpg"
                alt="Thiruvalluvar & Legal Ethics"
                className="w-full h-44 object-cover group-hover:scale-103 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent"></div>
            </div>

            <h3 className="text-sm font-extrabold text-slate-900 leading-tight">
              Scenario: Conflict of Interest
            </h3>
            <p className="text-xs text-slate-500 italic mt-1 leading-normal font-medium">
              "Senior advocate discovers rival firm is owned by a close family member..."
            </p>
          </div>

          <button
            onClick={() => {
              setSelectedScenarioNumber(3);
              setActiveTab('scenario-challenge');
            }}
            className="w-full py-2.5 bg-[#071B3A] hover:bg-[#0A2540] text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer text-center block"
          >
            {t('solveScenarioNow')}
          </button>
        </div>
      </div>

      {/* 2. Educational Architecture Heading Section */}
      <div className="text-center space-y-2 pt-2">
        <span className="text-xs font-black text-slate-400 uppercase tracking-widest">
          {t('educationalArchitecture')}
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-[#071B3A] font-heading">
          {t('howPlatformTransforms')}
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mx-auto font-medium">
          {t('architectureSub')}
        </p>
      </div>

      {/* 3. Four Sleek KPI Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: XP Points */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs hover:border-amber-400 transition-all">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
            XP Points
          </span>
          <p className="text-2xl font-black text-[#071B3A]">
            {userProgress.xp.toLocaleString()}
          </p>
          <span className="text-[10px] text-amber-600 font-bold">
            Level {userProgress.level} Practitioner
          </span>
        </div>

        {/* Metric 2: Streak Count */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs hover:border-amber-400 transition-all">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
            Streak Count
          </span>
          <p className="text-2xl font-black text-amber-500">
            🔥 {userProgress.streakDays} Days
          </p>
          <span className="text-[10px] text-slate-400 font-medium">
            Best streak: {userProgress.bestStreak} days
          </span>
        </div>

        {/* Metric 3: Ethical Reasoning */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs hover:border-blue-400 transition-all">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
            Ethical Reasoning
          </span>
          <p className="text-2xl font-black text-blue-700">
            {userProgress.skills.ethicalReasoning}%
          </p>
          <span className="text-[10px] text-emerald-600 font-bold">
            Mastery Profile
          </span>
        </div>

        {/* Metric 4: Legal Awareness */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs hover:border-blue-400 transition-all">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
            Legal Awareness
          </span>
          <p className="text-2xl font-black text-blue-600">
            {userProgress.skills.legalAwareness}%
          </p>
          <span className="text-[10px] text-blue-600 font-bold">
            Statutory Grounds
          </span>
        </div>
      </div>

      {/* Dynamic AI Insights Banner */}
      {aiInsights && (
        <div className="p-5 bg-white text-slate-900 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-amber-100 rounded-lg text-amber-800 border border-amber-200">
                <Sparkles className="w-4 h-4 text-amber-600" />
              </div>
              <span className="text-xs font-extrabold text-[#071B3A] uppercase tracking-wider">
                AI Learning & Competency Insights
              </span>
            </div>
            <button
              onClick={() => setActiveTab('ai-tutor')}
              className="text-xs text-blue-600 hover:text-blue-800 font-bold cursor-pointer"
            >
              Consult AI Tutor →
            </button>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
            {aiInsights.summary}
          </p>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-slate-500 font-bold">Recommended Action:</span>
              <span className="text-[#071B3A] font-extrabold">{aiInsights.recommendedAction}</span>
            </div>
            <button
              onClick={() => openKuralModalByNumber(aiInsights.suggestedKuralNumber)}
              className="text-xs font-bold text-blue-600 hover:underline cursor-pointer"
            >
              Review Kural {aiInsights.suggestedKuralNumber}
            </button>
          </div>
        </div>
      )}

      {/* 4. Main Grid: Today's Scenario & Skills Mastery + Recommended Kural */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 8-Columns: Today's Scenario Interactive Card */}
        {todayScenario && (
          <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl shadow-2xs overflow-hidden">
            <div className="bg-slate-50 px-6 py-3.5 flex items-center justify-between border-b border-slate-200">
              <span className="text-[#071B3A] text-xs font-black uppercase tracking-widest">
                Today's Legal Dilemma
              </span>
              <span className="bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-black px-2.5 py-0.5 rounded-full">
                Scenario {todayScenario.number}/10
              </span>
            </div>

            <div className="p-6 space-y-5">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-extrabold text-[#071B3A] font-heading">
                    {todayScenario.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    Topic: {todayScenario.category}
                  </p>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase">
                    Difficulty
                  </span>
                  <span className="text-amber-600 font-bold text-xs">
                    {todayScenario.difficulty}
                  </span>
                </div>
              </div>

              <p className="text-sm text-slate-700 leading-relaxed bg-slate-50/80 p-4 border-l-4 border-blue-600 rounded-r-lg font-medium border border-slate-200">
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
                      className={`flex items-center p-3.5 border rounded-xl transition-colors cursor-pointer group ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50/70 shadow-2xs'
                          : 'border-slate-200 hover:border-blue-400 bg-white'
                      }`}
                    >
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mr-3 shrink-0 transition-colors ${
                          isSelected
                            ? 'bg-[#071B3A] text-white'
                            : 'border border-slate-300 text-slate-600 group-hover:bg-blue-50'
                        }`}
                      >
                        {letter}
                      </div>
                      <span
                        className={`text-sm ${
                          isSelected
                            ? 'text-slate-950 font-bold'
                            : 'text-slate-700 font-medium'
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
                  className="px-6 py-2.5 bg-[#071B3A] hover:bg-[#0A2540] text-white rounded-xl text-sm font-bold shadow-2xs transition-colors cursor-pointer"
                >
                  Launch Full Simulation
                </button>
                <button
                  onClick={() => {
                    setSelectedScenarioNumber(todayScenario.number);
                    setActiveTab('scenario-challenge');
                  }}
                  className="px-6 py-2.5 border border-slate-300 text-slate-700 rounded-xl text-sm font-bold hover:bg-slate-50 transition-colors cursor-pointer"
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
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">
                Your Skills Mastery
              </h4>
              <button
                onClick={() => setActiveTab('my-progress')}
                className="text-[11px] font-bold text-blue-600 hover:underline cursor-pointer"
              >
                Analytics →
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="font-bold text-slate-700">Ethical Reasoning</span>
                  <span className="text-blue-700 font-extrabold">{userProgress.skills.ethicalReasoning}%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full"
                    style={{ width: `${userProgress.skills.ethicalReasoning}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="font-bold text-slate-700">Legal Awareness</span>
                  <span className="text-blue-600 font-extrabold">{userProgress.skills.legalAwareness}%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full"
                    style={{ width: `${userProgress.skills.legalAwareness}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="font-bold text-slate-700">Critical Thinking</span>
                  <span className="text-amber-600 font-extrabold">{userProgress.skills.criticalThinking}%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-500 rounded-full"
                    style={{ width: `${userProgress.skills.criticalThinking}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="font-bold text-slate-700">Decision Making</span>
                  <span className="text-emerald-600 font-extrabold">{userProgress.skills.prosocialDecisionMaking}%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full"
                    style={{ width: `${userProgress.skills.prosocialDecisionMaking}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Recommended Kural Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs text-slate-900 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-black text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-full border border-amber-300 uppercase tracking-wider">
                Recommended Kural
              </h4>
              <span className="text-xs font-bold text-slate-500">Kural #34</span>
            </div>
            <p className="text-base font-tamil font-bold text-blue-900 leading-snug">
              "மனத்துக்கண் மாசிலன் ஆதல் அனைத்தறன் ஆகுல நீர பிற."
            </p>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              "To be pure in mind is as much as all righteousness; all else is but empty display."
            </p>
            <button
              onClick={() => openKuralModalByNumber(34)}
              className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 transition-colors rounded-xl text-xs font-bold border border-slate-200 text-[#071B3A] text-center block cursor-pointer"
            >
              Explore Virtue (Aram) →
            </button>
          </div>
        </div>
      </div>

      {/* 5. Three Learning Suite Pillar Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
        <div
          onClick={() => setActiveTab('kural-quest')}
          className="p-6 bg-white rounded-2xl border border-slate-200 shadow-2xs hover:border-blue-400 transition-all cursor-pointer space-y-3 group"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-base shadow-2xs">
            📜
          </div>
          <h4 className="text-base font-bold text-[#071B3A] group-hover:text-blue-600 transition-colors font-heading">
            Kural Quest
          </h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            Explore 1,330 couplets categorized by moral concept and Paal.
          </p>
        </div>

        <div
          onClick={() => setActiveTab('scenario-challenge')}
          className="p-6 bg-white rounded-2xl border border-slate-200 shadow-2xs hover:border-blue-400 transition-all cursor-pointer space-y-3 group"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-base shadow-2xs">
            ⚖️
          </div>
          <h4 className="text-base font-bold text-[#071B3A] group-hover:text-blue-600 transition-colors font-heading">
            Scenario Challenge
          </h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            Apply legal & ethical principles to interactive real-world dilemmas.
          </p>
        </div>

        <div
          onClick={() => setActiveTab('ai-tutor')}
          className="p-6 bg-white rounded-2xl border border-slate-200 shadow-2xs hover:border-blue-400 transition-all cursor-pointer space-y-3 group"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-base shadow-2xs">
            🤖
          </div>
          <h4 className="text-base font-bold text-[#071B3A] group-hover:text-blue-600 transition-colors font-heading">
            AI Legal-Ethics Tutor
          </h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            Grounded dual-corpus mentoring with full explainability traces.
          </p>
        </div>
      </div>
    </div>
  );
};
