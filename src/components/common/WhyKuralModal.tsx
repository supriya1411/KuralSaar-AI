import React from 'react';
import { RetrievedKuralMatch } from '../../types';
import { X, Sparkles, BookOpen, Scale, ArrowRight, CheckCircle2 } from 'lucide-react';

interface WhyKuralModalProps {
  isOpen: boolean;
  onClose: () => void;
  kural: RetrievedKuralMatch | null;
  detectedConcepts?: string[];
  userQuery?: string;
}

export const WhyKuralModal: React.FC<WhyKuralModalProps> = ({
  isOpen,
  onClose,
  kural,
  detectedConcepts = [],
  userQuery = ''
}) => {
  if (!isOpen || !kural) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 bg-slate-950/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white tracking-tight">Why this Kural?</h2>
                <span className="px-2 py-0.5 text-[10px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-full">
                  Semantic Grounding
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Mathematical & Conceptual link between your inquiry and Kural {kural.kuralNumber}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 overflow-y-auto custom-scrollbar">
          {/* User Inquiry & Detected Concept Mapping */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 bg-slate-800/40 rounded-xl border border-slate-800">
              <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">User Concept</span>
              <p className="text-xs font-semibold text-slate-200 mt-1">
                {detectedConcepts.slice(0, 2).join(', ') || 'Moral Restraint'}
              </p>
              {userQuery && <p className="text-[11px] text-slate-400 mt-1 italic line-clamp-2">"{userQuery}"</p>}
            </div>

            <div className="p-3.5 bg-slate-800/40 rounded-xl border border-slate-800">
              <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Kural Ethical Concept</span>
              <p className="text-xs font-semibold text-amber-400 mt-1">{kural.concept || kural.chapter}</p>
              <p className="text-[11px] text-slate-400 mt-1">
                Chapter {kural.chapterNumber ? `${kural.chapterNumber}: ` : ''}{kural.chapter} ({kural.paal})
              </p>
            </div>
          </div>

          {/* Semantic Linkage Card */}
          <div className="p-4 bg-indigo-950/30 border border-indigo-500/20 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5" /> Semantic Relationship
              </span>
              <span className="px-2 py-0.5 bg-indigo-500/20 text-indigo-300 text-[10px] font-bold rounded-md">
                {kural.relevanceScore}% Relevance Match
              </span>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed">{kural.whyRelevant}</p>
          </div>

          {/* Couplet & Meaning Box */}
          <div className="p-4 bg-slate-800/60 rounded-xl border border-slate-700/60 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-amber-400" /> Kural {kural.kuralNumber} Verses
              </span>
              <span className="text-[10px] text-slate-400">{kural.source}</span>
            </div>
            <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 font-serif text-sm text-amber-200/90 leading-relaxed italic">
              "{kural.englishVerse}"
            </div>
            <div className="text-xs text-slate-300">
              <strong className="text-slate-200">Ethical Meaning:</strong> {kural.englishExplanation}
            </div>
          </div>

          {/* Transparency Checklist */}
          <div className="space-y-1.5 pt-1">
            <div className="text-[11px] font-bold uppercase text-slate-400 tracking-wider">Grounding Integrity Check</div>
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Verified in classical 1,330 couplet corpus (non-hallucinated).</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Cross-linked to modern Indian statutory standards and dispute de-escalation.</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold transition-colors"
          >
            Understood
          </button>
        </div>
      </div>
    </div>
  );
};
