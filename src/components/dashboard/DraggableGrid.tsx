import React, { useMemo, useCallback } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import { useDashboardStore } from '@/store/useDashboardStore';
import type { WidgetType } from '@shared/types';
interface DraggableGridProps {
  children: React.ReactNode;
  items: WidgetType[];
}
export function DraggableGrid({ children, items }: DraggableGridProps) {
  const setWidgetOrder = useDashboardStore((s) => s.setWidgetOrder);
  const saveSettings = useDashboardStore((s) => s.saveSettings);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = items.indexOf(active.id as WidgetType);
      const newIndex = items.indexOf(over.id as WidgetType);
      if (oldIndex !== -1 && newIndex !== -1) {
        const newOrder = arrayMove(items, oldIndex, newIndex);
        setWidgetOrder(newOrder);
        // Defer saving to avoid state updates during render cycles
        setTimeout(() => {
          saveSettings();
        }, 0);
      }
    }
  }, [items, setWidgetOrder, saveSettings]);
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items} strategy={rectSortingStrategy}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {children}
        </div>
      </SortableContext>
    </DndContext>
  );
}