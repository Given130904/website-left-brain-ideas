import React from 'react';
import { motion } from 'framer-motion';
import { useMouseGlow } from '../../hooks/useMouseGlow';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'cyan' | 'purple' | 'white';
  onClick?: () => void;
  interactive?: boolean;
}

export default function Card({
  children,
  className = '',
  glowColor = 'cyan',
  onClick,
  interactive = true
}: CardProps) {
  const cardRef = useMouseGlow<HTMLDivElement>();

  const glowGradients = {
    cyan: 'rgba(0, 212, 255, 0.12)',
    purple: 'rgba(124, 58, 237, 0.12)',
    white: 'rgba(255, 255, 255, 0.08)'
  };

  const activeBorderColor = {
    cyan: 'hover:border-[#00D4FF]/20',
    purple: 'hover:border-[#7C3AED]/20',
    white: 'hover:border-white/20'
  };

  return (
    <motion.div
      ref={cardRef}
      onClick={onClick}
      className={`
        relative overflow-hidden rounded-2xl border border-white/5 
        bg-[#0B1220]/45 backdrop-blur-2xl p-8 
        transition-all duration-500 ease-out 
        group
        ${interactive ? `cursor-pointer hover:y-[-4px] ${activeBorderColor[glowColor]}` : ''}
        ${className}
      `}
      whileHover={interactive ? { y: -4 } : undefined}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Background spotlights tracking */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
        style={{
          background: `radial-gradient(400px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), ${glowGradients[glowColor]}, transparent 60%)`
        }}
      />
      
      {/* Card border spotlight overlay */}
      <div 
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
        style={{
          padding: '1px',
          background: `radial-gradient(450px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(255, 255, 255, 0.15), transparent 50%)`,
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor'
        }}
      />

      <div className="relative z-20">
        {children}
      </div>
    </motion.div>
  );
}
