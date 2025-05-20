'use client';

import { useIsMobile } from '@monorepo-starter/ui/hooks/use-mobile';
import { useVirtualizer } from '@tanstack/react-virtual';
import Link from 'next/link';
import { useRef } from 'react';
import { type Row } from './page';

export default function FixedRowPage({ rows }: { rows: Row[] }) {
  const parentRef = useRef<HTMLDivElement>(null);
  const count = rows.length;
  const isMobile = useIsMobile();

  const rowVirtualizer = useVirtualizer({
    count,
    getScrollElement: () => parentRef.current,
    estimateSize: (i) => rows[i]?.height || 10, // 각 요소별 높이
    overscan: 5,
    enabled: true,
  });

  return (
    <div className="not-prose size-full">
      <div ref={parentRef} className="h-120 w-full overflow-auto">
        <div
          className="w-full"
          style={{
            position: 'relative',
            height: `${rowVirtualizer.getTotalSize()}px`,
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const row = rows[virtualRow.index]!;
            const hsla = row.color.replace(')', ' / 0.3)');

            return (
              <div
                key={virtualRow.index}
                className={'absolute left-0 top-0 flex w-full items-center gap-3 border-b px-2'}
                style={{
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              >
                <div className="flex flex-1 items-center gap-2 whitespace-nowrap">
                  <span style={{ backgroundColor: hsla }} className="size-3 rounded-full"></span>
                  <span>
                    {row.id} {row.name}
                  </span>
                </div>
                <div className="ml-auto flex gap-2 truncate *:text-xs *:text-blue-800 *:underline">
                  <Link href={`/example/virtual/12-with-parallel-route/${rows[virtualRow.index]!.id}/modal`}>
                    Dialog
                  </Link>
                  {!isMobile && (
                    <Link href={`/example/virtual/12-with-parallel-route/${rows[virtualRow.index]!.id}/split`}>
                      Split Page
                    </Link>
                  )}
                  <Link href={`/example/virtual/12-with-parallel-route/${rows[virtualRow.index]!.id}/full`}>
                    Full Page
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
