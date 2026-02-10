
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedButton } from '../components/AnimatedButton';
import { ShieldCheck, Truck, RotateCcw, ArrowRight } from 'lucide-react';

const STEPS = [
  {
    title: "Premium Craftsmanship",
    desc: "Every thread is selected for durability and comfort. 100% Organic Bangladeshi Cotton.",
    icon: <ShieldCheck size={64} className="text-primary" />,
    img: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=1470"
  },
  {
    title: "Lightning Fast Delivery",
    desc: "Get your essentials delivered to your doorstep within 24-48 hours across the nation.",
    icon: <Truck size={64} className="text-primary" />,
    img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1470"
  },
  {
    title: "Easy 7-Day Returns",
    desc: "Not the perfect fit? No worries. Our hassle-free return policy has you covered.",
    icon: <RotateCcw size={64} className="text-primary" />,
    img: "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?auto=format&fit=crop&q=80&w=1470"
  }
];

export const Onboarding: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [step, setStep] = useState(0);

  const handleNext = () => {
    if (step < STEPS.length - 1) setStep(step + 1);
    else onComplete();
  };

  return (
    <div className="fixed inset-0 bg-white z-[90] flex flex-col md:flex-row">
      {/* Background Image */}
      <div className="absolute top-0 left-0 w-full h-2/5 md:h-full md:w-1/2">
        <AnimatePresence mode="wait">
          <motion.img
            key={step}
            src={STEPS[step].img}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            className="w-full h-full object-cover"
            alt="Onboarding background"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Content */}
      <div className="absolute bottom-0 right-0 w-full h-3/5 md:h-full md:w-1/2 bg-white flex flex-col justify-center px-8 md:px-24 py-12 md:py-0">
        <div className="max-w-md mx-auto md:mx-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] md:text-xs block mb-4 md:mb-6">
                Step 0{step + 1}
              </span>
              <h1 className="text-3xl md:text-6xl font-black text-charcoal mb-4 md:mb-8 uppercase tracking-tighter leading-tight">
                {STEPS[step].title}
              </h1>
              <p className="text-charcoal/60 text-sm md:text-lg font-medium leading-relaxed mb-8 md:mb-12">
                {STEPS[step].desc}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-between">
            <div className="flex gap-2 md:gap-3">
              {STEPS.map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 md:h-2 rounded-full transition-all duration-300 ${i === step ? 'w-8 md:w-12 bg-primary' : 'w-2 md:w-3 bg-offwhite'}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="bg-charcoal text-white p-4 md:p-6 rounded-2xl hover:bg-primary transition-all group"
            >
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
