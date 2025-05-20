import { sql } from 'drizzle-orm';
import { blob, index, int, sqliteTable, text } from 'drizzle-orm/sqlite-core';

/**
 * API Cache Table
 */
export const cacheTable = sqliteTable(
  'cache',
  {
    // 고유 캐시 키 (예: user:123:products)
    key: text('key').primaryKey(),
    // gzip 압축된 JSON Buffer (blob 타입)
    value: blob('value').notNull(),
    // 만료 시각 (ms 타임스탬프 기준, unix epoch)
    expiresAt: int('expiresAt').notNull(),
  },
  (table) => [index('expiresAtIndex').on(table.expiresAt)],
);

/**
 * Users Table
 */
export const usersTable = sqliteTable('user', {
  id: int().primaryKey({ autoIncrement: true }),
  loginId: text().notNull().unique(),
  name: text().notNull(),
  email: text().unique(),
  gender: text({ enum: ['male', 'female'] }),
  birth: text({ length: 10 }),
  contact: text({ length: 10 }),
  profile: text({ mode: 'json' }).$type<Record<string, string>>(),
  bio: text(),
  status: text({ enum: ['active', 'inactive'] })
    .notNull()
    .default('active'),
  createdAt: int()
    .notNull()
    .default(sql`(strftime('%s', 'now'))`),
  updatedAt: int()
    .notNull()
    .default(sql`(strftime('%s', 'now'))`)
    .$onUpdate(() => sql`(strftime('%s', 'now'))`),
});
