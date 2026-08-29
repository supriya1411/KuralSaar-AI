import React from 'react';
import { Badge } from '../../types';
import { useApp } from '../../context/AppContext';
import { getLocalizedBadge } from '../../i18n/badgeLocalizations';
import { Award, Sparkles, X, CheckCircle } from 'lucide-react';

interface Props {
  badge: Badge | null;
  onClose: () => void;
}

export const BadgeUnlockModal: React.FC<Props> = ({ badge, onClose }) => {
  const { language, t } = useApp();
  if (!badge) return null;

  const localizedBadge = getLocalizedBadge(badge, language);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in zoom-in-95 duration-200">
      <div className="relative w-full max-w-md p-6 bg-gradient-to-b from-white to-slate-50 rounded-2xl shadow-2xl border border-amber-200 text-center space-y-5">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Glowing Badge Visual */}
        <div className="relative mx-auto w-24 h-24 flex items-center justify-center rounded-full bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-300 shadow-xl shadow-amber-300/50 ring-8 ring-amber-100/80 animate-bounce">
          <Award className="w-12 h-12 text-slate-900 drop-shadow-md" />
          <div className="absolute -top-1 -right-1 p-1 bg-indigo-600 rounded-full text-white shadow-md">
            <Sparkles className="w-4 h-4 text-amber-300" />
          </div>
        </div>

        <div className="space-y-1.5">
          <span className="px-3 py-1 text-xs font-extrabold uppercase tracking-widest text-amber-800 bg-amber-100 rounded-full font-tamil">
            {t('badgeUnlocked')}
          </span>
          <h3 className="text-xl font-bold text-slate-900 font-heading font-tamil">
            {localizedBadge.title}
          </h3>
          <p className="text-xs font-semibold text-indigo-600 font-tamil">
            {t('xpAwardedBadge').replace('{xp}', String(localizedBadge.xpValue || 100))}
          </p>
        </div>

        <p className="text-sm text-slate-600 leading-relaxed px-2 font-tamil">
          {localizedBadge.description}
        </p>

        <div className="p-3 bg-amber-50/80 border border-amber-200/60 rounded-xl text-left text-xs text-amber-900 flex items-start gap-2">
          <CheckCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div className="font-tamil">
            <span className="font-bold">{t('criteriaMet')}</span> {localizedBadge.criteria}
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 text-sm font-bold text-white bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 rounded-xl shadow-md transition-all active:scale-98 cursor-pointer font-tamil"
        >
          {t('collectRewardBtn')}
        </button>
      </div>
    </div>
  );
};
