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
      "relative group flex flex-col h-full min-h-[200px] overflow-hidden rounded-[2.5rem]",
      "border border-white/10 bg-white/5 backdrop-blur-2xl shadow-glass transition-all duration-500",
      "hover:bg-white/[0.08] hover:border-white/20 hover:shadow-glow",
      isEditMode && "ring-2 ring-blue-500/30 ring-offset-4 ring-offset-[#0f172a]",
      className
    )}>
      {/* Glossy Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none opacity-50" />
      {/* Header */}
      <div className="relative z-10 flex items-center justify-between px-6 py-5 border-b border-white/5">
        <div className="flex items-center gap-3">
          {icon && (
            <div className="p-2 rounded-xl bg-white/5 text-white/70 group-hover:text-white transition-colors">
              {icon}
            </div>
          )}
          <h3 className="text-[11px] font-black tracking-[0.15em] text-white/80 uppercase">
            {title}
          </h3>
        </div>
        {actions && (
          <div className="flex items-center gap-2 relative z-20">
            {actions}
          </div>
        )}
      </div>
      {/* Content */}
      <div className={cn(
        "relative z-10 flex-1 p-6 overflow-auto custom-scrollbar",
        isEditMode && "pointer-events-none select-none grayscale-[0.5] opacity-50"
      )}>
        {children}
      </div>
      {/* Edit Mode Overlay */}
      {isEditMode && (
        <div className="absolute inset-0 bg-blue-500/5 backdrop-grayscale-[0.2] pointer-events-none transition-all duration-300" />
      )}
    </div>
  );
}