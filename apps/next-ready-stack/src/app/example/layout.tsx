import { SidebarInset, SidebarProvider } from '@monorepo-starter/ui/components/sidebar';
import { buildTree } from '@monorepo-starter/utils/tree';
import { type Metadata } from 'next';
import { cookies } from 'next/headers';
import { appPathRoutes } from '~/app-path-types';
import AppMainLayout from '~/components/example/app-main';
import AppSidebar from '~/components/example/app-sidebar';

export const metadata: Metadata = {
  title: 'Examples',
  description: 'Examples Page',
};

export default async function ExampleLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true';
  const sidebarStyles = { '--sidebar-header-height': '4rem', '--sidebar-width': '17rem' } as React.CSSProperties;

  const allRoutes = appPathRoutes.map((item) => item.href).filter((route) => route !== null);
  const allRoutesWithoutDynamic = allRoutes.filter((route) => !route.includes('/['));
  const exampleRoutes = allRoutesWithoutDynamic.filter((route) => route.startsWith('/example/')); // 예제 라우트만 필터링
  const routesTreeRoot = buildTree(exampleRoutes)[0];

  // 커스텀 라우트 직접 추가
  if (routesTreeRoot && routesTreeRoot.children) {
    routesTreeRoot.children.push({
      name: 'internationalization',
      path: '/example/[lang]',
      hasPath: false,
      children: [
        {
          name: 'Korean',
          path: '/example/ko',
          hasPath: true,
          children: [],
        },
        {
          name: 'English',
          path: '/example/en',
          hasPath: true,
          children: [],
        },
        {
          name: 'Chinese',
          path: '/example/cn',
          hasPath: true,
          children: [],
        },
      ],
    });
  }

  return (
    <SidebarProvider defaultOpen={defaultOpen} style={sidebarStyles}>
      <AppSidebar variant="sidebar" />
      <SidebarInset>
        <AppMainLayout>{children}</AppMainLayout>
      </SidebarInset>
    </SidebarProvider>
  );
}
