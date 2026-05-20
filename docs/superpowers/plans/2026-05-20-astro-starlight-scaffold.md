# Vibecoding Guide — Astro Starlight Scaffold

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Scaffold and configure a fully themed Astro Starlight site with all stub pages, a working CheatsheetGallery with client-side tag filtering, one complete guide (VS Code + CLI), and one complete cheatsheet (Git) — deployable on Vercel.

**Architecture:** Astro Starlight with CSS variable theming (dark purple palette in `custom.css`). The only business logic — cheatsheet tag filtering — lives in a pure TypeScript utility function (`src/utils/filter.ts`) tested with Vitest. The gallery UI is an Astro island component (`client:load`). All other content is MDX/Markdown in Astro's content collection, with an extended schema that adds `tags` and `featured` fields for cheatsheets.

**Tech Stack:** Astro 4+ (latest), `@astrojs/starlight`, TypeScript (strict), Vitest, vanilla JS for DOM interactions, scoped CSS inside `.astro` components.

---

## File Map

```
vibecoding-guide/
├── astro.config.mjs                           MODIFY  (replace generated config)
├── package.json                               MODIFY  (add test script)
├── tsconfig.json                              CREATED by scaffold
├── vitest.config.ts                           CREATE
├── src/
│   ├── content/
│   │   ├── config.ts                          MODIFY  (extend schema for tags/featured)
│   │   └── docs/
│   │       ├── index.mdx                      CREATE  (landing page — splash template)
│   │       ├── guides/
│   │       │   ├── vscode-cli/
│   │       │   │   ├── index.md               CREATE  (full content — guide intro)
│   │       │   │   ├── install.md             CREATE  (full content)
│   │       │   │   ├── first-steps.md         CREATE  (stub)
│   │       │   │   └── daily-workflow.md      CREATE  (stub)
│   │       │   └── claude-desktop/
│   │       │       ├── index.md               CREATE  (stub)
│   │       │       ├── setup.md               CREATE  (stub)
│   │       │       ├── projects.md            CREATE  (stub)
│   │       │       └── mcp-servers.md         CREATE  (stub)
│   │       ├── ai-landscape/
│   │       │   ├── index.md                   CREATE  (stub)
│   │       │   ├── ides.md                    CREATE  (stub)
│   │       │   ├── ai-for-coding.md           CREATE  (stub)
│   │       │   ├── ai-for-writing.md          CREATE  (stub)
│   │       │   ├── ai-for-images.md           CREATE  (stub)
│   │       │   ├── ai-for-translation.md      CREATE  (stub)
│   │       │   └── open-source.md             CREATE  (stub)
│   │       ├── cheatsheets/
│   │       │   ├── index.mdx                  CREATE  (gallery page — uses CheatsheetGallery)
│   │       │   ├── meta/
│   │       │   │   ├── how-to-concept.md      CREATE  (stub)
│   │       │   │   ├── cheatsheet-for-ai.md   CREATE  (stub)
│   │       │   │   └── creation-workflow.md   CREATE  (stub)
│   │       │   ├── git.mdx                    CREATE  (full content — reference cheatsheet)
│   │       │   ├── claude-cli.md              CREATE  (stub)
│   │       │   ├── prompt-patterns.md         CREATE  (stub)
│   │       │   ├── claude-md-template.md      CREATE  (stub)
│   │       │   ├── vscode-ai-shortcuts.md     CREATE  (stub)
│   │       │   ├── open-source-models.md      CREATE  (stub)
│   │       │   └── markdown-mdx.md            CREATE  (stub)
│   │       └── reference/
│   │           ├── claude-md.md               CREATE  (stub)
│   │           ├── token-control.md           CREATE  (stub)
│   │           ├── superpowers-overview.md    CREATE  (stub)
│   │           ├── orchestrator-workflow.md   CREATE  (stub)
│   │           ├── multi-agent.md             CREATE  (stub)
│   │           ├── building-skills.md         CREATE  (stub)
│   │           ├── ralph-loop.md              CREATE  (stub)
│   │           └── infobank.md                CREATE  (stub)
│   ├── components/
│   │   ├── CheatsheetCard.astro               CREATE
│   │   └── CheatsheetGallery.astro            CREATE
│   ├── assets/                                CREATED by scaffold (keep)
│   └── styles/
│       └── custom.css                         CREATE
└── public/                                    CREATED by scaffold (keep)
```

---

## Task 1: Scaffold Astro Starlight

**Files:**
- Create: all scaffold output files (`package.json`, `tsconfig.json`, `astro.config.mjs`, `src/`, `public/`)

- [ ] **Step 1: Run scaffold in the current directory**

```bash
npm create astro@latest . -- --template starlight --no-git
```

