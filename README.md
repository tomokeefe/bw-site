# brandwhisperer-site

The Brand Whisperer — landing page and writing archive. Astro 5, deployed to Cloudflare (Workers + D1 + R2). EmDash CMS ready.

## What this is

Five-fold landing page + blog at `/writing`. Type-led, dark-canvas, one-gold-hit-per-fold. Built to match the **System v1** reference in `/docs/system-v1.pdf` — that document is the authoritative spec; this repo is its implementation.

## Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | Astro 5 | Ships zero-JS by default, Islands if we need them later, built-in content collections. |
| Styling | CSS custom properties + scoped component styles | Tokens in one file (`src/styles/tokens.css`), no CSS-in-JS runtime cost. |
| Type | Barlow Condensed (display) + Poppins (body) via `@fontsource` | Self-hosted, version-pinned, no Google Fonts CDN lookup. |
| Content | Astro Content Collections → (future) EmDash Live Collections | Typed with Zod today; swap the loader when EmDash is seeded. |
| Hosting | Cloudflare Workers + D1 (SQL) + R2 (media) | Edge delivery, matches EmDash's native deployment target. |

## Repo layout

```
src/
├─ styles/
│  ├─ tokens.css         Design tokens — the constitution
│  └─ global.css         Reset + font imports + utility classes
├─ layouts/
│  └─ BaseLayout.astro   HTML shell with SEO meta
├─ components/
│  ├─ Fold.astro         560/620px section wrapper with top/content/bottom slots
│  ├─ Nav.astro          Wordmark + nav items
│  ├─ PageMarker.astro   "01 / 05 ↓" pagination bracket
│  ├─ SectionLabel.astro Gold caps tag
│  ├─ HeroStatement.astro  Fold 1 display with {{gold}} accent parser
│  ├─ PullQuote.astro    Fold 2 left column (two-tone pullout)
│  ├─ ProseBlock.astro   Fold 2 right column (paragraphs with {{lift}} support)
│  ├─ NamesWall.astro    Fold 3 hierarchical name display
│  ├─ TierRow.astro      Fold 4 single tier row
│  └─ CloseCTA.astro     Fold 5 closer
├─ content/
│  ├─ config.ts          Zod schemas for content collections
│  ├─ landing/default.json  Source of truth for the five folds
│  └─ writing/*.md       Blog posts (markdown + frontmatter)
├─ pages/
│  ├─ index.astro        Composes the five folds
│  └─ writing/
│     ├─ index.astro     /writing archive
│     └─ [slug].astro    /writing/{slug}
└─ live.config.ts        Placeholder for EmDash Live Collections (see "EmDash migration" below)
```

## Dev

```bash
npm install
npm run dev        # http://localhost:4321
```

Edit copy in `src/content/landing/default.json` → page re-renders automatically.
Add blog posts as `src/content/writing/{slug}.md` with frontmatter (see the sample post).

## Content editing

### The five folds

All five folds' content lives in **`src/content/landing/default.json`**. Schema is typed in `src/content/config.ts` — if you try to put the wrong shape in the JSON, the build will fail with a clear error.

Two conventions inside the copy:

- `{{phrase}}` → renders the phrase in gold. Use sparingly — one per fold is the rule.
- `\n` inside a string → renders as a line break in display type. For prose, let it wrap naturally.

### Blog posts

Drop a markdown file at `src/content/writing/{slug}.md`:

```markdown
---
title: "Your title"
summary: "One-sentence description for the archive page."
date: 2026-04-17
draft: false
tags: ["branding"]
---

Body goes here. Markdown works: ## headings, **bold**, _italic_, [links](https://...), blockquotes, code.
```

`draft: true` hides a post from the archive. Date drives ordering (newest first).

## Design system

**Tokens:** `src/styles/tokens.css`. Changing a token cascades across every component.

**The law** (from System v1 PDF):

1. **One gold hit per fold.** If gold lands in three places on a page, none of them mean anything.
2. **Type carries the weight.** No gradients, shadows, blurs, orbs, decorative icons.
3. **Labels shout quietly.** All caps for wayfinding, sentence case for content.
4. **Numbers bracket every fold.** Pagination frames the sequence as curated.
5. **Hairlines, not boxes.** 0.5px white at 12–22% opacity. No cards, no chrome.
6. **Prevention, not delivery.** Copy framed around what the brand won't break, not what the service includes.

## EmDash migration

The repo ships today with Astro Content Collections — stable API, works without any CMS running. When EmDash is set up and seeded, the migration path is:

1. Run `npm run types` to regenerate EmDash types from the live schema.
2. In `src/pages/index.astro`, replace:
   ```ts
   const entry = await getEntry('landing', 'default');
   ```
   with the equivalent Live Collection query from `src/live.config.ts`.
3. Same for `src/pages/writing/index.astro` and `[slug].astro` — swap `getCollection('writing')` for the EmDash posts loader.
4. Component props don't change. The shapes in `src/content/config.ts` already mirror what the EmDash collections will return.

The collections are already registered in `src/live.config.ts`: `site_content`, `tiers`, `work_names`, `posts`. Seeds go in `.emdash/seed.json` (to be authored against EmDash's seed format once stable).

## Deploy (Cloudflare)

```bash
# Set DEPLOY_TARGET=cloudflare in env, then:
npm run deploy
```

`astro.config.mjs` switches to the Cloudflare adapter and D1/R2 bindings when `CF_PAGES=1` or `DEPLOY_TARGET=cloudflare`. Bindings are declared in `wrangler.jsonc` (not yet in repo — add when provisioning the account).

## What's not here yet

- `wrangler.jsonc` with D1/R2 bindings — add when the Cloudflare account is provisioned.
- `.emdash/seed.json` — content seeds for EmDash, pending the v0.1 seed schema stabilizing.
- Favicon, OG image — drop `public/favicon.svg` and `public/og.png` when ready.
- Automated content pipeline from the LinkedIn content engine — separate pass, sits in the engine's skill, writes to EmDash via its MCP server.

## License

Private. All rights reserved by Tom O'Keefe.
