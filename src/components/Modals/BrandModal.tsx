import React, { useState } from 'react';
import { X, Check, Copy, Download, Sparkles, Shield, Palette } from 'lucide-react';
import { CGCLogo } from '../Logo/CGCLogo';

interface BrandModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BrandModal: React.FC<BrandModalProps> = ({ isOpen, onClose }) => {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  if (!isOpen) return null;

  const colors = [
    { name: 'Midnight Navy', hex: '#0F172A', role: 'Dominant Background & Contrast Foundation' },
    { name: 'Electric Blue', hex: '#2563EB', role: 'Primary Brand Action & Digital Trust' },
    { name: 'Off-White', hex: '#F5F7FA', role: 'Clean Typography & Pure Negative Space' },
    { name: 'Green Accent', hex: '#16A34A', role: 'Growth & Impact Spark ("Ideas into Impact")' },
  ];

  const copyToClipboard = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="bg-[#111A2E] border border-slate-700 w-full max-w-3xl rounded-2xl p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-lg bg-slate-800/60 hover:bg-slate-800"
          aria-label="Close brand modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <Palette className="w-4 h-4 text-blue-400" />
          <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
            Brand Identity System
          </span>
        </div>
        <h3 className="text-2xl font-extrabold text-white">CGC Visual Identity & Lettermark</h3>
        <p className="text-slate-300 text-sm mt-1">
          Crafted for Ambo University Woliso Campus. Designed to be compact, bold, and instantly recognizable across web surfaces, certificates, merchandise, and academic documents.
        </p>

        {/* Logo Variations Grid */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 flex flex-col items-center justify-center text-center">
            <span className="text-[11px] font-mono text-slate-400 mb-4 uppercase">
              Primary Monogram (Dark Surface)
            </span>
            <CGCLogo variant="full" size="lg" />
          </div>

          <div className="p-6 rounded-xl bg-[#F5F7FA] border border-slate-300 flex flex-col items-center justify-center text-center">
            <span className="text-[11px] font-mono text-slate-600 mb-4 uppercase">
              Official Document / Certificate (Light Surface)
            </span>
            <CGCLogo variant="full" size="lg" theme="light" />
          </div>
        </div>

        {/* Compact & Icon Usage */}
        <div className="mt-4 p-5 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-wrap items-center justify-around gap-6">
          <div className="flex items-center gap-3">
            <CGCLogo variant="symbol" size="md" />
            <div className="text-xs">
              <span className="font-semibold text-white block">Icon / Favicon</span>
              <span className="text-slate-400">42px × 42px</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <CGCLogo variant="symbol" size="sm" />
            <div className="text-xs">
              <span className="font-semibold text-white block">Compact Badge</span>
              <span className="text-slate-400">32px × 32px</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <CGCLogo variant="symbol" size="xl" />
            <div className="text-xs">
              <span className="font-semibold text-white block">T-Shirt / Vector Print</span>
              <span className="text-slate-400">Scalable Vector</span>
            </div>
          </div>
        </div>

        {/* Color Palette Tokens */}
        <div className="mt-6">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-3">
            Official Color Palette
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {colors.map((c) => (
              <div
                key={c.hex}
                className="bg-slate-900 rounded-xl p-3 border border-slate-800 flex flex-col justify-between"
              >
                <div
                  className="w-full h-12 rounded-lg border border-white/10 mb-2 shadow-inner"
                  style={{ backgroundColor: c.hex }}
                />
                <div>
                  <div className="text-xs font-bold text-white">{c.name}</div>
                  <div className="text-[10px] text-slate-400 leading-tight mt-0.5">{c.role}</div>
                </div>
                <button
                  onClick={() => copyToClipboard(c.hex)}
                  className="mt-2.5 flex items-center justify-between text-xs font-mono text-slate-300 bg-slate-800/80 hover:bg-slate-800 px-2 py-1 rounded border border-slate-700 transition-colors"
                >
                  <span>{c.hex}</span>
                  {copiedColor === c.hex ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 text-slate-400" />
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Geometric Lettermark Design Rationale */}
        <div className="mt-6 p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300 leading-relaxed space-y-2">
          <div className="font-bold text-white text-sm">Visual Philosophy: Minimalist Engineering</div>
          <p>
            • <strong>Guardian Shield Hexagon:</strong> Represents resilience, defensive cybersecurity, and student solidarity.
          </p>
          <p>
            • <strong>Geometric Lettering:</strong> The custom shapes of <span className="font-mono text-blue-400">C</span>, <span className="font-mono text-white">G</span>, and <span className="font-mono text-emerald-400">C</span> avoid generic system fonts, delivering a bold monogram that scales seamlessly down to 16px.
          </p>
          <p>
            • <strong>The Green Node:</strong> Positioned at the vertex of action, illustrating the motto: <em className="text-emerald-400 font-semibold">"Ideas into Impact."</em>
          </p>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold transition-colors"
          >
            Close Identity Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
