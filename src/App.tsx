import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { MobileNavDock } from './components/MobileNavDock';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ExplorePage } from './pages/ExplorePage';
import { ProjectsPage } from './pages/ProjectsPage';
import { EventsPage } from './pages/EventsPage';
import { JoinPage } from './pages/JoinPage';
import { ContactPage } from './pages/ContactPage';
import { UserDashboardPage } from './pages/UserDashboardPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { VerificationPage } from './pages/VerificationPage';
import { CoCreatorPage } from './pages/CoCreatorPage';

import { JoinTeamModal } from './components/Modals/JoinTeamModal';
import { RsvpModal } from './components/Modals/RsvpModal';
import { BrandModal } from './components/Modals/BrandModal';
import { ProposalModal } from './components/Modals/ProposalModal';
import { AuthModal } from './components/AuthModal';
import { CommandPalette } from './components/CommandPalette';
import { CGCBot } from './components/CGCBot';

import { Project, ClubEvent, StudentProjectProposal } from './types';
import { getStoredProposals } from './utils/storage';

const AppContent: React.FC = () => {
  const { user, isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState<string>('home');

  // Modals state
  const [selectedProjectForJoin, setSelectedProjectForJoin] = useState<Project | null>(null);
  const [selectedEventForRsvp, setSelectedEventForRsvp] = useState<ClubEvent | null>(null);
  const [isBrandModalOpen, setIsBrandModalOpen] = useState<boolean>(false);
  const [isProposalModalOpen, setIsProposalModalOpen] = useState<boolean>(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  // Dynamic user proposals from localStorage
  const [customProposals, setCustomProposals] = useState<Project[]>([]);

  // Load any stored student proposals
  useEffect(() => {
    const stored = getStoredProposals();
    const mapped: Project[] = stored.map((p) => ({
      id: p.id,
      title: p.title,
      tagline: p.proposedSolution || 'Student-proposed campus initiative under CGC review.',
      description: p.problemStatement,
      trackId: p.trackId,
      origin: 'Student Proposed',
      status: 'Incubating',
      lead: p.proposerName,
      leadDepartment: `${p.proposerDepartment} (Student Lead)`,
      teamSize: 1,
      openRoles: p.neededRoles,
      tags: ['Student Proposal', 'Community Concept'],
      featured: false,
      impactGoal: p.problemStatement,
      createdDate: p.submittedAt.slice(0, 10),
    }));
    setCustomProposals(mapped);
  }, []);

  const handleProposalSubmitted = (newProp: StudentProjectProposal) => {
    // 1. Post to persistent SQLite database
    fetch('/api/proposals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: newProp.title,
        problemStatement: newProp.problemStatement,
        proposedSolution: newProp.proposedSolution,
        trackId: newProp.trackId,
        proposerName: newProp.proposerName,
        proposerDepartment: newProp.proposerDepartment,
        neededRoles: newProp.neededRoles.join(', ')
      })
    }).catch(err => console.warn('Could not sync proposal to backend', err));

    // 2. Add to active state
    const asProject: Project = {
      id: newProp.id,
      title: newProp.title,
      tagline: newProp.proposedSolution || 'Student-proposed campus initiative under CGC review.',
      description: newProp.problemStatement,
      trackId: newProp.trackId,
      origin: 'Student Proposed',
      status: 'Incubating',
      lead: newProp.proposerName,
      leadDepartment: `${newProp.proposerDepartment} (Student Lead)`,
      teamSize: 1,
      openRoles: newProp.neededRoles,
      tags: ['Student Proposal', 'Community Concept'],
      featured: false,
      impactGoal: newProp.problemStatement,
      createdDate: newProp.submittedAt.slice(0, 10),
    };
    setCustomProposals((prev) => [asProject, ...prev]);
  };

  const [verificationPassId, setVerificationPassId] = useState<string>('CGC-WL-2026-PRES');

  // Check URL hash for direct links (e.g. #verify/CGC-WL-2026-PRES or #team-up)
  useEffect(() => {
    const hash = window.location.hash;
    if (hash.startsWith('#verify')) {
      const parts = hash.split('/');
      if (parts[1]) setVerificationPassId(decodeURIComponent(parts[1]));
      setActiveTab('verify');
    } else if (hash === '#team-up' || hash === '#co-creators') {
      setActiveTab('projects');
    }
  }, []);

  const handleNavigate = (tab: string) => {
    if (tab.startsWith('verify')) {
      const parts = tab.split('/');
      if (parts[1]) setVerificationPassId(decodeURIComponent(parts[1]));
      setActiveTab('verify');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (tab === 'admin' && !isAdmin) {
      setIsAuthModalOpen(true);
      return;
    }
    if (tab === 'dashboard' && !user) {
      setIsAuthModalOpen(true);
      return;
    }
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-cgc-vibrant text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white relative overflow-x-hidden">
      {/* Vibrant Ambient Glow Orbs in Official CGC Colors (Electric Blue + Emerald Green) */}
      <div className="fixed -top-24 -left-24 w-96 h-96 rounded-full bg-blue-600/25 blur-[120px] pointer-events-none animate-orb-1 z-0" />
      <div className="fixed top-1/4 -right-24 w-96 h-96 rounded-full bg-emerald-500/20 blur-[130px] pointer-events-none animate-orb-2 z-0" />
      <div className="fixed top-2/3 -left-28 w-80 h-80 rounded-full bg-sky-500/15 blur-[140px] pointer-events-none z-0" />
      <div className="fixed -bottom-32 right-1/4 w-[28rem] h-[28rem] rounded-full bg-blue-600/20 blur-[150px] pointer-events-none z-0" />

      {/* Subtle fine cyber grid texture overlay */}
      <div className="fixed inset-0 bg-grid-pattern opacity-35 pointer-events-none z-0" />

      {/* Header Navigation */}
      <div className="relative z-20">
        <Navbar
          activeTab={activeTab}
          setActiveTab={handleNavigate}
          openCommandPalette={() => setIsCommandPaletteOpen(true)}
          onOpenAuth={() => setIsAuthModalOpen(true)}
        />
      </div>

      {/* Main Body */}
      <main className="flex-grow relative z-10">
        {activeTab === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onJoinTeam={(p) => setSelectedProjectForJoin(p)}
            onRsvp={(e) => setSelectedEventForRsvp(e)}
            onOpenBrandModal={() => setIsBrandModalOpen(true)}
            onProposeProject={() => setIsProposalModalOpen(true)}
          />
        )}

        {activeTab === 'about' && (
          <AboutPage
            onNavigate={handleNavigate}
            onOpenBrandModal={() => setIsBrandModalOpen(true)}
          />
        )}

        {activeTab === 'explore' && (
          <ExplorePage
            onNavigate={handleNavigate}
            onJoinTeam={(p) => setSelectedProjectForJoin(p)}
            onProposeProject={() => setIsProposalModalOpen(true)}
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

        {activeTab === 'contact' && <ContactPage />}

        {activeTab === 'dashboard' && (
          <UserDashboardPage
            onNavigate={handleNavigate}
            onProposeProject={() => setIsProposalModalOpen(true)}
          />
        )}

        {activeTab === 'verify' && (
          <VerificationPage
            initialPassId={verificationPassId}
            onNavigateHome={() => handleNavigate('home')}
          />
        )}

        {activeTab === 'admin' && <AdminDashboardPage />}
      </main>

      {/* Footer */}
      <Footer
        setActiveTab={handleNavigate}
        openBrandModal={() => setIsBrandModalOpen(true)}
      />

      {/* Floating Mobile Navigation Dock */}
      <MobileNavDock
        activeTab={activeTab}
        setActiveTab={handleNavigate}
        onOpenAuth={() => setIsAuthModalOpen(true)}
      />

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

      <BrandModal
        isOpen={isBrandModalOpen}
        onClose={() => setIsBrandModalOpen(false)}
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

      {/* AI Live Assistant Widget */}
      <CGCBot
        onNavigate={handleNavigate}
        onOpenAuth={() => setIsAuthModalOpen(true)}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
