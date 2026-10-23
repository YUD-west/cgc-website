import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { EventsPage } from './pages/EventsPage';
import { JoinPage } from './pages/JoinPage';
import { UserDashboardPage } from './pages/UserDashboardPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';

import { JoinTeamModal } from './components/Modals/JoinTeamModal';
import { RsvpModal } from './components/Modals/RsvpModal';
import { ProposalModal } from './components/Modals/ProposalModal';
import { AuthModal } from './components/AuthModal';
import { CommandPalette } from './components/CommandPalette';

import { Project, ClubEvent, StudentProjectProposal } from './types';

const AppContent: React.FC = () => {
  const { user, isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState<string>('home');

  // Modals state
  const [selectedProjectForJoin, setSelectedProjectForJoin] = useState<Project | null>(null);
  const [selectedEventForRsvp, setSelectedEventForRsvp] = useState<ClubEvent | null>(null);
  const [isProposalModalOpen, setIsProposalModalOpen] = useState<boolean>(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  // Dynamic user proposals from backend (only officially approved projects)
  const [customProposals, setCustomProposals] = useState<Project[]>([]);

  useEffect(() => {
    fetch('/api/projects')
      .then((res) => res.json())
      .then((data) => {
        if (data.projects) {
          const approved: Project[] = data.projects
            .filter((p: any) => p.id !== 'PRJ-CGC-01' && p.status === 'Active')
            .map((p: any) => ({
              id: p.id,
              title: p.title,
              tagline: p.impact_goal || p.description,
              description: p.description,
              trackId: p.category?.toLowerCase().includes('cyber') ? 'cybersecurity' : 'software-web',
              origin: 'Student Proposed',
              status: 'Approved',
              lead: p.proposer_name,
              leadDepartment: `${p.proposer_faculty} (Student Lead)`,
              teamSize: 1,
              openRoles: (p.needed_roles || '').split(',').map((r: string) => r.trim()).filter(Boolean),
              tags: ['Approved Innovation', p.category || 'Software'],
              featured: false,
              impactGoal: p.impact_goal || p.description,
              createdDate: (p.created_at || '').slice(0, 10),
            }));
          setCustomProposals(approved);
        }
      })
      .catch((err) => console.warn('Could not load approved projects', err));
  }, []);

  const handleProposalSubmitted = (_newProp: StudentProjectProposal) => {
    // Newly submitted proposals remain in the Pending queue until approved by Lead Admin Yesuf Dergu
  };

  const handleNavigate = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-black text-[#F2F2F2] flex flex-col font-sans selection:bg-[#FFC21A] selection:text-black">
      {/* Slim Header Navbar matching Downloads/index.html */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleNavigate}
        openCommandPalette={() => setIsCommandPaletteOpen(true)}
        onOpenAuth={() => setIsAuthModalOpen(true)}
      />

      {/* Main Body */}
      <main className="flex-grow">
        {activeTab === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onJoinTeam={(p) => setSelectedProjectForJoin(p)}
            onRsvp={(e) => setSelectedEventForRsvp(e)}
            onProposeProject={() => setIsProposalModalOpen(true)}
          />
        )}

        {activeTab === 'about' && (
          <AboutPage
            onNavigate={handleNavigate}
            onOpenBrandModal={() => {}}
          />
        )}

        {activeTab === 'projects' && (
          <ProjectsPage
            onJoinTeam={(p) => setSelectedProjectForJoin(p)}
            onProposeProject={() => setIsProposalModalOpen(true)}
            customProposals={customProposals}
          />
        )}

        {activeTab === 'events' && (
          <EventsPage
            onRsvp={(e) => setSelectedEventForRsvp(e)}
            onNavigate={handleNavigate}
          />
        )}

        {activeTab === 'join' && <JoinPage onNavigate={handleNavigate} />}

        {activeTab === 'dashboard' && (
          <UserDashboardPage
            onNavigate={handleNavigate}
            onProposeProject={() => setIsProposalModalOpen(true)}
          />
        )}

        {activeTab === 'admin' && (
          isAdmin ? (
            <AdminDashboardPage />
          ) : (
            <div className="py-24 max-w-md mx-auto px-4 text-center space-y-4">
              <div className="w-14 h-14 bg-red-500/10 text-red-400 rounded-2xl flex items-center justify-center mx-auto border border-red-500/30">
                <span className="text-xl font-bold">🔒</span>
              </div>
              <h2 className="text-xl font-bold text-white">403 — Restricted Lead Admin Clearance</h2>
              <p className="text-xs text-neutral-400 leading-relaxed">
                The CGC Presidential Control Center is restricted exclusively to the verified Lead Administrator. Please authenticate with your authorized admin credentials.
              </p>
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="mt-3 px-5 py-2.5 rounded-xl bg-[#FFC21A] hover:bg-[#FFB81C] text-black font-bold text-xs transition-all shadow-md cursor-pointer"
              >
                Authenticate as Admin
              </button>
            </div>
          )
        )}
      </main>

      {/* Slim Dark Footer */}
      <Footer />

      {/* Modals & Dialogs */}
      <JoinTeamModal
        isOpen={Boolean(selectedProjectForJoin)}
        project={selectedProjectForJoin}
        onClose={() => setSelectedProjectForJoin(null)}
      />

      <RsvpModal
        isOpen={Boolean(selectedEventForRsvp)}
        event={selectedEventForRsvp}
        onClose={() => setSelectedEventForRsvp(null)}
      />

      <ProposalModal
        isOpen={isProposalModalOpen}
        onClose={() => setIsProposalModalOpen(false)}
        onProposalSubmitted={handleProposalSubmitted}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={() => {
          if (activeTab === 'home') {
            setActiveTab('dashboard');
          }
        }}
      />

      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onNavigate={handleNavigate}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </LanguageProvider>
  );
};

export default App;
