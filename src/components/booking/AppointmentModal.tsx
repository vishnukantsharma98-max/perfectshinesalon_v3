/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useBooking } from '../../context/BookingContext';
import { servicesData } from '../../data/services';
import { businessConfig } from '../../data/business';
import { formatDuration } from '../../utils/formatters';
import {
  X,
  Clock,
  Sparkles,
  MessageCircle,
  Plus,
  Trash2,
  CheckCircle,
} from 'lucide-react';

interface AppointmentModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  preSelectedServiceId?: string;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen: propIsOpen,
  onClose: propOnClose,
}) => {
  const {
    isModalOpen: contextIsOpen,
    closeModal: contextCloseModal,
    selectedServices,
    removeService,
    addService,
    clearServices,
    selectedOutlet,
    setIsOutletModalOpen,
    openBookingPortal,
  } = useBooking();

  const isOpen = propIsOpen !== undefined ? propIsOpen : contextIsOpen;
  const onClose = propOnClose || contextCloseModal;

  const [selectedStylist, setSelectedStylist] = useState('Any Master Specialist');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('11:00 AM');
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [quickAddOpen, setQuickAddOpen] = useState(false);

  if (!isOpen) return null;

  const totalDuration = selectedServices.reduce(
    (acc, s) => acc + (s.durationMinutes || 0),
    0
  );

  const timeSlots = [
    '10:30 AM',
    '11:30 AM',
    '01:00 PM',
    '02:30 PM',
    '04:00 PM',
    '05:30 PM',
    '07:00 PM',
  ];

  const handleConfirmOnWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();

    const servicesListText =
      selectedServices.length > 0
        ? selectedServices
            .map(
              (s, idx) =>
                `  ${idx + 1}. ${s.name}${s.durationMinutes ? ` (${formatDuration(s.durationMinutes)})` : ''}`
            )
            .join('\n')
        : '  1. General Consultation & Haircut';

    const durationStr = totalDuration > 0 ? `\n• Estimated Duration: ${formatDuration(totalDuration)}` : '';
    const dateStr = selectedDate ? `\n• Date: ${selectedDate}` : '';
    const timeStr = selectedTimeSlot ? `\n• Time: ${selectedTimeSlot}` : '';
    const stylistStr = `\n• Preferred Specialist: ${selectedStylist}`;
    const nameStr = clientName ? `\n• Guest Name: ${clientName}` : '';
    const phoneStr = clientPhone ? `\n• Phone: ${clientPhone}` : '';
    const notesStr = notes ? `\n• Note: ${notes}` : '';

    const studioStr = `\n• Studio Outlet: ${selectedOutlet.name} (${selectedOutlet.cityName})`;
    const message = `Hello ${businessConfig.brandMark}! I would like to book an appointment:\n\n*Selected Treatments:*\n${servicesListText}${durationStr}${studioStr}\n${stylistStr}${dateStr}${timeStr}${nameStr}${phoneStr}${notesStr}\n\nPlease confirm availability. Thank you!`;

    const encoded = encodeURIComponent(message);
    const targetWhatsapp = selectedOutlet.whatsapp || businessConfig.contact.whatsappNumber;
    const url = `https://wa.me/${targetWhatsapp}?text=${encoded}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    onClose();
  };

  // Remaining services not yet selected
  const availableToAdd = servicesData.filter(
    (s) => !selectedServices.some((sel) => sel.id === s.id)
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Appointment Request"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-xl bg-white border border-stone-200 rounded-2xl shadow-2xl text-[#18181B] max-h-[92vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-[#FAF8F5]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#FEF9EE] border border-[#E9DFCE] flex items-center justify-center text-[#9A7B38] shadow-xs">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-serif text-xl sm:text-2xl text-[#18181B] font-semibold">
                Book Your Appointment
              </h2>
              <p className="text-[11px] text-stone-500">
                Direct reservation with {businessConfig.brandMark} concierge
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-200/50 rounded-full transition-colors cursor-pointer"
            aria-label="Close booking modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body Form */}
        <form onSubmit={handleConfirmOnWhatsApp} className="overflow-y-auto p-5 sm:p-6 space-y-6 flex-1 text-xs">
          {/* Section 1: Selected Services List */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <label className="uppercase tracking-wider text-[#9A7B38] font-bold text-[11px] flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Selected Treatments ({selectedServices.length})</span>
                {totalDuration > 0 && (
                  <span className="text-stone-500 font-normal ml-1">
                    · ~{formatDuration(totalDuration)}
                  </span>
                )}
              </label>

              {selectedServices.length > 0 && (
                <button
                  type="button"
                  onClick={clearServices}
                  className="text-[11px] text-stone-400 hover:text-rose-600 transition-colors cursor-pointer"
                >
                  Clear all
                </button>
              )}
            </div>

            {selectedServices.length === 0 ? (
              <div className="p-4 rounded-xl border border-dashed border-stone-300 bg-[#FAF8F5] text-center">
                <p className="text-xs text-stone-500">
                  No treatments selected yet. Pick one below or from our categories!
                </p>
                <div className="mt-3 flex flex-wrap justify-center gap-2">
                  {servicesData.slice(0, 3).map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => addService(s)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white hover:bg-[#C5A46A] hover:text-[#18181B] text-stone-700 border border-stone-200 text-[11px] transition-all cursor-pointer shadow-xs"
                    >
                      <Plus className="w-3 h-3" />
                      <span>{s.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                {selectedServices.map((service) => (
                  <div
                    key={service.id}
                    className="p-3 rounded-xl border border-stone-200 bg-[#FAF8F5] flex items-center justify-between gap-3 shadow-xs"
                  >
                    <div>
                      <span className="font-serif text-sm font-semibold text-stone-900 block">
                        {service.name}
                      </span>
                      {service.durationMinutes && (
                        <span className="text-[11px] text-[#9A7B38] font-medium flex items-center gap-1 mt-0.5">
                          <Clock className="w-3 h-3" />
                          {formatDuration(service.durationMinutes)}
                        </span>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => removeService(service.id)}
                      className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                      title="Remove service"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Quick Add More Services */}
            {availableToAdd.length > 0 && (
              <div className="mt-3">
                {!quickAddOpen ? (
                  <button
                    type="button"
                    onClick={() => setQuickAddOpen(true)}
                    className="inline-flex items-center gap-1.5 text-[11px] text-[#9A7B38] hover:text-[#B8860B] font-semibold cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add another treatment (Haircut, Facial, Spa...)</span>
                  </button>
                ) : (
                  <div className="p-3 rounded-xl bg-[#FAF8F5] border border-stone-200 space-y-2 animate-in fade-in duration-150">
                    <div className="flex items-center justify-between text-[11px] text-stone-500 mb-1">
                      <span>Choose a treatment to add:</span>
                      <button
                        type="button"
                        onClick={() => setQuickAddOpen(false)}
                        className="text-[#9A7B38] font-semibold hover:underline"
                      >
                        Done
                      </button>
                    </div>
                    <div className="max-h-36 overflow-y-auto space-y-1.5 pr-1">
                      {availableToAdd.map((s) => (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => {
                            addService(s);
                          }}
                          className="w-full text-left p-2 rounded-lg bg-white hover:bg-stone-100 text-stone-900 border border-stone-200 flex items-center justify-between text-xs cursor-pointer"
                        >
                          <span className="truncate">{s.name}</span>
                          <span className="text-[10px] text-[#9A7B38] font-bold shrink-0 ml-2">
                            + Add
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Section 2: Preferred Specialist */}
          <div>
            <label className="uppercase tracking-wider text-stone-600 font-bold block mb-2 text-[11px]">
              Preferred Specialist
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {['Any Master Specialist', 'Elena Vance (Director)', 'Kavya Raman (Spa)'].map(
                (stylist) => (
                  <button
                    key={stylist}
                    type="button"
                    onClick={() => setSelectedStylist(stylist)}
                    className={`py-2 px-3 rounded-full border text-center transition-all cursor-pointer text-xs ${
                      selectedStylist === stylist
                        ? 'border-[#C5A46A] bg-[#FEF9EE] text-[#18181B] font-bold shadow-xs'
                        : 'border-stone-200 bg-white text-stone-600 hover:border-stone-300'
                    }`}
                  >
                    <span className="block truncate">{stylist}</span>
                  </button>
                )
              )}
            </div>
          </div>

          {/* Section 3: Date & Preferred Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="uppercase tracking-wider text-stone-600 font-bold block mb-2 text-[11px]">
                Preferred Date
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full bg-[#FAF8F5] border border-stone-200 rounded-xl p-3 text-stone-900 focus:border-[#C5A46A] focus:outline-none"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div>
              <label className="uppercase tracking-wider text-stone-600 font-bold block mb-2 text-[11px]">
                Time Window
              </label>
              <select
                value={selectedTimeSlot}
                onChange={(e) => setSelectedTimeSlot(e.target.value)}
                className="w-full bg-[#FAF8F5] border border-stone-200 rounded-xl p-3 text-stone-900 focus:border-[#C5A46A] focus:outline-none"
              >
                {timeSlots.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Section 4: Guest Contact Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="uppercase tracking-wider text-stone-600 font-bold block mb-1.5 text-[11px]">
                Your Name
              </label>
              <input
                type="text"
                placeholder="e.g. Priya"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full bg-[#FAF8F5] border border-stone-200 rounded-xl p-3 text-stone-900 placeholder-stone-400 focus:border-[#C5A46A] focus:outline-none"
              />
            </div>
            <div>
              <label className="uppercase tracking-wider text-stone-600 font-bold block mb-1.5 text-[11px]">
                WhatsApp Phone
              </label>
              <input
                type="tel"
                placeholder="+91 98765..."
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                className="w-full bg-[#FAF8F5] border border-stone-200 rounded-xl p-3 text-stone-900 placeholder-stone-400 focus:border-[#C5A46A] focus:outline-none"
              />
            </div>
          </div>

          {/* Section 5: Optional Notes */}
          <div>
            <label className="uppercase tracking-wider text-stone-600 font-bold block mb-1.5 text-[11px]">
              Specific Hair / Skin Notes (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Prior colour history, skin sensitivity..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-[#FAF8F5] border border-stone-200 rounded-xl p-3 text-stone-900 placeholder-stone-400 focus:border-[#C5A46A] focus:outline-none"
            />
          </div>

          {/* Action Row */}
          <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-[11px] text-stone-500">
              <span>Direct confirmation via Atelier WhatsApp Concierge</span>
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-[#D4AF37] via-[#C5A46A] to-[#B8860B] hover:brightness-105 active:scale-[0.98] text-[#18181B] font-semibold text-xs uppercase tracking-wider rounded-full transition-all duration-200 shadow-md shadow-[#C5A46A]/25 cursor-pointer border border-[#E5CA98]"
            >
              <MessageCircle className="w-4 h-4 text-[#18181B]" />
              <span>Confirm on WhatsApp →</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
