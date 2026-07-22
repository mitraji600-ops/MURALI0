import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { handleFirestoreError, OperationType } from '@/lib/firestore-errors';

export function useExplore() {
  const [items, setItems] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    try {
      const q = query(
        collection(db, 'explore'),
        orderBy('createdAt', 'desc'),
        limit(20)
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const fetchedItems = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        setItems(fetchedItems);
        // We can extract unique categories from items or just set empty for now
        setCategories([]);
        setLoading(false);
      }, (err) => {
        console.error("Firestore Error:", err);
        setLoading(false);
        setError(err instanceof Error ? err : new Error('Failed to fetch explore data'));
        handleFirestoreError(err, OperationType.LIST, 'explore');
      });

      return () => unsubscribe();
    } catch (err) {
      console.error("Error setting up explore listener:", err);
      setTimeout(() => {
        setError(err instanceof Error ? err : new Error('Failed to initialize explore'));
        setLoading(false);
      }, 0);
    }
  }, []);

  return { items, categories, loading, error };
}
