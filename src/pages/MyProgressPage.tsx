import React from 'react';
import { useApp } from '../context/AppContext';
import {
  LineChart,
  Award,
  Flame,
  Star,
  CheckCircle,
  Brain,
  Scale,
  Sparkles,
  Shield,
  TrendingUp,
  Clock,
  Calendar,
} from 'lucide-react';

export const MyProgressPage: React.FC = () => {
  const { userProgress, setActiveTab } = useApp();

  const xpForNextLevel = 2500;
  const currentXpInLevel = userProgress.xp;
  const levelPercentage = Math.min(100, Math.round((currentXpInLevel / xpForNextLevel) * 100));

  const weeklyActivity = [
    { day: 'Mon', count: 3, xp: 300 },
    { day: 'Tue', count: 2, xp: 200 },
    { day: 'Wed', count: 4, xp: 400 },
    { day: 'Thu', count: 1, xp: 100 },
    { day: 'Fri', count: 3, xp: 300 },
    { day: 'Sat', count: 5, xp: 520 },
    { day: 'Sun', count: 2, xp: 200 },
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto animate-in fade-in duration-200 pb-12">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 bg-white rounded-2xl border border-slate-200 shadow-2xs text-slate-900 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <img
            src={userProgress.avatarUrl}
            alt={userProgress.userName}
            className="w-20 h-20 rounded-full object-cover ring-4 ring-amber-400 shadow-md shrink-0"
          />
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-extrabold font-heading text-[#071B3A]">{userProgress.userName}</h2>
              <span className="px-2.5 py-0.5 text-xs font-black bg-amber-100 text-amber-900 border border-amber-300 rounded-full">
                Level {userProgress.level}
              </span>
            </div>
            <p className="text-xs text-blue-700 font-bold">{userProgress.userRole} • {userProgress.levelTitle}</p>
            <p className="text-xs text-slate-500 font-medium">Member since February 2025</p>
          </div>
        </div>

        {/* Level Progression meter */}
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 min-w-[240px]">
          <div className="flex justify-between text-xs font-bold">
            <span className="text-slate-700">Level {userProgress.level} → Level {userProgress.level + 1}</span>
            <span className="text-amber-600 font-black">{userProgress.xp} / {xpForNextLevel} XP</span>
          </div>
          <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-amber-400 rounded-full transition-all duration-500"
              style={{ width: `${levelPercentage}%` }}
            />
          </div>
          <p className="text-[10px] text-slate-500 text-right font-medium">
            {xpForNextLevel - currentXpInLevel} XP to reach "Master of Juristic Wisdom"
          </p>
        </div>
      </div>

      {/* 4 Summary Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs text-center space-y-1">
          <Star className="w-6 h-6 text-amber-500 fill-amber-500 mx-auto" />
          <span className="text-xs text-slate-500 font-bold block">Total XP</span>
          <h3 className="text-2xl font-black text-[#071B3A]">{userProgress.xp}</h3>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs text-center space-y-1">
          <Flame className="w-6 h-6 text-amber-500 fill-amber-500 mx-auto" />
          <span className="text-xs text-slate-500 font-bold block">Current Streak</span>
          <h3 className="text-2xl font-black text-amber-600">🔥 {userProgress.streakDays} Days</h3>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs text-center space-y-1">
          <CheckCircle className="w-6 h-6 text-emerald-600 mx-auto" />
          <span className="text-xs text-slate-500 font-bold block">Accuracy Rate</span>
          <h3 className="text-2xl font-black text-emerald-600">{userProgress.accuracyPercentage}%</h3>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs text-center space-y-1">
          <Award className="w-6 h-6 text-blue-600 mx-auto" />
          <span className="text-xs text-slate-500 font-bold block">Scenarios Solved</span>
          <h3 className="text-2xl font-black text-blue-600">
            {userProgress.casesCompleted} / {userProgress.totalCases}
          </h3>
        </div>
      </div>

      {/* Weekly Activity & Skill Radar Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Weekly Activity Bar Chart (md:col-span-7) */}
        <div className="md:col-span-7 p-6 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-[#071B3A] font-heading">
              Weekly Learning Activity
            </h3>
            <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" /> +35% vs last week
            </span>
          </div>

          <div className="pt-6 pb-2 flex items-end justify-between gap-3 h-48">
            {weeklyActivity.map((item) => {
              const maxXP = 600;
              const heightPercent = (item.xp / maxXP) * 100;
              const isToday = item.day === 'Sun';

              return (
                <div key={item.day} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                  <div className="text-[10px] font-extrabold text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.xp} XP
                  </div>
                  <div className="w-full max-w-[36px] bg-slate-100 rounded-t-xl h-full flex items-end p-1 border border-slate-200">
                    <div
                      style={{ height: `${heightPercent}%` }}
                      className={`w-full rounded-lg transition-all duration-500 ${
                        isToday
                          ? 'bg-[#071B3A]'
                          : 'bg-blue-300 group-hover:bg-blue-600'
                      }`}
                    />
                  </div>
                  <span className={`text-xs font-bold ${isToday ? 'text-blue-600 font-black' : 'text-slate-500'}`}>
                    {item.day}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Detailed Competency Matrix (md:col-span-5) */}
        <div className="md:col-span-5 p-6 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <h3 className="text-base font-extrabold text-[#071B3A] font-heading">
            Competency Breakdown
          </h3>

          <div className="space-y-3.5 text-xs">
            <div>
              <div className="flex justify-between font-bold text-slate-700 mb-1">
                <span>Legal Awareness</span>
                <span className="text-blue-600 font-extrabold">{userProgress.skills.legalAwareness}%</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 rounded-full" style={{ width: `${userProgress.skills.legalAwareness}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-bold text-slate-700 mb-1">
                <span>Ethical Reasoning</span>
                <span className="text-blue-700 font-extrabold">{userProgress.skills.ethicalReasoning}%</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: `${userProgress.skills.ethicalReasoning}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-bold text-slate-700 mb-1">
                <span>Conflict Resolution</span>
                <span className="text-amber-600 font-extrabold">{userProgress.skills.conflictResolution}%</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: `${userProgress.skills.conflictResolution}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-bold text-slate-700 mb-1">
                <span>Prosocial Decision Making</span>
                <span className="text-emerald-600 font-extrabold">{userProgress.skills.prosocialDecisionMaking}%</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${userProgress.skills.prosocialDecisionMaking}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-bold text-slate-700 mb-1">
                <span>Professional Ethics</span>
                <span className="text-purple-600 font-extrabold">{userProgress.skills.professionalEthics}%</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-purple-600 rounded-full" style={{ width: `${userProgress.skills.professionalEthics}%` }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
