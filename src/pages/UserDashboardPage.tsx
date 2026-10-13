import React from 'react';
import { useAuth } from '../context/AuthContext';
import { CGCLogo } from '../components/Logo/CGCLogo';
import { 
  CheckCircle2, 
  Terminal, 
  Layers, 
  Calendar, 
  Sparkles, 
  ShieldCheck, 
  Users, 
  Code2, 
  BookOpen, 
  Send,
  ExternalLink
} from 'lucide-react';

interface UserDashboardProps {
  onNavigate: (tab: string) => void;
  onProposeProject?: () => void;
}

export const UserDashboardPage: React.FC<UserDashboardProps> = ({
  onNavigate,
  onProposeProject
}) => {
  const { user, membership } = useAuth();

  if (!user) {
    return (
      <div className="py-24 max-w-xl mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Student Member Portal</h2>
        <p className="text-slate-400 text-sm mb-6">Please sign in to view your CGC Digital Member Pass.</p>
      </div>
    );
  }

  const memberId = membership?.id || `CGC-WL-2026-${user.id.slice(-4).toUpperCase()}`;

  return (
    <div className="py-12 sm:py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 animate-fade-in">
      
      {/* Top Welcome Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-[#111A2E] border border-slate-800 shadow-card">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">CGC Member Portal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Welcome, {user.fullName}
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            {user.department || 'Information Technology'} • Ambo University, Woliso Campus
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('projects')}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
          >
            Browse Projects
          </button>
          <button
            onClick={() => onNavigate('events')}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-glow-blue transition-colors"
          >
            Upcoming Workshops →
          </button>
        </div>
      </div>

      {/* Grid: Official Digital Pass & Member Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Column 1: Official Verified Digital Member Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#0F172A] to-[#162238] border border-blue-900/60 shadow-2xl relative flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-5">
              <CGCLogo variant="full" size="sm" showTagline={false} />
              <span className="px-2.5 py-1 rounded text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                OFFICIAL MEMBER
              </span>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <span className="text-slate-500 text-[10px] uppercase font-semibold">Student Name</span>
                <div className="text-lg font-bold text-white">{user.fullName}</div>
              </div>

              <div>
                <span className="text-slate-500 text-[10px] uppercase font-semibold">Department & Year</span>
                <div className="text-slate-200 font-medium">
                  {user.department || 'Informatics'} • {user.yearOfStudy || '2nd Year'}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-slate-500 text-[10px] uppercase font-semibold">Track</span>
                  <div className="text-blue-400 font-semibold capitalize">Cyber & Software</div>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] uppercase font-semibold">Verified Member ID</span>
                  <div className="text-emerald-400 font-mono font-bold">{memberId}</div>
                </div>
              </div>

              <div>
                <span className="text-slate-500 text-[10px] uppercase font-semibold">Campus & Location</span>
                <div className="text-slate-300 font-medium">Ambo University, Woliso Campus</div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800/80 text-[10px] text-slate-500 font-mono flex items-center justify-between">
            <span>Cyber Guardians Club</span>
            <span>Ideas into Impact</span>
          </div>
        </div>

        {/* Column 2 & 3: Student Hub & Community Involvement */}
        <div className="lg:col-span-2 p-6 sm:p-8 rounded-3xl bg-[#111A2E] border border-slate-800 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
              <div className="flex items-center gap-2">
                <Terminal className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-white text-base">Your Innovation Pathway</h3>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                100% Free Open Community
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-white font-bold">
                  <Code2 className="w-4 h-4 text-blue-400" />
                  <span>Lab Sprints & Workstations</span>
                </div>
                <p className="text-slate-400 leading-relaxed text-xs">
                  Access weekend coding sprints in Computer Lab 02. Collaborate on open-source repositories and hands-on system building.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-white font-bold">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Peer Mentorship</span>
                </div>
                <p className="text-slate-400 leading-relaxed text-xs">
                  Pair with 3rd & 4th year student organizers for ethical hacking challenges, web architectures, and hackathon project defenses.
                </p>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-2xl bg-blue-950/20 border border-blue-900/40 text-xs text-slate-300 space-y-2">
              <div className="font-bold text-white flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Next Steps for Members</span>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed">
                Quote your Member ID (<strong className="text-white">{memberId}</strong>) during lab check-ins or orientation ceremonies to receive repo permissions and event badges.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs text-slate-400">
              Motto: <strong className="text-slate-200">Don't just attend events. Build things that matter.</strong>
            </span>

            <button
              onClick={() => onNavigate('projects')}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md transition-colors"
            >
              Join an Active Project Team →
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
