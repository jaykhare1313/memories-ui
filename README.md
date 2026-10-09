# Memories

Personal trip photo and video library — Step 1 UI. A warm, local-first experience for importing photos, watching them group into trips, and browsing by day. This repo ships **UI only** with a mock data layer; swap `VITE_DATA_SOURCE=api` when the local backend is ready.

## Quick start

```bash
npm install
cp .env.example .env
npm run dev
```

Open [http://127.0.0.1:43123](http://127.0.0.1:43123). By default the library has photos and lands on **Home**.

### Dev: empty state

- URL: `?state=empty`
- `localStorage.setItem('memories_dev_empty', '1')` then refresh
- `.env`: `VITE_DEV_EMPTY_STATE=1`

## Scripts

| Command | Description |
|--------|-------------|
| `npm run dev` | Vite dev server (port 43123) |
| `npm run build` | Typecheck + production build to `dist/` |
| `npm run preview` | Serve `dist/` locally |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript (`tsc -b --noEmit`) |
| `npm run format` | Prettier |

## Folder structure

```
src/
  app/           App shell, providers, routes
  theme/         MUI theme (tokens, typography, component overrides)
  api/           client, endpoints, types, mock adapter + data.json
  features/      library, upload, trips, trip (components + hooks)
  components/    Shared UI (AppBar, GlassCard, Lightbox, …)
  pages/         Thin route wrappers
  hooks/         Cross-feature hooks
  utils/         Formatting, dev toggles
public/
  img/thumbs/    Demo thumbnails (~50 images)
```

Data flows **pages → hooks (TanStack Query) → `src/api`**. Components never call `fetch` directly.

## Mock vs API

| Variable | Values | Default |
|----------|--------|---------|
| `VITE_DATA_SOURCE` | `mock` \| `api` | `mock` |
| `VITE_API_BASE_URL` | Backend origin when `api` | empty |

Mock responses follow `memories-design/API_CONTRACT.md` shapes. Endpoints:

- `GET /api/library/status`
- `POST /api/uploads`
- `GET /api/uploads/{id}`
- `GET /api/trips`
- `GET /api/trips/{id}`
- `GET /media/{id}/thumb`, `GET /media/{id}`

## Deploy (CI/CD)

GitHub Actions builds and deploys to **Netlify** (`develop` → dev, `main` → prod).  
See **[docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)** for one-time Netlify/GitHub setup, secrets, and promotion flow.

### Manual static build

Build output is a static SPA (`base: './'` for relative asset paths).

```bash
npm run build
```

Upload the `dist/` folder, or use the Netlify workflow in **docs/DEPLOYMENT.md** (recommended).

### Netlify (CI/CD)

Actions runs `netlify deploy --dir=dist --prod` per site. `netlify.toml` and `public/_redirects` provide SPA fallback (`/* /index.html 200`). Disable Netlify’s Git builds when using Actions-only deploys.

### Vercel

Uses `vercel.json` rewrite to `index.html`.

### GitHub Pages

Set `base` in `vite.config.ts` to your repo path (e.g. `/memories/`), rebuild, and enable Pages from `dist` or use an action. Relative `base: './'` works when opening `index.html` from the deployed root.

## Stack

Vite, React 18, TypeScript (strict), MUI v6 (custom light theme), React Router, TanStack Query, ESLint, Prettier.
