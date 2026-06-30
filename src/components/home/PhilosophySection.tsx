import { useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Sparkles, HeartHandshake } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Badge from '../ui/Badge';
import { useEffect, useRef } from 'react';

// Canvas particle component
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

function NeuronCanvas({ isLogoHovered }: { isLogoHovered: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];
    const count = 35;
    const connectDist = 110;
    const glowDist = 140;

    const resize = () => {
      if (!canvas || !containerRef.current) return;
      canvas.width = containerRef.current.clientWidth;
      canvas.height = containerRef.current.clientHeight;
      init();
    };

    const init = () => {
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          radius: Math.random() * 1.5 + 1
        });
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
    };

    const onMouseLeave = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
      mouseRef.current.active = false;
    };

    window.addEventListener('resize', resize);
    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', onMouseMove);
      container.addEventListener('mouseleave', onMouseLeave);
    }

    resize();

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      
      // Determine interactive highlight center
      let targetX = mx;
      let targetY = my;
      let active = mouseRef.current.active;

      if (isLogoHovered) {
        targetX = canvas.width / 2;
        targetY = canvas.height / 2;
        active = true;
      }

      // Update positions
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      }

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectDist) {
            let glow = false;
            if (active) {
              const dxM1 = p1.x - targetX;
              const dyM1 = p1.y - targetY;
              const dM1 = Math.sqrt(dxM1 * dxM1 + dyM1 * dyM1);
              const dxM2 = p2.x - targetX;
              const dyM2 = p2.y - targetY;
              const dM2 = Math.sqrt(dxM2 * dxM2 + dyM2 * dyM2);

              if (dM1 < glowDist || dM2 < glowDist) {
                glow = true;
              }
            }

            const alpha = (1 - dist / connectDist) * 0.12;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = glow ? `rgba(34, 211, 238, ${alpha * 2.8})` : `rgba(255, 255, 255, ${alpha})`;
            ctx.lineWidth = glow ? 0.8 : 0.4;
            ctx.stroke();
          }
        }

        // Draw line to mouse/logo center
        if (active) {
          const dx = p1.x - targetX;
          const dy = p1.y - targetY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < glowDist) {
            const alpha = (1 - dist / glowDist) * 0.18;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(targetX, targetY);
            ctx.strokeStyle = `rgba(34, 211, 238, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      // Draw points
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        let glow = false;
        let size = p.radius;

        if (active) {
          const dx = p.x - targetX;
          const dy = p.y - targetY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < glowDist) {
            glow = true;
            size = p.radius * (1 + (1 - dist / glowDist) * 1.5);
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        if (glow) {
          ctx.fillStyle = '#22D3EE';
          ctx.shadowBlur = 6;
          ctx.shadowColor = '#22D3EE';
        } else {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
          ctx.shadowBlur = 0;
        }
        ctx.fill();
      }

      // Reset shadow blur
      ctx.shadowBlur = 0;

      // Draw glowing hover gradient
      if (active) {
        const grad = ctx.createRadialGradient(targetX, targetY, 0, targetX, targetY, glowDist);
        grad.addColorStop(0, 'rgba(34, 211, 238, 0.04)');
        grad.addColorStop(1, 'rgba(34, 211, 238, 0)');
        ctx.beginPath();
        ctx.arc(targetX, targetY, glowDist, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      if (container) {
        container.removeEventListener('mousemove', onMouseMove);
        container.removeEventListener('mouseleave', onMouseLeave);
      }
    };
  }, [isLogoHovered]);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full overflow-hidden">
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}

export default function PhilosophySection() {
  const { t } = useTranslation();
  const [isLogoHovered, setIsLogoHovered] = useState(false);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1] as any
      }
    }
  };

  const cardsData = [
    {
      key: 'structured',
      icon: <Cpu className="w-5 h-5 text-[#22D3EE]" />
    },
    {
      key: 'intuitive',
      icon: <Sparkles className="w-5 h-5 text-[#22D3EE]" />
    },
    {
      key: 'support',
      icon: <HeartHandshake className="w-5 h-5 text-[#22D3EE]" />
    }
  ];

  return (
    <section
      id="philosophy"
      className="py-24 md:py-32 relative overflow-hidden bg-[#050505] border-t border-white/8"
    >
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.015)_0%,transparent_70%)] filter blur-[100px] pointer-events-none -z-10" />

      <div className="container relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-[640px] mx-auto mb-20 px-4">
          <div className="mb-4 inline-block">
            <Badge variant="muted">{t('philosophy.badge')}</Badge>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white leading-tight">
            {t('philosophy.heading1')}{' '}
            <span style={{ color: '#22D3EE' }}>
              {t('philosophy.heading2')}
            </span>
          </h2>
        </div>

        {/* Main Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center max-w-[1100px] mx-auto">
          
          {/* Left Side: Interactive Logo + Canvas Network */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <div 
              className="relative w-[320px] h-[320px] sm:w-[380px] sm:h-[380px] rounded-full border border-white/5 bg-white/[0.01] backdrop-blur-md flex items-center justify-center cursor-pointer overflow-hidden group shadow-[inset_0_0_20px_rgba(255,255,255,0.01)] transition-all duration-700"
              onMouseEnter={() => setIsLogoHovered(true)}
              onMouseLeave={() => setIsLogoHovered(false)}
            >
              {/* Connected node network background */}
              <NeuronCanvas isLogoHovered={isLogoHovered} />
              
              {/* Inner subtle glow rings */}
              <div className="absolute inset-8 rounded-full border border-white/5 pointer-events-none transition-all duration-700 group-hover:border-[#22D3EE]/10 group-hover:scale-95" />
              <div className="absolute inset-16 rounded-full border border-white/5 pointer-events-none transition-all duration-700 group-hover:border-[#22D3EE]/20 group-hover:scale-90" />
              
              {/* Radial gradient background that lights up on hover */}
              <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(34,211,238,0)_30%,rgba(34,211,238,0.03)_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              {/* The breathing Logo */}
              <div 
                className={`relative z-10 w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center transition-all duration-700
                  ${isLogoHovered ? 'scale-105 filter drop-shadow-[0_0_25px_rgba(34,211,238,0.45)]' : 'logo-glow animate-float-logo'}
                `}
                style={{
                  animationDuration: '6s',
                }}
              >
                <img 
                  src="/assets/images/logo-left-brain-ideas.svg" 
                  alt="Left Brain Ideas Logo" 
                  className="w-full h-full object-contain select-none"
                />
              </div>

              {/* Glowing active node elements in corner */}
              <div className="absolute top-8 left-12 w-1.5 h-1.5 rounded-full bg-[#22D3EE] opacity-20 group-hover:opacity-100 group-hover:shadow-[0_0_10px_#22D3EE] transition-all duration-700" />
              <div className="absolute bottom-16 right-10 w-2 h-2 rounded-full bg-[#22D3EE] opacity-10 group-hover:opacity-80 group-hover:shadow-[0_0_10px_#22D3EE] transition-all duration-700" />
            </div>
          </div>

          {/* Right Side: Narrative + 3 Philosophy Cards */}
          <div className="lg:col-span-7 text-left flex flex-col gap-8">
            <div className="max-w-[580px]">
              <p className="text-[#B5B5B5] text-base leading-relaxed font-sans mb-6">
                {t('philosophy.description')}
              </p>
            </div>

            {/* Structured Cards */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="flex flex-col gap-4"
            >
              {cardsData.map((card) => (
                <motion.div
                  key={card.key}
                  variants={itemVariants}
                  whileHover={{ 
                    x: 6,
                    borderColor: 'rgba(34, 211, 238, 0.25)',
                    boxShadow: '0 8px 32px rgba(34, 211, 238, 0.05)'
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                  className="relative group rounded-2xl border border-white/5 bg-white/[0.02] p-6 flex gap-5 items-start transition-colors duration-500 overflow-hidden"
                  style={{ willChange: 'transform' }}
                >
                  {/* Subtle top border highlight */}
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#22D3EE]/0 to-transparent group-hover:via-[#22D3EE]/25 transition-all duration-700" />

                  {/* Icon Wrapper with glow */}
                  <div className="w-10 h-10 rounded-xl bg-white/3 border border-white/5 flex items-center justify-center shrink-0 group-hover:bg-[#22D3EE]/10 group-hover:border-[#22D3EE]/30 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.2)] transition-all duration-500">
                    {card.icon}
                  </div>

                  <div className="flex flex-col gap-1.5 text-left">
                    <h3 className="text-base font-heading font-extrabold text-white group-hover:text-[#22D3EE] transition-colors duration-300">
                      {t(`philosophy.cards.${card.key}.title`)}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#B5B5B5] leading-relaxed font-sans">
                      {t(`philosophy.cards.${card.key}.desc`)}
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
