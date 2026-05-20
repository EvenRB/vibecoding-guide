---
title: Connect to Obsidian
description: Open your second brain as an Obsidian vault for visual browsing, backlinks, and graph view.
---

Your second brain is plain markdown with YAML frontmatter — which is exactly what Obsidian reads natively. No conversion needed. You just open the folder.

## Open the vault

1. Download and install [Obsidian](https://obsidian.md) if you haven't already
2. Click **Open folder as vault**
3. Select your `~/second-brain/` folder
4. Done — all your markdown files are now browsable in Obsidian

## Why Obsidian works here

- **Graph view** — see connections between wiki entries, projects, and notes
- **Backlinks** — when you reference a project from a wiki entry, Obsidian tracks it
- **Quick switcher** (`Cmd/Ctrl+O`) — jump to any file instantly
- **Tags** — the YAML frontmatter tags you write are first-class in Obsidian

## Frontmatter format for wiki entries

Write wiki entries like this so Obsidian picks up the metadata:

```markdown
---
title: "Supabase RLS gotcha with service role"
tags: [supabase, rls, auth]
created: 2026-05-20
updated: 2026-05-20
---

# Supabase RLS gotcha with service role

What happened, what caused it, how to fix it.
```

## Recommended plugins

Install these from **Settings → Community plugins**:

| Plugin | Why |
|---|---|
| **Obsidian Git** | Auto-commit and push on a timer — keeps your second brain synced without thinking about it |
| **Dataview** | Query your wiki by tag, date, or field — turns your notes into a searchable database |
| **Templater** | Insert the wiki frontmatter template with one keystroke |

## Setting up Obsidian Git (recommended)

1. Install **Obsidian Git** from Community plugins
2. Go to **Settings → Obsidian Git**
3. Set **Auto pull interval** to `10` minutes
4. Set **Auto commit-and-sync interval** to `30` minutes
5. Enable **Pull on startup**

Your second brain now syncs to GitHub automatically in the background.

## Git note

Obsidian creates a `.obsidian/` folder with your settings. The `.gitignore` from the setup step already excludes the workspace files (which change constantly) but tracks your plugin settings and theme.

## Next step

→ [Connect to Claude CLI](/guides/second-brain/claude-cli/)
