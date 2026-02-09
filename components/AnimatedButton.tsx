
import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

// Use HTMLMotionProps instead of React.ButtonHTMLAttributes to ensure compatibility 
// with motion.button specific props and event handler signatures (e.g. onDrag).
interface Props extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
}

export const AnimatedButton: React.FC<Props> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  ...props 
}) => {
  const variants = {
    primary: 'bg-primary text-white hover:bg-secondary font-bold shadow-sm',
    secondary: 'bg-charcoal text-white hover:bg-black font-bold shadow-sm',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold'
  };

  return (
    /* Spreading props onto motion.button now aligns with expected types from framer-motion */
    <motion.button
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      className={`
        relative px-6 py-2.5 rounded-md transition-all duration-200 
        text-sm font-heading tracking-wide
        ${variants[variant]} 
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.button>
  );
};
