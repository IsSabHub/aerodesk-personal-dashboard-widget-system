import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { ThemeToggle } from '@/components/ThemeToggle';
import { WeatherWidget } from '@/components/widgets/WeatherWidget';
import { CalendarWidget } from '@/components/widgets/CalendarWidget';
import { NewsWidget } from '@/components/widgets/NewsWidget';
import { StockWidget } from '@/components/widgets/StockWidget';
import { Toaster } from '@/components/ui/sonner';
export function HomePage() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  const getGreeting = () => {
    const hour = now.getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[#0f172a] selection:bg-blue-500/30">
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-600/20 blur-[120px]" />
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] rounded-full bg-indigo-600/10 blur-[100px]" />
      </div>
      <ThemeToggle className="fixed top-6 right-6" />
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12 md:py-20 lg:py-24">
        {/* Header */}
        <header className="mb-12 animate-fade-in">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white/90">
              {getGreeting()}, <span className="text-blue-400">User</span>
            </h1>
            <div className="flex items-center gap-3 text-lg text-white/40 font-medium">
              <span>{format(now, 'EEEE, MMMM do')}</span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span className="tabular-nums">{format(now, 'HH:mm:ss')}</span>
            </div>
          </div>
        </header>
        {/* Widget Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-slide-up">
          <div className="xl:col-span-1">
            <WeatherWidget />
          </div>
          <div className="xl:col-span-1">
            <CalendarWidget />
          </div>
          <div className="xl:col-span-1">
            <StockWidget />
          </div>
          <div className="xl:col-span-1">
            <NewsWidget />
          </div>
        </div>
      </main>
      <footer className="relative z-10 text-center py-12 opacity-30">
        <p className="text-xs text-white uppercase tracking-[0.2em] font-bold">
          AeroDesk &copy; {now.getFullYear()} &bull; Personal Dashboard
        </p>
      </footer>
      <Toaster richColors closeButton theme="dark" />
    </div>
  );
}