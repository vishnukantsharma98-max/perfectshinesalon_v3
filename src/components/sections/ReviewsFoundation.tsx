/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { reviewsData } from '../../data/reviews';
import { businessConfig } from '../../data/business';
import { Container, SectionHeader } from '../common/Container';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

export const ReviewsFoundation: React.FC = () => {
  const activeReviews = reviewsData.filter((r) => r.enabled);

  if (activeReviews.length === 0) return null;

  return (
    <section id="reviews" className="py-16 md:py-24 bg-[#FAF8F5] border-t border-stone-200">
      <Container>
        <SectionHeader
          eyebrow="Client Notes & Experience"
          title="Quiet praise from guests who value unhurried precision."
          subtitle={`Verified experiences reflecting our ${businessConfig.trust.googleRating}★ Google studio reputation on Lavelle Road.`}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {activeReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white border border-stone-200 p-7 sm:p-8 flex flex-col justify-between rounded-2xl relative group hover:border-[#C5A46A] transition-all duration-300 shadow-xs hover:shadow-md"
            >
              <div>
                {/* Rating stars & verified tag */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-[#C5A46A] gap-0.5">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#C5A46A]" />
                    ))}
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-stone-500 flex items-center gap-1 font-mono">
                    <CheckCircle2 className="w-3 h-3 text-[#9A7B38]" />
                    {rev.source}
                  </span>
                </div>

                <Quote className="w-6 h-6 text-[#C5A46A]/30 mb-3" />

                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed italic">
                  "{rev.text}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-serif text-sm text-[#18181B] font-semibold">{rev.author}</h4>
                  {rev.serviceTaken && (
                    <span className="text-[11px] text-stone-500 block">{rev.serviceTaken}</span>
                  )}
                </div>
                <span className="text-[10px] text-stone-400 font-mono">{rev.date}</span>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
