/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { businessConfig } from '../../data/business';
import { buildWhatsAppUrl } from '../../utils/whatsapp';
import { Button } from '../common/Button';
import { Container } from '../common/Container';
import { MediaSlot } from '../common/MediaSlot';
import { MessageCircle, ArrowUpRight } from 'lucide-react';

export const HeroModeC: React.FC = () => {
  const { hero, ownerName, ownerTitle } = businessConfig;

  return (
    <section
      id="top"
      className="relative min-h-[90vh] flex items-center justify-center bg-[#11100F] overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Editorial Narrative & Marquee Quote */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <span className="text-xs uppercase tracking-[0.24em] text-[#C5A46A] mb-4 font-medium select-none">
              Mode C · Director Cutout & Editorial Split
            </span>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#F6F1E8] font-normal tracking-tight leading-[1.12] text-balance">
              {hero.title}
            </h1>

            <p className="mt-5 text-base sm:text-lg text-[#D9CCBA] font-light leading-relaxed max-w-lg">
              {hero.subtitle}
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <Button
                variant="primary"
                size="lg"
                href={buildWhatsAppUrl('general')}
                target="_blank"
                icon={<MessageCircle className="w-4 h-4" />}
              >
                {hero.primaryCtaLabel}
              </Button>
              <Button
                variant="outline"
                size="lg"
                href="#services"
                icon={<ArrowUpRight className="w-4 h-4" />}
                iconPosition="right"
              >
                {hero.secondaryCtaLabel}
              </Button>
            </div>

            {ownerName && (
              <div className="mt-10 pt-6 border-t border-[#2a241e] text-xs text-[#867D71]">
                <span className="text-[#F6F1E8] font-medium">{ownerName}</span>
                <span className="mx-2">·</span>
                <span>{ownerTitle}</span>
              </div>
            )}
          </div>

          {/* Right Column: Stylist / Artisan Portrait Slot */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-md relative">
              <div className="absolute -inset-2 border border-[#C5A46A]/20 rounded-3xl pointer-events-none -rotate-1" />
              <MediaSlot
                slotKey="team-founder"
                altText="Elena Vance, Founder & Creative Director"
                aspect="3:4"
                title={ownerName}
                subtitle={ownerTitle}
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