When prompted:
- Project directory: `.` (dot — current directory)
- Install dependencies: Yes
- TypeScript: Yes, Strict

If asked whether to overwrite `.gitignore`: **No** — the existing one already covers Astro correctly.

- [ ] **Step 2: Verify dev server starts**

```bash
npm run dev
```

Expected: dev server running at `http://localhost:4321` with no errors.

- [ ] **Step 3: Stop dev server and commit scaffold**

```bash
git add package.json package-lock.json tsconfig.json astro.config.mjs src/ public/
git commit -m "feat: scaffold Astro Starlight"
```

---

## Task 2: Replace `astro.config.mjs` with full config

**Files:**
- Modify: `astro.config.mjs`

- [ ] **Step 1: Overwrite `astro.config.mjs`**

```js
// astro.config.mjs
import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'

export default defineConfig({
  integrations: [
    starlight({
      title: 'Vibecoding Guide',
      customCss: ['./src/styles/custom.css'],
      editLink: {
        baseUrl: 'https://github.com/Knyttneven/vibecoding-guide/edit/main/',
      },
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/Knyttneven/vibecoding-guide' },
      ],
      sidebar: [
        {
          label: 'Guides',
          items: [
            { label: 'VS Code + Claude CLI', autogenerate: { directory: 'guides/vscode-cli' } },
            { label: 'Claude Desktop', autogenerate: { directory: 'guides/claude-desktop' } },
          ],
        },
        { label: 'AI Landscape', autogenerate: { directory: 'ai-landscape' } },
        { label: 'Cheatsheets', autogenerate: { directory: 'cheatsheets' } },
        { label: 'Reference', autogenerate: { directory: 'reference' } },
      ],
    }),
  ],
})
```

> **Note:** Update the GitHub URL if the repo name differs from `vibecoding-guide`.

