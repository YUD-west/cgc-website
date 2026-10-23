import React from 'react';
import { Send, Github, Shield, MapPin, Heart } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  return (
    <footer className="w-full bg-black border-t border-[#2A2A2A] text-sm text-[#A3A3A3] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        {/* Brand column */}
        <div className="space-y-3">
          <div className="flex items-center gap-1.5">
            <span className="font-display font-extrabold text-xl tracking-[0.1em] text-[#F2F2F2]">
              CGC
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFC21A]" />
          </div>
          <p className="text-xs text-[#A3A3A3] max-w-sm leading-relaxed">
            Cyber Guardians Club — Ambo University, Woliso Campus.
            A student-led innovation community turning ideas into breakthrough impact.
          </p>
          <div className="flex items-center gap-1.5 text-xs text-[#737373]">
            <MapPin className="w-3.5 h-3.5 text-[#FFC21A]" />
            <span>Main ICT Building, Computer Lab 02 · Woliso, Ethiopia</span>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs">
          <button onClick={() => { setActiveTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition-colors cursor-pointer">Home</button>
          <button onClick={() => { setActiveTab('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition-colors cursor-pointer">About CGC</button>
          <button onClick={() => { setActiveTab('projects'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition-colors cursor-pointer">Projects</button>
          <button onClick={() => { setActiveTab('events'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition-colors cursor-pointer">Events &amp; Labs</button>
          <button onClick={() => { setActiveTab('verify'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition-colors cursor-pointer">Verify Pass</button>
          <button onClick={() => { setActiveTab('join'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="text-[#FFC21A] hover:underline cursor-pointer">Join Free</button>
        </div>

        {/* Socials & Telegram */}
        <div className="flex items-center gap-3">
          <a
            href="https://t.me/IT_Jointcommunity"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-[#2A2A2A] bg-[#0A0A0A] hover:bg-[#151515] hover:border-[#FFC21A]/50 text-xs text-[#F2F2F2] transition-colors"
          >
            <Send className="w-3.5 h-3.5 text-[#FFC21A]" />
            <span>Telegram Channel</span>
          </a>
          <a
            href="https://github.com/YUD-west/cgc-website"
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-lg border border-[#2A2A2A] bg-[#0A0A0A] hover:bg-[#151515] text-[#A3A3A3] hover:text-white transition-colors"
            title="Open Source on GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-[#1C1C1C] flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#737373] gap-3">
        <div>
          © {new Date().getFullYear()} Cyber Guardians Club (CGC). Lead Admin: Yesuf Dergu.
        </div>
        <div>
          Ambo University · Woliso Campus · 100% Free Community
        </div>
      </div>
    </footer>
  );
};
