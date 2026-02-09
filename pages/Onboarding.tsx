
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedButton } from '../components/AnimatedButton';
import { ShieldCheck, Truck, RotateCcw } from 'lucide-react';

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

  const next = () => {
    if (step < STEPS.length - 1) setStep(step + 1);
    else onComplete();
  };

  return (
    <div className="fixed inset-0 bg-white z-[90] flex flex-col md:flex-row">
      <AnimatePresence mode="wait">
        <motion.div 
          key={`img-${step}`}
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.6 }}
          className="md:w-1/2 h-1/2 md:h-full relative"
        >
          <img src={STEPS[step].img} className="w-full h-full object-cover" alt="onboarding" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:hidden" />
        </motion.div>
      </AnimatePresence>

      <div className="md:w-1/2 flex flex-col justify-center px-8 md:px-24 bg-white relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={`content-${step}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="flex flex-col gap-6"
          >
            <div className="mb-4">{STEPS[step].icon}</div>
            <h2 className="text-4xl md:text-5xl font-black text-charcoal uppercase leading-tight">
              {STEPS[step].title}
            </h2>
            <p className="text-charcoal/60 text-lg md:text-xl leading-relaxed">
              {STEPS[step].desc}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="mt-12 flex items-center justify-between">
          <div className="flex gap-2">
            {STEPS.map((_, i) => (
              <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === step ? 'w-8 bg-primary' : 'w-2 bg-border'}`} />
            ))}
          </div>
          <AnimatedButton onClick={next} variant="primary">
            {step === STEPS.length - 1 ? "Start Shopping" : "Continue"}
          </AnimatedButton>
        </div>
      </div>
    </div>
  );
};
