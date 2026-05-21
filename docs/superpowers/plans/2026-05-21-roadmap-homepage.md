# Vibecoding Redesign — Phase 1: Roadmap Homepage

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Starlight splash homepage with a fully interactive roadmap — clickable nodes, sliding side panel with course details, dark/light theme toggle.

**Architecture:** A standalone `src/pages/index.astro` page (Astro file-based routing takes precedence over the Starlight content collection at `/`) imports a self-contained `Roadmap.astro` component. All node and panel data lives in `src/data/roadmap.ts`. Interaction logic runs as vanilla JS in a `<script define:vars>` block so the typed data is available in the browser without a separate API call.

**Tech Stack:** Astro v6, TypeScript, vanilla JS, CSS custom properties (vars already defined in `src/styles/custom.css`)

---

## File map

| Action | Path | Responsibility |
|--------|------|---------------|
| Create | `src/data/roadmap.ts` | All TypeScript types + node/panel data for 16 courses |
| Create | `src/components/Roadmap.astro` | Node layout, side panel, interaction script, all styles |
| Create | `src/pages/index.astro` | Page shell: `<html>`, nav header, hero, mounts `<Roadmap />` |
| Modify | `src/styles/custom.css` | Add light theme CSS vars |
| Delete | `src/content/docs/index.mdx` | Replaced by `src/pages/index.astro` — route conflict if kept |

---

### Task 1: Roadmap data types and content

**Files:**
- Create: `src/data/roadmap.ts`

- [ ] **Step 1: Create the file with types and node data**

