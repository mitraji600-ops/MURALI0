'use client';

import * as motion from 'motion/react-client';

export function Loader() {
  return (
    <div className="fixed inset-0 bg-[#050505] flex flex-col items-center justify-center z-[100] overflow-hidden">
      {/* Animated Gradients / Aurora */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-purple-600/20 blur-[100px] rounded-full"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.2, 0.1],
            rotate: [0, -90, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] bg-cyan-600/20 blur-[120px] rounded-full"
        />
      </div>

      {/* Rotating Rings */}
      <div className="relative flex items-center justify-center w-32 h-32 mb-8">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 border border-purple-500/30 rounded-full border-t-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.4)]"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          className="absolute inset-2 border border-cyan-500/30 rounded-full border-b-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.4)]"
        />
        
        {/* Murli Logo */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 flex flex-col items-center"
        >
          <span className="text-3xl font-bold tracking-tighter text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">M</span>
        </motion.div>
      </div>

      {/* Loading Text */}
      <motion.div
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="flex flex-col items-center gap-2"
      >
        <span className="text-sm font-mono tracking-[0.2em] text-zinc-400 uppercase">Loading...</span>
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
              className="w-1 h-1 bg-white rounded-full shadow-[0_0_5px_rgba(255,255,255,0.8)]"
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
