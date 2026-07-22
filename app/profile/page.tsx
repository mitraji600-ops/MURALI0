'use client';

import Image from 'next/image';
import { useAuth } from '@/hooks/use-auth';
import { useProfilePosts } from '@/features/profile/hooks/use-profile';
import { Loader } from '@/components/loader';
import { Sparkles, Image as ImageIcon, Video, AlignLeft } from 'lucide-react';
import * as motion from 'motion/react-client';

export default function Profile() {
  const { user, loading: authLoading } = useAuth();
  const { posts, loading: postsLoading } = useProfilePosts(user?.uid);

  if (authLoading) return <Loader />;

  if (!user) {
    return (
      <main className="flex-1 flex items-center justify-center min-h-screen bg-[#050505]">
        <p className="text-zinc-500 font-mono">Authentication required.</p>
      </main>
    );
  }

  const totalLikes = posts.reduce((sum, post) => sum + (post.likesCount || 0), 0);

  return (
    <>
      <main className="flex-1 flex flex-col min-h-screen bg-[#050505] overflow-y-auto relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none fixed z-0">
          <motion.div
            animate={{ opacity: [0.02, 0.05, 0.02], scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 right-0 w-[60%] h-[60%] bg-blue-600/20 blur-[120px] rounded-full"
          />
        </div>

        <div className="max-w-4xl mx-auto w-full pb-24 md:pb-12 relative z-10">
          
          {/* Banner */}
          <div className="w-full h-48 md:h-64 relative bg-zinc-900 border-b border-white/5">
             <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 to-[#050505]/80" />
          </div>

          <div className="px-4 sm:px-8">
            {/* Profile Info */}
            <div className="relative -mt-16 sm:-mt-20 mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-[#050505] bg-zinc-800 overflow-hidden relative z-10">
                <Image src={user.photoURL || "https://picsum.photos/seed/user1/400/400"} alt={user.displayName || "User"} fill className="object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="flex gap-3 mb-2 sm:mb-4">
                <button className="px-6 py-2 bg-white/5 border border-white/10 text-white text-sm font-medium rounded-lg hover:bg-white/10 transition-colors backdrop-blur-sm">
                  Edit Profile
                </button>
              </div>
            </div>

            <div className="mb-10">
              <h1 className="text-3xl font-bold text-white mb-1">{user.displayName || "Unknown User"}</h1>
              <p className="text-zinc-500 mb-4">{user.email}</p>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-12 border-t border-b border-white/5 py-6 mb-8">
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-white mb-1">0</span>
                <span className="text-xs font-medium text-zinc-500 tracking-wider">FOLLOWERS</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-white mb-1">0</span>
                <span className="text-xs font-medium text-zinc-500 tracking-wider">FOLLOWING</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-white mb-1">{totalLikes}</span>
                <span className="text-xs font-medium text-zinc-500 tracking-wider">LIKES</span>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-8 mb-6 border-b border-white/5">
              <button className="text-white font-medium border-b-2 border-white pb-4 px-2">Posts</button>
              <button className="text-zinc-500 font-medium pb-4 px-2 hover:text-zinc-300 transition-colors">Reels</button>
            </div>

            {/* Grid */}
            {postsLoading ? (
              <div className="grid grid-cols-3 gap-1 sm:gap-2">
                 {[1, 2, 3, 4, 5, 6].map(i => (
                    <div key={i} className="aspect-square bg-white/5 animate-pulse" />
                 ))}
              </div>
            ) : posts.length === 0 ? (
               <div className="flex flex-col items-center justify-center py-20 text-center border border-white/5 rounded-2xl bg-white/[0.02]">
                  <Sparkles className="w-8 h-8 text-zinc-600 mb-4" />
                  <p className="text-zinc-400 font-medium">No posts yet.</p>
               </div>
            ) : (
              <div className="grid grid-cols-3 gap-1 sm:gap-2">
                {posts.map((post) => (
                  <div key={post.id} className="aspect-square relative bg-white/5 group cursor-pointer overflow-hidden">
                    {post.type === 'image' && post.mediaUrl ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img src={post.mediaUrl} alt="Post" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : post.type === 'video' ? (
                       <div className="w-full h-full flex items-center justify-center bg-zinc-900 group-hover:bg-zinc-800 transition-colors">
                          <Video className="w-8 h-8 text-zinc-600" />
                       </div>
                    ) : (
                       <div className="w-full h-full flex items-center justify-center bg-zinc-900 p-4 group-hover:bg-zinc-800 transition-colors text-center">
                          <AlignLeft className="w-6 h-6 text-zinc-600 mb-2" />
                       </div>
                    )}
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>
      </main>
    </>
  );
}