```typescript
// src/data/roadmap.ts

export type ResourceBadge = 'guide' | 'cheatsheet' | 'external' | 'video' | 'course'
export type NodeType = 'core' | 'branch' | 'warning'
export type Track = 'choose' | 'level-up' | 'ship-it'

export interface Resource {
  label: string
  badge: ResourceBadge
  href: string
}

export interface IsThisForYou {
  yes: string[]
  no: string[]
}

export interface PanelData {
  title: string
  description: string
  prerequisites: Array<{ label: string; href: string }>
  isThisForYou?: IsThisForYou
  artifact: string
  resources: Resource[]
  courseHref: string
}

export interface RoadmapNode {
  id: string
  label: string
  type: NodeType
  track?: Track
}

export const CORE_NODES: RoadmapNode[] = [
  { id: 'foundations',     label: 'Foundations',     type: 'core' },
  { id: 'claude-projects', label: 'Claude Projects', type: 'core' },
  { id: 'claude-cli',      label: 'Claude CLI',      type: 'core' },
  { id: 'second-brain',    label: 'Second Brain',    type: 'core' },
]

export const BRANCH_NODES: Record<Track, { label: string; nodes: RoadmapNode[] }> = {
  choose: {
    label: 'Choose Your Tool',
    nodes: [
      { id: 'cursor',   label: 'Cursor',   type: 'warning', track: 'choose' },
      { id: 'aider',    label: 'Aider',    type: 'warning', track: 'choose' },
      { id: 'windsurf', label: 'Windsurf', type: 'branch',  track: 'choose' },
    ],
  },
  'level-up': {
    label: 'Level Up',
    nodes: [
      { id: 'agents',        label: 'Agents & Skills',       type: 'branch', track: 'level-up' },
      { id: 'orchestrator',  label: 'Orchestrator Workflow',  type: 'branch', track: 'level-up' },
      { id: 'token-control', label: 'Token Control',          type: 'branch', track: 'level-up' },
      { id: 'docs-arch',     label: 'Docs & Architecture',    type: 'branch', track: 'level-up' },
    ],
  },
  'ship-it': {
    label: 'Ship It',
    nodes: [
      { id: 'backend',    label: 'Supabase + Claude',  type: 'branch', track: 'ship-it' },
      { id: 'deployment', label: 'Deployment & CI',    type: 'branch', track: 'ship-it' },
      { id: 'team',       label: 'Team Workflows',     type: 'branch', track: 'ship-it' },
      { id: 'testing',    label: 'Testing with AI',    type: 'branch', track: 'ship-it' },
      { id: 'public',     label: 'Building in Public', type: 'branch', track: 'ship-it' },
    ],
  },
}

export const PANELS: Record<string, PanelData> = {
  foundations: {
    title: 'Foundations',
    description: 'Build the mental model for AI-assisted development. Learn how to prompt effectively, understand what Claude can and cannot do, and set up your first workflow.',
    prerequisites: [],
    artifact: 'Your first CLAUDE.md file with a working project instruction set.',
    resources: [
      { label: 'VS Code + Claude CLI guide',  badge: 'guide',      href: '/guides/vscode-cli/' },
      { label: 'Prompt patterns cheatsheet',  badge: 'cheatsheet', href: '/cheatsheets/prompt-patterns' },
      { label: 'CLAUDE.md reference',         badge: 'guide',      href: '/reference/claude-md' },
    ],
    courseHref: '/guides/vscode-cli/',
  },
  'claude-projects': {
    title: 'Claude Projects',
    description: 'Set up persistent Claude Projects with project instructions, file uploads, and shared memory so Claude understands your codebase context every session.',
    prerequisites: [{ label: 'Foundations', href: '/guides/vscode-cli/' }],
    artifact: 'A configured Claude Project with project instructions for your own codebase.',
    resources: [
      { label: 'Claude Desktop — Projects guide',  badge: 'guide',      href: '/guides/claude-desktop/projects' },
      { label: 'CLAUDE.md template cheatsheet',    badge: 'cheatsheet', href: '/cheatsheets/claude-md-template' },
    ],
    courseHref: '/guides/claude-desktop/projects',
  },
  'claude-cli': {
    title: 'Claude CLI',
    description: 'Install Claude Code in VS Code, write your first CLAUDE.md, and run your first agentic task. Move from prompting to coding together.',
    prerequisites: [{ label: 'Claude Projects', href: '/guides/claude-desktop/projects' }],
    artifact: 'A CLAUDE.md in a real project and your first completed CLI task committed to git.',
    resources: [
      { label: 'Install guide',         badge: 'guide',      href: '/guides/vscode-cli/install' },
      { label: 'First steps guide',     badge: 'guide',      href: '/guides/vscode-cli/first-steps' },
      { label: 'VS Code AI shortcuts',  badge: 'cheatsheet', href: '/cheatsheets/vscode-ai-shortcuts' },
    ],
    courseHref: '/guides/vscode-cli/install',
  },
  'second-brain': {
    title: 'Second Brain',
    description: 'Build an Obsidian vault that feeds context to Claude — wiki patterns, a skills/ folder for reusable procedures, and a personal knowledge system that grows with your work.',
    prerequisites: [{ label: 'Claude CLI', href: '/guides/vscode-cli/install' }],
    artifact: 'An Obsidian vault wired to Claude with at least one reusable skill defined.',
    resources: [
      { label: 'Second Brain overview',  badge: 'guide', href: '/guides/second-brain/' },
      { label: 'Obsidian setup',         badge: 'guide', href: '/guides/second-brain/obsidian' },
      { label: 'Wiki patterns',          badge: 'guide', href: '/guides/second-brain/wiki-patterns' },
      { label: 'Building Skills ref',    badge: 'guide', href: '/reference/building-skills' },
    ],
    courseHref: '/guides/second-brain/',
  },
  cursor: {
    title: 'Cursor',
    description: 'AI-native editor built on VS Code with inline generation, multi-file edits, and Composer. Best for developers who want AI deeply integrated into the editor experience.',
    prerequisites: [{ label: 'Second Brain', href: '/guides/second-brain/' }],
    isThisForYou: {
      yes: [
        'You prefer GUI over terminal',
        'You want inline AI completions as you type',
        'You come from a VS Code background',
        'You work mostly in one codebase at a time',
      ],
      no: [
        'You are comfortable in the terminal',
        'You want to script and automate AI tasks',
        'You need fine-grained context control',
        'You already use Claude CLI daily',
      ],
    },
    artifact: 'Cursor installed and configured with a .cursorrules file for your project.',
    resources: [
      { label: 'Cursor documentation', badge: 'external', href: 'https://cursor.sh/docs' },
    ],
    courseHref: '/guides/vscode-cli/',
  },
  aider: {
    title: 'Aider',
    description: 'Terminal-based AI pair programmer that edits real files in your git repo. Understands your whole codebase, makes surgical edits, and commits its own changes.',
    prerequisites: [{ label: 'Second Brain', href: '/guides/second-brain/' }],
    isThisForYou: {
      yes: [
        'You are comfortable in the terminal',
        'You want fine-grained control over edits',
        'You work with large, multi-file codebases',
        'You care about clean git history',
      ],
      no: [
        'You prefer a visual GUI editor',
        'You are new to the command line',
        'You want inline completions as you type',
        'You primarily work on single-file scripts',
      ],
    },
    artifact: 'Aider installed and tested on a real repo with your preferred model configured.',
    resources: [
      { label: 'Aider documentation', badge: 'external', href: 'https://aider.chat/docs/' },
    ],
    courseHref: '/guides/vscode-cli/',
  },
  windsurf: {
    title: 'Windsurf / VS Code + Copilot',
    description: 'Windsurf and GitHub Copilot offer solid AI assistance inside VS Code. Good for teams already on VS Code who want lighter-touch AI without switching editors.',
    prerequisites: [{ label: 'Second Brain', href: '/guides/second-brain/' }],
    artifact: 'An AI extension configured in your editor with project-specific settings.',
    resources: [
      { label: 'VS Code AI shortcuts', badge: 'cheatsheet', href: '/cheatsheets/vscode-ai-shortcuts' },
      { label: 'Windsurf docs',        badge: 'external',   href: 'https://docs.codeium.com/windsurf/getting-started' },
    ],
    courseHref: '/guides/vscode-cli/',
  },
  agents: {
    title: 'Agents & Skills',
    description: 'Build reusable agent procedures using the skills/ pattern. Turn any repeated Claude workflow into a named skill that runs consistently and can be shared across projects.',
    prerequisites: [{ label: 'Second Brain', href: '/guides/second-brain/' }],
    artifact: 'Three reusable skills/ files covering your most common AI workflows.',
    resources: [
      { label: 'Building Skills reference',  badge: 'guide',      href: '/reference/building-skills' },
      { label: 'Multi-agent patterns',       badge: 'guide',      href: '/reference/multi-agent' },
      { label: 'Claude CLI cheatsheet',      badge: 'cheatsheet', href: '/cheatsheets/claude-cli' },
    ],
    courseHref: '/reference/building-skills',
  },
  orchestrator: {
    title: 'Orchestrator Workflow',
    description: 'The Ralph Loop: use one AI to craft the perfect prompt for another. Build orchestration chains where Claude refines, critiques, and routes work across models.',
    prerequisites: [{ label: 'Agents & Skills', href: '/reference/building-skills' }],
    artifact: 'A documented Ralph Loop workflow for your highest-value recurring task.',
    resources: [
      { label: 'Orchestrator Workflow guide', badge: 'guide', href: '/reference/orchestrator-workflow' },
      { label: 'Ralph Loop reference',        badge: 'guide', href: '/reference/ralph-loop' },
    ],
    courseHref: '/reference/orchestrator-workflow',
  },
  'token-control': {
    title: 'Token Control',
    description: 'Understand context windows, token costs, and how to structure long tasks so Claude stays focused and within budget. Essential for professional-scale workflows.',
    prerequisites: [{ label: 'Claude CLI', href: '/guides/vscode-cli/install' }],
    artifact: 'A token budget strategy and context-management pattern applied to your main project.',
    resources: [
      { label: 'Token control guide', badge: 'guide',      href: '/reference/token-control' },
      { label: 'CLAUDE.md template',  badge: 'cheatsheet', href: '/cheatsheets/claude-md-template' },
    ],
    courseHref: '/reference/token-control',
  },
  'docs-arch': {
    title: 'Docs & Architecture',
    description: 'Write specs, plans, and design documents using Claude as a co-author. Forces clear thinking before coding starts and produces better software.',
    prerequisites: [{ label: 'Second Brain', href: '/guides/second-brain/' }],
    artifact: 'A full spec + implementation plan for a real project, written collaboratively with Claude.',
    resources: [
      { label: 'Superpowers overview', badge: 'guide', href: '/reference/superpowers-overview' },
    ],
    courseHref: '/reference/superpowers-overview',
  },
  backend: {
    title: 'Supabase + Claude',
    description: 'Build and iterate on a Supabase backend with Claude as your pair programmer. Schema design, SQL migrations, Edge Functions, and RLS policies — all with AI assistance.',
    prerequisites: [{ label: 'Claude CLI', href: '/guides/vscode-cli/install' }],
    artifact: 'A working Supabase project with a schema and at least one Edge Function written with Claude.',
    resources: [
      { label: 'Supabase documentation', badge: 'external', href: 'https://supabase.com/docs' },
    ],
    courseHref: '/guides/vscode-cli/',
  },
  deployment: {
    title: 'Deployment & CI',
    description: 'Set up Vercel deployments and GitHub Actions with Claude writing and debugging your CI configuration. Ship confidently with automated checks on every push.',
    prerequisites: [{ label: 'Claude CLI', href: '/guides/vscode-cli/install' }],
    artifact: 'A Vercel deployment with a GitHub Actions CI pipeline, configured with Claude.',
    resources: [
      { label: 'Vercel documentation', badge: 'external', href: 'https://vercel.com/docs' },
    ],
    courseHref: '/guides/vscode-cli/',
  },
  team: {
    title: 'Team Workflows',
    description: 'Scale AI-assisted development across a team. Shared CLAUDE.md files, context conventions, onboarding patterns, and keeping AI context healthy in a multi-contributor codebase.',
    prerequisites: [{ label: 'Claude CLI', href: '/guides/vscode-cli/install' }],
    artifact: 'A team CLAUDE.md and an AI onboarding guide for your project.',
    resources: [
      { label: 'CLAUDE.md reference', badge: 'guide', href: '/reference/claude-md' },
    ],
    courseHref: '/reference/claude-md',
  },
  testing: {
    title: 'Testing with AI',
    description: 'Practice TDD with Claude as your pair programmer — write failing tests, let Claude implement, review together. Covers unit, integration, and snapshot testing patterns.',
    prerequisites: [{ label: 'Claude CLI', href: '/guides/vscode-cli/install' }],
    artifact: 'A test suite for one of your projects with meaningful coverage, written using TDD with Claude.',
    resources: [
      { label: 'Claude CLI guide', badge: 'guide', href: '/guides/vscode-cli/' },
    ],
    courseHref: '/guides/vscode-cli/',
  },
  public: {
    title: 'Building in Public',
    description: 'Use Claude to write changelogs, README files, release notes, and social posts. Build a content workflow that turns your commits into clear communication.',
    prerequisites: [{ label: 'Claude CLI', href: '/guides/vscode-cli/install' }],
    artifact: 'A changelog template and a polished README for one of your projects, generated with Claude.',
    resources: [
      { label: 'Markdown + MDX cheatsheet', badge: 'cheatsheet', href: '/cheatsheets/markdown-mdx' },
    ],
    courseHref: '/guides/vscode-cli/',
  },
}
```

