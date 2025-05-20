import { cn } from '@monorepo-starter/ui/lib/utils';
import { type PropsWithChildren } from 'react';

export function Article({ children }: PropsWithChildren) {
  const className = cn(
    'prose md:prose-sm dark:prose-invert max-w-none',
    `prose-code:text-foreground/70`, // prose-code:before:content-none prose-code:after:content-none
  );
  return <article className={className}>{children}</article>;
}
