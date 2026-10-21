/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { businessConfig } from '../../data/business';
import { useBooking } from '../../context/BookingContext';
import { Phone, MessageCircle, ArrowUp, Instagram, Facebook, MapPin, Clock } from 'lucide-react';

export const Footer: React.FC = () => {
  const { contact, location } = businessConfig;
  const { setActivePage } = useBooking();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#FAF8F5] text-stone-900 border-t border-stone-200 pt-14 pb-24 sm:pb-12 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-stone-200">
          {/* Brand Column */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <img
                src="https://i.postimg.cc/0jSmd76C/34567890.png"
                alt="PERFECT SHINE UNISEX SALON"
                className="h-16 sm:h-20 w-auto object-contain drop-shadow-xs"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div>
                <span className="font-serif text-lg font-black tracking-wide text-stone-900 block leading-tight">
                  PERFECT SHINE
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#D61C4E]">
                  UNISEX SALON
                </span>
              </div>
            </div>

            <p className="text-xs text-stone-600 leading-relaxed max-w-sm">
              Your Beauty. Your Style. Your Confidence. Ajmer’s trusted unisex destination for precision haircutting, hair rebonding, keratin smoothing, and bridal aesthetics.
            </p>

            <div className="pt-1 flex items-center gap-3">
              <a
                href={businessConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-white border border-stone-200 hover:border-[#D61C4E] flex items-center justify-center text-stone-700 hover:text-[#D61C4E] transition-all shadow-xs"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={businessConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-white border border-stone-200 hover:border-[#D61C4E] flex items-center justify-center text-stone-700 hover:text-[#D61C4E] transition-all shadow-xs"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-3 text-xs">
            <h4 className="font-serif font-bold text-sm uppercase tracking-wider text-stone-900">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-stone-600">
              <li>
                <button
                  type="button"
                  onClick={() => {
                    setActivePage('home');
                    scrollToTop();
                  }}
                  className="hover:text-[#D61C4E] transition-colors cursor-pointer"
                >
                  Home Page
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    setActivePage('services');
                    scrollToTop();
                  }}
                  className="hover:text-[#D61C4E] transition-colors cursor-pointer"
                >
                  Services Catalogue
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    setActivePage('contact');
                    scrollToTop();
                  }}
                  className="hover:text-[#D61C4E] transition-colors cursor-pointer"
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Location Details */}
          <div className="space-y-3 text-xs">
            <h4 className="font-serif font-bold text-sm uppercase tracking-wider text-stone-900">
              Salon Location
            </h4>
            <div className="space-y-2 text-stone-600">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#D61C4E] shrink-0 mt-0.5" />
                <span>
                  {location.addressLine1}, {location.addressLine2}, {location.city} - {location.postalCode}
                </span>
              </div>
              <div className="pt-1">
                <a
                  href={location.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-[#D61C4E] hover:underline"
                >
                  Get Directions on Maps →
                </a>
              </div>
            </div>
          </div>

          {/* Direct Contact & Hours */}
          <div className="space-y-3 text-xs">
            <h4 className="font-serif font-bold text-sm uppercase tracking-wider text-stone-900">
              Direct Contact
            </h4>
            <div className="space-y-2 text-stone-600">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#D61C4E] shrink-0" />
                <a href={`tel:${contact.phoneE164}`} className="hover:text-[#D61C4E] font-medium">
                  {contact.phoneDisplay}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
                <a
                  href={`https://wa.me/${contact.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#25D366] font-medium"
                >
                  WhatsApp Booking
                </a>
              </div>
              <div className="flex items-start gap-2 pt-1">
                <Clock className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-stone-900 block">Open 7 Days a Week</span>
                  <span>10:00 AM – 9:00 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            © {new Date().getFullYear()} Perfect Shine Unisex Salon. All rights reserved.
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 hover:text-[#D61C4E] transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
