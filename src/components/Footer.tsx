import React from 'react';
import { CGCLogo } from './Logo/CGCLogo';
import { 
  Github, 
  Send, 
  Mail, 
  Linkedin, 
  MapPin, 
  ExternalLink, 
  ShieldCheck, 
  Heart,
  Palette
} from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
  openBrandModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, openBrandModal }) => {
  const handleNav = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0B1120] border-t border-slate-800 text-slate-400 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-slate-800/80">
          
          {/* Col 1 & 2: CGC Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <CGCLogo variant="full" size="lg" />
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm mt-3">
              A student-led technology and innovation community at Ambo University, Woliso Campus, Ethiopia. 
              We unite students from IT, engineering, business, and natural sciences to learn, collaborate, and build things that matter.
            </p>

            <div className="flex items-center gap-2 text-xs text-slate-400 pt-1">
              <MapPin className="w-4 h-4 text-emerald-500 flex-shrink-0" />
              <span>Woliso Campus, Ambo University, Oromia, Ethiopia</span>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://t.me"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-800/80 hover:bg-blue-600 hover:text-white flex items-center justify-center text-slate-400 transition-colors"
                title="Telegram Channel (@CGC_Woliso)"
              >
                <Send className="w-4 h-4" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-800/80 hover:bg-slate-700 hover:text-white flex items-center justify-center text-slate-400 transition-colors"
                title="GitHub Repositories"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-800/80 hover:bg-blue-700 hover:text-white flex items-center justify-center text-slate-400 transition-colors"
                title="LinkedIn Organization"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <button
                onClick={() => handleNav('contact')}
                className="w-9 h-9 rounded-lg bg-slate-800/80 hover:bg-emerald-600 hover:text-white flex items-center justify-center text-slate-400 transition-colors"
                title="Email Official Contact"
              >
                <Mail className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Col 3: Navigation */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-4">
              Community Navigation
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => handleNav('home')} className="hover:text-blue-400 transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('about')} className="hover:text-blue-400 transition-colors">
                  About CGC & Values
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('explore')} className="hover:text-blue-400 transition-colors">
                  Innovation Tracks
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('projects')} className="hover:text-blue-400 transition-colors">
                  Student Projects & Code
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('events')} className="hover:text-blue-400 transition-colors">
                  Workshops & Events
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('join')} className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors">
                  Apply for Membership →
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Tracks */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-4">
              Specialization Tracks
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => handleNav('explore')} className="hover:text-blue-400 transition-colors text-left">
                  Cybersecurity & Defense
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('explore')} className="hover:text-blue-400 transition-colors text-left">
                  Algorithms & Programming
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('explore')} className="hover:text-blue-400 transition-colors text-left">
                  Artificial Intelligence & ML
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('explore')} className="hover:text-blue-400 transition-colors text-left">
                  Software & Web Engineering
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('explore')} className="hover:text-blue-400 transition-colors text-left">
                  Tech Entrepreneurship
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Visual Identity & Transparency */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-4">
              Visual Identity & Trust
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Designed with a distinctive geometric monogram and purposeful minimalism. Built to work on certificates, code repositories, campus badges, and official documents.
            </p>

            {openBrandModal && (
              <button
                onClick={openBrandModal}
                className="inline-flex items-center gap-2 px-3 py-2 text-xs font-medium bg-slate-800/90 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 transition-colors"
              >
                <Palette className="w-3.5 h-3.5 text-blue-400" />
                <span>View Identity & Palette</span>
              </button>
            )}

            <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 text-[11px] text-slate-400">
              <span className="font-semibold text-slate-300">Open Community Standard:</span>
              <p className="mt-0.5">Projects and resources are open-source. Anyone can learn; members build together.</p>
            </div>
          </div>

        </div>

        {/* Bottom copyright bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Cyber Guardians Club (CGC). Ambo University, Woliso Campus.</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-slate-400 font-medium">Tagline: Ideas into Impact.</span>
            <span>•</span>
            <span className="text-slate-500">Made with dedication by Woliso students</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
