import React from 'react';
import { Project } from '../types';
import { 
  Github, 
  ExternalLink, 
  Users, 
  UserCheck, 
  Sparkles, 
  ShieldCheck, 
  Code2, 
  Cpu, 
  Layers, 
  Rocket,
  CheckCircle2,
  Clock,
  AlertCircle
} from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onJoinTeam?: (project: Project) => void;
  onSelectProject?: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onJoinTeam,
  onSelectProject,
}) => {
  const getTrackIcon = (trackId: string) => {
    switch (trackId) {
      case 'cybersecurity':
        return <ShieldCheck className="w-4 h-4 text-blue-400" />;
      case 'programming':
        return <Code2 className="w-4 h-4 text-cyan-400" />;
      case 'ai-ml':
        return <Cpu className="w-4 h-4 text-emerald-400" />;
      case 'software-web':
        return <Layers className="w-4 h-4 text-sky-400" />;
      case 'entrepreneurship':
        return <Rocket className="w-4 h-4 text-amber-400" />;
      default:
        return <Code2 className="w-4 h-4 text-blue-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Active
          </span>
        );
      case 'Open for Contributors':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            Contributors Wanted
          </span>
        );
      case 'Incubating':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Clock className="w-3 h-3 text-amber-400" />
            Incubating
          </span>
        );
      case 'Completed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-700 text-slate-300 border border-slate-600">
            <CheckCircle2 className="w-3 h-3 text-slate-300" />
            Archived / V1 Complete
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="group bg-[#111A2E] hover:bg-[#15213B] rounded-xl border border-slate-800 hover:border-slate-700/80 transition-all duration-300 flex flex-col justify-between p-6 shadow-card hover:shadow-card-hover relative">
      {/* Top Meta: Origin + Status */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400">
              {getTrackIcon(project.trackId)}
              <span className="capitalize">{project.trackId.replace('-', ' ')}</span>
            </span>
            <span className="text-slate-600">•</span>
            <span
              className={`text-[11px] font-semibold px-2 py-0.5 rounded ${
                project.origin === 'CGC Initiated'
                  ? 'bg-blue-950 text-blue-300 border border-blue-800/40'
                  : 'bg-emerald-950 text-emerald-300 border border-emerald-800/40'
              }`}
            >
              {project.origin}
            </span>
          </div>

          <div>{getStatusBadge(project.status)}</div>
        </div>

        {/* Title & Tagline */}
        <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
          {project.title}
        </h3>
        <p className="mt-2 text-sm text-slate-300 line-clamp-3 leading-relaxed">
          {project.description}
        </p>

        {/* Impact Objective Box */}
        <div className="mt-4 p-3 rounded-lg bg-slate-900/80 border border-slate-800/80 text-xs">
          <span className="text-emerald-400 font-semibold block mb-0.5">Impact Goal:</span>
          <span className="text-slate-300">{project.impactGoal}</span>
        </div>

        {/* Open Roles / Seeking Contributors */}
        {project.openRoles && project.openRoles.length > 0 && (
          <div className="mt-3.5">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-1.5">
              Seeking Roles:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {project.openRoles.map((role, idx) => (
                <span
                  key={idx}
                  className="text-xs bg-slate-800 text-blue-300 border border-slate-700 px-2 py-0.5 rounded-md"
                >
                  + {role}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Tags */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.map((tag, idx) => (
            <span
              key={idx}
              className="text-[11px] font-mono text-slate-400 bg-slate-900/90 px-2 py-0.5 rounded border border-slate-800"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Card Footer: Team Info & Actions */}
      <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="text-xs text-slate-400">
          <div className="flex items-center gap-1.5 text-slate-300 font-medium">
            <Users className="w-3.5 h-3.5 text-slate-400" />
            <span>{project.lead}</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">
            {project.leadDepartment} • {project.teamSize} members
          </div>
        </div>

        <div className="flex items-center gap-2">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              title="GitHub Repository"
            >
              <Github className="w-4 h-4" />
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              title="Live Demo"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}

          {onJoinTeam && project.status !== 'Completed' && (
            <button
              onClick={() => onJoinTeam(project)}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 text-white shadow-sm transition-colors flex items-center gap-1.5"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Join Team</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
