import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';

export const MagneticCursor: React.FC = () => {
    const [isHovering, setIsHovering] = useState(false);
    const [cursorText, setCursorText] = useState('');

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 200 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX - 16);
            mouseY.set(e.clientY - 16);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const interactive = target.closest('button, a, .group, [role="button"]');
            setIsHovering(!!interactive);

            const group = target.closest('.group');
            setCursorText(group ? 'VIEW' : '');
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, [mouseX, mouseY]);

    return (
        <motion.div
            className="fixed top-0 left-0 w-8 h-8 rounded-full border border-primary pointer-events-none z-[9999] hidden lg:flex items-center justify-center mix-blend-difference"
            style={{
                x: cursorX,
                y: cursorY,
                scale: isHovering ? 2.5 : 1,
                backgroundColor: isHovering ? 'rgba(0, 176, 255, 0.1)' : 'transparent'
            }}
        >
            <AnimatePresence>
                {isHovering && cursorText && (
                    <motion.span
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        className="text-[4px] font-black text-white tracking-widest text-center"
                    >
                        {cursorText}
                    </motion.span>
                )}
            </AnimatePresence>
        </motion.div>
    );
};
