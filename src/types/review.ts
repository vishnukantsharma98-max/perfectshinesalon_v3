/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ReviewItem {
  id: string;
  author: string;
  source: 'Google Review' | 'Verified Client' | 'Editorial';
  rating: number; // e.g. 5
  date: string;
  text: string;
  serviceTaken?: string;
  enabled: boolean;
}
