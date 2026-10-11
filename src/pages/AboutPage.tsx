import React, { useState } from 'react';
import { SectionHeader } from '../components/SectionHeader';
import { CGCLogo } from '../components/Logo/CGCLogo';
import { LEAD_ADMIN, CO_ADMIN, OFFICIAL_COMMUNITY, CAMPUS_EVENT_PHOTOS, CampusEventPhoto } from '../data/team';
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
  const [selectedPhoto, setSelectedPhoto] = useState<CampusEventPhoto | null>(null);

  const coreValues = [
    {
      title: 'Innovation',
      tagline: 'Practical engineering over passive consumption.',
      description:
        'We believe innovation is not about buzzwords; it is about writing code, configuring defensive systems, and assembling working prototypes that solve tangible local problems.',
      icon: Sparkles,
      color: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    },
    {
      title: 'Collaboration',
      tagline: 'Cross-department synergy across campus.',
      description:
        'True impact requires diverse minds. We actively connect IT coders with agriculture researchers, business strategists, and social scientists to build holistic solutions.',
      icon: Users,
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    },
    {
      title: 'Integrity',
      tagline: 'Ethical security and authentic attribution.',
      description:
        'As Cyber Guardians, our skills must protect and uplift. We maintain strict ethical standards in penetration testing, respect data privacy, and celebrate honest student authorship.',
      icon: ShieldCheck,
      color: 'text-sky-400 bg-sky-500/10 border-sky-500/20',
    },
    {
      title: 'Growth',
      tagline: 'Beginner-friendly peer mentorship.',
      description:
        'Nobody starts as an expert. We foster a non-judgmental environment where seniors mentor juniors, questions are celebrated, and failures are treated as debuggable iterations.',
      icon: TrendingUp,
      color: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    },
  ];

  return (
    <div className="space-y-24 sm:space-y-32 pb-20">
      {/* 
        =======================================================
        HEADER & VISION
        =======================================================
      */}
      <section className="relative pt-12 sm:pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="About The Club"
            badgeColor="blue"
            title="A Student-Led Innovation Movement"
            description="Cyber Guardians Club (CGC) is an autonomous, student-governed technology and innovation collective established at Ambo University, Woliso Campus, Ethiopia."
          />

          {/* Mission & Vision Split Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div className="p-8 sm:p-10 rounded-3xl bg-[#111A2E] border border-slate-800 shadow-card space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white">Our Mission</h3>
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                To transform Ambo University Woliso Campus from a place of theoretical study into a thriving ecosystem of hands-on builders. We equip students with modern cybersecurity, software engineering, and artificial intelligence skills while building tools that matter to our campus and broader society.
              </p>
            </div>

            <div className="p-8 sm:p-10 rounded-3xl bg-[#111A2E] border border-slate-800 shadow-card space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white">Our Vision</h3>
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                To become the benchmark for student-led technology communities in Ethiopian higher education—where multidisciplinary student teams launch viable open-source projects, publish security audits, and turn campus graduation projects into real sustainable startups.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 
        =======================================================
        LEADERSHIP & ADMIN SPOTLIGHT (YESUF DERGU)
        =======================================================
      */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Club Governance"
          badgeColor="green"
          title="Leadership & Community Administration"
          description="CGC is founded and operated by passionate undergraduates committed to open-source culture and practical engineering."
        />

        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#111A2E] via-slate-900 to-[#10192E] border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col lg:flex-row items-center gap-10">
            {/* Admin Photo */}
            <div className="relative flex-shrink-0 group">
              <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-3xl overflow-hidden border-2 border-blue-500/50 shadow-glow-blue relative">
                <img
                  src={LEAD_ADMIN.photoUrl}
                  alt={LEAD_ADMIN.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full border-2 border-slate-900 whitespace-nowrap shadow-md flex items-center gap-1">
                <UserCheck className="w-3.5 h-3.5" />
                <span>President & Lead Admin</span>
              </span>
            </div>

            {/* Admin Details & Bio */}
            <div className="space-y-4 text-center lg:text-left flex-1">
              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">{LEAD_ADMIN.name}</h3>
                <p className="text-sm font-semibold text-blue-400 mt-0.5">{LEAD_ADMIN.role}</p>
                <p className="text-xs text-slate-400 mt-1">{LEAD_ADMIN.department}</p>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
                {LEAD_ADMIN.bio} Yesuf leads campus technical workshops, coordinates cross-batch development hackathons like the Cursor Hackathon Ambo, and stewards the CGC open-source roadmap.
              </p>

              {/* Direct Admin Links */}
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3">
                <a
                  href={LEAD_ADMIN.telegramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Telegram ({LEAD_ADMIN.telegram})</span>
                </a>

                <a
                  href={CO_ADMIN.url}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 border border-slate-700 transition-colors"
                >
                  <Send className="w-3.5 h-3.5 text-blue-400" />
                  <span>Co-Admin ({CO_ADMIN.handle})</span>
                </a>

                <a
                  href={LEAD_ADMIN.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-slate-800 hover:bg-blue-600 hover:text-white text-slate-300 border border-slate-700 transition-colors"
                  title="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>

                <a
                  href={LEAD_ADMIN.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 hover:text-white text-slate-300 border border-slate-700 transition-colors"
                  title="GitHub Profile (YUD-west)"
                >
                  <Github className="w-4 h-4" />
                </a>

                <a
                  href={`mailto:${LEAD_ADMIN.email}`}
                  className="p-2.5 rounded-xl bg-slate-800 hover:bg-emerald-600 hover:text-white text-slate-300 border border-slate-700 transition-colors"
                  title={`Email ${LEAD_ADMIN.email}`}
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 
        =======================================================
        WOLISO CAMPUS TECH EVENTS & HACKATHON PHOTO GALLERY
        =======================================================
      */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Authentic Photo Archive"
          badgeColor="blue"
          title="Tech Events & Hackathons in Woliso Campus"
          description="Photographic highlights from our tech orientation ceremonies, Cursor Hackathon Ambo project demos, classroom lectures, and laboratory build sessions."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CAMPUS_EVENT_PHOTOS.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              className="group cursor-pointer rounded-2xl overflow-hidden bg-[#111A2E] border border-slate-800 hover:border-blue-500/50 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative h-56 w-full overflow-hidden bg-slate-950">
                <img
                  src={photo.imageUrl}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111A2E] via-transparent to-transparent opacity-80" />
                <span className="absolute top-3 right-3 bg-slate-900/90 backdrop-blur-md px-2 py-1 rounded-md text-[10px] font-mono text-emerald-400 border border-slate-700 flex items-center gap-1">
                  <Maximize2 className="w-3 h-3" />
                  <span>Click to Expand</span>
                </span>
              </div>

              <div className="p-5 space-y-2">
                <div className="flex items-center gap-1.5 text-xs text-blue-400 font-semibold">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{photo.event}</span>
                </div>
                <h4 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors">
                  {photo.title}
                </h4>
                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                  {photo.description}
                </p>

                <div className="pt-2 flex flex-wrap gap-1">
                  {photo.tags.map((t, i) => (
                    <span key={i} className="text-[10px] font-mono bg-slate-900 text-slate-400 px-2 py-0.5 rounded border border-slate-800">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 
        =======================================================
        OUR CORE VALUES
        =======================================================
      */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Guiding Principles"
          badgeColor="green"
          title="The Values That Guide Every Sprint"
          description="Everything we do—from weekend workshops to semester-long hackathons—is governed by four foundational commitments."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {coreValues.map((val, idx) => {
            const Icon = val.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#111A2E] border border-slate-800 shadow-card flex flex-col justify-between"
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-5 ${val.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white">{val.title}</h3>
                  <div className="text-xs font-semibold text-slate-400 mt-1">
                    {val.tagline}
                  </div>
                  <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {val.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 
        =======================================================
        CAMPUS JOURNEY: FROM IT TO ALL DEPARTMENTS
        =======================================================
      */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider block mb-2">
              Evolutionary Path
            </span>
            <h2 className="text-3xl font-extrabold text-white">
              The Journey: From IT Department to Campus-Wide Innovation
            </h2>
            <p className="mt-3 text-slate-300 leading-relaxed text-sm sm:text-base">
              CGC was conceived by Information Technology students at Woliso Campus who realized that classroom lectures alone could not bridge the gap to real-world software creation.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* Stage 1 */}
            <div className="p-6 rounded-2xl bg-[#111A2E] border border-slate-800 relative">
              <span className="text-xs font-bold font-mono text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-md border border-blue-500/20 inline-block mb-3">
                Phase 1 • Genesis
              </span>
              <h3 className="text-lg font-bold text-white">IT & Informatics Core</h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                Focused on establishing Linux lab proficiency, networking basics, Git version control, and cybersecurity fundamentals among computing undergraduates.
              </p>
            </div>

            {/* Stage 2 */}
            <div className="p-6 rounded-2xl bg-[#111A2E] border border-blue-500/30 relative shadow-glow-blue">
              <span className="text-xs font-bold font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20 inline-block mb-3">
                Phase 2 • Expansion (Current)
              </span>
              <h3 className="text-lg font-bold text-white">Multidisciplinary Cohorts</h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                Opening tracks to Natural Sciences (applied AI diagnostics), Business & Economics (product market validation), and Engineering students across Woliso.
              </p>
            </div>

            {/* Stage 3 */}
            <div className="p-6 rounded-2xl bg-[#111A2E] border border-slate-800 relative">
              <span className="text-xs font-bold font-mono text-slate-400 bg-slate-800 px-2.5 py-1 rounded-md border border-slate-700 inline-block mb-3">
                Phase 3 • Impact
              </span>
              <h3 className="text-lg font-bold text-white">Venture & Community Hub</h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                Partnering with regional organizations, publishing peer-reviewed student research, and incubating campus projects into sustainable civic utilities and tech startups.
              </p>
            </div>
          </div>

          {/* Woliso Campus Facilities Context */}
          <div className="mt-10 p-6 rounded-2xl bg-[#0F172A] border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-slate-800 text-slate-300">
                <MapPin className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Ambo University, Woliso Campus</h4>
                <p className="text-xs text-slate-400">Main ICT Building • Computer Lab 02 • South West Shewa Zone, Oromia</p>
              </div>
            </div>

            <button
              onClick={() => onNavigate('contact')}
              className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1"
            >
              <span>View Lab Hours & Location</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 
        =======================================================
        JOIN CTA
        =======================================================
      */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="p-10 rounded-3xl bg-slate-900 border border-slate-800 max-w-3xl mx-auto space-y-4">
          <h3 className="text-2xl font-bold text-white">Connect with Lead Admin Yesuf Dergu</h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Have questions or want to partner on a campus hackathon? Join the IT Joint Community or message our leadership directly.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <a
              href={OFFICIAL_COMMUNITY.telegramGroup}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-colors flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Join Telegram Group</span>
            </a>
            <button
              onClick={() => onNavigate('contact')}
              className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm border border-slate-700 transition-colors"
            >
              Official Contact Form
            </button>
          </div>
        </div>
      </section>

      {/* 
        =======================================================
        PHOTO LIGHTBOX MODAL
        =======================================================
      */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in" onClick={() => setSelectedPhoto(null)}>
          <div className="relative max-w-4xl w-full bg-[#111A2E] rounded-2xl overflow-hidden border border-slate-700 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors"
              aria-label="Close photo preview"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={selectedPhoto.imageUrl}
              alt={selectedPhoto.title}
              className="w-full max-h-[75vh] object-contain bg-black"
            />
            <div className="p-5 bg-slate-900 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div>
                <span className="text-[11px] font-mono text-blue-400 font-semibold uppercase block">{selectedPhoto.event} • {selectedPhoto.location}</span>
                <span className="font-bold text-white text-base mt-0.5 block">{selectedPhoto.title}</span>
                <p className="text-slate-300 mt-1 max-w-2xl">{selectedPhoto.description}</p>
              </div>
              <span className="text-emerald-400 font-mono font-semibold bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20 whitespace-nowrap">
                Ambo University
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
