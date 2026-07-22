'use client';

import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Loader } from '@/components/loader';
import * as motion from 'motion/react-client';

export default function LoginPage() {
  const { user, signInWithGoogle, signInWithEmail, loading } = useAuth();
  const router = useRouter();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user && !loading) {
      router.push('/');
    }
  }, [user, loading, router]);

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    
    setIsSubmitting(true);
    setError('');
    
    try {
      await signInWithEmail(email, password);
      router.push('/');
    } catch (err: any) {
      console.error(err);
      setError('Invalid email or password.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <main className="flex-1 flex min-h-screen bg-[#050505] items-center justify-center p-6 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ opacity: [0.1, 0.15, 0.1], scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-purple-600/20 blur-[120px] rounded-full"
        />
        <motion.div
          animate={{ opacity: [0.1, 0.15, 0.1], scale: [1, 1.2, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-cyan-600/20 blur-[120px] rounded-full"
        />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tighter text-white mb-3">MURLI</h1>
          <p className="text-xs font-mono tracking-[0.3em] text-zinc-500 uppercase">Future of the Past</p>
        </div>

        <div className="bg-white/[0.02] border border-white/[0.05] p-8 rounded-2xl backdrop-blur-xl">
          <form onSubmit={handleEmailSignIn} className="flex flex-col gap-5">
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm text-center"
              >
                {error}
              </motion.div>
            )}
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-medium text-zinc-400 ml-1">Email</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full px-4 py-3.5 bg-black/50 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all rounded-xl placeholder:text-zinc-700"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-zinc-400 ml-1">Password</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full px-4 py-3.5 bg-black/50 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all rounded-xl placeholder:text-zinc-700"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 mt-2 bg-white text-black hover:bg-zinc-200 font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>

          <div className="relative flex items-center justify-center my-8">
            <div className="absolute w-full border-t border-white/5"></div>
            <span className="relative bg-[#0a0a0a] px-4 text-xs font-medium text-zinc-600 uppercase tracking-wider">Or continue with</span>
          </div>

          <button 
            onClick={signInWithGoogle}
            type="button"
            className="w-full py-3.5 bg-white/5 hover:bg-white/10 text-white border border-white/10 font-medium transition-all rounded-xl flex items-center justify-center gap-3"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Google
          </button>
        </div>

        <p className="text-center text-sm text-zinc-500 mt-8">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="text-white hover:text-purple-400 transition-colors font-medium">
            Sign up
          </Link>
        </p>
      </motion.div>
    </main>
  );
}
