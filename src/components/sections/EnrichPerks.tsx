/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Container, SectionHeader } from '../common/Container';
import { useBooking } from '../../context/BookingContext';
import {
  Sparkles,
  ShieldCheck,
  Award,
  Crown,
  CheckCircle2,
  Calendar,
  HeartHandshake,
  Users,
} from 'lucide-react';

export const EnrichPerks: React.FC = () => {
  const { openModal } = useBooking();

  const standards = [
    {
      icon: <Award className="w-5 h-5 text-[#9A7B38]" />,
      title: 'Vidal Sassoon & International Certified',
      description: 'Our creative directors undergo 200+ hours of annual advanced training in precision cutting and color formulation.',
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-emerald-600" />,
      title: 'Single-Use Sealed Hygiene Protocol',
      description: 'Autoclaved tools, fresh disposable salon capes, and single-dose product pods for 100% sterile safety.',
    },
    {
      icon: <Sparkles className="w-5 h-5 text-[#9A7B38]" />,
      title: 'Authentic Global Formulations',
      description: 'Zero counterfeit or diluted bottles. We use 100% genuine Davines, Kérastase, and organic actives.',
    },
    {
      icon: <HeartHandshake className="w-5 h-5 text-[#9A7B38]" />,
      title: 'Dedicated Consultation First',
      description: 'We never rush you into a chair. Every visit begins with an honest 15-minute diagnostic dialogue.',
    },
  ];

  const membershipTiers = [
    {
      name: 'Silver Club',
      tagline: 'Essential Privilege',
      benefits: [
        'Priority weekday chair reservation',
        'Complimentary scalp moisture analysis',
        'Free botanical wash with any haircut',
        'Annual birthday styling gift',
      ],
      popular: false,
    },
    {
      name: 'Gold Elite',
      tagline: 'Most Beloved by Regulars',
      benefits: [
        'Guaranteed weekend slot reservation',
        'Free upgrade to Japanese Halo Rain therapy',
        'Family & friend sharing privileges',
        'Dedicated senior director preference',
        'Complimentary seasonal blowdry styling',
      ],
      popular: true,
    },
    {
      name: 'Platinum Royale',
      tagline: 'VIP Atelier Access',
      benefits: [
        'Unlimited private suite bookings',
        'Custom formulation profile on file',
        'Complimentary 24K gold facial upgrade',
        'Personal concierge direct hotline',
        'Champagne & artisanal herbal tea bar',
      ],
      popular: false,
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white border-t border-stone-200">
      <Container>
        {/* Salon Standard Grid */}
        <SectionHeader
          eyebrow="The Salon Standard"
          title="Why discerning guests choose our atelier."
          subtitle="From sterile hygiene to international certifications, every detail is engineered for uncompromising hair & skin care."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {standards.map((std, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-[#FAF8F5] border border-stone-200 hover:border-[#C5A46A]/60 transition-all duration-300 shadow-xs hover:shadow-md"
            >
              <div className="w-12 h-12 rounded-xl bg-white border border-stone-200 flex items-center justify-center mb-4 shadow-xs">
                {std.icon}
              </div>
              <h4 className="font-serif text-lg text-stone-900 font-semibold mb-2">
                {std.title}
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                {std.description}
              </p>
            </div>
          ))}
        </div>

        {/* Enrich Club Membership Preview */}
        <div className="bg-gradient-to-br from-[#FAF8F5] via-white to-[#FDF8EE] border border-stone-200 rounded-3xl p-8 sm:p-12 shadow-sm">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FEF9EE] border border-[#E9DFCE] text-[#9A7B38] text-xs uppercase tracking-widest font-bold mb-3 shadow-xs">
              <Crown className="w-3.5 h-3.5 text-[#9A7B38]" />
              <span>Privilege & Loyalty Club</span>
            </div>
            <h3 className="font-serif text-3xl sm:text-4xl text-[#18181B] font-semibold">
              Enrich Your Regular Rituals
            </h3>
            <p className="mt-2 text-sm text-stone-600 leading-relaxed">
              Enjoy exclusive priority bookings, complimentary spa upgrades, and unhurried salon luxury.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {membershipTiers.map((tier, idx) => (
              <div
                key={idx}
                className={`relative flex flex-col justify-between p-7 rounded-2xl border transition-all duration-300 ${
                  tier.popular
                    ? 'border-[#C5A46A] bg-white shadow-md ring-2 ring-[#C5A46A]/30'
                    : 'border-stone-200 bg-white/80 hover:border-stone-300'
                }`}
              >
                {tier.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-[#18181B] shadow-xs">
                    Most Popular
                  </span>
                )}

                <div>
                  <h4 className="font-serif text-2xl text-stone-900 font-semibold">
                    {tier.name}
                  </h4>
                  <p className="text-xs text-[#9A7B38] font-medium mt-0.5">
                    {tier.tagline}
                  </p>

                  <div className="mt-6 pt-5 border-t border-stone-100 space-y-3">
                    {tier.benefits.map((b, bIdx) => (
                      <div key={bIdx} className="flex items-start gap-2.5 text-xs text-stone-700">
                        <CheckCircle2 className="w-4 h-4 text-[#9A7B38] shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-5 border-t border-stone-100">
                  <button
                    type="button"
                    onClick={() => openModal()}
                    className={`w-full py-2.5 px-4 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      tier.popular
                        ? 'bg-gradient-to-r from-[#D4AF37] via-[#C5A46A] to-[#B8860B] text-[#18181B] shadow-xs hover:shadow-md'
                        : 'bg-[#FAF8F5] text-stone-800 hover:bg-stone-200 border border-stone-200'
                    }`}
                  >
                    Inquire Membership
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};
