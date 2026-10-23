import React from 'react';
import { AtomHero } from '../components/AtomHero';
import { LEAD_ADMIN, OFFICIAL_COMMUNITY } from '../data/team';
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
  const cgcFunctions = [
    {
      icon: ShieldCheck,
      title: 'Cyber Defense',
      desc: 'Ethical hacking & network defense labs in IT lab 01 and 06.',
      accent: 'text-[#FFC21A] bg-[#FFC21A]/10 border-[#FFC21A]/30',
      action: () => onNavigate('projects'),
    },
    {
      icon: Code2,
      title: 'Software & Web',
      desc: 'Building practical apps & shipping code.',
      accent: 'text-white bg-white/10 border-white/20',
      action: () => onNavigate('projects'),
    },
    {
      icon: Cpu,
      title: 'AI & Machine Learning',
      desc: 'Models, datasets & intelligent tools.',
      accent: 'text-[#FFC21A] bg-[#FFC21A]/10 border-[#FFC21A]/30',
      action: () => onNavigate('projects'),
    },
    {
      icon: Sprout,
      title: 'AgriTech & IoT',
      desc: 'Sensors, hardware & community solutions.',
      accent: 'text-white bg-white/10 border-white/20',
      action: () => onNavigate('projects'),
    },
    {
      icon: Monitor,
      title: 'IT Lab 01 & 06',
      desc: 'Workstations in Old Classroom ICT Building.',
      accent: 'text-[#FFC21A] bg-[#FFC21A]/10 border-[#FFC21A]/30',
      action: () => onNavigate('about'),
    },
    {
      icon: GraduationCap,
      title: 'Student Mentorship',
      desc: 'Guidance from seniors, peer learning & code review.',
      accent: 'text-white bg-white/10 border-white/20',
      action: () => onNavigate('about'),
    },
    {
      icon: Users,
      title: 'Cross-Faculty Co-Creation',
      desc: 'Team up across IT, Business & Agriculture.',
      accent: 'text-[#FFC21A] bg-[#FFC21A]/10 border-[#FFC21A]/30',
      action: () => onNavigate('projects'),
    },
    {
      icon: Zap,
      title: '100% Free & Open',
      desc: 'Zero fees. Welcoming beginners & all fields.',
      accent: 'text-white bg-white/10 border-white/20',
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
            Core Functions
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            What CGC Does
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-[#A3A3A3]">
            Simple, practical features for every student at Ambo University Woliso Campus.
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
                  <div className={`w-9 h-9 rounded-lg border flex items-center justify-center mb-3 transition-transform group-hover:scale-105 ${fn.accent}`}>
                    <Icon className="w-4 h-4" />
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
              Student Leadership Desk
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white">
              {LEAD_ADMIN.name} — Lead Administrator &amp; Club President
            </h3>
            <p className="text-xs text-[#A3A3A3] leading-relaxed">
              &quot;Our mission at Woliso Campus is simple: help students move from theory to building real software. Join our community sessions every week in Old Classroom ICT Building IT lab 01 and 06.&quot;
            </p>
            <div className="pt-1 flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs">
              <button
                onClick={() => onNavigate('about')}
                className="text-[#FFC21A] hover:underline transition-colors cursor-pointer"
              >
                Learn About CGC →
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
