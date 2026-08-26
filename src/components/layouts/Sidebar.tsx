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
                JUSTICE AI
              </span>
              <span className="text-[10px] uppercase tracking-widest text-slate-400 font-extrabold mt-1">
                Legal & Ethics
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

          return (
            <React.Fragment key={item.id}>
              {isSocialHeader && !isSidebarCollapsed && (
                <div className="mt-6 mb-2 px-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Social & Progress
                </div>
              )}
              <button
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-150 group relative cursor-pointer ${
                  isActive
                    ? 'bg-[#1E3A8A] text-white shadow-md shadow-blue-950/50 font-extrabold border-l-4 border-blue-400'
                    : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
                }`}
                title={item.label}
              >
                <Icon
                  className={`w-4 h-4 shrink-0 transition-colors ${
                    isActive
                      ? 'text-blue-400'
                      : 'text-slate-400 group-hover:text-slate-200'
                  }`}
                />

                {!isSidebarCollapsed && (
                  <span className="truncate flex-1 text-left">{item.label}</span>
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
        <div className="p-3.5 bg-[#0A192F] m-3 rounded-xl border border-slate-700/70 shrink-0">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-extrabold text-white">Level {userProgress.level}</span>
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
          <p className="text-[10px] mt-2 text-center text-slate-400 font-bold italic">
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
