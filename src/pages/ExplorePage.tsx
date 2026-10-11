import React, { useState } from 'react';
import { SectionHeader } from '../components/SectionHeader';
import { TRACKS } from '../data/tracks';
import { INITIAL_PROJECTS } from '../data/projects';
import { TrackId, Project } from '../types';
import { ProjectCard } from '../components/ProjectCard';
import { 
  ShieldCheck, 
  Code2, 
  Cpu, 
  Layers, 
  Rocket, 
  CheckCircle2, 
  Wrench, 
  ArrowRight, 
  Terminal, 
  Sparkles,
  BookOpen,
  FolderGit2
} from 'lucide-react';

interface ExplorePageProps {
  onNavigate: (tab: string) => void;
  onJoinTeam: (project: Project) => void;
  onProposeProject: () => void;
}

export const ExplorePage: React.FC<ExplorePageProps> = ({
  onNavigate,
  onJoinTeam,
  onProposeProject,
}) => {
  const [selectedTrackId, setSelectedTrackId] = useState<TrackId>('cybersecurity');

  const selectedTrack = TRACKS.find((t) => t.id === selectedTrackId) || TRACKS[0];
  const relatedProjects = INITIAL_PROJECTS.filter((p) => p.trackId === selectedTrackId);

  const getTrackIcon = (id: string, className = 'w-5 h-5') => {
    switch (id) {
      case 'cybersecurity':
        return <ShieldCheck className={className} />;
      case 'programming':
        return <Code2 className={className} />;
      case 'ai-ml':
        return <Cpu className={className} />;
      case 'software-web':
        return <Layers className={className} />;
      case 'entrepreneurship':
        return <Rocket className={className} />;
      default:
        return <Sparkles className={className} />;
    }
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* 
        =======================================================
        PAGE HEADER
        =======================================================
      */}
      <section className="pt-12 sm:pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Innovation Areas"
            badgeColor="blue"
            title="Explore Our 5 Learning Tracks"
            description="Deep-dive into our specialization areas. Every track combines structured conceptual study with real project building in Ambo University Woliso Campus laboratories."
          />

          {/* Track Selector Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none border-b border-slate-800">
            {TRACKS.map((t) => {
              const isSelected = t.id === selectedTrackId;
              return (
                <button
                  key={t.id}
                  onClick={() => setSelectedTrackId(t.id)}
                  className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-glow-blue'
                      : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800'
                  }`}
                >
                  {getTrackIcon(t.id, 'w-4 h-4')}
                  <span>{t.shortName}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 
        =======================================================
        ACTIVE TRACK DEEP DIVE
        =======================================================
      */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#111A2E] rounded-3xl border border-slate-800 p-8 sm:p-12 shadow-card space-y-10">
          
          {/* Header of Active Track */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-800/80">
            <div className="flex items-start gap-4">
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-blue-400">
                {getTrackIcon(selectedTrack.id, 'w-8 h-8')}
              </div>
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                  Track Overview
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-0.5">
                  {selectedTrack.name}
                </h2>
                <p className="text-sm font-medium text-blue-300 mt-1">
                  {selectedTrack.tagline}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => onNavigate('join')}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md transition-colors"
              >
                Join This Cohort
              </button>
              <button
                onClick={onProposeProject}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
              >
                Propose Track Idea
              </button>
            </div>
          </div>

          {/* Description & Practical Focus */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h3 className="text-base font-bold text-white mb-2">Track Scope & Philosophy</h3>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  {selectedTrack.description}
                </p>
              </div>

              {/* Practical Focus Box */}
              <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800/90 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
                  <Terminal className="w-4 h-4" />
                  <span>Practical Lab Focus (Woliso Campus)</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {selectedTrack.practicalFocus}
                </p>
              </div>

              {/* Sample Initiatives */}
              <div>
                <h3 className="text-sm font-bold text-white mb-3">Core Cohort Initiatives</h3>
                <div className="space-y-2">
                  {selectedTrack.sampleInitiatives.map((init, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs text-slate-200"
                    >
                      <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0" />
                      <span>{init}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar: Syllabus Topics & Tools Stack */}
            <div className="space-y-6">
              {/* Topics */}
              <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-blue-400" />
                  <span>Syllabus & Focus Areas</span>
                </h4>
                <ul className="space-y-2.5">
                  {selectedTrack.topics.map((top, idx) => (
                    <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                      <span>{top}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Key Tools */}
              <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                  <Wrench className="w-4 h-4 text-emerald-400" />
                  <span>Tools & Stack</span>
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedTrack.keyTools.map((tool, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg text-xs font-mono bg-slate-800 text-blue-300 border border-slate-700"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Related Track Projects */}
          <div className="pt-8 border-t border-slate-800">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <FolderGit2 className="w-5 h-5 text-blue-400" />
                  <span>Active Projects in {selectedTrack.shortName}</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Real prototypes and systems built by students currently enrolled in this track.
                </p>
              </div>

              <button
                onClick={() => onNavigate('projects')}
                className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1"
              >
                <span>View Full Registry</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {relatedProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedProjects.map((p) => (
                  <ProjectCard
                    key={p.id}
                    project={p}
                    onJoinTeam={onJoinTeam}
                  />
                ))}
              </div>
            ) : (
              <div className="p-8 rounded-2xl bg-slate-900/50 border border-dashed border-slate-800 text-center">
                <p className="text-xs text-slate-400">
                  No active projects currently listed under this track. Be the first to launch one!
                </p>
                <button
                  onClick={onProposeProject}
                  className="mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold transition-colors"
                >
                  Propose the First {selectedTrack.shortName} Project
                </button>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* 
        =======================================================
        INTER-DISCIPLINARY CALLOUT
        =======================================================
      */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold text-white">Not sure which track to pick?</h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl leading-relaxed">
              You do not have to limit yourself to one track. Many students participate in Programming while contributing to Cybersecurity CTFs, or join Software Development while testing AI models.
            </p>
          </div>
          <button
            onClick={() => onNavigate('join')}
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors"
          >
            Apply & Choose Interests
          </button>
        </div>
      </section>
    </div>
  );
};
