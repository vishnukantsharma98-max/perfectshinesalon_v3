/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { OfferItem } from '../types/offer';

export const offersData: OfferItem[] = [
  {
    id: 'offer-welcome-experience',
    title: 'The Luméa Signature First Visit',
    tagline: 'Haircut + Japanese Head Spa Duo',
    description:
      'Our most beloved introduction ritual: personalized haircut consultation, relaxing scalp detox, and finished blowout styling in our private atelier.',
    duration: '90 Minutes',
    badge: 'Guest Favorite',
    validityText: 'Tuesday through Saturday · Private Suite Session',
    servicesIncluded: [
      'Personalized Haircut Consultation',
      'Japanese Scalp Cleanse & Halo Rain Massage',
      'Artisanal Haircut & Layering',
      'Velvet Blowdry Finish',
    ],
    imageSlot: 'interior-01',
    featured: true,
    enabled: true,
  },
  {
    id: 'offer-restorative-duo',
    title: 'Luminous Head Spa & Glow Facial Suite',
    tagline: 'Hair Wellness + Radiant Skin Ritual',
    description:
      'Immerse in pure relaxation: combine our Japanese Hydro-Thermal Head Spa with our Radiant Hydra-Glow Facial for full mind and body restoration.',
    duration: '120 Minutes',
    badge: 'Luxury Pairing',
    validityText: 'Advance Reservation · Includes Complimentary Herbal Tea',
    servicesIncluded: [
      'Complete Japanese Scalp Treatment & Halo Rain',
      'Deep Cleansing Botanical Facial',
      'Hydra-Glow Vitamin & Collagen Infusion',
      'Shoulder & Neck Acupressure Release',
    ],
    imageSlot: 'beauty-02',
    featured: true,
    enabled: true,
  },
];
