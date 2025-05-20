import type { Get, Paths } from 'type-fest';
import { i18n, type Locale } from './config';

/**
 * dictionary 가져오기
 */
const dictionaries = {
  ko: () => import('~/dictionaries/ko').then((module) => module.default),
  en: () => import('~/dictionaries/en').then((module) => module.default),
  cn: () => import('~/dictionaries/cn').then((module) => module.default),
};

/**
 * @example
 * const dict = await getDictionary('ko');
 */
export const getDictionary = async (locale: Locale) => {
  return dictionaries[locale]?.();
};

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;

export const translation = async <P extends Paths<Dictionary>>(
  path: P,
  locale: Locale = i18n.defaultLocale,
  defaultValue?: string | string[],
): Promise<Get<Dictionary, P> | string | string[] | undefined> => {
  const dict = await getDictionary(locale);
  const keys = (path as string)
    .replace(/\[(\d+)\]/g, '.$1')
    .split('.')
    .filter(Boolean);

  let result: unknown = dict;
  for (const key of keys) {
    if (result == null) return undefined;
    result = (result as any)[key];
  }

  const value = result as Get<Dictionary, P>;
  return value === undefined ? defaultValue : value;
};
