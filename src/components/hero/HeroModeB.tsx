/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { businessConfig } from '../../data/business';
import { buildWhatsAppUrl } from '../../utils/whatsapp';
import { Button } from '../common/Button';
import { Container } from '../common/Container';
import { Play, Pause, MessageCircle, ArrowUpRight } from 'lucide-react';

export const HeroModeB: React.FC = () => {
  const { hero, location } = businessConfig;
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section
      id="top"
      className="relative min-h-[90vh] flex items-center justify-center bg-[#11100F] overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28"
    >
      {/* Video / Poster Canvas */}
      <div className="absolute inset-0 z-0 bg-[#171411]">
        {/* Placeholder simulated video stream / aesthetic texture */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#11100F] via-[#11100F]/80 to-[#11100F]/90 z-10" />

        <div className="absolute inset-0 flex items-center justify-center opacity-25">
          <svg viewBox="0 0 1000 600" className="w-full h-full object-cover stroke-[#C5A46A]/20" fill="none">
            <rect width="1000" height="600" fill="#14110e" />
            <circle cx="500" cy="300" r="240" strokeWidth="1" />
            <circle cx="500" cy="300" r="160" strokeDasharray="4 6" strokeWidth="0.8" />
            <line x1="200" y1="300" x2="800" y2="300" strokeWidth="0.5" />
          </svg>
        </div>
      </div>

      <Container className="relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Editorial Headline & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <span className="text-xs uppercase tracking-[0.24em] text-[#C5A46A] mb-4 font-medium select-none">
              Mode B · Video & Atmosphere Reel
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
          </div>

          {/* Right Column: Interactive Video Showcase Module */}
          <div className="lg:col-span-5">
            <div className="relative aspect-4/3 sm:aspect-16/9 lg:aspect-4/3 w-full bg-[#1e1a16] border border-[#3d352e] rounded-3xl p-6 flex flex-col justify-between group overflow-hidden shadow-2xl">
              {/* High-res poster backdrop */}
              <img
                src={hero.posterImage || 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=85'}
                alt="Studio atmosphere reel"
                className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#11100F] via-[#11100F]/60 to-[#11100F]/40" />

              <div className="relative z-10 flex items-center justify-between text-xs text-[#F6F1E8]">
                <span className="font-mono text-[#C5A46A] bg-[#11100F]/80 px-3 py-1 rounded-full border border-[#332c25]">
                  REEL · ATELIER WALKTHROUGH
                </span>
                <span className="bg-[#11100F]/80 px-3 py-1 rounded-full border border-[#332c25]">01:15</span>
              </div>

              <div className="relative z-10 flex flex-col items-center justify-center my-auto py-8">
                <button
                  type="button"
                  onClick={() => setIsPlaying(!isPlaying)}
                  aria-label={isPlaying ? 'Pause studio reel' : 'Play studio reel'}
                  className="w-16 h-16 rounded-full border border-[#C5A46A] flex items-center justify-center text-[#C5A46A] bg-[#171411]/90 backdrop-blur-sm hover:bg-[#C5A46A] hover:text-[#11100F] transition-all duration-300 min-h-[44px] min-w-[44px] cursor-pointer shadow-xl"
                >
                  {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
                </button>
                <span className="mt-4 text-xs tracking-wider uppercase text-[#F6F1E8] font-medium drop-shadow-md">
                  {isPlaying ? 'Playing Studio Atmosphere' : 'Experience The Space'}
                </span>
              </div>

              <div className="relative z-10 text-[11px] text-[#D9CCBA] border-t border-[#3d352e]/80 pt-3 flex justify-between bg-[#11100F]/60 px-4 py-1.5 rounded-full backdrop-blur-sm">
                <span>{location.addressLine1}</span>
                <span>Bengaluru</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
