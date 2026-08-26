import React from 'react';

interface Props {
  className?: string;
  size?: number;
}

export const ThiruvalluvarAvatar: React.FC<Props> = ({ className = '', size = 80 }) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 rounded-full overflow-hidden border-2 border-amber-400 shadow-xs ${className}`}
      style={{ width: size, height: size }}
    >
      <img
        src="/assets/images/thiruvalluvar_statue.jpg"
        alt="Thiruvalluvar Statue & Law Books"
        className="w-full h-full object-cover object-top"
      />
    </div>
  );
};