> **Note on top nav:** Starlight's topbar shows the site title, social links, theme toggle, and search — it does not support custom navigation links without a component override. The sidebar IS the primary navigation. Adding topbar nav links (Guides · AI Landscape · Cheatsheets · Reference) is deferred to the custom theme pass.

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: Build completes with no errors (some "missing content" warnings are OK at this stage — content files don't exist yet).

- [ ] **Step 3: Commit**

```bash
git add astro.config.mjs
git commit -m "feat: configure Starlight sidebar and site metadata"
```

---

## Task 3: Create dark purple CSS theme

**Files:**
- Create: `src/styles/custom.css`

- [ ] **Step 1: Create `src/styles/` directory and write `custom.css`**

```css
/* src/styles/custom.css */
/* Dark purple palette — matches the mockup design */
:root[data-theme='dark'],
:root {
  --sl-color-accent:           #a78bfa;
  --sl-color-accent-high:      #c4b5fd;
  --sl-color-accent-low:       rgba(167, 139, 250, 0.15);
  --sl-color-bg:               #0f0e17;
  --sl-color-bg-nav:           #13111c;
  --sl-color-bg-sidebar:       #13111c;
  --sl-color-bg-inline-code:   rgba(167, 139, 250, 0.1);
  --sl-color-hairline-light:   rgba(255, 255, 255, 0.07);
  --sl-color-hairline-shade:   rgba(255, 255, 255, 0.04);
  --sl-color-text:             #e4e4e7;
  --sl-color-text-accent:      #c4b5fd;
  --sl-color-white:            #e4e4e7;
  --sl-color-gray-1:           #a1a1aa;
  --sl-color-gray-2:           #71717a;
  --sl-color-gray-3:           #52525b;
  --sl-color-gray-4:           #3f3f46;
  --sl-color-gray-5:           #27272a;
  --sl-color-gray-6:           #18181b;
  --sl-color-black:            #0f0e17;
}
```

- [ ] **Step 2: Start dev server and verify dark purple theme applies**

```bash
npm run dev
```

Open `http://localhost:4321`. The topbar and sidebar background should be `#13111c` (near-black with a slight purple tint), accent colour purple. Stop server.

- [ ] **Step 3: Commit**

```bash
git add src/styles/custom.css
git commit -m "feat: apply dark purple CSS theme"
```

---

## Task 4: Extend content schema for cheatsheet frontmatter

**Files:**
- Modify: `src/content/config.ts`

- [ ] **Step 1: Overwrite `src/content/config.ts`**

```ts
// src/content/config.ts
import { defineCollection, z } from 'astro:content'
import { docsSchema } from '@astrojs/starlight/schema'

export const collections = {
  docs: defineCollection({
    schema: docsSchema({
      extend: z.object({
        tags: z.array(z.string()).optional().default([]),
        featured: z.boolean().optional().default(false),
      }),
    }),
  }),
}
```

- [ ] **Step 2: Verify build still passes**

```bash
npm run build
```

Expected: no TypeScript errors.

- [ ] **Step 3: Commit**

```bash
git add src/content/config.ts
git commit -m "feat: extend content schema with tags and featured fields"
```

---

## Task 5: Create all stub content files

**Files:**
- Create: all stub `.md` files listed below

Stub frontmatter template — apply to every file listed:

```md
---
title: <title from list below>
description: <description from list below>
---

Coming soon.
```

- [ ] **Step 1: Create guides stubs**

`src/content/docs/guides/vscode-cli/first-steps.md`
- title: `First Steps with Claude CLI`
- description: `Run your first Claude CLI session inside VS Code.`

`src/content/docs/guides/vscode-cli/daily-workflow.md`
- title: `Daily Workflow`
- description: `How to integrate Claude CLI into your everyday coding routine.`

`src/content/docs/guides/claude-desktop/index.md`
- title: `Claude Desktop Guide`
- description: `Set up Claude Desktop and use it as your daily AI workspace.`

`src/content/docs/guides/claude-desktop/setup.md`
- title: `Setting Up Claude Desktop`
- description: `Download, install, and authenticate Claude Desktop on your machine.`

`src/content/docs/guides/claude-desktop/projects.md`
- title: `Claude Projects`
- description: `Use Claude Projects to maintain persistent context across conversations.`

`src/content/docs/guides/claude-desktop/mcp-servers.md`
- title: `MCP Servers`
- description: `Connect external tools to Claude Desktop using MCP server integrations.`

- [ ] **Step 2: Create ai-landscape stubs**

`src/content/docs/ai-landscape/index.md`
- title: `The AI Landscape`
- description: `A map of the AI ecosystem — which tools exist, what they do, and how to choose.`

`src/content/docs/ai-landscape/ides.md`
- title: `IDE Comparison`
- description: `VS Code, Cursor, Windsurf, JetBrains — AI features compared side by side.`

`src/content/docs/ai-landscape/ai-for-coding.md`
- title: `AI for Coding`
- description: `The best AI tools for writing, reviewing, and debugging code.`

`src/content/docs/ai-landscape/ai-for-writing.md`
- title: `AI for Writing`
- description: `AI tools for editing, drafting, and improving written content.`

`src/content/docs/ai-landscape/ai-for-images.md`
- title: `AI for Images`
- description: `Image generation and editing AI — Midjourney, DALL·E, Stable Diffusion, and open source options.`

`src/content/docs/ai-landscape/ai-for-translation.md`
- title: `AI for Translation`
- description: `Translation AI — quality comparison, free options, and when to use each.`

`src/content/docs/ai-landscape/open-source.md`
- title: `Open Source AI`
- description: `Free and open source AI tools that run locally — Ollama, LM Studio, Mistral, and more.`

- [ ] **Step 3: Create cheatsheets/meta stubs**

`src/content/docs/cheatsheets/meta/how-to-concept.md`
- title: `How to Concept a Cheatsheet`
- description: `What separates a useful cheatsheet from visual noise — structure, density, and scope.`

`src/content/docs/cheatsheets/meta/cheatsheet-for-ai.md`
- title: `Cheatsheets as AI Context`
- description: `How to format cheatsheets so AI tools can read and apply them effectively.`

`src/content/docs/cheatsheets/meta/creation-workflow.md`
- title: `Cheatsheet Creation Workflow`
- description: `The end-to-end process for going from idea to a finished, published cheatsheet.`

- [ ] **Step 4: Create cheatsheet stubs**

`src/content/docs/cheatsheets/claude-cli.md`
- title: `Claude CLI`
- description: `Slash commands, keyboard shortcuts, and permission flags for Claude CLI.`
- frontmatter also needs: `tags: [claude, coding, beginner, pasteable]`

`src/content/docs/cheatsheets/prompt-patterns.md`
- title: `Prompt Patterns`
- description: `Reusable prompt recipes — act-as, chain-of-thought, context drops, and more.`
- frontmatter also needs: `tags: [claude, ai-context, workflow, beginner, pasteable]`

`src/content/docs/cheatsheets/claude-md-template.md`
- title: `CLAUDE.md Template`
- description: `Ready-to-copy CLAUDE.md structure for any project.`
- frontmatter also needs: `tags: [claude, workflow, reference, pasteable]`

`src/content/docs/cheatsheets/vscode-ai-shortcuts.md`
- title: `VS Code AI Shortcuts`
- description: `Keyboard shortcuts for Claude CLI, GitHub Copilot, and Cursor inside VS Code.`
- frontmatter also needs: `tags: [vscode, coding, beginner, printable]`

`src/content/docs/cheatsheets/open-source-models.md`
- title: `Open Source Models`
- description: `Ollama model quick reference — what each model is good for and hardware requirements.`
- frontmatter also needs: `tags: [ollama, coding, reference, beginner]`

`src/content/docs/cheatsheets/markdown-mdx.md`
- title: `Markdown & MDX`
- description: `Markdown syntax and MDX component usage — for writing docs and project files.`
- frontmatter also needs: `tags: [workflow, reference, beginner, printable]`

- [ ] **Step 5: Create reference stubs**

`src/content/docs/reference/claude-md.md`
- title: `CLAUDE.md Deep Dive`
- description: `Everything about CLAUDE.md — structure, best practices, and examples.`

`src/content/docs/reference/token-control.md`
- title: `Token Control`
- description: `Strategies for stopping Claude from reading the entire codebase on every request.`

`src/content/docs/reference/superpowers-overview.md`
- title: `Superpowers Skills`
- description: `An overview of the Superpowers skill system and how to use it.`

`src/content/docs/reference/orchestrator-workflow.md`
- title: `Orchestrator Workflow`
- description: `Using multi-AI prompt crafting with an orchestrator pattern.`

`src/content/docs/reference/multi-agent.md`
- title: `Multi-Agent Patterns`
- description: `How to coordinate multiple AI agents for complex tasks.`

`src/content/docs/reference/building-skills.md`
- title: `Building Custom Skills`
- description: `How to write, test, and deploy custom Superpowers skills.`

`src/content/docs/reference/ralph-loop.md`
- title: `Ralph Loop`
- description: `Automating repetitive workflows with Ralph Loop.`

`src/content/docs/reference/infobank.md`
- title: `Infobank Systems`
- description: `Domain invariant knowledge systems — building an always-available project context.`

- [ ] **Step 6: Verify build passes with all stubs**

```bash
npm run build
```

Expected: Build completes. All pages resolve. No "missing content" errors.

- [ ] **Step 7: Commit**

```bash
git add src/content/docs/
git commit -m "feat: add all stub content pages"
```

---

## Task 6: Write the landing page

**Files:**
- Create: `src/content/docs/index.mdx`

- [ ] **Step 1: Create `src/content/docs/index.mdx`**

```mdx
---
title: Vibecoding Guide
description: Your guide to AI-assisted development — from first setup to advanced multi-agent workflows.
template: splash
hero:
  tagline: Learn to work with AI tools effectively. Pick a guide and start building.
  actions:
    - text: VS Code + Claude CLI
      link: /guides/vscode-cli/
      icon: right-arrow
      variant: primary
    - text: Claude Desktop
      link: /guides/claude-desktop/
      icon: right-arrow
    - text: Explore the AI Landscape
      link: /ai-landscape/
      icon: open-book
      variant: minimal
---

import { CardGrid, Card } from '@astrojs/starlight/components'

## What is vibecoding?

Vibecoding is AI-assisted development — working with Claude, Codex, and other AI tools as active collaborators in your workflow. This guide covers the tools, patterns, and cheatsheets that make it work.

<CardGrid>
  <Card title="Guides" icon="rocket">
    Step-by-step walkthroughs for getting started with VS Code + Claude CLI, Claude Desktop, and more.
  </Card>
  <Card title="AI Landscape" icon="puzzle">
    Which AI is right for your task? IDE comparison, open source options, and tool selection.
  </Card>
  <Card title="Cheatsheets" icon="document">
    Compact visual reference cards — screenshot or paste into AI for instant workflow context.
  </Card>
  <Card title="Reference" icon="open-book">
    Deep dives into CLAUDE.md, token control, Superpowers skills, Ralph Loop, and more.
  </Card>
</CardGrid>
```

- [ ] **Step 2: Verify landing page renders**

```bash
npm run dev
```

Open `http://localhost:4321`. You should see the hero section with the tagline and three CTA buttons, plus the four cards below. Stop server.

- [ ] **Step 3: Commit**

```bash
git add src/content/docs/index.mdx
git commit -m "feat: write landing page with hero and card grid"
```

---

## Task 7: Build verification checkpoint #1

**Files:** (none changed)

- [ ] **Step 1: Run full production build**

```bash
npm run build
```

Expected output:
```
✓ Built in X.XXs
```
No errors. Warnings about missing images are OK.

- [ ] **Step 2: Preview the build**

```bash
npm run preview
```

Open `http://localhost:4321`. Navigate: landing page → sidebar links → verify all stub pages load with "Coming soon." content. Stop server.

- [ ] **Step 3: Commit checkpoint marker**

```bash
git commit --allow-empty -m "chore: build checkpoint — scaffold complete"
```

---

## Task 8: Install Vitest and write failing filter tests

**Files:**
- Create: `vitest.config.ts`
- Create: `src/utils/filter.test.ts`
- Modify: `package.json` (add test script)

- [ ] **Step 1: Install Vitest**

```bash
npm install --save-dev vitest
```

- [ ] **Step 2: Create `vitest.config.ts`**

```ts
// vitest.config.ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
})
```

- [ ] **Step 3: Add test script to `package.json`**

Open `package.json` and add `"test": "vitest run"` to the `scripts` section. The scripts object should look like:

```json
"scripts": {
  "dev": "astro dev",
  "start": "astro dev",
  "build": "astro check && astro build",
  "preview": "astro preview",
  "astro": "astro",
  "test": "vitest run"
}
```

- [ ] **Step 4: Write the failing test at `src/utils/filter.test.ts`**

```ts
// src/utils/filter.test.ts
import { describe, it, expect } from 'vitest'
import { filterByTags } from './filter'

const sheets = [
  { id: 'git', tags: ['git', 'workflow', 'beginner'] },
  { id: 'claude-cli', tags: ['claude', 'coding', 'beginner'] },
  { id: 'prompt-patterns', tags: ['claude', 'ai-context', 'advanced'] },
]

describe('filterByTags', () => {
  it('returns all entries when activeTags is empty', () => {
    expect(filterByTags(sheets, [])).toHaveLength(3)
  })

  it('filters by a single tag', () => {
    const result = filterByTags(sheets, ['claude'])
    expect(result).toHaveLength(2)
    expect(result.map(s => s.id)).toEqual(['claude-cli', 'prompt-patterns'])
  })

  it('uses AND logic for multiple tags', () => {
    const result = filterByTags(sheets, ['claude', 'beginner'])
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe('claude-cli')
  })

  it('returns an empty array when no entries match', () => {
    expect(filterByTags(sheets, ['nonexistent'])).toHaveLength(0)
  })
})
```

- [ ] **Step 5: Run test — confirm it fails**

```bash
npm test
```

Expected: FAIL — `Cannot find module './filter'`

- [ ] **Step 6: Commit**

```bash
git add vitest.config.ts src/utils/filter.test.ts package.json package-lock.json
git commit -m "test: add failing filter unit tests"
```

---

## Task 9: Implement `filterByTags` — make tests pass

**Files:**
- Create: `src/utils/filter.ts`

- [ ] **Step 1: Create `src/utils/filter.ts`**

```ts
// src/utils/filter.ts
export type TaggableEntry = { id: string; tags: string[] }

export function filterByTags<T extends TaggableEntry>(
  entries: T[],
  activeTags: string[]
): T[] {
  if (activeTags.length === 0) return entries
  return entries.filter(entry =>
    activeTags.every(tag => entry.tags.includes(tag))
  )
}
```

- [ ] **Step 2: Run tests — confirm all pass**

```bash
npm test
```

Expected:
```
✓ src/utils/filter.test.ts (4)
  ✓ filterByTags > returns all entries when activeTags is empty
  ✓ filterByTags > filters by a single tag
  ✓ filterByTags > uses AND logic for multiple tags
  ✓ filterByTags > returns an empty array when no entries match

Test Files  1 passed (1)
Tests       4 passed (4)
```

- [ ] **Step 3: Commit**

```bash
git add src/utils/filter.ts
git commit -m "feat: implement filterByTags utility"
```

---

## Task 10: Build `CheatsheetCard.astro`

**Files:**
- Create: `src/components/CheatsheetCard.astro`

- [ ] **Step 1: Create `src/components/CheatsheetCard.astro`**

```astro
---
// src/components/CheatsheetCard.astro
interface Props {
  title: string
  description: string
  href: string
  tags: string[]
  featured?: boolean
}

const { title, description, href, tags, featured = false } = Astro.props
---

<a href={href} class:list={['cheatsheet-card', { featured }]}>
  <div class="card-header">
    <h3 class="card-title">{title}</h3>
    {featured && <span class="featured-badge">Featured</span>}
  </div>
  <p class="card-description">{description}</p>
  <div class="tag-list" aria-label="Tags">
    {tags.map(tag => <span class="tag">{tag}</span>)}
  </div>
</a>

<style>
  .cheatsheet-card {
    display: block;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 10px;
    padding: 1.25rem;
    text-decoration: none;
    transition: border-color 0.15s, background 0.15s;
  }

  .cheatsheet-card:hover {
    border-color: rgba(167, 139, 250, 0.4);
    background: rgba(167, 139, 250, 0.06);
  }

  .cheatsheet-card.featured {
    border-color: rgba(167, 139, 250, 0.3);
    background: linear-gradient(135deg, rgba(167, 139, 250, 0.1), rgba(96, 165, 250, 0.04));
  }

  .card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
  }

  .card-title {
    font-size: 1rem;
    font-weight: 700;
    color: #c4b5fd;
    margin: 0;
  }

  .featured-badge {
    flex-shrink: 0;
    font-size: 0.65rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: #4ade80;
    background: rgba(74, 222, 128, 0.1);
    border: 1px solid rgba(74, 222, 128, 0.25);
    padding: 2px 8px;
    border-radius: 100px;
  }

  .card-description {
    font-size: 0.8rem;
    color: #71717a;
    line-height: 1.5;
    margin: 0 0 0.75rem;
  }

  .tag-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem;
  }

  .tag {
    font-size: 0.65rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: #a1a1aa;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.1);
    padding: 2px 8px;
    border-radius: 100px;
  }
</style>
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: no errors (component not used yet — that's fine).

- [ ] **Step 3: Commit**

```bash
git add src/components/CheatsheetCard.astro
git commit -m "feat: add CheatsheetCard component"
```

---

## Task 11: Build `CheatsheetGallery.astro`

**Files:**
- Create: `src/components/CheatsheetGallery.astro`

- [ ] **Step 1: Create `src/components/CheatsheetGallery.astro`**

```astro
---
// src/components/CheatsheetGallery.astro
import { getCollection } from 'astro:content'
import CheatsheetCard from './CheatsheetCard.astro'

const allDocs = await getCollection('docs')

const cheatsheets = allDocs
  .filter(doc =>
    doc.id.startsWith('cheatsheets/') &&
    doc.id !== 'cheatsheets/index' &&
    !doc.id.startsWith('cheatsheets/meta/')
  )
  .map(doc => ({
    id: doc.id,
    title: doc.data.title,
    description: doc.data.description ?? '',
    href: `/${doc.id.replace(/\.mdx?$/, '')}/`,
    tags: doc.data.tags ?? [],
    featured: doc.data.featured ?? false,
  }))

const featured = cheatsheets.filter(s => s.featured)
const allTags = [...new Set(cheatsheets.flatMap(s => s.tags))].sort()
---

<div id="cheatsheet-gallery">
  <div class="tag-filter" role="toolbar" aria-label="Filter by tag">
    <span class="filter-label">Filter:</span>
    {allTags.map(tag => (
      <button class="tag-chip" data-tag={tag} aria-pressed="false">{tag}</button>
    ))}
    <button class="tag-chip reset" id="reset-filter" style="display:none">Clear</button>
  </div>

  {featured.length > 0 && (
    <section class="featured-section">
      <h2 class="section-label">Featured</h2>
      <div class="card-grid">
        {featured.map(sheet => (
          <div class="card-wrapper" data-tags={sheet.tags.join(',')}>
            <CheatsheetCard {...sheet} />
          </div>
        ))}
      </div>
    </section>
  )}

  <section>
    <h2 class="section-label">All Cheatsheets</h2>
    <div class="card-grid" id="all-grid">
      {cheatsheets.map(sheet => (
        <div class="card-wrapper" data-tags={sheet.tags.join(',')}>
          <CheatsheetCard {...sheet} />
        </div>
      ))}
    </div>
    <p id="no-results" style="display:none;">No cheatsheets match the selected tags.</p>
  </section>
</div>

<style>
  #cheatsheet-gallery {
    padding-top: 0.5rem;
  }

  .tag-filter {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.4rem;
    margin-bottom: 2rem;
  }

  .filter-label {
    font-size: 0.7rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: #52525b;
    margin-right: 0.25rem;
  }

  .tag-chip {
    font-size: 0.7rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: #a1a1aa;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    padding: 4px 12px;
    border-radius: 100px;
    cursor: pointer;
    transition: all 0.12s;
  }

  .tag-chip:hover {
    border-color: rgba(167, 139, 250, 0.4);
    color: #c4b5fd;
  }

  .tag-chip[aria-pressed='true'] {
    background: rgba(167, 139, 250, 0.15);
    border-color: rgba(167, 139, 250, 0.5);
    color: #c4b5fd;
  }

  .tag-chip.reset {
    color: #f87171;
    border-color: rgba(248, 113, 113, 0.3);
    background: rgba(248, 113, 113, 0.08);
  }

  .section-label {
    font-size: 0.7rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #52525b;
    margin: 0 0 1rem;
    border: none;
    padding: 0;
  }

  .featured-section {
    margin-bottom: 2.5rem;
  }

  .card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 1rem;
  }

  #no-results {
    text-align: center;
    padding: 2rem 0;
    color: #52525b;
    font-size: 0.875rem;
  }
