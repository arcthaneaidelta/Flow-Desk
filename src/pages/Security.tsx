import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, AlertTriangle, Key, ShieldCheck, Fingerprint } from 'lucide-react';
import { cn } from '../lib/utils';

const securityEvents = [
  { id: 1, type: 'critical', msg: 'Intrusion attempt blocked from IP 192.168.1.105', time: '2m ago' },
  { id: 2, type: 'info', msg: 'Neural key rotation completed successfully', time: '1h ago' },
  { id: 3, type: 'warning', msg: 'Exceeded rate limits on API gateway', time: '3h ago' },
  { id: 4, type: 'success', msg: 'Full system security scan - 0 vulnerabilities', time: '5h ago' },
];

const SecurityCard = ({ title, value, subtext, icon: Icon, color }: any) => (
  <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl relative overflow-hidden group">
    <div className={`absolute top-0 right-0 w-24 h-24 blur-[60px] opacity-20 transition-opacity group-hover:opacity-40 rounded-full ${color}`} />
    <div className="flex items-center gap-4 mb-4">
      <div className={`p-2.5 rounded-xl border border-white/5 ${color.replace('bg-', 'text-')}`}>
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">{title}</p>
        <p className="text-2xl font-bold text-zinc-100">{value}</p>
      </div>
    </div>
    <p className="text-xs text-zinc-500 font-medium">{subtext}</p>
  </div>
);

const Security = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-zinc-100 mb-2 font-inter">Security Protocol</h1>
          <p className="text-zinc-500">End-to-end encryption and real-time threat detection.</p>
        </div>
        <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">System Shield Active</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SecurityCard title="Security Score" value="98.2%" subtext="Health: Excellent" icon={ShieldCheck} color="bg-blue-600" />
        <SecurityCard title="Active Threats" value="0" subtext="Blocked in last 24h: 12" icon={AlertTriangle} color="bg-rose-500" />
        <SecurityCard title="Encryption" value="AES-512" subtext="Protocol: Quantum-Safe" icon={Lock} color="bg-indigo-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-zinc-800 bg-zinc-900/20">
            <h3 className="font-semibold text-zinc-300 flex items-center gap-2">
              <Eye className="w-4 h-4 text-blue-400" />
              Recent Security Events
            </h3>
          </div>
          <div className="divide-y divide-zinc-800/50">
            {securityEvents.map(event => (
              <div key={event.id} className="px-6 py-4 flex items-center justify-between hover:bg-zinc-800/30 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "w-2 h-2 rounded-full",
                    event.type === 'critical' ? "bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.4)]" :
                    event.type === 'warning' ? "bg-amber-500" :
                    event.type === 'success' ? "bg-emerald-500" : "bg-blue-500"
                  )} />
                  <span className="text-sm text-zinc-300">{event.msg}</span>
                </div>
                <span className="text-[10px] text-zinc-600 font-mono italic">{event.time}</span>
              </div>
            ))}
          </div>
          <button className="w-full py-3 text-xs font-bold text-zinc-500 hover:text-blue-400 hover:bg-zinc-800/50 transition-all uppercase tracking-widest border-t border-zinc-800">
            Export Audit Log
          </button>
        </div>

        <div className="space-y-6">
          <div className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-2xl h-full">
            <h3 className="font-semibold text-zinc-300 mb-6 flex items-center gap-2">
              <Key className="w-4 h-4 text-indigo-400" />
              Access Control
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-zinc-950/50 rounded-xl border border-zinc-800">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-zinc-800 rounded-lg text-zinc-400"><Fingerprint className="w-4 h-4" /></div>
                  <div className="text-sm font-medium">Biometric Auth</div>
                </div>
                <div className="w-10 h-5 bg-blue-600 rounded-full relative"><div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full" /></div>
              </div>
              <div className="flex items-center justify-between p-4 bg-zinc-950/50 rounded-xl border border-zinc-800">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-zinc-800 rounded-lg text-zinc-400"><Lock className="w-4 h-4" /></div>
                  <div className="text-sm font-medium">Session Isolation</div>
                </div>
                <div className="w-10 h-5 bg-blue-600 rounded-full relative"><div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full" /></div>
              </div>
              <div className="flex items-center justify-between p-4 bg-zinc-950/50 rounded-xl border border-zinc-800 opacity-50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-zinc-800 rounded-lg text-zinc-400"><Shield className="w-4 h-4" /></div>
                  <div className="text-sm font-medium">Neural Masking</div>
                </div>
                <div className="w-10 h-5 bg-zinc-800 rounded-full relative"><div className="absolute left-1 top-1 w-3 h-3 bg-zinc-600 rounded-full" /></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Security;
