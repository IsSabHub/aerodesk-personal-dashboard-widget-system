# Cloudflare Workers Full-Stack Template

A production-ready full-stack application template powered by Cloudflare Workers. Features a React frontend with shadcn/ui, Hono-based API backend, and Durable Objects for scalable, stateful entities like users and chat boards.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/IsSabHub/aerodesk-personal-dashboard-widget-system)

## ✨ Key Features

- **Full-Stack Ready**: React 18 frontend with Vite + Cloudflare Pages integration, Hono API routes on Workers.
- **Durable Objects**: Entity-based storage (Users, Chats, Messages) with automatic indexing and pagination.
- **Modern UI**: shadcn/ui components, Tailwind CSS, dark mode, responsive design.
- **Data Fetching**: TanStack Query for optimistic updates and caching.
- **Type-Safe**: Full TypeScript support across frontend, backend, and shared types.
- **Real-Time Capable**: Built-in support for chat messages and entity mutations.
- **Deployment Ready**: One-command deploy to Cloudflare Workers/Pages with SQLite-backed Durable Objects.

## 🛠 Tech Stack

| Category | Technologies |
|----------|--------------|
| **Backend** | Cloudflare Workers, Hono, Durable Objects (SQLite), TypeScript |
| **Frontend** | React 18, Vite, React Router, TanStack Query, shadcn/ui, Tailwind CSS |
| **UI/UX** | Lucide icons, Framer Motion, Sonner toasts, Headless UI |
| **State/Data** | Zustand, Immer, Zod validation |
| **Dev Tools** | Bun, ESLint, TypeScript 5+, wrangler |
| **Other** | CORS, Logging, Error boundaries, Theme toggle |

## 🚀 Quick Start

### Prerequisites
- [Bun](https://bun.sh/) installed (`curl -fsSL https://bun.sh/install | bash`)
- [Cloudflare CLI (wrangler)](https://developers.cloudflare.com/workers/wrangler/install/) (`bunx wrangler@latest init`)

### Installation
```bash
bun install
```

### Local Development
```bash
# Start dev server (frontend + worker proxy)
bun dev

# Open http://localhost:3000
```

### Type Generation
```bash
bun run cf-typegen  # Generates Env types from wrangler
```

## 💻 Development Workflow

- **Frontend**: Edit `src/` files. Hot-reload via Vite.
- **Backend Routes**: Add to `worker/user-routes.ts`. Auto-reloads in dev.
- **Entities**: Extend `worker/entities.ts` using the IndexedEntity pattern.
- **Shared Types**: Define in `shared/types.ts` for type-safety.
- **Linting**: `bun lint`
- **Build**: `bun build` (produces `dist/` for Pages deploy)

### API Examples
```bash
# List users
curl http://localhost:3000/api/users

# Create chat
curl -X POST http://localhost:3000/api/chats \
  -H "Content-Type: application/json" \
  -d '{"title": "My Chat"}'

# Send message
curl -X POST http://localhost:3000/api/chats/c1/messages \
  -H "Content-Type: application/json" \
  -d '{"userId": "u1", "text": "Hello!"}'
```

See `worker/user-routes.ts` for full CRUD endpoints.

## ☁️ Deployment

Deploy to Cloudflare with one command:

```bash
# Login (first time only)
wrangler login

# Deploy worker + assets
bun deploy
```

This builds the frontend (`dist/`), bundles the worker, and deploys to your Cloudflare account.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/IsSabHub/aerodesk-personal-dashboard-widget-system)

### Custom Domain
```bash
# Bind custom domain in wrangler.toml or dashboard
wrangler deploy --var DOMAIN:yourdomain.com
```

### Environment Variables
Add to `wrangler.toml`:
```toml
[vars]
API_URL = "https://your-worker.youraccount.workers.dev"
```

## 📚 Project Structure

```
├── src/              # React frontend
├── worker/           # Hono API + Durable Objects
├── shared/           # Shared types + mocks
├── tailwind.config.js # UI theming
└── wrangler.jsonc    # Cloudflare config
```

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch (`bun dev`)
3. Commit changes (`git commit -m "feat: add X"`)
4. Push and open PR

## 📄 License

MIT License. See [LICENSE](LICENSE) for details.

## 🙌 Support

- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
- [shadcn/ui](https://ui.shadcn.com/)
- Questions? Open an issue.

Built with ❤️ for Cloudflare Developers.