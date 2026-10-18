import React, { useState } from 'react';
import {
  Github,
  Linkedin,
  Send,
  Mail,
  Copy,
  Check,
  ArrowUpRight,
  MapPin,
  Clock,
  ShieldCheck
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const Contact: React.FC = () => {
  const { socials, personal } = portfolioData;

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formSubject, setFormSubject] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(socials.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2400);
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = socials.email;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2400);
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formMessage) return;

    // Build mailto url
    const subject = encodeURIComponent(
      formSubject ? `[Portfolio] ${formSubject}` : `[Portfolio Inquiry] From ${formName}`
    );
    const body = encodeURIComponent(
      `Name: ${formName}\nEmail: ${formEmail || 'Not provided'}\n\nMessage:\n${formMessage}`
    );
    const mailtoUrl = `mailto:${socials.email}?subject=${subject}&body=${body}`;

    window.location.href = mailtoUrl;
    setFormSubmitted(true);
  };

  return (
    <section
      id="contact"
      aria-label="Contact Yesuf Dergu"
      className="py-24 px-4 sm:px-6 lg:px-8 border-b border-white/[0.06] scroll-mt-12"
    >
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 font-mono text-xs text-lime-400 uppercase tracking-widest">
            <span>06</span>
            <span className="text-zinc-600">/</span>
            <span>Contact & Inquiries</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Let's Build Something Meaningful
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 max-w-xl">
            Whether you are discussing engineering opportunities, algorithmic platforms, applied AI projects, or practical software collaborations, reach out directly.
          </p>
        </div>

        {/* 2-Column Grid: Contact Methods & Direct Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column: Direct Links & Channels */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400">
              Direct Channels
            </h3>

            {/* Email Card with One-Click Copy */}
            <div className="p-4 rounded-xl bg-[#111111] border border-white/10 hover:border-lime-400/30 transition-all space-y-3">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-xs font-mono text-zinc-300 font-medium">
                  <Mail className="w-4 h-4 text-lime-400" />
                  Direct Email
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-mono text-lime-400 bg-lime-400/10 px-2 py-0.5 rounded border border-lime-400/20">
                  <ShieldCheck className="w-3 h-3" />
                  Verified Direct
                </span>
              </div>

              <div className="flex items-center justify-between gap-2 p-2.5 rounded-lg bg-[#161616] border border-white/5 font-mono text-xs sm:text-sm text-zinc-200">
                <a
                  href={`mailto:${socials.email}`}
                  className="truncate hover:text-lime-400 transition-colors"
                  title="Send email"
                >
                  {socials.email}
                </a>
                <button
                  onClick={handleCopyEmail}
                  type="button"
                  className="px-2.5 py-1 rounded bg-[#222222] hover:bg-lime-400 hover:text-black text-white text-xs font-medium transition-colors flex items-center gap-1.5 shrink-0"
                  aria-label="Copy email address"
                  title="Copy email to clipboard"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-black" />
                      <span className="text-black">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-[11px] text-zinc-400 font-mono">
                Prompt response guaranteed. Open to engineering opportunities and collaborations.
              </p>
            </div>

            {/* GitHub Link Card */}
            <a
              href={socials.github}
              target="_blank"
              rel="noreferrer"
              className="group p-4 rounded-xl bg-[#111111] border border-white/10 hover:border-lime-400/40 hover:bg-[#141414] transition-all flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#181818] text-white border border-white/5 group-hover:border-lime-400/30 transition-colors">
                  <Github className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white group-hover:text-lime-400 transition-colors">
                    GitHub
                  </div>
                  <div className="text-xs font-mono text-zinc-400">
                    github.com/YUD-west
                  </div>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-lime-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </a>

            {/* LinkedIn Link Card */}
            <a
              href={socials.linkedin}
              target="_blank"
              rel="noreferrer"
              className="group p-4 rounded-xl bg-[#111111] border border-white/10 hover:border-lime-400/40 hover:bg-[#141414] transition-all flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#181818] text-white border border-white/5 group-hover:border-lime-400/30 transition-colors">
                  <Linkedin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white group-hover:text-lime-400 transition-colors">
                    LinkedIn
                  </div>
                  <div className="text-xs font-mono text-zinc-400">
                    linkedin.com/in/yusuf2537
                  </div>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-lime-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </a>

            {/* Telegram Link Card */}
            <a
              href={socials.telegram}
              target="_blank"
              rel="noreferrer"
              className="group p-4 rounded-xl bg-[#111111] border border-white/10 hover:border-lime-400/40 hover:bg-[#141414] transition-all flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#181818] text-white border border-white/5 group-hover:border-lime-400/30 transition-colors">
                  <Send className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white group-hover:text-lime-400 transition-colors">
                    Telegram
                  </div>
                  <div className="text-xs font-mono text-zinc-400">
                    t.me/SatoshiFlash
                  </div>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-lime-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </a>

            {/* Location & Timezone info */}
            <div className="p-4 rounded-xl bg-[#0F0F0F] border border-white/5 text-xs font-mono text-zinc-400 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-lime-400" />
                Ethiopia
              </span>
              <span className="flex items-center gap-1.5 text-zinc-500">
                <Clock className="w-3.5 h-3.5" />
                East Africa Time (UTC+3)
              </span>
            </div>
          </div>

          {/* Right Column: Direct Message Composer */}
          <div className="p-6 sm:p-8 rounded-xl bg-[#111111] border border-white/10 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-white tracking-tight">
                  Send a Direct Message
                </h3>
                <p className="text-xs text-zinc-400">
                  Fill out this quick form to generate a direct email inquiry to {socials.email}.
                </p>
              </div>

              {formSubmitted && (
                <div className="p-3 rounded-lg bg-lime-400/10 border border-lime-400/30 text-lime-400 text-xs font-mono flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>Draft opened in your email client. Thank you!</span>
                </div>
              )}

              <form onSubmit={handleSendMessage} className="space-y-3.5 text-xs">
                <div>
                  <label htmlFor="contact-name" className="block font-mono text-zinc-400 mb-1">
                    Your Name *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="e.g. Alex Smith"
                    className="w-full px-3 py-2 rounded-md bg-[#161616] border border-white/10 text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-lime-400 focus:border-lime-400 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className="block font-mono text-zinc-400 mb-1">
                    Your Email (optional)
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    placeholder="alex@company.com"
                    className="w-full px-3 py-2 rounded-md bg-[#161616] border border-white/10 text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-lime-400 focus:border-lime-400 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="contact-subject" className="block font-mono text-zinc-400 mb-1">
                    Subject / Topic
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    value={formSubject}
                    onChange={(e) => setFormSubject(e.target.value)}
                    placeholder="Full-Stack role / Project collaboration"
                    className="w-full px-3 py-2 rounded-md bg-[#161616] border border-white/10 text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-lime-400 focus:border-lime-400 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="contact-message" className="block font-mono text-zinc-400 mb-1">
                    Message *
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    value={formMessage}
                    onChange={(e) => setFormMessage(e.target.value)}
                    placeholder="Briefly describe what you'd like to work on..."
                    className="w-full px-3 py-2 rounded-md bg-[#161616] border border-white/10 text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-lime-400 focus:border-lime-400 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-md bg-white text-black font-semibold text-xs hover:bg-lime-400 transition-colors flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-lime-400"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Inquiry</span>
                </button>
              </form>
            </div>

            <div className="pt-4 mt-4 border-t border-white/5 text-[11px] font-mono text-zinc-500">
              Direct and prompt response guaranteed.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
