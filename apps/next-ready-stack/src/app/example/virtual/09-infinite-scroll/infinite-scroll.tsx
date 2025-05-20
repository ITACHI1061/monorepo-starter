'use client';

import { cn } from '@monorepo-starter/ui/lib/utils';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useEffect, useRef } from 'react';

async function fetchServerPage(
  limit: number,
  offset: number = 0,
): Promise<{ rows: Array<string>; nextOffset: number }> {
  const rows = new Array(limit).fill(0).map((_, i) => `Async loaded row #${i + offset * limit}`);
  await new Promise((r) => setTimeout(r, 1000));
  return { rows, nextOffset: offset + 1 };
}

export default function InfiniteScroll() {
  const { status, data, error, isFetching, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['fetches'],
    queryFn: (ctx) => fetchServerPage(10, ctx.pageParam),
    getNextPageParam: (lastGroup) => lastGroup.nextOffset,
    initialPageParam: 0,
  });

  const allRows = data ? data.pages.flatMap((d) => d.rows) : [];

  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: hasNextPage ? allRows.length + 1 : allRows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 100,
    overscan: 5,
  });

  useEffect(() => {
    const [lastItem] = [...rowVirtualizer.getVirtualItems()].reverse();

    if (!lastItem) {
      return;
    }

    if (lastItem.index >= allRows.length - 1 && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, fetchNextPage, allRows.length, isFetchingNextPage, rowVirtualizer.getVirtualItems()]);

  return (
    <div className="not-prose">
      <div className="border shadow-lg">
        {status === 'pending' ? (
          <p>로딩중...</p>
        ) : status === 'error' ? (
          <span>오류: {error.message}</span>
        ) : (
          <div ref={parentRef} className="h-120 w-full overflow-auto">
            <div
              style={{
                height: `${rowVirtualizer.getTotalSize()}px`,
                width: '100%',
                position: 'relative',
              }}
            >
              {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                const isLoaderRow = virtualRow.index > allRows.length - 1;
                const post = allRows[virtualRow.index];

                return (
                  <div
                    key={virtualRow.index}
                    className={cn('absolute left-0 top-0 w-full', virtualRow.index % 2 && 'bg-blue-100')}
                    style={{
                      height: `${virtualRow.size}px`,
                      transform: `translateY(${virtualRow.start}px)`,
                    }}
                  >
                    {isLoaderRow ? (hasNextPage ? '더 불러오는 중...' : '더 이상 불러올 데이터가 없습니다.') : post}
                  </div>
                );
              })}
            </div>
          </div>
        )}
        <div>{isFetching && !isFetchingNextPage ? '백그라운드 업데이트 중...' : null}</div>
      </div>
    </div>
  );
}
