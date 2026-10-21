/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { galleryItems } from '../../data/gallery';
import { GalleryItem } from '../../types/gallery';
import { ASSET_MAP } from '../../data/assets';
import { Container, SectionHeader } from '../common/Container';
import { GalleryLightbox } from '../gallery/GalleryLightbox';
import { Maximize2 } from 'lucide-react';

export const GalleryFoundation: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [activeLightboxItem, setActiveLightboxItem] = useState<GalleryItem | null>(null);

  const filteredItems = galleryItems.filter(
    (item) => selectedFilter === 'all' || item.category === selectedFilter
  );

  const openLightbox = (item: GalleryItem) => {
    setActiveLightboxItem(item);
  };

  const handleNext = () => {
    if (!activeLightboxItem) return;
    const currentIndex = filteredItems.findIndex((i) => i.id === activeLightboxItem.id);
    const nextIndex = (currentIndex + 1) % filteredItems.length;
    setActiveLightboxItem(filteredItems[nextIndex]);
  };

  const handlePrev = () => {
    if (!activeLightboxItem) return;
    const currentIndex = filteredItems.findIndex((i) => i.id === activeLightboxItem.id);
    const prevIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    setActiveLightboxItem(filteredItems[prevIndex]);
  };

  return (
    <section id="gallery" className="py-16 md:py-24 bg-[#FAF8F5] border-t border-stone-200">
      <Container>
        <SectionHeader
          eyebrow="Our Work & Spaces"
          title="Quiet luxury, organic texture, and timeless aesthetic discipline."
          subtitle="An intimate photographic look into the client transformations and tranquil spaces crafted at our Lavelle Road atelier."
        />

        {/* Filter Navigation */}
        <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-2 no-scrollbar text-xs uppercase tracking-wider">
          {[
            { id: 'all', label: 'All Portfolio' },
            { id: 'salon', label: 'The Atelier' },
            { id: 'hair', label: 'Hair & Balayage' },
            { id: 'skin', label: 'Facial Therapy' },
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedFilter(cat.id)}
              className={`px-4 py-2 rounded-full transition-all duration-200 cursor-pointer whitespace-nowrap font-semibold ${
                selectedFilter === cat.id
                  ? 'bg-gradient-to-r from-[#D4AF37] via-[#C5A46A] to-[#B8860B] text-[#18181B] shadow-xs border border-[#E5CA98]'
                  : 'bg-white text-stone-600 border border-stone-200 hover:text-stone-900 hover:border-stone-300'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Editorial Responsive Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          {/* Main Hero Shot (8 cols) */}
          {filteredItems[0] && (
            <div
              className="md:col-span-8 group relative overflow-hidden rounded-2xl border border-stone-200 bg-stone-100 cursor-pointer min-h-[380px] sm:min-h-[460px] shadow-sm hover:shadow-md transition-shadow"
              onClick={() => openLightbox(filteredItems[0])}
            >
              <img
                src={ASSET_MAP[filteredItems[0].imageSlot]?.url}
                alt={filteredItems[0].title}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#DFCA9E] font-bold block mb-1">
                    Featured Atelier Space
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-white drop-shadow-md">
                    {filteredItems[0].title}
                  </h3>
                  {filteredItems[0].caption && (
                    <p className="text-xs text-stone-200 mt-1 max-w-md drop-shadow">
                      {filteredItems[0].caption}
                    </p>
                  )}
                </div>
                <div className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-xs border border-white flex items-center justify-center text-[#18181B] shrink-0 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>
            </div>
          )}

          {/* Secondary Stack (4 cols) */}
          <div className="md:col-span-4 flex flex-col gap-6">
            {filteredItems.slice(1, 3).map((item) => (
              <div
                key={item.id}
                className="group relative overflow-hidden rounded-2xl border border-stone-200 bg-stone-100 cursor-pointer aspect-4/3 flex-1 shadow-sm hover:shadow-md transition-shadow"
                onClick={() => openLightbox(item)}
              >
                <img
                  src={ASSET_MAP[item.imageSlot]?.url}
                  alt={item.title}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <div>
                    <h4 className="font-serif text-lg text-white drop-shadow">
                      {item.title}
                    </h4>
                    {item.caption && (
                      <p className="text-[11px] text-stone-200 mt-0.5 line-clamp-1">
                        {item.caption}
                      </p>
                    )}
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/90 border border-white flex items-center justify-center text-[#18181B] shrink-0 opacity-0 group-hover:opacity-100 transition-opacity ml-2 shadow-xs">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Grid for remaining items */}
          {filteredItems.slice(3).map((item) => (
            <div
              key={item.id}
              className="md:col-span-6 group relative overflow-hidden rounded-2xl border border-stone-200 bg-stone-100 cursor-pointer aspect-16/10 shadow-sm hover:shadow-md transition-shadow"
              onClick={() => openLightbox(item)}
            >
              <img
                src={ASSET_MAP[item.imageSlot]?.url}
                alt={item.title}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                <div>
                  <h4 className="font-serif text-xl text-white drop-shadow">
                    {item.title}
                  </h4>
                  {item.caption && (
                    <p className="text-xs text-stone-200 mt-1 line-clamp-1">
                      {item.caption}
                    </p>
                  )}
                </div>
                <div className="w-8 h-8 rounded-full bg-white/90 border border-white flex items-center justify-center text-[#18181B] shrink-0 opacity-0 group-hover:opacity-100 transition-opacity ml-2 shadow-xs">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>

      {/* Lightbox Modal */}
      <GalleryLightbox
        item={activeLightboxItem}
        onClose={() => setActiveLightboxItem(null)}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </section>
  );
};
