import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { LanguageSelector } from './LanguageSelector';
import { Menu, X, User as UserIcon, LogOut } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenAuth: () => void;
  openCommandPalette?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenAuth,
  openCommandPalette,
}) => {
  const { user, isAdmin, logout } = useAuth();
  const { t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: t('nav.home') },
    { id: 'about', label: t('nav.about') },
    { id: 'projects', label: t('nav.projects') },
    { id: 'events', label: t('nav.events') },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-black/90 backdrop-blur-md border-b border-[#2A2A2A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Logo: Only official hammered gold insignia */}
        <button
          onClick={() => handleNavClick('home')}
          className="group flex items-center focus:outline-none cursor-pointer py-1"
          aria-label="CGC home"
        >
          <img
            src="/cgc-logo.png"
            alt="Cyber Guardians Club"
            className="h-9 sm:h-11 w-auto object-contain transition-transform group-hover:scale-105 drop-shadow-[0_2px_10px_rgba(255,194,26,0.25)]"
          />
        </button>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-7 font-medium text-sm text-[#A3A3A3]" aria-label="Primary">
          {navLinks.map((link) => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`py-1 transition-colors hover:text-[#F2F2F2] cursor-pointer ${
                  isActive ? 'text-[#FFC21A] font-semibold' : ''
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Right CTA / Language / Auth */}
        <div className="hidden sm:flex items-center gap-3">
          {/* 3-Language Dropdown */}
          <LanguageSelector />

          {user ? (
            <div className="flex items-center gap-2.5">
              {isAdmin && (
                <button
                  onClick={() => handleNavClick('admin')}
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-[#FFC21A]/40 text-[#FFC21A] bg-[#FFC21A]/10 hover:bg-[#FFC21A]/20 transition-colors cursor-pointer"
                >
                  {t('nav.admin')}
                </button>
              )}
              <button
                onClick={() => handleNavClick('dashboard')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#2A2A2A] bg-[#0A0A0A] hover:bg-[#151515] hover:border-[#FFC21A]/50 text-[#F2F2F2] text-xs font-medium transition-colors cursor-pointer"
              >
                <UserIcon className="w-3.5 h-3.5 text-[#FFC21A]" />
                <span>{t('nav.dashboard')}</span>
              </button>
              <button
                onClick={logout}
                className="p-1.5 text-[#A3A3A3] hover:text-red-400 rounded-lg hover:bg-[#151515] transition-colors cursor-pointer"
                title={t('nav.signOut')}
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2.5">
              <button
                onClick={onOpenAuth}
                className="text-xs font-medium text-[#A3A3A3] hover:text-[#F2F2F2] transition-colors cursor-pointer px-2 py-1"
              >
                {t('nav.signIn')}
              </button>
              <button
                onClick={() => handleNavClick('join')}
                className="px-3.5 py-1.5 rounded-lg bg-[#FFC21A] hover:bg-[#FFB81C] text-black text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer"
              >
                {t('nav.join')}
              </button>
            </div>
          )}
        </div>

        {/* Mobile menu trigger button */}
        <div className="flex md:hidden items-center gap-2">
          <LanguageSelector />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-[#A3A3A3] hover:text-white hover:bg-[#1A1A1A] focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#2A2A2A] bg-black p-5 space-y-4">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`w-full text-left py-2.5 px-3 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === link.id ? 'bg-[#1A1A1A] text-[#FFC21A] font-semibold' : 'text-[#A3A3A3] hover:text-white'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-[#2A2A2A] space-y-2">
            {user ? (
              <div className="space-y-2">
                <button
                  onClick={() => handleNavClick('dashboard')}
                  className="w-full py-2.5 rounded-lg bg-[#FFC21A] text-black font-bold text-xs"
                >
                  {t('nav.dashboard')}
                </button>
                {isAdmin && (
                  <button
                    onClick={() => handleNavClick('admin')}
                    className="w-full py-2.5 rounded-lg border border-[#FFC21A]/40 text-[#FFC21A] font-semibold text-xs"
                  >
                    {t('nav.admin')}
                  </button>
                )}
                <button
                  onClick={logout}
                  className="w-full py-2 text-xs text-red-400 hover:text-red-300"
                >
                  {t('nav.signOut')} ({user.email})
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => { setMobileMenuOpen(false); onOpenAuth(); }}
                  className="py-2.5 rounded-lg border border-[#2A2A2A] text-white font-medium text-xs bg-[#111]"
                >
                  {t('nav.signIn')}
                </button>
                <button
                  onClick={() => handleNavClick('join')}
                  className="py-2.5 rounded-lg bg-[#FFC21A] text-black font-bold text-xs"
                >
                  {t('nav.joinFree')}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
