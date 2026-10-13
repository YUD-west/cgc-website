import React, { useState } from 'react';
import { SectionHeader } from '../components/SectionHeader';
import { CGCLogo } from '../components/Logo/CGCLogo';
import { TrackId, MemberApplication } from '../types';
import { TRACKS } from '../data/tracks';
import { saveApplication, generateId } from '../utils/storage';
import { 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  AlertCircle, 
  Users, 
  BookOpen, 
  Terminal, 
  Send,
  Ticket,
  Copy,
  Check,
  Download,
  Info
} from 'lucide-react';

interface JoinPageProps {
  onNavigate: (tab: string) => void;
}

export const JoinPage: React.FC<JoinPageProps> = ({ onNavigate }) => {
  // Form State
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

  // UI state
  const [submitted, setSubmitted] = useState(false);
  const [applicationReceipt, setApplicationReceipt] = useState<MemberApplication | null>(null);
  const [error, setError] = useState('');
  const [copiedId, setCopiedId] = useState(false);

  const departments = [
    'Information Technology (IT)',
    'Computer Science (CS)',
    'Information Systems (IS)',
    'Electrical & Computer Engineering',
    'Agricultural Sciences & Plant Science',
    'Business Administration & Management',
    'Economics & Accounting',
    'Natural & Computational Sciences',
    'Social Sciences & Humanities',
    'Other University Department'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Client-side validation
    if (!fullName.trim() || !email.trim() || !whyJoin.trim()) {
      setError('Please fill in your full name, email, and why you want to join.');
      return;
    }

    if (!email.includes('@')) {
      setError('Please provide a valid university or personal email address.');
      return;
    }

    const newId = generateId('MBR');
    const newApp: MemberApplication = {
      id: newId,
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim() || undefined,
      department,
      yearOfStudy,
      primaryTrack,
      skillLevel,
      learningGoals: learningGoals.trim() || 'General software & security skill advancement',
      projectIdea: projectIdea.trim() || undefined,
      whyJoin: whyJoin.trim(),
      status: 'Received',
      submittedAt: new Date().toISOString(),
    };

    // 1. Save to persistent server database
    fetch('/api/applications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: newApp.fullName,
        email: newApp.email,
        phone: newApp.phone,
        department: newApp.department,
        yearOfStudy: newApp.yearOfStudy,
        primaryTrack: newApp.primaryTrack,
        skillLevel: newApp.skillLevel,
        learningGoals: newApp.learningGoals,
        projectIdea: newApp.projectIdea,
        whyJoin: newApp.whyJoin
      })
    }).catch(err => console.warn('Could not sync application to server', err));

    // 2. Local pass generation & storage fallback
    saveApplication(newApp);
    setApplicationReceipt(newApp);
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const copyMemberId = () => {
    if (applicationReceipt) {
      navigator.clipboard.writeText(applicationReceipt.id);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    }
  };

  return (
    <div className="space-y-16 sm:space-y-20 pb-24 pt-12 sm:pt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <SectionHeader
          centered
          badge="Become A Cyber Guardian"
          badgeColor="blue"
          title="Join CGC at Woliso Campus"
          description="Turn curiosity into hands-on capability. Beginners are celebrated, all departments are welcome, and you do not need prior expertise to start building."
        />

        {/* The Two Participation Tiers Explained */}
        <div className="mt-8 mb-12 grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
          <div className="p-6 rounded-2xl bg-[#111A2E] border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-slate-300 font-bold">
              <span className="w-2 h-2 rounded-full bg-blue-400" />
              <span>Open Community (Free Access)</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs">
              Anyone at Ambo University Woliso Campus can attend public lab workshops, listen to technical lectures, and join the Telegram chat without filling out this form.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-blue-950/40 border border-blue-800/60 space-y-3">
            <div className="flex items-center gap-2 text-blue-200 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Official Membership (This Form)</span>
            </div>
            <p className="text-slate-300 leading-relaxed text-xs">
              Joining official membership assigns you to organized project cohorts, pairs you with peer mentors, grants repository write access, and generates your verified CGC member pass.
            </p>
          </div>
        </div>

        {/* 
          =======================================================
          SUCCESS STATE: DIGITAL MEMBER CARD
          =======================================================
        */}
        {submitted && applicationReceipt ? (
          <div className="bg-[#111A2E] border border-emerald-500/40 rounded-3xl p-8 sm:p-10 shadow-glow-green text-center animate-fade-in space-y-6">
            <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Welcome to Cyber Guardians Club!
              </h3>
              <p className="mt-2 text-sm text-slate-300 max-w-lg mx-auto">
                Your application has been registered locally in the Woliso Campus student registry. Here is your official CGC Digital Member Pass:
              </p>
            </div>

            {/* Digital Membership Pass Card */}
            <div className="max-w-md mx-auto p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#0F172A] to-[#162238] border border-slate-700 text-left shadow-2xl relative overflow-hidden">
              {/* Card top banner */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
                <CGCLogo variant="full" size="sm" showTagline={false} />
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  VERIFIED MEMBER
                </span>
              </div>

              {/* Card Details */}
              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-slate-500 text-[10px] uppercase font-semibold">Member Name</span>
                  <div className="text-base font-bold text-white">{applicationReceipt.fullName}</div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-slate-500 text-[10px] uppercase font-semibold">Department</span>
                    <div className="text-slate-200 font-medium truncate">{applicationReceipt.department}</div>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] uppercase font-semibold">Year & Level</span>
                    <div className="text-slate-200 font-medium">{applicationReceipt.yearOfStudy} • {applicationReceipt.skillLevel}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-slate-500 text-[10px] uppercase font-semibold">Focus Track</span>
                    <div className="text-blue-400 font-semibold capitalize">{applicationReceipt.primaryTrack.replace('-', ' ')}</div>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] uppercase font-semibold">Member ID</span>
                    <div className="text-emerald-400 font-mono font-bold">{applicationReceipt.id}</div>
                  </div>
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                <span>Ambo University • Woliso Campus</span>
                <span>Ideas into Impact</span>
              </div>
            </div>

            {/* Actions for the student */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={copyMemberId}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 flex items-center gap-2 transition-colors"
              >
                {copiedId ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copiedId ? 'Copied ID!' : 'Copy Member ID'}</span>
              </button>

              <button
                onClick={() => onNavigate('projects')}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md transition-colors"
              >
                Join an Active Project Team →
              </button>
            </div>

            {/* Storage Transparency Notice */}
            <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 text-[11px] text-slate-400 max-w-md mx-auto">
              <Info className="w-3.5 h-3.5 text-blue-400 inline mr-1" />
              <span>Data saved in browser localStorage registry. When arriving at Woliso ICT Lab 02, quote ID <strong className="text-slate-200">{applicationReceipt.id}</strong>.</span>
            </div>
          </div>
        ) : (
          /* 
            =======================================================
            MEMBERSHIP APPLICATION FORM
            =======================================================
          */
          <div className="bg-[#111A2E] border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-card">
            
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-800">
              <Terminal className="w-5 h-5 text-emerald-400" />
              <span className="text-sm font-bold text-white">CGC Woliso Official Application Form</span>
            </div>

            {error && (
              <div className="mb-6 p-3.5 rounded-xl bg-red-950/60 border border-red-800/80 text-red-200 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Field 1: Full Name */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  1. Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Bontu Desta"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-blue-500 focus:outline-none"
                />
              </div>

              {/* Field 2 & 3: Email and Phone/Telegram */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    2. University / Contact Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g., student@ambou.edu.et"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    3. Telegram Username / Phone (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="@username or +251 9..."
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Field 4 & 5: Department & Year of Study */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    4. Department / Field of Study *
                  </label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-blue-500 focus:outline-none"
                  >
                    {departments.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    5. Year of Study *
                  </label>
                  <select
                    value={yearOfStudy}
                    onChange={(e) => setYearOfStudy(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-blue-500 focus:outline-none"
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
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    6. Primary Innovation Track *
                  </label>
                  <select
                    value={primaryTrack}
                    onChange={(e) => setPrimaryTrack(e.target.value as TrackId)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-blue-500 focus:outline-none"
                  >
                    {TRACKS.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    7. Current Skill Level *
                  </label>
                  <select
                    value={skillLevel}
                    onChange={(e) => setSkillLevel(e.target.value as any)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-blue-500 focus:outline-none"
                  >
                    <option value="Beginner">Beginner (Eager to learn from ground up)</option>
                    <option value="Intermediate">Intermediate (Have written code or tested tools)</option>
                    <option value="Experienced">Experienced (Ready to build full systems / mentor)</option>
                  </select>
                </div>
              </div>

              {/* Field 8: Skills or Current Learning Goals */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  8. What specific skills or technologies do you want to learn?
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g., Ethical hacking with Wireshark, building full-stack apps with React, or learning Python for data science..."
                  value={learningGoals}
                  onChange={(e) => setLearningGoals(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-blue-500 focus:outline-none"
                />
              </div>

              {/* Field 9: Projects or ideas they want to explore */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  9. Projects or Problems You Want to Explore (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Is there a problem at Woliso Campus or in Ethiopia you care about solving?"
                  value={projectIdea}
                  onChange={(e) => setProjectIdea(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-blue-500 focus:outline-none"
                />
              </div>

              {/* Field 10: Why they want to join CGC */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  10. Why do you want to join CGC? *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Tell us what motivates you to be part of this student-led community..."
                  value={whyJoin}
                  onChange={(e) => setWhyJoin(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-blue-500 focus:outline-none"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs text-slate-400">
                  By applying, you commit to collaborating respectfully and upholding ethical standards.
                </span>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-glow-blue transition-all"
                >
                  Submit Official Application
                </button>
              </div>

            </form>
          </div>
        )}

      </div>
    </div>
  );
};
