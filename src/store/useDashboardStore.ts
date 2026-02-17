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
    set({ isLoading: true, userId });
    try {
      const data = await api<DashboardConfig>(`/api/settings/${userId}`);
      if (data && data.widgetOrder) {
        set({ widgetOrder: data.widgetOrder });
      }
    } catch (error) {
      console.error('Failed to fetch settings:', error);
    } finally {
      set({ isLoading: false });
    }
  },
  saveSettings: async () => {
    const { userId, widgetOrder } = get();
    try {
      await api(`/api/settings/${userId}`, {
        method: 'POST',
        body: JSON.stringify({ widgetOrder }),
      });
    } catch (error) {
      console.error('Failed to save settings:', error);
    }
  },
}));