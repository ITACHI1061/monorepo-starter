'use client';

import { useLayoutEffect } from 'react';
import { type Locale } from '~/lib/i18n/config';

export default function AppLangProvider({ lang, children }: { lang: Locale; children: React.ReactNode }) {
  useLayoutEffect(() => {
    window.document.documentElement.lang = lang;
  }, [lang]);

  return children;
}
