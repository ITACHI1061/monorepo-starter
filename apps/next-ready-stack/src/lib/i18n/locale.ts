import { cookies } from 'next/headers';
import { type Locale } from './config';

/**
 * Server Only - Server Cookies 안에 포함된 Locale 값
 */
export async function getLocale() {
  const cookieStore = await cookies();
  return cookieStore.get('custom-language')?.value as Locale;
}
