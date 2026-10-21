/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useEffect, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Award } from 'lucide-react';
import stylistWoman from '../../assets/images/indian_hair_stylist_woman_1790870482330.jpg';
import stylistMakeup from '../../assets/images/indian_makeup_artist_woman_1790870501209.jpg';
import stylistBarber from '../../assets/images/indian_barber_man_1790870525649.jpg';
import stylistColorist from '../../assets/images/indian_colorist_artist_1790870541825.jpg';

interface Stylist {
  id: string;
  name: string;
  position: string;
  imageUrl: string;
}

const STYLISTS: Stylist[] = [
  {
    id: 'st-owner',
    name: 'Virendra Sharma',
    position: 'Founder & L’Oréal Award Winner',
    imageUrl: 'https://i.postimg.cc/FzhxCdNw/owner-receiving-award-from-loreal.jpg',
  },
  {
    id: 'st-1',
    name: 'Sneha Rathore',
    position: 'Bridal & Luxury Makeup Director',
    imageUrl: stylistMakeup,
  },
  {
    id: 'st-2',
    name: 'Rajiv Mehta',
    position: 'Top Stylist & Rebonding Expert',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 'st-3',
    name: 'Pooja Sen',
    position: 'Senior Hair Stylist & Cuts',
    imageUrl: stylistWoman,
  },
  {
    id: 'st-4',
    name: 'Rohit Verma',
    position: 'Executive Barber & Fade Specialist',
    imageUrl: stylistBarber,
  },
  {
    id: 'st-5',
    name: 'Neha Sharma',
    position: 'Keratin & Scalp Treatment Artist',
    imageUrl: stylistColorist,
  },
];

export const MeetOurStylists: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isInteractingRef = useRef<boolean>(false);
  const interactionTimeoutRef = useRef<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  // Continuous sliding without pause on hover
  useEffect(() => {
    const el = scrollRef.current;
    if (!el || shouldReduceMotion) return;

    let animationFrameId: number;
    const speed = 0.75;

    const step = () => {
      if (el && !isInteractingRef.current) {
        el.scrollLeft += speed;
        // Seamless loop wrap when past middle third
        if (el.scrollLeft >= (el.scrollWidth * 2) / 3) {
          el.scrollLeft -= el.scrollWidth / 3;
        }
      }
      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [shouldReduceMotion]);

  const scrollByAmount = useCallback((amount: number) => {
    const el = scrollRef.current;
    if (!el) return;

    isInteractingRef.current = true;
    if (interactionTimeoutRef.current) {
      window.clearTimeout(interactionTimeoutRef.current);
    }

    if (amount < 0 && el.scrollLeft <= 50) {
      el.scrollLeft += el.scrollWidth / 3;
    } else if (amount > 0 && el.scrollLeft >= (el.scrollWidth * 2) / 3) {
      el.scrollLeft -= el.scrollWidth / 3;
    }

    el.scrollBy({ left: amount, behavior: 'smooth' });

    interactionTimeoutRef.current = window.setTimeout(() => {
      isInteractingRef.current = false;
    }, 800);
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="py-6 select-none overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-4">
        {/* Section Heading & Working Prev/Next Buttons */}
        <div className="flex items-end justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs uppercase font-bold tracking-[0.2em] text-[#D61C4E] mb-1">
              <Award className="w-3.5 h-3.5" />
              <span>Certified Masters</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
              Meet Our Stylists
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Trained by L'Oréal Professional with over 15+ years of combined precision craft.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollByAmount(-240)}
              className="w-9 h-9 rounded-full bg-white border border-stone-200 hover:border-stone-400 text-stone-700 flex items-center justify-center transition-all cursor-pointer shadow-2xs hover:scale-105 active:scale-95"
              aria-label="Previous stylist"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => scrollByAmount(240)}
              className="w-9 h-9 rounded-full bg-white border border-stone-200 hover:border-stone-400 text-stone-700 flex items-center justify-center transition-all cursor-pointer shadow-2xs hover:scale-105 active:scale-95"
              aria-label="Next stylist"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Continuous Autoplay Track across all viewports */}
        <div
          ref={scrollRef}
          className="flex items-stretch gap-4 sm:gap-5 overflow-x-auto pb-4 pt-1 no-scrollbar transform-gpu"
        >
          {[...STYLISTS, ...STYLISTS, ...STYLISTS].map((item, index) => (
            <motion.div
              key={`${item.id}-${index}`}
              whileTap={{ scale: 0.98 }}
              className="group relative flex flex-col justify-end w-[180px] sm:w-[220px] aspect-[3/4] rounded-3xl overflow-hidden bg-stone-900 border border-stone-200 shadow-2xs hover:shadow-xl transition-all duration-300 shrink-0 cursor-pointer"
            >
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  loading="lazy"
                  className="w-full h-full object-cover object-[center_20%] group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent group-hover:via-stone-950/60 transition-colors duration-500" />
              </div>

              {/* Text info positioned over bottom gradient */}
              <div className="relative z-10 p-3.5 sm:p-4 space-y-1 text-white">
                <h4 className="font-serif font-bold text-sm sm:text-base leading-snug drop-shadow-md">
                  {item.name}
                </h4>
                <p className="text-[11px] text-rose-300/90 font-medium leading-tight line-clamp-1">
                  {item.position}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};
