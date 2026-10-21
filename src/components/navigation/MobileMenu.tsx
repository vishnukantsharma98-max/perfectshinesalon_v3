/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { navigationItems } from '../../data/navigation';
import { serviceCategories } from '../../data/services';
import { businessConfig } from '../../data/business';
import { useTheme } from '../../theme/ThemeContext';
import { useBooking } from '../../context/BookingContext';
import { getPhoneDialUrl } from '../../utils/whatsapp';
import { Phone, MessageCircle, X, Sparkles } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const { t } = useTheme();
  const { selectAndScrollToCategory, openModal } = useBooking();

  // Prevent background scroll when mobile drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation"
      className="fixed inset-0 z-50 flex flex-col bg-[#FAF8F5] text-[#18181B] md:hidden animate-in fade-in duration-200"
    >
      {/* Top Bar inside Drawer */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-white">
        <span className="font-serif text-2xl tracking-[0.2em] font-bold text-[#18181B]">
          {businessConfig.brandMark}
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label={t.actions.close}
          className="p-2 text-stone-500 hover:text-stone-900 rounded-full transition-colors cursor-pointer"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Nav Links & Categories */}
      <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col justify-between">
        <div>
          <span className="text-[11px] uppercase tracking-widest text-[#9A7B38] font-bold block mb-3">
            Salon Categories
          </span>
          <div className="space-y-2 mb-6">
            {serviceCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  selectAndScrollToCategory(cat.id);
                  onClose();
                }}
                className="w-full text-left p-2.5 rounded-xl bg-white border border-stone-200 font-serif text-lg text-stone-900 hover:text-[#9A7B38] flex items-center justify-between cursor-pointer"
              >
                <span>{cat.name}</span>
                <span className="text-xs text-[#9A7B38]">→</span>
              </button>
            ))}
          </div>

          <span className="text-[11px] uppercase tracking-widest text-stone-400 font-bold block mb-2">
            Navigation
          </span>
          <nav className="flex flex-col space-y-2">
            {navigationItems
              .filter((item) => item.enabled)
              .map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={onClose}
                  className="font-serif text-xl text-stone-700 hover:text-[#9A7B38] transition-colors py-1 block"
                >
                  {t.nav[item.labelKey]}
                </a>
              ))}
          </nav>
        </div>

        {/* Action Controls & Contact Details */}
        <div className="pt-6 border-t border-stone-200 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <a
              href={getPhoneDialUrl()}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-white border border-stone-300 text-stone-800 text-sm font-semibold hover:bg-stone-50 min-h-[44px] shadow-xs"
            >
              <Phone className="w-4 h-4 text-[#9A7B38]" />
              <span>Call Studio</span>
            </a>
            <button
              type="button"
              onClick={() => {
                onClose();
                openModal();
              }}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#C5A46A] to-[#B8860B] text-[#18181B] text-sm font-bold min-h-[44px] shadow-sm border border-[#E5CA98] cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Book Visit</span>
            </button>
          </div>

          <div className="text-xs text-stone-500 space-y-0.5 pt-2">
            <p className="text-stone-800 font-medium">{businessConfig.location.addressLine1}</p>
            <p>{businessConfig.location.city}</p>
            <p className="pt-1 text-[11px] text-stone-400">
              {businessConfig.operatingHours[0]?.days}: {businessConfig.operatingHours[0]?.hours}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
