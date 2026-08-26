import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { KnowledgeNode, KnowledgeEdge } from '../types';
import { knowledgeGraphService } from '../services/knowledgeGraphService';
import {
  Network,
  Info,
  Sparkles,
  Scale,
  BookOpen,
  ArrowRight,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Compass,
  FileText,
  CheckCircle2,
  Bot,
  Layers,
  Search,
  Check,
} from 'lucide-react';

interface GuidedPathway {
  id: string;
  title: string;
  icon: string;
  description: string;
  steps: {
    kuralNumber: number;
    kuralTitle: string;
    tamilVerse: string;
    ethicalPrinciple: string;
    legalStatute: string;
    scenarioTitle: string;
    scenarioNumber: number;
  };
}

const GUIDED_PATHWAYS: GuidedPathway[] = [
  {
    id: 'path-justice',
    title: 'Impartiality & Natural Justice',
    icon: '⚖️',
    description: 'How ancient Tamil impartiality rules mirror Article 21 and the Principles of Natural Justice.',
    steps: {
      kuralNumber: 111,
      kuralTitle: 'Naduvunilaimai (Impartiality)',
      tamilVerse: 'தக்கார் தகவிலர் என்பது அவரவர் எச்சத்தால் காணப் படும்.',
      ethicalPrinciple: 'Clean Hands & Judicial Neutrality',
      legalStatute: 'Constitution of India Art 21 & Principles of Natural Justice',
      scenarioTitle: 'Judicial Conflict of Interest in Rival Law Firm',
      scenarioNumber: 3,
    },
  },
  {
    id: 'path-integrity',
    title: 'Propriety of Conduct & Integrity',
    icon: '🛡️',
    description: 'Tracing professional dignity from Kural 131 to the Prevention of Corruption Act.',
    steps: {
      kuralNumber: 131,
      kuralTitle: 'Ozhukkamudaimai (Propriety of Conduct)',
      tamilVerse: 'ஒழுக்கம் விழுப்பம் தரலான் ஒழுக்கம் உயிரினும் ஓம்பப் படும்.',
      ethicalPrinciple: 'Unwavering Professional Dignity',
      legalStatute: 'Prevention of Corruption Act Sec 7 & Bar Council Standards',
      scenarioTitle: 'Bribery & Fiduciary Fraud Awareness',
      scenarioNumber: 1,
    },
  },
  {
    id: 'path-truth',
    title: 'Veracity, Oaths & Evidence',
    icon: '📜',
    description: 'How truthfulness (Vaaimai) forms the core of evidentiary oaths and anti-perjury laws.',
    steps: {
      kuralNumber: 291,
      kuralTitle: 'Vaaimai (Veracity & Truthfulness)',
      tamilVerse: 'வாய்மை எனப்படுவது யாதெனின் யாதொன்றும் தீமை இலாத சொலல்.',
      ethicalPrinciple: 'Beneficial Truth & Probity',
      legalStatute: 'Oaths Act 1969 & Bharatiya Sakshya Adhiniyam Sec 3',
      scenarioTitle: 'False Testimony & Cyber Fraud Verification',
      scenarioNumber: 2,
    },
  },
  {
    id: 'path-governance',
    title: 'Righteous Governance & Leadership',
    icon: '🏛️',
    description: 'Connecting statecraft (Sengonmai) with Judicial Review under Article 32 & 226.',
    steps: {
      kuralNumber: 541,
      kuralTitle: 'Sengonmai (Righteous Governance)',
      tamilVerse: 'ஓர்ந்துகண் ணோடாது இறைபுரிந்து யார்மாட்டுக் தேர்ந்து செய்வதே முறை.',
      ethicalPrinciple: 'Protection of Vulnerable & Equal Protection',
      legalStatute: 'Constitution Art 14, 32 & Administrative Law',
      scenarioTitle: 'Arbitrary Power & Environmental Accountability',
      scenarioNumber: 4,
    },
  },
];

