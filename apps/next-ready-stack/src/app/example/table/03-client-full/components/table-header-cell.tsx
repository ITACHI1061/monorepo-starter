import { Button } from '@monorepo-starter/ui/components/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@monorepo-starter/ui/components/dropdown-menu';
import { TableHead } from '@monorepo-starter/ui/components/table';
import { cn } from '@monorepo-starter/ui/lib/utils';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { flexRender, type Header, type Table } from '@tanstack/react-table';
import {
  ArrowDownWideNarrow,
  ArrowLeft,
  ArrowLeftToLineIcon,
  ArrowRight,
  ArrowRightToLineIcon,
  ArrowUpDownIcon,
  ArrowUpWideNarrow,
  ChevronDown,
  ChevronUp,
  ChevronsUpDown,
  EllipsisIcon,
  EyeIcon,
  EyeOffIcon,
  PinIcon,
  PinOffIcon,
  RefreshCw,
} from 'lucide-react';
import { getCellStyle } from './styles';

export default function TableHeaderCell<TData, TValue>({
  header,
  table,
}: {
  header: Header<TData, TValue>;
  table: Table<TData>;
}) {
  const { colSpan, column } = header;

  const isPinned = column.getIsPinned();
  const isAllColumnsVisible = table.getIsAllColumnsVisible();
  const isSomeColumnsPinned = table.getIsSomeColumnsPinned();

  const canHide = column.getCanHide();
  const canPin = column.getCanPin();
  const canSort = column.getCanSort();
  const canResize = column.getCanResize();
  const isSorted = column.getIsSorted();
  const isFirstColumn = column.getIndex() === 0;
  const isLastColumn = column.getIndex() === table.getAllColumns().length - 1;

  const { className, style } = getCellStyle(header.column);

  const updateColumnPosition = (from: number, to: number) => {
    table.setColumnOrder((state) => {
      const newColumnOrder = [...state];
      newColumnOrder.splice(from, 1);
      newColumnOrder.splice(to, 0, state[from]!);
      return newColumnOrder;
    });
  };

  const { attributes, isDragging, listeners, setNodeRef, transform, transition } = useSortable({
    id: header.column.id,
    disabled: !canSort,
  });

  const columnSizingInfo = table.getState().columnSizingInfo;

  if (header.isPlaceholder) {
    return <TableHead colSpan={colSpan}>{null}</TableHead>;
  }

  return (
    <TableHead
      colSpan={colSpan}
      style={{
        ...style,
        zIndex: isDragging || isPinned ? 10 : undefined,
        opacity: isDragging ? 0.5 : undefined,
        cursor: canSort ? 'grabbing' : undefined,
        transition,
        transform: CSS.Translate.toString(transform),
      }}
      className={cn(className)}
      ref={canSort ? setNodeRef : undefined}
    >
      <div {...(canSort ? { ...attributes, ...listeners } : {})}>
        {flexRender(header.column.columnDef.header, header.getContext())}
      </div>
      {canSort && (
        <div onClick={header.column.getToggleSortingHandler()} className="cursor-pointer">
          {header.column.getIsSorted() === 'asc' && <ChevronUp size={16} />}
          {header.column.getIsSorted() === 'desc' && <ChevronDown size={16} />}
          {!header.column.getIsSorted() && <ChevronsUpDown className="text-gray-400" size={16} />}
        </div>
      )}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="size-6 opacity-50 hover:opacity-80">
            <EllipsisIcon size={16} aria-hidden="true" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={() => updateColumnPosition(column.getIndex(), column.getIndex() - 1)}
            disabled={isFirstColumn}
          >
            <ArrowLeft size={18} />
            왼쪽으로 이동
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => updateColumnPosition(column.getIndex(), column.getIndex() + 1)}
            disabled={isLastColumn}
          >
            <ArrowRight size={18} />
            오른쪽으로 이동
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              table.resetColumnOrder();
            }}
          >
            <RefreshCw size={18} />
            원위치로
          </DropdownMenuItem>
          <DropdownMenuSeparator />

          {canSort && (
            <>
              <DropdownMenuItem
                onClick={(e) => {
                  e.preventDefault();
                  column.toggleSorting(false);
                }}
                disabled={isSorted === 'asc'}
              >
                <ArrowUpWideNarrow size={18} />
                오름차순 정렬
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={(e) => {
                  e.preventDefault();
                  column.toggleSorting(true);
                }}
                disabled={isSorted === 'desc'}
              >
                <ArrowDownWideNarrow size={18} />
                내림차순 정렬
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => column.clearSorting()} disabled={!isSorted}>
                <ArrowUpDownIcon size={18} />
                정렬 해제
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </>
          )}

          {canPin && (
            <>
              <DropdownMenuItem onClick={() => column.pin('left')} disabled={isPinned === 'left'}>
                <ArrowLeftToLineIcon size={16} />
                왼쪽에 고정
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => column.pin('right')} disabled={isPinned === 'right'}>
                <ArrowRightToLineIcon size={16} />
                오른쪽에 고정
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => column.pin(false)} disabled={!isPinned}>
                <PinOffIcon size={16} />
                고정 해제
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => table.setColumnPinning({ left: [], right: [] })}
                disabled={!isSomeColumnsPinned}
              >
                <PinIcon size={16} />
                전체 고정 해제
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </>
          )}

          {canHide && (
            <>
              <DropdownMenuItem onClick={() => column.toggleVisibility(false)} disabled={!canHide}>
                <EyeOffIcon size={16} />
                컬럼 숨김
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => table.toggleAllColumnsVisible()} disabled={isAllColumnsVisible}>
                <EyeIcon size={16} />
                전체 숨김 해제
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </>
          )}

          {canResize && (
            <DropdownMenuItem onClick={() => table.resetColumnSizing()}>
              <PinIcon size={16} />
              전체 컬럼 크기 초기화
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      {header.column.getCanResize() && (
        <div
          onDoubleClick={() => header.column.resetSize()}
          onMouseDown={header.getResizeHandler()}
          onTouchStart={header.getResizeHandler()}
          className={cn(
            'absolute -right-0.5 top-0 z-10 h-full w-1 cursor-col-resize touch-none select-none bg-gray-300',
            'group-hover:opacity-200 opacity-0 transition-opacity duration-100',
            header.column.getIsResizing() && 'h-[70vh] bg-blue-400 opacity-100',
          )}
          style={{
            transform: header.column.getIsResizing() ? `translateX(${1 * (columnSizingInfo?.deltaOffset ?? 0)}px)` : '',
          }}
        />
      )}
    </TableHead>
  );
}
