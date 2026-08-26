import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Flame,
  Star,
  Scale,
  Menu,
  RotateCcw,
  Sparkles,
  Info,
  Search,
  Bell,
} from 'lucide-react';

interface Props {
  onMobileMenuToggle: () => void;
}

export const Header: React.FC<Props> = ({ onMobileMenuToggle }) => {
  const {
    activeTab,
    setActiveTab,
    userProgress,
    resetProgressToDemo,
    searchGlobalQuery,
    setSearchGlobalQuery,
    t,
  } = useApp();

  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotificationPopup, setShowNotificationPopup] = useState(false);

  // Dynamic Header Titles matching reference
  const getHeaderMeta = () => {
    switch (activeTab) {
      case 'dashboard':
        return {
          title: t('welcomeTitle'),
          subtitle: t('slogan'),
        };
      case 'scenario-challenge':
        return {
          title: 'Scenario Challenge',
          subtitle: 'Apply legal knowledge, ethics and Thirukkural wisdom to real-life situations.',
        };
      case 'kural-quest':
        return {
          title: 'Kural Quest',
          subtitle: 'Explore 1330 ethical couplets paired with modern legal jurisprudence.',
        };
      case 'ethics-library':
        return {
          title: 'Ethics Library',
          subtitle: 'Foundational categories of moral philosophy and classical Indian statecraft.',
        };
      case 'ai-tutor':
        return {
          title: 'AI Legal-Ethics Tutor',
          subtitle: 'Ask ethical dilemmas and examine legal-philosophical syntheses.',
        };
      case 'knowledge-graph':
        return {
          title: 'Interactive Knowledge Graph',
          subtitle: 'Explore dynamic connections between ethical concepts, Kurals, and legal statutes.',
        };
      case 'leaderboard':
        return {
          title: 'Ethics Leaderboard',
          subtitle: 'Compare ethical accuracy, streak milestones, and scenario mastery.',
        };
      case 'my-progress':
        return {
          title: 'My Progress & Analytics',
          subtitle: 'Track your skill improvements, accuracy rates, and learning curve.',
        };
      case 'rewards':
        return {
          title: 'Badges & Rewards',
          subtitle: 'Earn achievements, unlock badges, and certify your ethical reasoning.',
        };
      case 'discussion-forum':
        return {
          title: 'Discussion Forum',
          subtitle: 'Debate classical dilemmas and modern legal ethics with peers.',
        };
      default:
        return {
          title: 'KuralSaar AI',
          subtitle: 'Learn Law. Live Ethics. Think Responsibly.',
        };
    }
  };

  const headerMeta = getHeaderMeta();

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-8 shrink-0 z-20 sticky top-0">
      {/* Left: Mobile Toggle & Search / Title */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMobileMenuToggle}
          className="md:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg"
          aria-label="Toggle navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Sleek Search Input */}
        <div className="relative w-48 sm:w-72">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="w-4 h-4 text-slate-400" />
          </div>
          <input
            type="text"
            placeholder="Search law or ethics..."
            value={searchGlobalQuery}
            onChange={(e) => {
              setSearchGlobalQuery(e.target.value);
              if (activeTab !== 'kural-quest' && e.target.value.trim().length > 0) {
                setActiveTab('kural-quest');
              }
            }}
            className="block w-full pl-9 pr-3 py-1.5 border border-slate-200 rounded-lg bg-slate-50/80 text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all font-medium"
          />
        </div>
      </div>

      {/* Right: Notifications & Profile */}
      <div className="flex items-center gap-4 sm:gap-5">

        {/* Notifications Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotificationPopup(!showNotificationPopup)}
            className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg relative transition-colors"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-600 rounded-full ring-2 ring-white"></span>
          </button>

          {showNotificationPopup && (
            <div className="absolute right-0 mt-2 w-72 p-3 bg-white rounded-xl shadow-xl border border-slate-200 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 text-xs font-bold text-slate-800">
                <span>Recent Updates</span>
                <span className="text-[10px] text-blue-600 font-semibold">Updates</span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="p-2 bg-blue-50/70 rounded-lg text-blue-950 font-medium">
                  🎉 <strong>+100 XP Earned:</strong> Completed Scenario 3 "Conflict of Interest".
                </div>
                <div className="p-2 bg-amber-50/70 rounded-lg text-amber-950 font-medium">
                  🔥 <strong>Streak Maintained:</strong> 7 consecutive days of reflection.
                </div>
                <div className="p-2 bg-slate-50 rounded-lg text-slate-700">
                  📜 <strong>New Kural Linked:</strong> Kural 131 added to your notebook.
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Avatar */}
        <div className="relative">
          <div
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2 cursor-pointer select-none p-1 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-800 font-bold text-xs shrink-0">
              AK
            </div>
            <div className="hidden sm:flex flex-col text-left">
              <span className="text-xs font-bold text-slate-900 leading-tight">
                {userProgress.userName}
              </span>
              <span className="text-[10px] text-emerald-600 font-bold leading-tight">
                Online
              </span>
            </div>
          </div>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-60 p-3 bg-white rounded-xl shadow-xl border border-slate-200 z-50 animate-in fade-in zoom-in-95 duration-150 space-y-2">
              <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs">
                  ET
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{userProgress.userName}</h4>
                  <p className="text-[10px] text-slate-500">{userProgress.userRole} • Lvl {userProgress.level}</p>
                </div>
              </div>

              <div className="space-y-0.5 text-xs">
                <button
                  onClick={() => {
                    setActiveTab('my-progress');
                    setShowProfileMenu(false);
                  }}
                  className="w-full text-left px-2.5 py-1.5 rounded-md font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
                >
                  📊 View Skill Analytics
                </button>
                <button
                  onClick={() => {
                    setActiveTab('rewards');
                    setShowProfileMenu(false);
                  }}
                  className="w-full text-left px-2.5 py-1.5 rounded-md font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
                >
                  🏆 View Unlocked Badges
                </button>
                <button
                  onClick={() => {
                    setActiveTab('landing');
                    setShowProfileMenu(false);
                  }}
                  className="w-full text-left px-2.5 py-1.5 rounded-md font-medium text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  🌐 Visit Landing Page
                </button>
                <button
                  onClick={() => {
                    resetProgressToDemo();
                    setShowProfileMenu(false);
                  }}
                  className="w-full text-left px-2.5 py-1.5 rounded-md font-medium text-red-600 hover:bg-red-50 transition-colors flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3 h-3" />
                  Reset Demo Stats
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