- [ ] **Step 2: Verify TypeScript compiles — run the type check**

```bash
npx tsc --noEmit
```

Expected: no errors. If Astro complains about tsconfig, run `npm run build` instead and check for type errors in the output.

- [ ] **Step 3: Commit**

```bash
git add src/data/roadmap.ts
git commit -m "feat: add roadmap data types and 16-course panel content"
```

---

### Task 2: Add light theme CSS vars

**Files:**
- Modify: `src/styles/custom.css`

- [ ] **Step 1: Read the current file**

Read `src/styles/custom.css` to confirm current contents before editing.

- [ ] **Step 2: Append light theme block**

Append to the end of `src/styles/custom.css`:

```css
:root[data-theme='light'] {
  --sl-color-accent:           #6d28d9;
  --sl-color-accent-high:      #5b21b6;
  --sl-color-accent-low:       rgba(109, 40, 217, 0.12);
  --sl-color-bg:               #f5f3ff;
  --sl-color-bg-nav:           #ffffff;
  --sl-color-bg-sidebar:       #faf9ff;
  --sl-color-bg-inline-code:   rgba(109, 40, 217, 0.08);
  --sl-color-hairline-light:   rgba(0, 0, 0, 0.08);
  --sl-color-hairline-shade:   rgba(0, 0, 0, 0.04);
  --sl-color-text:             #18181b;
  --sl-color-text-accent:      #5b21b6;
  --sl-color-white:            #18181b;
  --sl-color-gray-1:           #3f3f46;
  --sl-color-gray-2:           #52525b;
  --sl-color-gray-3:           #71717a;
  --sl-color-gray-4:           #a1a1aa;
  --sl-color-gray-5:           #d4d4d8;
  --sl-color-gray-6:           #f4f4f5;
  --sl-color-black:            #f5f3ff;
}
```

