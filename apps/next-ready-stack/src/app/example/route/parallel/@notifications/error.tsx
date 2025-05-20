'use client';

import { useRouter } from 'next/navigation';

export default function AppRouteParallelNotificationsError({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();

  const handleReset = () => {
    reset();
    router.refresh();
  };

  return (
    <div className="rounded-lg bg-red-50 p-4">
      <h2 className="mb-4 text-xl font-semibold text-red-600">알림 오류</h2>
      <p className="mb-4 text-sm text-red-500">{error.message}</p>
      <button onClick={handleReset} className="rounded bg-red-500 px-4 py-2 text-sm text-white hover:bg-red-600">
        다시 시도
      </button>
    </div>
  );
}
