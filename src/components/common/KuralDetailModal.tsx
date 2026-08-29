import React from 'react';
import { Kural } from '../../types';
import { ThiruvalluvarAvatar } from './ThiruvalluvarAvatar';
import { useApp } from '../../context/AppContext';
import { getLocalizedKural } from '../../i18n/kuralLocalizations';
import { X, BookOpen, Scale, Sparkles, Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface Props {
  kural: Kural | null;
  onClose: () => void;
  onSelectScenario?: (scenarioId: string) => void;
}

export const KuralDetailModal: React.FC<Props> = ({ kural: rawKural, onClose, onSelectScenario }) => {
  const [copied, setCopied] = useState(false);
  const { language, t } = useApp();

  if (!rawKural) return null;

  const kural = getLocalizedKural(rawKural, language);

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `Thirukkural ${kural.number}:\n${kural.verseTamilFull}\n\n"${kural.verseEnglish}"\n\nExplanation: ${kural.explanationEnglish}\n\n- KuralSaar AI`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl border border-slate-100 flex flex-col">
        {/* Modal Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-white/95 backdrop-blur-md border-b border-slate-100">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center px-3 py-1 text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200/60 rounded-full">
              {t('kuralNumFormat').replace('{number}', kural.number.toString())}
            </span>
            <span className="text-xs font-semibold text-slate-500">
              {kural.paalTamil || kural.paal} • {kural.adhigaram}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Main Verse Box */}
          <div className="relative p-6 rounded-2xl bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 text-white shadow-md overflow-hidden">
            <div className="absolute right-4 bottom-2 opacity-20 pointer-events-none">
              <ThiruvalluvarAvatar size={130} />
            </div>

            <div className="relative z-10 space-y-4">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-400/20 text-amber-300 border border-amber-400/30">
                <Sparkles className="w-3.5 h-3.5" />
                {kural.ethicalConcept}
              </div>

              {/* Tamil Couplet */}
              <div className="space-y-1">
                <p className="text-xl sm:text-2xl font-bold font-tamil leading-relaxed tracking-wide text-amber-100">
                  {kural.verse1Tamil}
                </p>
                <p className="text-xl sm:text-2xl font-bold font-tamil leading-relaxed tracking-wide text-amber-100">
                  {kural.verse2Tamil}
                </p>
              </div>

              {/* Transliteration */}
              <p className="text-xs font-medium italic text-slate-300">
                "{kural.transliteration}"
              </p>

              {/* Translation in active language */}
              <div className="pt-2 border-t border-slate-700/60">
                <p className="text-sm font-medium leading-relaxed text-slate-100">
                  "{language === 'ta' ? (kural.explanationTamil || kural.verseEnglish) : kural.verseEnglish}"
                </p>
              </div>
            </div>
          </div>

          {/* Explanations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-xl space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-600 uppercase tracking-wider">
                <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                {language === 'ta' ? 'மு. வரதராசனார் உரை' : language === 'hi' ? 'शास्त्रीय तमिल व्याख्या' : 'Tamil Canonical Meaning'}
              </div>
              <p className="text-sm text-slate-700 font-tamil leading-relaxed">
                {kural.explanationTamil}
              </p>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-xl space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-600 uppercase tracking-wider">
                <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                {language === 'hi' ? 'नैतिक व विधिक अर्थ' : language === 'ta' ? 'அறநெறி & நீதித்துறை விளக்கம்' : 'Jurisprudential Meaning'}
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">
                {language === 'hi'
                  ? (kural.explanationEnglish || kural.verseEnglish)
                  : language === 'ta'
                  ? (kural.explanationTamil || kural.explanationEnglish)
                  : kural.explanationEnglish}
              </p>
            </div>
          </div>

          {/* Modern Legal Relevance */}
          <div className="p-4 bg-purple-50/60 border border-purple-200/60 rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-purple-900 uppercase tracking-wider">
              <Scale className="w-4 h-4 text-purple-600" />
              {t('whyThisStatute')}
            </div>
            <p className="text-sm text-purple-950 leading-relaxed font-medium">
              {kural.modernRelevance}
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {kural.relatedLegalConcepts.map((item, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 text-xs font-medium bg-white text-purple-800 border border-purple-200 rounded-lg shadow-2xs"
                >
                  ⚖️ {item}
                </span>
              ))}
            </div>
          </div>

          {/* Keywords / Tags */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-xs font-semibold text-slate-400">{t('filterNodes')}</span>
            {kural.keywords.map((kw, i) => (
              <span key={i} className="px-2 py-0.5 text-xs bg-slate-100 text-slate-600 rounded-md">
                #{kw}
              </span>
            ))}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="sticky bottom-0 z-10 flex items-center justify-between px-6 py-4 bg-slate-50 border-t border-slate-200/80">
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            {copied
              ? (language === 'hi' ? 'कॉपी हो गया!' : language === 'ta' ? 'நகலெடுக்கப்பட்டது!' : 'Copied Verse!')
              : (language === 'hi' ? 'कुरल कॉपी करें' : language === 'ta' ? 'குறளை நகலெடு' : 'Copy Kural')}
          </button>

          <div className="flex items-center gap-3">
            {kural.relatedScenarioIds.length > 0 && onSelectScenario && (
              <button
                onClick={() => {
                  onSelectScenario(kural.relatedScenarioIds[0]);
                  onClose();
                }}
                className="px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs transition-colors cursor-pointer"
              >
                {t('scenarioChallenge')} →
              </button>
            )}
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
            >
              {language === 'hi' ? 'बंद करें' : language === 'ta' ? 'மூடுக' : 'Close'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
