/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface OperatingHours {
  days: string;
  hours: string;
}

export interface SocialLinks {
  instagram?: string;
  facebook?: string;
  youtube?: string;
  googleMaps?: string;
}

export interface BusinessLocation {
  addressLine1: string;
  addressLine2: string;
  city: string;
  landmark?: string;
  postalCode: string;
  latitude: number;
  longitude: number;
  googleMapsEmbedUrl?: string;
  directionsUrl: string;
}

export interface BusinessTrustMetrics {
  googleRating?: number;
  reviewCount?: number;
  establishedYear?: number;
  verifiedBadgeText?: string;
  curatedBrands?: string[];
}

export interface HeroConfig {
  mode: 'image' | 'video' | 'cutout';
  eyebrow: string;
  title: string;
  emphasisWord?: string;
  subtitle: string;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
  image?: string;
  videoUrl?: string;
  posterImage?: string;
  personCutout?: string;
  locationBadge?: string;
}

export interface BusinessConfig {
  id: string;
  name: string;
  brandMark: string;
  logoUrl?: string;
  tagline: string;
  shortDescription: string;
  editorialSummary: string;
  ownerName?: string;
  ownerTitle?: string;
  
  contact: {
    phoneDisplay: string;
    phoneE164: string; // for tel: links (+91XXXXXXXXXX)
    whatsappNumber: string; // digits only with country code
    email?: string;
  };

  location: BusinessLocation;
  operatingHours: OperatingHours[];
  social: SocialLinks;
  trust: BusinessTrustMetrics;
  hero: HeroConfig;
}
