import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { CGCLogo } from '../components/Logo/CGCLogo';
import { 
  ShieldCheck, 
  Users, 
  CreditCard, 
  Zap, 
  AlertCircle, 
  CheckCircle2, 
  Search, 
  Filter, 
  RotateCw, 
  Clock, 
  Calendar,
  FileText,
  Activity,
  Check,
  X
} from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const { user, token, isAdmin } = useAuth();
  
  const [metrics, setMetrics] = useState<any | null>(null);
  const [activeTab, setActiveTab] = useState<'payments' | 'subscribers' | 'applications' | 'webhooks'>('payments');
  
  // Data states
  const [payments, setPayments] = useState<any[]>([]);
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [webhooks, setWebhooks] = useState<any[]>([]);

  // Search & filter
  const [paymentStatusFilter, setPaymentStatusFilter] = useState('ALL');
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

      // 2. Fetch Payments
      const pRes = await fetch(`/api/admin/payments?status=${paymentStatusFilter}&query=${encodeURIComponent(searchQuery)}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (pRes.ok) {
        const pData = await pRes.json();
        setPayments(pData.payments || []);
      }

      // 3. Fetch Subscriptions
      const sRes = await fetch('/api/admin/subscriptions', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (sRes.ok) {
        const sData = await sRes.json();
        setSubscriptions(sData.subscriptions || []);
      }

      // 4. Fetch Applications
      const aRes = await fetch('/api/admin/applications', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (aRes.ok) {
        const aData = await aRes.json();
        setApplications(aData.applications || []);
      }

      // 5. Fetch Webhook Logs
      const wRes = await fetch('/api/admin/webhooks', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (wRes.ok) {
        const wData = await wRes.json();
        setWebhooks(wData.events || []);
      }

    } catch (err) {
      console.error('Error fetching admin dashboard data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, [token, paymentStatusFilter, searchQuery]);

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

  const handleRunScheduler = async () => {
    if (!token) return;
    try {
      const res = await fetch('/api/admin/run-scheduler', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setActionMessage(`Lifecycle scheduler executed: processed ${data.result?.processed || 0} expired memberships.`);
        fetchAdminData();
        setTimeout(() => setActionMessage(null), 4000);
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
              Ambo University Woliso Campus — Subscriptions, Telebirr/CBE Payments & Member Registry
            </p>
          </div>
        </div>

        <button
          onClick={handleRunScheduler}
          className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 flex items-center gap-2 transition-colors"
        >
          <RotateCw className="w-3.5 h-3.5 text-blue-400" />
          <span>Run Renewal Scheduler</span>
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
            <span className="text-[11px] font-semibold uppercase text-slate-400">Active Subscribers</span>
            <Zap className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-extrabold text-white">{metrics?.activeSubscribers ?? 0}</div>
          <span className="text-[10px] text-slate-500">Paid passes in Woliso DB</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#111A2E] border border-slate-800">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-semibold uppercase text-slate-400">ETB Revenue</span>
            <CreditCard className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-extrabold text-amber-400">{metrics?.totalRevenueETB ?? 0} ETB</div>
          <span className="text-[10px] text-slate-500">Telebirr & CBE Birr volume</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#111A2E] border border-slate-800">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-semibold uppercase text-slate-400">Registered Students</span>
            <Users className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-extrabold text-white">{metrics?.totalUsers ?? 0}</div>
          <span className="text-[10px] text-slate-500">Verified student logins</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#111A2E] border border-slate-800">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-semibold uppercase text-slate-400">Pending Applications</span>
            <FileText className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-extrabold text-purple-400">{metrics?.pendingApplications ?? 0}</div>
          <span className="text-[10px] text-slate-500">Awaiting admin approval</span>
        </div>
      </div>

      {/* Main Tab Controller */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#111A2E] border border-slate-800 space-y-6">
        
        {/* Tab Buttons */}
        <div className="flex border-b border-slate-800 overflow-x-auto gap-2">
          <button
            onClick={() => setActiveTab('payments')}
            className={`py-3 px-4 text-xs font-bold uppercase tracking-wider border-b-2 whitespace-nowrap transition-all ${
              activeTab === 'payments'
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Payments & Transactions ({payments.length})
          </button>
          <button
            onClick={() => setActiveTab('subscribers')}
            className={`py-3 px-4 text-xs font-bold uppercase tracking-wider border-b-2 whitespace-nowrap transition-all ${
              activeTab === 'subscribers'
                ? 'border-emerald-500 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Subscribers ({subscriptions.length})
          </button>
          <button
            onClick={() => setActiveTab('applications')}
            className={`py-3 px-4 text-xs font-bold uppercase tracking-wider border-b-2 whitespace-nowrap transition-all ${
              activeTab === 'applications'
                ? 'border-purple-500 text-purple-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Student Join Forms ({applications.length})
          </button>
          <button
            onClick={() => setActiveTab('webhooks')}
            className={`py-3 px-4 text-xs font-bold uppercase tracking-wider border-b-2 whitespace-nowrap transition-all ${
              activeTab === 'webhooks'
                ? 'border-amber-500 text-amber-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Webhook Audit Logs ({webhooks.length})
          </button>
        </div>

        {/* TAB 1: PAYMENTS */}
        {activeTab === 'payments' && (
          <div className="space-y-4">
            {/* Filter & Search Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-slate-400" />
                <select
                  value={paymentStatusFilter}
                  onChange={(e) => setPaymentStatusFilter(e.target.value)}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none"
                >
                  <option value="ALL">All Statuses</option>
                  <option value="SUCCESS">Success Only</option>
                  <option value="PENDING">Pending Only</option>
                  <option value="FAILED">Failed Only</option>
                </select>
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search tx_ref, name or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none"
                />
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="text-[10px] uppercase text-slate-500 border-b border-slate-800 bg-slate-900/40">
                  <tr>
                    <th className="py-3 px-3">Date</th>
                    <th className="py-3 px-3">Reference</th>
                    <th className="py-3 px-3">Student</th>
                    <th className="py-3 px-3">Plan</th>
                    <th className="py-3 px-3">Amount</th>
                    <th className="py-3 px-3">Method</th>
                    <th className="py-3 px-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {payments.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-900/40">
                      <td className="py-3 px-3 text-slate-400">{p.created_at?.slice(0, 10)}</td>
                      <td className="py-3 px-3 font-mono text-[11px] text-white">{p.internal_ref}</td>
                      <td className="py-3 px-3">
                        <div className="text-white font-medium">{p.user_name}</div>
                        <div className="text-[10px] text-slate-400">{p.user_email}</div>
                      </td>
                      <td className="py-3 px-3 text-slate-200">{p.plan_name}</td>
                      <td className="py-3 px-3 font-bold text-emerald-400">{p.amount} {p.currency}</td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700">
                          {p.payment_method}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          p.status === 'SUCCESS'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : p.status === 'PENDING'
                            ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                            : 'bg-red-500/10 text-red-400 border border-red-500/20'
                        }`}>
                          {p.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: SUBSCRIBERS */}
        {activeTab === 'subscribers' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="text-[10px] uppercase text-slate-500 border-b border-slate-800 bg-slate-900/40">
                <tr>
                  <th className="py-3 px-3">Member</th>
                  <th className="py-3 px-3">Department</th>
                  <th className="py-3 px-3">Plan</th>
                  <th className="py-3 px-3">Period Start</th>
                  <th className="py-3 px-3">Expires / Next Bill</th>
                  <th className="py-3 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {subscriptions.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-900/40">
                    <td className="py-3 px-3">
                      <div className="text-white font-bold">{s.user_name}</div>
                      <div className="text-[10px] text-slate-400">{s.user_email}</div>
                    </td>
                    <td className="py-3 px-3 text-slate-300">{s.department || 'Informatics'}</td>
                    <td className="py-3 px-3 text-blue-300 font-medium">{s.plan_name}</td>
                    <td className="py-3 px-3 text-slate-400">{s.current_period_start?.slice(0, 10)}</td>
                    <td className="py-3 px-3 font-semibold text-emerald-400">{s.current_period_end?.slice(0, 10)}</td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        s.status === 'ACTIVE'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-slate-800 text-slate-400 border border-slate-700'
                      }`}>
                        {s.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 3: APPLICATIONS */}
        {activeTab === 'applications' && (
          <div className="space-y-4">
            <div className="text-xs text-slate-400">
              Review and approve student applications stored in the server SQLite database:
            </div>
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
                      <td className="py-3 px-3 text-slate-300">
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
          </div>
        )}

        {/* TAB 4: WEBHOOK AUDIT LOGS */}
        {activeTab === 'webhooks' && (
          <div className="space-y-4">
            <div className="text-xs text-slate-400">
              Audit log of asynchronous payment notifications and HMAC signature verifications:
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="text-[10px] uppercase text-slate-500 border-b border-slate-800 bg-slate-900/40">
                  <tr>
                    <th className="py-3 px-3">Received At</th>
                    <th className="py-3 px-3">Provider</th>
                    <th className="py-3 px-3">Idempotency Key</th>
                    <th className="py-3 px-3">Reference</th>
                    <th className="py-3 px-3">Processed Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {webhooks.map((w) => (
                    <tr key={w.id} className="hover:bg-slate-900/40">
                      <td className="py-3 px-3 text-slate-400">{w.created_at}</td>
                      <td className="py-3 px-3 text-blue-400 font-bold">{w.provider}</td>
                      <td className="py-3 px-3 font-mono text-[11px] text-slate-300">{w.idempotency_key}</td>
                      <td className="py-3 px-3 font-mono text-[11px] text-emerald-400">{w.provider_ref}</td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          {w.processed_status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
