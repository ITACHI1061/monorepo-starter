'use client';

import { Button } from '@monorepo-starter/ui/components/button';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DetailFullPage({ children }: { children: React.ReactNode }) {
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

    meta.setAttribute('content', '#e2e8f0');

    return () => {
      meta.setAttribute('content', '#ffffff');
    };
  }, []);

  return (
    <div className="fixed inset-0 z-20 flex flex-col bg-slate-200">
      <div className="flex flex-1 flex-col gap-2 overflow-auto p-4">{children}</div>
      <div className="p-4">
        <Button onClick={handleGoBack} className="w-full">
          Go Back
        </Button>
      </div>
    </div>
  );
}
