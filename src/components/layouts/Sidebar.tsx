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

interface NavItem {
  id: ActiveTab;
  label: string;
  icon: React.ElementType;
  badge?: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'kural-quest', label: 'Kural Quest', icon: Sparkles },
  { id: 'scenario-challenge', label: 'Scenario Challenge', icon: Scale },
  { id: 'ethics-library', label: 'Ethics Library', icon: BookOpen },
  { id: 'ai-tutor', label: 'AI Legal-Ethics Tutor', icon: Bot },
  { id: 'research-demo', label: 'Pipeline Inspector', icon: Cpu },
  { id: 'knowledge-graph', label: 'Knowledge Graph', icon: Network },
  { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
  { id: 'my-progress', label: 'My Progress', icon: LineChart },
  { id: 'rewards', label: 'Rewards', icon: Gift },
  { id: 'discussion-forum', label: 'Discussion Forum', icon: MessagesSquare },
];

export const Sidebar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    isSidebarCollapsed,
    setIsSidebarCollapsed,
    openKuralModalByNumber,
    userProgress,
  } = useApp();

  return (
    <aside
      className={`relative flex flex-col justify-between h-screen bg-[#0F172A] text-slate-300 border-r border-slate-800 transition-all duration-300 z-30 select-none shrink-0 ${
        isSidebarCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div className="p-5 flex items-center justify-between border-b border-slate-800 shrink-0">
        <div
          onClick={() => setActiveTab('landing')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          {/* Indigo Brand Badge */}
          <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center font-bold text-white text-lg italic shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform shrink-0">
            J
          </div>

          {!isSidebarCollapsed && (
            <div className="flex flex-col">
              <span className="text-white font-bold tracking-tight text-base leading-none">
                JUSTICE AI
              </span>
              <span className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold mt-1">
                Legal & Ethics
              </span>
            </div>
          )}
        </div>

        {/* Collapse button (Desktop) */}
        <button
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          className="hidden md:flex p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
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
      <nav className="flex-1 py-3 px-3 space-y-1 overflow-y-auto custom-scrollbar">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          // Social category divider before Leaderboard
          const isSocialHeader = item.id === 'leaderboard';

          return (
            <React.Fragment key={item.id}>
              {isSocialHeader && !isSidebarCollapsed && (
                <div className="mt-5 mb-2 px-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  Social & Progress
                </div>
              )}
              <button
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-md font-medium text-xs sm:text-sm transition-all duration-150 group relative ${
                  isActive
                    ? 'bg-indigo-600/10 text-indigo-400 border-l-4 border-indigo-500 font-semibold pl-2'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
                title={item.label}
              >
                <Icon
                  className={`w-4 h-4 shrink-0 transition-transform ${
                    isActive
                      ? 'text-indigo-400'
                      : 'text-slate-400 group-hover:text-slate-200'
                  }`}
                />

                {!isSidebarCollapsed && (
                  <span className="truncate flex-1 text-left">{item.label}</span>
                )}

                {!isSidebarCollapsed && item.badge && (
                  <span
                    className={`ml-auto text-[9px] px-1.5 py-0.5 rounded font-semibold uppercase tracking-wider ${
                      isActive
                        ? 'bg-indigo-500 text-white'
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
                    {item.label}
                  </div>
                )}
              </button>
            </React.Fragment>
          );
        })}
      </nav>

      {/* Level XP Progress Card in Sidebar */}
      {!isSidebarCollapsed && (
        <div className="p-3.5 bg-slate-800/30 m-3 rounded-xl border border-slate-800/60 shrink-0">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-semibold text-slate-200">Level {userProgress.level}</span>
            <span className="text-[10px] text-slate-400">{userProgress.xp} / {userProgress.nextLevelXp} XP</span>
          </div>
          <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-500 transition-all duration-300"
              style={{
                width: `${Math.min(100, Math.round((userProgress.xp / userProgress.nextLevelXp) * 100))}%`,
              }}
            />
          </div>
          <p className="text-[10px] mt-2 text-center text-slate-400 italic">
            {userProgress.levelTitle}
          </p>
        </div>
      )}

      {/* Collapsed avatar footer */}
      {isSidebarCollapsed && (
        <div
          onClick={() => openKuralModalByNumber(131)}
          className="p-3 flex justify-center cursor-pointer hover:bg-slate-800 transition-colors"
          title="Today's Thirukkural (Kural 131)"
        >
          <ThiruvalluvarAvatar size={32} />
        </div>
      )}
    </aside>
  );
};
