import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarRail,
} from '@monorepo-starter/ui/components/sidebar';
import { buildTree, getAllFolderPaths } from '@monorepo-starter/utils/tree';
import { NotebookPen } from 'lucide-react';
import Link from 'next/link';
import { appPathRoutes } from '~/app-path-types';
import { checkAuthorization } from '~/lib/auth/check';
import FileTreeMenuGroup from './file-tree';
import { NavUser } from './nav-user';
import { AppSidebarCommandInput } from './sidebar-command-input';

type Props = React.ComponentProps<typeof Sidebar>;

export default async function AppSidebar({ ...props }: Props) {
  const { payload } = await checkAuthorization();
  const allRoutes = appPathRoutes.map((item) => item.href).filter((route) => route !== null);
  const allRoutesWithoutDynamic = allRoutes.filter((route) => !route.includes('/['));
  const exampleRoutes = allRoutesWithoutDynamic.filter((route) => route.startsWith('/example/')); // 예제 라우트만 필터링
  const routesTree = buildTree(exampleRoutes)[0]?.children || [];

  // 커스텀 라우트 직접 추가
  routesTree.push({
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

  const folderPaths = getAllFolderPaths(routesTree);

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenuButton size="lg" asChild>
          <Link href="/example">
            <div className="bg-sidebar-primary/60 text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
              <NotebookPen className="size-4" />
            </div>
            <div className="flex flex-col gap-0.5 leading-none">
              <span className="font-semibold">Examples</span>
              <span className="">v0.0.1</span>
            </div>
          </Link>
        </SidebarMenuButton>
        <AppSidebarCommandInput />
      </SidebarHeader>
      <SidebarContent className="[&_[data-active='true']]:bg-foreground/8">
        <FileTreeMenuGroup routes={routesTree} folderPaths={folderPaths} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser payload={payload} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
