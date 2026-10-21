/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BusinessConfig } from '../types/business';

/**
 * CENTRAL MASTER BUSINESS CONFIGURATION
 * 
 * To rebrand this system for a new client (e.g. Salon A, Luxury Barber, Bridal Studio):
 * Simply edit this file and corresponding data files in src/data/.
 * All UI components, navigation, hero, trust bars, WhatsApp triggers, and maps
 * will update automatically without changing component code.
 */
export const businessConfig: BusinessConfig = {
  id: 'perfect-shine-unisex-salon',
  name: 'PERFECT SHINE UNISEX SALON',
  brandMark: 'PERFECT SHINE UNISEX SALON',
  logoUrl: 'https://i.postimg.cc/0jSmd76C/34567890.png',
  tagline: 'Your Beauty. Your Style. Your Confidence.',
  shortDescription:
    'Ajmer’s leading unisex salon for master haircutting, hair rebonding, keratin protein treatments, luxury bridal & party makeup, and precision grooming.',
  editorialSummary:
    'Dedicated to delivering modern style, personalized hair care, and professional beauty services. Specializing in advanced hair rebonding, smoothing keratin, creative haircuts, bridal glam, and skin treatments in a welcoming, hygienic atmosphere.',
  ownerName: 'Master Stylist & Director',
  ownerTitle: 'L’Oréal Professional Award Winner',

  contact: {
    phoneDisplay: '+91 96823 32705',
    phoneE164: '+919682332705',
    whatsappNumber: '919682332705', // User specified: 9682332705
    email: 'perfectshinesalonajmer@gmail.com',
  },

  location: {
    addressLine1: 'S-16, B K Kaul Rd, Hbu Nagar',
    addressLine2: 'Gyan Vihar Colony',
    city: 'Ajmer, Rajasthan',
    landmark: 'B K Kaul Road, Gyan Vihar Colony',
    postalCode: '305001',
    latitude: 26.471639,
    longitude: 74.607222,
    directionsUrl: 'https://maps.app.goo.gl/KRmVPFGWrMW4BNtr5',
  },

  operatingHours: [
    { days: 'Monday – Sunday (Open All 7 Days)', hours: '10:00 AM – 9:00 PM' },
  ],

  social: {
    instagram: 'https://instagram.com/perfectshinesalon',
    facebook: 'https://facebook.com/perfectshinesalon',
    googleMaps: 'https://maps.app.goo.gl/KRmVPFGWrMW4BNtr5',
  },

  trust: {
    googleRating: 4.9,
    reviewCount: 380,
    establishedYear: 2018,
    verifiedBadgeText: 'Unisex Salon · Appointments & Walk-ins',
    curatedBrands: ['L’Oréal Professionnel', 'Matrix', 'Schwarzkopf', 'Streax Professional'],
  },

  hero: {
    mode: 'image', // 'image' | 'video' | 'cutout'
    eyebrow: 'Unisex Salon · B K Kaul Rd, Ajmer',
    title: 'Your Beauty. Your Style. Your Confidence.',
    emphasisWord: 'Confidence',
    subtitle:
      'Premier unisex styling destination for precision haircutting, hair rebonding, keratin silk treatments, and glowing bridal makeup.',
    primaryCtaLabel: 'Book on WhatsApp',
    secondaryCtaLabel: 'Explore Services',
    locationBadge: 'Ajmer, Rajasthan',
    image: '/home-screenphoto.png',
    videoUrl: '',
    posterImage: '/home-screenphoto.png',
    personCutout: 'https://i.postimg.cc/FzhxCdNw/owner-receiving-award-from-loreal.jpg',
  },
};
