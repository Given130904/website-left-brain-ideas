import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const EASE = [0.16, 1, 0.3, 1] as any;

// ─── Technology Icons SVG inline ────────────────────────────────────────────
const TechIcons: Record<string, { svg: React.ReactNode; color: string }> = {
  'HTML5': {
    color: '#E34F26',
    svg: (
      <svg viewBox="0 0 32 32" width="100%" height="100%"><path fill="#E34F26" d="M5.902 27.201L4 5.001h24l-1.903 22.197L15.985 30z"/><path fill="#EF652A" d="M16 27.854l8.17-2.66 1.626-18.193H16z"/><path fill="#fff" d="M16 13.001h-4.09l-.282-3.244H16V6.548H8.357l.074.828.754 8.625H16zm0 8.872l-.014.004-3.442-.929-.22-2.465H9.114l.434 4.874 6.436 1.788.016-.005z"/><path fill="#fff" d="M15.989 13.001v3.208H19.9l-.372 4.141-3.539.956v3.324l6.44-1.785.047-.528.738-8.26.077-.856H15.99z"/></svg>
    )
  },
  'CSS3': {
    color: '#1572B6',
    svg: (
      <svg viewBox="0 0 32 32" width="100%" height="100%"><path fill="#1572B6" d="M5.902 27.201L4 5.001h24l-1.903 22.197L15.985 30z"/><path fill="#33A9DC" d="M16 27.854l8.17-2.66 1.626-18.193H16z"/><path fill="#fff" d="M16 13.001H9.817l.21 2.21H16V13.001zm0-4.453H9.397l.21 2.212H16V8.548zm0 8.891h-5.786l.303 3.17 5.483 1.53V17.44z"/><path fill="#fff" d="M16 17.439v2.684l-.014.004-3.442-.929-.22-2.465h-2.21l.434 4.874 5.452 1.513V17.44z"/></svg>
    )
  },
  'Tailwind': {
    color: '#06B6D4',
    svg: (
      <svg viewBox="0 0 32 32" width="100%" height="100%"><path fill="#06B6D4" d="M9 13.7q1.4-5.6 7-5.6c3.5 0 5.25 1.75 5.25 4.375 0 3.063-1.75 4.813-4.375 5.25-.875.125-1.75.4375-1.75 1.3125v.5625H18.5c3.5 0 5.25 1.75 5.25 4.375v.4375c0 2.625-1.75 4.375-5.25 4.375-3.5 0-5.25-1.75-5.25-4.375v-.25h2.5v.25c0 1.375.875 1.875 2.75 1.875s2.75-.5 2.75-1.875v-.4375c0-1.375-.875-1.875-2.75-1.875H15.5v-2.25h1.625c1.875 0 2.75-.5 2.75-1.875 0-1.375-.875-1.875-2.75-1.875-1.875 0-2.75.5-2.75 1.875v.1875H12.5v-.1875c0-2.625 1.75-4.375 5.25-4.375.75 0 1.375.0625 1.875.1875C18.5 10.7 17.25 10.1 16 10.1c-3.5 0-4.375 2.1875-4.375 2.1875L9 13.7z"/></svg>
    )
  },
  'React': {
    color: '#61DAFB',
    svg: (
      <svg viewBox="0 0 32 32" width="100%" height="100%"><circle cx="16" cy="16" r="3" fill="#61DAFB"/><path fill="none" stroke="#61DAFB" strokeWidth="1.2" d="M16 7c4.97 0 9 4.03 9 9s-4.03 9-9 9-9-4.03-9-9 4.03-9 9-9"/><ellipse cx="16" cy="16" rx="9" ry="3.5" fill="none" stroke="#61DAFB" strokeWidth="1.2"/><ellipse cx="16" cy="16" rx="9" ry="3.5" fill="none" stroke="#61DAFB" strokeWidth="1.2" transform="rotate(60 16 16)"/><ellipse cx="16" cy="16" rx="9" ry="3.5" fill="none" stroke="#61DAFB" strokeWidth="1.2" transform="rotate(120 16 16)"/></svg>
    )
  },
  'Next.js': {
    color: '#FFFFFF',
    svg: (
      <svg viewBox="0 0 32 32" width="100%" height="100%"><circle cx="16" cy="16" r="14" fill="#000"/><path fill="#fff" d="M19.5 21.5L12.5 12h-2v8h1.5v-6l6.5 9H20V12h-1.5v9.5z"/></svg>
    )
  },
  'JavaScript': {
    color: '#F7DF1E',
    svg: (
      <svg viewBox="0 0 32 32" width="100%" height="100%"><rect width="32" height="32" fill="#F7DF1E" rx="2"/><path fill="#000" d="M9.5 24.5l1.7-1.04c.33.59.63 1.09 1.34 1.09.69 0 1.13-.27 1.13-1.33V17h2.1v6.26c0 2.19-1.28 3.19-3.15 3.19-1.69 0-2.67-.88-3.12-1.95zm7.87-.31l1.7-1.02c.44.72 1.02 1.25 2.04 1.25.86 0 1.4-.43 1.4-1.02 0-.71-.56-.96-1.51-1.37l-.52-.22c-1.5-.64-2.49-1.44-2.49-3.13 0-1.56 1.19-2.74 3.05-2.74 1.32 0 2.27.46 2.95 1.66l-1.62 1.04c-.36-.64-.74-.89-1.33-.89-.6 0-.98.38-.98.89 0 .62.38.87 1.27 1.25l.52.22c1.77.76 2.76 1.53 2.76 3.27 0 1.87-1.47 2.89-3.44 2.89-1.93 0-3.18-.92-3.8-2.08z"/></svg>
    )
  },
  'Laravel': {
    color: '#FF2D20',
    svg: (
      <svg viewBox="0 0 32 32" width="100%" height="100%"><path fill="#FF2D20" d="M29.14 7.27a.38.38 0 0 1 0 .12l-2.49 12.75a.47.47 0 0 1-.22.3L16 26.72l-.13.06a.47.47 0 0 1-.21 0H15.5l-6.64-3.22-3.36-1.63a.5.5 0 0 1-.27-.44V9.08a.5.5 0 0 1 .07-.25l.1-.14 4.86-4.31a.47.47 0 0 1 .32-.11h.12l3.32 1.61 7.42 3.59 3.2-2.83a.48.48 0 0 1 .79.2.38.38 0 0 1 0 .12v.12zM15.46 9.5L9.2 10.89l6.26 3.03zm-.93 8.22L8 13.7v7.15l6.53 3.16zm1-.07l5.58 2.7-4.68-2.28z"/></svg>
    )
  },
  'PHP': {
    color: '#777BB4',
    svg: (
      <svg viewBox="0 0 32 32" width="100%" height="100%"><ellipse cx="16" cy="16" rx="14" ry="9" fill="#777BB4"/><path fill="#fff" d="M9 13h2.5c1.5 0 2.5.7 2.5 2s-1 2-2.5 2H10v2H9V13zm1 3h1.5c.8 0 1.5-.3 1.5-1s-.7-1-1.5-1H10v2zm5-3h1l.5 3.5.5-3.5h1l.5 3.5.5-3.5h1l-.8 6h-1L18 15.5l-.7 3.5h-1L15 13zm6.5 0H24c1.5 0 2.5.7 2.5 2s-1 2-2.5 2h-1.5v2h-1V13zm1 3H23c.8 0 1.5-.3 1.5-1s-.7-1-1.5-1h-1.5v2z"/></svg>
    )
  },
  'Python': {
    color: '#3776AB',
    svg: (
      <svg viewBox="0 0 32 32" width="100%" height="100%"><path fill="#3776AB" d="M16 4C9.4 4 9.8 6.8 9.8 6.8v3h6.4v1H7.4S4 10.4 4 16.1s3.2 5.9 3.2 5.9h2V19s-.1-3.2 3.2-3.2h5.5s3.1.1 3.1-3V7.6S21.4 4 16 4zm-1.8 2.2c.6 0 1.1.5 1.1 1.1s-.5 1.1-1.1 1.1-1.1-.5-1.1-1.1.5-1.1 1.1-1.1z"/><path fill="#FFD43B" d="M16 28c6.6 0 6.2-2.8 6.2-2.8v-3h-6.4v-1h8.8S28 21.6 28 15.9s-3.2-5.9-3.2-5.9h-2V13s.1 3.2-3.2 3.2h-5.5S11 16.1 11 19.2v4.2S10.6 28 16 28zm1.8-2.2c-.6 0-1.1-.5-1.1-1.1s.5-1.1 1.1-1.1 1.1.5 1.1 1.1-.5 1.1-1.1 1.1z"/></svg>
    )
  },
  'MySQL': {
    color: '#00758F',
    svg: (
      <svg viewBox="0 0 32 32" width="100%" height="100%"><ellipse cx="16" cy="8" rx="11" ry="4" fill="#00758F"/><path fill="#00758F" d="M5 8v5c0 2.2 4.9 4 11 4s11-1.8 11-4V8c0 2.2-4.9 4-11 4S5 10.2 5 8z"/><path fill="#00758F" d="M5 13v5c0 2.2 4.9 4 11 4s11-1.8 11-4v-5c0 2.2-4.9 4-11 4S5 15.2 5 13z"/><path fill="#00758F" d="M5 18v5c0 2.2 4.9 4 11 4s11-1.8 11-4v-5c0 2.2-4.9 4-11 4S5 20.2 5 18z"/><ellipse cx="16" cy="8" rx="11" ry="4" fill="none" stroke="#00758F" strokeWidth="0.5"/></svg>
    )
  },
  'Kotlin': {
    color: '#7F52FF',
    svg: (
      <svg viewBox="0 0 32 32" width="100%" height="100%"><defs><linearGradient id="kt" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#E44857"/><stop offset="50%" stopColor="#C711E1"/><stop offset="100%" stopColor="#7F52FF"/></linearGradient></defs><path fill="url(#kt)" d="M4 4h12l-12 12zm0 24l14-14L28 28z M16 4h12L4 28"/></svg>
    )
  },
  'Figma': {
    color: '#F24E1E',
    svg: (
      <svg viewBox="0 0 32 32" width="100%" height="100%"><path fill="#F24E1E" d="M11 5a5 5 0 0 0 0 10h5V5z"/><path fill="#FF7262" d="M11 15H16v10a5 5 0 0 1-5-10z"/><path fill="#A259FF" d="M16 5h5a5 5 0 0 1 0 10h-5z"/><path fill="#1ABCFE" d="M21 15a5 5 0 1 1-10 0 5 5 0 0 1 10 0z"/><circle cx="21" cy="15" r="5" fill="#0ACF83"/></svg>
    )
  },
  'Photoshop': {
    color: '#31A8FF',
    svg: (
      <svg viewBox="0 0 32 32" width="100%" height="100%"><rect width="32" height="32" rx="5" fill="#001E36"/><path fill="#31A8FF" d="M7 8.5v15h3v-5h2.5c2.5 0 4-1.5 4-4s-1.5-4-4-4zm3 3h2.5c1 0 1.5.6 1.5 1.5S13.5 14 12.5 14H10zm10.5-3c-2 0-3.5 1-3.5 3 0 1.5.8 2.5 2 3l1 .5c1 .5 1.5 1 1.5 1.8 0 1-.6 1.5-1.5 1.5-.8 0-1.5-.4-2-1l-1.5 1c.8 1.2 2 2 3.5 2 2 0 3.5-1.2 3.5-3.2 0-1.5-.8-2.5-2-3.2l-1-.5c-.8-.4-1.5-.8-1.5-1.5 0-.7.5-1.2 1.2-1.2.6 0 1.2.3 1.7.8l1.3-1.2c-.7-.8-1.8-1.3-2.7-1.3z"/></svg>
    )
  },
  'Illustrator': {
    color: '#FF9A00',
    svg: (
      <svg viewBox="0 0 32 32" width="100%" height="100%"><rect width="32" height="32" rx="5" fill="#330000"/><path fill="#FF9A00" d="M9 22.5h2.5L12.5 20h5l1 2.5H21L16.5 9.5h-3zm5-10l1.8 5H12.2zm10-4.5h-2v11.5h2z"/></svg>
    )
  },
  'Premiere': {
    color: '#EA77FF',
    svg: (
      <svg viewBox="0 0 32 32" width="100%" height="100%"><rect width="32" height="32" rx="5" fill="#00005B"/><path fill="#EA77FF" d="M7 9.5v13h3v-3.5h2c2.5 0 4.5-1.5 4.5-4.5S14.5 10 12 10H7zm3 3h2c1.2 0 1.8.8 1.8 1.8S13.2 16 12 16H10zm9.5-3h-3v13h3c4 0 6-2 6-6.5s-2-6.5-6-6.5zm0 10.5h-1V12h1c2.2 0 3.5 1.2 3.5 4s-1.3 4-3.5 4z"/></svg>
    )
  },
  'After Effects': {
    color: '#9999FF',
    svg: (
      <svg viewBox="0 0 32 32" width="100%" height="100%"><rect width="32" height="32" rx="5" fill="#00005B"/><path fill="#9999FF" d="M7 22.5h2.5L10.5 20h5l1 2.5H19L14.5 9.5h-3zm5-10l1.8 5H10.2zM20 9.5h7v2h-2.5v11h-2v-11H20z"/></svg>
    )
  },
  'CapCut': {
    color: '#FFFFFF',
    svg: (
      <svg viewBox="0 0 32 32" width="100%" height="100%"><rect width="32" height="32" rx="6" fill="#000"/><path fill="#fff" d="M16 6a10 10 0 1 0 0 20A10 10 0 0 0 16 6zm-2 5l8 5-8 5V11z"/></svg>
    )
  },
  'Canva': {
    color: '#00C4CC',
    svg: (
      <svg viewBox="0 0 32 32" width="100%" height="100%"><circle cx="16" cy="16" r="14" fill="#00C4CC"/><path fill="#fff" d="M16 8c-1.5 0-2.8.5-3.8 1.4-.5.4-.5 1.1 0 1.5s1.2.4 1.7 0c.6-.5 1.3-.8 2.1-.8 1.8 0 3.2 1.4 3.2 3.2 0 1.5-.8 2.7-2 3.2-.6.2-.9.9-.6 1.5.2.4.6.7 1.1.7.1 0 .3 0 .4-.1 1.8-.8 3.1-2.6 3.1-4.7 0-2.9-2.3-5-5.2-5zm0 8c-.8 0-1.5.3-2 .8-.4.4-1 .4-1.4 0l-1.4-1.4c-.4-.4-.4-1 0-1.4.8-.8 1.9-1.3 3.2-1.3.8 0 1.4.2 2 .6.4.3.5 1 .2 1.4-.3.3-.6.3-.6.3z"/></svg>
    )
  },
};

