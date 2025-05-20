'use client';

import { ScrollArea, ScrollBar } from '@monorepo-starter/ui/components/scroll-area';
import { Sortable } from '@monorepo-starter/ui/composites/dnd/sortable';
import { SortableItem } from '@monorepo-starter/ui/composites/dnd/sortable-item';
import { cn } from '@monorepo-starter/ui/lib/utils';
import { fakerKO } from '@faker-js/faker';
import { useEffect, useState } from 'react';

export default function ExampleDndSortableGridPage() {
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
      <h1>Sortable Grid</h1>
      <ScrollArea className="size-150 rounded-md border border-stone-300 p-4 shadow-lg">
        <Sortable
          items={items}
          setItems={setItems}
          className="grid grid-cols-3 gap-3"
          disabled={false}
          isGrid
          mode="swap"
        >
          {({ item, isDragOverlay }) => (
            <SortableItem
              key={item.id}
              id={item.id}
              isDragOverlay={isDragOverlay}
              useGrip
              classNames={{
                base: cn(`p-2 border rounded-md shadow-sm truncate flex items-center whitespace-nowrap px-4 gap-2`),
              }}
            >
              {item.name}
            </SortableItem>
          )}
        </Sortable>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
