/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { businessConfig } from '../../data/business';
import { Container } from '../common/Container';
import { MediaSlot } from '../common/MediaSlot';

export const PhilosophyFoundation: React.FC = () => {
  const { name, ownerName, ownerTitle } = businessConfig;

  return (
    <section id="philosophy" className="py-16 md:py-24 bg-[#FAF8F5] border-t border-stone-200">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Architectural Photo Slot */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative group">
              <div className="absolute -inset-2 border border-[#C5A46A]/30 rounded-3xl pointer-events-none group-hover:border-[#C5A46A]/60 transition-colors duration-500" />
              <MediaSlot
                slotKey="interior-01"
                altText="The tranquil studio space at Luméa"
                aspect="3:4"
                title="Private Styling Atelier"
                subtitle="Designed for quiet relaxation & natural light"
              />
            </div>
          </div>

          {/* Right Column: Editorial Philosophy & Owner Signature */}
          <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col items-start">
            <span className="text-xs uppercase tracking-[0.24em] text-[#9A7B38] mb-3 font-bold select-none">
              Our Studio Philosophy
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#18181B] font-normal leading-[1.15] text-balance">
              Hair & skin tailored to how you live.
            </h2>

            <p className="mt-5 text-base text-stone-700 leading-relaxed font-normal">
              We believe true luxury is feeling unhurried. Every visit begins with a relaxed consultation to understand your routine, texture, and personal aesthetic.
            </p>

            <p className="mt-3 text-sm text-stone-600 leading-relaxed">
              We intentionally limit daily appointments so our specialists have complete focus on your hair health, precise styling, and restorative spa relaxation.
            </p>

            <div className="mt-8 pt-6 border-t border-stone-200 w-full flex items-center justify-between">
              <div>
                <p className="font-serif text-xl font-medium text-[#18181B]">{ownerName}</p>
                <p className="text-xs text-stone-500">{ownerTitle} · {name}</p>
              </div>
              <span className="font-serif italic text-3xl text-[#9A7B38]/80 select-none">
                Luméa
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
