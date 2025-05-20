import { TableHead } from '@monorepo-starter/ui/components/table';
import { ChevronDown, ChevronsUpDown, ChevronUp } from 'lucide-react';
import Link from 'next/link';
import { type OrderByKey, parsers, searchParamsCache, serialize } from './searchParams';

export default function SortHeader({
  name,
  currentUrl,
  children,
}: {
  name: OrderByKey;
  currentUrl: string;
  children: React.ReactNode;
}) {
  const { orderBy, sortDirection } = searchParamsCache.all();
  const pageIndex = parsers.pageIndex.defaultValue;
  const orderByDefault = parsers.orderBy.defaultValue;
  const sortDirectionDefault = parsers.sortDirection.defaultValue;

  return (
    <TableHead>
      <div className="flex items-center justify-between gap-2">
        {children}
        <div className="cursor-pointer">
          {orderBy === orderByDefault && sortDirection === sortDirectionDefault ? (
            <Link
              href={serialize(currentUrl, {
                orderBy: name,
                sortDirection: sortDirectionDefault === 'asc' ? 'desc' : 'asc',
                pageIndex,
              })}
            >
              <ChevronsUpDown className="text-gray-400" size={16} />
            </Link>
          ) : (
            <>
              {orderBy === name && sortDirection === 'asc' && (
                <Link href={serialize(currentUrl, { orderBy: name, sortDirection: 'desc', pageIndex })}>
                  <ChevronDown size={16} />
                </Link>
              )}
              {orderBy === name && sortDirection === 'desc' && (
                <Link href={serialize(currentUrl, { orderBy: undefined, sortDirection: undefined, pageIndex })}>
                  <ChevronUp size={16} />
                </Link>
              )}
              {orderBy !== name && (
                <Link href={serialize(currentUrl, { orderBy: name, sortDirection: 'asc', pageIndex })}>
                  <ChevronsUpDown className="text-gray-400" size={16} />
                </Link>
              )}
            </>
          )}
        </div>
      </div>
    </TableHead>
  );
}
