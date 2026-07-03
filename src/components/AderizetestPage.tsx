import React from 'react';
import { motion } from 'motion/react';

export default function AderizetestPage() {
  return (
    <div className="min-h-screen w-full bg-black flex flex-col items-center justify-center relative overflow-hidden select-none p-4 md:p-8">
      {/* Absolute minimal dark atmospheric glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_100%)] pointer-events-none" />
      
      {/* Centered Campaign Video frame */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative flex items-center justify-center shadow-[0_24px_80px_rgba(0,0,0,0.8)] border border-neutral-900 rounded-lg overflow-hidden"
      >
        <video
          src="/NikeVideoAd1.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="max-w-full max-h-[85vh] object-contain rounded-lg"
          style={{ width: 'auto', height: 'auto' }}
        />
      </motion.div>

      {/* Tiny high-end metadata marker in margins */}
      <div className="absolute bottom-6 font-mono text-[9px] text-neutral-600 tracking-[0.25em] uppercase pointer-events-none">
        M. DIOKNO // CAMPAIGN TEST // ADERIZETEST
      </div>
    </div>
  );
}
