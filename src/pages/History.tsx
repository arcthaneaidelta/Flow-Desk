import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Download, Filter, Search, MoreHorizontal, Calendar } from 'lucide-react';

const historyItems = [
  { id: 1, action: 'Neural Bridge Optimized', user: 'System', date: 'Oct 10, 12:45 PM', status: 'optimal' },
  { id: 2, action: 'Manual Override - Node 07', user: 'Alex Chen', date: 'Oct 10, 11:20 AM', status: 'caution' },
  { id: 3, action: 'Security Protocol Patch V4.2', user: 'Root', date: 'Oct 09, 09:15 PM', status: 'optimal' },
  { id: 4, action: 'New Agent Deployment: Gamma', user: 'Alex Chen', date: 'Oct 09, 04:30 PM', status: 'optimal' },
  { id: 5, action: 'Infrastructure Scaling complete', user: 'System', date: 'Oct 09, 02:00 PM', status: 'optimal' },
  { id: 6, action: 'Unauthorized access attempt', user: 'System', date: 'Oct 08, 01:22 AM', status: 'alert' },
];

const History = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-zinc-100 mb-2">Operation History</h1>
          <p className="text-zinc-500">Immutable record of all system modifications and user interactions.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-lg text-xs font-bold text-zinc-400 hover:text-zinc-100 transition-colors flex items-center gap-2">
            <Filter className="w-3 h-3" /> Filter
          </button>
          <button className="px-3 py-1.5 bg-blue-600 rounded-lg text-xs font-bold text-white hover:bg-blue-500 transition-colors flex items-center gap-2">
            <Download className="w-3 h-3" /> Export CSV
          </button>
        </div>
      </div>

      <div className="bg-zinc-900/10 border border-zinc-800 rounded-2xl overflow-hidden backdrop-blur-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-900/30">
                <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Activity</th>
                <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Initiated By</th>
                <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Timestamp</th>
                <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Status</th>
                <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50">
              {historyItems.map((item) => (
                <tr key={item.id} className="group hover:bg-zinc-800/10 transition-colors">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-zinc-100">{item.action}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${item.user === 'System' ? 'bg-indigo-500' : 'bg-blue-500'}`} />
                      <span className="text-sm text-zinc-400">{item.user}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-xs text-zinc-500 font-mono uppercase">{item.date}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      item.status === 'optimal' ? 'bg-emerald-500/10 text-emerald-400' :
                      item.status === 'caution' ? 'bg-amber-500/10 text-amber-400' :
                      'bg-rose-500/10 text-rose-400'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-1 text-zinc-600 hover:text-zinc-300 transition-colors">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 border-t border-zinc-800 bg-zinc-900/20 flex items-center justify-between">
          <span className="text-xs text-zinc-500 font-medium">Showing 6 of 1,284 events</span>
          <div className="flex gap-2">
            <button className="w-8 h-8 rounded-lg border border-zinc-800 flex items-center justify-center text-zinc-500 hover:text-zinc-100 hover:bg-zinc-800 transition-colors">1</button>
            <button className="w-8 h-8 rounded-lg border border-zinc-800 flex items-center justify-center text-zinc-500 hover:text-zinc-100 hover:bg-zinc-800 transition-colors">2</button>
            <span className="flex items-center text-zinc-600 text-xs px-2">...</span>
            <button className="w-8 h-8 rounded-lg border border-zinc-800 flex items-center justify-center text-zinc-500 hover:text-zinc-100 hover:bg-zinc-800 transition-colors">45</button>
          </div>
        </div>
      </div>

      <div className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-2xl">
        <h3 className="font-semibold text-zinc-100 mb-6 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-blue-400" />
          System Activity Projection
        </h3>
        <div className="flex gap-1 h-32 items-end">
          {[...Array(40)].map((_, i) => (
            <motion.div 
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${Math.random() * 100}%` }}
              transition={{ delay: i * 0.01 }}
              className={`flex-1 rounded-t-sm transition-colors cursor-pointer group relative ${
                i % 7 === 0 ? 'bg-rose-500/40 hover:bg-rose-500' : 
                i % 3 === 0 ? 'bg-blue-600/40 hover:bg-blue-600' : 'bg-zinc-700/40 hover:bg-zinc-500'
              }`}
            >
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-zinc-900 border border-zinc-800 text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-10 transition-opacity">
                Activity: {Math.floor(Math.random() * 1000)} events
              </div>
            </motion.div>
          ))}
        </div>
        <div className="flex justify-between mt-4 text-[10px] font-bold text-zinc-600 uppercase tracking-widest">
          <span>Sep 01</span>
          <span>Sep 15</span>
          <span>Today</span>
        </div>
      </div>
    </motion.div>
  );
};

export default History;
