'use client';

import { Button } from '@monorepo-starter/ui/components/button';
import { MinusCircle, PlusCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCounterStore } from '~/lib/counter/counter-store-provider';

export default function HomePage() {
  const { count, incrementCount, decrementCount } = useCounterStore((state) => state);
  const router = useRouter();

  return (
    <div>
      <h1>Zustand with Next App router (View Page)</h1>
      <div className="flex items-center gap-2">
        <div>Count: {count}</div>
        <div className="flex items-center gap-2">
          <Button onClick={incrementCount} variant="outline">
            <PlusCircle className="size-4" />
          </Button>
          <Button onClick={decrementCount} variant="outline">
            <MinusCircle className="size-4" />
          </Button>
        </div>
        <div>
          <Button variant="outline" onClick={() => router.back()}>
            Go back
          </Button>
        </div>
      </div>
    </div>
  );
}
