'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, PlusSquare, Mail, Bell, Trophy, Radio, LogIn, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useAuth } from '@/hooks/use-auth';

export function Sidebar() {
  const pathname = usePathname();
  const { user, signOut } = useAuth();
  
  return (
    <aside className="hidden md:flex flex-col w-64 h-full border-r border-zinc-800/50 bg-[#0a0a0a] p-6 shrink-0 sticky top-0">
      <div className="flex items-center justify-between mb-12 px-2">
        <Link href="/" className="text-2xl font-bold tracking-tight text-white">
          Murli
        </Link>
      </div>

      <nav className="flex flex-col gap-2">
        <Link href="/" className={cn("flex items-center gap-4 px-3 py-2 rounded-lg font-medium transition-colors", pathname === '/' ? "text-white" : "text-zinc-500 hover:text-white")}>
          <Home className="w-5 h-5" />
          <span className="text-sm">Feed</span>
        </Link>
        <Link href="/explore" className={cn("flex items-center gap-4 px-3 py-2 rounded-lg font-medium transition-colors", pathname === '/explore' ? "text-white" : "text-zinc-500 hover:text-white")}>
          <Search className="w-5 h-5" />
          <span className="text-sm">Explore</span>
        </Link>
        <Link href="/challenges" className={cn("flex items-center gap-4 px-3 py-2 rounded-lg font-medium transition-colors", pathname === '/challenges' ? "text-white" : "text-zinc-500 hover:text-white")}>
          <Trophy className="w-5 h-5" />
          <span className="text-sm">Challenges</span>
        </Link>
        <Link href="/live" className={cn("flex items-center gap-4 px-3 py-2 rounded-lg font-medium transition-colors", pathname === '/live' ? "text-white" : "text-zinc-500 hover:text-white")}>
          <Radio className="w-5 h-5" />
          <span className="text-sm">Live</span>
        </Link>
        <Link href="/create" className={cn("flex items-center gap-4 px-3 py-2 rounded-lg font-medium transition-colors", pathname === '/create' ? "text-white" : "text-zinc-500 hover:text-white")}>
          <PlusSquare className="w-5 h-5" />
          <span className="text-sm">Create</span>
        </Link>
        <Link href="/inbox" className={cn("flex items-center gap-4 px-3 py-2 rounded-lg font-medium transition-colors", pathname === '/inbox' ? "text-white" : "text-zinc-500 hover:text-white")}>
          <Mail className="w-5 h-5" />
          <span className="text-sm">Inbox</span>
        </Link>
      </nav>

      <div className="mt-auto flex flex-col gap-4">
        {user ? (
          <>
            <div className="flex items-center gap-3 pt-6 px-2 border-t border-zinc-800/50">
              <div className="w-10 h-10 rounded-full bg-zinc-800 overflow-hidden shrink-0">
                <Image src={user.photoURL || "https://picsum.photos/seed/user1/100/100"} alt="Profile" width={40} height={40} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="flex flex-col overflow-hidden">
                <span className="text-sm font-medium text-zinc-200 truncate">{user.displayName || "User"}</span>
                <span className="text-xs text-zinc-500 truncate">{user.email || "No Email"}</span>
              </div>
            </div>
            <button onClick={signOut} className="flex items-center gap-4 px-3 py-2 rounded-lg font-medium transition-colors text-zinc-500 hover:text-red-500 w-full text-left">
              <LogOut className="w-5 h-5" />
              <span className="text-sm">Sign Out</span>
            </button>
          </>
        ) : (
          <div className="pt-6 border-t border-zinc-800/50">
            <Link href="/login" className="flex items-center gap-4 px-3 py-2 rounded-lg font-medium transition-colors text-zinc-500 hover:text-white">
              <LogIn className="w-5 h-5" />
              <span className="text-sm">Sign In</span>
            </Link>
          </div>
        )}
      </div>
    </aside>
  );
}
