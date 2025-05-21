'use client';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@monorepo-starter/ui/components/command';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@monorepo-starter/ui/components/dialog';
import { ScrollArea, ScrollBar } from '@monorepo-starter/ui/components/scroll-area';
import { trainCase } from 'change-case';
import { ChevronRight, InfoIcon, MoonIcon, Sidebar, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { appPathRoutes } from '~/app-path-types';
import { ComponentDisplayTree } from './devtools-component-display';
import { ComponentTree } from './devtools-component-tree';

export function CommandProvider({ children }: { children: React.ReactNode }) {
  const [openCommandDialog, setOpenCommandDialog] = useState(false);
  const [openDevtools, setOpenDevtools] = useState(false);
  const [search, setSearch] = useState('');
  const { setTheme, theme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();

  const allRoutes = appPathRoutes.map((item) => {
    let name = item.fileName.split('/').at(-2);
    if (item.href === '/') {
      name = 'Home';
    }

    return {
      name,
      path: item.href,
      hasPath: item.href !== null,
    };
  });

  const currentRouteStructure = appPathRoutes.find((route) => route.href === pathname);

  // 사이드바 토글(강제 키 이벤트 발생)
  const handleToggleSidebar = () => {
    const event = new KeyboardEvent('keydown', { key: 'b', metaKey: true, bubbles: true });
    document.dispatchEvent(event);
  };

  // 테마 변경
  const handleToggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  // 컴포넌트 정보 보기
  const handleViewComponentInfo = () => {
    setOpenCommandDialog(false);
    setOpenDevtools(true);
  };

  // 링크 이동
  const handleGoToPage = (path: string) => {
    router.push(path);
    setOpenCommandDialog(false);
  };

  // 커멘드 필터링
  const handleFilterCommand = (value: string, search: string) => {
    if (value.includes(search)) return 1;
    return 0;
  };

  // 명령어 키 이벤트 핸들러
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      // 개발자 도구 키 조합 먼저 실행
      if (e.key === 'i' && (e.metaKey || e.ctrlKey) && e.altKey) {
        return;
      }

      // 개발도구 모달 토글
      if (e.key === 'i' && (e.metaKey || e.ctrlKey) && !e.shiftKey) {
        e.preventDefault();
        setOpenDevtools((open) => !open);
        return;
      }

      // 커멘트 모달 토글
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpenCommandDialog((open) => !open);
      }

      // 테마 변경 토글
      if (e.key === 'e' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        handleToggleTheme();
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [handleToggleTheme, handleToggleSidebar]);

  return (
    <>
      <Dialog open={openCommandDialog} onOpenChange={setOpenCommandDialog}>
        <DialogHeader className="sr-only">
          <DialogTitle>Search documentation</DialogTitle>
          <DialogDescription>Search for a command to run...</DialogDescription>
        </DialogHeader>
        <DialogContent className="overflow-hidden p-0">
          <Command
            filter={handleFilterCommand}
            className="[&_[cmdk-group-heading]]:text-muted-foreground **:data-[slot=command-input-wrapper]:h-12 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5"
          >
            <CommandInput placeholder="Type a command or search..." value={search} onValueChange={setSearch} />
            <CommandList>
              {allRoutes.length === 0 && <CommandEmpty>No results found.</CommandEmpty>}
              {search.length > 0 && (
                <CommandGroup heading="Links">
                  {allRoutes
                    .filter((result) => result.hasPath)
                    .map((result) => {
                      const parent = result.path && result.path.split('/').at(-2);
                      return (
                        <CommandItem key={result.path} value={result.path || ''} onSelect={handleGoToPage}>
                          {parent && <span className="text-foreground/60">{parent}</span>}
                          <span className="size-3.5">
                            <ChevronRight className="!size-3.5" strokeWidth={2} />
                          </span>
                          <span className="text-foreground">{trainCase(result.name || '')}</span>
                        </CommandItem>
                      );
                    })}
                </CommandGroup>
              )}

              <CommandSeparator />
              <CommandGroup heading="Settings">
                <CommandItem onSelect={handleToggleSidebar}>
                  <Sidebar />
                  <span>Toggle sidebar</span>
                  <CommandShortcut>⌘B</CommandShortcut>
                </CommandItem>
                <CommandItem onSelect={handleToggleTheme}>
                  {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
                  <span>Toggle theme</span>
                  <CommandShortcut>⌘E</CommandShortcut>
                </CommandItem>
                <CommandItem onSelect={handleViewComponentInfo}>
                  <InfoIcon />
                  <span>View Component info</span>
                  <CommandShortcut>⌘I</CommandShortcut>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </DialogContent>
      </Dialog>
      <Dialog open={openDevtools} onOpenChange={setOpenDevtools}>
        <DialogContent className="max-h-[calc(100vh-15rem)] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>컴포넌트 정보</DialogTitle>
            <DialogDescription>현재 경로의 파일, 컴포넌트에 대한 상세한 정보를 확인할 수 있습니다</DialogDescription>
          </DialogHeader>
          {currentRouteStructure ? (
            <div>
              <h3 className="text-muted-foreground mb-2 font-semibold">Next Page Hierarchy</h3>
              <ScrollArea className="w-full max-w-[calc(--spacing(42*4)-3.25rem)]">
                <div className="border-muted-foreground/20 w-full rounded border bg-stone-800 p-4 font-mono text-xs leading-5 tracking-normal *:border-l-0">
                  {currentRouteStructure.componentTreeJson && (
                    <ComponentTree componentTreeJson={currentRouteStructure.componentTreeJson} />
                  )}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>

              <div className="border-foreground/20 mt-4 flex rounded-md border p-4">
                {currentRouteStructure.componentTreeJson && (
                  <ComponentDisplayTree componentTreeJson={currentRouteStructure.componentTreeJson} />
                )}
              </div>
            </div>
          ) : (
            <div>
              <p>No component info</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
      {children}
    </>
  );
}
