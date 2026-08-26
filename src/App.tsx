import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { AppLayout } from './components/layouts/AppLayout';
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { ScenarioChallengePage } from './pages/ScenarioChallengePage';
import { KuralQuestPage } from './pages/KuralQuestPage';
import { AiTutorPage } from './pages/AiTutorPage';
import { ResearchDemoPage } from './pages/ResearchDemoPage';
import { KnowledgeGraphPage } from './pages/KnowledgeGraphPage';
import { EthicsLibraryPage } from './pages/EthicsLibraryPage';
import { LeaderboardPage } from './pages/LeaderboardPage';
import { MyProgressPage } from './pages/MyProgressPage';
import { RewardsPage } from './pages/RewardsPage';
import { DiscussionForumPage } from './pages/DiscussionForumPage';

const MainContent: React.FC = () => {
  const { activeTab } = useApp();

  const renderView = () => {
    switch (activeTab) {
      case 'landing':
        return <LandingPage />;
      case 'dashboard':
        return <DashboardPage />;
      case 'scenario-challenge':
        return <ScenarioChallengePage />;
      case 'kural-quest':
        return <KuralQuestPage />;
      case 'ai-tutor':
        return <AiTutorPage />;
      case 'research-demo':
        return <ResearchDemoPage />;
      case 'knowledge-graph':
        return <KnowledgeGraphPage />;
      case 'ethics-library':
        return <EthicsLibraryPage />;
      case 'leaderboard':
        return <LeaderboardPage />;
      case 'my-progress':
        return <MyProgressPage />;
      case 'rewards':
        return <RewardsPage />;
      case 'discussion-forum':
        return <DiscussionForumPage />;
      default:
        return <DashboardPage />;
    }
  };

  return <AppLayout>{renderView()}</AppLayout>;
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
