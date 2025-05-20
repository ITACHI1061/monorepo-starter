import { convertJsonToEnv, parseEnvToJson } from '@monorepo-starter/utils/env';
import { nanoid } from 'nanoid';
import child from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

// 현재 파일의 실행 경로를 프로젝트 루트로 변경
process.chdir(path.join(import.meta.dirname, '../../..'));

/**
 * Init `apps/hono-api`
 */
const initHonoApi = () => {
  const dirname = 'apps/hono-api';

  child.execSync(`cp .env.example .env`, { cwd: dirname });
  child.execSync(`pnpm db:generate`, { cwd: dirname });
  child.execSync(`pnpm db:migrate`, { cwd: dirname });
};

/**
 * Init `apps/next-ready-stack`
 */
const initNextReadyStack = () => {
  const dirname = 'apps/next-ready-stack';

  const env = fs.readFileSync(`${dirname}/.env.example`, 'utf-8');
  const envJson = parseEnvToJson(env);

  envJson['ACCESS_TOKEN_SECRET'] = nanoid(32);
  envJson['REFRESH_TOKEN_SECRET'] = nanoid(32);

  const generateVapidKeys = child.execSync(`pnpx web-push generate-vapid-keys --json`, { encoding: 'utf-8' });
  const generateVapidKeysJson = JSON.parse(generateVapidKeys);

  envJson['NEXT_PUBLIC_VAPID_PUBLIC_KEY'] = generateVapidKeysJson.publicKey;
  envJson['NEXT_PUBLIC_VAPID_PRIVATE_KEY'] = generateVapidKeysJson.privateKey;

  const envString = convertJsonToEnv(envJson);
  fs.writeFileSync(`${dirname}/.env`, envString, 'utf-8');

  child.execSync(`pnpm db:generate`, { cwd: dirname });
  child.execSync(`pnpm db:migrate`, { cwd: dirname });
};

/**
 * Run all init
 */
initHonoApi();
initNextReadyStack();
