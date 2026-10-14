import React from 'react';
import { Project } from '../types';
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
  Clock
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
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Active
          </span>
        );
      case 'Open for Contributors':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            Recruiting
          </span>
        );
      case 'Incubating':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Clock className="w-2.5 h-2.5 text-amber-400" />
            Incubating
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-slate-800 text-slate-300 border border-slate-700">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="group bg-[#0F172A] hover:bg-[#142038] rounded-2xl border border-slate-800 hover:border-slate-700 transition-all duration-200 flex flex-col justify-between p-5 shadow-sm relative">
      <div>
        {/* Meta Bar */}
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-400">
            {getTrackIcon(project.trackId)}
            <span className="capitalize">{project.trackId.replace('-', ' ')}</span>
          </div>
          <div>{getStatusBadge(project.status)}</div>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-1">
          {project.title}
        </h3>

        {/* Sub-heading under title */}
        {project.tagline && (
          <p className="text-xs text-blue-400/90 font-medium mt-0.5 line-clamp-1">
            {project.tagline}
          </p>
        )}

        {/* Short description */}
        <p className="mt-2 text-xs text-slate-400 line-clamp-2 leading-relaxed">
          {project.description}
        </p>

        {/* Seeking Roles (compact chips) */}
        {project.openRoles && project.openRoles.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {project.openRoles.slice(0, 3).map((role, idx) => (
              <span
                key={idx}
                className="text-[10px] bg-slate-900 text-slate-300 border border-slate-800 px-2 py-0.5 rounded-md"
              >
                + {role}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Footer Info & Action */}
      <div className="mt-5 pt-3.5 border-t border-slate-800/80 flex items-center justify-between gap-2">
        <div className="text-[11px] text-slate-400 truncate max-w-[55%]">
          <span className="text-slate-200 font-medium block truncate">{project.lead}</span>
          <span className="text-slate-400 truncate block text-[10px]">{project.leadDepartment}</span>
        </div>

        <div className="flex items-center gap-1.5">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              title="GitHub Profile"
            >
              <Github className="w-3.5 h-3.5" />
            </a>
          )}

          {onJoinTeam && project.status !== 'Completed' && (
            <button
              onClick={() => onJoinTeam(project)}
              className="px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-colors flex items-center gap-1"
            >
              <UserCheck className="w-3 h-3" />
              <span>Join</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
