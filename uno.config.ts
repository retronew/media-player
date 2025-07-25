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
          --mp-background: 240 10% 3.9%;
          --mp-foreground: 0 0% 98%;
          --mp-border: 240 3.7% 15.9%;
        }
      `,
    },
  ],
  theme: {
    colors: {
      border: 'hsl(var(--mp-border))',
      background: 'hsl(var(--mp-background))',
      foreground: 'hsl(var(--mp-foreground))',
    },
  },
  presets: [
    presetWind3({
      variablePrefix: 'mp-',
    }),
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
