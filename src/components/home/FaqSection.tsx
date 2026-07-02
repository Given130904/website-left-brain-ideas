import { useState, useRef, memo, useMemo, useCallback } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Plus, Minus } from 'lucide-react';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

interface FaqCardProps {
  faq: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}

const FaqCard = memo(function FaqCard({ faq, isOpen, onToggle, index }: FaqCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group relative"
    >
      <div
        className="relative rounded-2xl transition-all duration-500 text-left"
        style={{
          padding: '1px',
          background: isOpen
            ? 'rgba(34, 211, 238, 0.25)'
            : 'rgba(255, 255, 255, 0.08)',
          boxShadow: isOpen
            ? '0 0 30px rgba(34, 211, 238, 0.06)'
            : 'none',
        }}
      >
        <div
          className="relative rounded-2xl overflow-hidden transition-all duration-500"
          style={{
            background: '#0B0B0B',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
          }}
        >
          {/* Subtle top shimmer on open */}
          {isOpen && (
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#22D3EE]/50 to-transparent" />
          )}

          {/* Question row / toggle button */}
          <button
            onClick={onToggle}
            className="w-full flex items-center justify-between gap-4 px-7 py-6 text-left cursor-pointer"
            aria-expanded={isOpen}
          >
            {/* Index + question */}
            <div className="flex items-center gap-4">
              <span
                className="font-mono text-[11px] font-bold tracking-widest transition-colors duration-300 shrink-0"
                style={{ color: isOpen ? '#22D3EE' : 'rgba(255,255,255,0.2)' }}
              >
                {String(index + 1).padStart(2, '0')}
              </span>
              <span
                className="font-heading font-bold text-base sm:text-lg leading-snug transition-colors duration-300"
                style={{ color: isOpen ? '#ffffff' : 'rgba(255,255,255,0.75)' }}
              >
                {faq.question}
              </span>
            </div>

            {/* Toggle icon */}
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300"
              style={{
                background: isOpen ? 'rgba(34,211,238,0.12)' : 'rgba(255,255,255,0.04)',
                border: isOpen ? '1px solid rgba(34,211,238,0.25)' : '1px solid rgba(255,255,255,0.08)',
                color: isOpen ? '#22D3EE' : 'rgba(255,255,255,0.4)',
              }}
            >
              {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
            </motion.div>
          </button>

          {/* Animated answer panel */}
          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                key="answer"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <motion.div
                  initial={{ y: -10 }}
                  animate={{ y: 0 }}
                  exit={{ y: -10 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="px-7 pb-7 pt-0"
                >
                  {/* Divider line */}
                  <div className="w-full h-px bg-gradient-to-r from-transparent via-white/8 to-transparent mb-5" />
                  <p className="text-[#B5B5B5] text-sm leading-relaxed font-sans pl-10 text-left">
                    {faq.answer}
                  </p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
});

export default function FaqSection() {
  const { t } = useTranslation();
  const [openId, setOpenId] = useState<string | null>('timeline');
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  const faqs: FaqItem[] = useMemo(() => [
    {
      id: 'timeline',
      question: t('faq.items.timeline.q'),
      answer: t('faq.items.timeline.a'),
    },
    {
      id: 'revisions',
      question: t('faq.items.revisions.q'),
      answer: t('faq.items.revisions.a'),
    },
    {
      id: 'hosting',
      question: t('faq.items.hosting.q'),
      answer: t('faq.items.hosting.a'),
    },
    {
      id: 'redesign',
      question: t('faq.items.redesign.q'),
      answer: t('faq.items.redesign.a'),
    },
    {
      id: 'maintenance',
      question: t('faq.items.maintenance.q'),
      answer: t('faq.items.maintenance.a'),
    },
  ], [t]);

  const toggle = useCallback((id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  }, []);

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="py-28 relative overflow-hidden bg-[#050505] border-t border-white/8"
    >
      {/* Ambient background radials */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[radial-gradient(ellipse,rgba(34,211,238,0.02)_0%,rgba(34,211,238,0.005)_40%,transparent_70%)]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[radial-gradient(ellipse,rgba(255,255,255,0.01)_0%,transparent_70%)]" />
      </div>

      <div className="container relative z-10">
        <div className="max-w-[800px] mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-16 px-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/3 border border-white/5 rounded-full text-xs font-semibold uppercase tracking-wider text-text-secondary mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22D3EE] animate-pulse" />
              {t('faq.badge')}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white mb-5 leading-tight">
              {t('faq.heading1')}{' '}
              <span style={{ color: '#22D3EE' }}>
                {t('faq.heading2')}
              </span>
            </h2>
            <p className="text-[#B5B5B5] text-sm sm:text-base leading-relaxed max-w-[520px] mx-auto">
              {t('faq.sub')}{' '}
              <a
                href="#contact"
                className="text-[#22D3EE] hover:text-white transition-colors duration-200 underline underline-offset-2"
              >
                {t('faq.ask_link')}
              </a>
            </p>
          </motion.div>

          {/* FAQ Accordion List */}
          <div className="flex flex-col gap-3 px-6">
            {faqs.map((faq, index) => (
              <FaqCard
                key={faq.id}
                faq={faq}
                isOpen={openId === faq.id}
                onToggle={() => toggle(faq.id)}
                index={index}
              />
            ))}
          </div>

          {/* Bottom CTA nudge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-12 text-center"
          >
            <p className="text-[#B5B5B5] text-xs font-sans">
              {t('faq.still_q')}{' '}
              <a
                href="#contact"
                className="text-[#22D3EE] hover:text-white transition-colors duration-200 font-medium"
              >
                {t('faq.send_link')}
              </a>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
