import { cookies } from 'next/headers';
import Link from 'next/link';
import type { SearchParams } from 'nuqs/server';
import { loadSearchParams, serialize } from './searchParams';

type Props = {
  searchParams: Promise<SearchParams>;
};

export default async function ExampleNuqsServerPage({ searchParams }: Props) {
  const { bool, int, literal, str, float } = await loadSearchParams(searchParams);
  const cookieStore = await cookies();
  const currentUrl = cookieStore.get('next-pathname')?.value || '/';

  return (
    <div>
      <h1>Nuqs Server</h1>
      <pre>
        <code>{JSON.stringify({ bool, int, literal, str, float }, null, 2)}</code>
      </pre>

      <div className="flex gap-1">
        <Link href={serialize(currentUrl, { bool: true, int: 100, literal: 'banana', str: 'hello', float: 1.1 })}>
          Link
        </Link>
        <Link href={serialize(currentUrl, { bool: false, int: 10 })}>Link2</Link>
      </div>
    </div>
  );
}
