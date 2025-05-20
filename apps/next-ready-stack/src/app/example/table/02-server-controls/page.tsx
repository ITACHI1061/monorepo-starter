import { ScrollArea, ScrollBar } from '@monorepo-starter/ui/components/scroll-area';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@monorepo-starter/ui/components/table';
import { format } from 'date-fns';
import { cookies } from 'next/headers';
import Image from 'next/image';
import { SearchParams } from 'nuqs/server';
import { cachedGetUsers } from '~/db/users';
import TableFilters from './filters';
import TablePagination from './pagination';
import { searchParamsCache } from './searchParams';
import SortHeader from './sort-header';

export default async function TableServerControlsPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const cookieStore = await cookies();
  const currentUrl = cookieStore.get('next-pathname')?.value || '/';

  const { pageIndex, pageSize, orderBy, sortDirection, email, name, gender, birthFrom } =
    await searchParamsCache.parse(searchParams);

  const data = await cachedGetUsers({
    offset: (pageIndex - 1) * Number(pageSize),
    limit: Number(pageSize),
    orderBy,
    sortDirection,
    email: email || undefined,
    name: name || undefined,
    gender: gender || undefined,
    birthFrom: birthFrom || undefined,
  });

  return (
    <div className="flex flex-col">
      <h1>Table with Controls - Server Components Only</h1>
      <div className="not-prose flex-1 space-y-2">
        <div className="max-w-240">
          <TableFilters currentUrl={currentUrl} />
        </div>
        <ScrollArea className="max-w-240 h-150 rounded border">
          <Table>
            <TableHeader>
              <TableRow>
                <SortHeader name="id" currentUrl={currentUrl}>
                  ID
                </SortHeader>
                <SortHeader name="loginId" currentUrl={currentUrl}>
                  Login ID
                </SortHeader>
                <SortHeader name="name" currentUrl={currentUrl}>
                  Name
                </SortHeader>
                <SortHeader name="email" currentUrl={currentUrl}>
                  Email
                </SortHeader>
                <SortHeader name="gender" currentUrl={currentUrl}>
                  Gender
                </SortHeader>
                <SortHeader name="birth" currentUrl={currentUrl}>
                  Birth
                </SortHeader>
                <SortHeader name="contact" currentUrl={currentUrl}>
                  Contact
                </SortHeader>
                <SortHeader name="bio" currentUrl={currentUrl}>
                  Bio
                </SortHeader>
                <SortHeader name="status" currentUrl={currentUrl}>
                  Status
                </SortHeader>
                <SortHeader name="createdAt" currentUrl={currentUrl}>
                  Created At
                </SortHeader>
                <SortHeader name="updatedAt" currentUrl={currentUrl}>
                  Updated At
                </SortHeader>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.rows.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5">
                      <Image
                        src={item.profile?.avatar || ''}
                        alt={item.name}
                        width={256}
                        height={256}
                        className="size-8 rounded-full"
                      />
                      <span className="truncate">{item.loginId}</span>
                    </div>
                  </TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell className="text-center">{item.gender}</TableCell>
                  <TableCell className="text-center">{item.birth}</TableCell>
                  <TableCell className="text-center">{item.contact}</TableCell>
                  <TableCell>{item.bio}</TableCell>
                  <TableCell className="text-center">{item.status}</TableCell>
                  <TableCell className="text-center">{format(item.createdAt * 1000, 'yyyy-MM-dd HH:mm:ss')}</TableCell>
                  <TableCell className="text-center">{format(item.updatedAt * 1000, 'yyyy-MM-dd HH:mm:ss')}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
        <TablePagination currentUrl={currentUrl} totalCount={data.totalCount} />
      </div>
    </div>
  );
}
