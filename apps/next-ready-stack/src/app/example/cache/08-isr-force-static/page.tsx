import Link from 'next/link';

export default function ISRForceStaticPage() {
  const currentPath = `/example/cache/08-isr-force-static`;
  return (
    <div>
      <h1>캐싱: Incremental Static Regeneration - Force Static</h1>
      <p>
        빌드 타임에 렌더링된 페이지를 항상 캐시
        <br />
        <span className="text-foreground/50">개발 환경에서는 비활성화 됩니다</span>
      </p>
      <div className="flex gap-2 *:flex *:h-10 *:items-center *:justify-center *:rounded-lg *:border *:p-4">
        <Link href={`${currentPath}/1`}>1</Link>
        <Link href={`${currentPath}/2`}>2</Link>
        <Link href={`${currentPath}/3`}>3</Link>
        <Link href={`${currentPath}/4`}>4</Link>
        <Link href={`${currentPath}/5`}>5</Link>
        <Link href={`${currentPath}/99`}>99(Not Found)</Link>
      </div>
    </div>
  );
}
