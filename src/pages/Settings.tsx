import React from 'react';
import { motion } from 'framer-motion';
import { User, Bell, Lock, Globe, Shield, Zap, Laptop, Brain, Link as LinkIcon, Save } from 'lucide-react';

const SettingItem = ({ icon: Icon, title, desc, action, type = 'toggle' }: any) => (
  <div className="flex items-center justify-between p-4 rounded-xl hover:bg-zinc-800/20 transition-all border border-transparent hover:border-zinc-800/50 group">
    <div className="flex items-center gap-4">
      <div className="p-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-400 group-hover:text-blue-400 transition-colors">
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <h4 className="text-sm font-semibold text-zinc-100">{title}</h4>
        <p className="text-xs text-zinc-500">{desc}</p>
      </div>
    </div>
    {type === 'toggle' ? (
      <button className="w-10 h-5 bg-blue-600 rounded-full relative">
        <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full shadow-sm" />
      </button>
    ) : (
      <button className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-[10px] font-bold text-zinc-300 uppercase tracking-widest transition-colors">
        Configure
      </button>
    )}
  </div>
);

const Section = ({ title, children }: any) => (
  <div className="space-y-4">
    <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-[0.2em] px-2">{title}</h3>
    <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-2 divide-y divide-zinc-800/50">
      {children}
    </div>
  </div>
);

const Settings = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto space-y-12 pb-12"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-zinc-100 mb-2">System Preferences</h1>
          <p className="text-zinc-500">Manage your neural interface and global environment settings.</p>
        </div>
        <button className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 rounded-xl text-sm font-bold transition-all shadow-lg shadow-blue-600/20 flex items-center gap-2 group">
          <Save className="w-4 h-4 group-hover:scale-110 transition-transform" />
          Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 gap-10">
        <Section title="Profile & Identity">
          <SettingItem icon={User} title="Agent Identifier" desc="Change your global display name across all modules." type="button" />
          <SettingItem icon={Brain} title="Neural Profile" desc="Personalize the AI assistant's interaction style and voice." type="button" />
          <SettingItem icon={LinkIcon} title="Connected Accounts" desc="Manage third-party integrations and data bridges." type="button" />
        </Section>

        <Section title="General & Interface">
          <SettingItem icon={Laptop} title="High Fidelity Mode" desc="Enable advanced animations and glassmorphism effects." />
          <SettingItem icon={Bell} title="Neural Notifications" desc="Get direct haptic and visual updates in the workstation." />
          <SettingItem icon={Globe} title="Regional Mirror" desc="Auto-select the closest edge node for minimized latency." />
        </Section>

        <Section title="Security & Privacy">
          <SettingItem icon={Lock} title="Two-Factor Auth" desc="Require biometric verification for sensitive operations." />
          <SettingItem icon={Shield} title="Quantum Shield" desc="Enable end-to-end encryption for local data streams." />
          <SettingItem icon={Zap} title="Direct Memory Access" desc="Allow system-wide clipboard and file system interactions." type="toggle" />
        </Section>
      </div>

      <div className="p-6 rounded-2xl border border-rose-500/20 bg-rose-500/5 flex items-center justify-between">
        <div>
          <h4 className="text-sm font-bold text-rose-400">Advanced: Factory Reset</h4>
          <p className="text-xs text-rose-500 opacity-60">Wipe all local datasets and reset neural profile. This cannot be undone.</p>
        </div>
        <button className="px-4 py-2 border border-rose-500/30 text-rose-500 hover:bg-rose-500 hover:text-white rounded-lg text-xs font-bold transition-all uppercase tracking-widest">
          Purge All Data
        </button>
      </div>
    </motion.div>
  );
};

export default Settings;
