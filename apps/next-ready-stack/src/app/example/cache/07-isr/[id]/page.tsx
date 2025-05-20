import { Button } from '@monorepo-starter/ui/components/button';
import { format, formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale/ko';
import { revalidatePath } from 'next/cache';

// Next.js는 요청이 들어올 때 캐시를 무효화
// 최대 20초에 한 번씩만 실행
export const revalidate = 20;

// 빌드 시점에 `generateStaticParams`의 파라미터만 미리 렌더링
// 생성되지 않은 경로에 대한 요청이 들어오면,
// Next.js는 해당 페이지를 요청 시점에 서버에서 렌더링
export const dynamicParams = false; // false 로 설정하면 generateStaticParams()에서 제외된 경로에서 404를 반환

export async function generateStaticParams() {
  return Array.from({ length: 10 }, (_, i) => ({ id: (i + 1).toString() }));
}

export default async function ISRPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const currentPath = `/example/cache/07-isr`;

  const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, { next: { revalidate: 10 } });
  const responseTime = new Date(response.headers.get('Date')!);
  const fromNow = formatDistanceToNow(responseTime, { addSuffix: true, includeSeconds: true, locale: ko });
  const formattedResponseTime = format(responseTime, 'HH:mm:ss');
  const formattedRenderTime = format(new Date(), 'HH:mm:ss');

  async function handleRevalidatePath() {
    'use server';
    revalidatePath(`${currentPath}/${id}`);
  }

  return (
    <div>
      <p>
        URL: <code>{`${currentPath}/${id}`}</code> <br />
        Response Time: <code className="text-sky-700">{formattedResponseTime}</code> <br />
        From Now: <code className="text-sky-700">{fromNow}</code> <br />
        Render Time: <code className="text-sky-700">{formattedRenderTime}</code>
      </p>
      <form action={handleRevalidatePath}>
        <Button type="submit" variant={'outline'}>
          revalidatePath
        </Button>
      </form>
    </div>
  );
}
