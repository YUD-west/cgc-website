import React, { useState, useMemo } from 'react';
import { HANDBOOK_SECTIONS, HandbookSection, CheatSheetCommand } from '../data/handbook';
import { TiltCard } from '../components/Motion/TiltCard';
import { MagneticButton } from '../components/Motion/MagneticButton';
import { RevealOnScroll } from '../components/Motion/RevealOnScroll';
import { 
  Terminal, 
  FolderGit2, 
  Code2, 
  ShieldCheck, 
  Sparkles, 
  Search, 
  Copy, 
  Check, 
  Printer, 
  Lightbulb, 
  Layers,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface HandbookPageProps {
  onNavigate?: (tab: string) => void;
}

export const HandbookPage: React.FC<HandbookPageProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    'linux-lab02': true,
    'git-workflow': true,
    'python-prototyping': true,
    'cyber-packet-inspection': true,
    'cross-faculty-problem': true
  });

  const categories = [
    { id: 'all', label: 'All Guides', icon: Layers },
    { id: 'linux', label: '💻 IT Lab 01 & 06', icon: Terminal },
    { id: 'git', label: '🌿 Git & GitHub', icon: FolderGit2 },
    { id: 'python', label: '🐍 Python & APIs', icon: Code2 },
    { id: 'cyber', label: '🔒 Cybersecurity', icon: ShieldCheck },
    { id: 'cross-faculty', label: '🌾 Cross-Faculty', icon: Sparkles },
  ];

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCommand(text);
    setTimeout(() => setCopiedCommand(null), 2000);
  };

  const toggleSection = (id: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const filteredSections = useMemo(() => {
    return HANDBOOK_SECTIONS.filter(sec => {
      const matchesCategory = selectedCategory === 'all' || sec.category === selectedCategory;
      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      const titleMatch = sec.title.toLowerCase().includes(q) || sec.subtitle.toLowerCase().includes(q);
      const commandMatch = sec.commands.some(
        c => c.command.toLowerCase().includes(q) || c.description.toLowerCase().includes(q) || (c.note && c.note.toLowerCase().includes(q))
      );
      const tipsMatch = sec.proTips.some(t => t.toLowerCase().includes(q));

      return titleMatch || commandMatch || tipsMatch;
    });
  }, [searchQuery, selectedCategory]);

  const getSectionIcon = (cat: string) => {
    switch (cat) {
      case 'linux': return <Terminal className="w-5 h-5 text-[#FFC21A]" />;
      case 'git': return <FolderGit2 className="w-5 h-5 text-white" />;
      case 'python': return <Code2 className="w-5 h-5 text-[#FFC21A]" />;
      case 'cyber': return <ShieldCheck className="w-5 h-5 text-white" />;
      case 'cross-faculty': return <Sparkles className="w-5 h-5 text-[#FFC21A]" />;
      default: return <Terminal className="w-5 h-5 text-[#FFC21A]" />;
    }
  };

  return (
    <div className="space-y-10 pb-28 sm:pb-24 pt-10 sm:pt-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-black text-[#F2F2F2]">
      
      {/* Header — Direct Heading with Sub-Heading */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#2A2A2A]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Student Lab Handbook & Cheat Sheets
          </h1>
          <p className="text-xs sm:text-sm text-neutral-300 mt-1 max-w-2xl leading-relaxed">
            Campus-tested terminal commands, Git collaborative workflows, Python recipes, and defensive packet inspection for Woliso students in Old Classroom ICT Building IT lab 01 and 06. Available 100% offline.
          </p>
        </div>

        {/* Offline & Print Actions */}
        <div className="flex items-center gap-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FFC21A]/10 border border-[#FFC21A]/30 text-[11px] font-semibold text-[#FFC21A] shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#FFC21A] animate-pulse" />
            <span>PWA Cached • Offline Ready</span>
          </div>

          <MagneticButton
            onClick={() => window.print()}
            className="px-3.5 py-1.5 rounded-xl bg-[#141414] hover:bg-[#202020] text-neutral-200 border border-[#2A2A2A] text-xs font-semibold transition-all flex items-center gap-1.5 active:scale-95 shadow-sm"
            title="Print or Save PDF"
          >
            <Printer className="w-3.5 h-3.5 text-[#FFC21A]" />
            <span className="hidden sm:inline">Print / Save PDF</span>
          </MagneticButton>
        </div>
      </div>

      {/* Search and Stream Filter Pills */}
      <div className="space-y-4">
        {/* Search Input */}
        <div className="relative max-w-xl">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search commands, flags, Git workflows, Wireshark filters..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#080808] border border-[#2A2A2A] text-white text-xs sm:text-sm placeholder-neutral-500 focus:outline-none focus:border-[#FFC21A] transition shadow-inner"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-2 rounded-xl font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 active:scale-95 ${
                selectedCategory === cat.id
                  ? 'bg-[#FFC21A] text-black shadow-md font-bold'
                  : 'bg-[#080808] text-neutral-300 hover:text-white border border-[#2A2A2A] hover:bg-[#141414]'
              }`}
            >
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Handbook Content Cards */}
      <div className="space-y-6">
        {filteredSections.length > 0 ? (
          filteredSections.map((section) => {
            const isExpanded = expandedSections[section.id] !== false;
            return (
              <RevealOnScroll key={section.id}>
                <div
                  className="rounded-3xl bg-[#080808] border border-[#2A2A2A] overflow-hidden shadow-xl transition-all"
                >
                  {/* Section Header Accordion Trigger */}
                  <div
                    onClick={() => toggleSection(section.id)}
                    className="p-5 sm:p-6 cursor-pointer flex items-center justify-between gap-4 border-b border-[#2A2A2A] hover:bg-[#141414] transition-colors"
                  >
                    <div className="flex items-start gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-[#141414] border border-[#2A2A2A] flex items-center justify-center shrink-0 shadow-inner">
                        {getSectionIcon(section.category)}
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                          {section.title}
                        </h3>
                        <p className="text-xs text-[#FFC21A] font-medium mt-0.5">
                          {section.subtitle}
                        </p>
                        <p className="text-[11px] text-neutral-300 mt-1">
                          <strong className="text-white">Lab Context:</strong> {section.practicalScenario}
                        </p>
                      </div>
                    </div>

                    <button className="text-neutral-400 p-1.5 rounded-lg hover:text-white active:scale-95">
                      {isExpanded ? <ChevronUp className="w-5 h-5 text-[#FFC21A]" /> : <ChevronDown className="w-5 h-5" />}
                    </button>
                  </div>

                  {/* Collapsible Content */}
                  {isExpanded && (
                    <div className="p-5 sm:p-6 space-y-6 animate-fade-in">
                      
                      {/* Command Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {section.commands.map((cmd, idx) => (
                          <TiltCard
                            key={idx}
                            maxTilt={4}
                            scale={1.01}
                            className="p-4 rounded-2xl bg-[#050505] border border-[#2A2A2A] flex flex-col justify-between space-y-3 group hover:border-neutral-600 transition"
                          >
                            <div>
                              <div className="flex items-start justify-between gap-2">
                                <span className="text-xs font-semibold text-neutral-200 block">
                                  {cmd.description}
                                </span>
                                <button
                                  onClick={() => handleCopy(cmd.command)}
                                  className="text-neutral-400 hover:text-white p-1 rounded bg-[#141414] hover:bg-[#202020] transition shrink-0 active:scale-95 border border-[#2A2A2A]"
                                  title="Copy command"
                                >
                                  {copiedCommand === cmd.command ? (
                                    <Check className="w-3.5 h-3.5 text-[#FFC21A]" />
                                  ) : (
                                    <Copy className="w-3.5 h-3.5" />
                                  )}
                                </button>
                              </div>

                              {/* Command Code Snippet */}
                              <div className="mt-2 p-2.5 rounded-xl bg-black border border-[#2A2A2A] font-mono text-xs text-[#FFC21A] break-all select-all flex items-center justify-between gap-2 shadow-inner">
                                <code>{cmd.command}</code>
                              </div>

                              {cmd.example && (
                                <div className="text-[11px] text-neutral-400 mt-2">
                                  <span className="text-neutral-500 font-mono">eg: </span>
                                  <code className="text-neutral-300 font-mono">{cmd.example}</code>
                                </div>
                              )}

                              {cmd.note && (
                                <p className="text-[11px] text-[#FFC21A]/90 mt-1.5 leading-relaxed">
                                  💡 {cmd.note}
                                </p>
                              )}
                            </div>
                          </TiltCard>
                        ))}
                      </div>

                      {/* Pro Tips Box */}
                      {section.proTips && section.proTips.length > 0 && (
                        <div className="p-4 rounded-2xl bg-[#141414] border border-[#FFC21A]/30 text-xs space-y-1.5 shadow-sm">
                          <div className="flex items-center gap-1.5 text-[#FFC21A] font-bold uppercase tracking-wider text-[11px]">
                            <Lightbulb className="w-3.5 h-3.5 text-[#FFC21A]" />
                            <span>IT Lab 01 & 06 Pro-Tips</span>
                          </div>
                          <ul className="space-y-1 text-neutral-300 pl-4 list-disc">
                            {section.proTips.map((tip, idx) => (
                              <li key={idx} className="leading-relaxed">
                                {tip}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                    </div>
                  )}
                </div>
              </RevealOnScroll>
            );
          })
        ) : (
          <div className="p-12 rounded-3xl bg-[#080808] border border-[#2A2A2A] text-center space-y-3">
            <Search className="w-8 h-8 text-neutral-500 mx-auto" />
            <h3 className="text-base font-bold text-white">No Handbook Commands Found</h3>
            <p className="text-xs text-neutral-400 max-w-sm mx-auto">
              No results match &quot;{searchQuery}&quot;. Try searching for &quot;git&quot;, &quot;ls&quot;, &quot;wireshark&quot;, or &quot;python&quot;.
            </p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
              className="text-xs font-semibold text-[#FFC21A] hover:underline pt-2 active:scale-95"
            >
              Reset Search Filter
            </button>
          </div>
        )}
      </div>

    </div>
  );
};
