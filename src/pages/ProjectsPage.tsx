import React, { useState, useEffect, useMemo } from 'react';
import { ProjectCard } from '../components/ProjectCard';
import { INITIAL_PROJECTS } from '../data/projects';
import { Project, TrackId } from '../types';
import { MagneticButton } from '../components/Motion/MagneticButton';
import { RevealOnScroll } from '../components/Motion/RevealOnScroll';
import { 
  Search, 
  Plus, 
  Layers, 
  Users, 
  Sprout, 
  Briefcase, 
  Code2, 
  HeartHandshake, 
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { CoCreatorPage } from './CoCreatorPage';

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
  const [tabMode, setTabMode] = useState<'projects' | 'teams'>('projects');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [levelFilter, setLevelFilter] = useState<string>('all');
  const [dbProjects, setDbProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch dynamic projects from SQLite backend
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/projects');
        if (res.ok) {
          const data = await res.json();
          if (data.success && Array.isArray(data.projects)) {
            const mapped: Project[] = data.projects.map((p: any) => ({
              id: p.id,
              title: p.title,
              tagline: p.impact_goal || p.description.slice(0, 100),
              description: p.description,
              trackId: p.category.includes('Cyber') ? 'cybersecurity' : p.category.includes('Agri') ? 'programming' : 'software-web',
              origin: 'CGC Initiated',
              status: p.status || 'Active',
              lead: p.proposer_name,
              leadDepartment: p.proposer_faculty,
              teamSize: 3,
              openRoles: (p.needed_roles || '').split(',').map((r: string) => r.trim()).filter(Boolean),
              tags: [p.category, p.target_level || 'All Levels'],
              featured: true,
              impactGoal: p.impact_goal || p.description,
              createdDate: p.created_at?.slice(0, 10) || '2026-03'
            }));
            setDbProjects(mapped);
          }
        }
      } catch (err) {
        console.warn('Using local catalog fallback for projects:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Combine database projects + proposals + default catalog
  const allProjects = useMemo(() => {
    const pool = dbProjects.length > 0 ? dbProjects : INITIAL_PROJECTS;
    // Prepend user-created custom proposals
    return [...customProposals, ...pool];
  }, [dbProjects, customProposals]);

  // Filtered projects
  const filteredProjects = useMemo(() => {
    return allProjects.filter((p) => {
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.lead.toLowerCase().includes(query) ||
        p.tags.some((t) => t.toLowerCase().includes(query));

      const matchesCategory =
        selectedCategory === 'all' ||
        p.tags.some((t) => t.toLowerCase().includes(selectedCategory.toLowerCase())) ||
        p.leadDepartment.toLowerCase().includes(selectedCategory.toLowerCase());

      const matchesLevel =
        levelFilter === 'all' ||
        p.tags.some((t) => t.toLowerCase().includes(levelFilter.toLowerCase()));

      return matchesSearch && matchesCategory && matchesLevel;
    });
  }, [allProjects, searchQuery, selectedCategory, levelFilter]);

  const categories = [
    { id: 'all', label: 'All Projects', icon: Layers },
    { id: 'beginners', label: '🌱 Beginners Welcome', icon: Sparkles },
    { id: 'agri', label: '🌾 Agriculture & Sciences', icon: Sprout },
    { id: 'business', label: '💼 Business & Innovation', icon: Briefcase },
    { id: 'software', label: '💻 Software & Web', icon: Code2 },
    { id: 'health', label: '🩺 Health & Community', icon: HeartHandshake },
    { id: 'cyber', label: '🔒 Cybersecurity', icon: ShieldCheck }
  ];

  return (
    <div className="space-y-10 pb-24 pt-10 sm:pt-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Clean Header & Actions */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Campus Innovation Projects
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Student-engineered software, network tools, and cross-faculty initiatives. Open for all departments and skill levels.
            </p>
          </div>

          <MagneticButton
            onClick={onProposeProject}
            className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 w-fit shrink-0 active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Propose a Project Idea</span>
          </MagneticButton>
        </div>

        {/* Dual Tab Switcher: Projects vs Co-Creators */}
        <div className="flex items-center gap-2 my-6 bg-[#0D1527]/90 p-1.5 rounded-2xl border border-slate-800 w-fit">
          <button
            onClick={() => setTabMode('projects')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 active:scale-95 ${
              tabMode === 'projects'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Active Projects ({allProjects.length})</span>
          </button>

          <button
            onClick={() => setTabMode('teams')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 active:scale-95 ${
              tabMode === 'teams'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Find a Co-Creator (Open Team Roles)</span>
          </button>
        </div>

        {tabMode === 'teams' ? (
          <CoCreatorPage />
        ) : (
          <div className="space-y-6">
            
            {/* Search and Stream Filter Pills */}
            <div className="space-y-4">
              {/* Search Bar */}
              <div className="relative max-w-xl">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by topic, problem, department, or student lead..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0D1527] border border-slate-800 text-white text-xs sm:text-sm placeholder-slate-500 focus:outline-none focus:border-blue-500 transition shadow-inner"
                />
              </div>

              {/* Category Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3.5 py-2 rounded-xl font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 active:scale-95 ${
                      selectedCategory === cat.id
                        ? 'bg-blue-600 text-white shadow-sm font-bold'
                        : 'bg-[#0D1527] text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700 hover:bg-slate-800/50'
                    }`}
                  >
                    <span>{cat.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Project Results Count */}
            <div className="flex items-center justify-between text-xs text-slate-400 pt-2">
              <span>
                Showing <strong className="text-white">{filteredProjects.length}</strong> project{filteredProjects.length === 1 ? '' : 's'}
              </span>
              {(searchQuery || selectedCategory !== 'all') && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                  }}
                  className="text-blue-400 hover:underline active:scale-95"
                >
                  Clear Filters
                </button>
              )}
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
              <div className="p-12 rounded-3xl bg-[#0D1527] border border-slate-800 text-center space-y-4 my-8">
                <Layers className="w-10 h-10 text-slate-500 mx-auto" />
                <h3 className="text-lg font-bold text-white">No Projects Match Your Search</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                  Have an idea for campus or local community problems? Pitch it to recruit teammates!
                </p>
                <div className="pt-2">
                  <button
                    onClick={onProposeProject}
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl shadow-md active:scale-95"
                  >
                    Propose a Project Idea
                  </button>
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
