import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const root = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [react()],
  base: '/dietistvianen/',
  build: {
    rollupOptions: {
      input: {
        home: resolve(root, 'index.html'),
        specialisaties: resolve(root, 'specialisaties.html'),
        overMij: resolve(root, 'over-mij.html'),
        werkwijze: resolve(root, 'werkwijze.html'),
        vergoeding: resolve(root, 'vergoeding.html'),
        contact: resolve(root, 'contact.html'),
      },
    },
  },
})
