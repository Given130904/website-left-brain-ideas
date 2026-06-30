import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  Zap, 
  Shield, 
  Sparkles, 
  Paintbrush, 
  Clock, 
  MessageSquare,
  Activity
} from 'lucide-react';

export default function Footer() {
  const { t } = useTranslation();
  const [hoveredNav, setHoveredNav] = useState<number | null>(null);

  const currentYear = new Date().getFullYear();

  const navItems = [
    { name: t('nav.home', 'Beranda'), href: '/' },
    { name: t('nav.about', 'Tentang'), href: '/#about' },
    { name: t('nav.services', 'Layanan'), href: '/#services' },
    { name: t('nav.portfolio', 'Portofolio'), href: '/#portfolio' },
    { name: t('nav.testimonials', 'Testimoni'), href: '/#testimonials' },
    { name: t('nav.faq', 'FAQ'), href: '/#faq' },
    { name: t('nav.contact', 'Kontak'), href: '/#contact' }
  ];

  const badges = [
    { icon: <Sparkles className="w-3 h-3 text-[#22D3EE]" />, label: t('footer.badges.consultation', 'Konsultasi Gratis') },
    { icon: <Zap className="w-3 h-3 text-[#22D3EE]" />, label: t('footer.badges.speed', 'Pengerjaan Cepat') },
    { icon: <Paintbrush className="w-3 h-3 text-[#22D3EE]" />, label: t('footer.badges.design', 'Desain Premium') },
    { icon: <Shield className="w-3 h-3 text-[#22D3EE]" />, label: t('footer.badges.security', 'Website Aman') }
  ];

  const getWhatsAppLink = (number: string) => {
    return `https://wa.me/${number}?text=Halo%20Left%20Brain%20Ideas,%20saya%20ingin%20berkonsultasi%20mengenai%20pembuatan%20website.`;
  };

  const admin1 = "6285718564560";
  const admin2 = "6285782336788";

  return (
    <footer className="relative overflow-hidden bg-[#050505] border-t border-white/8 pt-20 pb-12 z-10 text-left">
      
      {/* Animated Glowing Top Border Line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#22D3EE]/30 to-transparent overflow-hidden">
        <motion.div 
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 left-0 w-1/3 h-[1px] bg-gradient-to-r from-transparent via-[#22D3EE] to-transparent"
        />
      </div>

      {/* Premium Background Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        {/* Moving ambient gradient blob 1 */}
        <motion.div
          animate={{
            x: ['-20%', '30%', '-20%'],
            y: ['-10%', '20%', '-10%'],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-0 right-1/4 w-[350px] h-[350px] rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.02)_0%,transparent_70%)] filter blur-[60px]"
        />
        {/* Moving ambient gradient blob 2 */}
        <motion.div
          animate={{
            x: ['20%', '-20%', '20%'],
            y: ['20%', '-10%', '20%'],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-0 left-1/4 w-[300px] h-[300px] rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.012)_0%,transparent_70%)] filter blur-[50px]"
        />
        {/* Grid mesh pattern */}
        <div 
          className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:32px_32px] opacity-40"
        />
        {/* Subtle floating particles */}
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: 200, opacity: 0, x: Math.random() * 800 }}
            animate={{
              y: -100,
              opacity: [0, 0.35, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 6,
              repeat: Infinity,
              ease: 'linear',
              delay: i * 2.2,
            }}
            className="absolute w-1 h-1 rounded-full bg-[#22D3EE]/30 blur-[0.5px]"
            style={{ left: `${15 + i * 18}%` }}
          />
        ))}
      </div>

      <div className="container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 pb-16 border-b border-white/8">
          
          {/* LEFT COLUMN: Logo, Tagline & Glowing Badges */}
          <div className="md:col-span-5 flex flex-col items-start gap-5">
            <Link to="/" className="flex items-center gap-3 select-none group">
              <div className="relative w-10 h-10 flex items-center justify-center rounded-xl bg-white/3 border border-white/8 group-hover:border-[#22D3EE]/40 transition-all overflow-hidden shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                <img 
                  src="/assets/images/logo-left-brain-ideas.svg" 
                  alt="Left Brain Ideas"
                  className="w-7 h-7 object-contain" 
                />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-heading font-extrabold text-sm tracking-wider text-white leading-none">LEFT BRAIN</span>
                <span className="font-heading font-medium text-[10px] tracking-[0.25em] text-[#22D3EE] leading-tight mt-0.5">IDEAS</span>
              </div>
            </Link>
            
            <p className="text-xs text-[#B5B5B5] leading-relaxed max-w-[340px] font-sans">
              {t('footer.desc')}
            </p>

            {/* Glowing Badges Area */}
            <div className="flex flex-wrap gap-2 mt-2 max-w-[340px]">
              {badges.map((badge, idx) => (
                <div
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/2 border border-white/5 text-[10px] text-white/70 font-sans font-semibold transition-all duration-300 hover:border-[#22D3EE]/30 hover:bg-[#22D3EE]/5 hover:text-white"
                  style={{
                    boxShadow: 'inset 0 0 10px rgba(255,255,255,0.01)'
                  }}
                >
                  {badge.icon}
                  <span>{badge.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CENTER COLUMN: Quick Navigation */}
          <div className="md:col-span-3 flex flex-col items-start gap-4 text-xs font-sans">
            <h4 className="font-heading font-bold text-white uppercase tracking-wider text-[10px]">
              {t('footer.quick_links', 'Navigasi Cepat')}
            </h4>
            <ul className="flex flex-col gap-3 list-none">
              {navItems.map((item, idx) => {
                const isAnchor = item.href.startsWith('/#');
                return (
                  <li 
                    key={item.name} 
                    className="relative py-0.5"
                    onMouseEnter={() => setHoveredNav(idx)}
                    onMouseLeave={() => setHoveredNav(null)}
                  >
                    {isAnchor ? (
                      <a 
                        href={item.href}
                        className="text-[#B5B5B5] hover:text-white transition-colors duration-200"
                      >
                        {item.name}
                      </a>
                    ) : (
                      <Link 
                        to={item.href}
                        className="text-[#B5B5B5] hover:text-white transition-colors duration-200"
                      >
                        {item.name}
                      </Link>
                    )}

                    {hoveredNav === idx && (
                      <motion.span 
                        layoutId="footer-underline"
                        className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#22D3EE]"
                        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                      />
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* RIGHT COLUMN: Hubungi Kami, Hours, Response */}
          <div className="md:col-span-4 flex flex-col items-start gap-5 text-xs font-sans">
            <h4 className="font-heading font-bold text-white uppercase tracking-wider text-[10px]">
              {t('footer.contact_title')}
            </h4>
            
            {/* WhatsApp Buttons */}
            <div className="flex flex-col gap-2.5 w-full max-w-[240px]">
              <a
                href={getWhatsAppLink(admin1)}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between px-4 py-2.5 rounded-xl bg-white/2 border border-white/5 hover:border-[#22D3EE]/30 hover:bg-[#22D3EE]/5 transition-all duration-300 text-white font-semibold cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-3.5 h-3.5 text-[#22D3EE]" />
                  <span>WhatsApp Admin 1</span>
                </div>
                <span className="text-[9px] font-mono font-bold bg-[#22D3EE]/10 text-[#22D3EE] px-1.5 py-0.5 rounded border border-[#22D3EE]/20 group-hover:bg-[#22D3EE] group-hover:text-black transition-all">A1</span>
              </a>

              <a
                href={getWhatsAppLink(admin2)}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between px-4 py-2.5 rounded-xl bg-white/2 border border-white/5 hover:border-[#22D3EE]/30 hover:bg-[#22D3EE]/5 transition-all duration-300 text-white font-semibold cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-3.5 h-3.5 text-[#22D3EE]" />
                  <span>WhatsApp Admin 2</span>
                </div>
                <span className="text-[9px] font-mono font-bold bg-[#22D3EE]/10 text-[#22D3EE] px-1.5 py-0.5 rounded border border-[#22D3EE]/20 group-hover:bg-[#22D3EE] group-hover:text-black transition-all">A2</span>
              </a>
            </div>

            {/* Business Hours & Response Metrics */}
            <div className="flex flex-col gap-3 pt-2 text-[#B5B5B5] border-t border-white/5 w-full max-w-[240px]">
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#22D3EE] shrink-0" />
                <div className="flex flex-col text-left">
                  <span className="font-semibold text-white text-[10px] uppercase tracking-wider">{t('footer.hours_title')}</span>
                  <span className="text-xs">{t('footer.hours_value')}</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Activity className="w-4 h-4 text-[#22D3EE] shrink-0" />
                <div className="flex flex-col text-left">
                  <span className="font-semibold text-white text-[10px] uppercase tracking-wider">{t('footer.response_title')}</span>
                  <span className="text-xs">{t('footer.response_value')}</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright row */}
        <div className="pt-8 flex flex-col sm:flex-row gap-4 items-center justify-between text-[11px] text-[#6B7280] font-sans">
          <p>© {currentYear} Left Brain Ideas. {t('footer.copyright_text')}</p>
          <div className="flex gap-4">
            <a href="#about" className="hover:text-[#F8FAFC] transition-colors">{t('footer.privacy')}</a>
            <a href="#about" className="hover:text-[#F8FAFC] transition-colors">{t('footer.terms')}</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
