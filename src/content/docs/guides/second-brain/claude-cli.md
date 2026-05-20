---
title: Connect to Claude CLI
description: Symlink your CLAUDE.md so Claude CLI loads your global context automatically in every project.
---

Claude CLI looks for `~/.claude/CLAUDE.md` when it starts. If the file exists, it loads it as your global system context — no prompting needed.

The trick: instead of maintaining two copies, you symlink `~/.claude/CLAUDE.md` to your second brain's `CLAUDE.md`. One file, always in sync.

## Create the symlink

**Windows (PowerShell as Administrator):**

```powershell
New-Item -ItemType SymbolicLink -Path "$HOME\.claude\CLAUDE.md" -Target "$HOME\second-brain\CLAUDE.md"
```

**macOS / Linux:**

```bash
ln -sf ~/second-brain/CLAUDE.md ~/.claude/CLAUDE.md
```

## Verify it works

```bash
cat ~/.claude/CLAUDE.md
```

You should see your second brain's `CLAUDE.md` content. Now every `claude` session loads it automatically.

## Project-level context

For individual projects, Claude CLI reads `.claude/CLAUDE.md` in the project root. Use your project template to create it:

```bash
cd ~/my-project
mkdir .claude
cp ~/second-brain/.claude/project-template.md .claude/CLAUDE.md
# Fill in the project-specific fields
```

When Claude starts in that folder, it loads **both** files — global context from `~/.claude/CLAUDE.md` and project context from `.claude/CLAUDE.md`.

## Automated project onboarding

If you add this block to your global `CLAUDE.md`, Claude will automatically ask setup questions and create both files when you open a project that doesn't have `.claude/CLAUDE.md` yet:

```markdown
## New project — onboarding

If `.claude/CLAUDE.md` does not exist in the current project folder,
automatically ask these questions one at a time and wait for each answer:

1. "What is the client or business name?"
2. "What is the project name?"
3. "What are we building? (website / app / tool / other)"
4. "Where will it deploy? (Vercel / Netlify / other)"
5. "Does this project use Supabase? (yes / no)"
6. "What is the domain or URL? (write 'unknown' if unsure)"
7. "What should the GitHub repo be called?"

When all answers are collected, create:
- `.claude/CLAUDE.md` in the project folder (based on the project template)
- `~/second-brain/projects/[project-name].md` (based on the projects template)

Confirm when both files are created.
```

## Daily workflow

```bash
# Morning — pull latest notes and project logs
cd ~/second-brain && git pull

# Evening — commit the day's notes and updates
cd ~/second-brain
git add .
git commit -m "chore: daily update $(date +%Y-%m-%d)"
git push
```

## LLM exit plan

Your `CLAUDE.md` is plain markdown. It works as a system prompt for any LLM:

```python
# Anthropic
with open("~/second-brain/CLAUDE.md") as f:
    system_prompt = f.read()

response = client.messages.create(
    model="claude-opus-4-7",
    system=system_prompt,
    messages=[{"role": "user", "content": "Your message"}]
)

# OpenAI
response = client.chat.completions.create(
    model="gpt-4o",
    messages=[
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": "Your message"}
    ]
)
```

You are never locked in to one tool.

## Next step

→ [Wiki patterns — what to write down](/guides/second-brain/wiki-patterns/)
