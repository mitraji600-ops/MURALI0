'use client';

import Image from 'next/image';

const POSTS = [
  'https://picsum.photos/seed/p1/600/600',
  'https://picsum.photos/seed/p2/600/600',
  'https://picsum.photos/seed/p3/600/600',
  'https://picsum.photos/seed/p4/600/600',
  'https://picsum.photos/seed/p5/600/600',
  'https://picsum.photos/seed/p6/600/600',
];

export default function Profile() {
  return (
    <>
      <main className="flex-1 flex flex-col min-h-screen bg-[#0a0a0a] overflow-y-auto">
        <div className="max-w-4xl mx-auto w-full pb-24 md:pb-12">
          
          {/* Banner */}
          <div className="w-full h-48 md:h-64 relative bg-zinc-900 border-b border-zinc-800">
             <Image src="https://picsum.photos/seed/banner2/1200/400" alt="Banner" fill className="object-cover opacity-80" referrerPolicy="no-referrer" />
          </div>

          <div className="px-4 sm:px-8">
            {/* Profile Info */}
            <div className="relative -mt-16 sm:-mt-20 mb-6 flex justify-between items-end">
              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-[#0a0a0a] bg-zinc-800 overflow-hidden relative z-10">
                <Image src="https://picsum.photos/seed/alexchen/400/400" alt="Alex Chen" fill className="object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="flex gap-3 mb-4">
                <button className="px-6 py-2 bg-[#121212] border border-zinc-700 text-sm font-medium rounded-lg hover:bg-zinc-800 transition-colors">
                  Edit Profile
                </button>
                <button className="px-6 py-2 bg-[#121212] border border-zinc-700 text-sm font-medium rounded-lg hover:bg-zinc-800 transition-colors">
                  Share
                </button>
              </div>
            </div>

            <div className="mb-10">
              <h1 className="text-3xl font-bold text-white mb-1">Alex Chen</h1>
              <p className="text-zinc-500 mb-4">@alexc_design</p>
              <p className="text-zinc-300 max-w-xl leading-relaxed">
                Digital artist and minimalist UI enthusiast. Exploring the intersection of generative art and functional design. Based in Tokyo.
              </p>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-12 border-t border-b border-zinc-800/60 py-6 mb-8">
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-white mb-1">14.2k</span>
                <span className="text-xs font-medium text-zinc-500 tracking-wider">FOLLOWERS</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-white mb-1">892</span>
                <span className="text-xs font-medium text-zinc-500 tracking-wider">FOLLOWING</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-white mb-1">2.1M</span>
                <span className="text-xs font-medium text-zinc-500 tracking-wider">LIKES</span>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-8 mb-6 border-b border-zinc-800/60">
              <button className="text-white font-medium border-b-2 border-white pb-4 px-2">Posts</button>
              <button className="text-zinc-500 font-medium pb-4 px-2 hover:text-zinc-300 transition-colors">Reels</button>
              <button className="text-zinc-500 font-medium pb-4 px-2 hover:text-zinc-300 transition-colors">Tagged</button>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-3 gap-1 sm:gap-2">
              {POSTS.map((post, i) => (
                <div key={i} className="aspect-square relative bg-zinc-900 group cursor-pointer">
                  <Image src={post} alt="Post" fill className="object-cover group-hover:opacity-80 transition-opacity" referrerPolicy="no-referrer" />
                </div>
              ))}
            </div>

          </div>
        </div>
      </main>
    </>
  );
}