- [ ] **Step 3: Commit**

```bash
git add src/styles/custom.css
git commit -m "feat: add light theme CSS vars"
```

---

### Task 3: Roadmap component

**Files:**
- Create: `src/components/Roadmap.astro`

This component renders all nodes, the side panel, wires up click interactions via vanilla JS, and owns all roadmap-specific styles.

- [ ] **Step 1: Create the component**

```astro
---
// src/components/Roadmap.astro
import { CORE_NODES, BRANCH_NODES, PANELS } from '../data/roadmap.ts'

const branchEntries = Object.entries(BRANCH_NODES) as [
  import('../data/roadmap.ts').Track,
  { label: string; nodes: import('../data/roadmap.ts').RoadmapNode[] }
][]
---

<div class="roadmap-wrap" id="roadmap-wrap">

  <!-- Node flow -->
  <div class="roadmap-flow" id="roadmap-flow">

    <!-- Core path -->
    <div class="core-path">
      {CORE_NODES.map((node, i) => (
        <div class="core-item">
          <button
            class={`rm-node is-${node.type}`}
            data-node-id={node.id}
            aria-label={`Open ${node.label} course details`}
          >
            <span class="node-label">{node.label}</span>
            <span class="node-arrow">→</span>
          </button>
          {i < CORE_NODES.length - 1 && <div class="core-connector" aria-hidden="true"></div>}
        </div>
      ))}
    </div>

    <!-- Branch divider -->
    <div class="branch-divider" aria-hidden="true">
      <div class="branch-divider-line"></div>
      <span class="branch-divider-label">Choose your path</span>
      <div class="branch-divider-line"></div>
    </div>

    <!-- Branch columns -->
    <div class="branches">
      {branchEntries.map(([track, { label, nodes }]) => (
        <div class="branch-track" data-track={track}>
          <div class="branch-header">{label}</div>
          {nodes.map(node => (
            <button
              class={`rm-node is-${node.type}`}
              data-node-id={node.id}
              aria-label={`Open ${node.label} course details`}
            >
              {node.type === 'warning' && (
                <span class="warning-pip" title="Read 'Is this for you?' before starting" aria-label="Read before starting">!</span>
              )}
              <span class="node-label">{node.label}</span>
              <span class="node-arrow">→</span>
            </button>
          ))}
        </div>
      ))}
    </div>

  </div>

  <!-- Side panel (populated by JS) -->
  <aside class="roadmap-panel" id="roadmap-panel" aria-label="Course details" aria-hidden="true">
    <button class="panel-close" id="panel-close" aria-label="Close panel">✕</button>
    <div id="panel-content" class="panel-content-inner"></div>
  </aside>

</div>

<style is:global>
  /* ── Layout ────────────────────────────────────── */
  .roadmap-wrap {
    display: flex;
    gap: 0;
    align-items: flex-start;
    min-height: 60vh;
    transition: gap 0.3s ease;
  }

  .roadmap-flow {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem 1rem 4rem;
    transition: flex 0.3s ease;
  }

  .roadmap-wrap.has-panel .roadmap-flow {
    flex: 0 0 55%;
  }

  /* ── Core path ─────────────────────────────────── */
  .core-path {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 340px;
  }

  .core-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  .core-connector {
    width: 2px;
    height: 28px;
    background: var(--sl-color-accent);
    opacity: 0.4;
  }

  /* ── Nodes ─────────────────────────────────────── */
  .rm-node {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0.875rem 1.25rem;
    border-radius: 10px;
    font-size: 0.9rem;
    font-weight: 600;
    font-family: inherit;
    cursor: pointer;
    transition: border-color 0.15s, background 0.15s, transform 0.1s;
    text-align: left;
  }

  .rm-node.is-core {
    background: rgba(124, 58, 237, 0.1);
    border: 1.5px solid rgba(124, 58, 237, 0.45);
    color: var(--sl-color-text-accent);
  }

  .rm-node.is-core:hover,
  .rm-node.is-core.is-active {
    background: rgba(124, 58, 237, 0.2);
    border-color: var(--sl-color-accent);
    transform: translateX(3px);
  }

  .rm-node.is-branch {
    background: rgba(255, 255, 255, 0.03);
    border: 1.5px solid var(--sl-color-hairline-light);
    color: var(--sl-color-gray-1);
  }

  .rm-node.is-branch:hover,
  .rm-node.is-branch.is-active {
    background: rgba(124, 58, 237, 0.08);
    border-color: rgba(124, 58, 237, 0.35);
    color: var(--sl-color-text-accent);
    transform: translateX(3px);
  }

  .rm-node.is-warning {
    background: rgba(255, 255, 255, 0.03);
    border: 1.5px solid rgba(251, 146, 60, 0.3);
    color: var(--sl-color-gray-1);
  }

  .rm-node.is-warning:hover,
  .rm-node.is-warning.is-active {
    background: rgba(251, 146, 60, 0.08);
    border-color: rgba(251, 146, 60, 0.5);
    color: #fb923c;
    transform: translateX(3px);
  }

  .node-label {
    flex: 1;
  }

  .node-arrow {
    opacity: 0;
    font-size: 0.75rem;
    transition: opacity 0.15s;
  }

  .rm-node:hover .node-arrow,
  .rm-node.is-active .node-arrow {
    opacity: 1;
  }

  .warning-pip {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: rgba(251, 146, 60, 0.2);
    border: 1px solid rgba(251, 146, 60, 0.4);
    color: #fb923c;
    font-size: 0.6rem;
    font-weight: 800;
    margin-right: 0.5rem;
    flex-shrink: 0;
  }

  /* ── Branch divider ────────────────────────────── */
  .branch-divider {
    display: flex;
    align-items: center;
    gap: 1rem;
    width: 100%;
    max-width: 800px;
    margin: 2rem 0 1.5rem;
  }

  .branch-divider-line {
    flex: 1;
    height: 1px;
    background: var(--sl-color-hairline-light);
  }

  .branch-divider-label {
    font-size: 0.7rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--sl-color-gray-3);
    white-space: nowrap;
  }

  /* ── Branches ──────────────────────────────────── */
  .branches {
    display: flex;
    gap: 1.5rem;
    width: 100%;
    max-width: 900px;
    align-items: flex-start;
  }

  .branch-track {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .branch-header {
    font-size: 0.65rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.09em;
    color: var(--sl-color-gray-3);
    padding: 0 0.25rem;
    margin-bottom: 0.25rem;
  }

  /* ── Side panel ────────────────────────────────── */
  .roadmap-panel {
    width: 0;
    overflow: hidden;
    transition: width 0.3s ease;
    background: var(--sl-color-bg-nav);
    border-left: 1px solid var(--sl-color-hairline-light);
    position: sticky;
    top: 0;
    max-height: 100vh;
    overflow-y: auto;
  }

  .roadmap-panel.is-open {
    width: 45%;
    min-width: 320px;
  }

  .panel-close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: 1px solid var(--sl-color-hairline-light);
    color: var(--sl-color-gray-2);
    width: 28px;
    height: 28px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.85rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: border-color 0.15s, color 0.15s;
  }

  .panel-close:hover {
    border-color: var(--sl-color-accent);
    color: var(--sl-color-accent);
  }

  .panel-content-inner {
    padding: 1.5rem;
  }

  /* ── Panel inner content ───────────────────────── */
  .panel-title {
    font-size: 1.3rem;
    font-weight: 800;
    color: var(--sl-color-text);
    margin: 0 0 0.5rem;
    padding-right: 2rem;
  }

  .panel-desc {
    font-size: 0.85rem;
    color: var(--sl-color-gray-2);
    line-height: 1.6;
    margin: 0 0 1.5rem;
  }

  .panel-section {
    margin-bottom: 1.25rem;
  }

  .panel-section-label {
    font-size: 0.65rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--sl-color-gray-3);
    margin-bottom: 0.5rem;
  }

  /* Prerequisites */
  .prereq-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
  }

  .prereq-tag {
    display: inline-block;
    padding: 3px 10px;
    background: rgba(124, 58, 237, 0.1);
    border: 1px solid rgba(124, 58, 237, 0.25);
    border-radius: 100px;
    font-size: 0.75rem;
    color: var(--sl-color-text-accent);
    text-decoration: none;
    transition: background 0.15s;
  }

  .prereq-tag:hover {
    background: rgba(124, 58, 237, 0.2);
  }

  .prereq-none {
    font-size: 0.8rem;
    color: var(--sl-color-gray-3);
    font-style: italic;
  }

  /* Is this for you */
  .ify-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;
  }

  .ify-col {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  .ify-yes,
  .ify-no {
    font-size: 0.78rem;
    line-height: 1.4;
    padding: 0.35rem 0.6rem;
    border-radius: 6px;
  }

  .ify-yes {
    background: rgba(74, 222, 128, 0.08);
    border: 1px solid rgba(74, 222, 128, 0.2);
    color: #4ade80;
  }

  .ify-no {
    background: rgba(248, 113, 113, 0.08);
    border: 1px solid rgba(248, 113, 113, 0.2);
    color: #f87171;
  }

  /* Artifact */
  .artifact-section .artifact-text {
    font-size: 0.85rem;
    color: var(--sl-color-text);
    background: rgba(124, 58, 237, 0.06);
    border: 1px solid rgba(124, 58, 237, 0.2);
    border-radius: 8px;
    padding: 0.75rem 1rem;
    line-height: 1.5;
  }

  /* Resources */
  .resource-list {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  .resource-item {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    font-size: 0.82rem;
    text-decoration: none;
    color: var(--sl-color-gray-1);
    padding: 0.4rem 0.6rem;
    border-radius: 6px;
    transition: background 0.15s;
  }

  .resource-item:hover {
    background: var(--sl-color-hairline-shade);
  }

  .res-badge {
    display: inline-block;
    font-size: 0.6rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    padding: 2px 6px;
    border-radius: 4px;
    flex-shrink: 0;
  }

  .res-badge-guide      { background: rgba(124, 58, 237, 0.15); color: #c4b5fd; }
  .res-badge-cheatsheet { background: rgba(34, 211, 238, 0.12); color: #67e8f9; }
  .res-badge-external   { background: rgba(96, 165, 250, 0.12); color: #93c5fd; }
  .res-badge-video      { background: rgba(248, 113, 113, 0.12); color: #fca5a5; }
  .res-badge-course     { background: rgba(74, 222, 128, 0.12); color: #86efac; }

  /* CTA button */
  .panel-cta {
    display: block;
    margin-top: 1.5rem;
    padding: 0.75rem 1.25rem;
    background: var(--sl-color-accent);
    color: white;
    border-radius: 8px;
    font-size: 0.875rem;
    font-weight: 700;
    text-decoration: none;
    text-align: center;
    transition: opacity 0.15s;
  }

  .panel-cta:hover {
    opacity: 0.88;
  }

  /* ── Responsive ────────────────────────────────── */
  @media (max-width: 768px) {
    .roadmap-wrap.has-panel .roadmap-flow {
      display: none;
    }

    .roadmap-panel.is-open {
      width: 100%;
    }

    .branches {
      flex-direction: column;
    }
  }
</style>

<script define:vars={{ PANELS }}>
  function badge(type, label) {
    return `<span class="res-badge res-badge-${type}">${type}</span>${label}`
  }

  function buildPanelHTML(data) {
    const prereqs = data.prerequisites.length > 0
      ? data.prerequisites
          .map(p => `<a href="${p.href}" class="prereq-tag">${p.label}</a>`)
          .join('')
      : '<span class="prereq-none">None — start here</span>'

    const ifySection = data.isThisForYou
      ? `<div class="panel-section">
          <div class="panel-section-label">Is this for you?</div>
          <div class="ify-grid">
            <ul class="ify-col">${data.isThisForYou.yes.map(t => `<li class="ify-yes">✓ ${t}</li>`).join('')}</ul>
            <ul class="ify-col">${data.isThisForYou.no.map(t => `<li class="ify-no">✗ ${t}</li>`).join('')}</ul>
          </div>
        </div>`
      : ''

    const resources = data.resources
      .map(r => {
        const rel = r.badge === 'external' ? 'rel="noopener noreferrer"' : ''
        const target = r.badge === 'external' ? 'target="_blank"' : ''
        return `<a href="${r.href}" class="resource-item" ${target} ${rel}>${badge(r.badge, r.label)}</a>`
      })
      .join('')

    return `
      <h2 class="panel-title">${data.title}</h2>
      <p class="panel-desc">${data.description}</p>
      <div class="panel-section">
        <div class="panel-section-label">Prerequisites</div>
        <div class="prereq-list">${prereqs}</div>
      </div>
      ${ifySection}
      <div class="panel-section artifact-section">
        <div class="panel-section-label">You'll walk away with</div>
        <div class="artifact-text">${data.artifact}</div>
      </div>
      <div class="panel-section">
        <div class="panel-section-label">Resources</div>
        <div class="resource-list">${resources}</div>
      </div>
      <a href="${data.courseHref}" class="panel-cta">Start course →</a>
    `
  }

  function openPanel(nodeId) {
    const data = PANELS[nodeId]
    if (!data) return

    document.querySelectorAll('[data-node-id]').forEach(n => n.classList.remove('is-active'))
    const active = document.querySelector(`[data-node-id="${nodeId}"]`)
    if (active) active.classList.add('is-active')

    document.getElementById('panel-content').innerHTML = buildPanelHTML(data)
    document.getElementById('roadmap-panel').classList.add('is-open')
    document.getElementById('roadmap-panel').removeAttribute('aria-hidden')
    document.getElementById('roadmap-wrap').classList.add('has-panel')
  }

  function closePanel() {
    document.getElementById('roadmap-panel').classList.remove('is-open')
    document.getElementById('roadmap-panel').setAttribute('aria-hidden', 'true')
    document.getElementById('roadmap-wrap').classList.remove('has-panel')
    document.querySelectorAll('[data-node-id]').forEach(n => n.classList.remove('is-active'))
  }

  document.querySelectorAll('[data-node-id]').forEach(node => {
    node.addEventListener('click', () => openPanel(node.dataset.nodeId))
  })

  document.getElementById('panel-close').addEventListener('click', closePanel)

  // Open foundations on load
  setTimeout(() => openPanel('foundations'), 400)
</script>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Roadmap.astro
git commit -m "feat: add interactive Roadmap component with side panel and 16 nodes"
```

