import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="w-full bg-black border-t border-[#2A2A2A] text-sm text-[#A3A3A3] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Brand & Location */}
        <div className="space-y-1.5 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2.5">
            <img src="/cgc-logo.png" alt="CGC Logo" className="h-6 w-auto object-contain" />
            <span className="font-display font-extrabold text-base tracking-[0.08em] text-[#F2F2F2]">
              CGC
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFC21A]" />
            <span className="text-xs text-[#737373]">{t('brand.campus')}</span>
          </div>
          <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs text-[#737373]">
            <MapPin className="w-3.5 h-3.5 text-[#FFC21A] flex-shrink-0" />
            <span>{t('brand.venueFull')}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-6 pt-5 border-t border-[#1C1C1C] flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#737373] gap-2">
        <div>
          © {new Date().getFullYear()} Cyber Guardians Club (CGC). {t('footer.lead')} · {t('footer.rights')}
        </div>
        <div className="text-[#FFC21A]/90 font-medium">
          {t('brand.freeTag')}
        </div>
      </div>
    </footer>
  );
};
