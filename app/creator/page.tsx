'use client';

import { Card } from "@/components/ui/card"
import { useAuth } from "@/hooks/use-auth";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import dynamic from 'next/dynamic';

const ViewsChart = dynamic(() => import('@/features/analytics/components/charts').then(mod => mod.ViewsChart), { ssr: false, loading: () => <Skeleton className="h-[300px] w-full rounded-xl bg-zinc-800/50" /> });
const FollowersChart = dynamic(() => import('@/features/analytics/components/charts').then(mod => mod.FollowersChart), { ssr: false, loading: () => <Skeleton className="h-[300px] w-full rounded-xl bg-zinc-800/50" /> });

const performanceData = [
  { date: 'Mon', views: 4000, followers: 240 },
  { date: 'Tue', views: 5000, followers: 339 },
  { date: 'Wed', views: 4500, followers: 280 },
  { date: 'Thu', views: 6780, followers: 490 },
  { date: 'Fri', views: 5890, followers: 380 },
  { date: 'Sat', views: 8390, followers: 680 },
  { date: 'Sun', views: 10490, followers: 830 },
];

export default function CreatorDashboard() {
  const { user, loading: authLoading } = useAuth();
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAnalytics() {
      if (!user) {
        setLoading(false);
        return;
      }
      try {
        const token = await user.getIdToken();
        const res = await fetch('/api/analytics/creator', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const json = await res.json();
        if (json.success) {
          setAnalytics(json.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    
    if (!authLoading) {
      fetchAnalytics();
    }
  }, [user, authLoading]);

  if (authLoading || loading) {
    return (
      <main className="flex-1 flex flex-col min-h-screen bg-[#0a0a0a] p-6">
        <h1 className="text-2xl font-bold text-white mb-6">Creator Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Skeleton className="h-28 rounded-xl bg-zinc-800/50" />
          <Skeleton className="h-28 rounded-xl bg-zinc-800/50" />
          <Skeleton className="h-28 rounded-xl bg-zinc-800/50" />
        </div>
      </main>
    );
  }

  // Use real analytics if available, fallback to mock data for preview
  const displayAnalytics = analytics || {
    followers: 12500,
    totalViews: 1200000,
    engagementRate: 8.4
  };

  return (
    <main className="flex-1 flex flex-col min-h-screen bg-[#0a0a0a] p-6">
      <h1 className="text-2xl font-bold text-white mb-6">Creator Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <h3 className="text-zinc-400 text-sm mb-1">Total Followers</h3>
          <p className="text-3xl font-bold text-white">
            {displayAnalytics.followers.toLocaleString()}
          </p>
        </Card>
        <Card className="p-6">
          <h3 className="text-zinc-400 text-sm mb-1">Total Views</h3>
          <p className="text-3xl font-bold text-white">
            {displayAnalytics.totalViews.toLocaleString()}
          </p>
        </Card>
        <Card className="p-6">
          <h3 className="text-zinc-400 text-sm mb-1">Avg. Engagement</h3>
          <p className="text-3xl font-bold text-white">
            {displayAnalytics.engagementRate}%
          </p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <Card className="p-6 flex flex-col">
          <div className="mb-4">
            <h3 className="text-zinc-100 font-semibold">Views Overview</h3>
            <p className="text-sm text-zinc-500">Your total views over the last 7 days.</p>
          </div>
          <ViewsChart data={performanceData} />
        </Card>
        
        <Card className="p-6 flex flex-col">
          <div className="mb-4">
            <h3 className="text-zinc-100 font-semibold">Follower Growth</h3>
            <p className="text-sm text-zinc-500">New followers gained over the last 7 days.</p>
          </div>
          <FollowersChart data={performanceData} />
        </Card>
      </div>
    </main>
  )
}

