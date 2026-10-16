import React from 'react';
import { ProjectCard } from '../components/ProjectCard';
import { EventCard } from '../components/EventCard';
import { INITIAL_PROJECTS } from '../data/projects';
import { EVENTS } from '../data/events';
import { LEAD_ADMIN, OFFICIAL_COMMUNITY } from '../data/team';
import { Project, ClubEvent } from '../types';
import { 
  ArrowRight, 
  Code2, 
  ShieldCheck, 
  Sprout, 
  Users, 
  MapPin, 
  Send,
  Calendar,
  Layers,
  Sparkles,
  ChevronRight,
  BookOpen
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (tab: string) => void;
  onJoinTeam: (project: Project) => void;
  onRsvp: (event: ClubEvent) => void;
  onOpenBrandModal?: () => void;
  onProposeProject?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onJoinTeam,
  onRsvp,
  onProposeProject,
}) => {
  // Top 3 projects & upcoming events
  const featuredProjects = INITIAL_PROJECTS.slice(0, 3);
  const upcomingEvents = EVENTS.filter((e) => e.status === 'Upcoming').slice(0, 3);

  const pillars = [
    {
      title: 'Software & Web Development',
      description: 'Learn practical coding, web systems, APIs, and modern tools through real student projects.',
      icon: Code2,
      color: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    },
    {
      title: 'Cybersecurity & Networks',
      description: 'Hands-on practice in Computer Lab 02: Linux terminal essentials, network safety, and system defense.',
      icon: ShieldCheck,
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    },
    {
      title: 'Campus & Community Innovation',
      description: 'Collaborate across departments to apply technology to agriculture, business, and campus solutions.',
      icon: Sprout,
      color: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    },
    {
      title: 'Beginner-Friendly Mentorship',
      description: 'No prior coding experience needed. Senior members guide beginners step-by-step.',
      icon: Users,
      color: 'text-sky-400 bg-sky-500/10 border-sky-500/20',
    },
  ];

  return (
    <div className="space-y-16 sm:space-y-20 pb-20">
      
      {/* 
        =======================================================
        1. HERO SECTION: SIMPLE, CLEAR, INVITATIONAL
        =======================================================
      */}
      <section className="relative pt-12 sm:pt-20 pb-12 overflow-hidden border-b border-slate-800/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          
          {/* Friendly Campus Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-700/80 text-xs text-slate-300 font-medium mb-6 shadow-sm">
            <MapPin className="w-3.5 h-3.5 text-emerald-400" />
            <span>Ambo University • Woliso Campus</span>
          </div>

          {/* Main Direct Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
            Cyber Guardians Club
          </h1>

          {/* Clean Sub-title */}
          <p className="mt-3 text-lg sm:text-xl font-semibold text-blue-400">
            Learn Practical Tech. Build Real Software. Connect With Peers.
          </p>

          <p className="mt-4 text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            A student-led technology community welcoming learners from IT, agriculture, business, health, and engineering. 100% free and open to all students.
          </p>

          {/* Clean Primary Actions */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => onNavigate('join')}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-md transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <span>Join CGC (Free Registration)</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('projects')}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 font-semibold text-sm border border-slate-700 transition-colors flex items-center justify-center gap-2 active:scale-95"
            >
              <span>Browse Student Projects</span>
            </button>
          </div>

          {/* 3 Simple Highlights */}
          <div className="mt-12 pt-8 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
            <div className="p-4 rounded-2xl bg-[#0D1527] border border-slate-800">
              <div className="text-sm font-bold text-white">All Faculties Welcome</div>
              <div className="text-xs text-slate-400 mt-1">IT, Business, Agri, Health & Sciences</div>
            </div>
            <div className="p-4 rounded-2xl bg-[#0D1527] border border-slate-800">
              <div className="text-sm font-bold text-emerald-400">Computer Lab 02</div>
              <div className="text-xs text-slate-400 mt-1">Main ICT Building Workstations</div>
            </div>
            <div className="p-4 rounded-2xl bg-[#0D1527] border border-slate-800">
              <div className="text-sm font-bold text-blue-400">100% Free & Open</div>
              <div className="text-xs text-slate-400 mt-1">No fees • Peer student mentorship</div>
            </div>
          </div>

        </div>
      </section>

      {/* 
        =======================================================
        2. WHAT WE DO: 4 CLEAR FOCUS CARDS
        =======================================================
      */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            What We Do
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-slate-400">
            Simple, practical technology pathways for beginners and intermediate builders alike.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="p-5 sm:p-6 rounded-2xl bg-[#0D1527] border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between shadow-sm"
              >
                <div>
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center mb-4 ${pillar.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{pillar.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{pillar.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 
        =======================================================
        3. FEATURED STUDENT PROJECTS (CLEAN 3 CARDS)
        =======================================================
      */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Featured Projects
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-400">
              Real software and tools built by students at Ambo University Woliso Campus.
            </p>
          </div>

          <button
            onClick={() => onNavigate('projects')}
            className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors self-start sm:self-auto"
          >
            <span>View All Projects</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
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
        4. UPCOMING LAB WORKSHOPS & EVENTS
        =======================================================
      */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Upcoming Workshops & Sessions
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-400">
              Free, hands-on lab sessions in Computer Lab 02. Beginners always welcome.
            </p>
          </div>

          <button
            onClick={() => onNavigate('events')}
            className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors self-start sm:self-auto"
          >
            <span>All Workshops</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
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
        5. LEADERSHIP & WOLISO CAMPUS NOTE
        =======================================================
      */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0D1527] border border-slate-800 flex flex-col sm:flex-row items-center gap-6">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-blue-500/50 shrink-0">
            <img
              src={LEAD_ADMIN.photoUrl}
              alt={LEAD_ADMIN.name}
              className="w-full h-full object-cover object-top"
            />
          </div>
          <div className="text-center sm:text-left space-y-2 flex-1">
            <div className="text-xs text-blue-400 font-semibold uppercase tracking-wider">
              Student Leadership Desk
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white">
              {LEAD_ADMIN.name} — Lead Administrator
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              &quot;Our mission at Woliso Campus is simple: help students move from theory to building real software. Join our community sessions every week in Computer Lab 02.&quot;
            </p>
            <div className="pt-1 flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs">
              <a
                href={OFFICIAL_COMMUNITY.telegramGroup}
                target="_blank"
                rel="noreferrer"
                className="text-blue-400 hover:underline flex items-center gap-1 font-semibold"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Join Telegram Group</span>
              </a>
              <span className="text-slate-600">•</span>
              <button
                onClick={() => onNavigate('about')}
                className="text-slate-400 hover:text-white"
              >
                Learn About Leadership →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 
        =======================================================
        6. SIMPLE REGISTRATION CALL TO ACTION
        =======================================================
      */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-[#0D1527] to-[#070B14] border border-slate-800 space-y-4 shadow-lg">
          <h3 className="text-2xl font-bold text-white tracking-tight">
            Ready to Join Cyber Guardians Club?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
            Register in under two minutes to get your official Digital Member Pass, reserve workshop seats, and join team projects.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onNavigate('join')}
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-md transition-all active:scale-95"
            >
              Register for Free Membership
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
