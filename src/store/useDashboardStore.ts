import { create } from 'zustand';
import type { WidgetType, DashboardConfig } from '@shared/types';
import { api } from '@/lib/api-client';
interface DashboardState {
  isEditMode: boolean;
  widgetOrder: WidgetType[];
  isLoading: boolean;
  userId: string;
  toggleEditMode: () => void;
  setWidgetOrder: (order: WidgetType[]) => void;
  fetchSettings: (userId: string) => Promise<void>;
  saveSettings: () => Promise<void>;
}
const DEFAULT_ORDER: WidgetType[] = ['weather', 'calendar', 'stocks', 'news', 'system', 'quick-actions'];
export const useDashboardStore = create<DashboardState>((set, get) => ({
  isEditMode: false,
  widgetOrder: DEFAULT_ORDER,
  isLoading: false,
  userId: 'default-user',
  toggleEditMode: () => set((state) => ({ isEditMode: !state.isEditMode })),
  setWidgetOrder: (order: WidgetType[]) => set({ widgetOrder: order }),
  fetchSettings: async (userId: string) => {
    if (!userId) return;
    set({ isLoading: true, userId });
    try {
      const data = await api<DashboardConfig>(`/api/settings/${userId}`);
      if (data && Array.isArray(data.widgetOrder) && data.widgetOrder.length > 0) {
        set({ widgetOrder: data.widgetOrder });
      } else {
        set({ widgetOrder: DEFAULT_ORDER });
      }
    } catch (error) {
      console.warn(`[DashboardStore] Error fetching settings for ${userId}, falling back to defaults.`);
      set({ widgetOrder: DEFAULT_ORDER });
    } finally {
      set({ isLoading: false });
    }
  },
  saveSettings: async () => {
    const { userId, widgetOrder } = get();
    if (!userId || userId === 'default-user') return;
    try {
      await api(`/api/settings/${userId}`, {
        method: 'POST',
        body: JSON.stringify({ widgetOrder }),
      });
    } catch (error) {
      console.error(`[DashboardStore] Failed to save settings for ${userId}:`, error);
    }
  },
}));