import React, { useState } from 'react';
import { X, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';
import { TrackId, StudentProjectProposal } from '../../types';
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
  const [proposerDepartment, setProposerDepartment] = useState('Information Technology');
  const [trackId, setTrackId] = useState<TrackId>('software-web');
  const [problemStatement, setProblemStatement] = useState('');
  const [proposedSolution, setProposedSolution] = useState('');
  const [neededRoles, setNeededRoles] = useState('Frontend Developer, UI Designer');
  const [submitted, setSubmitted] = useState(false);
  const [proposalId, setProposalId] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !proposerName.trim() || !proposerEmail.trim() || !problemStatement.trim()) {
      setError('Please fill in all required fields.');
      return;
    }

    const newId = generateId('PROP');
    const proposal: StudentProjectProposal = {
      id: newId,
      title: title.trim(),
      proposerName: proposerName.trim(),
      proposerEmail: proposerEmail.trim(),
      proposerDepartment,
      trackId,
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#111A2E] border border-slate-700 w-full max-w-2xl rounded-2xl p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={handleReset}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-lg bg-slate-800/60 hover:bg-slate-800"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white">Project Proposal Submitted!</h3>
            <p className="mt-2 text-slate-300 text-sm max-w-md mx-auto">
              Your concept has been recorded in the CGC Woliso project registry with ID:
            </p>
            <div className="mt-3 inline-block font-mono bg-slate-900 border border-slate-800 text-blue-400 px-4 py-2 rounded-lg text-sm font-semibold">
              {proposalId}
            </div>
            <p className="mt-4 text-xs text-slate-400 max-w-sm mx-auto">
              Our project review committee will review your idea, assist with scoping, and help assemble student collaborators across departments.
            </p>
            <div className="mt-6">
              <button
                onClick={handleReset}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold text-sm transition-colors"
              >
                Done & Return to Projects
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                Student-Led Innovation
              </span>
            </div>
            <h3 className="text-2xl font-extrabold text-white">Propose a Project Idea</h3>
            <p className="text-slate-300 text-sm mt-1">
              Have an idea or a local problem you want to solve? Pitch it to CGC. We help you find teammates, technical mentors, and code resources.
            </p>

            {error && (
              <div className="mt-4 p-3 rounded-lg bg-red-950/60 border border-red-800/80 text-red-200 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Woliso Campus Lost & Found System"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Chala Bekele"
                    value={proposerName}
                    onChange={(e) => setProposerName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                    University / Contact Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g., student@ambou.edu.et"
                    value={proposerEmail}
                    onChange={(e) => setProposerEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                    Your Department *
                  </label>
                  <select
                    value={proposerDepartment}
                    onChange={(e) => setProposerDepartment(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm focus:border-blue-500 focus:outline-none"
                  >
                    <option value="Information Technology">Information Technology</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Information Systems">Information Systems</option>
                    <option value="Agricultural Sciences">Agricultural Sciences</option>
                    <option value="Business & Economics">Business & Economics</option>
                    <option value="Social Sciences">Social Sciences</option>
                    <option value="Other Faculty">Other Faculty</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                    Primary Track *
                  </label>
                  <select
                    value={trackId}
                    onChange={(e) => setTrackId(e.target.value as TrackId)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm focus:border-blue-500 focus:outline-none"
                  >
                    <option value="cybersecurity">Cybersecurity & Digital Defense</option>
                    <option value="programming">Programming & Algorithms</option>
                    <option value="ai-ml">AI & Machine Learning</option>
                    <option value="software-web">Software & Web Engineering</option>
                    <option value="entrepreneurship">Tech Entrepreneurship</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                  What specific problem does this solve? *
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="Describe the real issue on campus or in the local community..."
                  value={problemStatement}
                  onChange={(e) => setProblemStatement(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                  Proposed Solution & Tech Approach
                </label>
                <textarea
                  rows={2}
                  placeholder="How will your team build it? (e.g., Python CLI, mobile app, web dashboard)..."
                  value={proposedSolution}
                  onChange={(e) => setProposedSolution(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                  Roles You Need (comma separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g., Python Backend, UI Designer, Tester"
                  value={neededRoles}
                  onChange={(e) => setNeededRoles(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-4 py-2.5 text-sm font-medium text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-lg shadow-md transition-colors"
                >
                  Submit Proposal
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
