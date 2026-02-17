export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}
export type WidgetType = 'weather' | 'calendar' | 'stocks' | 'news' | 'system' | 'quick-actions';
export interface DashboardConfig {
  id: string; // userId
  widgetOrder: WidgetType[];
  updatedAt: number;
}
export interface User {
  id: string;
  name: string;
}
export interface Chat {
  id: string;
  title: string;
}
export interface ChatMessage {
  id: string;
  chatId: string;
  userId: string;
  text: string;
  ts: number;
}