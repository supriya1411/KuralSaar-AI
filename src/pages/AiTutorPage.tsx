import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { aiTutorService } from '../services/aiTutorService';
import { Phase3AiResponse, RetrievedKuralMatch } from '../types';
import { HowAiReasonedModal } from '../components/common/HowAiReasonedModal';
import { WhyKuralModal } from '../components/common/WhyKuralModal';
import {
  Send,
  Sparkles,
  Scale,
  BookOpen,
  HelpCircle,
  Lightbulb,
  CheckCircle,
  Copy,
  Check,
  RefreshCw,
  Cpu,
  ChevronRight,
  ShieldCheck,
  FileText
} from 'lucide-react';
import { VoiceDictationButton } from '../components/common/VoiceDictationButton';

const SUGGESTED_QUESTIONS: Record<string, string[]> = {
  en: [
    'Someone insulted me and I want revenge. What should I do?',
    'My manager asked me to hide a safety report violation.',
    'What does Thirukkural teach about anger and self-control?',
    'How should an advocate handle conflicting duties to client vs court?',
    'When is physical force legally permitted in private defence under Indian law?',
    'What is the ethical and legal perspective on whistleblowing?'
  ],
  ta: [
    'ஒருவர் என்னை அவமதித்தார், நான் பழிவாங்க விரும்புகிறேன். நான் என்ன செய்ய வேண்டும்?',
    'பாதுகாப்பு அறிக்கை மீறலை மறைக்குமாறு மேலாளர் கேட்கிறார்.',
    'சினம் மற்றும் சுயகட்டுப்பாடு பற்றி திருக்குறள் கூறுவது என்ன?',
    'வாடிக்கையாளர் மற்றும் நீதிமன்ற கடமைகளின் முரண்பாட்டை வழக்கறிஞர் எப்படி கையாள வேண்டும்?',
    'இந்திய சட்டப்படி தற்காப்பு உரிமை எப்போது அனுமதிக்கப்படுகிறது?',
    'உண்மையை வெளிக்கொணர்தல் (Whistleblowing) பற்றிய அறநெறி பார்வை என்ன?'
  ],
  hi: [
    'किसी ने मेरा अपमान किया और मैं बदला लेना चाहता हूँ। मुझे क्या करना चाहिए?',
    'मैनेजर ने मुझसे सुरक्षा रिपोर्ट उल्लंघन छिपाने को कहा है।',
    'क्रोध और आत्म-नियंत्रण के बारे में तिरुक्कुरल क्या सिखाता है?',
    'अधिवक्ता को मुवक्किल बनाम अदालत के कर्तव्य संघर्ष को कैसे संभालना चाहिए?',
    'भारतीय कानून के तहत आत्मरक्षा का अधिकार कब लागू होता है?',
    'व्हिसलब्लोइंग (गड़बड़ी उजागर करने) पर कानूनी और नैतिक दृष्टिकोण क्या है?'
  ]
};

