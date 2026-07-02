import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { MessageCircle, Clock, Phone } from 'lucide-react';
import Badge from '../ui/Badge';

const EASE = [0.16, 1, 0.3, 1] as any;

const scrollProps = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.7, ease: EASE }
};

const ADMINS = [
  {
    id: 'admin1',
    name: 'Admin 1',
    role: 'Sales & Konsultasi',
    phone: '6285718564560',
    avatar: 'A1',
    color: '#22D3EE',
  },
  {
    id: 'admin2',
    name: 'Admin 2',
    role: 'Technical Support',
    phone: '6285782336788',
    avatar: 'A2',
    color: '#A78BFA',
  },
];

export default function ContactSection() {
  const { t } = useTranslation();

  const handleOpenWhatsApp = (phone: string) => {
    const msg = encodeURIComponent(
      'Halo, saya ingin konsultasi tentang pembuatan website. Bisakah kita ngobrol?'
    );
    window.open(`https://wa.me/${phone}?text=${msg}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section
      id="contact"
      className="py-24 md:py-32 relative overflow-hidden border-t"
      style={{ background: '#050505', borderColor: 'rgba(255,255,255,0.08)' }}
    >
      {/* Background glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.03) 0%, rgba(34,211,238,0.007) 40%, transparent 70%)' }} />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(167,139,250,0.03) 0%, rgba(167,139,250,0.007) 40%, transparent 70%)' }} />

      <div className="container relative z-10">

        {/* Header */}
        <div className="text-center max-w-[640px] mx-auto mb-16">
          <motion.div {...scrollProps} className="mb-4">
            <Badge variant="muted">{t('contact.badge')}</Badge>
          </motion.div>

          <motion.h2
            {...scrollProps}
            transition={{ ...scrollProps.transition, delay: 0.1 } as any}
            className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white tracking-tight mb-5"
          >
            {t('contact.heading1')}{' '}
            <span style={{ color: '#22D3EE' }}>{t('contact.heading2')}</span>
          </motion.h2>

          <motion.p
            {...scrollProps}
            transition={{ ...scrollProps.transition, delay: 0.2 } as any}
            className="text-sm sm:text-base leading-relaxed"
            style={{ color: '#B5B5B5' }}
          >
            {t('contact.sub')}
          </motion.p>
        </div>

        {/* Admin Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto mb-14">
          {ADMINS.map((admin, idx) => (
            <motion.div
              key={admin.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: EASE }}
            >
              <motion.button
                onClick={() => handleOpenWhatsApp(admin.phone)}
                whileHover={{ 
                  scale: 1.03, 
                  y: -4,
                  borderColor: `${admin.color}40`,
                  boxShadow: `0 0 24px ${admin.color}15, 0 8px 32px rgba(0,0,0,0.4)`
                }}
                whileTap={{ scale: 0.98 }}
                className="w-full text-left p-6 rounded-2xl cursor-pointer group transition-colors duration-300"
                style={{
                  background: '#0B0B0B',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                {/* Avatar + Name */}
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-sm font-bold shrink-0"
                    style={{ background: `${admin.color}18`, border: `1px solid ${admin.color}30`, color: admin.color }}
                  >
                    {admin.avatar}
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">{admin.name}</div>
                    <div className="text-xs mt-0.5" style={{ color: '#B5B5B5' }}>
                      {admin.id === 'admin1' ? t('contact.admin1_role') : t('contact.admin2_role')}
                    </div>
                  </div>
                  {/* Online indicator */}
                  <div className="ml-auto flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" style={{ boxShadow: '0 0 6px #10B981' }} />
                    <span className="text-[10px] font-medium text-[#10B981]">Online</span>
                  </div>
                </div>

                {/* CTA Row */}
                <div
                  className="flex items-center justify-between px-4 py-3 rounded-xl"
                  style={{ background: `${admin.color}08`, border: `1px solid ${admin.color}18` }}
                >
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" style={{ color: admin.color }} />
                    <span className="text-sm font-semibold" style={{ color: admin.color }}>
                      {t('contact.chat_via_wa')}
                    </span>
                  </div>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke={admin.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Info Row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25, ease: EASE }}
          className="flex flex-wrap justify-center gap-4 mb-10 contact-info-pills"
        >
          {/* Hours */}
          <div className="flex items-center gap-2.5 px-5 py-3 rounded-xl flex-1 sm:flex-none min-w-0"
            style={{ background: '#0B0B0B', border: '1px solid rgba(255,255,255,0.08)' }}>
            <Clock className="w-4 h-4 shrink-0" style={{ color: '#22D3EE' }} />
            <div className="min-w-0">
              <div className="text-[10px] uppercase tracking-widest font-medium" style={{ color: '#B5B5B5' }}>{t('contact.hours_label')}</div>
              <div className="text-xs font-semibold text-white truncate">{t('contact.hours_value')}</div>
            </div>
          </div>

          {/* Response time */}
          <div className="flex items-center gap-2.5 px-5 py-3 rounded-xl flex-1 sm:flex-none min-w-0"
            style={{ background: '#0B0B0B', border: '1px solid rgba(255,255,255,0.08)' }}>
            <Phone className="w-4 h-4 shrink-0" style={{ color: '#10B981' }} />
            <div className="min-w-0">
              <div className="text-[10px] uppercase tracking-widest font-medium" style={{ color: '#B5B5B5' }}>{t('contact.response_label')}</div>
              <div className="text-xs font-semibold text-white truncate">{t('contact.response_value')}</div>
            </div>
          </div>
        </motion.div>

        {/* Big CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.35, ease: EASE }}
          className="text-center"
        >
          <motion.button
            onClick={() => window.dispatchEvent(new CustomEvent('open-whatsapp-modal'))}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-[#050505] font-bold text-base cursor-pointer"
            style={{
              background: '#22D3EE',
              boxShadow: '0 0 30px rgba(34,211,238,0.25)',
            }}
          >
            <MessageCircle className="w-5 h-5" />
            {t('contact.cta_main')}
          </motion.button>
          <p className="mt-3 text-xs" style={{ color: '#B5B5B5' }}>
            {t('contact.cta_sub')}
          </p>
        </motion.div>

      </div>
    </section>
  );
}
