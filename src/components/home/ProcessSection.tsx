import { useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform, useInView, useMotionValue } from 'framer-motion';
import { MessageSquare, Palette, Code2, ShieldCheck, Rocket } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Badge from '../ui/Badge';

const EASE = [0.16, 1, 0.3, 1] as any;

interface ProcessStepProps {
  step: any;
  idx: number;
  t: any;
  isLeft: boolean;
  isInView: boolean;
}

// 3D Parallax Tilt Card Component for each Step
function ProcessStep({ step, idx, t, isLeft, isInView: sectionInView }: ProcessStepProps) {
  const stepRef = useRef<HTMLDivElement>(null);
  
  // Track relative viewport center alignment to activate card glows
  const isActive = useInView(stepRef, { once: false, margin: "-180px 0px" });

  const cardRef = useRef<HTMLDivElement>(null);

  // Parallax spring-tilt coordinates (subtle ±5deg limit)
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [5, -5]), { stiffness: 220, damping: 22 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-5, 5]), { stiffness: 220, damping: 22 });

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
  };

  const itemVariants = {
    hidden: { opacity: 0, x: isLeft ? -30 : 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: EASE,
      },
    },
  };

  return (
    <div 
      ref={stepRef} 
      className={`relative flex flex-col w-full md:flex-row ${
        isLeft ? 'md:justify-start' : 'md:justify-end'
      }`}
    >
      {/* Glowing Connection Dot on Central Line */}
      <div className="absolute left-[20px] md:left-1/2 -translate-x-1/2 top-6 z-20">
        {/* Soft pulse reflection halo ring */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0.5 }}
              animate={{ scale: 1.4, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeOut" }}
              className="absolute inset-0 rounded-full bg-cyan-400/30 -z-10"
            />
          )}
        </AnimatePresence>
        <motion.div
          animate={{
            scale: isActive ? 1.15 : 1,
            borderColor: isActive ? '#22D3EE' : 'rgba(255, 255, 255, 0.1)',
            color: isActive ? '#050505' : '#B5B5B5',
            backgroundColor: isActive ? '#22D3EE' : '#050505',
          }}
          transition={{ duration: 0.3, ease: EASE }}
          className="w-10 h-10 rounded-full border-2 flex items-center justify-center font-heading font-extrabold text-sm shadow-[0_0_15px_rgba(0,0,0,0.8)] pointer-events-none select-none"
          style={{
            boxShadow: isActive ? '0 0 20px rgba(34, 211, 238, 0.4)' : 'none',
          }}
        >
          {idx + 1}
        </motion.div>
      </div>

      {/* Card Container (ScrollReveal entrance) */}
      <motion.div
        variants={itemVariants}
        className={`w-full md:w-[45%] pl-14 md:pl-0 ${
          isLeft ? 'md:pr-10' : 'md:pl-10'
        }`}
      >
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX,
            rotateY,
            transformStyle: 'preserve-3d',
          }}
          // Staggered Y float loops (pause on hover or offscreen)
          animate={
            sectionInView && !isActive
              ? { y: [0, -4, 0] } 
              : { y: 0 }
          }
          whileHover="hover"
          transition={
            sectionInView && !isActive
              ? {
                  y: {
                    repeat: Infinity,
                    duration: 5,
                    ease: "easeInOut",
                    delay: idx * 0.4,
                  }
                }
              : { duration: 0.3, ease: EASE }
          }
          className="relative flex flex-col w-full h-full rounded-[20px] bg-neutral-900/40 backdrop-blur-xl border border-white/8 p-6 transition-all duration-500 overflow-hidden select-none group text-left"
        >
          {/* Subtle top border highlight (glows cyan when hovered/active) */}
          <div 
            className={`absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#22D3EE] to-transparent transition-opacity duration-500 ${
              isActive ? 'opacity-35' : 'opacity-0 group-hover:opacity-35'
            }`}
          />

          {/* High-performance glowing shadow backdrop element (only animates opacity) */}
          <div 
            className={`absolute inset-0 rounded-[20px] bg-cyan-500/5 transition-opacity duration-300 pointer-events-none -z-10 blur-xl shadow-[0_0_30px_-5px_rgba(34,211,238,0.25)] ${
              isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
            }`}
          />
          
          {/* High-performance border glow element (only animates opacity) */}
          <div 
            className={`absolute inset-0 rounded-[20px] border border-cyan-400/25 transition-opacity duration-300 pointer-events-none ${
              isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
            }`}
          />

          {/* Animated floating particles inside active cards */}
          {isActive && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[20px] -z-10">
              <div className="absolute top-[12%] left-[8%] w-1 h-1 rounded-full bg-cyan-400/50 animate-ping" style={{ animationDuration: '2s' }} />
              <div className="absolute bottom-[16%] right-[10%] w-1.5 h-1.5 rounded-full bg-cyan-300/40 animate-pulse" />
            </div>
          )}

          {/* Title + Icon */}
          <div className="flex items-center justify-between mb-4" style={{ transform: 'translateZ(15px)' }}>
            <div className="flex items-center gap-3">
              <div 
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-500 ${
                  isActive 
                    ? 'bg-[#22D3EE]/10 border-[#22D3EE]/30 shadow-[0_0_15px_rgba(34,211,238,0.2)]' 
                    : 'bg-white/3 border-white/5 shadow-none group-hover:bg-[#22D3EE]/10 group-hover:border-[#22D3EE]/30 group-hover:shadow-[0_0_15px_rgba(34, 211, 238, 0.2)]'
                }`}
              >
                <motion.div
                  variants={{
                    hover: step.activeAnimation
                  }}
                  animate={isActive ? step.activeAnimation : step.idleAnimation}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  className="text-cyan-400"
                >
                  {step.icon}
                </motion.div>
              </div>
              <h3 className={`text-base font-heading font-extrabold transition-colors duration-300 ${
                isActive ? 'text-[#22D3EE]' : 'text-white group-hover:text-[#22D3EE]'
              }`}>
                {t(`process.steps.${step.key}.title`)}
              </h3>
            </div>
            
            {/* Step Duration Badge */}
            <span className="text-[9px] font-mono font-bold text-cyan-400/80 bg-cyan-400/5 border border-cyan-400/10 px-2.5 py-0.5 rounded-full select-none shrink-0">
              ⏳ {t(`process.steps.${step.key}.duration`)}
            </span>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-sans mb-4" style={{ transform: 'translateZ(10px)' }}>
            {t(`process.steps.${step.key}.desc`)}
          </p>

          {/* Code Snippet Box (highlights active) */}
          <div 
            className={`rounded-xl overflow-hidden bg-black/40 border p-4 font-mono text-[11px] leading-relaxed text-left text-gray-400 transition-colors duration-500 ${
              isActive ? 'border-[#22D3EE]/15' : 'border-white/5 group-hover:border-[#22D3EE]/15'
            }`}
            style={{ 
              transform: 'translateZ(20px)', 
            }}
          >
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/5 text-[9px] text-gray-500 font-sans uppercase tracking-widest font-semibold">
              <span>{step.fileName}</span>
              <span className={`w-1.5 h-1.5 rounded-full bg-[#22D3EE] ${isActive ? 'animate-pulse' : 'opacity-40'}`} />
            </div>
            <pre className="text-[#22D3EE]/80 overflow-x-auto">
              <code>{step.code}</code>
            </pre>
          </div>

        </motion.div>
      </motion.div>
    </div>
  );
}

