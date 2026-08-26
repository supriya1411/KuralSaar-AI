import React from 'react';

interface Props {
  className?: string;
}

export const ScenarioFemaleIllustration: React.FC<Props> = ({ className = '' }) => {
  return (
    <div className={`relative flex items-center justify-center select-none overflow-hidden ${className}`}>
      <svg
        viewBox="0 0 400 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto max-h-56 drop-shadow-sm"
      >
        {/* Background Subtle Gradient Arch */}
        <path
          d="M60 220 C60 80, 340 80, 340 220"
          fill="#F5F3FF"
        />

        {/* Scales of Justice in the background */}
        <g opacity="0.35" transform="translate(260, 40) scale(0.7)">
          <line x1="60" y1="20" x2="60" y2="120" stroke="#6366F1" strokeWidth="4" strokeLinecap="round" />
          <line x1="20" y1="35" x2="100" y2="35" stroke="#6366F1" strokeWidth="4" strokeLinecap="round" />
          <circle cx="60" cy="18" r="6" fill="#6366F1" />
          {/* Left Pan */}
          <line x1="25" y1="35" x2="15" y2="70" stroke="#6366F1" strokeWidth="2" />
          <line x1="25" y1="35" x2="35" y2="70" stroke="#6366F1" strokeWidth="2" />
          <path d="M10 70 Q25 85 40 70 Z" fill="#818CF8" />
          {/* Right Pan */}
          <line x1="95" y1="35" x2="85" y2="70" stroke="#6366F1" strokeWidth="2" />
          <line x1="95" y1="35" x2="105" y2="70" stroke="#6366F1" strokeWidth="2" />
          <path d="M80 70 Q95 85 110 70 Z" fill="#818CF8" />
          {/* Base */}
          <ellipse cx="60" cy="120" rx="24" ry="6" fill="#6366F1" />
        </g>

        {/* Office Bookshelf subtle outline */}
        <g opacity="0.25" transform="translate(300, 70)">
          <rect x="0" y="0" width="60" height="90" fill="none" stroke="#64748B" strokeWidth="2" rx="4" />
          <line x1="0" y1="30" x2="60" y2="30" stroke="#64748B" strokeWidth="2" />
          <line x1="0" y1="60" x2="60" y2="60" stroke="#64748B" strokeWidth="2" />
          <rect x="8" y="8" width="8" height="22" fill="#818CF8" rx="1" />
          <rect x="18" y="12" width="7" height="18" fill="#C7D2FE" rx="1" />
          <rect x="28" y="6" width="9" height="24" fill="#6366F1" rx="1" />
          <rect x="12" y="36" width="10" height="24" fill="#A78BFA" rx="1" />
          <rect x="24" y="38" width="8" height="22" fill="#C4B5FD" rx="1" />
        </g>

        {/* Office Chair Backrest */}
        <rect x="195" y="70" width="85" height="110" rx="16" fill="#4338CA" />
        <rect x="202" y="76" width="71" height="98" rx="12" fill="#3730A3" />

        {/* Law Student / Lawyer (Anita) Character */}
        {/* Hair Back */}
        <ellipse cx="238" cy="100" rx="34" ry="42" fill="#1E293B" />
        
        {/* Torso / Black Advocate Blazer */}
        <path
          d="M195 190 C195 140, 280 140, 280 190 L290 230 L185 230 Z"
          fill="#0F172A"
        />

        {/* White Shirt / Neck Collar */}
        <polygon points="230,135 245,135 250,165 238,180 225,165" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
        <polygon points="234,140 241,140 244,175 238,180 231,175" fill="#E2E8F0" />
        {/* White Advocate Bands (Advocate Neckband) */}
        <rect x="233" y="150" width="5" height="18" fill="#FFFFFF" rx="1" />
        <rect x="239" y="150" width="5" height="18" fill="#FFFFFF" rx="1" />

        {/* Black Blazer Lapels */}
        <polygon points="208,145 228,180 216,190 200,165" fill="#1E293B" />
        <polygon points="268,145 248,180 260,190 276,165" fill="#1E293B" />

        {/* Head & Neck */}
        <rect x="231" y="120" width="14" height="18" fill="#FED7AA" rx="4" />
        <ellipse cx="238" cy="102" rx="20" ry="24" fill="#FFEDD5" />

        {/* Face Features */}
        {/* Eyebrows */}
        <path d="M225 94 Q230 91 234 94" stroke="#334155" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        <path d="M242 94 Q246 91 251 94" stroke="#334155" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        {/* Eyes (Thoughtful expression) */}
        <ellipse cx="229" cy="99" rx="2.5" ry="3" fill="#0F172A" />
        <ellipse cx="247" cy="99" rx="2.5" ry="3" fill="#0F172A" />
        <circle cx="230" cy="98" r="0.8" fill="#FFFFFF" />
        <circle cx="248" cy="98" r="0.8" fill="#FFFFFF" />
        {/* Nose */}
        <path d="M238 98 L236 106 L240 107" stroke="#FDBA74" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        {/* Gentle Thoughtful Lips */}
        <path d="M234 114 Q238 116 242 114" stroke="#E11D48" strokeWidth="1.8" strokeLinecap="round" fill="none" />

        {/* Hair Front Styling (Long black hair parting) */}
        <path
          d="M218 95 C218 80, 258 80, 258 95 C258 90, 252 82, 238 82 C224 82, 218 90, 218 95 Z"
          fill="#0F172A"
        />
        {/* Hair lock on side */}
        <path
          d="M218 92 C214 105, 215 125, 222 135 C220 120, 220 105, 224 95 Z"
          fill="#0F172A"
        />
        <path
          d="M258 92 C262 105, 261 125, 254 135 C256 120, 256 105, 252 95 Z"
          fill="#0F172A"
        />

        {/* Hand resting on Chin in Thought */}
        <path
          d="M230 118 C232 116, 236 116, 238 122 C236 130, 228 140, 222 148 L212 142 C218 132, 226 124, 230 118 Z"
          fill="#FFEDD5"
          stroke="#FDBA74"
          strokeWidth="0.8"
        />

        {/* Wooden Office Desk */}
        <path
          d="M90 200 L350 200 L370 230 L70 230 Z"
          fill="#854D0E"
        />
        {/* Desk highlight */}
        <line x1="70" y1="202" x2="370" y2="202" stroke="#A16207" strokeWidth="3" />

        {/* Laptop on Desk */}
        <g transform="translate(130, 155)">
          {/* Screen */}
          <rect x="10" y="5" width="70" height="42" rx="4" fill="#334155" />
          <rect x="13" y="8" width="64" height="36" rx="2" fill="#1E293B" />
          {/* Code / Legal Brief & Scale Icon on Laptop Screen */}
          <g transform="translate(38, 16) scale(0.28)">
            <line x1="30" y1="5" x2="30" y2="50" stroke="#818CF8" strokeWidth="4" />
            <line x1="10" y1="15" x2="50" y2="15" stroke="#818CF8" strokeWidth="4" />
            <path d="M5 30 Q15 40 25 30 Z" fill="#A5B4FC" />
            <path d="M35 30 Q45 40 55 30 Z" fill="#A5B4FC" />
          </g>
          {/* Base */}
          <path d="M0 48 L90 48 L80 54 L10 54 Z" fill="#94A3B8" />
          <rect x="36" y="49" width="18" height="2" fill="#64748B" rx="1" />
        </g>
      </svg>
    </div>
  );
};
