'use client';

import { devLog } from '@monorepo-starter/utils/console';
import { floor } from '@monorepo-starter/utils/math';
import Image from 'next/image';
import { useEffect, useState, useTransition } from 'react';

export default function PhotoDetail({ id }: { id: string }) {
  const [photo, setPhoto] = useState<{ width: number; height: number; author: string } | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      try {
        const response = await fetch(`https://picsum.photos/id/${id}/info`);
        const photo = await response.json();

        const { width, height } = photo;
        const boxSize = 500;

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
        setDownloadUrl(downloadUrl);
        setPhoto({ width: scaledWidth, height: scaledHeight, author: photo.author });
      } catch (error) {
        devLog('error', error);
      }
    });
  }, [id]);

  return (
    <div className="flex flex-col gap-2 p-4">
      {isPending && (
        <div className="size-100 flex items-center justify-center">
          <div className="size-full animate-pulse rounded-lg bg-gray-300" />
        </div>
      )}
      {!isPending && downloadUrl && photo && (
        <figure className="flex flex-col gap-2">
          <Image
            src={downloadUrl}
            alt={`Photo ${id}`}
            width={photo?.width}
            height={photo?.height}
            className="w-full rounded-lg object-cover"
            loading="eager"
            placeholder="blur"
            blurDataURL="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
          />
          <figcaption>
            <p className="text-right text-gray-500">{photo?.author}</p>
          </figcaption>
        </figure>
      )}
    </div>
  );
}
