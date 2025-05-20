import { SignJWT, jwtVerify } from 'jose';

const ACCESS_TOKEN_SECRET = new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET!);
const REFRESH_TOKEN_SECRET = new TextEncoder().encode(process.env.REFRESH_TOKEN_SECRET!);

export async function generateAccessToken(userId: string) {
  return new SignJWT({ userId })
    .setSubject(userId)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime(process.env.ACCESS_TOKEN_SECRET_TIME!)
    .sign(ACCESS_TOKEN_SECRET);
}

export async function generateRefreshToken(userId: string) {
  return new SignJWT({ userId })
    .setSubject(userId)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime(process.env.REFRESH_TOKEN_SECRET_TIME!)
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
