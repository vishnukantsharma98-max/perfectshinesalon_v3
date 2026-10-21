/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ServiceItem } from '../types/service';

const CATEGORY_DEFAULT_PRICES: Record<string, number> = {
  haircut: 499,
  'hair-wash': 399,
  rebonding: 2499,
  keratin: 1999,
  treatments: 999,
  makeup: 1499,
  'nail-art': 699,
  colour: 1299,
  beard: 299,
  waxing: 499,
  facial: 1199,
  manicure: 699,
  featured: 799,
};

/**
 * Returns a guaranteed valid integer price in INR (₹) for any service item.
 */
export function getServicePrice(service: Partial<ServiceItem> | null | undefined): number {
  if (!service) return 499;

  if (service.startingPrice && service.startingPrice > 0) {
    return Math.round(service.startingPrice);
  }

  const categoryId = service.categoryId || '';
  if (CATEGORY_DEFAULT_PRICES[categoryId]) {
    return CATEGORY_DEFAULT_PRICES[categoryId];
  }

  return 499;
}

/**
 * Formats a numeric price into standard Indian Rupee string: e.g. "₹ 499" or "₹ 1,998"
 */
export function formatPriceINR(amount: number): string {
  const rounded = Math.round(amount || 0);
  return `₹ ${rounded.toLocaleString('en-IN')}`;
}
