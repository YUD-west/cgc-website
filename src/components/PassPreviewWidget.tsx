import React, { useState } from 'react';
import { ShieldCheck, QrCode, ArrowRight, UserCheck, Lock, CheckCircle2 } from 'lucide-react';

interface PassPreviewWidgetProps {
  onNavigate: (tab: string) => void;
}

export const PassPreviewWidget: React.FC<PassPreviewWidgetProps> = ({ onNavigate }) => {
  const [selectedFaculty, setSelectedFaculty] = useState<string>('Informatics & IT');

  const faculties = [
    'Informatics & IT',
    'Faculty of Agriculture',
    'Business & Economics',
    'Health & Social Sciences'
  ];

  return (
    <div className="rounded-3xl bg-[#0F172A] border border-slate-800 p-6 sm:p-8 shadow-sm">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left: Explanation */}
        <div className="lg:col-span-7 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Official Member Verification Passes
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Every approved CGC member receives an official, cryptographically verifiable digital pass with a unique scannable QR code. Used for clearance in <strong>Computer Lab 02</strong>, hackathon workstation access, and inter-departmental innovation projects.
          </p>

          {/* Interactive Faculty Pill Switcher */}
          <div className="pt-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-2">
              Select Your Academic Stream to Preview:
            </span>
            <div className="flex flex-wrap gap-2">
              {faculties.map((f) => (
                <button
                  key={f}
                  onClick={() => setSelectedFaculty(f)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all active:scale-95 ${
                    selectedFaculty === f
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-3 flex flex-wrap gap-3">
            <button
              onClick={() => onNavigate('join')}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-all flex items-center gap-2 active:scale-95 shadow-md"
            >
              <span>Apply for Official Membership</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onNavigate('verify/CGC-WL-2026-PRES')}
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 text-xs font-semibold transition-colors flex items-center gap-1.5"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Test Live Verification Engine</span>
            </button>
          </div>
        </div>

        {/* Right: Realistic Member Card Simulation */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="w-full max-w-xs rounded-2xl bg-gradient-to-b from-slate-900 to-[#0A0F1D] border border-slate-700 p-5 shadow-xl relative overflow-hidden transition-transform duration-300 hover:scale-[1.02]">
            {/* Top university header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-[10px] text-slate-400">
              <span className="font-semibold text-slate-200">AMBO UNIVERSITY</span>
              <span className="text-emerald-400 font-mono font-bold">WOLISO CAMPUS</span>
            </div>

            {/* Middle Badge Identity */}
            <div className="my-4 text-center space-y-2">
              <div className="w-16 h-16 mx-auto rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-center p-1">
                <QrCode className="w-12 h-12 text-blue-400" />
              </div>

              <div>
                <h4 className="text-sm font-bold text-white">Student Innovator</h4>
                <p className="text-xs text-blue-400 font-medium">{selectedFaculty}</p>
                <p className="text-[10px] font-mono text-slate-500 mt-0.5">ID: CGC-WL-2026-XXXX</p>
              </div>
            </div>

            {/* Clearance Details */}
            <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-[11px] space-y-1 text-left">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Status:</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Verified Member
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Clearance:</span>
                <span className="text-slate-200 font-medium">Lab 02 Terminal Access</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Approval:</span>
                <span className="text-slate-200">Lead Admin Yesuf Dergu</span>
              </div>
            </div>

            {/* Bottom note */}
            <div className="mt-3 text-center">
              <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">
                Scannable via CGC QR Validator
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
