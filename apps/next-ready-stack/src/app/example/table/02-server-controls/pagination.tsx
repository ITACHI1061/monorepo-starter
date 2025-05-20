import { Button } from '@monorepo-starter/ui/components/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@monorepo-starter/ui/components/dropdown-menu';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from '@monorepo-starter/ui/components/pagination';
import { calculatePaginationRange } from '@monorepo-starter/ui/hooks/pagination';
import { floor } from '@monorepo-starter/utils/math';
import { format } from '@monorepo-starter/utils/number';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { pageSizes, searchParamsCache, serialize } from './searchParams';

export default function TablePagination({ currentUrl, totalCount }: { currentUrl: string; totalCount: number }) {
  const allParams = searchParamsCache.all();
  const total = floor(totalCount / Number(allParams.pageSize));
  const pageIndex = allParams.pageIndex;
  const paginationRange = calculatePaginationRange({
    total,
    siblings: 1,
    boundaries: 1,
    activePage: pageIndex + 1,
  });

  return (
    <div className="flex items-center justify-between gap-3 max-sm:flex-col">
      <p className="text-muted-foreground flex-1 space-x-1 whitespace-nowrap text-sm" aria-live="polite">
        <span>Page</span>
        <span className="text-foreground">{pageIndex}</span>
        <span>of</span>
        <span className="text-foreground">{format(total)}</span>
      </p>
      <div className="grow">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationLink asChild>
                <Link
                  href={serialize(currentUrl, { ...allParams, pageIndex: allParams.pageIndex - 1 })}
                  aria-label="Go to previous page"
                  aria-disabled={allParams.pageIndex === 1 ? true : undefined}
                  role={allParams.pageIndex === 1 ? undefined : 'link'}
                >
                  <ChevronLeft size={16} strokeWidth={2} aria-hidden="true" />
                </Link>
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
                  <PaginationLink asChild isActive={allParams.pageIndex === page}>
                    <Link href={serialize(currentUrl, { ...allParams, pageIndex: page })}>{page}</Link>
                  </PaginationLink>
                </PaginationItem>
              );
            })}

            <PaginationItem>
              <PaginationLink asChild>
                <Link
                  href={serialize(currentUrl, { ...allParams, pageIndex: allParams.pageIndex + 1 })}
                  aria-label="Go to next page"
                  aria-disabled={allParams.pageIndex === total ? true : undefined}
                  role={allParams.pageIndex === total ? undefined : 'link'}
                >
                  <ChevronRight size={16} strokeWidth={2} aria-hidden="true" />
                </Link>
              </PaginationLink>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      <div className="flex flex-1 justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              {allParams.pageSize}
              <ChevronDown className="-me-1 ms-2 opacity-60" size={16} strokeWidth={2} aria-hidden="true" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {pageSizes.map((size) => (
              <DropdownMenuItem asChild key={size}>
                <Link href={serialize(currentUrl, { ...allParams, pageIndex: 1, pageSize: size })}>{size}</Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
