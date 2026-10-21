/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Container, SectionHeader } from '../common/Container';
import { useBooking } from '../../context/BookingContext';
import { SALONS_DATA, SalonOutlet } from '../../data/salons';
import { MapPin, Phone, Clock, Navigation, Calendar, Sparkles } from 'lucide-react';

export const SalonLocator: React.FC = () => {
  const [activeCity, setActiveCity] = useState<'bengaluru' | 'mumbai' | 'pune'>('bengaluru');
  const { setSelectedOutlet, openBookingPortal, selectedOutlet } = useBooking();

  const citySalons = SALONS_DATA.filter((s) => s.cityId === activeCity);

  const handleBookAtelier = (salon: SalonOutlet) => {
    setSelectedOutlet(salon);
    openBookingPortal();
  };

  return (
    <section id="salons" className="py-16 md:py-24 bg-[#FAF8F5] border-t border-stone-200">
      <Container>
        <SectionHeader
          eyebrow="Enrich Store Locator"
          title="Find Your Nearest Salon Atelier"
          subtitle="Explore our certified beauty studios across prime metropolitan hubs with dedicated parking and concierge care."
        />

        {/* City Filter Pills */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 no-scrollbar">
          {[
            { id: 'bengaluru', label: 'Bengaluru (3 Salons)' },
            { id: 'mumbai', label: 'Mumbai (2 Salons)' },
            { id: 'pune', label: 'Pune (1 Salon)' },
          ].map((city) => (
            <button
              key={city.id}
              type="button"
              onClick={() => setActiveCity(city.id as any)}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                activeCity === city.id
                  ? 'bg-gradient-to-r from-[#D4AF37] via-[#C5A46A] to-[#B8860B] text-[#18181B] shadow-xs'
                  : 'bg-white text-stone-600 border border-stone-200 hover:border-stone-300'
              }`}
            >
              {city.label}
            </button>
          ))}
        </div>

        {/* Salons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {citySalons.map((salon) => {
            const isCurrentSelected = selectedOutlet.id === salon.id;

            return (
              <div
                key={salon.id}
                className={`bg-white border rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-xs hover:shadow-md transition-all duration-300 ${
                  isCurrentSelected
                    ? 'border-[#C5A46A] ring-1 ring-[#C5A46A]/40'
                    : 'border-stone-200 hover:border-[#C5A46A]/60'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#9A7B38] bg-[#FEF9EE] px-2.5 py-1 rounded-full border border-[#E9DFCE] flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5" />
                      {salon.isFlagship ? 'Flagship Atelier' : 'Certified Studio'}
                    </span>
                    <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      Open Today
                    </span>
                  </div>

                  <h4 className="font-serif text-xl sm:text-2xl text-stone-900 font-semibold mb-2">
                    {salon.name}
                  </h4>

                  <p className="text-xs text-stone-600 flex items-start gap-2 mb-3">
                    <MapPin className="w-4 h-4 text-[#9A7B38] shrink-0 mt-0.5" />
                    <span>{salon.address}</span>
                  </p>

                  <p className="text-xs text-stone-500 flex items-center gap-2 mb-4">
                    <Clock className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                    <span>{salon.hours}</span>
                  </p>

                  {/* Features Pills */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {salon.features.map((feat, fIdx) => (
                      <span
                        key={fIdx}
                        className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-[#FAF8F5] text-stone-700 border border-stone-200"
                      >
                        ✓ {feat}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-4 border-t border-stone-100 flex items-center justify-between gap-2">
                  <a
                    href={salon.directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-semibold text-[#9A7B38] hover:text-[#B8860B] transition-colors"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Directions</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => handleBookAtelier(salon)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#FAF8F5] hover:bg-gradient-to-r hover:from-[#D4AF37] hover:via-[#C5A46A] hover:to-[#B8860B] hover:text-[#18181B] text-stone-800 text-xs font-bold uppercase tracking-wider border border-stone-200 transition-all cursor-pointer shadow-xs"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book Atelier</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};
