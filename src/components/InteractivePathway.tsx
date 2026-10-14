import React, { useState } from 'react';
import { 
  Code2, 
  ShieldCheck, 
  Sprout, 
  Briefcase, 
  HeartHandshake, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  Users,
  Terminal,
  ExternalLink
} from 'lucide-react';

interface PathwayOption {
  id: string;
  label: string;
  icon: any;
  trackTitle: string;
  tagline: string;
  whoIsThisFor: string;
  whatYouWillDo: string[];
  activeProject: {
    title: string;
    description: string;
    openRole: string;
  };
  destinationTab: string;
}

const PATHWAYS: PathwayOption[] = [
  {
    id: 'code',
    label: 'I Want to Code',
    icon: Code2,
    trackTitle: 'Software Engineering & Web Apps',
    tagline: 'Scaffold real applications, commit to GitHub, and ship code.',
    whoIsThisFor: 'Students eager to learn React, Node.js, Python, and build campus platforms.',
    whatYouWillDo: [
      'Scaffold full-stack web platforms using TypeScript & React',
      'Collaborate on GitHub with pull requests and code reviews',
      'Deploy live projects for campus students to use'
    ],
    activeProject: {
      title: 'CGC Official Portal & Digital Member Pass',
      description: 'Building mobile-first web modules and campus verification badge system.',
      openRole: 'Frontend UI Contributor'
    },
    destinationTab: 'projects'
  },
  {
    id: 'security',
    label: 'I Want Security & Networks',
    icon: ShieldCheck,
    trackTitle: 'Cybersecurity & Defensive Networking',
    tagline: 'Inspect live network packets, audit systems, and run CTF defense drills.',
    whoIsThisFor: 'Curious learners who want hands-on experience in Computer Lab 02.',
    whatYouWillDo: [
      'Inspect network packets in Wireshark and spot unencrypted leaks',
      'Hardening Linux terminal workstations and firewalls',
      'Solve competitive Capture-The-Flag (CTF) security challenges'
    ],
    activeProject: {
      title: 'Lab 02 Network Defense & Ethical Telemetry',
      description: 'Hands-on terminal security hardening and packet analysis drills in Lab 02.',
      openRole: 'Network Security Learner'
    },
    destinationTab: 'projects'
  },
  {
    id: 'agriculture',
    label: 'I am in Agriculture',
    icon: Sprout,
    trackTitle: 'AgriTech & Field Problem Solving',
    tagline: 'Use technology to diagnose crop issues and share regional market data.',
    whoIsThisFor: 'Students from the Faculty of Agriculture & Natural Sciences.',
    whatYouWillDo: [
      'Collect and annotate local crop disease photographs around Woliso',
      'Help design mobile field tools that local farmers can easily use',
      'Pair with IT students to validate AI crop disease classification'
    ],
    activeProject: {
      title: 'Woliso Campus AI & Crop Computing Cohort',
      description: 'Collaborative initiative training students on data curation and crop health.',
      openRole: 'Field Data Researcher'
    },
    destinationTab: 'projects'
  },
  {
    id: 'business',
    label: 'I am in Business / Ideas',
    icon: Briefcase,
    trackTitle: 'Product Innovation & Entrepreneurship',
    tagline: 'Validate problems, design business models, and launch student ventures.',
    whoIsThisFor: 'Business & Economics students who want to turn ideas into viable products.',
    whatYouWillDo: [
      'Conduct customer interviews with Woliso students and town locals',
      'Scope Minimum Viable Products (MVPs) and pricing structures',
      'Lead product pitch presentations before hackathon panels'
    ],
    activeProject: {
      title: 'Cursor Hackathon Ambo Platform',
      description: 'Student prototype showcased before university faculty examiners.',
      openRole: 'Product Pitch & Growth Lead'
    },
    destinationTab: 'projects'
  },
  {
    id: 'health',
    label: 'I am in Health / Social Sciences',
    icon: HeartHandshake,
    trackTitle: 'Community Tech & Healthcare Tools',
    tagline: 'Human-centered design and public impact solutions.',
    whoIsThisFor: 'Students passionate about community welfare and regional healthcare access.',
    whatYouWillDo: [
      'Identify critical communication bottlenecks in clinics and dorms',
      'Design clean, accessible user interfaces for non-technical users',
      'Coordinate student emergency and support response initiatives'
    ],
    activeProject: {
      title: 'IT Joint Community Knowledge Base',
      description: 'Campus-wide multilingual resource index and peer support system.',
      openRole: 'Community Coordinator'
    },
    destinationTab: 'projects'
  }
];

interface InteractivePathwayProps {
  onNavigate: (tab: string) => void;
}

export const InteractivePathway: React.FC<InteractivePathwayProps> = ({ onNavigate }) => {
  const [activePathwayId, setActivePathwayId] = useState<string>('code');
  const activePathway = PATHWAYS.find((p) => p.id === activePathwayId) || PATHWAYS[0];

  return (
    <div className="rounded-3xl bg-[#0F172A] border border-slate-800 p-6 sm:p-8 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Find Your Place in CGC
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Tap your background or goal to see your recommended pathway and active teams.
          </p>
        </div>
      </div>

      {/* Interactive Motion Tab Buttons */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {PATHWAYS.map((path) => {
          const Icon = path.icon;
          const isSelected = activePathwayId === path.id;
          return (
            <button
              key={path.id}
              onClick={() => setActivePathwayId(path.id)}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 active:scale-95 ${
                isSelected
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800 hover:border-slate-700'
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{path.label}</span>
            </button>
          );
        })}
      </div>

      {/* Animated Pathway Details Panel */}
      <div className="mt-6 pt-6 border-t border-slate-800 grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
        
        {/* Left Col: Scope & Activities */}
        <div className="lg:col-span-2 space-y-4">
          <div>
            <h3 className="text-lg font-bold text-white">
              {activePathway.trackTitle}
            </h3>
            <p className="text-xs sm:text-sm text-blue-400 font-medium mt-0.5">
              {activePathway.tagline}
            </p>
            <p className="text-xs text-slate-300 mt-2">
              <strong>Target Audience:</strong> {activePathway.whoIsThisFor}
            </p>
          </div>

          <div className="space-y-2 pt-2">
            <span className="text-xs font-bold text-slate-200 uppercase tracking-wider block">
              What You Will Practice in Lab 02:
            </span>
            <div className="space-y-1.5">
              {activePathway.whatYouWillDo.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Active Live Team & Quick Action */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between space-y-4">
          <div>
            <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider block mb-1">
              • Active Team Opportunity
            </span>
            <h4 className="text-sm font-bold text-white">
              {activePathway.activeProject.title}
            </h4>
            <p className="text-xs text-slate-400 mt-1 line-clamp-2">
              {activePathway.activeProject.description}
            </p>

            <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20 text-xs text-blue-300 font-medium">
              <span>Open Role:</span>
              <strong className="text-white">{activePathway.activeProject.openRole}</strong>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <button
              onClick={() => onNavigate('join')}
              className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-all shadow-sm flex items-center justify-center gap-1.5 active:scale-95"
            >
              <span>Join This Cohort</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
