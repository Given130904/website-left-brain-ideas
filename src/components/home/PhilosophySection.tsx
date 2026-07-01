import { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useInView } from 'framer-motion';
import { Cpu, Sparkles, HeartHandshake } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Badge from '../ui/Badge';

const EASE = [0.16, 1, 0.3, 1] as any;

interface PhilosophyCardProps {
  card: any;
  index: number;
  t: any;
  isInView: boolean;
}

// 3D Parallax Tilt Card Component
function PhilosophyCard({ card, index, t, isInView }: PhilosophyCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse coords mapped to spring-damped 3D tilt angles (subtle max 6 degrees)
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 220, damping: 22 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 220, damping: 22 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
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

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.98 },
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
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        willChange: 'transform, opacity',
      }}
      // Idle float animation (pauses when hovered or out of viewport)
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
      className="relative flex-1 w-full max-w-[340px] rounded-[24px] bg-neutral-900/40 backdrop-blur-xl border border-white/8 p-8 transition-colors duration-300 select-none group"
    >
      {/* High-performance glowing shadow backdrop element (only animates opacity) */}
      <div 
        className="absolute inset-0 rounded-[24px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10 blur-2xl"
        style={{ 
          backgroundColor: card.glowColor,
          boxShadow: `0 0 45px -5px ${card.glowColor}`,
          willChange: 'opacity'
        }}
      />
      
      {/* High-performance border glow element (only animates opacity) */}
      <div 
        className="absolute inset-0 rounded-[24px] border opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ 
          borderColor: card.glowBorderColor,
          willChange: 'opacity'
        }}
      />

      {/* Floating background huge index number */}
      <div 
        className="absolute top-6 right-8 text-7xl font-heading font-black text-white/[0.02] select-none transition-colors duration-500 group-hover:text-cyan-400/5"
        style={{ transform: 'translateZ(10px)', willChange: 'transform' }}
      >
        {card.number}
      </div>

      {/* Icon box with animated inner icon */}
      <div 
        className="w-12 h-12 rounded-xl bg-white/3 border border-white/5 flex items-center justify-center shrink-0 mb-8 group-hover:bg-white/5 group-hover:border-white/10 transition-all duration-300"
        style={{ transform: 'translateZ(15px)', willChange: 'transform' }}
      >
        <motion.div
          animate={isHovered ? card.hoverAnimation : card.idleAnimation}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        >
          {card.icon}
        </motion.div>
      </div>

      {/* Content details */}
      <div style={{ transform: 'translateZ(20px)', willChange: 'transform' }}>
        <h3 className="text-lg font-heading font-extrabold text-white mb-3 group-hover:text-[#22D3EE] transition-colors duration-300">
          {t(`philosophy.cards.${card.key}.title`)}
        </h3>
        <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-sans">
          {t(`philosophy.cards.${card.key}.desc`)}
        </p>
      </div>
    </motion.div>
  );
}

