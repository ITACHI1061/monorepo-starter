import 'dotenv/config';
import { drizzle } from 'drizzle-orm/better-sqlite3';

const dbFileName = process.env.DB_FILE_NAME || 'database/local.db';

export const db = drizzle(dbFileName);
