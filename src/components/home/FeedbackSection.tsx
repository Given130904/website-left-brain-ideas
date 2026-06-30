import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Star } from 'lucide-react';

const EASE = [0.16, 1, 0.3, 1] as any;

export default function FeedbackSection() {
  const { t } = useTranslation();
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);

  const ratings = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <section 
      id="feedback" 
      className="py-20 md:py-24 relative overflow-hidden bg-[#050505] border-t border-white/8"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.015)_0%,transparent_75%)] filter blur-[90px] pointer-events-none -z-10" />

      <div className="container relative z-10 max-w-2xl mx-auto px-6">
        <motion.div
          layout
          className="p-8 md:p-10 rounded-3xl bg-[#0B0B0B] border border-white/8 text-center relative overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
          style={{ willChange: 'transform' }}
        >
          {/* Subtle top border cyan glow line */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[1px] bg-[#22D3EE]/30 blur-[0.5px]" />

          <AnimatePresence mode="wait">
            {selectedRating === null ? (
              <motion.div
                key="rating-form"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="flex flex-col items-center"
              >
                <div className="mb-4">
                  <Star className="w-8 h-8 text-[#22D3EE] fill-[#22D3EE]/10" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-white mb-3">
                  {t('feedback.title')}
                </h2>
                <p className="text-sm text-[#B5B5B5] leading-relaxed mb-8 max-w-md">
                  {t('feedback.subtitle')}
                </p>

                {/* Rating Numbers Grid */}
                <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3 w-full">
                  {ratings.map((num) => {
                    const isHovered = hoveredRating !== null && num <= hoveredRating;
                    return (
                      <motion.button
                        key={num}
                        onClick={() => setSelectedRating(num)}
                        onMouseEnter={() => setHoveredRating(num)}
                        onMouseLeave={() => setHoveredRating(null)}
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.93 }}
                        transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                        className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center font-heading font-bold text-xs sm:text-sm cursor-pointer border select-none transition-all duration-300 ${
                          isHovered
                            ? 'bg-[#22D3EE]/10 border-[#22D3EE] text-[#22D3EE]'
                            : 'bg-white/2 border-white/8 text-[#B5B5B5] hover:text-white'
                        }`}
                        style={{
                          boxShadow: isHovered 
                            ? '0 0 16px rgba(34, 211, 238, 0.25), inset 0 0 8px rgba(34, 211, 238, 0.1)'
                            : 'none',
                          willChange: 'transform'
                        }}
                      >
                        {num}
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="rating-success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                className="flex flex-col items-center py-6"
              >
                {/* A pulsing hearts glow */}
                <motion.div 
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="text-5xl mb-5 select-none cursor-default"
                >
                  ❤️
                </motion.div>
                <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-white mb-2">
                  {t('feedback.success')}
                </h3>
                <p className="text-xs text-[#6B7280] font-mono mt-3 uppercase tracking-wider">
                  {t('feedback.rating_summary', { rating: selectedRating })}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
