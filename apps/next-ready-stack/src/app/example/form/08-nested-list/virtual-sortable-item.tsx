'use client';

import { cn } from '@monorepo-starter/ui/lib/utils';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVerticalIcon } from 'lucide-react';

export default function SortableItem({
  id,
  children,
  className,
}: {
  id: string;
  children?: React.ReactNode;
  className?: string;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging, isSorting } = useSortable({
    id,
  });

  const style = {
    transition,
    zIndex: isDragging ? 50 : 'auto',
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
      key={id}
      ref={setNodeRef}
      className={cn(
        'flex w-full items-center gap-4 rounded-md border border-gray-200 p-2 shadow-md',
        isDragging && 'bg-gray-200/40 opacity-50',
        isSorting && 'cursor-grabbing',
        className,
      )}
      style={style}
    >
      <div className="cursor-grab" {...attributes} {...listeners}>
        <GripVerticalIcon className="size-4" />
      </div>
      {children}
    </div>
  );
}
