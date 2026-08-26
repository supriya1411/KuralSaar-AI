import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { aiTutorService } from '../services/aiTutorService';
import { Phase3AiResponse, RetrievedKuralMatch } from '../types';
import { HowAiReasonedModal } from '../components/common/HowAiReasonedModal';
import { WhyKuralModal } from '../components/common/WhyKuralModal';
import {
  Bot,
  Send,
  Sparkles,
  Scale,
  BookOpen,
  HelpCircle,
  Lightbulb,
  CheckCircle,
  AlertCircle,
  Copy,
  Check,
  RefreshCw,
  Cpu,
  ChevronRight,
  ShieldCheck,
  FileText
} from 'lucide-react';

const SUGGESTED_QUESTIONS = [
  'Someone insulted me and I want revenge. What should I do?',
  'My manager asked me to hide a safety report violation.',
  'What does Thirukkural teach about anger and self-control?',
  'How should an advocate handle conflicting duties to client vs court?',
  'When is physical force legally permitted in private defence under Indian law?',
  'What is the ethical and legal perspective on whistleblowing?'
];

export const AiTutorPage: React.FC = () => {
  const { openKuralModalByNumber } = useApp();
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentResponse, setCurrentResponse] = useState<Phase3AiResponse | null>(null);
  const [copied, setCopied] = useState(false);

  // Explainability Modals
  const [showReasonedModal, setShowReasonedModal] = useState<boolean>(false);
  const [selectedKuralForModal, setSelectedKuralForModal] = useState<RetrievedKuralMatch | null>(null);

  const handleAsk = async (textToAsk: string) => {
    if (!textToAsk.trim()) return;
    setIsLoading(true);
    setQuery(textToAsk);

    try {
      const res = await aiTutorService.askTutor(textToAsk);
      setCurrentResponse(res);
    } catch (err) {
      console.warn('[AiTutorPage] Query error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!currentResponse) return;
    navigator.clipboard.writeText(
      `Justice AI Tutor Analysis:\n\nSituation: ${currentResponse.situationUnderstanding}\n\nEthical Perspective:\n${currentResponse.ethicalPerspective}\n\nLegal Educational Perspective:\n${currentResponse.legalEducationalPerspective}\n\nResponsible Action:\n${currentResponse.responsibleAction}\n\nKey Takeaway:\n${currentResponse.keyTakeaway}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-200 pb-12">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-4 text-slate-900">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black bg-amber-100 text-amber-900 border border-amber-300">
            <Cpu className="w-3.5 h-3.5 text-amber-600" />
            Justice AI Legal & Ethics Tutor
          </div>
          <span className="px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider bg-emerald-100 text-emerald-950 border border-emerald-200 rounded-md flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-600" /> Grounded RAG
          </span>
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-[#071B3A] tracking-tight">
            Ask the Ethical Tutor
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl mt-1 font-medium">
            Grounded dual-corpus reasoning engine connecting classical Thirukkural moral virtues (Aram)
            with Indian statutory jurisprudence and constitutional principles.
          </p>
        </div>

        {/* Suggested Question Chips */}
        <div className="pt-2 space-y-2">
          <span className="text-xs font-bold text-slate-500">Suggested Inquiries:</span>
          <div className="flex flex-wrap gap-2">
            {SUGGESTED_QUESTIONS.map((sq, i) => (
              <button
                key={i}
                onClick={() => handleAsk(sq)}
                className="px-3 py-1.5 text-xs font-bold bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 rounded-xl text-left transition-all cursor-pointer"
              >
                💡 {sq}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Input Box */}
      <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAsk(query);
          }}
          className="flex items-center gap-3"
        >
          <input
            type="text"
            placeholder="Type your ethical dilemma or legal query here (e.g. 'Someone insulted me and I want revenge. What should I do?')..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-slate-900 font-medium"
          />
          <button
            type="submit"
            disabled={!query.trim() || isLoading}
            className="inline-flex items-center gap-2 px-6 py-3 text-xs font-extrabold text-white bg-[#071B3A] hover:bg-[#0A2540] disabled:opacity-50 rounded-xl shadow-2xs transition-all shrink-0 cursor-pointer"
          >
            {isLoading ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <Send className="w-4 h-4 text-amber-400" />
                Ask Tutor
              </>
            )}
          </button>
        </form>
      </div>

      {/* Structured AI Response View */}
      {isLoading ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 space-y-3 shadow-2xs">
          <div className="w-9 h-9 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm font-bold text-slate-800">
            Analyzing Legal Provisions & Ethics...
          </p>
          <p className="text-xs text-slate-500 font-medium">
            Synthesizing Indian statutory jurisprudence with Thirukkural moral wisdom.
          </p>
        </div>
      ) : currentResponse ? (
        <div className="p-6 sm:p-8 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-6 animate-in fade-in duration-300">
          {/* Top Bar with Explainability Button */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center text-blue-900 font-bold border border-blue-100">
                <Bot className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                  Grounded Synthesis
                </span>
                <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
                  {query || 'Analysis Result'}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowReasonedModal(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-50 hover:bg-blue-100 text-[#071B3A] border border-blue-200 rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                <Cpu className="w-3.5 h-3.5 text-blue-600" />
                How AI Reasoned
              </button>

              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
          </div>

          {/* Situation Understanding */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-extrabold uppercase text-slate-500 tracking-wider">
                Situation Understanding
              </span>
              <div className="flex flex-wrap gap-1.5">
                {currentResponse.detectedConcepts?.map((c, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-0.5 bg-blue-100 text-blue-900 text-[10px] font-bold rounded-md"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              {currentResponse.situationUnderstanding}
            </p>
          </div>

          {/* Two-Column Perspectives */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 1. Ethical Perspective Box */}
            <div className="p-5 bg-amber-50/70 border border-amber-200 rounded-2xl space-y-2">
              <div className="flex items-center gap-2 text-xs font-extrabold text-amber-950 uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-amber-600" />
                Ethical Perspective (Aram / Classical Virtues)
              </div>
              <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                {currentResponse.ethicalPerspective}
              </p>
            </div>

            {/* 2. Legal Educational Perspective Box */}
            <div className="p-5 bg-blue-50/70 border border-blue-200 rounded-2xl space-y-2">
              <div className="flex items-center gap-2 text-xs font-extrabold text-blue-950 uppercase tracking-wider">
                <Scale className="w-4 h-4 text-blue-600" />
                Legal Educational Perspective (Statutes & Doctrines)
              </div>
              <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                {currentResponse.legalEducationalPerspective}
              </p>
            </div>
          </div>

          {/* 3. Related Thirukkural Matches */}
          {currentResponse.relatedKurals && currentResponse.relatedKurals.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                  Grounded Thirukkural Couplets
                </span>
              </div>

              {currentResponse.relatedKurals.map((rk, idx) => (
                <div
                  key={idx}
                  className="p-5 bg-[#071B3A] text-white rounded-2xl border border-slate-700 shadow-xs space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-amber-400 flex items-center gap-1.5">
                      Kural {rk.kuralNumber} • Chapter: {rk.chapter} ({rk.paal})
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedKuralForModal(rk)}
                        className="text-xs font-bold text-blue-200 hover:text-white bg-blue-900/60 px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        Why this Kural? <ChevronRight className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => openKuralModalByNumber(rk.kuralNumber)}
                        className="text-xs text-amber-300 hover:underline font-bold cursor-pointer"
                      >
                        Explore Verse →
                      </button>
                    </div>
                  </div>

                  <div className="p-3 bg-white/5 rounded-xl border border-white/10 space-y-1">
                    <p className="text-sm font-bold font-tamil text-amber-200">
                      {rk.tamilVerse}
                    </p>
                    <p className="text-xs text-slate-200 italic font-serif">
                      "{rk.englishVerse}"
                    </p>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed font-medium">
                    <strong className="text-amber-300">Relevance Link:</strong> {rk.whyRelevant || rk.englishExplanation}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* 4. Responsible Action & De-escalation */}
          <div className="p-5 bg-emerald-50/80 border border-emerald-200 rounded-2xl space-y-2">
            <div className="flex items-center gap-2 text-xs font-extrabold text-emerald-950 uppercase tracking-wider">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              Responsible Action & De-escalation Strategy
            </div>
            <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium whitespace-pre-line">
              {currentResponse.responsibleAction}
            </p>
          </div>

          {/* 5. Modern Application */}
          <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
            <div className="flex items-center gap-2 text-xs font-extrabold text-slate-800 uppercase tracking-wider">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              Modern Digital & Civic Application
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              {currentResponse.modernApplication}
            </p>
          </div>

          {/* 6. Key Takeaway */}
          <div className="p-4 bg-[#071B3A] text-white rounded-2xl border border-slate-700 shadow-xs flex items-start gap-3">
            <div className="p-2 bg-amber-400 rounded-xl text-slate-950 shrink-0 font-bold">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-black text-amber-400 uppercase tracking-wider">
                Key Educational Takeaway
              </h4>
              <p className="text-xs sm:text-sm font-semibold text-slate-100 mt-1 leading-relaxed italic">
                "{currentResponse.keyTakeaway}"
              </p>
            </div>
          </div>

          {/* Sources & Citations */}
          {currentResponse.sources && currentResponse.sources.length > 0 && (
            <div className="pt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 border-t border-slate-100">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="font-bold text-slate-700">Grounded Evidence Sources:</span>
                {currentResponse.sources.map((s, idx) => (
                  <span key={idx} className="bg-slate-100 border border-slate-200 px-2 py-0.5 rounded text-[11px] font-bold text-slate-700">
                    {s.name} ({s.recordId})
                  </span>
                ))}
              </div>
              <span className="text-[11px] font-semibold">
                {new Date(currentResponse.timestamp).toLocaleTimeString()}
              </span>
            </div>
          )}

          {/* Disclaimer Footer */}
          <div className="p-3 bg-amber-50/80 rounded-xl border border-amber-200 text-[11px] text-amber-950 font-medium flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>{currentResponse.disclaimer}</span>
          </div>
        </div>
      ) : (
        /* Empty State */
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-700 mx-auto font-bold border border-blue-100">
            <Bot className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-extrabold text-[#071B3A] font-heading">
              Ready for Your Inquiry
            </h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto font-medium">
              Select one of the suggested prompts above or type your own dilemma to receive legal and ethical guidance.
            </p>
          </div>
        </div>
      )}

      {/* Explainability Modals */}
      <HowAiReasonedModal
        isOpen={showReasonedModal}
        onClose={() => setShowReasonedModal(false)}
        traces={currentResponse?.traces || []}
        queryText={query}
      />

      <WhyKuralModal
        isOpen={Boolean(selectedKuralForModal)}
        onClose={() => setSelectedKuralForModal(null)}
        kural={selectedKuralForModal}
        detectedConcepts={currentResponse?.detectedConcepts}
        userQuery={query}
      />
    </div>
  );
};
