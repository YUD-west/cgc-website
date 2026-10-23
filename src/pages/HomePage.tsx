import React from 'react';
import { AtomHero } from '../components/AtomHero';
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
  Send,
  ChevronRight,
  MapPin,
  Sparkles
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
}) => {
  const featuredProjects = INITIAL_PROJECTS.slice(0, 3);
  const upcomingEvents = EVENTS.filter((e) => e.status === 'Upcoming').slice(0, 3);

  const pillars = [
    {
      title: 'Software & Web Development',
      description: 'Practical coding, modern web frameworks, system architecture, and shipping tools that solve campus challenges.',
      icon: Code2,
      accent: 'border-[#14a94b]/30 text-[#14a94b] bg-[#14a94b]/10',
    },
    {
      title: 'Cybersecurity & Defenses',
      description: 'Hands-on practice in Computer Lab 02: Linux terminal mastery, network inspection, ethical hacking, and safe habits.',
      icon: ShieldCheck,
      accent: 'border-[#FFC21A]/30 text-[#FFC21A] bg-[#FFC21A]/10',
    },
    {
      title: 'Agriculture & Community Tech',
      description: 'Applying IoT, sensors, and mobile solutions to agriculture, local businesses, and regional community problems.',
      icon: Sprout,
      accent: 'border-[#14a94b]/30 text-[#14a94b] bg-[#14a94b]/10',
    },
    {
      title: 'Peer Mentorship & Beginners',
      description: 'No prior background required. Beginners learn step-by-step alongside senior peers in a collaborative environment.',
      icon: Users,
      accent: 'border-[#e8262c]/30 text-[#e8262c] bg-[#e8262c]/10',
    },
  ];

  return (
    <div className="space-y-20 pb-24 bg-black text-[#F2F2F2]">
      
      {/* 
        =======================================================
        1. 3D ATOM HERO STAGE (From Downloads/index.html)
        =======================================================
      */}
      <AtomHero onNavigate={onNavigate} />

      {/* 
        =======================================================
        2. WHAT WE DO: 4 PILLARS
        =======================================================
      */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <p className="text-xs uppercase font-semibold tracking-[0.2em] text-[#FFC21A] mb-2">
            Pillars of CGC
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Learn By Building
          </h2>
          <p className="mt-2 text-sm text-[#A3A3A3]">
            Practical pathways designed for students from all departments at Ambo University Woliso Campus.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#080808] border border-[#2A2A2A] hover:border-[#FFC21A]/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center mb-4 ${pillar.accent}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{pillar.title}</h3>
                  <p className="text-xs text-[#A3A3A3] leading-relaxed">{pillar.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 
        =======================================================
        3. FEATURED CAMPUS PROJECTS
        =======================================================
      */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8">
          <div>
            <p className="text-xs uppercase font-semibold tracking-[0.2em] text-[#FFC21A] mb-1">
              Active Innovation
            </p>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              Featured Projects
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-[#A3A3A3]">
              Real software and initiatives incubated by students in Computer Lab 02.
            </p>
          </div>

          <button
            onClick={() => onNavigate('projects')}
            className="text-xs font-semibold text-[#FFC21A] hover:underline flex items-center gap-1 transition-colors self-start sm:self-auto cursor-pointer"
          >
            <span>View All Projects</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
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
        4. LAB SESSIONS & WORKSHOPS
        =======================================================
      */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8">
          <div>
            <p className="text-xs uppercase font-semibold tracking-[0.2em] text-[#FFC21A] mb-1">
              Hands-On Learning
            </p>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              Workshops &amp; Events
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-[#A3A3A3]">
              Free workstation sessions in Computer Lab 02. Beginners always welcome.
            </p>
          </div>

          <button
            onClick={() => onNavigate('events')}
            className="text-xs font-semibold text-[#FFC21A] hover:underline flex items-center gap-1 transition-colors self-start sm:self-auto cursor-pointer"
          >
            <span>All Events &amp; Tickets</span>
            <ChevronRight className="w-3.5 h-3.5" />
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
        5. LEADERSHIP SPOTLIGHT
        =======================================================
      */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-3xl bg-[#080808] border border-[#2A2A2A] flex flex-col sm:flex-row items-center gap-6">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border border-[#FFC21A]/50 shrink-0">
            <img
              src={LEAD_ADMIN.photoUrl}
              alt={LEAD_ADMIN.name}
              className="w-full h-full object-cover object-top"
            />
          </div>
          <div className="text-center sm:text-left space-y-2 flex-1">
            <div className="text-xs text-[#FFC21A] font-semibold uppercase tracking-wider">
              Student Leadership Desk
            </div>
            <h3 className="text-xl font-bold text-white">
              {LEAD_ADMIN.name} — Lead Administrator &amp; Club President
            </h3>
            <p className="text-xs sm:text-sm text-[#A3A3A3] leading-relaxed">
              &quot;Our mission at Woliso Campus is simple: help students move from theory to building real software. Join our community sessions every week in Computer Lab 02.&quot;
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs">
              <a
                href={OFFICIAL_COMMUNITY.telegramGroup}
                target="_blank"
                rel="noreferrer"
                className="text-[#FFC21A] hover:underline flex items-center gap-1.5 font-semibold"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Join Official Telegram Channel</span>
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

      {/* 
        =======================================================
        6. REGISTRATION CALL TO ACTION
        =======================================================
      */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#080808] border border-[#2A2A2A] space-y-5">
          <h3 className="text-3xl font-extrabold text-white tracking-tight">
            Ready to Join Cyber Guardians Club?
          </h3>
          <p className="text-xs sm:text-sm text-[#A3A3A3] max-w-lg mx-auto leading-relaxed">
            Register in under two minutes to receive your official scannable Digital Member Pass, reserve lab workshop seats, and collaborate on real projects.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onNavigate('join')}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#F2F2F2] hover:bg-white text-black font-bold text-sm shadow-xl active:scale-95 transition-all cursor-pointer"
            >
              <span>Get Your Free Member Pass</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
