import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { SectionHeader } from '../components/SectionHeader';
import { CGCLogo } from '../components/Logo/CGCLogo';
import { LEAD_ADMIN, CO_ADMIN, OFFICIAL_COMMUNITY, CAMPUS_EVENT_PHOTOS, CampusEventPhoto } from '../data/team';
import { TiltCard } from '../components/Motion/TiltCard';
import { MagneticButton } from '../components/Motion/MagneticButton';
import { RevealOnScroll } from '../components/Motion/RevealOnScroll';
import { 
  ShieldCheck, 
  Users, 
  Compass, 
  TrendingUp, 
  Sparkles, 
  Target, 
  MapPin, 
  ArrowRight,
  Maximize2,
  X,
  UserCheck,
  Send,
  Linkedin,
  Github,
  Mail,
  Award,
  Calendar,
  ExternalLink
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (tab: string) => void;
  onOpenBrandModal: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, onOpenBrandModal }) => {
  const { t } = useLanguage();
  const [selectedPhoto, setSelectedPhoto] = useState<CampusEventPhoto | null>(null);

  const coreValues = [
    {
      title: 'Innovation',
      tagline: 'Practical engineering over passive consumption.',
      description:
        'We believe innovation is not about buzzwords; it is about writing code, configuring defensive systems, and assembling working prototypes that solve tangible local problems.',
      icon: Sparkles,
      color: 'text-[#FFC21A] bg-[#FFC21A]/10 border-[#FFC21A]/30',
    },
    {
      title: 'Collaboration',
      tagline: 'Cross-department synergy across campus.',
      description:
        'True impact requires diverse minds. We actively connect IT coders with agriculture researchers, business strategists, and social scientists to build holistic solutions.',
      icon: Users,
      color: 'text-white bg-white/10 border-white/20',
    },
    {
      title: 'Integrity',
      tagline: 'Ethical security and authentic attribution.',
      description:
        'As Cyber Guardians, our skills must protect and uplift. We maintain strict ethical standards in penetration testing, respect data privacy, and celebrate honest student authorship.',
      icon: ShieldCheck,
      color: 'text-[#FFC21A] bg-[#FFC21A]/10 border-[#FFC21A]/30',
    },
    {
      title: 'Growth',
      tagline: 'Beginner-friendly peer mentorship.',
      description:
        'Nobody starts as an expert. We foster a non-judgmental environment where seniors mentor juniors, questions are celebrated, and failures are treated as debuggable iterations.',
      icon: TrendingUp,
      color: 'text-white bg-white/10 border-white/20',
    },
  ];

  return (
    <div className="space-y-24 sm:space-y-32 pb-24 bg-black text-[#F2F2F2]">
      {/* 
        =======================================================
        HEADER & VISION
        =======================================================
      */}
      <section className="relative pt-10 sm:pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge={t('about.badge')}
            badgeColor="amber"
            title={t('about.title')}
            description={t('about.desc')}
          />

          {/* Mission & Vision Split Card with 3D Tilt */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <TiltCard
              maxTilt={5}
              scale={1.015}
              className="p-8 sm:p-10 rounded-3xl bg-[#080808] backdrop-blur-xl border border-[#2A2A2A] shadow-xl space-y-4"
            >
              <div className="w-12 h-12 rounded-xl bg-[#FFC21A]/10 border border-[#FFC21A]/30 text-[#FFC21A] flex items-center justify-center shadow-inner">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white tracking-tight">{t('about.missionTitle')}</h3>
              <p className="text-neutral-300 leading-relaxed text-sm sm:text-base">
                {t('about.missionDesc')}
              </p>
            </TiltCard>

            <TiltCard
              maxTilt={5}
              scale={1.015}
              className="p-8 sm:p-10 rounded-3xl bg-[#080808] backdrop-blur-xl border border-[#2A2A2A] shadow-xl space-y-4"
            >
              <div className="w-12 h-12 rounded-xl bg-[#FFC21A]/10 border border-[#FFC21A]/30 text-[#FFC21A] flex items-center justify-center shadow-inner">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white tracking-tight">{t('about.visionTitle')}</h3>
              <p className="text-neutral-300 leading-relaxed text-sm sm:text-base">
                {t('about.visionDesc')}
              </p>
            </TiltCard>
          </div>
        </div>
      </section>

      {/* 
        =======================================================
        LEADERSHIP & ADMIN SPOTLIGHT (YESUF DERGU)
        =======================================================
      */}
      <RevealOnScroll className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Leadership & Community Administration"
          description="CGC is founded and operated by passionate undergraduates committed to open-source culture and practical engineering."
        />

        <TiltCard
          maxTilt={4}
          scale={1.008}
          className="p-8 sm:p-12 rounded-3xl bg-[#080808] border border-[#2A2A2A] shadow-2xl relative overflow-hidden"
        >
          <div className="flex flex-col lg:flex-row items-center gap-10">
            {/* Admin Photo */}
            <div className="relative flex-shrink-0 group">
              <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-3xl overflow-hidden border-2 border-[#FFC21A] shadow-[0_0_25px_rgba(255,194,26,0.2)] relative">
                <img
                  src={LEAD_ADMIN.photoUrl}
                  alt={LEAD_ADMIN.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#FFC21A] text-black text-xs font-bold px-3 py-1 rounded-full border-2 border-black whitespace-nowrap shadow-md flex items-center gap-1">
                <UserCheck className="w-3.5 h-3.5" />
                <span>President & Lead Admin</span>
              </span>
            </div>

            {/* Admin Details & Bio */}
            <div className="space-y-4 text-center lg:text-left flex-1">
              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">{LEAD_ADMIN.name}</h3>
                <p className="text-sm font-semibold text-[#FFC21A] mt-0.5">{LEAD_ADMIN.role}</p>
                <p className="text-xs text-neutral-400 mt-1">{LEAD_ADMIN.department}</p>
              </div>

              <p className="text-sm text-neutral-300 leading-relaxed max-w-2xl">
                {LEAD_ADMIN.bio} Yesuf leads campus technical workshops, coordinates cross-batch development hackathons like the Cursor Hackathon Ambo, and stewards the CGC open-source roadmap.
              </p>

              {/* Direct Admin Links */}
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3">
                <a
                  href={LEAD_ADMIN.telegramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-[#FFC21A] hover:bg-[#e5ad16] text-black text-xs font-bold flex items-center gap-1.5 shadow-md transition-all active:scale-95"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Telegram ({LEAD_ADMIN.telegram})</span>
                </a>

                <a
                  href={CO_ADMIN.url}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-[#141414] hover:bg-[#202020] text-white text-xs font-semibold flex items-center gap-1.5 border border-[#2A2A2A] transition-colors active:scale-95"
                >
                  <Send className="w-3.5 h-3.5 text-[#FFC21A]" />
                  <span>Co-Admin ({CO_ADMIN.handle})</span>
                </a>

                <a
                  href={LEAD_ADMIN.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-[#141414] hover:bg-[#FFC21A] hover:text-black text-neutral-300 border border-[#2A2A2A] transition-colors active:scale-95"
                  title="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>

                <a
                  href={LEAD_ADMIN.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-[#141414] hover:bg-[#202020] hover:text-white text-neutral-300 border border-[#2A2A2A] transition-colors active:scale-95"
                  title="GitHub Profile (YUD-west)"
                >
                  <Github className="w-4 h-4" />
                </a>

                <a
                  href={`mailto:${LEAD_ADMIN.email}`}
                  className="p-2.5 rounded-xl bg-[#141414] hover:bg-[#FFC21A] hover:text-black text-neutral-300 border border-[#2A2A2A] transition-colors active:scale-95"
                  title={`Email ${LEAD_ADMIN.email}`}
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </TiltCard>
      </RevealOnScroll>

      {/* 
        =======================================================
        WOLISO CAMPUS WORKSHOPS & EVENT GALLERY LINK
        =======================================================
      */}
      <RevealOnScroll className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-3xl bg-[#080808] border border-[#2A2A2A] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
          <div>
            <h3 className="text-xl font-bold text-white">Campus Tech Events & Hackathon Photos</h3>
            <p className="text-xs sm:text-sm text-neutral-300 mt-1 max-w-xl leading-relaxed">
              Explore authentic photos from the Cursor Hackathon Ambo, Old Classroom ICT Building IT lab 01 and 06 coding workshops, and student demo sessions.
            </p>
          </div>
          <button
            onClick={() => onNavigate('events')}
            className="px-6 py-3 rounded-xl bg-[#FFC21A] hover:bg-[#e5ad16] text-black font-bold text-xs sm:text-sm transition-all whitespace-nowrap shadow-md active:scale-95"
          >
            <span>View Campus Photo Gallery →</span>
          </button>
        </div>
      </RevealOnScroll>

      {/* 
        =======================================================
        OUR CORE VALUES
        =======================================================
      */}
      <RevealOnScroll className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Guiding Principles"
          badgeColor="amber"
          title="The Values That Guide Every Sprint"
          description="Everything we do—from weekend workshops to semester-long hackathons—is governed by four foundational commitments."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {coreValues.map((val, idx) => {
            const Icon = val.icon;
            return (
              <TiltCard
                key={idx}
                maxTilt={8}
                scale={1.02}
                className="p-6 rounded-2xl bg-[#080808] border border-[#2A2A2A] shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-5 ${val.color} shadow-inner`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white tracking-tight">{val.title}</h3>
                  <div className="text-xs font-semibold text-[#FFC21A] mt-1">
                    {val.tagline}
                  </div>
                  <p className="mt-3 text-xs sm:text-sm text-neutral-300 leading-relaxed">
                    {val.description}
                  </p>
                </div>
              </TiltCard>
            );
          })}
        </div>
      </RevealOnScroll>

      {/* 
        =======================================================
        CAMPUS JOURNEY: FROM IT TO ALL DEPARTMENTS
        =======================================================
      */}
      <RevealOnScroll className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#080808] border border-[#2A2A2A] shadow-xl">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold text-[#FFC21A] uppercase tracking-wider block mb-2">
              Evolutionary Path
            </span>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              The Journey: From IT Department to Campus-Wide Innovation
            </h2>
            <p className="mt-3 text-neutral-300 leading-relaxed text-sm sm:text-base">
              CGC was conceived by Information Technology students at Woliso Campus who realized that classroom lectures alone could not bridge the gap to real-world software creation.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* Stage 1 */}
            <TiltCard maxTilt={5} scale={1.02} className="p-6 rounded-2xl bg-[#050505] border border-[#2A2A2A] relative">
              <span className="text-xs font-bold font-mono text-[#FFC21A] bg-[#FFC21A]/10 px-2.5 py-1 rounded-md border border-[#FFC21A]/30 inline-block mb-3">
                Phase 1 • Genesis
              </span>
              <h3 className="text-lg font-bold text-white">IT & Informatics Core</h3>
              <p className="mt-2 text-xs sm:text-sm text-neutral-300 leading-relaxed">
                Focused on establishing Linux lab proficiency, networking basics, Git version control, and cybersecurity fundamentals among computing undergraduates.
              </p>
            </TiltCard>

            {/* Stage 2 */}
            <TiltCard maxTilt={5} scale={1.02} className="p-6 rounded-2xl bg-[#050505] border border-[#FFC21A]/50 relative shadow-[0_0_20px_rgba(255,194,26,0.15)]">
              <span className="text-xs font-bold font-mono text-[#FFC21A] bg-[#FFC21A]/10 px-2.5 py-1 rounded-md border border-[#FFC21A]/30 inline-block mb-3">
                Phase 2 • Expansion (Current)
              </span>
              <h3 className="text-lg font-bold text-white">Multidisciplinary Cohorts</h3>
              <p className="mt-2 text-xs sm:text-sm text-neutral-300 leading-relaxed">
                Opening tracks to Natural Sciences (applied AI diagnostics), Business & Economics (product market validation), and Engineering students across Woliso.
              </p>
            </TiltCard>

            {/* Stage 3 */}
            <TiltCard maxTilt={5} scale={1.02} className="p-6 rounded-2xl bg-[#050505] border border-[#2A2A2A] relative">
              <span className="text-xs font-bold font-mono text-neutral-400 bg-neutral-900 px-2.5 py-1 rounded-md border border-[#2A2A2A] inline-block mb-3">
                Phase 3 • Impact
              </span>
              <h3 className="text-lg font-bold text-white">Venture & Community Hub</h3>
              <p className="mt-2 text-xs sm:text-sm text-neutral-300 leading-relaxed">
                Partnering with regional organizations, publishing peer-reviewed student research, and incubating campus projects into sustainable civic utilities and tech startups.
              </p>
            </TiltCard>
          </div>

          {/* Woliso Campus Facilities Context */}
          <div className="mt-10 p-6 rounded-2xl bg-[#050505] border border-[#2A2A2A] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-[#141414] text-neutral-300 border border-[#2A2A2A]">
                <MapPin className="w-5 h-5 text-[#FFC21A]" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Ambo University, Woliso Campus</h4>
                <p className="text-xs text-neutral-400">Old Classroom ICT Building • IT lab 01 and 06 • South West Shewa Zone, Oromia</p>
              </div>
            </div>

            <button
              onClick={() => onNavigate('contact')}
              className="text-xs font-semibold text-[#FFC21A] hover:text-white flex items-center gap-1 active:scale-95 transition-colors"
            >
              <span>View Lab Hours & Location</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </RevealOnScroll>

      {/* 
        =======================================================
        JOIN CTA
        =======================================================
      */}
      <RevealOnScroll className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <TiltCard
          maxTilt={4}
          scale={1.01}
          className="p-10 rounded-3xl bg-[#080808] border border-[#2A2A2A] max-w-3xl mx-auto space-y-4 shadow-xl"
        >
          <h3 className="text-2xl font-bold text-white tracking-tight">Connect with Lead Admin Yesuf Dergu</h3>
          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
            Have questions or want to partner on a campus hackathon? Join the IT Joint Community or message our leadership directly.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <a
              href={OFFICIAL_COMMUNITY.telegramGroup}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 rounded-xl bg-[#FFC21A] hover:bg-[#e5ad16] text-black font-bold text-sm transition-all flex items-center gap-2 shadow-md active:scale-95"
            >
              <Send className="w-4 h-4" />
              <span>Join Telegram Group</span>
            </a>
          </div>
        </TiltCard>
      </RevealOnScroll>

      {/* 
        =======================================================
        PHOTO LIGHTBOX MODAL
        =======================================================
      */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in" onClick={() => setSelectedPhoto(null)}>
          <div className="relative max-w-4xl w-full bg-[#080808] rounded-2xl overflow-hidden border border-[#2A2A2A] shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors active:scale-95"
              aria-label="Close photo preview"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={selectedPhoto.imageUrl}
              alt={selectedPhoto.title}
              className="w-full max-h-[75vh] object-contain bg-black"
            />
            <div className="p-5 bg-[#050505] border-t border-[#2A2A2A] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div>
                <span className="text-[11px] font-mono text-[#FFC21A] font-semibold uppercase block">{selectedPhoto.event} • {selectedPhoto.location}</span>
                <span className="font-bold text-white text-base mt-0.5 block">{selectedPhoto.title}</span>
                <p className="text-neutral-300 mt-1 max-w-2xl">{selectedPhoto.description}</p>
              </div>
              <span className="text-[#FFC21A] font-mono font-semibold bg-[#FFC21A]/10 px-2.5 py-1 rounded border border-[#FFC21A]/30 whitespace-nowrap">
                Ambo University
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
