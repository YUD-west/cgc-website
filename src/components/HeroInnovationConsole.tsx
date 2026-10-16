import React, { useState } from 'react';
import { TiltCard } from './Motion/TiltCard';
import { MagneticButton } from './Motion/MagneticButton';
import { 
  Sprout, 
  ShieldCheck, 
  ShoppingBag, 
  HeartPulse, 
  Terminal, 
  Play, 
  CheckCircle2, 
  Layers, 
  Cpu, 
  ArrowRight,
  Wifi,
  Sparkles,
  MapPin,
  Users
} from 'lucide-react';

interface HeroInnovationConsoleProps {
  onNavigate: (tab: string) => void;
  onProposeProject: () => void;
}

export const HeroInnovationConsole: React.FC<HeroInnovationConsoleProps> = ({
  onNavigate,
  onProposeProject,
}) => {
  const [activeFaculty, setActiveFaculty] = useState<'agri' | 'cyber' | 'biz' | 'health'>('agri');
  const [simState, setSimState] = useState<'idle' | 'running' | 'done'>('idle');
  const [simLog, setSimLog] = useState<string>('Ready to test prototype simulation...');

  const facultyStreams = [
    {
      id: 'agri' as const,
      label: 'Agri-Tech AI',
      faculty: 'Agriculture + IT',
      icon: Sprout,
      color: 'text-emerald-400',
      activeBg: 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300',
      headline: 'Coffee Rust & Maize Blight Vision AI',
      badge: 'Crop Vision v1.4',
      runLabel: 'Run Diagnostic Scan',
      demoDetails: {
        target: 'Woliso South Field Plot #4 - Coffea Arabica',
        status: 'Scanning canopy imagery for Hemileia vastatrix...',
        result: 'Leaf Rust Detected: 94.8% Confidence. Recommended Action: Copper Oxychloride spray at dawn.',
        stat1: '94.8% Accuracy',
        stat2: '< 180ms Inference',
        stat3: 'Offline Raspberry Pi Ready'
      }
    },
    {
      id: 'cyber' as const,
      label: 'Campus Network Guard',
      faculty: 'Computer Science & IT',
      icon: ShieldCheck,
      color: 'text-blue-400',
      activeBg: 'bg-blue-500/15 border-blue-500/40 text-blue-300',
      headline: 'Computer Lab 02 LAN Intrusion Sentinel',
      badge: 'Defensive IDS Node',
      runLabel: 'Inspect Packet Stream',
      demoDetails: {
        target: 'VLAN 10 • Lab 02 Workstation Cluster (36 Desktops)',
        status: 'Monitoring broadcast frames and ARP requests...',
        result: '342 packets parsed. ARP spoofing probe isolated from 10.20.4.18. Zero unauthorized intrusions.',
        stat1: '0.00ms Latency',
        stat2: '36 Lab Hosts',
        stat3: 'Wireshark Rule Matrix'
      }
    },
    {
      id: 'biz' as const,
      label: 'Student Commerce',
      faculty: 'Business + Software Eng.',
      icon: ShoppingBag,
      color: 'text-amber-400',
      activeBg: 'bg-amber-500/15 border-amber-500/40 text-amber-300',
      headline: 'Woliso Peer Exchange & Dorm Book Share',
      badge: 'FinTech Prototype',
      runLabel: 'Simulate Escrow Trade',
      demoDetails: {
        target: 'Campus Dorm Block 07 • Engineering Textbook Order',
        status: 'Executing Telebirr mock escrow handshake...',
        result: 'Escrow locked: 250 ETB for "Discrete Mathematics 8th Ed". QR release code generated.',
        stat1: '0 ETB Platform Fee',
        stat2: 'Instant QR Handshake',
        stat3: 'Verified Student ID'
      }
    },
    {
      id: 'health' as const,
      label: 'Health Informatics',
      faculty: 'Health Science + Computing',
      icon: HeartPulse,
      color: 'text-sky-400',
      activeBg: 'bg-sky-500/15 border-sky-500/40 text-sky-300',
      headline: 'Campus Clinic Fast-Track Triage System',
      badge: 'Clinical Telemetry',
      runLabel: 'Issue Triage Ticket',
      demoDetails: {
        target: 'Woliso Student Health Post • Emergency Room Queue',
        status: 'Evaluating vital signs: BP 118/76, SpO2 98%, Temp 37.1°C...',
        result: 'Priority: Green (Standard Outpatient). Ticket #A-42 issued. Estimated doctor call in 12 mins.',
        stat1: '12 min Wait Time',
        stat2: 'Digital EMR Link',
        stat3: 'SMS Notification'
      }
    }
  ];

  const currentStream = facultyStreams.find(s => s.id === activeFaculty)!;

  const handleRunSimulation = () => {
    setSimState('running');
    setSimLog(currentStream.demoDetails.status);
    setTimeout(() => {
      setSimState('done');
      setSimLog(currentStream.demoDetails.result);
    }, 900);
  };

  const handleTabChange = (id: typeof activeFaculty) => {
    setActiveFaculty(id);
    setSimState('idle');
    setSimLog('Ready to test prototype simulation...');
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto mt-6 sm:mt-10">
      
      {/* Floating Meta Pills for Spatial Depth */}
      <div className="hidden lg:flex items-center justify-between px-4 mb-3 text-xs text-slate-400 select-none">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 backdrop-blur-md">
          <MapPin className="w-3.5 h-3.5 text-blue-400" />
          <span className="font-medium text-slate-300">Ambo University, Woliso Campus</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-medium text-slate-300">Computer Lab 02 Workstations Active</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 backdrop-blur-md">
          <Users className="w-3.5 h-3.5 text-sky-400" />
          <span className="font-medium text-slate-300">4 Interdisciplinary Faculties Co-Creating</span>
        </div>
      </div>

      {/* Main 3D Tilt Interactive Console Card */}
      <TiltCard
        maxTilt={5}
        scale={1.01}
        className="rounded-3xl border border-slate-700/70 bg-[#0C1322]/95 backdrop-blur-2xl shadow-2xl overflow-hidden"
      >
        {/* Top Console Titlebar */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-[#090F1B] border-b border-slate-800/80">
          <div className="flex items-center gap-3">
            {/* macOS / Unix style tactile traffic lights */}
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            </div>
            <div className="h-4 w-px bg-slate-800 mx-1" />
            <span className="text-xs font-mono font-medium text-slate-400 flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-blue-400" />
              cgc-campus-matrix://woliso-prototypes
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Interactive Live Demo
            </span>
          </div>
        </div>

        {/* Tab Selection: The 4 Interdisciplinary Streams */}
        <div className="grid grid-cols-2 sm:grid-cols-4 p-2 bg-[#0A101D] border-b border-slate-800/80 gap-1.5">
          {facultyStreams.map((stream) => {
            const Icon = stream.icon;
            const isActive = activeFaculty === stream.id;
            return (
              <button
                key={stream.id}
                onClick={() => handleTabChange(stream.id)}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left transition-all duration-200 active:scale-95 ${
                  isActive
                    ? stream.activeBg + ' shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 border border-transparent'
                }`}
              >
                <div className={`p-1.5 rounded-lg bg-slate-900 border border-slate-800 ${stream.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="overflow-hidden">
                  <div className="text-xs font-bold truncate text-white">{stream.label}</div>
                  <div className="text-[10px] text-slate-400 truncate">{stream.faculty}</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Interactive Console Workspace */}
        <div className="p-5 sm:p-7 space-y-6">
          
          {/* Header Row of the Active Simulation */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                  {currentStream.badge}
                </span>
                <span className="text-xs text-slate-400">{currentStream.faculty}</span>
              </div>
              <h3 className="text-lg sm:text-xl font-extrabold text-white mt-1">
                {currentStream.headline}
              </h3>
            </div>

            {/* Run Interactive Simulation Button */}
            <MagneticButton
              onClick={handleRunSimulation}
              disabled={simState === 'running'}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm shadow-md flex items-center gap-2 shrink-0 active:scale-95 disabled:opacity-50"
            >
              <Play className={`w-3.5 h-3.5 fill-current ${simState === 'running' ? 'animate-spin' : ''}`} />
              <span>{simState === 'running' ? 'Processing...' : currentStream.runLabel}</span>
            </MagneticButton>
          </div>

          {/* Simulated Terminal & Live Telemetry Box */}
          <div className="rounded-2xl bg-[#070C16] border border-slate-800 p-4 sm:p-5 font-mono text-xs space-y-3">
            <div className="flex items-center justify-between text-slate-400 border-b border-slate-800/80 pb-2">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-slate-300 font-semibold">TARGET:</span> {currentStream.demoDetails.target}
              </span>
              <span className="text-[11px] text-slate-400">AMBO-WL-NODE-02</span>
            </div>

            <div className="text-slate-300 min-h-[48px] flex items-center leading-relaxed">
              {simState === 'running' && (
                <div className="flex items-center gap-2 text-blue-400">
                  <div className="w-3.5 h-3.5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
                  <span>{simLog}</span>
                </div>
              )}
              {simState === 'done' && (
                <div className="flex items-start gap-2 text-emerald-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{simLog}</span>
                </div>
              )}
              {simState === 'idle' && (
                <span className="text-slate-400 italic">
                  Press &quot;{currentStream.runLabel}&quot; above to simulate live campus execution.
                </span>
              )}
            </div>

            {/* Micro Stats Row */}
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800/60 text-slate-400 text-[11px]">
              <div>
                <span className="text-slate-400 block text-[10px]">BENCHMARK</span>
                <span className="text-white font-semibold">{currentStream.demoDetails.stat1}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">INFRASTRUCTURE</span>
                <span className="text-white font-semibold">{currentStream.demoDetails.stat2}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">DEPLOYMENT</span>
                <span className="text-white font-semibold">{currentStream.demoDetails.stat3}</span>
              </div>
            </div>
          </div>

          {/* Quick Action Footer in Card */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 text-xs border-t border-slate-800/80">
            <p className="text-slate-400">
              Have a cross-faculty problem in your department? Propose an initiative.
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={onProposeProject}
                className="font-semibold text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1 active:scale-95"
              >
                <span>+ Propose Campus Idea</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onNavigate('projects')}
                className="font-semibold text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1 active:scale-95"
              >
                <span>View All 8+ Projects</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </TiltCard>
    </div>
  );
};
