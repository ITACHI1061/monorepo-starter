'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { utils } from '~/env';

/**
 * 로그아웃
 */
export async function signoutAction(redirectPath?: string) {
  const cookieStore = await cookies();

  cookieStore.delete('access-token');
  cookieStore.delete('refresh-token');

  if (redirectPath) {
    redirect(redirectPath);
  }

  // const pathname = '/';
  let pathname = cookieStore.get('next-pathname')?.value || '/';
  const search = cookieStore.get('next-search')?.value || '';

  if (utils.isProtectedPath(pathname)) {
    pathname = '/';
  }

  const callbackUrl = (pathname + search) as string;
  redirect(callbackUrl);
}
