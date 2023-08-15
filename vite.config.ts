// vite.config.ts
// import { defineConfig } from 'vitest/config'

// export default defineConfig({
//   define: {
//     'import.meta.vitest': false,
//   },
//   test: {
//     globals: true, 
//     includeSource: ['src/**/*.{js,ts}'],
//   },
//   root: 'src/ui',
//   // base: '/ui',
//   publicDir: 'public',
//   build: {
//     outDir: '../../dist',
//   },
//   envDir: '../../',
// })
// 

import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  root: 'src/ui',
  plugins: [tsconfigPaths()],
})