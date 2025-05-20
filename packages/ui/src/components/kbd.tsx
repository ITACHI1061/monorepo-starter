import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@monorepo-starter/ui/lib/utils';

const kbdVariants = cva('', {
  variants: {
    variant: {
      default:
        'bg-muted text-muted-foreground pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

function Kbd({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<'kbd'> & VariantProps<typeof kbdVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'kbd';

  return <Comp data-slot="kbd" className={cn(kbdVariants({ variant }), className)} {...props} />;
}

export { Kbd };
