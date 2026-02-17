import React from 'react';
import { Cloud, CloudRain, Sun, CloudLightning } from 'lucide-react';
import { WidgetCard } from './WidgetCard';
export function WeatherWidget() {
  // Mock data
  const weather = {
    temp: 22,
    condition: 'Partly Cloudy',
    location: 'San Francisco',
    forecast: [
      { day: 'Tue', temp: 24, icon: Sun },
      { day: 'Wed', temp: 19, icon: CloudRain },
      { day: 'Thu', temp: 21, icon: Cloud },
    ]
  };
  return (
    <WidgetCard title="Weather" icon={<Sun className="w-4 h-4" />}>
      <div className="flex flex-col h-full justify-between">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-5xl font-light text-white tracking-tighter">
              {weather.temp}°
            </div>
            <div className="text-sm text-white/60 mt-1 font-medium">
              {weather.condition}
            </div>
            <div className="text-xs text-white/40 uppercase tracking-widest mt-0.5">
              {weather.location}
            </div>
          </div>
          <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-3 rounded-2xl shadow-lg shadow-orange-500/20">
            <Cloud className="w-8 h-8 text-white" />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 mt-6 pt-4 border-t border-white/5">
          {weather.forecast.map((f, i) => (
            <div key={i} className="flex flex-col items-center">
              <span className="text-[10px] text-white/40 uppercase mb-1 font-bold">{f.day}</span>
              <f.icon className="w-4 h-4 text-white/70 mb-1" />
              <span className="text-xs text-white/90 font-medium">{f.temp}°</span>
            </div>
          ))}
        </div>
      </div>
    </WidgetCard>
  );
}