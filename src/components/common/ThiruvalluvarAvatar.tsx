import React from 'react';

interface Props {
  className?: string;
  size?: number;
}

export const ThiruvalluvarAvatar: React.FC<Props> = ({ className = '', size = 80 }) => {
  return (
    <div className={`relative flex items-center justify-center select-none ${className}`} style={{ width: size, height: size }}>
      <svg
        viewBox="0 0 120 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-sm"
      >
        {/* Subtle halo glow */}
        <circle cx="60" cy="45" r="32" fill="#FEF3C7" fillOpacity="0.6" />
        
        {/* Hair Bun / Kudumi */}
        <ellipse cx="60" cy="18" rx="14" ry="12" fill="#4B5563" />
        <ellipse cx="60" cy="20" rx="11" ry="9" fill="#1F2937" />
        
        {/* Head */}
        <circle cx="60" cy="42" r="18" fill="#FDE68A" />
        
        {/* Beard & Moustache */}
        <path
          d="M48 44 C48 64, 72 64, 72 44 C68 56, 52 56, 48 44 Z"
          fill="#F3F4F6"
          stroke="#D1D5DB"
          strokeWidth="1.5"
        />
        <path
          d="M52 60 C56 74, 64 74, 68 60 C64 68, 56 68, 52 60 Z"
          fill="#E5E7EB"
        />
        
        {/* Eyes & Tilak (Vibhuti / Mark) */}
        <line x1="56" y1="33" x2="64" y2="33" stroke="#D97706" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="60" cy="35" r="1.5" fill="#DC2626" />
        <path d="M52 38 Q55 36 58 38" stroke="#1F2937" strokeWidth="1.2" fill="none" />
        <path d="M62 38 Q65 36 68 38" stroke="#1F2937" strokeWidth="1.2" fill="none" />
        
        {/* White Robe (Vetti / Shawl) */}
        <path
          d="M32 80 C32 68, 48 64, 60 64 C72 64, 88 68, 88 80 L96 126 C96 132, 24 132, 24 126 Z"
          fill="#FFFFFF"
          stroke="#E5E7EB"
          strokeWidth="2"
        />
        {/* Shawl folds */}
        <path
          d="M36 78 Q50 95 60 120"
          stroke="#CBD5E1"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M84 78 Q70 95 60 120"
          stroke="#CBD5E1"
          strokeWidth="1.5"
          fill="none"
        />

        {/* Crossed Legs (Padmasana Base) */}
        <path
          d="M18 122 C18 116, 102 116, 102 122 C102 134, 18 134, 18 122 Z"
          fill="#F8FAFC"
          stroke="#CBD5E1"
          strokeWidth="1.5"
        />

        {/* Palm Leaf Manuscript (Olai Chuvadi) */}
        <rect
          x="38"
          y="98"
          width="44"
          height="12"
          rx="2"
          fill="#FBBF24"
          stroke="#D97706"
          strokeWidth="1"
          transform="rotate(-5 60 104)"
        />
        <line x1="42" y1="102" x2="78" y2="102" stroke="#92400E" strokeWidth="0.8" strokeDasharray="2 1" />
        <line x1="42" y1="106" x2="78" y2="106" stroke="#92400E" strokeWidth="0.8" strokeDasharray="2 1" />

        {/* Writing Stylus (Ezhuthani) in right hand */}
        <line x1="72" y1="92" x2="82" y2="104" stroke="#4B5563" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
  );
};
