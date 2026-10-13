import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Sparkles, 
  Plus, 
  Send, 
  Search, 
  ExternalLink, 
  CheckCircle2, 
  MessageSquare, 
  Filter,
  GraduationCap,
  Copy,
  Briefcase
} from 'lucide-react';

interface CoCreatorPost {
  id: string;
  title: string;
  description: string;
  faculty: string;
  needed_skills: string;
  contact_telegram?: string;
  contact_email?: string;
  proposer_name: string;
  status: string;
  created_at: string;
}

const FACULTY_LIST = [
  'All',
  'Agriculture',
  'Computer Science & IT',
  'Business & Economics',
  'Natural Sciences'
];

export const CoCreatorPage: React.FC = () => {
  const [posts, setPosts] = useState<CoCreatorPost[]>([]);
  const [selectedFaculty, setSelectedFaculty] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // New post form state
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newFaculty, setNewFaculty] = useState('Agriculture');
  const [newSkills, setNewSkills] = useState('');
  const [newProposer, setNewProposer] = useState('');
  const [newTelegram, setNewTelegram] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const url = selectedFaculty === 'All' 
        ? '/api/co-creators' 
        : `/api/co-creators?faculty=${encodeURIComponent(selectedFaculty)}`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.success && data.posts) {
        setPosts(data.posts);
      }
    } catch (err) {
      console.warn('Failed to load co-creator posts:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [selectedFaculty]);

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDescription.trim() || !newProposer.trim()) return;

    try {
      setSubmitting(true);
      const res = await fetch('/api/co-creators', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newTitle,
          description: newDescription,
          faculty: newFaculty,
          neededSkills: newSkills || 'General Collaboration',
          proposerName: newProposer,
          contactTelegram: newTelegram,
          contactEmail: newEmail
        })
      });

      if (res.ok) {
        setIsModalOpen(false);
        setNewTitle('');
        setNewDescription('');
        setNewSkills('');
        setNewProposer('');
        setNewTelegram('');
        setNewEmail('');
        fetchPosts();
      }
    } catch (err) {
      console.error('Error submitting co-creator post:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const copyContact = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const filteredPosts = posts.filter(p => {
    const matchesSearch = 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.needed_skills.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.proposer_name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const getFacultyColor = (fac: string) => {
    switch (fac) {
      case 'Agriculture': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'Computer Science & IT': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'Business & Economics': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'Natural Sciences': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      default: return 'bg-slate-500/10 text-slate-300 border-slate-500/20';
    }
  };

  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 animate-fade-in">
      
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#111A2E] via-[#0F172A] to-[#141e33] border border-slate-800 shadow-card flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
            <Users className="w-3.5 h-3.5 text-blue-400" />
            <span>Cross-Faculty Team Matchmaking</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Find a Co-Creator & Team Up
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Have a problem in Agriculture, a business concept, or scientific data, but need a developer? Or are you a coder looking for real campus problems? Post a collaboration call and turn ideas into practical solutions together.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-glow-blue flex items-center gap-2 transition shrink-0"
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
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800'
              }`}
            >
              {fac === 'All' ? '🌐 All Streams' : fac}
            </button>
          ))}
        </div>

        {/* Search Field */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects, skills, or leads..."
            className="w-full bg-[#111A2E] border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Posts Grid */}
      {loading ? (
        <div className="py-20 text-center text-slate-400 text-xs">
          Loading active student collaboration calls...
        </div>
      ) : filteredPosts.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-[#111A2E]/60 border border-slate-800 text-slate-400 space-y-3">
          <Users className="w-10 h-10 text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-white">No collaboration calls found in this category</h3>
          <p className="text-xs max-w-sm mx-auto">
            Be the first student to post a multidisciplinary project call and recruit teammates from other faculties!
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold"
          >
            Post a Project Call →
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="p-6 rounded-3xl bg-[#111A2E] border border-slate-800 hover:border-blue-500/40 transition-all duration-300 flex flex-col justify-between space-y-5 shadow-card"
            >
              <div>
                {/* Card Top Strip */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border ${getFacultyColor(post.faculty)}`}>
                    {post.faculty}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {post.status || 'Open for Co-Creators'}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white leading-snug mb-2">
                  {post.title}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {post.description}
                </p>

                {/* Needed Skills Highlight */}
                <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800/80 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1">
                    <Briefcase className="w-3 h-3 text-blue-400" />
                    Wanted Skills & Roles
                  </span>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {post.needed_skills.split(',').map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-300 border border-blue-500/20 text-[11px] font-medium"
                      >
                        {skill.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Proposer Info & Contact Action */}
              <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-semibold">Initiator</span>
                  <div className="font-semibold text-white">{post.proposer_name}</div>
                </div>

                <div className="flex items-center gap-2">
                  {post.contact_telegram && (
                    <a
                      href={`https://t.me/${post.contact_telegram.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-[11px] flex items-center gap-1.5 transition shadow-sm"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Telegram</span>
                    </a>
                  )}

                  {post.contact_email && (
                    <button
                      onClick={() => copyContact(post.contact_email!, post.id)}
                      className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-[11px] border border-slate-700 flex items-center gap-1.5 transition"
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
          <div className="bg-[#111A2E] border border-slate-700 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-lg font-bold text-white">Post Collaboration Request</h3>
                <p className="text-xs text-slate-400">Recruit team members across Ambo University faculties.</p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white text-lg font-bold p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Project Concept / Title *</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Teff Disease Identification Mobile App"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Your Faculty / Stream *</label>
                  <select
                    value={newFaculty}
                    onChange={(e) => setNewFaculty(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="Agriculture">Agriculture & Tech</option>
                    <option value="Computer Science & IT">Computer Science & IT</option>
                    <option value="Business & Economics">Business & Economics</option>
                    <option value="Natural Sciences">Natural Sciences</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Your Name & Dept *</label>
                  <input
                    type="text"
                    required
                    value={newProposer}
                    onChange={(e) => setNewProposer(e.target.value)}
                    placeholder="e.g. Hana Alemu (3rd Year)"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Roles & Skills Needed *</label>
                <input
                  type="text"
                  required
                  value={newSkills}
                  onChange={(e) => setNewSkills(e.target.value)}
                  placeholder="e.g. 1 Flutter Developer, 1 Machine Learning Researcher"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Problem Statement & Vision *</label>
                <textarea
                  rows={3}
                  required
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Explain the problem you want to solve together and how teammates will collaborate..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Telegram Handle</label>
                  <input
                    type="text"
                    value={newTelegram}
                    onChange={(e) => setNewTelegram(e.target.value)}
                    placeholder="@YourHandle"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Email</label>
                  <input
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="student@ambou.edu.et"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold disabled:opacity-50"
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
