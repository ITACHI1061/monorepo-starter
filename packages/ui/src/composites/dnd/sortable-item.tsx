import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { cn } from '@monorepo-starter/ui/lib/utils';
import { GripHorizontalIcon, GripVerticalIcon } from 'lucide-react';

export function SortableItem({
  id,
  isHorizontal = false,
  isDragOverlay = false,
  useGrip = true,
  classNames,
  children,
}: {
  id: string;
  isHorizontal?: boolean;
  isDragOverlay?: boolean;
  useGrip?: boolean;
  classNames?: Partial<{
    base: string;
    dragOverlay: string;
    dragging: string;
    sorting: string;
  }>;
  children: React.ReactNode;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging, isSorting } = useSortable({
    id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const className = cn(
    `scale-none`,
    classNames?.base,
    isDragging && cn(`opacity-50`, classNames?.dragging),
    isDragOverlay && cn(`border-blue-300 bg-blue-100 scale-105`, classNames?.dragOverlay),
    isSorting && cn(`cursor-grabbing`, classNames?.sorting),
  );

  if (!useGrip) {
    return (
      <div ref={setNodeRef} style={style} className={className} {...attributes} {...listeners}>
        {children}
      </div>
    );
  }

  return (
    <div ref={setNodeRef} className={className} style={style}>
      <div className="cursor-grab" {...attributes} {...listeners}>
        {isHorizontal ? <GripHorizontalIcon className="size-4" /> : <GripVerticalIcon className="size-4" />}
      </div>
      <div>{children}</div>
    </div>
  );
}
