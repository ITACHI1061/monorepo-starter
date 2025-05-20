import Link from 'next/link';

export default function AppRouteParallelUsersLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold">사용자 목록</h2>
        <Link
          href="/example/route/parallel/login"
          className="rounded bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600"
        >
          로그인
        </Link>
      </div>
      {children}
    </div>
  );
}
