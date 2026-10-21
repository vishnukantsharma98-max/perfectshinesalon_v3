/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useBooking } from '../../context/BookingContext';
import { businessConfig } from '../../data/business';
import { Phone, Calendar, Instagram, Facebook, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';

export const TopNavigationHeader: React.FC = () => {
  const { activePage, setActivePage, selectedServices, setIsCartDrawerOpen, setIsTimeModalOpen } = useBooking();

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-2xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-8 py-2 min-h-[76px] sm:min-h-[88px] flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand Logo - Clicking Logo opens Home */}
        <button
          type="button"
          onClick={() => {
            setActivePage('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2 sm:gap-3.5 text-left group cursor-pointer focus:outline-none shrink-0"
        >
          <img
            src="https://i.postimg.cc/0jSmd76C/34567890.png"
            alt="PERFECT SHINE UNISEX SALON"
            className="h-15 sm:h-20 md:h-24 w-auto max-w-[160px] sm:max-w-[220px] object-contain transition-transform group-hover:scale-105 duration-300 drop-shadow-xs shrink-0 select-none"
            loading="eager"
            referrerPolicy="no-referrer"
          />
          <div className="flex flex-col justify-center">
            <span className="font-serif text-sm sm:text-lg md:text-xl font-black tracking-wider text-stone-900 group-hover:text-[#D61C4E] transition-colors leading-tight">
              PERFECT SHINE
            </span>
            <span className="text-[9px] sm:text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-[#D61C4E]">
              UNISEX SALON
            </span>
          </div>
        </button>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          <button
            type="button"
            onClick={() => {
              setActivePage('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`text-sm font-semibold tracking-wide transition-colors cursor-pointer ${
              activePage === 'home'
                ? 'text-[#D61C4E] font-bold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Home
          </button>

          <button
            type="button"
            onClick={() => {
              setActivePage('services');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`text-sm font-semibold tracking-wide transition-colors cursor-pointer ${
              activePage === 'services'
                ? 'text-[#D61C4E] font-bold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Services
          </button>

          <button
            type="button"
            onClick={() => {
              setActivePage('contact');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`text-sm font-semibold tracking-wide transition-colors cursor-pointer ${
              activePage === 'contact'
                ? 'text-[#D61C4E] font-bold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Contact Us
          </button>
        </nav>

        {/* Right CTA + Socials */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          <div className="hidden sm:flex items-center gap-2">
            <a
              href={businessConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full border border-stone-200 text-stone-600 hover:text-[#D61C4E] hover:border-[#D61C4E] flex items-center justify-center transition-colors cursor-pointer"
              title="Instagram"
              aria-label="Instagram"
            >
              <Instagram className="w-3.5 h-3.5" />
            </a>

            <a
              href={businessConfig.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full border border-stone-200 text-stone-600 hover:text-[#D61C4E] hover:border-[#D61C4E] flex items-center justify-center transition-colors cursor-pointer"
              title="Facebook"
              aria-label="Facebook"
            >
              <Facebook className="w-3.5 h-3.5" />
            </a>
          </div>

          <a
            href="tel:+919682332705"
            className="hidden lg:flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-stone-900 px-3 py-2 rounded-full border border-stone-200 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-[#D61C4E]" />
            <span>96823 32705</span>
          </a>

          {/* Cart Icon Trigger for Desktop Drawer */}
          {selectedServices.length > 0 && (
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsCartDrawerOpen(true)}
              className="relative p-2 rounded-full border border-stone-200 hover:border-stone-400 text-stone-700 hover:text-stone-900 transition-colors cursor-pointer"
              title="View Cart"
              aria-label="View selected services cart"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#D61C4E] text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
                {selectedServices.length}
              </span>
            </motion.button>
          )}

          <motion.button
            type="button"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setIsTimeModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#D61C4E] hover:bg-[#c21443] text-white shadow-xs transition-all cursor-pointer shrink-0"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book Now</span>
          </motion.button>
        </div>
      </div>
    </header>
  );
};