---

### Task 4: Homepage page + remove old index

**Files:**
- Create: `src/pages/index.astro`
- Delete: `src/content/docs/index.mdx`

`src/pages/index.astro` uses Astro's file-based routing (takes precedence over the content collection). `src/content/docs/index.mdx` would conflict at `/` so it must be deleted.

- [ ] **Step 1: Delete the old homepage**

```bash
git rm src/content/docs/index.mdx
git commit -m "chore: remove docs index — replaced by src/pages/index.astro"
```

- [ ] **Step 2: Create the homepage**

```astro
---
// src/pages/index.astro
import Roadmap from '../components/Roadmap.astro'
import '../styles/custom.css'
---

<!doctype html>
<html lang="en" data-theme="dark">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content="Learn AI-assisted development step by step — from first setup to advanced multi-agent workflows." />
    <title>Vibecoding Guide</title>
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  </head>
  <body>

    <header class="site-header">
      <nav class="site-nav">
        <a href="/" class="site-logo">vibecoding.guide</a>
        <div class="nav-links">
          <a href="/" class="nav-link is-active">Roadmap</a>
          <a href="/guides/vscode-cli/" class="nav-link">Guides</a>
          <a href="/cheatsheets/" class="nav-link">Cheatsheets</a>
          <a href="/reference/building-skills" class="nav-link">Reference</a>
        </div>
        <button class="theme-toggle" id="theme-toggle" aria-label="Toggle colour theme">☀</button>
      </nav>
    </header>

    <main class="site-main">
      <div class="hero">
        <h1 class="hero-title">
          Learn AI-assisted development<br />
          <span class="hero-accent">step by step</span>
        </h1>
        <p class="hero-sub">
          Click any node to explore the course.
          Follow the core path or jump straight to what you need.
        </p>
      </div>
      <Roadmap />
    </main>

  </body>
</html>

<style>
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: system-ui, -apple-system, sans-serif;
    background: var(--sl-color-bg);
    color: var(--sl-color-text);
    min-height: 100vh;
  }

  /* ── Header ───────────────────────────── */
  .site-header {
    position: sticky;
    top: 0;
    z-index: 100;
    background: var(--sl-color-bg-nav);
    border-bottom: 1px solid var(--sl-color-hairline-light);
  }

  .site-nav {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1.5rem;
    height: 56px;
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }

  .site-logo {
    font-size: 0.9rem;
    font-weight: 800;
    color: var(--sl-color-accent);
    text-decoration: none;
    letter-spacing: -0.01em;
    flex-shrink: 0;
  }

  .nav-links {
    display: flex;
    gap: 0.25rem;
    flex: 1;
  }

  .nav-link {
    padding: 0.35rem 0.875rem;
    border-radius: 6px;
    font-size: 0.82rem;
    font-weight: 500;
    color: var(--sl-color-gray-2);
    text-decoration: none;
    transition: color 0.15s, background 0.15s;
  }

  .nav-link:hover {
    color: var(--sl-color-text);
    background: var(--sl-color-hairline-shade);
  }

  .nav-link.is-active {
    color: var(--sl-color-text-accent);
    background: var(--sl-color-accent-low);
  }

  .theme-toggle {
    margin-left: auto;
    background: none;
    border: 1px solid var(--sl-color-hairline-light);
    color: var(--sl-color-gray-2);
    width: 34px;
    height: 34px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: border-color 0.15s, color 0.15s;
    flex-shrink: 0;
  }

  .theme-toggle:hover {
    border-color: var(--sl-color-accent);
    color: var(--sl-color-accent);
  }

  /* ── Hero ─────────────────────────────── */
  .site-main {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1.5rem;
  }

  .hero {
    text-align: center;
    padding: 3.5rem 1rem 2.5rem;
  }

  .hero-title {
    font-size: clamp(1.75rem, 4vw, 2.75rem);
    font-weight: 800;
    line-height: 1.2;
    letter-spacing: -0.02em;
    color: var(--sl-color-text);
    margin-bottom: 1rem;
  }

  .hero-accent {
    background: linear-gradient(135deg, var(--sl-color-accent), #60a5fa);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .hero-sub {
    font-size: 1rem;
    color: var(--sl-color-gray-2);
    max-width: 480px;
    margin: 0 auto;
    line-height: 1.6;
  }
</style>

<script>
  const toggle = document.getElementById('theme-toggle')
  const html = document.documentElement

  toggle?.addEventListener('click', () => {
    const isLight = html.getAttribute('data-theme') === 'light'
    html.setAttribute('data-theme', isLight ? 'dark' : 'light')
    if (toggle) toggle.textContent = isLight ? '☀' : '🌙'
  })
</script>
```

