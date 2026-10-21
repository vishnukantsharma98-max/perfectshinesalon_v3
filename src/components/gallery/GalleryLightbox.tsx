/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { GalleryItem } from '../../types/gallery';
import { ASSET_MAP } from '../../data/assets';
import { buildWhatsAppUrl } from '../../utils/whatsapp';
import { X, MessageCircle, ArrowLeft, ArrowRight } from 'lucide-react';

interface GalleryLightboxProps {
  item: GalleryItem | null;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
}

export const GalleryLightbox: React.FC<GalleryLightboxProps> = ({
  item,
  onClose,
  onNext,
  onPrev,
}) => {
  if (!item) return null;

  const asset = ASSET_MAP[item.imageSlot];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Gallery View"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="relative max-w-5xl w-full max-h-[92vh] flex flex-col bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-2xl">
        {/* Top Bar */}
        <div className="flex items-center justify-between px-6 py-3.5 border-b border-stone-200 bg-[#FAF8F5] text-xs">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[#9A7B38] font-bold uppercase tracking-wider">
              {item.category}
            </span>
            <span className="text-stone-300">·</span>
            <span className="font-serif text-base font-semibold text-stone-900">{item.title}</span>
          </div>

          <div className="flex items-center gap-2">
            {onPrev && (
              <button
                type="button"
                onClick={onPrev}
                className="p-1.5 text-stone-500 hover:text-stone-900 hover:bg-stone-200/60 rounded-full transition-colors cursor-pointer"
                aria-label="Previous image"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            {onNext && (
              <button
                type="button"
                onClick={onNext}
                className="p-1.5 text-stone-500 hover:text-stone-900 hover:bg-stone-200/60 rounded-full transition-colors cursor-pointer"
                aria-label="Next image"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-stone-500 hover:text-stone-900 hover:bg-stone-200/60 rounded-full transition-colors cursor-pointer ml-1"
              aria-label="Close lightbox"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Center Image */}
        <div className="relative flex-1 bg-stone-950 flex items-center justify-center overflow-hidden min-h-[350px] sm:min-h-[500px]">
          {asset && (
            <img
              src={asset.url}
              alt={item.title}
              className="w-full h-full object-contain max-h-[70vh]"
            />
          )}
        </div>

        {/* Bottom Details & Direct WhatsApp Consultation */}
        <div className="px-6 py-4 bg-white border-t border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
          <div>
            <h4 className="font-serif text-lg font-semibold text-stone-900">{item.title}</h4>
            {item.caption && <p className="text-stone-500 mt-0.5">{item.caption}</p>}
          </div>

          <a
            href={buildWhatsAppUrl({
              intent: 'service',
              serviceName: `${item.title} (from Portfolio)`,
            })}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#D4AF37] via-[#C5A46A] to-[#B8860B] text-[#18181B] font-semibold tracking-wider uppercase rounded-full transition-all duration-200 shadow-xs hover:shadow-md cursor-pointer shrink-0 border border-[#E5CA98]"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Enquire This Look</span>
          </a>
        </div>
      </div>
    </div>
  );
};
