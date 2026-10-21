/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { HeroModeA } from './HeroModeA';

interface HeroProps {
  onOpenBooking?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  // Pure editorial image canvas — no video embeds or players
  return <HeroModeA onOpenBooking={onOpenBooking} />;
};
