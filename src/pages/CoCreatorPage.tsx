import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Plus, 
  MessageSquare, 
  Sparkles, 
  Briefcase, 
  Search, 
  CheckCircle2, 
  Copy,
  ExternalLink
} from 'lucide-react';

interface CoCreatorPost {
  id: string;
  title: string;
  faculty: string;
  proposer_name: string;
  needed_skills: string;
  description: string;
  contact_telegram?: string;
  contact_email?: string;
  created_at: string;
  status: string;
}

const INITIAL_POSTS: CoCreatorPost[] = [
  {
    id: 'post-1',
    title: 'Smart Soil Moisture & Crop Advisory Dashboard',
    faculty: 'Agriculture',
    proposer_name: 'Daba Chala (Agriculture 4th Year)',
    needed_skills: '1 Frontend Developer (React/TS), 1 IoT Sensor Integrator',
    description: 'We have collected 6 months of soil pH and moisture readings across Woliso farms. Looking for computing students to build an offline-first mobile dashboard for regional farmers.',
    contact_telegram: '@SatoshiFlash',
    contact_email: 'yesufdergu464@gmail.com',
    created_at: '2026-03-20',
    status: 'Actively Interviewing'
  },
  {
    id: 'post-2',
    title: 'Woliso Campus Peer Marketplace & Lost/Found Registry',
    faculty: 'Business & Economics',
    proposer_name: 'Selamawit T. (Management 3rd Year)',
    needed_skills: '1 Backend/DB Lead (Node.js/SQLite), 1 UI/UX Designer',
    description: 'Campus students constantly lose items or struggle to sell used textbooks and calculators. I have the business workflow ready; looking for tech partners to deploy the prototype.',
    contact_telegram: '@ame_kt',
    contact_email: 'selamawit.mgmt@ambou.edu.et',
    created_at: '2026-03-22',
    status: 'Team Forming'
  },
  {
    id: 'post-3',
    title: 'Afan Oromo / Amharic Bilingual Campus FAQ Bot',
    faculty: 'Computer Science & IT',
    proposer_name: 'Bontu D. (IT 3rd Year)',
    needed_skills: '1 NLP/Python Enthusiast, 1 Linguistics/Translator Student',
    description: 'Building a lightweight local LLM fine-tuned on Ambo University academic calendar, dorm guidelines, and faculty contacts in native languages. Native speakers and coders welcome!',
    contact_telegram: '@SatoshiFlash',
    contact_email: 'yesufdergu464@gmail.com',
    created_at: '2026-03-24',
    status: 'Open for Co-Creators'
  }
];

const FACULTY_LIST = [
  'All',
  'Agriculture',
  'Computer Science & IT',
  'Business & Economics',
  'Natural Sciences',
];

