/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useBooking } from '../../context/BookingContext';
import { Calendar, ChevronRight } from 'lucide-react';

export const GlobalStickyBookingBar: React.FC = () => {
  const { selectedServices, setIsTimeModalOpen } = useBooking();

  if (selectedServices.length === 0) return null;

  return (
    <aside
      aria-label="Booking Bar"
      className="fixed bottom-14 md:bottom-0 inset-x-0 z-40 bg-[#18181B] text-white border-t border-stone-800 px-4 sm:px-8 py-3 shadow-2xl animate-in slide-in-from-bottom-6 duration-300 ease-out"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Selected Services Indicator */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#D61C4E] text-white flex items-center justify-center font-bold text-xs shadow-xs">
            {selectedServices.length}
          </div>
          <div>
            <span className="block text-sm sm:text-base font-bold text-white leading-tight">
              {selectedServices.length} {selectedServices.length === 1 ? 'Treatment Selected' : 'Treatments Selected'}
            </span>
            <span className="block text-[11px] text-stone-400">
              Tap to pick date & time
            </span>
          </div>
        </div>

        {/* Primary Action Button: Opens Time Selection directly! */}
        <button
          type="button"
          onClick={() => {
            setIsTimeModalOpen(true);
          }}
          className="flex items-center gap-1.5 py-3 px-6 sm:px-8 rounded-full bg-[#D61C4E] hover:bg-[#c21443] active:scale-[0.98] text-white font-bold text-xs sm:text-sm uppercase tracking-wider transition-all cursor-pointer shadow-md hover:shadow-lg"
        >
          <Calendar className="w-4 h-4" />
          <span>Book Now</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
};
