import React from 'react';
import { Layout, Server, Terminal, Sparkles, Check, Edit3 } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const Skills: React.FC = () => {
  const { skills } = portfolioData;

  const categoryIcons = [
    <Layout key="fe" className="w-4 h-4 text-lime-400" />,
    <Server key="be" className="w-4 h-4 text-lime-400" />,
    <Terminal key="prog" className="w-4 h-4 text-lime-400" />,
    <Sparkles key="ai" className="w-4 h-4 text-lime-400" />,
  ];

  return (
    <section
      id="skills"
      aria-label="Technical Skills"
      className="py-24 px-4 sm:px-6 lg:px-8 border-b border-white/[0.06] scroll-mt-12"
    >
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-mono text-xs text-lime-400 uppercase tracking-widest">
              <span>04</span>
              <span className="text-zinc-600">/</span>
              <span>Skills & Toolkit</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Technologies & Methodologies
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 max-w-xl">
              Tools I work with daily to construct reliable web applications and explore applied AI systems.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 bg-[#111111] border border-white/5 px-3 py-1.5 rounded-lg">
            <Edit3 className="w-3.5 h-3.5 text-lime-400" />
            <span>Configurable in portfolioData.ts</span>
          </div>
        </div>

        {/* 4 Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skills.map((category, index) => (
            <div
              key={category.title}
              className="p-6 rounded-xl bg-[#111111] border border-white/[0.08] hover:border-white/20 transition-all flex flex-col justify-between space-y-6"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    {categoryIcons[index % categoryIcons.length]}
                    <h3 className="font-bold text-white text-lg tracking-tight">
                      {category.title}
                    </h3>
                  </div>
                  <span className="text-[11px] font-mono text-zinc-500">
                    {category.skills.length} skills
                  </span>
                </div>
                <p className="text-xs text-zinc-400">
                  {category.description}
                </p>
              </div>

              {/* Skills Chips */}
              <div className="flex flex-wrap gap-2 pt-2">
                {category.skills.map((skill) => {
                  const isCore = skill.tag === 'Core' || skill.tag === 'Focus';
                  return (
                    <div
                      key={skill.name}
                      className={`group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono transition-colors ${
                        isCore
                          ? 'bg-[#181818] border border-lime-400/30 text-white hover:border-lime-400'
                          : 'bg-[#141414] border border-white/5 text-zinc-300 hover:border-white/20 hover:text-white'
                      }`}
                    >
                      {isCore && (
                        <span className="w-1.5 h-1.5 rounded-full bg-lime-400 shrink-0"></span>
                      )}
                      <span>{skill.name}</span>
                      {skill.level && (
                        <span className="text-[10px] text-zinc-500 group-hover:text-zinc-400 hidden sm:inline">
                          · {skill.level}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
