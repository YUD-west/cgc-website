import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { CGCLogo } from './Logo/CGCLogo';
import { 
  X, 
  Lock, 
  Mail, 
  User, 
  AlertCircle, 
  ArrowRight,
  Sprout,
  Briefcase,
  Code2,
  HeartHandshake,
  Palette,
  Sparkles
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'login' | 'register';
  onSuccess?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  defaultTab = 'login',
  onSuccess
}) => {
  const { login, register } = useAuth();
  const { t } = useLanguage();
  const [tab, setTab] = useState<'login' | 'register'>(defaultTab);

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [department, setDepartment] = useState('Faculty of Agriculture');
  const [memberRole, setMemberRole] = useState('Business & Entrepreneur');
  const [experienceLevel, setExperienceLevel] = useState('Beginner');
  const [telegram, setTelegram] = useState('');

  // UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (tab === 'login') {
        const res = await login(email, password);
        if (!res.success) {
          setError(res.error || 'Failed to sign in.');
        } else {
          onSuccess?.();
          onClose();
        }
      } else {
        const res = await register({
          email,
          password,
          fullName,
          department,
          telegram,
          memberRole,
          experienceLevel
        });
        if (!res.success) {
          setError(res.error || 'Failed to create account.');
        } else {
          onSuccess?.();
          onClose();
        }
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#080808] border border-[#2A2A2A] w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden flex flex-col relative max-h-[92vh] overflow-y-auto">
        
        {/* Header */}
        <div className="p-6 border-b border-[#2A2A2A] flex items-center justify-between bg-[#000000]">
          <div className="flex items-center gap-3">
            <CGCLogo variant="compact" size="sm" />
            <div>
              <h3 className="text-base font-bold text-white">
                {tab === 'login' ? t('nav.signIn') : t('nav.join')}
              </h3>
              <p className="text-xs text-neutral-400">{t('brand.campus')}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white p-2 rounded-xl hover:bg-[#141414] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switchers */}
        <div className="flex border-b border-[#2A2A2A] bg-[#000000]">
          <button
            type="button"
            onClick={() => { setTab('login'); setError(null); }}
            className={`flex-1 py-3 text-xs font-semibold tracking-wider uppercase border-b-2 transition-all ${
              tab === 'login'
                ? 'border-[#FFC21A] text-[#FFC21A] bg-[#FFC21A]/10 font-bold'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            {t('nav.signIn')}
          </button>
          <button
            type="button"
            onClick={() => { setTab('register'); setError(null); }}
            className={`flex-1 py-3 text-xs font-semibold tracking-wider uppercase border-b-2 transition-all ${
              tab === 'register'
                ? 'border-[#FFC21A] text-[#FFC21A] bg-[#FFC21A]/10 font-bold'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            {t('nav.joinFree')}
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3.5 rounded-xl bg-red-950/70 border border-red-800 text-red-200 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {tab === 'register' && (
            <>
              {/* Note for Non-Technical Students */}
              <div className="p-3 rounded-2xl bg-[#141414] border border-[#2A2A2A] text-xs text-neutral-300">
                <span className="text-[#FFC21A] font-bold">100% Free University Club: </span>
                Whether you study Agriculture, Business, Health, or IT — beginners and non-technical innovators are equally welcomed to build projects and collaborate!
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">Full Name *</label>
                <div className="relative">
                  <User className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Hawi Bekele"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#000000] border border-[#2A2A2A] text-white text-xs focus:border-[#FFC21A] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">Your Faculty / Stream *</label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#000000] border border-[#2A2A2A] text-white text-xs focus:border-[#FFC21A] focus:outline-none"
                  >
                    <option value="Faculty of Agriculture">🌾 Faculty of Agriculture</option>
                    <option value="Business & Economics">💼 Business & Economics</option>
                    <option value="Information Technology">💻 Information Technology</option>
                    <option value="Computer Science">🖥️ Computer Science</option>
                    <option value="Health & Social Sciences">🩺 Health & Social Sciences</option>
                    <option value="Natural Sciences">🔬 Natural Sciences</option>
                    <option value="Other Department">🏛️ Other Campus Stream</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">How Do You Want to Contribute? *</label>
                  <select
                    value={memberRole}
                    onChange={(e) => setMemberRole(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#000000] border border-[#2A2A2A] text-white text-xs focus:border-[#FFC21A] focus:outline-none"
                  >
                    <option value="Business & Entrepreneur">💼 Entrepreneur & Business Lead</option>
                    <option value="Agriculture & Sciences">🌾 Agriculture & Domain Specialist</option>
                    <option value="Technical Builder">💻 Software & Technical Builder</option>
                    <option value="Health & Social Impact">🩺 Health & Community Solution</option>
                    <option value="Designer & Creative">🎨 UI/UX Designer & Media</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">Your Experience Level *</label>
                  <select
                    value={experienceLevel}
                    onChange={(e) => setExperienceLevel(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#000000] border border-[#2A2A2A] text-white text-xs focus:border-[#FFC21A] focus:outline-none"
                  >
                    <option value="Beginner">🌱 Beginner (No coding needed, eager to learn)</option>
                    <option value="Intermediate">⚡ Intermediate (Some experience, ready to build)</option>
                    <option value="Advanced">🚀 Advanced (Ready to lead or mentor)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">Telegram Handle (Optional)</label>
                  <input
                    type="text"
                    placeholder="@username"
                    value={telegram}
                    onChange={(e) => setTelegram(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#000000] border border-[#2A2A2A] text-white text-xs focus:border-[#FFC21A] focus:outline-none"
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1">Email Address *</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                placeholder="student@ambou.edu.et or your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#000000] border border-[#2A2A2A] text-white text-xs focus:border-[#FFC21A] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1">Password *</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#000000] border border-[#2A2A2A] text-white text-xs focus:border-[#FFC21A] focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl font-bold text-xs shadow-lg transition-all flex items-center justify-center gap-2 bg-[#FFC21A] hover:bg-[#e5ad16] text-black"
          >
            {loading ? (
              <span className="animate-spin inline-block w-4 h-4 border-2 border-black border-t-transparent rounded-full" />
            ) : (
              <>
                <span>{tab === 'login' ? 'Sign In to Portal' : 'Create My Club Account'}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

      </div>
    </div>
  );
};
