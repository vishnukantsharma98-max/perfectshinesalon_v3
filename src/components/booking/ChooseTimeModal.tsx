/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useBooking } from '../../context/BookingContext';
import { X, Scissors, Calendar as CalendarIcon } from 'lucide-react';

export const ChooseTimeModal: React.FC = () => {
  const {
    isTimeModalOpen,
    setIsTimeModalOpen,
    setIsGuestModalOpen,
    selectedTimeSlot,
    setSelectedTimeSlot,
    selectedDateLabel,
    setSelectedDateLabel,
    selectedStylist,
    setSelectedStylist,
  } = useBooking();

  const [activeDateIndex, setActiveDateIndex] = useState(1); // 1 = Tomorrow
  const [showAll15Days, setShowAll15Days] = useState(false);

  if (!isTimeModalOpen) return null;

  // Generate 15 days from today
  const now = new Date();
  const currentHour = now.getHours();

  const all15Days = Array.from({ length: 15 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);

    const dayName =
      i === 0
        ? 'Today'
        : i === 1
        ? 'Tomorrow'
        : d.toLocaleDateString('en-US', { weekday: 'short' });

    const dateNumber = d.getDate().toString();
    const month = d.toLocaleDateString('en-US', { month: 'short' });
    // Only mark today as full if salon closing time (21:00 / 9 PM) has already passed
    const full = i === 0 && currentHour >= 21;
    const label = `${dayName}, ${dateNumber} ${month}`;

    return { index: i, day: dayName, date: dateNumber, month, full, label };
  });

  const displayedDays = showAll15Days ? all15Days : all15Days.slice(0, 5);

  // Exact time slots from Screenshot 11
  const morningSlots = [
    '10:00 AM',
    '10:15 AM',
    '10:30 AM',
    '10:45 AM',
    '11:00 AM',
    '11:15 AM',
    '11:30 AM',
    '11:45 AM',
  ];

  const afternoonSlots = [
    '12:00 PM',
    '12:15 PM',
    '12:30 PM',
    '12:45 PM',
    '1:00 PM',
    '1:15 PM',
    '1:30 PM',
    '1:45 PM',
    '2:00 PM',
    '2:15 PM',
    '2:30 PM',
    '2:45 PM',
    '3:00 PM',
    '3:15 PM',
  ];

  const eveningSlots = [
    '5:00 PM',
    '5:30 PM',
    '6:00 PM',
    '6:30 PM',
    '6:45 PM',
    '7:00 PM',
    '7:15 PM',
    '7:30 PM',
    '7:45 PM',
    '8:00 PM',
    '8:15 PM',
  ];

  const stylists = [
    'Any Specialist',
    'Virendra Sharma (Founder & Director)',
    'Sneha Rathore (Bridal & Makeup Director)',
    'Rajiv Mehta (Top Stylist & Rebonding)',
    'Pooja Sen (Senior Hair Stylist)',
    'Rohit Verma (Executive Barber)',
    'Neha Sharma (Keratin & Color Artist)',
  ];

  const handleConfirmTime = () => {
    setIsTimeModalOpen(false);
    setIsGuestModalOpen(true);
  };

  const currentDay = all15Days[activeDateIndex] || all15Days[1];

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in"
    >
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-stone-200 animate-in zoom-in-95 duration-200 text-stone-900">
        {/* Header */}
        <div className="flex items-center justify-between p-5 pb-3 border-b border-stone-100">
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-[#D61C4E]" />
            <h3 className="text-xl font-bold text-stone-900">
              Choose a time
            </h3>
          </div>
          <button
            type="button"
            onClick={() => setIsTimeModalOpen(false)}
            className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 hover:text-stone-900 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-5 space-y-6 max-h-[72vh] overflow-y-auto">
          {/* Date Selector Row with 15-day range */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] uppercase tracking-wider font-bold text-stone-500">
                Select Date ({showAll15Days ? 'Next 15 Days' : 'Next 5 Days'})
              </span>
              <button
                type="button"
                onClick={() => setShowAll15Days(!showAll15Days)}
                className="text-xs text-[#D61C4E] font-bold hover:underline cursor-pointer"
              >
                {showAll15Days ? 'Show less' : 'View all 15 days →'}
              </button>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
              {displayedDays.map((d) => {
                const isSelected = activeDateIndex === d.index;

                if (d.full) {
                  return (
                    <div
                      key={d.index}
                      className="flex-1 min-w-[70px] py-2 px-1 text-center rounded-2xl border border-stone-200 bg-stone-50 text-stone-400 select-none opacity-60 shrink-0"
                    >
                      <span className="block text-[11px] font-medium">{d.day}</span>
                      <span className="block text-base font-bold my-0.5">{d.date}</span>
                      <span className="block text-[10px] uppercase font-bold text-stone-400">Full</span>
                    </div>
                  );
                }

                return (
                  <button
                    key={d.index}
                    type="button"
                    onClick={() => {
                      setActiveDateIndex(d.index);
                      setSelectedDateLabel(d.label);
                    }}
                    className={`flex-1 min-w-[70px] py-2 px-1 text-center rounded-2xl border transition-all cursor-pointer shrink-0 ${
                      isSelected
                        ? 'bg-[#D61C4E] border-[#D61C4E] text-white shadow-sm'
                        : 'bg-white border-stone-200 text-stone-800 hover:border-stone-400'
                    }`}
                  >
                    <span className={`block text-[11px] ${isSelected ? 'text-white font-medium' : 'text-stone-500'}`}>
                      {d.day}
                    </span>
                    <span className="block text-base font-bold my-0.5">{d.date}</span>
                    <span className={`block text-[10px] ${isSelected ? 'text-white/80' : 'text-stone-500'}`}>
                      {d.month}
                    </span>
                  </button>
                );
              })}

              {!showAll15Days && (
                <button
                  type="button"
                  onClick={() => setShowAll15Days(true)}
                  className="min-w-[85px] py-3 px-2 text-center rounded-2xl border border-dashed border-stone-300 text-stone-600 text-xs font-semibold cursor-pointer hover:bg-stone-50 shrink-0"
                >
                  More days
                </button>
              )}
            </div>
          </div>

          {/* Morning Slots */}
          <div>
            <span className="block text-[11px] uppercase tracking-wider font-bold text-stone-500 mb-2.5">
              MORNING
            </span>
            <div className="grid grid-cols-4 gap-2">
              {morningSlots.map((slot) => {
                const isSelected = selectedTimeSlot === slot;
                return (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedTimeSlot(slot)}
                    className={`py-2 px-1 text-center text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#D61C4E] bg-rose-50 text-[#D61C4E] font-bold ring-1 ring-[#D61C4E]'
                        : 'border-stone-200 bg-white text-stone-800 hover:border-stone-400'
                    }`}
                  >
                    {slot}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Afternoon Slots (Screenshot 11) */}
          <div>
            <span className="block text-[11px] uppercase tracking-wider font-bold text-stone-500 mb-2.5">
              AFTERNOON
            </span>
            <div className="grid grid-cols-4 gap-2">
              {afternoonSlots.map((slot) => {
                const isSelected = selectedTimeSlot === slot;
                return (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedTimeSlot(slot)}
                    className={`py-2 px-1 text-center text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#D61C4E] bg-rose-50 text-[#D61C4E] font-bold ring-1 ring-[#D61C4E]'
                        : 'border-stone-200 bg-white text-stone-800 hover:border-stone-400'
                    }`}
                  >
                    {slot}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Evening Slots (Screenshot 11) */}
          <div>
            <span className="block text-[11px] uppercase tracking-wider font-bold text-stone-500 mb-2.5">
              EVENING
            </span>
            <div className="grid grid-cols-4 gap-2">
              {eveningSlots.map((slot) => {
                const isSelected = selectedTimeSlot === slot;
                return (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedTimeSlot(slot)}
                    className={`py-2 px-1 text-center text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#D61C4E] bg-rose-50 text-[#D61C4E] font-bold ring-1 ring-[#D61C4E]'
                        : 'border-stone-200 bg-white text-stone-800 hover:border-stone-400'
                    }`}
                  >
                    {slot}
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Action Button */}
        <div className="p-5 border-t border-stone-100 bg-white">
          <button
            type="button"
            onClick={handleConfirmTime}
            className="w-full py-3.5 px-6 rounded-full bg-[#D61C4E] hover:bg-[#c21443] active:scale-[0.98] text-white font-bold text-sm uppercase tracking-wider transition-all cursor-pointer shadow-md text-center"
          >
            Continue →
          </button>
        </div>
      </div>
    </div>
  );
};
