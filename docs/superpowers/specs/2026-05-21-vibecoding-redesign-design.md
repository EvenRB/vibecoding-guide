# Vibecoding Guide — Redesign Design Spec

## Goal

Transform the existing Astro Starlight docs site into an interactive course platform that answers the question: *"How do I learn to use AI in a methodical and logical way?"* — with both a guided learning path and free reference access.

---

## Core Concept

Two layers on one site:

- **Layer 1 — Knowledge Engine:** Astro Starlight. All content lives here as `.md` files. Searchable, linkable, maintainable. This is the source of truth.
- **Layer 2 — Front Layer:** An interactive roadmap homepage that sits on top of the engine. Clickable nodes, side panels, course context. This is the entry point.

Neither layer forces the other. A user can bypass the roadmap entirely and go straight to the Library.

---

## Architecture

### Site Structure

```
/ (homepage)           → Interactive roadmap
/courses               → All courses, filterable by track/tag
/courses/[slug]        → Individual course pages (Starlight pages with course context)
/projects              → Project briefs (what users build in each course)
/library (= /guides)   → Full Starlight reference — search, browse, no course required
/cheatsheets           → Quick-reference cheatsheets index
```

The existing `src/content/docs/` directory remains the content source. No content moves.

### Two Modes

| | Course mode | Library mode |
|---|---|---|
| Entry | Roadmap node → panel → "Start course" | Search bar, top nav "Library" |
| Context | Progress bar, prev/next module buttons | Clean page, no course context |
| Sidebar | Course modules list | Standard Starlight sidebar |
| Same page? | Yes — same `.md` file, different layout context |

Course context is injected via a URL parameter (`?course=foundations`) or session state. The page itself is the same Starlight file.

---

## Roadmap

### Design

- roadmap.sh-style visual: nodes connected by lines in a vertical flow
- Hard cap: **16 nodes maximum**. The roadmap represents the journey, not a content directory.
- Clicking a node opens a **side panel** (slides in from right, roadmap narrows)
- Default state: Foundations panel open on load

### Node Types

| Type | Style | Meaning |
|---|---|---|
| Core | Purple border, filled | Required for all learners |
| Branch | Muted border | Pick based on your goal |
| Warning | Orange dot | "Is this for you?" required reading |

### Side Panel Contents (per node)

1. Course title + 1-line description
2. Prerequisites (linked)
3. **"Is this for you?"** grid — green YES / red NO (tool courses only)
4. **Artifact box** — what you walk away with
5. Resource list with type badges
6. "Start course →" button

### Resource Badge Types

| Badge | Colour | Meaning |
|---|---|---|
| Guide | Purple | Long-form Starlight guide page |
| Cheatsheet | Cyan | Quick-reference sheet |
| External | Blue | Third-party link |
| Video | Red | Video resource |
| Course | Green | Full course module |

### Scalability Rule

More content never means more roadmap nodes. It means:
- More resources inside existing panels
- More pages in the Library
- If a genuinely separate audience emerges → second roadmap, accessed via a "Roadmaps" index page

---

## Course Curriculum (16 courses)

### Core Path (required sequence)
1. **Foundations** — Mental model for AI-assisted dev, prompting basics
2. **Claude Projects** — Project instructions, memory, context management
3. **Claude CLI** — Setup in VS Code, first workflows, CLAUDE.md
4. **Second Brain** — Obsidian vault, wiki patterns, skills/ folder

### Branch A — Choose Your Tool
5. **Cursor** — AI-native editor setup and workflow
6. **Aider** — Terminal-based AI pair programmer
7. **Windsurf / VS Code + Copilot** — IDE extension workflows

### Branch B — Level Up
8. **Agents & Skills** — Building reusable agent procedures
9. **Orchestrator Workflow** — Multi-AI prompt crafting, Ralph Loop
10. **Token Control** — Context strategies, cost management
11. **Docs & Architecture** — Writing specs, plans, design docs with AI

### Branch C — Ship It
12. **Supabase + Claude** — Backend with AI assistance
13. **Deployment & CI** — Vercel, GitHub Actions, automated checks
14. **Team Workflows** — CLAUDE.md for teams, shared context
15. **Testing with AI** — TDD with Claude, test generation
16. **Building in Public** — Changelogs, READMEs, release notes with AI

Each course:
- Opens with an honest "Is this for you?" assessment (tool courses)
- Produces one tangible artifact the user keeps
- Links back to relevant Library pages for deeper reference

---

## Navigation

```
[vibecoding.guide]  Roadmap  Courses  Projects  Library  Cheatsheets  [🔍 Search Ctrl+K]  [☀/🌙]
```

- **Roadmap** → interactive homepage
- **Courses** → filterable list of all 16 courses
- **Projects** → gallery of artifacts users build
- **Library** → full Starlight reference, no course context required
- **Cheatsheets** → quick-reference index
- **Search** → searches the full Library (Starlight built-in)

---

## Theme

Two themes, toggle in top nav. CSS custom properties with `[data-theme]` selector.

| Token | Dark | Light |
|---|---|---|
| `--bg` | `#0d0f17` | `#f5f3ff` |
| `--surface` | `#13111c` | `#ffffff` |
| `--purple` | `#7c3aed` | `#6d28d9` |
| `--text` | `#e4e4e7` | `#18181b` |
| `--muted` | `#71717a` | `#71717a` |

---

## Implementation Approach

Built on the existing Astro Starlight v6 site. No new framework.

**Phase 1 — Roadmap homepage**
- Custom Astro component for the roadmap (`src/components/Roadmap.astro`)
- Node data in a JSON/TS config file (`src/data/roadmap.ts`)
- Panel rendered client-side from data — no page navigation needed
- Theme toggle wired to Starlight's existing dark mode

**Phase 2 — Course pages**
- Course context component injected into Starlight layout when `?course=` param present
- Prev/next module navigation
- Progress tracking via localStorage

**Phase 3 — Projects section**
- Static project brief pages under `src/content/docs/projects/`
- Linked from roadmap panels and course pages

**Phase 4 — Polish**
- Courses index page with filtering
- Cheatsheets index
- "Is this for you?" component as a reusable Astro MDX component

---

## What This Is Not

- Not a video platform
- Not a learning management system with accounts/grades
- Not a wiki (the Library is reference, not collaborative editing)
- The roadmap does not replace the Library — both exist independently
