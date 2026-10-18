import React from 'react';
import { ArrowUp, Github, Linkedin, Send, Heart } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const { socials, personal } = portfolioData;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-[#0A0A0A] border-t border-white/[0.08] text-xs font-mono">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Left: Identity & Copyright */}
        <div className="space-y-1 text-center sm:text-left">
          <div className="text-white font-medium flex items-center justify-center sm:justify-start gap-2">
            <span>© {new Date().getFullYear()} {personal.name}</span>
            <span className="text-zinc-600">·</span>
            <span className="text-zinc-400">Ethiopia</span>
          </div>
          <div className="text-zinc-500 text-[11px]">
            Engineered with React, TypeScript & Tailwind CSS. Minimal, dark, and performant.
          </div>
        </div>

        {/* Center: Social icons */}
        <div className="flex items-center gap-3">
          <a
            href={socials.github}
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-md bg-[#141414] text-zinc-400 hover:text-white border border-white/5 hover:border-white/20 transition-colors"
            aria-label="GitHub Profile"
          >
            <Github className="w-3.5 h-3.5" />
          </a>
          <a
            href={socials.linkedin}
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-md bg-[#141414] text-zinc-400 hover:text-white border border-white/5 hover:border-white/20 transition-colors"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="w-3.5 h-3.5" />
          </a>
          <a
            href={socials.telegram}
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-md bg-[#141414] text-zinc-400 hover:text-white border border-white/5 hover:border-white/20 transition-colors"
            aria-label="Telegram Channel"
          >
            <Send className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Right: Back to Top */}
        <button
          onClick={scrollToTop}
          type="button"
          className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#141414] text-zinc-400 hover:text-white border border-white/5 hover:border-white/20 transition-colors text-[11px]"
          aria-label="Scroll back to top"
        >
          <span>Back to top</span>
          <ArrowUp className="w-3 h-3 text-lime-400" />
        </button>
      </div>
    </footer>
  );
};
