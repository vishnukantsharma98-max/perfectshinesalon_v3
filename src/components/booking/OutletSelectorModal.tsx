/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useBooking } from '../../context/BookingContext';
import { SALONS_DATA, CITIES_LIST, SalonOutlet } from '../../data/salons';
import { X, MapPin, Clock, Phone, Check, Sparkles, Navigation } from 'lucide-react';

export const OutletSelectorModal: React.FC = () => {
  const { isOutletModalOpen, setIsOutletModalOpen, selectedOutlet, setSelectedOutlet } = useBooking();
  const [selectedCity, setSelectedCity] = useState<string>(selectedOutlet.cityId);
  const [searchFilter, setSearchFilter] = useState('');

  if (!isOutletModalOpen) return null;

  const filteredSalons = SALONS_DATA.filter((s) => {
    const matchesCity = s.cityId === selectedCity;
    const matchesSearch =
      s.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      s.address.toLowerCase().includes(searchFilter.toLowerCase()) ||
      s.cityName.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesCity && matchesSearch;
  });

  const handleSelect = (outlet: SalonOutlet) => {
    setSelectedOutlet(outlet);
    setIsOutletModalOpen(false);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Select Salon Outlet"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-2xl bg-white border border-stone-200 rounded-2xl shadow-2xl text-[#18181B] max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-[#FAF8F5]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#FEF9EE] border border-[#E9DFCE] flex items-center justify-center text-[#9A7B38] shadow-xs">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-xl sm:text-2xl text-stone-900 font-bold">
                Select Your Salon Studio
              </h3>
              <p className="text-xs text-stone-500">
                Choose from our certified atelier studios across India
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsOutletModalOpen(false)}
            className="p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-200/50 rounded-full transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* City Filter Tabs */}
        <div className="p-4 sm:p-6 pb-2 border-b border-stone-100 bg-white">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            {CITIES_LIST.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setSelectedCity(c.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                  selectedCity === c.id
                    ? 'bg-gradient-to-r from-[#D4AF37] via-[#C5A46A] to-[#B8860B] text-[#18181B] shadow-xs'
                    : 'bg-[#FAF8F5] text-stone-600 hover:bg-stone-100 border border-stone-200'
                }`}
              >
                {c.name} ({c.count})
              </button>
            ))}
          </div>

          {/* Quick Search */}
          <div className="mt-3">
            <input
              type="text"
              placeholder="Search by area, landmark or street..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-full bg-[#FAF8F5] border border-stone-200 rounded-xl px-3.5 py-2 text-xs text-stone-900 placeholder-stone-400 focus:border-[#C5A46A] focus:outline-none"
            />
          </div>
        </div>

        {/* Salons List */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-3 flex-1 bg-[#FAF8F5]">
          {filteredSalons.length === 0 ? (
            <div className="p-8 text-center text-xs text-stone-500">
              No salon studios found matching your search.
            </div>
          ) : (
            filteredSalons.map((salon) => {
              const isSelected = selectedOutlet.id === salon.id;
              return (
                <div
                  key={salon.id}
                  onClick={() => handleSelect(salon)}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                    isSelected
                      ? 'border-[#C5A46A] bg-[#FEF9EE] shadow-sm'
                      : 'border-stone-200 bg-white hover:border-[#C5A46A]/60 hover:shadow-xs'
                  }`}
                >
                  <div className="flex-1 space-y-1.5">
                    <div className="flex items-center gap-2">
                      <h4 className="font-serif text-lg font-bold text-stone-900">
                        {salon.name}
                      </h4>
                      {salon.isFlagship && (
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#E5CA98]/40 text-[#9A7B38] border border-[#C5A46A]/40 flex items-center gap-1">
                          <Sparkles className="w-2.5 h-2.5" /> Flagship
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-stone-600 flex items-start gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#9A7B38] shrink-0 mt-0.5" />
                      <span>{salon.address}</span>
                    </p>

                    <div className="flex flex-wrap items-center gap-3 text-[11px] text-stone-500 pt-1">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-stone-400" />
                        {salon.hours}
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Phone className="w-3 h-3 text-stone-400" />
                        {salon.phone}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1.5">
                      {salon.features.map((feat, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 font-medium"
                        >
                          ✓ {feat}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-center gap-2 shrink-0 w-full sm:w-auto justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-stone-200">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelect(salon);
                      }}
                      className={`w-full sm:w-auto px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#18181B] text-white shadow-xs'
                          : 'bg-white text-stone-800 border border-stone-300 hover:border-[#C5A46A]'
                      }`}
                    >
                      {isSelected ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#D4AF37]" />
                          <span>Selected</span>
                        </>
                      ) : (
                        <span>Choose Outlet</span>
                      )}
                    </button>

                    <a
                      href={salon.directionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-[11px] text-[#9A7B38] hover:underline flex items-center gap-1 px-2 py-1"
                    >
                      <Navigation className="w-3 h-3" />
                      <span>Map</span>
                    </a>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-stone-200 bg-white flex items-center justify-between text-xs text-stone-500">
          <span>Currently selected: <strong className="text-stone-900">{selectedOutlet.name}</strong></span>
          <button
            type="button"
            onClick={() => setIsOutletModalOpen(false)}
            className="px-5 py-2 rounded-full bg-stone-900 text-white font-medium text-xs hover:bg-stone-800 cursor-pointer"
          >
            Confirm & Continue
          </button>
        </div>
      </div>
    </div>
  );
};
