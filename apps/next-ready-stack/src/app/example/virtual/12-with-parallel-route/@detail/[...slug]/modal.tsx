'use client';

import {
  Dialog,
  DialogContentWithoutClose,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@monorepo-starter/ui/components/dialog';
import { cn } from '@monorepo-starter/ui/lib/utils';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DetailModal({ children, className }: { children: React.ReactNode; className?: string }) {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  // 테마(상태 바) 색상 변경
  useEffect(() => {
    let meta = document.querySelector('meta[name="theme-color"]');

    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'theme-color');
      document.head.appendChild(meta);
    }

    meta.setAttribute('content', '#7f7f7f');

    return () => {
      meta.setAttribute('content', '#ffffff');
    };
  }, []);

  return (
    <Dialog open>
      <DialogContentWithoutClose
        onInteractOutside={handleGoBack}
        onEscapeKeyDown={handleGoBack}
        className={cn(className)}
      >
        <DialogHeader>
          <DialogTitle>Detail Modal</DialogTitle>
          <DialogDescription>Detail Modal with Parallel Route</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContentWithoutClose>
    </Dialog>
  );
}
