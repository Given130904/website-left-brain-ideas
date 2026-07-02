import { useState, useEffect, useRef, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, Globe, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Button from '../components/ui/Button';
import { useSiteReveal } from '../contexts/SiteRevealContext';

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    let rafId: number | null = null;
    const handleScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 20);
        rafId = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  // Close mobile drawer and dropdown when route triggers changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setLangMenuOpen(false);
  }, [location]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(e.target as Node)) {
        setLangMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const navItems = useMemo(() => [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.about'), href: '/#about' },
    { name: t('nav.services'), href: '/#services' },
    { name: t('nav.portfolio'), href: '/#portfolio' },
    { name: t('nav.faq'), href: '/#faq' },
    { name: t('nav.contact'), href: '/#contact' }
  ], [t]);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('lbi_language', lng);
    setLangMenuOpen(false);
  };

  const currentLang = i18n.language || 'id';
  const { isRevealed, isCinematic } = useSiteReveal();

  // Cinematic easing
  const ease = [0.16, 1, 0.3, 1] as any;

  return (
    <>
      {/* Navbar header slides down when revealed */}
      <motion.header
        initial={isCinematic ? { y: -80, opacity: 0 } : false}
        animate={isCinematic ? { y: isRevealed ? 0 : -80, opacity: isRevealed ? 1 : 0 } : {}}
        transition={isCinematic ? { duration: 0.9, delay: 0.35, ease } : {}}
        className={`fixed top-0 left-0 right-0 z-50 transition-[padding,background-color,border-color,backdrop-filter] duration-500 ease-out ${
          isScrolled
            ? 'py-4 bg-[#050505]/85 backdrop-blur-md border-b border-white/8'
            : 'py-6 bg-transparent border-b border-transparent'
        }`}
      >
        <div className="container flex justify-between items-center">
          {/* Logo — slides in from left at 0.50s */}
          <motion.div
            initial={isCinematic ? { opacity: 0, x: -20 } : false}
            animate={isCinematic ? { opacity: isRevealed ? 1 : 0, x: isRevealed ? 0 : -20 } : {}}
            transition={isCinematic ? { duration: 0.8, delay: 0.5, ease } : {}}
          >
            <Link to="/" className="flex items-center gap-3 z-51 group select-none">
              <div className="relative w-10 h-10 flex items-center justify-center rounded-xl bg-white/3 border border-white/8 group-hover:border-[#22D3EE]/40 transition-all duration-300 overflow-hidden shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                <img
                  src="/assets/images/logo-left-brain-ideas.svg"
                  alt="Left Brain Ideas"
                  className="w-7 h-7 object-contain"
                />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-heading font-extrabold text-sm tracking-wider text-[#F8FAFC] leading-none">LEFT BRAIN</span>
                <span className="font-heading font-medium text-[10px] tracking-[0.25em] text-[#22D3EE] leading-tight mt-0.5">IDEAS</span>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Nav Items — stagger from 0.65s */}
          <nav className="hidden md:block">
            <ul className="flex gap-8 items-center list-none">
              {navItems.map((item, idx) => {
                const isAnchor = item.href.startsWith('/#');
                return (
                  <motion.li
                    key={item.name}
                    className="relative"
                    initial={isCinematic ? { opacity: 0, y: -10 } : false}
                    animate={isCinematic ? { opacity: isRevealed ? 1 : 0, y: isRevealed ? 0 : -10 } : {}}
                    transition={isCinematic ? { duration: 0.6, delay: 0.65 + idx * 0.06, ease } : {}}
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    {isAnchor ? (
                      <a
                        href={item.href}
                        className="text-sm font-medium text-[#94A3B8] hover:text-[#F8FAFC] transition-colors duration-300 py-2 px-1"
                      >
                        {item.name}
                      </a>
                    ) : (
                      <Link
                        to={item.href}
                        className="text-sm font-medium text-[#94A3B8] hover:text-[#F8FAFC] transition-colors duration-300 py-2 px-1"
                      >
                        {item.name}
                      </Link>
                    )}

                    {/* Animated hover highlight border line */}
                    {hoveredIndex === idx && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute bottom-[-6px] left-0 right-0 h-[1.5px] bg-[#22D3EE]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </motion.li>
                );
              })}
            </ul>
          </nav>

          {/* Language selection dropdown & CTA */}
          <div className="hidden md:flex items-center gap-4">
            {/* Language Switcher */}
            <div className="relative" ref={langDropdownRef}>
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/3 border border-white/5 hover:border-[#38BDF8]/30 transition-all duration-300 text-xs font-semibold text-[#94A3B8] hover:text-[#F8FAFC] cursor-pointer"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>{currentLang.startsWith('id') ? '🇮🇩 ID' : '🇺🇸 EN'}</span>
                <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${langMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {langMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-32 rounded-xl bg-[#0B1220] border border-white/10 p-1.5 shadow-2xl z-52"
                  >
                    <button
                      onClick={() => changeLanguage('id')}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors flex items-center gap-2 cursor-pointer ${
                        currentLang.startsWith('id') ? 'bg-[#38BDF8]/10 text-[#38BDF8]' : 'text-[#94A3B8] hover:bg-white/3 hover:text-white'
                      }`}
                    >
                      <span>🇮🇩</span> Indonesia
                    </button>
                    <button
                      onClick={() => changeLanguage('en')}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors flex items-center gap-2 cursor-pointer ${
                        currentLang.startsWith('en') ? 'bg-[#38BDF8]/10 text-[#38BDF8]' : 'text-[#94A3B8] hover:bg-white/3 hover:text-white'
                      }`}
                    >
                      <span>🇺🇸</span> English
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Button 
              onClick={() => window.dispatchEvent(new CustomEvent('open-whatsapp-modal'))} 
              variant="outline" 
              className="px-5 py-2.5 text-xs"
            >
              Hubungi Admin
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </div>

          {/* Mobile elements bar right */}
          <div className="flex md:hidden items-center gap-3">
            {/* Simple Flag switcher button for mobile */}
            <button
              onClick={() => changeLanguage(currentLang.startsWith('id') ? 'en' : 'id')}
              className="p-2 bg-white/3 border border-white/5 rounded-lg text-sm hover:bg-white/8 font-mono select-none cursor-pointer"
              title="Switch Language"
            >
              {currentLang.startsWith('id') ? '🇺🇸' : '🇮🇩'}
            </button>

            <button 
              className="text-[#F8FAFC] z-52 p-2 hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Drawer menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "100vh", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-[#050505]/98 backdrop-blur-xl z-40 flex flex-col justify-center items-center overflow-hidden"
          >
            <nav className="w-full text-center p-6">
              <ul className="list-none flex flex-col gap-6 text-xl font-semibold">
                {navItems.map((item, idx) => {
                  const isAnchor = item.href.startsWith('/#');
                  return (
                    <motion.li 
                      key={item.name}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 + 0.1, duration: 0.4 }}
                    >
                      {isAnchor ? (
                        <a 
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="text-[#F8FAFC] hover:text-[#22D3EE] transition-colors"
                        >
                          {item.name}
                        </a>
                      ) : (
                        <Link 
                          to={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="text-[#F8FAFC] hover:text-[#22D3EE] transition-colors"
                        >
                          {item.name}
                        </Link>
                      )}
                    </motion.li>
                  );
                })}
                <motion.li 
                  className="mt-6"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navItems.length * 0.05 + 0.1, duration: 0.4 }}
                >
                  <Button 
                    onClick={() => {
                      setMobileMenuOpen(false);
                      window.dispatchEvent(new CustomEvent('open-whatsapp-modal'));
                    }} 
                    variant="primary"
                  >
                    Hubungi Admin
                  </Button>
                </motion.li>
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
