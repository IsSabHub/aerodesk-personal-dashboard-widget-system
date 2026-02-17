import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';
import { WidgetCard } from './WidgetCard';
import { cn } from '@/lib/utils';
export function StockWidget() {
  const [markets, setMarkets] = useState([
    { symbol: 'S&P 500', value: 5241.53, change: 0.85, up: true },
    { symbol: 'NASDAQ', value: 16428.82, change: 1.12, up: true },
    { symbol: 'AAPL', value: 172.62, change: -0.45, up: false },
    { symbol: 'TSLA', value: 170.83, change: -1.20, up: false },
  ]);
  useEffect(() => {
    const interval = setInterval(() => {
      setMarkets(prev => prev.map(m => {
        const fluctuation = (Math.random() - 0.5) * 0.1;
        const newValue = m.value + fluctuation;
        const newChange = m.change + (fluctuation / m.value) * 100;
        return {
          ...m,
          value: newValue,
          change: newChange,
          up: newChange >= 0
        };
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  return (
    <WidgetCard 
      title="Market Watch" 
      icon={<Activity className="w-4 h-4" />}
      actions={
        <div className="flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-[10px] font-bold text-white/40 uppercase tracking-tighter">Live</span>
        </div>
      }
    >
      <div className="space-y-3">
        {markets.map((m, i) => (
          <div key={i} className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/5 group hover:bg-white/10 transition-colors">
            <div>
              <div className="text-xs font-bold text-white tracking-wide">{m.symbol}</div>
              <div className="text-[10px] text-white/40 mt-0.5 tabular-nums">
                {m.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
            </div>
            <div className={cn(
              "flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-all duration-500",
              m.up ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
            )}>
              {m.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              <span className="text-[10px] font-bold tabular-nums">
                {m.change > 0 ? '+' : ''}{m.change.toFixed(2)}%
              </span>
            </div>
          </div>
        ))}
        {/* Simple Sparkline simulation */}
        <div className="mt-4 h-8 w-full opacity-20 group-hover:opacity-40 transition-opacity">
          <svg className="w-full h-full" viewBox="0 0 100 20" preserveAspectRatio="none">
            <path
              d="M0 15 Q 10 5, 20 12 T 40 8 T 60 15 T 80 5 T 100 10"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-blue-400"
            />
          </svg>
        </div>
      </div>
    </WidgetCard>
  );
}