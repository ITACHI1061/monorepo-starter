'use client';

import { Button } from '@monorepo-starter/ui/components/button';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useLayoutEffect, useRef } from 'react';

interface Column {
  key: string;
  name: string;
  width: number;
}

export default function VirtualDynamicGrid({ columns, data }: { data: Array<Array<string>>; columns: Array<Column> }) {
  const parentRef = useRef<HTMLDivElement | null>(null);
  const parentOffsetRef = useRef(0);

  useLayoutEffect(() => {
    parentOffsetRef.current = parentRef.current?.offsetTop ?? 0;
  }, []);

  const getColumnWidth = (index: number) => columns[index]?.width || 10;

  const virtualizer = useVirtualizer({
    count: data.length,
    estimateSize: () => 80,
    overscan: 5,
    getScrollElement: () => parentRef.current,
    scrollMargin: parentOffsetRef.current,
  });

  const columnVirtualizer = useVirtualizer({
    horizontal: true,
    count: columns.length,
    getScrollElement: () => parentRef.current,
    estimateSize: getColumnWidth,
    overscan: 5,
  });

  const columnItems = columnVirtualizer.getVirtualItems();
  const [before, after] =
    columnItems.length > 0
      ? [columnItems[0]!.start, columnVirtualizer.getTotalSize() - columnItems[columnItems.length - 1]!.end]
      : [0, 0];

  return (
    <div className="flex size-full flex-col">
      <div className="flex gap-2">
        <Button onClick={() => virtualizer.scrollToIndex(0)}>Scroll to top</Button>
        <Button onClick={() => virtualizer.scrollToIndex(data.length - 1)}>Scroll to bottom</Button>
      </div>
      <div ref={parentRef} className="flex-1 overflow-y-auto border border-amber-400">
        <div className="relative" style={{ height: `${virtualizer.getTotalSize()}px` }}>
          {virtualizer.getVirtualItems().map((row) => {
            return (
              <div
                key={row.key}
                data-index={row.index}
                ref={virtualizer.measureElement}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  transform: `translateY(${row.start - virtualizer.options.scrollMargin}px)`,
                  display: 'flex',
                }}
              >
                <div style={{ width: `${before}px` }} />
                {columnItems.map((column) => {
                  return (
                    <div
                      key={column.key}
                      className="overflow-hidden border p-2"
                      style={{
                        height: row.index === 0 ? 40 : row.size,
                        width: getColumnWidth(column.index),
                      }}
                    >
                      {row.index === 0 ? (
                        <div>{columns[column.index]?.name}</div>
                      ) : (
                        <div>{data[row.index]?.[column.index]}</div>
                      )}
                    </div>
                  );
                })}
                <div style={{ width: `${after}px` }} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
