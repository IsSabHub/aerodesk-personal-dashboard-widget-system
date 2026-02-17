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
export const useDashboardStore = create<DashboardState>((set, get) => ({
  isEditMode: false,
  widgetOrder: ['weather', 'calendar', 'stocks', 'news'],
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
      }
    } catch (error) {
      console.error(`[DashboardStore] Failed to fetch settings for ${userId}:`, error);
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