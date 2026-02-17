import { Hono } from "hono";
import type { Env } from './core-utils';
import { UserEntity, ChatBoardEntity, SettingsEntity } from "./entities";
import { ok, bad, notFound, isStr } from './core-utils';
import type { DashboardConfig } from "@shared/types";
export function userRoutes(app: Hono<{ Bindings: Env }>) {
  // Use a cleaner grouping for API endpoints to prevent Hono matcher rebuild issues
  const api = app.basePath('/api');
  // SETTINGS
  api.get('/settings/:userId', async (c) => {
    const userId = c.req.param('userId');
    const settings = new SettingsEntity(c.env, userId);
    if (!await settings.exists()) {
      return ok(c, { ...SettingsEntity.initialState, id: userId });
    }
    return ok(c, await settings.getState());
  });
  api.post('/settings/:userId', async (c) => {
    const userId = c.req.param('userId');
    const body = await c.req.json() as Partial<DashboardConfig>;
    if (!body.widgetOrder || !Array.isArray(body.widgetOrder)) {
      return bad(c, 'Invalid widget order');
    }
    const settings = new SettingsEntity(c.env, userId);
    const updated: DashboardConfig = {
      id: userId,
      widgetOrder: body.widgetOrder as any,
      updatedAt: Date.now()
    };
    if (await settings.exists()) {
      await settings.save(updated);
    } else {
      await SettingsEntity.create(c.env, updated);
    }
    return ok(c, updated);
  });
  // USERS
  api.get('/users', async (c) => {
    await UserEntity.ensureSeed(c.env);
    const cq = c.req.query('cursor');
    const lq = c.req.query('limit');
    const page = await UserEntity.list(c.env, cq ?? null, lq ? Math.max(1, (Number(lq) | 0)) : undefined);
    return ok(c, page);
  });
  api.post('/users', async (c) => {
    const { name } = (await c.req.json()) as { name?: string };
    if (!name?.trim()) return bad(c, 'name required');
    return ok(c, await UserEntity.create(c.env, { id: crypto.randomUUID(), name: name.trim() }));
  });
  api.delete('/users/:id', async (c) => ok(c, { id: c.req.param('id'), deleted: await UserEntity.delete(c.env, c.req.param('id')) }));
  // CHATS
  api.get('/chats', async (c) => {
    await ChatBoardEntity.ensureSeed(c.env);
    const cq = c.req.query('cursor');
    const lq = c.req.query('limit');
    return ok(c, await ChatBoardEntity.list(c.env, cq ?? null, lq ? Math.max(1, (Number(lq) | 0)) : undefined));
  });
  api.get('/chats/:chatId/messages', async (c) => {
    const chat = new ChatBoardEntity(c.env, c.req.param('chatId'));
    if (!await chat.exists()) return notFound(c, 'chat not found');
    return ok(c, await chat.listMessages());
  });
  api.post('/chats/:chatId/messages', async (c) => {
    const chatId = c.req.param('chatId');
    const { userId, text } = (await c.req.json()) as { userId?: string; text?: string };
    if (!isStr(userId) || !text?.trim()) return bad(c, 'userId and text required');
    const chat = new ChatBoardEntity(c.env, chatId);
    if (!await chat.exists()) return notFound(c, 'chat not found');
    return ok(c, await chat.sendMessage(userId, text.trim()));
  });
  api.delete('/chats/:id', async (c) => ok(c, { id: c.req.param('id'), deleted: await ChatBoardEntity.delete(c.env, c.req.param('id')) }));
}