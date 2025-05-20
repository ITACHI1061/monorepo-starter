import { type NextRequest, NextResponse } from 'next/server';
import { authMiddleware } from '~/lib/auth/middleware';
import { i18nMiddleware } from '~/lib/i18n/middleware';
// import { loggerMiddleware } from '~/lib/logger/middleware';

/**
 * Next Middleware
 *
 * @see {@link https://nextjs.org/docs/app/building-your-application/routing/middleware 미들웨어 호출 순서}
 * @see {@link https://nextjs.org/docs/app/building-your-application/routing/middleware#matching-paths 경로 매칭}
 * @see {@link https://nextjs.org/docs/app/building-your-application/routing/middleware#runtime 런타임}
 */
export async function middleware(request: NextRequest) {
  // 추가 예외 파일 (*worker.js)
  if (request.nextUrl.pathname.endsWith('worker.js')) {
    return NextResponse.next();
  }

  const response = NextResponse.next();
  // 현재 페이지 URL 정보를 쿠키에 저장 (세션 쿠키)
  response.cookies.set('next-pathname', request.nextUrl.pathname, { httpOnly: true });
  response.cookies.set('next-search', request.nextUrl.search, { httpOnly: true });

  // 요청 로그 기록
  // loggerMiddleware(request);

  // i18n 처리
  const withI18nResponse = await i18nMiddleware(request, response);

  // 인증 처리
  const withAuthResponse = await authMiddleware(request, withI18nResponse);

  return withAuthResponse;
}

export const config = {
  /**
   * 다음 경로를 제외
   * - /api/* (API routes)
   * - /_next/static (static files)
   * - /_next/image (image optimization files)
   * - favicon.ico, robots.txt, sitemap.xml, manifest.webmanifest
   */
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|manifest.webmanifest).*)'],
};
