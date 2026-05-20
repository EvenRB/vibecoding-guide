// astro.config.mjs
import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'

export default defineConfig({
  integrations: [
    starlight({
      title: 'Vibecoding Guide',
      customCss: ['./src/styles/custom.css'],
      editLink: {
        baseUrl: 'https://github.com/Knyttneven/vibecoding-guide/edit/main/',
      },
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/Knyttneven/vibecoding-guide' },
      ],
      sidebar: [
        {
          label: 'Guides',
          items: [
            { label: 'VS Code + Claude CLI', items: [{ autogenerate: { directory: 'guides/vscode-cli' } }] },
            { label: 'Claude Desktop', items: [{ autogenerate: { directory: 'guides/claude-desktop' } }] },
          ],
        },
        { label: 'AI Landscape', items: [{ autogenerate: { directory: 'ai-landscape' } }] },
        { label: 'Cheatsheets', items: [{ autogenerate: { directory: 'cheatsheets' } }] },
        { label: 'Reference', items: [{ autogenerate: { directory: 'reference' } }] },
      ],
    }),
  ],
})
