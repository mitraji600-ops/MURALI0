'use client';

import { CloudUpload, Search, ChevronDown, CheckCircle, Music, Tag, MapPin, Globe, Lock, Wand2 } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import * as motion from 'motion/react-client';

export default function Create() {
  const [contentType, setContentType] = useState<'post' | 'reel' | 'podcast' | 'challenge'>('post');
  const [activeStep, setActiveStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleOneClickChallenge = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setContentType('challenge');
      setActiveStep(3);
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className="flex h-screen bg-[#0a0a0a] text-zinc-100">
      <main className="flex-1 flex flex-col overflow-hidden">
        
        {/* Creator Studio Header */}
        <header className="border-b border-zinc-800 p-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Creator Studio</h1>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-zinc-900 rounded-lg text-sm hover:bg-zinc-800 transition">Save Draft</button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={cn("px-4 py-2 rounded-lg text-sm transition", activeStep === 3 ? "bg-white text-black" : "bg-zinc-800 text-zinc-400 cursor-not-allowed")}
            >
              Publish
            </motion.button>
          </div>
        </header>

        {/* Steps */}
        <div className="flex p-6 gap-8 border-b border-zinc-800">
          {['1. Select Type', '2. Upload Media', '3. Content Details'].map((step, i) => (
            <div key={i} className={cn("text-sm font-medium transition-colors", activeStep >= i + 1 ? "text-white" : "text-zinc-600")}>
              {step}
            </div>
          ))}
        </div>

        {/* Studio Content */}
        <div className="flex-1 overflow-y-auto p-6 relative">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            {activeStep === 1 && (
              <div className="space-y-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {['Feed Post', 'Reel', 'Podcast', 'Challenge'].map((type, i) => (
                    <motion.div 
                      key={type} 
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                      onClick={() => { setContentType(type.toLowerCase() as any); setActiveStep(2); }} 
                      className="aspect-square bg-[#121212] rounded-2xl flex flex-col items-center justify-center border border-zinc-800 hover:border-zinc-500 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] cursor-pointer transition-all"
                    >
                      <div className="w-12 h-12 bg-zinc-900 rounded-full mb-4 flex items-center justify-center">
                        {/* Placeholder for icons based on type */}
                        <div className="w-6 h-6 bg-zinc-700 rounded-full" />
                      </div>
                      <span className="font-medium">{type}</span>
                    </motion.div>
                  ))}
                </div>
                
                <div className="max-w-2xl mx-auto pt-8 border-t border-zinc-800/50">
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="p-6 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl border border-purple-500/20 text-center"
                  >
                    <h3 className="text-xl font-bold mb-2 flex items-center justify-center gap-2">
                      <Wand2 className="w-5 h-5 text-purple-400" /> 
                      1-Click Challenge Generator
                    </h3>
                    <p className="text-zinc-400 mb-6 text-sm">Let AI generate a trending challenge with rules, hashtags, and a starter template.</p>
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleOneClickChallenge}
                      disabled={isGenerating}
                      className="bg-white text-black px-6 py-3 rounded-full font-bold flex items-center justify-center gap-2 mx-auto disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isGenerating ? (
                        <>
                          <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                          Generating Magic...
                        </>
                      ) : (
                        <>
                          <Wand2 className="w-4 h-4" />
                          Create Challenge Automatically
                        </>
                      )}
                    </motion.button>
                  </motion.div>
                </div>
              </div>
            )}

            {activeStep === 2 && (
              <div className="flex-1 aspect-video max-w-2xl mx-auto bg-[#121212] rounded-3xl border-2 border-dashed border-zinc-800 flex flex-col items-center justify-center p-8 hover:bg-[#151515] hover:border-zinc-700 transition-all cursor-pointer group">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <CloudUpload className="w-12 h-12 text-zinc-500 mb-4 group-hover:text-cyan-400 transition-colors" />
                </motion.div>
                <h3 className="text-xl font-medium mb-2">Upload {contentType} media</h3>
                <p className="text-zinc-500 text-sm">Drag & drop or click to browse</p>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveStep(3)} 
                  className="mt-6 px-6 py-2 bg-white text-black rounded-lg font-medium"
                >
                  Continue
                </motion.button>
              </div>
            )}

            {activeStep === 3 && (
              <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <input type="text" placeholder="Title" defaultValue={contentType === 'challenge' ? '🔥 30-Day Creator Challenge' : ''} className="w-full bg-[#121212] border border-zinc-800 rounded-xl p-4 text-white focus:border-purple-500/50 focus:outline-none transition-colors" />
                  <textarea placeholder="Description" defaultValue={contentType === 'challenge' ? 'Join the new 30-Day Creator Challenge! Share your daily progress using the hashtag #MurliCreator30.' : ''} className="w-full h-32 bg-[#121212] border border-zinc-800 rounded-xl p-4 text-white focus:border-purple-500/50 focus:outline-none transition-colors" />
                  <div className="flex gap-2">
                     <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1 flex items-center justify-center gap-2 p-3 bg-[#121212] border border-zinc-800 hover:border-zinc-600 rounded-xl transition-colors"><Tag className="w-4 h-4"/> Category</motion.button>
                     <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1 flex items-center justify-center gap-2 p-3 bg-[#121212] border border-zinc-800 hover:border-zinc-600 rounded-xl transition-colors"><MapPin className="w-4 h-4"/> Location</motion.button>
                  </div>
                </div>
                
                <div className="bg-[#121212] p-6 rounded-2xl border border-zinc-800">
                  <h4 className="font-bold mb-4">Preview</h4>
                  <div className="aspect-square bg-zinc-900 rounded-xl flex items-center justify-center text-zinc-600 overflow-hidden relative">
                    {contentType === 'challenge' ? (
                      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/40 via-purple-500/40 to-pink-500/40 flex items-center justify-center">
                        <span className="font-bold text-2xl text-white drop-shadow-lg text-center px-4">
                          #MurliCreator30
                        </span>
                      </div>
                    ) : (
                      "Media Preview"
                    )}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  );
}