export const AiTutorPage: React.FC = () => {
  const { openKuralModalByNumber, language, t } = useApp();
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

  const currentSuggested = SUGGESTED_QUESTIONS[language] || SUGGESTED_QUESTIONS['en'];

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-200 pb-12">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-4 text-slate-900">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black bg-amber-100 text-amber-900 border border-amber-300">
            <Cpu className="w-3.5 h-3.5 text-amber-600" />
            {t('aiTutor')}
          </div>
          <span className="px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider bg-emerald-100 text-emerald-950 border border-emerald-200 rounded-md flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-600" /> Grounded RAG
          </span>
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-[#071B3A] tracking-tight">
            {t('aiTutor')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl mt-1 font-medium">
            {t('aiTutorPillarDesc')}
          </p>
        </div>

        {/* Suggested Question Chips */}
        <div className="pt-2 space-y-2">
          <span className="text-xs font-bold text-slate-500">{t('presetQuestions')}</span>
          <div className="flex flex-wrap gap-2">
            {currentSuggested.map((sq, i) => (
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
      <div className="p-4 sm:p-5 bg-white rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAsk(query);
          }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
        >
          {/* Animated Gradient Border Box */}
          <div className="relative flex-1 group rounded-2xl p-[2px] bg-gradient-to-r from-amber-400 via-blue-500 to-indigo-600 focus-within:from-amber-500 focus-within:via-blue-600 focus-within:to-indigo-700 shadow-xs focus-within:shadow-[0_0_20px_rgba(59,130,246,0.25)] transition-all duration-300">
            <div className="relative flex items-center bg-slate-50 group-focus-within:bg-white rounded-[14px] transition-colors">
              <Sparkles className="w-4 h-4 text-amber-500 absolute left-3.5 pointer-events-none shrink-0" />
              <input
                type="text"
                placeholder={t('askTutorPlaceholder')}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-10 pr-12 py-3.5 text-sm bg-transparent border-0 outline-none text-slate-900 placeholder:text-slate-400 font-medium"
              />
              <div className="absolute right-3 z-20 flex items-center">
                <VoiceDictationButton currentValue={query} onTranscript={(text) => setQuery(text)} />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={!query.trim() || isLoading}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-extrabold text-white bg-[#071B3A] hover:bg-[#0A2540] disabled:opacity-50 rounded-2xl shadow-xs hover:shadow-md transition-all shrink-0 cursor-pointer border border-blue-900/30"
          >
            {isLoading ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <Send className="w-4 h-4 text-amber-400" />
                {t('send')}
              </>
            )}
          </button>
        </form>
      </div>

      {/* Output Response Section */}
      {isLoading && (
        <div className="p-8 bg-white border border-slate-200 rounded-2xl text-center space-y-3 shadow-2xs">
          <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-bold text-slate-600 animate-pulse">
            {t('evaluatingFeedback')}
          </p>
        </div>
      )}

      {currentResponse && !isLoading && (
        <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-2xs space-y-6 animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                <Scale className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-[#071B3A]">
                  {t('aiInsightsTitle')}
                </h3>
                <p className="text-xs text-slate-500 font-medium">Dual-Corpus Explainable Analysis</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowReasonedModal(true)}
                className="px-3 py-1.5 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <FileText className="w-3.5 h-3.5" />
                {t('viewTraceDetails')}
              </button>
              <button
                onClick={handleCopy}
                className="p-2 text-slate-500 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
                title="Copy Analysis"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Section 1: Situation Understanding */}
          <div className="space-y-2">
            <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-blue-600" /> Situation Overview
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed font-medium bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              {currentResponse.situationUnderstanding}
            </p>
          </div>

          {/* Section 2: Dual Corpus Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Ethical Perspective */}
            <div className="p-4 bg-amber-50/70 border border-amber-200/80 rounded-xl space-y-2">
              <span className="text-xs font-extrabold text-amber-900 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-amber-600" /> Thirukkural Ethical Foundation
              </span>
              <p className="text-xs text-amber-950 leading-relaxed font-medium">
                {currentResponse.ethicalPerspective}
              </p>
            </div>

            {/* Legal Perspective */}
            <div className="p-4 bg-blue-50/70 border border-blue-200/80 rounded-xl space-y-2">
              <span className="text-xs font-extrabold text-blue-900 flex items-center gap-1.5">
                <Scale className="w-4 h-4 text-blue-600" /> Indian Statutory Legal Context
              </span>
              <p className="text-xs text-blue-950 leading-relaxed font-medium">
                {currentResponse.legalEducationalPerspective}
              </p>
            </div>
          </div>

          {/* Section 3: Retrieved Kurals List */}
          {currentResponse.retrievedKurals && currentResponse.retrievedKurals.length > 0 && (
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Grounded Thirukkural Verses
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentResponse.retrievedKurals.map((k) => (
                  <div
                    key={k.kuralNumber}
                    onClick={() => {
                      setSelectedKuralForModal(k);
                    }}
                    className="p-3.5 bg-slate-50 hover:bg-slate-100/80 border border-slate-200 rounded-xl cursor-pointer transition-colors space-y-1.5 group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold text-[#071B3A]">
                        Kural #{k.kuralNumber}
                      </span>
                      <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                        {k.relevanceScore}% Match
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-slate-800 italic line-clamp-2">
                      "{k.englishVerse}"
                    </p>
                    <div className="flex items-center justify-between text-[11px] font-bold text-blue-600 pt-1">
                      <span>{t('whyThisKural')}</span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section 4: Responsible Action & Key Takeaway */}
          <div className="p-4 bg-[#071B3A] text-white rounded-xl space-y-3 shadow-2xs">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-extrabold uppercase tracking-wider text-amber-300">
                Recommended Action & Moral Conclusion
              </span>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed font-medium">
              {currentResponse.responsibleAction}
            </p>
            <div className="pt-2 border-t border-slate-700/80 text-xs font-bold text-amber-200 italic">
              "Takeaway: {currentResponse.keyTakeaway}"
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      <HowAiReasonedModal
        isOpen={showReasonedModal}
        onClose={() => setShowReasonedModal(false)}
        response={currentResponse}
        userQuery={query}
      />

      <WhyKuralModal
        isOpen={!!selectedKuralForModal}
        onClose={() => setSelectedKuralForModal(null)}
        kural={selectedKuralForModal}
        userQuery={query}
      />
    </div>
  );
};
