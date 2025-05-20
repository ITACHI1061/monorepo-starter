'use client';

import { Button } from '@monorepo-starter/ui/components/button';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef, useState } from 'react';
import { type Row } from './page';

export default function FixedRowPage({ rows }: { rows: Row[] }) {
  const parentRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(true);
  const count = rows.length;

  const rowVirtualizer = useVirtualizer({
    count,
    getScrollElement: () => parentRef.current,
    estimateSize: (i) => rows[i]?.height || 10, // 각 요소별 높이
    overscan: 5,
    enabled,
  });

  return (
    <div className="not-prose size-full">
      <div className="mb-4 flex gap-2">
        <Button
          onClick={() => {
            rowVirtualizer.scrollToIndex(0);
          }}
        >
          scroll to the top
        </Button>
        <Button
          onClick={() => {
            rowVirtualizer.scrollToIndex(rows.length / 2);
          }}
        >
          scroll to the middle
        </Button>
        <Button
          onClick={() => {
            rowVirtualizer.scrollToIndex(rows.length - 1);
          }}
        >
          scroll to the end
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
      <div ref={parentRef} className="h-150 w-120 overflow-auto border shadow-lg">
        <div
          className="w-full"
          style={{
            position: 'relative',
            height: `${rowVirtualizer.getTotalSize()}px`,
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const hsla = rows[virtualRow.index]?.color.replace(')', ' / 0.3)');
            return (
              <div
                key={virtualRow.index}
                className={'absolute left-0 top-0 flex w-full items-center gap-3 border-b px-2'}
                style={{
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              >
                <span style={{ backgroundColor: hsla }} className="size-3 rounded-full"></span>
                <span className="text-foreground/80">{rows[virtualRow.index]?.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
