import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface ButtonProps {
  children: React.ReactNode;
  to?: string;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export default function Button({
  children,
  to,
  href,
  onClick,
  variant = 'primary',
  className = '',
  disabled = false,
  type = 'button'
}: ButtonProps) {
  const baseClasses = "relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-sans font-semibold text-sm cursor-pointer select-none transition-all duration-300 outline-none";
  
  const variantClasses = {
    primary: "bg-[#22D3EE] text-[#050505] hover:bg-white hover:text-black hover:shadow-[0_0_20px_rgba(34,211,238,0.35)] transition-all",
    secondary: "bg-white/5 border border-white/8 text-[#FFFFFF] hover:bg-white/10 hover:border-white/15",
    outline: "bg-transparent border border-white/10 text-[#FFFFFF] hover:border-white/25 hover:bg-white/5 hover:shadow-[0_0_15px_rgba(255,255,255,0.05)]"
  };

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${className} ${disabled ? 'opacity-50 pointer-events-none' : ''}`;

  const buttonContent = (
    <>
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </>
  );

  const motionProps = {
    whileHover: { y: -2, scale: 1.02 },
    whileTap: { scale: 0.96 },
    transition: { type: 'spring', stiffness: 350, damping: 20 } as any
  };

  if (to) {
    return (
      <motion.div {...motionProps} className="inline-block">
        <Link to={to} className={combinedClasses}>
          {buttonContent}
        </Link>
      </motion.div>
    );
  }

  if (href) {
    return (
      <motion.div {...motionProps} className="inline-block">
        <a href={href} className={combinedClasses} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
          {buttonContent}
        </a>
      </motion.div>
    );
  }

  return (
    <motion.button
      {...motionProps}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedClasses}
    >
      {buttonContent}
    </motion.button>
  );
}
