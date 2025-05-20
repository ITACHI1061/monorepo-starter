import { cookies, headers } from 'next/headers';

export const dynamic = 'force-dynamic';
export const revalidate = false;

export default async function FullRouteCacheDisabledPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  void (await headers());
  void (await cookies());
  void (await searchParams);

  return (
    <div>
      <h1>캐싱: Full Route Cache - Disabled</h1>
      <p>
        다음의 조건이 충족되면 자동으로 <code>Full Route Cache</code>가 비활성화 됩니다.
      </p>
      <ol>
        <li>
          <strong>Dynamic API</strong>: 라우트 핸들러에서 <code>cookies</code>, <code>headers</code>,{' '}
          <code>searchParams</code>와 같은 동적 API를 사용
        </li>
        <li>
          <strong>Route Segment</strong>: <code>dynamic = force-dynamic</code> 또는 <code>revalidate = 0</code>과 같은
          옵션 설정
        </li>
        <li>
          fetch 요청에서 <code>cache: no-store</code> 옵션 사용
        </li>
      </ol>
    </div>
  );
}
