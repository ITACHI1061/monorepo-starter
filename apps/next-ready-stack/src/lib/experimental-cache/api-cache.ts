/**
 * 로컬 SQLite, File 을 혼합한 API 캐시 (Server-side Only)
 */
import { devLog } from '@monorepo-starter/utils/console';
import { eq } from 'drizzle-orm';
import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
import { promisify } from 'node:util';
import { gunzip, gzipSync } from 'node:zlib';
import { db } from '~/db';
import { cacheTable } from '~/db/schema';

// 캐시 파일 최대 크기
const MAX_SQLITE_BYTES = 1 * 1024 * 1024; // 1MB 이상이면, SQLite 캐시 미사용
const API_CACHE_PATH = process.env.API_CACHE_PATH || '.cache';
const asyncGunzip = promisify(gunzip);
const cacheDir = path.join(process.cwd(), API_CACHE_PATH);

// 동시 실행 제한
const inflight = new Map<string, Promise<any>>();

type HybridOptions<T> = {
  key: string;
  ttl: number;
  fetcher: () => Promise<T>;
};

export async function apiHybridCache<T>({ key, ttl, fetcher }: HybridOptions<T>) {
  // 캐시 디렉토리 생성
  try {
    await fs.access(cacheDir);
  } catch {
    await fs.mkdir(cacheDir, { recursive: true });
  }

  const traceId = generateTraceId();
  const now = Date.now();
  const filePath = getFilePath(key);

  // SQLite 캐시 히트 확인
  try {
    const rows = await db.select().from(cacheTable).where(eq(cacheTable.key, key)).limit(1);
    if (rows.length === 1) {
      const row = rows[0]!;

      if (row.expiresAt > now) {
        const buffer = row.value as Buffer;
        const decompressed = await asyncGunzip(buffer);
        const data = JSON.parse(decompressed.toString());
        devLog('info', `[CACHE]`, {
          cacheStatus: 'HIT',
          hitType: 'DB',
          key,
          traceId,
          compressedSize: buffer.byteLength,
        });

        return { data, traceId, cacheStatus: 'HIT:SQLite' };
      }
    }
  } catch {
    devLog('warn', `[SQLITE_DECOMPRESS ERROR] key=${key} traceId=${traceId}`);
  }

  // 파일 캐시 히트 확인
  try {
    const stat = await fs.stat(filePath);
    const age = now - stat.mtimeMs;
    if (age < ttl) {
      const buffer = await fs.readFile(filePath);
      const decompressed = await asyncGunzip(buffer);
      const data = JSON.parse(decompressed.toString());
      devLog('info', `[CACHE]`, { cacheStatus: 'HIT', hitType: 'FILE', key, traceId, compressedSize: buffer.length });
      return { data, traceId, cacheStatus: 'HIT:File' };
    }
  } catch {
    devLog('warn', `[CACHE_FILE_NOT_FOUND ERROR] key=${key} traceId=${traceId} filePath=${filePath}`);
  }

  // 동시 실행 제한
  if (inflight.has(key)) {
    const data = await inflight.get(key);
    devLog('warn', `[CACHE_WAIT ERROR] key=${key} traceId=${traceId}`);
    return { data, traceId, cacheStatus: 'WAIT' };
  }

  // 캐시 데이터 조회
  const promise = (async () => {
    const fetchStart = Date.now();
    const data = await fetcher();
    const fetchDuration = Date.now() - fetchStart;

    const json = JSON.stringify(data);
    const compressed = gzipSync(json);
    const compressedSize = compressed.length;
    const expiresAt = now + ttl;

    // 파일 캐시 저장
    try {
      await fs.writeFile(filePath, compressed);
      devLog('info', `[CACHE]`, { cacheStatus: 'MISS', hitType: 'FILE', key, traceId, compressedSize, fetchDuration });
    } catch (err) {
      devLog('error', `[FILE_WRITE_ERROR] key=${key} path=${filePath}`, err);
    }

    // SQLite 캐시 저장
    if (compressedSize <= MAX_SQLITE_BYTES) {
      await db
        .insert(cacheTable)
        .values({ key, value: compressed, expiresAt })
        .onConflictDoUpdate({
          target: cacheTable.key,
          set: { value: compressed, expiresAt },
        });
      devLog('info', `[CACHE]`, { cacheStatus: 'MISS', hitType: 'DB', key, traceId, compressedSize, fetchDuration });
    }

    return data;
  })();

  inflight.set(key, promise);

  // 캐시 데이터 조회
  try {
    const result = await promise;
    return { data: result, traceId, cacheStatus: 'MISS' };
  } finally {
    inflight.delete(key);
  }
}

function safeHash(key: string) {
  return crypto.createHash('sha256').update(key).digest('hex');
}

function getFilePath(key: string) {
  return path.join(cacheDir, `${safeHash(key)}.json.gz`);
}

function generateTraceId() {
  return crypto.randomUUID();
}
