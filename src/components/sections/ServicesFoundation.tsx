/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { serviceCategories, servicesData } from '../../data/services';
import { useBooking } from '../../context/BookingContext';
import { formatDuration } from '../../utils/formatters';
import { Container } from '../common/Container';
import { ASSET_MAP } from '../../data/assets';
import {
  Clock,
  Plus,
  Check,
  Sparkles,
  Scissors,
  Droplets,
  UserCheck,
  Crown,
  Calendar,
  ArrowRight,
  Search,
  X,
  SlidersHorizontal,
} from 'lucide-react';

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  haircut: <Scissors className="w-4 h-4" />,
  facial: <Sparkles className="w-4 h-4" />,
  'hair-spa': <Droplets className="w-4 h-4" />,
  beard: <UserCheck className="w-4 h-4" />,
  premium: <Crown className="w-4 h-4" />,
};

export const ServicesFoundation: React.FC = () => {
  const {
    activeCategory,
    setActiveCategory,
    toggleService,
    isServiceSelected,
    selectedServices,
    openModal,
    openBookingPortal,
    openServiceDetails,
    activeGender,
    setActiveGender,
    searchQuery,
    setSearchQuery,
  } = useBooking();

  // Filter by category, gender audience, and search query
  const filteredServices = servicesData.filter((service) => {
    if (!service.enabled) return false;

    // Category filter
    if (activeCategory !== 'all' && service.categoryId !== activeCategory) {
      return false;
    }

    // Gender filter (Enrich Beauty style)
    if (activeGender !== 'all') {
      if (activeGender === 'women' && service.gender !== 'women' && service.gender !== 'unisex') {
        return false;
      }
      if (activeGender === 'men' && service.gender !== 'men' && service.gender !== 'unisex') {
        return false;
      }
      if (activeGender === 'bridal' && service.gender !== 'bridal' && service.categoryId !== 'premium') {
        return false;
      }
    }

    // Search query filter
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchName = service.name.toLowerCase().includes(q);
      const matchDesc = service.description.toLowerCase().includes(q);
      const matchTag = service.tag?.toLowerCase().includes(q);
      const matchHighlights = service.highlights?.some((h) => h.toLowerCase().includes(q));
      if (!matchName && !matchDesc && !matchTag && !matchHighlights) {
        return false;
      }
    }

    return true;
  });

  const currentCategory = serviceCategories.find((cat) => cat.id === activeCategory);

  return (
    <section id="services" className="py-16 md:py-24 bg-[#FAF8F5] relative">
      <Container>
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FEF9EE] border border-[#E9DFCE] text-[#9A7B38] text-xs uppercase tracking-widest font-bold mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Enrich Your Beauty & Grooming</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl text-[#18181B] font-normal tracking-tight">
            Select Your Treatments
          </h2>

          <p className="mt-2.5 text-sm sm:text-base text-stone-600 leading-relaxed max-w-xl mx-auto">
            Browse our comprehensive menu across Hair, Skin, Spa & Grooming. Click to customize your appointment.
          </p>
        </div>

        {/* Enrich Beauty Style Filter Panel: Audience & Search Bar */}
        <div className="bg-white border border-stone-200/90 rounded-2xl p-4 sm:p-5 mb-8 shadow-sm">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Gender / Audience Segment Switcher */}
            <div className="flex items-center gap-1.5 bg-[#FAF8F5] p-1.5 rounded-xl border border-stone-200 overflow-x-auto no-scrollbar">
              <span className="text-xs font-semibold text-stone-500 px-2 hidden sm:inline-flex items-center gap-1">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#9A7B38]" />
                <span>For:</span>
              </span>
              {[
                { id: 'all', label: 'All Guests' },
                { id: 'women', label: 'Women' },
                { id: 'men', label: 'Men' },
                { id: 'bridal', label: 'Bridal & Combos' },
              ].map((segment) => {
                const isActive = activeGender === segment.id;
                return (
                  <button
                    key={segment.id}
                    type="button"
                    onClick={() => setActiveGender(segment.id as any)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-[#18181B] text-white shadow-xs'
                        : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
                    }`}
                  >
                    {segment.label}
                  </button>
                );
              })}
            </div>

            {/* Instant Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search haircut, facial, balayage, spa..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-9 py-2 bg-[#FAF8F5] border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#C5A46A] focus:bg-white transition-all shadow-xs"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 p-0.5"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Category Tabs Switcher (Light Mode) */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          <button
            type="button"
            onClick={() => setActiveCategory('all')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 whitespace-nowrap cursor-pointer ${
              activeCategory === 'all'
                ? 'bg-gradient-to-r from-[#D4AF37] via-[#C5A46A] to-[#B8860B] text-[#18181B] shadow-sm scale-105 border border-[#E5CA98]'
                : 'bg-white text-stone-600 border border-stone-200 hover:border-stone-300 hover:text-stone-900'
            }`}
          >
            <span>All Categories</span>
          </button>
          {serviceCategories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-[#D4AF37] via-[#C5A46A] to-[#B8860B] text-[#18181B] shadow-sm scale-105 border border-[#E5CA98]'
                    : 'bg-white text-stone-600 border border-stone-200 hover:border-stone-300 hover:text-stone-900'
                }`}
              >
                <span className={isActive ? 'text-[#18181B]' : 'text-[#9A7B38]'}>
                  {CATEGORY_ICONS[cat.id]}
                </span>
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Active Category Info Bar */}
        <div className="bg-white border border-stone-200 rounded-2xl p-4 sm:p-5 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
          <div>
            <span className="text-[11px] uppercase tracking-widest text-[#9A7B38] font-bold block mb-1">
              Currently Viewing
            </span>
            <h3 className="font-serif text-xl sm:text-2xl text-[#18181B]">
              {currentCategory ? currentCategory.name : 'All Repertoire'}
            </h3>
            <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
              {currentCategory ? currentCategory.description : 'Explore all hair, skin, spa, and grooming rituals.'}
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <span className="text-xs font-medium text-stone-500 bg-[#FAF8F5] px-3 py-1.5 rounded-full border border-stone-200">
              {filteredServices.length} treatment{filteredServices.length !== 1 ? 's' : ''} available
            </span>
          </div>
        </div>

        {/* Services Grid (Enrich Beauty Style Light Cards) */}
        {filteredServices.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-2xl border border-stone-200">
            <Sparkles className="w-8 h-8 text-stone-300 mx-auto mb-3" />
            <h4 className="font-serif text-xl text-stone-800">No treatments found</h4>
            <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
              Try adjusting your search query or switching the audience filter to "All Guests".
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
                setActiveGender('all');
              }}
              className="mt-4 px-4 py-2 bg-[#FAF8F5] hover:bg-stone-200/70 border border-stone-300 rounded-full text-xs font-semibold text-stone-800 transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => {
              const isSelected = isServiceSelected(service.id);
              const asset = service.imageSlot ? ASSET_MAP[service.imageSlot] : null;

              return (
                <div
                  key={service.id}
                  className={`group relative flex flex-col justify-between rounded-2xl overflow-hidden border transition-all duration-300 transform hover:-translate-y-1.5 shadow-sm hover:shadow-md ${
                    isSelected
                      ? 'border-[#C5A46A] bg-[#FFFDF9] ring-2 ring-[#C5A46A]/40'
                      : 'border-stone-200 bg-white hover:border-[#C5A46A]/60'
                  }`}
                >
                  {/* Visual Thumbnail */}
                  {asset && (
                    <div className="relative aspect-16/10 w-full overflow-hidden bg-stone-100">
                      <img
                        src={asset.url}
                        alt={asset.alt}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />

                      {/* Top Badges */}
                      <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none">
                        <div className="flex items-center gap-1.5">
                          {service.tag && (
                            <span className="text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 bg-white/95 text-[#9A7B38] border border-amber-200 rounded-full shadow-xs backdrop-blur-xs">
                              {service.tag}
                            </span>
                          )}
                          {service.gender && service.gender !== 'unisex' && (
                            <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 bg-black/60 text-white rounded-full backdrop-blur-xs">
                              {service.gender === 'women' ? 'Women' : service.gender === 'men' ? 'Men' : 'Bridal'}
                            </span>
                          )}
                        </div>

                        {service.durationMinutes && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 bg-white/95 text-stone-800 rounded-full shadow-xs backdrop-blur-xs">
                            <Clock className="w-3 h-3 text-[#9A7B38]" />
                            {formatDuration(service.durationMinutes)}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Content Block */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-serif text-xl sm:text-2xl text-[#18181B] group-hover:text-[#9A7B38] transition-colors leading-snug">
                        {service.name}
                      </h4>

                      <p className="mt-2 text-xs sm:text-sm text-stone-600 leading-relaxed">
                        {service.description}
                      </p>

                      {/* Highlights / Inclusions */}
                      {service.highlights && service.highlights.length > 0 && (
                        <div className="mt-3.5 flex flex-wrap gap-1.5">
                          {service.highlights.map((h, i) => (
                            <span
                              key={i}
                              className="text-[10px] font-medium tracking-wide px-2 py-0.5 rounded-full bg-[#FAF8F5] text-stone-700 border border-stone-200"
                            >
                              ✓ {h}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Add / Added Button (ZERO PRICE) */}
                    <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={() => openServiceDetails(service)}
                        className="text-xs font-semibold text-stone-500 hover:text-stone-900 transition-colors cursor-pointer"
                      >
                        View Details
                      </button>

                      <button
                        type="button"
                        onClick={() => toggleService(service)}
                        className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                          isSelected
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-300 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-300'
                            : 'bg-[#FEF9EE] text-[#9A7B38] border border-[#E9DFCE] hover:bg-gradient-to-r hover:from-[#D4AF37] hover:via-[#C5A46A] hover:to-[#B8860B] hover:text-[#18181B] shadow-xs'
                        }`}
                      >
                        {isSelected ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Added</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add to Booking</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Selected Services Quick Review Bar at bottom of section */}
        {selectedServices.length > 0 && (
          <div className="mt-12 p-6 rounded-2xl bg-white border border-[#C5A46A]/50 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6 animate-in slide-in-from-bottom duration-300">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#FEF9EE] border border-[#C5A46A] flex items-center justify-center text-[#9A7B38] shrink-0">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-serif text-lg sm:text-xl text-[#18181B] font-semibold">
                  {selectedServices.length} Treatment{selectedServices.length > 1 ? 's' : ''} Selected
                </h4>
                <p className="text-xs text-stone-500 mt-0.5">
                  {selectedServices.map((s) => s.name).join(' · ')}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => openModal()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-gradient-to-r from-[#D4AF37] via-[#C5A46A] to-[#B8860B] text-[#18181B] font-semibold text-xs uppercase tracking-wider rounded-full transition-all duration-200 shadow-md hover:scale-105 cursor-pointer whitespace-nowrap border border-[#E5CA98]"
            >
              <span>Review & Book ({selectedServices.length})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </Container>
    </section>
  );
};
