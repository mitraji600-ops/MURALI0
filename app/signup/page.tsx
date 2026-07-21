'use client';

import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CyberpunkLoader } from '@/components/cyberpunk-loader';

export default function SignupPage() {
  const { user, signUpWithEmail, signInWithGoogle, loading } = useAuth();
  const router = useRouter();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user && !loading) {
      router.push('/');
    }
  }, [user, loading, router]);

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword) return;
    
    if (password !== confirmPassword) {
      setError('Access codes do not match.');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    try {
      await signUpWithEmail(email, password);
      router.push('/');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Registration failed. Try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <main className="flex-1 flex min-h-screen bg-[#0a0a0a] items-center justify-center">
        <CyberpunkLoader />
      </main>
    );
  }

  return (
    <main className="flex-1 flex min-h-screen bg-[#0a0a0a] flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm flex flex-col gap-8 relative">
        <div className="absolute -inset-4 bg-fuchsia-500/10 blur-xl rounded-full -z-10" />
        <div className="text-center">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-cyan-500 mb-2 uppercase tracking-wider font-mono">Murli // Initialize</h1>
          <p className="text-fuchsia-500/70 font-mono text-sm tracking-widest">REGISTER NEW ENTITY</p>
        </div>

        <form onSubmit={handleEmailSignUp} className="flex flex-col gap-4">
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-sm text-red-400 text-sm font-mono text-center">
              [ERR] {error}
            </div>
          )}
          <div className="flex flex-col gap-1">
            <input 
              type="email" 
              placeholder="USER_IDENTIFIER (Email)" 
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="px-4 py-3 bg-[#121212] border border-fuchsia-500/30 text-fuchsia-400 font-mono text-sm placeholder:text-fuchsia-500/30 focus:outline-none focus:border-fuchsia-400 focus:shadow-[0_0_10px_rgba(217,70,239,0.2)] transition-all rounded-sm"
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <input 
              type="password" 
              placeholder="ACCESS_CODE (Password)" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="px-4 py-3 bg-[#121212] border border-fuchsia-500/30 text-fuchsia-400 font-mono text-sm placeholder:text-fuchsia-500/30 focus:outline-none focus:border-fuchsia-400 focus:shadow-[0_0_10px_rgba(217,70,239,0.2)] transition-all rounded-sm"
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <input 
              type="password" 
              placeholder="CONFIRM_ACCESS_CODE" 
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              className="px-4 py-3 bg-[#121212] border border-fuchsia-500/30 text-fuchsia-400 font-mono text-sm placeholder:text-fuchsia-500/30 focus:outline-none focus:border-fuchsia-400 focus:shadow-[0_0_10px_rgba(217,70,239,0.2)] transition-all rounded-sm"
              required
            />
          </div>
          <Button 
            type="submit"
            disabled={isSubmitting}
            className="w-full py-6 bg-fuchsia-500/20 text-fuchsia-400 hover:bg-fuchsia-500/30 border border-fuchsia-400 hover:shadow-[0_0_15px_rgba(217,70,239,0.4)] font-mono uppercase tracking-widest transition-all rounded-sm"
          >
            {isSubmitting ? 'Processing...' : 'Deploy_User'}
          </Button>
        </form>

        <div className="relative flex items-center justify-center my-2">
          <div className="absolute w-full border-t border-fuchsia-500/20"></div>
          <span className="relative bg-[#0a0a0a] px-4 text-xs font-mono text-fuchsia-500/50 uppercase">OR_OVERRIDE</span>
        </div>

        <Button 
          onClick={signInWithGoogle}
          type="button"
          className="w-full py-6 bg-zinc-900 text-zinc-300 hover:bg-zinc-800 border border-zinc-700 hover:border-zinc-500 font-mono transition-all rounded-sm"
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          Google_Protocol
        </Button>

        <p className="text-center text-xs font-mono text-fuchsia-500/60 mt-4">
          ENTITY_ALREADY_EXISTS? <Link href="/login" className="text-cyan-400 hover:text-cyan-300 hover:underline">AUTHENTICATE_NOW</Link>
        </p>
      </div>
    </main>
  );
}
