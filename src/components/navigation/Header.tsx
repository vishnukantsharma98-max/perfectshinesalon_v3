/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { serviceCategories } from '../../data/services';
import { useBooking } from '../../context/BookingContext';
import { businessConfig } from '../../data/business';
import {
  MessageCircle,
  Scissors,
  Sparkles,
  Droplets,
  UserCheck,
  Crown,
  MapPin,
  Calendar,
  Layers,
} from 'lucide-react';

interface HeaderProps {
  onOpenBooking?: () => void;
}

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  haircut: <Scissors className="w-3.5 h-3.5" />,
  facial: <Sparkles className="w-3.5 h-3.5" />,
  'hair-spa': <Droplets className="w-3.5 h-3.5" />,
  beard: <UserCheck className="w-3.5 h-3.5" />,
  premium: <Crown className="w-3.5 h-3.5" />,
};

export const Header: React.FC<HeaderProps> = () => {
  const [scrolled, setScrolled] = useState(false);
  const {
    selectedServices,
    activeCategory,
    selectAndScrollToCategory,
    openModal,
    appView,
    setAppView,
    openBookingPortal,
    selectedOutlet,
    setIsOutletModalOpen,
  } = useBooking();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalSelected = selectedServices.length;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-stone-200 py-2.5 shadow-sm'
          : 'bg-white/90 backdrop-blur-sm border-b border-stone-200/60 py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3 sm:gap-4">
          {/* Brand Wordmark & Mode Switcher */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                setAppView('site');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="group flex items-center gap-2 focus:outline-none shrink-0 cursor-pointer"
            >
              <img
                src="https://i.postimg.cc/0jSmd76C/34567890.png"
                alt="PERFECT SHINE UNISEX SALON"
                className="h-14 sm:h-18 w-auto object-contain drop-shadow-xs"
                loading="eager"
                referrerPolicy="no-referrer"
              />
              <span className="font-serif text-lg sm:text-xl tracking-wide font-black text-[#18181B] group-hover:text-[#D61C4E] transition-colors">
                {businessConfig.brandMark}
              </span>
            </button>

            {/* Enrich Experience / Booking Portal Switch Pills */}
            <div className="hidden md:flex items-center bg-[#F4EFEB] p-1 rounded-full border border-stone-200 text-xs font-medium text-stone-700">
              <button
                type="button"
                onClick={() => setAppView('site')}
                className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                  appView === 'site'
                    ? 'bg-white text-stone-900 font-bold shadow-xs'
                    : 'hover:text-stone-900'
                }`}
              >
                Salon Atelier
              </button>
              <button
                type="button"
                onClick={() => setAppView('booking')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all cursor-pointer ${
                  appView === 'booking'
                    ? 'bg-gradient-to-r from-[#D4AF37] via-[#C5A46A] to-[#B8860B] text-[#18181B] font-bold shadow-xs'
                    : 'text-[#9A7B38] hover:text-stone-900'
                }`}
              >
                <Sparkles className="w-3 h-3" />
                <span>Enrich Booking System</span>
              </button>
            </div>
          </div>

          {/* Center: Quick Category Tabs (When on Site view) */}
          {appView === 'site' && (
            <nav
              aria-label="Salon Categories"
              className="hidden xl:flex items-center gap-1 bg-[#F9F7F4] p-1 rounded-full border border-stone-200"
            >
              <button
                type="button"
                onClick={() => selectAndScrollToCategory('all')}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                  activeCategory === 'all'
                    ? 'bg-gradient-to-r from-[#D4AF37] via-[#C5A46A] to-[#B8860B] text-[#18181B] font-semibold shadow-xs'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/50'
                }`}
              >
                <span>All</span>
              </button>
              {serviceCategories.slice(0, 5).map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => selectAndScrollToCategory(cat.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer whitespace-nowrap ${
                      isActive
                        ? 'bg-gradient-to-r from-[#D4AF37] via-[#C5A46A] to-[#B8860B] text-[#18181B] font-semibold shadow-xs'
                        : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/50'
                    }`}
                  >
                    <span className={isActive ? 'text-[#18181B]' : 'text-[#9A7B38]'}>
                      {CATEGORY_ICONS[cat.id] || <Sparkles className="w-3.5 h-3.5" />}
                    </span>
                    <span>{cat.name.split(' ')[0]}</span>
                  </button>
                );
              })}
            </nav>
          )}

          {/* Right Action Controls: Location Chip & Booking CTA */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Location Outlet Button */}
            <button
              type="button"
              onClick={() => setIsOutletModalOpen(true)}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-50 hover:bg-stone-100 border border-stone-200 text-stone-700 text-xs font-medium cursor-pointer"
            >
              <MapPin className="w-3.5 h-3.5 text-[#C5A46A]" />
              <span className="max-w-[130px] truncate">{selectedOutlet.name}</span>
            </button>

            {/* Dynamic Selected Services Button */}
            {totalSelected > 0 && (
              <button
                type="button"
                onClick={() => {
                  if (appView === 'site') {
                    openBookingPortal();
                  } else {
                    openModal();
                  }
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#FEF9EE] text-[#9A7B38] border border-[#E9DFCE] hover:bg-[#FDF3DE] transition-all duration-200 cursor-pointer shadow-xs"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>{totalSelected} Added</span>
              </button>
            )}

            {/* Booking Portal Action CTA */}
            <button
              type="button"
              onClick={() => openBookingPortal()}
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-[#D4AF37] via-[#C5A46A] to-[#B8860B] text-[#18181B] hover:brightness-105 active:scale-[0.98] py-2 sm:py-2.5 px-4 sm:px-5 rounded-full transition-all duration-200 whitespace-nowrap cursor-pointer shadow-sm hover:shadow-md border border-[#E5CA98]"
            >
              <Calendar className="w-4 h-4 text-[#18181B]" />
              <span>
                {appView === 'booking'
                  ? 'Book Appointment'
                  : totalSelected > 0
                  ? `Book (${totalSelected})`
                  : 'Book Online'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
