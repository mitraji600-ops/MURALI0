'use client';

import { useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import Image from 'next/image';
import { useExplore } from '@/features/explore/hooks/use-explore';

// Mock data, to be replaced by backend API for suggestions
const ALL_SUGGESTIONS = ['Photography', 'Minimalism', 'Architecture', 'Soundscapes', 'Typography', 'Films', 'Art'];

export default function Explore() {
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const { items, categories, loading, error } = useExplore();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearch(val);
    if (val.length > 0) {
      setSuggestions(ALL_SUGGESTIONS.filter(s => s.toLowerCase().includes(val.toLowerCase())));
    } else {
      setSuggestions([]);
    }
  }

  return (
    <main className="flex-1 flex flex-col min-h-screen bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto w-full px-6 pb-24 pt-8">
        
        {/* Search Bar */}
        <div className="relative mb-10">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-zinc-500" />
          </div>
          <input
            type="text"
            value={search}
            onChange={handleSearch}
            className="w-full bg-[#121212] border border-zinc-800 rounded-xl py-4 pl-12 pr-14 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-700 transition-all text-sm"
            placeholder="Search the unknown..."
          />
          {suggestions.length > 0 && (
            <div className="absolute w-full bg-[#121212] border border-zinc-800 rounded-xl mt-2 p-2 z-20 shadow-xl">
              {suggestions.map(s => <button key={s} className="block w-full text-left p-3 hover:bg-zinc-800 rounded text-sm text-zinc-300">{s}</button>)}
            </div>
          )}
          <button className="absolute inset-y-0 right-4 flex items-center text-zinc-500 hover:text-white transition-colors">
            <SlidersHorizontal className="h-5 w-5" />
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-4 border-zinc-600 border-t-zinc-300 rounded-full animate-spin" />
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-20 font-mono border-2 border-dashed border-red-800 rounded-xl">
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
                      : 'bg-[#121212] border border-zinc-800 text-zinc-400 hover:border-zinc-600 hover:text-white'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Bento Grid */}
            {items.length === 0 ? (
              <div className="text-center text-zinc-500 py-20 font-mono border-2 border-dashed border-zinc-800 rounded-xl">
                No content found. Try a different search.
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
                      <Image src={item.src!} alt="Explore" fill sizes="(max-width: 768px) 50vw, 33vw" className="object-cover group-hover:scale-[1.02] transition-transform duration-500" referrerPolicy="no-referrer" />
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
                           <Image src={item.thumbnail!} alt="Video thumbnail" fill sizes="(max-width: 768px) 50vw, 33vw" className="object-cover blur-[2px]" referrerPolicy="no-referrer" />
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
                      <Image src={item.src!} alt="Article" fill sizes="(max-width: 768px) 50vw, 50vw" className="object-cover" referrerPolicy="no-referrer" />
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
