import React from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Activity, 
  Shield, 
  User 
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { cn } from '../lib/utils';

const data = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Apr', value: 800 },
  { name: 'May', value: 500 },
  { name: 'Jun', value: 900 },
  { name: 'Jul', value: 1100 },
];

const StatCard = ({ title, value, change, icon: Icon, trend }: any) => (
  <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl hover:border-zinc-700 transition-colors group">
    <div className="flex justify-between items-start mb-4">
      <div className="p-2 bg-zinc-800 rounded-lg group-hover:bg-blue-600/20 transition-colors">
        <Icon className="w-5 h-5 text-zinc-400 group-hover:text-blue-400" />
      </div>
      <span className={cn("text-xs font-semibold px-2 py-1 rounded-full", trend === 'up' ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400")}>
        {change}
      </span>
    </div>
    <h3 className="text-zinc-500 text-sm mb-1">{title}</h3>
    <p className="text-2xl font-bold text-zinc-100">{value}</p>
  </div>
);

const Dashboard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-100 mb-2">Systems Overview</h1>
        <p className="text-zinc-500">Real-time performance and agent health monitoring.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Active Agents" value="42" change="+12%" icon={User} trend="up" />
        <StatCard title="Throughput" value="1.2 GB/s" change="+3.4%" icon={Zap} trend="up" />
        <StatCard title="Requests" value="84.2k" change="-0.8%" icon={Activity} trend="down" />
        <StatCard title="Uptime" value="99.98%" change="+0.01%" icon={Shield} trend="up" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-zinc-900/40 border border-zinc-800 p-6 rounded-2xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-zinc-100">Performance Index</h3>
            <select className="bg-zinc-800 border-none rounded-md text-xs px-2 py-1 focus:ring-0">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis dataKey="name" stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '12px' }}
                  itemStyle={{ color: '#3b82f6' }}
                />
                <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-2xl">
          <h3 className="font-semibold text-zinc-100 mb-6">Live Logs</h3>
          <div className="space-y-4">
            {[1,2,3,4,5].map((i) => (
              <div key={i} className="flex gap-4 items-start group">
                <div className="mt-1 w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-zinc-300">Agent {i} initiated sync</p>
                  <span className="text-xs text-zinc-600">{i * 2} minutes ago</span>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-2 border border-zinc-800 rounded-lg text-sm text-zinc-500 hover:bg-zinc-800 transition-colors font-medium">
            View full history
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
