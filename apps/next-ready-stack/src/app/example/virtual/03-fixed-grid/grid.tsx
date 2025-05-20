'use client';

import { cn } from '@monorepo-starter/ui/lib/utils';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef } from 'react';

type Column = {
  id: string;
  width: number;
};

type Data = {
  id: string;
  text: string;
  height: number;
};

export default function FixedGridPage({ rows, columns }: { rows: Data[]; columns: Column[] }) {
  const parentRef = useRef<HTMLDivElement>(null);
  const rowCount = Math.floor(rows.length / columns.length);

  const rowVirtualizer = useVirtualizer({
    count: rowCount,
    getScrollElement: () => parentRef.current,
    estimateSize: (index) => rows[index]?.height || 10,
    overscan: 5,
  });

  const columnVirtualizer = useVirtualizer({
    horizontal: true,
    count: columns.length,
    getScrollElement: () => parentRef.current,
    estimateSize: (index) => columns[index]?.width || 10,
    overscan: 5,
  });

  return (
    <div className="not-prose size-full">
      <div ref={parentRef} className="h-150 w-200 overflow-auto border shadow-lg">
        <div
          className={cn('relative')}
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: `${columnVirtualizer.getTotalSize()}px`,
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => (
            <div key={virtualRow.key}>
              {columnVirtualizer.getVirtualItems().map((virtualColumn) => {
                const index = virtualRow.index * columns.length + virtualColumn.index;
                if (index >= rows.length) return null;

                return (
                  <div
                    key={virtualColumn.key}
                    className="absolute left-0 top-0 border-b border-r p-4 text-sm"
                    style={{
                      width: `${virtualColumn.size}px`,
                      height: `${virtualRow.size}px`,
                      transform: `translateX(${virtualColumn.start}px) translateY(${virtualRow.start}px)`,
                    }}
                  >
                    {rows[index]?.text}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
