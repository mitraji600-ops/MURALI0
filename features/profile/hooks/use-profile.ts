import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { handleFirestoreError, OperationType } from '@/lib/firestore-errors';

export function useProfilePosts(userId: string | undefined) {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!userId) {
      setTimeout(() => {
        setPosts([]);
        setLoading(false);
      }, 0);
      return;
    }

    try {
      const q = query(
        collection(db, 'posts'),
        where('authorId', '==', userId),
        orderBy('createdAt', 'desc')
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const fetchedPosts = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        setPosts(fetchedPosts);
        setLoading(false);
      }, (err) => {
        console.error("Firestore Error:", err);
        setLoading(false);
        setError(err instanceof Error ? err : new Error('Failed to fetch posts'));
        handleFirestoreError(err, OperationType.LIST, 'posts');
      });

      return () => unsubscribe();
    } catch (err) {
      console.error("Error setting up profile posts listener:", err);
      setTimeout(() => {
        setError(err instanceof Error ? err : new Error('Failed to initialize profile posts'));
        setLoading(false);
      }, 0);
    }
  }, [userId]);

  return { posts, loading, error };
}
