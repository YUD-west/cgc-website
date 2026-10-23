import React from 'react';
import { Project } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { TiltCard } from './Motion/TiltCard';
import { 
  Github, 
  ExternalLink, 
  Users, 
  ShieldCheck, 
  Code2, 
  Cpu, 
  Layers, 
  Rocket,
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
  const { t } = useLanguage();

  const isOfficial = project.id === 'cgc-proj-01' || project.title.toLowerCase().includes('cgc official portal');
  const displayTitle = isOfficial ? t('project.title') : project.title;
  const displayDesc = isOfficial ? t('project.desc') : project.description;

  const getTrackIcon = (trackId: string) => {
    switch (trackId) {
      case 'cybersecurity':
        return <ShieldCheck className="w-3.5 h-3.5 text-[#FFC21A]" />;
      case 'programming':
        return <Code2 className="w-3.5 h-3.5 text-white" />;
      case 'ai-ml':
        return <Cpu className="w-3.5 h-3.5 text-[#FFC21A]" />;
      case 'software-web':
        return <Layers className="w-3.5 h-3.5 text-[#FFC21A]" />;
      default:
        return <Code2 className="w-3.5 h-3.5 text-[#FFC21A]" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#FFC21A]/10 text-[#FFC21A] border border-[#FFC21A]/30">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFC21A] animate-pulse" />
            {t('projects.statusActive')}
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#111] text-[#A3A3A3] border border-[#2A2A2A]">
            {status}
          </span>
        );
    }
  };

  return (
    <TiltCard
      maxTilt={6}
      scale={1.015}
      className="group bg-[#080808] hover:bg-[#111111] backdrop-blur-xl rounded-2xl border border-[#2A2A2A] hover:border-[#FFC21A]/50 transition-all duration-300 flex flex-col justify-between p-6 shadow-lg relative"
    >
      <div>
        {/* Meta Bar */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#A3A3A3]">
            {getTrackIcon(project.trackId)}
            <span>{project.trackId.replace('-', ' ')}</span>
          </div>
          <div>{getStatusBadge(project.status)}</div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-white group-hover:text-[#FFC21A] transition-colors line-clamp-2 mb-2">
          {displayTitle}
        </h3>

        {/* Tagline / Description */}
        <p className="text-xs text-[#A3A3A3] leading-relaxed line-clamp-4 mb-4">
          {displayDesc}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tags.map((tag, idx) => (
            <span
              key={idx}
              className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-[#161616] text-[#A3A3A3] border border-[#2A2A2A]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Footer Details */}
      <div className="pt-4 border-t border-[#1C1C1C] flex items-center justify-between gap-2">
        <div className="text-[11px] text-[#A3A3A3]">
          <span className="text-white font-medium">{project.lead}</span>
          <span className="block text-[10px] text-[#737373]">{project.leadDepartment}</span>
        </div>

        <div className="flex items-center gap-2">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg bg-[#141414] text-[#A3A3A3] hover:text-[#FFC21A] border border-[#2A2A2A] hover:border-[#FFC21A]/40 transition-colors"
              title={t('projects.viewGithub')}
            >
              <Github className="w-3.5 h-3.5" />
            </a>
          )}
          {onJoinTeam && (
            <button
              onClick={() => onJoinTeam(project)}
              className="px-3 py-1.5 rounded-lg bg-[#FFC21A] hover:bg-[#FFB81C] text-black text-xs font-bold transition-all active:scale-95 cursor-pointer"
            >
              {t('join.joinTeam')}
            </button>
          )}
        </div>
      </div>
    </TiltCard>
  );
};
