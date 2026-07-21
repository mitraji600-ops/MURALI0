'use client';

import { Search } from 'lucide-react';
import Image from 'next/image';
import { useInbox } from '@/features/inbox/hooks/use-inbox';
import { useState } from 'react';

export default function Inbox() {
  const { conversations, loading, error } = useInbox();
  const [search, setSearch] = useState('');

  return (
    <main className="flex-1 flex flex-col min-h-screen bg-[#0a0a0a] overflow-hidden">
      <div className="max-w-4xl mx-auto w-full h-full flex flex-col px-4 sm:px-6 pt-6 pb-24 md:pb-6">
        
        <div className="mb-6 relative shrink-0">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-zinc-500" />
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#121212] border border-zinc-800 rounded-full py-3.5 pl-12 pr-6 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-700 transition-colors"
            placeholder="Search conversations..."
          />
        </div>

        <div className="flex-1 overflow-y-auto space-y-2 pb-10">
          {loading ? (
            <div className="flex justify-center py-10">
              <div className="w-8 h-8 border-4 border-zinc-600 border-t-zinc-300 rounded-full animate-spin" />
            </div>
          ) : error ? (
            <div className="text-center text-red-500 py-10 font-mono border-2 border-dashed border-red-800 rounded-xl">
              Failed to load inbox.
            </div>
          ) : conversations.length === 0 ? (
            <div className="text-center text-zinc-500 py-20 font-mono border-2 border-dashed border-zinc-800 rounded-xl">
              No conversations found.
            </div>
          ) : (
            conversations.map((conv: any) => (
              <div 
                key={conv.id} 
                className="flex items-center gap-4 p-4 rounded-2xl bg-[#121212] hover:bg-[#181818] border border-transparent hover:border-zinc-800/50 transition-colors cursor-pointer group"
              >
                <div className="relative shrink-0">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-zinc-800 relative">
                     {conv.isGroup ? (
                        <div className="w-full h-full flex items-center justify-center bg-zinc-800 text-zinc-400 text-lg font-medium">
                          {conv.name.charAt(0)}
                        </div>
                     ) : (
                        <Image src={conv.avatar} alt={conv.name} fill sizes="48px" className="object-cover" referrerPolicy="no-referrer" />
                     )}
                  </div>
                  {conv.unread && (
                    <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-[#121212] rounded-full group-hover:border-[#181818] transition-colors" />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className={`font-medium truncate ${conv.unread ? 'text-white' : 'text-zinc-200'}`}>
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
                    <p className={`text-sm truncate ${conv.unread ? 'text-zinc-300 font-medium' : 'text-zinc-500'}`}>
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
