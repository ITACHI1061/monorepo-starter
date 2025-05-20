import { Toggle } from '@monorepo-starter/ui/components/toggle';
import { Calendar1, Eraser, Mail, User } from 'lucide-react';
import Link from 'next/link';
import { parsers, searchParamsCache, serialize } from './searchParams';

// 서버컴포넌트는 이벤트 핸들러를 사용할 수 없기때문에 사전정의된 필터만 사용
export default function TableFilters({ currentUrl }: { currentUrl: string }) {
  const allParams = searchParamsCache.all();
  const pageIndex = parsers.pageIndex.defaultValue;

  const isSearchGmail = allParams.email === 'gmail.com';
  const isSearchFamilyName = allParams.name === '지';
  const isSearchFemale = allParams.gender === 'female';
  const isAfter2000 = allParams.birthFrom === '2000-01-01';

  const hasFilters = isSearchGmail || isSearchFamilyName || isSearchFemale || isAfter2000;

  return (
    <div className="flex gap-2">
      <Toggle aria-label="Filters for Gmail" variant="outline" asChild pressed={isSearchGmail}>
        <Link href={serialize(currentUrl, { ...allParams, pageIndex, email: isSearchGmail ? undefined : 'gmail.com' })}>
          <Mail className="size-4" /> Gmail
        </Link>
      </Toggle>
      <Toggle aria-label="Filters for Family Name" variant="outline" asChild pressed={isSearchFamilyName}>
        <Link href={serialize(currentUrl, { ...allParams, pageIndex, name: isSearchFamilyName ? undefined : '지' })}>
          <User className="size-4" /> &quot;지&quot;가 포함된 이름
        </Link>
      </Toggle>
      <Toggle aria-label="Filters for Female" variant="outline" asChild pressed={isSearchFemale}>
        <Link href={serialize(currentUrl, { ...allParams, pageIndex, gender: isSearchFemale ? undefined : 'female' })}>
          <User className="size-4" /> Only Female
        </Link>
      </Toggle>
      <Toggle aria-label="Filters for After 2000" variant="outline" asChild pressed={isAfter2000}>
        <Link
          href={serialize(currentUrl, { ...allParams, pageIndex, birthFrom: isAfter2000 ? undefined : '2000-01-01' })}
        >
          <Calendar1 className="size-4" /> Born after 2000
        </Link>
      </Toggle>
      {hasFilters && (
        <Toggle aria-label="Clear All" variant="outline" asChild>
          <Link
            href={serialize(currentUrl, {
              ...allParams,
              pageIndex,
              email: undefined,
              name: undefined,
              gender: undefined,
              birthFrom: undefined,
            })}
          >
            <Eraser className="size-4" /> Clear
          </Link>
        </Toggle>
      )}
    </div>
  );
}
