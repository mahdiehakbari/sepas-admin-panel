'use client';

import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

export const useToggleLanguage = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = useCallback(() => {
    const newLang = i18n.language === 'fa' ? 'en' : 'fa';
    i18n.changeLanguage(newLang);

    document.documentElement.dir = newLang === 'fa' ? 'rtl' : 'ltr';

    document.documentElement.classList.remove('font-fa', 'font-en');
    document.documentElement.classList.add(
      newLang === 'fa' ? 'font-fa' : 'font-en',
    );
  }, [i18n]);

  return {
    toggleLanguage,
    currentLanguage: i18n.language,
  };
};
