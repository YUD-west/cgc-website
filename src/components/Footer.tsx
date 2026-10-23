import React from 'react';
import { Github, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-black border-t border-[#2A2A2A] text-sm text-[#A3A3A3] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Brand & Location */}
        <div className="space-y-1.5 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-1.5">
            <span className="font-display font-extrabold text-lg tracking-[0.1em] text-[#F2F2F2]">
              CGC
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFC21A]" />
            <span className="text-xs text-[#737373] ml-2">Ambo University · Woliso Campus</span>
          </div>
          <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs text-[#737373]">
            <MapPin className="w-3.5 h-3.5 text-[#FFC21A]" />
            <span>Old Classroom ICT Building IT lab 01 and 06 · Woliso, Ethiopia</span>
          </div>
        </div>

        {/* GitHub link */}
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/YUD-west/cgc-website"
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-lg border border-[#2A2A2A] bg-[#080808] hover:bg-[#151515] hover:border-[#FFC21A]/50 text-[#A3A3A3] hover:text-[#FFC21A] transition-colors"
            title="Open Source on GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-6 pt-5 border-t border-[#1C1C1C] flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#737373] gap-2">
        <div>
          © {new Date().getFullYear()} Cyber Guardians Club (CGC). Lead Admin: Yesuf Dergu.
        </div>
        <div>
          100% Free Open Student Community
        </div>
      </div>
    </footer>
  );
};
