# TCGVault

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Astro](https://img.shields.io/badge/Astro-5-orange.svg)](https://astro.build)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue.svg)](https://www.typescriptlang.org)
[![Deploy to Cloudflare Pages](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/TCG-Price-Lookup/tcgvault)
[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/TCG-Price-Lookup/tcgvault)
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/TCG-Price-Lookup/tcgvault)

**Open source TCG collection tracker. Free, self-hostable, server-rendered.**

> Track your card collection across 8 TCGs. Know your total value. Export your data. Clone, set API key, deploy in 5 minutes.

![TCGVault Screenshot](https://placehold.co/1200x630/0a0a0a/00ff88?text=TCGVault+Screenshot)

---

## What is TCGVault?

TCGVault is a self-hostable web app for tracking your trading card game collection. You deploy it with your API key from [tcgpricelookup.com](https://tcgpricelookup.com) set as an environment variable — the key lives on the server, never in the browser. Your collection is stored in your browser's localStorage. No account, no cloud database.

---

## Features

- **8 TCGs**: Pokemon, MTG, Yu-Gi-Oh!, Lorcana, One Piece, Star Wars: Unlimited, Flesh and Blood, Pokemon Japan
- **Live pricing**: Real-time prices via [TCG Price Lookup API](https://tcgpricelookup.com), fetched server-side
- **Secure**: API key in `.env` on the server — never exposed to the browser
- **Export**: Download your collection as JSON or CSV
- **Self-hostable**: Deploy to Cloudflare Pages, Vercel, Netlify, or run locally
- **Open source**: MIT licensed, PRs welcome

---

## Quick start

### 1. Get an API key

Get a free API key at [tcgpricelookup.com/pricing](https://tcgpricelookup.com/pricing) — 200 requests/day, no credit card required.

### 2. Deploy

**One-click deploy (set `TCG_API_KEY` in environment variables during setup):**

[![Deploy to Cloudflare Pages](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/TCG-Price-Lookup/tcgvault)
[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/TCG-Price-Lookup/tcgvault)
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/TCG-Price-Lookup/tcgvault)

### 3. Or run locally

```bash
git clone https://github.com/TCG-Price-Lookup/tcgvault
cd tcgvault
cp .env.example .env
# Add your TCG_API_KEY to .env
npm install
npm run dev
```

Open [http://localhost:4321](http://localhost:4321) and start tracking your collection.

---

## Environment variables

| Variable | Description |
|---|---|
| `TCG_API_KEY` | Your TCG Price Lookup API key (required) |

Create `.env` from the example:

```bash
cp .env.example .env
```

Then edit `.env` and replace `your_api_key_here` with your actual key.

---

## How it Works

TCGVault uses **Astro hybrid output** with the Cloudflare Pages adapter:

1. **Landing pages** (`/`, `/about`) are pre-rendered as static HTML
2. **API routes** (`/api/search`, `/api/card`, `/api/batch`, `/api/games`) run server-side and call the TCG Price Lookup API using `TCG_API_KEY` from the environment
3. **The React app** (`/app`) calls these API routes via `fetch()` — no SDK in the browser
4. **Your collection** is stored in `localStorage` as JSON

```
Your Browser
  ├── localStorage: collection
  └── fetch() → /api/search (your server)
         └── TCGVault Server → tcgpricelookup.com (TCG_API_KEY from env)

API key in browser: never
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Astro 5](https://astro.build) — hybrid output |
| Adapter | [@astrojs/cloudflare](https://docs.astro.build/en/guides/integrations-guide/cloudflare/) |
| UI | [React 19](https://react.dev) — interactive islands |
| Styling | [Tailwind CSS 4](https://tailwindcss.com) via `@tailwindcss/vite` |
| Prices | [@tcgpricelookup/sdk](https://tcgfast.com/docs/sdks/javascript/) — server-side only |
| Language | TypeScript (strict mode) |
| Deploy | Cloudflare Pages (primary), Vercel, Netlify |

---

## Project Structure

```
tcgvault/
├── .env.example            # Copy to .env, add TCG_API_KEY
├── astro.config.mjs        # hybrid output + cloudflare adapter
├── src/
│   ├── styles/global.css
│   ├── layouts/BaseLayout.astro
│   ├── pages/
│   │   ├── index.astro         # Landing page (prerendered)
│   │   ├── app.astro           # Collection tracker (prerendered shell)
│   │   ├── about.astro         # How it works (prerendered)
│   │   └── api/                # Server-rendered API routes
│   │       ├── search.ts       # GET /api/search?q=...&game=...
│   │       ├── card.ts         # GET /api/card?id=...
│   │       ├── batch.ts        # POST /api/batch { ids: string[] }
│   │       └── games.ts        # GET /api/games
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── Hero.astro
│   │   ├── Features.astro
│   │   ├── CTA.astro
│   │   └── app/                # React islands
│   │       ├── App.tsx
│   │       ├── SearchBar.tsx
│   │       ├── CardSearchResults.tsx
│   │       ├── CollectionList.tsx
│   │       ├── CardDetail.tsx
│   │       ├── GameFilter.tsx
│   │       ├── ExportMenu.tsx
│   │       ├── EmptyState.tsx
│   │       └── Settings.tsx
│   └── lib/
│       ├── storage.ts          # localStorage wrapper (collection only)
│       ├── client.ts           # Placeholder (SDK used server-side only)
│       └── types.ts            # Shared TypeScript types
└── public/
    ├── favicon.svg
    └── robots.txt
```

---

## localStorage Schema

```typescript
// Keys used
"tcgvault:collection" → CollectionItem[]

// CollectionItem
{
  id: string          // Card UUID from API
  name: string
  game: string        // e.g. "pokemon", "mtg"
  set: string         // Set name
  setCode: string     // Set slug
  number: string      // Card number
  quantity: number
  condition: "near_mint" | "lightly_played" | "moderately_played" | "heavily_played" | "damaged"
  addedAt: string     // ISO timestamp
  cachedPrice?: number
  imageUrl?: string
}
```

---

## Contributing

PRs and issues are welcome. Please open an issue first for major changes.

1. Fork the repo
2. Create a feature branch: `git checkout -b feat/my-feature`
3. Commit your changes
4. Open a pull request

---

## Related Projects

- [tcgfast.com](https://tcgfast.com) — TCG Price Lookup API docs and tools
- [tcgpricelookup.com](https://tcgpricelookup.com) — The underlying price API
- [@tcgpricelookup/sdk](https://www.npmjs.com/package/@tcgpricelookup/sdk) — Official JavaScript SDK
- [TCG Discord Bot](https://github.com/TCG-Price-Lookup/tcg-discord-bot) — Price lookups in Discord
- [nextjs-tcg-starter](https://github.com/TCG-Price-Lookup/nextjs-tcg-starter) — Next.js starter template
- [More tools](https://github.com/TCG-Price-Lookup) — GitHub organization

---

## License

MIT — see [LICENSE](LICENSE).

---

Built with [TCG Price Lookup API](https://tcgpricelookup.com) · [Docs](https://tcgfast.com) · [GitHub](https://github.com/TCG-Price-Lookup)
