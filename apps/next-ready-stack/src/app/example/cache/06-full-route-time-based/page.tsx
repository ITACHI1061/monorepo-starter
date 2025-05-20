import { Button } from '@monorepo-starter/ui/components/button';
import { format } from 'date-fns';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-static';
export const revalidate = 15;

export default async function FullRouteCacheRevalidatePage() {
  const renderTime = new Date();
  const formattedRenderTime = format(renderTime, 'HH:mm:ss');

  async function handleRevalidatePath() {
    'use server';
    revalidatePath('/example/cache/06-full-route-time-based');
  }

  return (
    <div>
      <h1>캐싱: Full Route Cache - Revalidate</h1>
      <p>
        15초 마다 화면을 강제 갱신 <br />
        <span className="text-foreground/50">개발 환경에서는 비활성화 됩니다</span>
        <br />
        Render Time: {formattedRenderTime}
      </p>
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
