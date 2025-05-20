'use client';

import { CommandShortcut } from '@monorepo-starter/ui/components/command';
import { Input } from '@monorepo-starter/ui/components/input';

export function AppSidebarCommandInput() {
  return (
    <div
      className="relative cursor-text"
      onClick={() => {
        const event = new KeyboardEvent('keydown', { key: 'k', metaKey: true, bubbles: true });
        document.dispatchEvent(event);
      }}
    >
      <Input className="bg-background disabled:opacity-100" placeholder="Search documentation..." readOnly disabled />
      <CommandShortcut className="bg-muted absolute right-2 top-1/2 -translate-y-1/2 rounded border px-1 text-xs">
        ⌘K
      </CommandShortcut>
    </div>
  );
}
