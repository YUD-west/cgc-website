import React, { useState } from 'react';
import { X, CheckCircle2, AlertCircle, ArrowRight, Lightbulb, Users, Sparkles } from 'lucide-react';
import { StudentProjectProposal, TrackId } from '../../types';
import { saveProposal, generateId } from '../../utils/storage';

interface ProposalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProposalSubmitted: (proposal: StudentProjectProposal) => void;
}

export const ProposalModal: React.FC<ProposalModalProps> = ({
  isOpen,
  onClose,
  onProposalSubmitted,
}) => {
  const [title, setTitle] = useState('');
  const [proposerName, setProposerName] = useState('');
  const [proposerEmail, setProposerEmail] = useState('');
  const [proposerDepartment, setProposerDepartment] = useState('Faculty of Agriculture');
  const [category, setCategory] = useState('Agriculture & Sciences');
  const [proposerRole, setProposerRole] = useState('Entrepreneur / Concept Lead');
  const [problemStatement, setProblemStatement] = useState('');
  const [proposedSolution, setProposedSolution] = useState('');
  const [neededRoles, setNeededRoles] = useState('Beginners Eager to Learn, Mobile Developer, Business Lead');
  const [targetLevel, setTargetLevel] = useState('Beginners Welcome');

  const [submitted, setSubmitted] = useState(false);
  const [proposalId, setProposalId] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !proposerName.trim() || !proposerEmail.trim() || !problemStatement.trim()) {
      setError('Please fill in the project title, your name, email, and the problem statement.');
      return;
    }

    try {
      setLoading(true);
      setError('');
      const newId = generateId('PROP');

      // Post to backend database
      await fetch('/api/proposals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          problemStatement: problemStatement.trim(),
          proposedSolution: proposedSolution.trim(),
          category,
          proposerName: proposerName.trim(),
          proposerEmail: proposerEmail.trim(),
          proposerDepartment,
          proposerRole,
          neededRoles,
          targetLevel,
          trackId: category === 'Cybersecurity' ? 'cybersecurity' : 'software-web'
        })
      });

      const proposal: StudentProjectProposal = {
        id: newId,
        title: title.trim(),
        proposerName: proposerName.trim(),
        proposerEmail: proposerEmail.trim(),
        proposerDepartment,
        trackId: 'software-web',
        problemStatement: problemStatement.trim(),
        proposedSolution: proposedSolution.trim(),
        neededRoles: neededRoles
          .split(',')
          .map((r) => r.trim())
          .filter(Boolean),
        submittedAt: new Date().toISOString(),
      };

      saveProposal(proposal);
      onProposalSubmitted(proposal);
      setProposalId(newId);
      setSubmitted(true);
    } catch (err: any) {
      console.error('Proposal submit error:', err);
      setError('Failed to submit proposal to server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setTitle('');
    setProposerName('');
    setProposerEmail('');
    setProblemStatement('');
    setProposedSolution('');
    setSubmitted(false);
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fade-in text-[#F2F2F2]">
      <div className="bg-[#080808] border border-[#2A2A2A] w-full max-w-2xl rounded-3xl p-6 sm:p-8 shadow-2xl relative max-h-[92vh] overflow-y-auto">
        <button
          onClick={handleReset}
          className="absolute top-5 right-5 text-neutral-400 hover:text-white p-2 rounded-xl bg-[#141414] hover:bg-[#202020] transition"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 bg-[#FFC21A]/10 border border-[#FFC21A]/30 text-[#FFC21A] rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white">Project Proposal Submitted!</h3>
            <p className="text-neutral-300 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
              Your concept has been recorded in the CGC Woliso project registry with tracking code:
            </p>
            <div className="inline-block font-mono bg-[#000000] border border-[#2A2A2A] text-[#FFC21A] px-4 py-2 rounded-xl text-sm font-bold">
              {proposalId}
            </div>
            <p className="text-xs text-neutral-400 max-w-md mx-auto leading-relaxed">
              Lead Admin Yesuf Dergu and the project committee will review your proposal. Once approved, your open roles will be published to the campus Co-Creator board so other students can join your team!
            </p>
            <div className="pt-4">
              <button
                onClick={handleReset}
                className="px-6 py-2.5 bg-[#FFC21A] hover:bg-[#e5ad16] text-black text-xs font-bold rounded-xl shadow-md transition"
              >
                Back to Projects
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Modal Header */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFC21A]/10 text-[#FFC21A] border border-[#FFC21A]/30 text-[11px] font-bold uppercase tracking-wider mb-2">
                <Lightbulb className="w-3.5 h-3.5" />
                <span>Open to All Campus Streams</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white">Propose a Campus Project</h3>
              <p className="text-xs text-neutral-400 mt-1">
                Whether you have a technical solution, a business idea, an agricultural challenge, or a community initiative — submit your idea here to recruit student teammates and incubate in Old Classroom ICT Building IT lab 01 and 06.
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3.5 rounded-xl bg-red-950/70 border border-red-800 text-red-200 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-neutral-300 font-semibold mb-1">Project Name / Working Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Woliso Local Market Price Tracker or Automated Crop Blight Scanner"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#000000] border border-[#2A2A2A] text-white placeholder-neutral-500 focus:border-[#FFC21A] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">Domain / Category *</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#000000] border border-[#2A2A2A] text-white focus:border-[#FFC21A] focus:outline-none"
                  >
                    <option value="Agriculture & Sciences">🌾 Agriculture & Food Security</option>
                    <option value="Business & Entrepreneurship">💼 Business & Campus Marketplace</option>
                    <option value="Software & AI">💻 Software, Web & Mobile Tools</option>
                    <option value="Health & Community">🩺 Health & Social Impact</option>
                    <option value="Cybersecurity & Systems">🔒 Cybersecurity & Network Safety</option>
                  </select>
                </div>

                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">Your Role on This Project *</label>
                  <select
                    value={proposerRole}
                    onChange={(e) => setProposerRole(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#000000] border border-[#2A2A2A] text-white focus:border-[#FFC21A] focus:outline-none"
                  >
                    <option value="Entrepreneur / Concept Lead">💼 Entrepreneur & Concept Lead</option>
                    <option value="Agricultural / Domain Specialist">🌾 Agricultural / Domain Specialist</option>
                    <option value="Technical Developer / Builder">💻 Technical Builder / Developer</option>
                    <option value="UI/UX Designer / Creative">🎨 UI/UX Designer & Content</option>
                    <option value="Researcher / Health Specialist">🩺 Researcher & Problem Expert</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-neutral-300 font-semibold mb-1">
                  What Problem on Campus or in the Community Are You Solving? *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe the challenge clearly in plain language (e.g. Local Woliso farmers lack real-time market prices, leading to unfair crop broker margins...)"
                  value={problemStatement}
                  onChange={(e) => setProblemStatement(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#000000] border border-[#2A2A2A] text-white placeholder-neutral-500 focus:border-[#FFC21A] focus:outline-none resize-none leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-semibold mb-1">
                  Proposed Solution Concept (Simple Explanation)
                </label>
                <textarea
                  rows={2}
                  placeholder="Explain how technology, data, or teamwork can solve this problem..."
                  value={proposedSolution}
                  onChange={(e) => setProposedSolution(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#000000] border border-[#2A2A2A] text-white placeholder-neutral-500 focus:border-[#FFC21A] focus:outline-none resize-none leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">Who Do You Need on Your Team?</label>
                  <input
                    type="text"
                    placeholder="e.g. Beginners, Frontend Developer, Marketing Lead"
                    value={neededRoles}
                    onChange={(e) => setNeededRoles(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#000000] border border-[#2A2A2A] text-white placeholder-neutral-500 focus:border-[#FFC21A] focus:outline-none"
                  />
                  <span className="text-[10px] text-neutral-500 mt-1 block">Comma-separated team roles</span>
                </div>

                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">Experience Level Welcomed</label>
                  <select
                    value={targetLevel}
                    onChange={(e) => setTargetLevel(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#000000] border border-[#2A2A2A] text-white focus:border-[#FFC21A] focus:outline-none"
                  >
                    <option value="Beginners Welcome">🌱 Beginners Welcome (Learn together)</option>
                    <option value="All Levels Welcome">🤝 All Levels Welcome</option>
                    <option value="Intermediate">⚡ Intermediate (Some skills helpful)</option>
                    <option value="Advanced">🚀 Advanced Builders</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 border-t border-[#2A2A2A]">
                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Bonsa Tadesse"
                    value={proposerName}
                    onChange={(e) => setProposerName(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#000000] border border-[#2A2A2A] text-white focus:border-[#FFC21A] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">Your Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="student@ambou.edu.et"
                    value={proposerEmail}
                    onChange={(e) => setProposerEmail(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#000000] border border-[#2A2A2A] text-white focus:border-[#FFC21A] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">Your Faculty / Stream *</label>
                  <select
                    value={proposerDepartment}
                    onChange={(e) => setProposerDepartment(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#000000] border border-[#2A2A2A] text-white focus:border-[#FFC21A] focus:outline-none"
                  >
                    <option value="Faculty of Agriculture">🌾 Faculty of Agriculture</option>
                    <option value="Business & Economics">💼 Business & Economics</option>
                    <option value="Information Technology">💻 Information Technology</option>
                    <option value="Computer Science">🖥️ Computer Science</option>
                    <option value="Health & Social Sciences">🩺 Health & Social Sciences</option>
                    <option value="Natural Sciences">🔬 Natural Sciences</option>
                    <option value="Other Department">🏛️ Other Stream</option>
                  </select>
                </div>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl bg-[#FFC21A] hover:bg-[#e5ad16] text-black font-bold text-xs shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    <span className="animate-spin inline-block w-4 h-4 border-2 border-black border-t-transparent rounded-full" />
                  ) : (
                    <>
                      <span>Submit Project Proposal</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
