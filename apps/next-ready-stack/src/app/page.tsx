import { Button } from '@monorepo-starter/ui/components/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@monorepo-starter/ui/components/card';
import Link from 'next/link';

export default function Home() {
  const routes = [
    { href: '/example/form', label: 'Form Examples', desc: '폼 관련 다양한 예제' },
    { href: '/example/virtual', label: 'Virtual List', desc: '가상 리스트/스크롤' },
    { href: '/example/dnd', label: 'Drag&Drop', desc: '드래그 앤 드롭 UI' },
    { href: '/example/code-block', label: 'Code Block', desc: '코드 하이라이트/에디터' },
    { href: '/example/cache', label: 'Caching System', desc: 'Next.js 캐싱/ISR/SSG' },
    { href: '/example/zustand', label: 'Zustand State Management', desc: 'Zustand 상태관리 예제' },
    { href: '/example/table', label: 'Table Examples', desc: '테이블/필터/정렬' },
    { href: '/example/route', label: 'Advanced Routing', desc: '중첩/병렬/인터셉트 라우트' },
    { href: '/example/push', label: 'Router Push', desc: '라우터 이동/상태' },
    { href: '/example/query', label: 'Query/Prefetch', desc: '쿼리스트링, prefetch' },
    { href: '/example/nuqs', label: 'Nuqs Utilization', desc: 'Nuqs 쿼리 관리' },
    { href: '/example/experimental', label: 'Experimental Examples', desc: '최신/실험적 기능' },
    { href: '/example/db', label: 'DB Examples', desc: 'DB 연동/CRUD' },
    { href: '/example/auth', label: 'Authentication/Security', desc: 'JWT, 인증, 접근제한 라우트' },
    { href: '/example/ko', label: 'Multilingual/Dynamic Routes', desc: 'i18n, 동적 세그먼트' },
  ];

  return (
    <main className="container mx-auto space-y-4 p-4">
      <h1 className="text-2xl font-bold">Next Ready Stack Examples</h1>
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
                  Go to Example
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
