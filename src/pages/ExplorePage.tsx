import React, { useState } from 'react';
import { TRACKS } from '../data/tracks';
import { PROJECTS } from '../data/projects';
import { TrackId, Project } from '../types';
import { ProjectCard } from '../components/ProjectCard';
import { SectionHeader } from '../components/SectionHeader';
import { TiltCard } from '../components/Motion/TiltCard';
import { MagneticButton } from '../components/Motion/MagneticButton';
import { RevealOnScroll } from '../components/Motion/RevealOnScroll';
import { 
  ShieldCheck, 
  Code2, 
  Cpu, 
  Layers, 
  Rocket, 
  CheckCircle2, 
  Terminal, 
  BookOpen, 
  Wrench, 
  ArrowRight,
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

  const selectedTrack =
    TRACKS.find((t) => t.id === selectedTrackId) || TRACKS[0];

  const relatedProjects = PROJECTS.filter(
    (p: Project) => p.trackId === selectedTrackId
  );

  const getTrackIcon = (id: TrackId, className = 'w-5 h-5') => {
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
        return <ShieldCheck className={className} />;
    }
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-24 bg-black text-[#F2F2F2]">
      {/* 
        =======================================================
        PAGE HEADER
        =======================================================
      */}
      <section className="pt-10 sm:pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Tracks"
            badgeColor="amber"
            title="Learning Tracks & Specializations"
            description="Specialization tracks combining hands-on technical study with real project building in Woliso Campus Old Classroom ICT Building IT lab 01 and 06."
          />

          {/* Track Selector Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none border-b border-[#2A2A2A]">
            {TRACKS.map((t) => {
              const isSelected = t.id === selectedTrackId;
              return (
                <button
                  key={t.id}
                  onClick={() => setSelectedTrackId(t.id)}
                  className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-200 active:scale-95 ${
                    isSelected
                      ? 'bg-[#FFC21A] text-black shadow-md font-bold'
                      : 'bg-[#141414] hover:bg-[#202020] text-neutral-300 border border-[#2A2A2A]'
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
      <RevealOnScroll className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TiltCard
          maxTilt={3}
          scale={1.005}
          className="bg-[#080808] rounded-3xl border border-[#2A2A2A] p-7 sm:p-12 shadow-2xl space-y-10"
        >
          {/* Header of Active Track */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-[#2A2A2A]">
            <div className="flex items-start gap-4">
              <div className="p-4 rounded-2xl bg-[#141414] border border-[#2A2A2A] text-[#FFC21A] shadow-inner">
                {getTrackIcon(selectedTrack.id, 'w-8 h-8')}
              </div>
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#FFC21A]">
                  Track Overview
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-0.5">
                  {selectedTrack.name}
                </h2>
                <p className="text-sm font-medium text-neutral-300 mt-1">
                  {selectedTrack.tagline}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <MagneticButton
                onClick={() => onNavigate('join')}
                className="px-5 py-2.5 rounded-xl bg-[#FFC21A] hover:bg-[#e5ad16] text-black text-xs font-bold shadow-md transition-all active:scale-95"
              >
                Join This Cohort
              </MagneticButton>
              <button
                onClick={onProposeProject}
                className="px-4 py-2.5 rounded-xl bg-[#141414] hover:bg-[#202020] text-white text-xs font-semibold border border-[#2A2A2A] transition-colors active:scale-95"
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
                <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
                  {selectedTrack.description}
                </p>
              </div>

              {/* Practical Focus Box */}
              <div className="p-5 rounded-2xl bg-[#000000] border border-[#2A2A2A] space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FFC21A]">
                  <Terminal className="w-4 h-4" />
                  <span>Practical Lab Focus (Woliso Campus)</span>
                </div>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  {selectedTrack.practicalFocus}
                </p>
              </div>

              {/* Core Cohort Initiatives */}
              <div>
                <h3 className="text-sm font-bold text-white mb-3">Core Cohort Initiatives</h3>
                <div className="space-y-2">
                  {(selectedTrack.coreInitiatives || []).map((init, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-3 rounded-xl bg-[#141414] border border-[#2A2A2A] text-xs text-neutral-200"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#FFC21A] flex-shrink-0" />
                      <span>{init}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar: Syllabus Topics & Tools Stack */}
            <div className="space-y-6">
              {/* Topics */}
              <div className="p-6 rounded-2xl bg-[#000000] border border-[#2A2A2A]">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-4 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-[#FFC21A]" />
                  <span>Syllabus & Focus Areas</span>
                </h4>
                <ul className="space-y-2.5">
                  {selectedTrack.topics.map((top, idx) => (
                    <li key={idx} className="text-xs text-neutral-300 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FFC21A] mt-1.5 flex-shrink-0" />
                      <span>{top}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Key Tools */}
              <div className="p-6 rounded-2xl bg-[#000000] border border-[#2A2A2A]">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-3 flex items-center gap-1.5">
                  <Wrench className="w-4 h-4 text-[#FFC21A]" />
                  <span>Tools & Stack</span>
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedTrack.keyTools.map((tool, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg text-xs font-mono bg-[#141414] text-[#FFC21A] border border-[#2A2A2A]"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Related Track Projects */}
          <div className="pt-8 border-t border-[#2A2A2A]">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <FolderGit2 className="w-5 h-5 text-[#FFC21A]" />
                  <span>Active Projects in {selectedTrack.shortName}</span>
                </h3>
                <p className="text-xs text-neutral-400 mt-1">
                  Real prototypes and systems built by students currently enrolled in this track.
                </p>
              </div>

              <button
                onClick={() => onNavigate('projects')}
                className="text-xs font-semibold text-[#FFC21A] hover:text-white flex items-center gap-1 active:scale-95 transition-colors"
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
              <div className="p-8 rounded-2xl bg-[#000000] border border-dashed border-[#2A2A2A] text-center">
                <p className="text-xs text-neutral-400">
                  No active projects currently listed under this track. Be the first to launch one!
                </p>
                <button
                  onClick={onProposeProject}
                  className="mt-3 px-4 py-2 bg-[#FFC21A] hover:bg-[#e5ad16] text-black font-bold rounded-lg text-xs transition-colors active:scale-95"
                >
                  Propose the First {selectedTrack.shortName} Project
                </button>
              </div>
            )}
          </div>
        </TiltCard>
      </RevealOnScroll>

      {/* 
        =======================================================
        INTER-DISCIPLINARY CALLOUT
        =======================================================
      */}
      <RevealOnScroll className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TiltCard
          maxTilt={4}
          scale={1.01}
          className="p-8 sm:p-10 rounded-3xl bg-[#080808] border border-[#2A2A2A] flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl"
        >
          <div>
            <h3 className="text-xl font-bold text-white">Not sure which track to pick?</h3>
            <p className="text-xs sm:text-sm text-neutral-300 mt-1 max-w-xl leading-relaxed">
              You do not have to limit yourself to one track. Many students participate in Programming while contributing to Cybersecurity CTFs, or join Software Development while testing AI models.
            </p>
          </div>
          <MagneticButton
            onClick={() => onNavigate('join')}
            className="px-6 py-3 rounded-xl bg-[#FFC21A] hover:bg-[#e5ad16] text-black text-xs sm:text-sm font-bold whitespace-nowrap shadow-md transition-all active:scale-95"
          >
            Apply & Choose Interests
          </MagneticButton>
        </TiltCard>
      </RevealOnScroll>
    </div>
  );
};
