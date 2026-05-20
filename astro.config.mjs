// astro.config.mjs
import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'

export default defineConfig({
  integrations: [
    starlight({
      title: 'Vibecoding Guide',
      customCss: ['./src/styles/custom.css'],
      editLink: {
        baseUrl: 'https://github.com/EvenRB/vibecoding-guide/edit/main/',
      },
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/EvenRB/vibecoding-guide' },
      ],
      sidebar: [
        {
          label: 'Guides',
          items: [
            { label: 'VS Code + Claude CLI', items: [{ autogenerate: { directory: 'guides/vscode-cli' } }] },
            { label: 'Claude Desktop', items: [{ autogenerate: { directory: 'guides/claude-desktop' } }] },
            { label: 'Second Brain', items: [{ autogenerate: { directory: 'guides/second-brain' } }] },
          ],
        },
        { label: 'AI Landscape', items: [{ autogenerate: { directory: 'ai-landscape' } }] },
        { label: 'Cheatsheets', items: [{ autogenerate: { directory: 'cheatsheets' } }] },
        { label: 'Reference', items: [{ autogenerate: { directory: 'reference' } }] },
      ],
    }),
  ],
})
