import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Settings as SettingsIcon, 
  Terminal, 
  Activity, 
  Shield, 
  Zap, 
  Plus, 
  Search,
  Bell,
  ClipboardList,
  X,
  Globe,
  Cpu,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from './lib/utils';

// Components & Pages
import Splash from './components/Splash';
import Dashboard from './pages/Dashboard';
import Workflows from './pages/Workflows';
import Monitoring from './pages/Monitoring';
import Security from './pages/Security';
import History from './pages/History';
import Settings from './pages/Settings';

const SidebarItem = ({ icon: Icon, label, active, onClick }: { icon: any, label: string, active?: boolean, onClick?: () => void }) => (
  <button
    onClick={onClick}
    className={cn(
      "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group",
      active 
        ? "bg-blue-600/10 text-blue-400 border border-blue-500/20 shadow-[0_4px_12px_rgba(37,99,235,0.1)]" 
        : "text-zinc-500 hover:bg-zinc-800/50 hover:text-zinc-200"
    )}
  >
    <Icon className={cn("w-5 h-5", active ? "text-blue-400" : "group-hover:text-zinc-200")} />
    <span className="font-medium">{label}</span>
    {active && <motion.div layoutId="active-pill" className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)]" />}
  </button>
);

const NotificationDropdown = ({ onClose }: { onClose: () => void }) => (
  <motion.div 
    initial={{ opacity: 0, y: 10, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: 10, scale: 0.95 }}
    className="absolute top-12 right-0 w-80 bg-zinc-900/95 border border-zinc-800 rounded-2xl shadow-2xl backdrop-blur-xl z-50 overflow-hidden"
  >
    <div className="p-4 border-b border-zinc-800 flex justify-between items-center bg-zinc-950/20">
      <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-100 italic">Neural Alerts</h3>
      <button onClick={onClose} className="p-1 hover:bg-zinc-800 rounded-lg transition-colors"><X className="w-4 h-4 text-zinc-500" /></button>
    </div>
    <div className="max-h-96 overflow-y-auto custom-scrollbar p-2">
      {[
        { id: 1, type: 'success', msg: 'Neural sync completed on Node-04', time: '2m ago' },
        { id: 2, type: 'warning', msg: 'Security firewall detected 12 anomalies', time: '15m ago' },
        { id: 3, type: 'info', msg: 'New firmware update available for Agent v2', time: '1h ago' },
        { id: 4, type: 'error', msg: 'Connection timeout on Singapore-South bridge', time: '3h ago' }
      ].map(n => (
        <div key={n.id} className="p-3 hover:bg-zinc-800/50 rounded-xl transition-colors mb-1 cursor-pointer group">
          <div className="flex gap-3">
            <div className={cn(
              "mt-1 w-2 h-2 rounded-full shadow-[0_0_8px_currentColor]",
              n.type === 'success' ? 'text-emerald-500 bg-emerald-500' :
              n.type === 'warning' ? 'text-amber-500 bg-amber-500' :
              n.type === 'error' ? 'text-rose-500 bg-rose-500' : 'text-blue-500 bg-blue-500'
            )} />
            <div className="flex-1">
              <p className="text-xs text-zinc-300 font-medium group-hover:text-white transition-colors leading-relaxed">{n.msg}</p>
              <span className="text-[9px] text-zinc-600 font-bold uppercase tracking-[0.2em] mt-1 block">{n.time}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
    <button className="w-full py-3 bg-zinc-950/40 text-[9px] font-bold text-zinc-500 hover:text-blue-400 border-t border-zinc-800 transition-colors uppercase tracking-[0.3em]">
      Clear Neural Buffer
    </button>
  </motion.div>
);

const DeployModal = ({ onClose }: { onClose: () => void }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-md"
    onClick={onClose}
  >
    <motion.div 
      initial={{ scale: 0.9, y: 20 }}
      animate={{ scale: 1, y: 0 }}
      exit={{ scale: 0.9, y: 20 }}
      className="w-full max-w-md bg-zinc-900/90 border border-zinc-800 rounded-[2.5rem] p-8 shadow-[0_0_100px_rgba(0,0,0,1)] relative overflow-hidden"
      onClick={e => e.stopPropagation()}
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50" />
      
      <div className="flex justify-between items-start mb-8">
        <div>
          <h2 className="text-2xl font-black text-white tracking-tight">Deploy Agent</h2>
          <p className="text-zinc-500 text-sm mt-1">Initialize a new autonomous neural unit.</p>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-2xl transition-all text-zinc-500 hover:text-white border border-transparent hover:border-white/10">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-6">
        <div>
          <label className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.3em] block mb-3 px-1">Agent Identifier</label>
          <div className="relative group">
            <Cpu className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-blue-400 transition-colors" />
            <input 
              type="text" 
              placeholder="e.g. NEURAL-OVERSEER-01"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl pl-12 pr-4 py-4 text-sm focus:outline-none focus:border-blue-500/50 transition-all font-mono text-blue-400 placeholder:text-zinc-800"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.3em] block mb-3 px-1">Neural Model</label>
            <div className="relative">
              <select className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-4 py-4 text-xs font-bold text-zinc-400 focus:outline-none focus:border-blue-500/50 appearance-none cursor-pointer uppercase tracking-wider">
                <option>Elite-4 (v2.0)</option>
                <option>Core-2 (v1.8)</option>
                <option>Ghost-X (Experimental)</option>
              </select>
            </div>
          </div>
          <div>
            <label className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.3em] block mb-3 px-1">Bridge Region</label>
            <div className="relative">
              <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 pointer-events-none" />
              <select className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl pl-12 pr-4 py-4 text-xs font-bold text-zinc-400 focus:outline-none focus:border-blue-500/50 appearance-none cursor-pointer uppercase tracking-wider">
                <option>Global Edge</option>
                <option>US-East</option>
                <option>EU-North</option>
              </select>
            </div>
          </div>
        </div>

        <div className="pt-8">
          <button 
            className="w-full py-5 bg-blue-600 hover:bg-blue-500 rounded-2xl text-xs font-black transition-all shadow-[0_20px_40px_rgba(37,99,235,0.2)] flex items-center justify-center gap-3 uppercase tracking-[0.3em] active:scale-95 border-t border-white/20"
            onClick={onClose}
          >
            <Zap className="w-4 h-4 fill-white" />
            Commit Deployment
          </button>
          <p className="text-[9px] text-zinc-700 text-center mt-6 font-bold uppercase tracking-[0.2em] italic">
            Initialization will consume 28.4 GFLOPS of neural bandwidth.
          </p>
        </div>
      </div>
    </motion.div>
  </motion.div>
);

const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showDeployModal, setShowDeployModal] = useState(false);

  // The content renderer
  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'workflows': return <Workflows />;
      case 'monitoring': return <Monitoring />;
      case 'security': return <Security />;
      case 'history': return <History />;
      case 'settings': return <Settings />;
      default: return <Dashboard />;
    }
  };

  return (
    <>
      <AnimatePresence>
        {isLoading && <Splash onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {!isLoading && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex h-screen w-full bg-[#09090b] text-zinc-100 overflow-hidden font-inter select-none"
        >
          {/* Sidebar */}
          <aside className="w-72 border-r border-zinc-800/50 flex flex-col p-6 bg-zinc-950/80 backdrop-blur-2xl z-20">
            <div className="flex items-center gap-3 px-2 mb-12">
              <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.4)] rotate-3">
                <Zap className="w-6 h-6 text-white fill-white -rotate-3" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black italic tracking-tighter leading-none">WHISPERFLOW</span>
                <span className="text-[9px] font-bold text-blue-500 uppercase tracking-[0.4em] mt-1">Elite Edition</span>
              </div>
            </div>

            <nav className="flex-1 flex flex-col gap-2">
              <SidebarItem icon={LayoutDashboard} label="Workstation" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
              <SidebarItem icon={Terminal} label="Neural Flow" active={activeTab === 'workflows'} onClick={() => setActiveTab('workflows')} />
              <SidebarItem icon={Activity} label="Core Metrics" active={activeTab === 'monitoring'} onClick={() => setActiveTab('monitoring')} />
              <SidebarItem icon={Shield} label="Ghost Shield" active={activeTab === 'security'} onClick={() => setActiveTab('security')} />
              <SidebarItem icon={ClipboardList} label="Sync History" active={activeTab === 'history'} onClick={() => setActiveTab('history')} />
            </nav>

            <div className="mt-auto pt-6 border-t border-zinc-800/50 flex flex-col gap-2">
              <SidebarItem icon={SettingsIcon} label="System Config" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
              <div className="flex items-center gap-3 p-3 bg-zinc-900/30 rounded-2xl border border-zinc-800/50 mt-4 group cursor-pointer hover:border-blue-500/30 transition-all">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 border border-white/10 group-hover:scale-110 transition-transform" />
                <div className="flex flex-col">
                  <span className="text-sm font-black text-white group-hover:text-blue-400 transition-colors">Alex Chen</span>
                  <span className="text-[9px] text-zinc-600 uppercase tracking-widest font-black">Level 7 Admin</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 flex flex-col relative overflow-hidden bg-[radial-gradient(circle_at_top_right,_rgba(37,99,235,0.05),_transparent_50%)]">
            {/* Header */}
            <header className="h-20 border-b border-zinc-800/50 flex items-center justify-between px-10 bg-zinc-950/40 backdrop-blur-xl z-30">
              <div className="relative w-[400px] group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-blue-500 transition-colors" />
                <input 
                  type="text" 
                  placeholder="Query neural database... (⌘K)"
                  className="w-full bg-zinc-900/40 border border-zinc-800/80 rounded-2xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-blue-500/50 transition-all font-semibold italic text-blue-100 placeholder:text-zinc-700"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-6 relative">
                <div className="relative">
                  <button 
                    onClick={() => setShowNotifications(!showNotifications)}
                    className={cn(
                      "relative p-3 transition-all active:scale-90",
                      showNotifications ? "text-blue-400 bg-blue-600/10 rounded-2xl shadow-[inset_0_0_10px_rgba(37,99,235,0.2)]" : "text-zinc-500 hover:text-white bg-zinc-900/50 rounded-2xl border border-zinc-800/50"
                    )}
                  >
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-3 right-3 w-1.5 h-1.5 bg-rose-500 rounded-full shadow-[0_0_12px_rgba(244,63,94,0.8)] border border-black" />
                  </button>
                  <AnimatePresence>
                    {showNotifications && <NotificationDropdown onClose={() => setShowNotifications(false)} />}
                  </AnimatePresence>
                </div>
                
                <button 
                  onClick={() => setShowDeployModal(true)}
                  className="flex items-center gap-3 px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-2xl text-xs font-black shadow-[0_10px_30px_rgba(37,99,235,0.2)] transition-all active:scale-95 group uppercase tracking-[0.2em]"
                >
                  <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" />
                  Deploy Agent
                </button>
              </div>
            </header>

            {/* Deploy Modal Component */}
            <AnimatePresence>
              {showDeployModal && <DeployModal onClose={() => setShowDeployModal(false)} />}
            </AnimatePresence>

            {/* Scrollable Content Container */}
            <div className="flex-1 overflow-y-auto p-10 custom-scrollbar relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -10, filter: 'blur(10px)' }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  {renderContent()}
                </motion.div>
              </AnimatePresence>
            </div>
          </main>

          {/* Background Decorative Elements */}
          <div className="fixed top-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-900/5 blur-[160px] rounded-full -z-10 pointer-events-none" />
          <div className="fixed bottom-[-10%] left-[20%] w-[40%] h-[40%] bg-indigo-900/5 blur-[160px] rounded-full -z-10 pointer-events-none" />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none -z-10 mix-blend-overlay" />
        </motion.div>
      )}
    </>
  );
};

export default App;
