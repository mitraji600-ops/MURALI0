'use client';

import { Search, Sparkles } from 'lucide-react';
import Image from 'next/image';
import { useInbox } from '@/features/inbox/hooks/use-inbox';
import { useState } from 'react';
import * as motion from 'motion/react-client';
import Link from 'next/link';

export default function Inbox() {
  const { conversations, loading, error } = useInbox();
  const [search, setSearch] = useState('');

  return (
    <main className="flex-1 flex flex-col min-h-screen bg-[#050505] overflow-hidden relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none fixed">
        <motion.div
          animate={{ opacity: [0.02, 0.04, 0.02], scale: [1, 1.05, 1], rotate: [0, 5, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-[20%] left-[20%] w-[40%] h-[40%] bg-indigo-600/20 blur-[100px] rounded-full"
        />
      </div>

      <div className="max-w-4xl mx-auto w-full h-full flex flex-col px-4 sm:px-6 pt-6 pb-24 md:pb-6 relative z-10">
        
        <div className="mb-6 relative shrink-0">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-zinc-500" />
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-full py-3.5 pl-12 pr-6 text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all backdrop-blur-sm shadow-[0_0_15px_rgba(255,255,255,0.02)]"
            placeholder="Search conversations..."
          />
        </div>

        <div className="flex-1 overflow-y-auto space-y-2 pb-10">
          {loading ? (
            <div className="flex flex-col gap-2">
              {[1, 2, 3, 4].map(i => (
                 <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 animate-pulse">
                    <div className="w-12 h-12 rounded-full bg-white/10 shrink-0" />
                    <div className="flex-1 space-y-2">
                       <div className="h-4 bg-white/10 rounded w-1/4" />
                       <div className="h-3 bg-white/5 rounded w-1/2" />
                    </div>
                 </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center text-red-400 py-20 font-medium bg-red-500/5 border border-red-500/10 rounded-2xl backdrop-blur-sm">
              Failed to load inbox.
            </div>
          ) : conversations.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center py-20 px-6 text-center"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-2xl flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(255,255,255,0.05)] backdrop-blur-md">
                <Sparkles className="w-10 h-10 text-white/80" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-white mb-3">No Messages</h2>
              <p className="text-zinc-400 text-sm max-w-sm mb-8 leading-relaxed">
                Your inbox is currently empty. Start a conversation with other creators to connect.
              </p>
              <Link href="/explore" className="px-8 py-4 bg-white text-black rounded-full font-bold shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_30px_rgba(255,255,255,0.25)] hover:scale-105 active:scale-95 transition-all">
                Find Creators
              </Link>
            </motion.div>
          ) : (
            conversations.map((conv: any) => (
              <div 
                key={conv.id} 
                className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-transparent hover:border-white/10 transition-all cursor-pointer group backdrop-blur-sm"
              >
                <div className="relative shrink-0">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-white/10 relative">
                     {conv.isGroup ? (
                        <div className="w-full h-full flex items-center justify-center text-white text-lg font-medium">
                          {conv.name.charAt(0)}
                        </div>
                     ) : (
                        <Image src={conv.avatar} alt={conv.name} fill sizes="48px" className="object-cover" referrerPolicy="no-referrer" />
                     )}
                  </div>
                  {conv.unread && (
                    <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-[#050505] rounded-full group-hover:border-zinc-800 transition-colors shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className={`font-medium truncate ${conv.unread ? 'text-white' : 'text-zinc-300'}`}>
                      {conv.name}
                    </h3>
                    <span className="text-xs text-zinc-500 whitespace-nowrap ml-2">
                      {conv.time}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {!conv.unread && !conv.isGroup && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-600">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                    <p className={`text-sm truncate ${conv.unread ? 'text-zinc-200 font-medium' : 'text-zinc-500'}`}>
                      {conv.message}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </main>
  );
}
