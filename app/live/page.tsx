'use client';

import { Mic, MicOff, VideoOff, Users } from 'lucide-react';
import Image from 'next/image';

const LIVE_STREAMS = [
  {
    id: 1,
    author: 'Sarah Chen',
    title: 'Design systems live QA',
    viewers: '2.4K',
    image: 'https://picsum.photos/seed/live1/800/600',
    isMuted: false,
    isAudioOnly: false,
  },
  {
    id: 2,
    author: 'Marcus T.',
    title: 'Arcade ops setup',
    viewers: '1.1K',
    image: 'https://picsum.photos/seed/live2/800/600',
    isMuted: false,
    isAudioOnly: false,
  },
  {
    id: 3,
    author: 'Elena R.',
    title: 'Reviewing community portfolios',
    viewers: '850',
    image: 'https://picsum.photos/seed/live3/800/600',
    isMuted: false,
    isAudioOnly: false,
  },
  {
    id: 4,
    author: 'David Kim',
    title: 'Multi-Guest Live',
    viewers: '1.2K',
    image: 'https://picsum.photos/seed/live4/800/600',
    isMuted: true,
    isAudioOnly: true,
  }
];

export default function Live() {
  return (
    <>
      <main className="flex-1 flex flex-col min-h-screen bg-[#0a0a0a] overflow-y-auto">
        <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 pb-24 md:pb-6 pt-6">
          
          <div className="flex items-center justify-between mb-8">
             <div className="flex items-center gap-3">
               <h1 className="text-2xl font-bold text-white tracking-tight">Murli</h1>
               <span className="px-2 py-0.5 rounded text-xs font-bold bg-red-500 text-white tracking-wider">LIVE</span>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {LIVE_STREAMS.map((stream) => (
              <div key={stream.id} className="relative aspect-video rounded-2xl overflow-hidden bg-zinc-900 group border border-zinc-800/50">
                <Image src={stream.image} alt={stream.title} fill className="object-cover" referrerPolicy="no-referrer" />
                
                {stream.id === 1 && (
                  <div className="absolute top-4 left-4 px-2 py-1 bg-red-500 rounded text-xs font-bold text-white tracking-wider">
                    ON AIR
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1 drop-shadow-md">{stream.author}</h3>
                    <div className="flex items-center gap-2 text-zinc-300 text-sm font-medium">
                      <VolumeIndicator />
                      <span>{stream.title}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-black/70 transition-colors">
                      {stream.isMuted ? <MicOff className="w-5 h-5 text-red-400" /> : <Mic className="w-5 h-5" />}
                    </button>
                    {stream.isAudioOnly && (
                      <button className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-black/70 transition-colors">
                        <VideoOff className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </div>

                {stream.id === 4 && (
                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                    <div className="w-12 h-12 rounded-lg bg-zinc-800 border border-zinc-700 overflow-hidden flex items-center justify-center relative">
                      <Users className="w-5 h-5 text-zinc-500" />
                      <span className="absolute bottom-1 text-[8px] text-zinc-400 font-medium">Guest 1</span>
                    </div>
                    <div className="w-12 h-12 rounded-lg bg-zinc-800 border border-zinc-700 overflow-hidden flex items-center justify-center relative">
                      <Users className="w-5 h-5 text-zinc-500" />
                      <span className="absolute bottom-1 text-[8px] text-zinc-400 font-medium">Guest 2</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* Chat Mock */}
          <div className="mt-8 rounded-2xl border border-zinc-800/50 bg-[#121212] p-4 flex items-center gap-4">
             <input 
               type="text" 
               placeholder="Send a message..." 
               className="flex-1 bg-transparent border-none focus:outline-none text-white placeholder:text-zinc-600"
             />
             <button className="text-zinc-400 hover:text-white transition-colors">
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                 <line x1="22" y1="2" x2="11" y2="13" />
                 <polygon points="22 2 15 22 11 13 2 9 22 2" />
               </svg>
             </button>
          </div>

        </div>
      </main>
    </>
  );
}

function VolumeIndicator() {
  return (
    <div className="flex items-end gap-0.5 h-3">
      <div className="w-1 bg-green-400 h-1 rounded-full animate-[bounce_1s_infinite_100ms]" />
      <div className="w-1 bg-green-400 h-2 rounded-full animate-[bounce_1s_infinite_200ms]" />
      <div className="w-1 bg-green-400 h-3 rounded-full animate-[bounce_1s_infinite_300ms]" />
      <div className="w-1 bg-green-400 h-2 rounded-full animate-[bounce_1s_infinite_400ms]" />
    </div>
  );
}
