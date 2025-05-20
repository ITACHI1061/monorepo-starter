'use client';

import { Button } from '@monorepo-starter/ui/components/button';
import Link from 'next/link';
import { useCounterStore } from '~/lib/counter/counter-store-provider';

export default function HomePage() {
  const { count, incrementCount, decrementCount } = useCounterStore((state) => state);

  return (
    <div>
      <h1>Zustand with Next App router</h1>
      <p>간단한 Zustand 카운터 예제</p>
      <div className="flex items-center gap-2">
        <Button variant="outline" onClick={incrementCount}>
          Increment Count
        </Button>
        <span>Count: {count}</span>
        <Button variant="outline" onClick={decrementCount}>
          Decrement Count
        </Button>
      </div>
      <div>
        <Link href="/example/zustand/server/view">Go View Page</Link>
      </div>
    </div>
  );
}
