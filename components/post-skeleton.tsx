export function PostSkeleton() {
  return (
    <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 sm:p-6 mb-6 backdrop-blur-sm animate-pulse">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full shrink-0 bg-white/10" />
          <div className="flex flex-col gap-2">
            <div className="w-24 h-4 rounded bg-white/10" />
            <div className="w-32 h-3 rounded bg-white/5" />
          </div>
        </div>
      </div>

      <div className="mb-4 flex flex-col gap-2">
        <div className="w-full h-4 rounded bg-white/5" />
        <div className="w-5/6 h-4 rounded bg-white/5" />
        <div className="w-4/6 h-4 rounded bg-white/5" />
        <div className="w-full aspect-video rounded-2xl mt-4 bg-white/5" />
      </div>

      <div className="flex items-center justify-between pt-2 mt-4 border-t border-white/5">
        <div className="flex items-center gap-6 mt-2">
          <div className="w-8 h-5 rounded bg-white/10" />
          <div className="w-8 h-5 rounded bg-white/10" />
          <div className="w-8 h-5 rounded bg-white/10" />
        </div>
        <div className="flex items-center gap-4 mt-2">
          <div className="w-5 h-5 rounded bg-white/10" />
          <div className="w-5 h-5 rounded bg-white/10" />
        </div>
      </div>
    </div>
  );
}
