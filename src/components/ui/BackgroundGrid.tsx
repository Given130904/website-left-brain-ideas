import { motion } from 'framer-motion';

export default function BackgroundGrid() {
  return (
    <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none bg-[#050505]">
      {/* Neo Grid Lines */}
      <div 
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
          backgroundPosition: 'center center',
          maskImage: 'radial-gradient(circle 800px at center, black 30%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(circle 800px at center, black 30%, transparent 100%)'
        }}
      />

      {/* Ambient Moving Glows */}
      <motion.div 
        className="absolute top-[-10%] left-[10%] w-[60vw] h-[60vw] rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.04)_0%,transparent_70%)] filter blur-[100px]"
        animate={{
          x: [0, -20, 20, 0],
          y: [0, 30, -15, 0],
          scale: [1, 1.05, 0.95, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div 
        className="absolute bottom-[-10%] right-[10%] w-[50vw] h-[50vw] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.02)_0%,transparent_70%)] filter blur-[100px]"
        animate={{
          x: [0, 15, -25, 0],
          y: [0, -20, 20, 0],
          scale: [1, 0.95, 1.03, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
}
