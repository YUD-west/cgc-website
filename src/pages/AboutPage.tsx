import React from 'react';
import { SectionHeader } from '../components/SectionHeader';
import { CGCLogo } from '../components/Logo/CGCLogo';
import { 
  ShieldCheck, 
  Users, 
  Compass, 
  TrendingUp, 
  Sparkles, 
  BookOpen, 
  Target, 
  MapPin, 
  ArrowRight,
  GraduationCap,
  Layers,
  HeartHandshake
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (tab: string) => void;
  onOpenBrandModal: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, onOpenBrandModal }) => {
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
        VISUAL IDENTITY CALLOUT
        =======================================================
      */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-3xl bg-[#111A2E] border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
              Club Identity & Credibility
            </span>
            <h3 className="text-2xl font-bold text-white">A Geometric Identity Designed for Impact</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              The CGC lettermark was custom-engineered to represent resilience, digital defense, and collaborative velocity. Tested for high readability on small mobile screens, conference badges, academic certificates, and university merchandise.
            </p>
            <div className="pt-2">
              <button
                onClick={onOpenBrandModal}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors"
              >
                <span>Inspect CGC Monogram & Palette Tokens</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="flex-shrink-0 p-6 rounded-2xl bg-slate-900 border border-slate-800">
            <CGCLogo variant="full" size="lg" />
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
          <h3 className="text-2xl font-bold text-white">Join the Woliso Student Movement</h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Beginner or seasoned programmer, IT or natural sciences—our cohorts are open and waiting for you.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onNavigate('join')}
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-colors"
            >
              Fill Out Membership Form
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
