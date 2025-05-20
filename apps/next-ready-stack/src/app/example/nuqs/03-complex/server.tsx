import { Button } from '@monorepo-starter/ui/components/button';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { cache, serialize } from './searchParams';

export async function Server() {
  const cookieStore = await cookies();
  const currentUrl = cookieStore.get('next-pathname')?.value || '/';
  const { str, int, bool, literal, float } = cache.all();

  return (
    <>
      <pre>
        <code>{JSON.stringify({ str, int, bool, literal, float }, null, 2)}</code>
      </pre>
      <div>
        <div className="flex gap-2">
          <Button asChild variant="outline">
            <Link
              href={serialize(currentUrl, {
                str: 'test',
                int: 10,
                bool: true,
                literal: 'banana',
                float: 10.1,
              })}
            >
              Update Parameters
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href={serialize(currentUrl, { float: 999 })}>{serialize(currentUrl, { float: 999 })}</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href={currentUrl}>{currentUrl}</Link>
          </Button>
        </div>
      </div>
    </>
  );
}
