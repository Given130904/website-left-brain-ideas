import { motion } from 'framer-motion';
import { MessageSquareCode, Palette, Zap, Lock, MonitorSmartphone, HeartHandshake } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Badge from '../ui/Badge';

const EASE = [0.16, 1, 0.3, 1] as any;

export default function WhyClientsChoose() {
  const { t } = useTranslation();

  const cards = [
    {
      key: 'consultation',
      icon: <MessageSquareCode className="w-5 h-5 text-cyan-400" />,
      glowColor: 'rgba(34, 211, 238, 0.15)',
    },
    {
      key: 'design',
      icon: <Palette className="w-5 h-5 text-pink-400" />,
      glowColor: 'rgba(236, 72, 153, 0.15)',
    },
    {
      key: 'development',
      icon: <Zap className="w-5 h-5 text-amber-400" />,
      glowColor: 'rgba(245, 158, 11, 0.15)',
    },
    {
      key: 'security',
      icon: <Lock className="w-5 h-5 text-emerald-400" />,
      glowColor: 'rgba(16, 185, 129, 0.15)',
    },
    {
      key: 'responsive',
      icon: <MonitorSmartphone className="w-5 h-5 text-blue-400" />,
      glowColor: 'rgba(59, 130, 246, 0.15)',
    },
    {
      key: 'support',
      icon: <HeartHandshake className="w-5 h-5 text-purple-400" />,
      glowColor: 'rgba(139, 92, 246, 0.15)',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: EASE,
      },
    },
  };

  return (
    <section
      id="why-choose"
      className="py-28 md:py-36 relative overflow-hidden bg-[#050505] border-t border-white/8"
    >
      {/* Ambient background glows */}
      <div className="absolute top-[30%] left-[-15%] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.02)_0%,transparent_70%)] filter blur-[120px] pointer-events-none -z-10 animate-pulse-glow" />
      <div className="absolute bottom-[20%] right-[-15%] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.015)_0%,transparent_70%)] filter blur-[120px] pointer-events-none -z-10" />

      {/* Floating particles background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[20%] right-[25%] w-2 h-2 rounded-full bg-cyan-400/20 filter blur-xs animate-float" style={{ animationDuration: '9s', animationDelay: '1s' }} />
        <div className="absolute bottom-[30%] left-[20%] w-3 h-3 rounded-full bg-indigo-500/10 filter blur-[1px] animate-float" style={{ animationDuration: '11s', animationDelay: '3s' }} />
      </div>

      <div className="container relative z-10 max-w-[1140px] mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-[680px] mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-4"
          >
            <Badge variant="cyan">{t('why_choose.badge')}</Badge>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white tracking-tight mb-5 text-gradient-white"
          >
            {t('why_choose.heading')}
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
            className="text-text-secondary text-sm sm:text-base leading-relaxed"
          >
            {t('why_choose.sub')}
          </motion.p>
        </div>

        {/* 6 Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {cards.map((card) => (
            <motion.div
              key={card.key}
              variants={cardVariants}
              whileHover={{ 
                y: -6,
                borderColor: 'rgba(34, 211, 238, 0.25)',
                boxShadow: `0 15px 40px -10px ${card.glowColor}, inset 0 0 12px rgba(255, 255, 255, 0.02)`
              }}
              transition={{ duration: 0.4, ease: EASE }}
              className="group p-7 rounded-2xl bg-neutral-950/45 backdrop-blur-xl border border-white/8 flex flex-col items-start relative overflow-hidden transition-all duration-300 text-left"
              style={{ willChange: 'transform' }}
            >
              {/* Top accent glow line */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/0 to-transparent group-hover:via-cyan-400/35 transition-all duration-500" />
              
              {/* Icon Box */}
              <div className="w-11 h-11 rounded-xl bg-white/2 border border-white/5 flex items-center justify-center shrink-0 mb-6 group-hover:bg-white/4 group-hover:border-white/10 transition-all duration-300">
                {card.icon}
              </div>

              <h3 className="text-base font-heading font-extrabold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300">
                {t(`why_choose.cards.${card.key}.title`)}
              </h3>
              
              <p className="text-xs text-text-secondary leading-relaxed font-sans">
                {t(`why_choose.cards.${card.key}.desc`)}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
