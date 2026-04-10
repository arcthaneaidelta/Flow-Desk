import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Play, Pause, RefreshCw, CheckCircle2, AlertCircle, Clock } from 'lucide-react';
import { cn } from '../lib/utils';

const workflows = [
  { id: 1, name: 'Neural Sync Alpha', status: 'running', progress: 65, lastRun: '2m ago' },
  { id: 2, name: 'Data Pipeline Sigma', status: 'paused', progress: 100, lastRun: '15m ago' },
  { id: 3, name: 'Security Audit Beta', status: 'completed', progress: 100, lastRun: '1h ago' },
  { id: 4, name: 'Agent Training Gamma', status: 'failed', progress: 24, lastRun: '5m ago' },
];

const WorkflowCard = ({ workflow }: { workflow: any }) => (
  <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl hover:border-zinc-700 transition-all group">
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center gap-3">
        <div className={cn(
          "p-2 rounded-lg",
          workflow.status === 'running' ? "bg-blue-600/20 text-blue-400" :
          workflow.status === 'failed' ? "bg-rose-600/20 text-rose-400" :
          "bg-zinc-800 text-zinc-400"
        )}>
          <Terminal className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-semibold text-zinc-100">{workflow.name}</h3>
          <p className="text-xs text-zinc-500 flex items-center gap-1">
            <Clock className="w-3 h-3" /> {workflow.lastRun}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-400 hover:text-blue-400 transition-colors">
          {workflow.status === 'running' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>
        <button className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-400 hover:text-blue-400 transition-colors">
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>
    </div>

    <div className="space-y-2">
      <div className="flex justify-between text-xs mb-1">
        <span className="text-zinc-500 capitalize">{workflow.status}</span>
        <span className="text-zinc-300 font-mono">{workflow.progress}%</span>
      </div>
      <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${workflow.progress}%` }}
          className={cn(
            "h-full transition-all duration-1000",
            workflow.status === 'running' ? "bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.5)]" :
            workflow.status === 'failed' ? "bg-rose-600" :
            "bg-emerald-600"
          )}
        />
      </div>
    </div>

    <div className="mt-6 pt-6 border-t border-zinc-800/50 flex items-center justify-between">
      <div className="flex -space-x-2">
        {[1,2,3].map(i => (
          <div key={i} className="w-6 h-6 rounded-full border-2 border-zinc-950 bg-zinc-800 flex items-center justify-center text-[10px] font-bold">
            A{i}
          </div>
        ))}
      </div>
      {workflow.status === 'completed' && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
      {workflow.status === 'failed' && <AlertCircle className="w-4 h-4 text-rose-500" />}
    </div>
  </div>
);

const Workflows = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-zinc-100 mb-2">Workflows</h1>
          <p className="text-zinc-500">Automated agent pipelines and execution history.</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm font-semibold transition-all flex items-center gap-2">
          <Terminal className="w-4 h-4" />
          New Pipeline
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workflows.map(w => <WorkflowCard key={w.id} workflow={w} />)}
      </div>

      <div className="bg-zinc-950/50 border border-zinc-800 rounded-2xl overflow-hidden backdrop-blur-xl">
        <div className="px-6 py-4 border-b border-zinc-800 bg-zinc-900/30 flex items-center justify-between">
          <h3 className="font-semibold text-sm uppercase tracking-wider text-zinc-400">Terminal Output</h3>
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-rose-500/50" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50" />
          </div>
        </div>
        <div className="p-6 font-mono text-xs space-y-2 max-h-60 overflow-y-auto custom-scrollbar">
          <p className="text-emerald-400">[SYSTEM] Initialization sequence complete.</p>
          <p className="text-zinc-500">[12:44:01] Connecting to neural bridge node-04...</p>
          <p className="text-blue-400">[INFO] Handshake verified. Latency: 12ms</p>
          <p className="text-zinc-100">[AGENT-01] Executing sync task: partial_memory_dump</p>
          <p className="text-zinc-500">[12:44:05] Allocating buffers for stream process...</p>
          <p className="text-amber-400 text-opacity-80">[WARN] Cache pressure high on node-04. Throttling active.</p>
          <p className="text-zinc-100">[AGENT-01] Progress: 12% ... 45% ... 89%</p>
          <p className="text-emerald-400">[SYSTEM] Task completed successfully.</p>
        </div>
      </div>
    </motion.div>
  );
};

export default Workflows;
