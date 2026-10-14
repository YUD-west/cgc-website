import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { CGCLogo } from '../components/Logo/CGCLogo';
import { QRCodeView } from '../components/QRCodeView';
import { 
  ShieldCheck, 
  Users, 
  Layers, 
  Calendar, 
  AlertCircle, 
  CheckCircle2, 
  Search, 
  Filter, 
  RotateCw, 
  FileText,
  Check,
  X,
  QrCode,
  Plus,
  Trash2,
  Printer,
  Download,
  Lightbulb,
  Sparkles,
  Award,
  UserCheck,
  ChevronRight,
  Briefcase
} from 'lucide-react';
import { downloadBadgeAsPNG } from '../utils/exportBadge';

export const AdminDashboardPage: React.FC = () => {
  const { token, isAdmin } = useAuth();
  
  const [metrics, setMetrics] = useState<any | null>(null);
  const [activeTab, setActiveTab] = useState<'students' | 'applications' | 'qr-studio' | 'proposals' | 'rsvps'>('students');
  
  // Custom filter states
  const [appFilter, setAppFilter] = useState<'ALL' | 'WITH_IDEA' | 'PENDING' | 'APPROVED'>('ALL');
  const [proposalFilter, setProposalFilter] = useState<'ALL' | 'PENDING' | 'APPROVED' | 'REJECTED'>('ALL');
  
  // Data states
  const [students, setStudents] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [proposals, setProposals] = useState<any[]>([]);
  const [rsvps, setRsvps] = useState<any[]>([]);
  const [eventTickets, setEventTickets] = useState<any[]>([]);

  // Flexible Event Ticket Form State
  const [ticketTitle, setTicketTitle] = useState('Woliso Inter-Department Innovation Hackathon 2026');
  const [ticketType, setTicketType] = useState('Hackathon');
  const [ticketVenue, setTicketVenue] = useState('Computer Lab 02 & Main Hall');
  const [ticketDate, setTicketDate] = useState('March 28, 2026');
  const [ticketAccess, setTicketAccess] = useState('Full Hacker Clearance & Workstation Access');
  const [ticketCustomId, setTicketCustomId] = useState('EVT-HACK-2026-WL');
  const [generatingTicket, setGeneratingTicket] = useState(false);

  // Search & filter
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  const fetchAdminData = async () => {
    if (!token) return;
    setLoading(true);

    try {
      // 1. Fetch Metrics
      const mRes = await fetch('/api/admin/metrics', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (mRes.ok) setMetrics(await mRes.json());

      // 2. Fetch Students
      const stRes = await fetch(`/api/admin/students?query=${encodeURIComponent(searchQuery)}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (stRes.ok) {
        const stData = await stRes.json();
        setStudents(stData.students || []);
      }

      // 3. Fetch Applications
      const aRes = await fetch('/api/admin/applications', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (aRes.ok) {
        const aData = await aRes.json();
        setApplications(aData.applications || []);
      }

      // 4. Fetch Proposals
      const pRes = await fetch('/api/admin/proposals', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (pRes.ok) {
        const pData = await pRes.json();
        setProposals(pData.proposals || []);
      }

      // 5. Fetch RSVPs
      const rRes = await fetch('/api/admin/rsvps', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (rRes.ok) {
        const rData = await rRes.json();
        setRsvps(rData.rsvps || []);
      }

      // 6. Fetch Event Tickets (Flexible QR Studio)
      const tRes = await fetch('/api/admin/event-tickets', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (tRes.ok) {
        const tData = await tRes.json();
        setEventTickets(tData.tickets || []);
      }

    } catch (err) {
      console.error('Error fetching admin dashboard data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, [token, searchQuery]);

  const handleToggleUserMembership = async (userId: string, newStatus: string) => {
    if (!token) return;
    try {
      const res = await fetch(`/api/admin/users/${userId}/membership`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        setActionMessage(`Student status updated to ${newStatus}. Official QR code ${newStatus === 'APPROVED' ? 'activated' : 'deactivated'}.`);
        fetchAdminData();
        setTimeout(() => setActionMessage(null), 3500);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateEventTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !ticketTitle.trim() || !ticketVenue.trim()) return;
    try {
      setGeneratingTicket(true);
      const res = await fetch('/api/admin/event-tickets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          title: ticketTitle,
          eventType: ticketType,
          venue: ticketVenue,
          eventDate: ticketDate,
          accessLevel: ticketAccess,
          customId: ticketCustomId
        })
      });
      if (res.ok) {
        setActionMessage(`Event QR Ticket [${ticketCustomId}] successfully issued.`);
        fetchAdminData();
        setTimeout(() => setActionMessage(null), 3000);
      }
    } catch (err) {
      console.error('Error generating event ticket:', err);
    } finally {
      setGeneratingTicket(false);
    }
  };

  const handleDeleteEventTicket = async (ticketId: string) => {
    if (!token) return;
    try {
      const res = await fetch(`/api/admin/event-tickets/${ticketId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        setActionMessage(`Event Ticket ${ticketId} deleted.`);
        fetchAdminData();
        setTimeout(() => setActionMessage(null), 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateAppStatus = async (appId: string, newStatus: string) => {
    if (!token) return;
    try {
      const res = await fetch(`/api/admin/applications/${appId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        setActionMessage(
          newStatus === 'Approved'
            ? `Application approved! Official digital member pass & QR code issued.`
            : newStatus === 'Innovation Lead'
            ? `Special Approval: Fast-tracked as Innovation Lead! Project idea incubated & open for co-creators.`
            : `Application marked as ${newStatus}.`
        );
        fetchAdminData();
        setTimeout(() => setActionMessage(null), 4000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateProposalStatus = async (proposalId: string, newStatus: string) => {
    if (!token) return;
    try {
      const res = await fetch(`/api/admin/proposals/${proposalId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus, publishToCoCreator: true })
      });
      if (res.ok) {
        setActionMessage(
          newStatus === 'Approved'
            ? `Proposal approved! Published to Campus Co-Creator Board so students from all faculties can join the team.`
            : `Proposal marked as ${newStatus}.`
        );
        fetchAdminData();
        setTimeout(() => setActionMessage(null), 4000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDownloadEventTicketPNG = async (t?: any) => {
    try {
      const ticketToExport = t || {
        id: ticketCustomId,
        title: ticketTitle,
        event_type: ticketType,
        venue: ticketVenue,
        event_date: ticketDate,
        access_level: ticketAccess
      };

      await downloadBadgeAsPNG({
        memberId: ticketToExport.id,
        fullName: 'Authorized Attendee',
        email: 'cgc.woliso@ambo.edu.et',
        department: 'Ambo University Woliso Campus',
        track: ticketToExport.event_type || 'Innovation Event',
        role: `${(ticketToExport.event_type || 'EVENT').toUpperCase()} PASS`,
        accessLevel: ticketToExport.access_level || ticketToExport.accessLevel || 'Full Authorized Event Access',
        isEventTicket: true,
        eventTitle: ticketToExport.title,
        eventVenue: ticketToExport.venue,
        eventDate: ticketToExport.event_date || ticketToExport.eventDate
      });
      setActionMessage(`Downloaded badge PNG for ${ticketToExport.id}`);
      setTimeout(() => setActionMessage(null), 3000);
    } catch (e) {
      console.error('Download ticket error:', e);
    }
  };

  const handleDownloadStudentBadge = async (st: any) => {
    try {
      const passId = st.role === 'ADMIN' ? 'CGC-WL-2026-PRES' : `CGC-WL-2026-${st.id.slice(-4).toUpperCase()}`;
      await downloadBadgeAsPNG({
        memberId: passId,
        fullName: st.full_name,
        email: st.email,
        department: st.department || 'Informatics & Technology',
        yearOfStudy: st.year_of_study || '2nd Year Student',
        track: st.primary_track || 'Cybersecurity & Systems',
        role: st.role === 'ADMIN' ? 'Lead Administrator & Club President' : 'Official Verified Member',
        accessLevel: st.role === 'ADMIN' ? 'Full Executive Lab 02 & Systems Clearance' : 'Full Lab 02 Workstation & Innovation Hall Clearance',
        issuedAt: '2026'
      });
      setActionMessage(`Downloaded official ID badge for ${st.full_name}`);
      setTimeout(() => setActionMessage(null), 3000);
    } catch (e) {
      console.error('Download student badge error:', e);
    }
  };

  if (!isAdmin) {
    return (
      <div className="py-24 max-w-md mx-auto px-4 text-center space-y-4">
        <div className="w-12 h-12 bg-red-500/10 text-red-400 rounded-full flex items-center justify-center mx-auto border border-red-500/30">
          <AlertCircle className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold text-white">Access Denied</h2>
        <p className="text-xs text-slate-400">
          This portal is restricted to CGC Lead Administrators. Please log in with your authorized admin account.
        </p>
      </div>
    );
  }

  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-fade-in">
      
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#111A2E] border border-blue-900/60 shadow-glow-blue flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">CGC Administration Portal</span>
              <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-400 font-mono border border-emerald-500/20">
                LIVE DATABASE
              </span>
            </div>
            <h1 className="text-2xl font-extrabold text-white mt-0.5">
              Presidential Control Center • Yesuf Dergu
            </h1>
            <p className="text-xs text-slate-400">
              Ambo University Woliso Campus — Community Registry, Member Reviews & Student Innovation
            </p>
          </div>
        </div>

        <button
          onClick={fetchAdminData}
          className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 flex items-center gap-2 transition-colors"
        >
          <RotateCw className="w-3.5 h-3.5 text-blue-400" />
          <span>Refresh Data</span>
        </button>
      </div>

      {actionMessage && (
        <div className="p-3.5 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
          <span>{actionMessage}</span>
        </div>
      )}

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#111A2E] border border-slate-800">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-semibold uppercase text-slate-400">Registered Students</span>
            <Users className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-extrabold text-white">{metrics?.totalStudents ?? 0}</div>
          <span className="text-[10px] text-slate-500">Student accounts in Woliso DB</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#111A2E] border border-slate-800">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-semibold uppercase text-slate-400">Member Applications</span>
            <FileText className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-extrabold text-emerald-400">{metrics?.totalApplications ?? 0}</div>
          <span className="text-[10px] text-slate-500">Official cohort submissions</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#111A2E] border border-slate-800">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-semibold uppercase text-slate-400">Project Proposals</span>
            <Layers className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-extrabold text-purple-400">{metrics?.totalProposals ?? 0}</div>
          <span className="text-[10px] text-slate-500">Student ideas incubating</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#111A2E] border border-slate-800">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-semibold uppercase text-slate-400">Workshop RSVPs</span>
            <Calendar className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-extrabold text-amber-400">{metrics?.totalRsvps ?? 0}</div>
          <span className="text-[10px] text-slate-500">Lab attendance passes</span>
        </div>
      </div>

      {/* Main Tab Controller */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#111A2E] border border-slate-800 space-y-6">
        
        {/* Tab Buttons */}
        <div className="flex border-b border-slate-800 overflow-x-auto gap-2">
          <button
            onClick={() => setActiveTab('students')}
            className={`py-3 px-4 text-xs font-bold uppercase tracking-wider border-b-2 whitespace-nowrap transition-all ${
              activeTab === 'students'
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Registered Students ({students.length})
          </button>
          <button
            onClick={() => setActiveTab('applications')}
            className={`py-3 px-4 text-xs font-bold uppercase tracking-wider border-b-2 whitespace-nowrap transition-all ${
              activeTab === 'applications'
                ? 'border-emerald-500 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Member Applications ({applications.length})
          </button>
          <button
            onClick={() => setActiveTab('proposals')}
            className={`py-3 px-4 text-xs font-bold uppercase tracking-wider border-b-2 whitespace-nowrap transition-all ${
              activeTab === 'proposals'
                ? 'border-purple-500 text-purple-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Project Proposals ({proposals.length})
          </button>
          <button
            onClick={() => setActiveTab('qr-studio')}
            className={`py-3 px-4 text-xs font-bold uppercase tracking-wider border-b-2 whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'qr-studio'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>Event QR Studio ({eventTickets.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('rsvps')}
            className={`py-3 px-4 text-xs font-bold uppercase tracking-wider border-b-2 whitespace-nowrap transition-all ${
              activeTab === 'rsvps'
                ? 'border-amber-500 text-amber-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Workshop RSVPs ({rsvps.length})
          </button>
        </div>

        {/* TAB 1: REGISTERED STUDENTS & APPROVALS */}
        {activeTab === 'students' && (
          <div className="space-y-4">
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search students by name, email or dept..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none"
              />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="text-[10px] uppercase text-slate-500 border-b border-slate-800 bg-slate-900/40">
                  <tr>
                    <th className="py-3 px-3">Student Name</th>
                    <th className="py-3 px-3">Email</th>
                    <th className="py-3 px-3">Department & Year</th>
                    <th className="py-3 px-3">Membership & QR Status</th>
                    <th className="py-3 px-3">Executive Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {students.map((st) => {
                    const isApproved = st.role === 'ADMIN' || st.membership_status === 'APPROVED';
                    return (
                      <tr key={st.id} className="hover:bg-slate-900/40">
                        <td className="py-3 px-3 font-bold text-white">{st.full_name}</td>
                        <td className="py-3 px-3 font-mono text-slate-300">{st.email}</td>
                        <td className="py-3 px-3">
                          <div className="text-white">{st.department || 'Informatics'}</div>
                          <div className="text-[10px] text-slate-400">{st.year_of_study || '2nd Year'}</div>
                        </td>
                        <td className="py-3 px-3">
                          {st.role === 'ADMIN' ? (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                              Executive Admin
                            </span>
                          ) : isApproved ? (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1 w-fit">
                              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                              Approved (QR Active)
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20 w-fit">
                              Provisional (No QR)
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-2">
                            {isApproved && (
                              <button
                                onClick={() => handleDownloadStudentBadge(st)}
                                className="p-1.5 rounded-lg bg-slate-800 hover:bg-emerald-900/30 text-slate-300 hover:text-emerald-400 border border-slate-700/60 transition flex items-center gap-1 text-[11px]"
                                title="Download Official PNG ID Badge"
                              >
                                <Download className="w-3.5 h-3.5 text-emerald-400" />
                                <span className="hidden sm:inline">Badge</span>
                              </button>
                            )}

                            {st.role !== 'ADMIN' && (
                              isApproved ? (
                                <button
                                  onClick={() => handleToggleUserMembership(st.id, 'PENDING')}
                                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-rose-900/30 text-slate-400 hover:text-rose-400 text-[11px] border border-slate-700/60 transition"
                                >
                                  Revoke
                                </button>
                              ) : (
                                <button
                                  onClick={() => handleToggleUserMembership(st.id, 'APPROVED')}
                                  className="px-3 py-1 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-[11px] shadow-sm transition flex items-center gap-1"
                                >
                                  <Check className="w-3 h-3" />
                                  <span>Approve & Issue QR</span>
                                </button>
                              )
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB: EVENT QR STUDIO */}
        {activeTab === 'qr-studio' && (
          <div className="space-y-8 animate-fade-in">
            {/* Header info */}
            <div className="pb-4 border-b border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-[10px] font-bold uppercase tracking-wider mb-1">
                  <QrCode className="w-3 h-3" />
                  Executive Event Pass Engine
                </div>
                <h3 className="text-lg font-bold text-white">Event, Hackathon & Lecture QR Ticket Studio</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Issue verifiable entrance passes and workstation badges for coding sprints, hackathons, and guest lectures at Ambo University, Woliso Campus.
                </p>
              </div>
            </div>

            {/* Form & Live Badge Preview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              {/* Left Column: Generator Form */}
              <form onSubmit={handleCreateEventTicket} className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4 text-xs">
                <h4 className="font-bold text-white text-sm flex items-center gap-2">
                  <Plus className="w-4 h-4 text-blue-400" />
                  <span>Configure Event Pass</span>
                </h4>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Event / Ticket Title *</label>
                  <input
                    type="text"
                    required
                    value={ticketTitle}
                    onChange={(e) => setTicketTitle(e.target.value)}
                    placeholder="e.g. Cursor Hackathon 2026 Finals"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Event Category *</label>
                    <select
                      value={ticketType}
                      onChange={(e) => {
                        setTicketType(e.target.value);
                        setTicketCustomId(`EVT-${e.target.value.slice(0, 4).toUpperCase()}-${Date.now().toString().slice(-4)}`);
                      }}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-blue-500"
                    >
                      <option value="Hackathon">🏆 Hackathon</option>
                      <option value="Lecture">🎓 Lecture / Masterclass</option>
                      <option value="Coding Challenge">💻 Coding Challenge</option>
                      <option value="Special Event">🎟️ Special Event</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Pass ID / Code *</label>
                    <input
                      type="text"
                      required
                      value={ticketCustomId}
                      onChange={(e) => setTicketCustomId(e.target.value)}
                      placeholder="e.g. EVT-HACK-2026-WL"
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white font-mono placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Venue *</label>
                    <input
                      type="text"
                      required
                      value={ticketVenue}
                      onChange={(e) => setTicketVenue(e.target.value)}
                      placeholder="e.g. Computer Lab 02"
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Date *</label>
                    <input
                      type="text"
                      required
                      value={ticketDate}
                      onChange={(e) => setTicketDate(e.target.value)}
                      placeholder="e.g. March 28, 2026"
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Access Clearance *</label>
                  <input
                    type="text"
                    required
                    value={ticketAccess}
                    onChange={(e) => setTicketAccess(e.target.value)}
                    placeholder="e.g. Full Hacker Workstation & Lab 02 Clearance"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={generatingTicket}
                    className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-glow-blue disabled:opacity-50 transition"
                  >
                    {generatingTicket ? 'Issuing Ticket...' : 'Issue & Authorize Event QR Pass'}
                  </button>
                </div>
              </form>

              {/* Right Column: Live Printable Badge Preview */}
              <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-slate-900 via-[#10192e] to-[#142340] border border-blue-500/40 shadow-2xl relative space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <CGCLogo variant="full" size="sm" showTagline={false} />
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                    {ticketType.toUpperCase()} PASS
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-semibold">Event Name</span>
                    <h4 className="text-base font-bold text-white">{ticketTitle}</h4>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase font-semibold">Venue</span>
                      <div className="text-slate-200 font-semibold">{ticketVenue}</div>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase font-semibold">Date</span>
                      <div className="text-slate-200 font-semibold">{ticketDate}</div>
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-semibold">Clearance</span>
                    <div className="text-emerald-400 font-mono font-semibold">{ticketAccess}</div>
                  </div>
                </div>

                {/* Scannable QR Code */}
                <div className="py-3 flex flex-col items-center justify-center bg-slate-900/80 p-3 rounded-2xl border border-slate-800">
                  <QRCodeView
                    value={typeof window !== 'undefined' ? `${window.location.origin}/#verify/${ticketCustomId}` : `http://localhost:3000/#verify/${ticketCustomId}`}
                    size={110}
                    label="Official Event Entry QR"
                  />
                  <span className="text-[11px] font-mono text-blue-400 mt-1 font-bold">{ticketCustomId}</span>
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-2">
                  <span className="text-[10px] text-slate-500 font-mono">Issuer: Yesuf Dergu (Lead Admin)</span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleDownloadEventTicketPNG()}
                      className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-semibold flex items-center gap-1.5 transition shadow-sm active:scale-95"
                      title="Download high-res PNG event pass"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download PNG</span>
                    </button>
                    <button
                      onClick={() => window.print()}
                      className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 flex items-center gap-1.5 transition"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Print</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Issued Event Tickets Table */}
            <div className="pt-6 border-t border-slate-800 space-y-3">
              <h4 className="text-sm font-bold text-white">Active Authorized Event Tickets ({eventTickets.length})</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="text-[10px] uppercase text-slate-500 border-b border-slate-800 bg-slate-900/40">
                    <tr>
                      <th className="py-2.5 px-3">Ticket ID</th>
                      <th className="py-2.5 px-3">Event Title</th>
                      <th className="py-2.5 px-3">Category</th>
                      <th className="py-2.5 px-3">Venue & Date</th>
                      <th className="py-2.5 px-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {eventTickets.map((t) => (
                      <tr key={t.id} className="hover:bg-slate-900/40">
                        <td className="py-2.5 px-3 font-mono text-blue-400 font-bold">{t.id}</td>
                        <td className="py-2.5 px-3 text-white font-semibold">{t.title}</td>
                        <td className="py-2.5 px-3">
                          <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300 border border-slate-700">
                            {t.event_type}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-slate-400">
                          <div>{t.venue}</div>
                          <div className="text-[10px] text-slate-500">{t.event_date}</div>
                        </td>
                        <td className="py-2.5 px-3">
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => handleDownloadEventTicketPNG(t)}
                              className="p-1 rounded bg-slate-800 hover:bg-emerald-900/30 text-slate-400 hover:text-emerald-400 transition"
                              title="Download Ticket PNG"
                            >
                              <Download className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteEventTicket(t.id)}
                              className="p-1 rounded bg-slate-800 hover:bg-rose-900/30 text-slate-400 hover:text-rose-400 transition"
                              title="Delete Ticket"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: APPLICATIONS */}
        {activeTab === 'applications' && (
          <div className="space-y-4">
            {/* Filter Pills */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-slate-800">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setAppFilter('ALL')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                    appFilter === 'ALL'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  All Applications ({applications.length})
                </button>
                <button
                  onClick={() => setAppFilter('WITH_IDEA')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${
                    appFilter === 'WITH_IDEA'
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                      : 'bg-amber-500/10 text-amber-300 border border-amber-500/20 hover:bg-amber-500/20'
                  }`}
                >
                  <Lightbulb className="w-3.5 h-3.5" />
                  <span>Has Innovation Idea ({applications.filter((a) => a.project_idea?.trim()).length})</span>
                </button>
                <button
                  onClick={() => setAppFilter('PENDING')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                    appFilter === 'PENDING'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  ⏳ Needs Review ({applications.filter((a) => a.status === 'Reviewing' || a.status === 'Pending').length})
                </button>
                <button
                  onClick={() => setAppFilter('APPROVED')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                    appFilter === 'APPROVED'
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  ✓ Approved ({applications.filter((a) => a.status === 'Approved' || a.status === 'Innovation Lead').length})
                </button>
              </div>

              <span className="text-[11px] text-slate-400">
                Ambo University Woliso Campus Cohort Registry
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="text-[10px] uppercase text-slate-500 border-b border-slate-800 bg-slate-900/40">
                  <tr>
                    <th className="py-3 px-3">Date</th>
                    <th className="py-3 px-3">Student Name</th>
                    <th className="py-3 px-3">Department & Year</th>
                    <th className="py-3 px-3">Track & Level</th>
                    <th className="py-3 px-3">Innovation Vision & Statement</th>
                    <th className="py-3 px-3">Pass & QR Status</th>
                    <th className="py-3 px-3">Executive Decision</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {applications
                    .filter((app) => {
                      if (appFilter === 'WITH_IDEA') return Boolean(app.project_idea && app.project_idea.trim().length > 3);
                      if (appFilter === 'PENDING') return app.status === 'Reviewing' || app.status === 'Pending';
                      if (appFilter === 'APPROVED') return app.status === 'Approved' || app.status === 'Innovation Lead';
                      return true;
                    })
                    .map((app) => {
                      const hasIdea = Boolean(app.project_idea && app.project_idea.trim().length > 3);
                      const isApproved = app.status === 'Approved' || app.status === 'Innovation Lead';

                      return (
                        <tr key={app.id} className="hover:bg-slate-900/40 transition-colors">
                          <td className="py-3 px-3 text-slate-400 whitespace-nowrap">{app.submitted_at?.slice(0, 10)}</td>
                          <td className="py-3 px-3">
                            <div className="text-white font-bold">{app.full_name}</div>
                            <div className="text-[10px] text-slate-400 font-mono">{app.email}</div>
                            {app.phone && <div className="text-[10px] text-slate-500">{app.phone}</div>}
                          </td>
                          <td className="py-3 px-3">
                            <div className="text-white font-medium">{app.department}</div>
                            <div className="text-[10px] text-slate-400">{app.year_of_study}</div>
                          </td>
                          <td className="py-3 px-3">
                            <span className="text-blue-400 font-semibold">{app.primary_track}</span>
                            <span className="text-[10px] text-slate-400 block">{app.skill_level}</span>
                          </td>
                          <td className="py-3 px-3 max-w-md">
                            {hasIdea ? (
                              <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs space-y-1 mb-1">
                                <div className="flex items-center gap-1 text-[10px] font-bold text-amber-400 uppercase tracking-wide">
                                  <Sparkles className="w-3 h-3" />
                                  <span>Change-Making Project Idea</span>
                                </div>
                                <p className="line-clamp-2 text-slate-200" title={app.project_idea}>
                                  "{app.project_idea}"
                                </p>
                              </div>
                            ) : null}
                            <div className="text-slate-300 text-[11px] line-clamp-2" title={app.why_join}>
                              <span className="text-slate-500 font-semibold">Why: </span>
                              {app.why_join}
                            </div>
                            {app.learning_goals && (
                              <div className="text-[10px] text-slate-400 line-clamp-1 mt-0.5" title={app.learning_goals}>
                                <span className="text-slate-500">Goals: </span>
                                {app.learning_goals}
                              </div>
                            )}
                          </td>
                          <td className="py-3 px-3 whitespace-nowrap">
                            <span
                              className={`px-2.5 py-1 rounded text-[10px] font-bold inline-flex items-center gap-1 ${
                                app.status === 'Innovation Lead'
                                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                                  : app.status === 'Approved'
                                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                  : app.status === 'Rejected'
                                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                                  : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                              }`}
                            >
                              {app.status === 'Innovation Lead' ? (
                                <>
                                  <Award className="w-3 h-3" />
                                  <span>Innovation Lead</span>
                                </>
                              ) : isApproved ? (
                                <>
                                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                                  <span>Approved (QR Pass Active)</span>
                                </>
                              ) : app.status === 'Rejected' ? (
                                <>
                                  <X className="w-3 h-3 text-rose-400" />
                                  <span>Rejected</span>
                                </>
                              ) : (
                                <span>⏳ Reviewing</span>
                              )}
                            </span>
                          </td>
                          <td className="py-3 px-3">
                            <div className="flex flex-wrap items-center gap-1.5">
                              {!isApproved ? (
                                <>
                                  <button
                                    onClick={() => handleUpdateAppStatus(app.id, 'Approved')}
                                    className="px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-[11px] shadow-sm transition flex items-center gap-1"
                                    title="Approve Member & Activate Official QR Pass"
                                  >
                                    <Check className="w-3.5 h-3.5" />
                                    <span>Approve Pass</span>
                                  </button>

                                  {hasIdea && (
                                    <button
                                      onClick={() => handleUpdateAppStatus(app.id, 'Innovation Lead')}
                                      className="px-2.5 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-[11px] shadow-sm transition flex items-center gap-1"
                                      title="Designate as Innovation Lead & Incubate Project on Co-Creator Board"
                                    >
                                      <Sparkles className="w-3 h-3" />
                                      <span>Fast-Track Lead</span>
                                    </button>
                                  )}

                                  <button
                                    onClick={() => handleUpdateAppStatus(app.id, 'Rejected')}
                                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-900/30 text-slate-400 hover:text-rose-400 border border-slate-700/60 transition"
                                    title="Reject Application"
                                  >
                                    <X className="w-3.5 h-3.5" />
                                  </button>
                                </>
                              ) : (
                                <>
                                  <button
                                    onClick={() =>
                                      handleDownloadStudentBadge({
                                        id: app.id,
                                        full_name: app.full_name,
                                        email: app.email,
                                        department: app.department,
                                        year_of_study: app.year_of_study,
                                        primary_track: app.primary_track,
                                        role: app.status === 'Innovation Lead' ? 'Innovation Lead' : 'Official Verified Member'
                                      })
                                    }
                                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-emerald-900/30 text-slate-300 hover:text-emerald-400 border border-slate-700/60 transition flex items-center gap-1 text-[11px]"
                                    title="Download Official ID Badge PNG"
                                  >
                                    <Download className="w-3.5 h-3.5 text-emerald-400" />
                                    <span>Badge</span>
                                  </button>

                                  <button
                                    onClick={() => handleUpdateAppStatus(app.id, 'Rejected')}
                                    className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-rose-900/30 text-slate-400 hover:text-rose-400 text-[10px] border border-slate-700/60 transition"
                                  >
                                    Revoke
                                  </button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: PROPOSALS */}
        {activeTab === 'proposals' && (
          <div className="space-y-4">
            {/* Header info */}
            <div className="pb-3 border-b border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Layers className="w-4 h-4 text-purple-400" />
                  <span>Student Project Proposals & Innovation Pipeline</span>
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Review student initiatives from across Ambo University. Approving a proposal activates it for Lab 02 incubation and immediately publishes open co-creator roles to give other students the chance to join.
                </p>
              </div>

              {/* Filter Pills */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setProposalFilter('ALL')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                    proposalFilter === 'ALL'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  All ({proposals.length})
                </button>
                <button
                  onClick={() => setProposalFilter('PENDING')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                    proposalFilter === 'PENDING'
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                      : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  ⏳ Awaiting Review ({proposals.filter((p) => !p.status || p.status === 'Reviewing' || p.status === 'Incubating').length})
                </button>
                <button
                  onClick={() => setProposalFilter('APPROVED')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                    proposalFilter === 'APPROVED'
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  ✓ Approved ({proposals.filter((p) => p.status === 'Approved').length})
                </button>
                <button
                  onClick={() => setProposalFilter('REJECTED')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                    proposalFilter === 'REJECTED'
                      ? 'bg-rose-600 text-white shadow-sm'
                      : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  ✕ Rejected ({proposals.filter((p) => p.status === 'Rejected').length})
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="text-[10px] uppercase text-slate-500 border-b border-slate-800 bg-slate-900/40">
                  <tr>
                    <th className="py-3 px-3">Date</th>
                    <th className="py-3 px-3">Project Title</th>
                    <th className="py-3 px-3">Student Proposer</th>
                    <th className="py-3 px-3">Problem Statement & Proposed Solution</th>
                    <th className="py-3 px-3">Co-Creator Roles Needed</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3">Executive Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {proposals
                    .filter((pr) => {
                      if (proposalFilter === 'PENDING') return !pr.status || pr.status === 'Reviewing' || pr.status === 'Incubating';
                      if (proposalFilter === 'APPROVED') return pr.status === 'Approved';
                      if (proposalFilter === 'REJECTED') return pr.status === 'Rejected';
                      return true;
                    })
                    .map((pr) => {
                      const isApproved = pr.status === 'Approved';
                      const isRejected = pr.status === 'Rejected';
                      const rolesList = (pr.needed_roles || 'Developers, Designers').split(',').map((r: string) => r.trim()).filter(Boolean);

                      return (
                        <tr key={pr.id} className="hover:bg-slate-900/40 transition-colors">
                          <td className="py-3 px-3 text-slate-400 whitespace-nowrap">{pr.submitted_at?.slice(0, 10)}</td>
                          <td className="py-3 px-3">
                            <div className="font-bold text-white text-sm">{pr.title}</div>
                            <span className="text-[10px] text-blue-400 font-mono">{pr.id}</span>
                          </td>
                          <td className="py-3 px-3">
                            <div className="text-white font-semibold">{pr.proposer_name}</div>
                            <div className="text-[10px] text-slate-400">{pr.proposer_department}</div>
                            {pr.proposer_email && (
                              <div className="text-[10px] text-slate-500 font-mono">{pr.proposer_email}</div>
                            )}
                          </td>
                          <td className="py-3 px-3 max-w-sm">
                            <div className="text-slate-200 text-xs line-clamp-2" title={pr.problem_statement}>
                              <strong className="text-slate-400">Problem: </strong>{pr.problem_statement}
                            </div>
                            {pr.proposed_solution && (
                              <div className="text-emerald-300 text-[11px] line-clamp-2 mt-1 bg-emerald-950/20 p-1.5 rounded-lg border border-emerald-500/20" title={pr.proposed_solution}>
                                <strong>Solution: </strong>{pr.proposed_solution}
                              </div>
                            )}
                          </td>
                          <td className="py-3 px-3">
                            <div className="flex flex-wrap gap-1 max-w-xs">
                              {rolesList.map((role: string, idx: number) => (
                                <span
                                  key={idx}
                                  className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-blue-500/10 text-blue-300 border border-blue-500/20"
                                >
                                  {role}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="py-3 px-3 whitespace-nowrap">
                            <span
                              className={`px-2.5 py-1 rounded text-[10px] font-bold inline-flex items-center gap-1 ${
                                isApproved
                                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                  : isRejected
                                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                                  : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                              }`}
                            >
                              {isApproved ? (
                                <>
                                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                                  <span>Approved & Recruiting</span>
                                </>
                              ) : isRejected ? (
                                <>
                                  <X className="w-3 h-3 text-rose-400" />
                                  <span>Rejected</span>
                                </>
                              ) : (
                                <>
                                  <Sparkles className="w-3 h-3 text-cyan-400" />
                                  <span>Incubating in Lab 02</span>
                                </>
                              )}
                            </span>
                          </td>
                          <td className="py-3 px-3">
                            <div className="flex flex-wrap items-center gap-1.5">
                              {!isApproved ? (
                                <button
                                  onClick={() => handleUpdateProposalStatus(pr.id, 'Approved')}
                                  className="px-2.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-[11px] shadow-sm transition flex items-center gap-1 whitespace-nowrap"
                                  title="Approve Proposal & Automatically Publish Open Co-Creator Call so other students can join"
                                >
                                  <Check className="w-3.5 h-3.5" />
                                  <span>Approve & Open Team Board</span>
                                </button>
                              ) : (
                                <button
                                  onClick={() => handleUpdateProposalStatus(pr.id, 'Incubating')}
                                  className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] border border-slate-700 transition"
                                  title="Keep Incubating"
                                >
                                  Keep Incubating
                                </button>
                              )}

                              {!isRejected ? (
                                <button
                                  onClick={() => handleUpdateProposalStatus(pr.id, 'Rejected')}
                                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-900/30 text-slate-400 hover:text-rose-400 border border-slate-700/60 transition"
                                  title="Reject Proposal"
                                >
                                  <X className="w-3.5 h-3.5" />
                                </button>
                              ) : (
                                <button
                                  onClick={() => handleUpdateProposalStatus(pr.id, 'Approved')}
                                  className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-emerald-900/30 text-slate-300 hover:text-emerald-400 text-[10px] border border-slate-700 transition"
                                >
                                  Re-Approve
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: RSVPS */}
        {activeTab === 'rsvps' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="text-[10px] uppercase text-slate-500 border-b border-slate-800 bg-slate-900/40">
                <tr>
                  <th className="py-3 px-3">Date</th>
                  <th className="py-3 px-3">Student Name</th>
                  <th className="py-3 px-3">Email</th>
                  <th className="py-3 px-3">Department</th>
                  <th className="py-3 px-3">Ticket ID</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {rsvps.map((rv) => (
                  <tr key={rv.id} className="hover:bg-slate-900/40">
                    <td className="py-3 px-3 text-slate-400">{rv.submitted_at?.slice(0, 10)}</td>
                    <td className="py-3 px-3 font-bold text-white">{rv.name}</td>
                    <td className="py-3 px-3 text-slate-300">{rv.email}</td>
                    <td className="py-3 px-3 text-slate-400">{rv.department}</td>
                    <td className="py-3 px-3 font-mono text-emerald-400">{rv.ticket_id}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>

    </div>
  );
};
