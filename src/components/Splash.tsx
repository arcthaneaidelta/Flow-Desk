import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Cpu, Database, Shield, Globe } from 'lucide-react';

const Splash = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 1.2;
      });
    }, 30);
    return () => clearInterval(interval);
  }, [onComplete]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#09090b] overflow-hidden"
    >
      {/* Cinematic Scanning Line */}
      <motion.div 
        animate={{ top: ['-10%', '110%'] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="absolute left-0 right-0 h-[2px] bg-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.8)] z-50 pointer-events-none"
      />
      
      {/* Background Glows */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(37,99,235,0.08),_transparent_70%)]" />
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-900/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-indigo-900/10 blur-[120px] rounded-full" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-center"
      >
        {/* Logo Section */}
        <motion.div variants={itemVariants} className="relative mb-12">
          <div className="w-24 h-24 bg-blue-600 rounded-[2.5rem] flex items-center justify-center shadow-[0_0_60px_rgba(37,99,235,0.5)] rotate-12">
            <Zap className="w-12 h-12 text-white fill-white -rotate-12" />
          </div>
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-4 border border-blue-500/20 rounded-[3rem]"
          />
        </motion.div>

        {/* Text Section */}
        <motion.div variants={itemVariants} className="text-center mb-8">
          <h1 className="text-5xl font-black tracking-tighter text-white mb-2">
            WHISPERFLOW <span className="text-blue-500">ELITE</span>
          </h1>
          <p className="text-zinc-500 text-sm font-medium tracking-[0.4em] uppercase">
            Neural Operating System v2.0
          </p>
        </motion.div>

        {/* Chips/Status Section */}
        <motion.div variants={itemVariants} className="flex gap-4 mb-16">
          {[
            { icon: Cpu, label: 'Core' },
            { icon: Database, label: 'Neural' },
            { icon: Shield, label: 'Secure' },
            { icon: Globe, label: 'Global' }
          ].map((chip, i) => (
            <div key={i} className="px-4 py-2 bg-zinc-900/50 border border-zinc-800 rounded-full flex items-center gap-2 backdrop-blur-md">
              <chip.icon className="w-3 h-3 text-blue-400" />
              <span className="text-[10px] font-bold text-zinc-300 uppercase tracking-widest">{chip.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Progress Section */}
        <motion.div variants={itemVariants} className="w-80 flex flex-col items-center">
          <div className="flex justify-between w-full mb-3 px-1">
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">System Initializing...</span>
            <span className="text-[10px] font-mono text-blue-400 font-bold">{Math.round(progress)}%</span>
          </div>
          <div className="w-full h-1.5 bg-zinc-900/80 rounded-full overflow-hidden border border-zinc-800">
            <motion.div 
              className="h-full bg-gradient-to-r from-blue-600 via-blue-400 to-indigo-500 shadow-[0_0_15px_rgba(37,99,235,0.5)]"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "easeOut" }}
            />
          </div>
          <p className="mt-4 text-[9px] text-zinc-600 uppercase tracking-[0.3em] font-medium">
            Applying neural configuration settings...
          </p>
        </motion.div>
      </motion.div>

      {/* Decorative Corners */}
      <div className="absolute top-8 left-8 w-12 h-12 border-t-2 border-l-2 border-zinc-800" />
      <div className="absolute top-8 right-8 w-12 h-12 border-t-2 border-r-2 border-zinc-800" />
      <div className="absolute bottom-8 left-8 w-12 h-12 border-b-2 border-l-2 border-zinc-800" />
      <div className="absolute bottom-8 right-8 w-12 h-12 border-b-2 border-r-2 border-zinc-800" />
    </motion.div>
  );
};

export default Splash;
