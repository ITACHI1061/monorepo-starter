import { devLog } from '@monorepo-starter/utils/console';
import { floor } from '@monorepo-starter/utils/math';
import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';

export default async function AppInterceptingPage() {
  const cookieStore = await cookies();
  const pathname = cookieStore.get('next-pathname')?.value;

  let photos: { id: string; author: string; width: number; height: number; url: string; download_url: string }[] = [];

  try {
    const res = await fetch(`https://picsum.photos/v2/list`, {
      cache: 'force-cache',
      next: {
        revalidate: 60 * 60 * 24, // 24시간 캐시
      },
    });
    photos = await res.json();
  } catch (error) {
    devLog('error', error);
    photos = [];
  }

  return (
    <div>
      <h1>Intercepting Route 예제(상대 경로)</h1>

      <div className="bg-gray-100 p-4 font-mono">
        <p>{pathname}</p>
        <p>{pathname}/photo/[id]</p>
        <p>
          <span>{pathname}</span>
          <span>/</span>
          <span className="text-zinc-400 line-through">@modal</span>
          <span className="text-zinc-400 line-through">/(.)</span>
          <span>photo/[id]</span>
        </p>
      </div>

      <div className="flex flex-wrap gap-3 text-sm">
        {photos.map((photo) => {
          const { width, height } = photo;
          const boxSize = 150;

          let scaledWidth = 0;
          let scaledHeight = 0;
          if (width >= height) {
            scaledWidth = boxSize;
            scaledHeight = height * (boxSize / width);
          } else {
            scaledHeight = boxSize;
            scaledWidth = width * (boxSize / height);
          }

          scaledWidth = floor(scaledWidth, 0);
          scaledHeight = floor(scaledHeight, 0);

          const downloadUrl = `https://picsum.photos/id/${photo.id}/${scaledWidth}/${scaledHeight}`;

          return (
            <Link
              key={photo.id}
              href={`/example/route/intercepting/photo/${photo.id}`}
              passHref
              className="size-25 overflow-hidden rounded-lg"
            >
              <Image
                className="size-full object-cover grayscale backdrop-blur-[2px] transition hover:grayscale-0 hover:backdrop-blur-none"
                src={downloadUrl}
                alt={photo.author}
                width={scaledWidth}
                height={scaledHeight}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
