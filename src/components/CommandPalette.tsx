import React, { useState, useEffect } from 'react';
import { 
  Search, 
  X, 
  ArrowRight, 
  Layers, 
  Calendar, 
  ShieldCheck, 
  Cpu, 
  Code2, 
  Rocket, 
  FileText 
} from 'lucide-react';
import { TRACKS } from '../data/tracks';
import { INITIAL_PROJECTS } from '../data/projects';
import { EVENTS } from '../data/events';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tab: string) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Parent triggers open
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredProjects = INITIAL_PROJECTS.filter(
    (p) =>
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
  );

  const filteredEvents = EVENTS.filter(
    (e) =>
      e.title.toLowerCase().includes(query.toLowerCase()) ||
      e.category.toLowerCase().includes(query.toLowerCase())
  );

  const filteredTracks = TRACKS.filter(
    (t) =>
      t.name.toLowerCase().includes(query.toLowerCase()) ||
      t.description.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (tab: string) => {
    onNavigate(tab);
    onClose();
    setQuery('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#111A2E] border border-slate-700 w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 border-b border-slate-800 bg-slate-900/60">
          <Search className="w-5 h-5 text-slate-400 mr-3 flex-shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Search projects, tracks, workshops, or pages..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full py-4 bg-transparent text-white placeholder-slate-500 text-sm focus:outline-none"
          />
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-md"
            aria-label="Close search"
          >
            <kbd className="text-[11px] font-mono bg-slate-800 px-2 py-0.5 rounded text-slate-400">
              ESC
            </kbd>
          </button>
        </div>

        {/* Results Container */}
        <div className="p-4 overflow-y-auto space-y-4">
          {/* Quick Page Links */}
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 px-2 block mb-1.5">
              Pages
            </span>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                onClick={() => handleSelect('join')}
                className="flex items-center justify-between p-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 text-xs text-left border border-emerald-500/20"
              >
                <span>Join CGC (Membership Form)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleSelect('projects')}
                className="flex items-center justify-between p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs text-left border border-slate-800"
              >
                <span>Projects & Code</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleSelect('events')}
                className="flex items-center justify-between p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs text-left border border-slate-800"
              >
                <span>Workshops & Events</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleSelect('about')}
                className="flex items-center justify-between p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs text-left border border-slate-800"
              >
                <span>About CGC & Mission</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Tracks */}
          {filteredTracks.length > 0 && (
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 px-2 block mb-1.5">
                Innovation Tracks
              </span>
              <div className="space-y-1">
                {filteredTracks.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => handleSelect('explore')}
                    className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-800 text-left text-xs transition-colors group"
                  >
                    <div>
                      <span className="font-semibold text-white group-hover:text-blue-300 block">
                        {t.name}
                      </span>
                      <span className="text-[11px] text-slate-400">{t.tagline}</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-blue-400" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {filteredProjects.length > 0 && (
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 px-2 block mb-1.5">
                Projects ({filteredProjects.length})
              </span>
              <div className="space-y-1">
                {filteredProjects.slice(0, 4).map((p) => (
                  <button
                    key={p.id}
                    onClick={() => handleSelect('projects')}
                    className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-800 text-left text-xs transition-colors group"
                  >
                    <div>
                      <span className="font-semibold text-white group-hover:text-blue-300 block">
                        {p.title}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        {p.origin} • {p.status}
                      </span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-blue-400" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Events */}
          {filteredEvents.length > 0 && (
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 px-2 block mb-1.5">
                Events ({filteredEvents.length})
              </span>
              <div className="space-y-1">
                {filteredEvents.slice(0, 3).map((e) => (
                  <button
                    key={e.id}
                    onClick={() => handleSelect('events')}
                    className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-800 text-left text-xs transition-colors group"
                  >
                    <div>
                      <span className="font-semibold text-white group-hover:text-blue-300 block">
                        {e.title}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        {e.date} • {e.category}
                      </span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-blue-400" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
