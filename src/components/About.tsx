import React from 'react';
import { Compass, Hammer, Sparkles, Code2, Globe2 } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const About: React.FC = () => {
  const { personal } = portfolioData;

  return (
    <section
      id="about"
      aria-label="About Me"
      className="py-24 px-4 sm:px-6 lg:px-8 border-b border-white/[0.06] scroll-mt-12"
    >
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 font-mono text-xs text-lime-400 uppercase tracking-widest">
            <span>01</span>
            <span className="text-zinc-600">/</span>
            <span>About</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Journey & Engineering Philosophy
          </h2>
        </div>

        {/* Story Paragraphs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-5 text-zinc-300 text-base sm:text-lg leading-relaxed">
            {personal.bioLong.map((paragraph, index) => (
              <p key={index} className="text-zinc-300/90 font-sans">
                {paragraph}
              </p>
            ))}

            <div className="pt-3">
              <div className="p-4 rounded-lg bg-[#111111] border border-white/[0.08] flex items-start gap-3">
                <Globe2 className="w-5 h-5 text-lime-400 shrink-0 mt-0.5" />
                <div className="text-sm text-zinc-300">
                  <span className="font-semibold text-white">Grounded in Practical Impact:</span> Based in Ethiopia, I am driven by the opportunity to engineer resilient software tailored for local and global challenges — from community empowerment hubs to AI-driven tools.
                </div>
              </div>
            </div>
          </div>

          {/* Key Quick Facts Sidebar */}
          <div className="space-y-4">
            <div className="p-5 rounded-lg bg-[#111111] border border-white/[0.08] space-y-4">
              <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-white border-b border-white/5 pb-2">
                Quick Profile
              </h3>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-zinc-500 block font-mono">Location</span>
                  <span className="text-zinc-200 font-medium">Ethiopia</span>
                </div>

                <div>
                  <span className="text-zinc-500 block font-mono">Discipline</span>
                  <span className="text-zinc-200 font-medium">Self-Taught Engineering</span>
                </div>

                <div>
                  <span className="text-zinc-500 block font-mono">Primary Focus</span>
                  <span className="text-zinc-200 font-medium">Full-Stack & Applied AI/ML</span>
                </div>

                <div>
                  <span className="text-zinc-500 block font-mono">Core Values</span>
                  <span className="text-zinc-200 font-medium">Learn by Building · Pragmatic Solutions</span>
                </div>

                <div>
                  <span className="text-zinc-500 block font-mono">Open To</span>
                  <span className="text-lime-400 font-medium">Full-Time, Contract & Collabs</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Core Principles */}
        <div className="pt-4">
          <h3 className="text-sm font-mono uppercase tracking-wider text-zinc-400 mb-6">
            Guiding Principles
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {personal.coreValues.map((val, idx) => {
              const icons = [
                <Hammer key="hammer" className="w-4 h-4 text-lime-400" />,
                <Compass key="compass" className="w-4 h-4 text-lime-400" />,
                <Code2 key="code" className="w-4 h-4 text-lime-400" />
              ];
              return (
                <div
                  key={idx}
                  className="p-5 rounded-lg bg-[#111111] border border-white/[0.08] hover:border-white/20 transition-colors space-y-2.5"
                >
                  <div className="flex items-center gap-2">
                    {icons[idx % icons.length]}
                    <h4 className="font-semibold text-white text-sm">{val.title}</h4>
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    {val.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