export default function PhilosophySection() {
  const { t } = useTranslation();
  
  // Section reference to pause off-screen animations
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { margin: '-50px' });

  const cardsData = [
    {
      key: 'structured',
      number: '01',
      icon: <Cpu className="w-5 h-5 text-cyan-400" />,
      glowColor: 'rgba(34, 211, 238, 0.05)',
      glowBorderColor: 'rgba(34, 211, 238, 0.25)',
      idleAnimation: { scale: [1, 1.08, 1] },
      hoverAnimation: { rotate: 360, scale: 1.15 }
    },
    {
      key: 'intuitive',
      number: '02',
      icon: <Sparkles className="w-5 h-5 text-pink-400" />,
      glowColor: 'rgba(236, 72, 153, 0.05)',
      glowBorderColor: 'rgba(236, 72, 153, 0.25)',
      idleAnimation: { y: [0, -3, 0] },
      hoverAnimation: { scale: [1, 1.2, 1], rotate: [0, 15, -15, 0] }
    },
    {
      key: 'support',
      number: '03',
      icon: <HeartHandshake className="w-5 h-5 text-emerald-400" />,
      glowColor: 'rgba(16, 185, 129, 0.05)',
      glowBorderColor: 'rgba(16, 185, 129, 0.25)',
      idleAnimation: { scale: [1, 1.05, 1, 1.05, 1] },
      hoverAnimation: { rotate: [-8, 8, -8] }
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  return (
    <section
      id="philosophy"
      ref={sectionRef}
      className="py-28 md:py-36 relative overflow-hidden bg-[#050505] border-t border-white/8"
    >
      {/* Animated scan-line connectors styling */}
      <style>{`
        @keyframes scan-line-h {
          0% { left: -100%; }
          100% { left: 200%; }
        }
        @keyframes scan-line-v {
          0% { top: -100%; }
          100% { top: 200%; }
        }
        .animate-scan-h {
          position: absolute;
          top: 0;
          height: 100%;
          width: 50%;
          animation: scan-line-h 4s linear infinite;
        }
        .animate-scan-v {
          position: absolute;
          left: 0;
          width: 100%;
          height: 50%;
          animation: scan-line-v 4s linear infinite;
        }
      `}</style>

      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.02)_0%,transparent_70%)] filter blur-[120px] pointer-events-none -z-10 animate-pulse-glow" />
      <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.01)_0%,transparent_70%)] filter blur-[100px] pointer-events-none -z-10" />

      {/* Floating particles background (pauses when section is offscreen) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className={`absolute top-[20%] left-[25%] w-2 h-2 rounded-full bg-cyan-400/30 filter blur-xs ${isInView ? 'animate-float' : ''}`} style={{ animationDuration: '8s', animationDelay: '0s' }} />
        <div className={`absolute top-[50%] right-[20%] w-3 h-3 rounded-full bg-blue-400/25 filter blur-[1px] ${isInView ? 'animate-float' : ''}`} style={{ animationDuration: '11s', animationDelay: '2s' }} />
        <div className={`absolute bottom-[25%] left-[15%] w-1.5 h-1.5 rounded-full bg-[#22D3EE]/40 filter blur-none ${isInView ? 'animate-float' : ''}`} style={{ animationDuration: '7s', animationDelay: '1s' }} />
        <div className={`absolute bottom-[15%] right-[30%] w-4 h-4 rounded-full bg-purple-500/15 filter blur-[2px] ${isInView ? 'animate-float' : ''}`} style={{ animationDuration: '14s', animationDelay: '3.5s' }} />
      </div>

      <div className="container relative z-10 max-w-[1140px] mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-[640px] mx-auto mb-20 px-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-4 inline-block"
          >
            <Badge variant="cyan">{t('philosophy.badge')}</Badge>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            className="text-4xl sm:text-5xl font-heading font-extrabold text-white leading-tight text-gradient-white"
          >
            {t('philosophy.heading1')}{' '}
            <span className="text-[#22D3EE]">
              {t('philosophy.heading2')}
            </span>
          </motion.h2>
        </div>

        {/* Timeline Cards Flow */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-0 w-full"
        >
          {cardsData.map((card, index) => (
            <div key={card.key} className="flex flex-col lg:flex-row items-center w-full lg:w-auto flex-1 justify-center">
              
              {/* Philosophy Card */}
              <PhilosophyCard card={card} index={index} t={t} isInView={isInView} />
              
              {/* Connector line between cards */}
              {index < cardsData.length - 1 && (
                <div className="flex items-center justify-center shrink-0 w-full lg:w-auto py-4 lg:py-0">
                  {/* Horizontal Connector for desktop */}
                  <div className="hidden lg:block w-12 xl:w-20 h-[1px] bg-white/10 relative overflow-hidden">
                    <div 
                      className={`bg-gradient-to-r from-transparent via-[#22D3EE] to-transparent ${isInView ? 'animate-scan-h' : 'absolute left-[-100%]'}`} 
                      style={{ willChange: 'left' }}
                    />
                  </div>
                  {/* Vertical Connector for mobile */}
                  <div className="lg:hidden w-[1px] h-10 bg-white/10 relative overflow-hidden">
                    <div 
                      className={`bg-gradient-to-b from-transparent via-[#22D3EE] to-transparent ${isInView ? 'animate-scan-v' : 'absolute top-[-100%]'}`} 
                      style={{ willChange: 'top' }}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
