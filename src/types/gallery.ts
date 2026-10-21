/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type GalleryAspect = '16:9' | '4:3' | '3:4' | '1:1';

export interface GalleryItem {
  id: string;
  category: 'all' | 'hair' | 'skin' | 'bridal' | 'salon' | 'men';
  title: string;
  caption?: string;
  aspect: GalleryAspect;
  imageSlot: string;
  featured?: boolean;
}

export interface BeforeAfterPair {
  id: string;
  title: string;
  treatmentName: string;
  beforeImageSlot: string;
  afterImageSlot: string;
  labelBefore: string;
  labelAfter: string;
  notes?: string;
}
