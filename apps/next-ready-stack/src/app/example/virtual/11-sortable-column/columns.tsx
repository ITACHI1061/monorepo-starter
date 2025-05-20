'use client';

import { cn } from '@monorepo-starter/ui/lib/utils';
import {
  closestCenter,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useVirtualizer } from '@tanstack/react-virtual';
import { GripIcon, XIcon } from 'lucide-react';
import { ComponentProps, Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

type Data = {
  id: string;
  text: string;
};

export default function FixedRowPage({ rows: initialRows }: { rows: Data[] }) {
  const parentRef = useRef<HTMLDivElement>(null);
  const [rows, setRows] = useState<Data[]>([]);
  const [activeId, setActiveId] = useState<Data['id'] | null>(null);

  const rowVirtualizer = useVirtualizer({
    horizontal: true,
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: (index) => rows[index]!.text.length * 11,
    overscan: 5,
  });

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
    setActiveId(active.id as Data['id']);
  };

  const handleDragEnd: ComponentProps<typeof DndContext>['onDragEnd'] = ({ active, over }) => {
    if (active.id !== over?.id) {
      const oldIndex = rows.findIndex((row) => row.id === active.id);
      const newIndex = rows.findIndex((row) => row.id === over?.id);
      setRows(arrayMove(rows, oldIndex, newIndex));
    }

    setActiveId(null);
  };

  useEffect(() => {
    setRows(initialRows);
  }, [initialRows]);

  return (
    <div className="size-full">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div ref={parentRef} className="w-250 h-40 overflow-auto border shadow-lg">
          <div
            className="relative flex h-full items-center justify-start"
            style={{
              width: `${rowVirtualizer.getTotalSize()}px`,
            }}
          >
            <SortableContext items={rows.map((row) => row.id)} strategy={horizontalListSortingStrategy}>
              {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                return (
                  <div
                    key={virtualRow.index}
                    className="absolute left-0 top-0 h-full border-b border-r"
                    style={{
                      width: `${virtualRow.size}px`,
                      transform: `translateX(${virtualRow.start}px)`,
                    }}
                  >
                    <SortableItem key={virtualRow.index} id={rows[virtualRow.index]!.id} setItems={setRows}>
                      {rows[virtualRow.index]!.text}
                    </SortableItem>
                  </div>
                );
              })}
            </SortableContext>
          </div>
        </div>
        <DragOverlay>
          {activeId ? (
            <SortableItem id={activeId + '-drag-overlay'} isDragOverlay setItems={setRows}>
              {rows.find((row) => row.id === activeId)?.text}
            </SortableItem>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}

// 반드시 분리해야 됨
// isDragging: 현재 드래그중인 요소
function SortableItem({
  id,
  isDragOverlay = false,
  setItems,
  children,
}: {
  id: string;
  isDragOverlay?: boolean;
  setItems: Dispatch<SetStateAction<Data[]>>;
  children?: React.ReactNode;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging, isSorting } = useSortable({
    id,
  });

  const style = {
    transition,
    zIndex: isDragging ? 50 : 'auto',
    transform: !isDragOverlay ? CSS.Transform.toString(transform) : undefined,
  };

  return (
    <div
      key={id}
      ref={setNodeRef}
      className={cn(
        'flex h-full w-full items-center gap-4 truncate p-2',
        isDragging && 'opacity-30',
        isDragOverlay && 'border-blue-300 bg-blue-100 shadow-2xl',
        isSorting && 'cursor-grabbing',
      )}
      style={style}
      {...attributes}
      {...listeners}
    >
      <div className="cursor-grab">
        <GripIcon className="size-4" />
      </div>
      {children}
      <div
        className="ml-auto cursor-pointer"
        onClick={() => setItems((items) => items.filter((item) => item.id !== id))}
      >
        <XIcon className="size-4" />
      </div>
    </div>
  );
}
