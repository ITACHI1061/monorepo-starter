'use client';

import { Button } from '@monorepo-starter/ui/components/button';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef, useState } from 'react';

export default function FixedColumnPage({ columns }: { columns: number[] }) {
  const parentRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(true);
  const count = columns.length;

  const columnVirtualizer = useVirtualizer({
    horizontal: true,
    count,
    getScrollElement: () => parentRef.current,
    estimateSize: (i) => columns[i] || 10,
    overscan: 5,
    enabled,
  });

  return (
    <div className="size-full">
      <div className="mb-4 flex gap-2">
        <Button
          onClick={() => {
            columnVirtualizer.scrollToIndex(0, { align: 'center', behavior: 'smooth' });
          }}
        >
          scroll to the left
        </Button>
        <Button
          onClick={() => {
            columnVirtualizer.scrollToIndex(columns.length / 2, { align: 'center', behavior: 'smooth' });
          }}
        >
          scroll to the middle
        </Button>
        <Button
          onClick={() => {
            columnVirtualizer.scrollToIndex(columns.length - 1, { align: 'center', behavior: 'smooth' });
          }}
        >
          scroll to the right
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            setEnabled((prev) => !prev);
          }}
        >
          turn {enabled ? 'off' : 'on'} virtualizer
        </Button>
      </div>
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
              className="absolute left-0 top-0 flex h-full items-center justify-center border-r"
              style={{
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
