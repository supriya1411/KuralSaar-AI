import React from 'react';
import { useApp } from '../../context/AppContext';
import { ActiveTab } from '../../types';
import { ThiruvalluvarAvatar } from '../common/ThiruvalluvarAvatar';
import {
  LayoutDashboard,
  Sparkles,
  Scale,
  BookOpen,
  Bot,
  Network,
  Trophy,
  LineChart,
  Gift,
  MessagesSquare,
  ChevronLeft,
  ChevronRight,
  Cpu,
  ExternalLink,
} from 'lucide-react';

import { Globe } from 'lucide-react';
import { Language } from '../../i18n/translations';

interface NavItem {
  id: ActiveTab;
  labelKey: string;
  icon: React.ElementType;
  badge?: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', labelKey: 'dashboard', icon: LayoutDashboard },
  { id: 'kural-quest', labelKey: 'kuralQuest', icon: Sparkles },
  { id: 'scenario-challenge', labelKey: 'scenarioChallenge', icon: Scale },
  { id: 'ethics-library', labelKey: 'ethicsLibrary', icon: BookOpen },
  { id: 'ai-tutor', labelKey: 'aiTutor', icon: Bot },
  { id: 'knowledge-graph', labelKey: 'knowledgeGraph', icon: Network },
  { id: 'leaderboard', labelKey: 'leaderboard', icon: Trophy },
  { id: 'my-progress', labelKey: 'myProgress', icon: LineChart },
  { id: 'rewards', labelKey: 'rewards', icon: Gift },
  { id: 'discussion-forum', labelKey: 'discussionForum', icon: MessagesSquare },
];

export const Sidebar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    isSidebarCollapsed,
    setIsSidebarCollapsed,
    openKuralModalByNumber,
    userProgress,
    language,
    setLanguage,
    t,
  } = useApp();

  return (
    <aside
      className={`relative flex flex-col justify-between h-screen bg-[#071B3A] text-slate-300 border-r border-[#1E3A8A]/40 transition-all duration-300 z-30 select-none shrink-0 ${
        isSidebarCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div className="p-5 flex items-center justify-between border-b border-slate-800/80 shrink-0">
        <div
          onClick={() => setActiveTab('dashboard')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          {/* Royal Blue Shield Logo Badge */}
          <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white text-lg shadow-md shadow-blue-950/50 group-hover:scale-105 transition-transform shrink-0">
            <Scale className="w-5 h-5 text-white" />
          </div>

          {!isSidebarCollapsed && (
            <div className="flex flex-col">
              <span className="text-white font-extrabold tracking-tight text-base leading-none font-heading">
                {t('appName')}
              </span>
              <span className="text-[10px] uppercase tracking-widest text-slate-400 font-extrabold mt-1">
                {t('tagline')}
              </span>
            </div>
          )}
        </div>

        {/* Collapse button (Desktop) */}
        <button
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          className="hidden md:flex p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors cursor-pointer"
          title={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isSidebarCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 py-4 px-3 space-y-1.5 overflow-y-auto custom-scrollbar">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          const isSocialHeader = item.id === 'leaderboard';
          const label = t(item.labelKey);

          return (
            <React.Fragment key={item.id}>
              {isSocialHeader && !isSidebarCollapsed && (
                <div className="mt-6 mb-2 px-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  {t('socialProgress')}
                </div>
              )}
              <button
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-150 group relative cursor-pointer ${
                  isActive
                    ? 'bg-[#1E3A8A] text-white shadow-md shadow-blue-950/50 font-extrabold border-l-4 border-blue-400'
                    : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
                }`}
                title={label}
              >
                <Icon
                  className={`w-4 h-4 shrink-0 transition-colors ${
                    isActive
                      ? 'text-blue-400'
                      : 'text-slate-400 group-hover:text-slate-200'
                  }`}
                />

                {!isSidebarCollapsed && (
                  <span className="truncate flex-1 text-left">{label}</span>
                )}

                {!isSidebarCollapsed && item.badge && (
                  <span
                    className={`ml-auto text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider ${
                      isActive
                        ? 'bg-amber-400 text-slate-950'
                        : item.badge.includes('RAG')
                        ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                        : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}

                {/* Collapsed Tooltip */}
                {isSidebarCollapsed && (
                  <div className="absolute left-full ml-2 px-2.5 py-1.5 bg-slate-900 text-white text-xs font-semibold rounded-md shadow-xl whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50">
                    {label}
                  </div>
                )}
              </button>
            </React.Fragment>
          );
        })}
      </nav>

      {/* Language Selector & Level XP Progress Card at Bottom of Left Sidebar */}
      {!isSidebarCollapsed && (
        <div className="mx-3 mb-3 space-y-2 shrink-0">
          {/* Language Switcher Bar (EN | TA | HI) */}
          <div className="p-2 bg-[#0A192F] rounded-xl border border-slate-700/70 space-y-1.5">
            <div className="flex items-center gap-1.5 text-[10px] font-extrabold text-slate-300 px-1">
              <Globe className="w-3 h-3 text-amber-400" />
              <span>{t('language')}</span>
            </div>
            <div className="grid grid-cols-3 gap-1 p-0.5 bg-slate-900/80 rounded-lg">
              <button
                onClick={() => setLanguage('en')}
                className={`py-1 text-[11px] font-extrabold rounded-md transition-all cursor-pointer ${
                  language === 'en'
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                English
              </button>
              <button
                onClick={() => setLanguage('ta')}
                className={`py-1 text-[11px] font-extrabold rounded-md transition-all cursor-pointer font-tamil ${
                  language === 'ta'
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                தமிழ்
              </button>
              <button
                onClick={() => setLanguage('hi')}
                className={`py-1 text-[11px] font-extrabold rounded-md transition-all cursor-pointer ${
                  language === 'hi'
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                हिंदी
              </button>
            </div>
          </div>

          {/* Level Progress */}
          <div className="p-3 bg-[#0A192F] rounded-xl border border-slate-700/70">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-extrabold text-white">{t('level')} {userProgress.level}</span>
              <span className="text-[10px] text-slate-400 font-bold">{userProgress.xp} / {userProgress.nextLevelXp} XP</span>
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 rounded-full transition-all duration-300"
                style={{
                  width: `${Math.min(100, Math.round((userProgress.xp / userProgress.nextLevelXp) * 100))}%`,
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Collapsed avatar & language footer */}
      {isSidebarCollapsed && (
        <div className="p-2 flex flex-col items-center gap-2 cursor-pointer border-t border-slate-800">
          <button
            onClick={() => setLanguage(language === 'en' ? 'ta' : language === 'ta' ? 'hi' : 'en')}
            className="p-1 text-xs font-bold text-amber-400 hover:text-white"
            title="Switch Language"
          >
            {language.toUpperCase()}
          </button>
          <div
            onClick={() => openKuralModalByNumber(131)}
            title="Today's Thirukkural (Kural 131)"
          >
            <ThiruvalluvarAvatar size={28} />
          </div>
        </div>
      )}
    </aside>
  );
};
