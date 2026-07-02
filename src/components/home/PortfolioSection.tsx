import { useState, useRef, memo, useCallback, useMemo } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useInView } from 'framer-motion';
import { ArrowRight, Globe, ShoppingBag, LayoutDashboard, Compass, Database } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Badge from '../ui/Badge';

const EASE = [0.16, 1, 0.3, 1] as any;

interface ProjectCardProps {
  project: any;
  index: number;
  t: any;
  isInView: boolean;
}

// 3D Parallax Tilt Card Component — memoized to prevent re-renders from parent state changes
const ProjectCard = memo(function ProjectCard({ project, index, t, isInView }: ProjectCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // Motion values for tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Subtle 3D tilt (max 5 degrees for premium feel)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [5, -5]), { stiffness: 220, damping: 22 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-5, 5]), { stiffness: 220, damping: 22 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = (e.clientX - rect.left) / rect.width - 0.5;
    const mouseY = (e.clientY - rect.top) / rect.height - 0.5;
    
    x.set(mouseX);
    y.set(mouseY);
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <motion.a
      ref={cardRef}
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      // Floating animations
      animate={
        isHovered 
          ? { y: -10 } 
          : isInView 
            ? { y: [0, -6, 0] } 
            : { y: 0 }
      }
      transition={
        isHovered 
          ? { duration: 0.3, ease: EASE } 
          : {
              y: {
                repeat: Infinity,
                duration: 6,
                ease: "easeInOut",
                delay: index * 0.3,
              }
            }
      }
      className="relative flex flex-col w-full h-full rounded-[20px] bg-neutral-900/40 backdrop-blur-xl border border-white/8 p-3 transition-[background-color,border-color,opacity] duration-300 select-none group/card group-hover/portfolio:opacity-45 hover:!opacity-100"
    >
      {/* High-performance glowing shadow backdrop element (only animates opacity) */}
      <div 
        className="absolute inset-0 rounded-[20px] bg-cyan-500/10 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none -z-10 blur-xl shadow-[0_0_40px_-5px_rgba(34,211,238,0.25)]" 
      />
      
      {/* High-performance border glow element (only animates opacity) */}
      <div 
        className="absolute inset-0 rounded-[20px] border border-cyan-400/35 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none" 
      />

      {/* Realistic Browser Mockup Preview Container */}
      <div 
        className="relative aspect-[16/9] w-full overflow-hidden rounded-[16px] border border-white/5 bg-neutral-950 flex flex-col group/browser"
        style={{ transform: 'translateZ(12px)', willChange: 'transform' }}
      >
        {/* Browser Top Bar */}
        <div className="h-7 bg-[#111111]/90 border-b border-white/5 flex items-center px-3 gap-2 shrink-0 select-none rounded-t-[16px]">
          {/* Traffic light control dots */}
          <div className="flex gap-1.5 shrink-0">
            <span className="w-2 h-2 rounded-full bg-[#FF5F56] opacity-80" />
            <span className="w-2 h-2 rounded-full bg-[#FFBD2E] opacity-80" />
            <span className="w-2 h-2 rounded-full bg-[#27C93F] opacity-80" />
          </div>
          {/* Address Bar */}
          <div className="mx-auto bg-white/[0.03] border border-white/5 rounded-md h-4 px-4 flex items-center justify-center max-w-[155px] truncate">
            <span className="text-[8px] font-mono text-white/30 tracking-wide select-none">
              {project.url.replace('https://', '').replace('www.', '').split('/')[0]}
            </span>
          </div>
        </div>

        {/* Local Screenshot Area */}
        <div className="relative flex-1 overflow-hidden bg-neutral-900">
          <img
            src={project.thumbnail}
            alt={project.name}
            className="w-full h-full object-cover object-top transition-transform duration-[1200ms] ease-out group-hover/browser:scale-103"
            loading="lazy"
          />
          
          {/* Glass Reflection Overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.015] to-transparent pointer-events-none z-10" />

          {/* Semi-translucent Overlay */}
          <div className="absolute inset-0 bg-black/15 group-hover/browser:bg-black/35 transition-colors duration-300 pointer-events-none z-10" />
        </div>
        
        {/* Category Badge overlay on top-left of preview, placed under the browser bar */}
        <div className="absolute top-9 left-3 z-20 px-2.5 py-0.5 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-[8px] font-heading font-extrabold tracking-wider text-cyan-400 shadow-[0_2px_10px_rgba(0,0,0,0.5)] flex items-center gap-1 uppercase select-none">
          {project.icon}
          <span>{t(`portfolio.projects.${project.id.replace(/-/g, '_')}.category`)}</span>
        </div>

        {/* Status Overlay top-right, under the browser bar */}
        {project.loginRequired ? (
          <span className="absolute top-9 right-3 z-20 px-2 py-0.5 bg-amber-500/10 backdrop-blur-md border border-amber-500/20 rounded-full text-[8px] font-bold text-amber-400 flex items-center gap-1 shadow-[0_2px_10px_rgba(0,0,0,0.5)] select-none">
            <span>🔒 {t('portfolio.login_required')}</span>
          </span>
        ) : (
          <span className="absolute top-9 right-3 z-20 px-2 py-0.5 bg-emerald-500/10 backdrop-blur-md border border-emerald-500/20 rounded-full text-[8px] font-bold text-emerald-400 shadow-[0_2px_10px_rgba(0,0,0,0.5)] select-none">
            Active
          </span>
        )}
      </div>

      {/* Details Section */}
      <div 
        className="px-3 pt-5 pb-2 flex flex-col flex-grow text-left"
        style={{ transform: 'translateZ(18px)' }}
      >
        <h3 className="text-lg font-heading font-extrabold text-white mb-2 group-hover:text-[#22D3EE] transition-colors duration-300">
          {project.name}
        </h3>
        
        <p className="text-text-secondary text-xs leading-relaxed mb-5 flex-grow line-clamp-2">
          {t(`portfolio.projects.${project.id.replace(/-/g, '_')}.desc`)}
        </p>

        {/* Tech stack badges */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.technologies.map((tech: string) => (
            <span
              key={tech}
              className="px-2 py-0.5 rounded bg-white/3 border border-white/6 text-[9px] font-mono text-text-secondary"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Live Demo button */}
        <div className="w-full py-2.5 rounded-xl border border-white/10 group-hover:border-[#22D3EE]/30 bg-white/2 group-hover:bg-[#22D3EE]/5 text-xs font-semibold text-white group-hover:text-[#22D3EE] flex items-center justify-center gap-2 transition-all duration-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
          <span>{isHovered ? t('portfolio.cta_try') : t('portfolio.cta_live')}</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
        </div>
      </div>
    </motion.a>
  );
});

export default function PortfolioSection() {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState('all');
  
  // Ref to monitor viewport visibility and pause off-screen animations
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { margin: '-50px' });

  const filters = [
    { key: 'all', translateKey: 'all' },
    { key: 'company_profile', translateKey: 'company_profile' },
    { key: 'dashboard', translateKey: 'dashboard' },
    { key: 'ecommerce', translateKey: 'ecommerce' },
    { key: 'travel', translateKey: 'travel' },
    { key: 'management_system', translateKey: 'management_system' }
  ];

  const projects = [
    {
      id: 'weather-dashboard',
      name: 'Weather Dashboard',
      url: 'https://weather-dashboard-pi-two.vercel.app',
      category: 'Dashboard',
      categoryKey: 'dashboard',
      thumbnail: '/projects/weather-dashboard.png',
      technologies: ['React', 'Vite', 'Tailwind CSS', 'OpenWeather API'],
      accent: '#38BDF8',
      icon: <LayoutDashboard className="w-3 h-3 text-sky-400" />,
    },
    {
      id: 'kala-creative',
      name: 'Kala Creative',
      url: 'https://kalacreative.my.id/',
      category: 'Company Profile',
      categoryKey: 'company_profile',
      thumbnail: '/projects/kala-creative.png',
      technologies: ['React', 'TypeScript', 'Tailwind', 'Framer Motion'],
      accent: '#22D3EE',
      icon: <Globe className="w-3 h-3 text-cyan-400" />,
    },
    {
      id: 'brains-idea-store',
      name: 'Brains Idea Store',
      url: 'https://brainsidea.store/',
      category: 'E-Commerce',
      categoryKey: 'ecommerce',
      thumbnail: '/projects/brainsidea.png',
      technologies: ['Next.js', 'React', 'Tailwind', 'Shopify'],
      accent: '#3B82F6',
      icon: <ShoppingBag className="w-3 h-3 text-blue-400" />,
    },
    {
      id: 'tedomise',
      name: 'TEDOMISE',
      url: 'https://www.tedomise.com/',
      category: 'Company Profile',
      categoryKey: 'company_profile',
      thumbnail: '/projects/tedomise.png',
      technologies: ['WordPress', 'PHP', 'MySQL', 'CSS'],
      accent: '#10B981',
      icon: <Globe className="w-3 h-3 text-emerald-400" />,
    },
    {
      id: 'gudangin-stok',
      name: 'Inventory System',
      url: 'https://gudangin-stok.vercel.app/',
      category: 'Management System',
      categoryKey: 'management_system',
      thumbnail: '/projects/inventory.png',
      technologies: ['Next.js', 'Tailwind', 'Supabase', 'PostgreSQL'],
      accent: '#14B8A6',
      icon: <Database className="w-3 h-3 text-teal-400" />,
    },
    {
      id: 'nike-dashboard',
      name: 'Nike Dashboard',
      url: 'https://dashboard-nike.vercel.app/',
      category: 'Dashboard',
      categoryKey: 'dashboard',
      thumbnail: '/projects/nike-dashboard.png',
      technologies: ['React', 'Tailwind', 'Recharts', 'Vite'],
      accent: '#EC4899',
      icon: <LayoutDashboard className="w-3 h-3 text-pink-400" />,
    },
    {
      id: 'kalatrip',
      name: 'Kala Trip',
      url: 'https://kalatrip.vercel.app/',
      category: 'Travel',
      categoryKey: 'travel',
      thumbnail: '/projects/kalatrip.png',
      technologies: ['React', 'Vite', 'Tailwind', 'Leaflet.js'],
      accent: '#EF4444',
      icon: <Compass className="w-3 h-3 text-rose-400" />,
    },
    {
      id: 'jurnal-sdm',
      name: 'Jurnal SDM',
      url: 'https://jurnalsdm.vercel.app/login',
      category: 'Management System',
      categoryKey: 'management_system',
      thumbnail: '/projects/jurnalsdm.png',
      technologies: ['Next.js', 'Tailwind', 'Prisma', 'Supabase'],
      accent: '#8B5CF6',
      icon: <Database className="w-3 h-3 text-purple-400" />,
      loginRequired: true,
    },
  ];

  const filteredProjects = useMemo(() =>
    activeFilter === 'all' ? projects : projects.filter(p => p.categoryKey === activeFilter)
  , [activeFilter, projects]);



  // Stable callback for filter click
  const handleFilterClick = useCallback((key: string) => {
    setActiveFilter(key);
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.94, y: 15 },
    visible: (index: number) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.45,
        delay: (index % 6) * 0.05,
        ease: EASE,
      },
    }),
    exit: {
      opacity: 0,
      scale: 0.94,
      y: 15,
      transition: {
        duration: 0.3,
        ease: EASE,
      },
    },
  };

  // Stagger column layout on desktop/tablet to make it asymmetric
  const getStaggerClass = (index: number) => {
    // 3 columns on large screens
    const lgOffset = index % 3 === 0 ? 'lg:mt-0' : index % 3 === 1 ? 'lg:mt-12' : 'lg:mt-24';
    // 2 columns on medium screens
    const mdOffset = index % 2 === 0 ? 'md:mt-0' : 'md:mt-12';
    return `${lgOffset} ${mdOffset}`;
  };

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="py-28 md:py-36 relative overflow-hidden bg-[#050505] border-t border-white/8 pb-20 lg:pb-48"
    >
      {/* Animated scan-line top & bottom dividers (animations pause when section is offscreen) */}
      <style>{`
        @keyframes scan-line {
          0% { left: -30%; }
          100% { left: 130%; }
        }
        .animate-scan {
          position: absolute;
          top: 0;
          height: 100%;
          width: 30%;
          animation: scan-line 8s linear infinite;
        }
      `}</style>
      
      {/* Top Divider */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-white/5 overflow-hidden">
        <div className={`bg-gradient-to-r from-transparent via-[#22D3EE]/50 to-transparent ${isInView ? 'animate-scan' : 'absolute left-[-30%]'}`} />
      </div>

      {/* Bottom Divider */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/5 overflow-hidden">
        <div className={`bg-gradient-to-r from-transparent via-[#3B82F6]/50 to-transparent ${isInView ? 'animate-scan' : 'absolute left-[-30%]'}`} style={{ animationDelay: '2s' }} />
      </div>

      {/* Ambient glows — static, no continuous animation */}
      <div className="absolute top-[15%] left-[-10%] w-[400px] h-[400px] rounded-full pointer-events-none -z-10 opacity-70" style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.04) 0%, rgba(34,211,238,0.01) 40%, transparent 70%)' }} />
      <div className="absolute bottom-[20%] right-[-10%] w-[400px] h-[400px] rounded-full pointer-events-none -z-10 opacity-50" style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.03) 0%, transparent 70%)' }} />

      {/* Animated glowing particles (viewport gated) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className={`absolute top-[15%] left-[20%] w-2 h-2 rounded-full bg-cyan-400/30 ${isInView ? 'animate-float' : ''}`} style={{ animationDuration: '7s', animationDelay: '0s' }} />
        <div className={`absolute top-[45%] right-[12%] w-3 h-3 rounded-full bg-blue-400/20 ${isInView ? 'animate-float' : ''}`} style={{ animationDuration: '10s', animationDelay: '2.5s' }} />
        <div className={`absolute bottom-[35%] left-[8%] w-1.5 h-1.5 rounded-full bg-[#22D3EE]/35 ${isInView ? 'animate-float' : ''}`} style={{ animationDuration: '6s', animationDelay: '1.2s' }} />
        <div className={`absolute bottom-[15%] right-[22%] w-3 h-3 rounded-full bg-purple-500/15 ${isInView ? 'animate-float' : ''}`} style={{ animationDuration: '13s', animationDelay: '3.8s' }} />
      </div>

      <div className="container relative z-10">
        {/* Header */}
        <div className="text-center max-w-[640px] mx-auto mb-16 px-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-5"
          >
            <Badge variant="cyan">{t('portfolio.badge')}</Badge>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-white tracking-tight mb-5 text-gradient-white"
          >
            {t('portfolio.heading')}
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
            className="text-text-secondary text-sm sm:text-base leading-relaxed max-w-[540px] mx-auto"
          >
            {t('portfolio.sub')}
          </motion.p>
        </div>

        {/* Premium segmented filter controls */}
        <div className="portfolio-filter flex justify-center gap-1 md:gap-2 mb-16 px-3 py-2 bg-neutral-950/45 backdrop-blur-xl border border-white/5 rounded-full max-w-fit mx-auto shadow-[0_8px_32px_rgba(0,0,0,0.5)] relative z-20">
          {filters.map((filter) => {
            const isActive = activeFilter === filter.key;
            return (
              <button
                key={filter.key}
                onClick={() => handleFilterClick(filter.key)}
                className={`relative px-4 py-2 text-[11px] md:text-xs font-bold rounded-full cursor-pointer select-none transition-all duration-300 ${
                  isActive ? 'text-[#050505] font-extrabold' : 'text-[#B5B5B5] hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeFilterBg"
                    className="absolute inset-0 bg-[#22D3EE] rounded-full shadow-[0_0_20px_rgba(34,211,238,0.4)]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    style={{ zIndex: -1 }}
                  />
                )}
                <span className="relative z-10">
                  {t(`portfolio.filters.${filter.translateKey}`)}
                </span>
              </button>
            );
          })}
        </div>

        {/* Project Cards Grid with group/portfolio */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 lg:gap-x-10 lg:gap-y-16 w-full px-6 lg:px-0 group/portfolio">
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                custom={index}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className={getStaggerClass(index)}
              >
                <ProjectCard
                  project={project}
                  index={index}
                  t={t}
                  isInView={isInView}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
