import React, { useState, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ProjectCard } from '../components/ProjectCard';
import { INITIAL_PROJECTS } from '../data/projects';
import { Project } from '../types';
import { 
  Search, 
  Plus, 
  Layers, 
  Sparkles
} from 'lucide-react';

interface ProjectsPageProps {
  onJoinTeam: (project: Project) => void;
  onProposeProject: () => void;
  customProposals?: Project[];
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({
  onJoinTeam,
  onProposeProject,
  customProposals = [],
}) => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');

  // Under projects, keep ONLY CGC Official Portal & Digital Member Pass + any dynamic student proposals
  const allProjects = useMemo(() => {
    const defaultCatalog = INITIAL_PROJECTS.filter((p) =>
      p.title.toLowerCase().includes('cgc official portal')
    );
    return [...customProposals, ...defaultCatalog];
  }, [customProposals]);

  const filteredProjects = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return allProjects;
    return allProjects.filter((p) =>
      p.title.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query) ||
      p.lead.toLowerCase().includes(query)
    );
  }, [allProjects, searchQuery]);

  return (
    <div className="py-12 bg-black min-h-screen text-[#F2F2F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Actions */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#2A2A2A]">
          <div>
            <p className="text-xs uppercase font-semibold tracking-[0.2em] text-[#FFC21A] mb-1">
              {t('projects.badge')}
            </p>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              {t('projects.title')}
            </h1>
            <p className="text-xs sm:text-sm text-[#A3A3A3] mt-1 max-w-2xl leading-relaxed">
              {t('projects.desc')}
            </p>
          </div>

          <button
            onClick={onProposeProject}
            className="px-5 py-3 rounded-xl bg-[#FFC21A] hover:bg-[#FFB81C] text-black font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 w-fit shrink-0 active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Propose Project Idea</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="my-8 max-w-md">
          <div className="relative">
            <Search className="w-4 h-4 text-[#737373] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search projects by title, lead, or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#080808] border border-[#2A2A2A] text-white text-xs sm:text-sm placeholder-[#737373] focus:outline-none focus:border-[#FFC21A] transition"
            />
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onJoinTeam={onJoinTeam}
              />
            ))}
          </div>
        ) : (
          <div className="p-12 rounded-3xl bg-[#080808] border border-[#2A2A2A] text-center space-y-4 my-8">
            <Layers className="w-10 h-10 text-[#737373] mx-auto" />
            <h3 className="text-lg font-bold text-white">No Projects Match Your Search</h3>
            <p className="text-xs text-[#A3A3A3] max-w-sm mx-auto leading-relaxed">
              Have an idea for campus or local community solutions? Pitch it to recruit teammates!
            </p>
            <div className="pt-2">
              <button
                onClick={onProposeProject}
                className="px-5 py-2.5 bg-[#FFC21A] hover:bg-[#FFB81C] text-black text-xs font-bold rounded-xl shadow-md active:scale-95 cursor-pointer"
              >
                Propose a Project Idea
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
