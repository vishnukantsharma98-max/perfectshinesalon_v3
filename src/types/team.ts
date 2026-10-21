/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  specialty: string;
  experienceYears?: number;
  bio: string;
  imageSlot: string;
  instagramHandle?: string;
  enabled: boolean;
}
