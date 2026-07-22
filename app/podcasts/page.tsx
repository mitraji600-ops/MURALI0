'use client';

import { Bell, Sparkles } from 'lucide-react';
import * as motion from 'motion/react-client';
import Link from 'next/link';

export default function PodcastsPage() {
  const podcasts: any[] = [];
  const loading = false;
  const error = null;

  return (
    <main className="flex-1 flex flex-col min-h-screen overflow-y-auto bg-[#050505] relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none fixed">
          <motion.div
            animate={{ opacity: [0.02, 0.05, 0.02], scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute top-[30%] right-[-10%] w-[50%] h-[50%] bg-emerald-600/20 blur-[120px] rounded-full"
          />
        </div>

        {/* Mobile Header */}
        <header className="md:hidden flex items-center justify-between p-4 border-b border-white/5 bg-[#050505]/60 backdrop-blur-xl sticky top-0 z-20">
          <span className="text-xl font-bold tracking-tighter text-white">PODCASTS</span>
          <button className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors">
            <Bell className="w-4 h-4" />
          </button>
        </header>

        {/* Desktop Header */}
        <header className="hidden md:flex items-center justify-between p-6 sticky top-0 z-20 pointer-events-none">
          <span className="text-2xl font-bold tracking-tighter text-white pointer-events-auto">PODCASTS</span>
          <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-all shadow-[0_0_15px_rgba(255,255,255,0.02)] pointer-events-auto backdrop-blur-sm">
            <Bell className="w-5 h-5" />
          </button>
        </header>

        <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 pb-24 md:pb-6 pt-4 md:pt-0 relative z-10 flex flex-col">
            {loading ? (
              <div className="flex flex-col gap-4">
                 {[1, 2, 3].map(i => (
                    <div key={i} className="h-32 bg-white/5 rounded-3xl animate-pulse" />
                 ))}
              </div>
            ) : error ? (
                <div className="text-center text-red-400 py-20 font-medium bg-red-500/5 border border-red-500/10 rounded-2xl backdrop-blur-sm">
                    Unable to synchronize podcasts.
                </div>
            ) : podcasts.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center justify-center py-32 text-center"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-2xl flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(255,255,255,0.05)] backdrop-blur-md">
                  <Sparkles className="w-10 h-10 text-white/80" />
                </div>
                <h2 className="text-2xl font-bold tracking-tight text-white mb-3">Silence is Golden</h2>
                <p className="text-zinc-400 text-sm max-w-sm mb-8 leading-relaxed">
                  There are no audio transmissions yet. Record the first podcast and let your voice be heard across Murli.
                </p>
                <Link href="/create?type=podcast" className="px-8 py-4 bg-white text-black rounded-full font-bold shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_30px_rgba(255,255,255,0.25)] hover:scale-105 active:scale-95 transition-all">
                  Record Podcast
                </Link>
              </motion.div>
            ) : (
              <div className="flex flex-col gap-4">
                {/* Podcasts will render here */}
              </div>
            )}
        </div>
      </main>
  );
}
