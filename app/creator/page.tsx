'use client';

import { useAuth } from "@/hooks/use-auth";
import { Sparkles, BarChart2 } from "lucide-react";
import * as motion from 'motion/react-client';
import Link from "next/link";
import { Loader } from "@/components/loader";

export default function CreatorDashboard() {
  const { user, loading: authLoading } = useAuth();

  if (authLoading) return <Loader />;

  if (!user) {
    return (
      <main className="flex-1 flex items-center justify-center min-h-screen bg-[#050505]">
        <p className="text-zinc-500 font-mono">Authentication required.</p>
      </main>
    );
  }

  return (
    <main className="flex-1 flex flex-col min-h-screen bg-[#050505] p-6 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none fixed z-0">
        <motion.div
          animate={{ opacity: [0.02, 0.05, 0.02], scale: [1, 1.05, 1], rotate: [0, -5, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-1/4 w-[50%] h-[50%] bg-violet-600/20 blur-[120px] rounded-full"
        />
      </div>

      <div className="max-w-4xl mx-auto w-full relative z-10 flex flex-col items-center justify-center min-h-[70vh] text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center"
        >
          <div className="w-24 h-24 bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-3xl flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(255,255,255,0.05)] backdrop-blur-md">
            <BarChart2 className="w-12 h-12 text-white/80" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-4">Creator Dashboard</h1>
          <p className="text-zinc-400 text-base max-w-md mb-10 leading-relaxed">
            Analytics and monetization tools become available once you establish a consistent presence. Continue publishing high-quality content to unlock these features.
          </p>
          
          <div className="flex gap-4">
            <Link href="/create" className="px-8 py-4 bg-white text-black rounded-full font-bold shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_30px_rgba(255,255,255,0.25)] hover:scale-105 active:scale-95 transition-all">
              Create Content
            </Link>
            <Link href="/profile" className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-full font-bold hover:bg-white/10 transition-all backdrop-blur-sm">
              View Profile
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

