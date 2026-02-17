import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { motion } from 'framer-motion';
import { GripVertical } from 'lucide-react';
import { useDashboardStore } from '@/store/useDashboardStore';
import { cn } from '@/lib/utils';
interface SortableWidgetProps {
  id: string;
  children: React.ReactNode;
}
export function SortableWidget({ id, children }: SortableWidgetProps) {
  const isEditMode = useDashboardStore((s) => s.isEditMode);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });
  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 0,
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "relative h-full transition-shadow",
        isDragging && "shadow-2xl ring-2 ring-blue-500/50 rounded-3xl"
      )}
    >
      <motion.div
        layout
        initial={false}
        animate={{
          scale: isDragging ? 1.02 : 1,
          opacity: isDragging ? 0.8 : 1,
        }}
        className="h-full"
      >
        {isEditMode && (
          <div
            {...attributes}
            {...listeners}
            className="absolute top-4 left-4 z-50 p-2 cursor-grab active:cursor-grabbing bg-white/10 backdrop-blur-md rounded-lg border border-white/10 hover:bg-white/20 transition-colors"
          >
            <GripVertical className="w-4 h-4 text-white/70" />
          </div>
        )}
        <div className={cn(
          "h-full transition-all duration-300",
          isEditMode && "ring-2 ring-dashed ring-white/20 rounded-3xl p-1"
        )}>
          {children}
        </div>
      </motion.div>
    </div>
  );
}