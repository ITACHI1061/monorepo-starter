'use client';

import { ScrollArea } from '@monorepo-starter/ui/components/scroll-area';
import { Sortable } from '@monorepo-starter/ui/composites/dnd/sortable';
import { SortableItem } from '@monorepo-starter/ui/composites/dnd/sortable-item';
import { cn } from '@monorepo-starter/ui/lib/utils';
import { fakerKO } from '@faker-js/faker';
import { useEffect, useState } from 'react';

export default function ExampleDndSortableBasicPage() {
  const [items, setItems] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    const initialItems = Array.from({ length: 10 }, (_, index) => ({
      id: `id-${index}`,
      name: fakerKO.food.fruit(),
    }));

    setItems(initialItems);
  }, []);

  return (
    <div>
      <h1>Sortable Vertical</h1>
      <ScrollArea className="size-120 rounded-md border border-stone-300 p-4 shadow-lg">
        <Sortable items={items} setItems={setItems} className="flex flex-col gap-2" disabled={false}>
          {({ item, isDragOverlay }) => (
            <SortableItem
              key={item.id}
              id={item.id}
              isDragOverlay={isDragOverlay}
              useGrip
              classNames={{ base: cn(`p-2 border rounded-md shadow-sm flex items-center gap-2`) }}
            >
              {item.name}
            </SortableItem>
          )}
        </Sortable>
      </ScrollArea>
    </div>
  );
}
