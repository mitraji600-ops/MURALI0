'use client';

import { Bell, Sparkles } from 'lucide-react';
import * as motion from 'motion/react-client';
import Link from 'next/link';

// We will fetch real images later via a useImages hook. For now, we only render the empty state if there is no data.
// No mock images per the user's strict instructions.

export default function ImagesPage() {
  const images: any[] = []; // No mock images
  const loading = false;
  const error = null;

  return (
    <main className="flex-1 flex flex-col min-h-screen overflow-y-auto bg-[#050505] relative">
        {/* Animated Aurora Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none fixed">
          <motion.div
            animate={{ opacity: [0.03, 0.08, 0.03], scale: [1, 1.05, 1], rotate: [0, 5, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-blue-600/30 blur-[120px] rounded-full"
          />
          <motion.div
            animate={{ opacity: [0.03, 0.06, 0.03], scale: [1, 1.1, 1], rotate: [0, -5, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-600/20 blur-[100px] rounded-full"
          />
        </div>

        {/* Mobile Header */}
        <header className="md:hidden flex items-center justify-between p-4 border-b border-white/5 bg-[#050505]/60 backdrop-blur-xl sticky top-0 z-20">
          <span className="text-xl font-bold tracking-tighter text-white">IMAGES</span>
          <button className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors">
            <Bell className="w-4 h-4" />
          </button>
        </header>

        {/* Desktop Header */}
        <header className="hidden md:flex items-center justify-between p-6 sticky top-0 z-20 pointer-events-none">
          <span className="text-2xl font-bold tracking-tighter text-white pointer-events-auto">IMAGES</span>
          <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-all shadow-[0_0_15px_rgba(255,255,255,0.02)] pointer-events-auto backdrop-blur-sm">
            <Bell className="w-5 h-5" />
          </button>
        </header>

        <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 pb-24 md:pb-6 pt-4 md:pt-0 relative z-10">
          <div className="flex flex-col">
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                 {[1, 2, 3, 4, 5, 6].map(i => (
                    <div key={i} className="aspect-square bg-white/5 rounded-2xl animate-pulse" />
                 ))}
              </div>
            ) : error ? (
                <div className="text-center text-red-400 py-20 font-medium bg-red-500/5 border border-red-500/10 rounded-2xl backdrop-blur-sm">
                    Unable to synchronize images gallery.
                </div>
            ) : images.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center justify-center py-32 px-6 text-center"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-2xl flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(255,255,255,0.05)] backdrop-blur-md">
                  <Sparkles className="w-10 h-10 text-white/80" />
                </div>
                <h2 className="text-2xl font-bold tracking-tight text-white mb-3">The Gallery is Empty</h2>
                <p className="text-zinc-400 text-sm max-w-sm mb-8 leading-relaxed">
                  No images have been shared yet. Be the first to upload a visual moment to the Murli universe.
                </p>
                <Link href="/create?type=image" className="px-8 py-4 bg-white text-black rounded-full font-bold shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_30px_rgba(255,255,255,0.25)] hover:scale-105 active:scale-95 transition-all">
                  Upload Image
                </Link>
              </motion.div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {/* Images will render here */}
              </div>
            )}
          </div>
        </div>
      </main>
  );
}
