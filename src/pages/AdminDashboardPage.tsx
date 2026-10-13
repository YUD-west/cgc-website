import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { CGCLogo } from '../components/Logo/CGCLogo';
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
  X
} from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const { token, isAdmin } = useAuth();
  
  const [metrics, setMetrics] = useState<any | null>(null);
  const [activeTab, setActiveTab] = useState<'students' | 'applications' | 'proposals' | 'rsvps'>('students');
  
  // Data states
  const [students, setStudents] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [proposals, setProposals] = useState<any[]>([]);
  const [rsvps, setRsvps] = useState<any[]>([]);

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

    } catch (err) {
      console.error('Error fetching admin dashboard data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, [token, searchQuery]);

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
        setActionMessage(`Application ${appId} marked as ${newStatus}.`);
        fetchAdminData();
        setTimeout(() => setActionMessage(null), 3000);
      }
    } catch (err) {
      console.error(err);
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

        {/* TAB 1: REGISTERED STUDENTS */}
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
                    <th className="py-3 px-3">Telegram</th>
                    <th className="py-3 px-3">Registered Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {students.map((st) => (
                    <tr key={st.id} className="hover:bg-slate-900/40">
                      <td className="py-3 px-3 font-bold text-white">{st.full_name}</td>
                      <td className="py-3 px-3 font-mono text-slate-300">{st.email}</td>
                      <td className="py-3 px-3">
                        <div className="text-white">{st.department || 'Informatics'}</div>
                        <div className="text-[10px] text-slate-400">{st.year_of_study || '2nd Year'}</div>
                      </td>
                      <td className="py-3 px-3 text-blue-400 font-mono">{st.telegram || '—'}</td>
                      <td className="py-3 px-3 text-slate-400">{st.created_at?.slice(0, 10)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: APPLICATIONS */}
        {activeTab === 'applications' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="text-[10px] uppercase text-slate-500 border-b border-slate-800 bg-slate-900/40">
                <tr>
                  <th className="py-3 px-3">Date</th>
                  <th className="py-3 px-3">Student Name</th>
                  <th className="py-3 px-3">Department & Year</th>
                  <th className="py-3 px-3">Track & Level</th>
                  <th className="py-3 px-3">Why Join</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {applications.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-900/40">
                    <td className="py-3 px-3 text-slate-400">{app.submitted_at?.slice(0, 10)}</td>
                    <td className="py-3 px-3">
                      <div className="text-white font-bold">{app.full_name}</div>
                      <div className="text-[10px] text-slate-400">{app.email}</div>
                    </td>
                    <td className="py-3 px-3">
                      <div>{app.department}</div>
                      <div className="text-[10px] text-slate-400">{app.year_of_study}</div>
                    </td>
                    <td className="py-3 px-3">
                      <span className="text-blue-400 font-semibold">{app.primary_track}</span>
                      <span className="text-[10px] text-slate-400 block">{app.skill_level}</span>
                    </td>
                    <td className="py-3 px-3 max-w-xs truncate text-slate-300" title={app.why_join}>
                      {app.why_join}
                    </td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        app.status === 'Approved'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : app.status === 'Rejected'
                          ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                          : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      }`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-1.5">
                        {app.status !== 'Approved' && (
                          <button
                            onClick={() => handleUpdateAppStatus(app.id, 'Approved')}
                            className="p-1 rounded bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white transition-colors"
                            title="Approve Member"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                        )}
                        {app.status !== 'Rejected' && (
                          <button
                            onClick={() => handleUpdateAppStatus(app.id, 'Rejected')}
                            className="p-1 rounded bg-red-600/20 hover:bg-red-600 text-red-300 hover:text-white transition-colors"
                            title="Reject"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 3: PROPOSALS */}
        {activeTab === 'proposals' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="text-[10px] uppercase text-slate-500 border-b border-slate-800 bg-slate-900/40">
                <tr>
                  <th className="py-3 px-3">Date</th>
                  <th className="py-3 px-3">Project Title</th>
                  <th className="py-3 px-3">Student Lead</th>
                  <th className="py-3 px-3">Problem Statement</th>
                  <th className="py-3 px-3">Needed Roles</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {proposals.map((pr) => (
                  <tr key={pr.id} className="hover:bg-slate-900/40">
                    <td className="py-3 px-3 text-slate-400">{pr.submitted_at?.slice(0, 10)}</td>
                    <td className="py-3 px-3 font-bold text-white">{pr.title}</td>
                    <td className="py-3 px-3">
                      <div className="text-white">{pr.proposer_name}</div>
                      <div className="text-[10px] text-slate-400">{pr.proposer_department}</div>
                    </td>
                    <td className="py-3 px-3 max-w-sm truncate text-slate-300" title={pr.problem_statement}>
                      {pr.problem_statement}
                    </td>
                    <td className="py-3 px-3 text-blue-400">{pr.needed_roles}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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
