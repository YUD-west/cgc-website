import React, { useState, useEffect } from 'react';
import { CGCLogo } from './Logo/CGCLogo';
import { useAuth } from '../context/AuthContext';
import { 
  Menu, 
  X, 
  Search, 
  ArrowRight, 
  Sparkles, 
  Shield,
  Layers, 
  Calendar, 
  Users, 
  Compass,
  User as UserIcon,
  LogOut,
  ShieldCheck,
  Download
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  openCommandPalette: () => void;
  onOpenAuth: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  openCommandPalette,
  onOpenAuth,
}) => {
  const { user, isAdmin, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // PWA Install Prompt State
  const [installPrompt, setInstallPrompt] = useState<any>(null);
  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setInstallPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (!installPrompt) return;
    installPrompt.prompt();
    const result = await installPrompt.userChoice;
    if (result.outcome === 'accepted') {
      setInstallPrompt(null);
    }
  };

  const navLinks = [
    { id: 'home', label: 'Home', icon: Sparkles },
    { id: 'explore', label: 'Tracks', icon: Compass },
    { id: 'projects', label: 'Projects & Teams', icon: Layers },
    { id: 'events', label: 'Events & Labs', icon: Calendar },
    { id: 'about', label: 'About CGC', icon: Shield },
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
            ? 'bg-[#0F172A]/95 backdrop-blur-md border-b border-slate-800 shadow-lg'
            : 'bg-[#0F172A]/80 backdrop-blur-sm border-b border-slate-800/60'
        }`}
      >
        {/* Top Campus Announcement Pill */}
        <div className="bg-gradient-to-r from-blue-950/60 via-slate-900 to-emerald-950/60 border-b border-slate-800/80 px-4 py-1 text-xs text-slate-300">
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
              <span className="text-[11px] font-mono text-emerald-400 font-semibold">
                Free Student Community • "Ideas into Impact"
              </span>
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
                  className={`px-3.5 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-200 relative ${
                    isActive
                      ? 'text-white bg-slate-800/90 shadow-sm border border-slate-700/60'
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

          {/* Actions: Command Search + Auth / Dashboard */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Command Palette Trigger */}
            <button
              onClick={openCommandPalette}
              className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-400 bg-slate-800/60 hover:bg-slate-800 hover:text-slate-200 border border-slate-700/60 rounded-xl transition-colors"
              title="Search CGC (Ctrl + K)"
            >
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span>Search...</span>
              <kbd className="hidden xl:inline-flex items-center px-1.5 py-0.2 text-[10px] font-mono bg-slate-900 border border-slate-700 rounded text-slate-400">
                ⌘K
              </kbd>
            </button>

            {/* PWA Install Button (if available) */}
            {installPrompt && (
              <button
                onClick={handleInstallClick}
                className="px-2.5 py-1.5 text-xs font-semibold text-blue-400 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 rounded-xl transition-all flex items-center gap-1.5"
                title="Install Cyber Guardians Club App on your device"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Install</span>
              </button>
            )}

            {/* Authenticated User Controls */}
            {user ? (
              <div className="flex items-center gap-2">
                {/* Admin Portal Shortcut if Admin */}
                {isAdmin && (
                  <button
                    onClick={() => handleNavClick('admin')}
                    className={`px-3 py-2 rounded-xl text-xs font-bold border transition-colors flex items-center gap-1.5 ${
                      activeTab === 'admin'
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                        : 'bg-slate-800/80 text-amber-400 border-amber-500/30 hover:bg-slate-800'
                    }`}
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                    <span>Admin Portal</span>
                  </button>
                )}

                {/* Member Dashboard */}
                <button
                  onClick={() => handleNavClick('dashboard')}
                  className={`px-3 py-2 rounded-xl text-xs font-bold border transition-colors flex items-center gap-1.5 ${
                    activeTab === 'dashboard'
                      ? 'bg-blue-600 text-white border-blue-500'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                  }`}
                >
                  <UserIcon className="w-3.5 h-3.5 text-blue-400" />
                  <span>My Member Pass</span>
                </button>

                {/* Logout */}
                <button
                  onClick={logout}
                  className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-xl transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={onOpenAuth}
                  className="px-3.5 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700 rounded-xl transition-colors"
                >
                  Sign In
                </button>

                <button
                  onClick={() => handleNavClick('join')}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md ${
                    activeTab === 'join'
                      ? 'bg-blue-600 text-white'
                      : 'bg-blue-600 hover:bg-blue-500 text-white'
                  }`}
                >
                  <span>Join CGC (Free)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu trigger button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-20 bg-[#0F172A]/95 border-b border-slate-800 p-6 space-y-4 z-40 backdrop-blur-xl animate-fade-in shadow-2xl">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`w-full text-left py-2.5 px-3 rounded-lg text-sm font-semibold flex items-center justify-between ${
                  activeTab === link.id ? 'bg-blue-600/20 text-blue-400' : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                <span>{link.label}</span>
              </button>
            ))}
            <button
              onClick={() => handleNavClick('verify')}
              className={`w-full text-left py-2.5 px-3 rounded-lg text-sm font-semibold flex items-center justify-between ${
                activeTab === 'verify' ? 'bg-emerald-500/20 text-emerald-400' : 'text-emerald-400 hover:bg-slate-800'
              }`}
            >
              <span>🛡️ Verify Member Pass</span>
            </button>
          </div>

          <div className="pt-4 border-t border-slate-800 space-y-2">
            {user ? (
              <div className="space-y-2">
                <button
                  onClick={() => handleNavClick('dashboard')}
                  className="w-full py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs"
                >
                  My Member Pass
                </button>
                {isAdmin && (
                  <button
                    onClick={() => handleNavClick('admin')}
                    className="w-full py-2.5 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold text-xs"
                  >
                    Admin Portal (Yesuf Dergu)
                  </button>
                )}
                <button
                  onClick={logout}
                  className="w-full py-2 text-xs text-red-400 hover:text-red-300"
                >
                  Sign Out ({user.email})
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => { setMobileMenuOpen(false); onOpenAuth(); }}
                  className="py-2.5 rounded-xl bg-slate-800 text-white font-bold text-xs border border-slate-700"
                >
                  Sign In
                </button>
                <button
                  onClick={() => handleNavClick('join')}
                  className="py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs"
                >
                  Join CGC (Free)
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
