import React, { useState, useMemo } from 'react';
import { SectionHeader } from '../components/SectionHeader';
import { ProjectCard } from '../components/ProjectCard';
import { INITIAL_PROJECTS } from '../data/projects';
import { TRACKS } from '../data/tracks';
import { Project, TrackId, ProjectOrigin, ProjectStatus } from '../types';
import { 
  Search, 
  Filter, 
  Sparkles, 
  Plus, 
  ShieldCheck, 
  Info,
  CheckCircle2,
  Users,
  Layers
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
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTrack, setSelectedTrack] = useState<string>('all');
  const [selectedOrigin, setSelectedOrigin] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  // Combined project pool (Initial sample catalog + newly submitted community proposals)
  const allProjects = useMemo(() => {
    return [...customProposals, ...INITIAL_PROJECTS];
  }, [customProposals]);

  // Filtered projects
  const filteredProjects = useMemo(() => {
    return allProjects.filter((p) => {
      // Search matches
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.tags.some((t) => t.toLowerCase().includes(query)) ||
        p.lead.toLowerCase().includes(query);

      // Track filter
      const matchesTrack = selectedTrack === 'all' || p.trackId === selectedTrack;

      // Origin filter
      const matchesOrigin = selectedOrigin === 'all' || p.origin === selectedOrigin;

      // Status filter
      const matchesStatus = selectedStatus === 'all' || p.status === selectedStatus;

      return matchesSearch && matchesTrack && matchesOrigin && matchesStatus;
    });
  }, [allProjects, searchQuery, selectedTrack, selectedOrigin, selectedStatus]);

  return (
    <div className="space-y-12 sm:space-y-16 pb-20 pt-12 sm:pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <SectionHeader
          badge="Build Things That Matter"
          badgeColor="blue"
          title="Projects & Innovation Registry"
          description="Real projects and student collaboration are the heart of CGC. Explore active codebases, join an existing team, or pitch your own idea to recruit student builders."
          action={
            <button
              onClick={onProposeProject}
              className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-glow-blue transition-all flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Propose a Project Idea</span>
            </button>
          }
        />

        {/* Ethical Transparency Note */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 flex items-start sm:items-center gap-3 mb-8">
          <Info className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5 sm:mt-0" />
          <div>
            <strong className="text-white">Sample & Concept Project Notice:</strong> To maintain strict authenticity, featured entries represent realistic student problem statements and prototypes at Ambo University Woliso Campus. Any newly proposed idea by visitors is saved dynamically to your local session registry.
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-[#111A2E] border border-slate-800 p-5 rounded-2xl shadow-card space-y-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search projects by keywords, tools (e.g. Python, Scapy), or lead..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Quick Track Filter */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
              <button
                onClick={() => setSelectedTrack('all')}
                className={`px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedTrack === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                All Tracks
              </button>
              {TRACKS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setSelectedTrack(t.id)}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                    selectedTrack === t.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {t.shortName}
                </button>
              ))}
            </div>
          </div>

          {/* Sub Filters: Origin & Status */}
          <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
                Origin:
              </span>
              {['all', 'CGC Initiated', 'Student Proposed'].map((org) => (
                <button
                  key={org}
                  onClick={() => setSelectedOrigin(org)}
                  className={`px-2.5 py-1 rounded-md transition-colors ${
                    selectedOrigin === org
                      ? 'bg-slate-800 text-white font-semibold border border-slate-700'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {org === 'all' ? 'All Origins' : org}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <span className="text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
                Status:
              </span>
              {['all', 'Active', 'Open for Contributors', 'Incubating', 'Completed'].map((st) => (
                <button
                  key={st}
                  onClick={() => setSelectedStatus(st)}
                  className={`px-2.5 py-1 rounded-md transition-colors ${
                    selectedStatus === st
                      ? 'bg-slate-800 text-white font-semibold border border-slate-700'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {st === 'all' ? 'All Statuses' : st}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Project Results Counter */}
        <div className="flex items-center justify-between text-xs text-slate-400 mb-6">
          <span>
            Showing <strong className="text-white">{filteredProjects.length}</strong> project
            {filteredProjects.length === 1 ? '' : 's'}
          </span>
          {(searchQuery || selectedTrack !== 'all' || selectedOrigin !== 'all' || selectedStatus !== 'all') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedTrack('all');
                setSelectedOrigin('all');
                setSelectedStatus('all');
              }}
              className="text-blue-400 hover:underline"
            >
              Reset Filters
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
          <div className="p-12 rounded-3xl bg-[#111A2E] border border-slate-800 text-center space-y-4">
            <Layers className="w-10 h-10 text-slate-500 mx-auto" />
            <h3 className="text-xl font-bold text-white">No Matching Projects Found</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              No project matched your filter criteria. Try adjusting the search query or submit your own project idea!
            </p>
            <div className="pt-2">
              <button
                onClick={onProposeProject}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl"
              >
                Propose a Project Idea Now
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
