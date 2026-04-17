// @ts-check
import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";

// Flip to Cloudflare when deploying; static for local dev.
const isCloudflare = process.env.CF_PAGES === "1" || process.env.DEPLOY_TARGET === "cloudflare";

// ─── EmDash activation (future) ──────────────────────────────
// Once EmDash is installed (`npm install emdash @astrojs/react react react-dom
// @tanstack/react-query @tanstack/react-router`) and seeded, uncomment the
// block below and add `emdashIntegration` to the `integrations` array.
//
// import emdash, { local } from "emdash/astro";
// import { sqlite, d1 } from "emdash/db";
// const emdashIntegration = emdash({
//   database: isCloudflare ? d1() : sqlite({ url: "file:./data.db" }),
//   storage: isCloudflare
//     ? undefined // R2 binding configured in wrangler.jsonc
//     : local({ directory: "./uploads", baseUrl: "/_emdash/api/media/file" }),
// });

export default defineConfig({
  site: "https://brandwhisperer.io",
  output: isCloudflare ? "server" : "static",
  adapter: isCloudflare ? cloudflare() : undefined,
  integrations: [
    // emdashIntegration, // ← uncomment when EmDash is activated
  ],
});
