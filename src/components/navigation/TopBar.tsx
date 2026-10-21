/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { MapPin, Phone, ShieldCheck, Sparkles, Calendar, ChevronDown } from 'lucide-react';
import { businessConfig } from '../../data/business';
import { useBooking } from '../../context/BookingContext';

export const TopBar: React.FC = () => {
  const { selectedOutlet, setIsOutletModalOpen, appView, setAppView } = useBooking();

  return (
    <div className="bg-[#18181B] text-[#F4EFEB] text-[11px] py-2 px-4 sm:px-8 border-b border-stone-800 hidden sm:block">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Enrich Brand Guarantee */}
        <div className="flex items-center gap-4 text-stone-300">
          <span className="flex items-center gap-1.5 text-[#DFCA9E] font-medium">
            <Sparkles className="w-3 h-3 text-[#C5A46A]" />
            <span>Enrich Certified Salon Standards</span>
          </span>
          <span className="text-stone-600">|</span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            <span>100% Certified Specialists & Clean Care</span>
          </span>
        </div>

        {/* Right: Location Selector Modal Trigger & Booking Quick Portal Switch */}
        <div className="flex items-center gap-4">
          {/* Outlet Picker Trigger */}
          <button
            type="button"
            onClick={() => setIsOutletModalOpen(true)}
            className="flex items-center gap-1.5 text-stone-200 hover:text-[#DFCA9E] transition-colors cursor-pointer group"
          >
            <MapPin className="w-3 h-3 text-[#C5A46A]" />
            <span className="truncate max-w-[220px]">
              {selectedOutlet.cityName} · {selectedOutlet.name}
            </span>
            <ChevronDown className="w-3 h-3 text-stone-400 group-hover:text-white" />
          </button>

          <span className="text-stone-700">|</span>

          {/* Switch to Online Booking System */}
          <button
            type="button"
            onClick={() => setAppView(appView === 'booking' ? 'site' : 'booking')}
            className="flex items-center gap-1.5 text-[#DFCA9E] hover:text-white font-semibold transition-colors cursor-pointer"
          >
            <Calendar className="w-3 h-3 text-[#C5A46A]" />
            <span>
              {appView === 'booking' ? 'Return to Atelier' : 'Online Booking Portal'}
            </span>
          </button>

          <span className="text-stone-700">|</span>

          {/* Concierge Line */}
          <a
            href={`tel:${selectedOutlet.phone}`}
            className="flex items-center gap-1.5 text-stone-300 hover:text-white transition-colors"
          >
            <Phone className="w-3 h-3 text-[#C5A46A]" />
            <span>Concierge: {selectedOutlet.phone}</span>
          </a>
        </div>
      </div>
    </div>
  );
};
