/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useBooking } from '../../context/BookingContext';
import { X } from 'lucide-react';

export const ServiceOptionsModal: React.FC = () => {
  const { activeOptionsService, setActiveOptionsService, addCustomService } = useBooking();

  if (!activeOptionsService || !activeOptionsService.options) return null;

  const [selectedChoices, setSelectedChoices] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    activeOptionsService.options?.forEach((grp) => {
      if (grp.choices.length > 0) {
        initial[grp.name] = grp.choices[0].name;
      }
    });
    return initial;
  });

  // Calculate current price based on selected choices
  let calculatedPrice = activeOptionsService.startingPrice || 0;
  activeOptionsService.options.forEach((grp) => {
    const selectedName = selectedChoices[grp.name];
    const match = grp.choices.find((c) => c.name === selectedName);
    if (match && match.price) {
      calculatedPrice = match.price;
    }
  });

  const handleAdd = () => {
    const optionText = Object.values(selectedChoices).join(' · ');
    addCustomService(activeOptionsService, optionText, calculatedPrice);
    setActiveOptionsService(null);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in"
    >
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-stone-200 animate-in zoom-in-95 duration-200 text-stone-900">
        {/* Header */}
        <div className="flex items-center justify-between p-5 pb-3">
          <h3 className="text-xl font-bold text-stone-900">
            {activeOptionsService.name}
          </h3>
          <button
            type="button"
            onClick={() => setActiveOptionsService(null)}
            className="w-9 h-9 rounded-full border border-stone-200 flex items-center justify-center text-stone-500 hover:text-stone-900 hover:bg-stone-50 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5 text-rose-600" />
          </button>
        </div>

        {/* Option Groups */}
        <div className="p-5 pt-2 space-y-5 max-h-[65vh] overflow-y-auto">
          {activeOptionsService.options.map((grp) => {
            const currentSelected = selectedChoices[grp.name];

            return (
              <div key={grp.name} className="space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-stone-900">
                  <span className="font-bold">{grp.name}</span>
                  <span className="text-stone-500 font-normal">{currentSelected}</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {grp.choices.map((choice) => {
                    const isSelected = currentSelected === choice.name;
                    return (
                      <button
                        key={choice.name}
                        type="button"
                        onClick={() =>
                          setSelectedChoices((prev) => ({
                            ...prev,
                            [grp.name]: choice.name,
                          }))
                        }
                        className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#18181B] text-white shadow-xs'
                            : 'bg-white text-stone-800 border border-stone-200 hover:border-stone-400'
                        }`}
                      >
                        <span>{choice.name}</span>
                        {choice.price && (
                          <span className={`block text-[11px] font-normal ${isSelected ? 'text-stone-300' : 'text-stone-500'}`}>
                            ₹{choice.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Bottom Bar */}
        <div className="p-5 border-t border-stone-100 flex items-center justify-between gap-4 bg-white">
          <div>
            <span className="font-bold text-lg text-stone-900 block leading-tight">
              ₹{calculatedPrice.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </span>
            <span className="text-xs text-stone-500">
              {activeOptionsService.durationFormatted || '40 min'}
            </span>
          </div>

          <button
            type="button"
            onClick={handleAdd}
            className="flex-1 py-3 px-6 rounded-full bg-[#D61C4E] hover:bg-[#c21443] active:scale-[0.98] text-white font-bold text-sm transition-all cursor-pointer shadow-md text-center"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};
