/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { businessConfig } from '../../data/business';

interface GoogleReviewItem {
  id: string;
  name: string;
  initials: string;
  timeAgo: string;
  rating: number;
  service: string;
  text: string;
}

const GOOGLE_REVIEWS: GoogleReviewItem[] = [
  {
    id: 'rev-1',
    name: 'Rahul Sharma',
    initials: 'RS',
    timeAgo: '1 week ago',
    rating: 5,
    service: 'Fade Haircut & Beard Grooming',
    text: 'Best salon in Ajmer! Got a sharp fade haircut and beard styling. Very polite staff, clean setup, and quick service.',
  },
  {
    id: 'rev-2',
    name: 'Priya Rathore',
    initials: 'PR',
    timeAgo: '2 weeks ago',
    rating: 5,
    service: 'Hair Rebonding (Straightening)',
    text: 'Got hair rebonding done here. Results are super sleek, glossy, and silky! Truly the best salon experience in Gyan Vihar.',
  },
  {
    id: 'rev-3',
    name: 'Vikram Singh Rawat',
    initials: 'VR',
    timeAgo: '3 weeks ago',
    rating: 5,
    service: 'Keratin Protein Treatment',
    text: 'Done keratin smoothing. Hair feels completely frizz-free and manageable in Ajmer weather. 100% recommended!',
  },
  {
    id: 'rev-4',
    name: 'Ananya Gupta',
    initials: 'AG',
    timeAgo: '1 month ago',
    rating: 5,
    service: 'Bridal & Party Makeup',
    text: 'Their party makeup was so subtle, glowing, and stayed flawless the whole night! The nail art was also stunning.',
  },
  {
    id: 'rev-5',
    name: 'Rajesh Verma',
    initials: 'RV',
    timeAgo: '1 month ago',
    rating: 5,
    service: 'L’Oréal Hair Spa & Style',
    text: 'Original L’Oréal products opened right in front of you. Great hospitality, genuine advice, and very reasonable rates.',
  },
  {
    id: 'rev-6',
    name: 'Sneha Jain',
    initials: 'SJ',
    timeAgo: '1 month ago',
    rating: 5,
    service: 'Deep Hair Spa & Rejuvenation',
    text: 'The hair spa and head massage were incredibly relaxing. Restored shine and softness to dry hair. 5/5 stars!',
  },
  {
    id: 'rev-7',
    name: 'Rohit Meena',
    initials: 'RM',
    timeAgo: '2 months ago',
    rating: 5,
    service: 'Haircut & Styling',
    text: 'Punctual appointment timing, great hygiene, and expert stylists. My go-to unisex salon in BK Kaul Road.',
  },
  {
    id: 'rev-8',
    name: 'Pooja Chauhan',
    initials: 'PC',
    timeAgo: '2 months ago',
    rating: 5,
    service: 'Nail Art & Hair Texture',
    text: 'Loved my gel nail extensions and hair styling for my cousin’s wedding. Received so many compliments!',
  },
];

export const GoogleReviewsSlider: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isInteractingRef = useRef<boolean>(false);
  const interactionTimeoutRef = useRef<number | null>(null);

  // Smooth continuous auto-sliding WITHOUT pause on hover
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let animationFrameId: number;
    const speed = 0.75;

    const step = () => {
      if (el && !isInteractingRef.current) {
        el.scrollLeft += speed;
        if (el.scrollLeft >= (el.scrollWidth * 2) / 3) {
          el.scrollLeft -= el.scrollWidth / 3;
        }
      }
      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const scrollByAmount = useCallback((amount: number) => {
    const el = scrollRef.current;
    if (!el) return;

    isInteractingRef.current = true;
    if (interactionTimeoutRef.current) {
      window.clearTimeout(interactionTimeoutRef.current);
    }

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

  return (
    <section className="py-8 bg-stone-50/70 border-t border-stone-200 select-none overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              {/* Google G Icon */}
              <svg viewBox="0 0 48 48" className="w-5 h-5 shrink-0" xmlns="http://www.w3.org/2000/svg">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
              </svg>
              <span className="text-xs uppercase font-bold tracking-wider text-stone-500">
                Verified Google Reviews · 4.9 Rating
              </span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
              What Our Clients Say
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={businessConfig.location.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-[#D61C4E] hover:underline mr-2 hidden sm:inline-block"
            >
              Write a Review →
            </a>
            <button
              type="button"
              onClick={() => scrollByAmount(-300)}
              className="w-9 h-9 rounded-full bg-white border border-stone-200 hover:border-stone-400 text-stone-700 flex items-center justify-center transition-all cursor-pointer shadow-2xs hover:scale-105 active:scale-95"
              aria-label="Previous reviews"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => scrollByAmount(300)}
              className="w-9 h-9 rounded-full bg-white border border-stone-200 hover:border-stone-400 text-stone-700 flex items-center justify-center transition-all cursor-pointer shadow-2xs hover:scale-105 active:scale-95"
              aria-label="Next reviews"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Continuous auto-moving reviews track (No hover pause) */}
        <div
          ref={scrollRef}
          className="flex items-stretch gap-4 sm:gap-5 overflow-x-auto pb-4 pt-1 no-scrollbar transform-gpu"
        >
          {[...GOOGLE_REVIEWS, ...GOOGLE_REVIEWS, ...GOOGLE_REVIEWS].map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="w-[280px] sm:w-[320px] rounded-2xl bg-white border border-stone-200 p-4 sm:p-5 shadow-2xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between shrink-0"
            >
              <div className="space-y-2.5">
                {/* User info row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-rose-500 to-amber-500 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                      {item.initials}
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="font-bold text-xs sm:text-sm text-stone-900 leading-tight">
                          {item.name}
                        </span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />
                      </div>
                      <span className="text-[10px] text-stone-400">
                        {item.timeAgo}
                      </span>
                    </div>
                  </div>

                  {/* Google G */}
                  <div className="w-5 h-5 rounded-full bg-stone-50 border border-stone-200 flex items-center justify-center p-0.5">
                    <svg viewBox="0 0 48 48" className="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg">
                      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                    </svg>
                  </div>
                </div>

                {/* Stars and Service Tag */}
                <div className="flex items-center gap-1 text-amber-400 text-sm">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                  <span className="text-[10px] text-stone-500 font-semibold ml-1.5 bg-stone-100 px-2 py-0.5 rounded-full">
                    {item.service}
                  </span>
                </div>

                {/* Review text */}
                <p className="text-xs text-stone-700 leading-relaxed font-normal">
                  "{item.text}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
