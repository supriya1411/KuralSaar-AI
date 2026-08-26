import React, { useState } from 'react';
import { ReasoningStepTrace } from '../../types';
import {
  X,
  Sparkles,
  Layers,
  Search,
  BookOpen,
  Scale,
  Network,
  Cpu,
  CheckCircle2,
  ChevronRight,
  Info
} from 'lucide-react';

interface HowAiReasonedModalProps {
  isOpen: boolean;
  onClose: () => void;
  traces: ReasoningStepTrace[];
  queryText?: string;
}

export const HowAiReasonedModal: React.FC<HowAiReasonedModalProps> = ({
  isOpen,
  onClose,
  traces,
  queryText
}) => {
  const [selectedStep, setSelectedStep] = useState<number>(1);

  if (!isOpen) return null;

  const currentTrace = traces.find((t) => t.stepNumber === selectedStep) || traces[0];

  const getStepIcon = (step: number) => {
    switch (step) {
      case 1: return Search;
      case 2: return Sparkles;
      case 3: return Layers;
      case 4: return BookOpen;
      case 5: return Scale;
      case 6: return Network;
      case 7: return Info;
      case 8: return Cpu;
      default: return CheckCircle2;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-slate-800 bg-slate-950/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-indigo-400">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white tracking-tight">How AI Reasoned</h2>
                <span className="px-2 py-0.5 text-[11px] font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full">
                  Explainability Trace
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Full 8-Step RAG Retrieval, Knowledge Graph Traversal & Grounding Verification
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body: Left Stepper Navigation + Right Detail Inspector */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Stepper Sidebar */}
          <div className="w-full md:w-72 border-r border-slate-800 bg-slate-900/60 p-3 overflow-y-auto space-y-1 shrink-0">
            <div className="px-3 py-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Retrieval Pipeline
            </div>
            {traces.map((trace) => {
              const Icon = getStepIcon(trace.stepNumber);
              const isSelected = selectedStep === trace.stepNumber;
              return (
                <button
                  key={trace.stepNumber}
                  onClick={() => setSelectedStep(trace.stepNumber)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-xs font-medium transition-all ${
                    isSelected
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20 font-semibold'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-lg flex items-center justify-center text-[11px] font-bold shrink-0 ${
                      isSelected ? 'bg-white text-indigo-600' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {trace.stepNumber}
                  </div>
                  <div className="flex-1 truncate">
                    <div className="truncate font-semibold">{trace.stepName}</div>
                  </div>
                  <ChevronRight className={`w-3.5 h-3.5 opacity-60 ${isSelected ? 'text-white' : 'text-slate-500'}`} />
                </button>
              );
            })}
          </div>

          {/* Step Detail Inspector */}
          <div className="flex-1 p-6 overflow-y-auto bg-slate-950/30">
            {currentTrace ? (
              <div className="space-y-5">
                {/* Step Header */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div>
                    <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">
                      Step {currentTrace.stepNumber} of {traces.length}
                    </span>
                    <h3 className="text-lg font-bold text-white mt-0.5">{currentTrace.title}</h3>
                    <p className="text-xs text-slate-400 mt-1">{currentTrace.description}</p>
                  </div>
                </div>

                {/* Query Banner for Context */}
                {queryText && (
                  <div className="p-3.5 bg-slate-800/40 rounded-xl border border-slate-800">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">User Query</span>
                    <p className="text-xs font-medium text-slate-200 mt-1 italic">"{queryText}"</p>
                  </div>
                )}

                {/* Formatted Technical Data Payload */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-300">Technical Payload & Transformations</span>
                    <span className="text-[10px] text-slate-400">JSON Data Inspection</span>
                  </div>
                  <div className="bg-slate-900 rounded-xl border border-slate-800 p-4 font-mono text-xs text-slate-300 overflow-x-auto max-h-80 custom-scrollbar">
                    {typeof currentTrace.details === 'string' ? (
                      <p className="whitespace-pre-wrap">{currentTrace.details}</p>
                    ) : (
                      <pre className="text-[11px] leading-relaxed">
                        {JSON.stringify(currentTrace.details, null, 2)}
                      </pre>
                    )}
                  </div>
                </div>

                {/* Pedagogical Explanation Note */}
                <div className="p-4 bg-indigo-950/30 border border-indigo-500/20 rounded-xl flex items-start gap-3">
                  <Info className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                  <div className="text-xs text-slate-300">
                    <strong className="text-indigo-300">Verification & Safety Notice:</strong> All steps are calculated
                    through deterministic vector indexing and structured server-side grounding. Gemini only synthesizes
                    insights from this verified evidence base without ungrounded hallucinations.
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-slate-500 text-sm">Select a step to view reasoning details.</div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between text-xs text-slate-400">
          <div>Transparent Retrieval & Grounded AI Pipeline</div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium transition-colors"
          >
            Close Trace
          </button>
        </div>
      </div>
    </div>
  );
};