export const CoCreatorPage: React.FC = () => {
  const [posts, setPosts] = useState<CoCreatorPost[]>(INITIAL_POSTS);
  const [selectedFaculty, setSelectedFaculty] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // New post form
  const [newTitle, setNewTitle] = useState('');
  const [newFaculty, setNewFaculty] = useState('Agriculture');
  const [newProposer, setNewProposer] = useState('');
  const [newSkills, setNewSkills] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newTelegram, setNewTelegram] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/co-creators');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setPosts(data);
        }
      }
    } catch (e) {
      console.log('Using local co-creator posts fallback');
    }
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newProposer.trim() || !newSkills.trim() || !newDescription.trim()) return;

    setSubmitting(true);
    try {
      const payload = {
        title: newTitle.trim(),
        faculty: newFaculty,
        proposer_name: newProposer.trim(),
        needed_skills: newSkills.trim(),
        description: newDescription.trim(),
        contact_telegram: newTelegram.trim(),
        contact_email: newEmail.trim()
      };

      const res = await fetch('/api/co-creators', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        const created = await res.json();
        setPosts((prev) => [created, ...prev]);
      } else {
        // Fallback local
        const localPost: CoCreatorPost = {
          id: `post-${Date.now()}`,
          ...payload,
          created_at: new Date().toISOString().slice(0, 10),
          status: 'Open for Co-Creators'
        };
        setPosts((prev) => [localPost, ...prev]);
      }

      setIsModalOpen(false);
      setNewTitle('');
      setNewProposer('');
      setNewSkills('');
      setNewDescription('');
      setNewTelegram('');
      setNewEmail('');
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const copyContact = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredPosts = posts.filter((p) => {
    const matchesFaculty = selectedFaculty === 'All' || p.faculty === selectedFaculty;
    if (!matchesFaculty) return false;
    if (!searchQuery.trim()) return true;

    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.needed_skills.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.proposer_name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const getFacultyColor = (fac: string) => {
    switch (fac) {
      case 'Agriculture': return 'bg-[#FFC21A]/10 text-[#FFC21A] border-[#FFC21A]/30';
      case 'Computer Science & IT': return 'bg-[#FFC21A]/10 text-[#FFC21A] border-[#FFC21A]/30';
      case 'Business & Economics': return 'bg-white/10 text-white border-white/20';
      case 'Natural Sciences': return 'bg-[#FFC21A]/10 text-[#FFC21A] border-[#FFC21A]/30';
      default: return 'bg-neutral-800 text-neutral-300 border-neutral-700';
    }
  };

  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 animate-fade-in bg-black text-[#F2F2F2]">
      
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#080808] border border-[#2A2A2A] shadow-card flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFC21A]/10 border border-[#FFC21A]/30 text-[#FFC21A] text-xs font-semibold">
            <Users className="w-3.5 h-3.5 text-[#FFC21A]" />
            <span>Cross-Faculty Team Matchmaking</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Find a Co-Creator & Team Up
          </h1>
          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
            Have a problem in Agriculture, a business concept, or scientific data, but need a developer? Or are you a coder looking for real campus problems? Post a collaboration call and turn ideas into practical solutions together.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-3 rounded-2xl bg-[#FFC21A] hover:bg-[#e5ad16] text-black text-xs font-bold shadow-md flex items-center gap-2 transition shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Post Collaboration Call</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Faculty Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 text-xs">
          {FACULTY_LIST.map((fac) => (
            <button
              key={fac}
              onClick={() => setSelectedFaculty(fac)}
              className={`px-3 py-1.5 rounded-xl font-medium transition whitespace-nowrap text-xs ${
                selectedFaculty === fac
                  ? 'bg-[#FFC21A] text-black font-bold shadow-sm'
                  : 'bg-[#141414] hover:bg-[#202020] text-neutral-300 border border-[#2A2A2A]'
              }`}
            >
              {fac === 'All' ? '🌐 All Streams' : fac}
            </button>
          ))}
        </div>

        {/* Search Field */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects, skills, or leads..."
            className="w-full bg-[#000000] border border-[#2A2A2A] rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#FFC21A]"
          />
        </div>
      </div>

      {/* Posts Grid */}
      {loading ? (
        <div className="py-20 text-center text-neutral-400 text-xs">
          Loading active student collaboration calls...
        </div>
      ) : filteredPosts.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-[#080808] border border-[#2A2A2A] text-neutral-400 space-y-3">
          <Users className="w-10 h-10 text-neutral-600 mx-auto" />
          <h3 className="text-base font-bold text-white">No collaboration calls found in this category</h3>
          <p className="text-xs max-w-sm mx-auto">
            Be the first student to post a multidisciplinary project call and recruit teammates from other faculties!
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-2 px-4 py-2 bg-[#FFC21A] text-black font-bold rounded-xl text-xs"
          >
            Post a Project Call →
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="p-6 rounded-3xl bg-[#080808] border border-[#2A2A2A] hover:border-[#FFC21A]/40 transition-all duration-300 flex flex-col justify-between space-y-5 shadow-card"
            >
              <div>
                {/* Card Top Strip */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border ${getFacultyColor(post.faculty)}`}>
                    {post.faculty}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#FFC21A]/10 text-[#FFC21A] border border-[#FFC21A]/30">
                    {post.status || 'Open for Co-Creators'}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white leading-snug mb-2">
                  {post.title}
                </h3>

                <p className="text-xs text-neutral-300 leading-relaxed mb-4">
                  {post.description}
                </p>

                {/* Needed Skills Highlight */}
                <div className="p-3 rounded-2xl bg-[#000000] border border-[#2A2A2A] space-y-1">
                  <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider flex items-center gap-1">
                    <Briefcase className="w-3 h-3 text-[#FFC21A]" />
                    Wanted Skills & Roles
                  </span>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {post.needed_skills.split(',').map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-[#FFC21A]/10 text-[#FFC21A] border border-[#FFC21A]/30 text-[11px] font-medium"
                      >
                        {skill.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Proposer Info & Contact Action */}
              <div className="pt-4 border-t border-[#2A2A2A] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                <div>
                  <span className="text-[10px] text-neutral-500 uppercase font-semibold">Initiator</span>
                  <div className="font-semibold text-white">{post.proposer_name}</div>
                </div>

                <div className="flex items-center gap-2">
                  {post.contact_telegram && (
                    <a
                      href={`https://t.me/${post.contact_telegram.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-xl bg-[#FFC21A] hover:bg-[#e5ad16] text-black font-bold text-[11px] flex items-center gap-1.5 transition shadow-sm"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Telegram</span>
                    </a>
                  )}

                  {post.contact_email && (
                    <button
                      onClick={() => copyContact(post.contact_email!, post.id)}
                      className="px-3 py-1.5 rounded-xl bg-[#141414] hover:bg-[#202020] text-neutral-300 font-semibold text-[11px] border border-[#2A2A2A] flex items-center gap-1.5 transition"
                      title="Copy student email"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{copiedId === post.id ? 'Copied!' : 'Email'}</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Post Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#080808] border border-[#2A2A2A] rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-[#2A2A2A] pb-3">
              <div>
                <h3 className="text-lg font-bold text-white">Post Collaboration Request</h3>
                <p className="text-xs text-neutral-400">Recruit team members across Ambo University faculties.</p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-neutral-400 hover:text-white text-lg font-bold p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-4 text-xs">
              <div>
                <label className="block text-neutral-300 font-semibold mb-1">Project Concept / Title *</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Teff Disease Identification Mobile App"
                  className="w-full bg-[#000000] border border-[#2A2A2A] rounded-xl p-2.5 text-white placeholder-neutral-500 focus:outline-none focus:border-[#FFC21A]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">Your Faculty / Stream *</label>
                  <select
                    value={newFaculty}
                    onChange={(e) => setNewFaculty(e.target.value)}
                    className="w-full bg-[#000000] border border-[#2A2A2A] rounded-xl p-2.5 text-white focus:outline-none focus:border-[#FFC21A]"
                  >
                    <option value="Agriculture">Agriculture & Tech</option>
                    <option value="Computer Science & IT">Computer Science & IT</option>
                    <option value="Business & Economics">Business & Economics</option>
                    <option value="Natural Sciences">Natural Sciences</option>
                  </select>
                </div>

                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">Your Name & Dept *</label>
                  <input
                    type="text"
                    required
                    value={newProposer}
                    onChange={(e) => setNewProposer(e.target.value)}
                    placeholder="e.g. Hana Alemu (3rd Year)"
                    className="w-full bg-[#000000] border border-[#2A2A2A] rounded-xl p-2.5 text-white placeholder-neutral-500 focus:outline-none focus:border-[#FFC21A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-300 font-semibold mb-1">Roles & Skills Needed *</label>
                <input
                  type="text"
                  required
                  value={newSkills}
                  onChange={(e) => setNewSkills(e.target.value)}
                  placeholder="e.g. 1 Flutter Developer, 1 Machine Learning Researcher"
                  className="w-full bg-[#000000] border border-[#2A2A2A] rounded-xl p-2.5 text-white placeholder-neutral-500 focus:outline-none focus:border-[#FFC21A]"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-semibold mb-1">Problem Statement & Vision *</label>
                <textarea
                  rows={3}
                  required
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Explain the problem you want to solve together and how teammates will collaborate..."
                  className="w-full bg-[#000000] border border-[#2A2A2A] rounded-xl p-2.5 text-white placeholder-neutral-500 focus:outline-none focus:border-[#FFC21A]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">Telegram Handle</label>
                  <input
                    type="text"
                    value={newTelegram}
                    onChange={(e) => setNewTelegram(e.target.value)}
                    placeholder="@YourHandle"
                    className="w-full bg-[#000000] border border-[#2A2A2A] rounded-xl p-2.5 text-white placeholder-neutral-500 focus:outline-none focus:border-[#FFC21A]"
                  />
                </div>
                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">Email</label>
                  <input
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="student@ambou.edu.et"
                    className="w-full bg-[#000000] border border-[#2A2A2A] rounded-xl p-2.5 text-white placeholder-neutral-500 focus:outline-none focus:border-[#FFC21A]"
                  />
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-[#2A2A2A]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-[#141414] text-neutral-300 hover:bg-[#202020]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 rounded-xl bg-[#FFC21A] hover:bg-[#e5ad16] text-black font-bold disabled:opacity-50"
                >
                  {submitting ? 'Publishing...' : 'Publish Call'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
