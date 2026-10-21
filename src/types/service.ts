/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ServiceOptionChoice {
  name: string;
  price?: number;
  available?: boolean;
}

export interface ServiceOptionGroup {
  name: string;
  choices: ServiceOptionChoice[];
}

export interface ServiceItem {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  durationMinutes?: number;
  durationFormatted?: string;
  startingPrice?: number;
  priceFormatted?: string;
  subtypes?: string;
  hasOptions?: boolean;
  options?: ServiceOptionGroup[];
  selectedOptionText?: string;
  tag?: string;
  highlights?: string[];
  gender?: 'women' | 'men' | 'unisex' | 'bridal';
  featured?: boolean;
  enabled: boolean;
  imageSlot?: string;
  details?: {
    suitability?: string;
    steps?: string[];
    productsUsed?: string[];
    aftercare?: string;
  };
}

export interface ServiceCategory {
  id: string;
  name: string;
  icon?: string;
  description?: string;
  count?: number;
  order: number;
  enabled: boolean;
  imageSlot?: string;
}
