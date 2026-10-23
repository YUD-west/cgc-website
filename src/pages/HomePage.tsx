import React from 'react';
import { AtomHero } from '../components/AtomHero';
import { LEAD_ADMIN, OFFICIAL_COMMUNITY } from '../data/team';
import { 
  ShieldCheck, 
  Code2, 
  Cpu, 
  Sprout, 
  QrCode, 
  Monitor, 
  Users, 
  Zap,
  Send,
  ArrowRight
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
      desc: 'Ethical hacking & network defense labs.',
      color: 'text-[#14a94b] bg-[#14a94b]/10 border-[#14a94b]/20',
      action: () => onNavigate('projects'),
    },
    {
      icon: Code2,
      title: 'Software & Web',
      desc: 'Building practical apps & shipping code.',
      color: 'text-[#FFC21A] bg-[#FFC21A]/10 border-[#FFC21A]/20',
      action: () => onNavigate('projects'),
    },
    {
      icon: Cpu,
      title: 'AI & Machine Learning',
      desc: 'Models, datasets & intelligent tools.',
      color: 'text-[#e8262c] bg-[#e8262c]/10 border-[#e8262c]/20',
      action: () => onNavigate('projects'),
    },
    {
      icon: Sprout,
      title: 'AgriTech & IoT',
      desc: 'Sensors, hardware & community solutions.',
      color: 'text-[#14a94b] bg-[#14a94b]/10 border-[#14a94b]/20',
      action: () => onNavigate('projects'),
    },
    {
      icon: QrCode,
      title: 'Digital Member Pass',
      desc: '3D interactive card with QR door verification.',
      color: 'text-[#FFC21A] bg-[#FFC21A]/10 border-[#FFC21A]/20',
      action: () => onNavigate('verify'),
    },
    {
      icon: Monitor,
      title: 'Computer Lab 02',
      desc: 'Physical workstations in Main ICT Building.',
      color: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
      action: () => onNavigate('about'),
    },
    {
      icon: Users,
      title: 'Cross-Faculty Co-Creation',
      desc: 'Team up across IT, Business & Agriculture.',
      color: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
      action: () => onNavigate('projects'),
    },
    {
      icon: Zap,
      title: '100% Free & Open',
      desc: 'Zero fees. Welcoming beginners & all fields.',
      color: 'text-[#FFC21A] bg-[#FFC21A]/10 border-[#FFC21A]/20',
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
                className="p-4 sm:p-5 rounded-xl bg-[#080808] border border-[#2A2A2A] hover:border-[#FFC21A]/40 transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className={`w-9 h-9 rounded-lg border flex items-center justify-center mb-3 transition-transform group-hover:scale-105 ${fn.color}`}>
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
              &quot;Our mission at Woliso Campus is simple: help students move from theory to building real software. Join our community sessions every week in Computer Lab 02.&quot;
            </p>
            <div className="pt-1 flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs">
              <a
                href={OFFICIAL_COMMUNITY.telegramGroup}
                target="_blank"
                rel="noreferrer"
                className="text-[#FFC21A] hover:underline flex items-center gap-1 font-semibold"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Join Telegram Community</span>
              </a>
              <span className="text-[#333]">·</span>
              <button
                onClick={() => onNavigate('about')}
                className="text-[#A3A3A3] hover:text-white transition-colors cursor-pointer"
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
