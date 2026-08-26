import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { useApp } from '../../context/AppContext';
import { KuralDetailModal } from '../common/KuralDetailModal';
import { BadgeUnlockModal } from '../common/BadgeUnlockModal';
import { AlertCircle, X } from 'lucide-react';

interface Props {
  children: React.ReactNode;
}

export const AppLayout: React.FC<Props> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showBanner, setShowBanner] = useState(true);
  const {
    selectedKuralModal,
    setSelectedKuralModal,
    unlockedBadgeToCelebrate,
    setUnlockedBadgeToCelebrate,
    setSelectedScenarioNumber,
    setActiveTab,
    t,
  } = useApp();

  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex shrink-0">
        <Sidebar />
      </div>

      {/* Mobile Drawer Sidebar */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="relative z-10 flex flex-col h-full w-72 bg-[#0E1330] shadow-2xl">
            <Sidebar />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Educational Disclaimer Banner */}
        {showBanner && (
          <div className="bg-[#051329] text-white px-4 py-2 text-xs flex items-center justify-between border-b border-slate-800 shrink-0">
            <div className="flex items-center gap-3 max-w-5xl truncate">
              <span className="flex items-center justify-center px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider bg-amber-400 text-slate-950 rounded-md shrink-0">
                {t('educationalTag')}
              </span>
              <span className="truncate text-slate-200 font-medium text-xs">
                ⚖️ <strong>{t('educationalTag')}:</strong> {t('educationalBanner')}
              </span>
            </div>
            <button
              onClick={() => setShowBanner(false)}
              className="text-slate-400 hover:text-white p-1 ml-2 transition-colors"
              title="Dismiss banner"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Top Header */}
        <Header onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />

        {/* Scrollable Main View Container */}
        <main className="flex-1 overflow-y-auto custom-scrollbar p-4 sm:p-6 lg:p-8 bg-[#F4F6F9]">
          <div className="max-w-7xl mx-auto space-y-6">
            {children}
          </div>
        </main>
      </div>

      {/* Global Modals */}
      <KuralDetailModal
        kural={selectedKuralModal}
        onClose={() => setSelectedKuralModal(null)}
        onSelectScenario={(scenId) => {
          const num = parseInt(scenId.replace('scenario-', ''), 10) || 3;
          setSelectedScenarioNumber(num);
          setActiveTab('scenario-challenge');
        }}
      />

      <BadgeUnlockModal
        badge={unlockedBadgeToCelebrate}
        onClose={() => setUnlockedBadgeToCelebrate(null)}
      />
    </div>
  );
};
