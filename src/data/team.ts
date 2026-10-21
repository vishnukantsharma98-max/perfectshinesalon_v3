/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { TeamMember } from '../types/team';

export const teamMembers: TeamMember[] = [
  {
    id: 'team-elena',
    name: 'Elena Vance',
    role: 'Creative Director & Founder',
    specialty: 'Precision Cutting & Natural Pigment Formulation',
    experienceYears: 14,
    bio: 'Trained in London and Tokyo, Elena focuses on effortless movement and architectural tailoring that matures gracefully between studio visits.',
    imageSlot: 'team-01',
    instagramHandle: '@elena.lumea',
    enabled: true,
  },
  {
    id: 'team-kavya',
    name: 'Kavya Raman',
    role: 'Senior Scalp Therapist & Aesthetician',
    specialty: 'Hydro-Thermal Head Spa & Buccal Release',
    experienceYears: 9,
    bio: 'Dedicated to holistic cranial relaxation and micro-circulatory skin health through mindful touch and pure botanical formulations.',
    imageSlot: 'team-02',
    instagramHandle: '@kavya.rituals',
    enabled: true,
  },
];
