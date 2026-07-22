'use client';

import { CloudUpload, Tag, MapPin, Loader2, Image as ImageIcon, Video, Mic, X } from 'lucide-react';
import { useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import * as motion from 'motion/react-client';
import { useAuth } from '@/hooks/use-auth';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { handleFirestoreError, OperationType } from '@/lib/firestore-errors';
import { uploadMediaWithPipeline, validateUploadFile } from '@/lib/upload-pipeline';

export default function Create() {
  const [contentType, setContentType] = useState<'image' | 'video' | 'podcast'>('image');
  const [activeStep, setActiveStep] = useState(1);
  const [isPublishing, setIsPublishing] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const abortControllerRef = useRef<AbortController | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user } = useAuth();
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadError(null);
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      const validation = validateUploadFile(selectedFile, contentType);
      
      if (!validation.valid) {
        setUploadError(validation.error || 'Invalid file format or size limit exceeded.');
        return;
      }

      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
      setActiveStep(3);
    }
  };

  const handleCancelUpload = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsPublishing(false);
    setUploadProgress(0);
  };

  const handlePublish = async () => {
    if (!user) {
      setUploadError("Authentication required to publish.");
      return;
    }
    if (!file && contentType === 'image') {
      setUploadError("Please upload an image file.");
      return;
    }
    
    setIsPublishing(true);
    setUploadError(null);
    setUploadProgress(0);

    abortControllerRef.current = new AbortController();

    try {
      let mediaUrl = '';
      if (file) {
        const uploadResult = await uploadMediaWithPipeline({
          file,
          mediaType: contentType,
          userId: user.uid,
          onProgress: (pct) => setUploadProgress(pct),
          signal: abortControllerRef.current.signal
        });
        mediaUrl = uploadResult.url;
      }

      const postData = {
        type: contentType,
        title: title || 'Untitled Post',
        content: description,
        mediaUrl,
        authorId: user.uid,
        authorName: user.displayName || user.email?.split('@')[0] || 'Anonymous',
        authorAvatar: user.photoURL || '',
        likesCount: 0,
        commentsCount: 0,
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, 'posts'), postData).catch((err) => {
        handleFirestoreError(err, OperationType.CREATE, 'posts');
      });

      router.push('/');
    } catch (error: any) {
      if (error.message === 'Upload cancelled.') {
        console.log('Upload was cancelled.');
      } else {
        console.error("Error publishing post:", error);
        setUploadError(error.message || "Failed to publish post. Please try again.");
      }
    } finally {
      setIsPublishing(false);
      setUploadProgress(0);
      abortControllerRef.current = null;
    }
  };

  return (
    <div className="flex h-screen bg-[#050505] text-zinc-100">
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none fixed">
          <motion.div
            animate={{ opacity: [0.02, 0.05, 0.02] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 right-0 w-[40%] h-[40%] bg-white/10 blur-[150px] rounded-full"
          />
        </div>

        {/* Creator Studio Header */}
        <header className="border-b border-white/5 bg-[#050505]/80 backdrop-blur-md p-6 flex items-center justify-between sticky top-0 z-20">
          <h1 className="text-2xl font-bold tracking-tighter text-white">STUDIO</h1>
          <div className="flex gap-2">
            {isPublishing && (
              <button 
                onClick={handleCancelUpload}
                className="px-4 py-2 bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg text-sm hover:bg-red-500/20 transition flex items-center gap-1"
              >
                <X className="w-4 h-4" /> Cancel Upload
              </button>
            )}
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePublish}
              disabled={activeStep !== 3 || isPublishing || (!file && contentType === 'image')}
              className={cn("px-6 py-2 rounded-lg text-sm font-bold transition flex items-center gap-2", 
                activeStep === 3 && (file || contentType !== 'image') ? "bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.2)]" : "bg-white/5 text-zinc-500 cursor-not-allowed border border-white/5"
              )}
            >
              {isPublishing ? <><Loader2 className="w-4 h-4 animate-spin" /> Publishing...</> : 'Publish'}
            </motion.button>
          </div>
        </header>

        {/* Steps */}
        <div className="flex p-6 gap-8 border-b border-white/5 bg-[#050505]/50 backdrop-blur-sm z-10">
          {['1. Select Type', '2. Upload Media', '3. Content Details'].map((step, i) => (
            <div key={i} className={cn("text-sm font-medium transition-colors tracking-wide", activeStep >= i + 1 ? "text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]" : "text-zinc-600")}>
              {step}
            </div>
          ))}
        </div>

        {/* Error Banner */}
        {uploadError && (
          <div className="bg-red-500/10 border-b border-red-500/20 text-red-400 px-6 py-3 text-sm flex items-center justify-between z-20">
            <span>{uploadError}</span>
            <button onClick={() => setUploadError(null)} className="text-red-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Studio Content */}
        <div className="flex-1 overflow-y-auto p-6 relative z-10">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="h-full flex flex-col items-center justify-center max-w-4xl mx-auto w-full"
          >
            {activeStep === 1 && (
              <div className="w-full">
                <div className="text-center mb-10">
                  <h2 className="text-3xl font-bold mb-2 text-white tracking-tight">What are you creating?</h2>
                  <p className="text-zinc-400 text-sm">Select a format to begin your post.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                  {[
                    { type: 'image', icon: ImageIcon, label: 'Image Post', desc: 'Photos & Art (Max 15 MB)' },
                    { type: 'video', icon: Video, label: 'Reel', desc: 'Short-form Video (Max 250 MB)' },
                    { type: 'podcast', icon: Mic, label: 'Podcast', desc: 'Audio Episodes (Max 1 GB)' },
                  ].map((item, i) => (
                    <motion.div 
                      key={item.type} 
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                      onClick={() => { setContentType(item.type as any); setActiveStep(2); }} 
                      className="aspect-[4/3] bg-white/[0.02] rounded-2xl flex flex-col items-center justify-center p-6 border border-white/5 hover:border-white/20 hover:bg-white/[0.05] hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] cursor-pointer transition-all backdrop-blur-sm"
                    >
                      <div className="w-16 h-16 bg-white/10 rounded-full mb-4 flex items-center justify-center text-white shadow-inner">
                        <item.icon className="w-8 h-8" />
                      </div>
                      <span className="font-bold text-lg mb-1">{item.label}</span>
                      <span className="text-xs text-zinc-500 text-center">{item.desc}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {activeStep === 2 && (
              <div className="w-full flex flex-col items-center">
                 <div className="text-center mb-10">
                  <h2 className="text-3xl font-bold mb-2 text-white tracking-tight">Upload Media</h2>
                  <p className="text-zinc-400 text-sm">
                    Select the {contentType} file to share ({contentType === 'image' ? 'Max 15MB' : contentType === 'video' ? 'Max 250MB' : 'Max 1GB'}).
                  </p>
                </div>
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full aspect-video max-w-2xl mx-auto bg-white/[0.02] rounded-3xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center p-8 hover:bg-white/[0.05] hover:border-white/30 transition-all cursor-pointer group backdrop-blur-sm"
                >
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  >
                    <CloudUpload className="w-16 h-16 text-zinc-600 mb-6 group-hover:text-white transition-colors drop-shadow-lg" />
                  </motion.div>
                  <h3 className="text-xl font-bold mb-2 text-white">Select {contentType}</h3>
                  <p className="text-zinc-500 text-sm">Drag & drop or click to browse</p>
                  <input 
                    type="file" 
                    className="hidden" 
                    ref={fileInputRef} 
                    onChange={handleFileChange} 
                    accept={contentType === 'image' ? 'image/*' : contentType === 'video' ? 'video/*' : 'audio/*'} 
                  />
                </div>
                <button onClick={() => setActiveStep(1)} className="mt-8 text-sm text-zinc-500 hover:text-white transition-colors">Go Back</button>
              </div>
            )}

            {activeStep === 3 && (
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
                <div className="space-y-6">
                  <div className="space-y-2">
                     <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider ml-1">Title</label>
                     <input 
                        type="text" 
                        placeholder="Give your post a title..." 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-white/30 focus:bg-white/10 focus:outline-none transition-all placeholder:text-zinc-600" 
                      />
                  </div>
                  <div className="space-y-2">
                     <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider ml-1">Description</label>
                     <textarea 
                        placeholder="Tell the story behind this..." 
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full h-40 bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-white/30 focus:bg-white/10 focus:outline-none transition-all placeholder:text-zinc-600 resize-none" 
                     />
                  </div>
                  <div className="flex gap-4">
                     <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1 flex items-center justify-center gap-2 p-4 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl transition-all text-sm font-medium"><Tag className="w-4 h-4"/> Category</motion.button>
                     <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1 flex items-center justify-center gap-2 p-4 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl transition-all text-sm font-medium"><MapPin className="w-4 h-4"/> Location</motion.button>
                  </div>
                </div>
                
                <div className="bg-white/[0.02] p-6 rounded-2xl border border-white/5 backdrop-blur-sm flex flex-col">
                  <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-4">Preview</h4>
                  <div className="flex-1 bg-black/50 rounded-xl flex items-center justify-center text-zinc-600 overflow-hidden relative border border-white/5 min-h-[220px]">
                    {previewUrl ? (
                      contentType === 'image' ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <video src={previewUrl} className="w-full h-full object-cover" controls />
                      )
                    ) : (
                      "No Media Uploaded"
                    )}
                    {isPublishing && (
                      <div className="absolute inset-0 bg-black/80 flex items-center justify-center backdrop-blur-sm">
                        <div className="flex flex-col items-center gap-4 w-3/4">
                           <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                              <div className="h-full bg-white transition-all duration-300" style={{ width: `${uploadProgress}%` }} />
                           </div>
                           <span className="text-xs font-bold text-white uppercase tracking-wider">{Math.round(uploadProgress)}% UPLOADED</span>
                        </div>
                      </div>
                    )}
                  </div>
                   <button onClick={() => setActiveStep(2)} className="mt-4 text-xs text-zinc-500 hover:text-white transition-colors text-center w-full">Change Media</button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  );
}
