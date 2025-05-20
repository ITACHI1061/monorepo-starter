import { devLog } from '@monorepo-starter/utils/console';
import { type NextRequest } from 'next/server';

/**
 * 요청 로그 기록
 *
 * @example
 * await loggerMiddleware(request);
 */
export async function loggerMiddleware(request: NextRequest) {
  // 페이지 라우트, 서버액션에 대한 접근 로그 (API 라우트는 제외)
  const timestamp = new Date().toISOString();
  const forwardedFor = request.headers.get('x-forwarded-for') || '';
  const clientIp =
    forwardedFor
      ?.split(',')[0]
      ?.trim()
      .replace(/^::ffff:/, '') || 'unknown';

  const userAgent = request.headers.get('user-agent') || '-';
  const method = request.method;
  const protocol = request.nextUrl.protocol.replace(':', '').toUpperCase();
  const fullUrl = request.nextUrl.href;
  const referer = request.headers.get('referer') || '-';

  // CLIENT_IP - - [TIMESTAMP] "METHOD URL PROTOCOL" "REFERER" "USER_AGENT"
  const logLine = `${clientIp} - - [${timestamp}] "${method} ${fullUrl} ${protocol}" "${referer}" "${userAgent}"`;
  devLog('info', logLine);
}
