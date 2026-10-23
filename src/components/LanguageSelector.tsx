import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Globe } from 'lucide-react';
import { Language } from '../translations';

interface LanguageSelectorProps {
  className?: string;
  variant?: 'pill' | 'dropdown' | 'compact';
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  className = '',
  variant = 'pill',
}) => {
  const { language, setLanguage, languages } = useLanguage();

  if (variant === 'compact') {
    return (
      <div className={`inline-flex items-center gap-1 p-0.5 rounded-lg bg-[#141414] border border-[#2A2A2A] text-xs ${className}`}>
        {languages.map((lang) => {
          const isActive = language === lang.code;
          return (
            <button
              key={lang.code}
              onClick={() => setLanguage(lang.code)}
              className={`px-2 py-1 rounded-md text-[11px] font-semibold transition-all ${
                isActive
                  ? 'bg-[#FFC21A] text-black font-bold shadow-sm'
                  : 'text-[#A3A3A3] hover:text-white hover:bg-[#202020]'
              }`}
              title={lang.nativeLabel}
            >
              {lang.code.toUpperCase()}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-1.5 p-1 rounded-xl bg-[#0D0D0D] border border-[#2A2A2A] ${className}`}>
      <Globe className="w-3.5 h-3.5 text-[#FFC21A] ml-1.5 flex-shrink-0" />
      <div className="flex items-center gap-1">
        {languages.map((lang) => {
          const isActive = language === lang.code;
          return (
            <button
              key={lang.code}
              onClick={() => setLanguage(lang.code)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-[#FFC21A] text-black font-bold shadow-sm'
                  : 'text-[#A3A3A3] hover:text-white hover:bg-[#1A1A1A]'
              }`}
              title={`${lang.label} (${lang.nativeLabel})`}
            >
              <span className="hidden sm:inline">{lang.nativeLabel}</span>
              <span className="sm:hidden">{lang.code.toUpperCase()}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
