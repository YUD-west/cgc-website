import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { CGCLogo } from '../components/Logo/CGCLogo';
import { 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Calendar, 
  CreditCard, 
  ShieldCheck, 
  Zap, 
  RotateCw, 
  Smartphone,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

interface UserDashboardProps {
  onOpenSubscriptionModal: () => void;
  onNavigate: (tab: string) => void;
}

export const UserDashboardPage: React.FC<UserDashboardProps> = ({
  onOpenSubscriptionModal,
  onNavigate
}) => {
  const { user, token, activeSubscription, refreshUser } = useAuth();
  const [subscriptionData, setSubscriptionData] = useState<any | null>(null);
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const fetchDashboardData = async () => {
    if (!token) return;
    try {
      const res = await fetch('/api/subscriptions/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setSubscriptionData(data.subscription);
        setPayments(data.payments || []);
      }
    } catch (err) {
      console.error('Failed to load user subscription data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [token]);

  const handleCancelRenewal = async () => {
    if (!token || !confirm('Are you sure you want to turn off renewal? Your subscription will remain active until the end of your paid period.')) return;
    setActionLoading(true);
    setMessage(null);

    try {
      const res = await fetch('/api/subscriptions/cancel', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) {
        setMessage({ text: data.message, type: 'success' });
        await fetchDashboardData();
        await refreshUser();
      } else {
        setMessage({ text: data.error || 'Failed to cancel renewal', type: 'error' });
      }
    } catch (err: any) {
      setMessage({ text: err.message, type: 'error' });
    } finally {
      setActionLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="py-24 max-w-xl mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Member Portal</h2>
        <p className="text-slate-400 text-sm mb-6">Please log in to view your CGC membership pass and active subscriptions.</p>
      </div>
    );
  }

  const sub = subscriptionData || activeSubscription;

  return (
    <div className="py-12 sm:py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 animate-fade-in">
      
      {/* Top Welcome Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-[#111A2E] border border-slate-800 shadow-card">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Member Dashboard</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Welcome, {user.fullName}
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            {user.department || 'Informatics'} • Ambo University, Woliso Campus
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('projects')}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
          >
            Explore Projects
          </button>
          {!sub && (
            <button
              onClick={onOpenSubscriptionModal}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-glow-blue transition-colors"
            >
              Subscribe with Telebirr / CBE Birr →
            </button>
          )}
        </div>
      </div>

      {message && (
        <div className={`p-4 rounded-2xl text-xs flex items-center gap-2 ${
          message.type === 'success'
            ? 'bg-emerald-950/60 border border-emerald-500/40 text-emerald-300'
            : 'bg-red-950/60 border border-red-500/40 text-red-300'
        }`}>
          {message.type === 'success' ? <CheckCircle2 className="w-4 h-4 flex-shrink-0" /> : <AlertCircle className="w-4 h-4 flex-shrink-0" />}
          <span>{message.text}</span>
        </div>
      )}

      {/* Grid: Subscription Card & Digital ID Pass */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Column 1 & 2: Active Subscription Status */}
        <div className="lg:col-span-2 p-6 sm:p-8 rounded-3xl bg-[#111A2E] border border-slate-800 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-blue-400" />
                <h3 className="font-bold text-white text-base">CGC Membership Subscription</h3>
              </div>
              {sub ? (
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>ACTIVE</span>
                </span>
              ) : (
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-800 text-slate-400 border border-slate-700">
                  NO ACTIVE PLAN
                </span>
              )}
            </div>

            {sub ? (
              <div className="space-y-6">
                <div>
                  <div className="text-2xl font-extrabold text-white">{sub.plan_name}</div>
                  <p className="text-xs text-slate-400 mt-1">
                    Billed in Ethiopian Birr ({sub.price_etb} ETB) via {sub.provider || 'Chapa (Telebirr/CBE)'}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-slate-500 block text-[10px] uppercase font-semibold">Current Period Start</span>
                    <span className="text-white font-medium">{sub.current_period_start?.slice(0, 10)}</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-slate-500 block text-[10px] uppercase font-semibold">Active Until</span>
                    <span className="text-emerald-400 font-bold">{sub.current_period_end?.slice(0, 10)}</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-slate-500 block text-[10px] uppercase font-semibold">Renewal Status</span>
                    <span className={sub.cancel_at_period_end ? 'text-amber-400 font-bold' : 'text-blue-400 font-bold'}>
                      {sub.cancel_at_period_end ? 'Will Expire at Period End' : 'Active (Renewable)'}
                    </span>
                  </div>
                </div>

                {/* Sub Features Included */}
                {sub.features && Array.isArray(sub.features) && (
                  <div className="space-y-2 pt-2">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Included In Your Plan:</span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                      {sub.features.map((feat: string, idx: number) => (
                        <li key={idx} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <div className="py-8 text-center space-y-4">
                <div className="w-12 h-12 bg-slate-800 text-slate-400 rounded-full flex items-center justify-center mx-auto">
                  <CreditCard className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-base">You haven't activated a membership pass yet</h4>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1">
                    Support Woliso Campus innovation, secure priority lab workstations, and join competitive hackathons starting at 150 ETB/month.
                  </p>
                </div>
                <button
                  onClick={onOpenSubscriptionModal}
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-glow-blue transition-colors inline-flex items-center gap-1.5"
                >
                  <Smartphone className="w-4 h-4" />
                  <span>Activate with Telebirr or CBE Birr</span>
                </button>
              </div>
            )}
          </div>

          {/* Action buttons if subscribed */}
          {sub && (
            <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={onOpenSubscriptionModal}
                className="px-4 py-2 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 text-xs font-semibold border border-blue-500/30 transition-colors flex items-center gap-1.5"
              >
                <RotateCw className="w-3.5 h-3.5" />
                <span>Extend / Renew Pass</span>
              </button>

              {!sub.cancel_at_period_end && (
                <button
                  onClick={handleCancelRenewal}
                  disabled={actionLoading}
                  className="text-xs text-slate-400 hover:text-red-400 transition-colors font-medium"
                >
                  {actionLoading ? 'Processing...' : 'Stop Auto-Renewal'}
                </button>
              )}
            </div>
          )}
        </div>

        {/* Column 3: Digital Membership Pass Card */}
        <div className="p-6 rounded-3xl bg-gradient-to-br from-[#0F172A] to-[#162238] border border-slate-700 shadow-2xl relative flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <CGCLogo variant="full" size="sm" showTagline={false} />
              <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${
                sub
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                  : 'bg-slate-800 text-slate-400 border-slate-700'
              }`}>
                {sub ? 'VERIFIED PASS' : 'GUEST / APPLICANT'}
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-slate-500 text-[10px] uppercase font-semibold">Student Name</span>
                <div className="text-base font-bold text-white">{user.fullName}</div>
              </div>

              <div>
                <span className="text-slate-500 text-[10px] uppercase font-semibold">Department</span>
                <div className="text-slate-200 font-medium">{user.department || 'Informatics'}</div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-slate-500 text-[10px] uppercase font-semibold">Role</span>
                  <div className="text-blue-400 font-bold">{user.role}</div>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] uppercase font-semibold">User ID</span>
                  <div className="text-emerald-400 font-mono text-[11px] truncate">{user.id}</div>
                </div>
              </div>

              <div>
                <span className="text-slate-500 text-[10px] uppercase font-semibold">Telegram</span>
                <div className="text-slate-300 font-mono text-xs">{user.telegram || 'Not linked'}</div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-3 border-t border-slate-800 text-[10px] text-slate-500 font-mono flex items-center justify-between">
            <span>Ambo University • Woliso</span>
            <span>Ideas into Impact</span>
          </div>
        </div>

      </div>

      {/* Payment & Transaction History Table */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#111A2E] border border-slate-800 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-white text-base">Payment & Renewal History</h3>
          </div>
          <span className="text-xs text-slate-400">{payments.length} Transaction(s)</span>
        </div>

        {payments.length === 0 ? (
          <div className="py-6 text-center text-xs text-slate-500">
            No payments recorded yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="text-[10px] uppercase text-slate-500 border-b border-slate-800/80 bg-slate-900/50">
                <tr>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Reference</th>
                  <th className="py-3 px-4">Plan</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Method</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {payments.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-900/40 transition-colors">
                    <td className="py-3 px-4 text-slate-400">{p.created_at?.slice(0, 10)}</td>
                    <td className="py-3 px-4 font-mono text-[11px] text-slate-200">{p.internal_ref}</td>
                    <td className="py-3 px-4 text-white font-medium">{p.plan_name}</td>
                    <td className="py-3 px-4 font-bold text-emerald-400">{p.amount} {p.currency}</td>
                    <td className="py-3 px-4 text-slate-300">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700">
                        {p.payment_method}
                      </span>
                    </td>
                    <td className="py-3 px-4">
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
        )}
      </div>

    </div>
  );
};
