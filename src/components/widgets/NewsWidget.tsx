import React from 'react';
import { Newspaper, ChevronRight } from 'lucide-react';
import { WidgetCard } from './WidgetCard';
export function NewsWidget() {
  const news = [
    { category: 'Tech', title: 'The future of Glassmorphism in 2024', time: '2h ago' },
    { category: 'Design', title: 'Why white space matters more than you think', time: '5h ago' },
    { category: 'Business', title: 'Market shifts in the tech sector', time: '8h ago' },
  ];
  return (
    <WidgetCard title="Latest News" icon={<Newspaper className="w-4 h-4" />}>
      <div className="flex flex-col gap-3">
        {news.map((item, i) => (
          <div 
            key={i} 
            className="group/item flex flex-col p-3 rounded-2xl bg-white/5 hover:bg-white/10 transition-all cursor-pointer border border-transparent hover:border-white/10"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-wider">
                {item.category}
              </span>
              <span className="text-[10px] text-white/40">{item.time}</span>
            </div>
            <div className="flex items-start justify-between gap-2">
              <h4 className="text-xs font-medium text-white/90 leading-relaxed group-hover/item:text-white">
                {item.title}
              </h4>
              <ChevronRight className="w-3 h-3 text-white/20 group-hover/item:text-white/60 transition-colors mt-0.5 flex-shrink-0" />
            </div>
          </div>
        ))}
        <button className="text-[10px] text-white/40 hover:text-white/70 transition-colors font-bold uppercase tracking-widest text-center mt-2 py-1">
          View All Headlines
        </button>
      </div>
    </WidgetCard>
  );
}