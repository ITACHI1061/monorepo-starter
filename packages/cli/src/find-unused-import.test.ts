import { execSync } from 'node:child_process';
import { expect, test } from 'vitest';

test('CLI 인자 실행', () => {
  let error = null;
  try {
    execSync('pnpm dev src/find-unused-import.ts apps/hono-api', { stdio: 'inherit' });
  } catch (e) {
    error = e;
  }
  expect(error).toBeNull();
});
