import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

export const GoldButton = ({ 
  children, 
  primary = false, 
  icon: Icon,
  className = "",
  onClick
}: { 
  children: ReactNode, 
  primary?: boolean, 
  icon?: any,
  className?: string,
  onClick?: () => void
}) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    animate={primary ? {
      boxShadow: [
        "0 0 20px rgba(196, 160, 82, 0.3)",
        "0 0 40px rgba(196, 160, 82, 0.5)",
        "0 0 20px rgba(196, 160, 82, 0.3)"
      ]
    } : {}}
    transition={{ duration: 0.3 }}
    onClick={onClick}
    className={`
      relative group flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer overflow-hidden
      ${primary 
        ? "gold-gradient text-black px-4 py-2 md:px-6 md:py-2.5 rounded-lg font-black text-[10px] md:text-xs tracking-[0.2em]" 
        : "gold-border text-gold-100 hover:bg-gold-500/10 px-4 py-2 md:px-6 md:py-2.5 rounded-lg font-bold text-[10px] md:text-xs tracking-[0.1em]"
      }
      ${className}
    `}
  >
    {/* Shine effect */}
    {primary && (
      <motion.div
        animate={{
          x: ['-150%', '150%'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
          repeatDelay: 2
        }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-20deg] pointer-events-none"
      />
    )}

    {Icon && <Icon className={`${primary ? 'w-4 h-4 md:w-5 md:h-5' : 'w-3.5 h-3.5 md:w-4 md:h-4'} stroke-[2.5] relative z-10`} />}
    <span className="relative z-10 uppercase">{children}</span>
  </motion.button>
);
