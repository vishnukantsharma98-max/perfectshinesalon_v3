/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useBooking } from '../../context/BookingContext';
import { getServicePrice, formatPriceINR } from '../../utils/pricing';
import {
  X,
  Trash2,
  Calendar,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  ShoppingBag,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

export const CartDrawerAndSheet: React.FC = () => {
  const {
    selectedServices,
    removeService,
    clearServices,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    setIsTimeModalOpen,
    totalPrice,
    totalPriceFormatted,
  } = useBooking();

  const shouldReduceMotion = useReducedMotion();
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);

  const hasItems = selectedServices.length > 0;

  const handleProceedToBook = () => {
    setIsCartDrawerOpen(false);
    setIsMobileExpanded(false);
    setIsTimeModalOpen(true);
  };

  return (
    <>
      {/* ============================================================ */}
      {/* 1. DESKTOP: SLEEK RIGHT-SIDE DRAWER (hidden on mobile)      */}
      {/* ============================================================ */}
      <AnimatePresence>
        {isCartDrawerOpen && hasItems && (
          <div className="hidden lg:block">
            {/* Backdrop with frosted blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setIsCartDrawerOpen(false)}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs select-none"
              style={{ willChange: 'opacity' }}
            />

            {/* Side-Drawer sliding from right: 0 */}
            <motion.aside
              aria-label="Desktop Cart Drawer"
              initial={{ x: shouldReduceMotion ? 0 : '100%' }}
              animate={{ x: 0 }}
              exit={{ x: shouldReduceMotion ? 0 : '100%' }}
              transition={{
                type: 'spring',
                damping: 28,
                stiffness: 300,
              }}
              style={{ willChange: 'transform, opacity' }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[420px] bg-white border-l border-stone-200 shadow-2xl flex flex-col select-none overflow-hidden"
            >
              {/* Drawer Header */}
              <div className="p-6 pb-4 border-b border-stone-100 flex items-center justify-between bg-[#FAF8F5]/90 backdrop-blur-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-rose-50 border border-rose-200/80 flex items-center justify-center text-[#D61C4E]">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-stone-900 leading-tight">
                      Selected Treatments
                    </h3>
                    <span className="text-xs text-rose-700 font-bold">
                      {selectedServices.length}{' '}
                      {selectedServices.length === 1 ? 'service' : 'services'} · Total: {totalPriceFormatted}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={clearServices}
                    className="p-2 text-stone-400 hover:text-rose-600 transition-colors text-xs font-semibold cursor-pointer"
                    title="Clear all"
                  >
                    Clear
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsCartDrawerOpen(false)}
                    className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 hover:text-stone-900 flex items-center justify-center transition-colors cursor-pointer"
                    aria-label="Close cart"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Drawer Items with Framer Motion Auto-Layout (layout prop) */}
              <div className="flex-1 overflow-y-auto p-6 space-y-3">
                <AnimatePresence mode="popLayout">
                  {selectedServices.map((service, index) => {
                    const price = getServicePrice(service);
                    return (
                      <motion.div
                        layout
                        key={service.id}
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{
                          opacity: 0,
                          scale: 0.9,
                          transition: { duration: 0.2 },
                        }}
                        transition={{
                          type: 'spring',
                          damping: 25,
                          stiffness: 350,
                        }}
                        style={{ willChange: 'transform, opacity' }}
                        className="p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200 flex items-center justify-between gap-3 group hover:border-stone-300 transition-colors shadow-2xs"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span className="w-6 h-6 rounded-full bg-white border border-stone-200 text-stone-700 font-bold text-[11px] flex items-center justify-center shrink-0">
                            {index + 1}
                          </span>
                          <div className="truncate">
                            <h4 className="font-semibold text-sm text-stone-900 truncate">
                              {service.name}
                            </h4>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-xs font-bold text-rose-700">
                                {formatPriceINR(price)}
                              </span>
                              <span className="text-[10px] text-stone-400 capitalize">
                                {service.gender === 'unisex' ? 'All Genders' : `${service.gender}'s Care`}
                              </span>
                            </div>
                          </div>
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          type="button"
                          onClick={() => removeService(service.id)}
                          className="p-2 text-stone-400 hover:text-rose-600 transition-colors cursor-pointer shrink-0"
                          title="Remove service"
                        >
                          <Trash2 className="w-4 h-4" />
                        </motion.button>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>

              {/* Drawer Footer Call to Action with Total Amount */}
              <div className="p-6 border-t border-stone-100 bg-white space-y-3">
                <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200 flex items-center justify-between text-stone-900">
                  <div>
                    <span className="text-xs text-stone-500 uppercase tracking-wider font-semibold block">
                      Total Estimated Amount
                    </span>
                    <span className="text-xl font-bold font-serif text-stone-900">
                      {totalPriceFormatted}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-rose-700 font-semibold">
                    <Sparkles className="w-4 h-4" />
                    <span>Pay at Salon</span>
                  </div>
                </div>

                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleProceedToBook}
                  className="w-full py-4 px-6 rounded-full bg-[#D61C4E] hover:bg-[#c21443] text-white font-bold text-sm tracking-wide uppercase transition-all cursor-pointer shadow-xl flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Pick Date & Time</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      {/* ============================================================ */}
      {/* 2. MOBILE: BOTTOM SHEET CART (Floating above nav: bottom-[76px]) */}
      {/* ============================================================ */}
      <AnimatePresence>
        {hasItems && (
          <aside
            aria-label="Mobile Bottom Sheet Cart"
            className="lg:hidden fixed bottom-[76px] inset-x-0 z-40 select-none pointer-events-auto px-3"
          >
            <motion.div
              initial={{ y: shouldReduceMotion ? 0 : 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: shouldReduceMotion ? 0 : 80, opacity: 0 }}
              transition={{
                type: 'spring',
                damping: 25,
                stiffness: 300,
              }}
              style={{ willChange: 'transform, opacity' }}
              className="rounded-3xl bg-[#18181B] text-white shadow-2xl border border-stone-800 overflow-hidden"
            >
              {/* Expandable item list if opened (animated via opacity and scale without height thrashing) */}
              <AnimatePresence>
                {isMobileExpanded && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className="border-b border-stone-800 max-h-56 overflow-y-auto px-4 py-3 space-y-2 bg-stone-900/90"
                  >
                    <div className="flex items-center justify-between text-xs text-stone-400 pb-1">
                      <span className="font-semibold">
                        Selected Treatments ({selectedServices.length})
                      </span>
                      <button
                        type="button"
                        onClick={clearServices}
                        className="text-rose-400 hover:underline cursor-pointer"
                      >
                        Clear All
                      </button>
                    </div>

                    <AnimatePresence mode="popLayout">
                      {selectedServices.map((service) => {
                        const price = getServicePrice(service);
                        return (
                          <motion.div
                            layout
                            key={service.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="py-1.5 flex items-center justify-between gap-2 text-xs"
                          >
                            <div className="truncate flex-1">
                              <span className="text-stone-200">{service.name}</span>
                              <span className="ml-2 text-rose-400 font-bold">
                                {formatPriceINR(price)}
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeService(service.id)}
                              className="p-1 text-stone-400 hover:text-rose-400 cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Main Compact Row: Tap handle expands, button opens modal */}
              <div className="p-3.5 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setIsMobileExpanded(!isMobileExpanded)}
                  className="flex items-center gap-2.5 text-left flex-1 min-w-0 cursor-pointer"
                >
                  <div className="w-9 h-9 rounded-2xl bg-[#D61C4E] text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs">
                    {selectedServices.length}
                  </div>
                  <div className="truncate">
                    <div className="flex items-center gap-1.5 font-bold text-xs sm:text-sm text-white leading-tight">
                      <span>{selectedServices.length} Selected</span>
                      <span className="text-rose-400 font-black">• Total: {totalPriceFormatted}</span>
                      {isMobileExpanded ? (
                        <ChevronDown className="w-3.5 h-3.5 text-stone-400" />
                      ) : (
                        <ChevronUp className="w-3.5 h-3.5 text-stone-400" />
                      )}
                    </div>
                    <span className="text-[10px] text-stone-400 block truncate">
                      {selectedServices.map((s) => s.name).join(', ')}
                    </span>
                  </div>
                </button>

                <motion.button
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={handleProceedToBook}
                  className="py-2.5 px-5 rounded-full bg-[#D61C4E] hover:bg-[#c21443] text-white font-bold text-xs tracking-wider uppercase transition-all cursor-pointer shadow-md flex items-center gap-1 shrink-0"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book Now</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </motion.button>
              </div>
            </motion.div>
          </aside>
        )}
      </AnimatePresence>
    </>
  );
};
