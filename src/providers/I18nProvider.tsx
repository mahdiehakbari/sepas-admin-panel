'use client';

import { initI18n } from '@/i18n';
import { ReactNode, useEffect, useState } from 'react';

interface I18nProviderProps {
  children: ReactNode;
}

export default function I18nProvider({ children }: I18nProviderProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initI18n().then(() => {
      document.documentElement.dir = 'rtl';
      setReady(true);
    });
  }, []);

  if (!ready) return null;

  return <>{children}</>;
}
