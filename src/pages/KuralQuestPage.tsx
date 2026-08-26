import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Kural, PaalType } from '../types';
import { kuralService } from '../services/kuralService';
import { ThiruvalluvarAvatar } from '../components/common/ThiruvalluvarAvatar';
import {
  Search,
  BookOpen,
  Sparkles,
  Scale,
  ExternalLink,
  Tag,
  SlidersHorizontal,
  Layers,
  ArrowRight,
} from 'lucide-react';

const CONCEPT_CHIPS = [
  'All',
  'Integrity',
  'Justice',
  'Anger',
  'Honesty',
  'Self-Control',
  'Leadership',
  'Responsibility',
  'Conflict Resolution',
];

export const KuralQuestPage: React.FC = () => {
  const {
    openKuralModalByNumber,
    setSelectedScenarioNumber,
    setActiveTab,
    searchGlobalQuery,
    setSearchGlobalQuery,
  } = useApp();

  const [kurals, setKurals] = useState<Kural[]>([]);
  const [selectedPaal, setSelectedPaal] = useState<string>('All');
  const [selectedConcept, setSelectedConcept] = useState<string>('All');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [notice, setNotice] = useState<string>('');

  useEffect(() => {
    const fetchKurals = async () => {
      setIsLoading(true);
      const res = await kuralService.getKurals({
        searchQuery: searchGlobalQuery,
        paal: selectedPaal !== 'All' ? selectedPaal : undefined,
        concept: selectedConcept !== 'All' ? selectedConcept : undefined,
      });
      setKurals(res.data);
      setNotice(res.notice);
      setIsLoading(false);
    };

    fetchKurals();
  }, [searchGlobalQuery, selectedPaal, selectedConcept]);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Search & Filter Header Banner */}
      <div className="relative p-6 sm:p-8 bg-gradient-to-r from-[#0E1330] via-indigo-950 to-slate-900 rounded-3xl text-white shadow-lg overflow-hidden border border-indigo-900/60">
        <div className="absolute right-4 bottom-2 opacity-15 pointer-events-none hidden md:block">
          <ThiruvalluvarAvatar size={160} />
        </div>

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
            <Sparkles className="w-3.5 h-3.5" />
            1,330 Sacred Couplets • Ethical Jurisprudence
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-white tracking-tight">
            Explore Thirukkural Ethical Wisdom
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Search classical verses by ethical dilemma, legal principle, Tamil keyword, or chapter to illuminate responsible modern decisions.
          </p>

          {/* Search Input Bar */}
          <div className="relative flex items-center pt-2">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by situation, concept or meaning (e.g., 'Conflict of Interest', 'Anger', 'Kural 131', 'Justice')..."
              value={searchGlobalQuery}
              onChange={(e) => setSearchGlobalQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 text-sm bg-white/10 hover:bg-white/15 focus:bg-white text-white focus:text-slate-900 placeholder-slate-400 focus:placeholder-slate-500 rounded-2xl border border-white/20 focus:border-white focus:outline-hidden focus:ring-4 focus:ring-indigo-500/30 backdrop-blur-md transition-all shadow-inner"
            />
            {searchGlobalQuery && (
              <button
                onClick={() => setSearchGlobalQuery('')}
                className="absolute right-4 text-xs text-slate-300 hover:text-white bg-white/20 px-2 py-1 rounded-md"
              >
                Clear
              </button>
            )}
          </div>

          {/* Concept Filter Chips */}
          <div className="flex items-center gap-2 flex-wrap pt-2">
            <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
              <Tag className="w-3 h-3" /> Quick Filter:
            </span>
            {CONCEPT_CHIPS.map((chip) => (
              <button
                key={chip}
                onClick={() => setSelectedConcept(chip)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                  selectedConcept === chip
                    ? 'bg-amber-400 text-slate-950 font-bold shadow-xs'
                    : 'bg-white/10 text-slate-200 hover:bg-white/20 border border-white/10'
                }`}
              >
                {chip}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Paal Tabs & Counter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-3 bg-white rounded-2xl border border-slate-200/80 shadow-2xs">
        <div className="flex items-center gap-2">
          {['All', 'Aram', 'Porul', 'Inbam'].map((p) => (
            <button
              key={p}
              onClick={() => setSelectedPaal(p)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedPaal === p
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {p === 'All'
                ? 'All Sections'
                : p === 'Aram'
                ? 'அறத்துப்பால் (Virtue)'
                : p === 'Porul'
                ? 'பொருட்பால் (Governance & Wealth)'
                : 'காமத்துப்பால் (Love)'}
            </button>
          ))}
        </div>

        <div className="text-xs text-slate-500 font-medium px-2">
          Found <strong>{kurals.length}</strong> couplets matching criteria
        </div>
      </div>

      {/* Kurals Grid */}
      {isLoading ? (
        <div className="flex justify-center p-12">
          <div className="w-8 h-8 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : kurals.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 space-y-3">
          <BookOpen className="w-12 h-12 text-slate-400 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">No matching Thirukkural found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try searching for terms like "Anger", "Justice", "Integrity", "Truth", or browse by Section tabs.
          </p>
          <button
            onClick={() => {
              setSearchGlobalQuery('');
              setSelectedConcept('All');
              setSelectedPaal('All');
            }}
            className="px-4 py-2 text-xs font-bold text-indigo-600 bg-indigo-50 rounded-xl hover:bg-indigo-100"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {kurals.map((kural) => (
            <div
              key={kural.id}
              className="group p-6 bg-white rounded-2xl border border-slate-200/80 shadow-2xs hover:border-indigo-300 hover:shadow-md transition-all flex flex-col justify-between space-y-5"
            >
              <div className="space-y-3">
                {/* Meta Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 text-xs font-black text-indigo-700 bg-indigo-50 rounded-full border border-indigo-200/60">
                      Kural #{kural.number}
                    </span>
                    <span className="text-[11px] font-bold text-slate-400 uppercase">
                      {kural.paal} • {kural.iyal}
                    </span>
                  </div>

                  <span className="px-2.5 py-0.5 text-xs font-semibold text-amber-800 bg-amber-50 rounded-md border border-amber-200/60">
                    {kural.ethicalConcept}
                  </span>
                </div>

                {/* Tamil Verse */}
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                  <p className="text-base font-bold font-tamil text-slate-900 leading-relaxed">
                    {kural.verse1Tamil}
                  </p>
                  <p className="text-base font-bold font-tamil text-slate-900 leading-relaxed">
                    {kural.verse2Tamil}
                  </p>
                  <p className="text-[11px] font-medium text-slate-400 italic pt-1">
                    "{kural.transliteration}"
                  </p>
                </div>

                {/* English Verse */}
                <p className="text-sm font-medium text-slate-800 leading-relaxed">
                  "{kural.verseEnglish}"
                </p>

                {/* Chapter Context */}
                <div className="text-xs text-slate-500">
                  <strong className="text-slate-700">Chapter ({kural.adhigaramTamil}):</strong>{' '}
                  {kural.adhigaram}
                </div>

                {/* Legal Intersection preview */}
                <div className="p-2.5 bg-indigo-50/50 rounded-lg text-xs text-indigo-950 space-y-1">
                  <span className="font-bold flex items-center gap-1.5 text-indigo-900">
                    <Scale className="w-3.5 h-3.5 text-indigo-600" />
                    Modern Legal Relevance:
                  </span>
                  <p className="line-clamp-2 text-slate-600">{kural.modernRelevance}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                <button
                  onClick={() => openKuralModalByNumber(kural.number)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition-colors"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  View Full Kural
                </button>

                {kural.relatedScenarioIds.length > 0 ? (
                  <button
                    onClick={() => {
                      const scenNum = parseInt(kural.relatedScenarioIds[0].replace('scenario-', ''), 10) || 3;
                      setSelectedScenarioNumber(scenNum);
                      setActiveTab('scenario-challenge');
                    }}
                    className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800"
                  >
                    Related Scenario <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <span className="text-[11px] text-slate-400 italic">General Principle</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Notice box */}
      <div className="p-3 bg-slate-100 rounded-xl text-center text-[11px] text-slate-500">
        ℹ️ {notice}
      </div>
    </div>
  );
};
