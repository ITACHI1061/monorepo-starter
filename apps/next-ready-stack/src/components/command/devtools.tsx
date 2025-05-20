'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@monorepo-starter/ui/components/dialog';
import { ScrollArea, ScrollBar } from '@monorepo-starter/ui/components/scroll-area';
import { usePathname } from 'next/navigation';
import { appPathRoutes } from '~/app-path-types';
import { ComponentDisplayTree } from './devtools-component-display';
import { ComponentTree } from './devtools-component-tree';

export default function Devtools({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) {
  const pathname = usePathname();
  const currentRouteStructure = appPathRoutes.find((route) => route.href === pathname);

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[calc(100vh-15rem)] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>컴포넌트 정보</DialogTitle>
            <DialogDescription>현재 경로의 파일, 컴포넌트에 대한 상세한 정보를 확인할 수 있습니다</DialogDescription>
          </DialogHeader>

          {currentRouteStructure && (
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
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
