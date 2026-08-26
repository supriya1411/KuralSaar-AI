import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProgress, ActiveTab, Kural, Badge } from '../types';
import { progressService } from '../services/progressService';
import { kuralService } from '../services/kuralService';
import confetti from 'canvas-confetti';

interface AppContextType {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  selectedScenarioNumber: number;
  setSelectedScenarioNumber: (num: number) => void;
  userProgress: UserProgress;
  setUserProgress: React.Dispatch<React.SetStateAction<UserProgress>>;
  solveScenario: (
    scenarioId: string,
    scenarioNumber: number,
    optionId: 'A' | 'B' | 'C' | 'D',
    isCorrect: boolean,
    xpReward: number
  ) => void;
  isSidebarCollapsed: boolean;
  setIsSidebarCollapsed: (val: boolean) => void;
  selectedKuralModal: Kural | null;
  setSelectedKuralModal: (kural: Kural | null) => void;
  openKuralModalByNumber: (num: number) => Promise<void>;
  unlockedBadgeToCelebrate: Badge | null;
  setUnlockedBadgeToCelebrate: (badge: Badge | null) => void;
  resetProgressToDemo: () => void;
  searchGlobalQuery: string;
  setSearchGlobalQuery: (query: string) => void;
  refreshUserProgress: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [selectedScenarioNumber, setSelectedScenarioNumber] = useState<number>(3); // Matches reference Scenario 3
  const [userProgress, setUserProgress] = useState<UserProgress>(() => progressService.getUserProgress());
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [selectedKuralModal, setSelectedKuralModal] = useState<Kural | null>(null);
  const [unlockedBadgeToCelebrate, setUnlockedBadgeToCelebrate] = useState<Badge | null>(null);
  const [searchGlobalQuery, setSearchGlobalQuery] = useState<string>('');

  const refreshUserProgress = async () => {
    const serverProgress = await progressService.fetchServerProgress();
    if (serverProgress) {
      setUserProgress(serverProgress);
    }
  };

  // Initial sync with backend server
  useEffect(() => {
    refreshUserProgress();
  }, []);

  // Persist user progress locally and sync with server
  useEffect(() => {
    progressService.saveUserProgress(userProgress);
    // Send background sync to server
    try {
      fetch('/api/progress/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userProgress),
      }).catch(() => {});
    } catch {
      // Ignore background sync errors
    }
  }, [userProgress]);

  const openKuralModalByNumber = async (num: number) => {
    const k = await kuralService.getKuralByNumber(num);
    if (k) {
      setSelectedKuralModal(k);
    }
  };

  const solveScenario = (
    scenarioId: string,
    scenarioNumber: number,
    optionId: 'A' | 'B' | 'C' | 'D',
    isCorrect: boolean,
    xpReward: number
  ) => {
    // Record submission with server
    try {
      fetch('/api/progress/attempt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scenarioId,
          scenarioNumber,
          selectedOption: optionId,
          isCorrect,
          xpEarned: isCorrect ? xpReward : 10,
        }),
      }).catch(() => {});
    } catch {
      // ignore
    }

    setUserProgress((prev) => {
      const alreadySolved = prev.solvedScenarioIds.includes(scenarioId);
      const newAnswers = { ...prev.scenarioAnswers, [scenarioId]: optionId };
      const newSolvedIds = alreadySolved ? prev.solvedScenarioIds : [...prev.solvedScenarioIds, scenarioId];
      const addedXp = alreadySolved ? 20 : xpReward;
      const newXp = prev.xp + (isCorrect ? addedXp : 10);

      // Level calculation
      let newLevel = prev.level;
      let newTitle = prev.levelTitle;
      if (newXp >= 3000) {
        newLevel = 9;
        newTitle = 'Justice Defender';
      } else if (newXp >= 2500) {
        newLevel = 8;
        newTitle = 'Case Analyst';
      } else if (newXp >= 2000) {
        newLevel = 7;
        newTitle = 'Legal Explorer';
      } else if (newXp >= 1500) {
        newLevel = 6;
        newTitle = 'Ethics Seeker';
      }

      // Check badge unlock
      const newBadges = [...prev.unlockedBadgeIds];
      if (newSolvedIds.length >= 3 && !newBadges.includes('badge-case-solver')) {
        newBadges.push('badge-case-solver');
      }
      if (newSolvedIds.length >= 5 && !newBadges.includes('badge-critical-thinker')) {
        newBadges.push('badge-critical-thinker');
      }

      // Trigger Confetti
      if (isCorrect) {
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#6366f1', '#a855f7', '#fbbf24', '#10b981'],
          });
        } catch {
          // ignore
        }
      }

      return {
        ...prev,
        xp: newXp,
        level: newLevel,
        levelTitle: newTitle,
        casesCompleted: newSolvedIds.length,
        solvedScenarioIds: newSolvedIds,
        scenarioAnswers: newAnswers,
        unlockedBadgeIds: newBadges,
        skills: {
          ...prev.skills,
          ethicalReasoning: Math.min(100, prev.skills.ethicalReasoning + (isCorrect ? 3 : 1)),
          legalAwareness: Math.min(100, prev.skills.legalAwareness + (isCorrect ? 2 : 1)),
          decisionMaking: Math.min(100, (prev.skills.prosocialDecisionMaking || 70) + 2),
        },
      };
    });
  };

  const resetProgressToDemo = () => {
    localStorage.removeItem('justice_ai_user_progress_v1');
    setUserProgress(progressService.getUserProgress());
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        selectedScenarioNumber,
        setSelectedScenarioNumber,
        userProgress,
        setUserProgress,
        solveScenario,
        isSidebarCollapsed,
        setIsSidebarCollapsed,
        selectedKuralModal,
        setSelectedKuralModal,
        openKuralModalByNumber,
        unlockedBadgeToCelebrate,
        setUnlockedBadgeToCelebrate,
        resetProgressToDemo,
        searchGlobalQuery,
        setSearchGlobalQuery,
        refreshUserProgress,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
