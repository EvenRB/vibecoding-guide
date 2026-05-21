// src/data/roadmap.ts

// 'video' and 'course' badges are reserved for future content
export type ResourceBadge = 'guide' | 'cheatsheet' | 'external' | 'video' | 'course'
export type NodeType = 'core' | 'branch' | 'warning'
export type Track = 'choose' | 'level-up' | 'ship-it'

type CoreNodeId = 'foundations' | 'claude-projects' | 'claude-cli' | 'second-brain'
type BranchNodeId =
  | 'cursor' | 'aider' | 'windsurf'
  | 'agents' | 'orchestrator' | 'token-control' | 'docs-arch'
  | 'backend' | 'deployment' | 'team' | 'testing' | 'public'
export type NodeId = CoreNodeId | BranchNodeId

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

export const PANELS: Record<NodeId, PanelData> = {
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
    courseHref: '/guides/vscode-cli/', // placeholder — dedicated course page not yet created
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
    courseHref: '/guides/vscode-cli/', // placeholder — dedicated course page not yet created
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
    courseHref: '/guides/vscode-cli/', // placeholder — dedicated course page not yet created
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
    courseHref: '/guides/vscode-cli/', // placeholder — dedicated course page not yet created
  },
  deployment: {
    title: 'Deployment & CI',
    description: 'Set up Vercel deployments and GitHub Actions with Claude writing and debugging your CI configuration. Ship confidently with automated checks on every push.',
    prerequisites: [{ label: 'Claude CLI', href: '/guides/vscode-cli/install' }],
    artifact: 'A Vercel deployment with a GitHub Actions CI pipeline, configured with Claude.',
    resources: [
      { label: 'Vercel documentation', badge: 'external', href: 'https://vercel.com/docs' },
    ],
    courseHref: '/guides/vscode-cli/', // placeholder — dedicated course page not yet created
  },
  team: {
    title: 'Team Workflows',
    description: 'Scale AI-assisted development across a team. Shared CLAUDE.md files, context conventions, onboarding patterns, and keeping AI context healthy in a multi-contributor codebase.',
    prerequisites: [{ label: 'Claude CLI', href: '/guides/vscode-cli/install' }],
    artifact: 'A team CLAUDE.md and an AI onboarding guide for your project.',
    resources: [
      { label: 'CLAUDE.md reference', badge: 'guide', href: '/reference/claude-md' },
    ],
    courseHref: '/reference/claude-md', // placeholder — dedicated course page not yet created
  },
  testing: {
    title: 'Testing with AI',
    description: 'Practice TDD with Claude as your pair programmer — write failing tests, let Claude implement, review together. Covers unit, integration, and snapshot testing patterns.',
    prerequisites: [{ label: 'Claude CLI', href: '/guides/vscode-cli/install' }],
    artifact: 'A test suite for one of your projects with meaningful coverage, written using TDD with Claude.',
    resources: [
      { label: 'Claude CLI guide', badge: 'guide', href: '/guides/vscode-cli/' },
    ],
    courseHref: '/guides/vscode-cli/', // placeholder — dedicated course page not yet created
  },
  public: {
    title: 'Building in Public',
    description: 'Use Claude to write changelogs, README files, release notes, and social posts. Build a content workflow that turns your commits into clear communication.',
    prerequisites: [{ label: 'Claude CLI', href: '/guides/vscode-cli/install' }],
    artifact: 'A changelog template and a polished README for one of your projects, generated with Claude.',
    resources: [
      { label: 'Markdown + MDX cheatsheet', badge: 'cheatsheet', href: '/cheatsheets/markdown-mdx' },
    ],
    courseHref: '/guides/vscode-cli/', // placeholder — dedicated course page not yet created
  },
}
