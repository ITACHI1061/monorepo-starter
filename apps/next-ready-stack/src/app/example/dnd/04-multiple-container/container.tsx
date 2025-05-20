'use client';

import { ScrollArea } from '@monorepo-starter/ui/components/scroll-area';
import { SortableItem } from '@monorepo-starter/ui/composites/dnd/sortable-item';
import { cn } from '@monorepo-starter/ui/lib/utils';
import { devLog } from '@monorepo-starter/utils/console';
import { closestCenter, DndContext, DragOverlay } from '@dnd-kit/core';
import { arrayMove, SortableContext } from '@dnd-kit/sortable';
import { ComponentProps, useEffect, useState } from 'react';
import { useImmer } from 'use-immer';

type SortableItem = {
  id: string;
  name: string;
};

const containerKeys = ['A', 'B', 'C'] as const;

type ContainerKeys = (typeof containerKeys)[number];

type ContainerData = {
  [key in ContainerKeys]: SortableItem[];
};

export function Container({ data: initialData }: { data: ContainerData }) {
  // 컨테이너별로 아이템 리스트를 객체 형태로 관리
  // 예: { A: [...], B: [...], C: [...] }
  const [containers, setContainers] = useImmer<ContainerData | null>(null);

  // 현재 드래그 중인 아이템 상태
  const [activeItem, setActiveItem] = useState<SortableItem | null>(null);

  // 공통 스타일
  const itemBaseClassName = cn(`p-2 border rounded-md shadow-sm w-80 truncate flex items-center gap-2 text-xs`);

  // 주어진 아이템 id가 어느 컨테이너에 속하는지 찾아 반환하는 함수
  const findContainerKey = (id: string) => {
    if (!containers) return null;
    return containerKeys.find((key) => (containers[key] ?? []).some((item) => item.id === id));
  };

  // 드래그 시작 시 호출되는 핸들러
  // 드래그 중인 아이템을 activeItem 상태에 저장
  const handleDragStart: ComponentProps<typeof DndContext>['onDragStart'] = (event) => {
    if (!containers) return;
    const { active } = event;
    const containerKey = findContainerKey(active.id as string);
    if (containerKey && containers[containerKey]) {
      const item = containers[containerKey].find((item) => item.id === active.id);
      setActiveItem(item || null);
    }
  };

  // 드래그 중인 아이템이 컨테이너 위에 있을 때 호출되는 핸들러
  const handleDragOver: ComponentProps<typeof DndContext>['onDragOver'] = (event) => {
    const activeId = event.active.id; // 현재 선택된 요소
    const overId = event.over?.id; // 현재 마우스가 올라간 요소
    const containerKey = findContainerKey(activeId as string);

    devLog('info', 'onDragOver', overId, activeId, containerKey);
  };

  // 드래그 종료 시 호출되는 핸들러
  // 아이템을 같은 컨테이너 내에서 이동하거나, 다른 컨테이너로 옮김
  const handleDragEnd: ComponentProps<typeof DndContext>['onDragEnd'] = (event) => {
    if (!containers) return;

    const { active, over } = event;
    if (!over) {
      setActiveItem(null);
      return;
    }

    // 출발 컨테이너와 도착 컨테이너의 key를 찾음
    const fromKey = findContainerKey(active.id as string);
    // over.id가 컨테이너 id인지, 아이템 id인지 구분
    const toKey = containerKeys.includes(over.id as ContainerKeys)
      ? (over.id as ContainerKeys)
      : findContainerKey(over.id as string);

    // 유효성 검사: 컨테이너가 없으면 종료
    if (!fromKey || !toKey || !containers[fromKey] || !containers[toKey]) {
      setActiveItem(null);
      return;
    }

    // 같은 컨테이너 내에서 아이템 순서 변경
    if (fromKey === toKey) {
      const oldIndex = containers[fromKey].findIndex((item) => item.id === active.id);
      const newIndex = containers[toKey].findIndex((item) => item.id === over.id);
      if (oldIndex !== -1 && newIndex !== -1) {
        setContainers((prev) => ({
          ...prev,
          [fromKey]: arrayMove(prev?.[fromKey] ?? [], oldIndex, newIndex),
        }));
      }
    } else {
      // 다른 컨테이너로 아이템 이동
      const fromItems = containers[fromKey];
      const toItems = containers[toKey];
      const movingItem = fromItems.find((item) => item.id === active.id);
      if (!movingItem) {
        setActiveItem(null);
        return;
      }

      // 출발 컨테이너에서 아이템 제거
      const newFromItems = fromItems.filter((item) => item.id !== active.id);
      // 도착 컨테이너에서 삽입 위치 결정
      // over.id가 컨테이너 id면 맨 뒤에, 아니면 해당 위치에 삽입
      const overIndex = toItems.findIndex((item) => item.id === over.id);
      const insertIndex = containerKeys.includes(over.id as ContainerKeys)
        ? toItems.length
        : overIndex === -1
          ? toItems.length
          : overIndex;

      devLog('info', overIndex, insertIndex);

      // 새로운 도착 컨테이너 리스트 생성
      const newToItems = [...toItems.slice(0, insertIndex), movingItem, ...toItems.slice(insertIndex)];
      setContainers((prev) => ({
        ...prev,
        [fromKey]: newFromItems,
        [toKey]: newToItems,
      }));
    }
    setActiveItem(null);
  };

  useEffect(() => {
    setContainers(initialData);
  }, [initialData]);

  return (
    <div className="w-full">
      <h1>Multiple Container</h1>
      <DndContext
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="flex w-full justify-between gap-4">
          {containerKeys.map((key) => (
            <div key={key} className="rounded-md border shadow-lg">
              <div className="bg-muted text-muted-foreground px-4 py-2 text-sm font-medium">Container {key}</div>
              <ScrollArea id={key} className="h-120 flex-1 rounded-md rounded-t-none p-3">
                {containers && (
                  <SortableContext items={(containers[key] ?? []).map((item) => item.id)} disabled={!containers}>
                    <div className="flex flex-col gap-2">
                      {/* 각 아이템 렌더링 */}
                      {(containers[key] ?? []).map((item) => (
                        <SortableItem key={item.id} id={item.id} useGrip classNames={{ base: itemBaseClassName }}>
                          {item.name}
                        </SortableItem>
                      ))}
                    </div>
                  </SortableContext>
                )}
              </ScrollArea>
            </div>
          ))}
        </div>
        <DragOverlay>
          {activeItem ? (
            <SortableItem
              key={activeItem.id}
              id={activeItem.id}
              useGrip
              isDragOverlay
              classNames={{ base: itemBaseClassName }}
            >
              {activeItem.name}
            </SortableItem>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
