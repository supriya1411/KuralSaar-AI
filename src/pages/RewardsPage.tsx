import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Badge } from '../types';
import { progressService } from '../services/progressService';
import {
  Gift,
  Award,
  Sparkles,
  Lock,
  CheckCircle,
  Star,
  Flame,
  Shield,
  BookOpen,
} from 'lucide-react';

export const RewardsPage: React.FC = () => {
  const { userProgress, setUnlockedBadgeToCelebrate } = useApp();
  const [badges, setBadges] = useState<Badge[]>([]);

  useEffect(() => {
    const load = async () => {
      const all = await progressService.getAllBadges();
      setBadges(all);
    };
    load();
  }, []);

  const unlockedCount = badges.filter((b) => b.unlocked).length;

  return (
    <div className="space-y-8 max-w-5xl mx-auto animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 bg-gradient-to-r from-[#0E1330] via-indigo-950 to-slate-900 rounded-3xl text-white shadow-lg border border-indigo-900/60 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
            <Gift className="w-3.5 h-3.5" />
            Ethical Mastery & Gamification
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
            Badges & Achievements
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Earn distinct badges for moral consistency, streak milestones, accurate statutory citations, and complex ethical dilemma resolutions.
          </p>
        </div>

        <div className="p-4 bg-white/10 rounded-2xl border border-white/10 text-center shrink-0 min-w-[180px]">
          <span className="text-xs font-bold text-slate-300 block">Unlocked</span>
          <h3 className="text-2xl font-black text-amber-300 mt-1">
            {unlockedCount} / {badges.length}
          </h3>
          <span className="text-[10px] text-slate-300 font-medium">Achievements</span>
        </div>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {badges.map((badge) => {
          return (
            <div
              key={badge.id}
              onClick={() => {
                if (badge.unlocked) {
                  setUnlockedBadgeToCelebrate(badge);
                }
              }}
              className={`p-6 rounded-3xl border transition-all flex flex-col justify-between space-y-4 ${
                badge.unlocked
                  ? 'bg-white border-amber-200/80 shadow-2xs hover:shadow-md hover:border-amber-300 cursor-pointer'
                  : 'bg-slate-50 border-slate-200/60 opacity-60'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  {/* Glowing Icon Circle */}
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-xs ${
                      badge.unlocked
                        ? 'bg-gradient-to-tr from-amber-400 to-yellow-400 text-slate-950 ring-4 ring-amber-100'
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
                    className={`px-2.5 py-0.5 text-xs font-bold rounded-full ${
                      badge.unlocked
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-slate-200 text-slate-500'
                    }`}
                  >
                    {badge.unlocked ? 'Unlocked' : 'Locked'}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900 font-heading">
                    {badge.title}
                  </h3>
                  <p className="text-xs font-bold text-amber-700 mt-0.5">
                    +{badge.xpValue} XP
                  </p>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {badge.description}
                </p>

                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-[11px] text-slate-500">
                  <span className="font-semibold text-slate-700">Criteria:</span> {badge.criteria}
                </div>
              </div>

              {badge.unlocked && (
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-600">
                  <span>View Certificate</span>
                  <Sparkles className="w-4 h-4 text-amber-500" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
