import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'cyan' | 'purple' | 'muted';
  className?: string;
}

export default function Badge({
  children,
  variant = 'muted',
  className = ''
}: BadgeProps) {
  const baseClasses = "inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border text-[10px] font-heading font-semibold uppercase tracking-wider select-none transition-all duration-300";
  
  const variantClasses = {
    cyan: "bg-[#38BDF8]/5 border-[#38BDF8]/15 text-[#38BDF8] shadow-[0_2px_10px_rgba(56,189,248,0.05)]",
    purple: "bg-[#06B6D4]/5 border-[#06B6D4]/15 text-[#06B6D4] shadow-[0_2px_10px_rgba(6,182,212,0.05)]",
    muted: "bg-white/2 border-white/5 text-text-secondary"
  };

  return (
    <span className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {variant !== 'muted' && (
        <span 
          className={`
            w-1.5 h-1.5 rounded-full animate-pulse
            ${variant === 'cyan' ? 'bg-[#38BDF8] shadow-[0_0_8px_#38BDF8]' : 'bg-[#06B6D4] shadow-[0_0_8px_#06B6D4]'}
          `}
        />
      )}
      {children}
    </span>
  );
}
