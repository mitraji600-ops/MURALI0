'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, PlusSquare, Mail, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import * as motion from 'motion/react-client';
import { useAuth } from '@/hooks/use-auth';

const NAV_ITEMS = [
  { href: '/', icon: Home, label: 'Feed' },
  { href: '/explore', icon: Search, label: 'Explore' },
  { href: '/create', icon: PlusSquare, label: 'Create' },
  { href: '/inbox', icon: Mail, label: 'Messages' },
  { href: '/profile', icon: User, label: 'Profile' }
];

export function BottomNav() {
  const pathname = usePathname();
  const { user, loading } = useAuth();

  if (loading || !user) return null;

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-[#0a0a0a]/90 backdrop-blur-md border-t border-zinc-800/50 flex items-center justify-around px-4 z-50">
      {NAV_ITEMS.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link key={item.href} href={item.href} className={cn("flex flex-col items-center justify-center w-12 h-12 rounded-full transition-colors relative", isActive ? "text-white" : "text-zinc-500 hover:text-zinc-300")}>
            <motion.div
              whileTap={{ scale: 0.85 }}
              animate={isActive ? { y: -3, scale: 1.1 } : { y: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 500, damping: 15 }}
            >
              <item.icon className={cn("w-6 h-6", isActive && "fill-current")} />
            </motion.div>
            <span className="sr-only">{item.label}</span>
            {isActive && (
              <motion.div
                layoutId="bottom-nav-dot"
                className="absolute bottom-1 w-1 h-1 bg-white rounded-full"
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
