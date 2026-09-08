import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { KnowledgeNode, KnowledgeEdge } from '../types';
import { knowledgeGraphService } from '../services/knowledgeGraphService';
import { StepAiTutorModal } from '../components/common/StepAiTutorModal';
import {
  Sparkles,
  Scale,
  BookOpen,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  Search,
  Compass,
  FileText,
  RotateCcw,
  Layers,
  HelpCircle,
  X,
  Sidebar,
  ChevronRight
} from 'lucide-react';
import { CHAPTER_NAMES_LOCALIZED, ETHICAL_CONCEPT_LOCALIZED } from '../i18n/kuralLocalizations';
import { SCENARIO_TRANSLATIONS } from '../i18n/scenarioLocalizations';

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
  const { openKuralModalByNumber, setSelectedScenarioNumber, setActiveTab, t, language } = useApp();
  const [nodes, setNodes] = useState<KnowledgeNode[]>([]);
  const [edges, setEdges] = useState<KnowledgeEdge[]>([]);
  const [selectedNode, setSelectedNode] = useState<KnowledgeNode | null>(null);
  const [viewMode, setViewMode] = useState<'flow' | 'guided'>('flow');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterType, setFilterType] = useState<string>('All');
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showDrawer, setShowDrawer] = useState<boolean>(true);
  const [activePathwayId, setActivePathwayId] = useState<string>('path-justice');
  const [activeStepNumber, setActiveStepNumber] = useState<number>(1);

  // In-Card AI Tutor Chatbot Modal State
  const [tutorModalOpen, setTutorModalOpen] = useState(false);
  const [tutorTopic, setTutorTopic] = useState('');
  const [tutorContextTitle, setTutorContextTitle] = useState('');

  const graphContainerRef = useRef<HTMLDivElement>(null);

  const openStepTutorModal = (topic: string, contextTitle: string = 'Ethical & Legal Inquiry') => {
    setTutorTopic(topic);
    setTutorContextTitle(contextTitle);
    setTutorModalOpen(true);
  };

  useEffect(() => {
    const fetchGraph = async () => {
      const data = await knowledgeGraphService.getGraphData();
      setNodes(data.nodes);
      setEdges(data.edges);
      if (data.nodes.length > 0) {
        const firstChapter =
          data.nodes.find(n => n.type === 'Chapter' && n.label.toLowerCase().includes('aran valiyuruthal')) ||
          data.nodes.find(n => n.type === 'Chapter') ||
          data.nodes[0];
        setSelectedNode(firstChapter);
      }
    };
    fetchGraph();
  }, []);

  // Keyboard shortcut for Escape key to exit fullscreen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen]);

  const activePathway = GUIDED_PATHWAYS.find((p) => p.id === activePathwayId) || GUIDED_PATHWAYS[0];

  // Partition nodes by column type
  const columnNodes = useMemo(() => {
    const chapters: KnowledgeNode[] = [];
    const kurals: KnowledgeNode[] = [];
    const ethicalConcepts: KnowledgeNode[] = [];
    const legalConcepts: KnowledgeNode[] = [];

    nodes.forEach((n) => {
      const tLower = (n.type || '').toLowerCase();
      if (tLower === 'chapter') {
        chapters.push(n);
      } else if (tLower === 'kural') {
        kurals.push(n);
      } else if (tLower === 'ethicalconcept' || tLower === 'ethical_concept') {
        ethicalConcepts.push(n);
      } else if (tLower === 'legalconcept' || tLower === 'legal_concept' || tLower === 'legal_knowledge') {
        legalConcepts.push(n);
      }
    });

    return { chapters, kurals, ethicalConcepts, legalConcepts };
  }, [nodes]);

  // Find connected node IDs for the selected node
  const connectedNodeIds = useMemo(() => {
    if (!selectedNode) return new Set<string>();
    const ids = new Set<string>([selectedNode.id]);

    edges.forEach((e) => {
      if (e.source === selectedNode.id) ids.add(e.target);
      if (e.target === selectedNode.id) ids.add(e.source);
    });

    edges.forEach((e) => {
      if (ids.has(e.source)) ids.add(e.target);
      if (ids.has(e.target)) ids.add(e.source);
    });

    return ids;
  }, [selectedNode, edges]);

  // Filtered lists for each column based on search & filter type
  const filterList = (list: KnowledgeNode[], colType: string) => {
    if (filterType !== 'All' && filterType !== colType) return [];
    if (!searchQuery.trim()) return list;

    const q = searchQuery.toLowerCase().trim();
    return list.filter((n) => {
      const matchLabel = n.label.toLowerCase().includes(q);
      const matchDesc = (n.details?.description || '').toLowerCase().includes(q);
      const matchTamil = (n.details?.meta?.tamilName ? String(n.details.meta.tamilName) : '').toLowerCase().includes(q);
      const matchTags = (n.details?.tags || []).some(t => t.toLowerCase().includes(q));
      return matchLabel || matchDesc || matchTamil || matchTags;
    });
  };

  const visibleChapters = useMemo(() => filterList(columnNodes.chapters, 'Chapter'), [columnNodes.chapters, searchQuery, filterType]);
  const visibleKurals = useMemo(() => filterList(columnNodes.kurals, 'Kural'), [columnNodes.kurals, searchQuery, filterType]);
  const visibleEthical = useMemo(() => filterList(columnNodes.ethicalConcepts, 'EthicalConcept'), [columnNodes.ethicalConcepts, searchQuery, filterType]);
  const visibleLegal = useMemo(() => filterList(columnNodes.legalConcepts, 'LegalConcept'), [columnNodes.legalConcepts, searchQuery, filterType]);

  const totalFilteredCount = visibleChapters.length + visibleKurals.length + visibleEthical.length + visibleLegal.length;

  return (
    <div className={`space-y-6 pb-12 ${isFullscreen ? 'fixed inset-0 z-100 bg-slate-900/60 backdrop-blur-xs p-3 md:p-6 flex flex-col h-screen w-screen overflow-hidden' : ''}`}>
      {/* Top Search & Controls Bar */}
      <div className={`bg-white rounded-2xl border border-slate-200 shadow-2xs p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 ${isFullscreen ? 'shrink-0' : ''}`}>
        {/* Search Bar matching screenshot */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Righteousness, Impartiality, Kural 118, Section 35..."
            className="w-full pl-10 pr-10 py-2 text-sm bg-white border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded-full cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* View Mode Toggle & Stats */}
        <div className="flex items-center gap-3">
          <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200">
            <button
              onClick={() => setViewMode('flow')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'flow'
                  ? 'bg-white text-blue-700 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              Interactive Flow
            </button>
            <button
              onClick={() => setViewMode('guided')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'guided'
                  ? 'bg-white text-blue-700 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              Guided Pathways
            </button>
          </div>

          {isFullscreen && (
            <button
              onClick={() => setIsFullscreen(false)}
              className="px-3 py-1.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl border border-slate-200 transition-colors flex items-center gap-1 cursor-pointer"
              title="Exit Fullscreen (Esc)"
            >
              <Minimize2 className="w-3.5 h-3.5" />
              Exit (Esc)
            </button>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODE A: INTERACTIVE MULTI-COLUMN FLOW GRAPH (Matches User's UI Screenshot) */}
      {/* ========================================================================= */}
      {viewMode === 'flow' && (
        <div className={`grid grid-cols-1 ${isFullscreen ? 'h-[calc(100vh-120px)] flex-1' : 'min-h-[640px]'} lg:grid-cols-12 gap-6 items-stretch`}>
          {/* Main Column Flow Canvas */}
          <div className={`${showDrawer ? 'lg:col-span-8 xl:col-span-9' : 'lg:col-span-12'} bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden flex flex-col h-full transition-all`}>
            {/* Filter & Zoom Toolbar */}
            <div className="flex items-center justify-between p-3.5 border-b border-slate-200 bg-slate-50 shrink-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold text-slate-700">Filter Nodes:</span>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-xl font-bold text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 shadow-2xs cursor-pointer"
                >
                  <option value="All">All Types ({totalFilteredCount || nodes.length})</option>
                  <option value="Chapter">Chapter ({columnNodes.chapters.length})</option>
                  <option value="Kural">Kural ({columnNodes.kurals.length})</option>
                  <option value="EthicalConcept">Ethical Concept ({columnNodes.ethicalConcepts.length})</option>
                  <option value="LegalConcept">Legal Concept ({columnNodes.legalConcepts.length})</option>
                </select>
              </div>

              {/* Zoom & View Controls matching screenshot */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setZoomLevel((z) => Math.max(0.6, Number((z - 0.1).toFixed(1))))}
                  title="Zoom Out"
                  className="p-1.5 bg-white border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer shadow-2xs"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setZoomLevel(1)}
                  title="Reset Zoom"
                  className="px-2 py-1 text-xs font-bold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer shadow-2xs"
                >
                  {Math.round(zoomLevel * 100)}%
                </button>
                <button
                  onClick={() => setZoomLevel((z) => Math.min(1.5, Number((z + 0.1).toFixed(1))))}
                  title="Zoom In"
                  className="p-1.5 bg-white border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer shadow-2xs"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  title={isFullscreen ? 'Exit Fullscreen' : 'Open Full Screen Graph'}
                  className={`p-1.5 border rounded-lg transition-colors cursor-pointer shadow-2xs ml-1 ${
                    isFullscreen ? 'bg-blue-600 text-white border-blue-600' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={() => setShowDrawer(!showDrawer)}
                  title={showDrawer ? 'Hide Details Panel' : 'Show Details Panel'}
                  className="p-1.5 bg-white border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer shadow-2xs ml-1"
                >
                  <Sidebar className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Scrollable Flow Canvas */}
            <div
              ref={graphContainerRef}
              className="p-6 flex-1 bg-slate-50/40 overflow-auto select-none relative min-h-0"
            >
              <div
                style={{
                  transform: `scale(${zoomLevel})`,
                  transformOrigin: 'top left',
                  transition: 'transform 0.15s ease-out'
                }}
                className="grid grid-cols-4 gap-x-14 gap-y-4 min-w-[1020px] relative py-2 pr-6"
              >
                {/* Column 1: CHAPTER */}
                <div className="space-y-3.5">
                  <div className="text-[11px] font-black uppercase tracking-wider text-slate-500 pb-1 border-b border-slate-200/80">
                    Chapter ({visibleChapters.length})
                  </div>
                  {visibleChapters.slice(0, 24).map((node) => {
                    const isSelected = selectedNode?.id === node.id;
                    const isConnected = connectedNodeIds.has(node.id);

                    return (
                      <div
                        key={node.id}
                        onClick={() => setSelectedNode(node)}
                        className={`p-3 rounded-2xl border-2 transition-all cursor-pointer relative bg-white ${
                          isSelected
                            ? 'border-blue-500 ring-4 ring-blue-500/30 bg-blue-50/40 shadow-md scale-102 z-20'
                            : isConnected
                            ? 'border-blue-300 bg-blue-50/20 hover:border-blue-400 hover:shadow-xs'
                            : 'border-slate-200/90 hover:border-blue-300 hover:shadow-xs'
                        }`}
                      >
                        <span className="text-[9px] font-black uppercase tracking-wider text-slate-500 block mb-0.5">
                          CHAPTER
                        </span>
                        <h4 className="text-xs font-bold text-slate-900 leading-snug line-clamp-1">
                          {node.label}
                        </h4>

                        {/* Connector Arrow Badge right anchor */}
                        <div className="absolute -right-11 top-1/2 -translate-y-1/2 flex items-center pointer-events-none z-10">
                          <span className={`text-[8px] font-black px-1.5 py-0.5 rounded transition-all ${
                            isSelected || isConnected
                              ? 'bg-blue-600 text-white shadow-2xs'
                              : 'bg-slate-200/70 text-slate-600'
                          }`}>
                            BELONGS_TO
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Column 2: KURAL */}
                <div className="space-y-3.5">
                  <div className="text-[11px] font-black uppercase tracking-wider text-emerald-700 pb-1 border-b border-emerald-200/80">
                    Kural ({visibleKurals.length})
                  </div>
                  {visibleKurals.slice(0, 24).map((node) => {
                    const isSelected = selectedNode?.id === node.id;
                    const isConnected = connectedNodeIds.has(node.id);

                    return (
                      <div
                        key={node.id}
                        onClick={() => setSelectedNode(node)}
                        className={`p-3 rounded-2xl border-2 transition-all cursor-pointer relative ${
                          isSelected
                            ? 'border-emerald-600 ring-4 ring-emerald-500/30 bg-emerald-100/50 shadow-md scale-102 z-20'
                            : isConnected
                            ? 'border-emerald-500 bg-emerald-50/70 hover:border-emerald-600 hover:shadow-xs'
                            : 'border-emerald-300/80 bg-emerald-50/30 hover:border-emerald-400 hover:shadow-xs'
                        }`}
                      >
                        <span className="text-[9px] font-black uppercase tracking-wider text-emerald-700 block mb-0.5">
                          KURAL
                        </span>
                        <h4 className="text-xs font-bold text-slate-900 leading-snug line-clamp-1">
                          {node.label}
                        </h4>

                        {/* Connector Arrow Badge right anchor */}
                        <div className="absolute -right-10 top-1/2 -translate-y-1/2 flex items-center pointer-events-none z-10">
                          <span className={`text-[8px] font-black px-1.5 py-0.5 rounded transition-all ${
                            isSelected || isConnected
                              ? 'bg-emerald-600 text-white shadow-2xs'
                              : 'bg-slate-200/70 text-slate-600'
                          }`}>
                            TEACHES
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Column 3: ETHICAL CONCEPT */}
                <div className="space-y-3.5">
                  <div className="text-[11px] font-black uppercase tracking-wider text-purple-700 pb-1 border-b border-purple-200/80">
                    Ethical Concept ({visibleEthical.length})
                  </div>
                  {visibleEthical.slice(0, 24).map((node) => {
                    const isSelected = selectedNode?.id === node.id;
                    const isConnected = connectedNodeIds.has(node.id);

                    return (
                      <div
                        key={node.id}
                        onClick={() => setSelectedNode(node)}
                        className={`p-3 rounded-2xl border-2 transition-all cursor-pointer relative ${
                          isSelected
                            ? 'border-purple-600 ring-4 ring-purple-500/30 bg-purple-100/50 shadow-md scale-102 z-20'
                            : isConnected
                            ? 'border-purple-500 bg-purple-50/70 hover:border-purple-600 hover:shadow-xs'
                            : 'border-purple-300/80 bg-purple-50/30 hover:border-purple-400 hover:shadow-xs'
                        }`}
                      >
                        <span className="text-[9px] font-black uppercase tracking-wider text-purple-700 block mb-0.5">
                          ETHICALCONCEPT
                        </span>
                        <h4 className="text-xs font-bold text-slate-900 leading-snug line-clamp-1">
                          {node.label}
                        </h4>

                        {/* Connector Arrow Badge right anchor */}
                        <div className="absolute -right-11 top-1/2 -translate-y-1/2 flex items-center pointer-events-none z-10">
                          <span className={`text-[8px] font-black px-1.5 py-0.5 rounded transition-all ${
                            isSelected || isConnected
                              ? 'bg-purple-600 text-white shadow-2xs'
                              : 'bg-slate-200/70 text-slate-600'
                          }`}>
                            RELATED_TO
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Column 4: LEGAL CONCEPT / KNOWLEDGE */}
                <div className="space-y-3.5">
                  <div className="text-[11px] font-black uppercase tracking-wider text-blue-700 pb-1 border-b border-blue-200/80">
                    Legal Concept ({visibleLegal.length})
                  </div>
                  {visibleLegal.slice(0, 24).map((node) => {
                    const isSelected = selectedNode?.id === node.id;
                    const isConnected = connectedNodeIds.has(node.id);

                    return (
                      <div
                        key={node.id}
                        onClick={() => setSelectedNode(node)}
                        className={`p-3 rounded-2xl border-2 transition-all cursor-pointer relative ${
                          isSelected
                            ? 'border-blue-600 ring-4 ring-blue-500/30 bg-blue-100/50 shadow-md scale-102 z-20'
                            : isConnected
                            ? 'border-blue-400 bg-blue-50/70 hover:border-blue-500 hover:shadow-xs'
                            : 'border-blue-300/80 bg-blue-50/30 hover:border-blue-400 hover:shadow-xs'
                        }`}
                      >
                        <span className="text-[9px] font-black uppercase tracking-wider text-blue-700 block mb-0.5">
                          LEGALCONCEPT
                        </span>
                        <h4 className="text-xs font-bold text-slate-900 leading-snug line-clamp-1">
                          {node.label}
                        </h4>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Bottom Interactive Notice Bar */}
            <div className="p-3 bg-slate-50 border-t border-slate-200 text-center shrink-0">
              <span className="text-xs text-slate-600 font-medium">
                💡 <strong>Interactive Flow:</strong> Click on any node to view detailed legal metadata and Thirukkural connections.
              </span>
            </div>
          </div>

          {/* Right Side Inspection Drawer */}
          {showDrawer && (
            <div className="lg:col-span-4 xl:col-span-3 bg-white rounded-2xl border border-slate-200 shadow-2xs p-6 space-y-4 h-full overflow-y-auto">
              {selectedNode ? (
                <div className="space-y-4 animate-in fade-in duration-150">
                  {/* Node Pill & Type Header */}
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="text-xs font-bold text-blue-800 bg-blue-100 px-3 py-1 rounded-full">
                      {selectedNode.type} Node
                    </span>
                    <span className="text-xs font-medium text-slate-500">
                      {(selectedNode.type || '').toLowerCase()}
                    </span>
                  </div>

                  {/* Node Title */}
                  <h3 className="text-xl font-bold text-slate-900 font-heading">
                    {selectedNode.label}
                  </h3>

                  {/* Deep Description Box */}
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/90 space-y-2">
                    <span className="text-xs font-bold text-slate-800 block">
                      Deep Description:
                    </span>
                    <p className="text-xs text-slate-700 leading-relaxed font-medium">
                      {selectedNode.details?.description || selectedNode.details?.title}
                    </p>

                    {selectedNode.details?.subtitle && (
                      <p className="text-xs text-slate-600 italic pt-1 border-t border-slate-200">
                        {selectedNode.details.subtitle}
                      </p>
                    )}
                  </div>

                  {/* Semantic Tags */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-slate-800 block">
                      Semantic Tags:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {(selectedNode.details?.tags || [selectedNode.type, (selectedNode.type || '').toLowerCase()]).map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-xs font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200/60"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Node Action Button */}
                  <button
                    onClick={() => openStepTutorModal(selectedNode.label, `${selectedNode.type} Node Inquiry`)}
                    className="w-full py-2.5 px-4 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 font-bold text-xs rounded-xl shadow-2xs transition-all cursor-pointer flex items-center justify-center gap-2 mt-4"
                  >
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    Ask AI Tutor About This Node
                  </button>

                  {/* Kural Open Modal Button if Kural */}
                  {(selectedNode.type === 'Kural' || selectedNode.id.startsWith('kural-')) && (
                    <button
                      onClick={() => {
                        const num = Number(selectedNode.id.replace('kural-', '')) || (selectedNode.details?.meta?.number as number) || 118;
                        openKuralModalByNumber(num);
                      }}
                      className="w-full py-2.5 bg-[#071B3A] hover:bg-[#0A2540] text-white font-bold text-xs rounded-xl shadow-2xs transition-colors cursor-pointer text-center block"
                    >
                      Open Kural Details →
                    </button>
                  )}
                </div>
              ) : (
                <p className="text-xs text-slate-500 text-center py-12 font-medium">
                  Select a node from the network graph to inspect details.
                </p>
              )}
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE B: GUIDED LEARNING PATHWAYS */}
      {/* ========================================================================= */}
      {viewMode === 'guided' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-6 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-base font-extrabold text-[#071B3A] font-heading flex items-center gap-2">
                <Compass className="w-5 h-5 text-blue-600" />
                {t('guidedPathwaysTitle')}
              </h2>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                {t('guidedPathwaysSubtitle')}
              </p>
            </div>

            {/* Pathway Selector */}
            <div className="flex flex-wrap gap-2">
              {GUIDED_PATHWAYS.map((pathway) => (
                <button
                  key={pathway.id}
                  onClick={() => {
                    setActivePathwayId(pathway.id);
                    setActiveStepNumber(1);
                  }}
                  className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                    activePathwayId === pathway.id
                      ? 'bg-[#071B3A] text-white shadow-2xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <span>{pathway.icon}</span>
                  <span>{pathway.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 4-Step Chain */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Step 1: Kural */}
            <div
              onClick={() => setActiveStepNumber(1)}
              className={`p-5 rounded-xl border space-y-3 transition-all cursor-pointer flex flex-col justify-between ${
                activeStepNumber === 1
                  ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-500/30 shadow-md'
                  : 'bg-emerald-50/40 border-emerald-200/90 hover:bg-emerald-50/80'
              }`}
            >
              <div className="space-y-2">
                <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-600 text-white px-2 py-0.5 rounded">
                  Step 1: Thirukkural
                </span>
                <h4 className="text-xs font-bold text-slate-950 font-heading">
                  {activePathway.steps.kuralTitle}
                </h4>
                <p className="text-xs font-tamil font-bold text-slate-900 leading-relaxed bg-white/80 p-2.5 rounded-lg border border-emerald-200">
                  {activePathway.steps.tamilVerse}
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  openKuralModalByNumber(activePathway.steps.kuralNumber);
                }}
                className="w-full py-2 text-xs font-bold text-emerald-950 bg-white hover:bg-emerald-100 border border-emerald-300 rounded-lg transition-colors cursor-pointer text-center mt-3"
              >
                {t('readFullVerse')}
              </button>
            </div>

            {/* Step 2: Ethical Principle */}
            <div
              onClick={() => setActiveStepNumber(2)}
              className={`p-5 rounded-xl border space-y-3 transition-all cursor-pointer flex flex-col justify-between ${
                activeStepNumber === 2
                  ? 'bg-indigo-50 border-indigo-500 ring-2 ring-indigo-500/30 shadow-md'
                  : 'bg-indigo-50/40 border-indigo-200/90 hover:bg-indigo-50/80'
              }`}
            >
              <div className="space-y-2">
                <span className="text-[10px] font-black uppercase tracking-wider bg-indigo-600 text-white px-2 py-0.5 rounded">
                  Step 2: Ethical Principle
                </span>
                <h4 className="text-xs font-bold text-slate-950 font-heading">
                  {activePathway.steps.ethicalPrinciple}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed font-medium bg-white/80 p-2.5 rounded-lg border border-indigo-200">
                  Establishes non-negotiable moral obligations required before exercising authority.
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  openStepTutorModal(activePathway.steps.ethicalPrinciple, 'Step 2: Ethical Principle');
                }}
                className="w-full py-2 text-xs font-bold text-indigo-950 bg-white hover:bg-indigo-100 border border-indigo-300 rounded-lg transition-colors cursor-pointer text-center mt-3 shadow-2xs"
              >
                Explore Ethics AI Tutor
              </button>
            </div>

            {/* Step 3: Statutory Law */}
            <div
              onClick={() => setActiveStepNumber(3)}
              className={`p-5 rounded-xl border space-y-3 transition-all cursor-pointer flex flex-col justify-between ${
                activeStepNumber === 3
                  ? 'bg-blue-50 border-blue-500 ring-2 ring-blue-500/30 shadow-md'
                  : 'bg-blue-50/40 border-blue-200/90 hover:bg-blue-50/80'
              }`}
            >
              <div className="space-y-2">
                <span className="text-[10px] font-black uppercase tracking-wider bg-blue-600 text-white px-2 py-0.5 rounded">
                  Step 3: Statutory Law
                </span>
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
                  openStepTutorModal(activePathway.steps.legalStatute, 'Step 3: Statutory Law');
                }}
                className="w-full py-2 text-xs font-bold text-blue-950 bg-white hover:bg-blue-100 border border-blue-300 rounded-lg transition-colors cursor-pointer text-center mt-3 shadow-2xs"
              >
                Explore Law AI Tutor
              </button>
            </div>

            {/* Step 4: Real Case Scenario */}
            <div
              onClick={() => setActiveStepNumber(4)}
              className={`p-5 rounded-xl border space-y-3 transition-all cursor-pointer flex flex-col justify-between ${
                activeStepNumber === 4
                  ? 'bg-amber-50 border-amber-500 ring-2 ring-amber-500/30 shadow-md'
                  : 'bg-amber-50/40 border-amber-200/90 hover:bg-amber-50/80'
              }`}
            >
              <div className="space-y-2">
                <span className="text-[10px] font-black uppercase tracking-wider bg-amber-600 text-slate-950 px-2 py-0.5 rounded">
                  Step 4: Case Scenario
                </span>
                <h4 className="text-xs font-bold text-slate-950 font-heading">
                  Case #{activePathway.steps.scenarioNumber}: {activePathway.steps.scenarioTitle}
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
                Solve Scenario Challenge →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Embedded Step-by-Step AI Tutor Chatbot Drawer Modal */}
      <StepAiTutorModal
        isOpen={tutorModalOpen}
        onClose={() => setTutorModalOpen(false)}
        initialTopic={tutorTopic}
        contextTitle={tutorContextTitle}
      />
    </div>
  );
};
