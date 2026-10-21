/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useTheme } from '../../theme/ThemeContext';
import { SupportedLanguage } from '../../types/i18n';

export const LanguageToggle: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { language, setLanguage } = useTheme();

  return (
    <div
      role="group"
      aria-label="Language selection"
      className={`inline-flex items-center p-1 bg-[#1a1714] border border-[#332c25] rounded-full text-xs tracking-wider font-medium select-none shadow-inner ${className}`}
    >
      <button
        type="button"
        onClick={() => setLanguage('en')}
        className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-all duration-300 cursor-pointer ${
          language === 'en'
            ? 'bg-[#C5A46A] text-[#11100F] shadow-sm'
            : 'text-[#867D71] hover:text-[#F6F1E8]'
        }`}
        aria-pressed={language === 'en'}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLanguage('hi')}
        className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-all duration-300 cursor-pointer ${
          language === 'hi'
            ? 'bg-[#C5A46A] text-[#11100F] shadow-sm'
            : 'text-[#867D71] hover:text-[#F6F1E8]'
        }`}
        aria-pressed={language === 'hi'}
      >
        हिंदी
      </button>
    </div>
  );
};
