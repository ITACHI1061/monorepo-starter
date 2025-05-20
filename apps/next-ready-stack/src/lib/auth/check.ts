import { devLog } from '@monorepo-starter/utils/console';
import { cookies } from 'next/headers';
import { verifyAccessToken } from './jwt';

export async function checkAuthorization(): Promise<{
  isAuthenticated: boolean;
  payload?: Awaited<ReturnType<typeof verifyAccessToken>>;
}> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('access-token')?.value;

  if (!accessToken) {
    return { isAuthenticated: false };
  }

  try {
    const decoded = await verifyAccessToken(accessToken);
    return { isAuthenticated: true, payload: decoded };
  } catch (error) {
    devLog('error', error);
    return { isAuthenticated: false };
  }
}

export type AuthorizationPayload = Awaited<ReturnType<typeof checkAuthorization>>['payload'];
