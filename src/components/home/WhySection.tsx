import { useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { 
  Zap, 
  Shield, 
  Smartphone, 
  Lock,
  TrendingUp,
  Cpu
} from 'lucide-react';
import Badge from '../ui/Badge';

const EASE = [0.16, 1, 0.3, 1] as any;

// Looping Premium Dashboard Mockup on the Left
function MorphingVisual() {
  return (
    <div className="relative w-full h-[280px] bg-[#0A0A0A] rounded-2xl border border-white/5 overflow-hidden shadow-[0_24px_50px_-12px_rgba(0,0,0,0.7)] flex flex-col">
      {/* Browser Bar */}
      <div className="h-9 bg-white/[0.02] border-b border-white/5 flex items-center px-4 gap-2 shrink-0 select-none">
        <div className="flex gap-1.5 shrink-0">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] opacity-70" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] opacity-70" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F] opacity-70" />
        </div>
        <div className="mx-auto bg-white/2 rounded-full h-5 px-6 flex items-center justify-center border border-white/4">
          <span className="text-[9px] font-mono text-white/30 tracking-wide">leftbrainideas.com</span>
        </div>
      </div>

      {/* Visual Canvas Area */}
      <div className="relative flex-1 p-5 overflow-hidden font-mono text-[9px] text-left">
        {/* Wireframe grid backdrop */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:14px_14px] opacity-60" />

        {/* LAYER 1: Code Block (loops fade/slide) */}
        <motion.div
          animate={{
            opacity: [0, 1, 1, 0, 0, 0],
            y: [10, 0, 0, -10, -10, -10]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            times: [0, 0.08, 0.46, 0.54, 0.92, 1],
            ease: "easeInOut"
          }}
          className="absolute inset-5 flex flex-col gap-1.5 text-cyan-400/80 leading-relaxed font-sans"
        >
          <div className="text-white/20 font-mono text-[8px] mb-2">// BUILDING DIGITAL PRODUCT...</div>
          <div><span className="text-[#F43F5E]">const</span> LeftBrain = <span className="text-[#38BDF8]">createApp</span>(&#123;</div>
          <div className="pl-4">speed: <span className="text-amber-400">&quot;60fps&quot;</span>,</div>
          <div className="pl-4">secure: <span className="text-emerald-400">true</span>,</div>
          <div className="pl-4">design: <span className="text-[#22D3EE]">&quot;premium&quot;</span>,</div>
          <div className="pl-4">scalable: <span className="text-purple-400">true</span></div>
          <div>&#125;);</div>
          <div className="mt-2 text-emerald-400/60 font-mono text-[8px] animate-pulse">▲ COMPILING ASSETS SUCCESSFUL</div>
        </motion.div>

        {/* LAYER 2: Morphed UI Panel (loops fade/scale in opposite phase) */}
        <motion.div
          animate={{
            opacity: [0, 0, 0, 1, 1, 0],
            scale: [0.97, 0.97, 0.97, 1, 1, 0.97]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            times: [0, 0.08, 0.46, 0.54, 0.92, 1],
            ease: "easeInOut"
          }}
          className="absolute inset-5 flex gap-4 pointer-events-none"
        >
          {/* Card 1: Sales Chart */}
          <div className="flex-1 rounded-xl bg-white/[0.02] border border-white/5 p-4 flex flex-col justify-between shadow-xl backdrop-blur-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[8px] font-sans font-bold text-white/50 uppercase tracking-wider">Performa Bisnis</span>
              <span className="text-[10px] font-sans font-extrabold text-emerald-400 flex items-center gap-0.5">
                <TrendingUp className="w-2.5 h-2.5" /> +42%
              </span>
            </div>
            
            {/* SVG Chart Drawing Line */}
            <div className="h-16 relative">
              <svg className="w-full h-full" viewBox="0 0 160 60">
                <defs>
                  <linearGradient id="chart-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#22D3EE" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M 0 50 Q 30 20 60 40 T 120 15 T 160 5 L 160 60 L 0 60 Z" fill="url(#chart-grad)" />
                <motion.path
                  d="M 0 50 Q 30 20 60 40 T 120 15 T 160 5"
                  fill="none"
                  stroke="#22D3EE"
                  strokeWidth="2"
                  strokeLinecap="round"
                  animate={{
                    pathLength: [0, 1]
                  }}
                  transition={{
                    duration: 2.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    repeatDelay: 1.8
                  }}
                />
              </svg>
            </div>
          </div>

          {/* Card 2: Security Indicator */}
          <div className="w-24 rounded-xl bg-[#22d3ee]/[0.02] border border-[#22d3ee]/10 p-3.5 flex flex-col items-center justify-center gap-2 shadow-xl backdrop-blur-sm">
            <motion.div
              animate={{
                scale: [1, 1.08, 1],
              }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.2)]"
            >
              <Lock className="w-4 h-4 text-emerald-400" />
            </motion.div>
            <span className="text-[8px] font-sans font-bold text-white/80 text-center tracking-wide">Sistem Aman</span>
            <span className="text-[7px] font-mono text-emerald-400 uppercase tracking-widest leading-none">ACTIVE</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

const featureCards = [
  {
    icon: <Zap className="w-5 h-5 text-[#22D3EE]" />,
    title: 'Cepat',
    description: 'Website ringan dan loading cepat.'
  },
  {
    icon: <Shield className="w-5 h-5 text-[#22D3EE]" />,
    title: 'Aman',
    description: 'Menggunakan standar keamanan terbaik.'
  },
  {
    icon: <Smartphone className="w-5 h-5 text-[#22D3EE]" />,
    title: 'Responsif',
    description: 'Nyaman di HP, Tablet, maupun Laptop.'
  },
  {
    icon: <Cpu className="w-5 h-5 text-[#22D3EE]" />,
    title: 'Siap Berkembang',
    description: 'Mudah dikembangkan ketika bisnis semakin besar.'
  }
];

export default function WhySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  // useMotionValue avoids React re-renders on every mouse move event
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const smoothX = useSpring(rawX, { stiffness: 100, damping: 25 });
  const smoothY = useSpring(rawY, { stiffness: 100, damping: 25 });

  // Derive parallax offsets without re-rendering
  const glow1X  = useTransform(smoothX, v => v * 24);
  const glow1Y  = useTransform(smoothY, v => v * 24);
  const glow2X  = useTransform(smoothX, v => v * -20);
  const glow2Y  = useTransform(smoothY, v => v * -20);
  const visualX = useTransform(smoothX, v => v * -12);
  const visualY = useTransform(smoothY, v => v * -12);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    rawX.set((e.clientX - rect.left - rect.width / 2) / (rect.width / 2));
    rawY.set((e.clientY - rect.top - rect.height / 2) / (rect.height / 2));
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: EASE }
    }
  };

  return (
    <section
      id="why"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="py-20 sm:py-28 relative overflow-hidden bg-[#050505] border-t border-white/8"
    >
      {/* Ambient background glows with mouse parallax */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <motion.div 
          style={{ x: glow1X, y: glow1Y }}
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[radial-gradient(ellipse,rgba(34,211,238,0.025)_0%,rgba(34,211,238,0.007)_40%,transparent_75%)]" 
        />
        <motion.div 
          style={{ x: glow2X, y: glow2Y }}
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[radial-gradient(ellipse,rgba(99,102,241,0.015)_0%,rgba(99,102,241,0.004)_40%,transparent_75%)]" 
        />
      </div>

      <div className="container relative z-10 max-w-[1140px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT SIDE: Interactive loops visual */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: EASE }}
            className="lg:col-span-5 flex flex-col gap-6 w-full max-w-[420px] mx-auto lg:mx-0"
          >
            {/* Visual Badge header */}
            <div className="text-left select-none">
              <Badge variant="cyan" className="mb-2">Teknologi Kami</Badge>
              <div className="text-[10px] font-mono text-[#6C7281] mt-1.5 uppercase tracking-wider">// STACK: React · Vite · Tailwind · SSL</div>
            </div>

            {/* Inner div for mouse parallax */}
            <motion.div
              style={{ x: visualX, y: visualY }}
              className="w-full"
            >
              {/* Custom Interactive Mockup Canvas */}
              <MorphingVisual />
            </motion.div>
          </motion.div>

          {/* RIGHT SIDE: Copywriting & Feature Cards */}
          <div className="lg:col-span-7 text-left flex flex-col gap-8">
            
            {/* Headline and Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: EASE }}
            >
              <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-white mb-4 leading-tight">
                Lebih dari Sekadar <span className="text-[#22D3EE]">Website Cantik</span>
              </h2>
              <p className="text-[#B5B5B5] text-sm sm:text-base leading-relaxed">
                Website yang kami buat tidak hanya menarik dilihat, tetapi juga cepat, aman, nyaman digunakan, dan membantu bisnis Anda terlihat lebih profesional.
              </p>
            </motion.div>

            {/* 4 Premium Cards Grid */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? 'show' : 'hidden'}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {featureCards.map((card) => (
                <motion.div
                  key={card.title}
                  variants={cardVariants}
                  whileHover={{ 
                    y: -5,
                    borderColor: 'rgba(34, 211, 238, 0.25)',
                    boxShadow: '0 12px 36px rgba(34, 211, 238, 0.05), inset 0 0 10px rgba(255, 255, 255, 0.01)'
                  }}
                  transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                  className="group p-5 rounded-2xl bg-[#0B0B0B] border border-white/6 flex gap-4 items-start relative overflow-hidden transition-all duration-300"
                >
                  {/* Subtle top hover line glow */}
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#22D3EE]/0 to-transparent group-hover:via-[#22D3EE]/30 transition-all duration-500" />
                  
                  {/* Icon Box */}
                  <div className="w-10 h-10 rounded-xl bg-white/2 border border-white/5 flex items-center justify-center shrink-0 group-hover:bg-[#22D3EE]/10 group-hover:border-[#22D3EE]/30 transition-all duration-300">
                    {card.icon}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <h3 className="text-sm font-heading font-extrabold text-white group-hover:text-[#22D3EE] transition-colors duration-300">
                      {card.title}
                    </h3>
                    <p className="text-xs text-[#B5B5B5] leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            
          </div>
        </div>
      </div>
    </section>
  );
}
