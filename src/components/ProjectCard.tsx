import React from 'react';
import { Project } from '../types';
import { TiltCard } from './Motion/TiltCard';
import { 
  Github, 
  ExternalLink, 
  Users, 
  UserCheck, 
  ShieldCheck, 
  Code2, 
  Cpu, 
  Layers, 
  Rocket,
  CheckCircle2,
  Clock,
  Sprout,
  Briefcase,
  HeartPulse
} from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onJoinTeam?: (project: Project) => void;
  onSelectProject?: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onJoinTeam,
}) => {
  const getTrackIcon = (trackId: string) => {
    switch (trackId) {
      case 'cybersecurity':
        return <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />;
      case 'programming':
        return <Code2 className="w-3.5 h-3.5 text-cyan-400" />;
      case 'ai-ml':
        return <Cpu className="w-3.5 h-3.5 text-emerald-400" />;
      case 'software-web':
        return <Layers className="w-3.5 h-3.5 text-sky-400" />;
      case 'entrepreneurship':
        return <Rocket className="w-3.5 h-3.5 text-amber-400" />;
      default:
        return <Code2 className="w-3.5 h-3.5 text-blue-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Active
          </span>
        );
      case 'Open for Contributors':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-500/10 text-blue-300 border border-blue-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            Recruiting
          </span>
        );
      case 'Incubating':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/30">
            <Clock className="w-2.5 h-2.5 text-amber-400" />
            Incubating
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-800 text-slate-300 border border-slate-700">
            {status}
          </span>
        );
    }
  };

  return (
    <TiltCard
      maxTilt={6}
      scale={1.015}
      className="group bg-[#0D1527]/95 hover:bg-[#121D35] backdrop-blur-xl rounded-2xl border border-slate-700/70 hover:border-blue-500/60 transition-all duration-300 flex flex-col justify-between p-5 shadow-lg hover:shadow-glow-blue relative"
    >
      <div>
        {/* Meta Bar */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            {getTrackIcon(project.trackId)}
            <span>{project.trackId.replace('-', ' ')}</span>
          </div>
          <div>{getStatusBadge(project.status)}</div>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors line-clamp-1">
          {project.title}
        </h3>

        {/* Sub-heading under title */}
        {project.tagline && (
          <p className="text-xs text-blue-400 font-medium mt-0.5 line-clamp-1">
            {project.tagline}
          </p>
        )}

        {/* Short description */}
        <p className="mt-2.5 text-xs text-slate-300 line-clamp-2 leading-relaxed">
          {project.description}
        </p>

        {/* Seeking Roles (compact chips) */}
        {project.openRoles && project.openRoles.length > 0 && (
          <div className="mt-3.5 flex flex-wrap gap-1.5">
            {project.openRoles.slice(0, 3).map((role, idx) => (
              <span
                key={idx}
                className="text-[10px] font-medium bg-slate-900/90 text-slate-300 border border-slate-800/80 px-2 py-0.5 rounded-md hover:border-slate-700 transition-colors"
              >
                + {role}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Footer Info & Action */}
      <div className="mt-5 pt-3.5 border-t border-slate-800 flex items-center justify-between gap-2">
        <div className="text-[11px] text-slate-400 truncate max-w-[55%]">
          <span className="text-slate-200 font-semibold block truncate">{project.lead}</span>
          <span className="text-slate-400 truncate block text-[10px]">{project.leadDepartment}</span>
        </div>

        <div className="flex items-center gap-2">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors active:scale-95"
              title="GitHub Profile"
            >
              <Github className="w-3.5 h-3.5" />
            </a>
          )}

          {onJoinTeam && project.status !== 'Completed' && (
            <button
              onClick={() => onJoinTeam(project)}
              className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-blue-600 hover:bg-blue-500 text-white shadow-sm transition-all flex items-center gap-1.5 active:scale-95"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Join Team</span>
            </button>
          )}
        </div>
      </div>
    </TiltCard>
  );
};
