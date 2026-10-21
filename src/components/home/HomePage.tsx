/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useBooking } from '../../context/BookingContext';
import { ASSET_MAP } from '../../data/assets';
import { businessConfig } from '../../data/business';
import { SalonPhotoSlider } from '../gallery/SalonPhotoSlider';
import { PopularServicesSlider } from './PopularServicesSlider';
import { MeetOurStylists } from './MeetOurStylists';
import { GoogleMapRatingSection } from './GoogleMapRatingSection';
import { GoogleReviewsSlider } from './GoogleReviewsSlider';
import { Clock, Instagram, Facebook, ArrowRight, Star, Sparkles, MapPin } from 'lucide-react';

interface HomePageProps {
  isSplashComplete?: boolean;
}

export const HomePage: React.FC<HomePageProps> = () => {
  const { setActivePage, setActiveCategory, setActiveGender, setIsTimeModalOpen } = useBooking();
  const shouldReduceMotion = useReducedMotion();

  // Circular Categories for Home Page
  const homeCategories = [
    { id: 'haircut', label: 'Hair Cut', image: ASSET_MAP['hair-01'].url, gender: 'women' as const },
    { id: 'rebonding', label: 'Rebonding', image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80', gender: 'women' as const },
    { id: 'keratin', label: 'Keratin', image: ASSET_MAP['hair-03'].url, gender: 'women' as const },
    { id: 'makeup', label: 'All Makeup', image: ASSET_MAP['makeup-01'].url, gender: 'women' as const },
    { id: 'nail-art', label: 'Nail Art', image: ASSET_MAP['nails-01'].url, gender: 'women' as const },
    { id: 'treatments', label: 'Hair Treatment', image: ASSET_MAP['interior-02'].url, gender: 'women' as const },
    { id: 'beard', label: 'Beard & Shave', image: ASSET_MAP['mens-01'].url, gender: 'men' as const },
    { id: 'colour', label: 'Colour', image: ASSET_MAP['hair-02'].url, gender: 'women' as const },
  ];

  const handleCategoryClick = (catId: string, gender: 'women' | 'men') => {
    setActiveGender(gender);
    setActiveCategory(catId);
    setActivePage('services');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const LUXURY_EASE = [0.16, 1, 0.3, 1] as const;

  // Hero Stagger Variants
  const heroContentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.16,
        delayChildren: shouldReduceMotion ? 0 : 0.25,
      },
    },
  };

  const eyebrowVariant = {
    hidden: { y: shouldReduceMotion ? 0 : -30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.7, ease: LUXURY_EASE },
    },
  };

  const headlineVariant = {
    hidden: { x: shouldReduceMotion ? 0 : -30, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.75, ease: LUXURY_EASE },
    },
  };

  const mottoVariant = {
    hidden: { x: shouldReduceMotion ? 0 : -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.7, ease: LUXURY_EASE },
    },
  };

  const ctaVariant = {
    hidden: { y: shouldReduceMotion ? 0 : 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.75, ease: LUXURY_EASE },
    },
  };

  return (
    <div className="space-y-4 pb-20">
      {/* ============================================================ */}
      {/* 1. HERO BANNER: Directional Staggered Entrance */}
      {/* ============================================================ */}
      <section className="relative w-full min-h-[520px] sm:min-h-[550px] md:min-h-[580px] flex items-end md:items-center bg-stone-950 text-white overflow-hidden pb-8 pt-16 md:py-16">
        {/* Background Image with Rich Dark Gradient */}
        <div className="absolute inset-0 z-0">
          <img
            src="/home-screenphoto.png"
            alt="Perfect Shine Unisex Salon Ajmer"
            className="w-full h-full object-cover object-center opacity-40 scale-105"
            loading="eager"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://i.postimg.cc/6pG4xWj3/shop-image.jpg';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/70 to-stone-950/40" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10 w-full">
          <motion.div
            variants={heroContentVariants}
            initial="hidden"
            animate="visible"
            className="max-w-2xl space-y-4"
          >
            {/* Eyebrow */}
            <motion.div variants={eyebrowVariant} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-rose-300 text-xs font-semibold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Best Unisex Salon in Ajmer</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={headlineVariant}
              className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight text-white"
            >
              Your Beauty. <br />
              <span className="text-[#D61C4E]">Your Style.</span> Your Confidence.
            </motion.h1>

            {/* Motto */}
            <motion.p
              variants={mottoVariant}
              className="text-stone-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl"
            >
              Ajmer&apos;s trusted salon for master haircutting, permanent hair rebonding, keratin smoothing, and top bridal makeup on B K Kaul Road.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={ctaVariant} className="pt-2 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setActivePage('services');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-6 py-3 rounded-full bg-[#D61C4E] hover:bg-[#b81541] text-white text-sm font-bold uppercase tracking-wider shadow-lg transition-all cursor-pointer"
              >
                Explore Services
              </button>

              <button
                type="button"
                onClick={() => setIsTimeModalOpen(true)}
                className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white text-sm font-semibold transition-all cursor-pointer"
              >
                Book Appointment
              </button>

              <div className="flex items-center gap-1.5 text-xs text-amber-400 pl-2">
                <Star className="w-4 h-4 fill-amber-400" />
                <span className="font-bold text-white">4.9</span>
                <span className="text-stone-400">(350+ Google Reviews)</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. CIRCULAR CATEGORY RAIL */}
      {/* ============================================================ */}
      <section className="py-6 max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
            Browse by Category
          </h2>
          <button
            type="button"
            onClick={() => {
              setActivePage('services');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-xs font-bold text-[#D61C4E] hover:underline"
          >
            View All Services →
          </button>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-8 gap-3 sm:gap-4">
          {homeCategories.map((cat, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleCategoryClick(cat.id, cat.gender)}
              className="flex flex-col items-center text-center p-2 rounded-2xl hover:bg-stone-50 transition-all cursor-pointer group"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border border-stone-200 group-hover:border-[#D61C4E] transition-all shadow-2xs mb-2">
                <img
                  src={cat.image}
                  alt={cat.label}
                  className="w-full h-full object-cover object-[center_20%] transition-transform group-hover:scale-110"
                />
              </div>
              <span className="text-xs font-semibold text-stone-800 group-hover:text-[#D61C4E] transition-colors leading-tight">
                {cat.label}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. POPULAR SERVICES SLIDER */}
      {/* ============================================================ */}
      <PopularServicesSlider />

      {/* ============================================================ */}
      {/* 4. SALON PHOTO GALLERY SLIDER */}
      {/* ============================================================ */}
      <SalonPhotoSlider />

      {/* ============================================================ */}
      {/* 5. MEET OUR EXPERT STYLISTS */}
      {/* ============================================================ */}
      <MeetOurStylists />

      {/* ============================================================ */}
      {/* 6. GOOGLE REVIEWS SLIDER */}
      {/* ============================================================ */}
      <GoogleReviewsSlider />

      {/* ============================================================ */}
      {/* 7. GOOGLE MAP RATING & LOCATION SECTION */}
      {/* ============================================================ */}
      <GoogleMapRatingSection />
    </div>
  );
};
