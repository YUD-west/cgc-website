import React, { useState } from 'react';
import { CGCLogo } from '../components/Logo/CGCLogo';
import { ProjectCard } from '../components/ProjectCard';
import { EventCard } from '../components/EventCard';
import { INITIAL_PROJECTS } from '../data/projects';
import { EVENTS } from '../data/events';
import { CAMPUS_EVENT_PHOTOS, CampusEventPhoto } from '../data/team';
import { Project, ClubEvent } from '../types';
import { 
  ArrowRight, 
  Users, 
  Code2, 
  Lightbulb, 
  Sprout, 
  Briefcase, 
  HeartHandshake, 
  MapPin, 
  Maximize2, 
  X,
  Compass,
  ChevronRight,
  ShieldCheck
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

  const featuredProjects = INITIAL_PROJECTS.filter((p) => p.featured).slice(0, 3);
  const upcomingEvents = EVENTS.filter((e) => e.status === 'Upcoming').slice(0, 3);

  const academicStreams = [
    {
      title: 'Informatics & IT',
      icon: Code2,
      accent: 'text-blue-400',
      description: 'Building web systems, hardening network security, developing AI tools, and shipping code.'
    },
    {
      title: 'Agriculture & Sciences',
      icon: Sprout,
      accent: 'text-emerald-400',
      description: 'Solving regional agricultural challenges, crop monitoring, data analysis, and climate solutions.'
    },
    {
      title: 'Business & Economics',
      icon: Briefcase,
      accent: 'text-amber-400',
      description: 'Turning software prototypes into viable products, market research, and student entrepreneurship.'
    },
    {
      title: 'Social Sciences & Health',
      icon: HeartHandshake,
      accent: 'text-rose-400',
      description: 'Human-centered design, community research, healthcare digital tools, and local adoption.'
    }
  ];

  return (
    <div className="space-y-24 sm:space-y-28 pb-24">
      
      {/* 
        =======================================================
        1. HERO SECTION: CLEAN, PURPOSEFUL & GROUNDED
        =======================================================
      */}
      <section className="relative pt-12 sm:pt-20 pb-16 overflow-hidden min-h-[80vh] flex items-center">
        {/* Authentic Woliso Lab Photo Layer */}
        <div className="absolute inset-0 z-0">
          <img
            src="/cgc-community-lab.jpg"
            alt="Students collaborating in Woliso Campus computer lab"
            className="w-full h-full object-cover object-center filter brightness-[0.25] contrast-[1.05]"
          />
          {/* Subtle vignette gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/85 to-[#0F172A]/75" />
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center">
          
          {/* Campus Location Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-xs text-slate-300 mb-8">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Ambo University • Woliso Campus, Ethiopia</span>
          </div>

          {/* CGC Distinctive Lettermark */}
          <div className="flex justify-center mb-6">
            <button
              onClick={onOpenBrandModal}
              className="p-3 rounded-2xl bg-slate-900/90 border border-slate-700/70 hover:border-blue-500/50 transition-all shadow-xl"
              title="CGC Geometric Lettermark"
            >
              <CGCLogo variant="symbol" size="lg" />
            </button>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.08]">
            Ideas into <span className="text-blue-500">Impact.</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-base sm:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto font-normal">
            A student-led technology and innovation community at Ambo University, Woliso Campus. We bring together students from every academic field to collaborate, learn, and build practical solutions that matter.
          </p>

          {/* Core Principle Badge */}
          <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/80 border border-slate-800 text-xs sm:text-sm text-slate-300">
            <span>Guiding Principle:</span>
            <strong className="text-white">"Don't just attend events. Build things that matter."</strong>
          </div>

          {/* Primary Calls to Action */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('join')}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>Join the Community</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('projects')}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 font-semibold text-sm border border-slate-700 transition-colors flex items-center justify-center gap-2"
            >
              <span>Explore Student Projects</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>

          {/* Community Stats Bar */}
          <div className="mt-14 pt-8 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="text-xl font-bold text-white">All Disciplines</div>
              <div className="text-xs text-slate-400 mt-0.5">Computing, Agri, Biz, Social</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="text-xl font-bold text-blue-400">100% Student-Led</div>
              <div className="text-xs text-slate-400 mt-0.5">Peer learning & open teams</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="text-xl font-bold text-emerald-400">Practical Projects</div>
              <div className="text-xs text-slate-400 mt-0.5">Real code & tangible tools</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="text-xl font-bold text-white">Free & Open</div>
              <div className="text-xs text-slate-400 mt-0.5">Open labs & peer workshops</div>
            </div>
          </div>

        </div>
      </section>

      {/* 
        =======================================================
        2. THE HEART OF CGC: CROSS-DISCIPLINARY COLLABORATION
        =======================================================
      */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-400 uppercase tracking-wider mb-3">
            Cross-Disciplinary Innovation
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            More than code. People solving problems together.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400 leading-relaxed">
            Great solutions do not come from programmers alone. They happen when technology students collaborate with students from agriculture, business, health, and natural sciences.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {academicStreams.map((stream, idx) => {
            const Icon = stream.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#111A2E] border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className={`w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center mb-4 ${stream.accent}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-white text-base mb-2">{stream.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{stream.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 
        =======================================================
        3. REAL CAMPUS EVENTS & LAB SESSIONS (AUTHENTIC PHOTOS)
        =======================================================
      */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">
              Authentic Campus Moments
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Woliso Campus & Hackathon Gallery
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Real moments from competitive hackathons, technical orientations, and computer laboratory sessions.
            </p>
          </div>

          <button
            onClick={() => onNavigate('events')}
            className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors"
          >
            <span>View All Event Archives</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* 4 Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CAMPUS_EVENT_PHOTOS.slice(0, 4).map((photo) => (
            <div
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              className="group relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 cursor-pointer shadow-card hover:border-slate-700 transition-all"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={photo.imageUrl}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-3.5 bg-[#111A2E] border-t border-slate-800">
                <h4 className="text-xs font-bold text-white line-clamp-1 group-hover:text-blue-400 transition-colors">
                  {photo.title}
                </h4>
                <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1">
                  <span>{photo.event}</span>
                  <span className="flex items-center gap-0.5 text-blue-400 font-medium">
                    <Maximize2 className="w-3 h-3" /> View
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 
        =======================================================
        4. FEATURED REAL STUDENT PROJECTS
        =======================================================
      */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-400 uppercase tracking-wider mb-2">
              Built at Woliso Campus
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Featured Student Projects
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Real projects initiated by CGC and proposed by student teams. Open for collaborators.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onProposeProject}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
            >
              + Propose a Project
            </button>
            <button
              onClick={() => onNavigate('projects')}
              className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors"
            >
              <span>See All Projects</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
        5. UPCOMING LAB WORKSHOPS & ACTIVITIES
        =======================================================
      */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">
              Practical Learning
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Upcoming Workshops & Sessions
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Hands-on sessions in Computer Lab 02. Beginners always welcome.
            </p>
          </div>

          <button
            onClick={() => onNavigate('events')}
            className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors"
          >
            <span>All Activities</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
        6. WELCOMING INVITATION
        =======================================================
      */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#111A2E] border border-slate-800 shadow-card space-y-6">
          <div className="w-12 h-12 rounded-2xl bg-blue-600/10 text-blue-400 border border-blue-500/20 flex items-center justify-center mx-auto">
            <Users className="w-6 h-6" />
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            Ready to build something that matters?
          </h3>

          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            You don't need to be an experienced programmer to be part of CGC. Whether you want to learn to code, pitch a community problem to solve, or lead project design, your perspective is needed.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('join')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>Join CGC (Free Registration)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('about')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-sm font-semibold border border-slate-700 transition-colors"
            >
              Learn More About Our Team
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
            className="relative max-w-4xl w-full bg-[#111A2E] border border-slate-700 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/80">
              <div>
                <h4 className="text-sm font-bold text-white">{selectedPhoto.title}</h4>
                <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{selectedPhoto.location}</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedPhoto(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-auto p-4 flex flex-col items-center">
              <img
                src={selectedPhoto.imageUrl}
                alt={selectedPhoto.title}
                className="max-h-[60vh] w-auto object-contain rounded-xl shadow-lg border border-slate-800"
              />
              <p className="mt-4 text-xs sm:text-sm text-slate-300 text-center max-w-2xl leading-relaxed">
                {selectedPhoto.description}
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
