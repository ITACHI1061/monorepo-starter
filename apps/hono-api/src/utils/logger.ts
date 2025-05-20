import fs from 'node:fs';
import path from 'node:path';
import pino from 'pino';

const isProd = process.env.NODE_ENV === 'production';
const LOG_FILE_PATH = process.env.LOG_FILE_PATH ?? './logs';

/**
 * Create a logger with a specific name
 * @example
 * const logger = createLogger('server');
 * logger.info('Hello, world!');
 */
export function createLogger(name: string) {
  const destination = path.join(LOG_FILE_PATH, `${name}.log`);
  const dirname = path.dirname(destination);

  if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname, { recursive: true });
  }

  const fileTransport = { target: 'pino/file', options: { destination } };
  const prettyTransport = { target: 'pino-pretty', options: { colorize: true } };

  return pino.default({
    level: isProd ? 'warn' : 'trace',
    transport: {
      targets: isProd ? [fileTransport, prettyTransport] : [prettyTransport],
    },
  });
}
