'use client';

import { Play, Eye, Heart } from 'lucide-react';
import Image from 'next/image';
import { useChallenges } from '@/features/challenges/hooks/use-challenges';

export default function Challenges() {
  const { challenges, loading, error, joinChallenge } = useChallenges();

  if (loading) {
    return (
      <main className="flex-1 flex flex-col min-h-screen bg-[#0a0a0a] items-center justify-center">
        <div className="w-10 h-10 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
      </main>
    );
  }

  return (
    <>
      <main className="flex-1 flex flex-col min-h-screen bg-[#0a0a0a] overflow-y-auto relative">
        <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 pb-24 md:pb-6 pt-6">
          
          {/* Header Banner */}
          <div className="relative w-full h-[320px] rounded-3xl overflow-hidden mb-12 bg-zinc-900 border border-zinc-800">
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent z-10" />
            
            <div className="absolute bottom-0 left-0 p-8 w-full max-w-3xl z-20">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-medium text-white mb-4">
                <TrendingIcon />
                Trending Challenge
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                #MurliDanceChallenge
              </h1>
              <p className="text-zinc-300 text-lg mb-6 leading-relaxed">
                Show us your best moves to the new summer anthem. Top 10 videos get featured on the main Explore page next week.
              </p>
              
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-white font-medium">
                  <Eye className="w-5 h-5 text-zinc-400" />
                  0 <span className="text-zinc-400 font-normal">views</span>
                </div>
                <div className="flex items-center gap-2 text-white font-medium">
                  <Play className="w-5 h-5 text-zinc-400" />
                  0 <span className="text-zinc-400 font-normal">videos</span>
                </div>
              </div>
            </div>
          </div>

          {/* Submissions Grid */}
          <h2 className="text-2xl font-bold text-white mb-6">Top Submissions</h2>
          
          {error ? (
            <div className="text-center text-red-500 py-10 font-mono border-2 border-dashed border-red-800 rounded-lg">
              Failed to load submissions.
            </div>
          ) : challenges.length === 0 ? (
            <div className="text-center text-zinc-500 py-10 font-mono border-2 border-dashed border-zinc-800 rounded-lg">
              No submissions yet. Be the first!
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {challenges.map((sub: any) => (
                <div 
                  key={sub.id} 
                  className={`relative rounded-2xl overflow-hidden bg-zinc-900 group ${sub.isHorizontal ? 'col-span-2 md:col-span-1 aspect-video md:aspect-[2/3]' : 'col-span-1 aspect-[2/3]'}`}
                >
                  {sub.image && <Image src={sub.image} alt={sub.author} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover transition-transform duration-700 group-hover:scale-105" referrerPolicy="no-referrer" />}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                  
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <span className="text-white font-medium text-sm drop-shadow-md">{sub.author}</span>
                    <div className="flex items-center gap-1.5 text-white text-sm font-medium drop-shadow-md">
                      <Heart className="w-4 h-4 fill-white text-white" />
                      {sub.likes}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Floating Action Button */}
        <div className="fixed bottom-24 md:bottom-12 left-0 right-0 flex justify-center pointer-events-none z-20">
          <button 
            onClick={() => joinChallenge('murli-dance')}
            className="pointer-events-auto bg-white text-black px-8 py-4 rounded-full font-bold text-lg shadow-2xl shadow-white/10 hover:scale-105 active:scale-95 transition-all flex items-center gap-3"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="12" y1="18" x2="12" y2="12" />
              <line x1="9" y1="15" x2="15" y2="15" />
            </svg>
            Join Challenge
          </button>
        </div>
      </main>
    </>
  );
}

function TrendingIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  );
}
