import process from 'node:process'
import {
  defineConfig,
  presetWind3,
  transformerCompileClass,
  transformerVariantGroup,
} from 'unocss'

const isProduction = process.env.NODE_ENV === 'production'

export default defineConfig({
  preflights: [
    {
      getCSS: () => `
        :root {
          --background: 240 10% 3.9%;
          --foreground: 0 0% 98%;
          --border: 240 3.7% 15.9%;
        }
      `,
    },
  ],
  theme: {
    colors: {
      border: 'hsl(var(--border))',
      background: 'hsl(var(--background))',
      foreground: 'hsl(var(--foreground))',
    },
  },
  presets: [
    presetWind3(),
  ],
  content: {
    pipeline: {
      include: [
        // the default
        /\.(vue|[jt]sx|mdx?|html)($|\?)/,
        // include js/ts files
        'src/**/*.{js,ts}',
      ],
      // exclude files
      exclude: [],
    },
  },
  transformers: [
    ...(isProduction ? [transformerCompileClass()] : []),
    transformerVariantGroup(),
  ],
})
