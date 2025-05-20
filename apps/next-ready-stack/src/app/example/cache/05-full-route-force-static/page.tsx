import { Button } from '@monorepo-starter/ui/components/button';
import { format } from 'date-fns';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-static';

export default async function FullRouteCacheForceStaticPage() {
  const renderTime = new Date();
  const formattedRenderTime = format(renderTime, 'HH:mm:ss');

  async function handleRevalidatePath() {
    'use server';
    revalidatePath('/example/cache/05-full-route-force-static');
  }

  return (
    <div>
      <h1>캐싱: Full Route Cache - Force Static</h1>
      <p>
        강제 활성화: 빌드 타임에 생성됨 <br />
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
