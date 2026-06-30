import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Globe, ShoppingBag, LayoutDashboard, Compass, Database } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Badge from '../ui/Badge';

const EASE = [0.16, 1, 0.3, 1] as any;

export default function PortfolioSection() {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = [
    { key: 'All', translateKey: 'all' },
    { key: 'Company Profile', translateKey: 'company_profile' },
    { key: 'Dashboard', translateKey: 'dashboard' },
    { key: 'E-Commerce', translateKey: 'ecommerce' },
    { key: 'Travel', translateKey: 'travel' },
    { key: 'Management System', translateKey: 'management_system' }
  ];

  const projects = [
    {
      id: 'kala-creative',
      name: 'Kala Creative',
      url: 'https://kalacreative.my.id/',
      category: 'Company Profile',
      categoryKey: 'company_profile',
      thumbnail: '/assets/images/kala_creative.png',
      technologies: ['React', 'TypeScript', 'Tailwind', 'Framer Motion'],
      accent: '#22D3EE',
      icon: <Globe className="w-3.5 h-3.5" />,
    },
    {
      id: 'brains-idea-store',
      name: 'Brains Idea Store',
      url: 'https://brainsidea.store/',
      category: 'E-Commerce',
      categoryKey: 'ecommerce',
      thumbnail: '/assets/images/brains_idea_store.png',
      technologies: ['Next.js', 'React', 'Tailwind', 'Shopify'],
      accent: '#3B82F6',
      icon: <ShoppingBag className="w-3.5 h-3.5" />,
    },
    {
      id: 'tedomise',
      name: 'Tedomise',
      url: 'https://www.tedomise.com/',
      category: 'Company Profile',
      categoryKey: 'company_profile',
      thumbnail: '/assets/images/tedomise.png',
      technologies: ['WordPress', 'PHP', 'MySQL', 'CSS'],
      accent: '#10B981',
      icon: <Globe className="w-3.5 h-3.5" />,
    },
    {
      id: 'sistem-stok-kkp',
      name: 'Sistem Stok KKP',
      url: 'https://stok-kkp-project.vercel.app/login',
      category: 'Dashboard',
      categoryKey: 'dashboard',
      thumbnail: '/assets/images/sistem_stok_kkp.png',
      technologies: ['Next.js', 'React', 'Tailwind', 'Prisma', 'PostgreSQL'],
      accent: '#F59E0B',
      icon: <LayoutDashboard className="w-3.5 h-3.5" />,
      loginRequired: true,
    },
    {
      id: 'kalatrip',
      name: 'KalaTrip',
      url: 'https://kalatrip.vercel.app/',
      category: 'Travel',
      categoryKey: 'travel',
      thumbnail: '/assets/images/kalatrip.png',
      technologies: ['React', 'Vite', 'Tailwind', 'Leaflet.js'],
      accent: '#EF4444',
      icon: <Compass className="w-3.5 h-3.5" />,
    },
    {
      id: 'nike-dashboard',
      name: 'Nike Dashboard',
      url: 'https://dashboard-nike.vercel.app/',
      category: 'Dashboard',
      categoryKey: 'dashboard',
      thumbnail: '/assets/images/nike_dashboard.png',
      technologies: ['React', 'Tailwind', 'Recharts', 'Vite'],
      accent: '#EC4899',
      icon: <LayoutDashboard className="w-3.5 h-3.5" />,
    },
    {
      id: 'jurnal-sdm',
      name: 'Jurnal SDM',
      url: 'https://jurnalsdm.vercel.app/login',
      category: 'Management System',
      categoryKey: 'management_system',
      thumbnail: '/assets/images/jurnal_sdm.png',
      technologies: ['Next.js', 'Tailwind', 'Prisma', 'Supabase'],
      accent: '#8B5CF6',
      icon: <Database className="w-3.5 h-3.5" />,
      loginRequired: true,
    },
    {
      id: 'gudangin-stok',
      name: 'Gudangin Stok',
      url: 'https://gudangin-stok.vercel.app/',
      category: 'Management System',
      categoryKey: 'management_system',
      thumbnail: '/assets/images/gudangin_stok.png',
      technologies: ['Next.js', 'Tailwind', 'Supabase', 'PostgreSQL'],
      accent: '#14B8A6',
      icon: <Database className="w-3.5 h-3.5" />,
    },
  ];

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  return (
    <section
      id="portfolio"
      className="py-24 md:py-32 relative overflow-hidden bg-[#050505] border-t border-white/8"
    >
      <div className="absolute top-[30%] right-[10%] w-[350px] h-[350px] rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.02)_0%,transparent_70%)] filter blur-[85px] pointer-events-none -z-10" />
      <div className="absolute bottom-[30%] left-[10%] w-[350px] h-[350px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.01)_0%,transparent_70%)] filter blur-[85px] pointer-events-none -z-10" />

      <div className="container relative z-10">
        {/* Header */}
        <div className="text-center max-w-[640px] mx-auto mb-12 px-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-4"
          >
            <Badge variant="muted">{t('portfolio.badge')}</Badge>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white tracking-tight mb-4"
          >
            {t('portfolio.heading')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
            className="text-[#B5B5B5] text-sm sm:text-base leading-relaxed"
          >
            {t('portfolio.sub')}
          </motion.p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-16 px-6">
          {filters.map((filter) => {
            const isActive = activeFilter === filter.key;
            return (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={`relative px-4 py-2 text-[11px] font-semibold rounded-full cursor-pointer transition-all duration-300 border select-none ${
                  isActive
                    ? 'text-[#050505] border-[#22D3EE] bg-[#22D3EE]'
                    : 'text-[#B5B5B5] border-white/8 bg-white/2 hover:text-white hover:border-white/20'
                }`}
                style={{
                  boxShadow: isActive ? '0 0 16px rgba(34,211,238,0.3)' : 'none',
                }}
              >
                {t(`portfolio.filters.${filter.translateKey}`)}
              </button>
            );
          })}
        </div>

        {/* Project Cards Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full px-6 lg:px-0"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.a
                key={project.id}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                layout
                initial={{ opacity: 0, scale: 0.95, y: 24 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 24 }}
                whileHover={{ y: -8 }}
                transition={{
                  layout: { duration: 0.6, ease: EASE },
                  opacity: { duration: 0.4 },
                  scale: { duration: 0.4 },
                  y: { type: 'spring', stiffness: 300, damping: 22 },
                }}
                className="browser-mockup flex flex-col group block cursor-pointer"
                style={{
                  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.4)',
                }}
              >
                {/* Browser Top Bar */}
                <div className="browser-bar">
                  <div className="browser-dot red" />
                  <div className="browser-dot yellow" />
                  <div className="browser-dot green" />
                  <div className="ml-3 text-[10px] font-mono text-white/35 truncate max-w-[170px]">
                    {project.url.replace('https://', '').replace('www.', '')}
                  </div>
                </div>

                {/* Screenshot Frame */}
                <div className="browser-preview">
                  <img
                    src={project.thumbnail}
                    alt={project.name}
                    className="browser-screenshot group-hover:scale-[1.04]"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        const fallback = document.createElement('div');
                        fallback.className = 'absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#0B0B0B] border border-white/5';
                        fallback.innerHTML = `<div style="width:48px;height:48px;border-radius:12px;background:${project.accent}15;border:1px solid ${project.accent}25;display:flex;align-items:center;justify-content:center;"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="${project.accent}" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg></div><div style="font-size:10px;color:#6B7280;font-family:monospace">${project.name}</div>`;
                        parent.appendChild(fallback);
                      }
                    }}
                  />
                  {/* Glass Dark Overlay */}
                  <div className="browser-overlay" />
                  
                  {/* Center "🚀 Live Preview" text overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
                    <div className="px-5 py-2.5 rounded-full bg-white text-[#050505] font-extrabold text-xs flex items-center gap-2 transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300 shadow-[0_8px_32px_rgba(255,255,255,0.25)]">
                      <span>🚀 Live Preview</span>
                    </div>
                  </div>
                </div>

                {/* Info & Details Section */}
                <div className="p-6 flex flex-col flex-grow text-left bg-[#0B0B0B] border-t border-white/5">
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="flex items-center gap-2 text-[10px] font-mono font-bold tracking-wider uppercase"
                      style={{ color: project.accent, opacity: 0.85 }}
                    >
                      {project.icon}
                      <span>{t(`portfolio.filters.${project.categoryKey}`)}</span>
                    </div>
                    {project.loginRequired ? (
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-[9px] font-bold text-amber-400 flex items-center gap-1 shadow-[0_0_12px_rgba(245,158,11,0.05)]">
                        <span>🔒 {t('portfolio.login_required')}</span>
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-bold text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.05)]">
                        Active
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-heading font-extrabold text-white mb-2.5 group-hover:text-[#22D3EE] transition-colors duration-300">
                    {project.name}
                  </h3>
                  
                  <p className="text-[#B5B5B5] text-xs leading-relaxed mb-5 flex-grow font-sans">
                    {t(`portfolio.projects.${project.id.replace(/-/g, '_')}.desc`)}
                  </p>

                  {/* Tech badging */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded bg-white/3 border border-white/8 text-[9px] font-mono text-[#B5B5B5]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="w-full py-2.5 rounded-xl border border-white/10 group-hover:border-[#22D3EE]/30 group-hover:bg-[#22D3EE]/5 text-xs font-semibold text-white group-hover:text-[#22D3EE] flex items-center justify-center gap-2 transition-all duration-300">
                    <span>{t('portfolio.cta_live')}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-300" />
                  </div>
                </div>
              </motion.a>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
