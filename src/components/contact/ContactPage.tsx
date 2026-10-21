/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useBooking } from '../../context/BookingContext';
import { businessConfig } from '../../data/business';
import { MapPin, Phone, MessageCircle, Clock, CheckCircle, Calendar } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { setActivePage } = useBooking();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('Haircut & Styling');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const text = `Hello ${businessConfig.brandMark}! My name is ${name}. I am inquiring about ${service}.${phone ? ` Phone: ${phone}.` : ''}${message ? ` Message: ${message}` : ''}`;
    const url = `https://wa.me/${businessConfig.contact.whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setSubmitted(true);
  };

  return (
    <div className="py-8 sm:py-14 px-4 sm:px-8 max-w-7xl mx-auto space-y-10 pb-24">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900">
          Contact & Location
        </h1>
        <p className="text-xs sm:text-sm text-stone-500">
          S-16, B K Kaul Rd, Gyan Vihar Colony, Ajmer · Open All 7 Days (10 AM – 9 PM)
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Direct Info Cards */}
        <div className="lg:col-span-5 space-y-4">
          {/* Address */}
          <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-stone-100 text-stone-800 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-[#D61C4E]" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-stone-900">Salon Location</h3>
                <span className="text-xs text-stone-400">Ajmer, Rajasthan</span>
              </div>
            </div>
            <p className="text-xs text-stone-600 pl-13 leading-relaxed">
              {businessConfig.location.addressLine1}, {businessConfig.location.addressLine2}, {businessConfig.location.city} - {businessConfig.location.postalCode}, India
            </p>
            <div className="pl-13 pt-1">
              <a
                href={businessConfig.location.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-[#D61C4E] hover:underline inline-flex items-center gap-1"
              >
                <span>Google Maps Directions →</span>
              </a>
            </div>
          </div>

          {/* Telephone & WhatsApp — Clean Single Phone Display */}
          <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-stone-100 text-stone-800 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-[#D61C4E]" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-stone-900">Direct Phone</h3>
                <span className="text-xs text-stone-400">Call for Appointments & Enquiries</span>
              </div>
            </div>

            <div className="pl-13 space-y-2">
              <a
                href={`tel:${businessConfig.contact.phoneE164}`}
                className="inline-block text-base font-bold text-stone-900 hover:text-[#D61C4E] transition-colors"
              >
                {businessConfig.contact.phoneDisplay}
              </a>

              <div>
                <a
                  href={`https://wa.me/${businessConfig.contact.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-300 text-xs font-bold hover:bg-emerald-100 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 fill-[#25D366] text-[#25D366]" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-stone-100 text-stone-800 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 text-[#D61C4E]" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-stone-900">Operating Hours</h3>
                <span className="text-xs text-stone-400">7 Days a Week</span>
              </div>
            </div>
            <p className="text-xs text-stone-600 pl-13">
              Monday – Sunday: 10:00 AM – 9:00 PM
            </p>
          </div>
        </div>

        {/* Right Column: Interactive Inquiry Form */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-2xs space-y-5">
          <div>
            <h2 className="font-serif text-2xl font-bold text-stone-900">Send an Enquiry</h2>
            <p className="text-xs text-stone-500 mt-1">
              Have questions or want to pre-book a wedding slot? Message us directly.
            </p>
          </div>

          {submitted ? (
            <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
              <CheckCircle className="w-10 h-10 text-emerald-600 mx-auto" />
              <h3 className="font-serif font-bold text-lg text-emerald-900">Enquiry Initiated!</h3>
              <p className="text-xs text-emerald-700">
                WhatsApp conversation opened with your enquiry details. Our team will assist you shortly.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="text-xs font-bold text-emerald-800 underline hover:no-underline cursor-pointer"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="input-name" className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1">
                  Your Name *
                </label>
                <input
                  id="input-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Priya Sharma"
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:border-[#D61C4E]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="input-phone" className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1">
                    Phone Number
                  </label>
                  <input
                    id="input-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 9876543210"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:border-[#D61C4E]"
                  />
                </div>

                <div>
                  <label htmlFor="select-service" className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1">
                    Service Interested In
                  </label>
                  <select
                    id="select-service"
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm bg-white focus:outline-none focus:border-[#D61C4E]"
                  >
                    <option>Haircut & Styling</option>
                    <option>Hair Rebonding</option>
                    <option>Keratin Smoothing</option>
                    <option>Bridal Makeup</option>
                    <option>Nail Art</option>
                    <option>Facials & Clean-up</option>
                    <option>Men&apos;s Grooming</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="textarea-message" className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1">
                  Message / Special Request
                </label>
                <textarea
                  id="textarea-message"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about your requirements or preferred time..."
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:border-[#D61C4E] resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-6 rounded-full bg-[#D61C4E] hover:bg-[#b81541] text-white text-xs font-bold uppercase tracking-wider shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Send via WhatsApp</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
