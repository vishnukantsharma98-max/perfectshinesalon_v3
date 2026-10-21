/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useBooking } from '../../context/BookingContext';
import { Sparkles, Calendar, X, ArrowRight } from 'lucide-react';

export const SelectedServicesBar: React.FC = () => {
  const { selectedServices, removeService, openBookingPortal, appView } = useBooking();

  if (selectedServices.length === 0 || appView === 'booking') return null;

  return (
    <div className="fixed bottom-16 md:bottom-6 inset-x-3 sm:inset-x-auto sm:right-6 z-40 max-w-xl animate-in slide-in-from-bottom-5 duration-300">
      <div className="bg-white/95 backdrop-blur-md border border-[#C5A46A]/80 rounded-2xl p-3.5 sm:p-4 shadow-xl shadow-stone-900/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Left Info: Count & Selected Badges */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-[11px] uppercase tracking-wider text-[#9A7B38] font-bold flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              <span>{selectedServices.length} Selected for Appointment</span>
            </span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            {selectedServices.map((service) => (
              <span
                key={service.id}
                className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-full bg-[#FAF8F5] text-stone-800 border border-stone-200 shrink-0"
              >
                <span className="truncate max-w-[130px]">{service.name}</span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeService(service.id);
                  }}
                  className="hover:text-rose-600 p-0.5"
                  aria-label={`Remove ${service.name}`}
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Right CTA Button */}
        <button
          type="button"
          onClick={() => openBookingPortal()}
          className="shrink-0 inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#D4AF37] via-[#C5A46A] to-[#B8860B] text-[#18181B] font-semibold text-xs uppercase tracking-wider rounded-full shadow-md shadow-[#C5A46A]/20 hover:scale-105 transition-all duration-200 cursor-pointer border border-[#E5CA98]"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Checkout ({selectedServices.length})</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