export default function ProcessSection() {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Section reference to pause off-screen animations
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { margin: '-50px' });

  // Track scroll progress of the container to animate the timeline line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001
  });

  // Calculate top coordinate of the traveling ball indicator
  const indicatorY = useTransform(scaleY, [0, 1], ["0%", "100%"]);

  const steps = [
    {
      key: 'step1',
      icon: <MessageSquare className="w-5 h-5" />,
      fileName: 'konsultasi.json',
      idleAnimation: { scale: [1, 1.05, 1] },
      activeAnimation: { rotate: [-5, 5, -5] },
      code: `{
  "tujuan": "Memahami Visi Bisnis Anda",
  "biaya": "Gratis 100%",
  "output": "Strategi & Rekomendasi Fitur"
}`
    },
    {
      key: 'step2',
      icon: <Palette className="w-5 h-5" />,
      fileName: 'desain_visual.css',
      idleAnimation: { rotate: [0, 5, -5, 0] },
      activeAnimation: { scale: [1, 1.1, 1] },
      code: `.website-anda {
  gaya-visual: "Premium & Modern";
  warna-utama: "Cyan & Deep Black";
  responsif-hp: true;
}`
    },
    {
      key: 'step3',
      icon: <Code2 className="w-5 h-5" />,
      fileName: 'pengembangan.tsx',
      idleAnimation: { y: [0, -2, 0] },
      activeAnimation: { rotate: [-10, 10, -10] },
      code: `function BangunWebsite() {
  return (
    <Website speed="sub-second" SEO="optimum">
      <TampilanElegan />
    </Website>
  );
}`
    },
    {
      key: 'step4',
      icon: <ShieldCheck className="w-5 h-5" />,
      fileName: 'uji_keamanan.sh',
      idleAnimation: { scale: [1, 1.04, 1] },
      activeAnimation: { scale: [1, 1.1, 1] },
      code: `$ cek-keamanan --tahap4
✔ Kode Bersih & Rapi
✔ Proteksi Celah Keamanan Aktif
✔ Bebas Risiko Kebocoran Data`
    },
    {
      key: 'step5',
      icon: <Rocket className="w-5 h-5" />,
      fileName: 'peluncuran.yml',
      idleAnimation: { y: [0, -3, 0] },
      activeAnimation: { y: [-3, 3, -3], rotate: [-2, 2, -2] },
      code: `website:
  status: "ONLINE 🚀"
  server: "Edge CDN Cepat"
  garansi: "Pendampingan Penuh"`
    }
  ];

  const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <section 
      id="process" 
      ref={sectionRef}
      className="py-28 md:py-36 relative overflow-hidden bg-[#050505] border-t border-white/8"
    >
      {/* Background glow effects — static opacity */}
      <div className="absolute top-[20%] left-[-15%] w-[400px] h-[400px] rounded-full pointer-events-none -z-10 opacity-60" style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.04) 0%, transparent 70%)', filter: 'blur(60px)' }} />
      <div className="absolute bottom-[20%] right-[-15%] w-[400px] h-[400px] rounded-full pointer-events-none -z-10 opacity-50" style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.03) 0%, transparent 70%)', filter: 'blur(60px)' }} />

      {/* Floating particles background (viewport gated) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className={`absolute top-[15%] left-[30%] w-2 h-2 rounded-full bg-cyan-400/25 ${isInView ? 'animate-float' : ''}`} style={{ animationDuration: '9s', animationDelay: '0.2s' }} />
        <div className={`absolute bottom-[25%] right-[25%] w-3 h-3 rounded-full bg-blue-400/15 ${isInView ? 'animate-float' : ''}`} style={{ animationDuration: '12s', animationDelay: '2.5s' }} />
      </div>

      <div className="container relative z-10 max-w-[1140px] mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-[680px] mx-auto mb-24">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-4 inline-block"
          >
            <Badge variant="cyan">{t('process.badge')}</Badge>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            className="text-4xl sm:text-5xl font-heading font-extrabold text-white mb-6 text-gradient-white"
          >
            {t('process.heading')}
          </motion.h2>

          {/* Underline animating from left to right */}
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.25, ease: EASE }}
            className="w-24 h-[2px] bg-gradient-to-r from-cyan-400 to-purple-500 mt-4 mb-8 mx-auto rounded-full origin-left"
          />
          
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
            className="text-text-secondary text-sm sm:text-base leading-relaxed max-w-[540px] mx-auto"
          >
            {t('process.sub')}
          </motion.p>
        </div>

        {/* Timeline Container */}
        <div ref={containerRef} className="relative max-w-[960px] mx-auto">
          
          {/* Central Line Track (Desktop) / Left Line Track (Mobile) */}
          <div className="absolute top-4 bottom-4 left-[20px] md:left-1/2 -translate-x-1/2 w-[2px] bg-white/5 pointer-events-none" />
          
          {/* Growing Progress Line */}
          <motion.div 
            className="absolute top-4 bottom-4 left-[20px] md:left-1/2 -translate-x-1/2 w-[2px] bg-gradient-to-b from-[#22D3EE] to-[#06B6D4] origin-top pointer-events-none shadow-[0_0_8px_rgba(34,211,238,0.4)]"
            style={{ scaleY }}
          />

          {/* Traveling Ball Indicator (moves smoothly down line matching scroll position) */}
          <motion.div 
            className="absolute left-[20px] md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#22D3EE] border-2 border-white z-30 shadow-[0_0_15px_#22D3EE] pointer-events-none"
            style={{ 
              top: indicatorY,
              x: "-50%",
              y: "-50%",
              willChange: 'top' 
            }}
          />

          {/* Timeline Items Stagger Grid */}
          <motion.div 
            variants={gridVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="relative flex flex-col gap-16 md:gap-24"
          >
            {steps.map((step, idx) => (
              <ProcessStep 
                key={step.key} 
                step={step} 
                idx={idx} 
                t={t} 
                isLeft={idx % 2 === 0} 
                isInView={isInView}
              />
            ))}
          </motion.div>

        </div>

      </div>
    </section>
  );
}
