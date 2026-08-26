import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { EthicalConcept } from '../types';
import { legalService, DEFAULT_ETHICS_CATEGORIES } from '../services/legalService';
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
  const { openKuralModalByNumber, setSelectedScenarioNumber, setActiveTab, setSearchGlobalQuery } = useApp();
  const [categories, setCategories] = useState<EthicalConcept[]>(DEFAULT_ETHICS_CATEGORIES);
  const [selectedCategory, setSelectedCategory] = useState<EthicalConcept | null>(null);

  useEffect(() => {
    const fetch = async () => {
      const cats = await legalService.getEthicsCategories();
      if (cats && cats.length > 0) {
        setCategories(cats);
      }
    };
    fetch();
  }, []);

  return (
    <div className="space-y-6 animate-in fade-in duration-200 pb-12">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 bg-white rounded-2xl border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black bg-amber-100 text-amber-900 border border-amber-300">
            <BookOpen className="w-3.5 h-3.5 text-amber-600" />
            12 Canonical Moral Domains
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-[#071B3A]">
            Classical Ethics Library
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed font-medium">
            Browse the 12 pillars of virtue and governance structured in Thirukkural and see how they underpin Indian statutory, constitutional, and professional ethics.
          </p>
        </div>
      </div>

      {/* Categories Grid (12 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => {
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
                  <span className="px-2.5 py-0.5 text-xs font-bold text-slate-600 bg-slate-100 rounded-md border border-slate-200">
                    {cat.kuralCount || 10} Kurals
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-extrabold text-[#071B3A] font-heading group-hover:text-blue-600 transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-xs font-tamil text-blue-700 font-bold mt-0.5">
                    {cat.tamilTitle}
                  </p>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 font-medium">
                  {cat.description}
                </p>

                {/* Mastery Bar */}
                <div className="space-y-1 pt-1">
                  <div className="flex justify-between text-[11px] font-bold text-slate-500">
                    <span>Domain Mastery</span>
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
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedCategory(cat);
                  }}
                  className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
                >
                  View Details & Laws <ArrowRight className="w-3 h-3" />
                </button>

                {cat.recommendedKuralIds && cat.recommendedKuralIds.length > 0 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openKuralModalByNumber(cat.recommendedKuralIds[0]);
                    }}
                    className="px-2.5 py-1 text-[11px] font-bold bg-slate-100 text-[#071B3A] border border-slate-200 rounded-lg hover:bg-slate-200 cursor-pointer transition-colors"
                  >
                    Kural #{cat.recommendedKuralIds[0]}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Selected Category Detail Modal */}
      {selectedCategory && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto custom-scrollbar relative">
            <button
              onClick={() => setSelectedCategory(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-sm cursor-pointer transition-colors"
            >
              ✕
            </button>

            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black bg-blue-100 text-blue-900 border border-blue-200">
                <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                Ethical Domain Breakdown
              </div>
              <h3 className="text-2xl font-extrabold text-[#071B3A] font-heading">
                {selectedCategory.title}
              </h3>
              <p className="text-sm font-tamil text-blue-700 font-bold">
                {selectedCategory.tamilTitle}
              </p>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {selectedCategory.description}
              </p>
            </div>

            {/* Key Ethical Principles */}
            {selectedCategory.keyPrinciples && (
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <span className="text-xs font-extrabold text-[#071B3A] uppercase tracking-wider block">
                  Core Legal-Ethical Principles:
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedCategory.keyPrinciples.map((principle, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 text-xs font-bold bg-white text-blue-950 border border-blue-200 rounded-lg shadow-2xs"
                    >
                      ⚖️ {principle}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setSearchGlobalQuery(selectedCategory.title.split(' ')[0]);
                  setActiveTab('kural-quest');
                }}
                className="w-full py-3 text-xs font-bold text-white bg-[#071B3A] hover:bg-[#0A2540] rounded-xl shadow-2xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                Search Related Kurals
              </button>

              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setActiveTab('ai-tutor');
                }}
                className="w-full py-3 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Scale className="w-4 h-4 text-blue-600" />
                Ask AI Tutor About This Domain
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
