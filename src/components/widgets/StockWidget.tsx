import React from 'react';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';
import { WidgetCard } from './WidgetCard';
export function StockWidget() {
  const markets = [
    { symbol: 'S&P 500', value: '5,241.53', change: '+0.85%', up: true },
    { symbol: 'NASDAQ', value: '16,428.82', change: '+1.12%', up: true },
    { symbol: 'AAPL', value: '172.62', change: '-0.45%', up: false },
    { symbol: 'TSLA', value: '170.83', change: '-1.20%', up: false },
  ];
  return (
    <WidgetCard title="Market Watch" icon={<Activity className="w-4 h-4" />}>
      <div className="space-y-3">
        {markets.map((m, i) => (
          <div key={i} className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/5">
            <div>
              <div className="text-xs font-bold text-white tracking-wide">{m.symbol}</div>
              <div className="text-[10px] text-white/40 mt-0.5">{m.value}</div>
            </div>
            <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg ${
              m.up ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
            }`}>
              {m.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              <span className="text-[10px] font-bold">{m.change}</span>
            </div>
          </div>
        ))}
      </div>
    </WidgetCard>
  );
}