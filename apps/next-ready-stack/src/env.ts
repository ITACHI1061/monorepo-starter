// NOTE: 환경변수 관리 파일 및 유틸리티 함수 - Edge Runtime, Node.js 환경에서 같이 사용(node 전용 함수 사용 불가)
import { createEnv } from '@t3-oss/env-nextjs';
import parseDuration from 'parse-duration'; // Edge OK
import { z } from 'zod';

export const env = createEnv({
  server: {
    // File & Path & Url
    LOG_FILE_PATH: z.string().default('logs'),
    UPLOAD_PATH: z.string().default('upload'),
    API_CACHE_PATH: z.string().default('.cache'),
    DB_FILE_NAME: z.string().default('database/local.db'),
    SIGNIN_PATH: z.string().default('/signin'),
    // Code editor
    CODE_EDITOR: z.enum(['cursor', 'vscode', 'windsurf', 'webstorm', 'intellij', 'neovim', 'sublimetext', 'emacs']),
    // Tokens
    ACCESS_TOKEN_SECRET: z.string(),
    ACCESS_TOKEN_SECRET_TIME: z.string().refine((value) => parseDuration(value, 's') !== null),
    REFRESH_TOKEN_SECRET: z.string(),
    REFRESH_TOKEN_SECRET_TIME: z.string().refine((value) => parseDuration(value, 's') !== null),
    ACCESS_TOKEN_COOKIE_NAME: z.string().default('access-token'),
    REFRESH_TOKEN_COOKIE_NAME: z.string().default('refresh-token'),
  },
  client: {
    NEXT_PUBLIC_VAPID_PUBLIC_KEY: z.string(),
    NEXT_PUBLIC_VAPID_PRIVATE_KEY: z.string(),
    NEXT_PUBLIC_WEB_PUSH_EMAIL: z.string().default('example@example.com'),
  },
  // For Next.js >= 13.4.4,
  experimental__runtimeEnv: {
    NEXT_PUBLIC_VAPID_PUBLIC_KEY: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
    NEXT_PUBLIC_VAPID_PRIVATE_KEY: process.env.NEXT_PUBLIC_VAPID_PRIVATE_KEY,
    NEXT_PUBLIC_WEB_PUSH_EMAIL: process.env.NEXT_PUBLIC_WEB_PUSH_EMAIL,
  },
});

export const utils = {
  protectedPaths: [
    /^\/(protect|private|mypage)(\/.*)?$/, // regExp
    '/example/auth/protect', // string(startsWith)
  ],
  isProtectedPath: (pathValue: string) => {
    return utils.protectedPaths.some((path) =>
      typeof path === 'string' ? pathValue.startsWith(path) : path.test(pathValue),
    );
  },
};
