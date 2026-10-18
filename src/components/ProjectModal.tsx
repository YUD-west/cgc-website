import React, { useEffect } from 'react';
import { X, ExternalLink, Github, CheckCircle2, Layers, Cpu, AlertCircle, Flame } from 'lucide-react';
import { ProjectItem } from '../types/portfolio';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-[#111111] border border-white/15 rounded-xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col animate-fade-up text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between p-6 border-b border-white/10">
          <div className="space-y-1 pr-6">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-lime-400/10 text-lime-400 border border-lime-400/30">
                {project.category}
              </span>

              {project.status === 'Live' ? (
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-lime-400/10 text-lime-400 border border-lime-400/30 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-lime-400 animate-pulse"></span>
                  Live Deployment
                </span>
              ) : project.status === 'In Development' ? (
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 flex items-center gap-1">
                  <Flame className="w-3 h-3 text-amber-400" />
                  Cooking / In Dev
                </span>
              ) : (
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 text-zinc-400 border border-white/10">
                  {project.status}
                </span>
              )}
            </div>

            <h3 id="modal-project-title" className="text-2xl font-bold text-white tracking-tight pt-1">
              {project.title}
            </h3>
            <p className="text-sm text-zinc-400 font-mono">
              {project.tagline}
            </p>
          </div>

          <button
            onClick={onClose}
            type="button"
            className="p-2 rounded-lg bg-[#181818] text-zinc-400 hover:text-white hover:bg-[#222222] border border-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-lime-400"
            aria-label="Close project details"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm">
          {/* Overview */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400">
              Overview
            </h4>
            <p className="text-zinc-300 leading-relaxed font-sans">
              {project.description}
            </p>
          </div>

          {/* Problem & Motivation */}
          {project.problemSolved && (
            <div className="space-y-2 p-4 rounded-lg bg-[#161616] border border-white/5">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-lime-400 font-medium">
                <AlertCircle className="w-4 h-4" />
                Problem Solved
              </div>
              <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed font-sans">
                {project.problemSolved}
              </p>
            </div>
          )}

          {/* Key Functional Highlights */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-lime-400" />
              Key Features & Capabilities
            </h4>
            <ul className="space-y-2">
              {project.keyHighlights.map((hl, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-zinc-300 text-xs sm:text-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-lime-400 mt-2 shrink-0"></span>
                  <span>{hl}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technologies */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-lime-400" />
              Technologies & Tools
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded bg-[#181818] border border-white/10 text-xs font-mono text-zinc-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Architecture Notes */}
          {project.architectureNotes && (
            <div className="space-y-2">
              <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-lime-400" />
                Architecture Notes
              </h4>
              <p className="text-zinc-400 text-xs leading-relaxed font-mono">
                {project.architectureNotes}
              </p>
            </div>
          )}
        </div>

        {/* Modal Footer / Action Links */}
        <div className="p-4 sm:p-6 border-t border-white/10 bg-[#0E0E0E] flex flex-wrap items-center justify-between gap-3">
          <div className="text-[11px] font-mono text-zinc-500">
            {project.status === 'Live' ? (
              <span className="text-lime-400">Deployed and running live in production</span>
            ) : (
              <span>Actively in development</span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2 rounded-md bg-[#181818] text-white border border-white/15 text-xs font-medium hover:border-lime-400/50 hover:text-lime-400 transition-colors flex items-center gap-2"
              >
                <Github className="w-4 h-4" />
                <span>Source Code</span>
              </a>
            )}

            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2 rounded-md bg-white text-black text-xs font-semibold hover:bg-lime-400 transition-colors flex items-center gap-1.5"
              >
                <span>Visit Live App</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            ) : (
              <span className="px-3 py-2 rounded-md bg-[#141414] text-zinc-500 border border-white/5 text-xs font-mono">
                Deployment in Progress
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
