---
title: Set Up Your Second Brain
description: Create the folder structure and git repo for your personal knowledge base.
---

## Create the folder structure

Run these commands to scaffold your second brain:

```bash
# Create the repo
mkdir ~/second-brain
cd ~/second-brain
git init
git branch -m main

# Create the folder structure
mkdir wiki raw outputs skills projects .claude
```

Your structure will look like this:

```
~/second-brain/
├── CLAUDE.md          ← global AI context (auto-loaded by Claude CLI)
├── README.md
├── .gitignore
├── wiki/              ← learned patterns, gotchas, solutions
├── raw/               ← rough notes and clippings
├── outputs/           ← generated documents and exports
├── skills/            ← reusable agent procedures
├── projects/          ← one file per project
│   └── _template.md   ← template for new projects
└── .claude/
    └── project-template.md  ← template for .claude/CLAUDE.md in projects
```

## Create `.gitignore`

```bash
cat > ~/second-brain/.gitignore << 'EOF'
.DS_Store
Thumbs.db
*.tmp
.obsidian/workspace.json
.obsidian/workspace-mobile.json
EOF
```

## Create your global `CLAUDE.md`

This file becomes your AI identity — everything Claude needs to know about you globally. Create it at `~/second-brain/CLAUDE.md`:

```markdown
# CLAUDE.md – Global Context

## Who I am

[Your role — e.g. "I'm a developer building websites for clients and personal projects."]

- **Stack**: HTML, CSS, JavaScript, [your stack]
- **Deploy**: Vercel from `main` branch
- **Tools**: Claude CLI, VS Code

---

## Second Brain structure

My second brain lives at `~/second-brain/` with wiki, raw notes, skills, and per-project logs.

---

## Branch strategy

main → production (never push directly)
dev  → active development
feature/xxx → new features
fix/xxx → bug fixes

---

## Commit format

Use Conventional Commits:
feat: add login with Supabase Auth
fix: correct RLS policy
docs: update README
chore: update dependencies

---

## Wiki rules

Add a wiki entry when:
- A problem took more than 15 minutes to solve
- A pattern applies across multiple projects
- A gotcha is found (unexpected behaviour, hidden limit)

File names: kebab-case, e.g. `supabase-rls-gotcha.md`
```

## Create the project template

This file is what Claude copies into new projects. Create `~/second-brain/.claude/project-template.md`:

```markdown
# CLAUDE.md – [Project name]

## Project info

- **Project**: [Name]
- **Repo**: github.com/[username]/[repo]
- **Deploy**: https://[url]

## Stack

- **Frontend**: [HTML/CSS/JS | React + Vite | other]
- **Database**: [Supabase | none]
- **Deploy**: [Vercel | Netlify]

## Project-specific rules

- [Rule 1]
- [Rule 2]

## Reference

- Global context: `~/second-brain/CLAUDE.md`
- Project log: `~/second-brain/projects/[project].md`
```

## Initial commit

```bash
cd ~/second-brain
git add .
git commit -m "feat: initial second brain structure"
```

## Create private GitHub repo and push

```bash
gh repo create second-brain --private --source=. --remote=origin --push
```

## Next step

→ [Open as an Obsidian vault](/guides/second-brain/obsidian/)
