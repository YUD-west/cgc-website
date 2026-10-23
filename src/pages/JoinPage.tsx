import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { SectionHeader } from '../components/SectionHeader';
import { TRACKS } from '../data/tracks';
import { TrackId, MemberApplication } from '../types';
import { CGCLogo } from '../components/Logo/CGCLogo';
import { 
  CheckCircle2, 
  Terminal, 
  AlertCircle, 
  Copy, 
  Check, 
  ArrowRight, 
  ShieldCheck, 
  UserCheck, 
  Info,
  Lock,
  Clock3,
  ShieldAlert,
  Sparkles
} from 'lucide-react';

interface JoinPageProps {
  onNavigate: (tab: string) => void;
  onApplicationSubmit?: (app: MemberApplication) => void;
}

export const JoinPage: React.FC<JoinPageProps> = ({ onNavigate, onApplicationSubmit }) => {
  const { t } = useLanguage();
  const { user, membership, refreshUser } = useAuth();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [department, setDepartment] = useState('Information Technology');
  const [yearOfStudy, setYearOfStudy] = useState('2nd Year');
  const [primaryTrack, setPrimaryTrack] = useState<TrackId>('cybersecurity');
  const [skillLevel, setSkillLevel] = useState<'Beginner' | 'Intermediate' | 'Experienced'>('Beginner');
  const [learningGoals, setLearningGoals] = useState('');
  const [projectIdea, setProjectIdea] = useState('');
  const [whyJoin, setWhyJoin] = useState('');

  const [submitted, setSubmitted] = useState(false);
  const [applicationReceipt, setApplicationReceipt] = useState<MemberApplication | null>(null);
  const [copiedId, setCopiedId] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Status checks to strictly enforce the single-application rule
  const isAccepted = Boolean(
    membership?.isApproved || 
    user?.isApprovedMember || 
    membership?.status === 'Approved' || 
    membership?.status === 'Innovation Lead' ||
    user?.role === 'ADMIN'
  );

  const hasPendingApplication = Boolean(
    !isAccepted && (
      membership?.hasApplied || 
      membership?.status === 'Reviewing' || 
      membership?.status === 'Pending' || 
      user?.hasApplied
    )
  );

  // Auto-populate from logged-in account
  useEffect(() => {
    if (user) {
      if (user.fullName && !fullName) setFullName(user.fullName);
      if (user.email) setEmail(user.email);
      if (user.department && department === 'Information Technology') setDepartment(user.department);
      if (user.yearOfStudy && yearOfStudy === '2nd Year') setYearOfStudy(user.yearOfStudy);
      if (user.phone && !phone) setPhone(user.phone || user.telegram || '');
    }
  }, [user]);

  const departments = [
    'Information Technology',
    'Computer Science',
    'Software Engineering',
    'Information Systems',
    'Agricultural Sciences',
    'Business & Economics',
    'Natural & Computational Sciences',
    'Social Sciences & Humanities',
    'Other / Faculty'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !whyJoin.trim()) {
      setError('Please provide your name, email, and statement.');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: fullName.trim(),
          email: email.trim(),
          phone: phone.trim() || undefined,
          department,
          yearOfStudy,
          primaryTrack,
          skillLevel,
          learningGoals: learningGoals.trim(),
          projectIdea: projectIdea.trim() || undefined,
          whyJoin: whyJoin.trim()
        })
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Failed to submit application.');
        return;
      }

      const newApplication: MemberApplication = {
        id: data.id,
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim() || undefined,
        department,
        yearOfStudy,
        primaryTrack,
        skillLevel,
        learningGoals: learningGoals.trim(),
        projectIdea: projectIdea.trim() || undefined,
        whyJoin: whyJoin.trim(),
        submittedAt: new Date().toISOString(),
        status: 'Reviewing'
      };

      setApplicationReceipt(newApplication);
      setSubmitted(true);
      onApplicationSubmit?.(newApplication);
      await refreshUser();
    } catch (err: any) {
      console.error('Application submit error:', err);
      setError('Failed to reach server. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyMemberId = () => {
    if (applicationReceipt) {
      navigator.clipboard.writeText(applicationReceipt.id);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    }
  };

  return (
    <div className="space-y-16 sm:space-y-20 pb-24 pt-12 sm:pt-16 bg-black text-[#F2F2F2]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <SectionHeader
          centered
          badge={t('join.badge')}
          badgeColor="amber"
          title={t('join.title')}
          description={t('join.desc')}
        />

        {/* 
          =======================================================
          RULE ENFORCEMENT STATE 1: ALREADY ACCEPTED MEMBER
          =======================================================
        */}
        {isAccepted ? (
          <div className="mt-10 p-8 sm:p-12 rounded-3xl bg-[#080808] border border-emerald-500/40 text-center space-y-5 shadow-2xl animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
              <ShieldCheck className="w-8 h-8" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold font-mono">
              <Check className="w-3.5 h-3.5" />
              <span>Official Member Clearance Active</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              You Are Already an Accepted CGC Member!
            </h2>

            <p className="text-xs sm:text-sm text-neutral-300 max-w-xl mx-auto leading-relaxed">
              Each user account is restricted to <strong>only one application</strong>. Because your application has already been accepted by Lead Admin Yesuf Dergu, you cannot apply again using this account. You already possess full member clearance for Old Classroom ICT Building IT lab 01 and 06.
            </p>

            <div className="p-4 bg-[#050505] rounded-2xl border border-[#2A2A2A] max-w-md mx-auto text-xs text-neutral-400 space-y-1">
              <div className="flex justify-between">
                <span>Account Email:</span>
                <span className="font-mono text-white font-semibold">{user?.email}</span>
              </div>
              <div className="flex justify-between">
                <span>Membership Status:</span>
                <span className="font-mono text-emerald-400 font-bold">APPROVED & ACTIVE</span>
              </div>
              {membership?.id && (
                <div className="flex justify-between">
                  <span>Member Pass ID:</span>
                  <span className="font-mono text-[#FFC21A] font-bold">{membership.id}</span>
                </div>
              )}
            </div>

            <div className="pt-3 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => onNavigate('dashboard')}
                className="px-6 py-3 rounded-xl bg-[#FFC21A] hover:bg-[#e5ad16] text-black font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 cursor-pointer flex items-center gap-2"
              >
                <span>View My Member Pass & QR Code</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onNavigate('projects')}
                className="px-6 py-3 rounded-xl bg-[#141414] hover:bg-[#202020] text-white border border-[#2A2A2A] text-xs sm:text-sm font-semibold transition-colors active:scale-95 cursor-pointer"
              >
                Explore Active Projects
              </button>
            </div>
          </div>
        ) : hasPendingApplication ? (
          /* 
            =======================================================
            RULE ENFORCEMENT STATE 2: APPLICATION ALREADY UNDER REVIEW
            =======================================================
          */
          <div className="mt-10 p-8 sm:p-12 rounded-3xl bg-[#080808] border border-amber-500/40 text-center space-y-5 shadow-2xl animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto">
              <Clock3 className="w-8 h-8" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold font-mono">
              <span>⏳ Status: Application Under Review</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Application Already Submitted
            </h2>

            <p className="text-xs sm:text-sm text-neutral-300 max-w-xl mx-auto leading-relaxed">
              Each user account can submit only one application. Your membership registration has already been received and is currently in the review queue awaiting authorization by Lead Admin Yesuf Dergu. Duplicate applications cannot be submitted using the same account.
            </p>

            <div className="p-4 bg-[#050505] rounded-2xl border border-[#2A2A2A] max-w-md mx-auto text-xs text-neutral-400 space-y-1">
              <div className="flex justify-between">
                <span>Account Email:</span>
                <span className="font-mono text-white font-semibold">{user?.email}</span>
              </div>
              <div className="flex justify-between">
                <span>Review Status:</span>
                <span className="font-mono text-amber-400 font-bold">PENDING LEAD ADMIN APPROVAL</span>
              </div>
              {membership?.id && (
                <div className="flex justify-between">
                  <span>Tracking Code:</span>
                  <span className="font-mono text-[#FFC21A] font-bold">{membership.id}</span>
                </div>
              )}
            </div>

            <div className="pt-3 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => onNavigate('dashboard')}
                className="px-6 py-3 rounded-xl bg-[#FFC21A] hover:bg-[#e5ad16] text-black font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 cursor-pointer flex items-center gap-2"
              >
                <span>Check Status on My Member Pass</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onNavigate('events')}
                className="px-6 py-3 rounded-xl bg-[#141414] hover:bg-[#202020] text-white border border-[#2A2A2A] text-xs sm:text-sm font-semibold transition-colors active:scale-95 cursor-pointer"
              >
                View Upcoming Workshops
              </button>
            </div>
          </div>
        ) : (
          /* 
            =======================================================
            TIERS & FORM (FOR FIRST-TIME APPLICANTS)
            =======================================================
          */
          <>
            {/* The Two Participation Tiers Explained */}
            <div className="mt-8 mb-12 grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
              <div className="p-6 rounded-2xl bg-[#080808] border border-[#2A2A2A] space-y-3">
                <div className="flex items-center gap-2 text-white font-bold">
                  <span className="w-2 h-2 rounded-full bg-[#FFC21A]" />
                  <span>Open Community (Free Access)</span>
                </div>
                <p className="text-neutral-400 leading-relaxed text-xs">
                  Anyone at Ambo University Woliso Campus can attend public lab workshops, listen to technical lectures, and join the Telegram chat without filling out this form.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#141414] border border-[#FFC21A]/40 space-y-3">
                <div className="flex items-center gap-2 text-[#FFC21A] font-bold">
                  <span className="w-2 h-2 rounded-full bg-[#FFC21A] animate-pulse" />
                  <span>Official Membership (This Form)</span>
                </div>
                <p className="text-neutral-300 leading-relaxed text-xs">
                  Joining official membership assigns you to organized project cohorts, pairs you with peer mentors, grants repository write access, and generates your verified CGC member pass.
                </p>
              </div>
            </div>

            {/* 
              =======================================================
              CONDITIONAL: RECEIPT OR APPLICATION FORM
              =======================================================
            */}
            {submitted && applicationReceipt ? (
              <div className="space-y-8 animate-fade-in text-center">
                
                <div className="w-16 h-16 bg-[#FFC21A]/10 border border-[#FFC21A]/30 text-[#FFC21A] rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white">{t('join.successTitle')}</h3>
                  <p className="text-neutral-300 text-sm max-w-lg mx-auto">
                    {t('join.successDesc')}
                  </p>
                </div>

                {/* Generated Official Intake Pass Card */}
                <div className="max-w-md mx-auto p-6 sm:p-8 rounded-3xl bg-[#080808] border border-[#2A2A2A] text-left relative overflow-hidden shadow-2xl">
                  <div className="flex items-center justify-between border-b border-[#2A2A2A] pb-4">
                    <div className="flex items-center gap-2.5">
                      <CGCLogo size="sm" />
                      <div>
                        <span className="font-extrabold text-sm text-white block">Cyber Guardians Club</span>
                        <span className="text-[10px] text-[#FFC21A] font-mono">Member Intake Pass</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#FFC21A]/10 border border-[#FFC21A]/30 text-[#FFC21A]">
                      Pending Review
                    </span>
                  </div>

                  <div className="py-5 space-y-3 text-xs">
                    <div>
                      <span className="text-neutral-500 text-[10px] uppercase font-semibold">Full Name</span>
                      <div className="text-white font-bold text-base">{applicationReceipt.fullName}</div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <span className="text-neutral-500 text-[10px] uppercase font-semibold">Department</span>
                        <div className="text-neutral-200 font-medium truncate">{applicationReceipt.department}</div>
                      </div>
                      <div>
                        <span className="text-neutral-500 text-[10px] uppercase font-semibold">Year & Level</span>
                        <div className="text-neutral-200 font-medium">{applicationReceipt.yearOfStudy} • {applicationReceipt.skillLevel}</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <span className="text-neutral-500 text-[10px] uppercase font-semibold">Focus Track</span>
                        <div className="text-[#FFC21A] font-semibold capitalize">{applicationReceipt.primaryTrack.replace('-', ' ')}</div>
                      </div>
                      <div>
                        <span className="text-neutral-500 text-[10px] uppercase font-semibold">Tracking ID</span>
                        <div className="text-[#FFC21A] font-mono font-bold">{applicationReceipt.id}</div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Card Footer */}
                  <div className="mt-5 pt-3 border-t border-[#2A2A2A] flex items-center justify-between text-[10px] text-neutral-500 font-mono">
                    <span>Ambo University • Woliso Campus</span>
                    <span>1 Application Per Account</span>
                  </div>
                </div>

                {/* Actions for the student */}
                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <button
                    onClick={copyMemberId}
                    className="px-4 py-2.5 rounded-xl bg-[#141414] hover:bg-[#202020] text-white text-xs font-semibold border border-[#2A2A2A] flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    {copiedId ? <Check className="w-4 h-4 text-[#FFC21A]" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedId ? 'Copied ID!' : t('join.copyId')}</span>
                  </button>

                  <button
                    onClick={() => onNavigate('dashboard')}
                    className="px-5 py-2.5 rounded-xl bg-[#FFC21A] hover:bg-[#e5ad16] text-black text-xs font-bold shadow-md transition-colors cursor-pointer"
                  >
                    Go to My Member Pass →
                  </button>
                </div>

                {/* Single-Application Rule Notice */}
                <div className="p-3 bg-[#080808] rounded-xl border border-[#2A2A2A] text-[11px] text-neutral-400 max-w-md mx-auto">
                  <Info className="w-3.5 h-3.5 text-[#FFC21A] inline mr-1" />
                  <span>Your application has been logged with ID <strong className="text-white">{applicationReceipt.id}</strong>. In accordance with club policy, each account can only apply once.</span>
                </div>
              </div>
            ) : (
              /* 
                =======================================================
                MEMBERSHIP APPLICATION FORM
                =======================================================
              */
              <div className="bg-[#080808] border border-[#2A2A2A] rounded-3xl p-6 sm:p-10 shadow-card">
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-4 border-b border-[#2A2A2A]">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-5 h-5 text-[#FFC21A]" />
                    <span className="text-sm font-bold text-white">CGC Woliso Official Application Form</span>
                  </div>
                  <div className="inline-flex items-center gap-1 text-[11px] font-mono text-[#FFC21A] bg-[#FFC21A]/10 border border-[#FFC21A]/30 px-2.5 py-1 rounded-lg">
                    <Lock className="w-3 h-3" />
                    <span>Rule: 1 Application Per Account</span>
                  </div>
                </div>

                {error && (
                  <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2.5">
                    <ShieldAlert className="w-4 h-4 flex-shrink-0 mt-0.5 text-rose-400" />
                    <span className="leading-relaxed">{error}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Field 1: Full Name */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">
                      1. Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Bontu Desta"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#000000] border border-[#2A2A2A] text-white text-sm focus:border-[#FFC21A] focus:outline-none"
                    />
                  </div>

                  {/* Field 2 & 3: Email and Phone/Telegram */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300">
                          2. University / Account Email *
                        </label>
                        {user && (
                          <span className="text-[10px] text-[#FFC21A] font-mono flex items-center gap-1">
                            <Lock className="w-2.5 h-2.5" />
                            <span>Verified Account</span>
                          </span>
                        )}
                      </div>
                      <input
                        type="email"
                        required
                        placeholder="e.g., student@ambou.edu.et"
                        value={email}
                        readOnly={Boolean(user)}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none ${
                          user 
                            ? 'bg-[#0e0e0e] border-[#3A3A3A] text-neutral-300 cursor-not-allowed' 
                            : 'bg-[#000000] border-[#2A2A2A] text-white focus:border-[#FFC21A]'
                        }`}
                      />
                      {user && (
                        <p className="mt-1 text-[10px] text-neutral-500">
                          Locked to your verified login to enforce the single-application policy.
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">
                        3. Telegram Username / Phone (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="@username or +251 9..."
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-[#000000] border border-[#2A2A2A] text-white text-sm focus:border-[#FFC21A] focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Field 4 & 5: Department & Year of Study */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">
                        4. Department / Field of Study *
                      </label>
                      <select
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-[#000000] border border-[#2A2A2A] text-white text-sm focus:border-[#FFC21A] focus:outline-none"
                      >
                        {departments.map((d) => (
                          <option key={d} value={d}>
                            {d}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">
                        5. Year of Study *
                      </label>
                      <select
                        value={yearOfStudy}
                        onChange={(e) => setYearOfStudy(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-[#000000] border border-[#2A2A2A] text-white text-sm focus:border-[#FFC21A] focus:outline-none"
                      >
                        <option value="1st Year (Freshman)">1st Year (Freshman)</option>
                        <option value="2nd Year">2nd Year</option>
                        <option value="3rd Year">3rd Year</option>
                        <option value="4th Year / Final Year">4th Year / Final Year</option>
                        <option value="Postgraduate / Alumni">Postgraduate / Alumni</option>
                      </select>
                    </div>
                  </div>

                  {/* Field 6 & 7: Primary Track & Skill Level */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">
                        6. Primary Innovation Track *
                      </label>
                      <select
                        value={primaryTrack}
                        onChange={(e) => setPrimaryTrack(e.target.value as TrackId)}
                        className="w-full px-4 py-3 rounded-xl bg-[#000000] border border-[#2A2A2A] text-white text-sm focus:border-[#FFC21A] focus:outline-none"
                      >
                        {TRACKS.map((track) => (
                          <option key={track.id} value={track.id}>
                            {track.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">
                        7. Current Skill Level *
                      </label>
                      <select
                        value={skillLevel}
                        onChange={(e) => setSkillLevel(e.target.value as any)}
                        className="w-full px-4 py-3 rounded-xl bg-[#000000] border border-[#2A2A2A] text-white text-sm focus:border-[#FFC21A] focus:outline-none"
                      >
                        <option value="Beginner">Beginner (Eager to learn from ground up)</option>
                        <option value="Intermediate">Intermediate (Have written code or tested tools)</option>
                        <option value="Experienced">Experienced (Ready to build full systems / mentor)</option>
                      </select>
                    </div>
                  </div>

                  {/* Field 8: Skills or Current Learning Goals */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">
                      8. What specific skills or technologies do you want to learn?
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g., Ethical hacking with Wireshark, building full-stack apps with React, or learning Python for data science..."
                      value={learningGoals}
                      onChange={(e) => setLearningGoals(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#000000] border border-[#2A2A2A] text-white text-sm focus:border-[#FFC21A] focus:outline-none"
                    />
                  </div>

                  {/* Field 9: Projects or ideas they want to explore */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">
                      9. Projects or Problems You Want to Explore (Optional)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Is there a problem at Woliso Campus or in Ethiopia you care about solving?"
                      value={projectIdea}
                      onChange={(e) => setProjectIdea(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#000000] border border-[#2A2A2A] text-white text-sm focus:border-[#FFC21A] focus:outline-none"
                    />
                  </div>

                  {/* Field 10: Why they want to join CGC */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">
                      10. Why do you want to join CGC? *
                    </label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Tell us what motivates you to be part of this student-led community..."
                      value={whyJoin}
                      onChange={(e) => setWhyJoin(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#000000] border border-[#2A2A2A] text-white text-sm focus:border-[#FFC21A] focus:outline-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4 border-t border-[#2A2A2A] flex flex-col sm:flex-row items-center justify-between gap-4">
                    <span className="text-xs text-neutral-400">
                      Policy notice: Each account can submit only one application. Once accepted, you cannot apply again.
                    </span>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#FFC21A] hover:bg-[#e5ad16] disabled:opacity-50 text-black font-bold text-sm shadow-[0_0_20px_rgba(255,194,26,0.2)] transition-all cursor-pointer active:scale-95"
                    >
                      {loading ? 'Submitting Application...' : t('join.submit')}
                    </button>
                  </div>

                </form>
              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
};