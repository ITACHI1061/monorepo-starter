import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from '@monorepo-starter/ui/components/pagination';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@monorepo-starter/ui/components/select';
import { calculatePaginationRange } from '@monorepo-starter/ui/hooks/pagination';
import { format } from '@monorepo-starter/utils/number';
import { Table } from '@tanstack/react-table';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function TablePagination<TData>({ table }: { table: Table<TData> }) {
  const paginationRange = calculatePaginationRange({
    total: table.getPageCount(),
    siblings: 1,
    boundaries: 1,
    activePage: table.getState().pagination.pageIndex + 1,
  });

  return (
    <div className="flex items-center justify-between gap-3 max-sm:flex-col">
      <p className="text-muted-foreground flex-1 space-x-1 whitespace-nowrap text-sm" aria-live="polite">
        <span>Page</span>
        <span className="text-foreground">{table.getState().pagination.pageIndex + 1}</span>
        <span>of</span>
        <span className="text-foreground">{format(table.getPageCount())}</span>
      </p>
      <div className="grow">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationLink
                href={'#'}
                aria-label="Go to first page"
                aria-disabled={!table.getCanPreviousPage() ? true : undefined}
                role={table.getCanPreviousPage() ? 'link' : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  table.previousPage();
                }}
              >
                <ChevronLeft size={16} strokeWidth={2} aria-hidden="true" />
              </PaginationLink>
            </PaginationItem>

            {paginationRange.map((page, index) => {
              if (page === 'dots') {
                return (
                  <PaginationItem key={'dots' + index}>
                    <PaginationEllipsis />
                  </PaginationItem>
                );
              }

              return (
                <PaginationItem key={'page' + index}>
                  <PaginationLink
                    href="#"
                    isActive={table.getState().pagination.pageIndex === page - 1}
                    onClick={(e) => {
                      e.preventDefault();
                      table.setPageIndex(page - 1);
                    }}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              );
            })}

            <PaginationItem>
              <PaginationLink
                href={'#'}
                aria-label="Go to next page"
                aria-disabled={table.getCanNextPage() ? undefined : true}
                role={table.getCanNextPage() ? 'link' : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  table.nextPage();
                }}
              >
                <ChevronRight size={16} strokeWidth={2} aria-hidden="true" />
              </PaginationLink>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      <div className="flex flex-1 justify-end">
        <Select
          value={table.getState().pagination.pageSize.toString()}
          onValueChange={(value) => table.setPageSize(Number(value))}
        >
          <SelectTrigger id="page-size">
            <SelectValue placeholder="Select size" />
          </SelectTrigger>
          <SelectContent>
            {[10, 20, 30, 50, 100, 200].map((size) => (
              <SelectItem key={size} value={size.toString()}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
