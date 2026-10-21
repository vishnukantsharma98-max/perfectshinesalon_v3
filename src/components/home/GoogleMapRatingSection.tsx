/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { businessConfig } from '../../data/business';
import { Navigation, Star, ExternalLink, MapPin } from 'lucide-react';

export const GoogleMapRatingSection: React.FC = () => {
  return (
    <section className="py-8 bg-[#FAF8F5] border-y border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Google Rating (Matching Image 5 layout) */}
          <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left space-y-3">
            {/* Official Google G Logo */}
            <div className="w-14 h-14 rounded-2xl bg-white shadow-xs border border-stone-200 flex items-center justify-center p-2.5">
              <svg viewBox="0 0 48 48" className="w-9 h-9" xmlns="http://www.w3.org/2000/svg">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
              </svg>
            </div>

            <div>
              <h3 className="font-serif text-2xl font-bold text-stone-900">
                Google Rating
              </h3>
              <div className="flex items-center gap-2 mt-1 justify-center lg:justify-start">
                <span className="font-bold text-3xl text-stone-900 leading-none">
                  4.9
                </span>
                <div className="flex items-center text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className="text-xl">★</span>
                  ))}
                </div>
              </div>
            </div>

            <a
              href={businessConfig.location.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-stone-700 hover:text-[#D61C4E] underline flex items-center gap-1 transition-colors"
            >
              <span>See all 380+ Google reviews</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Right Column: Google Maps Interactive Card (Ajmer, Rajasthan) */}
          <div className="lg:col-span-8">
            <div className="relative w-full h-[280px] sm:h-[320px] rounded-3xl overflow-hidden border border-stone-200 shadow-md bg-stone-100">
              {/* Real Google Maps Embed for Ajmer Location */}
              <iframe
                title="Salon Location Google Map"
                src="https://maps.google.com/maps?q=26.471639,74.607222&hl=en&z=16&output=embed"
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              {/* Overlaid Google Map Info Card */}
              <div className="absolute top-3 left-3 max-w-[280px] sm:max-w-xs bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-lg border border-stone-200 space-y-1.5 text-xs text-stone-800">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="font-bold text-sm text-stone-900 leading-tight">
                      PERFECT SHINE UNISEX SALON
                    </h4>
                    <p className="text-[11px] text-stone-500 mt-0.5 leading-snug">
                      S-16, B K Kaul Rd, Gyan Vihar Colony, Ajmer
                    </p>
                  </div>
                  <a
                    href={businessConfig.location.directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors flex flex-col items-center justify-center shrink-0"
                    title="Get Directions"
                  >
                    <Navigation className="w-4 h-4" />
                    <span className="text-[9px] font-bold mt-0.5">Directions</span>
                  </a>
                </div>

                <div className="flex items-center gap-1.5 text-[11px] text-stone-600 pt-0.5 border-t border-stone-100">
                  <span className="font-bold text-stone-900">4.9</span>
                  <span className="text-amber-500">★★★★★</span>
                  <span className="text-stone-400 font-medium">380+ reviews</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
