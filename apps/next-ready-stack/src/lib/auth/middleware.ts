import { devLog } from '@monorepo-starter/utils/console';
import { NextRequest, NextResponse } from 'next/server';
import parseDuration from 'parse-duration';
import { generateAccessToken, verifyAccessToken, verifyRefreshToken } from './jwt';

export const signinPath = '/signin';
export const protectedPaths = [
  /^\/(protect|private|mypage)(\/.*)?$/, // 보호된 페이지
  /^\/example\/auth\/protect(\/.*)?$/, // 예제 페이지
];

export function isProtectedPath(pathValue: string) {
  return protectedPaths.some((path) => path.test(pathValue));
}

/**
 * 인증관련 설정 - 접근 제한 페이지
 */
export async function authMiddleware(request: NextRequest, response: NextResponse) {
  const { pathname, search } = request.nextUrl;

  // 접근 제한 페이지가 아니면, 리턴
  if (!isProtectedPath(pathname)) {
    return response;
  }

  const accessToken = request.cookies.get('access-token')?.value;
  const refreshToken = request.cookies.get('refresh-token')?.value;
  const signinUrl = new URL(`${signinPath}?callbackUrl=${encodeURIComponent(pathname + search)}`, request.url);

  // 엑세스 토큰이 있으면, 엑세스 토큰 검증 결과 리턴
  if (accessToken) {
    try {
      await verifyAccessToken(accessToken);
      return response;
    } catch (error) {
      devLog('error', error);
      return response;
    }
  }

  // 리프레시 토큰이 있으면, 리프레시 토큰 검증 > 새로운 엑세스 토큰 생성 > 쿠키에 저장 후 리턴
  if (refreshToken) {
    try {
      const { sub } = await verifyRefreshToken(refreshToken);
      const newAccessToken = await generateAccessToken(sub!);
      const maxAge = parseDuration(process.env.ACCESS_TOKEN_SECRET_TIME, 's') || 60 * 15;
      response.cookies.set('access-token', newAccessToken, { httpOnly: true, secure: true, maxAge });
      return response;
    } catch (error) {
      devLog('error', error);
      const redirectResponse = NextResponse.redirect(signinUrl);
      redirectResponse.cookies.delete('refresh-token');
      return redirectResponse;
    }
  }

  // 엑세스 토큰과 리프레시 토큰이 없으면, 로그인 페이지로 리다이렉트
  return NextResponse.redirect(signinUrl);
}
