import 'dotenv/config';
import { type BetterSQLite3Database, drizzle } from 'drizzle-orm/better-sqlite3';
import { env } from '~/env';

export const db = drizzle(env.DB_FILE_NAME, {
  logger: false,
}) as BetterSQLite3Database;
