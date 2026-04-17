// src/live.config.ts
//
// Placeholder for EmDash Live Collections. Intentionally has no active imports
// so it doesn't break the build before EmDash is installed.
//
// ── When activating EmDash ─────────────────────────────────────────
// 1. Install EmDash and its peer deps:
//      npm install emdash @astrojs/react react react-dom \
//        @tanstack/react-query @tanstack/react-router
// 2. Uncomment the block below.
// 3. Uncomment the emdash integration in astro.config.mjs.
// 4. Run `npm run types` to generate TS types from the live EmDash schema.
// 5. In pages, swap getEntry('landing', ...) / getCollection('writing') for
//    the Live Collection queries exposed here.
//
// import { defineLiveCollection } from "astro:content";
// import { emdashLoader } from "emdash/loader";
//
// export const collections = {
//   site_content: defineLiveCollection({ loader: emdashLoader("site_content") }),
//   tiers:        defineLiveCollection({ loader: emdashLoader("tiers") }),
//   work_names:   defineLiveCollection({ loader: emdashLoader("work_names") }),
//   posts:        defineLiveCollection({ loader: emdashLoader("posts") }),
// };

export {};