</style>

<script>
  const chips = document.querySelectorAll<HTMLButtonElement>('.tag-chip:not(.reset)')
  const wrappers = document.querySelectorAll<HTMLElement>('.card-wrapper')
  const resetBtn = document.getElementById('reset-filter') as HTMLButtonElement
  const noResults = document.getElementById('no-results') as HTMLParagraphElement
  const active = new Set<string>()

  function refresh() {
    let visible = 0
    wrappers.forEach(w => {
      const wTags = w.dataset.tags ? w.dataset.tags.split(',') : []
      const show = active.size === 0 || [...active].every(t => wTags.includes(t))
      w.style.display = show ? '' : 'none'
      if (show) visible++
    })
    noResults.style.display = visible === 0 ? '' : 'none'
    resetBtn.style.display = active.size > 0 ? '' : 'none'
  }

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      const tag = chip.dataset.tag!
      if (active.has(tag)) {
        active.delete(tag)
        chip.setAttribute('aria-pressed', 'false')
      } else {
        active.add(tag)
        chip.setAttribute('aria-pressed', 'true')
      }
      refresh()
    })
  })

  resetBtn.addEventListener('click', () => {
    active.clear()
    chips.forEach(c => c.setAttribute('aria-pressed', 'false'))
    refresh()
  })
