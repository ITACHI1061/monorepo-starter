import { Button } from '@monorepo-starter/ui/components/button';
import { format, formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale/ko';
import { revalidatePath } from 'next/cache';

export default async function DataCacheTimeBasedPage() {
  const response = await fetch(`https://jsonplaceholder.typicode.com/todos/11`, { next: { revalidate: 10 } });
  const responseTime = new Date(response.headers.get('Date')!);
  const fromNow = formatDistanceToNow(responseTime, { addSuffix: true, includeSeconds: true, locale: ko });
  const formattedResponseTime = format(responseTime, 'HH:mm:ss');

  async function handleRevalidatePath() {
    'use server';
    revalidatePath('/example/cache/02-data-cache-time-based');
  }

  return (
    <div>
      <h1>캐싱: Data Cache - Revalidate Time</h1>
      <div>
        Response Time: <code className="text-sky-700">{formattedResponseTime}</code> <br />
        From Now: <code className="text-sky-700">{fromNow}</code>
      </div>
      <div>
        <form action={handleRevalidatePath}>
          <Button type="submit" variant={'outline'}>
            revalidatePath
          </Button>
        </form>
      </div>
    </div>
  );
}
