/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { businessConfig } from '../../data/business';
import { Container } from '../common/Container';
import { Star, ShieldCheck, Sparkles, Clock } from 'lucide-react';

export const TrustBar: React.FC = () => {
  const { trust, operatingHours } = businessConfig;

  return (
    <section className="border-y border-stone-200 bg-white py-8 select-none">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 items-center">
          {/* Trust Marker 1: Rating */}
          <div className="flex items-center gap-3.5 group">
            <div className="w-12 h-12 rounded-full bg-[#FEF9EE] border border-[#E9DFCE] group-hover:border-[#C5A46A] flex items-center justify-center shrink-0 shadow-xs transition-colors">
              <Star className="w-5 h-5 text-[#9A7B38] fill-[#9A7B38]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 font-serif text-lg text-[#18181B] font-semibold tracking-tight">
                <span>{trust.googleRating}</span>
                <span className="text-xs text-[#C5A46A]">★★★★★</span>
              </div>
              <p className="text-xs text-stone-500">
                {trust.reviewCount} Verified Client Reviews
              </p>
            </div>
          </div>

          {/* Trust Marker 2: Booking Mode */}
          <div className="flex items-center gap-3.5 group">
            <div className="w-12 h-12 rounded-full bg-[#FEF9EE] border border-[#E9DFCE] group-hover:border-[#C5A46A] flex items-center justify-center shrink-0 shadow-xs transition-colors">
              <ShieldCheck className="w-5 h-5 text-[#9A7B38]" />
            </div>
            <div>
              <div className="font-serif text-lg text-[#18181B] font-semibold tracking-tight">
                {trust.verifiedBadgeText || 'Private Studio'}
              </div>
              <p className="text-xs text-stone-500">Uninterrupted 1-on-1 Sessions</p>
            </div>
          </div>

          {/* Trust Marker 3: Curated Partner Products */}
          <div className="flex items-center gap-3.5 group">
            <div className="w-12 h-12 rounded-full bg-[#FEF9EE] border border-[#E9DFCE] group-hover:border-[#C5A46A] flex items-center justify-center shrink-0 shadow-xs transition-colors">
              <Sparkles className="w-5 h-5 text-[#9A7B38]" />
            </div>
            <div>
              <div className="font-serif text-lg text-[#18181B] font-semibold tracking-tight">
                Clean Formulations
              </div>
              <p className="text-xs text-stone-500">Davines & Organic Actives</p>
            </div>
          </div>

          {/* Trust Marker 4: Hours / Concierge */}
          <div className="flex items-center gap-3.5 group">
            <div className="w-12 h-12 rounded-full bg-[#FEF9EE] border border-[#E9DFCE] group-hover:border-[#C5A46A] flex items-center justify-center shrink-0 shadow-xs transition-colors">
              <Clock className="w-5 h-5 text-[#9A7B38]" />
            </div>
            <div>
              <div className="font-serif text-lg text-[#18181B] font-semibold tracking-tight">
                Tue – Sun Atelier
              </div>
              <p className="text-xs text-stone-500 truncate">
                {operatingHours[0]?.hours}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
