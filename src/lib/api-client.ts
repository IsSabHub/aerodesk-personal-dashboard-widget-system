import { ApiResponse } from "../../shared/types"
export async function api<T>(path: string, init?: RequestInit): Promise<T> {
  try {
    const res = await fetch(path, { 
      headers: { 'Content-Type': 'application/json' }, 
      ...init 
    });
    if (!res.ok) {
      console.warn(`[API CLIENT] Request to ${path} failed with status ${res.status}`);
      const errorText = await res.text();
      console.warn(`[API CLIENT] Error detail: ${errorText}`);
      throw new Error(`HTTP Error: ${res.status}`);
    }
    const json = (await res.json()) as ApiResponse<T>;
    if (!json.success || json.data === undefined) {
      console.warn(`[API CLIENT] Application error at ${path}:`, json.error);
      throw new Error(json.error || 'Request failed');
    }
    return json.data;
  } catch (err) {
    console.error(`[API CLIENT] Critical error fetching ${path}:`, err);
    throw err;
  }
}