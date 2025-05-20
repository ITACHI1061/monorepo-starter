import { Avatar, AvatarFallback, AvatarImage } from '@monorepo-starter/ui/components/avatar';
import { Badge } from '@monorepo-starter/ui/components/badge';
import { Button } from '@monorepo-starter/ui/components/button';
import { Checkbox } from '@monorepo-starter/ui/components/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@monorepo-starter/ui/components/dropdown-menu';
import { RowData, type ColumnDef, type Row } from '@tanstack/react-table';
import { format, isAfter } from 'date-fns';
import { ArrowDownToLine, ArrowUpToLine, PinIcon, PinOffIcon } from 'lucide-react';
import { type User } from '~/db/users';

declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    useDropdown?: boolean;
    useSortableColumn?: boolean;
  }
}

export type Data = User;

export const columns = [
  {
    id: 'pin',
    size: 60,
    enableResizing: false, // Column Resizing options
    enableHiding: false, // Column Visibility options
    header: ({ table }) => {
      const isSomePinned = table.getRowModel().rows.some((row) => row.getIsPinned());
      return (
        <div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => table.setRowPinning({ top: [], bottom: [] })}
            disabled={!isSomePinned}
            title="전체 고정 해제"
          >
            <PinOffIcon className="opacity-60" size={16} aria-hidden="true" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div>
          {row.getIsPinned() ? (
            <Button variant="ghost" size="icon" onClick={() => row.pin(false)}>
              <PinOffIcon className="cursor-pointer" size={16} aria-hidden="true" />
            </Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <PinIcon className="opacity-60" size={16} aria-hidden="true" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => row.pin('top')}>
                  <ArrowUpToLine className="cursor-pointer" size={16} />
                  상단에 고정
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => row.pin('bottom')}>
                  <ArrowDownToLine className="cursor-pointer" size={16} />
                  하단에 고정
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      );
    },
    meta: {
      useDropdown: false,
      useSortableColumn: false,
    },
  },
  {
    id: 'select',
    enableResizing: false, // Column Resizing options
    enableHiding: false, // Column Visibility options
    size: 60,
    header: ({ table }) => (
      <div className="flex size-full items-center justify-center">
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex size-full items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    meta: {
      useDropdown: false,
      useSortableColumn: false,
    },
  },
  {
    id: 'id',
    accessorKey: 'id',
    filterFn: 'inNumberRange', // filter options
    enableHiding: false, // Column Visibility options
    size: 80, // Column resizing options
    header: 'ID',
    footer: 'ID',
  },
  {
    id: 'loginId',
    accessorKey: 'loginId',
    enableSorting: false, // Sorting options
    filterFn: 'includesString', // filter options
    enableHiding: false, // Column Visibility options
    header: '로그인 ID',
    footer: '로그인 ID',
    cell: (info) => (
      <div className="flex items-center gap-1 truncate">
        <Avatar className="">
          <AvatarImage src={info.row.original.profile?.avatar || ''} />
          <AvatarFallback>{info.row.original.name.slice(0, 1)}</AvatarFallback>
        </Avatar>
        <span className="truncate text-xs">{info.getValue<string>()}</span>
      </div>
    ),
  },
  {
    id: 'name',
    accessorKey: 'name',
    filterFn: 'includesString', // filter options
    header: '이름',
    footer: '이름',
  },
  {
    id: 'email',
    accessorKey: 'email',
    filterFn: 'includesString', // filter options
    header: '이메일',
    footer: '이메일',
  },
  {
    id: 'gender',
    accessorKey: 'gender',
    enableSorting: false, // Sorting options
    filterFn: 'equalsString', // filter options
    header: '성별',
    footer: '성별',
  },
  {
    id: 'birth',
    accessorKey: 'birth',
    filterFn: dateAfterFilterFn, // filter options
    header: '생년월일',
    footer: '생년월일',
  },
  {
    id: 'contact',
    accessorKey: 'contact',
    filterFn: 'includesString', // filter options
    header: '연락처',
    footer: '연락처',
  },
  {
    id: 'status',
    accessorKey: 'status',
    enableSorting: false, // Sorting options
    header: '상태',
    footer: '상태',
    cell: (info) => {
      const value = info.getValue<User['status']>();
      return (
        <div className="text-center">
          <Badge variant={value === 'active' ? 'default' : 'secondary'}>{value}</Badge>
        </div>
      );
    },
  },
  {
    id: 'createdAt',
    accessorKey: 'createdAt',
    filterFn: inTimestampRangeFilterFn, // filter options
    header: '생성일시',
    footer: '생성일시',
    cell: (info) => <div className="truncate">{format(info.getValue<number>() * 1000, 'yyyy-MM-dd HH:mm:ss')}</div>,
  },
  {
    id: 'updatedAt',
    accessorKey: 'updatedAt',
    filterFn: inTimestampRangeFilterFn, // filter options
    header: '수정일시',
    footer: '수정일시',
    cell: (info) => <div className="truncate">{format(info.getValue<number>() * 1000, 'yyyy-MM-dd HH:mm:ss')}</div>,
  },
] as const satisfies ColumnDef<User>[];

/**
 * Timestamp 조회 필터
 */
function inTimestampRangeFilterFn(row: Row<User>, columnId: string, value: { from: number; to: number }) {
  let rowValue = row.getValue(columnId) as number;
  const { from, to } = value;

  if (!rowValue) {
    return false;
  }

  rowValue = rowValue * 1000; // backend 데이터는 초 단위로 저장되어 있음 - 밀리초로 변환

  if (!from && !to) {
    return true;
  } else if (!from) {
    return rowValue <= to;
  } else if (!to) {
    return rowValue >= from;
  } else {
    return rowValue >= from && rowValue <= to;
  }
}

/**
 * 날짜 After 조회 필터
 */
function dateAfterFilterFn(row: Row<User>, columnId: string, value: string) {
  const rowValue = row.getValue(columnId) as string;
  if (!rowValue || !value) {
    return false;
  }

  return isAfter(new Date(rowValue), new Date(value));
}
