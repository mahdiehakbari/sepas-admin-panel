'use client';

import i18n, { InitOptions, Resource } from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { localesNS, languages } from './locales_NameSpace';

const loadResources = async (): Promise<Resource> => {
  const resources: Resource = {};

  for (const lang of languages) {
    resources[lang] = {};
    for (const ns of localesNS) {
      try {
        const moduleData = await import(`./locales/${lang}/${ns}.json`);
        resources[lang][ns] = moduleData.default;
      } catch (err) {
        console.warn(
          `Translation file not found: ./locales/${lang}/${ns}.json`,
        );
        resources[lang][ns] = {};
      }
    }
  }

  return resources;
};

export const initI18n = async () => {
  if (!i18n.isInitialized) {
    const resources = await loadResources();

    const options: InitOptions = {
      resources,
      lng: 'fa',
      fallbackLng: 'en',
      ns: localesNS,
      defaultNS: localesNS[0],
      interpolation: { escapeValue: false },
      react: { useSuspense: false },
    };

    await i18n.use(initReactI18next).use(LanguageDetector).init(options);
  }

  return i18n;
};

export default i18n;
