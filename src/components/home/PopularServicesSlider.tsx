/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useEffect, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useBooking } from '../../context/BookingContext';
import { servicesData } from '../../data/services';
import { ASSET_MAP } from '../../data/assets';
import { ServiceItem } from '../../types/service';
import { getServicePrice, formatPriceINR } from '../../utils/pricing';
import { ChevronLeft, ChevronRight, Sparkles, Plus, Check } from 'lucide-react';

interface PopularServiceItem {
  id: string;
  serviceId: string;
  name: string;
  imageUrl: string;
  gender: 'women' | 'men';
  categoryId: string;
}

const POPULAR_SERVICES: PopularServiceItem[] = [
  {
    id: 'pop-haircut',
    serviceId: 'srv-haircut-women',
    name: 'Hair Cut & Blowdry',
    imageUrl: ASSET_MAP['hair-01'].url,
    gender: 'women',
    categoryId: 'haircut',
  },
  {
    id: 'pop-rebonding',
    serviceId: 'srv-hair-rebonding-women',
    name: 'Permanent Hair Rebonding',
    imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=700&q=80',
    gender: 'women',
    categoryId: 'rebonding',
  },
  {
    id: 'pop-keratin',
    serviceId: 'srv-keratin-women',
    name: 'Keratin Protein Smoothing',
    imageUrl: ASSET_MAP['hair-03'].url,
    gender: 'women',
    categoryId: 'keratin',
  },
  {
    id: 'pop-makeup',
    serviceId: 'srv-bridal-makeup',
    name: 'Bridal & Party Makeup',
    imageUrl: ASSET_MAP['makeup-01'].url,
    gender: 'women',
    categoryId: 'makeup',
  },
  {
    id: 'pop-nail-art',
    serviceId: 'srv-nail-art-gel',
    name: 'Designer Nail Art & Gel',
    imageUrl: ASSET_MAP['nails-01'].url,
    gender: 'women',
    categoryId: 'nail-art',
  },
  {
    id: 'pop-hair-spa',
    serviceId: 'srv-hair-spa-deep',
    name: 'L’Oréal Deep Hair Spa',
    imageUrl: ASSET_MAP['interior-02'].url,
    gender: 'women',
    categoryId: 'treatments',
  },
  {
    id: 'pop-grooming',
    serviceId: 'srv-beard-trim-shave',
    name: 'Beard Sculpt & Shave',
    imageUrl: ASSET_MAP['mens-01'].url,
    gender: 'men',
    categoryId: 'beard',
  },
  {
    id: 'pop-colour',
    serviceId: 'srv-global-colour',
    name: 'Global Hair Colour',
    imageUrl: ASSET_MAP['hair-02'].url,
    gender: 'women',
    categoryId: 'colour',
  },
];

