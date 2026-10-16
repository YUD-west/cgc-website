import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { CGCLogo } from '../components/Logo/CGCLogo';
import { QRCodeView } from '../components/QRCodeView';
import { MemberBadgeModal } from '../components/Modals/MemberBadgeModal';
import { downloadBadgeAsPNG, BadgeData } from '../utils/exportBadge';
import { TiltCard } from '../components/Motion/TiltCard';
import { 
  CheckCircle2, 
  Terminal, 
  Layers, 
  Calendar, 
  Sparkles, 
  ShieldCheck, 
  Users, 
  Code2, 
  BookOpen, 
  Send,
  ExternalLink,
  Download,
  QrCode,
  Printer,
  Smartphone
} from 'lucide-react';

interface UserDashboardProps {
  onNavigate: (tab: string) => void;
  onProposeProject?: () => void;
}

export const UserDashboardPage: React.FC<UserDashboardProps> = ({
  onNavigate,
  onProposeProject
}) => {
  const { user, membership } = useAuth();

  if (!user) {
    return (
      <div className="py-24 max-w-xl mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Student Member Portal</h2>
        <p className="text-slate-400 text-sm mb-6">Please sign in to view your CGC Digital Member Pass.</p>
      </div>
    );
  }

  const isApproved = Boolean(user.role === 'ADMIN' || membership?.isApproved || (membership?.status === 'Approved' && membership?.id));
  const memberId = isApproved ? (membership?.id || (user.role === 'ADMIN' ? 'CGC-WL-2026-PRES' : `CGC-WL-2026-${user.id.slice(-4).toUpperCase()}`)) : null;

  const [isBadgeModalOpen, setIsBadgeModalOpen] = useState(false);
  const [isDirectDownloading, setIsDirectDownloading] = useState(false);

  const badgeData: BadgeData = {
    memberId: memberId || 'CGC-WL-2026-STU',
    fullName: user.fullName,
    email: user.email,
    department: user.department || 'Informatics & Technology',
    yearOfStudy: user.yearOfStudy || 'Undergraduate',
    track: user.primaryTrack || 'Cybersecurity & Systems',
    role: user.role === 'ADMIN' ? 'Lead Administrator & Club President' : 'Official Verified Member',
    accessLevel: user.role === 'ADMIN' ? 'Full Executive Lab 02 & Systems Clearance' : 'Full Lab 02 Workstation & Innovation Hall Clearance',
    issuedAt: '2026'
  };

  const handleDirectDownload = async () => {
    try {
      setIsDirectDownloading(true);
      await downloadBadgeAsPNG(badgeData);
    } catch (e) {
      console.error('Direct badge download failed:', e);
    } finally {
      setIsDirectDownloading(false);
    }
  };

  // Cache pass offline for instant PWA loading (only if approved)
  useEffect(() => {
    if (user && isApproved && memberId) {
      try {
        localStorage.setItem('cgc_cached_pass', JSON.stringify({
          memberId,
          fullName: user.fullName,
          department: user.department,
          yearOfStudy: user.yearOfStudy,
          primaryTrack: user.primaryTrack,
          cachedAt: new Date().toISOString()
        }));
      } catch (e) {
        // Ignored
      }
    }
  }, [user, isApproved, memberId]);

  return (
    <div className="py-12 sm:py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 animate-fade-in">
      
      {/* Top Welcome Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-[#111A2E] border border-slate-800 shadow-card">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className={`w-2.5 h-2.5 rounded-full ${isApproved ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
            <span className={`text-xs font-semibold uppercase tracking-wider ${isApproved ? 'text-emerald-400' : 'text-amber-400'}`}>
              {isApproved ? 'Official CGC Member Portal' : 'Provisional Student Account'}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Welcome, {user.fullName}
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            {user.department || 'Information Technology'} • Ambo University, Woliso Campus
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('projects')}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
          >
            Browse Projects
          </button>
          <button
            onClick={() => onNavigate('events')}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-glow-blue transition-colors"
          >
            Upcoming Workshops →
          </button>
        </div>
      </div>

      {/* Grid: Member Pass or Provisional Application Review */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Column 1: Member Card (Official QR if Approved, or Pending Notice) */}
        {isApproved && memberId ? (
          <TiltCard
            maxTilt={8}
            scale={1.02}
            className="p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-[#0D1527] to-[#141F36] border border-blue-900/60 shadow-2xl relative flex flex-col justify-between space-y-5"
          >
            <div id="cgc-member-card">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                <CGCLogo variant="full" size="sm" showTagline={false} />
                <span className="px-2.5 py-1 rounded text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  OFFICIALLY APPROVED
                </span>
              </div>

              <div className="space-y-3.5 text-xs">
                <div>
                  <span className="text-slate-500 text-[10px] uppercase font-semibold">Student Name</span>
                  <div className="text-lg font-bold text-white">{user.fullName}</div>
                </div>

                <div>
                  <span className="text-slate-500 text-[10px] uppercase font-semibold">Department & Year</span>
                  <div className="text-slate-200 font-medium">
                    {user.department || 'Informatics'} • {user.yearOfStudy || '2nd Year'}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-slate-500 text-[10px] uppercase font-semibold">Track</span>
                    <div className="text-blue-400 font-semibold capitalize">{user.primaryTrack || 'Cyber & Software'}</div>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] uppercase font-semibold">Verified Member ID</span>
                    <div className="text-emerald-400 font-mono font-bold">{memberId}</div>
                  </div>
                </div>

                <div>
                  <span className="text-slate-500 text-[10px] uppercase font-semibold">Campus & Location</span>
                  <div className="text-slate-300 font-medium">Ambo University, Woliso Campus</div>
                </div>
              </div>

              {/* Scannable Dynamic QR Code */}
              <div className="mt-4 pt-4 border-t border-slate-800/80 flex flex-col items-center justify-center bg-slate-900/60 p-3 rounded-2xl border border-slate-800">
                <QRCodeView
                  value={typeof window !== 'undefined' ? `${window.location.origin}/#verify/${memberId}` : `http://localhost:3000/#verify/${memberId}`}
                  size={110}
                  label="Scan to Verify at Lab Door"
                />
              </div>
            </div>

            {/* Pass Action Buttons */}
            <div className="space-y-2.5 pt-2.5 border-t border-slate-800/80">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleDirectDownload}
                  disabled={isDirectDownloading}
                  className="w-full py-2.5 px-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-[11px] font-semibold flex items-center justify-center gap-1.5 shadow-md shadow-emerald-500/20 transition active:scale-95 disabled:opacity-50"
                  title="Save high-res PNG image directly to your phone gallery"
                >
                  {isDirectDownloading ? (
                    <span className="animate-spin w-3 h-3 border-2 border-white border-t-transparent rounded-full" />
                  ) : (
                    <Download className="w-3.5 h-3.5" />
                  )}
                  <span>Save to Phone</span>
                </button>

                <button
                  onClick={() => setIsBadgeModalOpen(true)}
                  className="w-full py-2.5 px-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-semibold border border-slate-700 flex items-center justify-center gap-1.5 transition active:scale-95"
                  title="Preview and print official lanyard badge or PDF"
                >
                  <Printer className="w-3.5 h-3.5 text-sky-400" />
                  <span>Print Lanyard</span>
                </button>
              </div>

              <div className="flex items-center justify-between text-[10px] text-slate-400 pt-0.5">
                <button
                  onClick={() => onNavigate(`verify/${memberId}`)}
                  className="hover:text-sky-400 flex items-center gap-1 transition"
                >
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  <span>Test Door Scanner</span>
                </button>
                <span className="font-mono text-slate-500">Lab 02 Clearance</span>
              </div>
            </div>
          </TiltCard>
        ) : (
          /* Provisional / Pending Approval Card */
          <div className="p-6 sm:p-7 rounded-3xl bg-[#111A2E] border border-amber-500/30 shadow-xl relative flex flex-col justify-between space-y-5">
            <div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                <CGCLogo variant="full" size="sm" showTagline={false} />
                <span className="px-2.5 py-1 rounded text-[10px] font-mono font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  PENDING REVIEW
                </span>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <span className="text-slate-500 text-[10px] uppercase font-semibold">Account Holder</span>
                  <div className="text-lg font-bold text-white">{user.fullName}</div>
                  <div className="text-slate-400 text-[11px]">{user.email}</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-amber-950/20 border border-amber-500/20 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-amber-300 font-bold text-xs">
                    <span>⏳ Awaiting Executive Approval</span>
                  </div>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    Official CGC Digital Member Passes and scannable Computer Lab 02 QR entry codes are issued exclusively after membership approval by Lead Admin Yesuf Dergu.
                  </p>
                </div>

                <div className="space-y-1 text-slate-400 text-xs">
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <span className="text-emerald-400 font-bold">✓</span> Community Lectures: Open
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <span className="text-emerald-400 font-bold">✓</span> Find a Co-Creator: Open
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <span className="text-amber-400 font-bold">⏳</span> Lab 02 QR Pass: Pending Approval
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 space-y-2">
              <button
                onClick={() => onNavigate('join')}
                className="w-full py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition"
              >
                Submit / Update Membership Details →
              </button>
              <div className="text-center text-[10px] text-slate-500">
                Contact: yesufdergu464@gmail.com
              </div>
            </div>
          </div>
        )}

        {/* Column 2 & 3: Student Hub & Community Involvement */}
        <div className="lg:col-span-2 p-6 sm:p-8 rounded-3xl bg-[#111A2E] border border-slate-800 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
              <div className="flex items-center gap-2">
                <Terminal className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-white text-base">Your Innovation Pathway</h3>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                100% Free Open Community
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-white font-bold">
                  <Code2 className="w-4 h-4 text-blue-400" />
                  <span>Lab Sprints & Workstations</span>
                </div>
                <p className="text-slate-400 leading-relaxed text-xs">
                  Access weekend coding sprints in Computer Lab 02. Collaborate on open-source repositories and hands-on system building.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-white font-bold">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Peer Mentorship</span>
                </div>
                <p className="text-slate-400 leading-relaxed text-xs">
                  Pair with 3rd & 4th year student organizers for ethical hacking challenges, web architectures, and hackathon project defenses.
                </p>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-2xl bg-blue-950/20 border border-blue-900/40 text-xs text-slate-300 space-y-2">
              <div className="font-bold text-white flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Next Steps for Members</span>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed">
                Quote your Member ID (<strong className="text-white">{memberId}</strong>) during lab check-ins or orientation ceremonies to receive repo permissions and event badges.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs text-slate-400">
              Motto: <strong className="text-slate-200">Don't just attend events. Build things that matter.</strong>
            </span>

            <button
              onClick={() => onNavigate('projects')}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md transition-colors"
            >
              Join an Active Project Team →
            </button>
          </div>
        </div>

      </div>

      {/* Official Member Badge & Lanyard Modal */}
      {isApproved && (
        <MemberBadgeModal
          isOpen={isBadgeModalOpen}
          onClose={() => setIsBadgeModalOpen(false)}
          badgeData={badgeData}
          onNavigateToVerify={(id) => onNavigate(`verify/${id}`)}
        />
      )}

    </div>
  );
};
