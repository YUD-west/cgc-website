import React from 'react';
import { Trophy, Award, Calendar, CheckCircle2, Terminal } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const Achievements: React.FC = () => {
  const { achievements } = portfolioData;

  return (
    <section
      id="achievements"
      aria-label="Achievements"
      className="py-24 px-4 sm:px-6 lg:px-8 border-b border-white/[0.06] scroll-mt-12"
    >
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 font-mono text-xs text-lime-400 uppercase tracking-widest">
            <span>05</span>
            <span className="text-zinc-600">/</span>
            <span>Honors & Milestones</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Hackathons & Achievements
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 max-w-xl">
            Demonstrated engineering execution, rapid prototyping, and collaborative delivery under rigorous competition.
          </p>
        </div>

        {/* Achievement Highlight Cards */}
        <div className="space-y-6">
          {achievements.map((item) => (
            <div
              key={item.id}
              className="relative overflow-hidden p-6 sm:p-8 rounded-xl bg-[#111111] border border-white/10 hover:border-lime-400/40 transition-all space-y-6"
            >
              {/* Subtle top indicator bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
                <div className="flex items-start sm:items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-lime-400/10 text-lime-400 border border-lime-400/20 shrink-0">
                    <Trophy className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-lime-400 text-black font-semibold">
                        {item.award}
                      </span>
                      <span className="text-xs font-mono text-zinc-400">
                        {item.event}
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1">
                      {item.title}
                    </h3>
                  </div>
                </div>

                <div className="text-xs font-mono text-zinc-400 bg-[#161616] px-3 py-1.5 rounded border border-white/5 self-start sm:self-auto">
                  {item.date}
                </div>
              </div>

              {/* Narrative description */}
              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed font-sans">
                {item.description}
              </p>

              {/* Takeaways & highlights */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                  Key Execution Takeaways
                </h4>
                <ul className="space-y-2">
                  {item.takeaways.map((takeaway, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-lime-400 shrink-0 mt-0.5" />
                      <span>{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Verification & Editable Note */}
              {item.verificationNote && (
                <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs font-mono text-zinc-500">
                  <span className="flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-lime-400" />
                    {item.verificationNote}
                  </span>
                  <span className="text-[11px] text-zinc-600 hidden sm:inline">
                    Editable in portfolioData.ts
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
