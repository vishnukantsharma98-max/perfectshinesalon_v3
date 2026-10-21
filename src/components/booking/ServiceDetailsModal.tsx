/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useBooking } from '../../context/BookingContext';
import { ASSET_MAP } from '../../data/assets';
import { formatDuration } from '../../utils/formatters';
import { X, Clock, Check, Sparkles, ShieldCheck, HeartHandshake, Plus } from 'lucide-react';

export const ServiceDetailsModal: React.FC = () => {
  const { inspectingService, closeServiceDetails, isServiceSelected, toggleService } = useBooking();

  if (!inspectingService) return null;

  const isSelected = isServiceSelected(inspectingService.id);
  const asset = inspectingService.imageSlot ? ASSET_MAP[inspectingService.imageSlot] : ASSET_MAP['beauty-01'];
  const details = inspectingService.details;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={inspectingService.name}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-2xl bg-white border border-stone-200 rounded-2xl shadow-2xl text-[#18181B] max-h-[92vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Hero Image & Header */}
        <div className="relative h-48 sm:h-56 bg-stone-100 overflow-hidden shrink-0">
          <img
            src={asset?.url || ASSET_MAP['beauty-01'].url}
            alt={asset?.alt || inspectingService.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

          {/* Close button */}
          <button
            type="button"
            onClick={closeServiceDetails}
            className="absolute top-4 right-4 p-2 bg-black/40 hover:bg-black/70 text-white rounded-full transition-colors cursor-pointer backdrop-blur-xs"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Badges & Title overlay */}
          <div className="absolute bottom-4 left-6 right-6 text-white">
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              {inspectingService.tag && (
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#C5A46A] text-[#18181B] shadow-xs">
                  {inspectingService.tag}
                </span>
              )}
              {inspectingService.durationMinutes && (
                <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-sm text-white flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#E5CA98]" />
                  {formatDuration(inspectingService.durationMinutes)}
                </span>
              )}
              {inspectingService.gender && (
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/15 backdrop-blur-sm text-stone-200 capitalize">
                  {inspectingService.gender}
                </span>
              )}
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-bold leading-tight drop-shadow-sm">
              {inspectingService.name}
            </h3>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="overflow-y-auto p-6 space-y-6 flex-1 text-xs text-stone-700 bg-white">
          {/* Overview Description */}
          <div>
            <h4 className="uppercase font-bold tracking-wider text-[#9A7B38] text-[11px] mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Treatment Overview
            </h4>
            <p className="text-sm leading-relaxed text-stone-800">
              {inspectingService.description}
            </p>
          </div>

          {/* Suitability */}
          {details?.suitability && (
            <div className="p-4 rounded-xl bg-[#FAF8F5] border border-stone-200">
              <h5 className="font-bold text-stone-900 text-xs mb-1 flex items-center gap-1.5">
                <HeartHandshake className="w-4 h-4 text-[#9A7B38]" />
                Who It's Ideal For
              </h5>
              <p className="text-stone-600 leading-normal">
                {details.suitability}
              </p>
            </div>
          )}

          {/* Step-by-Step Procedure */}
          {details?.steps && details.steps.length > 0 && (
            <div>
              <h4 className="uppercase font-bold tracking-wider text-stone-900 text-[11px] mb-3">
                The Enrich Signature Ritual Steps
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {details.steps.map((step: string, idx: number) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-[#FAF8F5] border border-stone-200 flex items-start gap-2.5"
                  >
                    <span className="w-5 h-5 rounded-full bg-[#FEF9EE] border border-[#E9DFCE] text-[#9A7B38] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="text-stone-700 leading-snug">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Products & Certifications */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-stone-100">
            {details?.productsUsed && details.productsUsed.length > 0 && (
              <div>
                <h5 className="font-bold text-stone-900 text-xs mb-2 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Premium Product Partners
                </h5>
                <ul className="space-y-1">
                  {details.productsUsed.map((prod: string, i: number) => (
                    <li key={i} className="text-stone-600 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C5A46A]" />
                      <span>{prod}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {details?.aftercare && (
              <div>
                <h5 className="font-bold text-stone-900 text-xs mb-2">
                  At-Home Aftercare Guidance
                </h5>
                <p className="text-stone-600 leading-relaxed">
                  {details.aftercare}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Modal Action Bar */}
        <div className="p-4 sm:p-5 border-t border-stone-200 bg-[#FAF8F5] flex items-center justify-between gap-4">
          <div className="text-xs text-stone-500">
            <span>Duration: <strong>{inspectingService.durationMinutes ? formatDuration(inspectingService.durationMinutes) : 'Tailored'}</strong></span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={closeServiceDetails}
              className="px-4 py-2.5 rounded-full text-stone-600 hover:text-stone-900 font-semibold text-xs cursor-pointer"
            >
              Close
            </button>

            <button
              type="button"
              onClick={() => {
                toggleService(inspectingService);
              }}
              className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-sm ${
                isSelected
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                  : 'bg-gradient-to-r from-[#D4AF37] via-[#C5A46A] to-[#B8860B] text-[#18181B] hover:brightness-105 border border-[#E5CA98]'
              }`}
            >
              {isSelected ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added to Cart</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>Add to Appointment</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
