'use client';

import { cn } from '@monorepo-starter/ui/lib/utils';
import { closestCenter, DndContext, DragOverlay, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useVirtualizer } from '@tanstack/react-virtual';
import { ComponentProps, useEffect, useRef, useState } from 'react';

export default function VirtualSortable({
  ids: initialIds,
  estimateSize,
  renderItem,
  renderOverlay,
  onMove,
  className,
}: {
  ids: string[];
  estimateSize: (index: number) => number;
  renderItem: (id: string, virtualRowIndex: number) => React.ReactNode;
  renderOverlay?: (id: string, virtualRowIndex: number) => React.ReactNode;
  onMove?: (from: number, to: number) => void;
  className?: string;
}) {
  const parentRef = useRef<HTMLDivElement>(null);
  const [ids, setIds] = useState<string[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  const rowVirtualizer = useVirtualizer({
    count: ids.length,
    getScrollElement: () => parentRef.current,
    estimateSize,
    overscan: 5,
  });

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 50,
        tolerance: 0,
      },
    }),
  );

  const handleDragStart: ComponentProps<typeof DndContext>['onDragStart'] = ({ active }) => {
    setActiveId(active.id as string);
  };

  const handleDragEnd: ComponentProps<typeof DndContext>['onDragEnd'] = ({ active, over }) => {
    if (active.id !== over?.id) {
      const oldIndex = ids.findIndex((id) => id === active.id);
      const newIndex = ids.findIndex((id) => id === over?.id);
      setIds(arrayMove(ids, oldIndex, newIndex));
      onMove?.(oldIndex, newIndex);
    }

    setActiveId(null);
  };

  useEffect(() => {
    setIds(initialIds);
  }, [initialIds]);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div ref={parentRef} className={cn('overflow-auto', className)}>
        <div
          style={{
            position: 'relative',
            height: `${rowVirtualizer.getTotalSize()}px`,
          }}
        >
          <SortableContext items={ids} strategy={verticalListSortingStrategy}>
            {rowVirtualizer.getVirtualItems().map((virtualRow) => {
              const id = ids[virtualRow.index]!;
              return (
                <div
                  key={virtualRow.index}
                  className="absolute left-0 top-0 w-full"
                  style={{
                    height: `${virtualRow.size}px`,
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
                >
                  {renderItem(id, virtualRow.index)}
                </div>
              );
            })}
          </SortableContext>
        </div>
      </div>
      <DragOverlay>
        {activeId &&
          renderOverlay?.(
            activeId,
            ids.findIndex((id) => id === activeId),
          )}
      </DragOverlay>
    </DndContext>
  );
}
