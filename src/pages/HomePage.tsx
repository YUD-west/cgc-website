import React, { useState } from 'react';
import { CGCLogo } from '../components/Logo/CGCLogo';
import { SectionHeader } from '../components/SectionHeader';
import { ProjectCard } from '../components/ProjectCard';
import { EventCard } from '../components/EventCard';
import { TRACKS } from '../data/tracks';
import { INITIAL_PROJECTS } from '../data/projects';
import { EVENTS } from '../data/events';
import { Project, ClubEvent } from '../types';
import { 
  ArrowRight, 
  ShieldCheck, 
  Code2, 
  Cpu, 
  Layers, 
  Rocket, 
  CheckCircle2, 
  Terminal, 
  Users, 
  Zap, 
  Sparkles,
  ChevronRight,
  MapPin,
  Maximize2,
  X
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (tab: string) => void;
  onJoinTeam: (project: Project) => void;
  onRsvp: (event: ClubEvent) => void;
  onOpenBrandModal: () => void;
  onProposeProject: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onJoinTeam,
  onRsvp,
  onOpenBrandModal,
  onProposeProject,
}) => {
  const [isPhotoLightboxOpen, setIsPhotoLightboxOpen] = useState(false);
  const featuredProjects = INITIAL_PROJECTS.filter((p) => p.featured);
  const upcomingEvents = EVENTS.filter((e) => e.status === 'Upcoming').slice(0, 3);

  const getTrackIcon = (id: string) => {
    switch (id) {
      case 'cybersecurity':
        return <ShieldCheck className="w-6 h-6 text-blue-400" />;
      case 'programming':
        return <Code2 className="w-6 h-6 text-cyan-400" />;
      case 'ai-ml':
        return <Cpu className="w-6 h-6 text-emerald-400" />;
      case 'software-web':
        return <Layers className="w-6 h-6 text-sky-400" />;
      case 'entrepreneurship':
        return <Rocket className="w-6 h-6 text-amber-400" />;
      default:
        return <Sparkles className="w-6 h-6 text-blue-400" />;
    }
  };

  return (
    <div className="space-y-24 sm:space-y-32 pb-20">
      {/* 
        =======================================================
        HERO SECTION WITH AUTHENTIC WOLISO LAB PHOTO BACKGROUND
        =======================================================
      */}
      <section className="relative pt-12 sm:pt-20 pb-20 overflow-hidden min-h-[85vh] flex items-center">
        {/* Real Campus Lab Background Image Layer */}
        <div className="absolute inset-0 z-0">
          <img
            src="/cgc-community-lab.jpg"
            alt="CGC Students collaborating in computer lab at Ambo University, Woliso Campus"
            className="w-full h-full object-cover object-center scale-105 filter brightness-[0.38] contrast-[1.1] transition-transform duration-1000"
          />
          {/* Multi-layered gradient scrim for perfect text contrast & seamless blend into Midnight Navy */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/85 to-[#0F172A]/70" />
          <div className="absolute inset-0 bg-grid-pattern opacity-25" />
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[300px] bg-emerald-600/15 rounded-full blur-3xl pointer-events-none" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="max-w-4xl mx-auto text-center">
            
            {/* Campus & Community Badge with Photo Trigger */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 backdrop-blur-md border border-slate-700/80 shadow-lg mb-8 animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-semibold text-slate-200">
                Ambo University • Woliso Campus, Ethiopia
              </span>
              <span className="text-slate-600">|</span>
              <button
                onClick={() => setIsPhotoLightboxOpen(true)}
                className="text-xs text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1 transition-colors"
                title="View authentic campus lab session photo"
              >
                <span>Live Lab Photo</span>
                <Maximize2 className="w-3 h-3" />
              </button>
            </div>

            {/* Central CGC Monogram Hero Feature */}
            <div className="flex justify-center mb-6">
              <div 
                onClick={onOpenBrandModal}
                className="cursor-pointer group p-3.5 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-slate-700/80 hover:border-blue-500/60 transition-all duration-300 shadow-2xl hover:scale-105"
                title="Click to view CGC Visual Identity tokens"
              >
                <CGCLogo variant="symbol" size="xl" />
              </div>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1] drop-shadow-md">
              Ideas into <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-emerald-400">Impact.</span>
            </h1>

            {/* Supporting Text */}
            <p className="mt-6 text-lg sm:text-xl text-slate-200 leading-relaxed max-w-2xl mx-auto drop-shadow-sm font-normal">
              Welcome to <strong className="text-white font-semibold">CGC (Cyber Guardians Club)</strong>. A student-led technology and innovation community where students learn, collaborate, build real projects, and turn ideas into useful solutions.
            </p>

            {/* Core Principle Callout */}
            <div className="mt-6 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900/90 backdrop-blur-md border border-blue-500/30 text-xs sm:text-sm font-medium text-blue-200 shadow-lg">
              <Terminal className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Core Principle: <strong className="text-white">Don't just attend events. Build things that matter.</strong></span>
            </div>

            {/* Call To Actions */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => onNavigate('join')}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-base shadow-glow-blue transition-all duration-200 flex items-center justify-center gap-2 group hover:scale-[1.02]"
              >
                <span>Join CGC Today</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => onNavigate('projects')}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 font-semibold text-base border border-slate-700 backdrop-blur-md transition-colors flex items-center justify-center gap-2"
              >
                <span>Explore Student Projects</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            </div>

            {/* Department Inclusivity Note */}
            <p className="mt-6 text-xs text-slate-300">
              * Welcoming students from <span className="text-white font-medium">IT, Informatics, Natural Sciences, Agriculture, Business & Social Sciences</span>.
            </p>

            {/* Stats / Highlights Row */}
            <div className="mt-14 pt-8 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-left">
              <div className="p-4 rounded-xl bg-slate-900/80 backdrop-blur-md border border-slate-800/80 shadow-md">
                <div className="text-2xl font-extrabold text-white">5 Tracks</div>
                <div className="text-xs text-slate-300 mt-1">Cyber, AI, Code, Web, Startup</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 backdrop-blur-md border border-slate-800/80 shadow-md">
                <div className="text-2xl font-extrabold text-blue-400">100% Student-Led</div>
                <div className="text-xs text-slate-300 mt-1">Peer learning & open sprints</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 backdrop-blur-md border border-slate-800/80 shadow-md">
                <div className="text-2xl font-extrabold text-emerald-400">Real Projects</div>
                <div className="text-xs text-slate-300 mt-1">Working tools, zero tutorial fatigue</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 backdrop-blur-md border border-slate-800/80 shadow-md">
                <div className="text-2xl font-extrabold text-white">Open Community</div>
                <div className="text-xs text-slate-300 mt-1">Free public lab sessions for all</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 
        =======================================================
        COMMUNITY IN ACTION FEATURE BANNER
        =======================================================
      */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-r from-[#111A2E] via-slate-900 to-[#111A2E] border border-slate-800 shadow-2xl flex flex-col lg:flex-row items-center gap-8">
          {/* Photo Thumbnail Showcase */}
          <div className="relative group rounded-2xl overflow-hidden border border-slate-700 shadow-xl lg:w-1/2 flex-shrink-0 cursor-pointer" onClick={() => setIsPhotoLightboxOpen(true)}>
            <img
              src="/cgc-community-lab.jpg"
              alt="CGC members in Woliso Campus computer lab"
              className="w-full h-64 sm:h-72 object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
              <span className="flex items-center gap-1.5 font-medium bg-slate-900/90 px-2.5 py-1 rounded-md border border-slate-700">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>Woliso Campus ICT Lab Session</span>
              </span>
              <span className="bg-blue-600/90 px-2 py-1 rounded-md font-semibold text-[11px] flex items-center gap-1">
                <Maximize2 className="w-3 h-3" /> Expand
              </span>
            </div>
          </div>

          {/* Description of authentic community */}
          <div className="space-y-4 lg:w-1/2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
              <span>Authentic Campus Community</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Real Students. Real Code. Real Impact.
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Every week, CGC brings students together in the Woliso Campus computer laboratories. Senior peers mentor freshmen, cross-faculty teams assemble around shared challenges, and concepts move rapidly from whiteboard to working code.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={() => onNavigate('about')}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md transition-colors"
              >
                Read Our Story & Values
              </button>
              <button
                onClick={() => onNavigate('events')}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
              >
                Join Next Lab Session
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 
        =======================================================
        WHAT CGC DOES (VISION & PRINCIPLE)
        =======================================================
      */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Our Purpose"
          badgeColor="blue"
          title="More Than A Cybersecurity Club"
          description="CGC was born from Information Technology students at Ambo University Woliso Campus with a vision to transcend theory. Today, we empower students across all university departments to turn ideas into practical solutions."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-7 rounded-2xl bg-[#111A2E] border border-slate-800 shadow-card hover:border-slate-700 transition-all">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mb-5">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Practical Learning</h3>
            <p className="mt-2.5 text-sm text-slate-300 leading-relaxed">
              We skip passive lecturing. Every workshop involves terminal access, packet inspection, algorithm sprints, or repository commits in the Woliso Campus ICT labs.
            </p>
          </div>

          <div className="p-7 rounded-2xl bg-[#111A2E] border border-slate-800 shadow-card hover:border-slate-700 transition-all">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-5">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Cross-Department Teams</h3>
            <p className="mt-2.5 text-sm text-slate-300 leading-relaxed">
              IT coders collaborate with agriculture students for crop disease diagnostics, and business students for venture validation. Innovation happens at intersections.
            </p>
          </div>

          <div className="p-7 rounded-2xl bg-[#111A2E] border border-slate-800 shadow-card hover:border-slate-700 transition-all">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mb-5">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Build Things That Matter</h3>
            <p className="mt-2.5 text-sm text-slate-300 leading-relaxed">
              Our central rule is that learning is proven when someone uses what you created. We focus on real campus pain points, local utilities, and open source tools.
            </p>
          </div>
        </div>
      </section>

      {/* 
        =======================================================
        5 INNOVATION AREAS (TRACKS)
        =======================================================
      */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Learning & Innovation Tracks"
          badgeColor="green"
          title="Choose Your Discipline"
          description="Whether you want to audit network vulnerabilities, optimize data structures, train AI models on local datasets, build modern web apps, or launch a tech venture."
          action={
            <button
              onClick={() => onNavigate('explore')}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors"
            >
              <span>View Detailed Curricula</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TRACKS.map((track) => (
            <div
              key={track.id}
              onClick={() => onNavigate('explore')}
              className="cursor-pointer group p-6 rounded-2xl bg-[#111A2E] hover:bg-[#14223F] border border-slate-800 hover:border-slate-700 transition-all duration-300 flex flex-col justify-between shadow-card hover:shadow-card-hover"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    {getTrackIcon(track.id)}
                  </div>
                  <span className="text-[11px] font-mono text-slate-500 uppercase">
                    Track #{track.id}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors">
                  {track.name}
                </h3>
                <p className="mt-2 text-xs font-medium text-emerald-400">
                  {track.tagline}
                </p>
                <p className="mt-2.5 text-sm text-slate-300 leading-relaxed line-clamp-3">
                  {track.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-medium">
                  {track.topics.length} core subject areas
                </span>
                <span className="text-xs font-semibold text-blue-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Explore Track <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}

          {/* Interactive Propose Track Card */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-blue-950/40 border border-dashed border-slate-700 flex flex-col justify-between">
            <div>
              <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 w-fit mb-4">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Have a Unique Problem?</h3>
              <p className="mt-2 text-xs text-slate-400">
                You don't need to fit into an existing box. Propose an interdisciplinary student project or a community study circle.
              </p>
            </div>
            <div className="mt-6">
              <button
                onClick={onProposeProject}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white border border-slate-700 transition-colors"
              >
                Propose a Project Idea
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 
        =======================================================
        FEATURED STUDENT PROJECTS
        =======================================================
      */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Real Code & Innovation"
          badgeColor="blue"
          title="Featured Student Projects"
          description="Projects initiated by CGC or proposed by students across departments. Built by students at Ambo University Woliso Campus to tackle genuine needs."
          action={
            <div className="flex items-center gap-3">
              <button
                onClick={onProposeProject}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
              >
                + Propose an Idea
              </button>
              <button
                onClick={() => onNavigate('projects')}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-colors"
              >
                All Projects ({INITIAL_PROJECTS.length})
              </button>
            </div>
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onJoinTeam={onJoinTeam}
            />
          ))}
        </div>
      </section>

      {/* 
        =======================================================
        UPCOMING EVENTS & ACTIVITIES
        =======================================================
      */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Campus Activities"
          badgeColor="green"
          title="Upcoming Workshops & Build Sessions"
          description="Hands-on sessions hosted in Woliso Campus ICT labs and online channels. Free to all university students."
          action={
            <button
              onClick={() => onNavigate('events')}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors"
            >
              <span>View Full Calendar & Past Recaps</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          }
        />

        <div className="space-y-4">
          {upcomingEvents.map((evt) => (
            <EventCard key={evt.id} event={evt} onRsvp={onRsvp} />
          ))}
        </div>
      </section>

      {/* 
        =======================================================
        OPEN COMMUNITY PARTICIPATION MODEL
        =======================================================
      */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#111A2E] via-slate-900 to-[#0F1B33] border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider block mb-2">
              Our Community Structure
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              How Students Can Participate
            </h2>
            <p className="mt-3 text-slate-300 text-base leading-relaxed">
              We operate an open, two-tier community model to make sure no student is excluded while giving dedicated builders the structure they need to succeed.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Tier 1: Open Community */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-400 font-mono">
                  Tier 1
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  Open to Everyone
                </span>
              </div>
              <h3 className="text-xl font-bold text-white">Open Community</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Any student at Ambo University Woliso Campus can attend public technical workshops, access open code repositories, and participate in our general Telegram discussions.
              </p>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Attend all public ICT lab workshops and guest talks</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Access shared starter repositories and learning guides</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Join the general Woliso student tech Telegram forum</span>
                </li>
              </ul>
            </div>

            {/* Tier 2: Official Members */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-blue-600/40 space-y-4 shadow-glow-blue relative">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono">
                  Tier 2
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Official Membership
                </span>
              </div>
              <h3 className="text-xl font-bold text-white">Official CGC Member</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                For students committed to regular sprints, building active team projects, representing the club in hackathons, and receiving structured technical mentorship.
              </p>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <span>Assigned to active project cohorts & peer code reviews</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <span>Eligible for club-sponsored contest and CTF teams</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <span>Official CGC Member Certificate & Digital Pass</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 text-center sm:text-left">
            <button
              onClick={() => onNavigate('join')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-md transition-colors"
            >
              <span>Apply for Official Membership</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 
        =======================================================
        FINAL INVITATION CTA
        =======================================================
      */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="p-10 sm:p-16 rounded-3xl bg-gradient-to-b from-blue-950/40 via-slate-900 to-[#0F172A] border border-blue-900/50 shadow-2xl relative">
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="inline-block p-2.5 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
              <CGCLogo variant="symbol" size="md" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Ready to Turn Your Ideas into Impact?
            </h2>
            <p className="text-slate-300 text-base leading-relaxed">
              Whether you wrote your first "Hello World" yesterday or have built full-stack software, your perspective and passion belong at CGC. Join the student innovation movement at Ambo University, Woliso Campus.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => onNavigate('join')}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-base shadow-glow-blue transition-all"
              >
                Submit Membership Application
              </button>
              <button
                onClick={() => onNavigate('contact')}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-base border border-slate-700 transition-colors"
              >
                Contact & Campus Location
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 
        =======================================================
        PHOTO LIGHTBOX MODAL
        =======================================================
      */}
      {isPhotoLightboxOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in" onClick={() => setIsPhotoLightboxOpen(false)}>
          <div className="relative max-w-4xl w-full bg-[#111A2E] rounded-2xl overflow-hidden border border-slate-700 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setIsPhotoLightboxOpen(false)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors"
              aria-label="Close photo preview"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src="/cgc-community-lab.jpg"
              alt="CGC students working together in computer laboratory at Woliso Campus"
              className="w-full max-h-[75vh] object-contain bg-black"
            />
            <div className="p-4 bg-slate-900 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
              <div>
                <span className="font-bold text-white block text-sm">Ambo University, Woliso Campus • CGC Lab Session</span>
                <span className="text-slate-400">Students actively pair-programming, discussing system architectures, and testing tools.</span>
              </div>
              <span className="text-emerald-400 font-mono font-semibold bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20 whitespace-nowrap">
                Ideas into Impact
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
