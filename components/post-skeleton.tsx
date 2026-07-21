import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function PostSkeleton() {
  return (
    <Card className="p-4 sm:p-6 mb-6 bg-[#0a0a0a]/80 border-cyan-500/20 shadow-[0_0_15px_rgba(34,211,238,0.05)] rounded-sm relative overflow-hidden">
      {/* Glitch lines/decorations */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-50" />
      <div className="absolute -left-4 top-10 w-8 h-px bg-fuchsia-500/50 rotate-45" />
      
      <div className="flex items-start justify-between mb-4 relative z-10">
        <div className="flex items-center gap-3">
          <Skeleton className="w-10 h-10 rounded-sm shrink-0 bg-cyan-900/40 border border-cyan-500/30" />
          <div className="flex flex-col gap-2">
            <Skeleton className="w-24 h-4 rounded-sm bg-cyan-900/30" />
            <Skeleton className="w-32 h-3 rounded-sm bg-fuchsia-900/20" />
          </div>
        </div>
        <Skeleton className="w-6 h-6 rounded-sm bg-zinc-800/80 border border-zinc-700" />
      </div>

      <div className="mb-4 flex flex-col gap-2 relative z-10">
        <Skeleton className="w-full h-4 rounded-sm bg-zinc-800/60" />
        <Skeleton className="w-5/6 h-4 rounded-sm bg-zinc-800/60" />
        <Skeleton className="w-4/6 h-4 rounded-sm bg-zinc-800/60" />
        <Skeleton className="w-full aspect-video rounded-sm mt-2 bg-[#121212] border border-cyan-500/10 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(34,211,238,0.05)_50%)] bg-[length:100%_4px]" />
        </Skeleton>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-cyan-500/20 relative z-10">
        <div className="flex items-center gap-6">
          <Skeleton className="w-8 h-5 rounded-sm bg-zinc-800/80" />
          <Skeleton className="w-8 h-5 rounded-sm bg-zinc-800/80" />
          <Skeleton className="w-8 h-5 rounded-sm bg-zinc-800/80" />
        </div>
        <div className="flex items-center gap-4">
          <Skeleton className="w-5 h-5 rounded-sm bg-zinc-800/80" />
          <Skeleton className="w-5 h-5 rounded-sm bg-zinc-800/80" />
        </div>
      </div>
    </Card>
  );
}
