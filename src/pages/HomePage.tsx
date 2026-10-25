import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { AtomHero } from '../components/AtomHero';
import { LEAD_ADMIN } from '../data/team';
import { 
  ShieldCheck, 
  Code2, 
  Cpu, 
  Sprout, 
  Monitor, 
  Users, 
  Zap,
  GraduationCap
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (tab: string) => void;
  onJoinTeam?: (project: any) => void;
  onRsvp?: (event: any) => void;
  onOpenBrandModal?: () => void;
  onProposeProject?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { t } = useLanguage();

  const cgcFunctions = [
    {
      imageSrc: '/functions-cyber-defense-gold.png',
      icon: ShieldCheck,
      title: t('home.fn1Title'),
      desc: t('home.fn1Desc'),
      accent: 'text-[#FFC21A] bg-[#FFC21A]/10 border-[#FFC21A]/30',
      action: () => onNavigate('projects'),
    },
    {
      imageSrc: '/functions-software-web.png',
      icon: Code2,
      title: t('home.fn2Title'),
      desc: t('home.fn2Desc'),
      accent: 'text-[#FFC21A] bg-[#FFC21A]/10 border-[#FFC21A]/30',
      action: () => onNavigate('projects'),
    },
    {
      imageSrc: '/functions-ai-ml.png',
      icon: Cpu,
      title: t('home.fn3Title'),
      desc: t('home.fn3Desc'),
      accent: 'text-[#FFC21A] bg-[#FFC21A]/10 border-[#FFC21A]/30',
      action: () => onNavigate('projects'),
    },
    {
      imageSrc: '/functions-agritech-iot.png',
      icon: Sprout,
      title: t('home.fn4Title'),
      desc: t('home.fn4Desc'),
      accent: 'text-[#FFC21A] bg-[#FFC21A]/10 border-[#FFC21A]/30',
      action: () => onNavigate('projects'),
    },
    {
      imageSrc: '/functions-it-lab.png',
      icon: Monitor,
      title: t('home.fn5Title'),
      desc: t('home.fn5Desc'),
      accent: 'text-[#FFC21A] bg-[#FFC21A]/10 border-[#FFC21A]/30',
      action: () => onNavigate('about'),
    },
    {
      imageSrc: '/functions-student-mentorship.png',
      icon: GraduationCap,
      title: t('home.fn6Title'),
      desc: t('home.fn6Desc'),
      accent: 'text-[#FFC21A] bg-[#FFC21A]/10 border-[#FFC21A]/30',
      action: () => onNavigate('about'),
    },
    {
      imageSrc: '/functions-co-creation.png',
      icon: Users,
      title: t('home.fn7Title'),
      desc: t('home.fn7Desc'),
      accent: 'text-[#FFC21A] bg-[#FFC21A]/10 border-[#FFC21A]/30',
      action: () => onNavigate('projects'),
    },
    {
      imageSrc: '/functions-free-open.png',
      icon: Zap,
      title: t('home.fn8Title'),
      desc: t('home.fn8Desc'),
      accent: 'text-[#FFC21A] bg-[#FFC21A]/10 border-[#FFC21A]/30',
      action: () => onNavigate('join'),
    },
  ];

  return (
    <div className="space-y-16 pb-20 bg-black text-[#F2F2F2]">
      {/* 1. 3D ATOM HERO */}
      <AtomHero onNavigate={onNavigate} />

      {/* 2. CGC FUNCTIONS (SIMPLE SHORT ICONS & WORDS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center max-w-xl mx-auto">
          <p className="text-xs uppercase font-semibold tracking-[0.2em] text-[#FFC21A] mb-1.5">
            {t('home.coreFunctions')}
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {t('home.whatCgcDoes')}
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-[#A3A3A3]">
            {t('home.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-4">
          {cgcFunctions.map((fn, idx) => {
            const Icon = fn.icon;
            return (
              <div
                key={idx}
                onClick={fn.action}
                className="p-4 sm:p-5 rounded-xl bg-[#080808] border border-[#2A2A2A] hover:border-[#FFC21A]/50 transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center mb-3 transition-transform group-hover:scale-110 ${fn.accent} ${fn.imageSrc ? 'p-1.5' : ''}`}>
                    {fn.imageSrc ? (
                      <img
                        src={fn.imageSrc}
                        alt={`${fn.title} icon`}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      Icon && <Icon className="w-4 h-4" />
                    )}
                  </div>
                  <h3 className="text-sm font-bold text-white group-hover:text-[#FFC21A] transition-colors mb-1">
                    {fn.title}
                  </h3>
                  <p className="text-xs text-[#A3A3A3] leading-snug">
                    {fn.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. LEADERSHIP DESK (CLEAN & MINIMAL) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-7 rounded-2xl bg-[#080808] border border-[#2A2A2A] flex flex-col sm:flex-row items-center gap-5">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border border-[#FFC21A]/40 shrink-0">
            <img
              src={LEAD_ADMIN.photoUrl}
              alt={LEAD_ADMIN.name}
              className="w-full h-full object-cover object-top"
            />
          </div>
          <div className="text-center sm:text-left space-y-1.5 flex-1">
            <div className="text-[11px] text-[#FFC21A] font-semibold uppercase tracking-wider">
              {t('home.leadershipDesk')}
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white">
              {LEAD_ADMIN.name} — {t('home.presidentTitle')}
            </h3>
            <p className="text-xs text-[#A3A3A3] leading-relaxed">
              {t('home.quote')}
            </p>
            <div className="pt-1 flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs">
              <button
                onClick={() => onNavigate('about')}
                className="text-[#FFC21A] hover:underline transition-colors cursor-pointer"
              >
                {t('home.learnAboutCgc')}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
