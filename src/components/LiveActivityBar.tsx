import React from 'react';
import { MapPin, Terminal, Users, Shield, Sparkles } from 'lucide-react';

export const LiveActivityBar: React.FC = () => {
  return (
    <div className="w-full bg-[#0B1120] border-b border-slate-800/80 px-4 py-2 text-xs text-slate-300">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left: Lab status & Campus location */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-medium text-slate-200">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Computer Lab 02 Active</span>
          </div>

          <span className="text-slate-600 hidden sm:inline">•</span>

          <div className="hidden sm:flex items-center gap-1 text-slate-400">
            <MapPin className="w-3.5 h-3.5 text-blue-400" />
            <span>Ambo University, Woliso Campus</span>
          </div>
        </div>

        {/* Right: Metrics & Free access note */}
        <div className="flex items-center gap-3 text-slate-400 text-[11px]">
          <div className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-emerald-400" />
            <span>500+ Campus Community Members</span>
          </div>
          <span className="text-slate-600 hidden md:inline">•</span>
          <span className="text-emerald-400 font-semibold hidden md:inline">
            100% Free & Open
          </span>
        </div>
      </div>
    </div>
  );
};
