import { sql } from 'drizzle-orm';
import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';

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

export type UsersTable = typeof usersTable.$inferSelect;
