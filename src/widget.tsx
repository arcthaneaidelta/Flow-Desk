import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { motion, AnimatePresence } from 'framer-motion';
import { Command, Search, Cpu, Zap, Clipboard, X } from 'lucide-react';
import './index.css';

const Widget = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([
    { id: 1, title: 'Summarize Clipboard', icon: Clipboard, description: 'Analyze text in your clipboard' },
    { id: 2, title: 'System Diagnostics', icon: Cpu, description: 'Run performance check' },
    { id: 3, title: 'Network Optimization', icon: Zap, description: 'Boost connection stability' },
  ]);

  const closeWidget = () => {
    (window as any).electron.ipcRenderer.send('close-widget');
  };

  return (
    <div className="h-screen w-screen p-4 flex items-center justify-center bg-transparent">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="w-full max-w-lg bg-zinc-950/90 backdrop-blur-2xl border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden"
      >
        <div className="p-4 border-b border-zinc-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-zinc-500" />
          <input
            autoFocus
            type="text"
            placeholder="Search commands..."
            className="flex-1 bg-transparent border-none outline-none text-zinc-100 placeholder:text-zinc-600"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button onClick={closeWidget} className="p-1 hover:bg-zinc-800 rounded-lg transition-colors">
            <X className="w-4 h-4 text-zinc-500" />
          </button>
        </div>

        <div className="p-2 max-h-[300px] overflow-y-auto">
          {results.map((item, index) => (
            <button
              key={item.id}
              className="w-full flex items-center gap-4 p-3 hover:bg-white/5 rounded-xl transition-colors group text-left"
            >
              <div className="p-2 bg-zinc-900 rounded-lg group-hover:bg-blue-600/20 transition-colors">
                <item.icon className="w-5 h-5 text-zinc-400 group-hover:text-blue-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-zinc-200">{item.title}</h3>
                <p className="text-xs text-zinc-500">{item.description}</p>
              </div>
              <div className="text-[10px] font-mono text-zinc-600 bg-zinc-900 px-1.5 py-0.5 rounded border border-zinc-800">
                ↵
              </div>
            </button>
          ))}
        </div>

        <div className="p-3 bg-zinc-900/50 border-t border-zinc-800 flex justify-between items-center px-4">
          <div className="flex items-center gap-2">
            <Command className="w-3 h-3 text-zinc-500" />
            <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Whisperflow Command Center</span>
          </div>
          <div className="flex gap-3">
             <span className="text-[10px] text-zinc-600">↑↓ to navigate</span>
             <span className="text-[10px] text-zinc-600">ESC to close</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Widget />
  </React.StrictMode>
);
