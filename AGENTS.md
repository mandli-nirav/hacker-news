# AGENTS.md

Guidance for AI coding agents working in this repository.

## Project

A Hacker News client built with **TanStack Start** (full-stack React + SSR) and deployed to **Cloudflare Workers**. Data comes from the official [Hacker News API](https://github.com/HackerNews/API) (`https://hacker-news.firebaseio.com/v0/`, JSON, no auth, no rate limit).

## Stack

- **Framework:** TanStack Start + TanStack Router (file-based routing)
- **UI:** React 19, Tailwind CSS v4, shadcn/ui (`radix-nova` style, neutral base), `lucide-react` icons
- **Data:** TanStack Query (SSR-integrated via `@tanstack/react-router-ssr-query`); axios HTTP client in `src/lib/hn.ts`
- **Build:** Vite 8
- **Deploy:** Cloudflare Workers via Wrangler (`wrangler.jsonc`)
- **Lang:** TypeScript (strict)

## Commands

| Command           | Purpose                              |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Dev server on port 3000              |
| `npm run build`   | Production build                     |
| `npm run preview` | Preview the build locally            |
| `npm test`        | Run Vitest (jsdom + Testing Library) |
| `npm run lint`    | ESLint                               |
| `npm run format`  | Prettier write + `eslint --fix`      |
| `npm run check`   | Prettier check (CI-safe)             |
| `npm run deploy`  | Build + `wrangler deploy`            |

Run `npm run check` and `npm test` before considering a change done.

## Conventions

- **Routes** live in `src/routes/`; `src/routeTree.gen.ts` is **generated** — never edit it by hand.
- Import alias `#/*` and `@/*` both map to `./src/*` (see `package.json` and `tsconfig.json`). shadcn/ui uses `@/*`.
- Root layout and `<head>` config live in `src/routes/__root.tsx`.
- Router setup is in `src/router.tsx`.
- Global styles in `src/styles.css`; prefer Tailwind utility classes.
- shadcn/ui components live in `src/components/ui/`; the `cn()` helper is in `src/lib/utils.ts`. Add components with `npx shadcn@latest add <name>`.
- Match the existing formatting (Prettier + `@tanstack/eslint-config`); no semicolons, single quotes.

## Hacker News API reference

Base URL: `https://hacker-news.firebaseio.com/v0/`

- `item/<id>.json` — story / comment / job / poll / pollopt
- `user/<id>.json` — user profile
- `topstories.json`, `newstories.json`, `beststories.json` — up to 500 ids
- `askstories.json`, `showstories.json`, `jobstories.json` — up to 200 ids
- `maxitem.json`, `updates.json` — live data

Item fields: `id`, `type`, `by`, `time` (Unix seconds), `text` (HTML), `url`, `title`, `score`, `descendants`, `kids`, `parent`, `parts`, `deleted`, `dead`.
User fields: `id`, `created` (Unix seconds), `karma`, `about`, `submitted`.

Notes: `time`/`created` are Unix seconds (×1000 for JS `Date`). Build threads by fetching a story then recursing through `kids`. Ignore unknown fields for forward compatibility.

## Deployment

`wrangler.jsonc` targets Cloudflare Workers with `nodejs_compat` and observability (logs + traces) enabled. The Worker entry is `@tanstack/react-start/server-entry`.
