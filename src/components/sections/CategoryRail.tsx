/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useBooking } from '../../context/BookingContext';
import { Container } from '../common/Container';
import { ASSET_MAP } from '../../data/assets';

interface CategoryRailItem {
  id: string;
  name: string;
  imageSlot: string;
  label: string;
  badge?: string;
}

const CATEGORY_ITEMS: CategoryRailItem[] = [
  {
    id: 'haircut',
    name: 'Haircuts',
    label: 'Cuts & Styling',
    imageSlot: 'hair-01',
    badge: 'Popular',
  },
  {
    id: 'facial',
    name: 'Facials',
    label: 'Skin & Glow',
    imageSlot: 'beauty-02',
    badge: 'Trending',
  },
  {
    id: 'hair-spa',
    name: 'Head Spa',
    label: 'Japanese Spa',
    imageSlot: 'interior-02',
    badge: 'Relaxation',
  },
  {
    id: 'hair-color',
    name: 'Hair Colour',
    label: 'Balayage & Gloss',
    imageSlot: 'hair-02',
    badge: 'Trending',
  },
  {
    id: 'hands-feet',
    name: 'Hands & Feet',
    label: 'Spa Mani-Pedi',
    imageSlot: 'nails-01',
    badge: 'Care',
  },
  {
    id: 'waxing',
    name: 'Wax & Thread',
    label: 'Rica Waxing',
    imageSlot: 'waxing-01',
  },
  {
    id: 'beard',
    name: 'Beard Grooming',
    label: 'Razor & Shave',
    imageSlot: 'mens-01',
    badge: "Men's Suite",
  },
  {
    id: 'makeup',
    name: 'Makeup Glam',
    label: 'Party & Festive',
    imageSlot: 'makeup-01',
  },
  {
    id: 'premium',
    name: 'Packages',
    label: 'Luxury Combos',
    imageSlot: 'interior-01',
    badge: 'All-In-One',
  },
];

export const CategoryRail: React.FC = () => {
  const { selectAndScrollToCategory, activeCategory, openBookingPortal } = useBooking();

  return (
    <section className="bg-white py-8 border-b border-stone-200 select-none">
      <Container>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xs uppercase tracking-widest font-bold text-[#9A7B38]">
              Explore Services By Category
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Tap any category to view curated treatments & book your slot
            </p>
          </div>
          <button
            type="button"
            onClick={() => openBookingPortal()}
            className="text-xs font-semibold text-[#9A7B38] hover:text-[#B8860B] transition-colors hidden sm:block cursor-pointer"
          >
            Launch Online Booking Portal →
          </button>
        </div>

        {/* Circular Enrich Category Rail with Horizontal Scroll */}
        <div className="flex items-center justify-between gap-4 sm:gap-6 overflow-x-auto no-scrollbar py-2 px-1">
          {CATEGORY_ITEMS.map((item, idx) => {
            const asset = ASSET_MAP[item.imageSlot];
            const isCurrent = activeCategory === item.id;

            return (
              <button
                key={idx}
                type="button"
                onClick={() => selectAndScrollToCategory(item.id)}
                className="group flex flex-col items-center text-center shrink-0 cursor-pointer focus:outline-none"
              >
                {/* Round Avatar Container with Hover Glow */}
                <div
                  className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-full p-1 border-2 transition-all duration-300 transform group-hover:scale-105 shadow-sm group-hover:shadow-md ${
                    isCurrent
                      ? 'border-[#C5A46A] ring-4 ring-[#C5A46A]/20 bg-[#FEF9EE]'
                      : 'border-stone-200 hover:border-[#C5A46A]/70 bg-stone-50'
                  }`}
                >
                  <div className="w-full h-full rounded-full overflow-hidden bg-stone-200">
                    {asset && (
                      <img
                        src={asset.url}
                        alt={item.name}
                        loading="lazy"
                        className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                      />
                    )}
                  </div>

                  {item.badge && (
                    <span className="absolute -bottom-1 inset-x-0 mx-auto w-max max-w-[85px] text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#18181B] text-[#DFCA9E] border border-amber-200/40 shadow-xs truncate">
                      {item.badge}
                    </span>
                  )}
                </div>

                {/* Text Label */}
                <span
                  className={`mt-2.5 text-xs font-medium tracking-tight block transition-colors group-hover:text-[#9A7B38] ${
                    isCurrent ? 'text-[#9A7B38] font-bold' : 'text-stone-800'
                  }`}
                >
                  {item.name}
                </span>
                <span className="text-[10px] text-stone-400 block -mt-0.5">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </Container>
    </section>
  );
};
