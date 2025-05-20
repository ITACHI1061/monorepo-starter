'use client';

import { Button } from '@monorepo-starter/ui/components/button';
import { Input } from '@monorepo-starter/ui/components/input';
import { parseAsInteger, useQueryState } from 'nuqs';

export default function ExampleNuqsClientPage() {
  const [hello, setHello] = useQueryState('hello', { defaultValue: '' });
  const [count, setCount] = useQueryState('count', parseAsInteger.withDefault(0));

  return (
    <div>
      <h1>Nuqs Client</h1>
      <div className="not-prose flex items-center gap-2">
        <Button onClick={() => setCount((c) => c + 1)}>Count: {count}</Button>
        <Input
          className="flex-1"
          value={hello}
          placeholder="Enter your name"
          onChange={(e) => setHello(e.target.value || null)}
        />
        <p>Hello, {hello || 'anonymous visitor'}!</p>
      </div>
    </div>
  );
}
