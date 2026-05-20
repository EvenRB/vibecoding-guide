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
            { label: 'VS Code + Claude CLI', autogenerate: { directory: 'guides/vscode-cli' } },
            { label: 'Claude Desktop', autogenerate: { directory: 'guides/claude-desktop' } },
          ],
        },
        { label: 'AI Landscape', autogenerate: { directory: 'ai-landscape' } },
        { label: 'Cheatsheets', autogenerate: { directory: 'cheatsheets' } },
        { label: 'Reference', autogenerate: { directory: 'reference' } },
      ],
    }),
  ],
})
