/// <reference types="vitest" />
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  build: {
    outDir: './dist/client',
    rollupOptions: {
      // このファイルの依存先だけがビルドされる
      input: ['./src/ui/components.ts', './index.html'],
    },
  },
  define: {
    'import.meta.vitest': false,
  },
  test: {
    globals: true,
    includeSource: ['src/**/*.{js,ts}'],
  },

  server: {
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
  plugins: [tsconfigPaths()],
});
