import React, { useState, useEffect } from 'react';
import { Cpu, HardDrive, Network, Zap } from 'lucide-react';
import { WidgetCard } from './WidgetCard';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { AreaChart, Area, ResponsiveContainer, YAxis } from 'recharts';
export function SystemWidget() {
  const [hasMounted, setHasMounted] = useState(false);
  const [metrics, setMetrics] = useState({
    cpu: 42,
    ram: 68,
    network: 12.4,
    temp: 45
  });
  const [history, setHistory] = useState(
    Array.from({ length: 20 }, (_, i) => ({ time: i, cpu: 40, ram: 60 }))
  );
  useEffect(() => {
    setHasMounted(true);
    const interval = setInterval(() => {
      setMetrics(prev => {
        const nextCpu = Math.max(10, Math.min(95, prev.cpu + (Math.random() - 0.5) * 15));
        const nextRam = Math.max(40, Math.min(90, prev.ram + (Math.random() - 0.5) * 2));
        const nextNetwork = Math.max(1, Math.min(100, prev.network + (Math.random() - 0.5) * 10));
        const nextTemp = Math.max(30, Math.min(80, prev.temp + (Math.random() - 0.5) * 4));
        setHistory(h => [...h.slice(1), { time: Date.now(), cpu: nextCpu, ram: nextRam }]);
        return {
          cpu: nextCpu,
          ram: nextRam,
          network: nextNetwork,
          temp: nextTemp
        };
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);
  const MetricRow = ({ icon: Icon, label, value, unit, colorClass, percent }: any) => (
    <div className="space-y-2 group/metric">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon className={cn("w-3.5 h-3.5", colorClass)} />
          <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{label}</span>
        </div>
        <span className="text-xs font-mono font-bold text-white/80">
          {value.toFixed(1)}{unit}
        </span>
      </div>
      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ type: "spring", stiffness: 50, damping: 15 }}
          className={cn("h-full rounded-full", colorClass.replace('text-', 'bg-'))}
        />
      </div>
    </div>
  );
  return (
    <WidgetCard
      title="System Status"
      icon={<Cpu className="w-4 h-4" />}
      actions={
        <div className="flex items-center gap-1">
          <Zap className="w-3 h-3 text-yellow-400 fill-yellow-400 animate-pulse" />
          <span className="text-[9px] font-black text-yellow-400 uppercase tracking-tighter">Live Monitor</span>
        </div>
      }
    >
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-[2rem] bg-white/5 border border-white/5 flex flex-col items-center justify-center text-center">
            <span className="text-[10px] font-bold text-white/30 uppercase mb-1">CPU Load</span>
            <span className="text-2xl font-black text-white tabular-nums">{Math.round(metrics.cpu)}%</span>
          </div>
          <div className="p-4 rounded-[2rem] bg-white/5 border border-white/5 flex flex-col items-center justify-center text-center">
            <span className="text-[10px] font-bold text-white/30 uppercase mb-1">Memory</span>
            <span className="text-2xl font-black text-white tabular-nums">{Math.round(metrics.ram)}%</span>
          </div>
        </div>
        <div className="h-16 w-full opacity-50">
          {hasMounted ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={history}>
                <Area type="monotone" dataKey="cpu" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.1} strokeWidth={2} isAnimationActive={false} />
                <Area type="monotone" dataKey="ram" stroke="#a855f7" fill="#a855f7" fillOpacity={0.1} strokeWidth={2} isAnimationActive={false} />
                <YAxis domain={[0, 100]} hide />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="w-full h-full bg-white/5 rounded animate-pulse" />
          )}
        </div>
        <div className="space-y-4 px-1">
          <MetricRow icon={Network} label="Network" value={metrics.network} unit=" Mb/s" colorClass="text-blue-400" percent={metrics.network} />
          <MetricRow icon={HardDrive} label="Storage" value={72} unit="%" colorClass="text-purple-400" percent={72} />
        </div>
        <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[10px] text-white/30 font-bold uppercase tracking-widest">
          <span>Uptime: 4d 12h</span>
          <span className={cn(metrics.temp > 70 ? "text-red-400" : "text-green-400")}>{Math.round(metrics.temp)}°C</span>
        </div>
      </div>
    </WidgetCard>
  );
}