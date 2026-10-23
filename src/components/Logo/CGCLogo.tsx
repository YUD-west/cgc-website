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
  className = '',
  showTagline = true,
}) => {
  const sizeClasses = {
    sm: { img: 'h-7', text: 'text-base', sub: 'text-[10px]' },
    md: { img: 'h-9', text: 'text-lg', sub: 'text-xs' },
    lg: { img: 'h-12', text: 'text-xl', sub: 'text-xs' },
    xl: { img: 'h-16', text: 'text-2xl', sub: 'text-sm' },
  };

  const { img, text, sub } = sizeClasses[size];

  const LogoMark = (
    <img
      src="/cgc-logo.png"
      alt="CGC Logo"
      className={`${img} w-auto object-contain flex-shrink-0 transition-transform duration-300 hover:scale-105 drop-shadow-[0_2px_10px_rgba(255,194,26,0.2)]`}
      loading="eager"
    />
  );

  if (variant === 'symbol') {
    return <div className={`inline-flex items-center ${className}`}>{LogoMark}</div>;
  }

  if (variant === 'compact') {
    return (
      <div className={`inline-flex items-center gap-2 select-none ${className}`}>
        {LogoMark}
        <span className={`font-extrabold tracking-tight font-sans leading-none text-white ${text}`}>
          CGC
        </span>
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {LogoMark}

      <div className="flex flex-col justify-center">
        <div className="flex items-center gap-2">
          <span className={`font-extrabold tracking-tight font-sans leading-none text-white ${text}`}>
            CGC
          </span>
          <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-[#FFC21A]" />
          <span className={`font-semibold tracking-wide uppercase text-[#FFC21A] ${sub}`}>
            Cyber Guardians Club
          </span>
        </div>

        {showTagline && (
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[10px] sm:text-[11px] font-medium tracking-normal text-[#A3A3A3]">
              Ambo University · Woliso Campus
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
