/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ThemeConfig } from '../types/theme';

export const defaultThemeConfig: ThemeConfig = {
  palette: {
    charcoal: '#171411',
    nearBlack: '#11100F',
    ivory: '#F6F1E8',
    cream: '#EEE7DA',
    warmBeige: '#D9CCBA',
    champagne: '#C5A46A',
    champagneLight: '#E1CA96',
    mutedText: '#867D71',
  },
  typography: {
    displaySerif: '"Cormorant Garamond", Georgia, serif',
    bodySans: '"Plus Jakarta Sans", system-ui, sans-serif',
  },
  radii: {
    none: '0px',
    sm: '2px',
    md: '6px',
    lg: '12px',
    full: '9999px',
  },
  heroMode: 'image',
  sectionVisibility: {
    trustBar: true,
    services: true,
    offers: true,
    gallery: true,
    beforeAfter: true,
    story: true,
    team: true,
    reviews: true,
    academy: false, // Optional section: easily enabled when client operates an academy
    location: true,
    floatingWhatsApp: true,
  },
};