export const KnowledgeGraphPage: React.FC = () => {
  const { openKuralModalByNumber, setSelectedScenarioNumber, setActiveTab } = useApp();
  const [nodes, setNodes] = useState<KnowledgeNode[]>([]);
  const [edges, setEdges] = useState<KnowledgeEdge[]>([]);
  const [selectedNode, setSelectedNode] = useState<KnowledgeNode | null>(null);
  const [viewMode, setViewMode] = useState<'guided' | 'explorer'>('guided');
  const [activePathwayId, setActivePathwayId] = useState<string>('path-justice');
  const [activeStepNumber, setActiveStepNumber] = useState<number>(1);
  const [filterType, setFilterType] = useState<string>('All');
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  useEffect(() => {
    const fetchGraph = async () => {
      const data = await knowledgeGraphService.getGraphData();
      setNodes(data.nodes);
      setEdges(data.edges);
      setSelectedNode(data.nodes[0] || null);
    };
    fetchGraph();
  }, []);

  const activePathway = GUIDED_PATHWAYS.find((p) => p.id === activePathwayId) || GUIDED_PATHWAYS[0];

  const getNodeColor = (type: KnowledgeNode['type']) => {
    switch (type) {
      case 'Question':
        return { bg: 'bg-amber-100', border: 'border-amber-400', text: 'text-amber-900' };
      case 'EthicalConcept':
        return { bg: 'bg-indigo-100', border: 'border-indigo-400', text: 'text-indigo-900' };
      case 'Kural':
        return { bg: 'bg-emerald-100', border: 'border-emerald-400', text: 'text-emerald-900' };
      case 'LegalConcept':
        return { bg: 'bg-blue-100', border: 'border-blue-400', text: 'text-blue-900' };
      case 'Scenario':
        return { bg: 'bg-purple-100', border: 'border-purple-400', text: 'text-purple-900' };
      default:
        return { bg: 'bg-slate-100', border: 'border-slate-300', text: 'text-slate-800' };
    }
  };

  const filteredNodes = filterType === 'All' ? nodes : nodes.filter((n) => n.type === filterType);

  return (
    <div className="space-y-6 animate-in fade-in duration-200 pb-12">
      {/* Header Banner */}
      <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-2xs text-slate-900 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black bg-amber-100 text-amber-900 border border-amber-300">
            <Compass className="w-3.5 h-3.5 text-amber-600" />
            Interactive Knowledge Graph & Learning Journeys
          </div>
          <h2 className="text-2xl font-extrabold font-heading text-[#071B3A]">
            Ethical-Legal Semantic Map
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed font-medium">
            Explore step-by-step how 2,000+ years of classical Thirukkural moral virtues flow directly into modern Indian statutory laws and courtroom case studies.
          </p>
        </div>

        {/* View Mode Selector Tabs */}
        <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200 shrink-0">
          <button
            onClick={() => setViewMode('guided')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              viewMode === 'guided'
                ? 'bg-[#071B3A] text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Guided Pathways (Easy)
          </button>
          <button
            onClick={() => setViewMode('explorer')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              viewMode === 'explorer'
                ? 'bg-[#071B3A] text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Network className="w-3.5 h-3.5" />
            Full Network Graph
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODE A: GUIDED PATHWAYS (EASY, ENJOYABLE & STEP-BY-STEP) */}
      {/* ========================================================================= */}
      {viewMode === 'guided' && (
        <div className="space-y-6">
          {/* Guided Journey Selector Chips */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {GUIDED_PATHWAYS.map((pathway) => {
              const isActive = activePathwayId === pathway.id;
              return (
                <div
                  key={pathway.id}
                  onClick={() => {
                    setActivePathwayId(pathway.id);
                    setActiveStepNumber(1);
                  }}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                    isActive
                      ? 'bg-blue-50/90 border-blue-600 ring-2 ring-blue-500/20 shadow-sm'
                      : 'bg-white border-slate-200 hover:border-blue-300 hover:bg-slate-50/60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xl">{pathway.icon}</span>
                    {isActive && (
                      <span className="px-2 py-0.5 text-[10px] font-black bg-[#071B3A] text-white rounded-md">
                        Active Journey
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm font-extrabold text-[#071B3A] font-heading">
                    {pathway.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2 font-medium">
                    {pathway.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Step-by-Step Progressive Flow Cards */}
          <div className="p-6 sm:p-8 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{activePathway.icon}</span>
                <div>
                  <h3 className="text-lg font-extrabold text-[#071B3A] font-heading">
                    Learning Pathway: {activePathway.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">{activePathway.description}</p>
                </div>
              </div>
              <span className="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                Click any step to inspect
              </span>
            </div>

            {/* Visual Step-by-Step Flow Chain */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
              {/* Step 1: Classical Verse */}
              <div
                onClick={() => setActiveStepNumber(1)}
                className={`p-5 rounded-xl border space-y-3 transition-all cursor-pointer flex flex-col justify-between ${
                  activeStepNumber === 1
                    ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-500/30 shadow-md scale-102'
                    : 'bg-emerald-50/40 border-emerald-200/90 hover:bg-emerald-50/80'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-600 text-white px-2 py-0.5 rounded">
                      Step 1: Classical Verse
                    </span>
                    <span className="text-xs font-extrabold text-emerald-800">
                      Kural #{activePathway.steps.kuralNumber}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-950 font-heading">
                    {activePathway.steps.kuralTitle}
                  </h4>
                  <p className="text-xs font-tamil text-emerald-950 font-bold leading-relaxed italic bg-white/80 p-2.5 rounded-lg border border-emerald-200">
                    "{activePathway.steps.tamilVerse}"
                  </p>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openKuralModalByNumber(activePathway.steps.kuralNumber);
                  }}
                  className="w-full py-2 text-xs font-bold text-emerald-950 bg-white hover:bg-emerald-100 border border-emerald-300 rounded-lg transition-colors cursor-pointer text-center mt-3"
                >
                  Read Full Verse →
                </button>
              </div>

              {/* Step 2: Ethical Core Principle */}
              <div
                onClick={() => setActiveStepNumber(2)}
                className={`p-5 rounded-xl border space-y-3 transition-all cursor-pointer flex flex-col justify-between ${
                  activeStepNumber === 2
                    ? 'bg-indigo-50 border-indigo-500 ring-2 ring-indigo-500/30 shadow-md scale-102'
                    : 'bg-indigo-50/40 border-indigo-200/90 hover:bg-indigo-50/80'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-wider bg-indigo-600 text-white px-2 py-0.5 rounded">
                      Step 2: Ethical Principle
                    </span>
                    <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-950 font-heading">
                    {activePathway.steps.ethicalPrinciple}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium bg-white/80 p-2.5 rounded-lg border border-indigo-200">
                    Establishes non-negotiable moral obligations required before exercising authority or issuing judgments.
                  </p>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveTab('ai-tutor');
                  }}
                  className="w-full py-2 text-xs font-bold text-indigo-950 bg-white hover:bg-indigo-100 border border-indigo-300 rounded-lg transition-colors cursor-pointer text-center mt-3"
                >
                  Explore Ethics in Tutor →
                </button>
              </div>

              {/* Step 3: Statutory Law */}
              <div
                onClick={() => setActiveStepNumber(3)}
                className={`p-5 rounded-xl border space-y-3 transition-all cursor-pointer flex flex-col justify-between ${
                  activeStepNumber === 3
                    ? 'bg-blue-50 border-blue-500 ring-2 ring-blue-500/30 shadow-md scale-102'
                    : 'bg-blue-50/40 border-blue-200/90 hover:bg-blue-50/80'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-wider bg-blue-600 text-white px-2 py-0.5 rounded">
                      Step 3: Statutory Law
                    </span>
                    <Scale className="w-3.5 h-3.5 text-blue-600" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-950 font-heading">
                    {activePathway.steps.legalStatute}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium bg-white/80 p-2.5 rounded-lg border border-blue-200">
                    Codifies classical moral duties into enforceable statutory protections and constitutional guarantees.
                  </p>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveTab('ethics-library');
                  }}
                  className="w-full py-2 text-xs font-bold text-blue-950 bg-white hover:bg-blue-100 border border-blue-300 rounded-lg transition-colors cursor-pointer text-center mt-3"
                >
                  View Legal Statutes →
                </button>
              </div>

              {/* Step 4: Real Case Scenario */}
              <div
                onClick={() => setActiveStepNumber(4)}
                className={`p-5 rounded-xl border space-y-3 transition-all cursor-pointer flex flex-col justify-between ${
                  activeStepNumber === 4
                    ? 'bg-amber-50 border-amber-500 ring-2 ring-amber-500/30 shadow-md scale-102'
                    : 'bg-amber-50/40 border-amber-200/90 hover:bg-amber-50/80'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-wider bg-amber-600 text-slate-950 px-2 py-0.5 rounded">
                      Step 4: Real Case Dilemma
                    </span>
                    <FileText className="w-3.5 h-3.5 text-amber-700" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-950 font-heading">
                    Scenario #{activePathway.steps.scenarioNumber}: {activePathway.steps.scenarioTitle}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium bg-white/80 p-2.5 rounded-lg border border-amber-200">
                    Test your understanding by resolving real-world conflicts using statutory law and Thirukkural reasoning.
                  </p>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedScenarioNumber(activePathway.steps.scenarioNumber);
                    setActiveTab('scenario-challenge');
                  }}
                  className="w-full py-2 text-xs font-bold text-white bg-[#071B3A] hover:bg-[#0A2540] rounded-lg transition-colors cursor-pointer text-center mt-3 shadow-2xs"
                >
                  Solve Scenario #{activePathway.steps.scenarioNumber} →
                </button>
              </div>
            </div>

            {/* Deep Step Inspection Drawer */}
            <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-3 animate-in fade-in duration-150">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <span className="text-xs font-extrabold text-[#071B3A] flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-blue-600" />
                  Inspecting Step {activeStepNumber}:{' '}
                  {activeStepNumber === 1
                    ? activePathway.steps.kuralTitle
                    : activeStepNumber === 2
                    ? activePathway.steps.ethicalPrinciple
                    : activeStepNumber === 3
                    ? activePathway.steps.legalStatute
                    : activePathway.steps.scenarioTitle}
                </span>
                <span className="text-[11px] font-bold text-slate-500">
                  Pathway: {activePathway.title}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 text-xs">
                <div className="md:col-span-8 space-y-2">
                  <p className="text-slate-700 leading-relaxed font-medium">
                    {activeStepNumber === 1 &&
                      `Kural #${activePathway.steps.kuralNumber} teaches that virtue is not merely abstract thought, but unyielding fairness and moral conduct. It forms the primary philosophical foundation of this legal pathway.`}
                    {activeStepNumber === 2 &&
                      `The ethical concept "${activePathway.steps.ethicalPrinciple}" mandates that judges, advocates, and civil servants maintain complete detachment from personal bias or monetary temptation.`}
                    {activeStepNumber === 3 &&
                      `Under Indian jurisprudence (${activePathway.steps.legalStatute}), courts enforce strict procedural fairness to prevent arbitrary administrative actions.`}
                    {activeStepNumber === 4 &&
                      `In Scenario #${activePathway.steps.scenarioNumber} (${activePathway.steps.scenarioTitle}), you face a practical real-life dilemma testing whether you can balance statutory rules with classical ethical courage.`}
                  </p>
                </div>

                <div className="md:col-span-4 flex flex-col gap-2 justify-center">
                  {activeStepNumber === 1 && (
                    <button
                      onClick={() => openKuralModalByNumber(activePathway.steps.kuralNumber)}
                      className="w-full py-2.5 text-xs font-bold text-white bg-[#071B3A] hover:bg-[#0A2540] rounded-xl shadow-2xs transition-colors cursor-pointer text-center"
                    >
                      Open Kural #{activePathway.steps.kuralNumber} Detail Modal →
                    </button>
                  )}
                  {activeStepNumber === 4 && (
                    <button
                      onClick={() => {
                        setSelectedScenarioNumber(activePathway.steps.scenarioNumber);
                        setActiveTab('scenario-challenge');
                      }}
                      className="w-full py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-2xs transition-colors cursor-pointer text-center"
                    >
                      Launch Scenario #{activePathway.steps.scenarioNumber} Challenge Now →
                    </button>
                  )}
                  <button
                    onClick={() => setActiveTab('ai-tutor')}
                    className="w-full py-2.5 text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors cursor-pointer text-center"
                  >
                    Ask AI Tutor About This Step
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE B: FULL NETWORK GRAPH EXPLORER */}
      {/* ========================================================================= */}
      {viewMode === 'explorer' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* SVG Interactive Graph Canvas (lg:col-span-8) */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden flex flex-col min-h-[520px]">
            {/* Controls Bar */}
            <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-slate-50">
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold text-slate-700">Filter Nodes:</span>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-xl font-bold text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20"
                >
                  <option value="All">All Types ({nodes.length})</option>
                  <option value="Question">Questions</option>
                  <option value="EthicalConcept">Ethical Concepts</option>
                  <option value="Kural">Thirukkurals</option>
                  <option value="LegalConcept">Legal Statutes</option>
                  <option value="Scenario">Scenarios</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setZoomLevel((prev) => Math.max(0.8, prev - 0.1))}
                  className="p-1.5 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-600 cursor-pointer"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <span className="text-xs font-bold text-slate-700 min-w-10 text-center">
                  {Math.round(zoomLevel * 100)}%
                </span>
                <button
                  onClick={() => setZoomLevel((prev) => Math.min(1.4, prev + 0.1))}
                  className="p-1.5 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-600 cursor-pointer"
                  title="Zoom In"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setZoomLevel(1)}
                  className="p-1.5 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-600 cursor-pointer"
                  title="Reset Zoom"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Graph Interactive Stage */}
            {(() => {
              const maxCanvasY = Math.max(600, ...filteredNodes.map((n) => (n.y || 0) + 120));
              return (
                <div className="flex-1 p-4 overflow-auto custom-scrollbar bg-slate-50/50 relative min-h-[500px] max-h-[680px]">
                  <div
                    style={{
                      transform: `scale(${zoomLevel})`,
                      transformOrigin: 'top left',
                      width: '1380px',
                      height: `${maxCanvasY}px`,
                    }}
                    className="relative select-none"
                  >
                    <svg className="w-full h-full absolute inset-0 pointer-events-none">
                      {edges.map((edge) => {
                        const src = nodes.find((n) => n.id === edge.source);
                        const tgt = nodes.find((n) => n.id === edge.target);
                        if (!src || !tgt || src.x === undefined || tgt.x === undefined) return null;

                        const isEdgeActive =
                          selectedNode?.id === edge.source || selectedNode?.id === edge.target;

                        return (
                          <g key={edge.id}>
                            <line
                              x1={src.x + 65}
                              y1={(src.y || 100) + 24}
                              x2={tgt.x + 65}
                              y2={(tgt.y || 100) + 24}
                              stroke={isEdgeActive ? '#1E3A8A' : '#CBD5E1'}
                              strokeWidth={isEdgeActive ? 3 : 1.5}
                              strokeDasharray={isEdgeActive ? '4 2' : 'none'}
                              opacity={isEdgeActive ? 1 : 0.6}
                            />
                            {edge.label && (
                              <text
                                x={(src.x + tgt.x + 130) / 2}
                                y={((src.y || 100) + (tgt.y || 100) + 48) / 2 - 4}
                                fill={isEdgeActive ? '#071B3A' : '#64748B'}
                                fontSize="9"
                                fontWeight="bold"
                                textAnchor="middle"
                                className="select-none"
                              >
                                {edge.label}
                              </text>
                            )}
                          </g>
                        );
                      })}
                    </svg>

                    {/* Render Nodes */}
                    {filteredNodes.map((node) => {
                      const color = getNodeColor(node.type);
                      const isSelected = selectedNode?.id === node.id;

                      return (
                        <div
                          key={node.id}
                          onClick={() => setSelectedNode(node)}
                          style={{
                            left: `${node.x || 50}px`,
                            top: `${node.y || 100}px`,
                          }}
                          className={`absolute w-36 p-3 rounded-xl border-2 transition-all cursor-pointer shadow-2xs text-center ${
                            color.bg
                          } ${color.border} ${
                            isSelected
                              ? 'ring-4 ring-blue-500/40 scale-105 shadow-md z-20 font-bold'
                              : 'hover:scale-102 hover:shadow-xs z-10'
                          }`}
                        >
                          <span className="text-[9px] font-black uppercase tracking-wider block opacity-70 mb-0.5">
                            {node.type}
                          </span>
                          <h4 className={`text-xs font-bold leading-tight ${color.text} line-clamp-2`}>
                            {node.label}
                          </h4>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })()}

            <div className="p-3 bg-slate-50 border-t border-slate-200 text-center text-xs text-slate-500 font-medium">
              💡 <strong>Interactive Flow:</strong> Click on any node to view detailed legal metadata and Thirukkural connections.
            </div>
          </div>

          {/* Selected Node Details Drawer (lg:col-span-4) */}
          <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 shadow-2xs p-6 space-y-5">
            {selectedNode ? (
              <div className="space-y-4 animate-in fade-in duration-150">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="px-3 py-1 text-xs font-black text-blue-950 bg-blue-100 rounded-full border border-blue-200">
                    {selectedNode.type} Node
                  </span>
                  <span className="text-xs text-slate-500 font-bold">
                    {selectedNode.category}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-extrabold text-[#071B3A] font-heading">
                    {selectedNode.details.title}
                  </h3>
                  {selectedNode.details.subtitle && (
                    <p className="text-xs font-tamil font-bold text-blue-700 mt-1">
                      {selectedNode.details.subtitle}
                    </p>
                  )}
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 leading-relaxed space-y-2 font-medium">
                  <span className="font-extrabold text-slate-900 block">Deep Description:</span>
                  <p>{selectedNode.details.description}</p>
                </div>

                {/* Tags */}
                {selectedNode.details.tags && (
                  <div className="space-y-1.5">
                    <span className="text-xs font-bold text-slate-500">Semantic Tags:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedNode.details.tags.map((t, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 text-[11px] font-bold bg-blue-50 text-blue-900 border border-blue-200 rounded-md"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action shortcuts */}
                <div className="pt-3 border-t border-slate-100 space-y-2">
                  {selectedNode.type === 'Kural' && (
                    <button
                      onClick={() => {
                        const num = parseInt(selectedNode.label.replace('Kural ', ''), 10) || 131;
                        openKuralModalByNumber(num);
                      }}
                      className="w-full py-2.5 text-xs font-bold text-white bg-[#071B3A] hover:bg-[#0A2540] rounded-xl shadow-2xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <BookOpen className="w-4 h-4 text-blue-400" />
                      Read Full Kural Detail
                    </button>
                  )}

                  {selectedNode.type === 'Scenario' && (
                    <button
                      onClick={() => {
                        setSelectedScenarioNumber(3);
                        setActiveTab('scenario-challenge');
                      }}
                      className="w-full py-2.5 text-xs font-bold text-white bg-[#071B3A] hover:bg-[#0A2540] rounded-xl shadow-2xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Scale className="w-4 h-4 text-amber-400" />
                      Launch Interactive Scenario
                    </button>
                  )}

                  <button
                    onClick={() => setActiveTab('ai-tutor')}
                    className="w-full py-2.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    Ask AI Tutor About This Node
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-slate-400 space-y-2">
                <Info className="w-8 h-8 mx-auto text-slate-300" />
                <p className="text-xs font-medium">Click on any node in the graph to view its legal and ethical metadata.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
