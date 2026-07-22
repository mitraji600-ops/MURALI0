'use client';

import { useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import Image from 'next/image';
import { useExplore } from '@/features/explore/hooks/use-explore';
import * as motion from 'motion/react-client';

export default function Explore() {
  const [search, setSearch] = useState('');
  const { items, categories, loading, error } = useExplore();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }

  return (
    <main className="flex-1 flex flex-col min-h-screen bg-[#050505] relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none fixed z-0">
        <motion.div
          animate={{ opacity: [0.02, 0.04, 0.02], scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-[10%] left-[-10%] w-[50%] h-[50%] bg-emerald-600/20 blur-[120px] rounded-full"
        />
      </div>

      <div className="max-w-6xl mx-auto w-full px-6 pb-24 pt-8 relative z-10">
        
        {/* Search Bar */}
        <div className="relative mb-10">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-zinc-500" />
          </div>
          <input
            type="text"
            value={search}
            onChange={handleSearch}
            className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-12 pr-14 text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-white/30 transition-all text-sm backdrop-blur-sm"
            placeholder="Search the network..."
          />
          <button className="absolute inset-y-0 right-4 flex items-center text-zinc-500 hover:text-white transition-colors">
            <SlidersHorizontal className="h-5 w-5" />
          </button>
        </div>

        {loading ? (
          <div className="w-full flex flex-col gap-8">
            <div className="flex gap-2">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-8 w-24 bg-white/5 rounded-full animate-pulse" />
              ))}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[220px]">
               {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className={`bg-white/5 rounded-2xl animate-pulse ${i === 1 || i === 4 ? 'col-span-2 row-span-2' : ''}`} />
               ))}
            </div>
          </div>
        ) : error ? (
          <div className="text-center text-red-400 py-20 font-medium bg-red-500/5 border border-red-500/10 rounded-2xl backdrop-blur-sm">
            [ERR] Failed to load explore data.
          </div>
        ) : (
          <>
            {/* Categories */}
            <div className="flex items-center gap-2 overflow-x-auto pb-6 mb-2 scrollbar-hide">
              {categories.map((category, i) => (
                <button
                  key={category}
                  className={`px-6 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                    i === 0 
                      ? 'bg-white text-black' 
                      : 'bg-white/5 border border-white/10 text-zinc-400 hover:border-white/20 hover:text-white'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Bento Grid */}
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center border border-white/5 rounded-3xl bg-white/[0.02] backdrop-blur-sm">
                <Search className="w-12 h-12 text-white/20 mb-6" />
                <h3 className="text-xl font-bold text-white mb-2">No Content Found</h3>
                <p className="text-zinc-500 max-w-sm">
                  The network is vast, but this sector is empty. Try a different search parameter.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[220px]">
                {items.map((item: any) => (
                  <div
                    key={item.id}
                    className={`rounded-2xl overflow-hidden bg-[#121212] border border-zinc-800/50 group relative hover:border-zinc-700/50 transition-all ${
                      item.colSpan === 2 ? 'col-span-2' : 'col-span-1'
                    } ${item.rowSpan === 2 ? 'row-span-2' : 'row-span-1'}`}
                  >
                    {item.type === 'image' && (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img src={item.src || "https://picsum.photos/seed/explore/800/800"} alt="Explore" className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500" />
                    )}
                    {item.type === 'quote' && (
                      <div className="p-8 h-full flex flex-col justify-between">
                        <div className="text-zinc-500 text-3xl font-serif">“</div>
                        <p className="text-xl font-medium text-zinc-100 leading-snug">
                          {item.text}
                        </p>
                        <span className="text-sm text-zinc-500">— {item.author}</span>
                      </div>
                    )}
                    {item.type === 'video' && (
                      <div className="h-full flex flex-col items-center justify-center bg-zinc-900/30 p-6 relative group-hover:bg-zinc-900/50 transition-colors">
                        <div className="absolute inset-0 z-0">
                           {/* eslint-disable-next-line @next/next/no-img-element */}
                           <img src={item.thumbnail || "https://picsum.photos/seed/video/800/800"} alt="Video thumbnail" className="w-full h-full object-cover blur-[2px]" />
                           <div className="absolute inset-0 bg-black/40" />
                        </div>
                        <div className="relative z-10 flex flex-col items-center gap-4">
                          <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:scale-105 transition-transform">
                            <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                          <div className="text-center">
                            <h3 className="font-medium text-white text-sm">{item.title}</h3>
                          </div>
                        </div>
                      </div>
                    )}
                    {item.type === 'article' && (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img src={item.src || "https://picsum.photos/seed/article/800/800"} alt="Article" className="w-full h-full object-cover" />
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
