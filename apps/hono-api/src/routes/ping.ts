import { format } from 'date-fns';
import { Hono } from 'hono';

export const ping = new Hono().get('/', (c) => {
  c.header('Cache-Control', 'public, max-age=0, s-maxage=10');
  return c.json({ message: 'pong', timestamp: format(new Date(), 'yyyy-MM-dd HH:mm:ss') });
});