</script>
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/CheatsheetGallery.astro
git commit -m "feat: add CheatsheetGallery component with client-side tag filtering"
```

---

## Task 12: Wire `cheatsheets/index.mdx` with the gallery

**Files:**
- Create: `src/content/docs/cheatsheets/index.mdx`

- [ ] **Step 1: Create `src/content/docs/cheatsheets/index.mdx`**

```mdx
---
title: Cheatsheet Gallery
description: Visual reference cards for git, Claude, prompts, and more — designed to be screenshotted or pasted into AI as workflow context.
---

import CheatsheetGallery from '../../../components/CheatsheetGallery.astro'

Compact reference cards you can screenshot or paste directly into Claude and other AI tools as workflow context. Filter by tag to find what you need.

<CheatsheetGallery />
```

- [ ] **Step 2: Verify gallery renders with tag filter**

```bash
npm run dev
```

Open `http://localhost:4321/cheatsheets/`. You should see:
- The tag filter bar with all collected tags as chips
- A "Featured" section (if any cheatsheets have `featured: true`)
- An "All Cheatsheets" grid showing all cheatsheet cards
- Clicking a tag chip filters the grid
- Clicking "Clear" resets filters

Stop server.

- [ ] **Step 3: Commit**

```bash
git add src/content/docs/cheatsheets/index.mdx
git commit -m "feat: wire cheatsheet gallery page"
```

