'use client';

import { Heart, MessageSquare, Repeat2, Share, Bookmark } from 'lucide-react';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { useState, memo } from 'react';
import * as motion from 'motion/react-client';

interface PostProps {
  author?: {
    name: string;
    username: string;
    avatar: string;
  };
  timeAgo?: string;
  content?: string;
  image?: string;
  stats?: {
    likes: string;
    comments: string;
    shares: string;
  };
}

export const PostCard = memo(function PostCard({ author, timeAgo, content, image, stats }: PostProps) {
  const [liked, setLiked] = useState(false);
  
  if (!author || !stats) return null;

  return (
    <Card className="p-4 sm:p-6 mb-6 hover:border-zinc-700/50 transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-zinc-800 shrink-0">
            <Image src={author.avatar} alt={author.name} width={40} height={40} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-zinc-100 text-sm">{author.name}</span>
            <span className="text-xs text-zinc-500">@{author.username} • {timeAgo}</span>
          </div>
        </div>
        <button className="text-zinc-500 hover:text-zinc-300 transition-colors">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="1" />
            <circle cx="19" cy="12" r="1" />
            <circle cx="5" cy="12" r="1" />
          </svg>
        </button>
      </div>

      <div className="mb-4">
        <p className="text-sm sm:text-base text-zinc-200 leading-relaxed mb-4 whitespace-pre-wrap">
          {content}
        </p>
        {image && (
          <div className="rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800/50 aspect-video relative">
            <Image src={image} alt="Post media" fill sizes="(max-width: 768px) 100vw, 42rem" className="object-cover" referrerPolicy="no-referrer" />
          </div>
        )}
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-zinc-800/50">
        <div className="flex items-center gap-6">
          <button 
            onClick={() => setLiked(!liked)}
            className="flex items-center gap-2 text-zinc-400 hover:text-red-500 transition-colors group"
          >
            <motion.div
              animate={liked ? { scale: [1, 1.4, 1] } : {}}
              transition={{ duration: 0.3 }}
            >
              <Heart className={`w-5 h-5 ${liked ? 'fill-red-500 text-red-500' : 'group-hover:fill-current'}`} />
            </motion.div>
            <span className="text-xs font-medium">{stats.likes}</span>
          </button>
          <button className="flex items-center gap-2 text-zinc-400 hover:text-blue-500 transition-colors group">
            <MessageSquare className="w-5 h-5 group-hover:fill-current" />
            <span className="text-xs font-medium">{stats.comments}</span>
          </button>
          <button className="flex items-center gap-2 text-zinc-400 hover:text-emerald-500 transition-colors">
            <Repeat2 className="w-5 h-5" />
            <span className="text-xs font-medium">{stats.shares}</span>
          </button>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-zinc-400 hover:text-white transition-colors">
            <Share className="w-5 h-5" />
          </button>
          <button className="text-zinc-400 hover:text-white transition-colors">
            <Bookmark className="w-5 h-5" />
          </button>
        </div>
      </div>
    </Card>
  );
});
