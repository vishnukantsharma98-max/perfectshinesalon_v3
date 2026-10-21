/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { offersData } from '../../data/offers';
import { useBooking } from '../../context/BookingContext';
import { ServiceItem } from '../../types/service';
import { Container, SectionHeader } from '../common/Container';
import { ASSET_MAP } from '../../data/assets';
import { Check, Plus, Clock, Crown } from 'lucide-react';

export const OffersFoundation: React.FC = () => {
  const { toggleService, isServiceSelected } = useBooking();
  const activeOffers = offersData.filter((offer) => offer.enabled);

  if (activeOffers.length === 0) return null;

  return (
    <section id="offers" className="py-16 md:py-24 bg-white border-t border-stone-200">
      <Container>
        <SectionHeader
          eyebrow="Curated Luxury Combos"
          title="Signature Packages & Multi-Treatment Suites"
          subtitle="All-in-one salon experiences crafted for complete relaxation and radiant hair & skin rejuvenation."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {activeOffers.map((offer) => {
            const asset = offer.imageSlot ? ASSET_MAP[offer.imageSlot] : null;

            // Map offer to ServiceItem so it can be added to booking cart
            const offerServiceItem: ServiceItem = {
              id: offer.id,
              categoryId: 'premium',
              name: offer.title,
              description: offer.description,
              durationMinutes: offer.id === 'offer-welcome-experience' ? 90 : 120,
              tag: offer.badge || 'Luxury Package',
              highlights: offer.servicesIncluded,
              enabled: true,
              imageSlot: offer.imageSlot,
            };

            const isSelected = isServiceSelected(offer.id);

            return (
              <div
                key={offer.id}
                className={`flex flex-col justify-between border overflow-hidden rounded-2xl transition-all duration-300 transform hover:-translate-y-1 shadow-sm hover:shadow-md ${
                  isSelected
                    ? 'border-[#C5A46A] bg-[#FFFDF9] ring-2 ring-[#C5A46A]/50'
                    : 'border-stone-200 bg-[#FAF8F5] hover:border-[#C5A46A]/60'
                }`}
              >
                {/* Visual Imagery Banner */}
                {asset && (
                  <div className="relative aspect-16/9 sm:aspect-21/9 w-full overflow-hidden bg-stone-100 border-b border-stone-200">
                    <img
                      src={asset.url}
                      alt={asset.alt}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />

                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <span className="text-[10px] uppercase tracking-widest font-bold px-3 py-1 bg-white/95 text-[#9A7B38] border border-amber-200 rounded-full shadow-xs backdrop-blur-xs flex items-center gap-1.5">
                        <Crown className="w-3 h-3 text-[#9A7B38]" />
                        <span>{offer.tagline}</span>
                      </span>
                    </div>

                    {offer.duration && (
                      <div className="absolute top-4 right-4">
                        <span className="text-[11px] font-semibold px-3 py-1 bg-white/95 text-stone-800 border border-stone-200 rounded-full shadow-xs backdrop-blur-xs flex items-center gap-1.5">
                          <Clock className="w-3 h-3 text-[#9A7B38]" />
                          <span>{offer.duration}</span>
                        </span>
                      </div>
                    )}
                  </div>
                )}

                <div className="p-8 sm:p-10 flex-1 flex flex-col justify-between">
                  <div>
                    {offer.badge && (
                      <span className="text-[11px] text-[#9A7B38] uppercase tracking-widest font-bold mb-2 block">
                        {offer.badge}
                      </span>
                    )}

                    <h3 className="font-serif text-2xl sm:text-3xl text-[#18181B] font-normal leading-snug">
                      {offer.title}
                    </h3>

                    <p className="mt-2.5 text-sm text-stone-600 leading-relaxed">
                      {offer.description}
                    </p>

                    {/* Included Services List */}
                    <div className="mt-6 pt-5 border-t border-stone-200 space-y-2.5">
                      <span className="text-xs uppercase tracking-wider text-stone-800 block mb-2 font-bold">
                        What is included in this package:
                      </span>
                      {offer.servicesIncluded.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs text-stone-700">
                          <Check className="w-3.5 h-3.5 text-[#9A7B38] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Row (Zero Price) */}
                  <div className="mt-8 pt-6 border-t border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="text-xs text-stone-500">
                      <span>{offer.validityText}</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleService(offerServiceItem)}
                      className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-sm ${
                        isSelected
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-300 hover:bg-rose-50 hover:text-rose-600'
                          : 'bg-gradient-to-r from-[#D4AF37] via-[#C5A46A] to-[#B8860B] text-[#18181B] border border-[#E5CA98] hover:scale-105 shadow-[#C5A46A]/20'
                      }`}
                    >
                      {isSelected ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Added to Appointment</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4" />
                          <span>Add Package to Booking</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};