---

## Task 13: Write the Git cheatsheet

**Files:**
- Create: `src/content/docs/cheatsheets/git.mdx`

- [ ] **Step 1: Create `src/content/docs/cheatsheets/git.mdx`**

```mdx
---
title: Git Essentials
description: The 20 git commands that cover 95% of daily work — commits, branches, stash, and recovery.
tags: [git, workflow, beginner, printable, pasteable]
featured: true
---

## Setup

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

## Daily Workflow

```bash
git status                    # what changed?
git add <file>                # stage a specific file
git add .                     # stage all changes
git commit -m "message"       # commit staged changes
git push                      # push to remote
git pull                      # pull latest from remote
```

## Branches

```bash
git branch                    # list all branches
git branch <name>             # create a new branch
git switch <name>             # switch to branch
git switch -c <name>          # create and switch in one step
git merge <name>              # merge branch into current
git branch -d <name>          # delete a merged branch (safe)
git branch -D <name>          # force-delete a branch
```

## Stash

```bash
git stash                     # stash all uncommitted changes
git stash pop                 # restore and remove last stash
git stash list                # show all stashes
git stash drop                # discard last stash
```

## Undo

```bash
git restore <file>            # discard unstaged changes in a file
git restore --staged <file>   # unstage a file (keep changes)
git revert <commit>           # create a new undo commit (safe, keeps history)
git reset --hard HEAD~1       # remove last commit and its changes (destructive)
```

## Inspect

```bash
git log --oneline -10         # last 10 commits, compact view
git diff                      # unstaged changes
git diff --staged             # staged changes not yet committed
git show <commit>             # full details of a specific commit
git blame <file>              # who changed each line and when
```
```

