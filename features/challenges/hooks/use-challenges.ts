import { useState, useEffect } from 'react';

// Production hook mapping to Cloudflare D1 / Worker APIs
export function useChallenges() {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        setLoading(true);
        // Simulate API call to Cloudflare D1
        await new Promise(resolve => setTimeout(resolve, 800));
        setChallenges([]); // Empty since we removed dummy data
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch challenges'));
      } finally {
        setLoading(false);
      }
    };

    fetchChallenges();
  }, []);

  const joinChallenge = async (challengeId: string) => {
    // Implement optimistic UI / mutation logic here
    console.log(`Joining challenge ${challengeId}`);
  };

  return { challenges, loading, error, joinChallenge };
}
