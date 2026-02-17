import React, { useState, useEffect, useMemo } from 'react';
import { Cloud, CloudRain, Sun, CloudLightning, Thermometer, Wind } from 'lucide-react';
import { WidgetCard } from './WidgetCard';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
export function WeatherWidget() {
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [conditionIndex, setConditionIndex] = useState(0);
  const weatherConditions = useMemo(() => [
    {
      temp: 22,
      condition: 'Clear Skies',
      icon: Sun,
      color: 'from-yellow-400 to-orange-500',
      glow: 'bg-yellow-500/20'
    },
    {
      temp: 18,
      condition: 'Overcast',
      icon: Cloud,
      color: 'from-slate-400 to-slate-600',
      glow: 'bg-slate-500/20'
    },
    {
      temp: 16,
      condition: 'Rainy',
      icon: CloudRain,
      color: 'from-blue-400 to-indigo-600',
      glow: 'bg-blue-500/20'
    },
    {
      temp: 15,
      condition: 'Thunderstorm',
      icon: CloudLightning,
      color: 'from-purple-500 to-indigo-800',
      glow: 'bg-purple-500/20'
    }
  ], []);
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date());
      setConditionIndex(prev => (prev + 1) % weatherConditions.length);
    }, 60000);
    return () => clearInterval(interval);
  }, [weatherConditions.length]);
  const current = weatherConditions[conditionIndex];
  return (
    <WidgetCard
      title="Weather"
      icon={<Sun className="w-4 h-4" />}
      actions={
        <span className="text-[10px] text-white/30 font-medium">
          Updated {format(lastUpdated, 'HH:mm')}
        </span>
      }
    >
      <div className="flex flex-col h-full justify-between">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-5xl font-light text-white tracking-tighter">
                {current.temp}
              </span>
              <span className="text-2xl font-light text-blue-400">°C</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-white/60 mt-2 font-medium">
              <Thermometer className="w-3 h-3 text-white/40" />
              {current.condition}
            </div>
            <div className="text-xs text-white/40 uppercase tracking-widest mt-1 font-bold">
              San Francisco, CA
            </div>
          </div>
          <div className="relative">
            <div className={cn("absolute inset-0 blur-2xl rounded-full animate-pulse", current.glow)} />
            <div className={cn(
              "relative bg-gradient-to-br p-4 rounded-3xl shadow-xl transform hover:scale-110 transition-all duration-500",
              current.color
            )}>
              {React.createElement(current.icon, { className: "w-8 h-8 text-white animate-float" })}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/5">
            <Wind className="w-4 h-4 text-white/40" />
            <div className="flex flex-col">
              <span className="text-[9px] text-white/30 uppercase font-bold tracking-wider">Wind</span>
              <span className="text-xs text-white font-bold">12 km/h</span>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/5">
            <CloudRain className="w-4 h-4 text-white/40" />
            <div className="flex flex-col">
              <span className="text-[9px] text-white/30 uppercase font-bold tracking-wider">Humid</span>
              <span className="text-xs text-white font-bold">64%</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-8 pt-5 border-t border-white/10">
          {[
            { day: 'Tue', temp: 24, icon: Sun },
            { day: 'Wed', temp: 19, icon: CloudRain },
            { day: 'Thu', temp: 21, icon: Cloud },
          ].map((f, i) => (
            <div key={i} className="flex flex-col items-center group/forecast">
              <span className="text-[10px] text-white/30 uppercase mb-2 font-black tracking-widest group-hover/forecast:text-white/50 transition-colors">
                {f.day}
              </span>
              {React.createElement(f.icon, { className: "w-5 h-5 text-white/60 mb-2 group-hover/forecast:text-white group-hover/forecast:scale-110 transition-all" })}
              <span className="text-sm text-white font-bold">{f.temp}°</span>
            </div>
          ))}
        </div>
      </div>
    </WidgetCard>
  );
}