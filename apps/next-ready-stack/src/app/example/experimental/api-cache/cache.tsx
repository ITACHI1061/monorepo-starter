import { devLog } from '@monorepo-starter/utils/console';
import { apiHybridCache } from '~/lib/experimental-cache/api-cache';

export default async function ExampleCacheData() {
  const offset = 10;
  const limit = 20;

  const { data, traceId, cacheStatus } = await apiHybridCache({
    key: `users:all:${offset}:${limit}`,
    ttl: 1000 * 10, // 10 seconds
    fetcher: async () => {
      try {
        const res = await fetch(`https://api.disneyapi.dev/character`, {
          cache: 'no-store',
        });
        return res.json();
      } catch (error) {
        devLog('error', error);
        return [];
      }
    },
  });

  return (
    <div>
      <ul>
        <li>
          <strong>cacheStatus</strong>: <code>{cacheStatus}</code>
        </li>
        <li>
          <strong>traceId</strong>: <code>{traceId}</code>
        </li>
        <li>
          <strong>data Count</strong>: <code>{JSON.stringify(data.data.length)}</code>
        </li>
      </ul>
      <pre className="h-120">{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
