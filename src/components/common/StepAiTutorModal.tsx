import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { aiTutorService } from '../../services/aiTutorService';
import { Phase3AiResponse } from '../../types';
import { VoiceDictationButton } from './VoiceDictationButton';
import {
  Bot,
  Send,
  Sparkles,
  Scale,
  BookOpen,
  CheckCircle,
  X,
  RefreshCw,
  Cpu,
  ShieldCheck,
  FileText,
  User,
  Copy,
  Check,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'tutor';
  text?: string;
  aiResponse?: Phase3AiResponse;
  timestamp: string;
}

interface StepAiTutorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTopic: string;
  contextTitle?: string;
}

export const StepAiTutorModal: React.FC<StepAiTutorModalProps> = ({
  isOpen,
  onClose,
  initialTopic,
  contextTitle = 'Ethical & Legal Inquiry',
}) => {
  const { language, t } = useApp();
  const [inputQuery, setInputQuery] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setInputQuery('');
      setMessages([]);
      setIsLoading(false);
    }
  }, [isOpen, initialTopic]);

  const handleAsk = async (queryText: string) => {
    if (!queryText.trim()) return;

    const userMsgId = `user-${Date.now()}`;
    const userMsg: ChatMessage = {
      id: userMsgId,
      sender: 'user',
      text: queryText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const res = await aiTutorService.askTutor(queryText, language);
      const tutorMsg: ChatMessage = {
        id: `tutor-${Date.now()}`,
        sender: 'tutor',
        aiResponse: res,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, tutorMsg]);
    } catch (err) {
      console.warn('[StepAiTutorModal] Error fetching AI response:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (msgId: string, res?: Phase3AiResponse) => {
    if (!res) return;
    const textToCopy = `${t('appName')} AI Tutor Analysis:\n\n${t('situationUnderstanding')}: ${res.situationUnderstanding}\n\n${t('ethicalVirtuesAram')}:\n${res.ethicalPerspective}\n\n${t('statutoryLegalRules')}:\n${res.legalEducationalPerspective}\n\n${t('responsibleActionRec')}:\n${res.responsibleAction}\n\n${t('keyTakeawayLabel')}:\n${res.keyTakeaway}`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(msgId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (!isOpen) return null;

  const suggestedQuestions = language === 'ta' ? [
    `"${initialTopic}" குறித்த அறநெறி மற்றும் சட்டப் பார்வை என்ன?`,
    `இந்தக் கோட்பாட்டுக்கு எந்தத் திருக்குறள்கள் நேரடியாகப் பொருந்துகின்றன?`,
    `இதை நிர்வகிக்கும் இந்திய சட்டப்பிரிவுகள் மற்றும் அரசியலமைப்பு சரத்துகள் எவை?`,
  ] : language === 'hi' ? [
    `"${initialTopic}" पर नैतिक और कानूनी दृष्टिकोण क्या है?`,
    `कौन से तिरुक्कुरल छंद विशेष रूप से इस सिद्धांत पर लागू होते हैं?`,
    `इसे कौन से भारतीय वैधानिक कानून या संवैधानिक अनुच्छेद नियंत्रित करते हैं?`,
  ] : [
    `What is the ethical & legal perspective on "${initialTopic}"?`,
    `Which Thirukkural couplets specifically apply to this principle?`,
    `What Indian statutory laws or constitutional articles govern this?`,
  ];

  const quickPromptsList = language === 'ta' ? [
    `குறள் 111 அரசியலமைப்பு பிரிவு 21 உடன் எவ்வாறு தொடர்பு கொள்கிறது?`,
    `இதற்கான நிஜ நீதிமன்ற தீர்ப்பு உதராணங்கள் என்ன?`,
    `நடைமுறை நீதியை எளிய முறையில் விளக்குக.`,
  ] : language === 'hi' ? [
    `कुरल 111 अनुच्छेद 21 से कैसे संबंधित है?`,
    `इसके वास्तविक अदालती उदाहरण क्या हैं?`,
    `सरल शब्दों में उचित प्रक्रिया समझाइए।`,
  ] : [
    `How does Kural 111 relate to Article 21?`,
    `What are real court examples of this?`,
    `Explain due process in simple terms.`,
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-3xl w-full flex flex-col max-h-[90vh] overflow-hidden relative animate-in zoom-in-95 duration-200">
        {/* Header Bar */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-[#071B3A] via-[#0A2540] to-[#071B3A] text-white flex items-center justify-between shrink-0 shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300 shadow-2xs">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-md flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Grounded RAG AI
                </span>
                <span className="text-[10px] font-bold text-amber-300">
                  {contextTitle}
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-extrabold text-white leading-tight font-heading mt-0.5 line-clamp-1">
                {t('aiTutorTitle')}: {initialTopic || 'Legal & Ethical Guidance'}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white flex items-center justify-center font-bold text-sm cursor-pointer transition-colors"
            title="Close AI Tutor Card"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Chat History Messages Scroll Area */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-6 custom-scrollbar bg-slate-50/60 flex flex-col">
          {messages.length === 0 && !isLoading && (
            <div className="py-6 px-6 text-center bg-white rounded-3xl border border-slate-200 shadow-2xs space-y-5 my-auto animate-in fade-in duration-300">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 mx-auto font-bold shadow-2xs">
                <Bot className="w-7 h-7 text-blue-600" />
              </div>

              <div className="space-y-1.5 max-w-md mx-auto">
                <h4 className="text-base font-extrabold text-[#071B3A] font-heading">
                  {t('aiTutorTitle')}
                </h4>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  {t('aiTutorSub').replace('{topic}', initialTopic || 'legal and ethical dilemmas')}
                </p>
              </div>

              {/* Suggested Questions */}
              <div className="space-y-2 pt-1 max-w-lg mx-auto">
                <span className="text-xs font-bold text-slate-500 block text-center">
                  {t('suggestedInquiries')}
                </span>
                <div className="flex flex-col gap-2">
                  {suggestedQuestions.map((sq, i) => (
                    <button
                      key={i}
                      onClick={() => handleAsk(sq)}
                      className="p-3 text-xs font-bold bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 text-slate-800 rounded-xl text-left transition-all cursor-pointer flex items-center justify-between group font-tamil font-semibold"
                    >
                      <span className="flex items-center gap-2">
                        💡 {sq}
                      </span>
                      <span className="text-[11px] text-blue-600 font-extrabold opacity-0 group-hover:opacity-100 transition-opacity">
                        {t('send')} →
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {messages.map((msg) => {
            if (msg.sender === 'user') {
              return (
                <div key={msg.id} className="flex items-start justify-end gap-2.5">
                  <div className="max-w-xl p-4 bg-[#071B3A] text-white rounded-2xl rounded-tr-xs shadow-2xs space-y-1">
                    <p className="text-xs sm:text-sm font-semibold leading-relaxed">
                      {msg.text}
                    </p>
                    <span className="text-[10px] text-slate-400 font-medium block text-right">
                      {msg.timestamp}
                    </span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-800 shrink-0 font-bold text-xs">
                    <User className="w-4 h-4 text-blue-700" />
                  </div>
                </div>
              );
            }

            const res = msg.aiResponse;
            if (!res) return null;

            return (
              <div key={msg.id} className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 shrink-0 shadow-2xs">
                  <Bot className="w-5 h-5" />
                </div>

                <div className="flex-1 bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-5 animate-in fade-in duration-200">
                  {/* Top Bar with Copy */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5 text-blue-600" /> {t('groundedDualCorpus')}
                    </span>

                    <button
                      onClick={() => handleCopy(msg.id, res)}
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-600 hover:text-slate-900 px-2.5 py-1 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      {copiedId === msg.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          {t('copied')}
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 text-slate-500" />
                          {t('copyAnalysis')}
                        </>
                      )}
                    </button>
                  </div>

                  {/* Situation Understanding */}
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                    <span className="text-[10px] font-extrabold uppercase text-slate-500 tracking-wider">
                      {t('situationUnderstanding')}
                    </span>
                    <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                      {res.situationUnderstanding}
                    </p>
                  </div>

                  {/* Two-Column Perspectives */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Ethical Perspective */}
                    <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl space-y-1.5">
                      <div className="flex items-center gap-1.5 text-xs font-extrabold text-amber-950 uppercase tracking-wider">
                        <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                        {t('ethicalVirtuesAram')}
                      </div>
                      <p className="text-xs text-slate-800 leading-relaxed font-medium">
                        {res.ethicalPerspective}
                      </p>
                    </div>

                    {/* Legal Perspective */}
                    <div className="p-4 bg-blue-50/70 border border-blue-200 rounded-xl space-y-1.5">
                      <div className="flex items-center gap-1.5 text-xs font-extrabold text-blue-950 uppercase tracking-wider">
                        <Scale className="w-3.5 h-3.5 text-blue-600" />
                        {t('statutoryLegalRules')}
                      </div>
                      <p className="text-xs text-slate-800 leading-relaxed font-medium">
                        {res.legalEducationalPerspective}
                      </p>
                    </div>
                  </div>

                  {/* Related Thirukkural Matches */}
                  {res.relatedKurals && res.relatedKurals.length > 0 && (
                    <div className="space-y-2.5">
                      <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                        {t('groundedThirukkuralCouplets')}
                      </span>
                      {res.relatedKurals.map((rk, idx) => (
                        <div
                          key={idx}
                          className="p-4 bg-[#071B3A] text-white rounded-xl border border-slate-700 space-y-2"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-black text-amber-400">
                              Kural #{rk.kuralNumber} • {rk.chapter}
                            </span>
                            <span className="text-[10px] font-bold bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded border border-amber-400/30">
                              {rk.paal}
                            </span>
                          </div>
                          <p className="text-xs font-bold font-tamil text-amber-200">
                            {rk.tamilVerse}
                          </p>
                          <p className="text-xs text-slate-200 italic font-serif">
                            "{language === 'ta' ? (rk.explanationTamil || rk.englishVerse) : rk.englishVerse}"
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Responsible Action */}
                  <div className="p-4 bg-emerald-50/80 border border-emerald-200 rounded-xl space-y-1">
                    <div className="flex items-center gap-1.5 text-xs font-extrabold text-emerald-950 uppercase tracking-wider">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                      {t('responsibleActionRec')}
                    </div>
                    <p className="text-xs text-slate-800 leading-relaxed font-medium whitespace-pre-line">
                      {res.responsibleAction}
                    </p>
                  </div>

                  {/* Key Takeaway */}
                  <div className="p-3.5 bg-[#071B3A] text-white rounded-xl flex items-start gap-2.5">
                    <FileText className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-[10px] font-black text-amber-400 uppercase tracking-wider">
                        {t('keyTakeawayLabel')}
                      </h4>
                      <p className="text-xs font-semibold text-slate-100 italic leading-relaxed">
                        "{res.keyTakeaway}"
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Loading state */}
          {isLoading && (
            <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-2xs text-center space-y-2">
              <div className="w-7 h-7 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-xs font-bold text-slate-800">
                {t('reasoningOverLaw')}
              </p>
            </div>
          )}
        </div>

        {/* Input Bar Form */}
        <div className="p-4 bg-white border-t border-slate-200 shrink-0 space-y-3">
          {/* Quick Prompts */}
          <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar pb-1">
            <span className="text-[11px] font-bold text-slate-400 shrink-0">{t('quickPrompts')}</span>
            {quickPromptsList.map((qp, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleAsk(qp)}
                className="px-2.5 py-1 text-[11px] font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg whitespace-nowrap cursor-pointer transition-colors border border-slate-200 font-tamil font-semibold"
              >
                💡 {qp}
              </button>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAsk(inputQuery);
              setInputQuery('');
            }}
            className="flex items-center gap-3"
          >
            <div className="relative flex-1 group rounded-2xl p-[2px] bg-gradient-to-r from-amber-400 via-blue-500 to-indigo-600 focus-within:from-amber-500 focus-within:via-blue-600 focus-within:to-indigo-700 shadow-xs focus-within:shadow-[0_0_20px_rgba(59,130,246,0.25)] transition-all duration-300">
              <div className="relative flex items-center bg-slate-50 group-focus-within:bg-white rounded-[14px] transition-colors">
                <Sparkles className="w-4 h-4 text-amber-500 absolute left-3.5 pointer-events-none shrink-0" />
                <input
                  type="text"
                  placeholder={t('askFollowUpPlaceholder')}
                  value={inputQuery}
                  onChange={(e) => setInputQuery(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 text-xs sm:text-sm bg-transparent border-0 outline-none text-slate-900 placeholder:text-slate-400 font-medium"
                />
                <div className="absolute right-3 z-20 flex items-center">
                  <VoiceDictationButton
                    currentValue={inputQuery}
                    onTranscript={(text) => setInputQuery(text)}
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={!inputQuery.trim() || isLoading}
              className="inline-flex items-center gap-2 px-5 py-3 text-xs font-extrabold text-white bg-[#071B3A] hover:bg-[#0A2540] disabled:opacity-50 rounded-2xl shadow-xs transition-all shrink-0 cursor-pointer border border-blue-900/30"
            >
              {isLoading ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <Send className="w-4 h-4 text-amber-400" />
                  {t('askAiBtn')}
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
