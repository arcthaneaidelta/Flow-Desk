import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Server, Cpu, Database, Globe, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { 
  AreaChart, Area, LineChart, Line, 
  XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, BarChart, Bar 
} from 'recharts';

const cpuData = [
  { time: '12:00', load: 45 },
  { time: '12:05', load: 52 },
  { time: '12:10', load: 48 },
  { time: '12:15', load: 70 },
  { time: '12:20', load: 61 },
  { time: '12:25', load: 55 },
  { time: '12:30', load: 58 },
];

const trafficData = [
  { name: 'US-East', req: 4000, res: 2400 },
  { name: 'EU-West', req: 3000, res: 1398 },
  { name: 'Asia-SE', req: 2000, res: 9800 },
  { name: 'US-West', req: 2780, res: 3908 },
  { name: 'Global', req: 1890, res: 4800 },
];

const ResourceCard = ({ title, value, icon: Icon, percentage, trend }: any) => (
  <div className="bg-zinc-900/40 border border-zinc-800 p-5 rounded-2xl flex flex-col gap-4">
    <div className="flex justify-between items-start">
      <div className="p-2 bg-zinc-800 rounded-xl text-zinc-400">
        <Icon className="w-5 h-5" />
      </div>
      <div className={`flex items-center text-xs font-bold ${trend === 'up' ? 'text-rose-400' : 'text-emerald-400'}`}>
        {trend === 'up' ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
        {percentage}%
      </div>
    </div>
    <div>
      <p className="text-zinc-500 text-xs font-semibold uppercase tracking-wider">{title}</p>
      <p className="text-2xl font-bold text-zinc-100">{value}</p>
    </div>
    <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        className={`h-full ${percentage > 80 ? 'bg-rose-500' : percentage > 50 ? 'bg-amber-500' : 'bg-blue-500'}`}
      />
    </div>
  </div>
);

const Monitoring = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8 pb-12"
    >
      <div>
        <h1 className="text-3xl font-bold text-zinc-100 mb-2">Systems Monitoring</h1>
        <p className="text-zinc-500">Real-time resource allocation and traffic analysis.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ResourceCard title="CPU Load" value="58.4%" icon={Cpu} percentage={58} trend="up" />
        <ResourceCard title="Memory" value="12.4 GB" icon={Database} percentage={72} trend="down" />
        <ResourceCard title="Network" value="842 Mbps" icon={Globe} percentage={45} trend="up" />
        <ResourceCard title="Disk I/O" value="124 MB/s" icon={Server} percentage={18} trend="down" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl">
          <h3 className="font-semibold text-zinc-100 mb-6 flex items-center gap-2">
            <Activity className="w-4 h-4 text-blue-400" />
            Neural Load Evolution
          </h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={cpuData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis dataKey="time" stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: '#18181b', border: '1px solid #27272a', borderRadius: '12px' }} />
                <Area type="monotone" dataKey="load" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.1} strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl">
          <h3 className="font-semibold text-zinc-100 mb-6 flex items-center gap-2">
            <Globe className="w-4 h-4 text-indigo-400" />
            Regional Distribution
          </h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trafficData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis dataKey="name" stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: '#18181b', border: '1px solid #27272a', borderRadius: '12px' }} />
                <Bar dataKey="req" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={20} />
                <Bar dataKey="res" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-zinc-950/50 border border-zinc-800 rounded-2xl p-6">
        <h3 className="font-semibold text-zinc-100 mb-6">Active Infrastructure</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-3 p-4 rounded-xl border border-zinc-800/50 bg-zinc-900/20">
              <div className={`w-3 h-3 rounded-full ${i === 4 ? 'bg-amber-400' : i === 7 ? 'bg-rose-500 animate-pulse' : 'bg-emerald-500'} shadow-[0_0_10px_rgba(16,185,129,0.2)]`} />
              <span className="text-[10px] font-mono text-zinc-500 uppercase">NODE-{100 + i}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Monitoring;
