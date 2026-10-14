import React, { useState } from 'react';
import { CGCLogo } from '../components/Logo/CGCLogo';
import { ProjectCard } from '../components/ProjectCard';
import { EventCard } from '../components/EventCard';
import { LiveActivityBar } from '../components/LiveActivityBar';
import { InteractivePathway } from '../components/InteractivePathway';
import { PassPreviewWidget } from '../components/PassPreviewWidget';
import { INITIAL_PROJECTS } from '../data/projects';
import { EVENTS } from '../data/events';
import { CAMPUS_EVENT_PHOTOS, CampusEventPhoto } from '../data/team';
import { Project, ClubEvent } from '../types';
import { 
  ArrowRight, 
  Users, 
  Code2, 
  Sprout, 
  Briefcase, 
  HeartHandshake, 
  MapPin, 
  Maximize2, 
  X,
  ChevronRight,
  ShieldCheck,
  Terminal,
  Cpu,
  Sparkles
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
  const [selectedPhoto, setSelectedPhoto] = useState<CampusEventPhoto | null>(null);

  const featuredProjects = INITIAL_PROJECTS.slice(0, 3);
  const upcomingEvents = EVENTS.filter((e) => e.status === 'Upcoming').slice(0, 3);

  const academicStreams = [
    {
      title: 'Informatics & IT',
      subheading: 'Web systems, network defense, Linux & AI models',
      icon: Code2,
      accent: 'text-blue-400',
    },
    {
      title: 'Agriculture & Sciences',
      subheading: 'Crop diagnostics, field data, soil telemetry & weather',
      icon: Sprout,
      accent: 'text-emerald-400',
    },
    {
      title: 'Business & Economics',
      subheading: 'Startup models, product validation & market testing',
      icon: Briefcase,
      accent: 'text-amber-400',
    },
    {
      title: 'Health & Social Sciences',
      subheading: 'Community healthcare tools & regional accessibility',
      icon: HeartHandshake,
      accent: 'text-rose-400',
    }
  ];

  return (
    <div className="space-y-14 sm:space-y-20 pb-28 sm:pb-20">
      
      {/* 
        =======================================================
        0. LIVE CAMPUS STATUS TICKER BAR
        =======================================================
      */}
      <LiveActivityBar />

      {/* 
        =======================================================
        1. HERO SECTION: DIRECT HEADING, NO EYEBROW BADGE
        =======================================================
      */}
      <section className="relative pt-6 sm:pt-12 pb-12 overflow-hidden flex items-center border-b border-slate-800/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center">
          
          {/* Main Direct Heading — Clean & Confident */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.08]">
            Ideas into <span className="text-blue-500">Impact.</span>
          </h1>

          {/* Sub-heading directly under heading */}
          <p className="mt-3 text-base sm:text-xl text-blue-400 font-medium">
            Cyber Guardians Club • Ambo University, Woliso Campus
          </p>

          <p className="mt-4 text-xs sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto font-normal">
            A student-led community uniting computing, agriculture, business, and health sciences to build real software, defend campus networks, and solve regional challenges.
          </p>

          {/* Calls to Action with Motion Spring Effect */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => onNavigate('join')}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <span>Join the Community</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('projects')}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 font-semibold text-xs sm:text-sm border border-slate-700 transition-colors flex items-center justify-center gap-2 active:scale-95"
            >
              <span>Explore Student Projects</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>

          {/* Small Compact Stats Bar */}
          <div className="mt-12 pt-6 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
            <div className="p-3.5 rounded-2xl bg-[#0F172A] border border-slate-800 hover:border-slate-700 transition-colors">
              <div className="text-sm sm:text-base font-bold text-white">4 Disciplines</div>
              <div className="text-[11px] text-slate-400 mt-0.5">IT, Agri, Biz, Health</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#0F172A] border border-slate-800 hover:border-slate-700 transition-colors">
              <div className="text-sm sm:text-base font-bold text-blue-400">Computer Lab 02</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Terminal workstations</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#0F172A] border border-slate-800 hover:border-slate-700 transition-colors">
              <div className="text-sm sm:text-base font-bold text-emerald-400">100% Free</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Open university club</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#0F172A] border border-slate-800 hover:border-slate-700 transition-colors">
              <div className="text-sm sm:text-base font-bold text-white">Student-Led</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Peer mentorship</div>
            </div>
          </div>

        </div>
      </section>

      {/* 
        =======================================================
        2. INTERACTIVE "CHOOSE YOUR PATH" MOTION MATRIX (NEW)
        =======================================================
      */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <InteractivePathway onNavigate={onNavigate} />
      </section>

      {/* 
        =======================================================
        3. ACADEMIC DISCIPLINES: NO BADGE ABOVE HEADING
        =======================================================
      */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Academic Disciplines
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-400">
            Cross-faculty collaboration between technical software builders and domain problem solvers.
          </p>
        </div>

        {/* Small, compact cards with sub-headings */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {academicStreams.map((stream, idx) => {
            const Icon = stream.icon;
            return (
              <div
                key={idx}
                className="p-4 sm:p-5 rounded-2xl bg-[#0F172A] border border-slate-800 hover:border-slate-700 hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between shadow-sm"
              >
                <div>
                  <div className={`w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center mb-3 ${stream.accent}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-white text-sm sm:text-base">{stream.title}</h3>
                  <p className="text-xs text-blue-400/90 font-medium mt-0.5">{stream.subheading}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 
        =======================================================
        4. REAL CAMPUS GALLERY: NO BADGE ABOVE HEADING
        =======================================================
      */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Woliso Campus Gallery
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Real moments from competitive hackathons, orientations, and Computer Lab 02.
            </p>
          </div>

          <button
            onClick={() => onNavigate('events')}
            className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors self-start sm:self-auto"
          >
            <span>View All Events</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 4 Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CAMPUS_EVENT_PHOTOS.slice(0, 4).map((photo) => (
            <div
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              className="group relative rounded-2xl overflow-hidden border border-slate-800 bg-[#0F172A] cursor-pointer hover:border-slate-700 hover:-translate-y-0.5 transition-all duration-200 shadow-sm"
            >
              <div className="aspect-[4/3] overflow-hidden bg-slate-900">
                <img
                  src={photo.imageUrl}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-3 bg-[#0F172A] border-t border-slate-800">
                <h4 className="text-xs font-bold text-white line-clamp-1 group-hover:text-blue-400 transition-colors">
                  {photo.title}
                </h4>
                <div className="flex items-center justify-between text-[11px] text-slate-400 mt-0.5">
                  <span className="truncate">{photo.event}</span>
                  <span className="flex items-center gap-0.5 text-blue-400 shrink-0">
                    <Maximize2 className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 
        =======================================================
        5. FEATURED PROJECTS: NO BADGE ABOVE HEADING
        =======================================================
      */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Featured Campus Projects
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Active student-led software prototypes and security tools. Open for contributors.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={onProposeProject}
              className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors active:scale-95"
            >
              + Propose a Project
            </button>
            <button
              onClick={() => onNavigate('projects')}
              className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors px-2"
            >
              <span>See All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Small, compact Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
        6. INTERACTIVE MEMBER PASS SIMULATOR (NEW FEATURE)
        =======================================================
      */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PassPreviewWidget onNavigate={onNavigate} />
      </section>

      {/* 
        =======================================================
        7. UPCOMING WORKSHOPS: NO BADGE ABOVE HEADING
        =======================================================
      */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Upcoming Workshops & Sessions
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Hands-on practical sessions in Computer Lab 02. Beginners always welcome.
            </p>
          </div>

          <button
            onClick={() => onNavigate('events')}
            className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors self-start sm:self-auto"
          >
            <span>All Activities</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Small, compact Event Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {upcomingEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onRsvp={onRsvp}
            />
          ))}
        </div>
      </section>

      {/* 
        =======================================================
        8. COMPACT WELCOME ACTION
        =======================================================
      */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="p-6 sm:p-8 rounded-2xl bg-[#0F172A] border border-slate-800 space-y-4">
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            Ready to Build With CGC?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
            Open to all Ambo University Woliso Campus students. Whether you are learning to code or bringing a domain problem to solve, you are welcome.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => onNavigate('join')}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 active:scale-95 shadow-md"
            >
              <span>Join CGC (Free Registration)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onNavigate('about')}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs sm:text-sm font-semibold border border-slate-700 transition-colors active:scale-95"
            >
              About Leadership
            </button>
          </div>
        </div>
      </section>

      {/* 
        =======================================================
        LIGHTBOX MODAL FOR REAL CAMPUS PHOTOS
        =======================================================
      */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative max-w-3xl w-full bg-[#0F172A] border border-slate-700 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-3.5 border-b border-slate-800 flex items-center justify-between bg-slate-900/80">
              <div>
                <h4 className="text-sm font-bold text-white">{selectedPhoto.title}</h4>
                <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-0.5">
                  <MapPin className="w-3 h-3 text-emerald-400" />
                  <span>{selectedPhoto.location}</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedPhoto(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="overflow-auto p-4 flex flex-col items-center">
              <img
                src={selectedPhoto.imageUrl}
                alt={selectedPhoto.title}
                className="max-h-[60vh] w-auto object-contain rounded-xl shadow-lg border border-slate-800"
              />
              <p className="mt-3 text-xs sm:text-sm text-slate-300 text-center max-w-xl leading-relaxed">
                {selectedPhoto.description}
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
