import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Scenario, ScenarioAiFeedback, RetrievedKuralMatch, Kural } from '../types';
import { scenarioService } from '../services/scenarioService';
import { kuralService } from '../services/kuralService';
import { HowAiReasonedModal } from '../components/common/HowAiReasonedModal';
import { WhyKuralModal } from '../components/common/WhyKuralModal';
import {
  Clock,
  CheckCircle2,
  AlertTriangle,
  BookOpen,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Award,
  Scale,
  ShieldAlert,
  Lightbulb,
  Check,
  Cpu,
  RefreshCw,
  FileText,
  Brain
} from 'lucide-react';

export const ScenarioChallengePage: React.FC = () => {
  const {
    selectedScenarioNumber,
    setSelectedScenarioNumber,
    userProgress,
    solveScenario,
    openKuralModalByNumber,
    setActiveTab,
    refreshUserProgress,
    language,
    t,
  } = useApp();

  const [allScenarios, setAllScenarios] = useState<Scenario[]>([]);
  const [currentScenario, setCurrentScenario] = useState<Scenario | null>(null);
  const [relatedKural, setRelatedKural] = useState<Kural | null>(null);
  const [selectedOptionId, setSelectedOptionId] = useState<'A' | 'B' | 'C' | 'D' | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(872); // 14:32 in seconds
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [aiFeedback, setAiFeedback] = useState<ScenarioAiFeedback | null>(null);

  // Explainability Modals
  const [showReasonedModal, setShowReasonedModal] = useState<boolean>(false);
  const [selectedKuralForModal, setSelectedKuralForModal] = useState<RetrievedKuralMatch | null>(null);

  // Load scenarios & current kural
  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      const res = await scenarioService.getAllScenarios(language);
      setAllScenarios(res.data);
      const active = res.data.find((s) => s.number === selectedScenarioNumber) || res.data[0];
      setCurrentScenario(active);

      if (active) {
        const k = await kuralService.getKuralByNumber(active.relatedKuralNumber);
        setRelatedKural(k);
      }

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
  }, [selectedScenarioNumber, language]);

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
          <p className="text-sm font-medium">{t('evaluatingFeedback')}</p>
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
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center gap-3">
            <span className="text-sm font-extrabold text-[#071B3A]">
              {t('scenarioNum')
                .replace('{current}', currentScenario.number.toString())
                .replace('{total}', (allScenarios.length || 10).toString())}
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
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#071B3A] text-white ring-2 ring-blue-400 ring-offset-1 scale-105 shadow-2xs'
                        : isSolved
                        ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                        : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                    }`}
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
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
            <Clock className="w-4 h-4 text-blue-600" />
            <span>{formatTimer(timeLeft)}</span>
            <span className="text-[10px] font-semibold text-slate-400">{t('timeLeft')}</span>
          </div>
        </div>

        {/* Real Photographic Hero Banner */}
        <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-sm min-h-[150px] flex items-center">
          <img
            src="/assets/images/legal_courtroom.jpg"
            alt="Indian Courtroom & Law Library"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/75 to-slate-950/40 backdrop-blur-[1px]" />

          <div className="relative z-10 p-6 sm:p-8 w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-white">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black bg-amber-400 text-slate-950 shadow-2xs">
                <Scale className="w-3.5 h-3.5 text-slate-950" />
                {t('scenarioNum')
                  .replace('{current}', currentScenario.number.toString())
                  .replace('{total}', (allScenarios.length || 10).toString())}{' '}
                • {currentScenario.category}
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold font-heading text-white tracking-tight drop-shadow-sm">
                {currentScenario.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed drop-shadow-xs">
                {t('realWorldCaseSub')}
              </p>
            </div>

            <span
              className={`px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider self-start sm:self-center shadow-md ${
                currentScenario.difficulty === 'Easy'
                  ? 'bg-emerald-400 text-slate-950'
                  : currentScenario.difficulty === 'Medium'
                  ? 'bg-amber-400 text-slate-950'
                  : 'bg-rose-500 text-white'
              }`}
            >
              {currentScenario.difficulty === 'Easy'
                ? t('easyLevel')
                : currentScenario.difficulty === 'Medium'
                ? t('mediumLevel')
                : t('hardLevel')}
            </span>
          </div>
        </div>

        {/* Main Scenario Case Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-6 sm:p-8 space-y-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-extrabold text-[#071B3A] uppercase tracking-wider">
              <FileText className="w-4 h-4 text-blue-600" />
              {t('caseBackgroundNarrative')}
            </div>
            <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-medium bg-slate-50/80 p-5 rounded-xl border border-slate-200/80">
              {currentScenario.description}
            </p>
            <div className="p-3.5 bg-blue-50/60 rounded-xl border border-blue-200/70 text-xs text-slate-700 font-medium">
              <span className="font-extrabold text-[#071B3A]">{t('keyContext')}</span>{' '}
              {currentScenario.summary}
            </div>
          </div>

          {/* Question & Options Area */}
          <div className="p-6 pt-4 border-t border-slate-100 space-y-4">
            <h3 className="text-sm sm:text-base font-extrabold text-[#071B3A]">
              {currentScenario.question}
            </h3>

            {/* Selectable Options (A, B, C, D) */}
            <div className="space-y-3">
              {currentScenario.options.map((option) => {
                const isSelected = selectedOptionId === option.id;
                const isCorrectOpt = option.id === currentScenario.correctOptionId;

                // Border & Background Logic
                let optionStyle = 'border-slate-200 bg-white hover:border-blue-400 hover:bg-slate-50/50';
                let badgeStyle = 'border-slate-300 text-slate-600 bg-slate-50';

                if (isSelected && !isSubmitted) {
                  optionStyle = 'border-blue-600 bg-blue-50/70 ring-2 ring-blue-500/20';
                  badgeStyle = 'border-[#071B3A] bg-[#071B3A] text-white';
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
                      <p className="text-sm font-semibold text-slate-800 leading-snug">
                        {option.text}
                      </p>

                      {/* Post-submit detailed option explanation */}
                      {isSubmitted && isSelected && (
                        <p className={`text-xs mt-2 pt-2 border-t font-semibold ${isCorrectOpt ? 'text-emerald-800 border-emerald-200' : 'text-rose-800 border-rose-200'}`}>
                          {option.explanation}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* "Think Ethically!" Box */}
            <div className="p-4 bg-blue-50/70 border border-blue-200/80 rounded-xl space-y-1">
              <div className="flex items-center gap-2 text-xs font-extrabold text-[#071B3A]">
                <Lightbulb className="w-4 h-4 text-amber-500" />
                {t('thinkEthicallyTitle')}
              </div>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                {currentScenario.thinkEthicallyHint}
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1.5">
                {currentScenario.ethicalConcepts.map((ec, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-0.5 text-[11px] font-bold bg-white text-blue-900 border border-blue-200 rounded-md"
                  >
                    {ec}
                  </span>
                ))}
              </div>
            </div>

            {/* Post-Submission Phase 3 Grounded AI Feedback Showcase */}
            {isSubmitted && (
              <div className="p-6 bg-[#071B3A] text-white rounded-2xl shadow-sm space-y-5 animate-in fade-in duration-300 border border-slate-700">
                {/* Result Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-700">
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
                          ? t('outstandingDiscernment')
                          : t('educationalEvaluation')}
                      </h4>
                      <p className="text-xs text-slate-300 font-medium">
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
                        className="px-3 py-1.5 bg-blue-600/30 hover:bg-blue-600/50 border border-blue-400/30 text-blue-200 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all cursor-pointer"
                      >
                        <Cpu className="w-3.5 h-3.5" />
                        {t('howAiReasoned')}
                      </button>
                    )}
                    <span className="px-3 py-1 text-xs font-black bg-amber-400 text-slate-950 rounded-full">
                      +{aiFeedback?.xpAwarded || currentScenario.xpReward} XP
                    </span>
                  </div>
                </div>

                {/* Perspective Breakdown Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  {/* Ethical Perspective */}
                  <div className="p-4 bg-white/5 rounded-xl space-y-2 border border-white/10">
                    <span className="font-extrabold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      {t('ethicalPerspectiveDuty')}
                    </span>
                    <p className="text-slate-200 leading-relaxed font-medium">
                      {aiFeedback?.ethicalReasoning || currentScenario.ethicalPerspective.deepDive}
                    </p>
                  </div>

                  {/* Legal Perspective */}
                  <div className="p-4 bg-white/5 rounded-xl space-y-2 border border-white/10">
                    <span className="font-extrabold text-blue-300 uppercase tracking-wider flex items-center gap-1.5">
                      <Scale className="w-4 h-4 text-blue-400" />
                      {t('statutoryLegalContextTitle')}
                    </span>
                    <p className="text-slate-200 leading-relaxed font-medium">
                      {aiFeedback?.legalEducationalContext || currentScenario.legalPerspective.explanation}
                    </p>
                    <p className="text-[11px] text-slate-400 italic font-medium">
                      Statutes: {currentScenario.legalPerspective.statutes.join(', ')}
                    </p>
                  </div>
                </div>

                {/* Better Responsible Action */}
                <div className="p-4 bg-emerald-950/40 rounded-xl border border-emerald-500/30 space-y-1.5">
                  <span className="text-xs font-extrabold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    {t('idealResponsibleAction')}
                  </span>
                  <p className="text-xs text-slate-200 leading-relaxed font-medium">
                    {aiFeedback?.betterResponsibleAction ||
                      `Adhere strictly to procedural governance while consulting organizational ombudsmen or ethical oversight channels.`}
                  </p>
                </div>

                {/* Key Pedagogical Takeaway */}
                <div className="p-4 bg-slate-800/80 rounded-xl border border-slate-700 flex items-start gap-3">
                  <FileText className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <span className="font-extrabold text-amber-400 uppercase tracking-wider">
                      {t('pedagogicalTakeaway')}
                    </span>
                    <p className="text-slate-100 mt-0.5 italic font-medium">
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
                className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold text-slate-700 bg-white border border-slate-300 rounded-xl hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                {t('previousScenario')}
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => openKuralModalByNumber(currentScenario.relatedKuralNumber)}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold text-[#071B3A] bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl transition-colors cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                  {t('reviewKural')} #{currentScenario.relatedKuralNumber}
                </button>

                {!isSubmitted ? (
                  <button
                    onClick={handleSubmit}
                    disabled={!selectedOptionId || isEvaluating}
                    className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-bold text-white bg-[#071B3A] hover:bg-[#0A2540] disabled:opacity-50 disabled:cursor-not-allowed rounded-xl shadow-2xs transition-all active:scale-98 cursor-pointer"
                  >
                    {isEvaluating ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" /> {t('evaluatingAnswerBtn')}
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 text-amber-400" /> {t('submitAnswerBtn')}
                      </>
                    )}
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    className="inline-flex items-center gap-1.5 px-6 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-2xs transition-all active:scale-98 cursor-pointer"
                  >
                    {t('nextScenarioBtn')}
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
        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <h3 className="text-sm font-extrabold text-[#071B3A] font-heading">
            {t('yourProgressTitle')}
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
                  className="text-blue-600"
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
                <span className="text-[9px] font-extrabold text-slate-400 uppercase">
                  {t('completedLabel')}
                </span>
              </div>
            </div>

            {/* Stats list */}
            <div className="flex-1 space-y-2 text-xs">
              <div className="flex justify-between items-center text-slate-600">
                <span className="font-medium">{t('completedLabel')}</span>
                <span className="font-bold text-slate-900">
                  {userProgress.casesCompleted} / {allScenarios.length || 10}
                </span>
              </div>
              <div className="flex justify-between items-center text-slate-600">
                <span className="font-medium">{t('accuracyLabel')}</span>
                <span className="font-bold text-emerald-600">
                  {userProgress.accuracyPercentage}%
                </span>
              </div>
              <div className="flex justify-between items-center text-slate-600">
                <span className="font-medium">{t('bestStreakLabel')}</span>
                <span className="font-bold text-amber-600">
                  🔥 {userProgress.bestStreak}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Rewards Card */}
        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <span className="text-amber-500">🎁</span> {t('activeReward')}
            </span>
            <button
              onClick={() => setActiveTab('rewards')}
              className="text-xs font-bold text-blue-600 hover:text-blue-800 cursor-pointer"
            >
              {t('viewAll')}
            </button>
          </div>

          <div className="flex items-center gap-3.5 p-3 rounded-xl bg-amber-50/70 border border-amber-200/80">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-amber-400 text-slate-950 font-black shadow-xs shrink-0">
              <Award className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">{t('ethicalDiscernment')}</h4>
              <p className="text-[11px] font-black text-amber-800">+{currentScenario.xpReward} Points</p>
              <p className="text-[10px] text-slate-500 font-medium">{t('earnedThroughDecisions')}</p>
            </div>
          </div>
        </div>

        {/* 3. Skills Being Improved */}
        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <h3 className="text-sm font-extrabold text-[#071B3A] font-heading">
            {t('skillsBeingImproved')}
          </h3>

          <div className="space-y-3.5">
            <div className="space-y-1">
              <div className="flex justify-between items-center text-xs">
                <span className="flex items-center gap-1.5 font-semibold text-slate-700">
                  <Scale className="w-3.5 h-3.5 text-blue-600" />
                  {t('legalAwareness')}
                </span>
                <span className="font-extrabold text-blue-700">{userProgress.skills.legalAwareness}%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 rounded-full transition-all duration-500" style={{ width: `${userProgress.skills.legalAwareness}%` }} />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center text-xs">
                <span className="flex items-center gap-1.5 font-semibold text-slate-700">
                  <Brain className="w-3.5 h-3.5 text-indigo-600" />
                  {t('ethicalReasoning')}
                </span>
                <span className="font-extrabold text-indigo-700">{userProgress.skills.ethicalReasoning}%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-600 rounded-full transition-all duration-500" style={{ width: `${userProgress.skills.ethicalReasoning}%` }} />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center text-xs">
                <span className="flex items-center gap-1.5 font-semibold text-slate-700">
                  <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
                  {t('conflictResolution')}
                </span>
                <span className="font-extrabold text-amber-700">{userProgress.skills.conflictResolution}%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full transition-all duration-500" style={{ width: `${userProgress.skills.conflictResolution}%` }} />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center text-xs">
                <span className="flex items-center gap-1.5 font-semibold text-slate-700">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  {t('decisionMaking')}
                </span>
                <span className="font-extrabold text-emerald-700">{userProgress.skills.prosocialDecisionMaking}%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full transition-all duration-500" style={{ width: `${userProgress.skills.prosocialDecisionMaking}%` }} />
              </div>
            </div>
          </div>
        </div>

        {/* 4. Related Thirukkural Card */}
        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-[#071B3A] uppercase tracking-wider">
              {t('relatedThirukkural')}
            </span>
            <span className="px-2 py-0.5 text-[10px] font-black text-amber-950 bg-amber-400 rounded-md">
              Kural {currentScenario.relatedKuralNumber}
            </span>
          </div>

          <div className="flex items-start justify-between gap-3">
            <div className="space-y-2">
              {relatedKural ? (
                <>
                  <p className="text-xs font-tamil text-slate-950 font-bold leading-relaxed">
                    {relatedKural.verse1Tamil}
                    <br />
                    {relatedKural.verse2Tamil}
                  </p>
                  <p className="text-xs text-slate-600 italic leading-snug font-medium">
                    "{language === 'ta' ? (relatedKural.explanationTamil || relatedKural.explanationEnglish) : relatedKural.explanationEnglish}"
                  </p>
                </>
              ) : (
                <>
                  <p className="text-xs font-tamil text-slate-950 font-bold leading-relaxed">
                    ஒழுக்கம் விழுப்பம் தரலான்
                    <br />
                    ஒழுக்கம் உயிரினும் ஓம்பப் படும்.
                  </p>
                  <p className="text-xs text-slate-600 italic leading-snug font-medium">
                    "{language === 'ta' ? 'ஒழுக்கமே அனைவருக்கும் சிறப்பைக் தரும்; அதை உயிரை விட மேலாகக் காக்க வேண்டும்.' : 'Virtue (ethical conduct) is the true wealth; it must be protected even more than life.'}"
                  </p>
                </>
              )}
            </div>

            <div className="shrink-0 -mr-2">
              <ThiruvalluvarAvatar size={60} />
            </div>
          </div>

          <button
            onClick={() => openKuralModalByNumber(currentScenario.relatedKuralNumber)}
            className="w-full py-2 text-xs font-bold text-[#071B3A] hover:bg-slate-100 bg-slate-50 border border-slate-200 rounded-xl transition-colors text-center cursor-pointer"
          >
            {t('exploreCoupletDetail')}
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
