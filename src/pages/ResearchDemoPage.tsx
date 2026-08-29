import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Search,
  BookOpen,
  Scale,
  Network,
  Cpu,
  ArrowRight,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  FileText,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import {
  Phase3AiResponse,
  FullRagRetrievalContext,
  RetrievedKuralMatch,
  RetrievedLegalMatch
} from '../types';
import { HowAiReasonedModal } from '../components/common/HowAiReasonedModal';
import { WhyKuralModal } from '../components/common/WhyKuralModal';
import { WhyLegalModal } from '../components/common/WhyLegalModal';

import { VoiceDictationButton } from '../components/common/VoiceDictationButton';

const PRESET_QUERIES = [
  'Someone insulted me and I want revenge. What should I do?',
  'My manager asked me to hide a safety audit violation before inspection.',
  'What does Thirukkural say about bribery and corruption in public office?',
  'When is physical force legally permitted in private defence under Indian law?',
  'Is it ethical to break a non-disclosure agreement to expose environmental dumping?'
];

export const ResearchDemoPage: React.FC = () => {
  const [selectedQuery, setSelectedQuery] = useState<string>(PRESET_QUERIES[0]);
  const [customQuery, setCustomQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [retrievalContext, setRetrievalContext] = useState<FullRagRetrievalContext | null>(null);
  const [aiResponse, setAiResponse] = useState<Phase3AiResponse | null>(null);

  // Modals state
  const [showReasonedModal, setShowReasonedModal] = useState<boolean>(false);
  const [selectedKuralForModal, setSelectedKuralForModal] = useState<RetrievedKuralMatch | null>(null);
  const [selectedLegalForModal, setSelectedLegalForModal] = useState<RetrievedLegalMatch | null>(null);

  const activeQuery = customQuery.trim() || selectedQuery;

  const runPipeline = async (queryToRun: string) => {
    setLoading(true);
    try {
      const res = await fetch('/api/research-demo/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: queryToRun })
      });

      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          setRetrievalContext(json.data.retrieval);
          setAiResponse(json.data.aiResponse);
        }
      }
    } catch (err) {
      console.warn('[ResearchDemoPage] Error executing pipeline:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    runPipeline(PRESET_QUERIES[0]);
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-300 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 p-6 md:p-8 rounded-2xl border border-indigo-500/20 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Cpu className="w-48 h-48 text-indigo-400" />
        </div>
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 border border-indigo-500/30 rounded-full text-indigo-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            Justice AI Research & Architecture Inspector
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
            End-to-End AI Reasoning & Retrieval Pipeline
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            Inspect how user queries pass through concept extraction, dual-corpus semantic retrieval,
            knowledge graph expansion, and grounded Gemini synthesis with full explainability.
          </p>
        </div>
      </div>

      {/* Query Selector & Custom Input */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <Search className="w-4 h-4 text-indigo-400" /> Select or Enter Test Scenario
          </h2>
          {aiResponse && (
            <button
              onClick={() => setShowReasonedModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/30 text-indigo-300 rounded-xl text-xs font-bold transition-all shadow-sm"
            >
              <Cpu className="w-3.5 h-3.5" />
              View Full 8-Step Trace
            </button>
          )}
        </div>

        {/* Preset Query Chips */}
        <div className="flex flex-wrap gap-2">
          {PRESET_QUERIES.map((q) => (
            <button
              key={q}
              onClick={() => {
                setSelectedQuery(q);
                setCustomQuery('');
                runPipeline(q);
              }}
              className={`px-3 py-2 rounded-xl text-xs font-medium text-left transition-all ${
                selectedQuery === q && !customQuery
                  ? 'bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/20'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-850 hover:text-white border border-slate-700/50'
              }`}
            >
              {q}
            </button>
          ))}
        </div>

        {/* Custom Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (activeQuery) runPipeline(activeQuery);
          }}
          className="flex gap-3 pt-2"
        >
          <div className="relative flex-1 flex items-center">
            <input
              type="text"
              value={customQuery}
              onChange={(e) => setCustomQuery(e.target.value)}
              placeholder="Or type a custom moral, civic, or statutory question..."
              className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-4 pr-12 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
            />
            <div className="absolute right-3 z-20 flex items-center">
              <VoiceDictationButton currentValue={customQuery} onTranscript={(text) => setCustomQuery(text)} />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading || !activeQuery}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center gap-2 shrink-0 shadow-lg shadow-indigo-600/20"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" /> Processing Query...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" /> Run Pipeline
              </>
            )}
          </button>
        </form>
      </div>

      {/* Main Pipeline Inspection View */}
      {retrievalContext && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Retrieval Pipeline Stages (5 Cols) */}
          <div className="lg:col-span-5 space-y-5">
            {/* Stage 1 & 2: Detected Concepts */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" /> 1. Concept Extraction
                </span>
                <span className="text-[11px] text-slate-400">
                  {retrievalContext.detectedConcepts.length} Concepts
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {retrievalContext.detectedConcepts.map((c) => (
                  <div
                    key={c.name}
                    className="px-2.5 py-1 bg-slate-800/80 border border-slate-700 rounded-lg text-xs flex items-center gap-1.5"
                  >
                    <span className="font-semibold text-amber-300">{c.name}</span>
                    <span className="text-[10px] text-slate-400 font-mono">({c.confidence}%)</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stage 3 & 4: Grounded Kurals */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-indigo-400" /> 2. Grounded Kurals
                </span>
                <span className="text-[11px] text-slate-400">{retrievalContext.kurals.length} Retrieved</span>
              </div>
              <div className="space-y-3">
                {retrievalContext.kurals.map((k) => (
                  <div
                    key={k.kuralNumber}
                    className="p-3.5 bg-slate-800/50 rounded-xl border border-slate-700/60 space-y-2 hover:border-indigo-500/40 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-400">
                        Kural {k.kuralNumber} • {k.chapter} ({k.paal})
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 bg-indigo-500/20 text-indigo-300 rounded">
                        {k.relevanceScore}% match
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 italic font-serif leading-relaxed">
                      "{k.englishVerse}"
                    </p>
                    <div className="pt-1 flex items-center justify-between">
                      <span className="text-[11px] text-slate-400 truncate max-w-[200px]">
                        Concept: {k.concept}
                      </span>
                      <button
                        onClick={() => setSelectedKuralForModal(k)}
                        className="text-[11px] font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                      >
                        Why this Kural? <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stage 5: Legal Knowledge */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Scale className="w-3.5 h-3.5 text-emerald-400" /> 3. Legal Statutory Context
                </span>
                <span className="text-[11px] text-slate-400">
                  {retrievalContext.legalKnowledge.length} Retrieved
                </span>
              </div>
              <div className="space-y-3">
                {retrievalContext.legalKnowledge.map((l) => (
                  <div
                    key={l.id}
                    className="p-3.5 bg-slate-800/50 rounded-xl border border-slate-700/60 space-y-2 hover:border-emerald-500/40 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-emerald-400">{l.statute}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-500/20 text-emerald-300 rounded">
                        {l.relevanceScore}% match
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 line-clamp-2">{l.question}</p>
                    <div className="pt-1 flex items-center justify-between">
                      <span className="text-[11px] text-slate-400">Category: {l.category}</span>
                      <button
                        onClick={() => setSelectedLegalForModal(l)}
                        className="text-[11px] font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
                      >
                        Why this Legal Ref? <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stage 6: Knowledge Graph Expansion */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Network className="w-3.5 h-3.5 text-purple-400" /> 4. Graph Multi-Hop Triples
                </span>
                <span className="text-[11px] text-slate-400">
                  {retrievalContext.graphRelationships.length} Traversed
                </span>
              </div>
              <div className="space-y-2">
                {retrievalContext.graphRelationships.map((g, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 bg-slate-800/40 rounded-lg border border-slate-800 text-xs space-y-1"
                  >
                    <div className="flex items-center gap-2 font-mono text-[11px]">
                      <span className="text-purple-300 font-semibold">{g.from}</span>
                      <span className="text-slate-500">-[{g.relation}]-&gt;</span>
                      <span className="text-indigo-300 font-semibold">{g.to}</span>
                    </div>
                    <p className="text-[11px] text-slate-400">{g.explanation}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Grounded AI Output (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            {aiResponse ? (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-500/10 border border-indigo-500/30 rounded-xl text-indigo-400">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white">Grounded Legal-Ethics Synthesis</h3>
                      <p className="text-xs text-slate-400">
                        Generated by Gemini 3.7 grounded strictly on the retrieved corpus
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowReasonedModal(true)}
                    className="text-xs font-semibold px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors flex items-center gap-1.5"
                  >
                    <Cpu className="w-3.5 h-3.5 text-indigo-400" />
                    How AI Reasoned
                  </button>
                </div>

                {/* Situation Understanding */}
                <div className="p-4 bg-slate-800/40 rounded-xl border border-slate-800 space-y-1.5">
                  <span className="text-[11px] font-bold uppercase text-slate-400 tracking-wider">
                    Situation Understanding
                  </span>
                  <p className="text-xs text-slate-200 leading-relaxed font-medium">
                    {aiResponse.situationUnderstanding}
                  </p>
                </div>

                {/* Two Column: Ethical Perspective vs Legal Perspective */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Ethical Guidance */}
                  <div className="p-4 bg-amber-950/20 border border-amber-500/20 rounded-xl space-y-2">
                    <span className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4 text-amber-400" /> Ethical Guidance (Aram)
                    </span>
                    <p className="text-xs text-slate-200 leading-relaxed">
                      {aiResponse.ethicalPerspective}
                    </p>
                  </div>

                  {/* Legal Educational Context */}
                  <div className="p-4 bg-indigo-950/20 border border-indigo-500/20 rounded-xl space-y-2">
                    <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
                      <Scale className="w-4 h-4 text-indigo-400" /> Legal Context (Statutes)
                    </span>
                    <p className="text-xs text-slate-200 leading-relaxed">
                      {aiResponse.legalEducationalPerspective}
                    </p>
                  </div>
                </div>

                {/* Responsible Action */}
                <div className="p-4 bg-emerald-950/20 border border-emerald-500/20 rounded-xl space-y-2">
                  <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Responsible Action & De-escalation
                  </span>
                  <p className="text-xs text-slate-200 leading-relaxed whitespace-pre-line">
                    {aiResponse.responsibleAction}
                  </p>
                </div>

                {/* Modern Application */}
                <div className="p-4 bg-slate-800/40 rounded-xl border border-slate-800 space-y-1.5">
                  <span className="text-[11px] font-bold uppercase text-slate-400 tracking-wider">
                    Modern Digital & Civic Application
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {aiResponse.modernApplication}
                  </p>
                </div>

                {/* Key Takeaway Banner */}
                <div className="p-4 bg-gradient-to-r from-indigo-900/40 to-slate-900 rounded-xl border border-indigo-500/30 flex items-start gap-3">
                  <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-300 shrink-0">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-indigo-300 tracking-wider">
                      Core Jurisprudential Principle
                    </span>
                    <p className="text-xs font-semibold text-white mt-0.5 italic">
                      "{aiResponse.keyTakeaway}"
                    </p>
                  </div>
                </div>

                {/* Sources & Citations */}
                <div className="pt-2 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-300">Sources:</span>
                    {aiResponse.sources.map((s, idx) => (
                      <span key={idx} className="bg-slate-800 px-2 py-0.5 rounded text-[11px] text-slate-300">
                        {s.name} ({s.recordId})
                      </span>
                    ))}
                  </div>
                  <span className="text-[11px] text-slate-500">
                    Synthesized at {new Date(aiResponse.timestamp).toLocaleTimeString()}
                  </span>
                </div>

                {/* Disclaimer */}
                <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{aiResponse.disclaimer}</span>
                </div>
              </div>
            ) : (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center text-slate-400">
                <RefreshCw className="w-8 h-8 animate-spin mx-auto text-indigo-400 mb-3" />
                <p className="text-sm font-semibold">Running Retrieval & Synthesis Pipeline...</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Explainability Modals */}
      <HowAiReasonedModal
        isOpen={showReasonedModal}
        onClose={() => setShowReasonedModal(false)}
        traces={retrievalContext?.traces || []}
        queryText={activeQuery}
      />

      <WhyKuralModal
        isOpen={Boolean(selectedKuralForModal)}
        onClose={() => setSelectedKuralForModal(null)}
        kural={selectedKuralForModal}
        detectedConcepts={retrievalContext?.detectedConcepts.map((c) => c.name)}
        userQuery={activeQuery}
      />

      <WhyLegalModal
        isOpen={Boolean(selectedLegalForModal)}
        onClose={() => setSelectedLegalForModal(null)}
        legalItem={selectedLegalForModal}
        detectedConcepts={retrievalContext?.detectedConcepts.map((c) => c.name)}
        userQuery={activeQuery}
      />
    </div>
  );
};
