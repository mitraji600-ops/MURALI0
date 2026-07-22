'use client';

import * as motion from 'motion/react-client';
import Link from 'next/link';

export function Landing() {
  return (
    <main className="flex-1 flex flex-col min-h-screen bg-[#050505] relative overflow-hidden items-center justify-center">
      {/* Deep Space / Cyber Background Gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ opacity: [0.1, 0.2, 0.1], scale: [1, 1.2, 1], rotate: [0, 10, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] bg-purple-600/20 blur-[150px] rounded-full"
        />
        <motion.div
          animate={{ opacity: [0.1, 0.15, 0.1], scale: [1, 1.1, 1], rotate: [0, -10, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] bg-cyan-600/20 blur-[120px] rounded-full"
        />
        
        {/* Subtle grid overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_10%,transparent_100%)]"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 max-w-4xl mx-auto w-full">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <div className="w-24 h-24 bg-white/5 border border-white/10 rounded-3xl mx-auto flex items-center justify-center mb-10 shadow-[0_0_50px_rgba(255,255,255,0.05)] backdrop-blur-md">
            <span className="text-5xl font-bold tracking-tighter text-white">M</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-white mb-6 drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]">
            MURLI
          </h1>
          <p className="text-lg md:text-2xl text-zinc-400 font-medium tracking-wide mb-2">
            The next generation of connection.
          </p>
          <p className="text-sm font-mono tracking-[0.4em] text-cyan-400 uppercase drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
            Future of the Past
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row gap-4 mt-16 w-full max-w-md justify-center"
        >
          <Link href="/signup" className="px-8 py-4 bg-white text-black rounded-full font-bold shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_30px_rgba(255,255,255,0.25)] hover:bg-zinc-200 transition-all flex-1">
            Initialize
          </Link>
          <Link href="/login" className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-full font-bold hover:bg-white/10 transition-all backdrop-blur-sm flex-1">
            Access Terminal
          </Link>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-0 right-0 flex justify-center z-10 pointer-events-none">
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-zinc-600"
        >
          <span className="text-xs font-mono tracking-widest uppercase">Scroll Down</span>
          <div className="w-px h-8 bg-gradient-to-b from-zinc-600 to-transparent"></div>
        </motion.div>
      </div>
    </main>
  );
}
