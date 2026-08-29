import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { EthicalConcept } from '../types';
import { legalService, DEFAULT_ETHICS_CATEGORIES } from '../services/legalService';
import { getLocalizedCategory } from '../i18n/ethicsLocalizations';
import {
  BookOpen,
  Scale,
  Sparkles,
  Flame,
  Compass,
  Shield,
  Heart,
  Crown,
  Award,
  CheckCircle2,
  Users,
  Handshake,
  Briefcase,
  Globe,
  ArrowRight,
  Search,
  MessageCircle,
  X,
  FileText
} from 'lucide-react';

const ICON_MAP: Record<string, React.ElementType> = {
  Flame,
  Scale,
  Compass,
  Shield,
  Heart,
  Crown,
  Award,
  CheckCircle2,
  Users,
  Handshake,
  Briefcase,
  Globe,
};

export const EthicsLibraryPage: React.FC = () => {
  const { openKuralModalByNumber, setActiveTab, setSearchGlobalQuery, language, t } = useApp();
  const [categories, setCategories] = useState<EthicalConcept[]>(DEFAULT_ETHICS_CATEGORIES);
  const [selectedCategory, setSelectedCategory] = useState<EthicalConcept | null>(null);

  useEffect(() => {
    const fetchCats = async () => {
      const cats = await legalService.getEthicsCategories();
      if (cats && cats.length > 0) {
        setCategories(cats);
      }
    };
    fetchCats();
  }, []);

  const localizedCategories = categories.map((cat) => getLocalizedCategory(cat, language));
  const activeSelectedCategory = selectedCategory
    ? getLocalizedCategory(selectedCategory, language)
    : null;

  return (
    <div className="space-y-6 animate-in fade-in duration-200 pb-12">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 bg-white rounded-2xl border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black bg-amber-100 text-amber-900 border border-amber-300">
            <BookOpen className="w-3.5 h-3.5 text-amber-600" />
            {t('canonicalDomains')}
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-heading font-tamil text-[#071B3A]">
            {t('ethicsLibraryTitle')}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed font-medium font-tamil">
            {t('ethicsLibrarySub')}
          </p>
        </div>
      </div>

      {/* Categories Grid (12 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {localizedCategories.map((cat) => {
          const Icon = ICON_MAP[cat.icon] || Sparkles;

          return (
            <div
              key={cat.id}
              onClick={() => setSelectedCategory(cat)}
              className="p-6 bg-white rounded-2xl border border-slate-200 shadow-2xs hover:border-blue-500 hover:shadow-md transition-all flex flex-col justify-between space-y-4 cursor-pointer group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-blue-50 text-blue-900 border border-blue-100 font-bold shadow-2xs group-hover:scale-105 transition-transform">
                    <Icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="px-2.5 py-0.5 text-xs font-bold text-slate-600 bg-slate-100 rounded-md border border-slate-200 font-tamil">
                    {t('kuralsCountTag').replace('{count}', (cat.kuralCount || 10).toString())}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-extrabold text-[#071B3A] font-heading font-tamil group-hover:text-blue-600 transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-xs font-tamil text-blue-700 font-bold mt-0.5">
                    {cat.tamilTitle}
                  </p>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 font-medium font-tamil">
                  {cat.description}
                </p>

                {/* Mastery Bar */}
                <div className="space-y-1 pt-1">
                  <div className="flex justify-between text-[11px] font-bold text-slate-500 font-tamil">
                    <span>{t('domainMastery')}</span>
                    <span className="font-extrabold text-blue-600">{cat.masteryPercentage || 85}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 rounded-full"
                      style={{ width: `${cat.masteryPercentage || 85}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedCategory(cat);
                  }}
                  className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer font-tamil"
                >
                  {t('viewDetailsLaws')} <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Category Detail Modal */}
      {activeSelectedCategory && (
        <div 
          onClick={() => setSelectedCategory(null)}
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-50 text-blue-900 border border-blue-100 font-bold shadow-xs shrink-0">
                  {React.createElement(ICON_MAP[activeSelectedCategory.icon] || Sparkles, {
                    className: 'w-7 h-7 text-blue-600',
                  })}
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-[#071B3A] font-heading font-tamil">
                    {activeSelectedCategory.title}
                  </h3>
                  <p className="text-sm font-tamil text-blue-700 font-bold">
                    {activeSelectedCategory.tamilTitle}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedCategory(null)}
                className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Description */}
            <p className="text-sm text-slate-700 leading-relaxed font-medium font-tamil">
              {activeSelectedCategory.description}
            </p>

            {/* Core Principles */}
            {activeSelectedCategory.keyPrinciples && activeSelectedCategory.keyPrinciples.length > 0 && (
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <h4 className="text-xs font-extrabold text-[#071B3A] uppercase tracking-wider font-tamil">
                  {t('corePrinciples')}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeSelectedCategory.keyPrinciples.map((principle, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-white text-blue-900 border border-blue-200 text-xs font-bold rounded-lg shadow-2xs font-tamil"
                    >
                      {principle}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Statutes / Laws */}
            {activeSelectedCategory.statutes && activeSelectedCategory.statutes.length > 0 && (
              <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100 space-y-3">
                <h4 className="text-xs font-extrabold text-blue-900 uppercase tracking-wider flex items-center gap-1.5 font-tamil">
                  <FileText className="w-3.5 h-3.5 text-blue-600" />
                  {language === 'ta' ? 'தொடர்புடைய சட்டங்கள் & சரத்துகள்' : language === 'hi' ? 'संबंधित कानून व धाराएं' : 'Related Statutes & Provisions'}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeSelectedCategory.statutes.map((statute, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 bg-white text-slate-800 border border-blue-200 text-xs font-bold rounded-lg shadow-2xs"
                    >
                      ⚖️ {statute}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Related Kurals Quick Launch */}
            {activeSelectedCategory.relatedKurals && activeSelectedCategory.relatedKurals.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-extrabold text-slate-600 uppercase tracking-wider font-tamil">
                  {language === 'ta' ? 'அதிகாரத்தின் குறள்கள்' : language === 'hi' ? 'संबंधित कुरल' : 'Chapter Kurals'}
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {activeSelectedCategory.relatedKurals.map((kuralNum) => (
                    <button
                      key={kuralNum}
                      onClick={() => {
                        setSelectedCategory(null);
                        openKuralModalByNumber(kuralNum);
                      }}
                      className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-black rounded-lg transition-all cursor-pointer hover:scale-105 active:scale-95 font-tamil"
                    >
                      📖 #{kuralNum}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setActiveTab('kural-quest');
                  setSearchGlobalQuery(activeSelectedCategory.tamilTitle.split(' ')[0]);
                }}
                className="flex-1 py-3 px-4 bg-[#071B3A] hover:bg-[#0A2540] text-white text-xs font-extrabold rounded-xl shadow-2xs flex items-center justify-center gap-2 transition-all cursor-pointer font-tamil"
              >
                <Search className="w-4 h-4 text-amber-400" />
                {t('searchRelatedKurals')}
              </button>

              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setActiveTab('ai-tutor');
                  setSearchGlobalQuery(
                    language === 'ta'
                      ? `${activeSelectedCategory.tamilTitle} மற்றும் இந்திய சட்ட அறநெறி பற்றி விளக்குக`
                      : `Explain ${activeSelectedCategory.title} in Indian legal ethics`
                  );
                }}
                className="flex-1 py-3 px-4 bg-slate-100 hover:bg-slate-200 text-[#071B3A] text-xs font-extrabold rounded-xl border border-slate-200 flex items-center justify-center gap-2 transition-colors cursor-pointer font-tamil"
              >
                <MessageCircle className="w-4 h-4 text-blue-600" />
                {t('askAiAboutDomain')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
