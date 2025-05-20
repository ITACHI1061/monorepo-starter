import { cn } from '@monorepo-starter/ui/lib/utils';
import { type Column } from '@tanstack/react-table';
import { type CSSProperties } from 'react';

export function getCellStyle<TData, TValue>(column: Column<TData, TValue>) {
  const isPinned = column.getIsPinned();
  const isLastLeftPinnedColumn = isPinned === 'left' && column.getIsLastColumn('left');
  const isFirstRightPinnedColumn = isPinned === 'right' && column.getIsFirstColumn('right');

  const className = cn(
    'relative flex items-center justify-between h-full',
    isPinned && `sticky bg-zinc-100 dark:bg-zinc-900 z-10`, // pinned column
    isLastLeftPinnedColumn &&
      `after:absolute after:-right-1 after:h-full after:bg-linear-to-r after:from-zinc-500 dark:after:from-zinc-900 after:to-transparent after:w-1.5 after:opacity-20`,
    isFirstRightPinnedColumn && `border-l border-amber-200`,
  );

  const style: CSSProperties = {
    width: `${column.getSize()}px`,
    left: isPinned === 'left' ? `${column.getStart('left')}px` : undefined,
    right: isPinned === 'right' ? `${column.getAfter('right')}px` : undefined,
  };

  return { className, style };
}
