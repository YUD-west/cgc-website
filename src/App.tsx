import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ExplorePage } from './pages/ExplorePage';
import { ProjectsPage } from './pages/ProjectsPage';
import { EventsPage } from './pages/EventsPage';
import { JoinPage } from './pages/JoinPage';
import { ContactPage } from './pages/ContactPage';
import { UserDashboardPage } from './pages/UserDashboardPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';

import { JoinTeamModal } from './components/Modals/JoinTeamModal';
import { RsvpModal } from './components/Modals/RsvpModal';
import { BrandModal } from './components/Modals/BrandModal';
import { ProposalModal } from './components/Modals/ProposalModal';
import { SubscriptionModal } from './components/Modals/SubscriptionModal';
import { AuthModal } from './components/AuthModal';
import { CommandPalette } from './components/CommandPalette';

import { Project, ClubEvent, StudentProjectProposal } from './types';
import { getStoredProposals } from './utils/storage';

const AppContent: React.FC = () => {
  const { user, token, refreshUser, isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState<string>('home');

  // Modals state
  const [selectedProjectForJoin, setSelectedProjectForJoin] = useState<Project | null>(null);
  const [selectedEventForRsvp, setSelectedEventForRsvp] = useState<ClubEvent | null>(null);
  const [isBrandModalOpen, setIsBrandModalOpen] = useState<boolean>(false);
  const [isProposalModalOpen, setIsProposalModalOpen] = useState<boolean>(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState<boolean>(false);

  // Dynamic user proposals from localStorage
  const [customProposals, setCustomProposals] = useState<Project[]>([]);

  // Check for return checkout URL (e.g. /checkout/return?tx_ref=...)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const txRef = params.get('tx_ref');
    if (txRef && token) {
      // Auto-verify payment on return
      fetch(`/api/payments/verify/${encodeURIComponent(txRef)}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(data => {
          if (data.verified) {
            refreshUser();
            setActiveTab('dashboard');
            window.history.replaceState({}, '', window.location.pathname);
            alert('🎉 Payment verified successfully! Your CGC membership is now active.');
          }
        })
        .catch(err => console.error('Auto-verify error on return', err));
    }
  }, [token]);

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
    <div className="min-h-screen bg-[#0F172A] text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Header Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleNavigate}
        openCommandPalette={() => setIsCommandPaletteOpen(true)}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onOpenSubscriptionModal={() => setIsSubscriptionModalOpen(true)}
      />

      {/* Main Body */}
      <main className="flex-grow">
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
            onOpenSubscriptionModal={() => setIsSubscriptionModalOpen(true)}
            onNavigate={handleNavigate}
          />
        )}

        {activeTab === 'admin' && <AdminDashboardPage />}
      </main>

      {/* Footer */}
      <Footer
        setActiveTab={handleNavigate}
        openBrandModal={() => setIsBrandModalOpen(true)}
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

      <SubscriptionModal
        isOpen={isSubscriptionModalOpen}
        onClose={() => setIsSubscriptionModalOpen(false)}
        onOpenAuth={() => {
          setIsSubscriptionModalOpen(false);
          setIsAuthModalOpen(true);
        }}
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
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
