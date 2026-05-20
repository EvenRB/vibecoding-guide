# Vibecoding Guide — AI Assistance Contract

## What This Project Is

A public guide covering AI-assisted development workflows using Claude tools.
Target audience: complete beginners through advanced users.
Published as a static site on Vercel or GitHub Pages.

## Content Scope

- Claude Desktop — setup and daily usage
- Claude Projects — project instructions and memory
- Claude CLI — setup in VS Code, first steps
- Orchestrator workflow — using multi-AI prompt crafting
- CLAUDE.md structure and best practices
- Token control strategies
- Superpowers skills reference
- Ralph Loop automation

## Writing Style

- Clear and direct. No jargon without explanation.
- Beginner pages: step-by-step, explicit, nothing assumed.
- Advanced pages: concise, assumes CLI familiarity.
- Conversational but precise. Not corporate.

## Project Structure

- `src/content/docs/` — all content pages (Astro/Starlight)
- `src/assets/` — images and diagrams
- `public/` — static files served as-is
- `docs/` — internal planning and roadmap (not published)

## Execution Constraints

- Read ONLY files explicitly named in the prompt, plus their direct imports.
- Do NOT use Glob or Grep to scan the project unless the task is about project structure.
- If a task requires reading more than 3 unspecified files, state what you need and why first.
- Content pages are user-owned once approved. Do not rewrite approved content without being asked.

## Rules for AI Assistance

- Do not add npm dependencies beyond the chosen framework unless explicitly asked.
- Do not modify site configuration (astro.config.mjs, etc.) without explaining why.
- When adding a new page, follow the existing frontmatter structure of neighbouring pages.
- Never invent facts about Claude's behaviour — if uncertain, flag it.
