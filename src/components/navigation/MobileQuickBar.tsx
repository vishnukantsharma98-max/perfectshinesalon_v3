/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { businessConfig } from '../../data/business';
import { useBooking } from '../../context/BookingContext';
import { getPhoneDialUrl } from '../../utils/whatsapp';
import { Phone, Calendar, MessageCircle, Sparkles } from 'lucide-react';

interface MobileQuickBarProps {
  onOpenBooking?: () => void;
}

export const MobileQuickBar: React.FC<MobileQuickBarProps> = () => {
  const { openBookingPortal, selectedServices, appView, setAppView } = useBooking();
  const count = selectedServices.length;

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-white/95 backdrop-blur-md border-t border-stone-200 px-3 py-2 flex items-center justify-between gap-2 shadow-lg">
      <a
        href={getPhoneDialUrl()}
        className="flex items-center justify-center gap-1.5 py-2 px-3 bg-[#FAF8F5] border border-stone-200 text-stone-800 rounded-full text-xs font-semibold min-h-[40px] shrink-0 shadow-xs"
      >
        <Phone className="w-3.5 h-3.5 text-[#9A7B38]" />
        <span>Call</span>
      </a>

      <button
        type="button"
        onClick={() => openBookingPortal()}
        className="flex-1 flex items-center justify-center gap-1.5 py-2 px-4 bg-gradient-to-r from-[#D4AF37] via-[#C5A46A] to-[#B8860B] text-[#18181B] rounded-full text-xs font-bold min-h-[40px] cursor-pointer shadow-sm border border-[#E5CA98]"
      >
        {count > 0 ? (
          <>
            <Sparkles className="w-3.5 h-3.5 fill-[#18181B]" />
            <span>Book ({count}) Treatments</span>
          </>
        ) : (
          <>
            <Calendar className="w-3.5 h-3.5" />
            <span>Online Booking Portal</span>
          </>
        )}
      </button>

      <a
        href={`https://wa.me/${businessConfig.contact.whatsappNumber}?text=Hello%20${encodeURIComponent(businessConfig.brandMark)}!%20I%20would%20like%20to%20inquire%20about%20salon%20appointments.`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Direct WhatsApp"
        className="flex items-center justify-center w-10 h-10 bg-[#FAF8F5] border border-stone-200 text-emerald-600 rounded-full shrink-0 shadow-xs"
      >
        <MessageCircle className="w-4 h-4 text-emerald-600" />
      </a>
    </div>
  );
};