- [ ] **Step 2: Verify the cheatsheet appears in the gallery**

```bash
npm run dev
```

Open `http://localhost:4321/cheatsheets/`. The Git cheatsheet should appear in the "Featured" section and in "All Cheatsheets". The tags `git`, `workflow`, `beginner`, `printable`, `pasteable` should appear as filter chips. Stop server.

- [ ] **Step 3: Commit**

```bash
git add src/content/docs/cheatsheets/git.mdx
git commit -m "feat: write Git Essentials cheatsheet"
```

---

## Task 14: Write the VS Code + Claude CLI guide

**Files:**
- Create: `src/content/docs/guides/vscode-cli/index.md` (full content)
- Create: `src/content/docs/guides/vscode-cli/install.md` (full content)

- [ ] **Step 1: Create `src/content/docs/guides/vscode-cli/index.md`**

```md
---
title: VS Code + Claude CLI Guide
description: Set up and use Claude CLI inside VS Code — from install to daily workflow.
---

This guide takes you from a fresh machine to a working Claude CLI workflow inside VS Code.

## What you'll have at the end

- Claude CLI installed and authenticated on your machine
- VS Code configured to run Claude from the integrated terminal
- Your first AI-assisted coding session complete

## Prerequisites

- [VS Code](https://code.visualstudio.com/) installed
- Node.js 18+ installed (`node --version` to check)
- A Claude account at [claude.ai](https://claude.ai)

## Steps

Follow these in order:

1. [Install Claude CLI](/guides/vscode-cli/install/) — 5 minutes
2. [First Steps](/guides/vscode-cli/first-steps/) — 10 minutes
3. [Daily Workflow](/guides/vscode-cli/daily-workflow/) — read when you're up and running
```

