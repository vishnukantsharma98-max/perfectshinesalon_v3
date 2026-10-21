/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type HeroMode = 'image' | 'video' | 'cutout';

export interface ThemeConfig {
  palette: {
    charcoal: string;
    nearBlack: string;
    ivory: string;
    cream: string;
    warmBeige: string;
    champagne: string;
    champagneLight: string;
    mutedText: string;
  };
  typography: {
    displaySerif: string;
    bodySans: string;
  };
  radii: {
    none: string;
    sm: string;
    md: string;
    lg: string;
    full: string;
  };
  heroMode: HeroMode;
  sectionVisibility: {
    trustBar: boolean;
    services: boolean;
    offers: boolean;
    gallery: boolean;
    beforeAfter: boolean;
    story: boolean;
    team: boolean;
    reviews: boolean;
    academy: boolean;
    location: boolean;
    floatingWhatsApp: boolean;
  };
}
