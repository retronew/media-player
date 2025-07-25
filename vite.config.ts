import { resolve } from 'node:path'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import dts from 'unplugin-dts/vite'
import { defineConfig } from 'vite'

export default defineConfig(({ mode }) => {
  const isLib = mode === 'lib'

  return {
    build: isLib
      ? {
          lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'VideoPlayer',
            fileName: 'index',
            formats: ['es'],
          },
          rollupOptions: {
            external: ['vue'],
            output: {
              globals: {
                vue: 'Vue',
              },
              assetFileNames: 'style.css',
              exports: 'named',
            },
          },
        }
      : {},

    plugins: [
      vue({
        template: {
          compilerOptions: {
            isCustomElement: tag => tag.startsWith('media-'),
          },
        },
      }),
      UnoCSS(),
      ...(isLib
        ? [dts({
            insertTypesEntry: true,
            bundleTypes: true,
            tsconfigPath: './tsconfig.app.json',
          })]
        : []),
    ],

    define: {
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false,
    },
  }
})
