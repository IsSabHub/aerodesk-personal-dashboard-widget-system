import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';
import { WidgetCard } from './WidgetCard';
import { cn } from '@/lib/utils';
import { LineChart, Line, ResponsiveContainer, YAxis, Area, AreaChart } from 'recharts';
interface StockData {
  symbol: string;
  value: number;
  change: number;
  up: boolean;
  history: { time: number; price: number }[];
}
export function StockWidget() {
  const [markets, setMarkets] = useState<StockData[]>([
    { symbol: 'S&P 500', value: 5241.53, change: 0.85, up: true, history: Array.from({ length: 15 }, (_, i) => ({ time: i, price: 5241.53 })) },
    { symbol: 'NASDAQ', value: 16428.82, change: 1.12, up: true, history: Array.from({ length: 15 }, (_, i) => ({ time: i, price: 16428.82 })) },
    { symbol: 'AAPL', value: 172.62, change: -0.45, up: false, history: Array.from({ length: 15 }, (_, i) => ({ time: i, price: 172.62 })) },
  ]);
  useEffect(() => {
    const interval = setInterval(() => {
      setMarkets(prev => prev.map(m => {
        const fluctuation = (Math.random() - 0.5) * 2.0;
        const newValue = m.value + fluctuation;
        const newHistory = [...m.history.slice(1), { time: Date.now(), price: newValue }];
        const initialPrice = m.history[0].price;
        const newChange = ((newValue - initialPrice) / initialPrice) * 100;
        return {
          ...m,
          value: newValue,
          change: newChange,
          up: newValue >= initialPrice,
          history: newHistory
        };
      }));
    }, 3000);
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
      <div className="space-y-4">
        {markets.map((m) => (
          <div key={m.symbol} className="space-y-2">
            <div className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/5 group hover:bg-white/10 transition-colors">
              <div className="flex-1">
                <div className="text-xs font-bold text-white tracking-wide">{m.symbol}</div>
                <div className="text-[10px] text-white/40 mt-0.5 tabular-nums">
                  {m.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
              </div>
              <div className="h-8 w-24 mx-2">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={m.history}>
                    <defs>
                      <linearGradient id={`gradient-${m.symbol}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={m.up ? "#4ade80" : "#f87171"} stopOpacity={0.3}/>
                        <stop offset="95%" stopColor={m.up ? "#4ade80" : "#f87171"} stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <Area 
                      type="monotone" 
                      dataKey="price" 
                      stroke={m.up ? "#4ade80" : "#f87171"} 
                      fillOpacity={1} 
                      fill={`url(#gradient-${m.symbol})`} 
                      strokeWidth={2}
                      isAnimationActive={false}
                    />
                    <YAxis domain={['auto', 'auto']} hide />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className={cn(
                "flex items-center gap-1 px-2.5 py-1 rounded-lg min-w-[65px] justify-center",
                m.up ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
              )}>
                {m.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                <span className="text-[10px] font-bold tabular-nums">
                  {m.change > 0 ? '+' : ''}{m.change.toFixed(2)}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </WidgetCard>
  );
}