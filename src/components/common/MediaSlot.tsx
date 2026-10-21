/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { GalleryAspect } from '../../types/gallery';
import { ASSET_MAP } from '../../data/assets';

interface MediaSlotProps {
  slotKey: string;
  imageSrc?: string;
  altText: string;
  aspect?: GalleryAspect;
  className?: string;
  title?: string;
  subtitle?: string;
  overlayGradient?: boolean;
}

const aspectClassMap: Record<GalleryAspect, string> = {
  '16:9': 'aspect-video',
  '4:3': 'aspect-4/3',
  '3:4': 'aspect-3/4',
  '1:1': 'aspect-square',
};

/**
 * Resilient, high-fidelity media presentation component.
 * Automatically resolves rich curated photography from ASSET_MAP or imageSrc.
 * If network fails, falls back gracefully to warm architectural line art.
 */
export const MediaSlot: React.FC<MediaSlotProps> = ({
  slotKey,
  imageSrc,
  altText,
  aspect = '4:3',
  className = '',
  title,
  subtitle,
  overlayGradient = true,
}) => {
  const [loadFailed, setLoadFailed] = useState(false);
  const aspectClass = aspectClassMap[aspect] || 'aspect-4/3';

  // Resolve source: explicit prop > ASSET_MAP lookup
  const resolvedSrc = imageSrc || ASSET_MAP[slotKey]?.url;
  const resolvedAlt = altText || ASSET_MAP[slotKey]?.alt || 'Luméa Salon visual';

  const hasRealImage = Boolean(resolvedSrc && !loadFailed);

  return (
    <div
      className={`relative overflow-hidden w-full bg-stone-100 border border-stone-200 select-none rounded-2xl shadow-sm ${aspectClass} ${className}`}
    >
      {hasRealImage ? (
        <img
          src={resolvedSrc}
          alt={resolvedAlt}
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={() => setLoadFailed(true)}
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out hover:scale-105"
        />
      ) : (
        /* Bespoke Architectural Canvas Fallback */
        <div className="absolute inset-0 flex flex-col justify-between p-6 bg-gradient-to-br from-[#FAF8F5] via-stone-100 to-stone-200">
          {/* Subtle architectural arched line art */}
          <div className="absolute inset-0 opacity-20 pointer-events-none flex items-center justify-center">
            <svg
              viewBox="0 0 400 500"
              className="w-full h-full max-w-[85%] stroke-[#9A7B38]"
              fill="none"
              strokeWidth="1.2"
            >
              <path d="M 50 480 V 220 A 150 150 0 0 1 350 220 V 480" />
              <path d="M 80 480 V 230 A 120 120 0 0 1 320 230 V 480" strokeDasharray="3 4" />
              <circle cx="200" cy="180" r="40" strokeWidth="0.8" />
              <line x1="200" y1="40" x2="200" y2="480" strokeWidth="0.5" strokeDasharray="6 6" />
            </svg>
          </div>

          {/* Top slot identifier badge */}
          <div className="relative z-10 flex items-center justify-between text-[11px] uppercase tracking-widest text-stone-500 font-bold">
            <span className="font-mono text-[#9A7B38]">{slotKey}</span>
            <span className="text-stone-400">{aspect}</span>
          </div>

          {/* Center / Bottom editorial typography */}
          <div className="relative z-10 space-y-1 mt-auto">
            {title ? (
              <h4 className="font-serif text-lg text-stone-900 font-semibold tracking-wide leading-snug">
                {title}
              </h4>
            ) : (
              <h4 className="font-serif text-lg text-stone-900 font-semibold tracking-wide">
                Luméa Atelier Asset
              </h4>
            )}
            {subtitle ? (
              <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                {subtitle}
              </p>
            ) : (
              <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                {altText}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Measured contrast scrim for media overlay legibility */}
      {overlayGradient && hasRealImage && (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none"
        />
      )}

      {/* Optional Editorial Title & Caption overlay on image */}
      {hasRealImage && (title || subtitle) && (
        <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 z-20 pointer-events-none">
          {title && (
            <h4 className="font-serif text-lg sm:text-xl text-white drop-shadow-md">
              {title}
            </h4>
          )}
          {subtitle && (
            <p className="text-xs text-stone-200 mt-1 line-clamp-2 drop-shadow-xs">
              {subtitle}
            </p>
          )}
        </div>
      )}
    </div>
  );
};
