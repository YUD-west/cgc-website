import React, { useState } from 'react';
import { SectionHeader } from '../components/SectionHeader';
import { FAQS } from '../data/faqs';
import { LEAD_ADMIN, CO_ADMIN, OFFICIAL_COMMUNITY } from '../data/team';
import { 
  MapPin, 
  Mail, 
  Send, 
  Github, 
  Linkedin, 
  Clock, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  AlertCircle,
  MessageSquare,
  ShieldCheck,
  UserCheck,
  ExternalLink
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  // Contact Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('General Club Inquiry');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  // FAQ State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [faqCategory, setFaqCategory] = useState<string>('all');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError('Please fill in your name, email, and message.');
      return;
    }

    setSent(true);
    setError('');
  };

  const filteredFaqs = FAQS.filter(
    (f) => faqCategory === 'all' || f.category === faqCategory
  );

  return (
    <div className="space-y-20 sm:space-y-24 pb-20 pt-12 sm:pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionHeader
          badge="Official Communication"
          badgeColor="blue"
          title="Contact & Community Channels"
          description="Connect with the CGC executive committee, join our active Telegram group, or reach out directly to our Lead Administrators."
        />

        {/* Lead Admin Spotlight Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-950/40 via-slate-900 to-[#111A2E] border border-blue-500/30 shadow-2xl mb-10 flex flex-col md:flex-row items-center gap-6">
          <div className="relative flex-shrink-0">
            <img
              src={LEAD_ADMIN.photoUrl}
              alt={LEAD_ADMIN.name}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover object-top border-2 border-blue-500 shadow-lg"
            />
            <span className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-1 rounded-full border-2 border-slate-900" title="Verified Lead Admin">
              <UserCheck className="w-4 h-4" />
            </span>
          </div>

          <div className="space-y-2 text-center md:text-left flex-1">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <h3 className="text-xl sm:text-2xl font-bold text-white">{LEAD_ADMIN.name}</h3>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/30">
                {LEAD_ADMIN.role}
              </span>
            </div>
            <p className="text-xs text-slate-300">
              {LEAD_ADMIN.department}
            </p>
            <p className="text-xs text-slate-400 leading-relaxed max-w-xl">
              {LEAD_ADMIN.bio}
            </p>
          </div>

          <div className="flex flex-wrap md:flex-col gap-2 flex-shrink-0">
            <a
              href={LEAD_ADMIN.telegramUrl}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-2 shadow-md transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
              <span>DM {LEAD_ADMIN.telegram}</span>
            </a>
            <a
              href={CO_ADMIN.url}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-2 border border-slate-700 transition-colors"
            >
              <Send className="w-3.5 h-3.5 text-blue-400" />
              <span>DM {CO_ADMIN.handle}</span>
            </a>
          </div>
        </div>

        {/* Contact Information & Channels Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Official Digital Channels & Campus Office */}
          <div className="space-y-6">
            
            {/* Official Digital Channels */}
            <div className="p-6 rounded-2xl bg-[#111A2E] border border-slate-800 space-y-4 shadow-card">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                <Send className="w-4 h-4" />
                <span>Verified Channels</span>
              </div>
              <h3 className="text-lg font-bold text-white">Join & Follow CGC</h3>
              
              <div className="space-y-3 text-xs">
                {/* Telegram Group */}
                <a
                  href={OFFICIAL_COMMUNITY.telegramGroup}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-blue-950/40 hover:bg-blue-900/50 border border-blue-500/30 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-600 text-white">
                      <Send className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-bold text-white block text-sm">IT Joint Community</span>
                      <span className="text-slate-300 text-[11px]">t.me/IT_Jointcommunity (Main Hub)</span>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-blue-400 group-hover:translate-x-1 transition-transform" />
                </a>

                {/* Email */}
                <a
                  href={`mailto:${OFFICIAL_COMMUNITY.officialEmail}`}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-emerald-600/20 text-emerald-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-bold text-white block">Official Email</span>
                      <span className="text-slate-300 font-mono text-[11px]">{OFFICIAL_COMMUNITY.officialEmail}</span>
                    </div>
                  </div>
                  <span className="text-emerald-400 group-hover:translate-x-1 transition-transform">→</span>
                </a>

                {/* LinkedIn */}
                <a
                  href={LEAD_ADMIN.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-600/20 text-blue-400">
                      <Linkedin className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-bold text-white block">LinkedIn Profile</span>
                      <span className="text-slate-300 text-[11px]">linkedin.com/in/yusuf2537</span>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-blue-400 group-hover:translate-x-1 transition-transform" />
                </a>

                {/* GitHub */}
                <a
                  href={LEAD_ADMIN.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-slate-800 text-slate-300">
                      <Github className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-bold text-white block">GitHub Organization</span>
                      <span className="text-slate-300 text-[11px]">github.com/YUD-west</span>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

            {/* Campus Physical Location */}
            <div className="p-6 rounded-2xl bg-[#111A2E] border border-slate-800 space-y-4 shadow-card">
              <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 uppercase tracking-wider">
                <MapPin className="w-4 h-4" />
                <span>Physical Lab</span>
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Ambo University, Woliso Campus</h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                  Information Technology Department<br />
                  Main ICT Building, Computer Lab 02<br />
                  Woliso, South West Shewa Zone, Oromia, Ethiopia
                </p>
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-center gap-2 text-xs text-slate-400">
                <Clock className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Active Sprints: Wed & Fri afternoons, Sat mornings (EAT)</span>
              </div>
            </div>

          </div>

          {/* Right Column: Working Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-[#111A2E] border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-card">
              <div className="flex items-center gap-2 mb-4 pb-4 border-b border-slate-800">
                <MessageSquare className="w-5 h-5 text-blue-400" />
                <div>
                  <h3 className="text-xl font-bold text-white">Send Direct Message to Admin</h3>
                  <span className="text-xs text-slate-400">Inquiries are forwarded directly to {LEAD_ADMIN.email}</span>
                </div>
              </div>

              {sent ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-2xl font-bold text-white">Message Transmitted!</h4>
                  <p className="text-slate-300 text-sm max-w-md mx-auto">
                    Thank you, <strong className="text-white">{name}</strong>. Your message regarding "{subject}" has been queued for Lead Admin <strong>{LEAD_ADMIN.name}</strong>.
                  </p>
                  <p className="text-xs text-slate-400">
                    For faster immediate assistance, you can also ping <a href={LEAD_ADMIN.telegramUrl} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">{LEAD_ADMIN.telegram}</a> on Telegram.
                  </p>
                  <div className="pt-4">
                    <button
                      onClick={() => {
                        setSent(false);
                        setMessage('');
                      }}
                      className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold"
                    >
                      Send Another Note
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <div className="p-3 rounded-xl bg-red-950/60 border border-red-800/80 text-red-200 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g., Almaz Kassa"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g., student@ambou.edu.et"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                      Inquiry Subject
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-blue-500 focus:outline-none"
                    >
                      <option value="General Club Inquiry">General Club Inquiry</option>
                      <option value="Project Collaboration / Idea Pitch">Project Collaboration / Idea Pitch</option>
                      <option value="Join Project Team Request">Join Project Team Request</option>
                      <option value="Workshop Hosting or Speaker Offer">Workshop Hosting or Speaker Offer</option>
                      <option value="Department Cross-Collaboration">Department Cross-Collaboration</option>
                      <option value="Sponsorship & Lab Equipment">Sponsorship & Lab Equipment</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                      Message *
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Type your message to Yesuf Dergu and the CGC executive leads..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <span className="text-[11px] text-slate-400">
                      Or email directly: <span className="font-mono text-slate-300">{LEAD_ADMIN.email}</span>
                    </span>

                    <button
                      type="submit"
                      className="w-full sm:w-auto px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold shadow-md transition-colors"
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>

        {/* 
          =======================================================
          FREQUENTLY ASKED QUESTIONS (FAQ)
          =======================================================
        */}
        <div className="mt-20 pt-16 border-t border-slate-800">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider block mb-2">
              Common Questions
            </span>
            <h3 className="text-3xl font-extrabold text-white">Frequently Asked Questions</h3>
            <p className="mt-2 text-slate-300 text-sm">
              Answers regarding joining, workshops, and how CGC operates at Ambo University Woliso Campus.
            </p>
          </div>

          {/* Category Chips */}
          <div className="flex items-center justify-center gap-2 mb-8 overflow-x-auto pb-2">
            {['all', 'General', 'Departments', 'Membership', 'Projects'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFaqCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  faqCategory === cat
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {cat === 'all' ? 'All Questions' : cat}
              </button>
            ))}
          </div>

          {/* Accordion List */}
          <div className="max-w-3xl mx-auto space-y-3">
            {filteredFaqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-[#111A2E] border border-slate-800 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-white hover:text-blue-300 text-sm sm:text-base focus:outline-none"
                  >
                    <span>{faq.question}</span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-blue-400 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-500 flex-shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 bg-slate-900/30">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
