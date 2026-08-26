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
  HelpCircle,
  CheckCircle,
  Layers,
  ArrowRight,
  ZoomIn,
  ZoomOut,
  Maximize2,
  X,
} from 'lucide-react';

export const KnowledgeGraphPage: React.FC = () => {
  const { openKuralModalByNumber, setSelectedScenarioNumber, setActiveTab } = useApp();
  const [nodes, setNodes] = useState<KnowledgeNode[]>([]);
  const [edges, setEdges] = useState<KnowledgeEdge[]>([]);
  const [selectedNode, setSelectedNode] = useState<KnowledgeNode | null>(null);
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

  const getNodeColor = (type: KnowledgeNode['type']) => {
    switch (type) {
      case 'Question':
        return { bg: 'bg-amber-100', border: 'border-amber-400', text: 'text-amber-900', fill: '#FEF3C7', stroke: '#F59E0B' };
      case 'EthicalConcept':
        return { bg: 'bg-indigo-100', border: 'border-indigo-400', text: 'text-indigo-900', fill: '#E0E7FF', stroke: '#6366F1' };
      case 'Kural':
        return { bg: 'bg-emerald-100', border: 'border-emerald-400', text: 'text-emerald-900', fill: '#D1FAE5', stroke: '#10B981' };
      case 'Chapter':
        return { bg: 'bg-slate-100', border: 'border-slate-400', text: 'text-slate-900', fill: '#F1F5F9', stroke: '#64748B' };
      case 'LegalConcept':
        return { bg: 'bg-blue-100', border: 'border-blue-400', text: 'text-blue-900', fill: '#DBEAFE', stroke: '#3B82F6' };
      case 'Scenario':
        return { bg: 'bg-purple-100', border: 'border-purple-400', text: 'text-purple-900', fill: '#F3E8FF', stroke: '#A855F7' };
      case 'ResponsibleAction':
        return { bg: 'bg-teal-100', border: 'border-teal-400', text: 'text-teal-900', fill: '#CCFBF1', stroke: '#14B8A6' };
      default:
        return { bg: 'bg-slate-100', border: 'border-slate-300', text: 'text-slate-800', fill: '#F8FAFC', stroke: '#94A3B8' };
    }
  };

  const filteredNodes = filterType === 'All' ? nodes : nodes.filter((n) => n.type === filterType);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="p-6 bg-gradient-to-r from-[#0E1330] via-indigo-950 to-slate-900 rounded-3xl text-white shadow-lg border border-indigo-900/60 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            <Network className="w-3.5 h-3.5" />
            Interactive Knowledge Graph Engine
          </div>
          <h2 className="text-2xl font-extrabold font-heading text-white">
            Ethical-Legal Semantic Graph
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Click any node below to trace how ethical principles flow from Thirukkural verses to Indian statutory frameworks and practical case resolutions.
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-2 text-[10px] font-bold p-3 bg-white/5 rounded-2xl border border-white/10 shrink-0">
          <span className="px-2 py-1 bg-amber-400/20 text-amber-300 rounded-md">Question</span>
          <span className="px-2 py-1 bg-indigo-400/20 text-indigo-300 rounded-md">Ethical Concept</span>
          <span className="px-2 py-1 bg-emerald-400/20 text-emerald-300 rounded-md">Kural</span>
          <span className="px-2 py-1 bg-blue-400/20 text-blue-300 rounded-md">Legal Statute</span>
          <span className="px-2 py-1 bg-purple-400/20 text-purple-300 rounded-md">Scenario</span>
          <span className="px-2 py-1 bg-teal-400/20 text-teal-300 rounded-md">Responsible Action</span>
        </div>
      </div>

      {/* Main Canvas & Detail Panel Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* SVG Interactive Graph Canvas (lg:col-span-8) */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200/80 shadow-2xs overflow-hidden flex flex-col min-h-[520px]">
          {/* Controls Bar */}
          <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-slate-50/70">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-600">Filter Nodes:</span>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-xl font-medium text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20"
              >
                <option value="All">All Types ({nodes.length})</option>
                <option value="Question">Questions</option>
                <option value="EthicalConcept">Ethical Concepts</option>
                <option value="Kural">Thirukkurals</option>
                <option value="LegalConcept">Legal Statutes</option>
                <option value="Scenario">Scenarios</option>
                <option value="ResponsibleAction">Responsible Actions</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setZoomLevel((prev) => Math.max(0.8, prev - 0.1))}
                className="p-1.5 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-600"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-xs font-bold text-slate-600 min-w-10 text-center">
                {Math.round(zoomLevel * 100)}%
              </span>
              <button
                onClick={() => setZoomLevel((prev) => Math.min(1.4, prev + 0.1))}
                className="p-1.5 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-600"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={() => setZoomLevel(1)}
                className="p-1.5 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-600"
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
              <div className="flex-1 p-4 overflow-auto custom-scrollbar bg-slate-900/5 relative min-h-[500px] max-h-[680px]">
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
                {/* Flow lines with animated dashes */}
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
                        stroke={isEdgeActive ? '#6366F1' : '#94A3B8'}
                        strokeWidth={isEdgeActive ? 3 : 1.5}
                        strokeDasharray={isEdgeActive ? '4 2' : 'none'}
                        opacity={isEdgeActive ? 1 : 0.4}
                      />
                      {edge.label && (
                        <text
                          x={(src.x + tgt.x + 130) / 2}
                          y={((src.y || 100) + (tgt.y || 100) + 48) / 2 - 4}
                          fill={isEdgeActive ? '#4338CA' : '#64748B'}
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
                    className={`absolute w-36 p-3 rounded-2xl border-2 transition-all cursor-pointer shadow-sm text-center ${
                      color.bg
                    } ${color.border} ${
                      isSelected
                        ? 'ring-4 ring-indigo-500/40 scale-105 shadow-lg z-20 font-bold'
                        : 'hover:scale-102 hover:shadow-md z-10'
                    }`}
                  >
                    <span className="text-[9px] font-extrabold uppercase tracking-wider block opacity-70 mb-0.5">
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

          <div className="p-3 bg-slate-50 border-t border-slate-100 text-center text-xs text-slate-500">
            💡 <strong>Interactive Flow:</strong> Trace from ethical question → moral concept → Thirukkural → legal statute → actionable resolution.
          </div>
        </div>

        {/* Selected Node Details Drawer (lg:col-span-4) */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200/80 shadow-2xs p-6 space-y-5">
          {selectedNode ? (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="px-3 py-1 text-xs font-bold text-indigo-700 bg-indigo-50 rounded-full border border-indigo-200">
                  {selectedNode.type} Node
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {selectedNode.category}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 font-heading">
                  {selectedNode.details.title}
                </h3>
                {selectedNode.details.subtitle && (
                  <p className="text-xs font-tamil font-semibold text-indigo-900 mt-1">
                    {selectedNode.details.subtitle}
                  </p>
                )}
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-xs text-slate-700 leading-relaxed space-y-2">
                <span className="font-bold text-slate-900 block">Deep Description:</span>
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
                        className="px-2 py-0.5 text-[11px] font-medium bg-indigo-50 text-indigo-700 rounded-md"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action shortcuts based on node type */}
              <div className="pt-3 border-t border-slate-100 space-y-2">
                {selectedNode.type === 'Kural' && (
                  <button
                    onClick={() => {
                      const num = parseInt(selectedNode.label.replace('Kural ', ''), 10) || 131;
                      openKuralModalByNumber(num);
                    }}
                    className="w-full py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <BookOpen className="w-4 h-4" />
                    Read Full Kural Detail
                  </button>
                )}

                {selectedNode.type === 'Scenario' && (
                  <button
                    onClick={() => {
                      setSelectedScenarioNumber(3);
                      setActiveTab('scenario-challenge');
                    }}
                    className="w-full py-2.5 text-xs font-bold text-white bg-[#5B45E0] hover:bg-[#4E3AC7] rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Scale className="w-4 h-4" />
                    Launch Interactive Scenario
                  </button>
                )}

                <button
                  onClick={() => setActiveTab('ai-tutor')}
                  className="w-full py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                  Ask AI Tutor About This Node
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-slate-400 space-y-2">
              <Info className="w-8 h-8 mx-auto text-slate-300" />
              <p className="text-xs">Click on any node in the graph to view its legal and ethical metadata.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
