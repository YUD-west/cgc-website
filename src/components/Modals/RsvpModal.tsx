import React, { useState } from 'react';
import { X, Ticket, Calendar, Clock, MapPin, ShieldAlert, Clock3 } from 'lucide-react';
import { ClubEvent } from '../../types';

interface RsvpModalProps {
  isOpen: boolean;
  event: ClubEvent | null;
  onClose: () => void;
}

export const RsvpModal: React.FC<RsvpModalProps> = ({
  isOpen,
  event,
  onClose,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('Information Technology');
  const [yearOfStudy, setYearOfStudy] = useState('2nd Year');
  const [confirmed, setConfirmed] = useState(false);
  const [ticketId, setTicketId] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen || !event) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setError('Please provide your name and email.');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const res = await fetch('/api/rsvps', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventId: event.id,
          name: name.trim(),
          email: email.trim(),
          department
        })
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Failed to submit workshop registration.');
        return;
      }

      setTicketId(data.ticketId);
      setConfirmed(true);
    } catch (err: any) {
      console.error('RSVP submit error:', err);
      setError('Failed to connect to server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setConfirmed(false);
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

        {confirmed ? (
          <div className="text-center py-4">
            <div className="w-14 h-14 bg-[#FFC21A]/10 border border-[#FFC21A]/30 text-[#FFC21A] rounded-full flex items-center justify-center mx-auto mb-3">
              <Clock3 className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-white">Registration Submitted!</h3>
            
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold font-mono mt-2 mb-1">
              <span>⏳ Status: Pending Lead Admin Approval</span>
            </div>

            <p className="mt-2 text-neutral-300 text-xs max-w-sm mx-auto leading-relaxed">
              Your seat request has been logged. To prevent spam and maintain lab workstation limits in Old Classroom ICT Building IT lab 01 and 06, all seats must be authorized by Lead Admin Yesuf Dergu.
            </p>

            {/* Digital Pass Preview */}
            <div className="mt-4 p-5 rounded-xl bg-[#000000] border border-dashed border-[#FFC21A]/40 text-left relative overflow-hidden">
              <div className="flex justify-between items-start border-b border-[#2A2A2A] pb-3">
                <div>
                  <span className="text-[10px] uppercase font-mono font-bold text-[#FFC21A] tracking-wider">
                    CGC Workshop Pass • Pending Review
                  </span>
                  <h4 className="font-bold text-white text-sm mt-0.5">{event.title}</h4>
                </div>
                <Ticket className="w-6 h-6 text-[#FFC21A] flex-shrink-0" />
              </div>

              <div className="mt-3 grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-neutral-500 block text-[10px]">Applicant</span>
                  <span className="font-semibold text-neutral-200">{name}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block text-[10px]">Request / Pass ID</span>
                  <span className="font-mono font-bold text-[#FFC21A]">{ticketId}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block text-[10px]">Date & Time</span>
                  <span className="text-neutral-300">{event.date} • {event.time}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block text-[10px]">Venue</span>
                  <span className="text-neutral-300">{event.venue}</span>
                </div>
              </div>
            </div>

            <p className="mt-4 text-[11px] text-neutral-400">
              Keep your Request ID handy. Once Lead Admin Yesuf Dergu reviews and approves your seat in the dashboard, your admission will be active.
            </p>

            <div className="mt-5">
              <button
                onClick={handleReset}
                className="w-full py-2.5 bg-[#FFC21A] hover:bg-[#e5ad16] text-black font-bold rounded-lg text-sm transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-[#FFC21A]" />
              <span className="text-xs font-semibold text-[#FFC21A] uppercase tracking-wider">
                Event Registration
              </span>
            </div>
            <h3 className="text-xl font-bold text-white">{event.title}</h3>

            <div className="mt-3 p-3 rounded-lg bg-[#000000] border border-[#2A2A2A] text-xs space-y-1 text-neutral-300">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-neutral-400" />
                <span>{event.date} • {event.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                <span>{event.venue}</span>
              </div>
            </div>

            {error && (
              <div className="mt-3 p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2">
                <ShieldAlert className="w-4 h-4 flex-shrink-0 mt-0.5 text-rose-400" />
                <span className="leading-relaxed">{error}</span>
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
                  placeholder="e.g., Alazar Tadesse"
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
                  placeholder="e.g., alazar@ambou.edu.et"
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
                    Year of Study
                  </label>
                  <select
                    value={yearOfStudy}
                    onChange={(e) => setYearOfStudy(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#000000] border border-[#2A2A2A] text-white text-xs focus:border-[#FFC21A] focus:outline-none"
                  >
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                  </select>
                </div>
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
                  disabled={loading}
                  className="px-5 py-2 bg-[#FFC21A] hover:bg-[#e5ad16] disabled:opacity-50 text-black text-xs font-bold rounded-lg shadow-md transition-colors"
                >
                  {loading ? 'Submitting Request...' : 'Submit RSVP for Admin Approval'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};