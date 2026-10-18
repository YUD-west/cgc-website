import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Github, Linkedin, Send } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

interface NavbarProps {
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Skills', href: '#skills' },
    { label: 'Achievements', href: '#achievements' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled
          ? 'bg-[#0A0A0A]/90 backdrop-blur-md border-b border-white/[0.08] py-3.5 shadow-2xl'
          : 'bg-transparent py-5 border-b border-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Monogram */}
          <a
            href="#home"
            onClick={(e) => handleLinkClick(e, '#home')}
            className="group flex items-center gap-2.5 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-400 rounded-md py-1 px-1.5"
            aria-label="Yesuf Dergu - Home"
          >
            <div className="w-8 h-8 rounded-md bg-[#161616] border border-white/10 flex items-center justify-center font-mono font-semibold text-sm text-white group-hover:border-lime-400/60 transition-colors">
              YD
            </div>
            <div className="flex flex-col">
              <span className="font-medium text-sm tracking-tight text-white group-hover:text-lime-400 transition-colors">
                Yesuf Dergu
              </span>
              <span className="text-[11px] font-mono text-zinc-500 hidden sm:block">
                Ethiopia
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav
            aria-label="Main Navigation"
            className="hidden md:flex items-center gap-1 bg-[#141414]/70 border border-white/[0.07] px-3 py-1.5 rounded-full"
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`text-xs font-medium px-3 py-1.5 rounded-full transition-all duration-150 ${
                    isActive
                      ? 'text-black bg-lime-400 font-semibold shadow-sm'
                      : 'text-zinc-400 hover:text-white hover:bg-white/[0.05]'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Right Action: Availability & Quick Links */}
          <div className="hidden lg:flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#141414] border border-white/[0.08] text-[11px] text-zinc-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-lime-400"></span>
              </span>
              <span>Available for projects</span>
            </div>

            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, '#contact')}
              className="text-xs font-medium px-3.5 py-1.5 rounded-md bg-white text-black hover:bg-lime-400 hover:text-black transition-colors font-mono"
            >
              Get in touch
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, '#contact')}
              className="text-xs px-2.5 py-1 rounded bg-white text-black font-medium"
            >
              Contact
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="p-2 rounded-md bg-[#161616] text-zinc-300 hover:text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-lime-400"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0F0F0F] border-b border-white/10 px-4 pt-3 pb-6 space-y-3 animate-fade-in shadow-2xl">
          <div className="flex items-center gap-2 px-2 py-1 text-xs text-zinc-400 font-mono">
            <span className="h-2 w-2 rounded-full bg-lime-400"></span>
            <span>Based in Ethiopia · Open to collaboration</span>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`text-sm font-medium px-3 py-2.5 rounded-lg border transition-colors ${
                    isActive
                      ? 'bg-lime-400/10 border-lime-400/40 text-lime-400 font-semibold'
                      : 'bg-[#141414] border-white/5 text-zinc-300 hover:text-white'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </div>

          <div className="pt-3 border-t border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <a
                href={portfolioData.socials.github}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-md bg-[#141414] text-zinc-400 hover:text-white border border-white/5"
                aria-label="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={portfolioData.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-md bg-[#141414] text-zinc-400 hover:text-white border border-white/5"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={portfolioData.socials.telegram}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-md bg-[#141414] text-zinc-400 hover:text-white border border-white/5"
                aria-label="Telegram Channel"
              >
                <Send className="w-4 h-4" />
              </a>
            </div>
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, '#contact')}
              className="text-xs font-mono font-medium px-3 py-2 rounded bg-lime-400 text-black flex items-center gap-1.5"
            >
              Start Conversation <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