- [ ] **Step 3: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: add roadmap homepage — replaces Starlight splash page"
```

---

### Task 5: Build verification and smoke test

**Files:** None modified

- [ ] **Step 1: Run the TypeScript / Astro build**

```bash
npm run build
```

Expected: build completes with no errors. If TypeScript errors appear in `roadmap.ts`, check that all `PanelData` fields match the type definition (e.g. `prerequisites` must be an array, not undefined).

Common error to watch for:
```
Type 'string' is not assignable to type 'ResourceBadge'
```
Fix: check that every `badge:` value in PANELS is one of `'guide' | 'cheatsheet' | 'external' | 'video' | 'course'`.

- [ ] **Step 2: Start the dev server**

```bash
npm run dev
```

Open `http://localhost:4321` in the browser.

- [ ] **Step 3: Verify these interactions**

Check each of the following works as expected:

1. **Homepage loads** — dark background, purple hero text, roadmap nodes visible
2. **Foundations panel opens on load** — after ~400ms, the Foundations panel slides in from the right and the Foundations node gets the active style
3. **Click any core node** — panel slides open, title and description match the node clicked
4. **Click Cursor node** — panel opens and shows the "Is this for you?" grid with green YES / red NO items
5. **Click Aider node** — same as Cursor, different content
6. **Close button (✕)** — panel closes, active state clears from nodes
7. **Theme toggle (☀)** — page switches to light theme, button changes to 🌙, click again returns to dark
8. **Nav links** — Guides, Cheatsheets, Reference all navigate to the correct Starlight pages (they still exist at their original URLs)
9. **Responsive at 375px width** — roadmap flow hides when panel is open on mobile, panel fills the screen

- [ ] **Step 4: Run unit tests to confirm no regressions**

```bash
npm test
```

Expected: existing `src/utils/filter.test.ts` passes (this plan does not touch `src/utils/`).

- [ ] **Step 5: Commit and push**

```bash
git push origin master
```

Vercel will auto-deploy from the push. Confirm the live URL shows the roadmap homepage after deployment completes (~1–2 min).

---

## Follow-on plans (not in scope here)

- **Phase 2 — Course context:** Inject prev/next module navigation and progress bar into Starlight pages when arrived via `?course=<id>` URL param. Stored in `localStorage`.
- **Phase 3 — Projects section:** Static project brief pages at `/projects/` listing the artifact each course produces.
- **Phase 4 — Polish:** Courses index page with tag filtering, "Is this for you?" as a reusable MDX component, Cheatsheets index.