// Organic animation configs per icon index
const ICON_MOTION_PROFILES = [
  { y: [-7, 7, -7], x: [-3, 3, -3], duration: 6.2, delay: 0.1 },
  { y: [-4, 6, -4], rotate: [-8, 8, -8], duration: 7.8, delay: 0.4 },
  { scale: [0.96, 1.05, 0.96], y: [-8, 4, -8], duration: 8.5, delay: 0.7 },
  { x: [-8, 8, -8], y: [4, -6, 4], duration: 9.2, delay: 0.2 },
  { y: [-9, 9, -9], rotate: [6, -6, 6], duration: 6.8, delay: 0.9 },
  { scale: [0.98, 1.06, 0.98], x: [6, -6, 6], duration: 10.4, delay: 0.5 },
  { y: [-6, 8, -6], rotate: [-10, 10, -10], duration: 11.2, delay: 0.3 },
  { x: [-7, 7, -7], y: [-6, 6, -6], duration: 7.4, delay: 0.8 },
  { y: [-10, 5, -10], scale: [0.95, 1.04, 0.95], duration: 8.9, delay: 0.6 },
  { rotate: [-7, 7, -7], x: [5, -5, 5], duration: 9.8, delay: 0.15 },
  { y: [-8, 8, -8], x: [-5, 5, -5], duration: 6.5, delay: 0.35 },
];

