/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface SplashScreenProps {
  onComplete?: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    // Only display splash on initial mount
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {isVisible && (
        <motion.div
          key="splash-screen"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: {
              duration: shouldReduceMotion ? 0.3 : 0.8,
              ease: 'easeOut',
            },
          }}
          className="fixed inset-0 z-[70] bg-[#0E0E10] flex flex-col items-center justify-center select-none overflow-hidden"
          style={{ willChange: 'opacity' }}
        >
          {/* Subtle Ambient Radial Glow */}
          <motion.div
            animate={
              shouldReduceMotion
                ? { opacity: 0.4 }
                : {
                    scale: [1, 1.25, 1],
                    opacity: [0.25, 0.5, 0.25],
                  }
            }
            transition={{
              duration: 2.4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute w-[360px] sm:w-[500px] h-[360px] sm:h-[500px] rounded-full bg-radial from-[#D61C4E]/25 via-rose-500/10 to-transparent blur-3xl pointer-events-none"
          />

          {/* Central Logo & Emblem Sequence */}
          <div className="relative z-10 flex flex-col items-center text-center px-6">
            {/* Glowing Icon Frame */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 0 } : { scale: 0.85, opacity: 0 }}
              animate={
                shouldReduceMotion
                  ? { opacity: 1 }
                  : {
                      scale: 1,
                      opacity: 1,
                      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
                    }
              }
              className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-gradient-to-br from-stone-900 to-stone-950 border border-stone-800/80 shadow-2xl flex items-center justify-center mb-6"
            >
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-[#D61C4E]/20 to-transparent" />
              <motion.div
                animate={
                  shouldReduceMotion
                    ? {}
                    : {
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.08, 1],
                      }
                }
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-[#D61C4E]" />
              </motion.div>
            </motion.div>

            {/* Brand Title */}
            <motion.div
              initial={{ y: shouldReduceMotion ? 0 : 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                delay: 0.2,
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1] as const,
              }}
              className="space-y-1.5"
            >
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-rose-400 font-bold block">
                Ajmer · Luxury Experience
              </span>
              <h1 className="font-serif text-2xl sm:text-4xl font-extrabold tracking-tight text-white uppercase">
                PERFECT SHINE
              </h1>
              <p className="text-xs sm:text-sm font-sans tracking-[0.25em] text-stone-400 uppercase font-medium">
                UNISEX SALON
              </p>
            </motion.div>

            {/* Micro Progress Bar */}
            <div className="mt-8 w-36 h-[2px] bg-stone-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ scaleX: 0, transformOrigin: 'left' }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.1, ease: 'easeInOut' }}
                className="w-full h-full bg-gradient-to-r from-rose-500 via-[#D61C4E] to-amber-300"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
