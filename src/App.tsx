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
import { getStoredProposals } from './utils/storage';

const AppContent: React.FC = () => {
  const { user, isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState<string>('home');

  // Modals state
  const [selectedProjectForJoin, setSelectedProjectForJoin] = useState<Project | null>(null);
  const [selectedEventForRsvp, setSelectedEventForRsvp] = useState<ClubEvent | null>(null);
  const [isProposalModalOpen, setIsProposalModalOpen] = useState<boolean>(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  // Dynamic user proposals from localStorage + backend
  const [customProposals, setCustomProposals] = useState<Project[]>([]);

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
    // Post to persistent SQLite database
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

        {activeTab === 'admin' && <AdminDashboardPage />}
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
