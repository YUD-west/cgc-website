import React, { useState, useEffect } from 'react';
import { CGCLogo } from './Logo/CGCLogo';
import { 
  Menu, 
  X, 
  Search, 
  ArrowRight, 
  Sparkles, 
  ChevronRight,
  Shield,
  Layers,
  Calendar,
  Users,
  Compass
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  openCommandPalette: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  openCommandPalette,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home', icon: Sparkles },
    { id: 'about', label: 'About CGC', icon: Shield },
    { id: 'explore', label: 'Explore Tracks', icon: Compass },
    { id: 'projects', label: 'Projects & Innovation', icon: Layers },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'contact', label: 'Contact', icon: Users },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          scrolled
            ? 'bg-[#0F172A]/90 backdrop-blur-md border-b border-slate-800 shadow-lg'
            : 'bg-[#0F172A]/70 backdrop-blur-sm border-b border-slate-800/60'
        }`}
      >
        {/* Top Campus Announcement Pill */}
        <div className="bg-gradient-to-r from-blue-900/40 via-slate-900 to-emerald-950/40 border-b border-slate-800/80 px-4 py-1 text-xs text-slate-300">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-medium text-slate-300">
                Ambo University, Woliso Campus — Student-Led Technology & Innovation Hub
              </span>
            </div>
            <div className="hidden md:flex items-center gap-3 text-slate-400">
              <span className="text-[11px] font-mono">Motto: "Don't just attend events. Build things that matter."</span>
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo / Monogram */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg p-1 text-left"
            aria-label="CGC Home"
          >
            <CGCLogo variant="full" size="md" />
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative ${
                    isActive
                      ? 'text-white bg-slate-800/80 shadow-sm border border-slate-700/60'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-blue-500 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Actions: Command Search + Join CGC */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Command Palette Trigger */}
            <button
              onClick={openCommandPalette}
              className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-400 bg-slate-800/60 hover:bg-slate-800 hover:text-slate-200 border border-slate-700/60 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              title="Search CGC (Ctrl + K)"
            >
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span>Search...</span>
              <kbd className="hidden md:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono bg-slate-900 border border-slate-700 rounded text-slate-400">
                ⌘K
              </kbd>
            </button>

            {/* Primary Action Button */}
            <button
              onClick={() => handleNavClick('join')}
              className={`group inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 shadow-md ${
                activeTab === 'join'
                  ? 'bg-blue-600 text-white ring-2 ring-blue-400/50'
                  : 'bg-blue-600 hover:bg-blue-500 text-white hover:shadow-blue-600/20'
              }`}
            >
              <span>Join CGC</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Mobile Menu Button & Search */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={openCommandPalette}
              className="p-2.5 text-slate-400 hover:text-white bg-slate-800/60 rounded-lg border border-slate-700/60"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 text-slate-300 hover:text-white bg-slate-800/60 rounded-lg border border-slate-700/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[110px] z-30 bg-[#0F172A] border-b border-slate-800 p-6 shadow-2xl animate-fade-in max-h-[calc(100vh-120px)] overflow-y-auto">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`flex items-center justify-between w-full px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                      : 'text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 text-slate-400" />
                    <span>{link.label}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </button>
              );
            })}

            <div className="pt-4 mt-2 border-t border-slate-800">
              <button
                onClick={() => handleNavClick('join')}
                className="w-full flex items-center justify-center gap-2 px-4 py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold text-base shadow-lg"
              >
                <span>Join CGC (Open to All Departments)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
