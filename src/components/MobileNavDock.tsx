import React from 'react';
import { 
  Home, 
  Compass, 
  Layers, 
  Calendar, 
  ShieldCheck, 
  UserCheck 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface MobileNavDockProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenAuth: () => void;
}

export const MobileNavDock: React.FC<MobileNavDockProps> = ({
  activeTab,
  setActiveTab,
  onOpenAuth
}) => {
  const { user } = useAuth();

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: ShieldCheck },
    { id: 'projects', label: 'Projects', icon: Layers },
    { id: 'events', label: 'Events', icon: Calendar },
  ];

  return (
    <nav 
      aria-label="Mobile Navigation Dock"
      className="sm:hidden fixed bottom-3 left-3 right-3 z-40 bg-[#000000]/95 backdrop-blur-xl border border-[#2A2A2A] rounded-2xl shadow-2xl px-2 py-2 flex items-center justify-around"
    >
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => {
              setActiveTab(item.id);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`relative flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all duration-200 active:scale-95 ${
              isActive 
                ? 'text-[#FFC21A] font-bold' 
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Icon className={`w-5 h-5 transition-transform duration-200 ${isActive ? 'scale-110 text-[#FFC21A]' : ''}`} />
            <span className="text-[10px] tracking-tight mt-0.5">{item.label}</span>
            {isActive && (
              <span className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-[#FFC21A] animate-pulse" />
            )}
          </button>
        );
      })}

      {/* Quick profile/join button on mobile */}
      <button
        onClick={() => {
          if (user) {
            setActiveTab('dashboard');
          } else {
            setActiveTab('join');
          }
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all duration-200 active:scale-95 ${
          activeTab === 'dashboard' || activeTab === 'join'
            ? 'text-[#FFC21A] font-bold'
            : 'text-neutral-400 hover:text-white'
        }`}
      >
        <UserCheck className="w-5 h-5" />
        <span className="text-[10px] tracking-tight mt-0.5">{user ? 'My Pass' : 'Join'}</span>
      </button>
    </nav>
  );
};
