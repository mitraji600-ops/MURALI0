'use client';

import { Heart, MessageSquare, Repeat2, Share, Bookmark } from 'lucide-react';
import Image from 'next/image';
import { useState, memo } from 'react';
import * as motion from 'motion/react-client';

export const PostCard = memo(function PostCard(props: any) {
  const [liked, setLiked] = useState(false);
  
  const authorName = props.authorName || 'Unknown User';
  const authorAvatar = props.authorAvatar || 'https://picsum.photos/seed/user/40/40';
  const content = props.content;
  const image = props.mediaUrl;
  const likes = props.likesCount || 0;
  const comments = props.commentsCount || 0;
  const shares = 0;
  
  return (
    <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 sm:p-6 mb-6 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300 backdrop-blur-sm">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-zinc-800 shrink-0">
            <Image src={authorAvatar} alt={authorName} width={40} height={40} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-zinc-100 text-sm">{authorName}</span>
            <span className="text-xs text-zinc-500">Just now</span>
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
          <div className="rounded-2xl overflow-hidden bg-zinc-900 border border-white/5 relative">
            {props.type === 'video' || image.endsWith('.mp4') || image.endsWith('.webm') ? (
              <video src={image} controls className="w-full aspect-video object-cover rounded-2xl" />
            ) : props.type === 'podcast' || image.endsWith('.mp3') || image.endsWith('.wav') ? (
              <div className="p-4 bg-white/5 rounded-2xl">
                <audio src={image} controls className="w-full" />
              </div>
            ) : (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img src={image} alt="Post media" className="w-full max-h-[500px] object-cover rounded-2xl" />
            )}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-white/5">
        <div className="flex items-center gap-6 mt-2">
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
            <span className="text-xs font-medium">{likes + (liked ? 1 : 0)}</span>
          </button>
          <button className="flex items-center gap-2 text-zinc-400 hover:text-blue-500 transition-colors group">
            <MessageSquare className="w-5 h-5 group-hover:fill-current" />
            <span className="text-xs font-medium">{comments}</span>
          </button>
          <button className="flex items-center gap-2 text-zinc-400 hover:text-emerald-500 transition-colors">
            <Repeat2 className="w-5 h-5" />
            <span className="text-xs font-medium">{shares}</span>
          </button>
        </div>
        <div className="flex items-center gap-4 mt-2">
          <button className="text-zinc-400 hover:text-white transition-colors">
            <Share className="w-5 h-5" />
          </button>
          <button className="text-zinc-400 hover:text-white transition-colors">
            <Bookmark className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
});
