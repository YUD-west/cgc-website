import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  Search, 
  RefreshCw,
  GraduationCap,
  Building2,
  Calendar,
  Sparkles,
  Ticket
} from 'lucide-react';
import { TiltCard } from '../components/Motion/TiltCard';
import { MagneticButton } from '../components/Motion/MagneticButton';

interface VerificationResult {
  verified: boolean;
  isEventTicket?: boolean;
  member?: {
    id: string;
    fullName: string;
    department: string;
    yearOfStudy: string;
    primaryTrack: string;
    role: string;
    status: string;
    issuedAt: string;
    accessLevel: string;
  };
  ticket?: {
    id: string;
    title: string;
    eventType: string;
    venue: string;
    eventDate: string;
    accessLevel: string;
    createdBy: string;
    createdAt: string;
  };
  error?: string;
}

interface VerificationPageProps {
  onNavigateHome: () => void;
  initialPassId?: string;
}

export const VerificationPage: React.FC<VerificationPageProps> = ({
  onNavigateHome,
  initialPassId
}) => {
  const [passIdInput, setPassIdInput] = useState(initialPassId || '');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<VerificationResult | null>(null);

  const verifyPass = async (idToVerify: string) => {
    const cleanId = idToVerify.trim();
    if (!cleanId) return;

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch(`/api/verify/${encodeURIComponent(cleanId)}`);
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error('Verification request failed:', err);
      setResult({
        verified: false,
        error: 'Unable to connect to Ambo University Woliso verification database. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialPassId) {
      setPassIdInput(initialPassId);
      verifyPass(initialPassId);
    }
  }, [initialPassId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    verifyPass(passIdInput);
  };

  return (
    <div className="py-12 sm:py-16 max-w-3xl mx-auto px-4 sm:px-6 space-y-8 animate-fade-in bg-black text-[#F2F2F2]">
      
      {/* Human-Crafted Header & Sub-Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFC21A]/10 border border-[#FFC21A]/30 text-[#FFC21A] text-xs font-semibold">
          <ShieldCheck className="w-4 h-4 text-[#FFC21A]" />
          <span>Official Pass & Ticket Verification</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Verify Member Pass or Event Ticket
        </h1>
        <p className="text-neutral-300 text-xs sm:text-sm max-w-lg mx-auto leading-relaxed">
          Authenticate student club memberships or special event credentials for hackathons, guest lectures, and coding challenges at Ambo University, Woliso Campus.
        </p>
      </div>

      {/* Pass ID Lookup Input */}
      <form onSubmit={handleSubmit} className="flex gap-2 max-w-md mx-auto">
        <div className="relative flex-grow">
          <input
            type="text"
            value={passIdInput}
            onChange={(e) => setPassIdInput(e.target.value)}
            placeholder="e.g. CGC-WL-2026-PRES or EVT-HACK-2026-WL"
            className="w-full bg-[#000000] border border-[#2A2A2A] rounded-xl px-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#FFC21A] font-mono shadow-inner"
          />
        </div>
        <MagneticButton
          type="submit"
          disabled={loading}
          className="px-5 py-2.5 bg-[#FFC21A] hover:bg-[#e5ad16] disabled:opacity-50 text-black text-xs font-bold rounded-xl flex items-center gap-1.5 transition shadow-sm active:scale-95"
        >
          {loading ? (
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Search className="w-3.5 h-3.5" />
          )}
          <span>Verify</span>
        </MagneticButton>
      </form>

      {/* Verification Output Card */}
      {result && (
        <TiltCard
          maxTilt={4}
          scale={1.01}
          className="rounded-3xl border border-[#2A2A2A] transition-all duration-300 shadow-2xl overflow-hidden animate-fade-in bg-[#080808]"
        >
          {/* 1. Event / Hackathon / Lecture Ticket Verified */}
          {result.verified && result.isEventTicket && result.ticket ? (
            <div>
              <div className="bg-[#141414] border-b border-[#2A2A2A] p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#FFC21A]/10 border border-[#FFC21A]/30 flex items-center justify-center text-[#FFC21A] shrink-0">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#FFC21A] font-mono">
                        AUTHENTICATED EVENT TICKET
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#FFC21A]/10 text-[#FFC21A] border border-[#FFC21A]/30">
                        {result.ticket.eventType}
                      </span>
                    </div>
                    <h2 className="text-xl font-bold text-white mt-0.5">{result.ticket.title}</h2>
                    <p className="text-xs text-neutral-300 font-mono">{result.ticket.id}</p>
                  </div>
                </div>

                <div className="text-right hidden sm:block">
                  <div className="text-[10px] text-neutral-400 uppercase font-mono">Venue</div>
                  <div className="text-xs font-semibold text-neutral-200">{result.ticket.venue}</div>
                  <div className="text-[11px] text-[#FFC21A]">{result.ticket.eventDate}</div>
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-3.5 rounded-xl bg-[#000000] border border-[#2A2A2A] space-y-1">
                    <span className="text-[10px] uppercase font-semibold text-neutral-500">Access Level</span>
                    <div className="font-semibold text-[#FFC21A]">{result.ticket.accessLevel}</div>
                    <div className="text-neutral-400 text-[11px]">Old Classroom ICT Building IT lab 01 and 06 Clearance</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#000000] border border-[#2A2A2A] space-y-1">
                    <span className="text-[10px] uppercase font-semibold text-neutral-500">Authorized Issuer</span>
                    <div className="font-semibold text-white">{result.ticket.createdBy}</div>
                    <div className="text-neutral-400 text-[11px]">Ambo University, Woliso Campus</div>
                  </div>
                </div>
              </div>
            </div>
          ) : result.verified && result.member ? (
            /* 2. Official Member Pass Verified */
            <div>
              <div className="bg-[#141414] border-b border-[#2A2A2A] p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#FFC21A]/10 border border-[#FFC21A]/30 flex items-center justify-center text-[#FFC21A] shrink-0">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#FFC21A] font-mono">
                        AUTHENTICATED MEMBER
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#FFC21A]/10 text-[#FFC21A] border border-[#FFC21A]/30">
                        {result.member.status}
                      </span>
                    </div>
                    <h2 className="text-xl font-bold text-white mt-0.5">{result.member.fullName}</h2>
                    <p className="text-xs text-neutral-300 font-mono">{result.member.id}</p>
                  </div>
                </div>

                <div className="text-right hidden sm:block">
                  <div className="text-[10px] text-neutral-400 uppercase font-mono">Affiliation</div>
                  <div className="text-xs font-semibold text-neutral-200">Ambo University</div>
                  <div className="text-[11px] text-[#FFC21A]">Woliso Campus</div>
                </div>
              </div>

              {/* Member Details Grid */}
              <div className="p-6 sm:p-8 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-3.5 rounded-xl bg-[#000000] border border-[#2A2A2A] space-y-1">
                    <span className="text-[10px] uppercase font-semibold text-neutral-500 flex items-center gap-1">
                      <GraduationCap className="w-3.5 h-3.5 text-[#FFC21A]" />
                      Department & Standing
                    </span>
                    <div className="font-semibold text-white">{result.member.department}</div>
                    <div className="text-neutral-400 text-[11px]">{result.member.yearOfStudy}</div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#000000] border border-[#2A2A2A] space-y-1">
                    <span className="text-[10px] uppercase font-semibold text-neutral-500 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#FFC21A]" />
                      Membership Role
                    </span>
                    <div className="font-semibold text-white">{result.member.role}</div>
                    <div className="text-neutral-400 text-[11px]">{result.member.primaryTrack}</div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#000000] border border-[#2A2A2A] space-y-1">
                    <span className="text-[10px] uppercase font-semibold text-neutral-500 flex items-center gap-1">
                      <Building2 className="w-3.5 h-3.5 text-[#FFC21A]" />
                      Campus Clearance
                    </span>
                    <div className="font-semibold text-[#FFC21A]">{result.member.accessLevel}</div>
                    <div className="text-neutral-400 text-[11px]">Old Classroom ICT Building IT lab 01 and 06</div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#000000] border border-[#2A2A2A] space-y-1">
                    <span className="text-[10px] uppercase font-semibold text-neutral-500 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#FFC21A]" />
                      Issued Date
                    </span>
                    <div className="font-semibold text-white">{result.member.issuedAt}</div>
                    <div className="text-neutral-400 text-[11px]">Valid for 2026 Academic Year</div>
                  </div>
                </div>

                {/* Campus Verification Seal */}
                <div className="p-4 rounded-2xl bg-[#141414] border border-[#2A2A2A] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#FFC21A] text-black flex items-center justify-center font-black text-xs shadow-sm">
                      CGC
                    </div>
                    <div>
                      <div className="font-bold text-white">Cyber Guardians Club Registry</div>
                      <div className="text-[11px] text-neutral-400">Lead Administration: Yesuf Dergu (@SatoshiFlash)</div>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-[#000000] text-[#FFC21A] font-mono text-[10px] border border-[#2A2A2A]">
                    HASH: VERIFIED-OK
                  </span>
                </div>
              </div>
            </div>
          ) : (
            /* Red / Not Found Alert */
            <div className="p-6 sm:p-8 space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-400 shrink-0">
                  <AlertTriangle className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Unverified or Unrecognized Pass</h3>
                  <p className="text-xs text-rose-300 mt-1">
                    {result.error || 'The entered Pass ID does not match any active student registration in the Ambo University Woliso Campus database.'}
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#000000] border border-[#2A2A2A] text-xs text-neutral-400 space-y-2">
                <p>If you are a registered student experiencing an issue, contact the CGC Lead Executive Desk:</p>
                <div className="text-neutral-300 font-mono text-[11px]">
                  Telegram: <a href="https://t.me/IT_Jointcommunity" target="_blank" className="text-[#FFC21A] underline">@IT_Jointcommunity</a> | Email: yesufdergu464@gmail.com
                </div>
              </div>
            </div>
          )}
        </TiltCard>
      )}

      {/* Back button */}
      <div className="text-center pt-2">
        <button
          onClick={onNavigateHome}
          className="text-xs text-neutral-400 hover:text-white transition inline-flex items-center gap-1 active:scale-95"
        >
          ← Return to Cyber Guardians Club Portal
        </button>
      </div>

    </div>
  );
};
