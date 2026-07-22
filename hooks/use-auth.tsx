'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { 
  User, 
  onAuthStateChanged, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut as firebaseSignOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification as firebaseSendEmailVerification,
  sendPasswordResetEmail as firebaseSendPasswordResetEmail,
  deleteUser as firebaseDeleteUser
} from 'firebase/auth';
import { auth } from '@/lib/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  signInWithEmail: (e: string, p: string) => Promise<any>;
  signUpWithEmail: (e: string, p: string) => Promise<any>;
  sendVerificationEmail: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  deleteAccount: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signInWithGoogle: async () => {},
  signOut: async () => {},
  signInWithEmail: async () => {},
  signUpWithEmail: async () => {},
  sendVerificationEmail: async () => {},
  resetPassword: async () => {},
  deleteAccount: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      clearTimeout(timer);
    });

    return () => {
      clearTimeout(timer);
      unsubscribe();
    };
  }, []);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Error signing in with Google', error);
      throw error;
    }
  };

  const signInWithEmail = async (email: string, pass: string) => {
    return signInWithEmailAndPassword(auth, email, pass);
  };

  const signUpWithEmail = async (email: string, pass: string) => {
    const userCred = await createUserWithEmailAndPassword(auth, email, pass);
    if (userCred.user) {
      await firebaseSendEmailVerification(userCred.user).catch(err => {
        console.warn('Failed to send email verification automatically:', err);
      });
    }
    return userCred;
  };

  const sendVerificationEmail = async () => {
    if (auth.currentUser) {
      await firebaseSendEmailVerification(auth.currentUser);
    }
  };

  const resetPassword = async (email: string) => {
    await firebaseSendPasswordResetEmail(auth, email);
  };

  const deleteAccount = async () => {
    if (auth.currentUser) {
      await firebaseDeleteUser(auth.currentUser);
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      console.error('Error signing out', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      signInWithGoogle, 
      signOut, 
      signInWithEmail, 
      signUpWithEmail,
      sendVerificationEmail,
      resetPassword,
      deleteAccount
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
