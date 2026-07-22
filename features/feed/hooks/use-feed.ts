import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { handleFirestoreError, OperationType } from '@/lib/firestore-errors';

export interface Post {
  id: string;
  type: 'image' | 'video' | 'text';
  mediaUrl?: string;
  content: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  likesCount: number;
  commentsCount: number;
  createdAt: any;
}

export function useFeed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);

    try {
      const q = query(
        collection(db, 'posts'),
        orderBy('createdAt', 'desc'),
        limit(20)
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const fetchedPosts = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Post[];
        
        setPosts(fetchedPosts);
        setLoading(false);
        clearTimeout(timer);
      }, (err) => {
        console.error("Firestore Error:", err);
        setLoading(false);
        clearTimeout(timer);
        setError(err instanceof Error ? err : new Error('Failed to fetch feed'));
        handleFirestoreError(err, OperationType.LIST, 'posts');
      });

      return () => {
        clearTimeout(timer);
        unsubscribe();
      };
    } catch (err) {
      console.error("Error setting up feed listener:", err);
      clearTimeout(timer);
      setTimeout(() => {
        setError(err instanceof Error ? err : new Error('Failed to initialize feed'));
        setLoading(false);
      }, 0);
    }
  }, []);

  return { posts, loading, error };
}