export const PopularServicesSlider: React.FC = () => {
  const { toggleService, isServiceSelected, setIsTimeModalOpen, setActivePage } = useBooking();
  const scrollRef = useRef<HTMLDivElement>(null);
  const isInteractingRef = useRef<boolean>(false);
  const interactionTimeoutRef = useRef<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  // Continuous Autoplay (without pause on hover)
  useEffect(() => {
    const el = scrollRef.current;
    if (!el || shouldReduceMotion) return;

    let animationFrameId: number;
    const speed = 0.75;

    const step = () => {
      if (el && !isInteractingRef.current) {
        el.scrollLeft += speed;
        // Seamless looping: when past middle third of repeated items, wrap back
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

    // Temporarily pause ticker during manual smooth scroll so animation completes cleanly
    isInteractingRef.current = true;
    if (interactionTimeoutRef.current) {
      window.clearTimeout(interactionTimeoutRef.current);
    }

    // Wrap around boundaries before scrolling if needed
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

  const getServiceItem = (item: PopularServiceItem): ServiceItem => {
    const existing = servicesData.find((s) => s.id === item.serviceId);
    if (existing) return existing;
    return {
      id: item.serviceId,
      name: item.name,
      categoryId: item.categoryId,
      gender: item.gender,
      description: item.name,
      enabled: true,
    };
  };

  const handleAdd = (item: PopularServiceItem) => {
    const srv = getServiceItem(item);
    toggleService(srv);
  };

  const handleBookNow = (item: PopularServiceItem) => {
    const srv = getServiceItem(item);
    if (!isServiceSelected(srv.id)) {
      toggleService(srv);
    }
    setIsTimeModalOpen(true);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="py-6 select-none overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-4">
        {/* Section Header */}
        <div className="flex items-end justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs uppercase font-bold tracking-[0.2em] text-[#D61C4E] mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Signature Experiences</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
              Popular Treatments
            </h3>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => {
                setActivePage('services');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-xs font-bold text-[#D61C4E] hover:underline cursor-pointer hidden sm:block mr-2"
            >
              Explore Full Menu →
            </button>

            {/* Prev & Next Carousel Controls (Functional across mobile & desktop) */}
            <button
              type="button"
              onClick={() => scrollByAmount(-280)}
              className="w-9 h-9 rounded-full bg-white border border-stone-200 hover:border-stone-400 text-stone-700 flex items-center justify-center transition-all cursor-pointer shadow-2xs hover:scale-105 active:scale-95"
              aria-label="Previous treatment"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => scrollByAmount(280)}
              className="w-9 h-9 rounded-full bg-white border border-stone-200 hover:border-stone-400 text-stone-700 flex items-center justify-center transition-all cursor-pointer shadow-2xs hover:scale-105 active:scale-95"
              aria-label="Next treatment"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Continuous Autoplay Slider (No pause on hover, fluid scrolling) */}
        <div
          ref={scrollRef}
          className="flex items-stretch gap-4 sm:gap-5 overflow-x-auto pb-4 pt-1 no-scrollbar transform-gpu"
        >
          {[...POPULAR_SERVICES, ...POPULAR_SERVICES, ...POPULAR_SERVICES].map((item, index) => {
            const isAdded = isServiceSelected(item.serviceId);
            const srv = getServiceItem(item);
            const price = getServicePrice(srv);

            return (
              <motion.div
                key={`${item.id}-${index}`}
                whileTap={{ scale: 0.98 }}
                style={{ willChange: 'transform' }}
                className="group w-[240px] sm:w-[280px] rounded-3xl overflow-hidden bg-white border border-stone-200/90 shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between shrink-0"
              >
                {/* Image container */}
                <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-stone-100">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    loading="lazy"
                    className="w-full h-full object-cover object-[center_20%] group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  
                  {/* Category Pill Tag */}
                  <div className="absolute top-3 left-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-white bg-black/50 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/20">
                      {item.gender === 'women' ? 'Women' : 'Men'}
                    </span>
                  </div>

                  {/* Price Tag in Image */}
                  <div className="absolute bottom-3 right-3">
                    <span className="text-xs font-black text-white bg-[#D61C4E] px-2.5 py-1 rounded-full shadow-md">
                      {formatPriceINR(price)}
                    </span>
                  </div>
                </div>

                {/* Service Details & Action Buttons */}
                <div className="p-4 flex flex-col justify-between flex-1 space-y-3">
                  <h4 className="font-serif font-bold text-base text-stone-900 leading-snug line-clamp-1">
                    {item.name}
                  </h4>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-stone-100">
                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.94 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAdd(item);
                      }}
                      className={`py-2 px-2.5 rounded-full text-xs font-bold text-center transition-all cursor-pointer flex items-center justify-center gap-1 ${
                        isAdded
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'border border-stone-300 hover:border-stone-400 text-stone-800 bg-white hover:bg-stone-50'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add</span>
                        </>
                      )}
                    </motion.button>

                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.94 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBookNow(item);
                      }}
                      className="py-2 px-2.5 rounded-full bg-[#D61C4E] hover:bg-[#c21443] text-white text-xs font-bold text-center shadow-xs transition-all cursor-pointer"
                    >
                      Book Now
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
};
