import { SearchParams } from 'nuqs/server';
import { Suspense } from 'react';
import { Client } from './client';
import { cache } from './searchParams';
import { Server } from './server';

export default async function Page({ searchParams }: { searchParams: Promise<SearchParams> }) {
  await cache.parse(searchParams);

  return (
    <div>
      <h1>Nuqs Complex</h1>
      <p>모두 같은 값을 사용</p>

      <h3 className="text-cyan-600">Using Server Component With Link Update</h3>
      <Server />

      <h3 className="text-sky-600">Using Client Component With Realtime Update</h3>
      <Suspense fallback={<div>Loading...</div>}>
        <Client />
      </Suspense>
    </div>
  );
}
