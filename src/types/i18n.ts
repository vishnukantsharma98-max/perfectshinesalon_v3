/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type SupportedLanguage = 'en' | 'hi';

export interface TranslationDictionary {
  nav: {
    home: string;
    services: string;
    offers: string;
    gallery: string;
    about: string;
    team: string;
    reviews: string;
    contact: string;
    book: string;
    call: string;
    whatsapp: string;
  };
  hero: {
    badge: string;
    bookConsultation: string;
    exploreServices: string;
    viewLocation: string;
  };
  trust: {
    googleRating: string;
    verifiedReviews: string;
    curatedBrands: string;
    bespokeArtistry: string;
  };
  actions: {
    enquireOnWhatsApp: string;
    callDirectly: string;
    getDirections: string;
    viewAllServices: string;
    viewOffer: string;
    claimOffer: string;
    close: string;
    openMenu: string;
  };
  footer: {
    studioHours: string;
    location: string;
    quickLinks: string;
    rightsReserved: string;
    systemNote: string;
  };
}
