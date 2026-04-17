// src/content/config.ts
//
// Astro Content Collections for the landing page.
//
// Strategy: these schemas define the SHAPE of the content. For now the
// content lives in `src/content/landing/*.json` and is loaded at build
// time. When EmDash is running (see src/live.config.ts), the same shape
// will be served from the EmDash DB as Live Collections — only the
// loader changes, not the components.
//
// Keep the shapes here aligned with the Live Collection definitions.

import { defineCollection, z } from 'astro:content';

// ── Hero (fold 1) ───────────────────────────────────────────
const heroSchema = z.object({
  // Use {{accent}} markers inline to mark the gold phrase.
  // Use \n for intentional line breaks.
  statement: z.string(),
  footerLine: z.string(), // e.g. "Tom O'Keefe · Branding since 1994 · 150+ companies"
});

// ── Who (fold 2) ────────────────────────────────────────────
const whoSchema = z.object({
  pullAccent:  z.string(),  // gold part of the pullout
  pullCounter: z.string(),  // paper part of the pullout
  paragraphs:  z.array(z.object({
    kind: z.enum(['lede', 'body']),
    text: z.string(),       // {{lift}} marks gold inline
  })),
});

// ── Work (fold 3) ───────────────────────────────────────────
const workSchema = z.object({
  entries: z.array(z.object({
    name:    z.string(),
    tier:    z.enum(['hero', 'big', 'mid']),
    caption: z.string().optional(),
  })),
  tally: z.string().optional(),
});

// ── Engage (fold 4) ─────────────────────────────────────────
const engageSchema = z.object({
  label: z.string(),  // e.g. "THREE WAYS TO WORK TOGETHER"
  tiers: z.array(z.object({
    index:       z.string(),
    stageLabel:  z.string(),
    stage:       z.string(),
    price:       z.string(),
    description: z.string(),
  })),
});

// ── Close (fold 5) ──────────────────────────────────────────
const closeSchema = z.object({
  leadIn:    z.string(),
  statement: z.string(),
  email:     z.string().email(),
});

// ── Collection registry ─────────────────────────────────────
// Each fold gets its own collection with one entry (the current content).
// Slugs: 'default' for each.
const landing = defineCollection({
  type: 'data',
  schema: z.object({
    hero:   heroSchema,
    who:    whoSchema,
    work:   workSchema,
    engage: engageSchema,
    close:  closeSchema,
  }),
});

// ── Writing (blog) ──────────────────────────────────────────
// Markdown posts live in src/content/writing/*.md with frontmatter.
// Future: swap loader to pull from EmDash 'posts' collection.
const writing = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    summary: z.string().optional(),
    date: z.coerce.date(),
    draft: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { landing, writing };