// ─── Orbit Icon Component ───────────────────────────────────────────────────
interface OrbitIconProps {
  name: string;
  angle: number;
  radius: number;
  orbitDuration: number;
  index: number;
  isClockwise?: boolean;
  isOrbitPaused: boolean;
  isContainerHovered: boolean;
  mousePos: { x: number; y: number };
  onHoverStart: () => void;
  onHoverEnd: () => void;
  size?: number;
}

function OrbitIcon({
  name,
  angle,
  radius,
  orbitDuration,
  index,
  isClockwise = true,
  isOrbitPaused,
  isContainerHovered,
  mousePos,
  onHoverStart,
  onHoverEnd,
  size = 46
}: OrbitIconProps) {
  const [isSelfHovered, setIsSelfHovered] = useState(false);
  const techData = TechIcons[name];
  const motionProfile = ICON_MOTION_PROFILES[index % ICON_MOTION_PROFILES.length];

  const handleMouseEnter = () => {
    setIsSelfHovered(true);
    onHoverStart();
  };

  const handleMouseLeave = () => {
    setIsSelfHovered(false);
    onHoverEnd();
  };

  const animName = isClockwise ? 'hero-orbit-cw' : 'hero-orbit-ccw';
  const counterAnimName = isClockwise ? 'hero-orbit-ccw' : 'hero-orbit-cw';

  // Proximity magnetic reaction offsets
  const magX = isContainerHovered ? mousePos.x * 0.8 : 0;
  const magY = isContainerHovered ? mousePos.y * 0.8 : 0;

  return (
    <div
      className="absolute top-1/2 left-1/2 pointer-events-none"
      style={{
        width: 0,
        height: 0,
        animation: `${animName} ${orbitDuration}s linear infinite`,
        animationPlayState: isOrbitPaused ? 'paused' : 'running',
        willChange: 'transform',
      }}
    >
      {/* Position item on the orbit radius */}
      <div
        className="absolute pointer-events-auto"
        style={{
          transform: `rotate(${angle}deg) translate(${radius}px)`,
          marginLeft: -size / 2,
          marginTop: -size / 2,
          width: size,
          height: size,
        }}
      >
        {/* Counter-rotate content so icon stays upright */}
        <div
          style={{
            width: size,
            height: size,
            animation: `${counterAnimName} ${orbitDuration}s linear infinite`,
            animationPlayState: isOrbitPaused ? 'paused' : 'running',
            transform: `rotate(${-angle}deg)`,
            willChange: 'transform',
          }}
          className="relative cursor-pointer"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Magnetic Reaction Wrapper */}
          <motion.div
            animate={{ x: magX, y: magY }}
            transition={{ type: 'spring', stiffness: 250, damping: 20 }}
            className="w-full h-full"
          >
            {/* Organic Lifelike Floating/Swaying Motion Wrapper */}
            <motion.div
              animate={{
                y: motionProfile.y || 0,
                x: motionProfile.x || 0,
                rotate: motionProfile.rotate || 0,
                scale: isSelfHovered
                  ? 1.25
                  : isContainerHovered
                  ? 1.08
                  : (motionProfile.scale ? motionProfile.scale[0] : 1),
              }}
              transition={{
                y: { duration: motionProfile.duration, repeat: Infinity, ease: 'easeInOut', delay: motionProfile.delay },
                x: { duration: motionProfile.duration * 1.1, repeat: Infinity, ease: 'easeInOut', delay: motionProfile.delay },
                rotate: { duration: motionProfile.duration * 1.2, repeat: Infinity, ease: 'easeInOut' },
                scale: { type: 'spring', stiffness: 350, damping: 22 },
              }}
              className="w-full h-full"
            >
              {/* Icon Card */}
              <motion.div
                className="w-full h-full rounded-xl bg-[#0B0B0B] border border-white/10 flex items-center justify-center overflow-hidden transition-all duration-300 select-none"
                animate={{
                  boxShadow: isSelfHovered
                    ? `0 0 24px rgba(255,255,255,0.85), 0 0 45px ${techData?.color || '#22D3EE'}aa, inset 0 0 12px rgba(255,255,255,0.3)`
                    : isContainerHovered
                    ? `0 0 16px ${techData?.color || '#22D3EE'}66, 0 0 30px rgba(34,211,238,0.25)`
                    : `0 0 8px ${techData?.color || '#22D3EE'}20`,
                  borderColor: isSelfHovered
                    ? 'rgba(255,255,255,0.5)'
                    : isContainerHovered
                    ? 'rgba(34,211,238,0.3)'
                    : 'rgba(255,255,255,0.08)',
                  backgroundColor: isSelfHovered ? '#141414' : '#0B0B0B',
                }}
                transition={{ type: 'spring', stiffness: 350, damping: 22 }}
              >
                <div className="w-3/4 h-3/4 flex items-center justify-center">
                  {techData?.svg}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Tooltip */}
          <AnimatePresence>
            {isSelfHovered && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.95 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
                className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap px-2.5 py-1 rounded-md bg-[#161616] border border-white/15 text-[11px] font-semibold text-white z-50 pointer-events-none shadow-2xl backdrop-blur-md"
                style={{
                  boxShadow: `0 8px 20px rgba(0,0,0,0.8), 0 0 15px ${techData?.color || '#22D3EE'}40`
                }}
              >
                {name}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// ─── Main Hero Section ────────────────────────────────────────────────────────
export default function HeroSection() {
  const { t } = useTranslation();
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const [isContainerHovered, setIsContainerHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const benefits = [
    {
      icon: '💬',
      title: t('hero.benefit1_title'),
      desc: t('hero.benefit1_desc'),
    },
    {
      icon: '💰',
      title: t('hero.benefit2_title'),
      desc: t('hero.benefit2_desc'),
    },
    {
      icon: '🎨',
      title: t('hero.benefit3_title'),
      desc: t('hero.benefit3_desc'),
    },
    {
      icon: '🤝',
      title: t('hero.benefit4_title'),
      desc: t('hero.benefit4_desc'),
    },
  ];

  // Evenly spread orbit rings (Radius ~25-35% closer: Inner 195px, Outer 285px)
  const innerOrbit = [
    { name: 'React', angle: 0 },
    { name: 'Next.js', angle: 51.4 },
    { name: 'Tailwind', angle: 102.8 },
    { name: 'JavaScript', angle: 154.2 },
    { name: 'HTML5', angle: 205.7 },
    { name: 'CSS3', angle: 257.1 },
    { name: 'Figma', angle: 308.5 },
  ];

  const outerOrbit = [
    { name: 'Laravel', angle: 0 },
    { name: 'PHP', angle: 32.7 },
    { name: 'Python', angle: 65.4 },
    { name: 'MySQL', angle: 98.1 },
    { name: 'Kotlin', angle: 130.9 },
    { name: 'Photoshop', angle: 163.6 },
    { name: 'Illustrator', angle: 196.3 },
    { name: 'Premiere', angle: 229.1 },
    { name: 'After Effects', angle: 261.8 },
    { name: 'CapCut', angle: 294.5 },
    { name: 'Canva', angle: 327.2 },
  ];

  const isAnyHovered = hoveredTech !== null;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    setMousePos({
      x: (e.clientX - centerX) / 14,
      y: (e.clientY - centerY) / 14,
    });
  };

  const handleMouseEnterContainer = () => {
    setIsContainerHovered(true);
  };

  const handleMouseLeaveContainer = () => {
    setIsContainerHovered(false);
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-[#050505]">
      {/* ── Custom Keyframe Animations & Energy Flow Styles ─────── */}
      <style>{`
        @keyframes hero-orbit-cw {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes hero-orbit-ccw {
          0% { transform: rotate(360deg); }
          100% { transform: rotate(-360deg); }
        }
        @keyframes hero-particle-float {
          0%, 100% { transform: translate3d(0, 0, 0); opacity: 0.2; }
          50% { transform: translate3d(18px, -35px, 0); opacity: 0.6; }
        }
        @keyframes hero-glow-pulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.08); }
        }
        @keyframes hero-ring-energy {
          0% { border-color: rgba(34,211,238,0.06); box-shadow: 0 0 10px rgba(34,211,238,0.05); }
          50% { border-color: rgba(34,211,238,0.22); box-shadow: 0 0 25px rgba(34,211,238,0.18); }
          100% { border-color: rgba(34,211,238,0.06); box-shadow: 0 0 10px rgba(34,211,238,0.05); }
        }
      `}</style>

      {/* ── Background Depth & Particles ───────────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft cyan gradient lighting behind hero */}
        <div
          className="absolute -top-1/4 left-1/2 -translate-x-1/2 w-[80vw] h-[80vw] rounded-full opacity-25"
          style={{
            background: 'radial-gradient(circle, rgba(34,211,238,0.08) 0%, rgba(255,255,255,0.03) 35%, transparent 70%)',
            filter: 'blur(90px)',
          }}
        />

        {/* Faint grid background */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)
            `,
            backgroundSize: '72px 72px',
          }}
        />

        {/* Subtle floating particles */}
        {[...Array(16)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/20 pointer-events-none"
            style={{
              width: Math.random() * 3 + 1.5,
              height: Math.random() * 3 + 1.5,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `hero-particle-float ${Math.random() * 8 + 6}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <div className="container relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0 items-center">

          {/* ── LEFT: Text Column ─────────────────────────── */}
          <div className="lg:col-span-5 flex flex-col items-start text-left order-2 lg:order-1">

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.05, ease: EASE }}
              className="font-heading font-extrabold text-white leading-[1.06] mb-6 tracking-tight"
              style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)' }}
            >
              {t('hero.headline1')}<br />
              <span
                style={{
                  background: 'linear-gradient(135deg, #ffffff 0%, #B5B5B5 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {t('hero.headline2')}
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
              className="text-[#B5B5B5] text-sm sm:text-base max-w-[480px] leading-relaxed mb-9 font-sans"
            >
              {t('hero.sub')}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
              className="flex flex-wrap gap-4 mb-10"
            >
              {/* Primary CTA */}
              <motion.button
                onClick={() => window.dispatchEvent(new CustomEvent('open-whatsapp-modal'))}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-[#050505] cursor-pointer"
                style={{
                  background: '#22D3EE',
                  boxShadow: '0 0 20px rgba(34,211,238,0.25)',
                }}
              >
                {t('hero.cta_primary')}
                <ArrowRight className="w-4 h-4" />
              </motion.button>

              {/* Secondary CTA */}
              <motion.a
                href="#portfolio"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-white transition-all duration-300"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.12)',
                }}
              >
                {t('hero.cta_secondary')}
                <ChevronRight className="w-4 h-4" />
              </motion.a>
            </motion.div>

            {/* Premium Benefits Grid */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.42, ease: EASE }}
              className="grid grid-cols-2 gap-3 w-full"
            >
              {benefits.map((benefit, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{
                    y: -6,
                    boxShadow: '0 8px 32px rgba(34,211,238,0.22), 0 0 0 1px rgba(34,211,238,0.18)',
                  }}
                  transition={{
                    default: { duration: 0.45, delay: 0.5 + i * 0.09, ease: EASE },
                    y: { type: 'spring', stiffness: 300, damping: 22 },
                    boxShadow: { duration: 0.3, ease: 'easeOut' },
                  }}
                  className="group flex flex-col gap-2.5 p-4 rounded-2xl cursor-default"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.09)',
                  }}
                >
                  <div className="flex items-center gap-2.5">
                    <motion.span
                      className="text-2xl leading-none"
                      whileHover={{ scale: 1.22 }}
                      transition={{ duration: 0.28, ease: 'easeOut' }}
                      style={{ display: 'inline-block' }}
                    >
                      {benefit.icon}
                    </motion.span>
                    <span
                      className="font-semibold leading-tight tracking-tight group-hover:text-[#22D3EE] transition-colors duration-300"
                      style={{ fontSize: '15px', color: 'rgba(255,255,255,0.95)' }}
                    >
                      {benefit.title}
                    </span>
                  </div>
                  <p
                    className="font-sans group-hover:text-white/80 transition-colors duration-300"
                    style={{
                      fontSize: '13px',
                      lineHeight: 1.7,
                      color: 'rgba(255,255,255,0.55)',
                    }}
                  >
                    {benefit.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT: Logo + Orbit Column ──────────────── */}
          <div
            className="lg:col-span-7 flex items-center justify-center relative order-1 lg:order-2"
            onMouseEnter={handleMouseEnterContainer}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeaveContainer}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{
                opacity: 1,
                scale: 1,
                x: mousePos.x * 0.8,
                y: mousePos.y * 0.8,
              }}
              transition={{
                opacity: { duration: 1, delay: 0.2, ease: EASE },
                scale: { duration: 1, delay: 0.2, ease: EASE },
                x: { type: 'spring', stiffness: 140, damping: 24 },
                y: { type: 'spring', stiffness: 140, damping: 24 },
              }}
              className="relative flex items-center justify-center scale-[0.7] sm:scale-[0.85] md:scale-[0.95] lg:scale-100 transition-transform duration-300"
              style={{ width: 640, height: 640 }}
            >
              {/* Animated Glowing Outer orbit guideline ring */}
              <div
                className="absolute rounded-full border pointer-events-none"
                style={{
                  width: 570,
                  height: 570,
                  animation: 'hero-ring-energy 8s ease-in-out infinite',
                }}
              />
              {/* Animated Glowing Inner orbit guideline ring */}
              <div
                className="absolute rounded-full border border-dashed pointer-events-none"
                style={{
                  width: 390,
                  height: 390,
                  animation: 'hero-ring-energy 6s ease-in-out infinite 1s',
                }}
              />

              {/* ── Soft Lighting & Glow behind Logo ── */}
              <div
                className="absolute w-[340px] h-[340px] rounded-full pointer-events-none"
                style={{
                  background: 'radial-gradient(circle, rgba(255,255,255,0.14) 0%, rgba(34,211,238,0.08) 35%, transparent 70%)',
                  filter: 'blur(30px)',
                  animation: 'hero-glow-pulse 6s ease-in-out infinite',
                }}
              />

              {/* ── Inner Orbit Ring (7 icons, Clockwise, 55s) ── */}
              {innerOrbit.map(({ name, angle }, idx) => (
                <OrbitIcon
                  key={name}
                  name={name}
                  angle={angle}
                  radius={195}
                  orbitDuration={55}
                  index={idx}
                  isClockwise={true}
                  isOrbitPaused={isAnyHovered}
                  isContainerHovered={isContainerHovered}
                  mousePos={mousePos}
                  onHoverStart={() => setHoveredTech(name)}
                  onHoverEnd={() => setHoveredTech(null)}
                  size={44}
                />
              ))}

              {/* ── Outer Orbit Ring (11 icons, Counter-Clockwise, 85s) ── */}
              {outerOrbit.map(({ name, angle }, idx) => (
                <OrbitIcon
                  key={name}
                  name={name}
                  angle={angle}
                  radius={285}
                  orbitDuration={85}
                  index={idx + 7}
                  isClockwise={false}
                  isOrbitPaused={isAnyHovered}
                  isContainerHovered={isContainerHovered}
                  mousePos={mousePos}
                  onHoverStart={() => setHoveredTech(name)}
                  onHoverEnd={() => setHoveredTech(null)}
                  size={44}
                />
              ))}

              {/* ── Central Main Logo (Scaled ~1.5x smaller as requested) ── */}
              <motion.div
                animate={{
                  scale: [1, 1.025, 1],
                  y: [0, -5, 0],
                  x: mousePos.x * 0.4,
                }}
                transition={{
                  scale: { duration: 5.5, repeat: Infinity, ease: 'easeInOut' },
                  y: { duration: 5.5, repeat: Infinity, ease: 'easeInOut' },
                  x: { type: 'spring', stiffness: 140, damping: 24 },
                }}
                className="relative z-20 flex flex-col items-center justify-center pointer-events-none select-none"
              >
                <img
                  src="/assets/images/logo-left-brain-ideas.svg"
                  alt="Left Brain Ideas"
                  draggable={false}
                  className="select-none object-contain"
                  style={{
                    width: 'clamp(240px, 26vw, 350px)',
                    height: 'auto',
                    display: 'block',
                    filter: 'drop-shadow(0 0 30px rgba(255,255,255,0.22)) drop-shadow(0 0 60px rgba(34,211,238,0.18))',
                  }}
                />
              </motion.div>

            </motion.div>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-35 pointer-events-none select-none">
        <div className="w-5 h-8 rounded-full flex justify-center pt-1.5" style={{ border: '1px solid rgba(255,255,255,0.2)' }}>
          <motion.div
            className="w-1 h-1.5 rounded-full"
            style={{ background: '#22D3EE' }}
            animate={{ y: [0, 10, 0], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
        <span className="text-[10px] font-medium text-[#B5B5B5] tracking-widest uppercase">Scroll</span>
      </div>
    </section>
  );
}
