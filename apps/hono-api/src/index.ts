import 'dotenv/config';

import { colors, devLog } from '@monorepo-starter/utils/console';
import { serve, type HttpBindings } from '@hono/node-server';
import { serveStatic } from '@hono/node-server/serve-static';
import { Hono } from 'hono';
import { compress } from 'hono/compress';
import { cors } from 'hono/cors';
import { csrf } from 'hono/csrf';
import { inspectRoutes } from 'hono/dev';
import { logger } from 'hono/logger';
import { prettyJSON } from 'hono/pretty-json';
import { requestId } from 'hono/request-id';
import { secureHeaders } from 'hono/secure-headers';
import { ping } from './routes/ping.js';
import { users } from './routes/users.js';
import { createLogger } from './utils/logger.js';

export type Bindings = HttpBindings & {};

const log = createLogger('server/startup');
const port = Number(process.env.PORT) || 4000;

const app = new Hono<{ Bindings: Bindings }>();
app.use(cors());
app.use(csrf());
app.use(compress());
app.use(requestId());
app.use(logger());
app.use(secureHeaders());
app.use('/public/*', serveStatic({ root: './' }));
app.use('/upload/*', serveStatic({ root: './upload' }));
app.use(prettyJSON());

serve(
  {
    fetch: app.fetch,
    port,
  },
  (info) => {
    const protocol = 'http';
    const address = info.address === '::' ? 'localhost' : info.address;

    devLog('info', 'Server is running on' + colors.success(` ${protocol}://${address}:${info.port}`));
    log.info('Server is running on %s://%s:%d', protocol, address, info.port);

    inspectRoutes(app)
      .filter((route) => route.name === '[handler]')
      .map((route) => {
        const method = route.method;
        devLog('info', colors.green(route.method.padEnd(6)), `${protocol}://${address}:${info.port}${route.path}`);
      });
  },
);

export const route = app
  .route('/ping', ping) // Ping Route
  .route('/users', users); // Users Route
