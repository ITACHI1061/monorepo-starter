'use client';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@monorepo-starter/ui/components/tooltip';
import { cn } from '@monorepo-starter/ui/lib/utils';
import {
  AlertCircleIcon,
  ArrowRightIcon,
  FileIcon,
  LayoutIcon,
  LayoutTemplateIcon,
  Loader2Icon,
  RouteOffIcon,
} from 'lucide-react';
import { type ComponentTreeJson } from '~/app-path-types';
import { openInIde } from './actions';

export function ComponentDisplayTree({
  componentTreeJson,
  depth = 0,
}: {
  componentTreeJson: ComponentTreeJson;
  depth?: number;
}) {
  if (!componentTreeJson) return null;

  const isLayout = componentTreeJson.type === 'Layout';
  const isTemplate = componentTreeJson.type === 'Template';
  const isError = componentTreeJson.type === 'ErrorBoundary' && componentTreeJson.fallback === 'Error';
  const isNotFound = componentTreeJson.type === 'ErrorBoundary' && componentTreeJson.fallback === 'NotFound';
  const isLoading = componentTreeJson.type === 'Suspense' && componentTreeJson.fallback === 'Loading';
  const isPage = componentTreeJson.type === 'Page';

  return (
    <div data-component-type={componentTreeJson.type} className={cn('flex flex-1 items-stretch gap-1')}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <span
              className={cn(
                'flex h-full items-center rounded p-2',
                'cursor-pointer hover:ring-2 hover:ring-blue-300',
                isError && 'bg-red-200',
                isLayout && 'bg-green-200',
                isTemplate && 'bg-yellow-200',
                isLoading && 'bg-purple-200',
                isPage && 'bg-blue-200',
              )}
              onClick={() => {
                openInIde(componentTreeJson.path);
              }}
            >
              {isLayout && <LayoutIcon className="size-4" />}
              {isTemplate && <LayoutTemplateIcon className="size-4" />}
              {isError && <AlertCircleIcon className="size-4" />}
              {isNotFound && <RouteOffIcon className="size-4" />}
              {isLoading && <Loader2Icon className="size-4" />}
              {isPage && <FileIcon className="size-4" />}
            </span>
          </TooltipTrigger>
          <TooltipContent>
            <span>
              {componentTreeJson.type}: {componentTreeJson.path}
            </span>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {componentTreeJson.children && componentTreeJson.children.length > 0 && (
        <>
          <span className="flex items-center p-1">
            <ArrowRightIcon className="size-4" strokeWidth={1.5} />
          </span>
          <div className="flex flex-col gap-1.5">
            {componentTreeJson.children?.map((child) => (
              <ComponentDisplayTree key={child.path} componentTreeJson={child} depth={depth + 1} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
