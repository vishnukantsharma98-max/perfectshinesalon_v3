/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface OfferItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  originalPrice?: number;
  offerPrice?: number;
  duration?: string;
  badge?: string;
  validityText?: string;
  servicesIncluded: string[];
  imageSlot?: string;
  featured?: boolean;
  enabled: boolean;
}
