'use client';

import { TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@monorepo-starter/ui/components/table';
import { cn } from '@monorepo-starter/ui/lib/utils';
import {
  closestCenter,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnFiltersState,
  type ColumnOrderState,
  type ColumnPinningState,
  type ColumnSizingState,
  type Header,
  type PaginationState,
  type Row,
  type RowPinningState,
  type RowSelectionState,
  type SortingState,
  type TableOptions,
  type VisibilityState,
} from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useEffect, useRef, useState, type ComponentProps } from 'react';
import TableFilters from './column-filters';
import { columns, type Data } from './columns';
import TablePagination from './pagination';
import { getCellStyle } from './styles';
import TableHeaderCell from './table-header-cell';

export default function TableClientBasic({ data: initialData }: { data: Data[] }) {
  // for Row Virtualization
  const tableContainerRef = useRef<HTMLDivElement>(null);

  // Pagination State
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 200 });
  // Sorting State
  const [sorting, setSorting] = useState<SortingState>([]);
  // Column Filters State
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  // Row Selection State
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  // Column Sizing State
  const [columnSizing, setColumnSizing] = useState<ColumnSizingState>({});
  // Column Visibility State
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  // Column Pinning State
  const [columnPinning, setColumnPinning] = useState<ColumnPinningState>({ left: [], right: [] });
  // Row Pinning State
  const [rowPinning, setRowPinning] = useState<RowPinningState>({ top: [], bottom: [] });
  // Column Order State
  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>(columns.map((column) => column.id as string));
  // Active Drag Sorting ID
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeHeader, setActiveHeader] = useState<Header<Data, any> | null>(null);

  // Data
  const [data, setData] = useState<Data[]>([]);

  // Default Table Options
  const tableOptions: TableOptions<Data> = {
    data,
    columns,

    enableSorting: true,
    enableColumnFilters: true,
    enableColumnResizing: true,
    enableHiding: true,
    enableColumnPinning: true,
    enableRowPinning: true,

    state: {
      pagination,
      sorting,
      columnFilters,
      rowSelection,
      columnSizing,
      columnVisibility,
      columnPinning,
      rowPinning,
      columnOrder,
    },

    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
    onColumnSizingChange: setColumnSizing,
    onColumnVisibilityChange: setColumnVisibility,
    onColumnPinningChange: setColumnPinning,
    onColumnOrderChange: setColumnOrder,
    onRowPinningChange: setRowPinning,

    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),

    keepPinnedRows: true,

    defaultColumn: {
      meta: {
        useDropdown: true,
        useSortableColumn: true,
      },
    },
  };

  // Table Instance
  const table = useReactTable(tableOptions);

  // Rows
  const rows = table.getRowModel().rows.filter((row) => !row.getIsPinned());

  // Row Virtualization
  const rowVirtualizer = useVirtualizer<HTMLDivElement, HTMLTableRowElement>({
    count: rows.length,
    estimateSize: () => 48, //estimate row height for accurate scrollbar dragging
    getScrollElement: () => tableContainerRef.current,
    // measure dynamic row height, except in firefox because it measures table border height incorrectly
    measureElement:
      typeof window !== 'undefined' && navigator.userAgent.indexOf('Firefox') === -1
        ? (element) => element?.getBoundingClientRect().height
        : undefined,
    overscan: 10,
  });

  // reorder columns after drag & drop
  const handleDragStart: ComponentProps<typeof DndContext>['onDragStart'] = ({ active }) => {
    setActiveId(active.id as string);
  };

  const handleDragEnd: ComponentProps<typeof DndContext>['onDragEnd'] = ({ active, over }) => {
    if (active && over && active.id !== over.id) {
      setColumnOrder((columnOrder) => {
        const oldIndex = columnOrder.indexOf(active.id as string);
        const newIndex = columnOrder.indexOf(over.id as string);
        return arrayMove(columnOrder, oldIndex, newIndex); //this is just a splice util
        // return arraySwap(columnOrder, oldIndex, newIndex); //this is just a splice util
      });
    }

    setActiveId(null);
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 50,
        tolerance: 0,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  // Data
  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  // Active Header
  useEffect(() => {
    if (!activeId) {
      setActiveHeader(null);
      return;
    }

    const header = table
      .getHeaderGroups()
      .flatMap((headerGroup) => headerGroup.headers)
      .find((header) => header.id === activeId);
    if (header) {
      setActiveHeader(header);
    }
  }, [activeId]);

  return (
    <div className="not-prose">
      <div className="mb-4 flex items-center gap-2">
        <TableFilters table={table} />
      </div>

      <DndContext
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        sensors={sensors}
      >
        <div ref={tableContainerRef} className="relative h-[70dvh] w-full overflow-x-auto">
          <table style={{ width: `${table.getCenterTotalSize()}px` }} className="grid caption-bottom text-sm">
            <TableHeader className={cn(`bg-background/80 sticky top-0 z-10 grid backdrop-blur-md`)}>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="flex w-full">
                  <SortableContext items={columnOrder} strategy={horizontalListSortingStrategy}>
                    {headerGroup.headers.map((header) => (
                      <TableHeaderCell key={header.id} header={header} table={table} />
                    ))}
                  </SortableContext>
                </TableRow>
              ))}
              {table.getTopRows().map((row) => (
                <TableRow key={row.id} className="flex bg-zinc-100 shadow dark:bg-zinc-900">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} {...getCellStyle(cell.column)}>
                      <div className="truncate">{flexRender(cell.column.columnDef.cell, cell.getContext())}</div>
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody className="relative grid" style={{ height: `${rowVirtualizer.getTotalSize()}px` }}>
              {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                const row = rows[virtualRow.index] as Row<Data>;
                return (
                  <TableRow
                    key={row.id}
                    data-index={virtualRow.index}
                    ref={(node) => rowVirtualizer.measureElement(node)}
                    className="absolute left-0 top-0 flex w-full items-center justify-center"
                    style={{
                      height: `${virtualRow.size}px`,
                      transform: `translateY(${virtualRow.start}px)`,
                    }}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} {...getCellStyle(cell.column)}>
                        <div className="truncate">{flexRender(cell.column.columnDef.cell, cell.getContext())}</div>
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })}
            </TableBody>
            <TableFooter
              className={cn(
                'bg-background/90 grid backdrop-blur-lg',
                table.getBottomRows().length > 0 && 'sticky bottom-0 z-10',
              )}
            >
              {table.getBottomRows().map((row) => (
                <TableRow key={row.id} className="flex bg-zinc-100 shadow dark:bg-zinc-900">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} {...getCellStyle(cell.column)}>
                      <div className="truncate">{flexRender(cell.column.columnDef.cell, cell.getContext())}</div>
                    </TableCell>
                  ))}
                </TableRow>
              ))}
              {table.getFooterGroups().map((footerGroup) => (
                <TableRow key={footerGroup.id} className="text-foreground/50 flex w-full">
                  {footerGroup.headers.map((header) => (
                    <TableHead key={header.id} colSpan={header.colSpan} {...getCellStyle(header.column)}>
                      {header.isPlaceholder ? null : (
                        <div className="truncate">
                          {flexRender(header.column.columnDef.footer, header.getContext())}
                        </div>
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableFooter>
          </table>
        </div>
        <DragOverlay>
          {activeId ? (
            <div className="bg-background flex items-center gap-2 border-x border-b p-2 shadow-xl transition-colors duration-300">
              {activeId && activeHeader && flexRender(activeHeader.column.columnDef.header, activeHeader.getContext())}
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
      <TablePagination table={table} />
    </div>
  );
}
