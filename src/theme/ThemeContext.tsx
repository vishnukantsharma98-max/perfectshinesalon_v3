/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ThemeConfig, HeroMode } from '../types/theme';
import { defaultThemeConfig } from './tokens';
import { SupportedLanguage } from '../types/i18n';
import { translations } from '../data/translations';

interface ThemeContextValue {
  theme: ThemeConfig;
  setHeroMode: (mode: HeroMode) => void;
  toggleSectionVisibility: (sectionKey: keyof ThemeConfig['sectionVisibility']) => void;
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: typeof translations['en'];
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeConfig>(defaultThemeConfig);
  const [language, setLanguage] = useState<SupportedLanguage>('en');

  const setHeroMode = (mode: HeroMode) => {
    setTheme((prev) => ({
      ...prev,
      heroMode: mode,
    }));
  };

  const toggleSectionVisibility = (sectionKey: keyof ThemeConfig['sectionVisibility']) => {
    setTheme((prev) => ({
      ...prev,
      sectionVisibility: {
        ...prev.sectionVisibility,
        [sectionKey]: !prev.sectionVisibility[sectionKey],
      },
    }));
  };

  const t = translations[language];

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setHeroMode,
        toggleSectionVisibility,
        language,
        setLanguage,
        t,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
