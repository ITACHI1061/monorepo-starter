import 'dotenv/config';
import { type BetterSQLite3Database, drizzle } from 'drizzle-orm/better-sqlite3';

export const db = drizzle(process.env.DB_FILE_NAME!, {
  logger: false,
}) as BetterSQLite3Database;
