import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { EthicalConcept } from '../types';
import { legalService } from '../services/legalService';
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
  const [categories, setCategories] = useState<EthicalConcept[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<EthicalConcept | null>(null);

  useEffect(() => {
    const fetch = async () => {
      const cats = await legalService.getEthicsCategories();
      setCategories(cats);
    };
    fetch();
  }, []);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="p-6 sm:p-8 bg-gradient-to-r from-[#0E1330] via-indigo-950 to-slate-900 rounded-3xl text-white shadow-lg border border-indigo-900/60 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            <BookOpen className="w-3.5 h-3.5" />
            12 Canonical Moral Domains
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
            Classical Ethics Library
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
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
              className="p-6 bg-white rounded-3xl border border-slate-200/80 shadow-2xs hover:border-indigo-300 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center justify-center w-11 h-11 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-100">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="px-2.5 py-0.5 text-xs font-bold text-slate-500 bg-slate-100 rounded-full">
                    {cat.kuralCount} Kurals
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900 font-heading">
                    {cat.title}
                  </h3>
                  <p className="text-xs font-tamil text-indigo-700 font-semibold mt-0.5">
                    {cat.tamilTitle}
                  </p>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {cat.description}
                </p>

                {/* Mastery Bar */}
                <div className="space-y-1 pt-1">
                  <div className="flex justify-between text-[11px] font-semibold text-slate-500">
                    <span>Mastery Progress</span>
                    <span className="font-bold text-indigo-600">{cat.masteryPercentage}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-600 rounded-full"
                      style={{ width: `${cat.masteryPercentage}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => {
                    setSearchGlobalQuery(cat.title.split(' ')[0]);
                    setActiveTab('kural-quest');
                  }}
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                >
                  Explore Kurals <ArrowRight className="w-3 h-3" />
                </button>

                {cat.recommendedKuralIds.length > 0 && (
                  <button
                    onClick={() => openKuralModalByNumber(cat.recommendedKuralIds[0])}
                    className="px-2.5 py-1 text-[11px] font-semibold bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100"
                  >
                    Kural #{cat.recommendedKuralIds[0]}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
