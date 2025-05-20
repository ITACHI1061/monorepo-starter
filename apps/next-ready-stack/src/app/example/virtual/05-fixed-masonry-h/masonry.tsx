'use client';

import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef } from 'react';

export default function FixedMasonryHorizontal({ columns }: { columns: number[] }) {
  const parentRef = useRef<HTMLDivElement>(null);

  const columnVirtualizer = useVirtualizer({
    horizontal: true,
    count: columns.length,
    getScrollElement: () => parentRef.current,
    estimateSize: (i) => columns[i] || 10,
    overscan: 5,
    lanes: 4,
  });

  return (
    <div className="size-full">
      <div ref={parentRef} className="h-120 w-120 overflow-auto border shadow-lg">
        <div
          className="relative h-full"
          style={{
            width: `${columnVirtualizer.getTotalSize()}px`,
          }}
        >
          {columnVirtualizer.getVirtualItems().map((virtualColumn) => (
            <div
              key={virtualColumn.index}
              className="absolute left-0 flex h-full items-center justify-center border"
              style={{
                top: `${virtualColumn.lane * 25}%`,
                height: '25%',
                width: `${virtualColumn.size}px`,
                transform: `translateX(${virtualColumn.start}px)`,
              }}
            >
              Column {virtualColumn.index}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
