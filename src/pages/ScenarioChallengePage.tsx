import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Scenario, ScenarioAiFeedback, RetrievedKuralMatch } from '../types';
import { scenarioService } from '../services/scenarioService';
import { ScenarioFemaleIllustration } from '../components/common/ScenarioFemaleIllustration';
import { ThiruvalluvarAvatar } from '../components/common/ThiruvalluvarAvatar';
import { HowAiReasonedModal } from '../components/common/HowAiReasonedModal';
import { WhyKuralModal } from '../components/common/WhyKuralModal';
import {
  Users,
  Clock,
  CheckCircle2,
  AlertTriangle,
  BookOpen,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Award,
  Scale,
  Brain,
  ShieldAlert,
  HelpCircle,
  Lightbulb,
  Check,
  Cpu,
  RefreshCw,
  FileText
} from 'lucide-react';

export const ScenarioChallengePage: React.FC = () => {
  const {
    selectedScenarioNumber,
    setSelectedScenarioNumber,
    userProgress,
    solveScenario,
    openKuralModalByNumber,
    setActiveTab,
    refreshUserProgress
  } = useApp();

  const [allScenarios, setAllScenarios] = useState<Scenario[]>([]);
  const [currentScenario, setCurrentScenario] = useState<Scenario | null>(null);
  const [selectedOptionId, setSelectedOptionId] = useState<'A' | 'B' | 'C' | 'D' | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(872); // 14:32 in seconds
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [aiFeedback, setAiFeedback] = useState<ScenarioAiFeedback | null>(null);

  // Explainability Modals
  const [showReasonedModal, setShowReasonedModal] = useState<boolean>(false);
  const [selectedKuralForModal, setSelectedKuralForModal] = useState<RetrievedKuralMatch | null>(null);

  // Load scenarios
  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      const res = await scenarioService.getAllScenarios();
      setAllScenarios(res.data);
      const active = res.data.find((s) => s.number === selectedScenarioNumber) || res.data[0];
      setCurrentScenario(active);

      // Check if already solved
      const savedAnswer = userProgress.scenarioAnswers[active?.id || ''];
      if (savedAnswer) {
        setSelectedOptionId(savedAnswer);
        setIsSubmitted(true);
      } else {
        setSelectedOptionId(null);
        setIsSubmitted(false);
        setAiFeedback(null);
      }
      setIsLoading(false);
    };
    load();
  }, [selectedScenarioNumber]);

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (isLoading || !currentScenario) {
    return (
      <div className="flex items-center justify-center min-h-[500px]">
        <div className="flex flex-col items-center gap-3 text-slate-500">
          <div className="w-8 h-8 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-medium">Loading Scenario Challenge...</p>
        </div>
      </div>
    );
  }

  const handleSelectOption = (optId: 'A' | 'B' | 'C' | 'D') => {
    if (!isSubmitted && !isEvaluating) {
      setSelectedOptionId(optId);
    }
  };

  const handleSubmit = async () => {
    if (!selectedOptionId || !currentScenario || isEvaluating) return;
    setIsEvaluating(true);

    try {
      const response = await scenarioService.submitScenarioAnswer(currentScenario.id, selectedOptionId);
      if (response && response.success && response.data) {
        const result = response.data;
        setIsSubmitted(true);
        if (result.aiFeedback) {
          setAiFeedback(result.aiFeedback);
        }
        solveScenario(
          currentScenario.id,
          currentScenario.number,
          selectedOptionId,
          result.isCorrect,
          result.xpAwarded
        );
        refreshUserProgress();
      } else {
        // Local fallback
        const isCorrect = selectedOptionId === currentScenario.correctOptionId;
        setIsSubmitted(true);
        solveScenario(
          currentScenario.id,
          currentScenario.number,
          selectedOptionId,
          isCorrect,
          currentScenario.xpReward
        );
      }
    } catch (err) {
      console.warn('[ScenarioChallengePage] Submit error:', err);
      setIsSubmitted(true);
    } finally {
      setIsEvaluating(false);
    }
  };

  const handlePrev = () => {
    if (selectedScenarioNumber > 1) {
      setSelectedScenarioNumber(selectedScenarioNumber - 1);
    }
  };

  const handleNext = () => {
    if (selectedScenarioNumber < (allScenarios.length || 10)) {
      setSelectedScenarioNumber(selectedScenarioNumber + 1);
    }
  };

  const isCurrentCorrect = selectedOptionId === currentScenario.correctOptionId;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start animate-in fade-in duration-300 pb-12">
      {/* ========================================================================= */}
      {/* LEFT COLUMN: MAIN SCENARIO INTERACTIVE EXPERIENCE (lg:col-span-8) */}
      {/* ========================================================================= */}
      <div className="lg:col-span-8 space-y-5">
        {/* Step Progress Indicator Bar & Timer */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-slate-800">
              Scenario {currentScenario.number} of {allScenarios.length || 10}
            </span>
            {/* Step bubbles 1..10 */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {(allScenarios.length ? allScenarios : Array.from({ length: 10 })).map((_, idx) => {
                const stepNum = idx + 1;
                const scen = allScenarios[idx];
                const isSolved = scen && userProgress.solvedScenarioIds.includes(scen.id);
                const isActive = stepNum === currentScenario.number;

                return (
                  <button
                    key={stepNum}
                    onClick={() => setSelectedScenarioNumber(stepNum)}
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-indigo-600 text-white ring-2 ring-indigo-300 ring-offset-1 scale-105 shadow-xs'
                        : isSolved
                        ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                        : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                    }`}
                    title={`Go to Scenario ${stepNum}`}
                  >
                    {isSolved && !isActive ? (
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    ) : (
                      stepNum
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Countdown Timer */}
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-xl">
            <Clock className="w-4 h-4 text-indigo-600" />
            <span>{formatTimer(timeLeft)}</span>
            <span className="text-[10px] font-normal text-slate-500">Time Left</span>
          </div>
        </div>

        {/* Main Scenario Card with Illustration */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          {/* Scenario Header banner */}
          <div className="p-6 pb-2">
            <div className="flex items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900 font-heading">
                    Scenario {currentScenario.number}: {currentScenario.title}
                  </h2>
                  <span className="text-xs text-slate-500 font-medium">{currentScenario.category}</span>
                </div>
              </div>

              {/* Difficulty pill */}
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold ${
                  currentScenario.difficulty === 'Easy'
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : currentScenario.difficulty === 'Medium'
                    ? 'bg-amber-50 text-amber-700 border border-amber-200'
                    : 'bg-rose-50 text-rose-700 border border-rose-200'
                }`}
              >
                {currentScenario.difficulty}
              </span>
            </div>

            {/* Narrative & Illustration Layout */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center pt-2">
              <div className="md:col-span-7 space-y-3">
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  {currentScenario.description}
                </p>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-600">
                  <span className="font-semibold text-slate-900">Key Context:</span>{' '}
                  {currentScenario.summary}
                </div>
              </div>

              {/* Character Illustration */}
              <div className="md:col-span-5 flex justify-center">
                <ScenarioFemaleIllustration className="w-full max-w-[280px]" />
              </div>
            </div>
          </div>

          {/* Question & Options Area */}
          <div className="p-6 pt-4 border-t border-slate-100 space-y-4">
            <h3 className="text-sm sm:text-base font-bold text-slate-900">
              {currentScenario.question}
            </h3>

            {/* Selectable Options (A, B, C, D) */}
            <div className="space-y-3">
              {currentScenario.options.map((option) => {
                const isSelected = selectedOptionId === option.id;
                const isCorrectOpt = option.id === currentScenario.correctOptionId;

                // Border & Background Logic
                let optionStyle = 'border-slate-200 bg-white hover:border-indigo-300 hover:bg-slate-50/50';
                let badgeStyle = 'border-slate-300 text-slate-600 bg-slate-50';

                if (isSelected && !isSubmitted) {
                  optionStyle = 'border-indigo-600 bg-indigo-50/60 ring-2 ring-indigo-500/20';
                  badgeStyle = 'border-indigo-600 bg-indigo-600 text-white';
                } else if (isSubmitted) {
                  if (isCorrectOpt) {
                    optionStyle = 'border-emerald-500 bg-emerald-50/80 ring-2 ring-emerald-500/30';
                    badgeStyle = 'border-emerald-600 bg-emerald-600 text-white';
                  } else if (isSelected && !isCorrectOpt) {
                    optionStyle = 'border-rose-400 bg-rose-50/80 ring-2 ring-rose-400/20';
                    badgeStyle = 'border-rose-500 bg-rose-500 text-white';
                  } else {
                    optionStyle = 'border-slate-200 bg-slate-50/40 opacity-70';
                  }
                }

                return (
                  <div
                    key={option.id}
                    onClick={() => handleSelectOption(option.id)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 ${optionStyle}`}
                  >
                    {/* Option Radio / Badge */}
                    <div
                      className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 transition-colors ${badgeStyle}`}
                    >
                      {isSubmitted && isCorrectOpt ? (
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      ) : (
                        option.id
                      )}
                    </div>

                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium text-slate-800 leading-snug">
                        {option.text}
                      </p>

                      {/* Post-submit detailed option explanation */}
                      {isSubmitted && isSelected && (
                        <p className={`text-xs mt-2 pt-2 border-t font-medium ${isCorrectOpt ? 'text-emerald-800 border-emerald-200' : 'text-rose-800 border-rose-200'}`}>
                          {option.explanation}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* "Think Ethically!" Box */}
            <div className="p-4 bg-indigo-50/70 border border-indigo-200/70 rounded-xl space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-900">
                <Lightbulb className="w-4 h-4 text-indigo-600" />
                Think Ethically!
              </div>
              <p className="text-xs text-indigo-950/80 leading-relaxed">
                {currentScenario.thinkEthicallyHint}
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1.5">
                {currentScenario.ethicalConcepts.map((ec, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 text-[11px] font-semibold bg-white/80 text-indigo-800 border border-indigo-200 rounded-md"
                  >
                    {ec}
                  </span>
                ))}
              </div>
            </div>

            {/* Post-Submission Phase 3 Grounded AI Feedback Showcase */}
            {isSubmitted && (
              <div className="p-6 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl shadow-xl space-y-5 animate-in fade-in duration-300 border border-indigo-500/20">
                {/* Result Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-3">
                    {isCurrentCorrect ? (
                      <div className="p-2 bg-emerald-500 rounded-full text-slate-950 shadow-md">
                        <Check className="w-5 h-5 stroke-[3]" />
                      </div>
                    ) : (
                      <div className="p-2 bg-rose-500 rounded-full text-white shadow-md">
                        <AlertTriangle className="w-5 h-5" />
                      </div>
                    )}
                    <div>
                      <h4 className="text-base font-bold text-white">
                        {isCurrentCorrect
                          ? 'Outstanding Ethical & Legal Discernment!'
                          : 'Educational Evaluation & Reflection'}
                      </h4>
                      <p className="text-xs text-slate-300">
                        {aiFeedback?.decisionAssessment ||
                          (isCurrentCorrect
                            ? `+${currentScenario.xpReward} XP Earned • Perfect adherence to statutory & ethical standards`
                            : 'Review the grounded evaluation below to strengthen your moral reasoning')}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {aiFeedback?.traces && aiFeedback.traces.length > 0 && (
                      <button
                        onClick={() => setShowReasonedModal(true)}
                        className="px-3 py-1.5 bg-indigo-600/30 hover:bg-indigo-600/50 border border-indigo-400/30 text-indigo-200 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all"
                      >
                        <Cpu className="w-3.5 h-3.5" />
                        How AI Reasoned
                      </button>
                    )}
                    <span className="px-3 py-1 text-xs font-extrabold bg-amber-400 text-slate-950 rounded-full">
                      +{aiFeedback?.xpAwarded || currentScenario.xpReward} XP
                    </span>
                  </div>
                </div>

                {/* Perspective Breakdown Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  {/* Ethical Perspective */}
                  <div className="p-4 bg-white/5 rounded-xl space-y-2 border border-white/10">
                    <span className="font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4" />
                      Ethical Perspective (Aram / Duty)
                    </span>
                    <p className="text-slate-200 leading-relaxed">
                      {aiFeedback?.ethicalReasoning || currentScenario.ethicalPerspective.deepDive}
                    </p>
                  </div>

                  {/* Legal Perspective */}
                  <div className="p-4 bg-white/5 rounded-xl space-y-2 border border-white/10">
                    <span className="font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
                      <Scale className="w-4 h-4" />
                      Statutory Legal Context
                    </span>
                    <p className="text-slate-200 leading-relaxed">
                      {aiFeedback?.legalEducationalContext || currentScenario.legalPerspective.explanation}
                    </p>
                    <p className="text-[11px] text-slate-400 italic">
                      Statutes: {currentScenario.legalPerspective.statutes.join(', ')}
                    </p>
                  </div>
                </div>

                {/* Better Responsible Action */}
                <div className="p-4 bg-emerald-950/40 rounded-xl border border-emerald-500/30 space-y-1.5">
                  <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Ideal Responsible Action
                  </span>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    {aiFeedback?.betterResponsibleAction ||
                      `Adhere strictly to procedural governance while consulting organizational ombudsmen or ethical oversight channels.`}
                  </p>
                </div>

                {/* Key Pedagogical Takeaway */}
                <div className="p-4 bg-gradient-to-r from-indigo-900/60 to-slate-900 rounded-xl border border-indigo-500/30 flex items-start gap-3">
                  <FileText className="w-4 h-4 text-indigo-300 shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <span className="font-bold text-indigo-300 uppercase tracking-wider">
                      Pedagogical Takeaway:
                    </span>
                    <p className="text-slate-100 mt-0.5 italic">
                      "{aiFeedback?.learningTakeaway || 'True justice balances strict statutory compliance with unyielding moral courage.'}"
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Button Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3">
              <button
                onClick={handlePrev}
                disabled={selectedScenarioNumber <= 1}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold text-slate-700 bg-white border border-slate-300 rounded-xl hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Previous
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => openKuralModalByNumber(currentScenario.relatedKuralNumber)}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl transition-colors"
                >
                  <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                  Review Kural {currentScenario.relatedKuralNumber}
                </button>

                {!isSubmitted ? (
                  <button
                    onClick={handleSubmit}
                    disabled={!selectedOptionId || isEvaluating}
                    className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl shadow-md transition-all active:scale-98"
                  >
                    {isEvaluating ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" /> Evaluating Answer...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" /> Submit Answer
                      </>
                    )}
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    className="inline-flex items-center gap-1.5 px-6 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md transition-all active:scale-98"
                  >
                    Next Scenario
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* RIGHT COLUMN: CONTEXTUAL WIDGETS & STATS (lg:col-span-4) */}
      {/* ========================================================================= */}
      <div className="lg:col-span-4 space-y-5">
        {/* 1. Your Progress Radial Box */}
        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 font-heading">
            Your Progress
          </h3>

          <div className="flex items-center gap-5">
            {/* Circular Progress Visual */}
            <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-100"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-indigo-600"
                  strokeDasharray={`${(userProgress.casesCompleted / (allScenarios.length || 10)) * 100}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center text-center">
                <span className="text-base font-black text-slate-900 leading-none">
                  {Math.round((userProgress.casesCompleted / (allScenarios.length || 10)) * 100)}%
                </span>
                <span className="text-[9px] font-semibold text-slate-400 uppercase">
                  Completed
                </span>
              </div>
            </div>

            {/* Stats list */}
            <div className="flex-1 space-y-2 text-xs">
              <div className="flex justify-between items-center text-slate-600">
                <span>Completed</span>
                <span className="font-bold text-slate-900">
                  {userProgress.casesCompleted} / {allScenarios.length || 10}
                </span>
              </div>
              <div className="flex justify-between items-center text-slate-600">
                <span>Accuracy</span>
                <span className="font-bold text-emerald-600">
                  {userProgress.accuracyPercentage}%
                </span>
              </div>
              <div className="flex justify-between items-center text-slate-600">
                <span>Best Streak</span>
                <span className="font-bold text-orange-600">
                  {userProgress.bestStreak}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Rewards Card */}
        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <span className="text-amber-500">🎁</span> Active Reward
            </span>
            <button
              onClick={() => setActiveTab('rewards')}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
            >
              View All
            </button>
          </div>

          <div className="flex items-center gap-3.5 p-3 rounded-xl bg-amber-50/70 border border-amber-200/60">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-tr from-amber-400 via-yellow-400 to-amber-200 text-amber-950 shadow-md shadow-amber-300/40 shrink-0">
              <Award className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">Ethical Discernment</h4>
              <p className="text-[11px] font-bold text-amber-700">+{currentScenario.xpReward} Points</p>
              <p className="text-[10px] text-slate-500">Earned through reasoned legal decisions</p>
            </div>
          </div>
        </div>

        {/* 3. Skills Being Improved */}
        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 font-heading">
            Skills Being Improved
          </h3>

          <div className="space-y-3.5">
            <div className="space-y-1">
              <div className="flex justify-between items-center text-xs">
                <span className="flex items-center gap-1.5 font-semibold text-slate-700">
                  <Scale className="w-3.5 h-3.5 text-blue-600" />
                  Legal Awareness
                </span>
                <span className="font-bold text-blue-700">{userProgress.skills.legalAwareness}%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 rounded-full transition-all duration-500" style={{ width: `${userProgress.skills.legalAwareness}%` }} />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center text-xs">
                <span className="flex items-center gap-1.5 font-semibold text-slate-700">
                  <Brain className="w-3.5 h-3.5 text-indigo-600" />
                  Ethical Reasoning
                </span>
                <span className="font-bold text-indigo-700">{userProgress.skills.ethicalReasoning}%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-600 rounded-full transition-all duration-500" style={{ width: `${userProgress.skills.ethicalReasoning}%` }} />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center text-xs">
                <span className="flex items-center gap-1.5 font-semibold text-slate-700">
                  <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
                  Conflict Resolution
                </span>
                <span className="font-bold text-amber-700">{userProgress.skills.conflictResolution}%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full transition-all duration-500" style={{ width: `${userProgress.skills.conflictResolution}%` }} />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center text-xs">
                <span className="flex items-center gap-1.5 font-semibold text-slate-700">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  Prosocial Decision Making
                </span>
                <span className="font-bold text-emerald-700">{userProgress.skills.prosocialDecisionMaking}%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full transition-all duration-500" style={{ width: `${userProgress.skills.prosocialDecisionMaking}%` }} />
              </div>
            </div>
          </div>
        </div>

        {/* 4. Related Thirukkural Card */}
        <div className="p-5 bg-gradient-to-br from-emerald-50/60 via-slate-50 to-indigo-50/40 rounded-2xl border border-emerald-200/80 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider">
              Related Thirukkural
            </span>
            <span className="px-2 py-0.5 text-[10px] font-bold text-emerald-800 bg-emerald-100 rounded-md">
              Kural {currentScenario.relatedKuralNumber}
            </span>
          </div>

          <div className="flex items-start justify-between gap-3">
            <div className="space-y-2">
              <p className="text-xs font-tamil text-slate-900 font-bold leading-relaxed">
                ஒழுக்கம் விழுப்பம் தரலான்
                <br />
                ஒழுக்கம் உயிரினும் ஓம்பப் படும்.
              </p>
              <p className="text-xs text-slate-600 italic leading-snug">
                "Virtue (ethical conduct) is the true wealth; it must be protected even more than life."
              </p>
            </div>

            <div className="shrink-0 -mr-2">
              <ThiruvalluvarAvatar size={60} />
            </div>
          </div>

          <button
            onClick={() => openKuralModalByNumber(currentScenario.relatedKuralNumber)}
            className="w-full py-1.5 text-xs font-semibold text-indigo-700 hover:text-indigo-900 bg-white/80 hover:bg-white border border-indigo-200 rounded-lg transition-colors text-center"
          >
            Explore Couplet Detail →
          </button>
        </div>
      </div>

      {/* Explainability Modals */}
      <HowAiReasonedModal
        isOpen={showReasonedModal}
        onClose={() => setShowReasonedModal(false)}
        traces={aiFeedback?.traces || []}
        queryText={`Scenario ${currentScenario.number}: ${currentScenario.title}`}
      />

      <WhyKuralModal
        isOpen={Boolean(selectedKuralForModal)}
        onClose={() => setSelectedKuralForModal(null)}
        kural={selectedKuralForModal}
        detectedConcepts={currentScenario.ethicalConcepts}
        userQuery={currentScenario.description}
      />
    </div>
  );
};
