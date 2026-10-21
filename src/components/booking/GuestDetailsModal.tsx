/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useBooking } from '../../context/BookingContext';
import { businessConfig } from '../../data/business';
import { X, Calendar } from 'lucide-react';

export const GuestDetailsModal: React.FC = () => {
  const {
    isGuestModalOpen,
    setIsGuestModalOpen,
    selectedServices,
    selectedDateLabel,
    selectedTimeSlot,
    confirmBooking,
    setActivePage,
  } = useBooking();

  const [guestName, setGuestName] = useState('');

  if (!isGuestModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) return;

    confirmBooking(guestName.trim(), '');
    setIsGuestModalOpen(false);
    setActivePage('services');

    // Clean plain text without emojis or special symbols that turn into  on WhatsApp
    const servicesList = selectedServices
      .map((s) => `- ${s.name}`)
      .join('\n');

    const whatsappMessage =
      `Hello ${businessConfig.brandMark}!\n\n` +
      `I would like to book an appointment:\n` +
      `Date: ${selectedDateLabel}\n` +
      `Time: ${selectedTimeSlot}\n\n` +
      `Services:\n${servicesList}\n\n` +
      `Client Name: ${guestName.trim()}\n\n` +
      `Please confirm my appointment. Thank you!`;

    const encoded = encodeURIComponent(whatsappMessage);
    const targetPhone = businessConfig.contact.whatsappNumber;
    const url = `https://wa.me/${targetPhone}?text=${encoded}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in"
    >
      <div className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden border border-stone-200 animate-in zoom-in-95 duration-200 text-stone-900">
        {/* Header */}
        <div className="flex items-center justify-between p-5 pb-3 border-b border-stone-100">
          <h3 className="text-xl font-bold text-stone-900">
            Enter Your Name
          </h3>
          <button
            type="button"
            onClick={() => setIsGuestModalOpen(false)}
            className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 hover:text-stone-900 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Booking Summary Card (No prices, no duration) */}
        <div className="p-4 mx-5 my-3 rounded-2xl bg-[#FAF8F5] border border-stone-200 space-y-1 text-xs">
          <div className="flex items-center justify-between text-stone-700">
            <span className="flex items-center gap-1.5 font-bold text-stone-900">
              <Calendar className="w-3.5 h-3.5 text-[#D61C4E]" />
              {selectedDateLabel} · {selectedTimeSlot}
            </span>
            <span className="text-stone-500 font-medium">
              {selectedServices.length} {selectedServices.length === 1 ? 'service' : 'services'}
            </span>
          </div>
        </div>

        {/* Name Form */}
        <form onSubmit={handleSubmit} className="p-5 pt-1 space-y-4">
          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-stone-700 block mb-1.5">
              Full Name *
            </label>
            <input
              type="text"
              required
              autoFocus
              placeholder="e.g. Priya Sharma"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              className="w-full bg-[#FAF8F5] border border-stone-300 rounded-xl px-4 py-3 text-sm text-stone-900 placeholder-stone-400 focus:border-[#D61C4E] focus:outline-none transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={!guestName.trim()}
            className="w-full py-3.5 px-6 rounded-full bg-[#D61C4E] hover:bg-[#c21443] active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-sm tracking-wide transition-all cursor-pointer shadow-md flex items-center justify-center gap-2"
          >
            <span>Confirm & Book</span>
          </button>
        </form>
      </div>
    </div>
  );
};
