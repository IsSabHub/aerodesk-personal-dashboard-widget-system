import React, { useState, useEffect } from 'react';
import { Cloud, CloudRain, Sun, CloudLightning, Thermometer } from 'lucide-react';
import { WidgetCard } from './WidgetCard';
import { format } from 'date-fns';
export function WeatherWidget() {
  const [lastUpdated, setLastUpdated] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 60000);
    return () => clearInterval(interval);
  }, []);
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
                {weather.temp}
              </span>
              <span className="text-2xl font-light text-blue-400">°C</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-white/60 mt-2 font-medium">
              <Thermometer className="w-3 h-3 text-white/40" />
              {weather.condition}
            </div>
            <div className="text-xs text-white/40 uppercase tracking-widest mt-1 font-bold">
              {weather.location}
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-yellow-500/20 blur-2xl rounded-full animate-pulse" />
            <div className="relative bg-gradient-to-br from-yellow-400 to-orange-500 p-4 rounded-3xl shadow-xl shadow-orange-500/20 transform hover:scale-110 transition-transform duration-500">
              <Cloud className="w-8 h-8 text-white animate-float" />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-8 pt-5 border-t border-white/10">
          {weather.forecast.map((f, i) => (
            <div key={i} className="flex flex-col items-center group/forecast">
              <span className="text-[10px] text-white/30 uppercase mb-2 font-black tracking-widest group-hover/forecast:text-white/50 transition-colors">
                {f.day}
              </span>
              <f.icon className="w-5 h-5 text-white/60 mb-2 group-hover/forecast:text-white group-hover/forecast:scale-110 transition-all" />
              <span className="text-sm text-white font-bold">{f.temp}°</span>
            </div>
          ))}
        </div>
      </div>
    </WidgetCard>
  );
}