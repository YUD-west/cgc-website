import React, { useState } from 'react';
import { X, Check, Copy, Palette } from 'lucide-react';
import { CGCLogo } from '../Logo/CGCLogo';

interface BrandModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BrandModal: React.FC<BrandModalProps> = ({ isOpen, onClose }) => {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  if (!isOpen) return null;

  const colors = [
    { name: 'Pure Black', hex: '#000000', role: 'Dominant Background & Minimalist Surface' },
    { name: 'Golden Yellow', hex: '#FFC21A', role: 'Primary Brand Action & Innovation Spark' },
    { name: 'Pure White', hex: '#FFFFFF', role: 'High-Contrast Typography & Crisp Negative Space' },
    { name: 'Dark Neutral', hex: '#141414', role: 'Card Container & Elevated Surface' },
  ];

  const copyToClipboard = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="bg-[#080808] border border-[#2A2A2A] w-full max-w-3xl rounded-2xl p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto text-[#F2F2F2]">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-neutral-400 hover:text-white p-2 rounded-lg bg-[#141414] hover:bg-[#202020]"
          aria-label="Close brand modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <Palette className="w-4 h-4 text-[#FFC21A]" />
          <span className="text-xs font-semibold text-[#FFC21A] uppercase tracking-wider">
            Brand Identity System
          </span>
        </div>
        <h3 className="text-2xl font-extrabold text-white">CGC Visual Identity & Lettermark</h3>
        <p className="text-neutral-300 text-sm mt-1">
          Crafted for Ambo University Woliso Campus. Designed to be compact, bold, and instantly recognizable across web surfaces, certificates, merchandise, and academic documents.
        </p>

        {/* Logo Variations Grid */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-6 rounded-xl bg-[#000000] border border-[#2A2A2A] flex flex-col items-center justify-center text-center">
            <span className="text-[11px] font-mono text-neutral-400 mb-4 uppercase">
              Primary Monogram (Dark Surface)
            </span>
            <CGCLogo variant="full" size="lg" />
          </div>

          <div className="p-6 rounded-xl bg-[#141414] border border-[#2A2A2A] flex flex-col items-center justify-center text-center">
            <span className="text-[11px] font-mono text-neutral-300 mb-4 uppercase">
              Official Document / Certificate
            </span>
            <CGCLogo variant="full" size="lg" />
          </div>
        </div>

        {/* Compact & Icon Usage */}
        <div className="mt-4 p-5 rounded-xl bg-[#141414] border border-[#2A2A2A] flex flex-wrap items-center justify-around gap-6">
          <div className="flex items-center gap-3">
            <CGCLogo variant="symbol" size="md" />
            <div className="text-xs">
              <span className="font-semibold text-white block">Icon / Favicon</span>
              <span className="text-neutral-400">42px × 42px</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <CGCLogo variant="symbol" size="sm" />
            <div className="text-xs">
              <span className="font-semibold text-white block">Compact Badge</span>
              <span className="text-neutral-400">32px × 32px</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <CGCLogo variant="symbol" size="xl" />
            <div className="text-xs">
              <span className="font-semibold text-white block">T-Shirt / Vector Print</span>
              <span className="text-neutral-400">Scalable Vector</span>
            </div>
          </div>
        </div>

        {/* Color Palette Tokens */}
        <div className="mt-6">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-3">
            Official Color Palette
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {colors.map((c) => (
              <div
                key={c.hex}
                className="bg-[#000000] rounded-xl p-3 border border-[#2A2A2A] flex flex-col justify-between"
              >
                <div
                  className="w-full h-12 rounded-lg border border-white/10 mb-2 shadow-inner"
                  style={{ backgroundColor: c.hex }}
                />
                <div>
                  <div className="text-xs font-bold text-white">{c.name}</div>
                  <div className="text-[10px] text-neutral-400 leading-tight mt-0.5">{c.role}</div>
                </div>
                <button
                  onClick={() => copyToClipboard(c.hex)}
                  className="mt-2.5 flex items-center justify-between text-xs font-mono text-neutral-300 bg-[#141414] hover:bg-[#202020] px-2 py-1 rounded border border-[#2A2A2A] transition-colors"
                >
                  <span>{c.hex}</span>
                  {copiedColor === c.hex ? (
                    <Check className="w-3.5 h-3.5 text-[#FFC21A]" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 text-neutral-400" />
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Insignia Design Rationale */}
        <div className="mt-6 p-4 rounded-xl bg-[#000000] border border-[#2A2A2A] text-xs text-neutral-300 leading-relaxed space-y-2">
          <div className="font-bold text-white text-sm">Visual Philosophy: Golden Craftsmanship & Technology</div>
          <p>
            • <strong>Hammered Gold CGC Emblem:</strong> Represents durability, value creation, and excellence in student innovation at Ambo University Woliso Campus.
          </p>
          <p>
            • <strong>Insignia Lettering:</strong> The sculpted letters <span className="font-mono text-[#FFC21A]">C</span>, <span className="font-mono text-[#FFC21A]">G</span>, and <span className="font-mono text-[#FFC21A]">C</span> create a distinctive emblem that anchors our official club identity across all digital and physical touchpoints.
          </p>
          <p>
            • <strong>Golden Yellow Accent (#FFC21A):</strong> Signifies energy, forward momentum, and the motto: <em className="text-[#FFC21A] font-semibold">"Ideas into Impact."</em>
          </p>
        </div>

        <div className="mt-6 pt-4 border-t border-[#2A2A2A] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-[#FFC21A] hover:bg-[#e5ad16] text-black font-bold rounded-lg text-xs transition-colors"
          >
            Close Identity Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
