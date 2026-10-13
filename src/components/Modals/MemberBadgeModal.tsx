import React, { useState } from 'react';
import { QRCodeView } from '../QRCodeView';
import { CGCLogo } from '../Logo/CGCLogo';
import { downloadBadgeAsPNG, BadgeData } from '../../utils/exportBadge';
import { 
  X, 
  Download, 
  Printer, 
  Copy, 
  Check, 
  ShieldCheck, 
  ExternalLink,
  Sparkles,
  Smartphone
} from 'lucide-react';

interface MemberBadgeModalProps {
  isOpen: boolean;
  onClose: () => void;
  badgeData: BadgeData;
  onNavigateToVerify?: (passId: string) => void;
}

export const MemberBadgeModal: React.FC<MemberBadgeModalProps> = ({
  isOpen,
  onClose,
  badgeData,
  onNavigateToVerify,
}) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const origin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';
  const verifyUrl = `${origin}/#verify/${badgeData.memberId}`;

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      await downloadBadgeAsPNG(badgeData);
    } catch (err) {
      console.error('Download badge failed:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(verifyUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-black/85 backdrop-blur-md print:p-0 print:bg-white print:static">
      {/* Modal Container */}
      <div 
        className="relative w-full max-w-lg bg-[#0F172A] border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-6 print:border-none print:shadow-none print:max-w-none print:w-full print:bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar (Hidden during printing) */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800/80 bg-slate-900/60 print:hidden">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <ShieldCheck className="w-4 h-4" />
            </span>
            <div>
              <h3 className="text-sm font-bold text-white">Official Member Pass & ID Badge</h3>
              <p className="text-[11px] text-slate-400">Offline-capable digital pass & printable lanyard card</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          
          {/* ========================================================
              PHYSICAL ID BADGE PREVIEW (Target for Print & View)
              ======================================================== */}
          <div 
            id="cgc-printable-badge"
            className="relative mx-auto w-full max-w-[340px] rounded-2xl bg-gradient-to-b from-[#090D16] via-[#0F172A] to-[#0B1120] border-2 border-slate-700/80 shadow-2xl p-5 text-center text-white overflow-hidden print:border-2 print:border-black print:text-black print:bg-white"
          >
            {/* Lanyard punch-hole simulator */}
            <div className="mx-auto w-24 h-3 rounded-full bg-slate-800 border border-slate-700/90 mb-4 print:border-black print:bg-gray-200" />

            {/* University Letterhead */}
            <div className="space-y-0.5 mb-3">
              <div className="text-[11px] font-bold tracking-widest text-slate-400 uppercase print:text-black">
                Ambo University • Woliso Campus
              </div>
              <div className="text-[9px] font-semibold text-slate-500 uppercase tracking-wider print:text-gray-700">
                Directorate of Research & Innovation
              </div>
              {/* Holographic accent ribbon */}
              <div className="h-1 w-24 mx-auto rounded-full bg-gradient-to-r from-blue-500 via-sky-400 to-emerald-400 mt-1.5" />
            </div>

            {/* CGC Club Identity */}
            <div className="mb-4">
              <h4 className="text-lg font-black tracking-tight text-white print:text-black">
                CYBER GUARDIANS CLUB
              </h4>
              <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/30 print:bg-gray-100 print:text-black">
                {badgeData.isEventTicket ? 'OFFICIAL EVENT CLEARANCE' : 'STUDENT INNOVATION PASS'}
              </span>
            </div>

            {/* Member or Ticket Information */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 space-y-2 mb-4 text-xs print:bg-gray-50 print:border-gray-300">
              {badgeData.isEventTicket ? (
                <>
                  <div className="text-amber-400 font-bold text-[10px] uppercase font-mono print:text-black">
                    ★ {badgeData.eventVenue}
                  </div>
                  <div className="text-sm font-bold text-white print:text-black leading-snug">
                    {badgeData.eventTitle}
                  </div>
                  <div className="text-[11px] text-slate-400 print:text-gray-700">
                    {badgeData.eventDate}
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <div className="text-base font-extrabold text-white print:text-black">
                      {badgeData.fullName}
                    </div>
                    <div className="text-[11px] text-emerald-400 font-bold font-mono print:text-black">
                      ✓ {badgeData.role || 'Official Verified Member'}
                    </div>
                  </div>
                  <div className="text-slate-300 print:text-gray-800 text-[11px]">
                    {badgeData.department} {badgeData.yearOfStudy ? `• ${badgeData.yearOfStudy}` : ''}
                  </div>
                  <div className="text-sky-400 print:text-blue-900 font-medium text-[11px]">
                    {badgeData.track}
                  </div>
                </>
              )}

              <div className="pt-2 border-t border-slate-800 print:border-gray-300 flex items-center justify-between text-[10px]">
                <span className="text-slate-400 print:text-gray-600 uppercase font-semibold">Pass ID:</span>
                <span className="font-mono font-bold text-emerald-400 print:text-black">{badgeData.memberId}</span>
              </div>
            </div>

            {/* Scannable High-Contrast QR Code */}
            <div className="bg-white p-3 rounded-xl border border-slate-200 inline-block shadow-inner mb-2.5">
              <QRCodeView
                value={verifyUrl}
                size={135}
                label={`Scan to verify pass ${badgeData.memberId}`}
              />
            </div>

            <div className="text-[10px] text-slate-400 print:text-gray-700 font-medium">
              Door Clearance: <span className="text-slate-200 print:text-black font-semibold">Computer Lab 02 & Main Hall</span>
            </div>

            {/* Footer Watermark */}
            <div className="mt-3 pt-2.5 border-t border-slate-800/80 text-[8px] font-mono text-slate-500 print:text-gray-600 print:border-gray-300">
              AMBO UNIVERSITY • ETHIOPIA • NON-TRANSFERABLE
            </div>
          </div>

          {/* Quick Notice */}
          <div className="p-3 rounded-2xl bg-blue-950/20 border border-blue-500/20 text-xs text-slate-300 flex items-start gap-2.5 print:hidden">
            <Smartphone className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
            <p className="text-[11px] leading-relaxed">
              <strong>Offline Capable:</strong> Save the PNG badge directly to your phone’s gallery. Woliso campus coordinators can scan your QR code at Lab 02 even when mobile network data is down.
            </p>
          </div>

          {/* Action Buttons Grid (Hidden during print) */}
          <div className="space-y-2.5 pt-1 print:hidden">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <button
                onClick={handleDownload}
                disabled={isDownloading}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-500 hover:to-sky-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 transition active:scale-95 disabled:opacity-50"
              >
                {isDownloading ? (
                  <>
                    <span className="animate-spin w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full" />
                    <span>Rendering Badge...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>Save PNG to Phone</span>
                  </>
                )}
              </button>

              <button
                onClick={handlePrint}
                className="w-full py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 flex items-center justify-center gap-2 transition active:scale-95"
              >
                <Printer className="w-4 h-4 text-emerald-400" />
                <span>Print Lanyard Card (PDF)</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={handleCopyLink}
                className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800/80 text-slate-300 text-[11px] border border-slate-800 flex items-center justify-center gap-1.5 transition"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                <span>{copied ? 'Link Copied!' : 'Copy Verify URL'}</span>
              </button>

              {onNavigateToVerify && (
                <button
                  onClick={() => {
                    onClose();
                    onNavigateToVerify(badgeData.memberId);
                  }}
                  className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800/80 text-slate-300 text-[11px] border border-slate-800 flex items-center justify-center gap-1.5 transition"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-sky-400" />
                  <span>Open Verification</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
