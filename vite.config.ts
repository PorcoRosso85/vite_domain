/// <reference types="vitest" />
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths()],

  build: {
    outDir: './dist',
  },
  define: {
    'import.meta.vitest': false,
  },
  test: {
    globals: true, 
    includeSource: ['src/**/*.{js,ts}'],
  },
})