- [ ] **Step 2: Create `src/content/docs/guides/vscode-cli/install.md`**

```md
---
title: Install Claude CLI
description: Install and authenticate Claude CLI on macOS, Windows, or Linux.
---

## Install

Claude CLI is distributed as an npm package. Run this in your terminal:

```bash
npm install -g @anthropic-ai/claude-code
```

This installs the `claude` command globally.

## Authenticate

```bash
claude
```

On first run, Claude CLI opens your browser and prompts you to sign in with your Claude account. Complete the sign-in flow, then return to the terminal.

## Verify the install

```bash
claude --version
```

You should see a version number printed. If you get "command not found", check that your npm global bin directory is in your `PATH`.

## Open Claude in VS Code

1. Open your project folder in VS Code: `File → Open Folder`
2. Open the integrated terminal: `Ctrl+\`` (backtick)
3. Type `claude` and press Enter

Claude opens in your terminal, scoped to your project directory. It can read files, run commands, and help you build.

## Next step

→ [First Steps with Claude CLI](/guides/vscode-cli/first-steps/)
```

- [ ] **Step 3: Verify guide renders correctly**

```bash
npm run dev
```

Open `http://localhost:4321/guides/vscode-cli/`. Check that the sidebar shows the guide pages, the content renders, and the "Next step" link works. Stop server.

- [ ] **Step 4: Commit**

```bash
git add src/content/docs/guides/vscode-cli/index.md src/content/docs/guides/vscode-cli/install.md
git commit -m "feat: write VS Code + Claude CLI guide intro and install pages"
```

---

## Task 15: Final build verification

**Files:** (none changed)

- [ ] **Step 1: Run all tests**

```bash
npm test
```

Expected:
```
Test Files  1 passed (1)
Tests       4 passed (4)
```

- [ ] **Step 2: Run full production build**

```bash
npm run build
```

Expected: `✓ Built in X.XXs` — zero errors.

- [ ] **Step 3: Preview and smoke-test**

```bash
npm run preview
```

Open `http://localhost:4321` and verify:
- [ ] Landing page loads with hero + card grid
- [ ] Sidebar shows all four sections (Guides, AI Landscape, Cheatsheets, Reference)
- [ ] `/guides/vscode-cli/` loads with correct content
- [ ] `/guides/vscode-cli/install/` loads with correct content
- [ ] `/cheatsheets/` shows gallery with tag filter chips
- [ ] Clicking a tag chip filters the card grid
- [ ] Git cheatsheet card appears in Featured section
- [ ] All stub pages load with "Coming soon." text
- [ ] No 404s on sidebar navigation

Stop server.

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "feat: complete v1 scaffold — themed site, gallery, and first guide"
```

---

## Done

The site is now:
- Fully configured and themed
- All pages present (stubs ready to fill)
- Cheatsheet gallery working with tag filtering
- One complete guide (VS Code + CLI — intro + install)
- One complete cheatsheet (Git Essentials)
- All tests passing
- Production build verified

**Next steps (separate work items, no implementation plan needed):**
- Fill in remaining guide content (Claude Desktop, AI Landscape pages, Reference pages)
- Write remaining cheatsheets using the Git cheatsheet as the pattern
- Push to GitHub and connect to Vercel
- Norwegian translation — own spec when content is stable
- Cheatsheet agent — own spec
