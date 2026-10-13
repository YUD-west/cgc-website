import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { CGCLogo } from '../Logo/CGCLogo';
import { 
  X, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  CreditCard, 
  Smartphone, 
  AlertCircle, 
  CheckCircle2, 
  ArrowRight,
  Zap
} from 'lucide-react';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAuth: () => void;
}

export const SubscriptionModal: React.FC<SubscriptionModalProps> = ({
  isOpen,
  onClose,
  onOpenAuth
}) => {
  const { user, token, refreshUser } = useAuth();
  
  const [plans, setPlans] = useState<any[]>([]);
  const [interval, setInterval] = useState<'MONTHLY' | 'YEARLY'>('YEARLY');
  const [currency, setCurrency] = useState<'ETB' | 'USD'>('ETB');
  const [paymentMethod, setPaymentMethod] = useState<'TELEBIRR' | 'CBE_BIRR' | 'CARD'>('TELEBIRR');
  const [selectedPlanId, setSelectedPlanId] = useState<string>('plan_student_yearly');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [simulatedCheckout, setSimulatedCheckout] = useState<any | null>(null);

  useEffect(() => {
    fetch('/api/plans')
      .then(res => res.json())
      .then(data => {
        if (data.plans) setPlans(data.plans);
      })
      .catch(err => console.error('Failed to load plans', err));
  }, []);

  if (!isOpen) return null;

  const filteredPlans = plans.filter(p => p.interval === interval);
  const currentPlan = plans.find(p => p.id === selectedPlanId) || filteredPlans[0];

  const handleCheckout = async () => {
    if (!user || !token) {
      onOpenAuth();
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/payments/initialize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          planId: currentPlan.id,
          currency,
          paymentMethod
        })
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Failed to initialize payment.');
        setLoading(false);
        return;
      }

      // Check if sandbox mock checkout or live url
      if (data.checkoutUrl.includes('simulate')) {
        setSimulatedCheckout(data);
      } else {
        // Direct redirect to real Chapa / Telebirr hosted checkout page
        window.location.href = data.checkoutUrl;
      }
    } catch (err: any) {
      setError(err.message || 'Payment service communication failure.');
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteSimulation = async () => {
    if (!simulatedCheckout || !token) return;
    setLoading(true);

    try {
      const res = await fetch(`/api/payments/verify/${encodeURIComponent(simulatedCheckout.internalRef)}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok && data.verified) {
        await refreshUser();
        setSimulatedCheckout(null);
        onClose();
        alert('🎉 Subscription payment verified! Welcome as an official verified CGC member.');
      } else {
        setError('Verification failed.');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="bg-[#111A2E] border border-slate-700 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col my-8">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
          <div className="flex items-center gap-3">
            <CGCLogo variant="compact" size="sm" />
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>CGC Membership Subscription</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  SECURE CHECKOUT
                </span>
              </h3>
              <p className="text-xs text-slate-400">Support Innovation & Hardware at Woliso Campus</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-slate-800 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">

          {/* SIMULATION MODAL (If in developer sandbox mode) */}
          {simulatedCheckout ? (
            <div className="p-6 rounded-2xl bg-blue-950/40 border border-blue-500/40 text-center space-y-4 animate-fade-in">
              <div className="w-12 h-12 bg-blue-500/20 text-blue-400 rounded-full flex items-center justify-center mx-auto">
                <Smartphone className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white">Telebirr / CBE Birr Sandbox Simulator</h4>
                <p className="text-xs text-slate-300 mt-1 max-w-md mx-auto">
                  A payment session has been generated for Reference <code className="text-emerald-400 font-mono">{simulatedCheckout.internalRef}</code>.
                </p>
                <div className="text-2xl font-extrabold text-emerald-400 mt-2">
                  {simulatedCheckout.amount} {simulatedCheckout.currency}
                </div>
              </div>

              <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 text-xs text-slate-300 text-left space-y-1">
                <div>• Method: <strong className="text-white">{simulatedCheckout.paymentMethod}</strong></div>
                <div>• Merchant: <strong className="text-white">Cyber Guardians Club (Ambo University)</strong></div>
                <div>• Status: <strong className="text-amber-400">Waiting for customer approval</strong></div>
              </div>

              <button
                onClick={handleCompleteSimulation}
                disabled={loading}
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-glow-green transition-all"
              >
                {loading ? 'Verifying with Provider...' : 'Simulate Customer Approval & Authorize Payment →'}
              </button>
            </div>
          ) : (
            <>
              {/* Selectors: Interval & Currency */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                {/* Interval Pill */}
                <div className="flex p-1 rounded-xl bg-slate-950 border border-slate-800">
                  <button
                    type="button"
                    onClick={() => {
                      setInterval('MONTHLY');
                      setSelectedPlanId('plan_student_monthly');
                    }}
                    className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      interval === 'MONTHLY'
                        ? 'bg-blue-600 text-white'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Monthly
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setInterval('YEARLY');
                      setSelectedPlanId('plan_student_yearly');
                    }}
                    className={`px-4 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                      interval === 'YEARLY'
                        ? 'bg-blue-600 text-white'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <span>Yearly</span>
                    <span className="px-1.5 py-0.2 rounded text-[10px] bg-emerald-500/20 text-emerald-300 font-bold">
                      2 Mos Free
                    </span>
                  </button>
                </div>

                {/* Currency selector */}
                <div className="flex p-1 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                  <button
                    type="button"
                    onClick={() => setCurrency('ETB')}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                      currency === 'ETB' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    ETB (Ethiopian Birr)
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrency('USD')}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                      currency === 'USD' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    USD ($ International)
                  </button>
                </div>
              </div>

              {/* Plans Selection Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredPlans.map((plan) => {
                  const isSelected = selectedPlanId === plan.id;
                  const price = currency === 'ETB' ? `${plan.priceETB} ETB` : `$${plan.priceUSD} USD`;

                  return (
                    <div
                      key={plan.id}
                      onClick={() => setSelectedPlanId(plan.id)}
                      className={`p-5 rounded-2xl border transition-all cursor-pointer relative flex flex-col justify-between ${
                        isSelected
                          ? 'bg-blue-950/40 border-blue-500 shadow-glow-blue'
                          : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-bold text-white text-sm">{plan.name}</h4>
                          {isSelected && (
                            <span className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center">
                              <Check className="w-3 h-3" />
                            </span>
                          )}
                        </div>
                        <div className="text-xl font-extrabold text-emerald-400 mb-2">
                          {price}
                          <span className="text-xs text-slate-400 font-normal"> / {plan.interval.toLowerCase()}</span>
                        </div>
                        <p className="text-xs text-slate-400 mb-4">{plan.description}</p>
                      </div>

                      <ul className="space-y-1.5 text-[11px] text-slate-300 border-t border-slate-800/80 pt-3">
                        {plan.features.slice(0, 3).map((f: string, idx: number) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>

              {/* Payment Methods (Telebirr & CBE Birr focus) */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-300">
                  Select Ethiopian Payment Rail:
                </label>
                <div className="grid grid-cols-3 gap-3">
                  
                  {/* Telebirr */}
                  <div
                    onClick={() => setPaymentMethod('TELEBIRR')}
                    className={`p-3 rounded-xl border text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-1 ${
                      paymentMethod === 'TELEBIRR'
                        ? 'bg-amber-500/10 border-amber-500 text-amber-300'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <Smartphone className="w-5 h-5 text-amber-400" />
                    <span className="text-xs font-bold">Telebirr</span>
                    <span className="text-[10px] text-slate-500">Ethio Telecom</span>
                  </div>

                  {/* CBE Birr */}
                  <div
                    onClick={() => setPaymentMethod('CBE_BIRR')}
                    className={`p-3 rounded-xl border text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-1 ${
                      paymentMethod === 'CBE_BIRR'
                        ? 'bg-purple-500/10 border-purple-500 text-purple-300'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <Zap className="w-5 h-5 text-purple-400" />
                    <span className="text-xs font-bold">CBE Birr</span>
                    <span className="text-[10px] text-slate-500">Commercial Bank</span>
                  </div>

                  {/* Visa / Master / Awash */}
                  <div
                    onClick={() => setPaymentMethod('CARD')}
                    className={`p-3 rounded-xl border text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-1 ${
                      paymentMethod === 'CARD'
                        ? 'bg-blue-500/10 border-blue-500 text-blue-300'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 text-blue-400" />
                    <span className="text-xs font-bold">Bank Card</span>
                    <span className="text-[10px] text-slate-500">Visa / Master</span>
                  </div>

                </div>
              </div>

              {error && (
                <div className="p-3 rounded-xl bg-red-950/70 border border-red-800 text-red-200 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Action Button */}
              <button
                type="button"
                onClick={handleCheckout}
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-glow-blue transition-all flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                ) : (
                  <>
                    <span>Proceed with {paymentMethod === 'TELEBIRR' ? 'Telebirr' : paymentMethod === 'CBE_BIRR' ? 'CBE Birr' : 'Card'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="text-[11px] text-slate-400 text-center flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Encrypted transaction processed via Chapa & Telebirr secure gateway.</span>
              </div>
            </>
          )}

        </div>

      </div>
    </div>
  );
};
