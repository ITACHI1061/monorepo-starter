'use client';

import { Button } from '@monorepo-starter/ui/components/button';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef, useState } from 'react';

export default function VirtualDynamicRow({ sentences }: { sentences: string[] }) {
  const parentRef = useRef<HTMLDivElement>(null);

  const [enabled, setEnabled] = useState(true);

  const count = sentences.length;

  const virtualizer = useVirtualizer({
    count,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 45,
    enabled,
    paddingStart: 50,
    paddingEnd: 50,
  });

  const items = virtualizer.getVirtualItems();

  return (
    <div className="not-prose">
      <div className="mb-4 flex gap-2">
        <Button
          onClick={() => {
            virtualizer.scrollToIndex(0);
          }}
        >
          scroll to the top
        </Button>
        <Button
          onClick={() => {
            virtualizer.scrollToIndex(count / 2);
          }}
        >
          scroll to the middle
        </Button>
        <Button
          onClick={() => {
            virtualizer.scrollToIndex(count - 1);
          }}
        >
          scroll to the end
        </Button>
        <Button
          onClick={() => {
            setEnabled((prev) => !prev);
          }}
        >
          turn {enabled ? 'off' : 'on'} virtualizer
        </Button>
      </div>
      <div ref={parentRef} className="w-140 h-100 overflow-y-auto border shadow-lg contain-strict">
        <div
          style={{
            height: virtualizer.getTotalSize(),
            width: '100%',
            position: 'relative',
          }}
        >
          <div
            className="absolute left-0 top-0 w-full"
            style={{
              transform: `translateY(${items[0]?.start ?? 0}px)`,
            }}
          >
            {items.map((virtualRow) => (
              <div
                key={virtualRow.key}
                data-index={virtualRow.index}
                ref={virtualizer.measureElement}
                className={virtualRow.index % 2 ? 'bg-amber-100' : ''}
              >
                <div className="truncate p-2 text-sm">
                  <div>Row {virtualRow.index}</div>
                  <div>{sentences[virtualRow.index]}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
