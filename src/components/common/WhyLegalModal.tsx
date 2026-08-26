import React from 'react';
import { RetrievedLegalMatch } from '../../types';
import { X, Scale, ShieldAlert, CheckCircle2, BookOpen, AlertTriangle } from 'lucide-react';

interface WhyLegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  legalItem: RetrievedLegalMatch | null;
  detectedConcepts?: string[];
  userQuery?: string;
}

export const WhyLegalModal: React.FC<WhyLegalModalProps> = ({
  isOpen,
  onClose,
  legalItem,
  detectedConcepts = [],
  userQuery = ''
}) => {
  if (!isOpen || !legalItem) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 bg-slate-950/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-indigo-400">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white tracking-tight">Why this Legal Reference?</h2>
                <span className="px-2 py-0.5 text-[10px] font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full">
                  Educational Reference
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Statutory grounding & jurisdictional context for {legalItem.statute}
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
          {/* Concept Mapping */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 bg-slate-800/40 rounded-xl border border-slate-800">
              <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Detected Issue</span>
              <p className="text-xs font-semibold text-slate-200 mt-1">
                {detectedConcepts.find((c) => c.toLowerCase().includes('legal') || c.toLowerCase().includes('defence') || c.toLowerCase().includes('corruption')) || legalItem.concept}
              </p>
              {userQuery && <p className="text-[11px] text-slate-400 mt-1 italic line-clamp-2">"{userQuery}"</p>}
            </div>

            <div className="p-3.5 bg-slate-800/40 rounded-xl border border-slate-800">
              <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Statutory Authority</span>
              <p className="text-xs font-semibold text-indigo-400 mt-1">{legalItem.statute}</p>
              <p className="text-[11px] text-slate-400 mt-1">Category: {legalItem.category}</p>
            </div>
          </div>

          {/* Relevance Explanation */}
          <div className="p-4 bg-indigo-950/30 border border-indigo-500/20 rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider">
                Relevance & Legal Application
              </span>
              <span className="px-2 py-0.5 bg-indigo-500/20 text-indigo-300 text-[10px] font-bold rounded-md">
                {legalItem.relevanceScore}% Match
              </span>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed">{legalItem.whyRelevant}</p>
          </div>

          {/* Question & Answer Summary */}
          <div className="p-4 bg-slate-800/60 rounded-xl border border-slate-700/60 space-y-2.5">
            <div className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-indigo-400" /> Topic: {legalItem.question}
            </div>
            <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/80 p-3 rounded-lg border border-slate-800">
              {legalItem.answer}
            </p>
            <div className="text-[11px] text-slate-400 flex items-center justify-between pt-1">
              <span>Source: {legalItem.source}</span>
              <span className="font-mono text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-300">
                ID: {legalItem.id}
              </span>
            </div>
          </div>

          {/* Disclaimer Banner */}
          <div className="p-3.5 bg-amber-950/30 border border-amber-500/20 rounded-xl flex items-start gap-3">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-200/90">
              <strong>Educational Disclaimer:</strong> This legal context is provided strictly for academic analysis
              and civic education. It does not constitute formal legal advice, client representation, or judicial adjudication.
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
