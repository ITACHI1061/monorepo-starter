import fs from 'node:fs';
import path from 'node:path';
import pino from 'pino';

const development = process.env.NODE_ENV !== 'production';

/**
 * Create a logger with a specific name
 * @example
 * // in server component
 * const logger = createLogger('server');
 * logger.info('Hello, world!');
 *
 * // in server action
 * import { createLogger } from '~/lib/logger/pino';
 * const logger = createLogger('action');
 * logger.info('Hello, world!');
 */
export function createLogger(name: string) {
  const destination = path.join(process.env.LOG_FILE_PATH!, `${name}.log`);
  const dirname = path.dirname(destination);

  try {
    fs.accessSync(dirname);
  } catch {
    fs.mkdirSync(dirname, { recursive: true });
  }

  const fileTransport = { target: 'pino/file', options: { destination } };
  const prettyTransport = { target: 'pino-pretty', options: { colorize: true } };

  return pino({
    level: development ? 'trace' : 'warn',
    transport: {
      targets: development ? [fileTransport, prettyTransport] : [fileTransport],
    },
  });
}
