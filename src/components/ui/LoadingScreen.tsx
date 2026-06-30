import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Mempersiapkan halaman...');

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        // Variable increment for simulation
        const increment = Math.floor(Math.random() * 8) + 6;
        const nextProgress = Math.min(prev + increment, 100);

        if (nextProgress < 35) {
          setStatusText('Memuat elemen desain...');
        } else if (nextProgress < 75) {
          setStatusText('Menyelaraskan konten...');
        } else {
          setStatusText('Hampir selesai...');
        }

        return nextProgress;
      });
    }, 60);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={progress === 100 ? { opacity: 0, pointerEvents: 'none' } : { opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2, ease: 'easeInOut' }}
      onAnimationComplete={() => {
        if (progress === 100) {
          onComplete();
        }
      }}
      className="fixed inset-0 z-[9999] bg-[#050505] flex flex-col items-center justify-center p-6 select-none"
    >
      {/* Dynamic Background Glow Spot */}
      <div 
        className="absolute w-[300px] h-[300px] rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.03)_0%,transparent_70%)] filter blur-[80px] pointer-events-none -z-10"
      />

      <div className="w-full max-w-[280px] flex flex-col items-center gap-8">
        
        {/* White Logo Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative w-24 h-24 flex items-center justify-center"
        >
          <img 
            src="/assets/images/logo-left-brain-ideas.svg" 
            alt="Left Brain Ideas Logo" 
            className="w-full h-full object-contain"
          />
        </motion.div>

        {/* Loading details */}
        <div className="w-full flex flex-col items-center gap-3">
          
          {/* Progress Bar Container */}
          <div className="h-[2px] bg-white/5 w-full rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-[#22D3EE] shadow-[0_0_8px_rgba(34,211,238,0.5)]"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'easeOut' }}
            />
          </div>

          <div className="flex justify-between w-full font-mono text-[9px] text-[#B5B5B5] tracking-widest uppercase">
            <span>{statusText}</span>
            <span className="font-bold text-white">{progress}%</span>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
