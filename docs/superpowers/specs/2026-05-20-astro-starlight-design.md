# Vibecoding Guide — Site Design Spec
**Date:** 2026-05-20
**Framework:** Astro Starlight (Option A — CSS variable theming)
**Status:** Approved

---

## 1. Purpose

A public guide to AI-assisted development ("vibecoding") covering the full landscape: how to pick an AI, which IDE to use, how to work with Claude and other tools, and practical cheatsheets that work as both reference material and AI context drops. Target audience: complete beginners through advanced users.

---

## 2. Deployment

- **Host:** Vercel via GitHub Git integration (push → auto-deploy)
- **Domain:** Vercel subdomain for launch (`vibecoding-guide.vercel.app` or similar); custom domain added later
- **Build:** `astro build` — Vercel auto-detects Astro, no `vercel.json` needed
- **`site` URL:** Omitted from `astro.config.mjs` until custom domain is confirmed

---

## 3. Framework & Theming

### Framework
Astro Starlight scaffolded via `npm create astro@latest -- --template starlight`.

### Theme approach
- Default to dark mode; light/dark toggle visible so users can switch
- Dark purple palette from the mockup applied via CSS custom properties in `src/styles/custom.css`
- Imported via Starlight's `customCss` config option — no extra packages

### Palette (dark mode)
| CSS variable | Value | Role |
|---|---|---|
| `--sl-color-accent` | `#a78bfa` | Links, active sidebar item |
| `--sl-color-accent-high` | `#c4b5fd` | Hover, TOC active |
| `--sl-color-accent-low` | `rgba(167,139,250,0.15)` | Active sidebar background |
| `--sl-color-bg` | `#0f0e17` | Main content background |
| `--sl-color-bg-nav` | `#13111c` | Topbar background |
| `--sl-color-bg-sidebar` | `#13111c` | Sidebar background |
| `--sl-color-hairline` | `rgba(255,255,255,0.07)` | Dividers |
| `--sl-color-text` | `#e4e4e7` | Body text |
| `--sl-color-text-accent` | `#c4b5fd` | Accent text |

Light mode uses Starlight defaults — full custom light palette is a later pass.

---

## 4. Site Structure

### Top navigation (topbar)
`Guides` · `AI Landscape` · `Cheatsheets` · `Reference`

### Content directory
```
src/content/docs/
├── index.mdx                        # Landing page — guide picker hero
│
├── guides/                          # Vibecoding how-to guides
│   ├── vscode-cli/                  # VS Code + Claude CLI (launch guide)
│   │   ├── index.md
│   │   ├── install.md
│   │   ├── first-steps.md
│   │   └── daily-workflow.md
│   └── claude-desktop/              # Claude Desktop (launch guide)
│       ├── index.md
│       ├── setup.md
│       ├── projects.md
│       └── mcp-servers.md
│
├── ai-landscape/                    # Understanding the AI ecosystem
│   ├── index.md                     # Overview and orientation
│   ├── ides.md                      # IDE comparison + AI features
│   ├── ai-for-coding.md             # Best AIs for coding work
│   ├── ai-for-writing.md            # Best AIs for writing and editing
│   ├── ai-for-images.md             # Image generation AI
│   ├── ai-for-translation.md        # Translation AI
│   └── open-source.md               # Free/open source alternatives (Ollama, LM Studio, Mistral, etc.)
│
├── cheatsheets/                     # Cheatsheet gallery + individual sheets
│   ├── index.md                     # Filterable gallery with tag chips
│   ├── meta/
│   │   ├── how-to-concept.md        # What makes a good cheatsheet
│   │   ├── cheatsheet-for-ai.md     # How to format cheatsheets for AI context drops
│   │   └── creation-workflow.md     # The cheatsheet creation process
│   ├── git.md                       # Git essentials
│   ├── claude-cli.md                # Claude CLI slash commands + shortcuts
│   ├── prompt-patterns.md           # Reusable prompt recipes
│   ├── claude-md-template.md        # CLAUDE.md ready-to-copy template
│   ├── vscode-ai-shortcuts.md       # VS Code AI extension shortcuts
│   ├── open-source-models.md        # Ollama models quick reference
│   └── markdown-mdx.md              # Markdown/MDX reference
│
└── reference/                       # Advanced shared content
    ├── claude-md.md
    ├── token-control.md
    ├── superpowers-overview.md
    ├── orchestrator-workflow.md
    ├── multi-agent.md
    ├── building-skills.md
    ├── ralph-loop.md
    └── infobank.md
```

