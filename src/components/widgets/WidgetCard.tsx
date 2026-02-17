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
      "relative group flex flex-col h-full min-h-[220px] overflow-hidden rounded-[2.5rem]",
      "border border-white/10 bg-white/5 backdrop-blur-2xl shadow-glass transition-all duration-500",
      "hover:bg-white/[0.08] hover:border-white/20 hover:shadow-glow",
      "before:absolute before:inset-0 before:p-[1px] before:rounded-[2.5rem] before:bg-gradient-to-br before:from-white/20 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:pointer-events-none",
      isEditMode && "ring-2 ring-blue-500/30 ring-offset-4 ring-offset-[#0f172a]",
      className
    )}>
      {/* Glossy Reflection Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none opacity-30 group-hover:opacity-50 transition-opacity duration-700" />
      {/* Shimmer Border Effect (Animated on Hover) */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500">
        <div className="absolute inset-0 bg-[length:200%_100%] animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>
      {/* Header */}
      <div className="relative z-10 flex items-center justify-between px-6 py-5 border-b border-white/5 bg-white/[0.02]">
        <div className="flex items-center gap-3">
          {icon && (
            <div className="p-2 rounded-xl bg-white/5 text-white/70 group-hover:text-white transition-colors glass-light">
              {icon}
            </div>
          )}
          <h3 className="text-[11px] font-black tracking-[0.2em] text-white/60 group-hover:text-white/90 uppercase transition-colors">
            {title}
          </h3>
        </div>
        {actions && (
          <div className="flex items-center gap-2 relative z-20">
            {actions}
          </div>
        )}
      </div>
      {/* Content Area */}
      <div className={cn(
        "relative z-10 flex-1 p-6 overflow-y-auto custom-scrollbar-refined",
        isEditMode && "pointer-events-none select-none grayscale-[0.5] opacity-50"
      )}>
        {children}
      </div>
      {/* Edit Mode Overlay */}
      {isEditMode && (
        <div className="absolute inset-0 bg-blue-500/10 backdrop-blur-sm pointer-events-none transition-all duration-300 z-30 flex items-center justify-center">
          <div className="px-4 py-2 rounded-full bg-blue-500 text-white text-xs font-bold shadow-lg">
            DRAG TO REORDER
          </div>
        </div>
      )}
      <style jsx global>{`
        .custom-scrollbar-refined::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar-refined::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
          margin: 10px;
          border-radius: 10px;
        }
        .custom-scrollbar-refined::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar-refined::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
        .glass-light {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </div>
  );
}