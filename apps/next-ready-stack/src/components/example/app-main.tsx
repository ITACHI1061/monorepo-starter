'use client';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@monorepo-starter/ui/components/breadcrumb';
import { Separator } from '@monorepo-starter/ui/components/separator';
import { SidebarTrigger, useSidebar } from '@monorepo-starter/ui/components/sidebar';
import { cn } from '@monorepo-starter/ui/lib/utils';
import { usePathname } from 'next/navigation';
import { Fragment } from 'react';

export default function AppMainLayout({ children }: { children: React.ReactNode }) {
  const useStickyHeader = true;
  const pathname = usePathname();
  const pathNames = pathname.split('/').slice(2);

  const { open, isMobile } = useSidebar(); // 사이드바 상태를 쓰기위해 Client Component 로 작성

  const mainClassName = cn(
    'p-4 h-[calc(100dvh-var(--sidebar-header-height))] max-w-[calc(100vw-var(--sidebar-width))]',
    (!open || isMobile) && 'max-w-dvw',
  );

  return (
    <Fragment>
      <header
        className={cn(
          'h-(--sidebar-header-height) flex items-center border-b px-4',
          useStickyHeader && 'bg-background sticky top-0 z-10',
        )}
      >
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />

        {/* 브레드크럼 */}
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="/example">Examples</BreadcrumbLink>
            </BreadcrumbItem>
            {pathNames.map((paths) => {
              return (
                <Fragment key={paths}>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>{paths}</BreadcrumbPage>
                  </BreadcrumbItem>
                </Fragment>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <main className={mainClassName}>{children}</main>
    </Fragment>
  );
}
