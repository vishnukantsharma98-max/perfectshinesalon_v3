/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useCallback } from 'react';
import { beforeAfterPairs } from '../../data/gallery';
import { ASSET_MAP } from '../../data/assets';
import { Container, SectionHeader } from '../common/Container';
import { Sparkles, MoveHorizontal } from 'lucide-react';

export const BeforeAfterFoundation: React.FC = () => {
  const pair = beforeAfterPairs[0];
  const [sliderPosition, setSliderPosition] = useState(50); // percentage (0 - 100)
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const beforeAsset = pair ? ASSET_MAP[pair.beforeImageSlot] : null;
  const afterAsset = pair ? ASSET_MAP[pair.afterImageSlot] : null;

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const clampedPercentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(clampedPercentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  if (!pair || !beforeAsset || !afterAsset) return null;

  return (
    <section id="transformation" className="py-16 md:py-24 bg-white border-t border-stone-200">
      <Container>
        <SectionHeader
          eyebrow="Real Client Transformations"
          title="Healthy, radiant results you can see and feel."
          subtitle="Swipe to compare: custom dimensional balayage paired with deep restorative hydration."
        />

        <div className="max-w-4xl mx-auto">
          {/* Interactive Split Slider Box */}
          <div
            ref={containerRef}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            className="relative aspect-4/3 sm:aspect-16/10 w-full overflow-hidden rounded-2xl border border-stone-300 bg-stone-100 select-none cursor-ew-resize shadow-md group hover:border-[#C5A46A] transition-colors"
          >
            {/* After Image (Base underneath) */}
            <img
              src={afterAsset.url}
              alt={afterAsset.alt}
              className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
              loading="lazy"
              referrerPolicy="no-referrer"
            />

            {/* Before Image (Aligned pixel-for-pixel using clip-path) */}
            <img
              src={beforeAsset.url}
              alt={beforeAsset.alt}
              className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
              style={{
                clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`,
              }}
              loading="lazy"
              referrerPolicy="no-referrer"
            />

            {/* Divider Line & Handle */}
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-[#C5A46A] z-20 pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-white border border-[#C5A46A] shadow-md flex items-center justify-center text-[#9A7B38] group-hover:scale-110 transition-transform">
                <MoveHorizontal className="w-4 h-4" />
              </div>
            </div>

            {/* Before Label */}
            <div className="absolute top-4 left-4 z-10 pointer-events-none">
              <span className="text-[10px] uppercase tracking-widest font-bold px-3 py-1 bg-white/95 text-stone-700 border border-stone-200 rounded-full shadow-xs backdrop-blur-xs">
                {pair.labelBefore}
              </span>
            </div>

            {/* After Label */}
            <div className="absolute top-4 right-4 z-10 pointer-events-none">
              <span className="text-[10px] uppercase tracking-widest font-bold px-3 py-1 bg-white/95 text-[#9A7B38] border border-amber-200 rounded-full shadow-xs backdrop-blur-xs">
                {pair.labelAfter}
              </span>
            </div>

            {/* Interactive hint footnote */}
            <div className="absolute bottom-3 inset-x-0 flex justify-center pointer-events-none">
              <span className="text-[11px] font-medium text-stone-800 bg-white/95 backdrop-blur-xs px-4 py-1.5 rounded-full border border-stone-200 shadow-xs">
                ↔ Drag slider to view transformation
              </span>
            </div>
          </div>

          {/* Transformation Narrative Note */}
          <div className="mt-5 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-stone-600 gap-3 pt-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#9A7B38]" />
              <span className="text-stone-900 font-semibold">{pair.treatmentName}:</span>
              <span>{pair.notes}</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
