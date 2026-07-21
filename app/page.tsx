'use client';

import { PostCard } from '@/components/post-card';
import { PostSkeleton } from '@/components/post-skeleton';
import { Bell } from 'lucide-react';
import { useFeed } from '@/features/feed/hooks/use-feed';
import * as motion from 'motion/react-client';

export default function Home() {
  const { posts, loading, error } = useFeed();

  return (
    <>
      <main className="flex-1 flex flex-col min-h-screen overflow-y-auto bg-[#0a0a0a]">
        {/* Mobile Header */}
        <header className="md:hidden flex items-center justify-between p-4 border-b border-zinc-800/50 bg-[#0a0a0a]/80 backdrop-blur-md sticky top-0 z-10">
          <span className="text-xl font-bold tracking-tight text-cyan-400 font-mono">Murli // Feed</span>
          <button className="w-8 h-8 rounded-sm bg-zinc-900 border border-cyan-900 flex items-center justify-center text-cyan-500 hover:text-cyan-300 transition-colors shadow-[0_0_10px_rgba(34,211,238,0.1)] hover:shadow-[0_0_15px_rgba(34,211,238,0.3)]">
            <Bell className="w-4 h-4" />
          </button>
        </header>

        {/* Desktop Header */}
        <header className="hidden md:flex items-center justify-end p-6 sticky top-0 z-10 bg-gradient-to-b from-[#0a0a0a] to-transparent pointer-events-none">
          <button className="w-10 h-10 rounded-sm bg-[#121212] border border-cyan-900 flex items-center justify-center text-cyan-500 hover:text-cyan-300 transition-colors shadow-[0_0_10px_rgba(34,211,238,0.1)] hover:shadow-[0_0_15px_rgba(34,211,238,0.3)] pointer-events-auto">
            <Bell className="w-5 h-5" />
          </button>
        </header>

        <div className="max-w-2xl mx-auto w-full px-4 sm:px-6 pb-24 md:pb-6 pt-4 md:pt-0">
          <div className="flex flex-col">
            {loading ? (
              <>
                <PostSkeleton />
                <PostSkeleton />
                <PostSkeleton />
              </>
            ) : error ? (
                <div className="text-center text-red-500 py-20 font-mono border-2 border-dashed border-red-800 rounded-lg">
                    [ERR] Failed to load feed.
                </div>
            ) : posts.length === 0 ? (
              <div className="text-center text-zinc-500 py-20 font-mono border-2 border-dashed border-zinc-800 rounded-lg">
                Make your first move on Murli.
              </div>
            ) : (
              <div className="flex flex-col">
                {posts.map((post: any, index: number) => (
                  <motion.div 
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      type: 'spring', 
                      stiffness: 300, 
                      damping: 24,
                      delay: index * 0.1 
                    }}
                  >
                    <PostCard {...post} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
