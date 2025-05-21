'use server';

import { cookies } from 'next/headers';
import parseDuration from 'parse-duration';
import z from 'zod';
import { env } from '~/env';
import { generateAccessToken, generateRefreshToken } from '~/lib/auth/jwt';

const signinSchema = z.object({
  loginId: z.string().email(),
  password: z.string().min(4),
});

/**
 * 로그인
 * @param username 사용자 이름
 * @param password 사용자 비밀번호
 * @returns 성공 여부
 */
export async function signinAction(
  loginId: string,
  password: string,
): Promise<{ success: boolean; error?: string; message?: string }> {
  const cookieStore = await cookies();

  const validatedFields = signinSchema.safeParse({ loginId, password });
  if (!validatedFields.success) {
    return { success: false, error: 'Invalid credentials', message: '입력정보가 올바르지 않습니다.' };
  }

  const userId = loginId.split('@')[0] || '';
  const accessToken = await generateAccessToken(userId);
  const refreshToken = await generateRefreshToken(userId);

  const accessTokenMaxAge = parseDuration(env.ACCESS_TOKEN_SECRET_TIME, 's') || 60 * 15;
  const refreshTokenMaxAge = parseDuration(env.REFRESH_TOKEN_SECRET_TIME, 's') || 60 * 60 * 24 * 7;

  cookieStore.set(env.ACCESS_TOKEN_COOKIE_NAME, accessToken, {
    httpOnly: true,
    secure: true,
    maxAge: accessTokenMaxAge,
  });

  cookieStore.set(env.REFRESH_TOKEN_COOKIE_NAME, refreshToken, {
    httpOnly: true,
    secure: true,
    maxAge: refreshTokenMaxAge,
  });

  return { success: true };
}
