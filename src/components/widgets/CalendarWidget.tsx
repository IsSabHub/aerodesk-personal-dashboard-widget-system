import React from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, startOfWeek, endOfWeek } from 'date-fns';
import { Calendar as CalendarIcon, Clock } from 'lucide-react';
import { WidgetCard } from './WidgetCard';
import { cn } from '@/lib/utils';
export function CalendarWidget() {
  const today = new Date();
  const monthStart = startOfMonth(today);
  const monthEnd = endOfMonth(today);
  const calendarDays = eachDayOfInterval({
    start: startOfWeek(monthStart),
    end: endOfWeek(monthEnd),
  });
  const events = [
    { id: 'ev-1', title: 'Project Review', time: '14:00' },
    { id: 'ev-2', title: 'Design Sync', time: '16:30' },
  ];
  const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  return (
    <WidgetCard title="Calendar" icon={<CalendarIcon className="w-4 h-4" />}>
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-lg font-semibold text-white">
            {format(today, 'MMMM yyyy')}
          </span>
        </div>
        <div className="grid grid-cols-7 gap-y-2 text-center">
          {weekDays.map((day, idx) => (
            <span 
              key={`weekday-${day}-${idx}`} 
              className="text-[10px] font-bold text-white/30"
            >
              {day}
            </span>
          ))}
          {calendarDays.map((day) => {
            const dateKey = format(day, 'yyyy-MM-dd');
            const isToday = isSameDay(day, today);
            const isCurrentMonth = format(day, 'M') === format(today, 'M');
            return (
              <div key={`day-${dateKey}`} className="flex justify-center">
                <div className={cn(
                  "w-7 h-7 flex items-center justify-center text-xs rounded-full transition-all duration-200",
                  !isToday && "text-white/60 hover:bg-white/10 hover:text-white",
                  isToday && "bg-blue-500 text-white font-bold shadow-lg shadow-blue-500/30 scale-110",
                  !isCurrentMonth && "opacity-20"
                )}>
                  {format(day, 'd')}
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-4 pt-4 border-t border-white/5 space-y-2">
          {events.map((event) => (
            <div 
              key={event.id} 
              className="group/event flex items-center justify-between p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-200 cursor-pointer"
            >
              <span className="text-xs text-white/80 font-medium truncate max-w-[120px] group-hover/event:text-white">
                {event.title}
              </span>
              <div className="flex items-center gap-1 text-[10px] text-white/40 group-hover/event:text-white/60">
                <Clock className="w-3 h-3" />
                {event.time}
              </div>
            </div>
          ))}
        </div>
      </div>
    </WidgetCard>
  );
}