import React from 'react';
import { cn } from '@/lib/utils';
import { useDashboardStore } from '@/store/useDashboardStore';
interface WidgetCardProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  actions?: React.ReactNode;
}
export function WidgetCard({ title, icon, children, className, actions }: WidgetCardProps) {
  const isEditMode = useDashboardStore((s) => s.isEditMode);
  return (
    <div className={cn(
      "relative group flex flex-col h-full min-h-[200px] overflow-hidden rounded-3xl",
      "border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl transition-all duration-300 hover:bg-white/10 hover:border-white/20",
      isEditMode && "ring-1 ring-blue-500/20",
      className
    )}>
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
        <div className="flex items-center gap-2.5">
          {icon && <div className="text-white/70">{icon}</div>}
          <h3 className="text-sm font-semibold tracking-wide text-white/90 uppercase">{title}</h3>
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
      {/* Content */}
      <div className={cn(
        "flex-1 p-5 overflow-auto custom-scrollbar",
        isEditMode && "pointer-events-none select-none"
      )}>
        {children}
      </div>
      {/* Edit Mode Overlay */}
      {isEditMode && (
        <div className="absolute inset-0 bg-blue-500/5 pointer-events-none" />
      )}
    </div>
  );
}