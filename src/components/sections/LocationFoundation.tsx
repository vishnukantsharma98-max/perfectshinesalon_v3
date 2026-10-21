/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { businessConfig } from '../../data/business';
import { useBooking } from '../../context/BookingContext';
import { getPhoneDialUrl } from '../../utils/whatsapp';
import { Container, SectionHeader } from '../common/Container';
import { Button } from '../common/Button';
import { MapPin, Phone, MessageCircle, Clock, Navigation } from 'lucide-react';

export const LocationFoundation: React.FC = () => {
  const { location, contact, operatingHours } = businessConfig;
  const { openModal } = useBooking();

  return (
    <section id="contact" className="py-16 md:py-24 bg-white border-t border-stone-200">
      <Container>
        <SectionHeader
          eyebrow="Visit The Atelier"
          title="Quietly located in the heart of Bengaluru."
          subtitle="Tucked away on Lavelle Road with reserved valet parking and private elevator access."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Contact Details Card (7 cols) */}
          <div className="lg:col-span-7 bg-[#FAF8F5] border border-stone-200 p-8 sm:p-10 flex flex-col justify-between rounded-2xl shadow-xs">
            <div className="space-y-8">
              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-full bg-white border border-stone-200 flex items-center justify-center shrink-0 mt-1 shadow-xs">
                  <MapPin className="w-5 h-5 text-[#9A7B38]" />
                </div>
                <div>
                  <h3 className="font-serif text-xl text-[#18181B] font-semibold">Studio Address</h3>
                  <p className="mt-1 text-sm text-stone-800">{location.addressLine1}</p>
                  <p className="text-sm text-stone-600">{location.addressLine2}, {location.city} {location.postalCode}</p>
                  {location.landmark && (
                    <p className="mt-1 text-xs text-[#9A7B38] font-medium">Landmark: {location.landmark}</p>
                  )}
                </div>
              </div>

              {/* Operating Hours */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-full bg-white border border-stone-200 flex items-center justify-center shrink-0 mt-1 shadow-xs">
                  <Clock className="w-5 h-5 text-[#9A7B38]" />
                </div>
                <div className="w-full">
                  <h3 className="font-serif text-xl text-[#18181B] font-semibold">Consultation & Service Hours</h3>
                  <div className="mt-2 divide-y divide-stone-200 text-xs">
                    {operatingHours.map((slot, idx) => (
                      <div key={idx} className="py-2 flex justify-between text-stone-800">
                        <span>{slot.days}</span>
                        <span className="text-stone-500 font-medium">{slot.hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Action Buttons */}
            <div className="mt-10 pt-6 border-t border-stone-200 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => openModal()}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#C5A46A] to-[#B8860B] text-[#18181B] text-xs uppercase tracking-wider font-semibold shadow-xs hover:shadow-md transition-all cursor-pointer border border-[#E5CA98]"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Book Appointment</span>
              </button>
              <Button
                variant="secondary"
                size="md"
                href={getPhoneDialUrl()}
                icon={<Phone className="w-4 h-4 text-[#9A7B38]" />}
              >
                Call: {contact.phoneDisplay}
              </Button>
              <Button
                variant="outline"
                size="md"
                href={location.directionsUrl}
                target="_blank"
                icon={<Navigation className="w-4 h-4 text-[#9A7B38]" />}
              >
                Get Directions
              </Button>
            </div>
          </div>

          {/* Map Visual Slot (5 cols) */}
          <div className="lg:col-span-5 bg-[#FAF8F5] border border-stone-200 p-6 flex flex-col justify-between relative overflow-hidden rounded-2xl shadow-xs">
            {/* Map Line Art Graphic representation */}
            <div className="absolute inset-0 opacity-15 pointer-events-none">
              <svg viewBox="0 0 500 500" className="w-full h-full stroke-[#9A7B38]" fill="none" strokeWidth="1.5">
                <line x1="50" y1="100" x2="450" y2="100" />
                <line x1="50" y1="250" x2="450" y2="250" strokeWidth="2.5" />
                <line x1="50" y1="400" x2="450" y2="400" />
                <line x1="120" y1="50" x2="120" y2="450" />
                <line x1="280" y1="50" x2="280" y2="450" strokeWidth="2.5" />
                <line x1="390" y1="50" x2="390" y2="450" />
                <circle cx="280" cy="250" r="18" fill="#C5A46A" fillOpacity="0.4" stroke="#9A7B38" strokeWidth="2.5" />
              </svg>
            </div>

            <div className="relative z-10">
              <span className="text-[11px] uppercase tracking-widest text-[#9A7B38] font-bold block">
                Geolocation Coordinates
              </span>
              <p className="font-mono text-xs text-stone-500 mt-0.5">
                LAT {location.latitude.toFixed(4)}° N · LNG {location.longitude.toFixed(4)}° E
              </p>
            </div>

            <div className="relative z-10 my-auto py-8 text-center">
              <p className="font-serif text-2xl text-[#18181B] font-medium">The Pavilion Promenade</p>
              <p className="text-xs text-stone-600 mt-1">Atelier 4 · Lavelle Road</p>
              <div className="mt-5">
                <a
                  href={location.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white hover:bg-stone-50 border border-stone-300 text-[#9A7B38] text-xs uppercase tracking-wider font-semibold shadow-xs transition-all hover:scale-105"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Open in Google Maps →</span>
                </a>
              </div>
            </div>

            <div className="relative z-10 border-t border-stone-200 pt-3 text-[11px] text-stone-500 flex justify-between">
              <span>Valet Parking Available</span>
              <span>By Appointment</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
