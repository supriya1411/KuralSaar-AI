import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { LeaderboardUser } from '../types';
import { progressService } from '../services/progressService';
import {
  Trophy,
  Medal,
  Flame,
  Star,
  Award,
  Crown,
  Sparkles,
  TrendingUp,
} from 'lucide-react';

export const LeaderboardPage: React.FC = () => {
  const { userProgress } = useApp();
  const [timeframe, setTimeframe] = useState<'weekly' | 'monthly' | 'allTime'>('weekly');
  const [leaders, setLeaders] = useState<LeaderboardUser[]>([]);

  useEffect(() => {
    const load = async () => {
      const data = await progressService.getLeaderboard(timeframe);
      setLeaders(data);
    };
    load();
  }, [timeframe]);

  const top3 = leaders.slice(0, 3);
  const rest = leaders.slice(3);

  return (
    <div className="space-y-8 max-w-5xl mx-auto animate-in fade-in duration-200 pb-12">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 bg-white rounded-2xl border border-slate-200 shadow-2xs text-slate-900 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black bg-amber-100 text-amber-900 border border-amber-300">
            <Trophy className="w-3.5 h-3.5 text-amber-600" />
            National Ethics Standings
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-[#071B3A]">
            Leaderboard
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed font-medium">
            Recognizing law students, advocates, and ethical learners with exceptional reasoning accuracy and continuous practice streaks.
          </p>
        </div>

        {/* Timeframe selector tabs */}
        <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200 shrink-0">
          {(['weekly', 'monthly', 'allTime'] as const).map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-4 py-2 rounded-lg text-xs font-bold capitalize transition-all cursor-pointer ${
                timeframe === tf
                  ? 'bg-[#071B3A] text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tf === 'allTime' ? 'All Time' : tf}
            </button>
          ))}
        </div>
      </div>

      {/* Top 3 Podium Cards */}
      {top3.length >= 3 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-end pt-4">
          {/* 2nd Place (Silver) */}
          <div className="order-2 md:order-1 p-6 bg-white rounded-2xl border border-slate-200 shadow-2xs text-center space-y-3 relative md:h-72 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="relative mx-auto w-16 h-16">
                <img
                  src={top3[1].avatarUrl}
                  alt={top3[1].name}
                  className="w-full h-full rounded-full object-cover ring-4 ring-slate-300"
                />
                <div className="absolute -bottom-2 -right-1 w-7 h-7 bg-slate-500 text-white font-black rounded-full flex items-center justify-center text-xs shadow-md">
                  2
                </div>
              </div>
              <h4 className="text-sm font-extrabold text-[#071B3A] font-heading">{top3[1].name}</h4>
              <p className="text-[11px] text-slate-500 font-medium">{top3[1].title}</p>
            </div>
            <div className="p-2.5 bg-slate-50 rounded-xl flex justify-around text-xs font-bold text-slate-800 border border-slate-200">
              <span>⭐ {top3[1].xp} XP</span>
              <span>🎯 {top3[1].accuracy}%</span>
            </div>
          </div>

          {/* 1st Place (Gold / Crown) */}
          <div className="order-1 md:order-2 p-6 bg-amber-50/70 rounded-2xl border-2 border-amber-400 shadow-md text-center space-y-3 relative md:h-80 flex flex-col justify-between scale-105 z-10">
            <div className="space-y-2">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <Crown className="w-8 h-8 text-amber-500 fill-amber-400 drop-shadow-md" />
              </div>
              <div className="relative mx-auto w-20 h-20 pt-2">
                <img
                  src={top3[0].avatarUrl}
                  alt={top3[0].name}
                  className="w-full h-full rounded-full object-cover ring-4 ring-amber-400 shadow-md"
                />
                <div className="absolute -bottom-2 -right-1 w-7 h-7 bg-amber-500 text-slate-950 font-black rounded-full flex items-center justify-center text-xs shadow-md">
                  1
                </div>
              </div>
              <h4 className="text-base font-black text-[#071B3A] font-heading">{top3[0].name}</h4>
              <p className="text-xs text-amber-900 font-bold">{top3[0].title}</p>
            </div>
            <div className="p-3 bg-amber-100 border border-amber-300 rounded-xl flex justify-around text-xs font-black text-amber-950">
              <span>⭐ {top3[0].xp} XP</span>
              <span>🔥 {top3[0].streak} Days</span>
              <span>🎯 {top3[0].accuracy}%</span>
            </div>
          </div>

          {/* 3rd Place (Bronze) */}
          <div className="order-3 p-6 bg-white rounded-2xl border border-slate-200 shadow-2xs text-center space-y-3 relative md:h-72 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="relative mx-auto w-16 h-16">
                <img
                  src={top3[2].avatarUrl}
                  alt={top3[2].name}
                  className="w-full h-full rounded-full object-cover ring-4 ring-amber-700/40"
                />
                <div className="absolute -bottom-2 -right-1 w-7 h-7 bg-amber-700 text-white font-black rounded-full flex items-center justify-center text-xs shadow-md">
                  3
                </div>
              </div>
              <h4 className="text-sm font-extrabold text-[#071B3A] font-heading">{top3[2].name}</h4>
              <p className="text-[11px] text-slate-500 font-medium">{top3[2].title}</p>
            </div>
            <div className="p-2.5 bg-slate-50 rounded-xl flex justify-around text-xs font-bold text-slate-800 border border-slate-200">
              <span>⭐ {top3[2].xp} XP</span>
              <span>🎯 {top3[2].accuracy}%</span>
            </div>
          </div>
        </div>
      )}

      {/* Leaderboard Table (Ranks 4..10) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-sm font-extrabold text-[#071B3A] font-heading">
            Full Rankings
          </h3>
          <span className="text-xs text-slate-500 font-medium">
            Your Rank: <strong className="text-blue-600 font-bold">#4 ({userProgress.userName})</strong>
          </span>
        </div>

        <div className="divide-y divide-slate-100 overflow-x-auto">
          {leaders.map((user) => {
            const isCurrentUser = user.id === 'user-1';

            return (
              <div
                key={user.id}
                className={`p-4 flex items-center justify-between gap-4 transition-colors ${
                  isCurrentUser
                    ? 'bg-blue-50/70 border-l-4 border-blue-600'
                    : 'hover:bg-slate-50'
                }`}
              >
                {/* Rank & User Info */}
                <div className="flex items-center gap-4 min-w-[200px]">
                  <span
                    className={`w-7 text-center text-xs font-black ${
                      user.rank <= 3 ? 'text-amber-500' : 'text-slate-400'
                    }`}
                  >
                    #{user.rank}
                  </span>

                  <img
                    src={user.avatarUrl}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover ring-1 ring-slate-200"
                  />

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-slate-900">{user.name}</span>
                      {isCurrentUser && (
                        <span className="px-2 py-0.2 text-[10px] font-black bg-[#071B3A] text-white rounded-full">
                          You
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-slate-500 font-medium">{user.title}</span>
                  </div>
                </div>

                {/* Accuracy */}
                <div className="hidden sm:flex flex-col items-center">
                  <span className="text-xs font-black text-emerald-600">{user.accuracy}%</span>
                  <span className="text-[10px] text-slate-400 font-bold">Accuracy</span>
                </div>

                {/* Streak */}
                <div className="hidden sm:flex items-center gap-1 text-xs font-bold text-amber-600">
                  <Flame className="w-4 h-4 fill-amber-500 text-amber-500" />
                  {user.streak}d
                </div>

                {/* XP Score */}
                <div className="text-right">
                  <span className="text-sm font-black text-[#071B3A]">{user.xp}</span>
                  <span className="text-[10px] text-slate-400 font-bold block">XP</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
