'use client';

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@monorepo-starter/ui/components/collapsible';
import {
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
} from '@monorepo-starter/ui/components/sidebar';
import { useIsMobile } from '@monorepo-starter/ui/hooks/use-mobile';
import { cn } from '@monorepo-starter/ui/lib/utils';
import { type TreeRoute } from '@monorepo-starter/utils/tree';
import { ChevronRight, ChevronRightCircle, CopyMinus, CopyPlus, File, Folder, FolderOpen } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function FileTreeMenuGroup({ routes, folderPaths }: { routes: TreeRoute[]; folderPaths: string[] }) {
  const [openPaths, setOpenPaths] = useState<string[]>([...folderPaths]);
  const pathname = usePathname();
  const isMobile = useIsMobile();

  // 현재 페이지가 폴더 경로에 있는 경우, 해당 폴더를 스크롤 하여 보여줌
  useEffect(() => {
    const target = document.querySelector(`[data-slot="sidebar-menu-button"][data-active="true"]`);
    if (!target) {
      return;
    }

    if (isMobile) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry], obs) => {
        const isVisible = entry?.isIntersecting;
        if (!isVisible) {
          target.scrollIntoView({ behavior: 'auto', block: 'center' });
        }

        obs.disconnect();
      },
      {
        root: null,
        threshold: 0.1,
      },
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [pathname]);

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Files</SidebarGroupLabel>
      <SidebarGroupAction title="Toggle all" onClick={() => setOpenPaths(openPaths.length > 0 ? [] : [...folderPaths])}>
        {openPaths.length > 0 ? <CopyMinus className="size-4" /> : <CopyPlus className="size-4" />}
      </SidebarGroupAction>
      <SidebarGroupContent>
        <SidebarMenu>
          {routes.map((route) => (
            <FileTree
              pathname={pathname}
              key={route.path}
              item={route}
              openPaths={openPaths}
              setOpenPaths={setOpenPaths}
            />
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

export function FileTree({
  pathname,
  item,
  openPaths,
  setOpenPaths,
}: {
  pathname: string;
  item: TreeRoute;
  openPaths: string[];
  setOpenPaths: (paths: string[]) => void;
}) {
  const menuItemClassName = cn(`text-sm truncate tracking-tight data-[active=true]:bg-transparent`);

  if (item.children.length === 0) {
    const isActive = pathname === item.path;
    return (
      <SidebarMenuItem>
        <SidebarMenuButton size="sm" isActive={isActive} className={menuItemClassName} asChild>
          {item.hasPath ? (
            <Link href={item.path} className="pl-8">
              <File />
              <span>{item.name}</span>
            </Link>
          ) : (
            <span>{item.name}</span>
          )}
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  }

  return (
    <SidebarMenuItem>
      <Collapsible
        className="group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90"
        open={openPaths.includes(item.path)}
        onOpenChange={(open) => {
          if (open) {
            setOpenPaths([...openPaths, item.path]);
          } else {
            setOpenPaths(openPaths.filter((path) => path !== item.path));
          }
        }}
      >
        <CollapsibleTrigger asChild>
          <SidebarMenuButton size="sm" isActive={item.path === pathname} className={menuItemClassName}>
            <ChevronRight className="transition-transform" />
            {openPaths.includes(item.path) ? <FolderOpen /> : <Folder />}
            {item.name}
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          {/* 우측 여백 제거로 오른쪽 액션 버튼 노출 */}
          <SidebarMenuSub className="mr-0 pr-0">
            {item.children.map((subItem, index) => (
              <FileTree
                pathname={pathname}
                key={index}
                item={subItem}
                openPaths={openPaths}
                setOpenPaths={setOpenPaths}
              />
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
      {item.hasPath && (
        <SidebarMenuAction asChild>
          <Link href={item.path}>
            <ChevronRightCircle className="text-foreground/30" />
          </Link>
        </SidebarMenuAction>
      )}
    </SidebarMenuItem>
  );
}
