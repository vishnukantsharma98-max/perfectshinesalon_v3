/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useEffect } from 'react';
import { useBooking, ConfirmedBookingInfo } from '../../context/BookingContext';
import { servicesData } from '../../data/services';
import { ASSET_MAP } from '../../data/assets';
import { businessConfig } from '../../data/business';
import { formatDuration } from '../../utils/formatters';
import {
  Search,
  Check,
  Plus,
  X,
  ArrowLeft,
  Calendar,
  MessageCircle,
  Download,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollReveal } from '../common/ScrollReveal';
import { ServiceItem } from '../../types/service';
import { getServicePrice, formatPriceINR } from '../../utils/pricing';

interface ServiceRowCardProps {
  service: ServiceItem;
  isAdded: boolean;
  onToggle: (service: ServiceItem) => void;
}

const ServiceRowCard = React.memo<ServiceRowCardProps>(
  ({ service, isAdded, onToggle }) => {
    const price = getServicePrice(service);

    return (
      <motion.div
        whileTap={{ scale: 0.98 }}
        onClick={() => onToggle(service)}
        style={{ willChange: 'transform' }}
        className={`p-4 sm:p-5 rounded-2xl border flex items-center justify-between gap-4 transition-all duration-300 cursor-pointer ${
          isAdded
            ? 'bg-rose-50/80 border-rose-300 ring-2 ring-rose-200/70 shadow-xs'
            : 'bg-white border-stone-200 hover:border-stone-300 hover:shadow-md'
        }`}
      >
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-base text-stone-900 leading-snug truncate">
            {service.name}
          </h4>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm font-black text-rose-700">
              {formatPriceINR(price)}
            </span>
            {service.durationFormatted && (
              <span className="text-xs text-stone-400">
                · {service.durationFormatted}
              </span>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggle(service);
          }}
          className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 active:scale-90 hover:scale-105 cursor-pointer ${
            isAdded
              ? 'bg-[#D61C4E] border border-[#D61C4E] text-white shadow-xs'
              : 'border border-stone-300 text-stone-700 hover:border-stone-500 bg-white hover:bg-stone-50'
          }`}
          aria-label={isAdded ? `Remove ${service.name}` : `Add ${service.name}`}
        >
          {isAdded ? (
            <Check className="w-5 h-5 stroke-[2.5]" />
          ) : (
            <Plus className="w-4 h-4 stroke-[2.5]" />
          )}
        </button>
      </motion.div>
    );
  },
  (prev, next) => prev.isAdded === next.isAdded && prev.service.id === next.service.id
);

export const EnrichBookingSystem: React.FC = () => {
  const {
    selectedServices,
    toggleService,
    isServiceSelected,
    removeService,
    totalDuration,
    totalPriceFormatted,
    bookingSubView,
    setBookingSubView,
    activeCategory,
    setActiveCategory,
    activeGender,
    setActiveGender,
    searchQuery,
    setSearchQuery,
    setIsTimeModalOpen,
    confirmedBooking,
    resetBookingFlow,
  } = useBooking();

  const circularRailRef = useRef<HTMLDivElement>(null);
  const pillsBarRef = useRef<HTMLDivElement>(null);
  const isManualScrollRef = useRef<boolean>(false);
  const scrollTimeoutRef = useRef<number | null>(null);

  const womenCategories = [
    { id: 'haircut', name: 'Hair Cut', image: ASSET_MAP['hair-01'].url },
    { id: 'hair-wash', name: 'Hair Wash', image: ASSET_MAP['interior-02'].url },
    { id: 'rebonding', name: 'Rebonding', image: ASSET_MAP['hair-03'].url },
    { id: 'keratin', name: 'Keratin', image: ASSET_MAP['hair-03'].url },
    { id: 'colour', name: 'Colour', image: ASSET_MAP['hair-02'].url },
    { id: 'treatments', name: 'Treatments', image: ASSET_MAP['beauty-02'].url },
    { id: 'makeup', name: 'Makeup', image: ASSET_MAP['makeup-01'].url },
    { id: 'nail-art', name: 'Nail Art', image: ASSET_MAP['nails-01'].url },
    { id: 'styling', name: 'Styling', image: ASSET_MAP['hair-03'].url },
    { id: 'manicure', name: 'Manicure', image: ASSET_MAP['nails-01'].url },
  ];

  const menCategories = [
    { id: 'haircut', name: 'Hair Cut', image: ASSET_MAP['hair-01'].url },
    { id: 'beard', name: 'Beard & Shave', image: ASSET_MAP['mens-01'].url },
    { id: 'hair-wash', name: 'Hair Wash', image: ASSET_MAP['interior-02'].url },
    { id: 'colour', name: 'Colour', image: ASSET_MAP['hair-02'].url },
    { id: 'treatments', name: 'Treatments', image: ASSET_MAP['beauty-02'].url },
    { id: 'manicure', name: 'Grooming', image: ASSET_MAP['nails-01'].url },
  ];

  const currentCategories = activeGender === 'men' ? menCategories : womenCategories;
  const displayedCategories = currentCategories;

  // Bidirectional Scroll Tracking: Sync sticky pills to the currently visible category section
  useEffect(() => {
    if (activeGender === null || bookingSubView !== 'catalog') return;

    const handleScroll = () => {
      if (isManualScrollRef.current) return;

      // When near page top, select 'all'
      if (window.scrollY < 180) {
        if (activeCategory !== 'all') {
          setActiveCategory('all');
        }
        return;
      }

      // Target threshold accounting for fixed header (~72px) + sticky pills bar (~60px) + margin
      const offsetThreshold = 180;
      const scrollPosition = window.scrollY + offsetThreshold;

      let detectedCategory: string | null = null;

      // Find the last section whose top is above scrollPosition
      for (const cat of displayedCategories) {
        const el = document.getElementById(`section-${cat.id}`);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            detectedCategory = cat.id;
            break;
          } else if (scrollPosition >= top) {
            detectedCategory = cat.id;
          }
        }
      }

      if (detectedCategory && detectedCategory !== activeCategory) {
        setActiveCategory(detectedCategory);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeGender, bookingSubView, displayedCategories, activeCategory, setActiveCategory]);

  // Auto-scroll the active pill into horizontal center inside the pills bar (WITHOUT scrolling window horizontally)
  useEffect(() => {
    if (!pillsBarRef.current) return;
    const activePill = pillsBarRef.current.querySelector<HTMLElement>(`[data-category-pill="${activeCategory}"]`);
    if (activePill && pillsBarRef.current) {
      const container = pillsBarRef.current;
      const pillLeft = activePill.offsetLeft;
      const pillWidth = activePill.offsetWidth;
      const containerWidth = container.offsetWidth;
      const targetScrollLeft = pillLeft - (containerWidth / 2) + (pillWidth / 2);
      container.scrollTo({ left: Math.max(0, targetScrollLeft), behavior: 'smooth' });
    }
  }, [activeCategory]);

  const scrollToCategory = (categoryId: string) => {
    setActiveCategory(categoryId);
    isManualScrollRef.current = true;
    if (scrollTimeoutRef.current) {
      window.clearTimeout(scrollTimeoutRef.current);
    }

    if (categoryId === 'all') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(`section-${categoryId}`);
      if (el) {
        const headerOffset = 150;
        const elementPosition = el.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    }

    scrollTimeoutRef.current = window.setTimeout(() => {
      isManualScrollRef.current = false;
    }, 700);
  };

  const handleOpenWhatsApp = (info: ConfirmedBookingInfo) => {
    const servicesList = info.services
      .map((s, idx) => `  ${idx + 1}. ${s.name}`)
      .join('\n');

    const msg =
      `Hello ${businessConfig.brandMark}!\n\n` +
      `I would like to book an appointment:\n` +
      `Date: ${info.dateLabel}\n` +
      `Time: ${info.timeSlot}\n\n` +
      `Services:\n${servicesList}\n\n` +
      `Client Name: ${info.client.name}\n\n` +
      `Please confirm my appointment slot. Thank you!`;

    const encoded = encodeURIComponent(msg);
    const targetPhone = businessConfig.contact.whatsappNumber;
    window.open(`https://wa.me/${targetPhone}?text=${encoded}`, '_blank', 'noopener,noreferrer');
  };

  const handleDownloadCalendar = (info: ConfirmedBookingInfo) => {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() + 1);
    const endDate = new Date(startDate.getTime() + (info.totalDurationMinutes || 60) * 60000);

    const formatIcs = (d: Date) => d.toISOString().replace(/-|:|\.\d+/g, '');
    const ics = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Perfect Shine Salon//Booking//EN',
      'BEGIN:VEVENT',
      `UID:${info.bookingId}@perfectshinesalon.com`,
      `DTSTAMP:${formatIcs(new Date())}`,
      `DTSTART:${formatIcs(startDate)}`,
      `DTEND:${formatIcs(endDate)}`,
      `SUMMARY:Salon Booking - ${businessConfig.brandMark} (${info.bookingId})`,
      `DESCRIPTION:${info.services.map((s) => s.name).join(', ')}`,
      `LOCATION:${info.outlet.name}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `booking-${info.bookingId}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-white text-[#18181B] font-sans selection:bg-[#D61C4E]/20 selection:text-[#D61C4E]">
      {activeGender === null && (
        <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 space-y-8">
          <h1 className="text-3xl font-bold font-serif">Choose Your Category</h1>
          <div className="flex flex-col sm:flex-row gap-6 w-full max-w-2xl">
            <button
              className="flex-1 p-12 rounded-3xl bg-rose-50 border-2 border-rose-200 hover:border-rose-400 transition-all text-center space-y-4 cursor-pointer"
              onClick={() => setActiveGender('women')}
            >
              <span className="text-6xl">👩</span>
              <span className="block font-bold text-2xl text-rose-900">Women</span>
            </button>
            <button
              className="flex-1 p-12 rounded-3xl bg-stone-50 border-2 border-stone-200 hover:border-stone-400 transition-all text-center space-y-4 cursor-pointer"
              onClick={() => setActiveGender('men')}
            >
              <span className="text-6xl">👨</span>
              <span className="block font-bold text-2xl text-stone-900">Men</span>
            </button>
          </div>
        </div>
      )}

      {activeGender !== null && bookingSubView === 'confirmation' && confirmedBooking && (
        <div className="max-w-2xl mx-auto px-4 py-12 animate-in zoom-in-95 duration-200">
          <div className="p-8 rounded-3xl bg-white border border-stone-200 shadow-xl space-y-6 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-widest font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Booking Confirmed
              </span>
              <h2 className="font-serif text-3xl font-bold text-stone-900 mt-2">
                Your Appointment is Scheduled
              </h2>
            </div>
            <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-stone-200 text-left space-y-3 text-xs">
              <div className="flex justify-between border-b border-stone-200 pb-2.5">
                <div>
                  <span className="text-[10px] uppercase font-bold text-stone-400 block">Salon Atelier</span>
                  <strong className="text-stone-900 font-bold text-sm">{businessConfig.name}</strong>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-emerald-600 block">Status</span>
                  <strong className="text-emerald-700 font-bold text-xs uppercase tracking-wider">Reserved ✓</strong>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 border-b border-stone-200 pb-2.5">
                <div>
                  <span className="text-[10px] uppercase font-bold text-stone-400 block">Date & Time</span>
                  <strong className="text-stone-900">{confirmedBooking.dateLabel} at {confirmedBooking.timeSlot}</strong>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-stone-400 block">Client Name</span>
                  <strong className="text-stone-900">{confirmedBooking.client.name}</strong>
                </div>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-stone-400 block mb-1">
                  Reserved Services ({confirmedBooking.services.length})
                </span>
                <ul className="space-y-1 text-stone-700">
                  {confirmedBooking.services.map((s, idx) => (
                    <li key={idx} className="flex items-center gap-1.5 font-medium">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>{s.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={() => handleOpenWhatsApp(confirmedBooking)}
                className="w-full py-3.5 px-6 rounded-full bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white font-bold text-sm transition-all cursor-pointer shadow-md flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                <span>Confirm on WhatsApp: 9682332705</span>
              </button>
              <button
                type="button"
                onClick={() => handleDownloadCalendar(confirmedBooking)}
                className="w-full py-3 px-6 rounded-full bg-white hover:bg-stone-50 border border-stone-200 text-stone-800 font-semibold text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Download className="w-4 h-4 text-stone-500" />
                <span>Add to Calendar (.ics)</span>
              </button>
              <button
                type="button"
                onClick={resetBookingFlow}
                className="w-full py-2 text-stone-500 hover:text-stone-900 text-xs font-semibold cursor-pointer"
              >
                Book Another Service
              </button>
            </div>
          </div>
        </div>
      )}

      {activeGender !== null && bookingSubView === 'cart' && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 pb-32 space-y-8 animate-in fade-in duration-150">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setBookingSubView('catalog')}
              className="p-1.5 rounded-full hover:bg-stone-100 text-stone-700 cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900">Your booking</h2>
          </div>
          {selectedServices.length === 0 ? (
            <div className="p-12 text-center border border-dashed border-stone-200 rounded-3xl bg-[#FAF8F5] space-y-3">
              <p className="text-stone-500 text-sm">You haven&apos;t added any services yet.</p>
              <button
                type="button"
                onClick={() => setBookingSubView('catalog')}
                className="px-5 py-2 rounded-full bg-[#18181B] text-white text-xs font-bold cursor-pointer"
              >
                Browse Services
              </button>
            </div>
          ) : (
            <div className="divide-y divide-stone-100 bg-white">
              <AnimatePresence mode="popLayout">
                {selectedServices.map((service) => (
                  <motion.div
                    layout
                    key={service.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                    className="py-4 flex items-center justify-between gap-4"
                  >
                    <h3 className="font-semibold text-base text-stone-900">{service.name}</h3>
                    <button
                      type="button"
                      onClick={() => removeService(service.id)}
                      className="p-1.5 text-stone-400 hover:text-rose-600 transition-colors cursor-pointer"
                      title="Remove service"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
          <div className="fixed bottom-14 md:bottom-0 inset-x-0 z-40 bg-white border-t border-stone-200 p-4 shadow-lg">
            <div className="max-w-4xl mx-auto flex items-center justify-center">
              <button
                type="button"
                disabled={selectedServices.length === 0}
                onClick={() => setIsTimeModalOpen(true)}
                className="w-full py-4 px-6 rounded-full bg-[#D61C4E] hover:bg-[#c21443] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-sm sm:text-base tracking-wide transition-all cursor-pointer shadow-md text-center"
              >
                Choose a time
              </button>
            </div>
          </div>
        </div>
      )}

      {activeGender !== null && bookingSubView === 'catalog' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-5 pb-32 space-y-6">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900">Book a service</h2>
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-stone-600 capitalize">{activeGender}</span>
              <button
                className="text-xs text-rose-600 hover:underline font-bold cursor-pointer"
                onClick={() => setActiveGender(null)}
              >
                Change
              </button>
              <div className="relative w-44 sm:w-56">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-stone-200 rounded-full pl-8 pr-7 py-1.5 text-xs text-stone-900 placeholder-stone-400 focus:border-[#D61C4E] focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div ref={circularRailRef} className="flex items-center gap-4 sm:gap-6 overflow-x-auto pb-1 no-scrollbar">
            {currentCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => scrollToCategory(cat.id)}
                className="flex flex-col items-center text-center shrink-0 group cursor-pointer focus:outline-none transition-transform active:scale-95"
              >
                <div
                  className={`w-20 h-20 sm:w-24 sm:h-24 rounded-3xl overflow-hidden p-1 border transition-all duration-300 ${
                    activeCategory === cat.id
                      ? 'border-[#D61C4E] ring-4 ring-[#D61C4E]/25 bg-rose-50 scale-105 shadow-sm'
                      : 'border-stone-200 bg-stone-50 group-hover:border-stone-400'
                  }`}
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover object-[center_22%] rounded-2xl group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <span
                  className={`text-xs font-semibold mt-2 ${
                    activeCategory === cat.id ? 'text-[#D61C4E] font-bold' : 'text-stone-800'
                  }`}
                >
                  {cat.name}
                </span>
              </button>
            ))}
          </div>

          {/* Horizontal Category Filter Pills (Sticky quick-jump bar) */}
          <div
            ref={pillsBarRef}
            className="sticky top-[72px] sm:top-[80px] z-30 bg-white/95 backdrop-blur-md py-3 -mx-4 sm:-mx-8 px-4 sm:px-8 shadow-xs border-y border-stone-200/80 flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth"
          >
            {/* "All" Pill */}
            <button
              type="button"
              data-category-pill="all"
              onClick={() => scrollToCategory('all')}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer active:scale-95 shrink-0 ${
                activeCategory === 'all'
                  ? 'bg-[#18181B] text-white shadow-xs font-bold scale-[1.02]'
                  : 'bg-white text-stone-700 border border-stone-200 hover:border-stone-400'
              }`}
            >
              All
            </button>

            {/* Dynamically generated categories for selected gender */}
            {displayedCategories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  data-category-pill={cat.id}
                  onClick={() => scrollToCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer active:scale-95 shrink-0 ${
                    isActive
                      ? 'bg-[#18181B] text-white shadow-xs font-bold scale-[1.02]'
                      : 'bg-white text-stone-700 border border-stone-200 hover:border-stone-400'
                  }`}
                >
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>

          <div className="space-y-8 pt-2">
            {displayedCategories.map((cat) => {
              const categoryServices = servicesData.filter((s) => {
                const matchesCategory = s.categoryId === cat.id;
                const matchesGender = activeGender === 'all' || s.gender === activeGender || s.gender === 'unisex';
                const matchesSearch = !searchQuery.trim() || s.name.toLowerCase().includes(searchQuery.toLowerCase());
                return matchesCategory && matchesGender && matchesSearch;
              });
              if (categoryServices.length === 0) return null;
              return (
                <ScrollReveal key={cat.id} delayMs={50}>
                  <section id={`section-${cat.id}`} className="space-y-4 pt-2 scroll-mt-[150px] sm:scroll-mt-[170px]">
                    <h3 className="text-xl font-bold text-stone-900">{cat.name}</h3>
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      variants={{
                        hidden: { opacity: 0 },
                        visible: {
                          opacity: 1,
                          transition: {
                            staggerChildren: 0.05,
                          },
                        },
                      }}
                      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
                    >
                      {categoryServices.map((service) => (
                        <motion.div
                          key={service.id}
                          variants={{
                            hidden: { opacity: 0, y: 16 },
                            visible: {
                              opacity: 1,
                              y: 0,
                              transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
                            },
                          }}
                        >
                          <ServiceRowCard service={service} isAdded={isServiceSelected(service.id)} onToggle={toggleService} />
                        </motion.div>
                      ))}
                    </motion.div>
                  </section>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
