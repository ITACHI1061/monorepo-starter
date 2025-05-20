import { Button } from '@monorepo-starter/ui/components/button';
import { Input } from '@monorepo-starter/ui/components/input';
import { cn } from '@monorepo-starter/ui/lib/utils';
import { format } from 'date-fns';
import { PencilIcon, ToggleLeft, ToggleRight, TrashIcon } from 'lucide-react';
import Image from 'next/image';
import { Fragment } from 'react';
import { getUsers } from '~/db/users';
import { createRandomUsersAction, deleteUserAction, toggleUserStatusAction, updateUserAction } from './dbCrudActions';

export default async function DbPage() {
  const users = await getUsers({ limit: 500 });

  return (
    <div>
      <h1>Simple CRUD Example</h1>
      <p>
        <code>Server Component</code> + <code>Server Action</code> Only.
      </p>

      <form action={createRandomUsersAction} className="shadow-xs relative flex max-w-xs items-center rounded-md">
        <Input
          type="number"
          name="count"
          className="-me-px flex-1 rounded-e-none pr-8 shadow-none focus-visible:z-10"
          defaultValue={1}
          max={100}
        />
        <span className="relative -left-5 w-px text-gray-500">명</span>
        <Button type="submit" className="rounded-l-none" variant="outline">
          랜덤 유저 생성
        </Button>
      </form>

      <div>Total: {new Intl.NumberFormat().format(users.totalCount)}</div>
      <div className="not-prose flex flex-1 flex-wrap overflow-auto font-mono text-xs">
        {users.rows.map((user) => (
          <div key={user.id} className="w-1/3 p-1">
            <div className="flex w-full flex-col gap-2 rounded-md border p-2 shadow-sm">
              <div className="flex gap-1">
                <form action={updateUserAction.bind(null, user.id)}>
                  <input type="hidden" name="id" value={user.id} />
                  <Button variant="outline" size="sm">
                    <PencilIcon className="size-3" /> <span className="text-xs">Random Update</span>
                  </Button>
                </form>
                <form action={deleteUserAction.bind(null, user.id)}>
                  <Button variant="outline" size="sm">
                    <TrashIcon className="size-3" /> <span className="text-xs">Delete</span>
                  </Button>
                </form>
                <form action={toggleUserStatusAction.bind(null, user.id)}>
                  <Button variant={'ghost'} size="sm">
                    {user.status === 'active' ? <ToggleLeft /> : <ToggleRight className="text-red-600" />}
                  </Button>
                </form>
              </div>
              <div className="flex items-center gap-2">
                {user.profile?.avatar && (
                  <Image
                    src={user.profile.avatar}
                    alt="avatar"
                    width={256}
                    height={256}
                    className="size-9 rounded-full"
                  />
                )}
                <div>{user.id}</div>
                <div className="ml-auto flex flex-col">
                  <span className={cn('text-gray-500')}>
                    created: {format(user.createdAt * 1000, 'yyyy-MM-dd HH:mm:ss')}
                  </span>
                  <span className={cn('text-gray-500', user.updatedAt > user.createdAt && 'text-red-700')}>
                    updated: {format(user.updatedAt * 1000, 'yyyy-MM-dd HH:mm:ss')}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-[4rem_1fr] gap-x-2 gap-y-1">
                {Object.entries(user).map(([key, value]) => {
                  if (key === 'createdAt' || key === 'updatedAt' || key === 'id' || key === 'profile') {
                    return null;
                  }

                  if (key === 'status') {
                    return (
                      <Fragment key={key}>
                        <span className="text-gray-500">{key}:</span>
                        <span className={cn('text-blue-700', value !== 'active' && 'text-red-500')}>
                          {value as string}
                        </span>
                      </Fragment>
                    );
                  }

                  return (
                    <Fragment key={key}>
                      <span className="text-gray-500">{key}:</span>
                      <span className="text-blue-700">{value as string}</span>
                    </Fragment>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
