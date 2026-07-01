import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Badge from '../ui/Badge';
import { Cpu, Sparkles, Layers } from 'lucide-react';

const EASE = [0.16, 1, 0.3, 1] as any;

function CountUp({ end, duration = 1.5 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [isInView, end, duration]);

  return <span ref={ref}>{count}</span>;
}

interface IdentityPanelProps {
  title: string;
  desc: string;
  icon: React.ReactNode;
  accentColor: string;
  glowColor: string;
  visualOverlay: React.ReactNode;
  index: number;
  isInView: boolean;
}

function IdentityPanel({ title, desc, icon, accentColor, glowColor, visualOverlay, index, isInView }: IdentityPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Parallax spring-tilt coordinates (subtle ±4deg limit)
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [4, -4]), { stiffness: 220, damping: 22 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-4, 4]), { stiffness: 220, damping: 22 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!panelRef.current) return;
    const rect = panelRef.current.getBoundingClientRect();
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
    <motion.div
      ref={panelRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        willChange: 'transform, opacity',
      }}
      // Idle float (pauses on hover or out of viewport)
      animate={
        isHovered 
          ? { y: -8 } 
          : isInView 
            ? { y: [0, -4, 0] } 
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
                delay: index * 0.5,
              }
            }
      }
      className="relative flex-1 w-full rounded-[24px] bg-neutral-900/40 backdrop-blur-xl border border-white/8 p-8 transition-colors duration-500 overflow-hidden flex flex-col justify-between min-h-[360px] group text-left"
    >
      {/* High-performance glowing shadow backdrop element */}
      <div 
        className="absolute inset-0 rounded-[24px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10 blur-2xl"
        style={{ 
          backgroundColor: glowColor,
          boxShadow: `0 0 45px -5px ${glowColor}`,
          willChange: 'opacity'
        }}
      />
      
      {/* High-performance border glow element */}
      <div 
        className="absolute inset-0 rounded-[24px] border opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ 
          borderColor: accentColor,
          willChange: 'opacity'
        }}
      />

      {/* Embedded Visual Showcase backdrop */}
      <div className="absolute inset-0 overflow-hidden opacity-30 group-hover:opacity-50 transition-opacity duration-500 pointer-events-none select-none -z-10">
        {visualOverlay}
      </div>

      {/* Content */}
      <div className="relative z-10" style={{ transform: 'translateZ(15px)', willChange: 'transform' }}>
        <div 
          className="w-10 h-10 rounded-xl bg-white/3 border border-white/5 flex items-center justify-center shrink-0 mb-6 transition-all duration-300"
          style={{
            borderColor: isHovered ? accentColor : 'rgba(255,255,255,0.05)',
            boxShadow: isHovered ? `0 0 12px ${accentColor}` : 'none',
          }}
        >
          <div style={{ color: isHovered ? '#FFFFFF' : accentColor }}>
            {icon}
          </div>
        </div>

        <h3 className="text-xl font-heading font-extrabold text-white mb-4 group-hover:text-white transition-colors duration-300">
          {title}
        </h3>
        
        <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-sans max-w-[280px]">
          {desc}
        </p>
      </div>
    </motion.div>
  );
}

