'use client';

import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef } from 'react';

export default function FixedMasonryVertical({ rows }: { rows: number[] }) {
  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: (i) => rows[i] || 20,
    overscan: 5,
    lanes: 4,
  });

  return (
    <div className="not-prose size-full">
      <div ref={parentRef} className="h-120 w-120 overflow-auto border shadow-lg">
        <div
          className="relative w-full"
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => (
            <div
              key={virtualRow.index}
              className={'absolute top-0 flex items-center justify-center border'}
              style={{
                left: `${virtualRow.lane * 25}%`,
                width: '25%',
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              Row {virtualRow.index}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
