# TCGVault

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Astro](https://img.shields.io/badge/Astro-5-orange.svg)](https://astro.build)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue.svg)](https://www.typescriptlang.org)
[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/TCG-Price-Lookup/tcgvault)
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/TCG-Price-Lookup/tcgvault)

**Open source TCG collection tracker. Free, self-hostable, zero backend.**

> Track your card collection across 8 TCGs. Know your total value. Export your data. Your API key never leaves your browser.

![TCGVault Screenshot](https://placehold.co/1200x630/0a0a0a/00ff88?text=TCGVault+Screenshot)

---

## What is TCGVault?

TCGVault is a fully client-side web app for tracking your trading card game collection. Paste in your free API key from [tcgpricelookup.com](https://tcgpricelookup.com), search for cards across 8 TCGs, and watch your total collection value update in real time. Everything is stored in your browser's localStorage — no account, no cloud, no backend.

---

## Features

- **8 TCGs**: Pokemon, MTG, Yu-Gi-Oh!, Lorcana, One Piece, Star Wars: Unlimited, Flesh and Blood, Pokemon Japan
- **Live pricing**: Real-time prices via the [TCG Price Lookup API](https://tcgpricelookup.com)
- **BYOK**: Bring Your Own Key — your API key is stored only in localStorage, never uploaded
- **Export**: Download your collection as JSON or CSV
- **Self-hostable**: Deploy to Vercel, Netlify, Cloudflare Pages, or anywhere that serves static files
- **Open source**: MIT licensed, PRs welcome

---

## Deploy in 60 seconds

### Vercel

[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/TCG-Price-Lookup/tcgvault)

### Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/TCG-Price-Lookup/tcgvault)

### Cloudflare Pages

[![Deploy to Cloudflare Pages](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/TCG-Price-Lookup/tcgvault)

---

## Run Locally

```bash
git clone https://github.com/TCG-Price-Lookup/tcgvault
cd tcgvault
npm install
npm run dev
```

Open [http://localhost:4321](http://localhost:4321).

---

## Get an API Key

TCGVault uses the [TCG Price Lookup API](https://tcgpricelookup.com) to fetch card prices. Get a free API key at [tcgpricelookup.com/pricing](https://tcgpricelookup.com/pricing) — no credit card required.

- Setup guide: [tcgfast.com/docs/getting-started/](https://tcgfast.com/docs/getting-started/)
- JavaScript SDK reference: [tcgfast.com/docs/sdks/javascript/](https://tcgfast.com/docs/sdks/javascript/)

---

## How it Works

TCGVault is a **100% client-side static site**:

1. Your API key is saved to `localStorage` when you paste it in
2. Card searches go directly from your browser to `tcgpricelookup.com`
3. Your collection is stored in `localStorage` as JSON
4. There is no TCGVault server — the site is a static bundle of HTML/CSS/JS

```
Your Browser
  ├── localStorage: API key + collection
  └── fetch() → tcgpricelookup.com (prices, using your key)

TCGVault servers: none (static file)
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Astro 5](https://astro.build) — static output |
| UI | [React 19](https://react.dev) — interactive islands |
| Styling | [Tailwind CSS 4](https://tailwindcss.com) via `@tailwindcss/vite` |
| Prices | [@tcgpricelookup/sdk](https://tcgfast.com/docs/sdks/javascript/) |
| Language | TypeScript (strict mode) |
| Deploy | Any static host (Vercel, Netlify, CF Pages, etc.) |

---

## Project Structure

```
tcgvault/
├── src/
│   ├── styles/global.css
│   ├── layouts/BaseLayout.astro
│   ├── pages/
│   │   ├── index.astro         # Landing page
│   │   ├── app.astro           # Collection tracker app
│   │   └── about.astro         # How it works
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── Hero.astro
│   │   ├── Features.astro
│   │   ├── CTA.astro
│   │   └── app/                # React islands
│   │       ├── App.tsx
│   │       ├── ApiKeySetup.tsx
│   │       ├── SearchBar.tsx
│   │       ├── CardSearchResults.tsx
│   │       ├── CollectionList.tsx
│   │       ├── CardDetail.tsx
│   │       ├── GameFilter.tsx
│   │       ├── ExportMenu.tsx
│   │       ├── EmptyState.tsx
│   │       └── Settings.tsx
│   └── lib/
│       ├── storage.ts          # localStorage wrapper
│       ├── client.ts           # SDK client factory
│       └── types.ts            # Shared TypeScript types
└── public/
    ├── favicon.svg
    └── robots.txt
```

---

## localStorage Schema

```typescript
// Keys used
"tcgvault:api-key"    → string
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
