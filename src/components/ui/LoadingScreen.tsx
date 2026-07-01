import { useState, useCallback, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface GatewayEntranceProps {
  onEnter: () => void;
  isDissolving: boolean;
}

// ── Easing curves ──────────────────────────────────────────────────────────
const EASE_OUT = [0.25, 0.46, 0.45, 0.94] as const;
const EASE_IN_OUT = [0.4, 0, 0.2, 1] as const;

// ── Ambient background particles (cosmetic only) ───────────────────────────
const BG_DOTS = Array.from({ length: 36 }, (_, i) => ({
  id: i,
  x: ((i * 79 + 23) % 97),
  y: ((i * 43 + 61) % 97),
  size: (i % 3 === 0) ? 2 : 1,
  dur: 6 + (i % 5) * 2.4,
  delay: (i * 0.45) % 5,
}));

// ── Sphere decorative ring configs ─────────────────────────────────────────
const RINGS = [
  { w: 200, h: 200, rx: 72, rz: 0,  speed: 22, color: 'rgba(34,211,238,0.18)', dashed: false },
  { w: 240, h: 240, rx: 72, rz: 55, speed: 30, color: 'rgba(99,102,241,0.12)',  dashed: true  },
  { w: 180, h: 180, rx: 72, rz: 110,speed: 18, color: 'rgba(34,211,238,0.10)', dashed: false },
];

// ── Dissolution particle generator ────────────────────────────────────────
function makeParticles(count: number) {
  return Array.from({ length: count }, (_, i) => {
    const angle = (i / count) * Math.PI * 2 + Math.random() * 0.6;
    const dist  = 180 + Math.random() * 340;
    return {
      id: i,
      x:   Math.cos(angle) * dist,
      y:   Math.sin(angle) * dist,
      size: 1 + Math.floor(Math.random() * 3),
      dur:  1.1 + Math.random() * 0.7,
      delay: Math.random() * 0.25,
      opacity: 0.5 + Math.random() * 0.5,
      color: i % 5 === 0
        ? 'rgba(167,139,250,0.9)'   // occasional purple
        : i % 3 === 0
          ? 'rgba(255,255,255,0.8)' // occasional white
          : 'rgba(34,211,238,0.9)', // mostly cyan
    };
  });
}

export default function GatewayEntrance({ onEnter, isDissolving }: GatewayEntranceProps) {
  const [hovered, setHovered] = useState(false);
  const particles = useMemo(() => makeParticles(110), []);

  // Mouse parallax — smooth spring
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, { stiffness: 55, damping: 20, mass: 0.8 });
  const springY = useSpring(rawY, { stiffness: 55, damping: 20, mass: 0.8 });

  // Sphere tilts slightly toward cursor
  const rotateY = useTransform(springX, [-1, 1], [-10, 10]);
  const rotateX = useTransform(springY, [-1, 1], [8, -8]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    rawX.set((e.clientX / window.innerWidth  - 0.5) * 2);
    rawY.set((e.clientY / window.innerHeight - 0.5) * 2);
  }, [rawX, rawY]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  const handleClick = useCallback(() => {
    if (!isDissolving) onEnter();
  }, [isDissolving, onEnter]);

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div
      className="fixed inset-0 overflow-hidden select-none"
      style={{ zIndex: 9999, background: '#050505' }}
    >

      {/* ── Cinematic ambient gradient ───────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: [
            'radial-gradient(ellipse 65% 50% at 50% 48%, rgba(34,211,238,0.07) 0%, transparent 65%)',
            'radial-gradient(ellipse 40% 60% at 30% 70%, rgba(99,102,241,0.04) 0%, transparent 60%)',
          ].join(','),
        }}
      />

      {/* ── Subtle background dots ────────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {BG_DOTS.map(d => (
          <motion.div
            key={d.id}
            className="absolute rounded-full"
            style={{
              left: `${d.x}%`, top: `${d.y}%`,
              width: d.size, height: d.size,
              background: 'rgba(34,211,238,0.25)',
            }}
            animate={{ opacity: [0.04, 0.3, 0.04] }}
            transition={{ duration: d.dur, delay: d.delay, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>

      {/* ── Corner accents ────────────────────────────────────────────────── */}
      {(['tl','tr','bl','br'] as const).map(pos => (
        <div
          key={pos}
          className="absolute pointer-events-none opacity-25 flex flex-col gap-[3px]"
          style={{
            top:    pos.startsWith('t') ? 28 : undefined,
            bottom: pos.startsWith('b') ? 28 : undefined,
            left:   pos.endsWith('l')   ? 28 : undefined,
            right:  pos.endsWith('r')   ? 28 : undefined,
            alignItems: pos.endsWith('r') ? 'flex-end' : 'flex-start',
          }}
        >
          <div style={{ width: 24, height: 1, background: 'rgba(34,211,238,0.5)' }} />
          <div style={{ width: 12, height: 1, background: 'rgba(34,211,238,0.3)' }} />
        </div>
      ))}

      {/* ── Centre stage ─────────────────────────────────────────────────── */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">

        {/* ── SPHERE + Rings ─────────────────────────────────────────────── */}
        <motion.div
          style={{
            rotateX, rotateY,
            transformStyle: 'preserve-3d',
            perspective: 800,
            willChange: 'transform',
            width: 280,
            height: 280,
          } as any}
          // Idle float
          animate={isDissolving
            ? { y: 0 }
            : { y: [0, -10, 0] }
          }
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="relative flex items-center justify-center cursor-pointer"
          onClick={handleClick}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >

          {/* Atmospheric outer glow */}
          <motion.div
            className="absolute rounded-full pointer-events-none"
            style={{
              width: 280, height: 280,
              background: 'radial-gradient(circle, rgba(34,211,238,0.12) 0%, transparent 70%)',
              filter: 'blur(24px)',
            }}
            animate={{
              opacity: isDissolving ? 0 : hovered ? [0.7, 1, 0.7] : [0.35, 0.65, 0.35],
              scale:   isDissolving ? 1.4 : 1,
            }}
            transition={{
              opacity: isDissolving
                ? { duration: 0.6, ease: EASE_IN_OUT }
                : { duration: 3, repeat: Infinity, ease: 'easeInOut' },
              scale: { duration: 1.0, ease: EASE_IN_OUT },
            }}
          />

          {/* Rotating ring decorations */}
          {RINGS.map((r, i) => (
            <motion.div
              key={i}
              className="absolute pointer-events-none"
              style={{
                width: r.w, height: r.h,
                borderRadius: '50%',
                border: `1px ${r.dashed ? 'dashed' : 'solid'} ${r.color}`,
                transform: `rotateX(${r.rx}deg) rotateZ(${r.rz}deg)`,
              }}
              animate={{
                rotate: [0, 360],
                opacity: isDissolving ? 0 : hovered ? 0.9 : 0.6,
              }}
              transition={{
                rotate:  { duration: r.speed, repeat: Infinity, ease: 'linear' },
                opacity: { duration: isDissolving ? 0.5 : 0.4, ease: EASE_OUT },
              }}
            />
          ))}

          {/* ── Energy sphere shell ────────────────────────────────────── */}
          <motion.div
            className="relative"
            style={{ width: 160, height: 160 }}
            animate={{
              scale:   isDissolving ? 0.6 : hovered ? 1.06 : 1,
              opacity: isDissolving ? 0 : 1,
            }}
            transition={{ duration: isDissolving ? 0.9 : 0.35, ease: EASE_OUT }}
          >
            {/* Glass shell */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: [
                  'radial-gradient(ellipse 60% 45% at 38% 32%, rgba(255,255,255,0.22) 0%, transparent 55%)',
                  'radial-gradient(circle at 50% 50%, rgba(34,211,238,0.14) 0%, rgba(99,102,241,0.10) 45%, rgba(5,5,5,0.5) 100%)',
                ].join(','),
                boxShadow: hovered
                  ? '0 0 60px 20px rgba(34,211,238,0.35), inset 0 0 40px rgba(34,211,238,0.12), 0 0 120px 40px rgba(99,102,241,0.12)'
                  : '0 0 40px 12px rgba(34,211,238,0.18), inset 0 0 30px rgba(34,211,238,0.07)',
                border: '1px solid rgba(255,255,255,0.12)',
                transition: 'box-shadow 0.5s ease',
              }}
            />

            {/* Inner bright core */}
            <div
              className="absolute rounded-full"
              style={{
                width: 56, height: 56,
                top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                background: 'radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(34,211,238,0.7) 40%, transparent 80%)',
                filter: 'blur(6px)',
              }}
            />

            {/* Surface specular highlight */}
            <div
              className="absolute rounded-full"
              style={{
                width: 36, height: 22,
                top: '18%', left: '22%',
                background: 'radial-gradient(ellipse, rgba(255,255,255,0.55) 0%, transparent 80%)',
                filter: 'blur(3px)',
              }}
            />
          </motion.div>

          {/* ── Dissolution particles (appear on click) ─────────────────── */}
          <AnimatePresence>
            {isDissolving && particles.map(p => (
              <motion.div
                key={p.id}
                className="absolute pointer-events-none rounded-full"
                style={{
                  width:  p.size,
                  height: p.size,
                  background: p.color,
                  boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
                  top: '50%', left: '50%',
                  marginTop:  -p.size / 2,
                  marginLeft: -p.size / 2,
                }}
                initial={{ x: 0, y: 0, opacity: p.opacity, scale: 1 }}
                animate={{
                  x: p.x,
                  y: p.y,
                  opacity: 0,
                  scale: 0,
                }}
                transition={{
                  duration: p.dur,
                  delay: p.delay,
                  ease: EASE_OUT,
                }}
              />
            ))}
          </AnimatePresence>

        </motion.div>

        {/* ── CTA text ───────────────────────────────────────────────────── */}
        <AnimatePresence>
          {!isDissolving && (
            <motion.div
              key="cta"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6, transition: { duration: 0.4, ease: EASE_IN_OUT } }}
              transition={{ duration: 0.9, delay: 0.5, ease: EASE_OUT }}
              className="flex flex-col items-center gap-3 mt-10 pointer-events-none"
            >
              {/* Pulsing pill */}
              <motion.button
                className="pointer-events-auto flex items-center gap-2 px-5 py-2 rounded-full cursor-pointer"
                style={{
                  background: 'rgba(34,211,238,0.05)',
                  border: '1px solid rgba(34,211,238,0.20)',
                }}
                onClick={handleClick}
                whileHover={{ scale: 1.04, borderColor: 'rgba(34,211,238,0.5)', background: 'rgba(34,211,238,0.09)' }}
                whileTap={{ scale: 0.97 }}
                animate={{
                  boxShadow: [
                    '0 0 0px rgba(34,211,238,0)',
                    '0 0 16px rgba(34,211,238,0.2)',
                    '0 0 0px rgba(34,211,238,0)',
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                <span
                  className="font-heading font-semibold text-white tracking-[0.18em] uppercase"
                  style={{ fontSize: 11 }}
                >
                  Click to Enter
                </span>
              </motion.button>

              {/* Hint */}
              <span
                className="font-mono uppercase tracking-[0.22em] text-white/18"
                style={{ fontSize: 9 }}
              >
                or press Enter
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dissolving status */}
        <AnimatePresence>
          {isDissolving && (
            <motion.div
              key="dissolving"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-10 font-mono text-[9px] uppercase tracking-widest"
              style={{ color: 'rgba(34,211,238,0.45)' }}
            >
              <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 0.7, repeat: Infinity }}>
                entering…
              </motion.span>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* ── Full-overlay fade-out when dissolving ─────────────────────────── */}
      <AnimatePresence>
        {isDissolving && (
          <motion.div
            key="fadeout"
            className="absolute inset-0 pointer-events-none"
            style={{ background: '#050505' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.0, ease: EASE_IN_OUT }}
          />
        )}
      </AnimatePresence>

      {/* ── Gateway overlay itself fades out ─────────────────────────────── */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: isDissolving ? 0 : 1 }}
        transition={{ duration: 2.0, delay: 0.6, ease: EASE_IN_OUT }}
        style={{ background: '#050505', zIndex: -1 }}
      />

    </div>
  );
}
