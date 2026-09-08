import React, { useState, useEffect, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Kural } from '../types';
import { kuralService } from '../services/kuralService';
import { getLocalizedKural } from '../i18n/kuralLocalizations';
import {
  Search,
  BookOpen,
  Sparkles,
  Scale,
  Tag,
  ArrowRight,
  X,
  ChevronDown,
  RotateCcw
} from 'lucide-react';
import { VoiceDictationButton } from '../components/common/VoiceDictationButton';

const CONCEPT_CHIPS = [
  { key: 'All', labelKey: 'all' },
  { key: 'Integrity', labelKey: 'integrity' },
  { key: 'Justice', labelKey: 'justice' },
  { key: 'Anger Control', labelKey: 'anger' },
  { key: 'Honesty', labelKey: 'honesty' },
  { key: 'Self-Control', labelKey: 'selfControl' },
  { key: 'Leadership', labelKey: 'leadership' },
  { key: 'Responsibility', labelKey: 'responsibility' },
  { key: 'Conflict Resolution', labelKey: 'conflictResolution' },
];

export const KuralQuestPage: React.FC = () => {
  const {
    openKuralModalByNumber,
    setSelectedScenarioNumber,
    setActiveTab,
    searchGlobalQuery,
    setSearchGlobalQuery,
    language,
    t,
  } = useApp();

  const [kurals, setKurals] = useState<Kural[]>([]);
  const [totalCount, setTotalCount] = useState<number>(1330);
  const [selectedPaal, setSelectedPaal] = useState<string>('All');
  const [selectedConcept, setSelectedConcept] = useState<string>('All');
  const [displayLimit, setDisplayLimit] = useState<number>(40);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [notice, setNotice] = useState<string>('');

  useEffect(() => {
    let isCancelled = false;
    const fetchKurals = async () => {
      setIsLoading(true);
      const res = await kuralService.getKurals({
        searchQuery: searchGlobalQuery.trim() ? searchGlobalQuery.trim() : undefined,
        paal: selectedPaal !== 'All' ? selectedPaal : undefined,
        concept: selectedConcept !== 'All' ? selectedConcept : undefined,
        limit: displayLimit,
      });

      if (!isCancelled) {
        // Enforce strict deduplication by Kural number
        const uniqueItems = Array.from(new Map((res.data || []).map((k) => [k.number, k])).values());
        setKurals(uniqueItems);
        setTotalCount(res.total || uniqueItems.length);
        setNotice(res.notice);
        setIsLoading(false);
      }
    };

    fetchKurals();
    return () => {
      isCancelled = true;
    };
  }, [searchGlobalQuery, selectedPaal, selectedConcept, displayLimit]);

  // Reset limit when changing filter or search
  useEffect(() => {
    setDisplayLimit(40);
  }, [searchGlobalQuery, selectedPaal, selectedConcept]);

  const handleChipClick = (chipKey: string) => {
    setSelectedConcept(chipKey);
    // When clicking a specific quick filter chip, clear previous text query to strictly show that topic
    if (chipKey !== 'All') {
      setSearchGlobalQuery('');
    }
  };

  const handleSearchChange = (value: string) => {
    setSearchGlobalQuery(value);
    // When typing a custom search, reset the concept chip to All so it searches freely
    if (value.trim() && selectedConcept !== 'All') {
      setSelectedConcept('All');
    }
  };

  const localizedKurals = useMemo(() => {
    // Strict deduplication map
    const uniqueMap = new Map<number, Kural>();
    kurals.forEach((k) => {
      if (!uniqueMap.has(k.number)) {
        uniqueMap.set(k.number, k);
      }
    });
    return Array.from(uniqueMap.values()).map((k) => getLocalizedKural(k, language));
  }, [kurals, language]);

  return (
    <div className="space-y-6 animate-in fade-in duration-200 pb-12">
      {/* Search & Filter Header Banner */}
      <div className="p-6 sm:p-8 bg-white rounded-2xl border border-slate-200 shadow-2xs text-slate-900 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        <div className="md:col-span-7 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black bg-amber-100 text-amber-900 border border-amber-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            {t('thirukkuralCouplets')}
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-[#071B3A] tracking-tight">
            {t('kuralQuest')}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
            {t('kuralQuestPillarDesc')}
          </p>

          {/* Search Input Bar */}
          <div className="relative flex items-center pt-1">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 pointer-events-none" />
            <input
              type="text"
              placeholder={t('searchPlaceholder')}
              value={searchGlobalQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full pl-12 pr-24 py-3 text-sm bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-blue-600 focus:outline-hidden focus:ring-4 focus:ring-blue-500/20 rounded-xl transition-all font-medium"
            />
            <div className="absolute right-3 flex items-center gap-1.5">
              <VoiceDictationButton
                currentValue={searchGlobalQuery}
                onTranscript={(text) => handleSearchChange(text)}
              />
              {searchGlobalQuery && (
                <button
                  onClick={() => setSearchGlobalQuery('')}
                  title="Clear search"
                  className="text-xs font-bold text-slate-500 hover:text-slate-900 bg-slate-200 hover:bg-slate-300 p-1.5 rounded-lg cursor-pointer transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Concept Filter Chips */}
          <div className="flex items-center gap-2 flex-wrap pt-1">
            <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
              <Tag className="w-3.5 h-3.5 text-amber-600" /> {t('quickFilter')}
            </span>
            {CONCEPT_CHIPS.map((chip) => (
              <button
                key={chip.key}
                onClick={() => handleChipClick(chip.key)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  selectedConcept === chip.key
                    ? 'bg-[#071B3A] text-white shadow-2xs scale-102 ring-2 ring-blue-500/20'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {t(chip.labelKey)}
              </button>
            ))}
          </div>
        </div>

        {/* Real Photo Card on Right Column */}
        <div className="md:col-span-5 hidden md:block">
          <div className="relative h-64 rounded-xl overflow-hidden border border-slate-200 shadow-xs">
            <img
              src="/assets/images/thirukkural_book.jpg"
              alt="Thirukkural Manuscript"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-4 right-4 text-white">
              <span className="text-[10px] font-black uppercase tracking-wider bg-amber-400 text-slate-950 px-2 py-0.5 rounded shadow-2xs">
                {t('appName')}
              </span>
              <p className="text-xs font-bold text-white mt-1 drop-shadow-sm">
                {t('slogan')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Paal Tabs & Counter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-3 bg-white rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-2 flex-wrap">
          {['All', 'Aram', 'Porul', 'Inbam'].map((p) => (
            <button
              key={p}
              onClick={() => setSelectedPaal(p)}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                selectedPaal === p
                  ? 'bg-[#071B3A] text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {p === 'All'
                ? t('all')
                : p === 'Aram'
                ? t('virtue')
                : p === 'Porul'
                ? t('wealth')
                : t('love')}
            </button>
          ))}
        </div>

        <div className="text-xs text-slate-600 font-bold px-2 flex items-center gap-2">
          {selectedConcept !== 'All' ? (
            <span className="text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">
              Topic: <strong>{selectedConcept}</strong> ({localizedKurals.length} couplets)
            </span>
          ) : searchGlobalQuery ? (
            <span className="text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">
              Search: <strong>"{searchGlobalQuery}"</strong> ({localizedKurals.length} of {totalCount})
            </span>
          ) : (
            <span>{t('kuralsCountTag').replace('{count}', totalCount.toString())}</span>
          )}
        </div>
      </div>

      {/* Kurals Grid */}
      {isLoading ? (
        <div className="flex justify-center p-12">
          <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : localizedKurals.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 space-y-3 shadow-2xs">
          <BookOpen className="w-12 h-12 text-slate-400 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">
            No couplets found for {selectedConcept !== 'All' ? `"${selectedConcept}"` : `"${searchGlobalQuery}"`}
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Try choosing another topic chip or clearing the search filter.
          </p>
          <button
            onClick={() => {
              setSearchGlobalQuery('');
              setSelectedConcept('All');
              setSelectedPaal('All');
            }}
            className="px-4 py-2 text-xs font-bold text-[#071B3A] bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors cursor-pointer inline-flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {localizedKurals.map((kural) => (
              <div
                key={`kural-card-${kural.number}`}
                className="group p-6 bg-white rounded-2xl border border-slate-200 shadow-2xs hover:border-blue-400 transition-all flex flex-col justify-between space-y-5"
              >
                <div className="space-y-3">
                  {/* Meta Header */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-3 py-1 text-xs font-black text-blue-900 bg-blue-50 rounded-full border border-blue-200">
                        {t('kuralNumFormat').replace('{number}', kural.number.toString())}
                      </span>
                      <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">
                        {kural.paalTamil || kural.paal} • {kural.adhigaram}
                      </span>
                    </div>

                    <span className="px-2.5 py-0.5 text-xs font-extrabold text-amber-900 bg-amber-100/90 rounded-md border border-amber-300/60 shrink-0">
                      {kural.ethicalConcept}
                    </span>
                  </div>

                  {/* Tamil & Primary Verses */}
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
                    <p className="text-base font-bold font-tamil text-slate-950 leading-relaxed">
                      {kural.verse1Tamil}
                    </p>
                    <p className="text-base font-bold font-tamil text-slate-950 leading-relaxed">
                      {kural.verse2Tamil}
                    </p>
                    <p className="text-[11px] font-medium text-slate-400 italic pt-1">
                      "{kural.transliteration}"
                    </p>
                  </div>

                  {/* Explanation in current language */}
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-slate-800 leading-relaxed">
                      "{language === 'ta' ? (kural.explanationTamil || kural.verseEnglish) : kural.verseEnglish}"
                    </p>
                    {language === 'en' && kural.explanationEnglish && (
                      <p className="text-xs text-slate-600 leading-relaxed">
                        <strong>{t('ethicalMeaning')}:</strong> {kural.explanationEnglish}
                      </p>
                    )}
                    {language === 'hi' && kural.explanationEnglish && (
                      <p className="text-xs text-slate-600 leading-relaxed font-hindi">
                        <strong>{t('ethicalMeaning')}:</strong> {kural.explanationEnglish}
                      </p>
                    )}
                    {language === 'ta' && kural.explanationTamil && (
                      <p className="text-xs text-slate-600 leading-relaxed font-tamil">
                        <strong>{t('ethicalMeaning')}:</strong> {kural.explanationTamil}
                      </p>
                    )}
                  </div>

                  {/* Chapter Context */}
                  <div className="text-xs text-slate-500 font-medium">
                    <strong className="text-slate-800">{t('chapter')}:</strong>{' '}
                    <span>{kural.adhigaram}</span>
                  </div>

                  {/* Legal Intersection preview */}
                  <div className="p-3 bg-blue-50/70 rounded-xl text-xs text-slate-800 space-y-1 border border-blue-100">
                    <span className="font-extrabold flex items-center gap-1.5 text-blue-900">
                      <Scale className="w-3.5 h-3.5 text-blue-600" />
                      {t('whyThisStatute')}
                    </span>
                    <p className="line-clamp-2 text-slate-600 font-medium">{kural.modernRelevance}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                  <button
                    onClick={() => openKuralModalByNumber(kural.number)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-[#071B3A] bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                    {t('reviewKural')} #{kural.number}
                  </button>

                  {kural.relatedScenarioIds.length > 0 ? (
                    <button
                      onClick={() => {
                        const scenNum = parseInt(kural.relatedScenarioIds[0].replace('scenario-', '').replace('scen-', ''), 10) || 3;
                        setSelectedScenarioNumber(scenNum);
                        setActiveTab('scenario-challenge');
                      }}
                      className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 hover:text-amber-800 cursor-pointer"
                    >
                      {t('scenarioChallenge')} <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <span className="text-[11px] text-slate-400 italic">{t('tagline')}</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          {totalCount > localizedKurals.length && (
            <div className="text-center pt-4">
              <button
                onClick={() => setDisplayLimit((prev) => prev + 40)}
                className="px-6 py-3 bg-[#071B3A] hover:bg-[#0A2540] text-white text-xs font-extrabold rounded-xl shadow-md transition-all cursor-pointer inline-flex items-center gap-2"
              >
                <ChevronDown className="w-4 h-4" />
                Load More Couplets ({totalCount - localizedKurals.length} remaining)
              </button>
            </div>
          )}
        </div>
      )}

      {/* Notice box */}
      <div className="p-3 bg-white rounded-xl border border-slate-200 text-center text-[11px] text-slate-500 font-medium">
        ℹ️ {notice}
      </div>
    </div>
  );
};