### Assets
```
src/assets/          # Images and diagrams referenced in MDX
public/              # Favicon, OG image, static files
src/styles/
└── custom.css       # All CSS variable overrides
```

---

## 5. Sidebar Navigation

Each guide section is a **collapsible group** in the sidebar. The active guide's group is expanded by default; other groups are collapsed. This reduces visual noise for beginners without requiring custom component overrides.

True per-route isolation (hiding all other groups entirely) requires overriding Starlight's sidebar component — deferred to the custom theme pass.

The `ai-landscape`, `cheatsheets`, and `reference` sections use standard Starlight sidebar groups.

Sidebar groups declared in `astro.config.mjs`:
- **Getting Started** (within each guide)
- **AI Landscape**
- **Cheatsheets** (with `meta/` subgroup)
- **Reference**

---

## 6. Landing Page

`src/content/docs/index.mdx` using Starlight's `template: splash` frontmatter.

Content:
- Headline: "Vibecoding Guide"
- Tagline: one-liner on AI-assisted development
- Two primary CTA buttons: "Start with VS Code + CLI" and "Start with Claude Desktop"
- Secondary link: "Explore the AI Landscape"

Full custom landing page (beyond Starlight's splash template) is a deferred pass.

---

## 7. Cheatsheet Gallery

`cheatsheets/index.md` — a card grid with:
- **Featured row** at top (hand-curated, 3–4 cheatsheets)
- **Filterable grid** below using tag chips
- Each card: title, one-line description, tag chips, cheatsheet preview thumbnail

### Tag taxonomy (stored in MDX frontmatter)

| Dimension | Tags |
|---|---|
| Tool | `git` `claude` `vscode` `terminal` `ollama` `codex` |
| Use case | `coding` `writing` `ai-context` `workflow` `reference` |
| Audience | `beginner` `advanced` |
| Format | `printable` `pasteable` |

Tag filtering: client-side vanilla JS on the gallery page. Pagefind handles full-text search across cheatsheet content.

### Cheatsheet page format
Each cheatsheet uses a custom `<CheatsheetCard>` Astro component: dark card grid, copy-on-click code snippets, compact layout optimised for screenshotting and pasting into AI.

---

## 8. `astro.config.mjs` Shape

```js
import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'

export default defineConfig({
  integrations: [
    starlight({
      title: 'Vibecoding Guide',
      customCss: ['./src/styles/custom.css'],
      editLink: {
        baseUrl: 'https://github.com/<org>/vibecoding-guide/edit/main/',
      },
      social: {
        github: 'https://github.com/<org>/vibecoding-guide',
      },
      sidebar: [
        // Guides (isolated per guide via autogenerate or explicit items)
        { label: 'VS Code + Claude CLI', autogenerate: { directory: 'guides/vscode-cli' } },
        { label: 'Claude Desktop',       autogenerate: { directory: 'guides/claude-desktop' } },
        // Sections
        { label: 'AI Landscape',         autogenerate: { directory: 'ai-landscape' } },
        { label: 'Cheatsheets',          autogenerate: { directory: 'cheatsheets' } },
        { label: 'Reference',            autogenerate: { directory: 'reference' } },
      ],
    }),
  ],
})
```

`<org>` placeholder replaced when GitHub repo is created.

---

## 9. Search

Pagefind — built into Starlight, zero config, static. Works on Vercel. No external service needed at launch scale.

---

## 10. Deferred Phases

These are confirmed features, not descoped — each gets its own spec when the time comes:

| Feature | Notes |
|---|---|
| Norwegian translation | Starlight i18n (`en/` + `no/` directories) + Claude API translation script for MDX files. Frontmatter, code blocks, and internal links must survive translation. |
| Cheatsheet agent | A Claude-powered skill that takes project context and suggests/generates cheatsheets. Lives as a CLAUDE.md + skill file. Gets its own guide page ("Using the Cheatsheet Agent"). |
| Download cheatsheet as PNG | `html2canvas` or pre-generated PNGs in `public/`. Deferred until cheatsheet content is stable. |
| Full custom light theme | `custom.css` light-mode palette to match the design language. |
| Custom domain | Add `site:` to `astro.config.mjs` when domain is confirmed. |
| Additional guides | Codex, Google Gemini, and others added as `guides/<name>/` directories. |
| Blog / changelog | Starlight blog plugin available if needed. |
| OG images | Per-page social preview images. |
