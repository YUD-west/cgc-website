import React, { useState } from 'react';
import { X, CheckCircle2, Users, AlertCircle } from 'lucide-react';
import { Project } from '../../types';

interface JoinTeamModalProps {
  isOpen: boolean;
  project: Project | null;
  onClose: () => void;
}

export const JoinTeamModal: React.FC<JoinTeamModalProps> = ({
  isOpen,
  project,
  onClose,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('Information Technology');
  const [role, setRole] = useState('');
  const [note, setNote] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen || !project) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setError('Please provide your name and email.');
      return;
    }

    setSubmitted(true);
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setNote('');
    setSubmitted(false);
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fade-in text-[#F2F2F2]">
      <div className="bg-[#080808] border border-[#2A2A2A] w-full max-w-lg rounded-2xl p-6 sm:p-8 shadow-2xl relative">
        <button
          onClick={handleReset}
          className="absolute top-5 right-5 text-neutral-400 hover:text-white p-2 rounded-lg bg-[#141414] hover:bg-[#202020]"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-4">
            <div className="w-14 h-14 bg-[#FFC21A]/10 border border-[#FFC21A]/30 text-[#FFC21A] rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-white">Application Sent to Team Lead!</h3>
            <p className="mt-2 text-neutral-300 text-xs">
              Project lead <strong className="text-white">{project.lead}</strong> has been notified. 
              You will receive a Telegram / email ping regarding the next team sync.
            </p>
            <div className="mt-5">
              <button
                onClick={handleReset}
                className="w-full py-2.5 bg-[#FFC21A] hover:bg-[#e5ad16] text-black font-bold rounded-lg text-sm transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Users className="w-4 h-4 text-[#FFC21A]" />
              <span className="text-xs font-semibold text-[#FFC21A] uppercase tracking-wider">
                Team Recruitment
              </span>
            </div>
            <h3 className="text-xl font-bold text-white">Join {project.title}</h3>
            <p className="text-neutral-300 text-xs mt-1">
              Lead by {project.lead} ({project.leadDepartment})
            </p>

            {error && (
              <div className="mt-3 p-2.5 rounded-lg bg-red-950/60 border border-red-800/80 text-red-200 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-4 space-y-3">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Hiwot Mengistu"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg bg-[#000000] border border-[#2A2A2A] text-white text-sm focus:border-[#FFC21A] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1">
                  University / Contact Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g., student@ambou.edu.et"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg bg-[#000000] border border-[#2A2A2A] text-white text-sm focus:border-[#FFC21A] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1">
                    Department
                  </label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#000000] border border-[#2A2A2A] text-white text-xs focus:border-[#FFC21A] focus:outline-none"
                  >
                    <option value="Information Technology">Information Technology</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Information Systems">Information Systems</option>
                    <option value="Agricultural Sciences">Agricultural Sciences</option>
                    <option value="Business & Economics">Business & Economics</option>
                    <option value="Social Sciences">Social Sciences</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1">
                    Desired Role
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#000000] border border-[#2A2A2A] text-white text-xs focus:border-[#FFC21A] focus:outline-none"
                  >
                    {project.openRoles && project.openRoles.length > 0 ? (
                      project.openRoles.map((r, i) => (
                        <option key={i} value={r}>
                          {r}
                        </option>
                      ))
                    ) : (
                      <option value="General Contributor">General Contributor</option>
                    )}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1">
                  How would you like to contribute?
                </label>
                <textarea
                  rows={2}
                  placeholder="Share your current skills or what you are eager to learn on this team..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg bg-[#000000] border border-[#2A2A2A] text-white text-sm focus:border-[#FFC21A] focus:outline-none"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-4 py-2 text-xs font-medium text-neutral-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#FFC21A] hover:bg-[#e5ad16] text-black text-xs font-bold rounded-lg shadow-md transition-colors"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
