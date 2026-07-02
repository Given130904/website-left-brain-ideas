import { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Globe,
  Sparkles,
  Building,
  BarChart3,
  Terminal,
  Layers,
  ShieldCheck,
  Smartphone,
  ArrowRight,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Badge from '../ui/Badge';
const EASE = [0.16, 1, 0.3, 1] as any;

const serviceCardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: (idx: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: idx * 0.07, ease: EASE } as any
  }),
  hover: {
    y: -6,
    scale: 1.015,
    borderColor: 'rgba(34, 211, 238, 0.25)',
    boxShadow: '0 12px 32px rgba(34, 211, 238, 0.06)',
    transition: { type: 'spring', stiffness: 300, damping: 22 } as any
  }
};

export default function ServicesSection() {
  const { t } = useTranslation();

  const services = useMemo(() => [
    {
      title: t('services.items.custom_app.title'),
      description: t('services.items.custom_app.desc'),
      icon: <Terminal className="w-5 h-5 text-[#22D3EE]" />,
      accent: '#22D3EE',
      featured: true,
      category: t('services.engineering'),
    },
    {
      title: t('services.items.web_dev.title'),
      description: t('services.items.web_dev.desc'),
      icon: <Globe className="w-5 h-5 text-[#22D3EE]" />,
      accent: '#22D3EE',
      featured: false,
      category: t('services.engineering'),
    },
    {
      title: t('services.items.landing.title'),
      description: t('services.items.landing.desc'),
      icon: <Sparkles className="w-5 h-5 text-[#22D3EE]" />,
      accent: '#22D3EE',
      featured: false,
      category: t('services.design'),
    },
    {
      title: t('services.items.company.title'),
      description: t('services.items.company.desc'),
      icon: <Building className="w-5 h-5 text-[#22D3EE]" />,
      accent: '#22D3EE',
      featured: false,
      category: t('services.design'),
    },
    {
      title: t('services.items.dashboard.title'),
      description: t('services.items.dashboard.desc'),
      icon: <BarChart3 className="w-5 h-5 text-[#22D3EE]" />,
      accent: '#22D3EE',
      featured: false,
      category: t('services.engineering'),
    },
    {
      title: t('services.items.uiux.title'),
      description: t('services.items.uiux.desc'),
      icon: <Layers className="w-5 h-5 text-[#22D3EE]" />,
      accent: '#22D3EE',
      featured: false,
      category: t('services.design'),
    },
    {
      title: t('services.items.maintenance.title'),
      description: t('services.items.maintenance.desc'),
      icon: <ShieldCheck className="w-5 h-5 text-[#22D3EE]" />,
      accent: '#22D3EE',
      featured: false,
      category: t('services.engineering'),
    },
    {
      title: t('services.items.responsive.title'),
      description: t('services.items.responsive.desc'),
      icon: <Smartphone className="w-5 h-5 text-[#22D3EE]" />,
      accent: '#22D3EE',
      featured: false,
      category: t('services.engineering'),
    },
  ], [t]);

  const [featured, ...rest] = services;

  return (
    <section
      id="services"
      className="py-24 md:py-32 relative overflow-hidden bg-[#050505] border-t border-white/8"
    >
      {/* Background glows */}
      <div className="absolute top-[10%] left-[5%] w-[450px] h-[450px] rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.02) 0%,rgba(34,211,238,0.005) 45%,transparent 70%)] pointer-events-none -z-10" />
      <div className="absolute bottom-[10%] right-[5%] w-[450px] h-[450px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.01) 0%,transparent 70%)] pointer-events-none -z-10" />

      <div className="container relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-[640px] mx-auto mb-16 px-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-4"
          >
            <Badge variant="muted">{t('services.badge')}</Badge>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white tracking-tight"
          >
            {t('services.heading')}
          </motion.h2>
        </div>

        {/* Featured card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-5 group relative rounded-2xl overflow-hidden cursor-default text-left"
          style={{
            background: '#0B0B0B',
            border: '1px solid rgba(34, 211, 238, 0.12)',
            backdropFilter: 'blur(16px)',
          }}
        >
          {/* Top accent line */}
          <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-[#22D3EE]/30" />

          <div className="p-8 flex flex-col md:flex-row gap-8 items-start md:items-center">
            {/* Icon */}
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105"
              style={{ background: 'rgba(34,211,238,0.08)', border: '1px solid rgba(34,211,238,0.18)' }}
            >
              <Terminal className="w-6 h-6 text-[#22D3EE]" />
            </div>

            {/* Content */}
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <span className="text-[9px] font-mono font-bold text-[#22D3EE] tracking-widest uppercase">{t('services.featured_label')}</span>
              </div>
              <h3 className="text-xl md:text-2xl font-heading font-bold text-white mb-2 group-hover:text-[#22D3EE] transition-colors duration-300">
                {featured.title}
              </h3>
              <p className="text-[#B5B5B5] text-sm leading-relaxed max-w-[560px]">
                {featured.description}
              </p>
            </div>

            {/* CTA arrow */}
            <a
              href="#contact"
              className="shrink-0 flex items-center gap-2 text-sm font-semibold text-[#22D3EE] hover:text-white transition-colors duration-200 group/cta"
            >
              {t('services.discuss')}
              <ArrowRight className="w-4 h-4 group-hover/cta:translate-x-1 transition-transform" />
            </a>
          </div>
        </motion.div>

        {/* 4-column grid for rest */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 text-left">
          {rest.map((service, idx) => (
            <motion.div
              key={service.title}
              custom={idx}
              variants={serviceCardVariants}
              initial="hidden"
              whileInView="show"
              whileHover="hover"
              whileTap={{ scale: 0.985 }}
              viewport={{ once: true, margin: '-80px' }}
              className="group relative rounded-2xl overflow-hidden cursor-default transition-colors duration-500"
              style={{
                background: '#0B0B0B',
                border: '1px solid rgba(255,255,255,0.08)',
                backdropFilter: 'blur(12px)',
              }}
            >
              {/* Top hover accent */}
              <div
                className="absolute top-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                style={{ background: `linear-gradient(90deg, transparent, ${service.accent}, transparent)` }}
              />

              <div className="p-6 flex flex-col h-full min-h-[240px]">
                {/* Icon */}
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-105"
                  style={{
                    background: `${service.accent}08`,
                    border: `1px solid ${service.accent}15`,
                  }}
                >
                  {service.icon}
                </div>

                <h3 className="text-base font-heading font-bold text-white mb-2.5 transition-colors duration-300 group-hover:text-[#22D3EE]">
                  {service.title}
                </h3>
                <p className="text-[#B5B5B5] text-xs leading-relaxed flex-1">
                  {service.description}
                </p>

                {/* Footer label */}
                <div
                  className="text-[9px] font-mono font-bold tracking-widest mt-5 pt-4 border-t border-white/4 uppercase"
                  style={{ color: service.accent, opacity: 0.6 }}
                >
                  {service.category}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
