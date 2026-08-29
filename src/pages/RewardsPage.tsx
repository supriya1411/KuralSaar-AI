import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Badge } from '../types';
import { progressService } from '../services/progressService';
import { getLocalizedBadgeList, getLocalizedBadge } from '../i18n/badgeLocalizations';
import {
  Gift,
  Award,
  Lock,
} from 'lucide-react';

export const RewardsPage: React.FC = () => {
  const { setUnlockedBadgeToCelebrate, language, t } = useApp();
  const [badges, setBadges] = useState<Badge[]>([]);

  useEffect(() => {
    const load = async () => {
      const all = await progressService.getAllBadges();
      setBadges(all);
    };
    load();
  }, []);

  const localizedBadges = getLocalizedBadgeList(badges, language);
  const unlockedCount = localizedBadges.filter((b) => b.unlocked).length;

  return (
    <div className="space-y-8 max-w-5xl mx-auto animate-in fade-in duration-200 pb-12">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 bg-white rounded-2xl border border-slate-200 shadow-2xs text-slate-900 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black bg-amber-100 text-amber-900 border border-amber-300">
            <Gift className="w-3.5 h-3.5 text-amber-600" />
            {t('rewards')}
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-[#071B3A]">
            {t('rewards')}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed font-medium">
            {t('architectureSub')}
          </p>
        </div>

        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center shrink-0 min-w-[180px]">
          <span className="text-xs font-bold text-slate-500 block">{t('unlockedBadges')}</span>
          <h3 className="text-2xl font-black text-amber-600 mt-1">
            {unlockedCount} / {localizedBadges.length}
          </h3>
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{t('allBadges')}</span>
        </div>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {localizedBadges.map((badge) => {
          return (
            <div
              key={badge.id}
              onClick={() => {
                if (badge.unlocked) {
                  setUnlockedBadgeToCelebrate(badge);
                }
              }}
              className={`p-6 rounded-2xl border transition-all flex flex-col justify-between space-y-4 ${
                badge.unlocked
                  ? 'bg-white border-slate-200 shadow-2xs hover:border-amber-400 hover:shadow-xs cursor-pointer'
                  : 'bg-slate-50 border-slate-200 opacity-60'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  {/* Glowing Icon Circle */}
                  <div
                    className={`w-14 h-14 rounded-xl flex items-center justify-center shadow-2xs ${
                      badge.unlocked
                        ? 'bg-amber-400 text-slate-950 font-bold ring-4 ring-amber-100'
                        : 'bg-slate-200 text-slate-400'
                    }`}
                  >
                    {badge.unlocked ? (
                      <Award className="w-7 h-7" />
                    ) : (
                      <Lock className="w-6 h-6" />
                    )}
                  </div>

                  <span
                    className={`px-2.5 py-0.5 text-xs font-black rounded-md ${
                      badge.unlocked
                        ? 'bg-emerald-100 text-emerald-950 border border-emerald-200'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {badge.unlocked ? t('unlockedBadges') : t('allBadges')}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-extrabold text-[#071B3A] font-heading font-tamil">
                    {badge.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed font-medium font-tamil">
                    {badge.description}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 text-[11px] font-bold text-slate-500 font-tamil">
                {badge.unlocked ? `🏆 ${t('achievementUnlocked')}` : `🔒 ${t('lockedChallenge')}`}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
