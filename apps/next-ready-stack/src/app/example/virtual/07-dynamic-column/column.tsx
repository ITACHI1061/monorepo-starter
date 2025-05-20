'use client';

import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef } from 'react';

export default function VirtualDynamicColumn({ sentences }: { sentences: string[] }) {
  const parentRef = useRef<HTMLDivElement | null>(null);

  const virtualizer = useVirtualizer({
    horizontal: true,
    count: sentences.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 45,
    paddingStart: 20,
    paddingEnd: 20,
  });

  return (
    <div className="not-prose">
      <div ref={parentRef} className="h-60 w-full overflow-y-auto rounded-lg border shadow-lg">
        <div
          className="relative h-full"
          style={{
            width: virtualizer.getTotalSize(),
          }}
        >
          {virtualizer.getVirtualItems().map((virtualColumn) => (
            <div
              key={virtualColumn.key}
              data-index={virtualColumn.index}
              ref={virtualizer.measureElement}
              className={virtualColumn.index % 2 ? 'bg-rose-50' : ''}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                height: '100%',
                transform: `translateX(${virtualColumn.start}px)`,
              }}
            >
              <div style={{ width: `${sentences[virtualColumn.index]?.length || 0}px` }} className="p-2">
                <div className="text-lg">Column {virtualColumn.index}</div>
                <div className="text-sm">{sentences[virtualColumn.index]}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
