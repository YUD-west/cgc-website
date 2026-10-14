import React, { useState, useEffect } from 'react';
import { CGCLogo } from './Logo/CGCLogo';
import { 
  Github, 
  Send, 
  Mail, 
  Linkedin, 
  MapPin, 
  ShieldCheck, 
  Palette,
  ExternalLink,
  UserCheck,
  Download,
  Smartphone,
  Check
} from 'lucide-react';
import { LEAD_ADMIN, CO_ADMIN, OFFICIAL_COMMUNITY } from '../data/team';

interface FooterProps {
  setActiveTab: (tab: string) => void;
  openBrandModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, openBrandModal }) => {
  const [installPrompt, setInstallPrompt] = useState<any>(null);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setInstallPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (installPrompt) {
      installPrompt.prompt();
      const result = await installPrompt.userChoice;
      if (result.outcome === 'accepted') {
        setInstalled(true);
        setInstallPrompt(null);
      }
    } else {
      // Fallback: browser instruction
      alert('To install CGC on your phone or PC: open browser settings (three dots) and tap "Install app" or "Add to Home Screen".');
    }
  };

  const handleNav = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#080D1A] border-t border-slate-800 text-slate-400 pt-12 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Sleek Bottom Download App Banner */}
        <div className="mb-12 p-6 sm:p-8 rounded-2xl bg-[#0F172A] border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-1.5 text-center md:text-left">
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center justify-center md:justify-start gap-2">
              <Smartphone className="w-5 h-5 text-blue-400" />
              <span>Install CGC App on Your Device</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl leading-relaxed">
              Fast, offline-ready progressive web app. Access your official member pass, campus event tickets, and team co-creator board directly from your home screen.
            </p>
          </div>

          <button
            onClick={handleInstallClick}
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm transition-all shadow-md flex items-center gap-2 shrink-0 active:scale-95"
          >
            {installed ? (
              <>
                <Check className="w-4 h-4 text-emerald-300" />
                <span>Installed on Device</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Download / Install App</span>
              </>
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-slate-800/80">
          
          {/* Col 1 & 2: CGC Brand & Official Admin info */}
          <div className="lg:col-span-2 space-y-4">
            <CGCLogo variant="full" size="lg" />
            <p className="text-slate-300 text-sm leading-relaxed max-w-sm mt-3">
              A student-led technology and innovation community at Ambo University, Woliso Campus, Ethiopia. 
              We unite students from IT, engineering, business, and natural sciences to learn, collaborate, and build things that matter.
            </p>

            <div className="flex items-center gap-2 text-xs text-slate-300 pt-1">
              <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Woliso Campus, Ambo University, Oromia, Ethiopia</span>
            </div>

            {/* Admin Lead Badge */}
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-white flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5 text-blue-400" />
                  Lead Admin: {LEAD_ADMIN.name}
                </span>
                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  President
                </span>
              </div>
              <div className="text-[11px] text-slate-400">
                Direct Telegram: <a href={LEAD_ADMIN.telegramUrl} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">{LEAD_ADMIN.telegram}</a> or <a href={CO_ADMIN.url} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">{CO_ADMIN.handle}</a>
              </div>
            </div>

            {/* Official Social Links */}
            <div className="pt-2 flex items-center gap-3">
              <a
                href={OFFICIAL_COMMUNITY.telegramGroup}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-2 rounded-lg bg-blue-600/10 hover:bg-blue-600 text-blue-400 hover:text-white flex items-center gap-1.5 text-xs font-semibold border border-blue-500/30 transition-all shadow-sm"
                title="Join IT Joint Community Telegram"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Telegram Community</span>
              </a>

              <a
                href={LEAD_ADMIN.github}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-slate-700 hover:text-white flex items-center justify-center text-slate-300 transition-colors"
                title="GitHub (YUD-west)"
              >
                <Github className="w-4 h-4" />
              </a>

              <a
                href={LEAD_ADMIN.linkedin}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-blue-600 hover:text-white flex items-center justify-center text-slate-300 transition-colors"
                title="LinkedIn (Yusuf Dergu)"
              >
                <Linkedin className="w-4 h-4" />
              </a>

              <a
                href={`mailto:${LEAD_ADMIN.email}`}
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-emerald-600 hover:text-white flex items-center justify-center text-slate-300 transition-colors"
                title={`Email: ${LEAD_ADMIN.email}`}
              >
                <Mail className="w-4 h-4" />
              </a>
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
                  About CGC & Leadership
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
                  Workshops & Hackathons
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('handbook')} className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 text-left">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span>Lab Handbook & Cheat Sheets</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('verify')} className="hover:text-emerald-400 transition-colors flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Verify Member Pass</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('join')} className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors">
                  Apply for Membership →
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Innovation Tracks */}
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

          {/* Col 5: Contact Direct Line & Identity */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-4">
              Official Contact Point
            </h3>
            <div className="text-xs space-y-2 text-slate-300">
              <div>
                <span className="text-slate-500 block text-[11px]">Primary Email</span>
                <a href={`mailto:${LEAD_ADMIN.email}`} className="font-mono text-slate-200 hover:text-blue-400 transition-colors">
                  {LEAD_ADMIN.email}
                </a>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Telegram Community</span>
                <a href={OFFICIAL_COMMUNITY.telegramGroup} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">
                  t.me/IT_Jointcommunity
                </a>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Admins to Message</span>
                <div className="flex gap-2 font-mono text-[11px] mt-0.5">
                  <a href={LEAD_ADMIN.telegramUrl} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">
                    {LEAD_ADMIN.telegram}
                  </a>
                  <span className="text-slate-600">|</span>
                  <a href={CO_ADMIN.url} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">
                    {CO_ADMIN.handle}
                  </a>
                </div>
              </div>
            </div>

            {openBrandModal && (
              <button
                onClick={openBrandModal}
                className="inline-flex items-center gap-2 px-3 py-2 text-xs font-medium bg-slate-800/90 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 transition-colors"
              >
                <Palette className="w-3.5 h-3.5 text-blue-400" />
                <span>View Identity & Palette</span>
              </button>
            )}
          </div>

        </div>

        {/* Bottom copyright bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Cyber Guardians Club (CGC). Ambo University, Woliso Campus.</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-slate-300 font-medium">Tagline: Ideas into Impact.</span>
            <span>•</span>
            <span className="text-slate-400">Led by {LEAD_ADMIN.name} & Woliso Student Innovators</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
