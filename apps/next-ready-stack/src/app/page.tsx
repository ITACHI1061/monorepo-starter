import { Button } from '@monorepo-starter/ui/components/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@monorepo-starter/ui/components/card';
import Link from 'next/link';

export default function Home() {
  const routes = [
    { href: '/example/form', label: 'Form 예제', desc: '폼 관련 다양한 예제' },
    { href: '/example/virtual', label: 'Virtual 리스트', desc: '가상 리스트/스크롤' },
    { href: '/example/dnd', label: '드래그&드롭', desc: '드래그 앤 드롭 UI' },
    { href: '/example/code-block', label: '코드 블록', desc: '코드 하이라이트/에디터' },
    { href: '/example/cache', label: '캐싱 시스템', desc: 'Next.js 캐싱/ISR/SSG' },
    { href: '/example/zustand', label: 'Zustand 상태관리', desc: 'Zustand 상태관리 예제' },
    { href: '/example/table', label: '테이블 예제', desc: '테이블/필터/정렬' },
    { href: '/example/route', label: '고급 라우팅', desc: '중첩/병렬/인터셉트 라우트' },
    { href: '/example/push', label: '라우터 push', desc: '라우터 이동/상태' },
    { href: '/example/query', label: '쿼리/Prefetch', desc: '쿼리스트링, prefetch' },
    { href: '/example/nuqs', label: 'Nuqs 활용', desc: 'Nuqs 쿼리 관리' },
    { href: '/example/experimental', label: '실험적 예제', desc: '최신/실험적 기능' },
    { href: '/example/db', label: 'DB 예제', desc: 'DB 연동/CRUD' },
    { href: '/example/auth', label: '인증/보안', desc: 'JWT, 인증, 보호 라우트' },
    { href: '/example/ko', label: '다국어/동적 라우트', desc: 'i18n, 동적 세그먼트' },
  ];

  return (
    <main className="container mx-auto space-y-4 p-4">
      <h1>Next Ready Stack 예제 모음</h1>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
        {routes.map((route) => (
          <Card key={route.href}>
            <CardHeader>
              <CardTitle className="">{route.label}</CardTitle>
              <CardDescription className="">{route.href}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">{route.desc}</div>
              <Button asChild variant="outline" size="sm" className="">
                <Link href={route.href} className="">
                  바로가기
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
