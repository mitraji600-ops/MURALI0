'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, PlusSquare, Mail, Bell, Image as ImageIcon, Video, Mic, LayoutDashboard, User, LogIn, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useAuth } from '@/hooks/use-auth';

export function Sidebar() {
  const pathname = usePathname();
  const { user, signOut, loading } = useAuth();
  
  if (loading || !user) return null;

  return (
    <aside className="hidden md:flex flex-col w-64 h-full border-r border-zinc-800/50 bg-[#0a0a0a] p-6 shrink-0 sticky top-0 overflow-y-auto">
      <div className="flex items-center justify-between mb-8 px-2">
        <Link href="/" className="text-2xl font-bold tracking-tight text-white flex flex-col">
          Murli
          <span className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase mt-1">Future of the Past</span>
        </Link>
      </div>

      <nav className="flex flex-col gap-1 mb-8">
        <Link href="/" className={cn("flex items-center gap-4 px-3 py-2.5 rounded-lg font-medium transition-colors", pathname === '/' ? "bg-white/5 text-white" : "text-zinc-500 hover:text-zinc-200 hover:bg-white/5")}>
          <Home className="w-5 h-5" />
          <span className="text-sm">Feed</span>
        </Link>
        <Link href="/explore" className={cn("flex items-center gap-4 px-3 py-2.5 rounded-lg font-medium transition-colors", pathname === '/explore' ? "bg-white/5 text-white" : "text-zinc-500 hover:text-zinc-200 hover:bg-white/5")}>
          <Search className="w-5 h-5" />
          <span className="text-sm">Explore</span>
        </Link>
        <Link href="/images" className={cn("flex items-center gap-4 px-3 py-2.5 rounded-lg font-medium transition-colors", pathname === '/images' ? "bg-white/5 text-white" : "text-zinc-500 hover:text-zinc-200 hover:bg-white/5")}>
          <ImageIcon className="w-5 h-5" />
          <span className="text-sm">Images</span>
        </Link>
        <Link href="/reels" className={cn("flex items-center gap-4 px-3 py-2.5 rounded-lg font-medium transition-colors", pathname === '/reels' ? "bg-white/5 text-white" : "text-zinc-500 hover:text-zinc-200 hover:bg-white/5")}>
          <Video className="w-5 h-5" />
          <span className="text-sm">Reels</span>
        </Link>
        <Link href="/podcasts" className={cn("flex items-center gap-4 px-3 py-2.5 rounded-lg font-medium transition-colors", pathname === '/podcasts' ? "bg-white/5 text-white" : "text-zinc-500 hover:text-zinc-200 hover:bg-white/5")}>
          <Mic className="w-5 h-5" />
          <span className="text-sm">Podcasts</span>
        </Link>
      </nav>
      
      <div className="text-xs font-semibold text-zinc-600 uppercase tracking-wider mb-2 px-3">Personal</div>
      <nav className="flex flex-col gap-1 mb-8">
        <Link href="/inbox" className={cn("flex items-center gap-4 px-3 py-2.5 rounded-lg font-medium transition-colors", pathname === '/inbox' ? "bg-white/5 text-white" : "text-zinc-500 hover:text-zinc-200 hover:bg-white/5")}>
          <Mail className="w-5 h-5" />
          <span className="text-sm">Messages</span>
        </Link>
        <Link href="/notifications" className={cn("flex items-center gap-4 px-3 py-2.5 rounded-lg font-medium transition-colors", pathname === '/notifications' ? "bg-white/5 text-white" : "text-zinc-500 hover:text-zinc-200 hover:bg-white/5")}>
          <Bell className="w-5 h-5" />
          <span className="text-sm">Notifications</span>
        </Link>
        <Link href="/profile" className={cn("flex items-center gap-4 px-3 py-2.5 rounded-lg font-medium transition-colors", pathname === '/profile' ? "bg-white/5 text-white" : "text-zinc-500 hover:text-zinc-200 hover:bg-white/5")}>
          <User className="w-5 h-5" />
          <span className="text-sm">Profile</span>
        </Link>
        <Link href="/creator" className={cn("flex items-center gap-4 px-3 py-2.5 rounded-lg font-medium transition-colors", pathname === '/creator' ? "bg-white/5 text-white" : "text-zinc-500 hover:text-zinc-200 hover:bg-white/5")}>
          <LayoutDashboard className="w-5 h-5" />
          <span className="text-sm">Creator Dashboard</span>
        </Link>
      </nav>

      <div className="mt-auto flex flex-col gap-3">
        <Link href="/create" className="flex items-center justify-center gap-2 px-4 py-3 bg-white text-black rounded-xl font-bold hover:bg-zinc-200 transition-colors shadow-lg shadow-white/5">
          <PlusSquare className="w-5 h-5" />
          <span>Create</span>
        </Link>
        
        <div className="mt-4 pt-4 border-t border-zinc-800/50">
          <Link href="/profile" className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-white/5 transition-colors group">
            <div className="w-10 h-10 rounded-full bg-zinc-800 overflow-hidden shrink-0 border border-zinc-700 group-hover:border-zinc-500 transition-colors">
              <Image src={user.photoURL || "https://picsum.photos/seed/user1/100/100"} alt="Profile" width={40} height={40} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-sm font-medium text-zinc-200 truncate group-hover:text-white transition-colors">{user.displayName || "User"}</span>
              <span className="text-xs text-zinc-500 truncate">{user.email || "No Email"}</span>
            </div>
          </Link>
          <button onClick={signOut} className="mt-2 flex items-center gap-4 px-3 py-2.5 rounded-lg font-medium transition-colors text-zinc-500 hover:text-red-400 hover:bg-red-500/10 w-full text-left">
            <LogOut className="w-4 h-4" />
            <span className="text-sm">Sign Out</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
