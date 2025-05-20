import Negotiator from 'negotiator';
import { NextRequest, NextResponse } from 'next/server';
import { i18n } from '~/lib/i18n/config';

/**
 * 언어 자동 설정(다국어 처리) - 쿠키에 설정된 언어가 없으면 자동으로 언어 설정 후, 쿠키에 저장
 *
 * @example
 * await i18nMiddleware(request, response);
 */
export async function i18nMiddleware(request: NextRequest, response: NextResponse) {
  if (!request.cookies.get('custom-language')) {
    const acceptLanguage = request.headers.get('accept-language') || '';
    const availableLanguages = i18n.locales as unknown as string[];
    const languages = new Negotiator({ headers: { 'accept-language': acceptLanguage } }).languages(availableLanguages);

    // 쿠키에 언어 설정
    response.cookies.set('custom-language', languages[0] || 'ko', { httpOnly: true, maxAge: 60 * 60 * 24 * 1 });
  }

  return response;
}
