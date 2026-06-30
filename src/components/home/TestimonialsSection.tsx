import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Badge from '../ui/Badge';

const EASE = [0.16, 1, 0.3, 1] as any;

interface TestimonialItem {
  name: string;
  company: string;
  review: string;
  rating: number;
}

// Dynamic list loading is performed inside the component now

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill="#F59E0B" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({ item, accentColor }: { item: TestimonialItem; accentColor: string }) {
  return (
    <motion.div
      whileHover={{
        y: -5,
        scale: 1.015,
        borderColor: `${accentColor}30`,
        boxShadow: `0 12px 32px rgba(34, 211, 238, 0.04), 0 0 0 1px ${accentColor}20`
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className="w-[280px] sm:w-[320px] flex-shrink-0 flex flex-col gap-4 p-6 rounded-2xl select-none cursor-default"
      style={{
        background: '#101010',
        border: '1px solid rgba(255,255,255,0.08)',
        backdropFilter: 'blur(16px)',
        willChange: 'transform'
      }}
    >
      <StarRating count={item.rating} />
      <p className="text-[#B5B5B5] text-xs leading-relaxed font-sans flex-grow">
        &ldquo;{item.review}&rdquo;
      </p>
      <div className="border-t border-white/5 pt-3 flex flex-col">
        <span className="text-xs font-heading font-bold text-white">{item.name}</span>
        <span className="text-[9px] font-mono text-[#B5B5B5] mt-0.5 uppercase tracking-wider">{item.company}</span>
      </div>
    </motion.div>
  );
}

export default function TestimonialsSection() {
  const { t } = useTranslation();

  const testimonialsLeft = ((t('testimonials.left', { returnObjects: true }) as any[]) || []).map(item => ({
    ...item,
    rating: 5
  })) as TestimonialItem[];

  const testimonialsRight = ((t('testimonials.right', { returnObjects: true }) as any[]) || []).map(item => ({
    ...item,
    rating: 5
  })) as TestimonialItem[];

  return (
    <section
      id="testimonials"
      className="py-24 md:py-32 relative overflow-hidden bg-[#050505] border-t border-white/8"
    >
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .marquee-left-track { animation: marquee-left 32s linear infinite; }
        .marquee-right-track { animation: marquee-right 32s linear infinite; }
        .marquee-wrapper-left:hover .marquee-left-track {
          animation-play-state: paused;
        }
        .marquee-wrapper-right:hover .marquee-right-track {
          animation-play-state: paused;
        }
      `}} />

      {/* Edge fade masks */}
      <div className="absolute left-0 top-0 bottom-0 w-24 z-20 pointer-events-none bg-gradient-to-r from-[#050505] to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-20 pointer-events-none bg-gradient-to-l from-[#050505] to-transparent" />

      <div className="w-full relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-[640px] mx-auto mb-16 px-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-4"
          >
            <Badge variant="muted">{t('testimonials.badge')}</Badge>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white tracking-tight"
          >
            {t('testimonials.heading')}
          </motion.h2>
        </div>

        {/* Row 1: Scrolls left — pauses only this row on hover */}
        <div className="w-full overflow-hidden mb-5 marquee-wrapper-left">
          <div className="flex gap-5 marquee-left-track py-2">
            {testimonialsLeft.map((item, idx) => (
              <TestimonialCard key={`l1-${idx}`} item={item} accentColor="#22D3EE" />
            ))}
            {testimonialsLeft.map((item, idx) => (
              <TestimonialCard key={`l2-${idx}`} item={item} accentColor="#22D3EE" />
            ))}
          </div>
        </div>

        {/* Row 2: Scrolls right — pauses only this row on hover */}
        <div className="w-full overflow-hidden marquee-wrapper-right">
          <div className="flex gap-5 marquee-right-track py-2">
            {testimonialsRight.map((item, idx) => (
              <TestimonialCard key={`r1-${idx}`} item={item} accentColor="#22D3EE" />
            ))}
            {testimonialsRight.map((item, idx) => (
              <TestimonialCard key={`r2-${idx}`} item={item} accentColor="#22D3EE" />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
