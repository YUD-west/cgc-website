import React from 'react';
import { ArrowDown, ArrowUpRight, Github, Linkedin, Send, MapPin, Terminal } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const Hero: React.FC = () => {
  const { personal, socials } = portfolioData;

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      aria-label="Introduction"
      className="relative min-h-[90vh] flex flex-col justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 border-b border-white/[0.06]"
    >
      <div className="max-w-4xl mx-auto w-full space-y-8">
        {/* Status & Location Pill */}
        <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-[#121212] border border-white/10 text-xs font-mono text-zinc-300">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-lime-400"></span>
          </span>
          <span className="text-zinc-400">Status:</span>
          <span className="text-white font-medium">Available for work</span>
          <span className="text-zinc-600">|</span>
          <span className="flex items-center gap-1 text-zinc-400">
            <MapPin className="w-3.5 h-3.5 text-lime-400" />
            {personal.location}
          </span>
        </div>

        {/* Hero Title & Identity */}
        <div className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm font-mono text-lime-400 tracking-wide uppercase font-semibold">
              Hello, world — I am
            </p>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08]">
              {personal.name}
            </h1>
          </div>

          <h2 className="text-lg sm:text-2xl font-normal text-zinc-300 max-w-3xl leading-relaxed">
            <span className="text-white font-medium">Self-taught Developer</span> specializing in{' '}
            <span className="text-white font-medium">Full-Stack Engineering</span> and an{' '}
            <span className="text-white font-medium">Aspiring AI/ML Engineer</span>.
          </h2>
        </div>

        {/* Confident, Natural Introduction */}
        <p className="text-base sm:text-lg text-zinc-400 max-w-2xl leading-relaxed font-sans">
          I learn by building real, resilient software. My focus is writing clean, dependable full-stack web applications and applying intelligent AI/ML models to solve concrete, practical problems.
        </p>

        {/* Action Buttons & Links */}
        <div className="flex flex-wrap items-center gap-4 pt-2">
          {/* Primary View Projects Button */}
          <button
            onClick={() => scrollTo('projects')}
            className="group px-5 py-3 rounded-md bg-white text-black font-semibold text-sm hover:bg-lime-400 transition-all duration-150 flex items-center gap-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-lime-400"
          >
            <span>View Projects</span>
            <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
          </button>

          {/* Contact Me Button */}
          <button
            onClick={() => scrollTo('contact')}
            className="px-5 py-3 rounded-md bg-[#161616] text-white border border-white/15 font-medium text-sm hover:border-lime-400/60 hover:text-lime-400 transition-all duration-150 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-lime-400"
          >
            <span>Contact Me</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>

          {/* Social Links */}
          <div className="flex items-center gap-2 pl-0 sm:pl-3 sm:border-l sm:border-white/10">
            <a
              href={socials.github}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-md bg-[#121212] border border-white/10 text-zinc-400 hover:text-white hover:border-white/30 transition-colors"
              aria-label="GitHub Profile"
              title="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={socials.linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-md bg-[#121212] border border-white/10 text-zinc-400 hover:text-white hover:border-white/30 transition-colors"
              aria-label="LinkedIn Profile"
              title="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={socials.telegram}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-md bg-[#121212] border border-white/10 text-zinc-400 hover:text-white hover:border-white/30 transition-colors"
              aria-label="Telegram Profile"
              title="Telegram"
            >
              <Send className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Minimal terminal snippet indicating focus areas */}
        <div className="pt-6">
          <div className="rounded-lg bg-[#0F0F0F] border border-white/[0.08] p-4 max-w-xl font-mono text-xs text-zinc-400 space-y-2">
            <div className="flex items-center gap-2 text-zinc-500 pb-1 border-b border-white/5">
              <Terminal className="w-3.5 h-3.5 text-lime-400" />
              <span>developer-manifest.json</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 text-zinc-300">
              <div>
                <span className="text-zinc-500">stack:</span> ['React', 'TypeScript', 'Node.js']
              </div>
              <div>
                <span className="text-zinc-500">focus:</span> ['Full-Stack', 'Applied AI/ML']
              </div>
              <div>
                <span className="text-zinc-500">learning:</span> 'Shipping real software'
              </div>
              <div>
                <span className="text-zinc-500">location:</span> 'Ethiopia'
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
