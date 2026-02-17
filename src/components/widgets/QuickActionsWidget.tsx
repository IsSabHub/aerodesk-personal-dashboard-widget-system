import React from 'react';
import { Plus, Search, Settings, Calendar, Bell, Shield } from 'lucide-react';
import { WidgetCard } from './WidgetCard';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
export function QuickActionsWidget() {
  const actions = [
    { label: 'New Note', icon: Plus, color: 'text-blue-400', bg: 'bg-blue-500/10' },
    { label: 'Search', icon: Search, color: 'text-purple-400', bg: 'bg-purple-500/10' },
    { label: 'Events', icon: Calendar, color: 'text-orange-400', bg: 'bg-orange-500/10' },
    { label: 'Privacy', icon: Shield, color: 'text-green-400', bg: 'bg-green-500/10' },
  ];
  return (
    <WidgetCard title="Quick Actions" icon={<Settings className="w-4 h-4" />}>
      <div className="grid grid-cols-2 gap-4 h-full">
        {actions.map((action, i) => (
          <motion.button
            key={i}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
              "flex flex-col items-center justify-center gap-3 p-4 rounded-[2rem]",
              "border border-white/5 transition-colors group relative overflow-hidden",
              "bg-white/5 hover:bg-white/10"
            )}
          >
            <div className={cn("p-3 rounded-2xl transition-transform duration-300 group-hover:scale-110", action.bg, action.color)}>
              {React.createElement(action.icon, { className: "w-5 h-5" })}
            </div>
            <span className="text-[10px] font-bold text-white/50 group-hover:text-white uppercase tracking-widest transition-colors">
              {action.label}
            </span>
            {/* Subtle glow effect on hover */}
            <div className={cn(
              "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none blur-xl -z-10",
              action.bg
            )} />
          </motion.button>
        ))}
      </div>
      <div className="mt-6 p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell className="w-3.5 h-3.5 text-white/30" />
          <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Notifications</span>
        </div>
        <div className="px-2 py-0.5 rounded-full bg-blue-500 text-[10px] font-black text-white">2</div>
      </div>
    </WidgetCard>
  );
}