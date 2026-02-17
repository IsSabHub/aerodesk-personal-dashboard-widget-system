import React, { useEffect, useState, useCallback } from 'react';
import { format } from 'date-fns';
import { Settings2, Check, Loader2, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeToggle } from '@/components/ThemeToggle';
import { WeatherWidget } from '@/components/widgets/WeatherWidget';
import { CalendarWidget } from '@/components/widgets/CalendarWidget';
import { NewsWidget } from '@/components/widgets/NewsWidget';
import { StockWidget } from '@/components/widgets/StockWidget';
import { SystemWidget } from '@/components/widgets/SystemWidget';
import { QuickActionsWidget } from '@/components/widgets/QuickActionsWidget';
import { DraggableGrid } from '@/components/dashboard/DraggableGrid';
import { SortableWidget } from '@/components/dashboard/SortableWidget';
import { Toaster } from '@/components/ui/sonner';
import { useDashboardStore } from '@/store/useDashboardStore';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { WidgetType } from '@shared/types';
export function HomePage() {
  const [now, setNow] = useState(new Date());
  const widgetOrder = useDashboardStore((s) => s.widgetOrder);
  const isEditMode = useDashboardStore((s) => s.isEditMode);
  const isLoading = useDashboardStore((s) => s.isLoading);
  const toggleEditMode = useDashboardStore((s) => s.toggleEditMode);
  const fetchSettings = useDashboardStore((s) => s.fetchSettings);
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    fetchSettings('user-1');
    return () => clearInterval(timer);
  }, [fetchSettings]);
  const getGreeting = useCallback(() => {
    const hour = now.getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  }, [now]);
  const renderWidget = (type: string) => {
    switch (type) {
      case 'weather': return <WeatherWidget />;
      case 'calendar': return <CalendarWidget />;
      case 'stocks': return <StockWidget />;
      case 'news': return <NewsWidget />;
      case 'system': return <SystemWidget />;
      case 'quick-actions': return <QuickActionsWidget />;
      default: return null;
    }
  };
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[#0f172a] selection:bg-blue-500/30">
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-600/20 blur-[120px]" />
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] rounded-full bg-indigo-600/10 blur-[100px]" />
      </div>
      <div className="fixed top-6 right-6 z-50 flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          disabled={isLoading}
          onClick={toggleEditMode}
          className={cn(
            "bg-white/5 backdrop-blur-md border-white/10 text-white hover:bg-white/10 transition-all glass-button",
            isEditMode && "bg-blue-500/20 border-blue-500/50 hover:bg-blue-500/30"
          )}
        >
          {isEditMode ? (
            <><Check className="w-4 h-4 mr-2" /> Done</>
          ) : (
            <><Settings2 className="w-4 h-4 mr-2" /> Customize</>
          )}
        </Button>
        <ThemeToggle className="relative top-0 right-0" />
      </div>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8 md:py-12 lg:py-16">
          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-12"
          >
            <div className="space-y-2">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white/90">
                {getGreeting()}, <span className="text-blue-400">Explorer</span>
              </h1>
              <div className="flex items-center gap-3 text-lg text-white/40 font-medium">
                <span>{format(now, 'EEEE, MMMM do')}</span>
                <span className="w-1 h-1 rounded-full bg-white/20" />
                <span className="tabular-nums">{format(now, 'HH:mm:ss')}</span>
              </div>
            </div>
          </motion.header>
          {/* Widget Grid */}
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div 
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center min-h-[400px] space-y-4"
              >
                <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
                <p className="text-white/40 font-medium animate-pulse">Initializing AeroDesk...</p>
              </motion.div>
            ) : (
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <DraggableGrid items={widgetOrder}>
                  {widgetOrder.map((type, idx) => (
                    <motion.div
                      key={`motion-wrapper-${type}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1, duration: 0.5 }}
                    >
                      <SortableWidget id={type}>
                        {renderWidget(type)}
                      </SortableWidget>
                    </motion.div>
                  ))}
                </DraggableGrid>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
      <footer className="relative z-10 text-center py-12 opacity-30">
        <p className="text-xs text-white uppercase tracking-[0.2em] font-bold">
          AeroDesk &copy; {now.getFullYear()} &bull; Aesthetic OS
        </p>
      </footer>
      <Toaster richColors closeButton theme="dark" />
    </div>
  );
}