import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { Language } from '../translations';

interface LanguageSelectorProps {
  className?: string;
  direction?: 'down' | 'up';
}

interface LanguageMeta {
  code: Language;
  shortCode: string;
  name: string;
  nativeName: string;
}

const LANGUAGE_OPTIONS: LanguageMeta[] = [
  { code: 'en', shortCode: 'EN', name: 'English', nativeName: 'English' },
  { code: 'om', shortCode: 'AO', name: 'Afaan Oromoo', nativeName: 'Afaan Oromoo' },
  { code: 'am', shortCode: 'AH', name: 'Amharic', nativeName: 'አማርኛ' },
];

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  className = '',
  direction = 'down',
}) => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentOption = LANGUAGE_OPTIONS.find((l) => l.code === language) || LANGUAGE_OPTIONS[0];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (code: Language) => {
    setLanguage(code);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className={`relative inline-block text-left ${className}`}>
      {/* Trigger Button: Globe + Short Code (EN / AO / AH) + Chevron */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-[#0D0D0D] border border-[#2A2A2A] hover:border-[#FFC21A]/50 text-[#F2F2F2] hover:text-white transition-all cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#FFC21A]/50 select-none"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <Globe className="w-3.5 h-3.5 text-[#FFC21A] flex-shrink-0" />
        <span className="text-xs font-bold tracking-wide font-mono text-[#F2F2F2]">
          {currentOption.shortCode}
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-[#A3A3A3] transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-[#FFC21A]' : ''
          }`}
        />
      </button>

      {/* Dropdown / Dropup Menu */}
      {isOpen && (
        <div
          className={`absolute right-0 ${
            direction === 'up' ? 'bottom-full mb-2' : 'top-full mt-2'
          } w-44 rounded-xl bg-[#080808] border border-[#2A2A2A] shadow-2xl p-1.5 z-50 animate-fade-in backdrop-blur-xl`}
          role="menu"
        >
          <div className="px-2 py-1 text-[10px] uppercase font-bold tracking-wider text-[#737373] border-b border-[#1C1C1C] mb-1">
            Language / Afaan / ቋንቋ
          </div>

          <div className="space-y-0.5">
            {LANGUAGE_OPTIONS.map((opt) => {
              const isSelected = language === opt.code;
              return (
                <button
                  key={opt.code}
                  type="button"
                  onClick={() => handleSelect(opt.code)}
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs transition-colors cursor-pointer text-left ${
                    isSelected
                      ? 'bg-[#FFC21A]/10 text-[#FFC21A] font-bold border border-[#FFC21A]/30'
                      : 'text-[#A3A3A3] hover:text-white hover:bg-[#161616]'
                  }`}
                  role="menuitem"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[11px] font-mono font-bold px-1.5 py-0.5 rounded ${
                        isSelected
                          ? 'bg-[#FFC21A] text-black'
                          : 'bg-[#1C1C1C] text-[#A3A3A3]'
                      }`}
                    >
                      {opt.shortCode}
                    </span>
                    <div className="flex flex-col">
                      <span className="text-xs leading-none">{opt.nativeName}</span>
                      {opt.code !== 'en' && (
                        <span className="text-[10px] text-[#737373] leading-tight mt-0.5">
                          {opt.name}
                        </span>
                      )}
                    </div>
                  </div>

                  {isSelected && <Check className="w-3.5 h-3.5 text-[#FFC21A] flex-shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
