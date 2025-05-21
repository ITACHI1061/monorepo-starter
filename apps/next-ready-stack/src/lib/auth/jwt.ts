import { SignJWT, jwtVerify } from 'jose';
import { env } from '~/env';

const ACCESS_TOKEN_SECRET = new TextEncoder().encode(env.ACCESS_TOKEN_SECRET);
const REFRESH_TOKEN_SECRET = new TextEncoder().encode(env.REFRESH_TOKEN_SECRET);

export async function generateAccessToken(userId: string) {
  return new SignJWT({ userId })
    .setSubject(userId)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime(env.ACCESS_TOKEN_SECRET_TIME)
    .sign(ACCESS_TOKEN_SECRET);
}

export async function generateRefreshToken(userId: string) {
  return new SignJWT({ userId })
    .setSubject(userId)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime(env.REFRESH_TOKEN_SECRET_TIME)
    .sign(REFRESH_TOKEN_SECRET);
}

export async function verifyAccessToken(token: string) {
  const { payload } = await jwtVerify(token, ACCESS_TOKEN_SECRET);
  return payload;
}

export async function verifyRefreshToken(token: string) {
  const { payload } = await jwtVerify(token, REFRESH_TOKEN_SECRET);
  return payload;
}
