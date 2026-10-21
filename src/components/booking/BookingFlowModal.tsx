/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion, Variants } from 'framer-motion';
import { useBooking } from '../../context/BookingContext';
import { businessConfig } from '../../data/business';
import {
  X,
  Calendar as CalendarIcon,
  Clock,
  User,
  Scissors,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  MessageCircle,
  Download,
} from 'lucide-react';
import { getServicePrice, formatPriceINR } from '../../utils/pricing';

export const BookingFlowModal: React.FC = () => {
  const {
    isTimeModalOpen,
    setIsTimeModalOpen,
    selectedServices,
    selectedTimeSlot,
    setSelectedTimeSlot,
    selectedDateLabel,
    setSelectedDateLabel,
    selectedStylist,
    setSelectedStylist,
    confirmBooking,
    totalPriceFormatted,
  } = useBooking();

  const shouldReduceMotion = useReducedMotion();

  // Step 1: Calendar & Time, Step 2: Client Info, Step 3: Confirmation
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [direction, setDirection] = useState<number>(1);

  // Form state
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [guestNotes, setGuestNotes] = useState('');
  const [activeDateIndex, setActiveDateIndex] = useState(1); // 1 = Tomorrow default
  const [showAll15Days, setShowAll15Days] = useState(false);

  // Close & reset
  const handleClose = () => {
    setIsTimeModalOpen(false);
    setTimeout(() => {
      setCurrentStep(1);
      setDirection(1);
    }, 300);
  };

  if (!isTimeModalOpen) return null;

  // Real-time dynamic 15-day generation
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
    const full = i === 0 && currentHour >= 21; // Full if past 9 PM salon closing
    const label = `${dayName}, ${dateNumber} ${month}`;

    return { index: i, day: dayName, date: dateNumber, month, full, label };
  });

  const displayedDays = showAll15Days ? all15Days : all15Days.slice(0, 5);

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

  const goToStep = (step: 1 | 2 | 3, dir: number) => {
    setDirection(dir);
    setCurrentStep(step);
  };

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) return;
    confirmBooking(guestName.trim(), guestPhone.trim(), guestNotes.trim());
    goToStep(3, 1);
  };

  const handleOpenWhatsApp = () => {
    const servicesList = selectedServices
      .map((s) => `• ${s.name} (${formatPriceINR(getServicePrice(s))})`)
      .join('\n');
    const msg =
      `Hello ${businessConfig.brandMark}!\n\n` +
      `I would like to confirm my appointment:\n` +
      `Date: ${selectedDateLabel}\n` +
      `Time: ${selectedTimeSlot}\n` +
      `Specialist: ${selectedStylist}\n\n` +
      `Selected Treatments:\n${servicesList}\n\n` +
      `Total Amount: ${totalPriceFormatted}\n\n` +
      `Client Name: ${guestName.trim()}\n` +
      (guestPhone ? `Phone: ${guestPhone.trim()}\n` : '') +
      (guestNotes ? `Notes: ${guestNotes.trim()}\n` : '') +
      `\nPlease confirm availability. Thank you!`;

    const encoded = encodeURIComponent(msg);
    const targetPhone = businessConfig.contact.whatsappNumber;
    window.open(`https://wa.me/${targetPhone}?text=${encoded}`, '_blank', 'noopener,noreferrer');
  };

  const handleDownloadCalendar = () => {
    const title = `Appointment at ${businessConfig.brandMark}`;
    const desc = `Services: ${selectedServices.map((s) => s.name).join(', ')}\nSpecialist: ${selectedStylist}`;
    const loc = `${businessConfig.location.addressLine1}, ${businessConfig.location.city}`;

    const icsData = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Perfect Shine Unisex Salon//EN',
      'BEGIN:VEVENT',
      `SUMMARY:${title}`,
      `DESCRIPTION:${desc}`,
      `LOCATION:${loc}`,
      `STATUS:CONFIRMED`,
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'perfect-shine-appointment.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Step Carousel Animation Variants
  const slideVariants: Variants = {
    enter: (dir: number) => ({
      x: shouldReduceMotion ? 0 : dir > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: 'spring' as const, damping: 28, stiffness: 300 },
        opacity: { duration: 0.25 },
      },
    },
    exit: (dir: number) => ({
      x: shouldReduceMotion ? 0 : dir > 0 ? '-100%' : '100%',
      opacity: 0,
      transition: {
        x: { type: 'spring' as const, damping: 28, stiffness: 300 },
        opacity: { duration: 0.2 },
      },
    }),
  };

  return (
    <AnimatePresence>
      <div
        role="dialog"
        aria-modal="true"
        className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-4 select-none overflow-y-auto"
      >
        {/* Backdrop overlay with blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 bg-black/65 backdrop-blur-sm"
          style={{ willChange: 'opacity' }}
        />

        {/* Modal Window Container: Spring Scale Entry */}
        <motion.div
          initial={{
            scale: shouldReduceMotion ? 1 : 0.9,
            opacity: 0,
          }}
          animate={{
            scale: 1,
            opacity: 1,
            transition: {
              type: 'spring',
              damping: 25,
              stiffness: 300,
            },
          }}
          exit={{
            scale: shouldReduceMotion ? 1 : 0.9,
            opacity: 0,
            transition: { duration: 0.2, ease: 'easeOut' },
          }}
          style={{ willChange: 'transform, opacity' }}
          className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-stone-200 text-stone-900 my-auto z-10"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-stone-100 bg-[#FAF8F5]/80 backdrop-blur-xs">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-rose-50 border border-rose-200/80 flex items-center justify-center text-[#D61C4E]">
                {currentStep === 1 && <CalendarIcon className="w-4 h-4" />}
                {currentStep === 2 && <User className="w-4 h-4" />}
                {currentStep === 3 && <CheckCircle2 className="w-4 h-4" />}
              </div>
              <div>
                <h3 className="font-bold text-base sm:text-lg text-stone-900 leading-tight">
                  {currentStep === 1 && 'Choose Date & Time'}
                  {currentStep === 2 && 'Your Contact Details'}
                  {currentStep === 3 && 'Booking Confirmed!'}
                </h3>
                <span className="text-[10px] text-stone-500 font-medium">
                  Step {currentStep} of 3 · {selectedServices.length}{' '}
                  {selectedServices.length === 1 ? 'treatment' : 'treatments'}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleClose}
              className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 hover:text-stone-900 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Stepper Progress Bar */}
          <div className="h-1 w-full bg-stone-100">
            <motion.div
              initial={false}
              animate={{
                width: currentStep === 1 ? '33.3%' : currentStep === 2 ? '66.6%' : '100%',
              }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="h-full bg-gradient-to-r from-rose-500 to-[#D61C4E]"
            />
          </div>

          {/* Carousel Slide Area with AnimatePresence */}
          <div className="relative overflow-hidden min-h-[420px] max-h-[80vh] overflow-y-auto">
            <AnimatePresence mode="wait" custom={direction}>
              {/* STEP 1: Date, Time & Stylist */}
              {currentStep === 1 && (
                <motion.div
                  key="step-1"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="p-5 sm:p-6 space-y-5"
                >
                  {/* Selected Services Preview Bar */}
                  {selectedServices.length > 0 && (
                    <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-between gap-3 text-xs">
                      <div className="truncate">
                        <span className="font-bold text-stone-900">Treatments: </span>
                        <span className="text-stone-600">
                          {selectedServices.map((s) => s.name).join(', ')}
                        </span>
                      </div>
                      <span className="shrink-0 px-2.5 py-1 rounded-full bg-[#D61C4E] text-white font-bold text-[11px]">
                        {selectedServices.length} · {totalPriceFormatted}
                      </span>
                    </div>
                  )}

                  {/* 1. Date Selector: 15-day dynamic horizon */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                        Select Date
                      </span>
                      <button
                        type="button"
                        onClick={() => setShowAll15Days(!showAll15Days)}
                        className="text-xs font-bold text-[#D61C4E] hover:underline cursor-pointer"
                      >
                        {showAll15Days ? 'Show less' : 'View all 15 days'}
                      </button>
                    </div>

                    <div className="grid grid-cols-5 gap-2">
                      {displayedDays.map((item) => {
                        const isSelected = activeDateIndex === item.index;

                        return (
                          <motion.button
                            key={item.index}
                            type="button"
                            whileTap={{ scale: 0.95 }}
                            disabled={item.full}
                            onClick={() => {
                              setActiveDateIndex(item.index);
                              setSelectedDateLabel(item.label);
                            }}
                            className={`p-2 sm:p-2.5 rounded-2xl border flex flex-col items-center justify-center text-center transition-all cursor-pointer ${
                              item.full
                                ? 'opacity-40 cursor-not-allowed bg-stone-100 border-stone-200'
                                : isSelected
                                ? 'border-[#D61C4E] bg-rose-50/70 text-[#D61C4E] shadow-sm ring-2 ring-[#D61C4E]/20'
                                : 'border-stone-200 bg-white hover:border-stone-300 text-stone-700'
                            }`}
                          >
                            <span className="text-[10px] font-semibold text-stone-500">
                              {item.day}
                            </span>
                            <span className="text-base sm:text-lg font-bold text-stone-900 leading-tight my-0.5">
                              {item.date}
                            </span>
                            <span className="text-[10px] text-stone-400">{item.month}</span>
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 2. Specialist Selector */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-stone-500 block">
                      Preferred Specialist
                    </label>
                    <div className="relative">
                      <select
                        value={selectedStylist}
                        onChange={(e) => setSelectedStylist(e.target.value)}
                        className="w-full bg-[#FAF8F5] border border-stone-200 rounded-2xl px-4 py-3 text-xs sm:text-sm text-stone-900 font-semibold focus:border-[#D61C4E] focus:outline-none appearance-none cursor-pointer"
                      >
                        {stylists.map((st) => (
                          <option key={st} value={st}>
                            {st}
                          </option>
                        ))}
                      </select>
                      <Scissors className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* 3. Time Slots */}
                  <div className="space-y-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block">
                      Available Time Slots
                    </span>

                    {/* Afternoon Slots */}
                    <div className="space-y-1.5">
                      <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                        Afternoon
                      </span>
                      <div className="grid grid-cols-4 gap-2">
                        {afternoonSlots.map((slot) => {
                          const isSelected = selectedTimeSlot === slot;
                          return (
                            <motion.button
                              key={slot}
                              type="button"
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setSelectedTimeSlot(slot)}
                              className={`py-2 px-1 text-center rounded-xl text-xs font-bold transition-all cursor-pointer ${
                                isSelected
                                  ? 'bg-[#18181B] text-white shadow-xs'
                                  : 'bg-white border border-stone-200 hover:border-stone-400 text-stone-800'
                              }`}
                            >
                              {slot}
                            </motion.button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Evening Slots */}
                    <div className="space-y-1.5">
                      <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                        Evening
                      </span>
                      <div className="grid grid-cols-4 gap-2">
                        {eveningSlots.map((slot) => {
                          const isSelected = selectedTimeSlot === slot;
                          return (
                            <motion.button
                              key={slot}
                              type="button"
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setSelectedTimeSlot(slot)}
                              className={`py-2 px-1 text-center rounded-xl text-xs font-bold transition-all cursor-pointer ${
                                isSelected
                                  ? 'bg-[#18181B] text-white shadow-xs'
                                  : 'bg-white border border-stone-200 hover:border-stone-400 text-stone-800'
                              }`}
                            >
                              {slot}
                            </motion.button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Morning Slots */}
                    <div className="space-y-1.5">
                      <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                        Morning
                      </span>
                      <div className="grid grid-cols-4 gap-2">
                        {morningSlots.map((slot) => {
                          const isSelected = selectedTimeSlot === slot;
                          return (
                            <motion.button
                              key={slot}
                              type="button"
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setSelectedTimeSlot(slot)}
                              className={`py-2 px-1 text-center rounded-xl text-xs font-bold transition-all cursor-pointer ${
                                isSelected
                                  ? 'bg-[#18181B] text-white shadow-xs'
                                  : 'bg-white border border-stone-200 hover:border-stone-400 text-stone-800'
                              }`}
                            >
                              {slot}
                            </motion.button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Next Step Action Button */}
                  <div className="pt-2">
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => goToStep(2, 1)}
                      className="w-full py-3.5 px-6 rounded-full bg-[#D61C4E] hover:bg-[#c21443] text-white font-bold text-sm tracking-wide transition-all cursor-pointer shadow-lg flex items-center justify-center gap-2"
                    >
                      <span>Continue to Guest Details</span>
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* STEP 2: Name & Details Form */}
              {currentStep === 2 && (
                <motion.div
                  key="step-2"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="p-5 sm:p-6 space-y-4"
                >
                  {/* Summary recap pill */}
                  <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-stone-200 flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1.5 font-bold text-stone-900">
                      <CalendarIcon className="w-3.5 h-3.5 text-[#D61C4E]" />
                      {selectedDateLabel} · {selectedTimeSlot}
                    </span>
                    <span className="text-stone-500 font-medium truncate max-w-[150px]">
                      {selectedStylist}
                    </span>
                  </div>

                  <form onSubmit={handleDetailsSubmit} className="space-y-4">
                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wider text-stone-700 block mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        autoFocus
                        placeholder="e.g. Priya Sharma"
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        className="w-full bg-[#FAF8F5] border border-stone-200 rounded-2xl px-4 py-3 text-sm text-stone-900 placeholder-stone-400 focus:border-[#D61C4E] focus:outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wider text-stone-700 block mb-1">
                        Mobile Number (Optional)
                      </label>
                      <input
                        type="tel"
                        placeholder="e.g. 9876543210"
                        value={guestPhone}
                        onChange={(e) => setGuestPhone(e.target.value)}
                        className="w-full bg-[#FAF8F5] border border-stone-200 rounded-2xl px-4 py-3 text-sm text-stone-900 placeholder-stone-400 focus:border-[#D61C4E] focus:outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wider text-stone-700 block mb-1">
                        Special Requests or Hair History (Optional)
                      </label>
                      <textarea
                        rows={2}
                        placeholder="e.g. Previously colored, sensitive scalp, bridal query..."
                        value={guestNotes}
                        onChange={(e) => setGuestNotes(e.target.value)}
                        className="w-full bg-[#FAF8F5] border border-stone-200 rounded-2xl px-4 py-2.5 text-sm text-stone-900 placeholder-stone-400 focus:border-[#D61C4E] focus:outline-none transition-all resize-none"
                      />
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                      <motion.button
                        type="button"
                        whileTap={{ scale: 0.96 }}
                        onClick={() => goToStep(1, -1)}
                        className="px-5 py-3.5 rounded-full border border-stone-200 hover:border-stone-400 text-stone-700 font-bold text-xs transition-colors cursor-pointer flex items-center gap-1.5"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>Back</span>
                      </motion.button>

                      <motion.button
                        type="submit"
                        disabled={!guestName.trim()}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1 py-3.5 px-6 rounded-full bg-[#D61C4E] hover:bg-[#c21443] disabled:opacity-50 text-white font-bold text-sm tracking-wide transition-all cursor-pointer shadow-lg flex items-center justify-center gap-2"
                      >
                        <span>Review & Confirm</span>
                        <ArrowRight className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </form>
                </motion.div>
              )}

              {/* STEP 3: Confirmation & WhatsApp Handoff */}
              {currentStep === 3 && (
                <motion.div
                  key="step-3"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="p-5 sm:p-6 space-y-5 text-center"
                >
                  {/* Success celebration graphic */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', damping: 15, stiffness: 300, delay: 0.1 }}
                    className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner"
                  >
                    <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
                  </motion.div>

                  <div className="space-y-1">
                    <h4 className="font-bold text-xl text-stone-900">
                      Appointment Prepared, {guestName.trim()}!
                    </h4>
                    <p className="text-xs text-stone-500">
                      Please confirm via WhatsApp to reserve your slot directly with the master stylist.
                    </p>
                  </div>

                  {/* Summary Card */}
                  <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200 text-left space-y-2 text-xs">
                    <div className="flex items-center justify-between pb-2 border-b border-stone-200/60">
                      <span className="text-stone-500">Scheduled Time</span>
                      <span className="font-bold text-stone-900">
                        {selectedDateLabel} · {selectedTimeSlot}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pb-2 border-b border-stone-200/60">
                      <span className="text-stone-500">Specialist</span>
                      <span className="font-bold text-stone-900">{selectedStylist}</span>
                    </div>

                    <div>
                      <span className="text-stone-500 block mb-1">Selected Treatments</span>
                      <div className="space-y-1.5">
                        {selectedServices.map((srv) => {
                          const price = getServicePrice(srv);
                          return (
                            <div
                              key={srv.id}
                              className="flex items-center justify-between text-xs font-semibold text-stone-800"
                            >
                              <div className="flex items-center gap-1.5 truncate">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#D61C4E] shrink-0" />
                                <span className="truncate">{srv.name}</span>
                              </div>
                              <span className="text-rose-700 font-bold shrink-0 ml-2">
                                {formatPriceINR(price)}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Distinct Total Amount Row */}
                    <div className="flex items-center justify-between pt-2.5 border-t border-stone-200/80">
                      <span className="font-bold text-stone-700 uppercase tracking-wider text-[11px]">
                        Total Amount
                      </span>
                      <span className="font-serif font-black text-base text-rose-700">
                        {totalPriceFormatted}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2 pt-1">
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleOpenWhatsApp}
                      className="w-full py-3.5 px-6 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm tracking-wide transition-all cursor-pointer shadow-lg flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="w-5 h-5 fill-white" />
                      <span>Confirm on WhatsApp: 9682332705</span>
                    </motion.button>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={handleDownloadCalendar}
                        className="py-2.5 px-4 rounded-full border border-stone-200 hover:border-stone-400 bg-white text-stone-800 font-semibold text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <Download className="w-3.5 h-3.5 text-stone-500" />
                        <span>Add to Calendar</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleClose}
                        className="py-2.5 px-4 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-xs transition-colors cursor-pointer"
                      >
                        Done
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
