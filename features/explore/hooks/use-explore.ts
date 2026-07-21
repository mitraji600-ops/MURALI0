import { useState, useEffect } from 'react';

export function useExplore() {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchExploreData = async () => {
      try {
        setLoading(true);
        // Simulate API call to Cloudflare D1
        await new Promise(resolve => setTimeout(resolve, 600));
        setItems([]);
        setCategories(['All', 'Cinematography', 'Minimalism', 'Architecture', 'Soundscapes', 'Typography']);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch explore data'));
      } finally {
        setLoading(false);
      }
    };

    fetchExploreData();
  }, []);

  return { items, categories, loading, error };
}
