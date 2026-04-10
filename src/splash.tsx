import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import './index.css';

const Splash = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 1.2 : 100));
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-[#09090b] text-white select-none">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          duration: 1.2,
          ease: [0.16, 1, 0.3, 1]
        }}
        className="relative"
      >
        <div className="w-24 h-24 bg-blue-600 rounded-3xl flex items-center justify-center shadow-[0_0_50px_rgba(37,99,235,0.4)]">
          <Zap className="w-12 h-12 text-white fill-white" />
        </div>
        
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute -inset-4 border border-blue-500/20 rounded-[2rem]"
        />
      </motion.div>

      <div className="mt-16 w-64 h-1 bg-zinc-900 rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-gradient-to-r from-blue-600 to-indigo-500"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
        />
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-6 text-center"
      >
        <h2 className="text-sm font-bold tracking-[0.3em] text-zinc-100 uppercase">
          WHISPERFLOW ELITE
        </h2>
        <p className="text-[10px] text-zinc-500 mt-2 font-medium">INITIALIZING NEURAL INTERFACE</p>
      </motion.div>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Splash />
  </React.StrictMode>
);
