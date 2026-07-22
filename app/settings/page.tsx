'use client';

import { useAuth } from '@/hooks/use-auth';
import { Loader } from '@/components/loader';
import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { handleFirestoreError, OperationType } from '@/lib/firestore-errors';
import * as motion from 'motion/react-client';

export default function SettingsPage() {
  const { user, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [preferences, setPreferences] = useState({
    privateAccount: false,
    allowMessages: true,
  });

  useEffect(() => {
    async function loadSettings() {
      if (!user) {
        setLoading(false);
        return;
      }
      try {
        const docRef = doc(db, 'userSettings', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setPreferences(docSnap.data() as any);
        }
      } catch (err) {
        console.error(err);
        handleFirestoreError(err, OperationType.GET, 'userSettings');
      } finally {
        setLoading(false);
      }
    }
    
    if (!authLoading) {
      loadSettings();
    }
  }, [user, authLoading]);

  const handleToggle = async (key: keyof typeof preferences) => {
    if (!user) return;
    const newValue = !preferences[key];
    setPreferences(prev => ({ ...prev, [key]: newValue }));
    
    setSaving(true);
    try {
      const docRef = doc(db, 'userSettings', user.uid);
      await setDoc(docRef, { [key]: newValue }, { merge: true });
    } catch (err) {
      console.error(err);
      handleFirestoreError(err, OperationType.UPDATE, 'userSettings');
      // Revert on error
      setPreferences(prev => ({ ...prev, [key]: !newValue }));
    } finally {
      setSaving(false);
    }
  };

  if (authLoading || loading) return <Loader />;

  if (!user) {
    return (
      <main className="flex-1 flex items-center justify-center min-h-screen bg-[#050505]">
        <p className="text-zinc-500 font-mono">Authentication required.</p>
      </main>
    );
  }

  return (
    <main className="flex-1 flex flex-col min-h-screen bg-[#050505] relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none fixed z-0">
        <motion.div
          animate={{ opacity: [0.02, 0.04, 0.02], scale: [1, 1.05, 1], rotate: [0, 5, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-[30%] left-[-10%] w-[50%] h-[50%] bg-teal-600/20 blur-[120px] rounded-full"
        />
      </div>

      <div className="max-w-2xl mx-auto w-full px-6 py-12 relative z-10">
        <h1 className="text-3xl font-bold tracking-tight text-white mb-8">Preferences</h1>
        
        <div className="space-y-4">
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-sm flex items-center justify-between group hover:bg-white/[0.04] transition-colors">
            <div>
              <h3 className="text-white font-medium mb-1">Private Account</h3>
              <p className="text-sm text-zinc-500 max-w-[280px]">Only approved followers can see your content on Murli.</p>
            </div>
            <button 
              onClick={() => handleToggle('privateAccount')}
              disabled={saving}
              className={`w-14 h-8 rounded-full flex items-center p-1 transition-colors ${preferences.privateAccount ? 'bg-white' : 'bg-white/10'}`}
            >
              <motion.div 
                animate={{ x: preferences.privateAccount ? 24 : 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className={`w-6 h-6 rounded-full shadow-sm ${preferences.privateAccount ? 'bg-black' : 'bg-zinc-500'}`}
              />
            </button>
          </div>
          
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-sm flex items-center justify-between group hover:bg-white/[0.04] transition-colors">
            <div>
              <h3 className="text-white font-medium mb-1">Allow Direct Messages</h3>
              <p className="text-sm text-zinc-500 max-w-[280px]">Receive encrypted transmissions from anyone in the network.</p>
            </div>
            <button 
              onClick={() => handleToggle('allowMessages')}
              disabled={saving}
              className={`w-14 h-8 rounded-full flex items-center p-1 transition-colors ${preferences.allowMessages ? 'bg-white' : 'bg-white/10'}`}
            >
              <motion.div 
                animate={{ x: preferences.allowMessages ? 24 : 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className={`w-6 h-6 rounded-full shadow-sm ${preferences.allowMessages ? 'bg-black' : 'bg-zinc-500'}`}
              />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
