import { ScrollArea, ScrollBar } from '@monorepo-starter/ui/components/scroll-area';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@monorepo-starter/ui/components/table';
import { format } from 'date-fns';
import Image from 'next/image';
import { cachedGetUsers } from '~/db/users';

export default async function TableServerBasicPage() {
  const data = await cachedGetUsers({ limit: 15 });

  return (
    <div>
      <h1>Table Basic - Server Components Only</h1>
      <div className="not-prose">
        <ScrollArea className="max-w-3xl rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Login ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="text-center">Gender</TableHead>
                <TableHead className="text-center">Birth</TableHead>
                <TableHead className="text-center">Contact</TableHead>
                <TableHead className="text-center">Bio</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-center">Created At</TableHead>
                <TableHead className="text-center">Updated At</TableHead>
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
      </div>
    </div>
  );
}
