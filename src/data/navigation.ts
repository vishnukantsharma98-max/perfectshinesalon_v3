/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface NavItem {
  id: string;
  labelKey: 'home' | 'services' | 'offers' | 'gallery' | 'about' | 'team' | 'reviews' | 'contact';
  href: string;
  enabled: boolean;
}

export const navigationItems: NavItem[] = [
  { id: 'nav-home', labelKey: 'home', href: '#top', enabled: true },
  { id: 'nav-services', labelKey: 'services', href: '#services', enabled: true },
  { id: 'nav-offers', labelKey: 'offers', href: '#offers', enabled: true },
  { id: 'nav-gallery', labelKey: 'gallery', href: '#gallery', enabled: true },
  { id: 'nav-about', labelKey: 'about', href: '#philosophy', enabled: true },
  { id: 'nav-team', labelKey: 'team', href: '#team', enabled: true },
  { id: 'nav-reviews', labelKey: 'reviews', href: '#reviews', enabled: true },
  { id: 'nav-contact', labelKey: 'contact', href: '#contact', enabled: true },
];
