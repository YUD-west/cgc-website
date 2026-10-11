import React from 'react';

interface CGCLogoProps {
  variant?: 'full' | 'compact' | 'symbol' | 'badge';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  theme?: 'dark' | 'light' | 'monochrome';
  className?: string;
  showTagline?: boolean;
}

export const CGCLogo: React.FC<CGCLogoProps> = ({
  variant = 'full',
  size = 'md',
  theme = 'dark',
  className = '',
  showTagline = true,
}) => {
  // Dimension tokens
  const symbolSizes = {
    sm: { width: 32, height: 32 },
    md: { width: 42, height: 42 },
    lg: { width: 54, height: 54 },
    xl: { width: 72, height: 72 },
  };

  const { width, height } = symbolSizes[size];

  // Palette tokens
  const navy = '#0F172A';
  const blue = '#2563EB';

  // SVG Geometric Monogram:
  // Precision geometric vector construction of C-G-C
  // Crafted on a 100x100 coordinate box
  const GeometricMark = (
    <svg
      width={width}
      height={height}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="flex-shrink-0 transition-transform duration-300 hover:scale-[1.03]"
      aria-label="CGC Monogram"
    >
      <defs>
        <linearGradient id="cgcBlueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#2563EB" />
        </linearGradient>
        <linearGradient id="cgcGreenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22C55E" />
          <stop offset="100%" stopColor="#16A34A" />
        </linearGradient>
      </defs>

      {/* Hexagonal Guardian shield boundary container */}
      <polygon
        points="50,4 92,26 92,74 50,96 8,74 8,26"
        fill={theme === 'light' ? '#FFFFFF' : navy}
        stroke={theme === 'light' ? '#E2E8F0' : '#1E293B'}
        strokeWidth="3.5"
        strokeLinejoin="round"
      />

      {/* Inner Accent Ring Line */}
      <polygon
        points="50,11 86,30 86,70 50,89 14,70 14,30"
        fill="none"
        stroke={blue}
        strokeOpacity="0.18"
        strokeWidth="1.5"
      />

      {/* Left C Glyph (Blue) */}
      <path
        d="M 37 32 H 26 C 21.5 32 18 35.5 18 40 V 60 C 18 64.5 21.5 68 26 68 H 37 V 59 H 28 C 26.9 59 26 58.1 26 57 V 43 C 26 41.9 26.9 41 28 41 H 37 V 32 Z"
        fill="url(#cgcBlueGrad)"
      />

      {/* Center G Glyph (Midnight / Off-white) */}
      <path
        d="M 59 32 H 44 C 39.5 32 36 35.5 36 40 V 60 C 36 64.5 39.5 68 44 68 H 59 C 62.5 68 64.5 65.5 64.5 62 V 48 H 50 V 55 H 56.5 V 60 C 56.5 60.5 56.1 61 55.5 61 H 45 C 43.9 61 43 60.1 43 59 V 41 C 43 39.9 43.9 39 45 39 H 59 V 32 Z"
        fill={theme === 'light' ? '#0F172A' : '#F5F7FA'}
      />

      {/* Right C Glyph (Green Accent - Impact Node) */}
      <path
        d="M 82 32 H 71 C 67.5 32 65 34.5 65 38 V 43 H 72 V 40 C 72 39.4 72.4 39 73 39 H 82 V 32 Z"
        fill="url(#cgcGreenGrad)"
      />
      <path
        d="M 72 57 V 60 C 72 60.6 72.4 61 73 61 H 82 V 68 H 71 C 67.5 68 65 65.5 65 62 V 57 H 72 Z"
        fill="url(#cgcGreenGrad)"
      />

      {/* Central Impact Node */}
      <circle cx="50" cy="51.5" r="3.2" fill="url(#cgcGreenGrad)" />
      
      {/* Velocity Vector Line */}
      <line x1="77" y1="46" x2="84" y2="46" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );

  if (variant === 'symbol') {
    return <div className={`inline-flex items-center ${className}`}>{GeometricMark}</div>;
  }

  return (
    <div className={`inline-flex items-center gap-3.5 select-none ${className}`}>
      {GeometricMark}

      <div className="flex flex-col justify-center">
        <div className="flex items-center gap-2">
          <span
            className={`font-extrabold tracking-tight font-sans leading-none ${
              size === 'sm'
                ? 'text-lg'
                : size === 'md'
                ? 'text-xl'
                : size === 'lg'
                ? 'text-2xl'
                : 'text-3xl'
            } ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}
          >
            CGC
          </span>
          <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-blue-500" />
          <span
            className={`font-semibold tracking-wide uppercase text-[11px] sm:text-xs ${
              theme === 'light' ? 'text-blue-700' : 'text-blue-400'
            }`}
          >
            Cyber Guardians Club
          </span>
        </div>

        <div className="flex items-center gap-2 mt-1">
          <span
            className={`text-[10px] sm:text-[11px] font-medium tracking-normal ${
              theme === 'light' ? 'text-slate-500' : 'text-slate-400'
            }`}
          >
            Ambo University • Woliso Campus
          </span>

          {showTagline && (
            <>
              <span className="text-slate-600 hidden md:inline">•</span>
              <span className="hidden md:inline-flex items-center text-[10px] font-semibold text-emerald-400 tracking-wider uppercase bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                Ideas into Impact
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CGCLogo;
