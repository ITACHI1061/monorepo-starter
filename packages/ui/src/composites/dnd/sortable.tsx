'use client';

import {
  closestCenter,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  type Modifier,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { restrictToHorizontalAxis, restrictToParentElement, restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
  arrayMove,
  arraySwap,
  horizontalListSortingStrategy,
  rectSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { ComponentProps, useState } from 'react';

export type SortableItem = {
  id: string;
  [key: string]: any;
};

export function Sortable<T extends SortableItem>({
  items,
  setItems,
  className,
  children,
  disabled,
  isHorizontal,
  isGrid,
  restrictVertical,
  restrictHorizontal,
  mode = 'move',
}: {
  items: T[];
  setItems: (items: T[]) => void;
  className?: string;
  children: (props: { item: T; index: number; isDragOverlay?: boolean }) => React.ReactNode;
  disabled?: boolean;
  isHorizontal?: boolean;
  isGrid?: boolean;
  restrictVertical?: boolean;
  restrictHorizontal?: boolean;
  mode?: 'move' | 'swap';
}) {
  const strategy = isGrid
    ? rectSortingStrategy
    : isHorizontal
      ? horizontalListSortingStrategy
      : verticalListSortingStrategy;
  const modifiers: Modifier[] = [];
  if (restrictVertical) {
    modifiers.push(restrictToVerticalAxis, restrictToParentElement);
  }
  if (restrictHorizontal) {
    modifiers.push(restrictToHorizontalAxis, restrictToParentElement);
  }

  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 50,
        tolerance: 0,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragStart: ComponentProps<typeof DndContext>['onDragStart'] = ({ active }) => {
    setActiveId(active.id as string);
  };

  const handleDragEnd: ComponentProps<typeof DndContext>['onDragEnd'] = ({ active, over }) => {
    if (active.id !== over?.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over?.id);
      if (mode === 'move') {
        setItems(arrayMove(items, oldIndex, newIndex));
      } else {
        setItems(arraySwap(items, oldIndex, newIndex));
      }
    }

    setActiveId(null);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      modifiers={modifiers}
    >
      <div className={className}>
        <SortableContext items={items} strategy={strategy} disabled={disabled}>
          {items.map((item, index) => children({ item, index, isDragOverlay: false }))}
        </SortableContext>
      </div>
      <DragOverlay>
        {activeId
          ? children({
              item: items.find((item) => item.id === activeId)!,
              index: items.findIndex((item) => item.id === activeId),
              isDragOverlay: true,
            })
          : null}
      </DragOverlay>
    </DndContext>
  );
}
