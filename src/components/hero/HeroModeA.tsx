/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useBooking } from '../../context/BookingContext';
import { Container } from '../common/Container';
import { ASSET_MAP } from '../../data/assets';
import { Calendar, ArrowDown, MapPin, Sparkles, Star, ShieldCheck } from 'lucide-react';

interface HeroProps {
  onOpenBooking?: () => void;
}

export const HeroModeA: React.FC<HeroProps> = () => {
  const { openModal } = useBooking();
  const heroAsset = ASSET_MAP['hero-main'];

  return (
    <section
      id="top"
      className="relative min-h-[92vh] flex items-center justify-center bg-[#FAF8F5] overflow-hidden pt-28 pb-16 md:pt-36 md:pb-20"
    >
      {/* Editorial High-Resolution Canvas with Light Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroAsset.url}
          alt={heroAsset.alt}
          className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000 ease-out"
          loading="eager"
          referrerPolicy="no-referrer"
        />
        {/* Crisp light overlay preserving image warmth and guaranteeing AAA contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAF8F5] via-[#FAF8F5]/85 to-[#FAF8F5]/60" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#FAF8F5]/40 to-[#FAF8F5]/80" />
      </div>

      <Container className="relative z-10 text-center max-w-4xl mx-auto flex flex-col items-center">
        {/* Eyebrow Studio Status */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#E9DFCE] text-[#9A7B38] text-xs uppercase tracking-[0.2em] font-bold mb-6 select-none shadow-xs animate-in fade-in slide-in-from-top-4 duration-500">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span>Lavelle Road Atelier</span>
          <span className="text-stone-300">|</span>
          <span className="text-[#18181B] font-medium">Private Appointments</span>
        </div>

        {/* Marquee Headline in rich luxury dark serif */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-[#18181B] font-normal tracking-tight leading-[1.08] text-balance animate-in fade-in duration-700">
          Hair & Skin Designed as <span className="italic font-light text-[#9A7B38]">Quiet Art.</span>
        </h1>

        {/* Concise, human, warm copy */}
        <p className="mt-5 sm:mt-7 text-base sm:text-lg md:text-xl text-[#52525B] font-normal leading-relaxed max-w-2xl text-balance">
          Bespoke haircutting, radiant skin facials, Japanese head spa therapy, and gentleman grooming in an unhurried sanctuary.
        </p>

        {/* Action Decision Block */}
        <div className="mt-9 sm:mt-11 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => openModal()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 bg-gradient-to-r from-[#D4AF37] via-[#C5A46A] to-[#B8860B] hover:brightness-105 active:scale-[0.98] text-[#18181B] font-semibold text-xs uppercase tracking-[0.16em] rounded-full transition-all duration-300 shadow-md shadow-[#C5A46A]/25 hover:shadow-lg hover:scale-105 cursor-pointer min-h-[48px] border border-[#E5CA98]"
          >
            <Calendar className="w-4 h-4 text-[#18181B]" />
            <span>Book Appointment</span>
          </button>

          <a
            href="#services"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border border-stone-300 bg-white/80 hover:bg-stone-50 text-[#18181B] text-xs uppercase tracking-[0.16em] font-semibold transition-all duration-300 min-h-[48px] shadow-xs"
          >
            <span>Explore Treatments</span>
            <ArrowDown className="w-3.5 h-3.5 text-[#9A7B38]" />
          </a>
        </div>

        {/* Trust Highlights Bar in Light Mode */}
        <div className="mt-12 pt-7 border-t border-stone-200/80 w-full grid grid-cols-2 sm:grid-cols-4 gap-4 text-left select-none">
          <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white/90 backdrop-blur-xs border border-stone-200 shadow-xs">
            <Star className="w-4 h-4 text-[#C5A46A] shrink-0 fill-[#C5A46A]" />
            <div>
              <span className="font-serif text-sm text-[#18181B] font-semibold block">4.9 ★ Rating</span>
              <span className="text-[11px] text-stone-500">140+ Client Reviews</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white/90 backdrop-blur-xs border border-stone-200 shadow-xs">
            <ShieldCheck className="w-4 h-4 text-[#C5A46A] shrink-0" />
            <div>
              <span className="font-serif text-sm text-[#18181B] font-semibold block">Private Chairs</span>
              <span className="text-[11px] text-stone-500">Zero Rushed Sessions</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white/90 backdrop-blur-xs border border-stone-200 shadow-xs">
            <Sparkles className="w-4 h-4 text-[#C5A46A] shrink-0" />
            <div>
              <span className="font-serif text-sm text-[#18181B] font-semibold block">Davines Organic</span>
              <span className="text-[11px] text-stone-500">Clean Botanical Care</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white/90 backdrop-blur-xs border border-stone-200 shadow-xs">
            <MapPin className="w-4 h-4 text-[#C5A46A] shrink-0" />
            <div>
              <span className="font-serif text-sm text-[#18181B] font-semibold block">Lavelle Road</span>
              <span className="text-[11px] text-stone-500">Valet Parking Available</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
