/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useBooking } from '../../context/BookingContext';
import { Home, Sparkles, Phone } from 'lucide-react';

interface TabItem {
  id: 'home' | 'services' | 'contact';
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const TABS: TabItem[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'services', label: 'Services', icon: Sparkles },
  { id: 'contact', label: 'Contact Us', icon: Phone },
];

export const MobileBottomBar: React.FC = () => {
  const { activePage, setActivePage } = useBooking();
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragHoverIndex, setDragHoverIndex] = useState<number | null>(null);

  // Compute active tab index
  const activeIndex = TABS.findIndex((t) => t.id === activePage);
  const effectiveIndex = isDragging && dragHoverIndex !== null ? dragHoverIndex : (activeIndex === -1 ? 0 : activeIndex);

  const getIndexFromPointer = useCallback((clientX: number): number => {
    if (!containerRef.current) return 0;
    const rect = containerRef.current.getBoundingClientRect();
    const relativeX = clientX - rect.left;
    const segmentWidth = rect.width / TABS.length;
    const index = Math.floor(relativeX / segmentWidth);
    return Math.max(0, Math.min(TABS.length - 1, index));
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Only engage drag tracking on primary pointer
    if (e.button !== 0) return;
    setIsDragging(true);
    const index = getIndexFromPointer(e.clientX);
    setDragHoverIndex(index);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const index = getIndexFromPointer(e.clientX);
    if (index !== dragHoverIndex) {
      setDragHoverIndex(index);
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // Ignore if pointer capture already released
    }
    const finalIndex = getIndexFromPointer(e.clientX);
    setIsDragging(false);
    setDragHoverIndex(null);

    const targetTab = TABS[finalIndex];
    if (targetTab && targetTab.id !== activePage) {
      setActivePage(targetTab.id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePointerCancel = () => {
    setIsDragging(false);
    setDragHoverIndex(null);
  };

  const handleTabClick = (tabId: 'home' | 'services' | 'contact') => {
    if (activePage !== tabId) {
      setActivePage(tabId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="md:hidden fixed bottom-4 inset-x-4 z-40 flex justify-center pointer-events-none select-none">
      <nav
        ref={containerRef}
        aria-label="Mobile Bottom Navigation Dock"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        className="pointer-events-auto relative w-full max-w-[340px] h-14 rounded-full bg-white/85 backdrop-blur-2xl border border-stone-200/80 shadow-[0_8px_32px_rgba(0,0,0,0.14)] p-1 flex items-center justify-between cursor-grab active:cursor-grabbing touch-none"
      >
        {/* Rubbery Spring Floating Active Pill Indicator */}
        <motion.div
          className="absolute top-1 bottom-1 rounded-full bg-rose-50/90 border border-rose-200/90 shadow-2xs pointer-events-none"
          animate={{
            left: `${effectiveIndex * (100 / TABS.length)}%`,
            width: `${100 / TABS.length}%`,
          }}
          transition={
            shouldReduceMotion
              ? { duration: 0.15 }
              : {
                  type: 'spring',
                  stiffness: 420,
                  damping: 26,
                  mass: 0.7,
                }
          }
        />

        {/* Tab Buttons */}
        {TABS.map((tab, idx) => {
          const Icon = tab.icon;
          const isSelected = effectiveIndex === idx;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleTabClick(tab.id)}
              className="relative z-10 flex-1 h-full rounded-full flex flex-col items-center justify-center cursor-pointer focus:outline-none transition-transform active:scale-95"
            >
              <motion.div
                animate={{
                  scale: isSelected ? 1.08 : 1,
                  y: isSelected ? -1 : 0,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 450,
                  damping: 24,
                }}
                className={`flex flex-col items-center justify-center transition-colors duration-200 ${
                  isSelected ? 'text-[#D61C4E] font-bold' : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                <Icon
                  className={`w-4 h-4 sm:w-4.5 sm:h-4.5 ${
                    isSelected ? 'stroke-[2.5] text-[#D61C4E]' : 'stroke-[1.75] text-stone-500'
                  }`}
                />
                <span className="text-[10px] sm:text-[11px] tracking-tight leading-none mt-1">
                  {tab.label}
                </span>
              </motion.div>
            </button>
          );
        })}
      </nav>
    </div>
  );
};
