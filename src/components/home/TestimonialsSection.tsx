import { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react';
import Badge from '../ui/Badge';

const EASE = [0.16, 1, 0.3, 1] as any;

interface Testimonial {
  name: string;
  company: string;
  review: string;
  rating: number;
}

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5 justify-center">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg 
          key={i} 
          width="14" 
          height="14" 
          viewBox="0 0 24 24" 
          fill={i < count ? "#F59E0B" : "rgba(255,255,255,0.06)"} 
          stroke={i < count ? "#F59E0B" : "rgba(255,255,255,0.15)"}
          strokeWidth="1.5"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const { t } = useTranslation();
  
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { margin: '-50px' });

  // Consolidate both left and right lists from localization into a single array
  const testimonials = useMemo(() => [
    ...(((t('testimonials.left', { returnObjects: true }) as any[]) || []).map(item => ({ ...item, rating: 5 }))),
    ...(((t('testimonials.right', { returnObjects: true }) as any[]) || []).map(item => ({ ...item, rating: 5 })))
  ], [t]) as Testimonial[];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const activeTestimonial = testimonials[currentIndex];

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
      scale: 0.97
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: EASE }
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 80 : -80,
      opacity: 0,
      scale: 0.97,
      transition: { duration: 0.4, ease: EASE }
    })
  };

  if (testimonials.length === 0) return null;

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="py-28 md:py-36 relative overflow-hidden bg-[#050505] border-t border-white/8"
    >
      {/* Background glow highlights — static opacity */}
      <div className="absolute top-[30%] left-[-10%] w-[380px] h-[380px] rounded-full pointer-events-none -z-10 opacity-55" style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.04) 0%, rgba(34,211,238,0.01) 40%, transparent 70%)' }} />
      <div className="absolute bottom-[30%] right-[-10%] w-[380px] h-[380px] rounded-full pointer-events-none -z-10 opacity-45" style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.03) 0%, transparent 70%)' }} />

      {/* Floating particles (viewport gated) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className={`absolute top-[20%] left-[15%] w-2 h-2 rounded-full bg-cyan-400/18 ${isInView ? 'animate-float' : ''}`} style={{ animationDuration: '7s' }} />
        <div className={`absolute bottom-[20%] right-[15%] w-3 h-3 rounded-full bg-blue-400/10 ${isInView ? 'animate-float' : ''}`} style={{ animationDuration: '10s', animationDelay: '2s' }} />
      </div>

      <div className="container relative z-10 max-w-[800px] mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-[640px] mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-4 inline-block"
          >
            <Badge variant="cyan">{t('testimonials.badge')}</Badge>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            className="text-4xl sm:text-5xl font-heading font-extrabold text-white leading-tight text-gradient-white"
          >
            {t('testimonials.heading')}
          </motion.h2>
        </div>

        {/* Dynamic Carousel Frame */}
        <div className="relative w-full flex flex-col items-center">
          
          {/* Main Card with AnimatePresence */}
          <div className="relative w-full overflow-hidden min-h-[320px] sm:min-h-[260px] flex items-center justify-center p-1">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.4}
                onDragEnd={(_, { offset }) => {
                  if (offset.x > 60) handlePrev();
                  else if (offset.x < -60) handleNext();
                }}
                className="w-full rounded-[24px] bg-neutral-900/40 backdrop-blur-xl border border-white/8 p-8 sm:p-10 shadow-[0_12px_40px_rgba(0,0,0,0.6)] flex flex-col justify-between items-center text-center cursor-grab active:cursor-grabbing select-none"
                style={{ willChange: 'transform, opacity' }}
              >
                {/* Quote Icon styling */}
                <div className="text-cyan-400/20 mb-6 shrink-0">
                  <Quote className="w-10 h-10 fill-cyan-400/5 rotate-180" />
                </div>

                {/* Testimonial body */}
                <p className="text-base sm:text-lg text-text-secondary leading-relaxed font-sans font-medium mb-8 max-w-[620px]">
                  &ldquo;{activeTestimonial.review}&rdquo;
                </p>

                {/* Rating & Profile details */}
                <div className="flex flex-col items-center gap-3 shrink-0">
                  <StarRating count={activeTestimonial.rating} />
                  <div className="flex flex-col">
                    <span className="text-sm font-heading font-bold text-white tracking-wide">
                      {activeTestimonial.name}
                    </span>
                    <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest mt-1">
                      {activeTestimonial.company}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Draggable indicator hint (Mobile only) */}
          <span className="text-[9px] font-mono text-white/20 mt-4 md:hidden uppercase tracking-widest pointer-events-none">
            ← Geser untuk Membaca Lainnya →
          </span>

          {/* Navigation Controls (Arrows + Dots) */}
          <div className="flex items-center justify-between w-full mt-10 px-4">
            
            {/* Left Button */}
            <motion.button
              onClick={handlePrev}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-full bg-white/3 border border-white/5 flex items-center justify-center text-[#B5B5B5] hover:text-[#22D3EE] hover:border-[#22D3EE]/30 transition-all duration-300 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </motion.button>

            {/* Indicator Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, idx) => {
                const isActive = idx === currentIndex;
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      setDirection(idx > currentIndex ? 1 : -1);
                      setCurrentIndex(idx);
                    }}
                    className="relative py-2 px-1 cursor-pointer select-none group"
                  >
                    <motion.div
                      animate={{
                        width: isActive ? 20 : 6,
                        backgroundColor: isActive ? '#22D3EE' : 'rgba(255, 255, 255, 0.15)',
                      }}
                      transition={{ duration: 0.3, ease: EASE }}
                      className="h-1.5 rounded-full group-hover:bg-white/40"
                    />
                  </button>
                );
              })}
            </div>

            {/* Right Button */}
            <motion.button
              onClick={handleNext}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-full bg-white/3 border border-white/5 flex items-center justify-center text-[#B5B5B5] hover:text-[#22D3EE] hover:border-[#22D3EE]/30 transition-all duration-300 cursor-pointer"
            >
              <ArrowRight className="w-4 h-4" />
            </motion.button>

          </div>

        </div>

      </div>
    </section>
  );
}
