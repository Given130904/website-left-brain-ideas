import { motion } from 'framer-motion';

const rippleVariants = {
  initial: { scale: 1, opacity: 0 },
  hover: {
    scale: [1, 1.45],
    opacity: [0.6, 0],
    transition: {
      duration: 1.4,
      repeat: Infinity,
      ease: "easeOut"
    } as any
  }
};

const tooltipVariants = {
  initial: { opacity: 0, y: 10, scale: 0.95 },
  hover: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } as any
  }
};

export default function FloatingWhatsApp() {
  const handleClick = () => {
    window.dispatchEvent(new CustomEvent('open-whatsapp-modal'));
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-6 right-6 z-[99] flex flex-col items-end"
    >
      <motion.div
        initial="initial"
        whileHover="hover"
        className="relative group flex items-center justify-center"
      >
        {/* Tooltip */}
        <motion.div
          variants={tooltipVariants}
          className="absolute bottom-16 right-0 bg-[#0B0B0B]/95 border border-[#25D366]/35 px-3.5 py-1.5 rounded-xl text-[11px] font-semibold text-white whitespace-nowrap shadow-[0_8px_32px_rgba(0,0,0,0.6)] backdrop-blur-md pointer-events-none flex items-center gap-1.5"
          style={{
            boxShadow: '0 8px 30px rgba(0,0,0,0.5), 0 0 15px rgba(37, 211, 102, 0.15)'
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
          <span>Konsultasi Gratis</span>
        </motion.div>

        {/* Breathing glow behind the button */}
        <motion.div
          animate={{
            scale: [1, 1.22, 1],
            opacity: [0.2, 0.45, 0.2],
          }}
          transition={{
            duration: 3,
            ease: "easeInOut",
            repeat: Infinity,
          }}
          className="absolute inset-0 rounded-full bg-[#25D366] blur-md pointer-events-none -z-10"
        />

        {/* Ripple Ring Effect (triggers on hover) */}
        <motion.div
          variants={rippleVariants}
          className="absolute inset-0 rounded-full border-2 border-[#25D366]/50 pointer-events-none -z-20"
        />

        {/* The Button */}
        <motion.button
          onClick={handleClick}
          whileHover={{
            scale: 1.08,
            boxShadow: '0 0 30px rgba(37, 211, 102, 0.6), 0 12px 36px rgba(0,0,0,0.5)',
            borderColor: 'rgba(37, 211, 102, 0.5)'
          }}
          whileTap={{ scale: 0.94 }}
          animate={{
            y: [0, -6, 0]
          }}
          transition={{
            y: {
              duration: 4,
              ease: "easeInOut",
              repeat: Infinity
            },
            default: {
              type: 'spring',
              stiffness: 300,
              damping: 22
            }
          }}
          className="w-14 h-14 rounded-full bg-gradient-to-br from-[#25D366] to-[#128C7E] border border-white/10 flex items-center justify-center text-white cursor-pointer shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-colors will-change-transform"
        >
          {/* Custom WhatsApp Vector Icon */}
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path d="M12.012 2c-5.506 0-9.989 4.478-9.989 9.984 0 1.758.459 3.473 1.332 4.985l-1.417 5.176 5.305-1.391a9.937 9.937 0 004.77 1.214h.004c5.505 0 9.988-4.478 9.988-9.984C22 6.478 17.517 2 12.012 2zm0 18.29h-.003a8.252 8.252 0 01-4.205-1.155l-.302-.18-3.128.82.836-3.05-.198-.313A8.254 8.254 0 013.738 12c0-4.546 3.71-8.251 8.277-8.251 2.212 0 4.291.861 5.854 2.427a8.21 8.21 0 012.423 5.829c0 4.547-3.71 8.252-8.277 8.252h-.003zm4.536-6.19c-.248-.124-1.47-.724-1.696-.807-.226-.083-.391-.124-.555.124-.165.248-.64.807-.784.972-.144.165-.289.186-.537.062a7.755 7.755 0 01-1.996-1.23 8.528 8.528 0 01-1.38-1.72c-.144-.248-.015-.382.11-.505.112-.11.247-.289.37-.434.124-.144.165-.248.248-.413.083-.165.041-.31-.02-.434-.063-.124-.555-1.34-.76-1.834-.203-.489-.41-.422-.555-.43-.143-.008-.309-.01-.474-.01a.913.913 0 00-.66.31c-.227.248-.866.847-.866 2.066 0 1.22.887 2.396 1.01 2.562.124.165 1.745 2.664 4.228 3.733.59.255 1.05.407 1.41.52.593.189 1.133.162 1.559.098.476-.073 1.47-.6 1.677-1.18.207-.578.207-1.074.145-1.18-.062-.107-.227-.169-.475-.293z" />
          </svg>
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
