import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { KnowledgeNode, KnowledgeEdge } from '../types';
import { knowledgeGraphService } from '../services/knowledgeGraphService';
import { StepAiTutorModal } from '../components/common/StepAiTutorModal';
import {
  Network,
  Sparkles,
  Scale,
  BookOpen,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  X,
  Compass,
  FileText,
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
  const { openKuralModalByNumber, setSelectedScenarioNumber, setActiveTab, t, language } = useApp();
  const [nodes, setNodes] = useState<KnowledgeNode[]>([]);
  const [edges, setEdges] = useState<KnowledgeEdge[]>([]);
  const [selectedNode, setSelectedNode] = useState<KnowledgeNode | null>(null);
  const [viewMode, setViewMode] = useState<'guided' | 'explorer'>('guided');
  const [activePathwayId, setActivePathwayId] = useState<string>('path-justice');
  const [activeStepNumber, setActiveStepNumber] = useState<number>(1);
  const [filterType, setFilterType] = useState<string>('All');
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // In-Card AI Tutor Chatbot Modal State
  const [tutorModalOpen, setTutorModalOpen] = useState(false);
  const [tutorTopic, setTutorTopic] = useState('');
  const [tutorContextTitle, setTutorContextTitle] = useState('');

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
      setSelectedNode(data.nodes[0] || null);
    };
    fetchGraph();
  }, []);

  const activePathway = GUIDED_PATHWAYS.find((p) => p.id === activePathwayId) || GUIDED_PATHWAYS[0];

  const getLocalizedPathwayTitle = (pId: string) => {
    if (pId === 'path-justice') return t('pathJusticeTitle');
    if (pId === 'path-integrity') return t('pathIntegrityTitle');
    if (pId === 'path-truth') return t('pathTruthTitle');
    if (pId === 'path-governance') return t('pathGovernanceTitle');
    return '';
  };

  const getLocalizedPathwayDesc = (pId: string) => {
    if (pId === 'path-justice') return t('pathJusticeDesc');
    if (pId === 'path-integrity') return t('pathIntegrityDesc');
    if (pId === 'path-truth') return t('pathTruthDesc');
    if (pId === 'path-governance') return t('pathGovernanceDesc');
    return '';
  };

  const getNodeColor = (type: KnowledgeNode['type']) => {
    switch (type) {
      case 'Chapter':
        return { bg: 'bg-slate-100/90', border: 'border-slate-300', text: 'text-slate-950', typeText: 'text-slate-600' };
      case 'Kural':
        return { bg: 'bg-amber-50/90', border: 'border-amber-300', text: 'text-amber-950', typeText: 'text-amber-700' };
      case 'EthicalConcept':
        return { bg: 'bg-blue-50/90', border: 'border-blue-300', text: 'text-blue-950', typeText: 'text-blue-700' };
      case 'LegalConcept':
        return { bg: 'bg-indigo-50/90', border: 'border-indigo-300', text: 'text-indigo-950', typeText: 'text-indigo-700' };
      case 'Scenario':
        return { bg: 'bg-emerald-50/90', border: 'border-emerald-300', text: 'text-emerald-950', typeText: 'text-emerald-700' };
      case 'Question':
        return { bg: 'bg-purple-50/90', border: 'border-purple-300', text: 'text-purple-950', typeText: 'text-purple-700' };
      default:
        return { bg: 'bg-slate-50', border: 'border-slate-200', text: 'text-slate-900', typeText: 'text-slate-500' };
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
            {t('interactiveKnowledgeGraph')}
          </div>
          <h2 className="text-2xl font-extrabold font-heading text-[#071B3A]">
            {t('ethicalLegalMapTitle')}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed font-medium">
            {t('semanticMapSub')}
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
            {t('guidedPathwaysEasy')}
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
            {t('fullNetworkGraph')}
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
                        {t('activeJourney')}
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm font-extrabold text-[#071B3A] font-heading">
                    {getLocalizedPathwayTitle(pathway.id)}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2 font-medium">
                    {getLocalizedPathwayDesc(pathway.id)}
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
                    {t('learningPathwayPrefix')} {getLocalizedPathwayTitle(activePathway.id)}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">{getLocalizedPathwayDesc(activePathway.id)}</p>
                </div>
              </div>
              <span className="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                {t('clickStepToInspect')}
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
                      {t('step1Tag')}
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
                  {t('readFullVerse')}
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
                      {t('step2Tag')}
                    </span>
                    <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-950 font-heading">
                    {activePathway.steps.ethicalPrinciple}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium bg-white/80 p-2.5 rounded-lg border border-indigo-200">
                    {language === 'ta'
                      ? 'அதிகாரங்களைப் பயன்படுத்துவதற்கு முன் அல்லது தீர்ப்புகளை வழங்குவதற்கு முன் தேவையான அறநெறி கடமைகளை நிறுவுகிறது.'
                      : language === 'hi'
                      ? 'अधिकार का प्रयोग करने या निर्णय जारी करने से पहले आवश्यक नैतिक दायित्वों को स्थापित करता है।'
                      : 'Establishes non-negotiable moral obligations required before exercising authority or issuing judgments.'}
                  </p>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openStepTutorModal(activePathway.steps.ethicalPrinciple, 'Step 2: Ethical Principle');
                  }}
                  className="w-full py-2 text-xs font-bold text-indigo-950 bg-white hover:bg-indigo-100 border border-indigo-300 rounded-lg transition-colors cursor-pointer text-center mt-3 shadow-2xs"
                >
                  {t('exploreEthicsAiTutor')}
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
                      {t('step3Tag')}
                    </span>
                    <Scale className="w-3.5 h-3.5 text-blue-600" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-950 font-heading">
                    {activePathway.steps.legalStatute}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium bg-white/80 p-2.5 rounded-lg border border-blue-200">
                    {language === 'ta'
                      ? 'தொன்மை அறநெறி கடமைகளைச் சட்டப் பாதுகாப்புகளாகவும் அரசியலமைப்பு உத்தரவாதங்களாகவும் மாற்றுகிறது.'
                      : language === 'hi'
                      ? 'शास्त्रीय नैतिक कर्तव्यों को लागू करने योग्य वैधानिक सुरक्षा और संवैधानिक गारंटी में समाहित करता है।'
                      : 'Codifies classical moral duties into enforceable statutory protections and constitutional guarantees.'}
                  </p>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openStepTutorModal(activePathway.steps.legalStatute, 'Step 3: Statutory Law');
                  }}
                  className="w-full py-2 text-xs font-bold text-blue-950 bg-white hover:bg-blue-100 border border-blue-300 rounded-lg transition-colors cursor-pointer text-center mt-3 shadow-2xs"
                >
                  {t('exploreLawAiTutor')}
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
                      {t('step4Tag')}
                    </span>
                    <FileText className="w-3.5 h-3.5 text-amber-700" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-950 font-heading">
                    Scenario #{activePathway.steps.scenarioNumber}: {activePathway.steps.scenarioTitle}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium bg-white/80 p-2.5 rounded-lg border border-amber-200">
                    {language === 'ta'
                      ? 'சட்ட விதிகள் மற்றும் திருக்குறள் அறநெறியைப் பயன்படுத்தி நிஜ உலக மோதல்களைத் தீர்த்து உங்கள் புரிதலைச் சோதிக்கவும்.'
                      : language === 'hi'
                      ? 'वैधानिक कानून और तिरुक्कुरल तर्क का उपयोग करके वास्तविक दुनिया के संघर्षों को सुलझाकर अपनी समझ का परीक्षण करें।'
                      : 'Test your understanding by resolving real-world conflicts using statutory law and Thirukkural reasoning.'}
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
                  {t('solveScenarioBtn').replace('{num}', activePathway.steps.scenarioNumber.toString())}
                </button>
              </div>
            </div>

            {/* Deep Step Inspection Drawer */}
            <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-3 animate-in fade-in duration-150">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <span className="text-xs font-extrabold text-[#071B3A] flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-blue-600" />
                  {t('inspectingStep')
                    .replace('{num}', activeStepNumber.toString())
                    .replace(
                      '{title}',
                      activeStepNumber === 1
                        ? activePathway.steps.kuralTitle
                        : activeStepNumber === 2
                        ? activePathway.steps.ethicalPrinciple
                        : activeStepNumber === 3
                        ? activePathway.steps.legalStatute
                        : activePathway.steps.scenarioTitle
                    )}
                </span>
                <span className="text-[11px] font-bold text-slate-500">
                  {t('pathwayLabel')} {getLocalizedPathwayTitle(activePathway.id)}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 text-xs">
                <div className="md:col-span-8 space-y-2">
                  <p className="text-slate-700 leading-relaxed font-medium">
                    {activeStepNumber === 1 &&
                      (language === 'ta'
                        ? `குறள் #${activePathway.steps.kuralNumber} அறம் என்பது வெறும் சிந்தனை மட்டுமல்ல, உறுதியான நடுவுநிலைமையும் நன்னடத்தையும் ஆகும் எனக் கற்பிக்கிறது. இதுவே இந்தச் சட்டப் பாதையின் முதன்மைத் தத்துவ அடித்தளமாகும்.`
                        : language === 'hi'
                        ? `कुरल #${activePathway.steps.kuralNumber} सिखाता है कि धर्म केवल अमूर्त विचार नहीं है, बल्कि अटूट निष्पक्षता और नैतिक आचरण है। यह इस कानूनी मार्ग की प्राथमिक दार्शनिक नींव बनाता है।`
                        : `Kural #${activePathway.steps.kuralNumber} teaches that virtue is not merely abstract thought, but unyielding fairness and moral conduct. It forms the primary philosophical foundation of this legal pathway.`)}
                    {activeStepNumber === 2 &&
                      (language === 'ta'
                        ? `அறநெறிக் கோட்பாடு "${activePathway.steps.ethicalPrinciple}" நீதிபதிகள், வழக்கறிஞர்கள் மற்றும் அரசு ஊழியர்கள் தனிப்பட்ட சார்பு அல்லது நிதி சலுகைகளிலிருந்து முழுமையாக விலகியிருக்க வேண்டும் என வலியுறுத்துகிறது.`
                        : language === 'hi'
                        ? `नैतिक अवधारणा "${activePathway.steps.ethicalPrinciple}" अनिवार्य करती है कि न्यायाधीशों, अधिवक्ताओं और सिविल सेवकों को व्यक्तिगत पूर्वाग्रह से पूरी तरह मुक्त रहना चाहिए।`
                        : `The ethical concept "${activePathway.steps.ethicalPrinciple}" mandates that judges, advocates, and civil servants maintain complete detachment from personal bias or monetary temptation.`)}
                    {activeStepNumber === 3 &&
                      (language === 'ta'
                        ? `இந்திய சட்டவியலின் கீழ் (${activePathway.steps.legalStatute}), தன்னிச்சையான நிர்வாக நடவடிக்கைகளைத் தடுக்க நீதிமன்றங்கள் கண்டிப்பான நடைமுறை நீதியைச் செயல்படுத்துகின்றன.`
                        : language === 'hi'
                        ? `भारतीय न्यायशास्त्र (${activePathway.steps.legalStatute}) के तहत, अदालतें मनमानी प्रशासनिक कार्रवाइयों को रोकने के लिए सख्त प्रक्रियात्मक निष्पक्षता लागू करती हैं।`
                        : `Under Indian jurisprudence (${activePathway.steps.legalStatute}), courts enforce strict procedural fairness to prevent arbitrary administrative actions.`)}
                    {activeStepNumber === 4 &&
                      (language === 'ta'
                        ? `வழக்கு #${activePathway.steps.scenarioNumber} (${activePathway.steps.scenarioTitle}) இல், சட்ட விதிகள் மற்றும் தொன்மை அறநெறி தைரியத்தைச் சமநிலைப்படுத்த முடியுமா எனச் சோதிக்கும் நடைமுறைச் சவாலை எதிர்கொள்கிறீர்கள்.`
                        : language === 'hi'
                        ? `केस #${activePathway.steps.scenarioNumber} (${activePathway.steps.scenarioTitle}) में, आप एक व्यावहारिक वास्तविक जीवन की दुविधा का सामना करते हैं।`
                        : `In Scenario #${activePathway.steps.scenarioNumber} (${activePathway.steps.scenarioTitle}), you face a practical real-life dilemma testing whether you can balance statutory rules with classical ethical courage.`)}
                  </p>
                </div>

                <div className="md:col-span-4 flex flex-col gap-2 justify-center">
                  {activeStepNumber === 1 && (
                    <button
                      onClick={() => openKuralModalByNumber(activePathway.steps.kuralNumber)}
                      className="w-full py-2.5 text-xs font-bold text-white bg-[#071B3A] hover:bg-[#0A2540] rounded-xl shadow-2xs transition-colors cursor-pointer text-center"
                    >
                      {t('openKuralModalBtn').replace('{num}', activePathway.steps.kuralNumber.toString())}
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
                      {t('solveScenarioBtn').replace('{num}', activePathway.steps.scenarioNumber.toString())}
                    </button>
                  )}
                  <button
                    onClick={() => {
                      const topic = activeStepNumber === 1
                        ? activePathway.steps.kuralTitle
                        : activeStepNumber === 2
                        ? activePathway.steps.ethicalPrinciple
                        : activeStepNumber === 3
                        ? activePathway.steps.legalStatute
                        : activePathway.steps.scenarioTitle;
                      openStepTutorModal(topic, `Pathway Step ${activeStepNumber}`);
                    }}
                    className="w-full py-2.5 text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors cursor-pointer text-center shadow-2xs"
                  >
                    {t('askAiAboutStep')}
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
                <span className="text-xs font-extrabold text-slate-700">{t('filterNodes')}</span>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-xl font-bold text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20"
                >
                  <option value="All">{t('all')}</option>
                  <option value="Kural">{t('kuralVerses')}</option>
                  <option value="EthicalConcept">{t('kuralEthicalConcept')}</option>
                  <option value="LegalConcept">{t('statutoryGrounds')}</option>
                  <option value="Scenario">{t('scenarioChallenge')}</option>
                </select>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setZoomLevel((z) => Math.min(1.5, z + 0.1))}
                  className="p-1.5 bg-white border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setZoomLevel((z) => Math.max(0.6, z - 0.1))}
                  className="p-1.5 bg-white border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="p-1.5 bg-white border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Canvas Node Grid Visualization */}
            <div className="p-6 flex-1 bg-slate-50/50 flex flex-wrap gap-4 items-center justify-center overflow-auto max-h-[500px]">
              {filteredNodes.map((node) => {
                const styles = getNodeColor(node.type);
                const isSelected = selectedNode?.id === node.id;

                return (
                  <div
                    key={node.id}
                    onClick={() => setSelectedNode(node)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer max-w-[220px] space-y-1.5 ${styles.bg} ${styles.border} ${
                      isSelected ? 'ring-2 ring-blue-600 scale-105 shadow-md' : 'hover:scale-102 hover:shadow-xs'
                    }`}
                  >
                    <span className={`text-[10px] font-black uppercase tracking-wider block ${styles.typeText}`}>
                      {node.type}
                    </span>
                    <h4 className={`text-xs font-bold leading-tight ${styles.text}`}>
                      {node.label}
                    </h4>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Selected Node Details Drawer (lg:col-span-4) */}
          <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 shadow-2xs p-6 space-y-4">
            {selectedNode ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="text-xs font-black uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">
                    {selectedNode.type} Node
                  </span>
                  <span className="text-xs font-bold text-slate-400">ID: {selectedNode.id}</span>
                </div>

                <h3 className="text-base font-extrabold text-[#071B3A] font-heading">
                  {selectedNode.label}
                </h3>

                {selectedNode.description && (
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    {selectedNode.description}
                  </p>
                )}

                {selectedNode.tamilText && (
                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 space-y-1">
                    <span className="text-[10px] font-black text-amber-800 uppercase tracking-wider">Tamil Verses</span>
                    <p className="text-xs font-tamil font-bold text-slate-900 leading-relaxed">
                      {selectedNode.tamilText}
                    </p>
                  </div>
                )}

                {selectedNode.kuralNumber && (
                  <button
                    onClick={() => openKuralModalByNumber(selectedNode.kuralNumber!)}
                    className="w-full py-2.5 bg-[#071B3A] hover:bg-[#0A2540] text-white font-bold text-xs rounded-xl shadow-2xs transition-colors cursor-pointer text-center block"
                  >
                    Open Kural #{selectedNode.kuralNumber} Details →
                  </button>
                )}
              </div>
            ) : (
              <p className="text-xs text-slate-500 text-center py-10 font-medium">Select a node from the network graph to inspect details.</p>
            )}
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