export default function AboutSection() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { margin: '-50px' });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: EASE,
      },
    },
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-28 md:py-36 relative overflow-hidden bg-[#050505] border-t border-white/8"
    >
      {/* Dynamic ambient highlights */}
      <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.025)_0%,transparent_70%)] filter blur-[110px] pointer-events-none -z-10 animate-pulse-glow" />
      <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(236,72,153,0.015)_0%,transparent_70%)] filter blur-[110px] pointer-events-none -z-10" />

      {/* Floating background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className={`absolute top-[25%] left-[20%] w-2 h-2 rounded-full bg-cyan-400/20 filter blur-xs ${isInView ? 'animate-float' : ''}`} style={{ animationDuration: '8s', animationDelay: '0s' }} />
        <div className={`absolute bottom-[25%] right-[20%] w-3 h-3 rounded-full bg-pink-500/10 filter blur-[1px] ${isInView ? 'animate-float' : ''}`} style={{ animationDuration: '12s', animationDelay: '2s' }} />
      </div>

      <div className="container relative z-10 max-w-[1140px] mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-[640px] mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-4 inline-block"
          >
            <Badge variant="cyan">{t('about.badge')}</Badge>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            className="text-4xl sm:text-5xl font-heading font-extrabold text-white leading-tight text-gradient-white"
          >
            {t('about.heading1')}{' '}
            <span className="text-[#22D3EE]">
              {t('about.heading2')}
            </span>
          </motion.h2>

          {/* Underline animating from left to right */}
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.25, ease: EASE }}
            className="w-24 h-[2px] bg-gradient-to-r from-cyan-400 to-purple-500 mt-6 mx-auto rounded-full origin-left"
          />
        </div>

        {/* Dual Panel Identity Split Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="flex flex-col lg:flex-row gap-6 w-full mb-6"
        >
          
          {/* Left Panel: Left Brain (Logic) */}
          <motion.div variants={itemVariants} className="flex-1 w-full flex">
            <IdentityPanel
              title={t('about.left_brain_title')}
              desc={t('about.left_brain_text')}
              icon={<Cpu className="w-5 h-5" />}
              accentColor="#22D3EE"
              glowColor="rgba(34, 211, 238, 0.05)"
              index={0}
              isInView={isInView}
              visualOverlay={
                <div className="absolute inset-5 border-l-2 border-b-2 border-cyan-500/10 flex flex-col gap-2 font-mono text-[8px] text-cyan-400/25 p-4 select-none">
                  <div>&gt; SYSTEM LOAD: OPTIMAL</div>
                  <div>&gt; RESPONSE TIME: 45MS</div>
                  <div>&gt; ENCRYPTION SHIELD: SECURE</div>
                  <div className="w-full h-10 bg-cyan-500/5 border border-cyan-500/10 rounded flex items-center justify-center font-heading text-[10px] text-cyan-400/35">
                    100% SECURE PROTOCOL
                  </div>
                </div>
              }
            />
          </motion.div>

          {/* Right Panel: Ideas Core (Creativity) */}
          <motion.div variants={itemVariants} className="flex-1 w-full flex">
            <IdentityPanel
              title={t('about.ideas_title')}
              desc={t('about.ideas_text')}
              icon={<Sparkles className="w-5 h-5" />}
              accentColor="#EC4899"
              glowColor="rgba(236, 72, 153, 0.05)"
              index={1}
              isInView={isInView}
              visualOverlay={
                <div className="absolute inset-0 flex items-center justify-center p-6 select-none opacity-40">
                  {/* Visual Glassmorphic Pulsing Blobs */}
                  <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-pink-500/10 via-purple-500/10 to-blue-500/10 blur-xl animate-pulse" style={{ animationDuration: '4s' }} />
                  <div className="absolute w-24 h-24 rounded-full border border-pink-500/10 backdrop-blur-sm" />
                  <div className="absolute w-16 h-16 rounded-full border border-purple-500/15" />
                </div>
              }
            />
          </motion.div>

        </motion.div>

        {/* Statistics Row with CountUp */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full mb-6 text-left"
        >
          <div className="rounded-[24px] bg-neutral-900/30 backdrop-blur-xl border border-white/8 p-6 flex flex-col items-center justify-center text-center group/stat relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-transparent opacity-0 group-hover/stat:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <span className="text-4xl font-heading font-extrabold text-[#22D3EE] mb-2 flex items-center justify-center">
              <CountUp end={15} />+
            </span>
            <span className="text-[10px] font-mono text-text-secondary uppercase tracking-widest font-bold">
              {t('about.stats.projects_label')}
            </span>
          </div>

          <div className="rounded-[24px] bg-neutral-900/30 backdrop-blur-xl border border-white/8 p-6 flex flex-col items-center justify-center text-center group/stat relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-transparent opacity-0 group-hover/stat:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <span className="text-4xl font-heading font-extrabold text-[#EC4899] mb-2 flex items-center justify-center">
              <CountUp end={99} />%
            </span>
            <span className="text-[10px] font-mono text-text-secondary uppercase tracking-widest font-bold">
              {t('about.stats.speed_label')}
            </span>
          </div>

          <div className="rounded-[24px] bg-neutral-900/30 backdrop-blur-xl border border-white/8 p-6 flex flex-col items-center justify-center text-center group/stat relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-transparent opacity-0 group-hover/stat:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <span className="text-4xl font-heading font-extrabold text-purple-400 mb-2 flex items-center justify-center">
              <CountUp end={100} />%
            </span>
            <span className="text-[10px] font-mono text-text-secondary uppercase tracking-widest font-bold">
              {t('about.stats.satisfaction_label')}
            </span>
          </div>
        </motion.div>

        {/* Full-width Synergy merger Card at the bottom */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
          whileHover={{ 
            y: -5,
            borderColor: 'rgba(167, 139, 250, 0.25)',
            boxShadow: '0 15px 40px rgba(167, 139, 250, 0.04), inset 0 0 12px rgba(255, 255, 255, 0.02)'
          }}
          className="group relative rounded-[24px] bg-neutral-950/45 border border-white/8 p-8 flex flex-col md:flex-row gap-6 items-start md:items-center text-left transition-all duration-300"
          style={{ willChange: 'transform' }}
        >
          {/* Accent glow top line */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#A78BFA] to-transparent opacity-0 group-hover:opacity-40 transition-opacity duration-500" />

          {/* Icon Box */}
          <div className="w-11 h-11 rounded-xl bg-purple-500/5 border border-purple-500/10 flex items-center justify-center shrink-0 group-hover:bg-purple-500/15 group-hover:border-purple-500/30 transition-all duration-300 text-purple-400">
            <Layers className="w-5 h-5" />
          </div>

          {/* Text content */}
          <div className="flex-1">
            <h3 className="text-lg font-heading font-extrabold text-white mb-2 transition-colors duration-300">
              {t('about.synergy_title')}
            </h3>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-sans max-w-[800px]">
              {t('about.synergy_text')}
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
