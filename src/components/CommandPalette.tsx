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
  FileText,
  BookOpen,
  Terminal
} from 'lucide-react';
import { TRACKS } from '../data/tracks';
import { INITIAL_PROJECTS } from '../data/projects';
import { EVENTS } from '../data/events';
import { HANDBOOK_SECTIONS } from '../data/handbook';

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

  const filteredHandbook = HANDBOOK_SECTIONS.filter(
    (h) =>
      h.title.toLowerCase().includes(query.toLowerCase()) ||
      h.subtitle.toLowerCase().includes(query.toLowerCase()) ||
      h.commands.some(
        (c) =>
          c.command.toLowerCase().includes(query.toLowerCase()) ||
          c.description.toLowerCase().includes(query.toLowerCase())
      )
  );

  const handleSelect = (tab: string) => {
    onNavigate(tab);
    onClose();
    setQuery('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/80 backdrop-blur-sm animate-fade-in text-[#F2F2F2]">
      <div className="bg-[#080808] border border-[#2A2A2A] w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 border-b border-[#2A2A2A] bg-[#000000]">
          <Search className="w-5 h-5 text-neutral-400 mr-3 flex-shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Search projects, tracks, workshops, commands..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full py-4 bg-transparent text-white placeholder-neutral-500 text-sm focus:outline-none"
          />
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white p-1 rounded-md"
            aria-label="Close search"
          >
            <kbd className="text-[11px] font-mono bg-[#141414] px-2 py-0.5 rounded text-neutral-400 border border-[#2A2A2A]">
              ESC
            </kbd>
          </button>
        </div>

        {/* Results Container */}
        <div className="p-4 overflow-y-auto space-y-4">
          {/* Quick Page Links */}
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-500 px-2 block mb-1.5">
              Pages
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
              <button
                onClick={() => handleSelect('join')}
                className="flex items-center justify-between p-2 rounded-lg bg-[#FFC21A]/10 hover:bg-[#FFC21A]/20 text-[#FFC21A] text-xs text-left border border-[#FFC21A]/30 font-semibold"
              >
                <span>Join CGC (Free)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleSelect('handbook')}
                className="flex items-center justify-between p-2 rounded-lg bg-[#141414] hover:bg-[#202020] text-white text-xs text-left border border-[#2A2A2A]"
              >
                <span>Lab Handbook</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#FFC21A]" />
              </button>
              <button
                onClick={() => handleSelect('projects')}
                className="flex items-center justify-between p-2 rounded-lg bg-[#141414] hover:bg-[#202020] text-white text-xs text-left border border-[#2A2A2A]"
              >
                <span>Projects & Code</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#FFC21A]" />
              </button>
              <button
                onClick={() => handleSelect('events')}
                className="flex items-center justify-between p-2 rounded-lg bg-[#141414] hover:bg-[#202020] text-white text-xs text-left border border-[#2A2A2A]"
              >
                <span>Events & Labs</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#FFC21A]" />
              </button>
              <button
                onClick={() => handleSelect('about')}
                className="flex items-center justify-between p-2 rounded-lg bg-[#141414] hover:bg-[#202020] text-white text-xs text-left border border-[#2A2A2A]"
              >
                <span>About CGC</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#FFC21A]" />
              </button>
            </div>
          </div>

          {/* Tracks */}
          {filteredTracks.length > 0 && (
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-500 px-2 block mb-1.5">
                Innovation Tracks
              </span>
              <div className="space-y-1">
                {filteredTracks.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => handleSelect('explore')}
                    className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-[#141414] text-left text-xs transition-colors group"
                  >
                    <div>
                      <span className="font-semibold text-white group-hover:text-[#FFC21A] block">
                        {t.name}
                      </span>
                      <span className="text-[11px] text-neutral-400">{t.tagline}</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-[#FFC21A]" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {filteredProjects.length > 0 && (
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-500 px-2 block mb-1.5">
                Projects ({filteredProjects.length})
              </span>
              <div className="space-y-1">
                {filteredProjects.slice(0, 4).map((p) => (
                  <button
                    key={p.id}
                    onClick={() => handleSelect('projects')}
                    className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-[#141414] text-left text-xs transition-colors group"
                  >
                    <div>
                      <span className="font-semibold text-white group-hover:text-[#FFC21A] block">
                        {p.title}
                      </span>
                      <span className="text-[11px] text-neutral-400">
                        {p.origin} • {p.status}
                      </span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-[#FFC21A]" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Events */}
          {filteredEvents.length > 0 && (
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-500 px-2 block mb-1.5">
                Events ({filteredEvents.length})
              </span>
              <div className="space-y-1">
                {filteredEvents.slice(0, 3).map((e) => (
                  <button
                    key={e.id}
                    onClick={() => handleSelect('events')}
                    className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-[#141414] text-left text-xs transition-colors group"
                  >
                    <div>
                      <span className="font-semibold text-white group-hover:text-[#FFC21A] block">
                        {e.title}
                      </span>
                      <span className="text-[11px] text-neutral-400">
                        {e.date} • {e.category}
                      </span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-[#FFC21A]" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Lab Handbook & Cheats */}
          {query.trim().length > 0 && filteredHandbook.length > 0 && (
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-500 px-2 block mb-1.5">
                Lab Cheat Sheets ({filteredHandbook.length})
              </span>
              <div className="space-y-1">
                {filteredHandbook.map((h) => (
                  <button
                    key={h.id}
                    onClick={() => handleSelect('handbook')}
                    className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-[#141414] text-left text-xs transition-colors group"
                  >
                    <div>
                      <span className="font-semibold text-[#FFC21A] group-hover:text-white block flex items-center gap-1.5">
                        <Terminal className="w-3.5 h-3.5" />
                        {h.title}
                      </span>
                      <span className="text-[11px] text-neutral-400">
                        {h.subtitle}
                      </span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-[#FFC21A]" />
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
