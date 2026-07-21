import type {Metadata} from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { BottomNav } from '@/components/bottom-nav';
import { Sidebar } from '@/components/sidebar';
import { AuthProvider } from '@/hooks/use-auth';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Murli',
  description: 'A next-generation creator platform.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans bg-[#0a0a0a] text-zinc-100 antialiased min-h-screen selection:bg-purple-500/30`} suppressHydrationWarning>
        <AuthProvider>
          <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <div className="flex-1 overflow-hidden">
              {children}
            </div>
          </div>
          <BottomNav />
        </AuthProvider>
      </body>
    </html>
  );
}
