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
2. Open the integrated terminal: `` Ctrl+` `` (backtick)
3. Type `claude` and press Enter

Claude opens in your terminal, scoped to your project directory. It can read files, run commands, and help you build.

## Next step

→ [First Steps with Claude CLI](/guides/vscode-cli/first-steps/)
