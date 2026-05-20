---
title: Wiki Patterns
description: What to write in your wiki, when to write it, and how to keep it useful over time.
---

The wiki is the most valuable part of your second brain — but only if you write in it at the right moments. Most people write too much (capturing everything) or too little (never getting around to it). This page gives you a simple rule.

## The 15-minute rule

Write a wiki entry when a problem took **more than 15 minutes** to solve.

That threshold captures the things worth remembering without creating noise. A quick Google answer doesn't need a wiki page. An hour of debugging a Supabase RLS policy does.

## Also write when you find a pattern

Not just bugs — write a wiki entry when you notice a pattern that applies across projects:

- A way of structuring a component that works well
- A prompt pattern that reliably gets good results
- A git workflow that saved you from a mistake
- A Claude behaviour you want to remember

## Wiki entry format

```markdown
---
title: "Short descriptive title"
tags: [supabase, rls, auth]
created: 2026-05-20
updated: 2026-05-20
---

# Short descriptive title

## What happened

Brief description of the situation.

## Why it happened

The root cause, not just the symptoms.

## How to fix it

The exact steps or code that solved it.

## How to avoid it

Any setup, config, or habit that prevents this in future.
```

## File naming

Use kebab-case. Be specific:

```
supabase-rls-service-role-bypass.md   ✓
supabase-issue.md                     ✗  (too vague)
the-problem-i-had-today.md            ✗  (not searchable)
```

## What goes where

| Content | Folder |
|---|---|
| Solved problems, patterns, gotchas | `wiki/` |
| Rough notes, ideas, clippings | `raw/` |
| Generated docs, exports | `outputs/` |
| Reusable Claude procedures | `skills/` |
| Active project overviews | `projects/` |

## Skills — a special case

A `skills/` file is a reusable procedure for Claude — essentially a prompt template for a recurring task. Don't create these upfront. Only create one when you've done the same thing manually **twice** and want to automate it.

Example skill file (`skills/deploy-to-vercel.md`):
```markdown
# Deploy to Vercel

When asked to deploy:
1. Run `npm run build` and confirm no errors
2. Check that `.env` is not committed
3. Push to `main` branch
4. Confirm the Vercel preview URL in the PR before merging
```

## Keeping it useful

A wiki that's never read is just clutter. Two habits that help:

1. **Search before starting** — before debugging a problem, search your wiki first. You may have solved it before.
2. **Update, don't duplicate** — if you find a better solution, update the existing entry. Don't create a second one.
