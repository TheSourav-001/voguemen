
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

export const Splash: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-white z-[100] flex items-center justify-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, y: -50 }}
        className="text-center"
      >
        <motion.h1 
          className="text-5xl md:text-7xl font-black tracking-tighter text-charcoal"
          initial={{ letterSpacing: "0.2em" }}
          animate={{ letterSpacing: "-0.05em" }}
          transition={{ duration: 1.5, ease: "circOut" }}
        >
          VOGUE<span className="text-primary">MEN</span>
        </motion.h1>
        <motion.div 
          className="h-1 bg-primary mt-4 mx-auto"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ delay: 0.5, duration: 1 }}
        />
        <motion.p 
          className="mt-4 text-charcoal/40 font-bold uppercase tracking-[0.3em] text-[10px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          Premium Everyday Essentials
        </motion.p>
      </motion.div>
    </div>
  );
};
