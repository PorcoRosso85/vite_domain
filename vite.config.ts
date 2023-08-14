// vite.config.ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  define: {
    'import.meta.vitest': false,
  },
  test: {
    includeSource: ['src/**/*.{js,ts}'],
  },
  root: 'src/ui',
  // base: '/ui',
  publicDir: 'public',
  build: {
    outDir: '../../dist',
  },
  envDir: '../../',
})