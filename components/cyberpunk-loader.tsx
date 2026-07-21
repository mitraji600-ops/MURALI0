export function CyberpunkLoader() {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="relative flex items-center justify-center w-32 h-32">
        {/* Outer rotating glowing ring */}
        <div 
          className="absolute inset-0 border-t-2 border-r-2 border-cyan-400 rounded-full animate-spin shadow-[0_0_15px_rgba(34,211,238,0.5)]" 
          style={{ animationDuration: '2s' }} 
        />
        {/* Inner rotating glowing ring */}
        <div 
          className="absolute inset-4 border-b-2 border-l-2 border-fuchsia-500 rounded-full animate-spin shadow-[0_0_15px_rgba(217,70,239,0.5)]" 
          style={{ animationDuration: '1.5s', animationDirection: 'reverse' }} 
        />
        {/* Core tech block */}
        <div className="w-10 h-10 bg-[#0a0a0a] border border-yellow-400 rotate-45 animate-pulse shadow-[0_0_15px_rgba(250,204,21,0.5)] flex items-center justify-center">
          <div className="w-4 h-4 bg-yellow-400/80 rounded-sm" />
        </div>
        
        {/* Glitch text overlay */}
        <div className="absolute -bottom-10 flex flex-col items-center">
          <span className="text-xs font-mono text-cyan-400 tracking-[0.3em] uppercase animate-pulse">
            Sys_Loading
          </span>
          <div className="w-full h-px bg-gradient-to-r from-transparent via-fuchsia-500 to-transparent mt-1" />
        </div>
      </div>
    </div>
  );
}
