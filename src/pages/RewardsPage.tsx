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
    <div className="space-y-8 max-w-5xl mx-auto animate-in fade-in duration-200 pb-12">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 bg-white rounded-2xl border border-slate-200 shadow-2xs text-slate-900 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black bg-amber-100 text-amber-900 border border-amber-300">
            <Gift className="w-3.5 h-3.5 text-amber-600" />
            Ethical Mastery & Gamification
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-[#071B3A]">
            Badges & Achievements
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed font-medium">
            Earn distinct badges for moral consistency, streak milestones, accurate statutory citations, and complex ethical dilemma resolutions.
          </p>
        </div>

        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center shrink-0 min-w-[180px]">
          <span className="text-xs font-bold text-slate-500 block">Unlocked</span>
          <h3 className="text-2xl font-black text-amber-600 mt-1">
            {unlockedCount} / {badges.length}
          </h3>
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Achievements</span>
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
                    {badge.unlocked ? 'Unlocked' : 'Locked'}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-extrabold text-[#071B3A] font-heading">
                    {badge.title}
                  </h3>
                  <p className="text-xs font-black text-amber-600 mt-0.5">
                    +{badge.xpValue} XP
                  </p>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  {badge.description}
                </p>

                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-600">
                  <span className="font-bold text-slate-800">Criteria:</span> {badge.criteria}
                </div>
              </div>

              {badge.unlocked && (
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600">
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
