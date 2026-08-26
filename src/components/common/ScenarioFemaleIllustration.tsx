import React from 'react';

interface Props {
  className?: string;
}

export const ScenarioFemaleIllustration: React.FC<Props> = ({ className = '' }) => {
  return (
    <div className={`relative rounded-xl overflow-hidden border border-slate-200 shadow-xs ${className}`}>
      <img
        src="/assets/images/legal_courtroom.jpg"
        alt="Indian Courtroom & Legal Practice"
        className="w-full h-44 object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
      <div className="absolute bottom-2.5 left-3 right-3 text-white">
        <span className="text-[10px] font-black uppercase tracking-wider bg-amber-400 text-slate-950 px-2 py-0.5 rounded shadow-2xs">
          Interactive Case Simulation
        </span>
        <p className="text-xs font-bold text-white mt-1 drop-shadow-xs">
          Real-world courtroom & professional ethics dilemma
        </p>
      </div>
    </div>
  );
};
